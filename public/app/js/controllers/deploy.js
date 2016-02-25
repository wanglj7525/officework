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
app.controller('ModalDeployInstanceCtrl', ['$scope', '$modalInstance', 'reasonlist','tolist',function($scope, $modalInstance,reasonlist,tolist) {
	$scope.reasonlist = reasonlist;
	$scope.tolist = tolist;
	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('SaveDeployInstanceCtrl', ['$scope', '$modalInstance','adjustlist', function($scope, $modalInstance,adjustlist) {
	$scope.adjustlist=adjustlist;
	$scope.ok = function () {
		$modalInstance.close();
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('deployCtrl',[ '$scope', '$http', '$state','$timeout','$modal','$log','deploydanweiservice','messageservice','treeservice','searchservice',
	function($scope, $http, $state, $timeout,$modal,$log,deploydanweiservice,messageservice,treeservice,searchservice) {
		//点击头像查看个人信息
		$scope.selectparam=[];
		$scope.status = {
			open: true
		};
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

		var  tree, treedata_avm;
		$scope.my_tree_handler = function(branch) {
			var _ref;
			$scope.output = branch.label;
			if ((_ref = branch.data) != null ? _ref.description : void 0) {
				return $scope.output += '(' + branch.data.description + ')';
			}
			console.log($scope.output);
			//TODO
		};
		treeservice.getData().then(
			function (res) {
				$scope.deploy=res.data.info;
			},
			function (rej) {
				console.log(rej);
			}
		);



		$scope.selectdw=function(first,second,third){
			deploydanweiservice.getData().then(
				function (res) {
					$scope.daweilist = res.data.info;
				},
				function (rej) {
					console.log(rej);
				}
			);
		};
		//右侧查询人员列表
		$scope.search=function(){
			console.log($scope.selectparam);
			//获取人员信息
			messageservice.getData().then(
				function (res) {
					$scope.imgs = res.data.info;
				},
				function (rej) {
					console.log(rej);
				}
			);
		};

		searchservice.getData().then(
			function (res) {
				$scope.searchlist = res.data.info;
			},
			function (rej) {
				console.log(rej);
			}
		);
		$scope.reasonlist=[{"id":"1","reason":"工作调动原因一"},{"id":"2","reason":"工作调动原因2"},{"id":"3","reason":"工作调动原因3"}];
		$scope.tolist=[{"id":"1","reason":"局长"},{"id":"2","reason":"主任"},{"id":"3","reason":"处长"}];
		$scope.selectpeople=function(people){
			console.log(people);
			var modaldeployInstance = $modal.open({
				templateUrl: 'selectPeopleModel.html',
				controller: 'ModalDeployInstanceCtrl',
				size: 'md',
				resolve: {
					reasonlist: function () {
						return $scope.reasonlist;
					},
					tolist:function(){
						return $scope.tolist;
					}
				}
			});
			modaldeployInstance.result.then(function () {
				if(Array.indexOf($scope.daweilist[0].peoples,people)==-1){
					$scope.daweilist[0].peoples.push(people);
				}
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		$scope.removepeople=function(people){
			console.log(people);
			var modaldeployInstance = $modal.open({
				templateUrl: 'selectPeopleModel.html',
				controller: 'ModalDeployInstanceCtrl',
				size: 'md',
				resolve: {
					reasonlist: function () {
						return $scope.reasonlist;
					},
					tolist:function(){
						return $scope.tolist;
					}
				}
			});
			modaldeployInstance.result.then(function () {
				$scope.daweilist[0].peoples.splice(Array.indexOf($scope.daweilist[0].peoples,people),1);
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		$scope.adjustlist=[{"id":"1","name":"方案一"},{"id":"1","name":"方案二"}];
		$scope.savedeploy=function(){
			console.log($scope.daweilist);
			var modalsaveInstance = $modal.open({
				templateUrl: 'savePeopleModel.html',
				controller: 'SaveDeployInstanceCtrl',
				size: 'md',
				resolve: {
					adjustlist: function () {
						return $scope.adjustlist
					}
				}
			});
			modalsaveInstance.result.then(function () {
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
	} ]);
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
