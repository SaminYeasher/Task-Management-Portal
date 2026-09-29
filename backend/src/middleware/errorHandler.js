function errorHandler(err, req, res, _next) {

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      error: 'Malformed JSON in request body',
    });
  }
  // Log unexpected errors
  console.error('Unhandled error:', err.message || err);
  res.status(500).json({
    error: 'Internal server error',
  });
}
module.exports = { errorHandler };
