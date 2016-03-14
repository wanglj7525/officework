'use strict';
  app.controller('MessageController', [ '$scope', '$http', '$state','$timeout','$modal','$log','$localStorage','UIMessageService','messageservice','searchservice','SettingpeopleService','SettingdaimaService',
		function($scope, $http, $state, $timeout,$modal,$log,$localStorage,UIMessageService,messageservice,searchservice,SettingpeopleService,SettingdaimaService) {
			$scope.treeselected=$localStorage.treeselect;
			$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
				if(newValue===oldValue) return;
				$scope.treeselected=$localStorage.treeselect;
			});

			$scope.isdetail=false;
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
					ranks:$scope.rank.join(","),
					sexs:$scope.xingbie.join(","),
					political_statuses:$scope.politicalstatus.join(","),
					edu_levels:$scope.edulevel.join(","),
					ages:$scope.age.join(","),
					pageNo: $scope.paginationConf.currentPage,
					pageSize: $scope.paginationConf.itemsPerPage,
					access_token:$localStorage.token
				});
				SettingpeopleService.getPeopleList(postData).then(
					function (res) {
						console.log(res);
						if(res.data.code==200){
							$scope.paginationConf.totalItems = res.data.info.totalElements;
							$scope.messagetabletab = res.data.info.elements;
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
					keyword:$scope.search.keywords,
					ranks:$scope.rank.join(","),
					sexs:$scope.xingbie.join(","),
					political_statuses:$scope.politicalstatus.join(","),
					edu_levels:$scope.edulevel.join(","),
					ages:$scope.age.join(","),
					pageNo: $scope.paginationConf.currentPage,
					pageSize: $scope.paginationConf.itemsPerPage,
					access_token:$localStorage.token
				});
				SettingpeopleService.getPeopleList(postData).then(
					function (res) {
						console.log(res);
						if(res.data.code==200){
							$scope.paginationConf.totalItems = res.data.info.totalElements;
							$scope.messagetabletab = res.data.info.elements;
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


			$scope.showOneDetail=function(oneid){
				$scope.isdetail=true;
			};
		} ]);
