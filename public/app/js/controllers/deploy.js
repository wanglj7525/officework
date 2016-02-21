'use strict';
app.controller('deployCtrl',[ '$scope', '$http', '$state','$timeout',
                       		function($scope, $http, $state, $timeout) {
	$scope.selecttable = [];
	$scope.alltable = [
	               { id:1,img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息1",nation:"汉",birthday:"196511",palce:"福清龙田",troops:"197712",party:"191212",education:"本科",school:"福建师范"},
	               { id:2,img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息2",nation:"汉",birthday:"195411",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
	               { id:3,img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息3",nation:"汉",birthday:"195711",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"},
	               { id:4,img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"女",company:"福清市xxx、xxx信息4",nation:"汉",birthday:"195311",palce:"福清龙田",troops:"197212",party:"197212",education:"本科",school:"福建师范"},
	               { id:5,img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息5",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"},
	               { id:6,img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息6",nation:"汉",birthday:"195011",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
	               { id:7,img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息7",nation:"汉",birthday:"197511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
	               { id:8,img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息8",nation:"汉",birthday:"198511",palce:"福清龙田",troops:"191212",party:"171212",education:"本科",school:"福建师范"},
	               { id:9,img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195411",palce:"福清龙田",troops:"197712",party:"197712",education:"本科",school:"福建师范"},
	               { id:10,img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"191212",education:"本科",school:"福建师范" },
	               { id:11,img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
	               { id:12,img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"女",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
	               { id:13,img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197712",party:"197712",education:"本科",school:"福建师范"},
	               { id:14,img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
	               { id:15,img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
	               { id:16,img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195111",palce:"福清龙田",troops:"197712",party:"197712",education:"本科",school:"福建师范"},
	               { id:17,img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"女",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"197212",education:"本科",school:"福建师范"},
	               { id:18,img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
	               { id:19,img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195111",palce:"福清龙田",troops:"197712",party:"197712",education:"本科",school:"福建师范"},
	               { id:20,img:'/public/app/img/a9.jpg', name:'张三10',sex:"女",company:"福清市xxx、xxx信息",nation:"汉",birthday:"191111",palce:"福清龙田",troops:"197212",party:"197212",education:"本科",school:"福建师范" },
	               {id:21,img:'/public/app/img/a10.jpg', name:'张三11' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195111",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"}];
	$scope.itemsByPageone=10;
	$scope.itemsByPage=10;
	
	$scope.removeFromSelectItem = function(row) {
		//删除已选择的人员
	     var index = $scope.selecttable.indexOf(row);
	     if (index !== -1) {
//	    	 $scope.alltable.push($scope.selecttable[index]);
	         $scope.selecttable.splice(index, 1);
	     }
	     //将所有列表中的该人员 设为选择状态
	 }
	$scope.removeFromAllItem = function(row) {
		console.log(row);
		//不用删除 可以将已选的设置为 不可选择状态
//		 var index = $scope.rowCollection.indexOf(row);
//		 if (index !== -1) {
//			 $scope.rowCollection.splice(index, 1);
//		 }
		 var index = $scope.alltable.indexOf(row);
		 if ($scope.selecttable.indexOf($scope.alltable[index])==-1) {
			 //添加未选择的联系人
			 $scope.selecttable.push($scope.alltable[index]);
//			 $scope.alltable.splice(index, 1);
		 }
	 }
		  
} ]);

