'use strict';

app.controller('SetTreeCtrl',['$scope','treeservice',function($scope,treeservice){
    treeservice.getData().then(
        function (res) {
            $scope.treelist = res.data.info;
            $scope.second= $scope.treelist[0];
            if( $scope.second.children){
                $scope.third= $scope.second.children[0];
                if( $scope.third.children){
                    $scope.fouth= $scope.third.children[0];
                }
            }
        },
        function (rej) {
            console.log(rej);
        }
    );
    $scope.showsecond=function(data){
        $scope.second=data;
        if( $scope.second.children){
            $scope.third=data.children[0];
            if( $scope.third.children){
                $scope.fouth= $scope.third.children[0];
            }
        }
    }
    $scope.showthird=function(data){
        $scope.third=data;
        if( $scope.third.children){
            $scope.fouth= $scope.third.children[0];
        }
    }
    $scope.showfouth=function(data){
        $scope.fouth=data;
    }
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
app.controller('SetDaimaCtrl',['$scope','daimaservice',function($scope,daimaservice){
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