'use strict';

app.controller('SetTreeCtrl',['$scope',function($scope){

}]);
app.controller('SetUserCtrl',['$scope','userservice',function($scope,userservice){
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
app.controller('SetDaimaCtrl',['$scope','adjustlistservice',function($scope,adjustlistservice){
//获取人员信息
    adjustlistservice.getData().then(
        function (res) {
            $scope.adjustlist = res.data.info;
            $scope.daima= $scope.adjustlist[0];
        },
        function (rej) {
            console.log(rej);
        }
    );

    $scope.selectdaima=function(daima){
        console.log(daima);
        $scope.daima=daima;
    }
}]);