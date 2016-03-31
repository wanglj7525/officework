'use strict';

/* Controllers */
// signin controller
//app.controller('WorktipFormController',
//	['$scope','$localStorage','worktiplistservice2','worktiplistservice','UIworktipservice',function($scope,$localStorage, worktiplistservice2,worktiplistservice,UIworktipservice) {
//		$scope.isedit=false;
//		$scope.treeselected=$localStorage.treeselect;
//		console.log("工作提示左树："+$scope.treeselected);
//		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
//			$scope.treeselected=$localStorage.treeselect;
//			console.log("工作提示左树变换："+$scope.treeselected);
//		});
//		//worktipservice.getData().then(
//		//	function (res) {
//		//		$scope.tipinfo1 = res.data.info
//		//	},
//		//	function (rej) {
//		//		console.log(rej);
//		//	}
//		//);
//
//
//		$scope.updatetip=function(tip){
//			console.log(tip);
//			$scope.name=tip.name;
//		}
//		$scope.deletetip=function(idx){
//			$scope.tipinfo.splice(idx,1);
//		}
//	} ]);
app.controller('WorktipListCtrl', ['$scope','$localStorage', 'UIworktipservice', '$stateParams', 'SeetingtreeService', function($scope, $localStorage,UIworktipservice,$stateParams,SeetingtreeService) {
	$scope.currentname='全部';
	$scope.selectcategory=function(id,name){
		$scope.pid=name;
		$scope.currentname=name;
		
	}
	//切换单位树 请求新的数据
	var postData = $.param({
		access_token:$localStorage.token
	});
	UIworktipservice.getworkcategory(postData).then(
		function (res) {
			$scope.tipinfo = res.data.info.list;
			console.log($scope.tipinfo)
		},
		function (rej) {
			console.log(rej);
		}
	)
	$scope.allmarkers=function(){
		var postData = $.param({
			access_token:$localStorage.token
		});
		UIworktipservice.getworkcategory(postData).then(
			function (res) {
				$scope.tipinfo = res.data.info.list;
				console.log($scope.tipinfo)
			},
			function (rej) {
				console.log(rej);
			}
		)
	}
	$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
		var postData1= $.param({
			parent:0,
		})
		SeetingtreeService.getTreeList(postData1).then(function(res){},
			function(rej){})
			var postData = $.param({
				tree_id:$localStorage.tree_uuid,
				category:'',
				access_token:$localStorage.token
			});
			UIworktipservice.getworktipList(postData).then(
				function (res) {
					if(res.data.code==200){
						$scope.worktiptable = res.data.info;
						console.log($scope.worktiptable)
					}else{
						//alert(res.data.msg);
					}
				},
				function (rej) {
					console.log(rej);
				}
			)
	});
}]);