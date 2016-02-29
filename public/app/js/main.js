'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window','$state',
    function(              $scope,   $translate,   $localStorage,   $window ,$state) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      if(isIE){ angular.element($window.document.body).addClass('ie');}
      if(isSmartDevice( $window ) ){ angular.element($window.document.body).addClass('smart')};

      $scope.logout=function(){
        delete $localStorage.token;
        console.log($localStorage.token);
        $state.go("access.signin");
      }
      /*切换单位树*/
      $scope.treeToggle=function(){
        
      }

      // config
      $scope.app = {
        name: '领导班子分析调配系统',
        version: '0.0.1',
        // for chart colors
        //color: {
        //  primary: '#7266ba',
        //  info:    '#23b7e5',
        //  success: '#27c24c',
        //  warning: '#fad733',
        //  danger:  '#f05050',
        //  light:   '#e8eff0',
        //  dark:    '#3a3f51',
        //  black:   '#1c2b36'
        //},
        //settings: {
        //  themeID: 1,
        //  navbarHeaderColor: 'bg-black',
        //  navbarCollapseColor: 'bg-white-only',
        //  asideColor: 'bg-black',
        //  headerFixed: true,
        //  asideFixed: false,
        //  asideFolded: false,
        //  asideDock: false,
        //  container: false
        //}
      }

      // save settings to local storage
      //if ( angular.isDefined($localStorage.settings) ) {
      //  $scope.app.settings = $localStorage.settings;
      //} else {
      //  $localStorage.settings = $scope.app.settings;
      //}
      //$scope.$watch('app.settings', function(){
      //  if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
      //    // aside dock and fixed must set the header fixed.
      //    $scope.app.settings.headerFixed = true;
      //  }
      //  // for box layout, add background image
      //  $scope.app.settings.container ? angular.element('html').addClass('bg') : angular.element('html').removeClass('bg');
      //  // save to local storage
      //  $localStorage.settings = $scope.app.settings;
      //}, true);

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

      //$scope.$on('$stateChangeStart',function(event, toState){
      //  console.log("切换路由"+toState.name+"--"+$localStorage.token);
      //  if(toState.name=='signin')return;// 如果是进入登录界面则允许
      //  // 如果用户不存在
      //  //if(!$rootScope.user || !$rootScope.user.token){
      //  if(!$localStorage.token){
      //    event.preventDefault();// 取消默认跳转行为
      //    $state.go("access.signin");//跳转到登录界面
      //  }
      //});
  //}]).controller('TimeController', ['$scope','$timeout', function(s,t){
  //  //页面显示当前日期时间
  //    var updateTime=function(){
  //      s.clock={
  //        time:new Date()
  //      };
  //      t(function(){
  //        s.clock.time=new Date();
  //        updateTime();
  //      },1000);
  //    }
  //    updateTime();
  }]);