const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title : {type : String, required : true},
    authors: [{type : Schema.Types.ObjectId, ref: 'Author'}],
    genres : [{type : Schema.Types.ObjectId, ref: 'Genre'}],
    publisher : {type : Schema.Types.ObjectId, ref : 'Publisher'}
})

bookSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Book', bookSchema);