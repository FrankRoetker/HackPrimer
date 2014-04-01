function ManageCtrl($scope, $http, $location) {
  $scope.posts = [ ];
  $scope.selectedPost = -1;

  $scope.init = function(posts){
    $scope.posts = posts;
    $scope.selectedPost = 0;

    if(posts.length <= 0)
      $scope.createPost();
  }

  $scope.selectPost = function(index){
    $scope.selectedPost = index;
  }

  $scope.savePosts = function(){
    var payload = {
      posts: $scope.posts
    } , success = function(msg){
      console.log('success!');
    };

    $http.post('/manage/savePosts', payload).success(success);
  }

  $scope.deletePost = function(){
    if($scope.posts.length <= 0) return;

    var payload = {
      post: $scope.posts[$scope.selectedPost]
    } , success = function(msg){
      $scope.posts.splice($scope.selectedPost, 1);
      $scope.$apply();
    };

    $http.post('/manage/removePost', payload).success(success);
  }

  $scope.createPost = function(){
    var success = function(msg){
      $scope.posts.unshift(msg);
      $scope.selectedPost = 0;
      $scope.$apply();
    }

    $http.post('/manage/createPost').success(success);
  }
};