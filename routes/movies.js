const router = require('express').Router();
const moviesController = require('../controllers/movies');

const isValid = require('../middlewares/validation');

router.get('/', moviesController.getMoviesOwner);
router.post('/', isValid.newMovieValid, moviesController.createMovie);
router.delete('/:movieid', isValid.deleteMovieValid, moviesController.deleteMoviebyId);

module.exports = router;
