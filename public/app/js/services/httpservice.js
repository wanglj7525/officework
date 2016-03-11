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
}]).service('SettingpeopleService',['$q','$http','$localStorage','SERVICE_URL',function($q,$http,$localStorage,SERVICE_URL){
    //用户管理
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
        }

    }
}]).service('UIMessageService',['$q','$http','$localStorage','SERVICE_URL',function($q,$http,$localStorage,SERVICE_URL){
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
}]).factory('$debounce', ['$rootScope', '$browser', '$q', '$exceptionHandler',
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
        }]);