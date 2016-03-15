'use strict';

app.controller('planController',[ '$scope', '$http', '$state','$timeout','UIAdjustplanService',
	function($scope, $http, $state, $timeout,UIAdjustplanService) {
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

		$scope.selectdplan=function(plan){
			$scope.currentname=plan.name;
			UIAdjustplanService.getAdjustplanDetail(plan.id).then(
				function(res){
					$scope.plandetail=res.data.info;
				},
				function(rej){
					console.log(rej);
				}
			);

		}
		$scope.deletaplan=function(plan){
			UIAdjustplanService.delAdjustPlan(plan.id).then(
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