/**
 * 
 */
'use strict';
angular.module('MyApp', [])
  .controller('MyController', ['$scope', '$http', function($scope,$http) {
	  
	  $scope.data =[];
	  $http.get("/AllAssetNum").success(function(data){
		 
		  $scope.data.availableOptions = data.ASSETMboSet.ASSET;  
		 
          console.log(data.ASSETMboSet.ASSET);
          
    }).error(function(data) {
    	
    });
	
 }]);