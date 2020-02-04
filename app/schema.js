const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const num = new Schema({
    num: {
        type: Number,
        required: [true, 'num es necesario']
    }
});

module.exports = mongoose.model('Number', num);