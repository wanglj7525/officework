'use strict';
  app.controller('MessageController', [ '$scope', '$http', '$state','$timeout','$modal','$log','$localStorage','UIMessageService','messageservice','searchservice','SettingpeopleService','SettingdaimaService',
		function($scope, $http, $state, $timeout,$modal,$log,$localStorage,UIMessageService,messageservice,searchservice,SettingpeopleService,SettingdaimaService) {
			$scope.treeselected=$localStorage.treeselect;
			$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
				if(newValue===oldValue) return;
				$scope.treeselected=$localStorage.treeselect;
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
			$scope.status = {
				open: false
			};
			searchservice.getData().then(
				function (res) {
					$scope.nianlinglist = res.data.info;
				},
				function (rej) {
					console.log(rej);
				}
			);
			$scope.searchPeople=function(){
				console.log($scope.search.keywords);
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
							$scope.messagetabletab = res.data.info.elements;
						}else{
							alert(res.data.msg);
						}

					},
					function (rej) {
						console.log(rej);
					}
				)
			}
			//分页获取数据
			var getMessageImageList = function () {
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
							$scope.messagetabletab = res.data.info.elements;
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
			$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getMessageImageList);
			$scope.$watch('treeselected', getMessageImageList);


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
							$scope.all_text=$scope.resumeinfo.resume;
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
