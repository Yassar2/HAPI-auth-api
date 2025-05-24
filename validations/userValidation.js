const Joi = require('@hapi/joi');

const updateUserSchema = Joi.object({
  nama: Joi.string().min(3).max(100),
  email: Joi.string().email(),
  password: Joi.string().min(6),
  role: Joi.string().valid('user', 'admin')
});

module.exports = {
  updateUserSchema
};
