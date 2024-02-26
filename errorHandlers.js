// errorHandlers.js

// Catch-all error handler middleware
exports.catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next);
  };
};

// Not found error handler middleware
exports.notFound = (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

// Development error handler middleware
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  res.status(err.status || 500).json(errorDetails);
};

// Production error handler middleware
exports.productionErrors = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: 'Internal Server Error'
  });
};
