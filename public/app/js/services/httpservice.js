angular.module('app')
    .service('SeetingtreeService',['$q','$http','SERVICE_URL','$localStorage',function($q,$http,SERVICE_URL,$localStorage){
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
    }])