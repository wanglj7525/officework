'use strict';
app.controller('adjustdetailController',[ '$scope', '$http', '$state','$timeout','$stateParams','adjustdetailservice',
	function($scope, $http, $state, $timeout,$stateParams,adjustdetailservice) {
		$scope.id = $stateParams.id;
		adjustdetailservice.getData().then(
			function (res) {
				$scope.adjusttable = res.data.info
			},
			function (rej) {
				console.log(rej);
			}
		);
	}
]);
app.controller('adjustController',[ '$scope', '$http', '$state','$timeout','$localStorage','adjustlistservice','adjustreason',
                       		function($scope, $http, $state, $timeout,$localStorage,adjustlistservice,adjustreason) {
								$scope.treeselected=$localStorage.treeselect;
								console.log("调整一览左树："+$scope.treeselected);
								$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
									$scope.treeselected=$localStorage.treeselect;
									console.log("调整一览左树变换："+$scope.treeselected);
								});
				//获取调配原因
				adjustreason.getData().then(
				function (res) {
					$scope.reasons = res.data.info
				 },
					function (rej) {
						console.log(rej);
					}
				);
				//获取人员信息
				adjustlistservice.getData().then(
					function (res) {
						$scope.adjustlist = res.data.info;
					},
					function (rej) {
						console.log(rej);
					}
				);
			  

	//$scope.selecttable = [
	//               { id:1,img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息1",nation:"汉",birthday:"196511",palce:"福清龙田",troops:"197712",party:"191212",education:"本科",school:"福建师范"},
	//               { id:2,img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息2",nation:"汉",birthday:"195411",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
	//               { id:3,img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息3",nation:"汉",birthday:"195711",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"},
	//               { id:4,img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"女",company:"福清市xxx、xxx信息4",nation:"汉",birthday:"195311",palce:"福清龙田",troops:"197212",party:"197212",education:"本科",school:"福建师范"},
	//               { id:5,img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息5",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"},
	//               { id:6,img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息6",nation:"汉",birthday:"195011",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
	//               { id:7,img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息7",nation:"汉",birthday:"197511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
	//               { id:8,img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息8",nation:"汉",birthday:"198511",palce:"福清龙田",troops:"191212",party:"171212",education:"本科",school:"福建师范"},
	//               { id:9,img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195411",palce:"福清龙田",troops:"197712",party:"197712",education:"本科",school:"福建师范"},
	//               { id:10,img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"191212",education:"本科",school:"福建师范" },
	//               { id:11,img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
	//               { id:12,img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"女",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
	//               {id:21,img:'/public/app/img/a10.jpg', name:'张三11' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195111",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"}];
	
	 $scope.userState = '';

	  $scope.toppings = [
	                     {name:'主任',id:'1'},
	                     {name:'处长',id:'2'},
	                     {name:'科长',id:'3'},
	                     {name:'科员',id:'4'},
	                     {name:'领导',id:'5'},
	                     {name:'退休',id:'6'}
//	    { category: 'meat', name: 'Pepperoni' },
//	    { category: 'meat', name: 'Sausage' },
//	    { category: 'meat', name: 'Ground Beef' },
//	    { category: 'meat', name: 'Bacon' },
//	    { category: 'veg', name: 'Mushrooms' },
//	    { category: 'veg', name: 'Onion' },
//	    { category: 'veg', name: 'Green Pepper' },
//	    { category: 'veg', name: 'Green Olives' },
	  ];

	
} ]);

