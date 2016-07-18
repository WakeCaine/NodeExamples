var mongoose = require('mongoose'),
  CommentThread = mongoose.model('CommentThread'),
  Reply = mongoose.model('Reply');
exports.getComment = function( req, res) {
  CommentThread.findOne({ _id: req.query.commentId}).
    exec(function(err, comment) {
      if(!comment){
        res.status(404).json({ msg: 'Nie znaleziono modelu CommentThread.'});
      } else {
        res.json(comment);
      }
    })
}
exports.addComment = function(req, res) {
  CommentThread.findOne({ _id: req.body.rootCommentId }).
  exec(function(err, commentThread) {
    if(!commentThread){
      res.status(404).json({ msg: 'Nie znaleziono modelu CommentThread.'});
    } else {
      var newComment = Reply(req.body.newComment);
      newComment.username = generateRandomUsername();
      addComment(req, res, commentThread, commentThread, req.body.parentCommentId, newComment);
    }
  });
};
function addComment(req, res, commentThread, currentComment, parentId, newComment, parentId, newComment) {
  if(commentThread == parentId){
    commentThread.replies.push(newComment);
    updateCommentThread(req, res, commentThread);
  } else {
    for(var i=0; i < currentComment.replies.length; i++){
      var c = currentComment.replies[i];
      if(c._id == parentId){
        c.replies.push(newComment);
        var replyThread = commentThread.replies.toObject();
        updateCommentThread(req, res, commentThread);
        break;
      } else {
        addComment(req, res, commentThread, c, parentId, newComment);
      }
    }
  }
};
function updateCommentThread(req, res, commentThread) {
  CommentThread.update({ _id: commentThread.id },
                        {$set: {replies:commentThread.replies}}).
    exec(function(err, savedComment) {
      if(err){
        res.status(404).json({ msg: 'Nie zaktualizowano modelu CommentThread.'});
      } else {
        res.json({msg: "Powodzenie"});
      }
    });
};
function generateRandomUsername(){
  var users=['David', 'Karol', 'Bartek', 'Janek', 'Adam', 'Tomek'];
  return users[Math.floor((Math.random()*6))];
};
