const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    name : {type : String, required : true},
    address : String,
    phone : String
})

borrowerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Borrower', borrowerSchema);