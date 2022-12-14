const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
})

schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
})

schema.virtual('newsList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Article'
})
schema.virtual('heroList', {
    localField: '_id',
    foreignField: 'categories',
    justOne: false,
    ref: 'Hero'
})

module.exports = mongoose.model('Category', schema)