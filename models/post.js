const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const PostSchema = mongoose.Schema({
    title: String,
    url: {
        type: String,
        unique: true
    },
    description: String,
    date: Date
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);