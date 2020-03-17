const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name : {type : String, required : true}
})

authorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Author', authorSchema);