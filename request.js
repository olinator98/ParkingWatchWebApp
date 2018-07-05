      
      var specificFound = 'false';
      var app = angular.module('myApp', []);
      app.controller('getCtrl', function($scope, $http) {

        //get all data

          $http.get("http://hauslaerche.internet-box.ch:3000/parkingwatch/").then(function (response) {
              $scope.allData = response.data;
              specificFound = false;
              console.log("function called"); 
          },function(response) {
            $scope.allData = "Something went wrong";
          });

        //get a specific one
        $scope.getSpecific = function(){
          if($scope.id_model != null){
          $scope.urlSpecific = "http://hauslaerche.internet-box.ch:3000/parkingwatch/"+ $scope.id_model; 
          $http.get($scope.urlSpecific).then(function (response) {           
              $scope.specificData = response.data;
              console.log("Found a result");               
          },function(response) {
            $scope.specificData = "Something went wrong";
          });
        }
        }

      $scope.postRequest = function() {
            // Send an AJAX POST request with JSON payload for submit
            console.log("submitting ajax post...");
            console.log($scope.Setted_date); 
            console.log($scope.status); 
            $http({
              method: 'POST',
              url: 'http://hauslaerche.internet-box.ch:3000/parkingwatch/',
              data: {
                Setted_date: $scope.Setted_date,  // $http handles jsonify
                status: "available",  // $http handles jsonify
                name: $scope.name  // $http handles jsonify
              },
              headers: {
                  'X-Requested-With': 'Express',             // AJAX request 
                  'Content-Type': 'application/json; charset=utf-8'
              }
            }).then(function success(response) {  // Response status code 2xx and 3xx
                  console.log("success");
                  // response.status keeps the numeric status code
                  // response.data keeps the return JSON data from the server
                  $scope.message = response.status + ": " + JSON.stringify(response.data);
                  console.log(response.data);
              }, function error(response) {      // Response status code 4xx and 5xx
                  console.log("error");
                  $scope.message = response.status + ": " + JSON.stringify(response.data);
              });
        };

})