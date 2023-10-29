const express = require('express');
const userController = require('../controllers/userController');
const {
  registerValidator,
  loginValidator,
} = require('../validators/userValidators');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.post('/register', registerValidator, userController.register);
router.post('/login', loginValidator, userController.login);
// Google OAuth routes
router.post('/google', userController.googleLogin);
// Get authenicated user's data
router.get('/me', verifyToken, userController.getUserProfile);

module.exports = router;
