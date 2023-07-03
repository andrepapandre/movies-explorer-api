const mongoose = require('mongoose');
const validator = require('validator');

const movie = mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: '',
    validate: {
      validator: (image) => validator.isURL(image),
      message: 'Некорректный адрес URL',
    },
  },
  trailerLink: {
    type: String,
    validate: {
      validator: (trailerLink) => validator.isURL(trailerLink),
      message: 'Некорректный адрес URL',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator: (thumbnail) => validator.isURL(thumbnail),
      message: 'Некорректный адрес URL',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true
  },
  nameEN: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('movie', movie);
