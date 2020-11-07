const { Schema, model } = require('mongoose');

const BandSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: String,
    votes: Number
});

module.exports = model('Band', BandSchema);