/**
 * Retry Utilities — smart retry mechanisms for flaky test mitigation.
 *
 * Strategies:
 * - Exponential backoff: for network/API failures
 * - Fixed interval: for UI state polling
 * - Conditional retry: re-runs only on specific error types
 */

export interface RetryOptions {
  attempts?: number;
  delay?: number;
  backoff?: 'exponential' | 'linear' | 'fixed';
  onRetry?: (error: Error, attempt: number) => void;
  retryOn?: (error: Error) => boolean;
}

/**
 * Retry an async operation with configurable backoff strategy.
 *
 * @example
 * const result = await retry(() => apiClient.getEmployee(id), {
 *   attempts: 3,
 *   delay: 500,
 *   backoff: 'exponential',
 * });
 */
export async function retry<T>(
  operation: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> {
  const {
    attempts = 3,
    delay = 500,
    backoff = 'exponential',
    onRetry,
    retryOn = () => true,
  } = options;

  let lastError: Error = new Error('Unknown error');

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      if (attempt === attempts || !retryOn(lastError)) {
        throw lastError;
      }

      onRetry?.(lastError, attempt);

      const waitTime = calculateDelay(delay, attempt, backoff);
      await sleep(waitTime);
    }
  }

  throw lastError;
}

/**
 * Poll until a condition is true or timeout is reached.
 *
 * @example
 * await poll(() => page.locator('.status').textContent().then(t => t === 'Active'), {
 *   interval: 1000,
 *   timeout: 30000,
 * });
 */
export async function poll(
  condition: () => Promise<boolean>,
  options: { interval?: number; timeout?: number; description?: string } = {}
): Promise<void> {
  const { interval = 1000, timeout = 30_000, description = 'condition' } = options;
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    if (await condition()) return;
    await sleep(interval);
  }

  throw new Error(`Timed out waiting for ${description} after ${timeout}ms`);
}

/**
 * Retry only on specific error types — useful for distinguishing
 * transient failures (network timeout) from legitimate failures (assertion).
 */
export function retryOnNetworkError(error: Error): boolean {
  const networkErrors = ['ECONNREFUSED', 'ECONNRESET', 'ETIMEDOUT', 'ENOTFOUND', 'net::'];
  return networkErrors.some(pattern => error.message.includes(pattern));
}

export function retryOnTimeoutError(error: Error): boolean {
  return error.message.toLowerCase().includes('timeout');
}

export function retryOnStaleElement(error: Error): boolean {
  return (
    error.message.includes('detached') ||
    error.message.includes('stale') ||
    error.message.includes('Element is not attached')
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calculateDelay(
  baseDelay: number,
  attempt: number,
  strategy: 'exponential' | 'linear' | 'fixed'
): number {
  switch (strategy) {
    case 'exponential':
      return baseDelay * Math.pow(2, attempt - 1);
    case 'linear':
      return baseDelay * attempt;
    case 'fixed':
    default:
      return baseDelay;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
