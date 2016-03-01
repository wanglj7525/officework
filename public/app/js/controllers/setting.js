'use strict';
app.controller('ModalDeleteTreeInstanceCtrl', ['$scope', '$modalInstance', 'data',function($scope, $modalInstance,data) {
    $scope.data = data;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalTreeInstanceCtrl', ['$scope', '$modalInstance', 'data',function($scope, $modalInstance,data) {
    $scope.data = data;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

app.controller('ModalAddTreeInstanceCtrl', ['$scope', '$modalInstance', 'which',function($scope, $modalInstance,which) {
    $scope.which = which;
    $scope.treename={
        data:"222",
        label:$scope.treename
    };
    $scope.ok = function () {
        $modalInstance.close($scope.treename);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalDeleteZWInstanceCtrl', ['$scope', '$modalInstance', 'data',function($scope, $modalInstance,data) {
    $scope.data = data;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalUpdateZWInstanceCtrl', ['$scope', '$modalInstance', 'data',function($scope, $modalInstance,data) {
    $scope.data = data;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddZWInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    console.log($scope.zwname);
    $scope.zws={
        id:4,
        name:'',
        num:'',
        level:''
    };
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('SetTreeCtrl',['$rootScope','$state','$scope','$modal','$log','treeservice',function($rootScope,$state,$scope,$modal,$log,treeservice){
    treeservice.getData().then(
        function (res) {
            $scope.treelist = res.data.info;
            $scope.second= $scope.treelist[0];
            if( $scope.second&&$scope.second.children){
                $scope.third= $scope.second.children[0];
                if($scope.third&& $scope.third.children){
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
        $scope.third=[];
        $scope.fouth=[];
        if($scope.second&& $scope.second.children){
            $scope.third=data.children[0];
            if($scope.third&& $scope.third.children){
                $scope.fouth= $scope.third.children[0];
            }
        }
    }
    $scope.showthird=function(data){
        $scope.third=data;
        $scope.fouth=[];
        if($scope.third&& $scope.third.children){
            $scope.fouth= $scope.third.children[0];
        }
    }
    $scope.showfouth=function(data){
        $scope.fouth=data;
    }


    //修改职位
    $scope.updatezhiweilist=function(data){
        $scope.isEditZW=true;
        $scope.editzw=data;
    }
    $scope.updatezhiwei=function(data){
        var modalupdatezwInstance = $modal.open({
            templateUrl: 'updateZWModel.html',
            controller: 'ModalUpdateZWInstanceCtrl',
            size: 'md',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
        modalupdatezwInstance.result.then(function () {
            //TODO 调用后台保存
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    $scope.deletezhiwei=function(idx,data){
        var modalzwdeleteInstance = $modal.open({
            templateUrl: 'deleteZWModel.html',
            controller: 'ModalDeleteZWInstanceCtrl',
            size: 'sm',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
        modalzwdeleteInstance.result.then(function () {
            $scope.editzw.zhiwei.splice(idx,1);
            //TODO 调用后台保存
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    $scope.addzw=function(){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'saveAddZWModel.html',
            controller: 'ModalAddZWInstanceCtrl',
            size: 'md'
        });
        modalzwaddInstance.result.then(function (zw) {
            console.log(zw);
            $scope.editzw.zhiwei.push(zw);
            //TODO 调用后台保存
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    $scope.addtree=function(which){
        var modaltreeInstance = $modal.open({
            templateUrl: 'saveAddTreeModel.html',
            controller: 'ModalAddTreeInstanceCtrl',
            size: 'md',
            resolve: {
                which:function(){
                    return which;
                }
            }
        });
        modaltreeInstance.result.then(function (name) {
            //TODO 调用后台保存
            if(which==1){
                $scope.treelist.push(name);
            }else if(which==2){
                $scope.second.children.push(name);
            }else if(which==3){
                $scope.third.children.push(name);
            }else{
                $scope.fouth.children.push(name);
            }
            //$scope.daweilist[0].peoples.splice(Array.indexOf($scope.daweilist[0].peoples,people),1);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    $scope.updatetree=function(data){
        var modaltreeInstance = $modal.open({
            templateUrl: 'saveTreeModel.html',
            controller: 'ModalTreeInstanceCtrl',
            size: 'md',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
        modaltreeInstance.result.then(function () {
            //TODO 调用后台保存
            //$scope.daweilist[0].peoples.splice(Array.indexOf($scope.daweilist[0].peoples,people),1);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    $scope.deletetree=function(which,idx,data){
        var modaltreedeleteInstance = $modal.open({
            templateUrl: 'deleteTreeModel.html',
            controller: 'ModalDeleteTreeInstanceCtrl',
            size: 'sm',
            resolve: {
                data: function () {
                    return data;
                }
            }
        });
        modaltreedeleteInstance.result.then(function () {
            if(which==1){
                $scope.treelist.splice(idx,1);
            }else if(which==2){
                $scope.second.children.splice(idx,1);
            }else if(which==3){
                $scope.third.children.splice(idx,1);
            }else{
                $scope.fouth.children.splice(idx,1);
            }
            //TODO 调用后台保存
            //$scope.daweilist[0].peoples.splice(Array.indexOf($scope.daweilist[0].peoples,people),1);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
}]);
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
app.controller('SetPeopleCtrl',['$rootScope','$state','$scope','messageservice',function($rootScope,$state,$scope,messageservice){

    $scope.itemsByPage=10;
    messageservice.getData().then(
        function (res) {
            $scope.peoplelist = res.data.info
        },
        function (rej) {
            console.log(rej);
        }
    );
}]);