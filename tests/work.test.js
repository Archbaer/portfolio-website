import { describe, it, expect } from 'vitest';
import { scrambleFrame } from '../src/lib/scramble.js';
import { iconFor } from '../src/lib/icons.js';
import projects from '../src/lib/data/projects.json';

describe('scrambleFrame', () => {
  const target = 'DoDeploy';

  it('fully settles at progress 1', () => {
    expect(scrambleFrame(target, 1)).toBe(target);
  });

  it('keeps settled prefix stable and preserves length', () => {
    const out = scrambleFrame(target, 0.5);
    expect(out).toHaveLength(target.length);
    expect(out.startsWith('DoDe')).toBe(true);
  });

  it('preserves spaces', () => {
    expect(scrambleFrame('a b', 0)[1]).toBe(' ');
  });
});

describe('icons', () => {
  it('every project tag has an icon or is an accepted text-only tag', () => {
    const textOnly = new Set(['ETL', 'yfinance', 'CLI']);
    for (const p of projects) {
      for (const tag of p.tags) {
        expect(
          iconFor(tag) !== null || textOnly.has(tag),
          `tag "${tag}" (${p.slug}) has no icon and is not whitelisted`
        ).toBe(true);
      }
    }
  });
});
