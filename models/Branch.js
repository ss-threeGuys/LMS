const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const branchSchema = new Schema({
    branchName : {type : String, required : true},
    branchAddress : String
})

branchSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Branch', branchSchema);