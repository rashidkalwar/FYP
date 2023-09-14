const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      index: true,
      minLength: 6,
      maxLength: 25,
    },
    // password is hashed with bcrypt
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
    email: {
      type: String,
      required: true,
      email: true,
    },
    roles: [String],
    profile: {
      firstName: String,
      lastName: String,
      avatar: String,
      bio: String,
      address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        country: String,
        zip: String,
      },
    },
    active: { type: Boolean, default: true },
    verified: { type: Boolean, default: false },
    google: {
      id: String,
      token: String,
      email: String,
      name: String,
    },
  },
  { timestamps: true }
);

UserSchema.pre('save', function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = function (plaintext) {
  return bcrypt.compareSync(plaintext, this.password);
};

module.exports = mongoose.model('User', UserSchema);
