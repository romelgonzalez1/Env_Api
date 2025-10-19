const mongoose = require('mongoose');
const { Schema } = mongoose;

const EnviromentSchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: false }
}, { 
    timestamps: true 
});

const EnviromentModel = mongoose.model('envs', EnviromentSchema);

module.exports = { EnviromentModel };