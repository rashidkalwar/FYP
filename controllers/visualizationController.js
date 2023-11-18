const Visualization = require('../models/visualization');

exports.getOne = async (req, res) => {
  return res.status(200).json({ message: 'Get method working' });
};

exports.getMany = async (req, res) => {
  const userId = req.user.userId;
  try {
    const visualizations = await Visualization.find({ user: userId }).select(
      'uniqueId title description chartType dataset createdAt updatedAt'
    );
    return res.status(200).json(visualizations);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

exports.create = async (req, res) => {
  const userId = req.user.userId;
  const {
    dataset,
    title,
    description,
    chartType,
    plotColumns,
    xAxisColumn,
    yAxisColumn,
  } = req.body;
  const uniqueId =
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  const visualization = new Visualization({
    uniqueId: uniqueId,
    user: userId,
    dataset: dataset,
    title: title,
    description: description,
    chartType: chartType,
    plotColumns: plotColumns,
    xAxisColumn: xAxisColumn,
    yAxisColumn: yAxisColumn,
  });

  await visualization
    .save()
    .then((result) => {
      console.log(result);
      const payload = {
        ...result._doc,
        visualizationId: result._id,
        message: 'Visualization created Successfully',
      };
      res.status(201).send(payload);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        ...err,
        error: {
          message: 'Error creating Visualization',
        },
      });
    });
};

exports.update = async (req, res) => {
  const userId = req.user.userId;
  return res.status(200).json({ message: 'Update method working' });
};

exports.delete = async (req, res) => {
  const userId = req.user.userId;
  return res.status(200).json({ message: 'Delete method working' });
};
