const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const borrowerSchema = new Schema({
    name : {type : String, required : true},
    address : String,
    phone : String
})

module.exports = mongoose.model('Borrower', borrowerSchema);