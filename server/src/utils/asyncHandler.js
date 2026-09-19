/**
 * Wraps asynchronous route handlers and forwards any rejected promises to the Next error middleware
 * @param {Function} fn
 */
export const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
