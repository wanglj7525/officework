app.controller('TableCtrl', ['$scope', '$timeout', function($scope, $timeout) {
	 $scope.tabs = [
	                { img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范" },
	                { img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范" },
	                { img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范" },
	                { img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范" },
	                { img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"},
	                { img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范" },
	                { img:'/public/app/img/a10.jpg', name:'张三11' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"19551111",palce:"福清龙田",troops:"19771212",party:"19771212",education:"本科",school:"福建师范"}];
	 $scope.itemsByPage=10;

//  $scope.rowCollectionPage = [];
//  for (var j = 0; j < 20; j++) {
//    $scope.rowCollectionPage.push(generateRandomItem(j));
//  }

}]);