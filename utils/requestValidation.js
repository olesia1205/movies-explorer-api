const { celebrate, Joi } = require('celebrate');

const urlRegExp = /^https?:\/\/(www.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*#?$/;

module.exports.validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message('Поле "email" должно быть валидным'),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'string.empty': 'Поле "name" должно быть заполнено',
      }),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({ 'any.only': 'Поле country должно быть заполнено' }),
    director: Joi.string().required().messages({ 'any.only': 'Поле director должно быть заполнено' }),
    duration: Joi.number().required().messages({ 'any.only': 'Поле duration должно быть заполнено' }),
    year: Joi.string().required().messages({ 'any.only': 'Поле year должно быть заполнено' }),
    description: Joi.string().required().messages({ 'any.only': 'Поле description должно быть заполнено' }),
    image: Joi.string().required().pattern(urlRegExp)
      .message('Поле image должно быть валидным url-адресом')
      .messages({ 'string.empty': 'Поле image должно быть заполнено' }),
    trailerLink: Joi.string().required().pattern(urlRegExp)
      .message('Поле trailerLink должно быть валидным url-адресом')
      .messages({ 'string.empty': 'Поле trailerLink должно быть заполнено' }),
    thumbnail: Joi.string().required().pattern(urlRegExp)
      .message('Поле thumbnail должно быть валидным url-адресом')
      .messages({ 'string.empty': 'Поле thumbnail должно быть заполнено' }),
    movieId: Joi.number().required().messages({ 'any.only': 'Поле movieId должно быть заполнено' }),
    nameRU: Joi.string().required().messages({ 'any.only': 'Поле nameRU должно быть заполнено' }),
    nameEN: Joi.string().required().messages({ 'any.only': 'Поле nameEN должно быть заполнено' }),
  }),
});

module.exports.validateMovieId = celebrate({
  params: Joi.object().keys({ movieId: Joi.string().required().hex().length(24) }),
});
