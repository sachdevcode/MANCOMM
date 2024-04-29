const mongoose = require("mongoose")
const { Schema, model } = mongoose
const dataSchema = new Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Please provide your title'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
        index: true,
    },
    type: {
        type: String,
        required: [true, 'type is required'],
        select: false,
    },
    content: {
        type: String,
        required: [true, 'content is required'],
    },

})

module.exports.data = model('data', dataSchema)