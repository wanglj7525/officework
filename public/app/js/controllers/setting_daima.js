'use strict';
app.controller('SetDaimaCtrl',['$rootScope','$state','$scope','$modal','$log','$localStorage','SettingdaimaService',function($rootScope,$state,$scope,$modal,$log,$localStorage,SettingdaimaService){

//获取人员信息
    SettingdaimaService.getCatalogList().then(
        function (res) {
            $scope.daimalist = res.data.info;
            $scope.currentname=$scope.daimalist[0].name;
            $scope.currenthzms=$scope.daimalist[0].hzms;
            SettingdaimaService.getCodagetList($scope.daimalist[0].name).then(
                function(res){
                    $scope.daima=res.data.info;
                },
                function(rej){
                    console.log(rej);
                }
            );
        },
        function (rej) {
            console.log(rej);
        }
    );

    //选择代码目录
    $scope.selectdaima=function(daima){
        $scope.currentname=daima.name;
        $scope.currenthzms=daima.hzms;
        SettingdaimaService.getCodagetList(daima.name).then(
            function(res){
                $scope.daima=res.data.info;
                console.log($scope.daima)
            },
            function(rej){
                console.log(rej);
            }
        );

    }

    //添加代码
    $scope.addDaima=function(catalog_id){
        console.log(catalog_id);
        var modaldaimaInstance = $modal.open({
            templateUrl: 'saveAddDaimaModel.html',
            controller: 'ModalAddDaimaInstanceCtrl',
            size: 'md'
        });
        modaldaimaInstance.result.then(function (newdata) {
            var params=$.param({
                catalog_id:  catalog_id,
                ano: newdata.ano,
                dz:  newdata.dz,
                jc:  newdata.jc,
                access_token:$localStorage.token
            });
            //调用后台保存 成功后修改页面
            SettingdaimaService.addDaima(params).then(
                function (res) {
                    console.log(res);
                    if(res.data.code==200){
                        $scope.daima.list.push(res.data.info);
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
    //删除代码
    $scope.deletedaima=function(idx,data,catalog_id){
        var modaldaimadeleteInstance = $modal.open({
            templateUrl: 'deleteDaimaModel.html',
            controller: 'ModalDeleteDaimaInstanceCtrl',
            size: 'sm',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
        modaldaimadeleteInstance.result.then(function () {
            var params=$.param({
                catalog_id: catalog_id,
                ano:data.ano,
                access_token:$localStorage.token
            });
            SettingdaimaService.deleteDaima(params).then(
                function (res) {
                    if(res.data.code==200){
                        $scope.daima.list.splice(idx,1);
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
    //修改代码
    $scope.updatedaima=function(catalog_id,data){
        $scope.newdata=angular.copy(data);
        var modalupdatezwInstance = $modal.open({
            templateUrl: 'saveUpdateDaimaModel.html',
            controller: 'ModalUpdateDaimaInstanceCtrl',
            size: 'md',
            resolve: {
                newdata: function () {
                    return  $scope.newdata;
                }
            }
        });
        modalupdatezwInstance.result.then(function () {
            var params=$.param({
                catalog_id:  catalog_id,
                ano_old:data.ano,
                ano: $scope.newdata.ano,
                dz:  $scope.newdata.dz,
                jc:  $scope.newdata.jc,
                access_token:$localStorage.token
            });
            //调用后台保存 成功后修改页面
            SettingdaimaService.updateDaima(params).then(
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
app.controller('ModalAddDaimaInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.newdata={};
    $scope.ok = function () {
        $modalInstance.close($scope.newdata);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalDeleteDaimaInstanceCtrl', ['$scope', '$modalInstance', 'data',function($scope, $modalInstance,data) {
    $scope.data = data;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalUpdateDaimaInstanceCtrl', ['$scope', '$modalInstance', 'newdata',function($scope, $modalInstance,newdata) {
    $scope.newdata = newdata;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);