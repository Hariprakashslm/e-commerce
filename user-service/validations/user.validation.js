const Joi = require('joi');

const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.userLoginSchema = userLoginSchema;

const userSignupSchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Name must be a text',
    'string.empty': 'Name is required',
    'string.min': 'Name should be at least 3 characters',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required',
  }),

  email: Joi.string().email().required().messages({
    'string.email': 'Enter a valid email',
    'string.empty': 'Email is required',
    'any.required': 'Email is required',
  }),

  password: Joi.string()
    .min(8)
    .max(32)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$'))
    .required()
    .messages({
      'string.empty': 'Password is required',
      'string.min': 'Password must be at least 8 characters',
      'string.pattern.base':
        'Password must contain uppercase, lowercase and a number',
      'any.required': 'Password is required',
    }),
});

module.exports.userSignupSchema = userSignupSchema;
