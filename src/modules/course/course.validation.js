import Joi from 'joi';

export const createCourseSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).required().messages({
    'string.base': 'Title must be a string',
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title must be at most 200 characters',
  }),
  description: Joi.string().trim().min(10).required().messages({
    'string.base': 'Description must be a string',
    'string.empty': 'Description is required',
    'string.min': 'Description must be at least 10 characters',
  }),
  image: Joi.string().optional().allow(''),
  startDate: Joi.date().optional().allow(null),
  endDate: Joi.date().optional().allow(null),
  price: Joi.number().min(0).required().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price cannot be negative',
    'any.required': 'Price is required',
  }),
});

export const updateCourseSchema = Joi.object({
  title: Joi.string().trim().min(3).max(200).optional().messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters',
    'string.max': 'Title must be at most 200 characters',
  }),
  description: Joi.string().trim().min(10).optional().messages({
    'string.base': 'Description must be a string',
    'string.min': 'Description must be at least 10 characters',
  }),
  image: Joi.string().optional().allow(''),
  startDate: Joi.date().optional().allow(null),
  endDate: Joi.date().optional().allow(null),
  price: Joi.number().min(0).optional().messages({
    'number.base': 'Price must be a number',
    'number.min': 'Price cannot be negative',
  }),
});

export const getCourseParamsSchema = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    'string.length': 'Invalid course ID',
    'string.hex': 'Invalid course ID',
    'any.required': 'Course ID is required',
  }),
});

export const getCoursesSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
  sort: Joi.string().optional(),
  fields: Joi.string().optional(),
});

export const deleteCourseSchema = Joi.object({
  id: Joi.string().length(24).hex().required().messages({
    'string.length': 'Invalid course ID',
    'string.hex': 'Invalid course ID',
    'any.required': 'Course ID is required',
  }),
});
