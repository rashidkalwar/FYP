const { check } = require('express-validator');

const registerValidator = [
  check('username')
    .not()
    .isEmpty()
    .withMessage('Username is required!')
    .trim()
    .escape()
    .isLength({ min: 6, max: 25 })
    .withMessage('Username must be 6 to 20 characters!')
    .matches(/^[-\w\.\$@\*\!]{1,30}$/)
    .withMessage('Invalid username')
    .bail(),
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email is required!')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Invalid email address')
    .bail(),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password is required!')
    .isLength({ min: 8, max: 20 })
    .withMessage('Password must be 8 to 20 characters!')
    .matches(/\d/)
    .withMessage('Password must have at least one number!')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must have at least one special character'),
];

const loginValidator = [
  check('username')
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage('Username is required!'),
  check('password').not().isEmpty().withMessage('Password is required!'),
];

module.exports = { registerValidator, loginValidator };
