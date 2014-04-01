module.exports = function(app){
  var Model = require('../model')
    , passport = require('passport')
    , Post = Model.Post
    , Account = Model.Account;

  function createResponse(res, payload){
    res.writeHead(200, { 'content-type': 'text/json' });
    res.write( JSON.stringify(payload) );
    res.end('\n');
  }

  //Pass the app on for routing
  require('./mgmt')(app);

  //Setup Parameters
  app.param('id', /^[0-9a-z]+$/);

  //Home
  app.get('/', function(req, res){
    Post.findTopTen(function(err, posts){
      res.render('index',{
        title: 'Home',
        posts: posts,
      });
    });
  });

  //Register
  app.get('/register', function(req, res){
    res.render('register', {
      title: 'Register'
    });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
      if (err) return res.render('register', { account : account });
      res.redirect('/login');
    });
  });

  //Login & Logout
  app.get('/login', function(req, res){
    res.render('login', {
      title: 'Login'
    });
  });

  app.post('/login', 
      passport.authenticate('local', { 
        successRedirect: '/manage',
        failureRedirect: '/login' }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  //Reading Posts
  app.get('/post/:id', function(req, res, next){
    if(!!!req.params.id) res.redirect('/');
    Post.findById(req.params.id, function(err, post){
      if(err) return console.log(err);
      res.render('post', {
        title: post.title,
        post: [post]
      });
    });
  });
};

