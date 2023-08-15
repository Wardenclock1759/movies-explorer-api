const router = require('express').Router();
const {
  getCurrentUser, updateUser,
} = require('../controllers/users');
const {
  updateUserValidator,
} = require('../validators/user/updateUser');

router.get('/', getCurrentUser);
router.patch('/', updateUserValidator, updateUser);

module.exports = router;
