const router = require('express').Router();
const auth = require('../middlewares/auth');
const {
  login, createUser, logout,
} = require('../controllers/users');
const {
  signupValidation,
} = require('../validators/user/userSignup');
const {
  signinValidation,
} = require('../validators/user/userSignin');

const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signup', signupValidation, createUser);
router.post('/signin', signinValidation, login);

router.use(auth);

router.get('/logout', logout);

router.use('/users/me', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
