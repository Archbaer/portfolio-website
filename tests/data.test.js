import { describe, it, expect } from 'vitest';
import projects from '../src/lib/data/projects.json';

describe('projects.json', () => {
  it('has 6 projects with unique slugs', () => {
    expect(projects).toHaveLength(6);
    expect(new Set(projects.map((p) => p.slug)).size).toBe(6);
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
    expect(p.tags.length).toBeGreaterThan(0);
    expect(p.description.length).toBeGreaterThan(80);
  });
});
