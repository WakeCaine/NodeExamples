var mongoose = require('mongoose');
Schema = mongoose.Schema;
var ReplySchema = new Schema()
ReplySchema.add({
  username: String,
  subject: String,
  timestamp: { type: Date, default: Date.now },
  body: String,
  replies: [ReplySchema]
});
var CommentThreadSchema = new Schema({
  title: String,
  replies: [ReplySchema]
});
mongoose.model('Reply', ReplySchema);
mongoose.model('CommentThread', CommentThreadSchema);
