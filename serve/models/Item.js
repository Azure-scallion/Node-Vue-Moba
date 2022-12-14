const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
    price: { type: String },
    properties: [{
        value: { type: String }
    }],
    effects: [{
        effect: { type: String }
    }],
})

module.exports = mongoose.model('Item', schema)