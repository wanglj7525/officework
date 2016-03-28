// config

var app =  
angular.module('app')   .constant('STATIC_PATH','/public/app/')
    .constant('SERVICE_URL','http://192.168.2.108:81')
    //.constant('SERVICE_URL','http://192.168.2.117:81')
    //.constant('SERVICE_URL','http://192.168.2.136:8080')
    //.constant('SERVICE_URL','http://183.252.21.100:39001')
    //.constant('SERVICE_URL','http://192.168.2.108:81')
  .config(
    [        '$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;
    }
  ])
  .config(['$translateProvider', function($translateProvider){
    // Register a loader for the static files
    // So, the module will search missing translation tables under the specified urls.
    // Those urls are [prefix][langKey][suffix].
    $translateProvider.useStaticFilesLoader({
      prefix: '/public/app/l10n/',
      suffix: '.js'
    });
    // Tell the module what language to use by default
    $translateProvider.preferredLanguage('zh_CN');
    // Tell the module to store the language in the local storage
    $translateProvider.useLocalStorage();
  }])
  .config(function($httpProvider) {
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
      //$httpProvider.defaults.withCredentials = true;
      $httpProvider.interceptors.push(['$q','$injector', '$localStorage',function($q,$injector,$localStorage){
          return {
              'request': function (config) {
                  //请求添加token
                  config.headers = config.headers || {};
                  //if ($localStorage.token) {
                  //    //config.headers['x-access-token']=$localStorage.token;
                  //}
                  return config;
              },
              'response':function(response){
                  if(response.data.code&&response.data.code==403){
                      console.log("access_token 失效");
                      $localStorage.token='0';
                      delete  $localStorage.treeselect;
                      delete  $localStorage.tree_uuid;
                      var stateService = $injector.get('$state');
                      stateService.go("access.signin");
                      return $q.reject(response);
                  }else{
                      if(response.data&&response.data.info&&response.data.info.access_token){
                          $localStorage.token=response.data.info.access_token;
                      }
                  }
                  return response;
              },
              'responseError': function(response) {
                  console.log("responseError==");
                  console.log(response);
                  if(response.status === 401 || response.status === 403) {
                      $state.go("access.signin");
                      //TODO token过期 弹出登陆框 重新登录
                  }
                  return $q.reject(response);
              }
          };
      }]);
    // Override $http service's default transformRequest
    $httpProvider.defaults.transformRequest = [function(data) {
        /**
         * The workhorse; converts an object to x-www-form-urlencoded serialization.
         * @param {Object} obj
         * @return {String}
         */
        var param = function(obj) {
            var query="";
            var name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                } else if (value !== undefined && value !== null) {
                    query += encodeURIComponent(name) + '='
                            + encodeURIComponent(value) + '&';
                }
            }

            console.log("---"+query);
            return query.length ? query.substr(0, query.length - 1) : query;
        };

        return angular.isObject(data) && String(data) !== '[object File]'
                ? param(data)
                : data;
    }];
});