const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true }
}, { 
    timestamps: true 
});

const UserModel = mongoose.model('usuarios', UserSchema);

module.exports = { UserModel };