var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var postSchema = new Schema({
  title: String,
  body: String,
  timestamp: Date,
  author: String
});

postSchema.statics.findTopTen = function(callback){
  this.find({}).sort({timestamp: -1}).limit(10).exec(callback);
}

exports.postModel = mongoose.model('Post', postSchema);