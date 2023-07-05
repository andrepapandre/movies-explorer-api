const router = require('express').Router();

const usersController = require('../controllers/users');

const isValid = require('../middlewares/validation');

router.get('/me', usersController.getUserInfo);
router.patch('/me', isValid.updateProfileValid, usersController.updateUserInfo);

module.exports = router;
