const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
    name : {type : String, required : true},
    address : String,
    phone : String
})

publisherSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Publisher', publisherSchema);