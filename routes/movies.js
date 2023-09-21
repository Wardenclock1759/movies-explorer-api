const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

const {
  createMovieValidator,
} = require('../validators/movie/createMovie');
const {
  deleteMovieValidation,
} = require('../validators/movie/deleteMovie');

router.get('/', getMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = router;
