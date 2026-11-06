import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest';

import getFormattedTimestamp from '../../../src/utils/get-formatted-timestamp';

// New York moves its clocks on 8 March (23-hour day) and 1 November (25-hour day) in 2026
beforeAll(() => {
  vi.stubEnv('TZ', 'America/New_York');
});

afterAll(() => {
  vi.unstubAllEnvs();
});

afterEach(() => {
  vi.useRealTimers();
});

describe('getFormattedTimestamp', () => {
  it('shows "Yesterday" just after midnight following a 23-hour day', () => {
    vi.useFakeTimers({ now: new Date(2026, 2, 9, 0, 30) });

    expect(getFormattedTimestamp(new Date(2026, 2, 8, 12, 0))).toBe('Yesterday');
  });

  it('shows "Yesterday" late on a 25-hour day', () => {
    vi.useFakeTimers({ now: new Date(2026, 10, 1, 23, 30) });

    expect(getFormattedTimestamp(new Date(2026, 9, 31, 12, 0))).toBe('Yesterday');
  });
});
