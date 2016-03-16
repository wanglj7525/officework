'use strict';
app.controller('ModalDeployInstanceCtrl', ['$scope', '$modalInstance','$localStorage','adjustdetailservice','SettingdaimaService','UIDeployservice','people',
	function($scope, $modalInstance,$localStorage,adjustdetailservice,SettingdaimaService,UIDeployservice,people) {
		$scope.hasanalysis=false;
		//任职原因
		SettingdaimaService.getCodagetList("ZB12").then(function(res){
			$scope.renzhilist=res.data.info.list;
		},function(rej){});
		var select_tree = $.param({
			tree_id:$localStorage.tree_uuid
		});
		adjustdetailservice.getzhiweiList(select_tree).then(
			function (res) {
				$scope.companylist = res.data.info;
			},
			function (rej) {
				console.log(rej);
			}
		);
		$scope.deploy = {};

		//职务变换 重新分析
		$scope.$watch(function(){ return $scope.deploy.zhiwei},function(newValue,oldValue){
			if(newValue===oldValue) return;
			$scope.hasanalysis=false;
		})

		//调用分析接口
		$scope.analysis = function () {
			$scope.hasanalysis=true;
			$scope.hasresult=true;
			$scope.analysis_result="正在分析...";
			var postData = $.param({
				person_id:people.id,
				unit_id:$localStorage.tree_uuid,
				position_id:$scope.deploy.zhiwei['id'],
				operate_type:1,
				access_token:$localStorage.token
			});
			UIDeployservice.getPeopleAnalysis(postData).then(
				function(res){
					if(res.data.msg=="操作成功"){
						$scope.analysis_result = eval(res.data.data.tipsList);
						if($scope.analysis_result.length==0){
							$scope.hasresult=false;
							$scope.noresult="空";
						}
					}else{
						$scope.hasresult=flase;
						$scope.noresult="分析失败";
					}
				},
				function (rej) {
					$scope.hasresult=flase;
					$scope.noresult="分析失败";
					console.log(rej);
				}
			);
		};
		$scope.ok = function () {
			$modalInstance.close($scope.deploy);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}]);
app.controller('ModalMianzhiDeployInstanceCtrl', ['$scope', '$modalInstance','$localStorage','SettingdaimaService','UIDeployservice',
	function($scope, $modalInstance,$localStorage,SettingdaimaService,UIDeployservice) {
		$scope.hasanalysis=false;

		//免职原因
		SettingdaimaService.getCodagetList("ZB16").then(function(res){
			$scope.mianzhilist=res.data.info.list;},function(rej){});
		$scope.deploy = {};

		//调用分析接口
		$scope.analysis = function () {
			$scope.hasanalysis=true;
			$scope.hasresult=true;
			$scope.analysis_result="正在分析...";
			var postData = $.param({
				person_id:people.id,
				unit_id:$localStorage.tree_uuid,
				position_id:$scope.deploy.zhiwei['id'],
				operate_type:2,
				access_token:$localStorage.token
			});
			UIDeployservice.getPeopleAnalysis(postData).then(
				function(res){
					if(res.data.msg=="操作成功"){
						$scope.analysis_result = eval(res.data.data.tipsList);
						if($scope.analysis_result.length==0){
							$scope.hasresult=false;
							$scope.noresult="空";
						}
					}else{
						$scope.hasresult=flase;
						$scope.noresult="分析失败";
					}
				},
				function (rej) {
					$scope.hasresult=flase;
					$scope.noresult="分析失败";
					console.log(rej);
				}
			);
		};
		$scope.ok = function () {
			$modalInstance.close($scope.deploy);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}]);
app.controller('SaveDeployInstanceCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.ok = function () {
		$modalInstance.close();
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('deployCtrl',['$rootScope', '$scope', '$http', '$state','$timeout','$modal','$log','$localStorage','adjustdetailservice','SettingdaimaService','SettingpeopleService','UIDeployservice','deploydanweiservice','messageservice','searchservice',
	function($rootScope,$scope, $http, $state, $timeout,$modal,$log,$localStorage,adjustdetailservice,SettingdaimaService,SettingpeopleService,UIDeployservice,deploydanweiservice,messageservice,searchservice) {
		$scope.treeselected=$localStorage.treeselect;
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			$scope.treeselected=$localStorage.treeselect;
			var postData = $.param({
				tree_id:$localStorage.tree_uuid,
				access_token:$localStorage.token
			});
			UIDeployservice.getOneDeploy(postData).then(
				function(res){
					$scope.daweilist = res.data.info;
				},
				function (rej) {
					console.log(rej);
				}
			);
		});
		$scope.isdetail=false;
		//性别
		SettingdaimaService.getCodagetList("GB2261").then(function(res){ $scope.sexlist=res.data.info.list;},function(rej){});
		//地址
		SettingdaimaService.getCodagetList("ZB01").then(function(res){ $scope.address=res.data.info.list;},function(rej){});
		//民族
		SettingdaimaService.getCodagetList("GB3304").then(function(res){ $scope.minzulist=res.data.info.list;},function(rej){});
		//健康
		SettingdaimaService.getCodagetList("GB4767").then(function(res){ $scope.jiankanglist=res.data.info.list;},function(rej){});
		//职级
		SettingdaimaService.getCodagetList("FJ09").then(function(res){ $scope.zhijilist=res.data.info.list;},function(rej){});
		//政治面貌
		SettingdaimaService.getCodagetList("GB4762").then(function(res){ $scope.zhengzhilist=res.data.info.list;},function(rej){});
		//个人身份
		SettingdaimaService.getCodagetList("ZB06").then(function(res){ $scope.personallist=res.data.info.list;},function(rej){});
		//人员状态
		SettingdaimaService.getCodagetList("FJ14").then(function(res){ $scope.zhuangtailist=res.data.info.list;},function(rej){});
		//学历
		SettingdaimaService.getCodagetList("GB4658").then(function(res){ $scope.xuelilist=res.data.info.list;},function(rej){});
		////任职原因
		//SettingdaimaService.getCodagetList("ZB12").then(function(res){ $scope.renzhilist=res.data.info.list;},function(rej){});
		////免职原因
		//SettingdaimaService.getCodagetList("ZB16").then(function(res){ $scope.mianzhilist=res.data.info.list;},function(rej){});

		searchservice.getData().then(
			function (res) {
				$scope.nianlinglist = res.data.info;
			},
			function (rej) {
				console.log(rej);
			}
		);
		$scope.selectparam=[];
		//职级
		$scope.rank=[];
		//性别
		$scope.xingbie=[];
		//政治面貌
		$scope.politicalstatus=[];
		//学历
		$scope.edulevel=[];
		//年龄
		$scope.age=[];
		$scope.search={};

		//点击头像查看个人信息
		$scope.selectparam=[];
		$scope.status = {
			open: false,
			leftopen:true
		};
		$scope.isdetail=false;
		$scope.searchPeoples=function(){
			var postData = $.param({
				keyword:$scope.search.keywords,
				ranks:$scope.rank.join(","),
				sexs:$scope.xingbie.join(","),
				political_statuses:$scope.politicalstatus.join(","),
				edu_levels:$scope.edulevel.join(","),
				ages:$scope.age.join(","),
				pageNo: $scope.paginationConf.currentPage,
				pageSize: $scope.paginationConf.itemsPerPage,
				access_token:$localStorage.token
			});
			SettingpeopleService.getPeopleList(postData).then(
				function (res) {
					console.log(res);
					if(res.data.code==200){
						$scope.paginationConf.totalItems = res.data.info.totalElements;
						$scope.searchpeopleshow = res.data.info.elements;
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
		$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', $scope.searchPeoples);

		//任职
		$scope.selectpeople=function(people){
			var modaldeployInstance = $modal.open({
				templateUrl: 'selectrenzhiPeopleModel.html',
				controller: 'ModalDeployInstanceCtrl',
				size: 'md',
				resolve:{
					people:function(){
						return people;
					}
				}
			});
			modaldeployInstance.result.then(function (zhiwei) {
				var indexs=zhiwei-1;

				if($scope.daweilist[indexs].people.indexOf(people)==-1){
					$scope.daweilist[indexs].people.push(people);
				}
				//if($scope.daweilist[0].peoples.indexOf(people)==-1){
				//	$scope.daweilist[0].peoples.push(people);
				//}
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		//免职
		$scope.removepeople=function(which,people){
			console.log(which-1);
			var indexs=which-1;
			var modaldeployInstance = $modal.open({
				templateUrl: 'selectmianzhiPeopleModel.html',
				controller: 'ModalMianzhiDeployInstanceCtrl',
				size: 'md'
			});
			modaldeployInstance.result.then(function () {
				$scope.daweilist[indexs].people.splice($scope.daweilist[indexs].people.indexOf(people),1);
				//$scope.daweilist[0].peoples.splice($scope.daweilist[0].peoples.indexOf(people),1);
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		//保存班子
		$scope.savedeploy=function(){
			var modalsaveInstance = $modal.open({
				templateUrl: 'savePeopleModel.html',
				controller: 'SaveDeployInstanceCtrl',
				size: 'sm'
			});
			modalsaveInstance.result.then(function () {
				//调用调配接口


			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		//查看详情
		$scope.showOneDetail=function(people){

			$scope.isdetail=true;
			$scope.user={};
			var postData = $.param({
				person_id:people.id,
				access_token:$localStorage.token
			});
			//家庭成员
			SettingpeopleService.getfamilyInfo(postData).then(
				function(res){
					if (res.data.code == 200) {
						$scope.familyInfolist=res.data.info;
					}
				},
				function(rej){

				}
			);
			//简历
			SettingpeopleService.getresumeInfo(postData).then(
				function(res){
					if (res.data.code == 200) {
						$scope.resumeinfo={};
						$scope.resumeinfo=res.data.info[0];
					}
				},
				function(rej){

				}
			);
			//年度考核
			SettingpeopleService.getexaminfo(postData).then(
				function(res){
					if (res.data.code == 200) {
						$scope.examinfolist=res.data.info;
					}
				},
				function(rej){

				}
			);
			//奖惩记录
			SettingpeopleService.getjiangchenginfo(postData).then(
				function(res){
					if (res.data.code == 200) {
						$scope.jiangchenginfolist=res.data.info;
					}
				},
				function(rej){

				}
			);
			//学位
			SettingpeopleService.getDegreeinfo(postData).then(
				function(res){
					if (res.data.code == 200) {
						$scope.degreeinfolist=res.data.info;
					}
				},
				function(rej){

				}
			);
			//学历
			SettingpeopleService.getEduinfo(postData).then(
				function(res){
					if (res.data.code == 200) {
						$scope.eduinfolist=res.data.info;
					}
				},
				function(rej){

				}
			);
			//职称
			SettingpeopleService.getPeopletitleinfo(postData).then(
				function(res){
					if (res.data.code == 200) {
						$scope.titleinfolist=res.data.info;
					}
				},
				function(rej){

				}
			);
			//现任职务
			SettingpeopleService.getPeoplepostinfo(postData).then(
				function(res){
					if (res.data.code == 200) {
						$scope.postinfolist=res.data.info;
					}
				},
				function(rej){

				}
			);
			//基本信息
			SettingpeopleService.getPeopleBase(postData).then(
				function(res) {
					if (res.data.code == 200) {
						$scope.user = res.data.info;
						//下拉列表默认显示值
						if($scope.user.jiguan||$scope.user.birthplace){
							for(var i=0;i<$scope.address.length;i++){
								if($scope.user.birthplace==$scope.address[i].ano){
									$scope.user.birthplace=$scope.address[i];
								}
								if($scope.user.jiguan==$scope.address[i].ano){
									$scope.user.jiguan=$scope.address[i];
								}
							}
						}
						if($scope.user.person_status){
							for(var i=0;i<$scope.zhuangtailist.length;i++){
								if($scope.user.person_status==$scope.zhuangtailist[i].ano){
									$scope.user.person_status=$scope.zhuangtailist[i];
								}
							}
						}
						if($scope.user.personal){
							for(var i=0;i<$scope.personallist.length;i++){
								if($scope.user.personal==$scope.personallist[i].ano){
									$scope.user.personal=$scope.personallist[i];
								}
							}
						}
						if($scope.user.rank){
							for(var i=0;i<$scope.zhijilist.length;i++){
								if($scope.user.rank==$scope.zhijilist[i].ano){
									$scope.user.rank=$scope.zhijilist[i];
								}
							}
						}
						if($scope.user.health){
							for(var i=0;i<$scope.jiankanglist.length;i++){
								if($scope.user.health==$scope.jiankanglist[i].ano){
									$scope.user.health=$scope.jiankanglist[i];
								}
							}
						}
						if($scope.user.political_status){
							for(var i=0;i<$scope.zhengzhilist.length;i++){
								if($scope.user.political_status==$scope.zhengzhilist[i].ano){
									$scope.user.political_status=$scope.zhengzhilist[i];
								}
							}
						}
						if($scope.user.sex){
							for(var i=0;i<$scope.sexlist.length;i++){
								if($scope.user.sex==$scope.sexlist[i].ano){
									$scope.user.sex=$scope.sexlist[i];
								}
							}

						}
						if( $scope.user.nation){
							for(var i=0;i<$scope.minzulist.length;i++){
								if($scope.user.nation==$scope.minzulist[i].ano){
									$scope.user.nation=$scope.minzulist[i];
								}
							}
						}
					}
				}
			)
		};
	} ]);
