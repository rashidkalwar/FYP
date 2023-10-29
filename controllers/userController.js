const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const axios = require('axios');
const generator = require('generate-password');

const config = require('../config/keys');
const User = require('../models/user');

function generateToken({ userId, userName }) {
  const token = jwt.sign(
    {
      userId: userId,
      userName: userName,
    },
    config.jwtSecret,
    {
      expiresIn: config.jwtExpire,
    }
  );
  return token;
}

exports.googleLogin = async (req, res) => {
  // gogole-auth
  const { googleAccessToken } = req.body;

  axios
    .get('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${googleAccessToken}`,
      },
    })
    .then(async (response) => {
      const username = `${
        response.data.given_name +
        response.data.family_name +
        response.data.sub.toString().slice(0, 5)
      }`;

      let existingUser = await User.findOne({ username: username });

      if (!existingUser) {
        const newUser = new User({
          username: username,
          password: generator.generate({
            length: 15,
            numbers: true,
            symbols: true,
          }),
          email: response.data.email,
          profile: {
            firstName: response.data.given_name,
            lastName: response.data.family_name,
            avatar: response.data.picture,
          },
          google: {
            id: response.data.sub,
            token: googleAccessToken,
            email: response.data.email,
            name: response.data.name,
          },
          verified: response.data.email_verified,
        });

        existingUser = await newUser.save();
      }

      const token = generateToken({
        userId: existingUser._id,
        userName: existingUser.username,
      });

      res.status(201).send({
        message: 'Logged in Successfully',
        userId: existingUser._id,
        accessToken: token,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ err, error: { message: 'Server Error!' } });
    });
};

exports.register = async (request, response) => {
  const error = validationResult(request).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  const ifEmailAlreadyExists = await User.findOne({
    email: request.body.email,
  });
  const ifUsernameAlreadyExists = await User.findOne({
    username: request.body.username,
  });

  if (hasError) {
    return response.status(422).json({ error: error.mapped() });
  } else if (ifUsernameAlreadyExists) {
    return response.status(422).json({
      error: { username: 'Username aleady exists.' },
    });
  } else if (ifEmailAlreadyExists) {
    return response.status(422).json({
      error: { email: 'Email aleady in use.' },
    });
  } else {
    const user = new User({
      username: request.body.username,
      email: request.body.email,
      password: request.body.password,
    });

    await user
      .save()
      .then((result) => {
        const token = generateToken({
          userId: result._id,
          userName: result.username,
        });

        response.status(201).send({
          message: 'User Created Successfully',
          userId: result._id,
          accessToken: token,
        });
      })
      .catch((err) => {
        response.status(500).send({
          error: { ...error.mapped(), ...err, message: 'Error creating user' },
        });
      });
  }
};

exports.login = async (request, response) => {
  const error = validationResult(request).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  const findUser = await User.findOne({
    username: request.body.username,
  });

  if (hasError) {
    response.status(422).json({ error: error.mapped() });
  } else if (findUser) {
    const checkPassword = await findUser.comparePassword(request.body.password);

    if (checkPassword) {
      const token = generateToken({
        userId: findUser._id,
        userName: findUser.username,
      });

      response.status(200).send({
        message: 'Logged in Successfully',
        userId: findUser._id,
        accessToken: token,
      });
    } else {
      response.status(422).json({ error: { password: 'Incorrect password.' } });
    }
  } else {
    response
      .status(422)
      .json({ error: { username: 'Username is not registered.' } });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(400).json({ message: 'User not found' });
    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};
