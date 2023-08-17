const mongoose = require('mongoose');
const config = require('./keys');

const connectDB = async () => {
  const options = {
    useNewURlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose
    .connect(config.mongoURI, options)
    .then(() => console.log('Database is Connected...'))
    .catch((err) => console.log(err));
};

module.exports = connectDB;
