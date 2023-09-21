const Movie = require('../models/movie');
const BadRequestError = require('../errors/bad-request');
const ForbiddenError = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found-error');

const {
  STATUS_CREATED,
  FORBITTEN_MESSAGE,
  MOVIE_FOUND_MESSAGE,
} = require('../constants');

module.exports.getMovies = (req, res, next) => {
  const userId = req.user._id;

  return Movie.find({ owner: userId })
    .then((movies) => {
      res.send(movies);
    })
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
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const userId = req.user._id;

  Movie.create(
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: userId,
    },
  )
    .then((movie) => res.status(STATUS_CREATED).send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Некорректные данные для сохранения фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.params;
  const currentUserId = req.user._id;

  return Movie.findOne({ movieId: _id, owner: currentUserId })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(MOVIE_FOUND_MESSAGE);
      }
      if (movie.owner.toString() !== currentUserId) {
        throw new ForbiddenError(FORBITTEN_MESSAGE);
      }
      return Movie.deleteOne(movie);
    })
    .then((movie) => res.send({ movie }))
    .catch(next);
};
