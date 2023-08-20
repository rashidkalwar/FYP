const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongo = undefined;

module.exports.setUp = async () => {
  mongo = await MongoMemoryServer.create();
  const url = mongo.getUri();

  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Drop the database and database connection
module.exports.dropDatabase = async () => {
  if (mongo) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongo.stop();
  }
};

//Remove all the data for all the db collections
module.exports.dropCollections = async () => {
  if (mongo) {
    const collections = mongoose.connection.collections;

    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  }
};
