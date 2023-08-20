const mongoose = require('mongoose');
const User = require('./user');
const db = require('../utils/db');

const userData = {
  username: 'GipsyDanger',
  password: 'Secret11223',
  email: { address: 'niceemail1122@gmail.com' },
  profile: {
    firstName: 'Gipsy',
    lastName: 'Danger',
    avatar: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    bio: 'Hello I am a mock User I do not exist.',
    address: {
      street1: 'Some where 1122 in street 2',
      street2: 'Some where 2211 in street 1',
      city: 'Unknown',
      state: 'Undisclosed',
      country: 'United States of NoWhere',
      zip: '13982',
    },
  },
};

beforeAll(async () => {
  await db.setUp();
});

afterEach(async () => {
  await db.dropCollections();
});

afterAll(async () => {
  await db.dropDatabase();
});

/**
 * User model
 */
describe('User model', () => {
  it('create & save user successfully', async () => {
    const validUser = new User(userData);
    const savedUser = await validUser.save();
    // Object Id should be automatically defined when successfully saved to MongoDB.
    expect(savedUser._id).toBeDefined();
    expect(savedUser.email.address).toBe(userData.email.address);
  });

  //Shouldn't be able to add in any field that isn't defined in the schema
  it('insert user successfully', async () => {
    const userWithInvalidField = new User({
      ...userData,
      nickname: 'Kaijoo Killer',
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.nickname).toBeUndefined();
  });

  //it should tell us the errors in on email or username field.
  it('create user without required fields', async () => {
    const userWithoutRequiredFields = new User({
      password: userData.password,
      profile: userData.profile,
    });
    let err;
    try {
      const savedUserWithoutRequiredFields =
        await userWithoutRequiredFields.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.username).toBeDefined();
    expect(err.errors.email).toBeDefined();
  });
});
