const userModel = require('../models/user');
const {
  OK,
  DocNotFound,
  ValErr,
} = require('../statusServerName');
const NotFound = require('../errors/not-found-err');
const BadRequest = require('../errors/bad-requiest');

const getUserInfo = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { email, name } = req.body;
  userModel
    .findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .orFail()
    .then((user) => res.status(OK).send(user))
    .catch((err) => {
      if (err.name === ValErr) {
        next(new BadRequest('Переданы некорректные данные при создании пользователя'));
        return;
      }
      if (err.name === DocNotFound) {
        next(new NotFound('Пользователь не найден или _id пользователя некорректен'));
        return;
      }
      next(err);
    });
};

module.exports = {
  getUserInfo,
  updateUserInfo,
};
