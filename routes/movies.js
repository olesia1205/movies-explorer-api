const express = require('express');

const router = express.Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateCreateMovie, validateMovieId } = require('../utils/requestValidation');

router.get('/', getMovies);
router.post('/', express.json(), validateCreateMovie, createMovie);
router.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = router;
