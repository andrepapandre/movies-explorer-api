const movieShema = require('../models/movie');
const BadRequest = require('../errors/bad-requiest');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbitten-err');

const {
  OK, DocNotFound,
} = require('../statusServerName');

const getMoviesOwner = (req, res, next) => {
  movieShema
    .find({ owner: req.user._id })
    .populate(['owner'])
    .then((movies) => {
      res.send({ movies });
    })
    .catch((err) => next(err));
};

const deleteMoviebyId = (req, res, next) => {
  movieShema
    .findById(req.params.movieid)
    .orFail()
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Такого фильма нет');
      }
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нет прав доступа');
      }
      return movieShema.findByIdAndRemove(req.params.movieid).then(() => {
        res.status(OK).send({ message: 'Фильм успешно удален' });
      });
    })
    .catch((err) => {
      if (err.name === DocNotFound) {
        next(new NotFoundError('Некоректный id'));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequest('Некоректный id'));
        return;
      }
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const owner = req.user;
  const {
    country, director, duration, year,
    description, image, trailerLink, thumbnail, movieId, nameRU, nameEN,
  } = req.body;
  movieShema.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => movie.populate('owner'))
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Валидация полей не прошла'));
      }
    });
};

module.exports = {
  getMoviesOwner,
  deleteMoviebyId,
  createMovie,
};
