angular.module('app')
.service('SeetingtreeService',['$q','$http','SERVICE_URL','$localStorage',function($q,$http,SERVICE_URL,$localStorage){
    //单位树管理
    return{
        getTreeList:function(id){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/tree/getlist?parent=0&access_token='+$localStorage.token;
            if (id) {
                path+='';
            };
            var promise=$http.get(path).then(function(response){
                console.log(response);
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addTree:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/tree/add';
            var promise=$http.post(path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updateTree:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/tree/update?';
            var promise=$http.put( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        deleteTree:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/tree/delete?';
            var promise=$http.delete( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getPositionList:function(id){
            var deferred=$q.defer();
            var params=$.param({
                tree_id:  id,
                access_token:  $localStorage.token
            });
            var path=SERVICE_URL+'/setting/tree/position/getlist?';
            var promise=$http.get(path+params).then(function(response){
                console.log(response);
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updatePosition:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/tree/position/update?';
            var promise=$http.put( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addPosition:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/tree/position/add';
            var promise=$http.post(path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        deletePosition:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/tree/position/delete?';
            var promise=$http.delete( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        }
    }
}]).service('SettingdaimaService',['$q','$http','$localStorage','SERVICE_URL',function($q,$http,$localStorage,SERVICE_URL){
    //代码管理
    return{
        getCatalogList:function(){
            var deferred=$q.defer();
            var params=$.param({
                access_token:  $localStorage.token
            });
            var path=SERVICE_URL+'/setting/code/getCatalogList?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getCodagetList:function(catalog_id){
            var deferred=$q.defer();
            var params=$.param({
                catalog_id:catalog_id,
                access_token:  $localStorage.token
            });
            var path=SERVICE_URL+'/setting/code/getList?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addDaima:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/code/add';
            var promise=$http.post(path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        deleteDaima:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/code/delete?';
            var promise=$http.delete( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updateDaima:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/code/update?';
            var promise=$http.put( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        }

    }
}]).service('SettinguserService',['$q','$http','$localStorage','SERVICE_URL',function($q,$http,$localStorage,SERVICE_URL){
    //用户管理
    return{
        loginservice:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/security/login?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        logoutservice:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/security/logout';
            var promise=$http.post(path,params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getUserList:function(){
            var deferred=$q.defer();
            var params=$.param({
                access_token:  $localStorage.token
            });
            var path=SERVICE_URL+'/setting/sysuser/getUser?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addUser:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/sysuser/add';
            var promise=$http.post(path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updateUser:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/sysuser/update?';
            var promise=$http.put( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updatePassword:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/sysuser/uppsw?';
            var promise=$http.put( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        }

    }
}])
    .service('SettingpeopleService',['$q','$http','$localStorage','SERVICE_URL',function($q,$http,$localStorage,SERVICE_URL){
    //人员管理
    return{
        getPeopleList:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/getUser?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getPeopleBase:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/basicInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 现任职务 查询 添加 删除 修改
         * **/
        getPeoplepostinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/postInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addPeoplepostinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/postInfo/add';
            var promise=$http.post( path,params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updatePeoplepostinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/postInfo/update?';
            var promise=$http.put( path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        deletePeoplepostinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/postInfo/delete?';
            var promise=$http.delete( path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 职称 查询 添加 删除 修改
         * **/
        getPeopletitleinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/titleInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addPeopletitleinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/titleInfo/add';
            var promise=$http.post( path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updatePeopletitleinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/titleInfo/update?';
            var promise=$http.put( path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        deletePeopletitleinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/titleInfo/delete?';
            var promise=$http.delete( path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 学历 查询 添加 删除 修改
         * **/
        getEduinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/eduInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addEduinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/eduInfo/add';
            var promise=$http.post( path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updateEduinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/eduInfo/update?';
            var promise=$http.put( path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        deleteEduinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/eduInfo/delete?';
            var promise=$http.delete( path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 学位 查询 添加 删除 修改
         * **/
        getDegreeinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/degreeInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addDegreeinfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/degreeInfo/add';
            var promise=$http.post( path,params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 奖惩记录 查询 添加 删除 修改
         * **/
        getjiangchenginfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/jiangchengInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addjiangchenginfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/jiangchengInfo/add';
            var promise=$http.post( path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 年度考查 查询 添加 删除 修改
         * **/
        getexaminfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/examInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addexaminfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/examInfo/add';
            var promise=$http.post( path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 简历
         * **/
        getresumeInfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/resumeInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 家庭成员 查询 添加 删除 修改
         * **/
        getfamilyInfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/familyInfo?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addfamilyInfo:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/familyInfo/add';
            var promise=$http.post( path,params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        /**
         * 基本信息
         * **/
        savePhoto:function(params){
            var deferred=$q.defer();
            //var path='http://192.168.2.108:81/setting/user/basicInfo/upload';
            var path=SERVICE_URL+'/setting/user/basicInfo/upload';
            var promise=$http.post( path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updateBase:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/basicInfo/update?';
            var promise=$http.put( path+ params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        addBase:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/user/basicInfo/add';
            var promise=$http.post( path, params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getSexList: function () {
            var deferred=$q.defer();
            //var path=SERVICE_URL+'/setting/user/getUser?';
            var path='/public/app/api/sexlist';
            var promise=$http.get(path).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getZhiwuList: function () {
            var deferred=$q.defer();
            //var path=SERVICE_URL+'/setting/user/getUser?';
            var path='/public/app/api/zhiwulist';
            var promise=$http.get(path).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getZhichengList: function () {
            var deferred=$q.defer();
            //var path=SERVICE_URL+'/setting/user/getUser?';
            var path='/public/app/api/zhicheng';
            var promise=$http.get(path).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        }
    }
}])
    .service('UIMessageService',['$q','$http','$localStorage','SERVICE_URL',function($q,$http,$localStorage,SERVICE_URL){
    //信息浏览
    return{
        getMessageList:function(params){
            var deferred=$q.defer();
            //var path=SERVICE_URL+'/setting/sysuser/getUser?';
            var path='/public/app/api/message?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        }

    }
}]) .service('UIAdjustplanService',['$q','$http','$localStorage','SERVICE_URL',function($q,$http,$localStorage,SERVICE_URL){
    //调整方案
    return{
        getAdjustplanList:function(){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjustplan/list';
            var promise=$http.get(path).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getAdjustplanDetail:function(id){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjustplan/get?id='+id;
            var promise=$http.get(path).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        delAdjustPlan:function(id){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjustplan/delete?id='+id;
            var promise=$http.delete(path).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },

    }
}]).service('UIworktipservice', ['$q','$http','$localStorage','SERVICE_URL', function($q,$http,$localStorage,SERVICE_URL){
    //工作提示
    return{
        getworktipList:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/worktip/list?';
            //var path='/public/app/api/worktip';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                return response;
            });
            return promise;
        },
        getworkcategory:function(){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/worktip/category';
            var promise=$http.get(path).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        //getcategoryList:function(catalog_id){
        //    var deferred=$q.defer();
        //    var params=$.param({
        //        catalog_id:catalog_id,
        //        access_token:  $localStorage.token
        //    });
        //    var path=SERVICE_URL+'/setting/code/getList?';
        //    var promise=$http.get(path+params).then(function(response){
        //        return response;
        //    },function(response){
        //        console.log(response);
        //        return response;
        //    });
        //    return promise;
        //},
    }
}] ).service('UIanalysisservice', ['$q','$http','SERVICE_URL', function($q,$http,SERVICE_URL){
    //班子分析
    return{
        getanalysis:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/worktip/chart?';
            //var path='/public/app/api/worktip';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                return response;
            });
            return promise;
        },
        getanalysisdetail:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/worktip/chartdetails?';
            //var path='/public/app/api/worktip';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                return response;
            });
            return promise;
        }
    }
}] ).service('UIDeployservice', ['$q','$http','SERVICE_URL', function($q,$http,SERVICE_URL){
    //班子调配
    return{
        deploySave:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/analysis/batchsave?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                return response;
            });
            return promise;
        },
        getOneDeploy:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjust/unit?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                return response;
            });
            return promise;
        },
        getPeopleAnalysis:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/analysis/analysisBeforeChange?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                return response;
            });
            return promise;
        },
        //1.5 针对一个班子，分析提示需要交流的人员
        getBanziAnalysis:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/analysis/analysisWhenUpdate?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                return response;
            });
            return promise;
        },
        //1.7 调配方案保存前分析
        getTijiaoBanziAnalysis:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/analysis/analysisBeforeSave?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                return response;
            });
            return promise;
        }
    }
}] ).factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
        function($rootScope,   $browser,   $q,   $exceptionHandler) {
            // http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
            // adapted from angular's $timeout code
            var deferreds = {},
                methods = {},
                uuid = 0;

            function debounce(fn, delay, invokeApply) {
                var deferred = $q.defer(),
                    promise = deferred.promise,
                    skipApply = (angular.isDefined(invokeApply) && !invokeApply),
                    timeoutId, cleanup,
                    methodId, bouncing = false;

                // check we dont have this method already registered
                angular.forEach(methods, function(value, key) {
                    if(angular.equals(methods[key].fn, fn)) {
                        bouncing = true;
                        methodId = key;
                    }
                });

                // not bouncing, then register new instance
                if(!bouncing) {
                    methodId = uuid++;
                    methods[methodId] = {fn: fn};
                } else {
                    // clear the old timeout
                    deferreds[methods[methodId].timeoutId].reject('bounced');
                    $browser.defer.cancel(methods[methodId].timeoutId);
                }

                var debounced = function() {
                    // actually executing? clean method bank
                    delete methods[methodId];

                    try {
                        deferred.resolve(fn());
                    } catch(e) {
                        deferred.reject(e);
                        $exceptionHandler(e);
                    }

                    if (!skipApply) $rootScope.$apply();
                };

                timeoutId = $browser.defer(debounced, delay);

                // track id with method
                methods[methodId].timeoutId = timeoutId;

                cleanup = function(reason) {
                    delete deferreds[promise.$$timeoutId];
                };

                promise.$$timeoutId = timeoutId;
                deferreds[timeoutId] = deferred;
                promise.then(cleanup, cleanup);

                return promise;
            }


            // similar to angular's $timeout cancel
            debounce.cancel = function(promise) {
                if (promise && promise.$$timeoutId in deferreds) {
                    deferreds[promise.$$timeoutId].reject('canceled');
                    return $browser.defer.cancel(promise.$$timeoutId);
                }
                return false;
            };

            return debounce;
        }])
    .service('adjustdetailservice',['$q','$http','SERVICE_URL','$localStorage',function($q,$http,SERVICE_URL,$localStorage){
    //单位树管理
    return{
        //getAdjustList:function(id){
        //    var deferred=$q.defer();
        //    var params=$.param({
        //        access_token:  $localStorage.token
        //    });
        //    var path=SERVICE_URL+'/adjust/list?tree_id=1';
        //    var promise=$http.get(path+params).then(function(response){
        //        return response;
        //    },function(response){
        //        console.log(response);
        //        return response;
        //    });
        //    return promise;
        //},
        getAdjustList:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjust/list?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        delAdjustList:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjust/delete?';
            var promise=$http.delete(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        updateAdjustList:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjust/update?';
            var promise=$http.put(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getreasonList:function(){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjust/reason?';
            var promise=$http.get(path).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getzhiweiList:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/setting/tree/position/getlist?';
            var promise=$http.get(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        getadjustFix:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjust/update?';
            var promise=$http.put(path+params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        },
        saveadjust:function(params){
            var deferred=$q.defer();
            var path=SERVICE_URL+'/adjustplan/save';
            var promise=$http.post(path,params).then(function(response){
                return response;
            },function(response){
                console.log(response);
                return response;
            });
            return promise;
        }
    }
}])