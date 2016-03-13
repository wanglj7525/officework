'use strict';

/* Controllers */
// signin controller
app.controller('WorktipFormController',
	['$scope','$localStorage','worktiplistservice2','worktiplistservice','worktipservice',function($scope,$localStorage, worktiplistservice2,worktiplistservice,worktipservice) {
		$scope.isedit=false;
		$scope.treeselected=$localStorage.treeselect;
		console.log("工作提示左树："+$scope.treeselected);
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			$scope.treeselected=$localStorage.treeselect;
			console.log("工作提示左树变换："+$scope.treeselected);
		});
		worktipservice.getData().then(
			function (res) {
				$scope.tipinfo = res.data.info
			},
			function (rej) {
				console.log(rej);
			}
		);

		//添加标签
		$scope.addtip=function(){
			console.log($scope.name);
			$scope.tipinfo.push({"id":"22","name":$scope.name});
			//$scope.tipinfo=[];
		}
		
		//删除查询语句
		$scope.delCondition= function() {
			alert(1111);
		}
		
		//添加查询语句
		$scope.addCondition=function(){
			var $form_add=$("<div class='form-group'><label class='col-lg-2'><select name='guanxi' class='col-lg-2 form-control form-inline addluoji'><option value='AND'>AND</option><option value='OR'>OR</option></select></label><div class='col-lg-9 form-inline ' style='margin-left: 10px;'><span class='addziduan'>字段：</span><select name='ziduan' class='form-control'> <option value='zhiji'>职级</option><option value='xingbie'>性别</option><option value='xueli'>学历</option><option value='zhengzhi'>政治面貌</option> <option value='zhengzhi'>年龄</option></select><span class='addguanxi'>关系：</span><select name='guanxi' class='form-control'><option value='='>等于</option><option value='>'>大于</option><option value='<'>小于</option></select><span class='addzhi'>值：</span><input type='text' class='form-control' placeholder='请输入自定义的值'> <button type='button' class='btn btn-default btn-md' onclick='$(this).parent().parent().remove()'><span class='glyphicon glyphicon-minus-sign'></span></button> </div></div>");
			var $parent =$("#formList");
			$parent.after($form_add);
		}
		
		$scope.clickleft=function(){
			$scope.isedit=false;
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