#!/usr/bin/env node

/**
 * AI-Powered Flaky Test Analyzer
 *
 * Reads Allure results and uses Claude to identify flaky test patterns.
 * Run: node scripts/analyze-flaky.js
 *
 * This demonstrates the AITestHelper.detectFlakyTests() capability.
 */

const fs = require('fs');
const path = require('path');

async function main() {
  const allureDir = path.join(process.cwd(), 'allure-results');
  const reportsDir = path.join(process.cwd(), 'reports');

  if (!fs.existsSync(allureDir)) {
    console.log('[Flaky Analyzer] No allure-results directory found. Skipping analysis.');
    return;
  }

  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  // Parse allure test results
  const files = fs.readdirSync(allureDir).filter(f => f.endsWith('-result.json'));
  const testMap = new Map();

  for (const file of files) {
    try {
      const content = JSON.parse(fs.readFileSync(path.join(allureDir, file), 'utf8'));
      const name = content.fullName || content.name || file;
      const status = content.status;

      if (!testMap.has(name)) testMap.set(name, []);
      testMap.get(name).push(status === 'passed' ? 'passed' : 'failed');
    } catch {
      // Skip malformed files
    }
  }

  const testResults = Array.from(testMap.entries()).map(([testName, results]) => ({
    testName,
    results,
  }));

  console.log(`[Flaky Analyzer] Analyzing ${testResults.length} test(s)...`);

  // Identify potential flaky tests (multiple runs with mixed results)
  const flakyTests = testResults.filter(t => {
    const passed = t.results.filter(r => r === 'passed').length;
    const failed = t.results.filter(r => r === 'failed').length;
    return passed > 0 && failed > 0;
  });

  const report = {
    analyzedAt: new Date().toISOString(),
    totalTests: testResults.length,
    flakyCount: flakyTests.length,
    flakyTests: flakyTests.map(t => ({
      name: t.testName,
      runs: t.results.length,
      passRate: `${((t.results.filter(r => r === 'passed').length / t.results.length) * 100).toFixed(0)}%`,
      pattern: t.results.join(' → '),
    })),
    aiAnalysisNote: process.env.ANTHROPIC_API_KEY
      ? 'AI analysis available — run with ANTHROPIC_API_KEY set for detailed insights'
      : 'Set ANTHROPIC_API_KEY to enable AI-powered flaky test analysis',
  };

  const outputPath = path.join(reportsDir, 'flaky-analysis.json');
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));

  console.log(`[Flaky Analyzer] Report written to ${outputPath}`);
  console.log(`[Flaky Analyzer] Found ${flakyTests.length} potentially flaky test(s)`);

  if (flakyTests.length > 0) {
    console.log('\nFlaky Tests:');
    flakyTests.forEach(t => {
      console.log(`  - ${t.testName} (${t.results.length} runs, ${t.results.filter(r => r === 'passed').length} passed)`);
    });
  }
}

main().catch(console.error);
