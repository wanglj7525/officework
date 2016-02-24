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
app.controller('deployCtrl',[ '$scope', '$http', '$state','$timeout','$modal','$log','deploydanweiservice','messageservice','treeservice',
	function($scope, $http, $state, $timeout,$modal,$log,deploydanweiservice,messageservice,treeservice) {
		$scope.oneAtATime = true;
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
		$scope.my_data = [];
		$scope.doing_async = true;
		treeservice.getData().then(
			function (res) {
				$scope.my_data = res.data.info
				$scope.doing_async = false;
				var modaldeployInstance = $modal.open({
					templateUrl: 'selectCompanyModel.html',
					controller: 'ModalInstanceCtrl',
					size: 'lg',
					resolve: {
						items: function () {
							return $scope.my_data
						},
						oneAtATime:function(){
							return $scope.oneAtATime
						}
					}
				});
			},
			function (rej) {
				console.log(rej);
			}
		);
		//$scope.my_data=treedata_avm;
		$scope.my_tree = tree = {};

		deploydanweiservice.getData().then(
			function (res) {
				$scope.daweilist = res.data.info;
			},
			function (rej) {
				console.log(rej);
			}
		);
		//获取人员信息
		messageservice.getData().then(
			function (res) {
				$scope.imgs = res.data.info;
				//$scope.messagetabletab = res.data.info;
			},
			function (rej) {
				console.log(rej);
			}
		);


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
