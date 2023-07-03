const { celebrate, Joi } = require('celebrate');
const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');
const BadRequest = require('../errors/bad-requiest');

const validUrl = (url) => {
  const validate = isUrl(url);
  if (validate) {
    return url;
  }
  throw new BadRequest('Некорректный адрес URL');
};

function objectIdValid(value) {
  const isValid = mongoose.isValidObjectId(value);
  if (isValid) return value;
  throw new Error('ID is not valid');
}

const deleteMovieValid = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().custom(objectIdValid),
  }),
});
const updateProfileValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

const movieByIdValid = celebrate({
  params: Joi.object().keys({
    movieid: Joi.string().required().hex().length(24),
  }),
});

const newMovieValid = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validUrl),
    trailerLink: Joi.string().required().custom(validUrl),
    thumbnail: Joi.string().required().custom(validUrl),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const createUserValid = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2),
  }),
});

const loginUserValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  updateProfileValid,
  movieByIdValid,
  newMovieValid,
  deleteMovieValid,
  createUserValid,
  loginUserValid,
};
