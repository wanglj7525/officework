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
app.controller('ModalTreeInstanceCtrl', ['$scope', '$modalInstance', 'newdata',function($scope, $modalInstance,newdata) {
    $scope.newdata = newdata;
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

app.controller('ModalAddTreeInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.newdata={
        type:1,
        rank:1
    }
    //$scope.treename={
    //    data:"222",
    //    label:$scope.treename
    //};
    $scope.ok = function () {
        $modalInstance.close($scope.newdata);
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
app.controller('ModalUpdateZWInstanceCtrl', ['$scope', '$modalInstance', 'newposition','elementSelect',function($scope, $modalInstance,newposition,elementSelect) {
    $scope.newposition = newposition;
    $scope.elementSelect=elementSelect;

    if($scope.newposition.post_rank){
        for(var i=0;i< $scope.elementSelect.zhijilist.length;i++){
            if($scope.newposition.post_rank==$scope.elementSelect.zhijilist[i].ano){
                $scope.newposition.post_rank=$scope.elementSelect.zhijilist[i];
            }
        }
    }
    if($scope.newposition.post_category){
        for(var i=0;i< $scope.elementSelect.zhiwuleibielist.length;i++){
            if($scope.newposition.post_category==$scope.elementSelect.zhiwuleibielist[i].ano){
                $scope.newposition.post_category=$scope.elementSelect.zhiwuleibielist[i];
            }
        }
    }

    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddZWInstanceCtrl', ['$scope', '$modalInstance','elementSelect',function($scope, $modalInstance,elementSelect) {
    $scope.elementSelect=elementSelect;
    $scope.zws={
        num:1,
        rank:1
    };
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('SetTreeCtrl',['$rootScope','$state','$scope','$modal','$log','$localStorage','SeetingtreeService','SettingdaimaService',
    function($rootScope,$state,$scope,$modal,$log,$localStorage,SeetingtreeService,SettingdaimaService ){
        $scope.elementSelect={};
        //职级
    SettingdaimaService.getCodagetList("FJ09").then(function(res){
        $scope.elementSelect.zhijilist=res.data.info.list
    },function(rej){});
    //职务类别
    SettingdaimaService.getCodagetList("ZB42").then(function(res){
        $scope.elementSelect.zhiwuleibielist=res.data.info.list
    },function(rej){});

    SeetingtreeService.getTreeList().then(
        function (res) {
            $scope.treelist = res.data.info;
            $scope.second= $scope.treelist[0];
            if( $scope.second&&$scope.second.nodes){
                $scope.third= $scope.second.nodes[0];
                if($scope.third&& $scope.third.nodes){
                    $scope.fouth= $scope.third.nodes[0];
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
        if($scope.second&& $scope.second.nodes){
            $scope.third=data.nodes[0];
            if($scope.third&& $scope.third.nodes){
                $scope.fouth= $scope.third.nodes[0];
            }
        }
    }
    $scope.showthird=function(data){
        $scope.third=data;
        $scope.fouth=[];
        if($scope.third&& $scope.third.nodes){
            $scope.fouth= $scope.third.nodes[0];
        }
    }
    $scope.showfouth=function(data){
        $scope.fouth=data;
    }

    //获取职位列表
    $scope.zhiweilist=function(data){
        SeetingtreeService.getPositionList(data.uuid).then(
            function (res) {
                $scope.isEditZW=true;
                $scope.parenttree=data;
                $scope.editzw=res.data.info;
            },
            function (rej) {
                console.log(rej);
            }
        );

    }
    //修改职位
    $scope.updatezhiwei=function(data){
        $scope.newposition=angular.copy(data);
        var modalupdatezwInstance = $modal.open({
            templateUrl: 'updateZWModel.html',
            controller: 'ModalUpdateZWInstanceCtrl',
            size: 'md',
            resolve: {
                newposition: function () {
                    return  $scope.newposition;
                },
                elementSelect:function(){
                    return $scope.elementSelect;
                }
            }
        });
        modalupdatezwInstance.result.then(function () {
            var params=$.param({
                id:$scope.newposition.id,
                name:  $scope.newposition.name,
                num:  $scope.newposition.num,
                order:$scope.newposition.rank,
                post_rank:$scope.newposition.post_rank['ano'],
                post_category:$scope.newposition.post_category['ano'],
                access_token:$localStorage.token
            });
            //调用后台保存 成功后修改页面
            SeetingtreeService.updatePosition(params).then(
                function (res) {
                    if(res.data.code==200){
                        angular.copy($scope.newposition,data);
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
    //删除职位
    $scope.deletezhiwei=function(data){
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
            var params=$.param({
                id: data.id,
                access_token:$localStorage.token
            });
            SeetingtreeService.deletePosition(params).then(
                function (res) {
                    if(res.data.code==200){
                        for(var i=0; i<$scope.editzw.length; i++){
                            if($scope.editzw[i].id==data.id){
                                $scope.editzw.splice(i,1);
                            }
                        }
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
    //添加职位
    $scope.addzw=function(treeid){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'saveAddZWModel.html',
            controller: 'ModalAddZWInstanceCtrl',
            size: 'md' ,
            resolve: {
                elementSelect:function(){
                    return $scope.elementSelect;
                }
            }
        });
        modalzwaddInstance.result.then(function (zw) {
            var params=$.param({
                tree_id:  treeid,
                name:  zw.name,
                num:  zw.num,
                order:zw.rank,
                post_rank:zw.post_rank['ano'],
                post_category:zw.post_category['ano'],
                access_token:$localStorage.token
            });
            //调用后台保存 成功后修改页面
            SeetingtreeService.addPosition(params).then(
                function (res) {
                    console.log(res);
                    if(res.data.code==200){
                        $scope.editzw.push(res.data.info);
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

    //添加单位树
    $scope.addtree=function(which,parent){
        var modaltreeInstance = $modal.open({
            templateUrl: 'saveAddTreeModel.html',
            controller: 'ModalAddTreeInstanceCtrl',
            size: 'md'
        });
        modaltreeInstance.result.then(function (newdata) {
            var params=$.param({
                parent:  parent,
                code: newdata.code,
                name:  newdata.name,
                type:  newdata.type,
                order:newdata.rank,
                access_token:$localStorage.token
            });
            //调用后台保存 成功后修改页面
            SeetingtreeService.addTree(params).then(
                function (res) {
                    console.log(res);
                    if(res.data.code==200){
                        if(which==1){
                            $scope.treelist.push(res.data.info);
                        }else if(which==2){
                            $scope.second.nodes.push(res.data.info);
                            $scope.third= $scope.second.nodes[0];
                        }else if(which==3){
                            $scope.third.nodes.push(res.data.info);
                            $scope.fouth= $scope.third.nodes[0];
                        }else{
                            $scope.fouth.nodes.push(res.data.info);
                        }
                    }else{
                        alert(res.data.msg);
                    }

                },
                function (rej) {
                    console.log(rej);
                }
            );

            //$scope.daweilist[0].peoples.splice(Array.indexOf($scope.daweilist[0].peoples,people),1);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    //修改单位树
    $scope.updatetree=function(data){
        //修改页面使用的临时数据
        $scope.newdata= angular.copy(data);
        var modaltreeInstance = $modal.open({
            templateUrl: 'saveTreeModel.html',
            controller: 'ModalTreeInstanceCtrl',
            size: 'md',
            resolve: {
                newdata:  function(){
                    return $scope.newdata
                }
            }
        });
        modaltreeInstance.result.then(function () {
            var params=$.param({
                uuid: data.uuid,
                code: $scope.newdata.code,
                name:  $scope.newdata.name,
                type:  $scope.newdata.type,
                order:$scope.newdata.rank,
                access_token:$localStorage.token
            });
            //调用后台保存 成功后修改页面
            SeetingtreeService.updateTree(params).then(
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

            //TODO 调用后台保存
        }, function () {
            //取消修改
            //angular.copy($scope.olddata,data);
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    //删除单位树
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
            var params=$.param({
                uuid: data.uuid,
                access_token:$localStorage.token
            });
            SeetingtreeService.deleteTree(params).then(
                function (res) {
                    if(res.data.code==200){
                        if(which==1){
                            $scope.treelist.splice(idx,1);
                        }else if(which==2){
                            $scope.second.nodes.splice(idx,1);
                        }else if(which==3){
                            $scope.third.nodes.splice(idx,1);
                        }else{
                            $scope.fouth.nodes.splice(idx,1);
                        }
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
   //单位树表单验证部分
        
}]);
