'use strict';
app.controller('analysisController',[ '$scope',
                       		function($scope) {

        //searchservice.getData().then(
		//	  function (res) {
		//	  	console.log("analysisController");
		//	    $scope.searchlist = res.data.info;
		//	  },
		//	  function (rej) {
		//	  	console.log(rej);
		//	  }
		//);


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
			// //选择条件
			// $scope.selectshow=[{name: '正厅级',isSelected:true,show:1},
			//                  {name: '副厅级',isSelected:false,show:1},
			//                  {name: '正处级',isSelected:false,show:1},
			//                  {name: '副处级',isSelected:false,show:1},
			//                  {name: '副科级',isSelected:false,show:1},
			//                  {name: '科员及以下',isSelected:false,show:1},
			//                  {name:'男',isSelected:false,show:2},
			//                  {name:'女',isSelected:true,show:2},
			//                  {name:'中共党员',isSelected:true,show:3},
			//                  {name:'预备党员',isSelected:true,show:3},
			//                  {name:'共青团员',isSelected:true,show:3},
			//                  {name:'民革',isSelected:true,show:3},
			//                  {name:'民盟',isSelected:true,show:3},
			//                  {name:'民建',isSelected:true,show:3},
			//                  {name:'农工党',isSelected:true,show:3},
			//                  {name:'致公党',isSelected:true,show:3},
			//                  {name:'九三学社',isSelected:true,show:3},
			//                  {name:'台盟',isSelected:true,show:3},
			//                  {name:'无党派',isSelected:true,show:3},
			//                  {name:'群众',isSelected:true,show:3},
			//                  {name:'博士',isSelected:true,show:4},
			//                  {name:'硕士',isSelected:true,show:4},
			//                  {name:'大学本科',isSelected:true,show:4},
			//                  {name:'大专',isSelected:true,show:4},
			//                  {name:'中专',isSelected:true,show:4},
			//                  {name:'高中',isSelected:true,show:4},
			//                  {name:'初中及以下',isSelected:true,show:4},
			//                  {name:'30岁及以下',isSelected:true,show:5},
			//                  {name:'31-35岁',isSelected:true,show:5},
			//                  {name:'36-40岁',isSelected:true,show:5},
			//                  {name:'41-45岁',isSelected:true,show:5},
			//                  {name:'45-50岁',isSelected:true,show:5},
			//                  {name:'51-55岁',isSelected:true,show:5},
			//                  {name:'56-58岁',isSelected:true,show:5},
			//                  {name:'59岁',isSelected:true,show:5},
			//                  {name:'60岁以上',isSelected:true,show:5}
			//                  ];
			// 	  $scope.getShowPosition = function() {
			// 	    return Object.keys($scope.selectshow)
			// 	      .filter(function(pos) { return $scope.showPosition[pos]; })
			// 	      .join(' ');
			// 	  };
				  
				  // $scope.zhiweiCollection = [
				  //                              {age: '35岁以下', division: 1, section: 20},
				  //                              {age: '36-45岁', division: 2, section: 25},
				  //                              {age: '46-50岁', division: 3, section: 19},
				  //                              {age: '51-55岁', division: 4, section: 10},
				  //                              {age: '56-59岁', division: 5, section: 5},
				  //                              {age: '60岁以上', division: 2, section: 1}
				  //                          ];
				  // $scope.xueliCollection = [
				  //                            {education: '研究生', num: 5},
				  //                            {education: '大学本科', num: 20},
				  //                            {education: '大学专科', num: 15},
				  //                            {education: '中专', num: 2},
				  //                            {education: '高中', num: 1},
				  //                            {education: '初中及以下', num: 1}
				  //                            ];
				  // $scope.shujuCollection = [
				  //                           {name: '总数', sum:901,female:101,party:876,university:878,secondary:364,school:123,age:45},
				  //                           {name: '省部级', sum:901,female:101,party:876,university:878,secondary:364,school:123,age:45},
				  //                           {name: '厅局级', sum:901,female:101,party:876,university:878,secondary:364,school:123,age:45},
				  //                           {name: '县处级', sum:901,female:101,party:876,university:878,secondary:364,school:123,age:45},
				  //                           {name: '科级', sum:901,female:101,party:876,university:878,secondary:364,school:123,age:45},
				  //                           {name: '其他', sum:901,female:101,party:876,university:878,secondary:364,school:123,age:45}
				  //                           ];
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
