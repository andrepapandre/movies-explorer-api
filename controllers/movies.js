const movieShema = require('../models/movie');
const BadRequest = require('../errors/bad-requiest')
const {
  OK,
} = require('../statusServerName');

const getMoviesOwner = (req, res, next) => {

  movieShema
    .find({ owner: req.user._id})
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
      if (err.name === 'CastError') {
        next(new BadRequest('Некоректный id'));
        return;
      }
      next(err);
    });
};

const createMovie = (req, res, next) => {
  console.log(req);
  const owner = req.user
  const {
    country, director, duration, year,
    description, image, trailerLink, thumbnail, movieId, nameRU, nameEN
  } = req.body;
  movieShema.create({
    country, director, duration, year,
    description, image, trailerLink, thumbnail, owner, movieId,
    nameRU, nameEN
  })
    .then((card) => card.populate('owner'))
    .then((card) => res.status(201).send(card))
    .catch((err) => next(err));
};



module.exports = {
  getMoviesOwner,
  deleteMoviebyId,
  createMovie,
};
