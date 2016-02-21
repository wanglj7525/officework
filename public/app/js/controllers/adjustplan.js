'use strict';
app.controller('planCtrl',[ '$scope', '$http', '$state','$timeout',
	function($scope, $http, $state, $timeout) {
		$scope.plan=[
			{title:"方案一 调整说明",reason:"根据XXX文件要求，领导班子应配X名女干部，XX单位未按要求配备；",
			 planlist:[ 
				{ id:1, name:'张三1' ,sex:"男",birthday:"196511",company:"福清市xxx",newcompany:"xxx"},
				{ id:1, name:'张三2' ,sex:"男",birthday:"196511",company:"福清市xxx",newcompany:"xxx"},
				{ id:1, name:'张三3' ,sex:"男",birthday:"196511",company:"福清市xxx",newcompany:"xxx"},
				{ id:1, name:'张三4' ,sex:"男",birthday:"196511",company:"福清市xxx",newcompany:"xxx"}
				]
			},
			{title:"方案二 调整说明",reason:"2根据XXX文件要求，领导班子应配X名女干部，XX单位未按要求配备；",
			 planlist:[ 
				{ id:1, name:'张三5' ,sex:"男",birthday:"196511",company:"福清市xxx",newcompany:"xxx"},
				{ id:1, name:'张三6' ,sex:"男",birthday:"196511",company:"福清市xxx",newcompany:"xxx"},
				{ id:1, name:'张三7' ,sex:"男",birthday:"196511",company:"福清市xxx",newcompany:"xxx"},
				{ id:1, name:'张三8' ,sex:"男",birthday:"196511",company:"福清市xxx",newcompany:"xxx"}
				]
			}
		];


	} 
]);

