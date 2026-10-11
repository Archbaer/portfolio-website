import { describe, it, expect } from 'vitest';
import { shouldAnimate, nextDrops } from '../src/lib/rain.js';

describe('rain logic', () => {
  it('does not animate when reduced motion preferred', () => {
    expect(shouldAnimate(true)).toBe(false);
    expect(shouldAnimate(false)).toBe(true);
  });

  it('advances drops and resets them above the fold', () => {
    const drops = [0, 100];
    const out = nextDrops(drops, 2, 50, 16);
    expect(out[0]).toBe(16);
    expect(out[1]).toBeLessThanOrEqual(0); // reset to <= 0
  });
});
