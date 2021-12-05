const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
    // id: {
    //     type: Number,
    //     required: true,
    // },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
    },
    favorite: {
        type: String,
    },
    fileCover: {
        type: String,
    },
    fileName: {
        type: String,
    },
    imgBook: {
        type: String,
    },
    fileBook: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
});

module.exports = model('Book', bookSchema);