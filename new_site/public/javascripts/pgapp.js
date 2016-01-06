(function() {
	"use strict";

	var app = angular.module("peanutGallery", []);

	app.controller("mainController", [
	  "$scope",
	  "$http",
	  function($scope, $http) {
			$scope.posts = [];
			$scope.newPost = "";

			$scope.init = function() {
			  $scope.getAllPosts();
			}

			$scope.getAllPosts = function() {
			  return $http.get("/posts").success(function(data) {
			    angular.copy(data, $scope.posts);
			  });
			};

			$scope.createNewPost = function() {
			  var tempPost = {
			    title: $scope.posts.length + 1 + "",
			    body: $scope.newPost,
			    timestamp: new Date()
			  };

			  $http.post("/posts", tempPost).success(function(data) {
			    $scope.posts.push(data);
			  });

			  $scope.newPost = "";
			};

			$scope.init();
	  }
	]);
})();