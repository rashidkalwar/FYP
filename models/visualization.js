const mongoose = require('mongoose');

const visualizationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    dataset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dataset',
      required: true,
    },
    name: String,
    description: String,
    chartType: String,
    selectedColumns: [
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
