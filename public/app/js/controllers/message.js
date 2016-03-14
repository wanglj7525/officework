'use strict';
  app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
  app.controller('MessageController', [ '$scope', '$http', '$state','$timeout','$modal','$log','$localStorage','UIMessageService','messageservice','searchservice','SettingpeopleService','SettingdaimaService',
		function($scope, $http, $state, $timeout,$modal,$log,$localStorage,UIMessageService,messageservice,searchservice,SettingpeopleService,SettingdaimaService) {
			$scope.treeselected=$localStorage.treeselect;
			$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
				if(newValue===oldValue) return;
				$scope.treeselected=$localStorage.treeselect;
			});

			//性别
			SettingdaimaService.getCodagetList("GB2261").then(function(res){ $scope.sexlist=res.data.info.list;},function(rej){});
			//职级
			SettingdaimaService.getCodagetList("FJ09").then(function(res){ $scope.zhijilist=res.data.info.list;},function(rej){});
			//政治面貌
			SettingdaimaService.getCodagetList("GB4762").then(function(res){ $scope.zhengzhilist=res.data.info.list;},function(rej){});
			//学历
			SettingdaimaService.getCodagetList("GB4658").then(function(res){ $scope.xuelilist=res.data.info.list;},function(rej){});

			$scope.selectparam=[];
			//职级
			$scope.rank=[];
			//性别
			$scope.xingbie=[];
			//政治面貌
			$scope.politicalstatus=[];
			//学历
			$scope.edulevel=[];
			//年龄
			$scope.age=[];
			$scope.search={};
			$scope.status = {
				open: false
			};
			searchservice.getData().then(
				function (res) {
					$scope.nianlinglist = res.data.info;
				},
				function (rej) {
					console.log(rej);
				}
			);
			$scope.searchPeople=function(){
				console.log($scope.search.keywords);
				var postData = $.param({
					keyword:$scope.search.keywords,
					rank:$scope.rank.join(","),
					sex:$scope.xingbie.join(","),
					political_status:$scope.politicalstatus.join(","),
					edu_level:$scope.edulevel.join(","),
					age:$scope.age.join(","),
					pageNo: $scope.paginationConf.currentPage,
					pageSize: $scope.paginationConf.itemsPerPage,
					access_token:$localStorage.token
				});
				SettingpeopleService.getPeopleList(postData).then(
					function (res) {
						console.log(res);
						if(res.data.code==200){
							$scope.paginationConf.totalItems = res.data.info.allRow;
							$scope.messagetabletab = res.data.info.list;
						}else{
							alert(res.data.msg);
						}

					},
					function (rej) {
						console.log(rej);
					}
				)
			}
			//分页获取数据
			var getMessageImageList = function () {
				var postData = $.param({
					name:$scope.searchtext,
					pageNo: $scope.paginationConf.currentPage,
					pageSize: $scope.paginationConf.itemsPerPage,
					access_token:$localStorage.token
				});
				SettingpeopleService.getPeopleList(postData).then(
					function (res) {
						console.log(res);
						if(res.data.code==200){
							$scope.paginationConf.totalItems = res.data.info.allRow;
							$scope.messagetabletab = res.data.info.list;
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
			$scope.$watch('treeselected', getMessageImageList);



            //$scope.itemsByPage=10;
			//获取人员信息
			//messageservice.getData().then(
			//	function (res) {
			//		console.log(11);
			//		$scope.imgs = res.data.info;
             //       //$scope.messagetabletab = res.data.info;
			//	},
			//	function (rej) {
			//		console.log(rej);
			//	}
			//);
            //$scope.messagetabletab = [
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

            //默认显示的tab
			//$scope.selectTab=true;
			//点击头像查看个人信息
			$scope.items = ['item1', 'item2', 'item3'];
			$scope.showOneDetail=function(oneid){
				var modalInstance = $modal.open({
			        templateUrl: 'myModalContent.html',
			        controller: 'ModalInstanceCtrl',
			        size: 'lg',
			        resolve: {
			          items: function () {
			            return $scope.items;
			          }
			        }
			     });

		      modalInstance.result.then(function (selectedItem) {
		        $scope.selected = selectedItem;
		      }, function () {
		        $log.info('Modal dismissed at: ' + new Date());
		      });
			};



		} ]);

app.controller('oneMessageController', ['$scope', '$http', '$state', function($scope, $http, $state){

		}]);
app.controller('oneMessageXinxiController',['$scope', '$http', '$state', function($scope, $http, $state){
	$scope.onemessage= {
		"id": 1,
		"img": "/public/app/img/a0.jpg",
		"name": "张三1",
		"sex": "男",
		"company": "福清市xxx、xxx信息",
		"nation": "汉",
		"birthday": "19551111",
		"palce": "福清龙田",
		"troops": "19771212",
		"party": "19771212",
		"education": "本科",
		"school": "福建师范",
		"health":"健康或良好",
		"zhengzhi":"中国共产党党员",
		"shenfenzheng":"11111111111111111111111x",
		"zhuanchang":"唱歌",
		"beiwang":"备忘1",
		"beiyong1":"备用1",
		"beiyong2":"备用2",
		"zhiji":"处长",
		"gerenshenfen":"xx处长",
		"zhuangtai":"退休",
		"zhicheng":"中级职称"
	};
	$scope.selectedIndex = 0;
}]);