const Visualization = require('../models/visualization');

exports.getOne = async (req, res) => {
  return res.status(200).json({ message: 'Get method working' });
};

exports.create = async (req, res) => {
  const userId = req.user.userId;
  return res.status(200).json({ message: 'Create method working' });
};

exports.update = async (req, res) => {
  const userId = req.user.userId;
  return res.status(200).json({ message: 'Update method working' });
};

exports.delete = async (req, res) => {
  const userId = req.user.userId;
  return res.status(200).json({ message: 'Delete method working' });
};
