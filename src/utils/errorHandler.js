module.exports = (err, req, res, next) => {

  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map(e => e.message),
    });
  }

  console.error(err);
  return res.status(500).json({
    message: 'Internal server error'
  });
};
