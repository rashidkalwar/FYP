const Visualization = require('../models/visualization');

exports.getOne = async (req, res) => {
  return res.status(200).json({ message: 'Get method working' });
};

exports.create = async (req, res) => {
  const userId = req.user.userId;
  const datasetId = req.body.datasetId;
  const name = req.body.name;
  const description = req.body.description;

  const visualization = new Visualization({
    userId: userId,
    datasetId: datasetId,
    name: name,
    description: description,
  });

  await visualization
    .save()
    .then(() => {})
    .catch((err) =>
      res.status(500).send({
        ...err,
        error: {
          message: 'Error creating Visualization',
        },
      })
    );

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
