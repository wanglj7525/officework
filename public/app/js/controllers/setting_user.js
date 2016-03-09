'use strict';
app.controller('SetUserCtrl',['$rootScope','$state','$scope','$log','$modal','$localStorage','SettinguserService',function($rootScope,$state,$scope,$log,$modal,$localStorage,SettinguserService){
    SettinguserService.getUserList().then(
        function (res) {
            $scope.userlist = res.data.info
        },
        function (rej) {
            console.log(rej);
        }
    );

    $scope.addUser=function(){
        var modaluserInstance = $modal.open({
            templateUrl: 'addUserModel.html',
            controller: 'ModalAddUserInstanceCtrl',
            size: 'md'
        });
        modaluserInstance.result.then(function (newdata) {
            var params=$.param({
                roleid:  newdata.roleid,
                name: newdata.name,
                username:  newdata.username,
                password:  newdata.password,
                access_token:$localStorage.token
            });
            //调用后台保存 成功后修改页面
            SettinguserService.addUser(params).then(
                function (res) {
                    if(res.data.code==200){
                        $scope.userlist.push(res.data.info);
                    }else{
                        alert(res.data.msg);
                    }
                },
                function (rej) {
                    console.log(rej);
                }
            );
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.updateUsers=function(data){
        $scope.newdata=angular.copy(data);
        var modaluserInstance = $modal.open({
            templateUrl: 'updateUserModel.html',
            controller: 'ModalUpdateUserInstanceCtrl',
            size: 'md',
            resolve:{
                newdata:function(){
                    return $scope.newdata;
                }
            }
        });
        modaluserInstance.result.then(function () {
            var params=$.param({
                id:data.id,
                roleid:  $scope.newdata.roleid,
                name: $scope.newdata.name,
                username:  $scope.newdata.username,
                password:  $scope.newdata.password,
                access_token:$localStorage.token
            });
            //调用后台保存 成功后修改页面
            SettinguserService.updateUser(params).then(
                function (res) {
                    if(res.data.code==200){
                        angular.copy($scope.newdata,data);
                    }else{
                        alert(res.data.msg);
                    }
                },
                function (rej) {
                    console.log(rej);
                }
            );
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
}]);
app.controller('ModalAddUserInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.newdata={
        username:"",
        password:"",
        roleid:1
    };
    $scope.ok = function () {
        $modalInstance.close($scope.newdata);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalUpdateUserInstanceCtrl', ['$scope', '$modalInstance', 'newdata',function($scope, $modalInstance,newdata) {
    $scope.newdata = newdata;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);