const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const loanSchema = new Schema({
    bookId : {type : Schema.Types.ObjectId, ref : 'Book', required : true},
    branchId : {type : Schema.Types.ObjectId, ref : 'Branch', required : true},
    borrowerId : {type : Schema.Types.ObjectId, ref : 'Borrower', required : true},
    dueDate : Date,
    dateIn : Date,
    dateOut : Date
})

loanSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Loan', loanSchema)