'use strict';

app.controller('analysisChartsController', ['$scope', '$modalInstance', 'items',function($scope, $modalInstance,items) {
	//alert(items);
	$scope.charts = [
		{ id:1,img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息1",nation:"汉",birthday:"196511",palce:"福清龙田",troops:"197712",party:"191212",education:"本科",school:"福建师范"},
		{ id:2,img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"男",company:"福清市xxx、xxx信息2",nation:"汉",birthday:"195411",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
		{ id:3,img:'/public/app/img/a2.jpg', name:'张三3' ,sex:"男",company:"福清市xxx、xxx信息3",nation:"汉",birthday:"195711",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"},
		{ id:4,img:'/public/app/img/a3.jpg', name:'张三4' ,sex:"女",company:"福清市xxx、xxx信息4",nation:"汉",birthday:"195311",palce:"福清龙田",troops:"197212",party:"197212",education:"本科",school:"福建师范"},
		{ id:5,img:'/public/app/img/a4.jpg', name:'张三5' ,sex:"男",company:"福清市xxx、xxx信息5",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"191212",party:"197712",education:"本科",school:"福建师范"},
		{ id:6,img:'/public/app/img/a5.jpg', name:'张三6' ,sex:"男",company:"福清市xxx、xxx信息6",nation:"汉",birthday:"195011",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
		{ id:7,img:'/public/app/img/a6.jpg', name:'张三7' ,sex:"男",company:"福清市xxx、xxx信息7",nation:"汉",birthday:"197511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"},
		{ id:8,img:'/public/app/img/a7.jpg', name:'张三8' ,sex:"男",company:"福清市xxx、xxx信息8",nation:"汉",birthday:"198511",palce:"福清龙田",troops:"191212",party:"171212",education:"本科",school:"福建师范"},
		{ id:9,img:'/public/app/img/a8.jpg', name:'张三9' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195411",palce:"福清龙田",troops:"197712",party:"197712",education:"本科",school:"福建师范"},
		{ id:10,img:'/public/app/img/a9.jpg', name:'张三10',sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"191212",education:"本科",school:"福建师范" },
		{ id:11,img:'/public/app/img/a0.jpg', name:'张三1' ,sex:"男",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197212",party:"197712",education:"本科",school:"福建师范"},
		{ id:12,img:'/public/app/img/a1.jpg', name:'张三2' ,sex:"女",company:"福清市xxx、xxx信息",nation:"汉",birthday:"195511",palce:"福清龙田",troops:"197712",party:"197212",education:"本科",school:"福建师范"}];
	$scope.ok = function () {
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
app.controller('analysisController',[ '$scope','$localStorage','treeservice',
	function($scope,$localStorage,treeservice) {
		$scope.treeselected=$localStorage.treeselect;
		console.log("班子分析左树："+$scope.treeselected);
		$scope.$watch(function(){ return $localStorage.treeselect},function(newValue,oldValue){
			$scope.treeselected=$localStorage.treeselect;
			console.log("班子分析左树变换："+$scope.treeselected);
		});
		////lefttree
		//var  tree, treedata_avm;
		//
		//
		//$scope.my_tree_handler = function(branch) {
		//	var _ref;
		//	$scope.output = branch.label;
		//	if ((_ref = branch.data) != null ? _ref.description : void 0) {
		//		return $scope.output += '(' + branch.data.description + ')';
		//	}
		//	console.log($scope.output);
		//	//TODO
		//};
		//$scope.my_data = [];
		//$scope.doing_async = true;
		//treeservice.getData().then(
		//	function (res) {
		//		$scope.my_data = res.data.info
		//		$scope.doing_async = false;
		//		//tree.expand_all();
		//	},
		//	function (rej) {
		//		console.log(rej);
		//	}
		//);
		////$scope.my_data=treedata_avm;
		//$scope.my_tree = tree = {};
        //
		//$scope.my_tree = tree = {};
		$scope.selectTab=true;
		$scope.name1="年龄比例";
		$scope.legendpie1 = [ "35岁及以下xx:335", "36-40岁:310", '41-45岁:234', '45-50岁:135', '51-55岁:135', '56岁以上:148' ];
		$scope.datapie1 = [{value:335, name:'35岁及以下xx'},{value:310, name:'36-40岁'},{value:234, name:'41-45岁'},{value:135, name:'45-50岁'},{value:135, name:'51-55岁'},{value:148, name:'56岁以上'}];

		$scope.name2="性别比例";
		$scope.legendpie2 = [ "男", "女"];
		$scope.datapie2 = [{value:335, name:'男'},{value:310, name:'女'}];

		$scope.name3="学历比例";
		$scope.legendpie3 = [ "研究生", "大学本科", '大学专科' , '中专', '高中', '初中及以下'];
		$scope.datapie3 = [{value:335, name:'研究生'},{value:510, name:'大学本科'},{value:294, name:'大学专科'},{value:235, name:'中专'},{value:135, name:'高中'},{value:348, name:'初中及以下'}];

		$scope.name4="政治面貌比例";
		$scope.legendpie4 = [ "中共党员", "民革", '民盟', '农工党', '九三学社', '台盟' ];
		$scope.datapie4 = [{value:635, name:'中共党员'},{value:210, name:'民革'},{value:134, name:'民盟'},{value:135, name:'农工党'},{value:535, name:'九三学社'},{value:118, name:'台盟'}];
		
		
		
		
		$scope.config1={
			names:$scope.name1,
			legend:$scope.legendpie1,
			data:$scope.datapie1
		}
		
		$scope.analysisDetail=function(){
			//alert($scope.datapie1);
		}
		
		$scope.config2={
			names:$scope.name2,
			legend:$scope.legendpie2,
			data:$scope.datapie2
		}
		$scope.config3={
			names:$scope.name3,
			legend:$scope.legendpie3,
			data:$scope.datapie3
		}
		$scope.config4={
			names:$scope.name4,
			legend:$scope.legendpie4,
			data:$scope.datapie4
		}
		

		//treedata_avm = [
		//	{
		//		label: '市委班子',
		//		data:1,
		//		children: [
		//			{
		//				label: '市委',
		//				data: 11,
		//				children:[]
		//			}, {
		//				label: '市人大',
		//				data: 12
		//			}, {
		//				label: '市政协',
		//				data: 13
		//			}, {
		//				label: '市政府',
		//				data: 14,
		//				children: ['市政府市委', '市政府党委', '市政府政协']
		//			}
		//		]
		//	}, {
		//		label: '党务口',
		//		data: 2,
		//		children: [
		//			{
		//				label: '党务办公室',
		//				data: 21
		//			}, {
		//				label: '党务委员会',
		//				data: 22
		//			}
		//		]
		//	}, {
		//		label: '政务口',
		//		data:3,
		//		children: [
		//			{
		//				label: '政务办公室',
		//				data:31,
		//				children: ['政务委员会']
		//			}, {
		//				label: '政务室',
		//				data:32
		//			}, {
		//				label: '政务',
		//				data:33
		//			}
		//		]
		//	}, {
		//		label: '企事业口',
		//		data:4
		//	}, {
		//		label: '县市区',
		//		data:5,
		//		children: [
		//			{
		//				label: '福清',
		//				data:51,
		//				children: ['福清区委', '福清党委']
		//			}, {
		//				label: '长乐',
		//				data:52,
		//				children: ['长乐党委']
		//			}, {
		//				label: '闽侯',
		//				data:53
		//			}
		//		]
		//	}
		//];
		//
		//$scope.my_data = treedata_avm;



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
						trigger : 'item'
					},
					// 图例
					//legend : {
					//	orient : 'horizontal',
					//	x : 'left',
					//	data :$scope.config.legend
					//},
					calculable : true,
					// 数据内容数组
					series : [
						{
							name:$scope.config.names,
							type:'pie',
							radius : '55%',
							center: ['50%', '50%'],
							data:$scope.config.data
						}
					]
				};
				//alert($scope.config.names);
				//alert($scope.config.data[1].value);
				
				var myChart = echarts.init(document.getElementById($scope.id),'macarons');
				myChart.setOption(option);
				window.onresize = myChart.resize;
				
				//图表点击事件
				function everyClick(param,i,txt,names){   
					if(param.seriesIndex==0&&param.dataIndex==i){
						//confirm(txt)&&window.open (names,'_parent','height=100,width=400,top=0,left=0,toolbar=no,menubar=no,scrollbars=no, resizable=no,location=no, status=no');
						
						var modalchartsInstance = $modal.open({
								templateUrl: 'analysisChartsModel.html',
								controller: 'analysisChartsController',
								size: 'lg',
								resolve: {
									items: function () {
										return i;
									}
								}
							});
						
						
						modalchartsInstance.result.then(function (i) {
								
							}, function () {
								$log.info('Modal dismissed at: ' + new Date());
							});
					}
				}
				
				function eConsole(param) {
					if (typeof param.seriesIndex != 'undefined') {
						if (param.type == 'click') {
							var peiLenght= $scope.config.data.length;
							//alert(peiLenght);// 获取总共给分隔的扇形数
							for(var i=0;i<peiLenght;i++){
								everyClick(param,i,$scope.config.data[i].value,$scope.config.names[i]);
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
