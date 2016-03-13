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
app.controller('DatepickerDemoCtrl', ['$scope', function($scope) {
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
        $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
        return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 0,
        class: 'datepicker'
    };

    $scope.initDate = new Date('2016-15-20');
    $scope.formats = ['dd-MMMM-yyyy', 'yyyy-MM-dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];

}])
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
app.controller('SetPeopleCtrl',['$scope','$http','$filter','$modal','$log','$localStorage','$debounce','TableDatePage','peoplelistservice','SettingpeopleService','SettingdaimaService',
    function($scope,$http,$filter,$modal,$log,$localStorage,$debounce,TableDatePage,peoplelistservice,SettingpeopleService,SettingdaimaService){
        $scope.isedit=false;
        $scope.showelse=false;
        //取消
        $scope.back_people=function(){
            $scope.isedit=false;
        }
        //分页获取数据
        var getMessageImageList = function () {
            var postData = $.param({
                name:$scope.searchtext,
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage,
                access_token:$localStorage.token
            });
            SettingpeopleService.getPeopleList(postData).then(
                function (res) {
                    console.log(res);
                    if(res.data.code==200){
                        $scope.paginationConf.totalItems = res.data.info.allRow;
                        $scope.peoplelist = res.data.info.list;
                    }else{
                        alert(res.data.msg);
                    }

                },
                function (rej) {
                    console.log(rej);
                }
            )
        }
        //配置分页基本参数
        $scope.paginationConf = {
            currentPage: 1,
            itemsPerPage: 10
        };
        $scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getMessageImageList);
        //自动搜索
        $scope.$watch('searchtext', function (newValue, oldValue) {
            if (newValue === oldValue) { return; }
            $debounce(getMessageImageList, 800);
        }, true);

        //性别
        SettingdaimaService.getCodagetList("GB2261").then(function(res){ $scope.sexlist=res.data.info.list;},function(rej){});
        //地址
        SettingdaimaService.getCodagetList("ZB01").then(function(res){ $scope.address=res.data.info.list;},function(rej){});
        //民族
        SettingdaimaService.getCodagetList("GB3304").then(function(res){ $scope.minzulist=res.data.info.list;},function(rej){});
        //健康
        SettingdaimaService.getCodagetList("GB4767").then(function(res){ $scope.jiankanglist=res.data.info.list;},function(rej){});
        //职级
        SettingdaimaService.getCodagetList("FJ09").then(function(res){ $scope.zhijilist=res.data.info.list;},function(rej){});
        //政治面貌
        SettingdaimaService.getCodagetList("GB4762").then(function(res){ $scope.zhengzhilist=res.data.info.list;},function(rej){});
        //人员状态
        SettingdaimaService.getCodagetList("FJ14").then(function(res){ $scope.zhuangtailist=res.data.info.list;},function(rej){});
        //个人身份
        SettingdaimaService.getCodagetList("FJ06").then(function(res){ $scope.personallist=res.data.info.list;},function(rej){});

//添加用户
        $scope.addp=function(){
            $scope.user={};
            $scope.isedit=true;
            $scope.showelse=false;
            $scope.showtitle="添加用户";
        }
//修改用户
        $scope.updatepeople=function(people){
            $scope.user={};
            $scope.isedit=true;
            $scope.showelse=true;
            $scope.showtitle="修改用户";

            var postData = $.param({
                person_id:people.id,
                access_token:$localStorage.token
            });
            SettingpeopleService.getPeopleBase(postData).then(
                function(res){
                    if(res.data.code==200){
                        $scope.user=res.data.info;
                        //下拉列表默认显示值
                        if($scope.user.jiguan||$scope.user.birthplace){
                            for(var i=0;i<$scope.address.length;i++){
                                if($scope.user.birthplace==$scope.address[i].ano){
                                    $scope.user.birthplace=$scope.address[i];
                                }
                                if($scope.user.jiguan==$scope.address[i].ano){
                                    $scope.user.jiguan=$scope.address[i];
                                }
                            }
                        }
                        if($scope.user.person_status){
                            for(var i=0;i<$scope.zhuangtailist.length;i++){
                                if($scope.user.person_status==$scope.zhuangtailist[i].ano){
                                    $scope.user.person_status=$scope.zhuangtailist[i];
                                }
                            }
                        }
                        if($scope.user.personal){
                            for(var i=0;i<$scope.personallist.length;i++){
                                if($scope.user.personal==$scope.personallist[i].ano){
                                    $scope.user.personal=$scope.personallist[i];
                                }
                            }
                        }
                        if($scope.user.rank){
                            for(var i=0;i<$scope.zhijilist.length;i++){
                                if($scope.user.rank==$scope.zhijilist[i].ano){
                                    $scope.user.rank=$scope.zhijilist[i];
                                }
                            }
                        }
                        if($scope.user.health){
                            for(var i=0;i<$scope.jiankanglist.length;i++){
                                if($scope.user.health==$scope.jiankanglist[i].ano){
                                    $scope.user.health=$scope.jiankanglist[i];
                                }
                            }
                        }
                        if($scope.user.political_status){
                            for(var i=0;i<$scope.zhengzhilist.length;i++){
                                if($scope.user.political_status==$scope.zhengzhilist[i].ano){
                                    $scope.user.political_status=$scope.zhengzhilist[i];
                                }
                            }
                        }
                        if($scope.user.sex){
                            for(var i=0;i<$scope.sexlist.length;i++){
                                if($scope.user.sex==$scope.sexlist[i].ano){
                                    $scope.user.sex=$scope.sexlist[i];
                                }
                            }
                        }
                        if( $scope.user.nation){
                            for(var i=0;i<$scope.minzulist.length;i++){
                                if($scope.user.nation==$scope.minzulist[i].ano){
                                    $scope.user.nation=$scope.minzulist[i];
                                }
                            }
                        }
                    }else{
                        alert(res.data.msg);
                    }
                },function(rej){
                    console.log(rej);
                }
            )
        }

        //保存基本信息
        $scope.saveJiben=function(){
            $scope.showelse=true;
            if($scope.user.person_id){
                var postData = $.param({
                    person_id:$scope.user.person_id,
                    head_pic:$scope.user.head_pic,
                    name:$scope.user.name,
                    sex:$scope.user.sex["ano"],
                    birthday:$filter("date")($scope.user.birthday, "yyyyMMdd"),
                    birthplace:$scope.user.birthplace?$scope.user.birthplace["ano"]:"",
                    jiguan:$scope.user.jiguan?$scope.user.jiguan["ano"]:"",
                    nation:$scope.user.nation?$scope.user.nation["ano"]:"",
                    health:$scope.user.health?$scope.user.health["ano"]:"",
                    work_date:$filter("date")($scope.user.work_date, "yyyyMMdd"),
                    political_status:$scope.user.political_status?$scope.user.political_status["ano"]:"",
                    organ_date:$filter("date")($scope.user.organ_date, "yyyyMMdd"),
                    card_id:$scope.user.card_id,
                    //specialty:$scope.user.specialty["ano"],
                    rank:$scope.user.rank?$scope.user.rank["ano"]:"",
                    person_status:$scope.user.person_status?$scope.user.person_status["ano"]:"",
                    personal:$scope.user.personal?$scope.user.personal["ano"]:"",
                    specialty:$scope.user.specialty,
                    info_source:"",
                    alternatives1:"",
                    alternatives2:"",
                    access_token:$localStorage.token
                });
                SettingpeopleService.updateBase(postData).then(
                    function(res){
                        alert(res.data.msg);
                    },
                    function(rej){

                    }
                )
            }else{
                var postData = $.param({
                    head_pic:$scope.user.head_pic,
                    name:$scope.user.name,
                    sex:$scope.user.sex["ano"],
                    birthday:$filter("date")($scope.user.birthday, "yyyyMMdd"),
                    birthplace:$scope.user.birthplace?$scope.user.birthplace["ano"]:"",
                    jiguan:$scope.user.jiguan?$scope.user.jiguan["ano"]:"",
                    nation:$scope.user.nation?$scope.user.nation["ano"]:"",
                    health:$scope.user.health?$scope.user.health["ano"]:"",
                    work_date:$filter("date")($scope.user.work_date, "yyyyMMdd"),
                    political_status:$scope.user.political_status?$scope.user.political_status["ano"]:"",
                    organ_date:$filter("date")($scope.user.organ_date, "yyyyMMdd"),
                    card_id:$scope.user.card_id,
                    //specialty:$scope.user.specialty["ano"],
                    rank:$scope.user.rank?$scope.user.rank["ano"]:"",
                    person_status:$scope.user.person_status?$scope.user.person_status["ano"]:"",
                    personal:$scope.user.personal?$scope.user.personal["ano"]:"",
                    specialty:$scope.user.specialty,
                    info_source:"",
                    alternatives1:"",
                    alternatives2:"",
                    access_token:$localStorage.token
                });
                SettingpeopleService.addBase(postData).then(
                    function(res){
                        alert(res.data.msg);
                    },
                    function(rej){

                    }
                )
            }
        }

        $scope.all_config = {};

        ////基本信息
        //SettingpeopleService.getSexList().then(
        //    function(res){
        //        //if(res.data.code==200){
        //            $scope.sexlist=res.data.sex;
        //            $scope.address=res.data.address;
        //            $scope.minzulist=res.data.minzus;
        //            $scope.jiankanglist=res.data.jiankangs;
        //            $scope.zhijilist=res.data.zhijis;
        //            $scope.zhengzhilist=res.data.zhengzhis;
        //            $scope.zhuangtailist=res.data.zhuangtais;
        //        //}
        //    },
        //    function(rej){
        //    }
        //);
        //添加职务
        SettingpeopleService.getZhiwuList().then(
            function(res){
                //if(res.data.code==200){
                $scope.tongjileibie=res.data.tongjileibie;
                $scope.renzhizhuangtai=res.data.zhuangtai;
                $scope.jigou=res.data.jigou;
                $scope.lishu=res.data.lishu;
                $scope.jigouleibie=res.data.jigouleibie;
                $scope.zhiwuleibie=res.data.leibie;
                $scope.zhiwuzhiji=res.data.zhiji;
                $scope.jigoujibie=res.data.jibie;
                //}
            },
            function(rej){
            }
        );

        //职称
        SettingpeopleService.getZhichengList().then(
            function(res){
                //if(res.data.code==200){
                $scope.zhicheng=res.data.zhicheng;
                $scope.zhichengjibie=res.data.zhichengjibie;
                //}
            },
            function(rej){
            }
        );
        //时间控件


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

        //$scope.addpeople=function(){
        //    var modaltreeInstance = $modal.open({
        //        templateUrl: 'saveAddPeopleModel.html',
        //        controller: 'ModalAddPeopleInstanceCtrl',
        //        size: 'lg'
        //    });
        //    modaltreeInstance.result.then(function (name) {
        //        //vm.projects.push();
        //    }, function () {
        //        $log.info('Modal dismissed at: ' + new Date());
        //    });
        //}

        //$scope.updatepeople=function(people){
        //    var modaltreeInstance = $modal.open({
        //        templateUrl: 'saveUpdatePeopleModel.html',
        //        controller: 'ModalUpdatePeopleInstanceCtrl',
        //        size: 'lg',
        //        resolve:{
        //            people:function(){
        //                return people;
        //            }
        //        }
        //    });
        //    modaltreeInstance.result.then(function () {
        //        //vm.projects.push();
        //    }, function () {
        //        $log.info('Modal dismissed at: ' + new Date());
        //    });
        //}
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




