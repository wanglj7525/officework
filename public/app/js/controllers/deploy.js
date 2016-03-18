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
						$scope.hasresult=false;
						$scope.noresult="分析失败";
					}
				},
				function (rej) {
					$scope.hasresult=false;
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
app.controller('ModalMianzhiDeployInstanceCtrl', ['$scope', '$modalInstance','$localStorage','SettingdaimaService','UIDeployservice','people',
	function($scope, $modalInstance,$localStorage,SettingdaimaService,UIDeployservice,people) {
		$scope.hasanalysis=false;

		//免职原因
		SettingdaimaService.getCodagetList("ZB16").then(function(res){
			$scope.mianzhilist=res.data.info.list;},function(rej){});
		$scope.deploy = {};

		//调用分析接口
		$scope.analysis_mianzhi = function () {
			$scope.hasanalysis=true;
			$scope.hasresult=true;
			var postData = $.param({
				person_id:people.id,
				unit_id:$localStorage.tree_uuid,
				position_id:people.post_id,
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
						$scope.hasresult=false;
						$scope.noresult="分析失败";
					}
				},
				function (rej) {
					$scope.hasresult=false;
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
app.controller('SaveDeployInstanceCtrl', ['$scope', '$modalInstance','InPerson_ids','OutPerson_ids','$localStorage','UIDeployservice',
	function($scope, $modalInstance,InPerson_ids,OutPerson_ids,$localStorage,UIDeployservice) {

	$scope.hasanalysis=false;
	$scope.analysis_tijiao = function () {
		$scope.hasanalysis=true;
		$scope.hasresult=true;
		//调用分析接口
		var postData = $.param({
			unit_id:$localStorage.tree_uuid,
			//任职id
			InPerson_ids:InPerson_ids?InPerson_ids.join(","):"",
			//免职id
			OutPerson_ids:OutPerson_ids?OutPerson_ids.join(","):"",
			access_token:$localStorage.token
		});
		UIDeployservice.getTijiaoBanziAnalysis(postData).then(
			function(res){
				if(res.data.msg=="操作成功"){
					$scope.analysis_result = eval(res.data.data.tipsList);
					if($scope.analysis_result.length==0){
						$scope.hasresult=false;
						$scope.noresult="空";
					}
				}else{
					$scope.hasresult=false;
					$scope.noresult="分析失败";
				}
			},
			function (rej) {
				$scope.hasresult=false;
				$scope.noresult="分析失败";
				console.log(rej);
			}
		);
	}


	$scope.ok = function () {
		$modalInstance.close();
	};
	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('deployCtrl',['$rootScope', '$scope', '$http', '$state','$timeout','$modal','$log','$localStorage','adjustdetailservice','SettingdaimaService','SettingpeopleService','UIDeployservice','deploydanweiservice','messageservice','searchservice',
	function($rootScope,$scope, $http, $state, $timeout,$modal,$log,$localStorage,adjustdetailservice,SettingdaimaService,SettingpeopleService,UIDeployservice,deploydanweiservice,messageservice,searchservice) {

//		var json={};
//		json.in=[];
//		json.out=[];
//		for(var i=0;i<=4;i++){
//			var people={
//				"name":"姓名"+i,
//				"sex":"女",
//				"age":"12"
//			}
//			json.in.push(people);
//		}
//		for(var i=0;i<=2;i++){
//			var people={
//				"name":"姓名"+i,
//				"sex":"男",
//				"age":"15"
//			}
//			json.out.push(people);
//		}
//		console.log(json);
//		var postData = $.param({
//			json:JSON.stringify(json)
//		});
//UIDeployservice.test(postData).then(
//	function(res){
//
//	}
//	,function(rej){
//
//	}
//)
		//存储任职 离职人员id
		$scope.InPerson_ids=[];
		$scope.OutPerson_ids=[];
		//存储任职 离职人员信息
		$scope.InPerson={};
		$scope.OutPerson={};

		$scope.treeselected=$localStorage.treeselect;
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			$scope.treeselected=$localStorage.treeselect;
			var postData = $.param({
				tree_id:$localStorage.tree_uuid,
				access_token:$localStorage.token
			});
			UIDeployservice.getOneDeploy(postData).then(
				function(res){
					//班子成员
					$scope.daweilist = res.data.info;

					if($scope.daweilist){
						//需要分析班子成员，标注出 需要交流的人员
						var params=$.param({
							unit_id:$localStorage.tree_uuid,
							access_token:$localStorage.token
						});
						UIDeployservice.getBanziAnalysis(params).then(
							function(res){
								if(res.data.msg=="操作成功"){
									for(var j=0;j<$scope.daweilist.row.length;j++){
										for(var i=0;i<$scope.daweilist.row[j].column.length;i++){
											if(res.data.data.person_ids.indexOf($scope.daweilist.row[j].column[i].person_id)!=-1){
												$scope.daweilist.row[j].column[i].needChange=true;
											}else{
												$scope.daweilist.row[j].column[i].needChange=false;
											}
										}
									}
								}
							},
							function(rej){
								console.log(rej);
							}
						);
					}
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
			itemsPerPage: 12
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
			modaldeployInstance.result.then(function (deploy) {
				//右边人员信息和左边不一致 生成新的格式 添加到左边的model中
				var newpeople={
					post_rank:deploy.zhiwei['post_rank'],
					person_id:people.id,
					name:people.name,
					state:'true',
					post_name:deploy.zhiwei['name'],
					post_id:deploy.zhiwei['id'],
					imgurl:people.imgurl,
					needChange:false
				}

				/**
				 * 1、循环班子成员，如果已有该人，不进行操作
				 * 2、没有该人 在相应的职务上添加任职
				 * 3、判断该职务上是否有state为false的 空位置，若有 将该位置替换
				 */
				var hasSamePeople=false;
				//1
				for(var j=0;j<$scope.daweilist.row.length;j++){
					for(var i=0;i<$scope.daweilist.row[j].column.length;i++){
						if($scope.daweilist.row[j].column[i].person_id==people.id){
							hasSamePeople=true;
							alert("所选人员已经在该班子中任职");
							return;
						}
					}
				}

				if(!hasSamePeople){
					for(var j=0;j<$scope.daweilist.row.length;j++){
						var hasFalsePeople=false;
						var delete_index=0;
						if($scope.daweilist.row[j].post_id==deploy.zhiwei['id']){
							//3
							for(var i=0;i<$scope.daweilist.row[j].column.length;i++){
								//2
								if($scope.daweilist.row[j].column[i].state=='false'){
									hasFalsePeople=true;
									delete_index=i;
									break;
								}
							}
							if(hasFalsePeople){
								//有空职位 移除 替换
								$scope.daweilist.row[j].column.splice(delete_index,1,newpeople);
							}else{
								//没有空职位，直接在人员后面追加
								$scope.daweilist.row[j].column.push(newpeople);
							}

							//任职id列表 如果任职id列表中没有该id 则添加
							if($scope.InPerson_ids.indexOf(newpeople.person_id)==-1){
								$scope.InPerson_ids.push(newpeople.person_id);
								//任职人员信息
								$scope.InPerson.push(newpeople);
							}
							//免职id列表 如果免职id列表中有该id 则删除
							if($scope.OutPerson_ids.indexOf(newpeople.person_id)!=-1){
								$scope.OutPerson_ids.splice($scope.OutPerson_ids.indexOf(newpeople.person_id),1);
								//离职人员信息
								$scope.OutPerson.splice($scope.OutPerson_ids.indexOf(newpeople.person_id),1);
							}
							console.log($scope.InPerson_ids+"---"+$scope.OutPerson_ids);
						}
					}
				}
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		//免职
		$scope.removepeople=function(people){
			var modaldeployInstance = $modal.open({
				templateUrl: 'selectmianzhiPeopleModel.html',
				controller: 'ModalMianzhiDeployInstanceCtrl',
				size: 'md',
				resolve:{
					people:function(){
						return people;
					}
				}
			});
			modaldeployInstance.result.then(function () {
				//生成缺编占位符
				var newpeople={
					post_rank:'',
					person_id:'',
					name:'',
					state:'false',
					post_name:people.post_name,
					post_id:people.post_id,
					imgurl:''
				}

				/**
				 * 循环人员列表
				 */
				for(var j=0;j<$scope.daweilist.row.length;j++){
					var delete_index=0;
					//找到免职人所在的层次
					if($scope.daweilist.row[j].post_id==people.post_id){
						//找到免职人的 位置
						for(var i=0;i<$scope.daweilist.row[j].column.length;i++){
							if($scope.daweilist.row[j].column[i].person_id==people.person_id){
								delete_index=i;
								break;
							}
						}

						if($scope.daweilist.row[j].num>=$scope.daweilist.row[j].column.length){
							//如果该职位 应有的人员数量 大于等于真实人员数量，需要用占位符替换该人
							$scope.daweilist.row[j].column.splice(delete_index,1,newpeople);
						}else{
							//原来是超编的情况下 免职 直接删除该人即可
							$scope.daweilist.row[j].column.splice(delete_index,1);
						}

						//免职id列表 如果免职id列表中没有该id 则添加
						if($scope.OutPerson_ids.indexOf(people.person_id)==-1){
							$scope.OutPerson_ids.push(people.person_id);
							//离职人员信息
							$scope.OutPerson.push(people);
						}
						//任职id列表 如果任职id列表中有该id 则删除
						console.log($scope.InPerson_ids.indexOf(people.person_id));
						if($scope.InPerson_ids.indexOf(people.person_id)!=-1){
							$scope.InPerson_ids.splice($scope.InPerson_ids.indexOf(people.person_id),1);
							//任职人员信息
							$scope.InPerson.splice($scope.InPerson_ids.indexOf(people.person_id),1);
						}

						console.log($scope.InPerson_ids+"---"+$scope.OutPerson_ids);
					}
				}
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		//保存班子
		$scope.savedeploy=function(){
			var modalsaveInstance = $modal.open({
				templateUrl: 'savePeopleModel.html',
				controller: 'SaveDeployInstanceCtrl',
				size: 'md',
				resolve:{
					InPerson_ids:function(){
						return $scope.InPerson_ids;
					},
					OutPerson_ids:function(){
						return $scope.OutPerson_ids;
					}
				}
			});
			modalsaveInstance.result.then(function () {


			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}

		//查看详情
		$scope.showOneDetail=function(people){

			if(people.id||people.person_id){
				$scope.isdetail=true;
				$scope.user={};
				var postData = $.param({
					person_id:people.id?people.id:people.person_id,
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
			}

		};
	} ]);
