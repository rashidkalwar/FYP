const mongoose = require('mongoose');
var URLSlug = require('mongoose-slug-generator');

mongoose.plugin(URLSlug);

const datasetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: { type: String, required: true, unique: true },
    slug: { type: String, slug: 'title' },
    description: String,
    data: [Object],
  },
  { timestamps: true }
);

datasetSchema.pre('save', function (next) {
  this.slug = this.title.split(' ').join('-');
  next();
});

const datasetModel = new mongoose.model('Dataset', datasetSchema);

module.exports = datasetModel;
