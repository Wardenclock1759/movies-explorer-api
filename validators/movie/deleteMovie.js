const { celebrate, Joi } = require('celebrate');

module.exports.deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.number().required(),
  }),
});
