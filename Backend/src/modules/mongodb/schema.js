// Importing mongoose module
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Defining schema for User
const UserSchema = new mongoose.Schema({
  username: String, // Name of the user
  email: String, // email of the user
  password: String, // password of the user
  refreshToken: Array, // Refresh token
  provider: { type: String, required: true, default: 'email' }
});

// Hashing the password before saving
UserSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

// Creating UserModel using the UserSchema
const UserModel = mongoose.model('users', UserSchema);

// Exporting UserModel and Carmodel for use in other modules
module.exports = { UserModel };
