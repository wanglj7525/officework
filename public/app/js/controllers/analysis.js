'use strict';
app.controller('peopleChartsController', ['$scope', '$modalInstance','$localStorage','people','UIanalysisservice','SettingpeopleService','$modal','SettingdaimaService',function($scope, $modalInstance,$localStorage,people,UIanalysisservice,SettingpeopleService,$modal,SettingdaimaService) {
	$scope.y=new Date()
	$scope.nowyear= $scope.y.getFullYear()
	console.log(people)	
	$scope.user={};
		var postData = $.param({
			person_id:people.person_id,
			access_token:$localStorage.token
		});
	console.log(people.person_id);

	//性别
	SettingdaimaService.getCodagetList("GB2261_1").then(function(res){ $scope.sexlist=res.data.info.list;},function(rej){});
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
					console.log($scope.eduinfolist)
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
		//SettingpeopleService.getPeopleBase(postData).then(
		//	function(res) {
		//		if (res.data.code == 200) {
		//			$scope.user = res.data.info;
		//			console.log($scope.user.sex)
		//			//下拉列表默认显示值
		//			if($scope.user.jiguan||$scope.user.birthplace){
		//				for(var i=0;i<$scope.address.length;i++){
		//					if($scope.user.birthplace==$scope.address[i].ano){
		//						$scope.user.birthplace=$scope.address[i];
		//					}
		//					if($scope.user.jiguan==$scope.address[i].ano){
		//						$scope.user.jiguan=$scope.address[i];
		//					}
		//				}
		//			}
		//			if($scope.user.person_status){
		//				for(var i=0;i<$scope.zhuangtailist.length;i++){
		//					if($scope.user.person_status==$scope.zhuangtailist[i].ano){
		//						$scope.user.person_status=$scope.zhuangtailist[i];
		//					}
		//				}
		//			}
		//			if($scope.user.personal){
		//				for(var i=0;i<$scope.personallist.length;i++){
		//					if($scope.user.personal==$scope.personallist[i].ano){
		//						$scope.user.personal=$scope.personallist[i];
		//					}
		//				}
		//			}
		//			if($scope.user.rank){
		//				for(var i=0;i<$scope.zhijilist.length;i++){
		//					if($scope.user.rank==$scope.zhijilist[i].ano){
		//						$scope.user.rank=$scope.zhijilist[i];
		//					}
		//				}
		//			}
		//			if($scope.user.health){
		//				for(var i=0;i<$scope.jiankanglist.length;i++){
		//					if($scope.user.health==$scope.jiankanglist[i].ano){
		//						$scope.user.health=$scope.jiankanglist[i];
		//					}
		//				}
		//			}
		//			if($scope.user.political_status){
		//				for(var i=0;i<$scope.zhengzhilist.length;i++){
		//					if($scope.user.political_status==$scope.zhengzhilist[i].ano){
		//						$scope.user.political_status=$scope.zhengzhilist[i];
		//					}
		//				}
		//			}
		//			if($scope.user.sex){
		//				console.log($scope.user.sex)
		//				for(var i=0;i<$scope.sexlist.length;i++){
		//					console.log($scope.sexlist)
		//					if($scope.user.sex==$scope.sexlist[i].ano){
		//						$scope.user.sex=$scope.sexlist[i].jc;
		//					}
		//				}
        //
		//			}
		//			if( $scope.user.nation){
		//				for(var i=0;i<$scope.minzulist.length;i++){
		//					if($scope.user.nation==$scope.minzulist[i].ano){
		//						$scope.user.nation=$scope.minzulist[i];
		//					}
		//				}
		//			}
		//		}
		//	}
		//)
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
	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('analysisChartsController', ['$scope', '$modalInstance','$localStorage', 'title','type','UIanalysisservice','SettingpeopleService','$modal',function($scope, $modalInstance,$localStorage,title,type,UIanalysisservice,SettingpeopleService,$modal) {
		var postData = $.param({
			tree_id:$localStorage.tree_uuid,
			type:type,
			title:title,
			access_token:$localStorage.token
		});
		UIanalysisservice.getanalysisdetail(postData).then(
			function (res) {
				console.log(res);
				if(res.data.code==200){
					$scope.charts = res.data.info.list;
					console.log($scope.charts)
				}else{
					//alert(res.data.msg);
				}
			},
			function (rej) {
				console.log(rej);
			}
		)
	
	//$scope.$watch('paginationConf.currentPage + paginationConf.itemsPerPage', getanalysislist);
	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
	$scope.showOneDetail=function(people){
		console.log(people)
		var modalchartsInstance = $modal.open({
			templateUrl: 'peopleChartsModel.html',
			controller: 'peopleChartsController',
			size: 'lg',
			resolve: {
				people:function(){return people}
			}
		});


		modalchartsInstance.result.then(function (i) {
		}, function () {
		});
	};
}]);
app.controller('analysisController',[ '$scope','$localStorage','UIanalysisservice','UIworktipservice',
	function($scope,$localStorage,UIanalysisservice,UIworktipservice) {
		//切换单位树 请求新的数据
	
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			var postData1 = $.param({
				tree_id:$localStorage.tree_uuid,
				category:0,
				access_token:$localStorage.token
			});
			UIworktipservice.getworktipList(postData1).then(
				function (res) {
					console.log(res);
					if(res.data.code==200){
						$scope.worktiptable1 = res.data.info;
					}else{
						console.log(res.data.msg);
					}
				},
				function (rej) {
					console.log(rej);
				}
			)
			for(var i=1;i<=4;i++){
				var postData = $.param({
					tree_id:$localStorage.tree_uuid,
					type:i,
					access_token:$localStorage.token
				});
				UIanalysisservice.getanalysis(postData).then(
					function (res) {
						if(res.data.code==200){
							//console.log(res)
							var legendbar=[];
							var databar=[];
							var name=res.data.info.title.value;
							var databarforpie=res.data.info.list;
							var lengthshow=res.data.info.list.length;
							for(var j=0;j<lengthshow;j++){
								legendbar.push(databarforpie[j].name);
								databar.push(databarforpie[j].value);
							}
							if(name==1){
								$scope.config1={
									names:name,
									legend:legendbar,
									data:databar,
									dataforpie:databarforpie
								};
								$scope.config11={
									names:name,
									legend:legendbar,
									data:databar,
									dataforpie:databarforpie
								}
							}else if(name==2){
								$scope.config2={
									names:name,
									legend:legendbar,
									data:databar,
									dataforpie:databarforpie
								};$scope.config22={
									names:name,
									legend:legendbar,
									data:databar,
									dataforpie:databarforpie
								}
							}else if(name==3){
								$scope.config3={
									names:name,
									legend:legendbar,
									data:databar,
									dataforpie:databarforpie
								};
								$scope.config33={
									names:name,
									legend:legendbar,
									data:databar,
									dataforpie:databarforpie
								}
							}else if(name==4){
								$scope.config4={
									names:name,
									legend:legendbar,
									data:databar,
									dataforpie:databarforpie
								};
								$scope.config44={
									names:name,
									legend:legendbar,
									data:databar,
									dataforpie:databarforpie
								}
							}
						}else{
							console.log(res.data.msg);
						}

					},
					function (rej) {
						console.log(rej);
					}
				)
			}
		});

		$scope.selectTab=true;
		////$scope.name1="年龄比例";
		////$scope.legendbar1 = [ "35岁及以下", "36-40岁", '41-45岁', '45-50岁', '51-55岁', '56岁以上' ];
		////$scope.databar1=[335,310,234,135,125,148];
		////$scope.databarforpie1=[{value:335,name:"35岁及以下"},{value:310,name:"36-40岁"},{value:234,name:"41-45岁"},{value:135,name:"45-50岁"},{value:125,name:"51-55岁"},{value:148,name:"56岁以上"}];
		//
		////$scope.legendpie1 = [ "35岁及以下xx:335", "36-40岁:310", '41-45岁:234', '45-50岁:135', '51-55岁:135', '56岁以上:148' ];
		////$scope.datapie1 = [{value:335, name:'35岁及以下xx'},{value:310, name:'36-40岁'},{value:234, name:'41-45岁'},{value:135, name:'45-50岁'},{value:135, name:'51-55岁'},{value:148, name:'56岁以上'}];
		//
		//$scope.name2="性别比例";
		//$scope.legendpie2 = [ "男", "女"];
		//$scope.datapie2 = [{value:335, name:'男'},{value:310, name:'女'}];
		//
		//$scope.name3="学历比例";
		//$scope.legendbar3 = [ "研究生", "大学本科", '大学专科' , '中专', '高中', '初中及以下'];
		//$scope.databar3=[335,510,452,123,45,44];
		//$scope.databarforpie3=[{value:335,name:"研究生"},{value:510,name:"大学本科"},{value:452,name:"大学专科"},{value:123,name:"中专"},{value:45,name:"高中"},{value:44,name:"初中及以下"}]
		////$scope.legendpie3 = [ "研究生", "大学本科", '大学专科' , '中专', '高中', '初中及以下'];
		////$scope.datapie3 = [{value:335, name:'研究生'},{value:510, name:'大学本科'},{value:294, name:'大学专科'},{value:235, name:'中专'},{value:135, name:'高中'},{value:348, name:'初中及以下'}];
		//
		//$scope.name4="政治面貌比例";
		//$scope.legendbar4 = [ "中共党员", "民革", '民盟', '农工党', '九三学社', '台盟' ];
		//$scope.databar4=[523,432,42,52,554,23];
		//$scope.databarforpie4=[{value:523,name:"中共党员"},{value:432,name:"民革"},{value:42,name:"民盟"},{value:52,name:"农工党"},{value:554,name:"九三学社"},{value:23,name:"台盟"},]
		////$scope.legendpie4 = [ "中共党员", "民革", '民盟', '农工党', '九三学社', '台盟' ];
		////$scope.datapie4 = [{value:635, name:'中共党员'},{value:210, name:'民革'},{value:134, name:'民盟'},{value:135, name:'农工党'},{value:535, name:'九三学社'},{value:118, name:'台盟'}];
		//
		//
		////$scope.config1={
		////	names:$scope.name1,
		////	legend:$scope.legendbar1,
		////	data:$scope.databar1,
		////	dataforpie:$scope.databarforpie1
		////}
		////
		//$scope.analysisDetail=function(){
		//	//alert($scope.datapie1);
		//}
		//
		//$scope.config2={
		//	names:$scope.name2,
		//	legend:$scope.legendpie2,
		//	data:$scope.datapie2
		//}
		//$scope.config3={
		//	names:$scope.name3,
		//	legend:$scope.legendbar3,
		//	data:$scope.databar3,
		//	dataforpie:$scope.databarforpie3
		//}
		//$scope.config4={
		//	names:$scope.name4,
		//	legend:$scope.legendbar4,
		//	data:$scope.databar4,
		//	dataforpie:$scope.databarforpie4
		//}

	} ]);
app.directive('pies', function($modal,$log) {
	return {
		scope : {
			id : "@",
			config : "="
		},
		restrict : 'E',
		template: '<div style="width:350px;height:300px;"></div>',
		replace : true,
		link : function($scope, element, attrs, controller) {
			function showpie(){
				var option = {
					// 提示框，鼠标悬浮交互时的信息提示
					tooltip : {
						show : false,
						trigger : 'item',
						formatter: "{b} : {c}人 ({d}%)"
					},
					toolbox: {
						show : true,
						orient:'horizontal',
						x:'right',
						y:'top',
						feature : {
							mark : {show: false},
							dataView : {show: false, readOnly: false},
							restore : {show: false},
							saveAsImage : {show: false},
						}

					},
					//禁止拖动
					calculable : false,
					// 数据内容数组
					series : [
						{
							name:$scope.config.names,
							type:'pie',
							radius : '55%',
							center: ['50%', '50%'],
							data:$scope.config.dataforpie
						}
					]
				};
				//alert($scope.config.names);
				//alert($scope.config.data[1].value);

				var myChart = echarts.init(document.getElementById($scope.id),'macarons');
				myChart.setOption(option);
				window.onresize = myChart.resize;


				//图表点击事件
				function everyClick(txt,names){
					console.log(txt+"---"+names);
					//if(param.seriesIndex==0&&param.dataIndex==i){
					//confirm(txt)&&window.open (names,'_parent','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');

					var modalchartsInstance = $modal.open({
						templateUrl: 'analysisChartsModel.html',
						controller: 'analysisChartsController',
						size: 'lg',
						resolve: {
							title: function () {
								return txt;
							},
							type:function(){
								return names;
							}
						}
					});


					modalchartsInstance.result.then(function (i) {

					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
					//}
				}

				function eConsole(param) {
					if (typeof param.seriesIndex != 'undefined') {
						if (param.type == 'click') {
							var peiLenght= $scope.config.data.length;
							//alert(peiLenght);// 获取总共给分隔的扇形数
							for(var i=0;i<peiLenght;i++){
								if(param.seriesIndex==0&&param.dataIndex==i){
									everyClick($scope.config.dataforpie[i].name,$scope.config.names);
								}
								//everyClick(param,i,$scope.config.data[i].value,$scope.config.names[i]);
							}
						}else{
							document.getElementById('hover-console').innerHTML = 'Event Console : ' + param.dataIndex;
							//alert();
						}

					}
				}
				myChart.on("click", eConsole);
			}
			$scope.$watch('config',function(newValue,oldValue){
				//newValue && newValue.legend.length>0 && newValue.data.length>0 && showpie();
				newValue &&  newValue.data.length>0 && showpie();
			});
		}
	};
});
app.directive('bars', function($modal,$log) {
	return {
		scope : {
			id : "@",
			config : "="
		},
		restrict : 'E',
		template: '<div style="width:400px;height:300px;"></div>',
		replace : true,
		link : function($scope, element, attrs, controller) {
		
			function showbar(){
				var option = {
					
					tooltip : {
						show:false,
						formatter: "{b} : {c}人"
					},
					//禁止拖动
					calculable : false,
					xAxis : [
						{
							axisLabel: {
								rotate: 30,
							},
							type : 'category',
							data : $scope.config.legend,
						}
					],
					yAxis : [
						{
							type : 'value'
						}
					],
					series : [
						{
							name:$scope.config.names,
							type:'bar',
							data:$scope.config.data,
							//markPoint : {
							//	data : [
							//		{type : 'max', name: '最大值'},
							//		{type : 'min', name: '最小值'}
							//	]
							//},
							//markLine : {
							//	data : [
							//		{type : 'average', name: '平均值'}
							//	]
							//}
							itemStyle:{
								normal: {
									color: 	function getColorByRandom(colorList){
										var colorList = ["#2EC7C9","#B6A2DE","#5AB1EF","#FFB980","#D87A80","#8D98B3"];
										var colorIndex = Math.floor(Math.random()*colorList.length);
										var color = colorList[colorIndex];
										colorList.splice(colorIndex,1);
										return color;
									},
									label:{
										show:false,
									}
								}
							}
						}
					]
				};
				var myChart = echarts.init(document.getElementById($scope.id),'macarons');
				myChart.setOption(option);
				window.onresize = myChart.resize;

				//图表点击事件
				function everyClick(txt,names){
					console.log(txt+"---"+names);
					//if(param.seriesIndex==0&&param.dataIndex==i){
					//confirm(txt)&&window.open (names,'_parent','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');

					var modalchartsInstance = $modal.open({
						templateUrl: 'analysisChartsModel.html',
						controller: 'analysisChartsController',
						size: 'lg',
						resolve: {
							title: function () {
								return txt;
							},
							type:function(){
								return names;
							}
						}
					});


					modalchartsInstance.result.then(function (i) {

					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
					//}
				}

				function eConsole(param) {
					if (typeof param.seriesIndex != 'undefined') {
						if (param.type == 'click') {
							var peiLenght= $scope.config.data.length;
							//alert(peiLenght);// 获取总共给分隔的扇形数
							for(var i=0;i<peiLenght;i++){
								if(param.seriesIndex==0&&param.dataIndex==i){
									everyClick($scope.config.dataforpie[i].name,$scope.config.names);
								}
								//everyClick(param,i,$scope.config.data[i].value,$scope.config.names[i]);
							}
						}else{
							document.getElementById('hover-console').innerHTML = 'Event Console : ' + param.dataIndex;
							//alert();
						}

					}
				}
				myChart.on("click", eConsole);
			}
			$scope.$watch('config',function(newValue,oldValue){
				//newValue && newValue.legend.length>0 && newValue.data.length>0 && showpie();
				newValue &&  newValue.data.length>0 && showbar();
			});
		}
	};
});