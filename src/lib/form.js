export const LIMITS = { name: 100, email: 254, message: 5000 };

/**
 * Strip control chars (keeps \n and \t), trim, cap length.
 * @param {unknown} text
 * @param {number} max
 * @returns {string}
 */
export function sanitize(text, max) {
  return String(text ?? '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, max);
}

/**
 * @param {unknown} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return (
    typeof email === 'string' &&
    email.length <= LIMITS.email &&
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}$/.test(email)
  );
}

/**
 * Expects already-sanitized values; returns human-readable errors.
 * @param {{ name: string, email: string, message: string }} fields
 * @returns {string[]}
 */
export function validateForm({ name, email, message }) {
  const errors = [];
  if (!name) errors.push('name is required');
  if (!isValidEmail(email)) errors.push('valid email is required');
  if (!message) errors.push('message is required');
  return errors;
}
