const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name : {type : String, required : true},
  })
  
genreSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Genre', genreSchema);