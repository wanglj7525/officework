'use strict';
app.controller('analysisController',[ '$scope',
                       		function($scope) {
            $scope.selectTab=true;
            $scope.name1="年龄比例";
			$scope.legendpie1 = [ "35岁及以下xx", "36-40岁", '41-45岁', '45-50岁', '51-55岁', '56岁以上' ];
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

								//lefttree
								var  tree, treedata_avm;
								$scope.my_tree_handler = function(branch) {
									var _ref;
									$scope.output = branch.label;
									if ((_ref = branch.data) != null ? _ref.description : void 0) {
										return $scope.output += '(' + branch.data.description + ')';
									}
									console.log($scope.output);
									//TODO
								};

								treedata_avm = [
									{
										label: '市委班子',
										data:1,
										children: [
											{
												label: '市委',
												data: 11,
												children:[]
											}, {
												label: '市人大',
												data: 12
											}, {
												label: '市政协',
												data: 13
											}, {
												label: '市政府',
												data: 14,
												children: ['市政府市委', '市政府党委', '市政府政协']
											}
										]
									}, {
										label: '党务口',
										data: 2,
										children: [
											{
												label: '党务办公室',
												data: 21
											}, {
												label: '党务委员会',
												data: 22
											}
										]
									}, {
										label: '政务口',
										data:3,
										children: [
											{
												label: '政务办公室',
												data:31,
												children: ['政务委员会']
											}, {
												label: '政务室',
												data:32
											}, {
												label: '政务',
												data:33
											}
										]
									}, {
										label: '企事业口',
										data:4
									}, {
										label: '县市区',
										data:5,
										children: [
											{
												label: '福清',
												data:51,
												children: ['福清区委', '福清党委']
											}, {
												label: '长乐',
												data:52,
												children: ['长乐党委']
											}, {
												label: '闽侯',
												data:53
											}
										]
									}
								];

								$scope.my_data = treedata_avm;
								$scope.my_tree = tree = {};


							} ]);

app.directive('pies', function() {
	return {
		scope : {
			id : "@",
			config : "="
		},
		restrict : 'E',
		template: '<div style="width:400px;height:300px;"></div>',  
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
						legend : {
							orient : 'horizontal',
							x : 'left',
							data :$scope.config.legend
						},
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
				
				var myChart = echarts.init(document.getElementById($scope.id),
				'macarons');
				myChart.setOption(option);
				window.onresize = myChart.resize;
			}
			$scope.$watch('config',function(newValue,oldValue){
				newValue && newValue.legend.length>0 && newValue.data.length>0 && showpie();
			});
		}
	};
});
