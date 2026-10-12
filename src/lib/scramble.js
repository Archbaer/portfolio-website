const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%&*<>/';

// progress 0..1 → string with the first floor(progress * len) chars settled,
// the rest random alphanumeric noise
export function scrambleFrame(target, progress, rand = Math.random) {
  const settled = Math.floor(progress * target.length);
  let out = target.slice(0, settled);
  for (let i = settled; i < target.length; i++) {
    const c = target[i];
    out += c === ' ' ? ' ' : CHARS[Math.floor(rand() * CHARS.length)];
  }
  return out;
}
