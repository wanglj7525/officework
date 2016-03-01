angular.module('app')
	.factory('Auth',['$http','$localStorage',function($http,$localStorage){
		return {
			username: '', //当前登录的用户名
			userrole: '', //当前登录的角色名
			userid:0,//当前登录的用户id
			//roleid: $localStorage.user? $localStorage.user.role_id:0,//当前登录的角色id
			roleid:function(){
				return $localStorage.user.role_id;
			},//当前登录的角色id
			roles: function () {
				console.log("获取角色列表");
				//return $http.get('/rest/role')
			},
			user: function (id) {
				console.log("获取当前用户");
				//return $http.get('/rest/user/' + id);
			},
			userRole: function (id,rid) {
				console.log("获取当前用户橘色");
				//return $http.get('/rest/user/' + id  + '/' + rid);
			},
			role: function (id) {
				//return $http.get('/rest/role/' + id);
			},
			roleUsers: function (id) {
				//return $http.get('/rest/role/' + id + '/users');
			},
			changePassword: function (originPassword, newPassword){
				//return $http.post('/rest/password', {
				//	originPassword: originPassword,
				//	newPassword: newPassword
				//});
			}
		};
	}])
	.factory('User', function($http) {
		return {
			addUser:function(data) {
				return $http({
					method:"post",
					url:"/rest/adduser",
					params:data
				});
			},
			getUser:function(uid) {
				return $http({
					method:"get",
					url:"/rest/person",
					params:{uid:uid}
				});
			},
			deleteUser:function(uid) {
				return $http({
					method:"post",
					url:"/rest/deleteuser",
					params:{uid:uid}
				});
			},
			resetPassword:function(uid){
				return $http({
					method:"put",
					url:"/rest/resetpassword",
					params:{uid:uid}
				});
			}
		};
	})
	.service('quicksearch',['$q','$http',function($q,$http){
		var data={};
		return{
			getData:function(id){
				var deferred=$q.defer();
				var path='/public/app/api/search';
				if (id) {
					path+='';
				};
				var promise=$http.get(path).then(function(response){
					return response;
				},function(response){
					return response;
				});
				return promise;
			}
		}
	}] )
	.service('worktipservice', ['$q','$http', function($q,$http){
		var data={};
		return{
			getData:function(id){
				var deferred=$q.defer();
				var path='/public/app/api/worktip';
				if (id) {
					path+='';
				};
				var promise=$http.get(path).then(function(response){
					return response;
				},function(response){
					return response;
				});
				return promise;
			}
		}
	}] )
	.service('worktipservice2', ['$q','$http', function($q,$http){
		var data={};
		return{
			getData:function(id){
				var deferred=$q.defer();
				var path='/public/app/api/worktip2';
				if (id) {
					path+='';
				};
				var promise=$http.get(path).then(function(response){
					return response;
				},function(response){
					return response;
				});
				return promise;
			}
		}

	}])
	.service('worktiplistservice', ['$q','$http', function($q,$http){
		var data={};
		return{
			getData:function(id){
				var deferred=$q.defer();
				var path='/public/app/api/worktiplist';
				if (id) {
					path+='';
				};
				var promise=$http.get(path).then(function(response){
					return response;
				},function(response){
					return response;
				});
				return promise;
			}
		}
	}])
	.service('worktiplistservice2', ['$q','$http', function($q,$http){
		var data={};
		return{
			getData:function(id){
				var deferred=$q.defer();
				var path='/public/app/api/worktiplist2';
				if (id) {
					path+='';
				};
				var promise=$http.get(path).then(function(response){
					return response;
				},function(response){
					return response;
				});
				return promise;
			}
		}
	}])
	.service('messageservice', ['$q','$http', function($q,$http){
		var data={};
		return{
			getData:function(id){
				var deferred=$q.defer();
				var path='/public/app/api/message';
				if (id) {
					path+='';
				};
				var promise=$http.get(path).then(function(response){
					return response;
				},function(response){
					return response;
				});
				return promise;
			}
		}

	}]).service('searchservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/searchlist';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}

}]).service('planlistservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/planlist';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}

}]).service('plandetailservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/plandetail';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}

}]).service('adjustlistservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/adjustlist';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}

}]).service('adjustdetailservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			//var path='/public/app/api/adjustdetail';
			var path='/public/app/api/adjustd2';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}
}]).service('searchguservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/searchgu';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}
}]).service('deploydanweiservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/deploydanwei';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}
}]).service('treeservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/tree';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				console.log(response);
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}
}]).service('userservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/userlist';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				console.log(response);
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}
}]).service('daimaservice', ['$q','$http', function($q,$http){
	var data={};
	return{
		getData:function(id){
			var deferred=$q.defer();
			var path='/public/app/api/daimalist';
			if (id) {
				path+='';
			};
			var promise=$http.get(path).then(function(response){
				console.log(response);
				return response;
			},function(response){
				return response;
			});
			return promise;
		}
	}
}]);