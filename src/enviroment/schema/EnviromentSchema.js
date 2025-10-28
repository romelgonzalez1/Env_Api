const mongoose = require('mongoose');
const { Schema } = mongoose;

const VariableSchema = new Schema({
    name: { type: String, required: true, trim: true },
    value: { type: String, required: true },
    description: { type: String, required: false },
    is_sensitive: { type: Boolean, default: false }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } 
});

const EnviromentSchema = new Schema({
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, required: false },
    variables: [VariableSchema] 
}, {
    timestamps: true 
});

const EnviromentModel = mongoose.model('envs', EnviromentSchema);

module.exports = { EnviromentModel };