'use strict';
app.controller('ModalDeployInstanceCtrl', ['$scope', '$modalInstance','$localStorage','adjustdetailservice','SettingdaimaService','UIDeployservice','people',
	function($scope, $modalInstance,$localStorage,adjustdetailservice,SettingdaimaService,UIDeployservice,people) {
		//任职原因
		SettingdaimaService.getCodagetList("ZB12").then(function(res){
			$scope.renzhilist=res.data.info.list;
		},function(rej){});
		var select_tree = $.param({
			tree_id:$localStorage.tree_uuid_bak,
			access_token:$localStorage.token
		});
		console.log($localStorage.tree_uuid_bak)
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
							console.log("分析结果",$scope.analysis_result);
						}
						console.log("分析结果",$scope.analysis_result);
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
app.controller('deployCtrl',['$rootScope', '$scope', '$http', '$state','$timeout','$modal','$log','$localStorage','adjustdetailservice','SettingdaimaService','SettingpeopleService','UIDeployservice','deploydanweiservice','messageservice','searchservice','getxueliList','treeservice_new','UIMessageService',
	function($rootScope,$scope, $http, $state, $timeout,$modal,$log,$localStorage,adjustdetailservice,SettingdaimaService,SettingpeopleService,UIDeployservice,deploydanweiservice,messageservice,searchservice,getxueliList,treeservice_new,UIMessageService) {
		//存储任职 离职人员id
		$scope.InPerson_ids=[];
		$scope.OutPerson_ids=[];
		//存储任职 离职人员信息
		$scope.InPerson=[];
		$scope.OutPerson=[];
		$scope.my_data1 = [];
		$scope.doing_async1 = true;
		$scope.treeselected=$localStorage.treeselect;
		console.log($localStorage.treeselected)
		$scope.nopeople="班子暂无成员";
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			$scope.treeselected=$localStorage.treeselect;
			$scope.select_tree_id=$localStorage.tree_uuid_bak;
			$scope.complex.open=false
			$scope.treechange.open=1,
			$scope.cleansubmit()
			treeservice_new.getData().then(
				function (res) {
					//$scope.my_data2 = res.data.info;
					for (var i=0 ;i<res.data.info.length;i++){
						$scope.my_data1.push(res.data.info[i].name)
						$scope.texttree=$scope.my_data1.indexOf($localStorage.treeselect);
						$scope.texttree++;
						
					}
					$scope.doing_async1 = false;
					//tree.expand_all();
				},
				function (rej) {
					console.log(rej);
				}
			);
			var postData = $.param({
				tree_id:$localStorage.tree_uuid_bak,
				access_token:$localStorage.token
			});
			UIDeployservice.getOneDeploy(postData).then(
				function(res){
					//班子成员
					$scope.daweilist = res.data.info;
					console.log($scope.daweilist)
					if($scope.daweilist){
						//需要分析班子成员，标注出 需要交流的人员
						var params=$.param({
							unit_id:$localStorage.tree_uuid_bak,
							access_token:$localStorage.token
						});
						UIDeployservice.getBanziAnalysis(params).then(
							function(res){
								if(res.data.msg=="操作成功"){
									console.log(11111111111)
									console.log(res.data.data.info.ageList)
									for(var j=0;j<$scope.daweilist.row.length;j++){
										for(var i=0;i<$scope.daweilist.row[j].column.length;i++){
											if(res.data.data.info.changeList.indexOf($scope.daweilist.row[j].column[i].person_id)!=-1){
												$scope.daweilist.row[j].column[i].needChange=true;
											}
											if(res.data.data.info.ageList.indexOf($scope.daweilist.row[j].column[i].person_id)!=-1){
												$scope.daweilist.row[j].column[i].overage=true;
											}
											else{
												$scope.daweilist.row[j].column[i].needChange=false;
												$scope.daweilist.row[j].column[i].overage=false;
											}
										}
									}
								}
							},
							function(rej){
								console.log(rej);
								console.log(222222)

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
		//SettingdaimaService.getCodagetList("ZB64").then(function(res){ $scope.xuelilist=res.data.info.list;},function(rej){});
		getxueliList.getxuewei().then(function(res){ $scope.xuelilist=res.data.info;},function(rej){});
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
		$scope.complex={
			open:false
		};
		$scope.treechange={
			open:0
		}
		//获取所有标签
		var postData1 = $.param({
			access_token:$localStorage.token
		});
		UIMessageService.getallLable(postData1).then(
			function (res) {
				$scope.lablelist = res.data.data.labelList;
				$scope.xxx=$scope.lablelist
				$scope.showlable=[]
				$scope.showlable.push($scope.xxx[0])
				$scope.showlable.push($scope.xxx[1])
				$scope.showlable.push($scope.xxx[2])
				$scope.showlable.push($scope.xxx[3])
				console.log( typeof $scope.showlable)
			},
			function (rej) {
				console.log(rej);
			})
		//获取所有字段
	//复杂查询
		$scope.compexsearch=function(id){
			console.log(id)
			var postData = $.param({
				id:id,
				pageNo:$scope.paginationConf.currentPage,
				pageSize:$scope.paginationConf.itemsPerPage,
				tree_id:$scope.tree_uuid_bak,
				isfilt:0,
				access_token:$localStorage.token
			});
			UIMessageService.getcomplexlist(postData).then(
				function (res) {
					$scope.lablelist = res.data.lableList;
				},
				function (rej) {
					console.log(rej);
				});
		}

		//条件管理
		$scope.tiaojianmanage=function(){
			var modaltiaojianmanageInstance = $modal.open({
				templateUrl: 'tiaojianmanagedeployModel.html',
				controller: 'ModaltiaojianmanagedeployInstanceCtrl',
				size: 'lg',
				resolve:{
				}
			});
			modaltiaojianmanageInstance.result.then(function (deploy) {
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		//增加条件
		$scope.addtiaojian=function(){
			var modaladdtiaojianInstance = $modal.open({
				templateUrl: 'addtiaojiandeployModel.html',
				controller: 'ModaladdtiaojiandeployInstanceCtrl',
				size: 'lg',
				resolve:{
				}
			});
			modaladdtiaojianInstance.result.then(function (select) {
				var a=[-1,]
				var b=[]
				var c=[]
				var d=[]
				var e=[]
				var f=[]
				var aa=[]
				var bb=[]
				var cc=[]
				var dd=[]
				var ee=[]
				var ff=[]
				$("select[name='aaa']").each(
					function(){
						a.push($(this).val())
					}
				)
				$("select[name='bbb']").each(
					function(){
						b.push($(this).val())
					}
				)
				$("select[name='ccc']").each(
					function(){
						c.push($(this).val())
					}
				)
				$("select[name='ddd']").each(
					function(){
						d.push($(this).val())
					}
				)
				$("input[name='eee']").each(
					function(){
						e.push($(this).val())
					}
				)
				$("select[name='fff']").each(
					function(){
						f.push($(this).val())
					}
				)
				var temps=[];
				var m= a.length;
				for(var i=0;i<m;i++){
					var temp={"sqlstr":a[i]+","+b[i]+","+c[i]+","+d[i]+","+e[i]+","+f[i]};
					temps[i]=temp;
				}
				console.log(temps)

				//alert(a)
				//alert(b)
				//alert(c)
				//alert(d)
				//alert(e)
				//alert(f)


				console.log(select)
				var name=select["name"];
				delete select["name"]
				//添加标签
				var postData4 = $.param({
					name:name,
					queryItems:JSON.stringify(temps),
					access_token:$localStorage.token
				});
				UIMessageService.addLabel(postData4).then(
					function (res) {
						console.log("添加成功")
					},
					function (rej) {
						console.log(rej);
					})
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		//清空树
		$scope.cleantree=function(){
			$scope.treeselected="";
			$scope.select_tree_id=""
			console.log($localStorage.tree_uuid)

		}
		//清除选项
		$scope.cleansubmit=function(){
			var x=$("[selectbutton='isSelected']").length;
			console.log($("[selectbutton='isSelected']")[1].selectbutton)
			for(var i=0;i<x;i++){
				$("[selectbutton='isSelected']").removeClass('btn-danger');
				$("[selectbutton='isSelected']").addClass('btn-default');
			}
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
			var postData = $.param({
				isfilt:0,
				tree_id:$localStorage.tree_uuid,
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
					if(res.data.code==200){

						$scope.paginationConf.totalItems = res.data.info.totalElements;
						$scope.messagetabletab = res.data.info.elements;
						console.log(res.data.info.totalElements);
						console.log($scope.messagetabletab)

					}else{
						//alert(res.data.msg);
					}

				},
				function (rej) {
					console.log(rej);
				}
			)
		}
		//$scope.isdetail=false;
		//deployright
		$scope.searchPeople=function(){
			var postData = $.param({
				isfilt:$scope.treechange.open,
				tree_id:$scope.select_tree_id,
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
						console.log($scope.searchpeopleshow);
					}else{
						console.log(res.data.msg);
					}

				},
				function (rej) {
					console.log(rej);
				}
			)
		}

		
		var getMessageImageList = function () {
			if ($scope.complex.open==false) {
					var postData = $.param({
						isfilt: $scope.treechange.open,
						tree_id: $scope.select_tree_id,
						keyword: $scope.search.keywords,
						ranks: $scope.rank.join(","),
						sexs: $scope.xingbie.join(","),
						political_statuses: $scope.politicalstatus.join(","),
						edu_levels: $scope.edulevel.join(","),
						ages: $scope.age.join(","),
						pageNo: $scope.paginationConf.currentPage,
						pageSize: $scope.paginationConf.itemsPerPage,
						access_token: $localStorage.token
					});
					console.log(1111111111111)
					console.log($scope.treechange.open)

					SettingpeopleService.getPeopleList(postData).then(
						function (res) {
							if (res.data.code == 200) {

								$scope.paginationConf.totalItems = res.data.info.totalElements;
								$scope.searchpeopleshow = res.data.info.elements;
								console.log(res.data.info.totalElements);
								console.log($scope.searchpeopleshow)

							} else {
								//alert(res.data.msg);
							}

						},
						function (rej) {
							console.log(rej);
						}
					)
				
			}
			if ($scope.complex.open==true) {
				console.log(333333333333333)
				var postData = $.param({
					id:$scope.id,
					pageNo:$scope.paginationConf.currentPage,
					pageSize:$scope.paginationConf.itemsPerPage,
					tree_id:$scope.tree_uuid_bak,
					isfilt:0,
					access_token:$localStorage.token
				});
				console.log(22222222222)
				UIMessageService.getcomplexlist(postData).then(
					function (res) {
						$scope.lablelist = res.data.lableList;
						var postData1 = $.param({
							id:$scope.id,
							pageNo:$scope.paginationConf.currentPage,
							pageSize:$scope.paginationConf.itemsPerPage,
							tree_id:$scope.tree_uuid_bak,
							isfilt:0,
							access_token:$localStorage.token
						});
						UIMessageService.getcomplexlist(postData1).then(
							function (res) {
									$scope.paginationConf.totalItems = res.data.info.totalElements;
									$scope.searchpeopleshow = res.data.info.elements;
									console.log(res.data.info.totalElements);
									console.log($scope.searchpeopleshow)
							},
							function (rej) {
								console.log(rej);
							}
						)
					},
					function (rej) {
						console.log(rej);
					});
			}
		}
		//配置分页基本参数
		$scope.paginationConf = {
			currentPage: 1,
			itemsPerPage: 12
		};
		$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getMessageImageList);
		$scope.$watch('treeselected', getMessageImageList)
		$scope.$watch('complex.open', getMessageImageList)

		//任职
		$scope.selectpeople=function(people){
			console.log(people);
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
					needChange:false,
					overage:false
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
								var p={
									person_id:newpeople.person_id,
									unit_id:$localStorage.tree_uuid_bak,
									adjust_type:2,
									now_post_id:people.now_post_id,
									tobe_post_id:deploy.zhiwei['id'],
									reason:deploy.reason
								}
								$scope.InPerson.push(p);
							}
							//免职id列表 如果免职id列表中有该id 则删除
							if($scope.OutPerson_ids.indexOf(newpeople.person_id)!=-1){
								$scope.OutPerson_ids.splice($scope.OutPerson_ids.indexOf(newpeople.person_id),1);
								//离职人员信息
								$scope.OutPerson.splice($scope.OutPerson_ids.indexOf(newpeople.person_id),1);
							}
							console.log($scope.InPerson+"---"+$scope.OutPerson);
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
			modaldeployInstance.result.then(function (deploy) {
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
							var p={
								person_id:people.person_id,
								unit_id:$localStorage.tree_uuid,
								adjust_type:1,
								now_post_id:people.post_id,
								tobe_post_id:'',
								reason:deploy.reason
							}
							$scope.OutPerson.push(p);
						}
						//任职id列表 如果任职id列表中有该id 则删除
						console.log($scope.InPerson_ids.indexOf(people.person_id));
						if($scope.InPerson_ids.indexOf(people.person_id)!=-1){
							$scope.InPerson_ids.splice($scope.InPerson_ids.indexOf(people.person_id),1);
							//任职人员信息
							$scope.InPerson.splice($scope.InPerson_ids.indexOf(people.person_id),1);
						}

						console.log($scope.InPerson+"---"+$scope.OutPerson);
					}
				}
			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		//保存班子
		$scope.savedeploy=function(){
			if($scope.InPerson_ids.length==0&&$scope.OutPerson_ids.length==0){
				alert("没有进行任免职操作，不需要保存调配");
				return ;
			}
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
				var json={
					in:$scope.InPerson,
					out:$scope.OutPerson
				}

					console.log(json);
					var postData = $.param({
						json:JSON.stringify(json),
						access_token:$localStorage.token
					});
					UIDeployservice.deploySave(postData).then(
						function(res){
							console.log(res);
							if(res.data.code==200){
								$state.go('app.analysis');
							}else{
								console.log(res.data.msg);
							}
						}
						,function(rej){
							console.log(rej);
						})
					console.log();


			}, function () {
				$log.info('Modal dismissed at: ' + new Date());
			});
		}
		//获取当前年份
		$scope.y=new Date()
		$scope.nowyear= $scope.y.getFullYear()
		$scope.hasanalysis=false;
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
app.controller('ModaltiaojianmanagedeployInstanceCtrl', ['$scope', '$modalInstance','$localStorage',
	function($scope, $modalInstance) {
		$scope.ok = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}]);
app.controller('ModaladdtiaojiandeployInstanceCtrl', ['$scope', '$modalInstance','$localStorage','UIMessageService','$compile',
	function($scope, $modalInstance,$localStorage,UIMessageService,$compile) {
		//获取所有字段
		var postData3= $.param({
			access_token:$localStorage.token
		});
		UIMessageService.getallcode(postData3).then(
			function (res) {
				$scope.codelist = res.data.data.CodeList;
				$scope.code=$scope.codelist
				console.log($scope.codelist)
			},
			function (rej) {
				console.log(rej);
			})
		//var i=1;
		//var a="selelct.luoji"+i;
		//var b="selelct.zuokuohao"+i;
		//var c="selelct.code"+i;
		//var d="selelct.yunsuanfu"+i;
		//var e="selelct.zhi"+i;
		//var f="selelct.youkuohao"+i;
		//$scope.tiaojianlist=[{"id":i,"model1":a,"model2":b,"model3":c,"model4":d,"model5":e,"model6":f}]
		//$scope.tiaojian=$scope.tiaojianlist;
		$scope.tiaojianlist=[];
		var ii=111
		$scope.addonetiaojian=function(){

			$scope.tiaojianlist.push({"model1":"aaa","model2":"bbb","model3":"ccc","model4":"ddd","model5":"eee","model6":"fff","id":ii})
			console.log($scope.tiaojianlist)
			ii++;
		}

		Array.prototype.remove=function(obj){
			for(var i =0;i <this.length;i++){
				var temp = this[i];
				if(!isNaN(obj)){
					temp=i;
				}
				if(temp == obj){
					for(var j = i;j <this.length;j++){
						this[j]=this[j+1];
					}
					this.length = this.length-1;
				}
			}
		}
		$scope.delonetiaojian=function(target){
			//target.target.parentNode.parentNode.remove()
			//alert(target.target.name)
			for(var n=0;n<$scope.tiaojianlist.length;n++){
				if($scope.tiaojianlist[n].id==target.target.name){
					console.log(n)
					console.log($scope.tiaojianlist[n].id)
					$scope.tiaojianlist.splice(n,1)

					console.log($scope.tiaojianlist.length)
				}
			}
		}
		$scope.select={
			name:"",
			luoji:"",
			zuokuohao:"",
			code:"",
			yunsuanfu:"",
			zhi:"",
			youkuohao:""
		};
		$scope.ok = function () {
			$modalInstance.close($scope.select);
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}]);