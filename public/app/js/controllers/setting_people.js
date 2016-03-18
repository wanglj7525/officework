'use strict';
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
app.controller('SetPeopleCtrl',['$scope','$http','$filter','$modal','$log','$localStorage','$debounce','Upload','TableDatePage','peoplelistservice','SettingpeopleService','SettingdaimaService',
    function($scope,$http,$filter,$modal,$log,$localStorage,$debounce,Upload,TableDatePage,peoplelistservice,SettingpeopleService,SettingdaimaService){
        $scope.isedit=false;
        $scope.showelse=false;
        //取消
        $scope.back_people=function(){
            $scope.isedit=false;
        }
        //分页获取数据
        var getMessageImageList = function () {
            var postData = $.param({
                keyword:$scope.searchtext,
                ranks:'',
                sexs:'',
                political_statuses:'',
                edu_levels:'',
                ages:'',
                pageNo: $scope.paginationConf.currentPage,
                pageSize: $scope.paginationConf.itemsPerPage,
                access_token:$localStorage.token
            });
            SettingpeopleService.getPeopleList(postData).then(
                function (res) {
                    console.log(res);
                    if(res.data.code==200){
                        $scope.paginationConf.totalItems = res.data.info.totalElements;
                        $scope.peoplelist = res.data.info.elements;
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
        $scope.elementSelect={};
        //“是、否”选择
        $scope.xuanze=[{"id":1,"value":"是"},{"id":2,"value":"否"}];
        //性别
        SettingdaimaService.getCodagetList("GB2261").then(function(res){ $scope.sexlist=res.data.info.list;},function(rej){});
        //地址
        SettingdaimaService.getCodagetList("ZB01").then(function(res){
            $scope.address=res.data.info.list;
            $scope.elementSelect.address=$scope.address
        },function(rej){});
        //民族
        SettingdaimaService.getCodagetList("GB3304").then(function(res){ $scope.minzulist=res.data.info.list;},function(rej){});
        //健康
        SettingdaimaService.getCodagetList("GB4767").then(function(res){ $scope.jiankanglist=res.data.info.list;},function(rej){});
        //职级
        SettingdaimaService.getCodagetList("FJ09").then(function(res){
            $scope.zhijilist=res.data.info.list;
            $scope.elementSelect.zhijilist=$scope.zhijilist
        },function(rej){});
        //政治面貌
        SettingdaimaService.getCodagetList("GB4762").then(function(res){
            $scope.zhengzhilist=res.data.info.list;
            $scope.elementSelect.zhengzhilist=$scope.zhengzhilist
        },function(rej){});
        //个人身份
        SettingdaimaService.getCodagetList("ZB06").then(function(res){ $scope.personallist=res.data.info.list;},function(rej){});
        //人员状态
        SettingdaimaService.getCodagetList("FJ14").then(function(res){ $scope.zhuangtailist=res.data.info.list;},function(rej){});
        //家庭关系
        SettingdaimaService.getCodagetList("GB4761").then(function(res){
            $scope.jiatingguanxi=res.data.info.list;
            $scope.elementSelect.jiatingguanxi=$scope.jiatingguanxi
        },function(rej){});
        //人员现状
        SettingdaimaService.getCodagetList("ZB56").then(function(res){
            $scope.renyuanxianzhuang=res.data.info.list;
            $scope.elementSelect.renyuanxianzhuang=$scope.renyuanxianzhuang
        },function(rej){});
        //考察类别
        SettingdaimaService.getCodagetList("ZB17").then(function(res){
            $scope.kaochaleibie=res.data.info.list;
            $scope.elementSelect.kaochaleibie=$scope.kaochaleibie
        },function(rej){});
        //考察结论
        SettingdaimaService.getCodagetList("ZB18").then(function(res){
            $scope.kaochajielun=res.data.info.list;
            $scope.elementSelect.kaochajielun=$scope.kaochajielun
        },function(rej){});
        //公务员工资级别
        SettingdaimaService.getCodagetList("ZBB90").then(function(res){
            $scope.gongzijibie=res.data.info.list;
            $scope.elementSelect.gongzijibie=$scope.gongzijibie
        },function(rej){});
        //工资档次
        SettingdaimaService.getCodagetList("ZB53").then(function(res){
            $scope.gongzidangci=res.data.info.list;
            $scope.elementSelect.gongzidangci=$scope.gongzidangci
        },function(rej){});
        //学位
        SettingdaimaService.getCodagetList("GB6864").then(function(res){
            $scope.xuewei=res.data.info.list;
            $scope.elementSelect.xuewei=$scope.xuewei
        },function(rej){});
        //学历
        SettingdaimaService.getCodagetList("GB4658").then(function(res){
            $scope.xueli=res.data.info.list;
            $scope.elementSelect.xuellist=$scope.xueli
        },function(rej){});
        //学历学位类别
        SettingdaimaService.getCodagetList("ZBB89").then(function(res){ $scope.xueweileibie=res.data.info.list;},function(rej){});
        //技术任职资格职称
        SettingdaimaService.getCodagetList("GB8561").then(function(res){
            $scope.jishurenzhizige=res.data.info.list;
            $scope.elementSelect.jishurenzhizige=$scope.jishurenzhizige
        },function(rej){});
        //职称级别
        SettingdaimaService.getCodagetList("ZBB51").then(function(res){ $scope.zhichengjibie=res.data.info.list;},function(rej){});
        //职务类别
        SettingdaimaService.getCodagetList("ZBB91").then(function(res){
            $scope.zhiwuleibie=res.data.info.list;
            $scope.elementSelect.zhiwuleibie=$scope.zhiwuleibie
        },function(rej){});
        //职务职级
        SettingdaimaService.getCodagetList("ZB09").then(function(res){ $scope.zhiwuzhiji=res.data.info.list;},function(rej){});
        //任职状态
        SettingdaimaService.getCodagetList("ZB14").then(function(res){
            $scope.renzhizhuangtai=res.data.info.list;
            $scope.elementSelect.renzhizhuangtai=$scope.renzhizhuangtai
        },function(rej){});
        //职务统计类别
        SettingdaimaService.getCodagetList("FJ12403").then(function(res){ $scope.zhiwutongjileibie=res.data.info.list;},function(rej){});
        //任职机构代码
        SettingdaimaService.getCodagetList("ZB02").then(function(res){
            $scope.renzhijigoudaima=res.data.info.list;
            $scope.elementSelect.renzhijigoudaima=$scope.renzhijigoudaima
        },function(rej){});
        //任职机构隶属
        SettingdaimaService.getCodagetList("GB12404").then(function(res){
            $scope.renzhijigoulishu=res.data.info.list;
            $scope.elementSelect.renzhijigoulishu=$scope.renzhijigoulishu
        },function(rej){});
        ////任职机构名称
        //SettingdaimaService.getCodagetList("ZB02").then(function(res){
        //    $scope.renzhijigoumingcheng=res.data.info.list;
        //    $scope.elementSelect.renzhijigoumingcheng=$scope.renzhijigoumingcheng
        //},function(rej){});
        //任职机构级别
        SettingdaimaService.getCodagetList("ZB03").then(function(res){
            $scope.renzhijigoujibie=res.data.info.list;
            $scope.elementSelect.renzhijigoujibie=$scope.renzhijigoujibie
        },function(rej){});
        //任职机构性质类别
        SettingdaimaService.getCodagetList("ZB04").then(function(res){
            $scope.renzhijigouxingzhi=res.data.info.list;
            $scope.elementSelect.renzhijigouxingzhi=$scope.renzhijigouxingzhi
        },function(rej){});


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
            //家庭成员
            SettingpeopleService.getfamilyInfo(postData).then(
                function(res){
                    if (res.data.code == 200) {
                        $scope.familyInfolist=res.data.info;
                    }
                },
                function(rej){

                }
            );
            //简历
            SettingpeopleService.getresumeInfo(postData).then(
                function(res){
                    if (res.data.code == 200) {
                        $scope.resumeinfo={};
                        $scope.resumeinfo=res.data.info[0];
                    }
                },
                function(rej){

                }
            );
            //年度考核
            SettingpeopleService.getexaminfo(postData).then(
                function(res){
                    if (res.data.code == 200) {
                        $scope.examinfolist=res.data.info;
                    }
                },
                function(rej){

                }
            );
            //奖惩记录
            $scope.jiangchenginfolist=[];
            SettingpeopleService.getjiangchenginfo(postData).then(
                function(res){
                    if (res.data.code == 200) {
                        $scope.jiangchenginfolist=res.data.info;
                    }
                },
                function(rej){

                }
            );
            //学位
            SettingpeopleService.getDegreeinfo(postData).then(
                function(res){
                    if (res.data.code == 200) {
                        $scope.degreeinfolist=res.data.info;
                    }
                },
                function(rej){

                }
            );
            //学历
            SettingpeopleService.getEduinfo(postData).then(
                function(res){
                    if (res.data.code == 200) {
                        $scope.eduinfolist=res.data.info;
                    }
                },
                function(rej){

                }
            );
            //职称
            SettingpeopleService.getPeopletitleinfo(postData).then(
                function(res){
                    if (res.data.code == 200) {
                        $scope.titleinfolist=res.data.info;
                    }
                },
                function(rej){

                }
            );
            //现任职务
            SettingpeopleService.getPeoplepostinfo(postData).then(
                function(res){
                    if (res.data.code == 200) {
                        $scope.postinfolist=res.data.info;
                    }
                },
                function(rej){

                }
            );
            SettingpeopleService.getPeopleBase(postData).then(
                function(res){
                    if(res.data.code==200){
                        $scope.user=res.data.info;
                        //$scope.user_photo=$rootScope.imageurl+$scope.user.head_pic;
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

        // upload later on form submit or something similar
        $scope.uploadphoto = function(file) {
            if (file) {
                //$scope.upload(file);
                Upload.base64DataUrl(file).then(function(urls){
                    console.log(urls);
                });
            }
        };

        //// upload on file select or drop
        //$scope.upload = function (file) {
        //    Upload.upload({
        //        url: 'upload/url',
        //        data: {file: file, 'username': $scope.username}
        //    }).then(function (resp) {
        //        console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        //    }, function (resp) {
        //        console.log('Error status: ' + resp.status);
        //    }, function (evt) {
        //        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //        console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        //    });
        //};
        //$scope.uploadphotod = function () {
        //    console.log($scope.photo_people);
        //    Upload.base64DataUrl($scope.photo_people).then(function(urls){
        //        console.log(urls);
        //    });
        //    //Upload.upload({
        //    //    url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
        //    //    data: {
        //    //        file: Upload.dataUrltoBlob(dataUrl, name)
        //    //    },
        //    //}).then(function (response) {
        //    //    $timeout(function () {
        //    //        $scope.result = response.data;
        //    //    });
        //    //}, function (response) {
        //    //    if (response.status > 0) $scope.errorMsg = response.status
        //    //        + ': ' + response.data;
        //    //}, function (evt) {
        //    //    $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
        //    //});
        //}



        //保存基本信息
        $scope.saveJiben=function(){
            $scope.showelse=true;
            if($scope.user.person_id){
                //修改
                var postData = $.param({
                    person_id:$scope.user.person_id,
                    head_pic:$scope.user.head_pic,
                    name:$scope.user.name,
                    sex:$scope.user.sex?$scope.user.sex["ano"]:"",
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
                    sex:$scope.user.sex?$scope.user.sex["ano"]:"",
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
        //保存简历
        $scope.savejianli=function(){

        }
        //添加职务
        $scope.addzhiwu=function(){
            var modalzwaddInstance = $modal.open({
                templateUrl: 'addzhiwuModel.html',
                controller: 'ModalAddzhiwuInstanceCtrl',
                size: 'lg',
                resolve:{
                    elementSelect:function(){
                        return $scope.elementSelect
                    }
                }
            });
            modalzwaddInstance.result.then(function (zhiwu) {
                var params=$.param({
                    person_id:  $scope.user.person_id,
                    organization_name:zhiwu.organization_id?zhiwu.organization_id['dz']:"",
                    location:zhiwu.location?zhiwu.location['ano']:"",
                    organization_id:zhiwu.organization_id?zhiwu.organization_id['ano']:"",
                    organization_membership:zhiwu.organization_membership?zhiwu.organization_membership['ano']:"",
                    organization_level:zhiwu.organization_level?zhiwu.organization_level['ano']:"",
                    organization_type:zhiwu.organization_type?zhiwu.organization_type['ano']:"",
                    post_name:zhiwu.post_name,
                    //职务统计类别 去掉
                    post_statistics_category:"",
                    post_category:zhiwu.post_category?zhiwu.post_category['ano']:"",
                    rank:zhiwu.rank?zhiwu.rank['ano']:"",
                    post_oder:zhiwu.post_oder,
                    post_all_oder:zhiwu.post_all_oder,
                    working_date:$filter("date")(zhiwu.working_date, "yyyyMMdd"),
                    working_number:zhiwu.working_number,
                    work_status:zhiwu.work_status?zhiwu.work_status['ano']:"",
                    depose_date:$filter("date")(zhiwu.depose_date, "yyyyMMdd"),
                    rank_time:$filter("date")(zhiwu.rank_time, "yyyyMMdd"),
                    //原单位及职务
                    ex_unit_post:"",
                    //统计标识ZBB81
                    statistics_logo:"",
                    no:0,
                    access_token:$localStorage.token
                });
                SettingpeopleService.addPeoplepostinfo(params).then(
                    function(res){
                        if(res.data.code==200){
                            $scope.postinfolist.push(res.data.info);
                        }else{
                            alert("添加失败");
                        }
                    },
                    function(rej){

                    }
                )
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        //修改职务
        $scope.updatezhiwu=function(zhiwu){
            $scope.newdata=angular.copy(zhiwu);
            var modalzwaddInstance = $modal.open({
                templateUrl: 'updatezhiwuModel.html',
                controller: 'ModalUpdatezhiwuInstanceCtrl',
                size: 'lg',
                resolve:{
                    elementSelect:function(){
                        return $scope.elementSelect
                    },
                    newdata: function () {
                        return  $scope.newdata;
                    }
                }
            });
            modalzwaddInstance.result.then(function () {
                var params=$.param({
                    person_id:  $scope.user.person_id,
                    organization_name:$scope.newdata.organization_id?$scope.newdata.organization_id['dz']:"",
                    location:$scope.newdata.location?$scope.newdata.location['ano']:"",
                    organization_id:$scope.newdata.organization_id?$scope.newdata.organization_id['ano']:"",
                    organization_membership:$scope.newdata.organization_membership?$scope.newdata.organization_membership['ano']:"",
                    organization_level:$scope.newdata.organization_level?$scope.newdata.organization_level['ano']:"",
                    organization_type:$scope.newdata.organization_type?$scope.newdata.organization_type['ano']:"",
                    post_name:$scope.newdata.post_name,
                    //职务统计类别 去掉
                    post_statistics_category:"",
                    post_category:$scope.newdata.post_category?$scope.newdata.post_category['ano']:"",
                    rank:$scope.newdata.rank?$scope.newdata.rank['ano']:"",
                    post_oder:$scope.newdata.post_oder,
                    post_all_oder:$scope.newdata.post_all_oder,
                    working_date:$filter("date")($scope.newdata.working_date, "yyyyMMdd"),
                    working_number:$scope.newdata.working_number,
                    work_status:$scope.newdata.work_status?$scope.newdata.work_status['ano']:"",
                    depose_date:$filter("date")($scope.newdata.depose_date, "yyyyMMdd"),
                    rank_time:$filter("date")($scope.newdata.rank_time, "yyyyMMdd"),
                    //原单位及职务
                    ex_unit_post:"",
                    //统计标识ZBB81
                    statistics_logo:"",
                    no:0,
                    access_token:$localStorage.token
                });
                //SettingpeopleService.addPeoplepostinfo(params).then(
                //    function(res){
                //        if(res.data.code==200){
                //            $scope.postinfolist.push(res.data.info);
                //        }else{
                //            alert("添加失败");
                //        }
                //    },
                //    function(rej){
                //
                //    }
                //)
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }

        //添加职称
        $scope.addzhicheng=function(){
            var modalzwaddInstance = $modal.open({
                templateUrl: 'addzhichengModel.html',
                controller: 'ModalAddzhichengInstanceCtrl',
                size: 'md',
                resolve:{
                    elementSelect:function(){
                        return $scope.elementSelect
                    }
                }
            });
            modalzwaddInstance.result.then(function (zhicheng) {
                var params=$.param({
                    person_id:  $scope.user.person_id,
                    title_name:zhicheng.title_name?zhicheng.title_name['ano']:"",
                    get_date:$filter("date")(zhicheng.get_date, "yyyyMMdd"),
                    access_token:$localStorage.token
                });
                SettingpeopleService.addPeopletitleinfo(params).then(
                    function(res){
                        if(res.data.code==200){
                            $scope.titleinfolist.push(res.data.info);
                        }else{
                            alert("添加失败");
                        }
                    },
                    function(rej){

                    }
                )
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        //添加学历
        $scope.addxueli=function(){
            var modalzwaddInstance = $modal.open({
                templateUrl: 'addxueliModel.html',
                controller: 'ModalAddxueliInstanceCtrl',
                size: 'md',
                resolve:{
                    elementSelect:function(){
                        return $scope.elementSelect
                    }
                }
            });
            modalzwaddInstance.result.then(function (xueli) {
                var params=$.param({
                    person_id:  $scope.user.person_id,
                    edu_level:xueli.edu_level?xueli.edu_level['ano']:"",
                    greduation_date:$filter("date")(xueli.greduation_date, "yyyyMMdd"),
                    school_name:xueli.school_name,
                    profession_name:xueli.profession_name,
                    access_token:$localStorage.token
                });
                SettingpeopleService.addEduinfo(params).then(
                    function(res){
                        if(res.data.code==200){
                            $scope.eduinfolist.push(res.data.info);
                        }else{
                            alert("添加失败");
                        }
                    },
                    function(rej){

                    }
                )
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        //添加学位
        $scope.addxuewei=function(){
            var modalzwaddInstance = $modal.open({
                templateUrl: 'addxueweiModel.html',
                controller: 'ModalAddxueweiInstanceCtrl',
                size: 'md',
                resolve:{
                    elementSelect:function(){
                        return $scope.elementSelect
                    }
                }
            });
            modalzwaddInstance.result.then(function (xuewei) {
                var params=$.param({
                    person_id:  $scope.user.person_id,
                    degree_name:xuewei.degree_name?xuewei.degree_name['ano']:"",
                    school_name:xuewei.school_name,
                    access_token:$localStorage.token
                });
                SettingpeopleService.addDegreeinfo(params).then(
                    function(res){
                        if(res.data.code==200){
                            $scope.degreeinfolist.push(res.data.info);
                        }else{
                            alert("添加失败");
                        }
                    },
                    function(rej){

                    }
                )
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        //添加奖惩记录
        $scope.addjiangcheng=function(){
            var modalzwaddInstance = $modal.open({
                templateUrl: 'addjiangchengModel.html',
                controller: 'ModalAddjiangchengInstanceCtrl',
                size: 'md',
                resolve:{
                    elementSelect:function(){
                        return $scope.elementSelect
                    }
                }
            });
            modalzwaddInstance.result.then(function (jiangcheng) {
                var params=$.param({
                    person_id:  $scope.user.person_id,
                    wage_level:jiangcheng.wage_level?jiangcheng.wage_level['ano']:"",
                    wage_grade:jiangcheng.wage_grade?jiangcheng.wage_grade['ano']:"",
                    explanation:jiangcheng.explanation,
                    wage_level_2:jiangcheng.wage_level_2,
                    access_token:$localStorage.token
                });
                SettingpeopleService.addjiangchenginfo(params).then(
                    function(res){
                        if(res.data.code==200){
                            $scope.jiangchenginfolist.push(res.data.info);
                        }else{
                            alert("添加失败");
                        }
                    },
                    function(rej){

                    }
                )
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        //添加年度考核
        $scope.addkaohe=function(){
            var modalzwaddInstance = $modal.open({
                templateUrl: 'addkaoheModel.html',
                controller: 'ModalAddkaoheInstanceCtrl',
                size: 'md',
                resolve:{
                    elementSelect:function(){
                        return $scope.elementSelect
                    }
                }
            });
            modalzwaddInstance.result.then(function (kaocha) {
                var params=$.param({
                    person_id:  $scope.user.person_id,
                    exa_category:kaocha.exa_category?kaocha.exa_category['ano']:"",
                    exa_result:kaocha.exa_result?kaocha.exa_result['ano']:"",
                    exa_date:$filter("date")(kaocha.exa_date, "yyyyMMdd"),
                    access_token:$localStorage.token
                });
                SettingpeopleService.addexaminfo(params).then(
                    function(res){
                        if(res.data.code==200){
                            $scope.jiangchenginfolist.push(res.data.info);
                        }else{
                            alert("添加失败");
                        }
                    },
                    function(rej){

                    }
                )
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        //添加家庭成员
        $scope.addjiating=function(peopleid){
            var modalzwaddInstance = $modal.open({
                templateUrl: 'addjiatingModel.html',
                controller: 'ModalAddjiatingInstanceCtrl',
                size: 'md',
                resolve:{
                    elementSelect:function(){
                        return $scope.elementSelect
                    }
                }
            });
            modalzwaddInstance.result.then(function (jiating) {
                var params=$.param({
                    person_id:  $scope.user.person_id,
                    family_name:jiating.family_name,
                    renationship_number:jiating.renationship_number?jiating.renationship_number['ano']:"",
                    family_birthday:$filter("date")(jiating.family_birthday, "yyyyMMdd"),
                    family_org_name:jiating.family_org_name,
                    family_poli:jiating.family_poli?jiating.family_poli['ano']:"",
                    family_status:jiating.family_status?jiating.family_status['ano']:"",
                    access_token:$localStorage.token
                });
                SettingpeopleService.addexaminfo(params).then(
                    function(res){
                        if(res.data.code==200){
                            $scope.jiangchenginfolist.push(res.data.info);
                        }else{
                            alert("添加失败");
                        }
                    },
                    function(rej){

                    }
                )
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
    }]);
app.controller('ModalAddzhiwuInstanceCtrl', ['$scope', '$modalInstance','elementSelect',function($scope, $modalInstance,elementSelect) {
    $scope.elementSelect=elementSelect;
    $scope.zhiwu={};
    $scope.ok = function () {
        $modalInstance.close($scope.zhiwu);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalUpdatezhiwuInstanceCtrl', ['$scope', '$modalInstance','elementSelect','newdata',function($scope, $modalInstance,elementSelect,newdata) {
    $scope.elementSelect=elementSelect;
    $scope.newdata=newdata;

    //任职状态
    if($scope.newdata.work_status){
        for(var i=0;i<$scope.elementSelect.renzhizhuangtai.length;i++){
            if($scope.newdata.work_status==$scope.elementSelect.renzhizhuangtai[i].ano){
                $scope.newdata.work_status=$scope.elementSelect.renzhizhuangtai[i];
            }
        }
    }
    //任职机构
    if($scope.newdata.organization_id){
        for(var i=0;i<$scope.elementSelect.renzhijigoudaima.length;i++){
            if($scope.newdata.organization_id==$scope.elementSelect.renzhijigoudaima[i].ano){
                $scope.newdata.organization_id=$scope.elementSelect.renzhijigoudaima[i];
            }
        }
    }
    //任职机构所属地
    if($scope.newdata.location){
        for(var i=0;i<$scope.elementSelect.address.length;i++){
            if($scope.newdata.location==$scope.elementSelect.address[i].ano){
                $scope.newdata.location=$scope.elementSelect.address[i];
            }
        }
    }
    //任职机构隶属
    if($scope.newdata.organization_membership){
        for(var i=0;i<$scope.elementSelect.renzhijigoulishu.length;i++){
            if($scope.newdata.organization_membership==$scope.elementSelect.renzhijigoulishu[i].ano){
                $scope.newdata.organization_membership=$scope.elementSelect.renzhijigoulishu[i];
            }
        }
    }
    //任职机构性质类别
    if($scope.newdata.organization_type){
        for(var i=0;i<$scope.elementSelect.renzhijigouxingzhi.length;i++){
            if($scope.newdata.organization_type==$scope.elementSelect.renzhijigouxingzhi[i].ano){
                $scope.newdata.organization_type=$scope.elementSelect.renzhijigouxingzhi[i];
            }
        }
    }
    //职务类别
    if($scope.newdata.post_category){
        for(var i=0;i<$scope.elementSelect.zhiwuleibie.length;i++){
            if($scope.newdata.post_category==$scope.elementSelect.zhiwuleibie[i].ano){
                $scope.newdata.post_category=$scope.elementSelect.zhiwuleibie[i];
            }
        }
    }
    //职级
    if($scope.newdata.rank){
        for(var i=0;i<$scope.elementSelect.zhijilist.length;i++){
            if($scope.newdata.rank==$scope.elementSelect.zhijilist[i].ano){
                $scope.newdata.rank=$scope.elementSelect.zhijilist[i];
            }
        }
    }
    //任职机构级别
    if($scope.newdata.organization_level){
        for(var i=0;i<$scope.elementSelect.renzhijigoujibie.length;i++){
            if($scope.newdata.organization_level==$scope.elementSelect.renzhijigoujibie[i].ano){
                $scope.newdata.organization_level=$scope.elementSelect.renzhijigoujibie[i];
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
app.controller('ModalAddzhichengInstanceCtrl', ['$scope', '$modalInstance','elementSelect',function($scope, $modalInstance,elementSelect) {
    $scope.elementSelect=elementSelect;
    $scope.zhicheng={};
    $scope.ok = function () {
        $modalInstance.close($scope.zhicheng);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddxueliInstanceCtrl', ['$scope', '$modalInstance','elementSelect',function($scope, $modalInstance,elementSelect) {
    $scope.elementSelect=elementSelect;
    $scope.xueli={};
    $scope.ok = function () {
        $modalInstance.close($scope.xueli);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddxueweiInstanceCtrl', ['$scope', '$modalInstance','elementSelect',function($scope, $modalInstance,elementSelect) {
    $scope.elementSelect=elementSelect;
    $scope.xuewei={};
    $scope.ok = function () {
        $modalInstance.close($scope.xuewei);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddjiangchengInstanceCtrl',  ['$scope', '$modalInstance','elementSelect',function($scope, $modalInstance,elementSelect) {
    $scope.elementSelect=elementSelect;
    $scope.jiangcheng={};
    $scope.ok = function () {
        $modalInstance.close($scope.jiangcheng);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddkaoheInstanceCtrl',['$scope', '$modalInstance','elementSelect',function($scope, $modalInstance,elementSelect) {
    $scope.elementSelect=elementSelect;
    $scope.kaocha={};
    $scope.ok = function () {
        $modalInstance.close($scope.kaocha);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
app.controller('ModalAddjiatingInstanceCtrl',['$scope', '$modalInstance','elementSelect',function($scope, $modalInstance,elementSelect) {
    $scope.elementSelect=elementSelect;
    $scope.jiating={};
    $scope.ok = function () {
        $modalInstance.close($scope.jiating);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);
//app.controller('addPeopleController',['$scope', '$http', '$state', function($scope, $http, $state){
//    //上传头像
//    $scope.myImage='';
//
//    var handleFileSelect=function(evt) {
//        console.log(evt);
//        var file=evt.currentTarget.files[0];
//        var reader = new FileReader();
//        reader.onload = function (evt) {
//            $scope.$apply(function($scope){
//                $scope.myImage=evt.target.result;
//                console.log( $scope.myImage);
//            });
//        };
//        reader.readAsDataURL(file);
//    };
//    angular.element(document.querySelector('#fileInput')).on('change',handleFileSelect);
//
//    $scope.onemessage= {
//        "id": 1,
//        "img": "/public/app/img/a0.jpg",
//        "name": "张三1",
//        "sex": "男",
//        "company": "福清市xxx、xxx信息",
//        "nation": "汉",
//        "birthday": "19551111",
//        "palce": "福清龙田",
//        "troops": "19771212",
//        "party": "19771212",
//        "education": "本科",
//        "school": "福建师范",
//        "health":"健康或良好",
//        "zhengzhi":"中国共产党党员",
//        "shenfenzheng":"11111111111111111111111x",
//        "zhuanchang":"唱歌",
//        "beiwang":"备忘1",
//        "beiyong1":"备用1",
//        "beiyong2":"备用2",
//        "zhiji":"处长",
//        "gerenshenfen":"xx处长",
//        "zhuangtai":"退休",
//        "zhicheng":"中级职称"
//    };
//    $scope.selectedIndex = 0;
//
//
//
//}]);

