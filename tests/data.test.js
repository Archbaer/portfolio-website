import { describe, it, expect } from 'vitest';
import projects from '../src/lib/data/projects.json';

describe('projects.json', () => {
  it('has 6 projects with unique slugs and indexes', () => {
    expect(projects).toHaveLength(6);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(6);
    expect(new Set(projects.map((p) => p.index)).size).toBe(6);
  });

  it.each(projects.map((p) => [p.slug, p]))('%s is well-formed', (_slug, p) => {
    expect(p).toMatchObject({
      slug: expect.stringMatching(/^[a-z0-9-]+$/),
      index: expect.stringMatching(/^0[1-6]$/),
      name: expect.any(String),
      tagline: expect.any(String),
      description: expect.any(String),
      repo: expect.stringMatching(/^https:\/\/github\.com\/Archbaer\//),
      language: expect.any(String)
    });
    expect(p.name).not.toBe('');
    expect(p.tagline).not.toBe('');
    expect(p.language).not.toBe('');
    expect(Array.isArray(p.tags)).toBe(true);
    p.tags.forEach((t) => expect(typeof t).toBe('string'));
    expect(p.tags.length).toBeGreaterThan(0);
    expect(p.description.length).toBeGreaterThan(80);
    expect(p.description_zh.length).toBeGreaterThan(40);
  });
});
