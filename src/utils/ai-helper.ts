import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config/env.config';

/**
 * AITestHelper — Claude-powered utilities for intelligent test assistance.
 *
 * Capabilities:
 * 1. Flaky test detection: analyzes test result history to identify unstable tests
 * 2. Test data generation: generates context-aware, realistic test data
 * 3. Failure analysis: interprets error messages and suggests fixes
 * 4. Selector healing: suggests alternative selectors when primary ones fail
 */
export class AITestHelper {
  private client: Anthropic | null = null;

  private getClient(): Anthropic {
    if (!this.client) {
      if (!config.anthropicApiKey) {
        throw new Error('ANTHROPIC_API_KEY is not set. AI features require an Anthropic API key.');
      }
      this.client = new Anthropic({ apiKey: config.anthropicApiKey });
    }
    return this.client;
  }

  /**
   * Analyze test run history to identify flaky tests.
   * Returns tests with instability score > threshold and mitigation suggestions.
   */
  async detectFlakyTests(testResults: TestRunResult[]): Promise<FlakyTestReport> {
    const client = this.getClient();

    const summary = testResults.map(r => ({
      name: r.testName,
      runs: r.results.length,
      failures: r.results.filter(x => x === 'failed').length,
      pattern: r.results.join(','),
    }));

    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2048,
      messages: [
        {
          role: 'user',
          content: `You are a QA reliability engineer. Analyze these test run results and identify flaky tests.

Test run history (each test shows pass/fail pattern across multiple runs):
${JSON.stringify(summary, null, 2)}

For each test, determine:
1. Flakiness score (0-100, where 100 = always fails, 50 = intermittent = flaky)
2. Pattern type: intermittent, environment-dependent, timing-sensitive, or data-dependent
3. Mitigation strategy

Return JSON with structure:
{
  "flakyTests": [
    {
      "testName": string,
      "flakinesScore": number,
      "patternType": string,
      "mitigation": string,
      "priority": "high" | "medium" | "low"
    }
  ],
  "summary": string
}`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type from Claude');

    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse JSON from Claude response');

    return JSON.parse(jsonMatch[0]) as FlakyTestReport;
  }

  /**
   * Analyze a test failure and suggest actionable fixes.
   */
  async analyzeFailure(failure: TestFailureContext): Promise<string> {
    const client = this.getClient();

    const response = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: `You are a QA automation expert. Analyze this Playwright test failure and provide a concise fix:

Test: ${failure.testName}
Error: ${failure.error}
Stack: ${failure.stack?.split('\n').slice(0, 5).join('\n') ?? 'N/A'}
URL at failure: ${failure.url ?? 'N/A'}
Last action: ${failure.lastAction ?? 'N/A'}

Provide:
1. Root cause (1 sentence)
2. Fix recommendation (concrete code change or selector update)
3. Prevention strategy (1 sentence)`,
        },
      ],
    });

    const content = response.content[0];
    return content.type === 'text' ? content.text : 'Unable to analyze failure.';
  }

  /**
   * Suggest a healed selector when the original selector breaks.
   * Uses page context (HTML snippet) to find a more resilient alternative.
   */
  async healSelector(context: SelectorHealingContext): Promise<string> {
    const client = this.getClient();

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Playwright selector "${context.brokenSelector}" no longer works.

Surrounding HTML:
${context.htmlSnippet}

The element is: ${context.elementDescription}

Suggest a more resilient Playwright selector (prefer role/label/text over CSS classes).
Return ONLY the selector string, nothing else.`,
        },
      ],
    });

    const content = response.content[0];
    return content.type === 'text' ? content.text.trim() : context.brokenSelector;
  }

  /**
   * Generate scenario-specific test data using Claude's contextual understanding.
   */
  async generateTestData(scenario: string, schema: Record<string, string>): Promise<Record<string, string>> {
    const client = this.getClient();

    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 512,
      messages: [
        {
          role: 'user',
          content: `Generate realistic test data for this QA scenario: "${scenario}"

Required fields with types:
${JSON.stringify(schema, null, 2)}

Return ONLY valid JSON with string values for each field. Make data realistic and scenario-appropriate.`,
        },
      ],
    });

    const content = response.content[0];
    if (content.type !== 'text') throw new Error('Unexpected response type');
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('Could not parse JSON');
    return JSON.parse(jsonMatch[0]);
  }
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TestRunResult {
  testName: string;
  results: ('passed' | 'failed' | 'skipped')[];
}

export interface FlakyTestReport {
  flakyTests: Array<{
    testName: string;
    flakinesScore: number;
    patternType: string;
    mitigation: string;
    priority: 'high' | 'medium' | 'low';
  }>;
  summary: string;
}

export interface TestFailureContext {
  testName: string;
  error: string;
  stack?: string;
  url?: string;
  lastAction?: string;
}

export interface SelectorHealingContext {
  brokenSelector: string;
  htmlSnippet: string;
  elementDescription: string;
}
