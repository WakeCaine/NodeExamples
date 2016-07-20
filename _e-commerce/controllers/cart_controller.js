exports.addToCart = function(req, res) {
  console.log(req.body);
  var found = false;
  for(var i=0; i< req.session.customer.cart.length; i++){
    var item = req.customer.cart[i];
    if (req.session.item.product[0]._id == req.body.customer.cart.productId){
      item.quantity += 1;
      found = true;
    }
  }
  if (!found){
    $scope.customer.cart.push({quantity: 1,
                               product: [this.product]});
  }

  User.findOne({ username: req.body.customer }).
    exec(function(err, user) {
      var passerror = '';
      var usererror = '';
      if(!user){
        usererror = 'Nie znaleziono uzytkownika.';
      } else if (user.hashed_password === hashPW(req.body.password.toString())) {
        req.session.regenerate(function() {
          req.session.logged = true;
          req.session.user = user.id;
          req.session.username = user.username;
          req.session.msg = 'Uwierzetelniono jako ' + user.username;
          res.redirect('/');
        });
      } else {
        passerror = "Uwierzetelnianie nie powiodło się.";
      }
      if(passerror != '' || usererror != ''){
        req.session.regenerate(function() {
          req.session.msg = err;
          console.log('Error?');
          res.status(404).json({errors: { username: usererror, password: passerror}});
        });
      }
    });
};
