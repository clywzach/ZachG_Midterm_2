angular.module('candidate', [])
.controller('MainCtrl', [
  '$scope','$http',
  function($scope,$http){
    $scope.candidates = [];
    $scope.ballotarray = [];
    $scope.addCandidate = function() {
      var newcandidate = {title:$scope.formContent,upvotes:0, ballot:"false", price:$scope.price, url:$scope.url};
      $scope.formContent='';
	$scope.price = '';
	$scope.url = '';
        console.log("in post js");
      $http.post('/candidates', newcandidate).success(function(data){
         $scope.candidates.push(data);
      });
    };

        //$scope.candidateReset = function(candidate) {
        //candidate.ballot = "false";
        //};

    $scope.upvote = function(candidate) {
      return $http.put('/candidates/' + candidate._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
        if (!$scope.ballotarray.includes(candidate)) $scope.ballotarray.push(candidate);
        //$scope.ballotarray.push(candidate);
          candidate.upvotes += 1;
        });
    };
        $scope.incrementUpvotes = function() {
        console.log("In incrementUpvotes");
        angular.forEach($scope.candidates, function(value, key){
        if(value.selected){
        $scope.upvote(value);
        }
        });
    };
    $scope.getAll = function() {
      return $http.get('/candidates').success(function(data){
        angular.copy(data, $scope.candidates);
      });
        };
    $scope.getAll();

        $scope.delete = function(candidate) {
      $http.delete('/candidates/' + candidate._id)
        .success(function(data){
          console.log("delete worked");
        });
      $scope.getAll();
    };


  }
]);
