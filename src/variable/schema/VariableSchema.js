const mongoose = require('mongoose');
const { Schema } = mongoose;

const VariableSchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    value: { type: String, required: true },
    description: { type: String, required: false },
    env_name: { type: String, ref: 'env', required: true }
}, { 
    timestamps: true 
});

const VariableModel = mongoose.model('variables', VariableSchema);

module.exports = { VariableModel };