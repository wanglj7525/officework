'use strict';
app.controller('SetUserCtrl',['$rootScope','$state','$scope','userservice',function($rootScope,$state,$scope,userservice){

    $scope.itemsByPage=10;
    userservice.getData().then(
        function (res) {
            $scope.userlist = res.data.info
        },
        function (rej) {
            console.log(rej);
        }
    );
}]);
