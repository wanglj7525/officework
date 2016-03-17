'use strict';

app.controller('analysisChartsController', ['$scope', '$modalInstance','$localStorage', 'title','type','UIanalysisservice',function($scope, $modalInstance,$localStorage,title,type,UIanalysisservice) {
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
				}else{
					alert(res.data.msg);
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
}]);
app.controller('analysisController',[ '$scope','$localStorage','UIanalysisservice','UIworktipservice',
	function($scope,$localStorage,UIanalysisservice,UIworktipservice) {
		//切换单位树 请求新的数据
	
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			var postData1 = $.param({
				tree_id:$localStorage.tree_uuid,
				category:0
			});
			UIworktipservice.getworktipList(postData1).then(
				function (res) {
					console.log(res);
					if(res.data.code==200){
						$scope.worktiptable1 = res.data.info;
					}else{
						//alert(res.data.msg);
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
							alert(res.data.msg);
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
						show : true,
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
					calculable : true,
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
						formatter: "{b} : {c}人"
					},
					calculable : true,
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