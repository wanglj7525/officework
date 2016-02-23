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
app.controller('deployCtrl',[ '$scope', '$http', '$state','$timeout','$modal','$log','deploydanweiservice','messageservice',
                       		function($scope, $http, $state, $timeout,$modal,$log,deploydanweiservice,messageservice) {

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

								treedata_avm = [
									{
										label: '市委班子',
										data:1,
										children: [
											{
												label: '市委',
												data: 11,
												children:[]
											}, {
												label: '市人大',
												data: 12
											}, {
												label: '市政协',
												data: 13
											}, {
												label: '市政府',
												data: 14,
												children: ['市政府市委', '市政府党委', '市政府政协']
											}
										]
									}, {
										label: '党务口',
										data: 2,
										children: [
											{
												label: '党务办公室',
												data: 21
											}, {
												label: '党务委员会',
												data: 22
											}
										]
									}, {
										label: '政务口',
										data:3,
										children: [
											{
												label: '政务办公室',
												data:31,
												children: ['政务委员会']
											}, {
												label: '政务室',
												data:32
											}, {
												label: '政务',
												data:33
											}
										]
									}, {
										label: '企事业口',
										data:4
									}, {
										label: '县市区',
										data:5,
										children: [
											{
												label: '福清',
												data:51,
												children: ['福清区委', '福清党委']
											}, {
												label: '长乐',
												data:52,
												children: ['长乐党委']
											}, {
												label: '闽侯',
												data:53
											}
										]
									}
								];

								$scope.my_data = treedata_avm;
								$scope.my_tree = tree = {};


								deploydanweiservice.getData().then(
									function (res) {
										$scope.daweilist = res.data.info;
									},
									function (rej) {
										console.log(rej);
									}
								);
								//$scope.daweilist=[
								//	{"id":1,"name":'市委',"peoples":[{"name":"超编两人"},{"name":"女性比例比正常值偏少"}]},
								//	{"id":2,"name":'市人大',"reason":[{"name":"缺编两人"},{"name":"女性比例比正常值偏少"}]},
								//	{"id":3,"name":'市政协',"reason":[{"name":"人员比例正常"}]},
								//	{"id":4,"name":'市政府',"reason":[{"name":"超编两人"}]}];
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
