'use strict';
app.controller('SetDaimaCtrl',['$rootScope','$state','$scope','daimaservice',function($rootScope,$state,$scope,daimaservice){

//获取人员信息
    daimaservice.getData().then(
        function (res) {
            $scope.daimalist = res.data.info;
            $scope.daima= $scope.daimalist[0];
        },
        function (rej) {
            console.log(rej);
        }
    );

    $scope.selectdaima=function(daima){
        $scope.daima=daima;
    }
}]);
