'use strict';
app.controller('ModalDeleteAdjustInstanceCtrl', ['$scope', '$modalInstance' ,'item',function($scope, $modalInstance,item) {
	
	$scope.ok = function () {
		$modalInstance.close(item);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('planController',[ '$scope', '$http', '$state','$timeout','UIAdjustplanService','$modal',
	function($scope, $http, $state, $timeout,UIAdjustplanService,$modal) {
		UIAdjustplanService.getAdjustplanList().then(
			function (res) {
				$scope.planlist = res.data.info;
				console.log($scope.planlist)
				$scope.currentname=$scope.planlist[0].name;
				$scope.currentid=$scope.planlist[0].id;
					UIAdjustplanService.getAdjustplanDetail($scope.currentid).then(
						function(res){
							$scope.plandetail=res.data.info;
							console.log($scope.plandetail)
						},

						function(rej){
							console.log(rej);
						}
					);

				UIAdjustplanService.getAdjustplanDetail($scope.planlist[0].id).then(
					function(res){
						$scope.plandetail=res.data.info;
						console.log($scope.plandetail)
					},
					function(rej){
						console.log(rej);
					}
				);
			
			},
			function (rej) {
				console.log(rej);
			}
		);

		$scope.selectdplan=function(plan){
			$scope.currentid=plan.id;
			$scope.currentname=plan.name;
			UIAdjustplanService.getAdjustplanDetail($scope.currentid).then(
				function(res){
					$scope.plandetail=res.data.info;
					console.log($scope.plandetail)
				},
				
				function(rej){
					console.log(rej);
				}
			);

		}
		$scope.deletaplan=function(plandetail){
			console.log(plandetail)
			var modaladjustdeleteInstance = $modal.open({
				templateUrl: 'deleteAdjustModel.html',
				controller: 'ModalDeleteAdjustInstanceCtrl',
				size: 'sm',
				resolve: {
					item:function(){return plandetail.schedule_name}
				}
			});
			modaladjustdeleteInstance.result.then(function (item) {
				UIAdjustplanService.delAdjustPlan($scope.currentid).then(
					function(res){
						if(res.data.code==200){
							UIAdjustplanService.getAdjustplanList().then(
								function (res) {
									$scope.planlist = res.data.info;
									$scope.currentname=$scope.planlist[0].name;
									UIAdjustplanService.getAdjustplanDetail($scope.planlist[0].id).then(
										function(res){
											$scope.plandetail=res.data.info;
										},
										function(rej){
											console.log(rej);
										}
									);
								},
								function (rej) {
									console.log(rej);
								}
							);
						}
					},
					function(rej){
						console.log(rej);
					}
				);
			}, function () {
			});
		}
	}
]);
//app.controller('plandetailcontroller',[ '$scope', '$http', '$state','$timeout','$stateParams','plandetailservice',
//	function($scope, $http, $state, $timeout,$stateParams,plandetailservice) {
//		$scope.id = $stateParams.id;
//		plandetailservice.getData().then(
//			function (res) {
//				$scope.plandetail = res.data.info
//			},
//			function (rej) {
//				console.log(rej);
//			}
//		);
//	}
//]);