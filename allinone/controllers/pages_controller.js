var mongoose = require('mongoose');
Page = mongoose.model('Page');
exports.getPage = function(req, res) {
  Page.findOne({ name: req.query.pageName }).
    exec(function(err, page) {
      if(!page){
        res.status(404).json({ msg: 'Nie znaleziono strony.'});
      } else {
        res.json(page);
      }
    });
};
