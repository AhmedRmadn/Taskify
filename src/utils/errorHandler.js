module.exports = (err, req, res, next) => {

  // Sequelize validation
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({
      message: 'Validation error',
      errors: err.errors.map(e => e.message),
    });
  }

  // Other known errors you may add later...

  console.error(err);
  return res.status(500).json({
    message: 'Internal server error'
  });
};
