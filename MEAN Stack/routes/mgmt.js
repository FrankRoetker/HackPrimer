module.exports = function(app){
  var Model = require('../model')
  , Post = Model.Post
  , Account = Model.Account;

  function createResponse(res, payload){
    res.contentType('json');
    res.write( JSON.stringify(payload) );
    res.end('\n');
  }

  app.get('/manage', function(req, res){
    if(!req.isAuthenticated()) {
      res.redirect('/login');
      return;
    }

    Post.find({_author: req.user._id})
    .sort('-timestamp')
    .exec(function(err, posts){
      res.render('mgmt', {
        title: 'Management',
        posts: posts
      });
    });
  });

  app.post('/manage/savePosts', function(req, res){
    if(!req.isAuthenticated()) 
      return createResponse(res, '');
    if(!!!req.body.posts) //No posts in the body
      return createResponse(res, '');
    req.body.posts.forEach(function(item, index){
      Post.findById(item._id, function(err, post){
        if(!!!post) //post doesn't exist, so let's make it!
          post = new Post({timestamp: Date.now()});

        post.author = req.user.username;
        post.title = item.title;
        post.body = item.body;
        post.save();
      });
    });
    createResponse(res, '');
  });

  app.post('/manage/createPost', function(req, res){
    var post = new Post({title: 'title', body: '', author: req.user.username});
    createResponse(res, post);
  });

  app.post('/manage/removePost', function(req, res){
    if(!req.isAuthenticated()) 
      return createResponse(res, '');
    if(!!!req.body.post) //No posts in the body
      return createResponse(res, '');
    Post.remove({_id: req.body.post._id, author: req.user.username}, function (err) {});
    createResponse(res, '');
  });
}