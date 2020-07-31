const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CoruseSchema = Schema({
    idCourse: {
        type: Number,
        unique: true,
        require: true
    },
    link: String,
    cuopon: String,
    price: Number,
    order: Number
});

module.exports = mongoose.model('Course', CoruseSchema);