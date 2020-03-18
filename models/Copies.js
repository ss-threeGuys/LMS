const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const copiesSchema = new Schema({
    bookId : {type : Schema.Types.ObjectId, ref : 'Book', required : true},
    branchId : {type : Schema.Types.ObjectId, ref : 'Branch', required : true},
    noOfCopies : {type : Number, required : true}
})

copiesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Copies', copiesSchema)