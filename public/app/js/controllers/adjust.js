'use strict';
app.controller('analysisReasonController', ['$scope', '$modalInstance', 'items',function($scope, $modalInstance,items) {
		$scope.ok = function () {
			$scope.reasontitle= $("#reasontitle").val();
			$scope.reasondetail= $("#reasondetail").val();
			$modalInstance.close($scope.reasontitle,$scope.reasondetail);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('adjustdetailController',[ '$scope', '$http', '$state','$timeout','$stateParams','$modal','$log','$localStorage','adjustdetailservice','adjustreason',
	function($scope, $http, $state, $timeout,$stateParams,$modal,$log,$localStorage,adjustdetailservice,adjustreason) {
			$scope.treeselected=$localStorage.treeselect;
			console.log("调整一览左树："+$scope.treeselected);
			$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
				$scope.treeselected=$localStorage.treeselect;
				console.log("调整一览左树变换："+$scope.treeselected);
			});
		//方案审核
		$scope.fanganshenhe=function(){
			alert("模态框")
		}
			//获取调配原因
			adjustreason.getData().then(
				function (res) {
					$scope.reasons = res.data.info
				},
				function (rej) {
					console.log(rej);
				}
			);


			$scope.userState = '';

			$scope.companylist = [
				{company:'局长',id:'1'},
				{company:'副局长',id:'2'}
			];


		$scope.id = $stateParams.id;
		$scope.addReason= function (e) {
				var modalReasonInstance = $modal.open({
					templateUrl: 'adjustReasonModel.html',
					controller: 'analysisReasonController',
					size: 'md',
					resolve: {
						items: function () {
							return $scope.reasondetail;
						}
					}
				});
				modalReasonInstance.result.then(function (reasonTitleValue,reasonDetailValue) {
					$scope.reasons.push({"id":1,"title":reasonTitleValue,"detail":reasonDetailValue});
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			}
		var postData = $.param({
			tree_id:1,
			access_token:$localStorage.token
		});
		adjustdetailservice.getAdjustList(postData).then(
			function (res) {
				//处理获得的数据
				$scope.adjusttable = res.data.info
			},
			function (rej) {
				//获取数据失败处理
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
								
	 $scope.userState = '';

	  $scope.toppings = [
	                     {name:'主任',id:'1'},
	                     {name:'处长',id:'2'},
	                     {name:'科长',id:'3'},
	                     {name:'科员',id:'4'},
	                     {name:'领导',id:'5'},
	                     {name:'退休',id:'6'}
	  ];
} ]);

