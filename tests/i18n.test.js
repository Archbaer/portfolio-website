import { describe, it, expect } from 'vitest';
import { dicts } from '../src/lib/i18n.svelte.js';
import site from '../src/lib/data/site.config.js';

/** Structural shape: arrays/objects compared by length/keys, leaves by existence. */
/** @param {any} v */
function shape(v) {
  if (Array.isArray(v)) return v.map(shape);
  if (v !== null && typeof v === 'object') {
    return Object.fromEntries(Object.keys(v).sort().map((k) => [k, shape(v[k])]));
  }
  return null;
}

describe('i18n dictionaries', () => {
  it('zh has exactly the same keys as en', () => {
    expect(Object.keys(dicts.zh).sort()).toEqual(Object.keys(dicts.en).sort());
  });

  it('zh values match en structure (array lengths, object keys)', () => {
    for (const key of Object.keys(dicts.en)) {
      expect(shape(dicts.zh[key]), key).toEqual(shape(dicts.en[key]));
    }
  });

  it('no empty zh strings', () => {
    for (const [key, value] of Object.entries(dicts.zh)) {
      if (typeof value === 'string') expect(value.length, key).toBeGreaterThan(0);
    }
  });

  it('stackGroups count matches site.config stack groups', () => {
    expect(dicts.en['about.stackGroups']).toHaveLength(site.stack.length);
    expect(dicts.zh['about.stackGroups']).toHaveLength(site.stack.length);
  });
});
