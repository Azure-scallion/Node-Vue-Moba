const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    avatar: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    scores: {
        difficult: { type: Number },
        skills: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills: [{
        icon: { type: String },
        name: { type: String },
        description: { type: String },
        tips: { type: String },
    }],
    items1: {
        sugges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
        tips: { type: String }
    },
    items2: {
        sugges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item' }],
        tips: { type: String }
    },
    partners: [{
        hero: { type: mongoose.Schema.Types.ObjectId, ref: 'Hero' },
        description: { type: String }
    }],
    skins: [{
        icon: { type: String },
        pic: { type: String },
        name: { type: String }
    }]
})

module.exports = mongoose.model('Hero', schema)  //避免Hero集群名被默认为heros，故在此特别指定为heroes