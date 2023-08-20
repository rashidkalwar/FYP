const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const Email = new Schema({
  address: {
    type: String,
    lowercase: true,
    required: [true, "can't be blank"],
    match: [/\S+@\S+\.\S+/, 'is invalid'],
    index: true,
    validate: [isEmail, 'Please enter a valid email address'],
  },
  verified: { type: Boolean, default: false },
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
      index: true,
    },
    // password is hashed with bcrypt
    password: {
      type: String,
      required: true,
      minlength: [6, 'Minimum password length must be 6 characters'],
    },
    email: { type: Email, required: true },
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

UserSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model('User', UserSchema);
