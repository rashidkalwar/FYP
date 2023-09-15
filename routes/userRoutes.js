const express = require('express');
const userController = require('../controllers/userController');
const {
  registerValidator,
  loginValidator,
} = require('../validators/userValidators');

const router = express.Router();

router.post('/register', registerValidator, userController.register);
router.post('/login', loginValidator, userController.login);
// Google OAuth routes
router.post('/google', userController.googleLogin);

module.exports = router;
