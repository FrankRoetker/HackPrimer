function HomeCtrl($scope, $http, $location) {
  $scope.posts = [ ];

  $scope.init = function(posts){
    $scope.posts = posts;
  }
 
  $scope.navToPost = function(id){
    window.location = '/post/' + id;
  }
};