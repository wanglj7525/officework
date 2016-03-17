'use strict';

/* Controllers */

angular.module('app')
    .controller('AppCtrl', ['$rootScope','$scope', '$translate', '$localStorage', '$window','$state','$modal','$log','Auth','SettinguserService','SERVICE_URL',
      function(             $rootScope, $scope,   $translate,   $localStorage,   $window ,$state,$modal,$log,Auth,SettinguserService,SERVICE_URL) {
        $rootScope.imageurl=SERVICE_URL;
        $rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
          $rootScope.Auth=Auth;
          //避免未登录用户直接输入路由地址来跳转到登录界面地址
          console.log("切换路由--"+toState.name+"--"+$localStorage.token);
          if(toState.name=='app.adjustplan'||toState.name=='app.setting.tree'){
            $scope.isshowtree=false;
            $scope.hassearch=false;
          }else if(toState.name=='app.message'){
            $scope.isshowtree=true;
            $scope.hassearch=true;
          }
          if($localStorage.token!='0'||toState.name=='access.signin'){
            return
          }
          if($localStorage.token=="0"){
            event.preventDefault();// 取消默认跳转行为
            $state.go("access.signin");
          }

          //if($localStorage.token!='0'||toState.name=='access.signin'){
          //  console.log("zhengchang");
          //  return
          //}else{
          //  $state.go("access.signin");
          //}
          //if(toState.name=='login')return;// 如果是进入登录界面则允许
          //// 如果用户不存在
          //if(!$rootScope.user || !$rootScope.user.token){
          //  event.preventDefault();// 取消默认跳转行为
          //  $state.go("login",{from:fromState.name,w:'notLogin'});//跳转到登录界面
          //}
        });
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        if(isIE){ angular.element($window.document.body).addClass('ie');}
        if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')};

        //获取屏幕高度
        $scope.showheight=$window.innerHeight-51;
        console.log($scope.showheight);
        //退出
        $scope.logout=function(){
          var params=$.param({
            username : $localStorage.user.username
          });
          SettinguserService.logoutservice(params).then(
              function(res){
                $localStorage.token='0';
                delete  $localStorage.treeselect;
                delete  $localStorage.tree_uuid;
                $state.go("access.signin");
              },
              function(rej){
                $localStorage.token='0';
                //delete  $localStorage.treeselect;
                $state.go("access.signin");
              }
          );
        }
        /*切换单位树*/
        $scope.treeToggle=function(){

        }
        //修改密码
        $scope.updatepassword=function(){
          var modaluserInstance = $modal.open({
            templateUrl: 'updatePasswordModel.html',
            controller: 'ModalUpdatePasswordInstanceCtrl',
            size: 'sm'
          });
          modaluserInstance.result.then(function (newdata) {
            var params=$.param({
              //id: $localStorage.user.id,
              //oldpassword:newdata.oldpassword,
              //password:  newdata.password,
              access_token:$localStorage.token
            });
            //调用后台保存 成功后重新登录
            SettinguserService.updatePassword(params).then(
                function (res) {
                  if(res.data.code==200){
                    $localStorage.token='0';
                    $state.go("access.signin");
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
        //左侧菜单是否显示//左侧菜单显示查询条件
        $scope.changeMenu=function(showtree,showsearch){
          $scope.isshowtree=showtree;
          $scope.hassearch=showsearch;
        }

        $scope.treeselected=$localStorage.treeselect;
        console.log("菜单左树："+$scope.treeselected);
        $scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
          $scope.treeselected=$localStorage.treeselect;
          console.log("菜单左树变换："+$scope.treeselected);
        });

        // config
        $scope.app = {
          name: '领导班子分析调配系统',
          version: '0.0.1',
        }
        // angular translate
        $scope.lang = { isopen: false };
        $scope.langs = {zh_CN:'简体中文'};
        $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "English";
        $scope.setLang = function(langKey, $event) {
          // set the current lang
          $scope.selectLang = $scope.langs[langKey];
          // You can change the language during runtime
          $translate.use(langKey);
          $scope.lang.isopen = !$scope.lang.isopen;
        };

        function isSmartDevice( $window )
        {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          console.log("移动设备");
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows
          // mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

      }]);
app.controller('ModalUpdatePasswordInstanceCtrl', ['$scope', '$modalInstance',function($scope, $modalInstance) {
  $scope.newdata={
    oldpassword:"",
    password:""
  };
  $scope.ok = function () {
    $modalInstance.close($scope.newdata);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);