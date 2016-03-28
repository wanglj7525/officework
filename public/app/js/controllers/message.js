'use strict';
  app.controller('MessageController', [ '$scope', '$http', '$state','$timeout','$modal','$log','$localStorage','UIMessageService','messageservice','searchservice','SettingpeopleService','SettingdaimaService','getxueliList',
		function($scope, $http, $state, $timeout,$modal,$log,$localStorage,UIMessageService,messageservice,searchservice,SettingpeopleService,SettingdaimaService,getxueliList) {
			$scope.treeselected=$localStorage.treeselect;
			$scope.select_tree_id=$localStorage.tree_uuid;
			$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
				if(newValue===oldValue) return;
				$scope.treeselected=$localStorage.treeselect;
			});
			$scope.cleantree=function(){
				$localStorage.tree_uuid="";
				$scope.treeselected="";
				console.log($localStorage.tree_uuid)
				//var postData = $.param({
				//	isfilt:0,
				//	tree_id:$scope.select_tree_id,
				//	keyword:$scope.search.keywords,
				//	ranks:$scope.rank.join(","),
				//	sexs:$scope.xingbie.join(","),
				//	political_statuses:$scope.politicalstatus.join(","),
				//	edu_levels:$scope.edulevel.join(","),
				//	ages:$scope.age.join(","),
				//	pageNo: $scope.paginationConf.currentPage,
				//	pageSize: $scope.paginationConf.itemsPerPage,
				//	access_token:$localStorage.token
				//});
				//SettingpeopleService.getPeopleList(postData).then(
				//	function (res) {
				//		console.log(res.data.info.totalElements);
				//		if(res.data.code==200){
				//			$scope.paginationConf.totalItems = res.data.info.totalElements;
				//			$scope.messagetabletab = res.data.info.elements;
				//			console.log( res.data.info.totalElements)
				//			console.log($scope.messagetabletab)
				//		}else{
				//			//alert(res.data.msg);
				//		}
                //
				//	},
				//	function (rej) {
				//		console.log(rej);
				//	}
				//)
				//var getMessageImageList = function () {
				//	var postData = $.param({
				//		isfilt:0,
				//		tree_id:$scope.select_tree_id,
				//		keyword:$scope.search.keywords,
				//		ranks:$scope.rank.join(","),
				//		sexs:$scope.xingbie.join(","),
				//		political_statuses:$scope.politicalstatus.join(","),
				//		edu_levels:$scope.edulevel.join(","),
				//		ages:$scope.age.join(","),
				//		pageNo: $scope.paginationConf.currentPage,
				//		pageSize: $scope.paginationConf.itemsPerPage,
				//		access_token:$localStorage.token
				//	});
				//	SettingpeopleService.getPeopleList(postData).then(
				//		function (res) {
				//			if(res.data.code==200){
				//				$scope.paginationConf.totalItems = res.data.info.totalElements;
				//				$scope.messagetabletab = res.data.info.elements;
				//				console.log(res.data.info.totalElements);
				//				console.log($scope.messagetabletab)
                //
				//			}else{
				//				//alert(res.data.msg);
				//			}
                //
				//		},
				//		function (rej) {
				//			console.log(rej);
				//		}
				//	)
				//}
				////配置分页基本参数
				//$scope.paginationConf = {
				//	currentPage: 1,
				//	itemsPerPage: 12
				//};
				//$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getMessageImageList);
				//$scope.$watch('select_tree_id', getMessageImageList);
			}
			//分页获取数据
			//当前年份
			$scope.y=new Date()
			$scope.nowyear= $scope.y.getFullYear()
			console.log($scope.nowyear)

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
			SettingdaimaService.getCodagetList("GB2261_4").then(function(res){ $scope.personallist=res.data.info.list;},function(rej){});
			//人员状态
			SettingdaimaService.getCodagetList("FJ14").then(function(res){ $scope.zhuangtailist=res.data.info.list;},function(rej){});
			//学历
			//SettingdaimaService.getCodagetList("GB4658").then(function(res){ $scope.xuelilist=res.data.info.list;},function(rej){});
			getxueliList.getxuewei().then(function(res){ $scope.xuelilist=res.data.info;},function(rej){});
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
			$scope.tabel={
				open:false
			};
			$scope.kuaijie={
				open:false
			};
			$scope.jieguo={
				open:false
			};
			//自定义查询
			//删除标签
			$scope.delLable=function(id){
				var postData = $.param({
					id:id,
					access_token:$localStorage.token
				});
				UIMessageService.delLabel(postData).then(
					function (res) {
					},
					function (rej) {
						console.log(rej);
					})
				var postData1 = $.param({
					access_token:$localStorage.token
				});
				UIMessageService.getallLable(postData1).then(
					function (res) {
						$scope.lablelist = res.data.data.labelList;
						$scope.xxx=$scope.lablelist
						console.log($scope.xxx)
					},
					function (rej) {
						console.log(rej);
					})
				var postData2 = $.param({
					access_token:$localStorage.token
				});
				UIMessageService.getallLable(postData2).then(
					function (res) {
						$scope.lablelist = res.data.data.labelList;
						$scope.xxx=$scope.lablelist
						console.log($scope.xxx)
					},
					function (rej) {
						console.log(rej);
					})
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
			
			//复杂查询
			var postData5 = $.param({
				id:1,
				pageNo:1,
				pageSize:1,
				access_token:$localStorage.token
			});
			UIMessageService.getallLable(postData5).then(
				function (res) {
					$scope.lablelist = res.data.lableList;
				},
				function (rej) {
					console.log(rej);
				});
			
			
			$scope.compexsearch=function(id){
				var postData = $.param({
					id:id,
					pageNo:1,
					pageSize:1,
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
			
			
		
			searchservice.getData().then(
				function (res) {
					$scope.nianlinglist = res.data.info;
				},
				function (rej) {
					console.log(rej);
				}
			);
			$scope.searchPeople=function(){
				var postData = $.param({
					isfilt:0,
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
				console.log($scope.rank)
				SettingpeopleService.getPeopleList(postData).then(
					function (res) {
						//console.log(res.data.info.totalElements);
						if(res.data.code==200){
							$scope.paginationConf.totalItems = res.data.info.totalElements;
							$scope.messagetabletab = res.data.info.elements;
							//console.log( res.data.info.totalElements)
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
			//分页获取数据
			var getMessageImageList = function () {
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
			//配置分页基本参数
			$scope.paginationConf = {
				currentPage: 1,
				itemsPerPage: 12
			};
			$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getMessageImageList);
			$scope.$watch('treeselected', getMessageImageList);

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
			$scope.showOneDetail=function(people){
				console.log(people)
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
							console.log("家庭成员",$scope.familyInfolist)
							console.log("家庭成员",$scope.familyInfolist.birthday)
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
							console.log($scope.resumeinfo)
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
							console.log("年度考核",$scope.examinfolist)
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
							console.log("奖惩记录",$scope.jiangchenginfolist)
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
							console.log("学位",$scope.degreeinfolist)
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
							console.log("学历",$scope.eduinfolist)
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
							console.log("职称",$scope.titleinfolist)
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
							console.log("现任职务",$scope.postinfolist)
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
										console.log($scope.user.rank)
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
			console.log("基本信息",$scope.user)
			//结果集管理
			$scope.jieguomanage=function(){
				var modaljieguomanegeInstance = $modal.open({
					templateUrl: 'jieguomanageModel.html',
					controller: 'ModaljieguomanageInstanceCtrl',
					size: 'lg',
					resolve:{
					}
				});
				modaljieguomanegeInstance.result.then(function (deploy) {
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			}
			//查询条件管理
			$scope.tiaojianmanage=function(){
				var modaltiaojianmanageInstance = $modal.open({
					templateUrl: 'tiaojianmanageModel.html',
					controller: 'ModaltiaojianmanageInstanceCtrl',
					size: 'lg',
					resolve:{
					}
				});
				modaltiaojianmanageInstance.result.then(function (deploy) {
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});
			}
			$scope.addtiaojian=function(){
				var modaladdtiaojianInstance = $modal.open({
					templateUrl: 'addtiaojianModel.html',
					controller: 'ModaladdtiaojianInstanceCtrl',
					size: 'lg',
					resolve:{
					}
				});
				modaladdtiaojianInstance.result.then(function (select) {
					var a=["AND",]
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
				
					var m= a.length;
					$scope.n=[]
					$scope.queryItemList=[]
					for(var i=0;i<m;i++){
						//var temp={"queryItemList":a[i]+","+b[i]+","+c[i]+","+d[i]+","+e[i]+","+f[i]};
						//e[i]=c[i];
						var temp={
							logic:a[i],
							isLeftBracket:b[i],
							code:c[i],
							operate:d[i],
							value1:e[i],
							isRightBracket:f[i],
						};
						console.log($scope.n)
						$scope.queryItemList.push(temp)
					}
					//var p={
					//	logic:$scope.logic,
					//	isLeftBracket:$scope.isLeftBracket,
					//	code:$scope.code,
					//	operate:$scope.operate,
					//	value:$scope.value,
					//	isRightBracket:$scope.isRightBracket,
					//};
					
					console.log(temps)
					console.log(select)
					var name=select["name"];
					var temps={
						name:name,
						queryItemList:$scope.queryItemList
					};
					//delete temps["name"]
					//添加标签
					var postData4 = $.param({
						name:name,
						queryItems:JSON.stringify(temps),
						access_token:$localStorage.token
					});
					UIMessageService.addLabel(postData4).then(
						function (res) {
							console.log("添加成功");
						},
						function (rej) {
							console.log(rej);
						})
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
					alert("添加失败")
				});
			}
			

		} ]);
app.controller('ModaljieguomanageInstanceCtrl', ['$scope', '$modalInstance','$localStorage',
	function($scope, $modalInstance) {
		$scope.ok = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}]);
app.controller('ModaltiaojianmanageInstanceCtrl', ['$scope', '$modalInstance','$localStorage',
	function($scope, $modalInstance) {
		$scope.ok = function () {
			$modalInstance.close();
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};
	}]);
app.controller('ModaladdtiaojianInstanceCtrl', ['$scope', '$modalInstance','$localStorage','UIMessageService','SettingdaimaService',
	function($scope, $modalInstance,$localStorage,UIMessageService,SettingdaimaService) {
		
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