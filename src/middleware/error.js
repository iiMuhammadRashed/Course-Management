const handleCastErrorDB = err => ({
  status: 'fail',
  statusCode: 400,
  message: `Invalid ${err.path}: ${err.value}`,
});

const handleValidationErrorDB = err => ({
  status: 'fail',
  statusCode: 400,
  message: Object.values(err.errors)
    .map(el => el.message)
    .join('. '),
});

const handleDuplicateFieldsDB = err => ({
  status: 'fail',
  statusCode: 400,
  message: `Duplicate field value: ${Object.values(err.keyValue)[0]}`,
});

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }
};

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (err.name === 'CastError') error = handleCastErrorDB(err);
    if (err.name === 'ValidationError') error = handleValidationErrorDB(err);
    if (err.code === 11000) error = handleDuplicateFieldsDB(err);

    sendErrorProd(error, res);
  }
};
