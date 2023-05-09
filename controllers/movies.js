const http2 = require('node:http2');
const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const OK = http2.constants.HTTP_STATUS_OK;
const CREATED = http2.constants.HTTP_STATUS_CREATED;

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .populate(['owner'])
    .sort({ createdAt: -1 })
    .then((movies) => res.status(OK).send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user,
  })
    .then((movie) => {
      movie.populate(['owner'])
        .then(() => res.status(CREATED).send(movie));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Произошла ошибка валидации полей'));
        return;
      }
      next(err);
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => new NotFoundError('Movie с указанным _id не найден'))
    .then((movie) => {
      if (`${movie.owner}` !== req.user._id) {
        throw new ForbiddenError('Нет доступа на удаление чужого movie');
      }
      return movie.deleteOne()
        .then(() => res.status(OK).send(movie));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id movie'));
        return;
      }
      next(err);
    });
};
