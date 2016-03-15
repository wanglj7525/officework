'use strict';

/* Controllers */
// signin controller
app.controller('WorktipFormController',
	['$scope','$localStorage','worktiplistservice2','worktiplistservice','UIworktipservice',function($scope,$localStorage, worktiplistservice2,worktiplistservice,UIworktipservice) {
		$scope.isedit=false;
		$scope.treeselected=$localStorage.treeselect;
		console.log("工作提示左树："+$scope.treeselected);
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			$scope.treeselected=$localStorage.treeselect;
			console.log("工作提示左树变换："+$scope.treeselected);
		});
		//worktipservice.getData().then(
		//	function (res) {
		//		$scope.tipinfo1 = res.data.info
		//	},
		//	function (rej) {
		//		console.log(rej);
		//	}
		//);
	
		UIworktipservice.getworkcategory().then(
			function (res) {
				$scope.tipinfo = res.data.info.list;
			},
			function (rej) {
				console.log(rej);
			}
		)
		$scope.clickleft=function(item){
			//alert(item.id);
			$scope.isedit=false;
			var postData = $.param({
				tree_id:$localStorage.tree_uuid,
				marker_id:item.id
			});
			UIworktipservice.getworktipList(postData).then(
				function(res){
					$scope.worktiptable = res.data.info.list;
				}
			)
			
		}
		$scope.updatetip=function(tip){
			console.log(tip);
			$scope.name=tip.name;
		}
		$scope.deletetip=function(idx){
			$scope.tipinfo.splice(idx,1);
		}
	} ]);
app.controller('WorktipListCtrl', ['$scope','$localStorage', 'UIworktipservice', '$stateParams',  function($scope, $localStorage,UIworktipservice,$stateParams) {
	//切换单位树 请求新的数据
	$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
		if(newValue===oldValue) return;
		var postData = $.param({
			tree_id:$localStorage.tree_uuid,
			category:$stateParams.pid,
			pageNo: $scope.paginationConf.currentPage,
			pageSize: $scope.paginationConf.itemsPerPage
		});
		UIworktipservice.getworktipList(postData).then(
			function (res) {
				console.log(res);
				if(res.data.code==200){
					$scope.paginationConf.totalItems = res.data.info.allRow;
					$scope.worktiptable = res.data.info.list;
				}else{
					alert(res.data.msg);
				}

			},
			function (rej) {
				console.log(rej);
			}
		)
	
	});
	//分页获取数据
	var getWorktipList = function () {
		var postData = $.param({
			tree_id:$localStorage.tree_uuid,
			category:$stateParams.pid,
			pageNo: $scope.paginationConf.currentPage,
			pageSize: $scope.paginationConf.itemsPerPage
		});
		UIworktipservice.getworktipList(postData).then(
			function (res) {
				console.log(res);
				if(res.data.code==200){
					$scope.paginationConf.totalItems = res.data.info.allRow;
					$scope.worktiptable = res.data.info.list;
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
	///***************************************************************
	// 当页码和页面记录数发生变化时监控后台查询
	// 如果把currentPage和itemsPerPage分开监控的话则会触发两次后台事件。
	// ***************************************************************/
	$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getWorktipList);
}]);
app.controller('WorktipEditCtrl', ['$scope', 'worktipservice',  function($scope, worktipservice) {
	//worktipservice.getData().then(
	//	function (res) {
	//		$scope.tipinfo = res.data.info
	//	},
	//	function (rej) {
	//		console.log(rej);
	//	}
	//);
	$scope.addtip=function(){
		$scope.tipinfo=[];
	}
	// $scope.itemsByPage=10;
}]);