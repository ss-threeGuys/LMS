const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title : {type : String, required : true},
    authors: [{type : Schema.Types.ObjectId, ref: 'Author'}],
    genres : [{type : Schema.Types.ObjectId, ref: 'Genre'}],
    publisher : {type : Schema.Types.ObjectId, ref : 'Publisher'}
})

module.exports = mongoose.model('Book', bookSchema);