'use strict';
app.controller('analysisReasonController', ['$scope', '$modalInstance',function($scope, $modalInstance) {
	$scope.adjust={}
		$scope.ok = function () {
			$modalInstance.close($scope.adjust);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('fanganshenheModel',['$scope','$modalInstance',function($scope,$modalInstance){
	$scope.saveadjust={}
		$scope.ok=function(){
			//alert("保存方案")
			$modalInstance.close($scope.saveadjust);
		}
		$scope.cancel=function(){
			$modalInstance.dismiss('cancel');
		}
}])
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
			//alert("模态框")
			var modalfanganInstance=$modal.open({
				templateUrl:'ui_fanganshenheModel.html',
				controller: 'fanganshenheModel',
				size:'md',
			});
			modalfanganInstance.result.then(function (saveadjust) {
				var postData = $.param({
					name:saveadjust.name,
					note:saveadjust.reason
				});
				adjustdetailservice.saveadjust(postData).then(function(){
					
				})
			}, function () {

			});
		}
		var zhiwei = $.param({
			tree_id:$localStorage.tree_uuid
		});
		adjustdetailservice.getzhiweiList(zhiwei).then(
			function (res) {
				$scope.companylist = res.data.info;
			},
			function (rej) {
				console.log(rej);
			}
		);
		adjustdetailservice.getreasonList().then(
			function (res) {
				$scope.adjustreason = res.data.info;
			},
			function (rej) {
				console.log(rej);
			}
		);

		$scope.userState = '';
		$scope.id = $stateParams.id;
		
		//修改原因
		$scope.updateReason= function (data) {
			var modalReasonInstance = $modal.open({
					templateUrl: 'adjustReasonModel.html',
					controller: 'analysisReasonController',
					size: 'md'
				});
				modalReasonInstance.result.then(function (adjust) {
					var postData = $.param({
						id: data.id,
						//tree_id:353165011,
						tobe_post_id: adjust.zhiwu["id"],
						reason: adjust.yuanyin["dz"]
						//access_token: $localStorage.token
					});
					
					adjustdetailservice.getadjustFix(postData).then(
						function (res) {
							if(res.data.code==200){
								data.reason=adjust.yuanyin["dz"];
								data.tobe_post=adjust.zhiwu['name'];
								//angular.copy($scope.newdata,data);
								console.log($scope.newdata);
							}else{
								alert(res.data.msg);
							}

						}
					);
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			}
		
		
		//删除原因
		$scope.delReason= function (e) {
			var postData = $.param({
				id:e.id,
			});
			adjustdetailservice.delAdjustList(postData).then(
				function (res) {
					if(res.data.code==200){
						for(var i=0; i<$scope.adjusttable.length; i++){
							if($scope.adjusttable[i].id==e.id){
								$scope.adjusttable.splice(i,1);
							}
						}
					}else{
						alert(res.data.msg);
					}
				},
				function (rej) {
					console.log(rej);
				}
			);
			}
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue) {
			var postData = $.param({
				tree_id: $localStorage.tree_uuid,
				//tree_id:353165011,
				access_token: $localStorage.token
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
		})
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
				//adjustreason.getData().then(
				//function (res) {
				//	$scope.reasons = res.data.info
				// },
				//	function (rej) {
				//		console.log(rej);
				//	}
				//);
				
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

