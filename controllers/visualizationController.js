const Visualization = require('../models/visualization');

exports.getOne = async (req, res) => {
  const userId = req.user.userId;
  const uniqueId = req.params.id;
  try {
    const visualization = await Visualization.findOne({
      user: userId,
      uniqueId: uniqueId,
    });
    return res.status(200).json(visualization);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
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
      const payload = {
        ...result._doc,
        visualizationId: result._id,
        message: 'Visualization created Successfully',
      };
      res.status(201).send(payload);
    })
    .catch((err) => {
      res.status(500).send({
        ...err,
        error: {
          message: 'Error creating Visualization',
        },
      });
    });
};

exports.delete = async (req, res) => {
  const userId = req.user.userId;
  const uniqueId = req.params.id;

  existingVisualization = await Visualization.findOne({
    user: userId,
    uniqueId: uniqueId,
  });

  if (existingVisualization) {
    try {
      await Visualization.deleteOne({ user: userId, uniqueId: uniqueId });
      return res
        .status(200)
        .json({ message: 'Visualization deleted successfully' });
    } catch (err) {
      return res.status(500).json({ error: { message: err.message } });
    }
  } else {
    return res
      .status(400)
      .json({ error: { message: 'Visualization does not exist' } });
  }
};

exports.update = async (req, res) => {
  const userId = req.user.userId;
  return res.status(200).json({ message: 'Update method working' });
};

exports.getAllUniqueIds = async (req, res) => {
  try {
    const uniqueIds = await Visualization.find().select('uniqueId');
    return res.status(200).json(uniqueIds);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};

exports.getEach = async (req, res) => {
  const uniqueId = req.params.id;
  try {
    const visualization = await Visualization.findOne({ uniqueId: uniqueId });
    return res.status(200).json(visualization);
  } catch (err) {
    return res.status(500).json({ error: { message: err.message } });
  }
};
