const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const branchSchema = new Schema({
    branchName : {type : String, required : true},
    branchAddress : String
})

module.exports = mongoose.model('Branch', branchSchema);