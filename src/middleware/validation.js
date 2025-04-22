import AppError from '../utils/appError.js';

export const validateRequest =
  (schema, source = 'body') =>
  (req, res, next) => {
    const data = req[source];
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      allowUnknown: true,
    });

    if (error) {
      const message = error.details.map(detail => detail.message).join(', ');
      return next(new AppError(message, 400));
    }

    req[source] = value;
    next();
  };
