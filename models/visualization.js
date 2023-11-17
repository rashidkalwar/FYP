const mongoose = require('mongoose');

const visualizationSchema = new mongoose.Schema(
  {
    uniqueId: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dataset: {
      type: String,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Dataset',
      required: true,
    },
    title: String,
    description: String,
    chartType: String,
    plotColumns: [
      {
        type: String,
      },
    ],
    xAxisColumn: String,
    yAxisColumn: String,
    isPublic: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const visualizationModel = new mongoose.model(
  'Visualization',
  visualizationSchema
);
module.exports = visualizationModel;
