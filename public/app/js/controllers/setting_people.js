'use strict';
//app.controller('SetPeopleCtrl',['$rootScope','$state','$scope','messageservice',function($rootScope,$state,$scope,messageservice){
//    $scope.messagetabletab = [
//        { id:1,img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息1",nation:"汉",birthday:"196511",palce:"福清龙田",troops:"197712",party:"191212",education:"本科",school:"福建师范"},
//        { id:2,img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息2",nation:"汉",birthday:"195411",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
//        { id:3,img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息3",nation:"汉",birthday:"195711",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"},
//        { id:4,img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"女",company:"福清市xxx、xxx信息4",nation:"汉",birthday:"195311",palce:"福清龙田",troops:"197212",party:"197212",education:"本科",school:"福建师范"},
//        { id:5,img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息5",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"},
//        { id:6,img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息6",nation:"汉",birthday:"195011",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
//        { id:7,img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息7",nation:"汉",birthday:"197511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
//        { id:8,img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息8",nation:"汉",birthday:"198511",palce:"福清龙田",troops:"191212",party:"171212",education:"本科",school:"福建师范"},
//        { id:9,img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195411",palce:"福清龙田",troops:"197712",party:"197712",education:"本科",school:"福建师范"},
//        { id:10,img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"191212",education:"本科",school:"福建师范" },
//        { id:11,img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
//        { id:12,img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"女",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
//        {id:21,img:'/public/app/img/a10.jpg', name:'张三11' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195111",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"}];
//
//    messageservice.getData().then(
//        function (res) {
//            $scope.peoplelist = res.data.info;
//            $scope.itemsByPage=10;
//        },
//        function (rej) {
//            console.log(rej);
//        }
//    );
//}]);
//app.controller('testController',['Resource', function (service) {
//
//    var ctrl = this;
//
//    this.displayed = [];
//
//    this.callServer = function callServer(tableState) {
//
//        ctrl.isLoading = true;
//
//        var pagination = tableState.pagination;
//
//        var start = pagination.start || 0;     // This is NOT the page number, but the index of item in the list that you want to use to display the table.
//        var number = pagination.number || 10;  // Number of entries showed per page.
//
//        service.getPage(start, number, tableState).then(function (result) {
//            ctrl.displayed = result.data;
//            tableState.pagination.numberOfPages = result.numberOfPages;//set the number of pages so the pagination can update
//            ctrl.isLoading = false;
//        });
//    };
//}]);

app.controller('ModalAddPeopleInstanceCtrl', ['$scope', '$modalInstance','editableOptions','editableThemes', function($scope, $modalInstance, editableOptions, editableThemes){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    //$scope.which = which;
    //$scope.treename={
    //    data:"222",
    //    label:$scope.treename
    //};
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalUpdatePeopleInstanceCtrl', ['$scope', '$modalInstance','people','editableOptions','editableThemes', function($scope, $modalInstance,people, editableOptions, editableThemes){
    editableThemes.bs3.inputClass = 'input-sm';
    editableThemes.bs3.buttonsClass = 'btn-sm';
    editableOptions.theme = 'bs3';
    //$scope.which = which;
    //$scope.treename={
    //    data:"222",
    //    label:$scope.treename
    //};
    $scope.people=people;
    console.log(people);
    $scope.ok = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('SetPeopleCtrl',['$scope','$http','$modal','$log','TableDatePage','peoplelistservice','SettingpeopleService', function($scope,$http,$modal,$log,TableDatePage,peoplelistservice,SettingpeopleService){
    $scope.isedit=false;
    $scope.showelse=false;
    //取消
    $scope.back_people=function(){
        $scope.isedit=false;
    }
    //保存基本信息
    $scope.saveJiben=function(){
        $scope.showelse=true;
    }

    $scope.all_config = {};

    //添加职务
    $scope.addzhiwu=function(peopleid){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'addzhiwuModel.html',
            controller: 'ModalAddzhiwuInstanceCtrl',
            size: 'lg'
        });
        modalzwaddInstance.result.then(function (zhiwu) {
            //var params=$.param({
            //    tree_id:  treeid,
            //    name:  zw.name,
            //    num:  zw.num,
            //    order:zw.rank,
            //    access_token:$localStorage.token
            //});
            ////调用后台保存 成功后修改页面
            //SeetingtreeService.addPosition(params).then(
            //    function (res) {
            //        console.log(res);
            //        if(res.data.code==200){
            //            $scope.editzw.push(res.data.info);
            //        }else{
            //            alert(res.data.msg);
            //        }
            //
            //    },
            //    function (rej) {
            //        console.log(rej);
            //    }
            //);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    //添加职称
    $scope.addzhicheng=function(peopleid){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'addzhichengModel.html',
            controller: 'ModalAddzhichengInstanceCtrl',
            size: 'md'
        });
        modalzwaddInstance.result.then(function (zhicheng) {
            //var params=$.param({
            //    tree_id:  treeid,
            //    name:  zw.name,
            //    num:  zw.num,
            //    order:zw.rank,
            //    access_token:$localStorage.token
            //});
            ////调用后台保存 成功后修改页面
            //SeetingtreeService.addPosition(params).then(
            //    function (res) {
            //        console.log(res);
            //        if(res.data.code==200){
            //            $scope.editzw.push(res.data.info);
            //        }else{
            //            alert(res.data.msg);
            //        }
            //
            //    },
            //    function (rej) {
            //        console.log(rej);
            //    }
            //);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    //添加学历
    $scope.addxueli=function(peopleid){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'addxueliModel.html',
            controller: 'ModalAddxueliInstanceCtrl',
            size: 'md'
        });
        modalzwaddInstance.result.then(function (zhicheng) {
            //var params=$.param({
            //    tree_id:  treeid,
            //    name:  zw.name,
            //    num:  zw.num,
            //    order:zw.rank,
            //    access_token:$localStorage.token
            //});
            ////调用后台保存 成功后修改页面
            //SeetingtreeService.addPosition(params).then(
            //    function (res) {
            //        console.log(res);
            //        if(res.data.code==200){
            //            $scope.editzw.push(res.data.info);
            //        }else{
            //            alert(res.data.msg);
            //        }
            //
            //    },
            //    function (rej) {
            //        console.log(rej);
            //    }
            //);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    //添加学历
    $scope.addxuewei=function(peopleid){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'addxueweiModel.html',
            controller: 'ModalAddxueweiInstanceCtrl',
            size: 'md'
        });
        modalzwaddInstance.result.then(function (zhicheng) {
            //var params=$.param({
            //    tree_id:  treeid,
            //    name:  zw.name,
            //    num:  zw.num,
            //    order:zw.rank,
            //    access_token:$localStorage.token
            //});
            ////调用后台保存 成功后修改页面
            //SeetingtreeService.addPosition(params).then(
            //    function (res) {
            //        console.log(res);
            //        if(res.data.code==200){
            //            $scope.editzw.push(res.data.info);
            //        }else{
            //            alert(res.data.msg);
            //        }
            //
            //    },
            //    function (rej) {
            //        console.log(rej);
            //    }
            //);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    //添加学历
    $scope.addjiangcheng=function(peopleid){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'addjiangchengModel.html',
            controller: 'ModalAddjiangchengInstanceCtrl',
            size: 'md'
        });
        modalzwaddInstance.result.then(function (zhicheng) {
            //var params=$.param({
            //    tree_id:  treeid,
            //    name:  zw.name,
            //    num:  zw.num,
            //    order:zw.rank,
            //    access_token:$localStorage.token
            //});
            ////调用后台保存 成功后修改页面
            //SeetingtreeService.addPosition(params).then(
            //    function (res) {
            //        console.log(res);
            //        if(res.data.code==200){
            //            $scope.editzw.push(res.data.info);
            //        }else{
            //            alert(res.data.msg);
            //        }
            //
            //    },
            //    function (rej) {
            //        console.log(rej);
            //    }
            //);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    //添加学历
    $scope.addkaohe=function(peopleid){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'addkaoheModel.html',
            controller: 'ModalAddkaoheInstanceCtrl',
            size: 'md'
        });
        modalzwaddInstance.result.then(function (zhicheng) {
            //var params=$.param({
            //    tree_id:  treeid,
            //    name:  zw.name,
            //    num:  zw.num,
            //    order:zw.rank,
            //    access_token:$localStorage.token
            //});
            ////调用后台保存 成功后修改页面
            //SeetingtreeService.addPosition(params).then(
            //    function (res) {
            //        console.log(res);
            //        if(res.data.code==200){
            //            $scope.editzw.push(res.data.info);
            //        }else{
            //            alert(res.data.msg);
            //        }
            //
            //    },
            //    function (rej) {
            //        console.log(rej);
            //    }
            //);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    //添加家庭成员
    $scope.addjiating=function(peopleid){
        var modalzwaddInstance = $modal.open({
            templateUrl: 'addjiatingModel.html',
            controller: 'ModalAddjiatingInstanceCtrl',
            size: 'md'
        });
        modalzwaddInstance.result.then(function (zhicheng) {
            //var params=$.param({
            //    tree_id:  treeid,
            //    name:  zw.name,
            //    num:  zw.num,
            //    order:zw.rank,
            //    access_token:$localStorage.token
            //});
            ////调用后台保存 成功后修改页面
            //SeetingtreeService.addPosition(params).then(
            //    function (res) {
            //        console.log(res);
            //        if(res.data.code==200){
            //            $scope.editzw.push(res.data.info);
            //        }else{
            //            alert(res.data.msg);
            //        }
            //
            //    },
            //    function (rej) {
            //        console.log(rej);
            //    }
            //);
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    //var path='/public/app/api/message';
    //$http.get(path).then(function(response){
    //    vm.projects = response.data.info;
    //    vm.dataTable =new TableDatePage(vm.projects);
    //    return vm;
    //},function(response){
    //    return response;
    //});
    //分页获取数据
    var getMessageImageList = function () {
    	var postData = $.param({
            name:$scope.searhname,
    		pageNo: $scope.paginationConf.currentPage,
    		pageSize: $scope.paginationConf.itemsPerPage
    	});
        $scope.paginationConf.totalItems = 265;
        //SettingpeopleService.getPeopleList(postData).then(
    	//	function (res) {
    	//		console.log(res);
    	//		if(res.data.code==200){
    	//			$scope.paginationConf.totalItems = res.data.totalElements;
    	//			$scope.peoplelist = res.data.info;
    	//		}else{
    	//			alert(res.data.msg);
    	//		}
        //
    	//	},
    	//	function (rej) {
    	//		console.log(rej);
    	//	}
    	//)
    }
    //配置分页基本参数
    $scope.paginationConf = {
    	currentPage: 1,
    	itemsPerPage: 10
    };
    ///***************************************************************
    // 当页码和页面记录数发生变化时监控后台查询
    // 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
    // ***************************************************************/
    $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getMessageImageList);
  
    peoplelistservice.getData().then(
        function (res) {
            $scope.peoplelist = res.data.info;
        },
        function (rej) {
            console.log(rej);
        }
    );

    $scope.addpeople=function(){
        var modaltreeInstance = $modal.open({
            templateUrl: 'saveAddPeopleModel.html',
            controller: 'ModalAddPeopleInstanceCtrl',
            size: 'lg'
        });
        modaltreeInstance.result.then(function (name) {
            //vm.projects.push();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    
    $scope.updatepeople=function(people){
        var modaltreeInstance = $modal.open({
            templateUrl: 'saveUpdatePeopleModel.html',
            controller: 'ModalUpdatePeopleInstanceCtrl',
            size: 'lg',
            resolve:{
                people:function(){
                    return people;
                }
            }
        });
        modaltreeInstance.result.then(function () {
            //vm.projects.push();
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
}]);
app.controller('ModalAddzhiwuInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.zws={};
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddzhichengInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.zws={};
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddxueliInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.zws={};
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddxueweiInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.zws={};
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddjiangchengInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.zws={};
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddkaoheInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.zws={};
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddjiatingInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
    $scope.zws={};
    $scope.ok = function () {
        $modalInstance.close($scope.zws);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('addPeopleController',['$scope', '$http', '$state', function($scope, $http, $state){
    //上传头像
    $scope.myImage='';

    var handleFileSelect=function(evt) {
        console.log(evt);
        var file=evt.currentTarget.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
            $scope.$apply(function($scope){
                $scope.myImage=evt.target.result;
                console.log( $scope.myImage);
            });
        };
        reader.readAsDataURL(file);
    };
    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);

    $scope.onemessage= {
        "id": 1,
        "img": "/public/app/img/a0.jpg",
        "name": "张三1",
        "sex": "男",
        "company": "福清市xxx、xxx信息",
        "nation": "汉",
        "birthday": "19551111",
        "palce": "福清龙田",
        "troops": "19771212",
        "party": "19771212",
        "education": "本科",
        "school": "福建师范",
        "health":"健康或良好",
        "zhengzhi":"中国共产党党员",
        "shenfenzheng":"11111111111111111111111x",
        "zhuanchang":"唱歌",
        "beiwang":"备忘1",
        "beiyong1":"备用1",
        "beiyong2":"备用2",
        "zhiji":"处长",
        "gerenshenfen":"xx处长",
        "zhuangtai":"退休",
        "zhicheng":"中级职称"
    };
    $scope.selectedIndex = 0;



}]);




