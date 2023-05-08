const express = require('express');

const router = express.Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);
router.post('/', express.json(), createMovie);
router.delete('/:movieId', deleteMovie);

module.exports = router;
