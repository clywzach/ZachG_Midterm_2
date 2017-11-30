var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
  title: String,
  upvotes: {type: Number, default: 0},
  ballot: String,
  price: String,
  url: String,

});
CandidateSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
mongoose.model('Comments', CandidateSchema);
