const router = require('express').Router();
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const auth = require('../middlewares/authorization');
const authorization = require('../controllers/authorization');
const NotFoundError = require('../errors/not-found-err');

const isValid = require('../middlewares/validation');

router.post('/signup', isValid.createUserValid, authorization.createUser);
router.post('/signin', isValid.loginUserValid, authorization.loginUser);

router.use(auth);

router.use('/users', userRoutes);
router.use('/movies', movieRoutes);

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемая страница не существует'));
});

module.exports = router;
