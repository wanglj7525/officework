package controllers;

import models.ResultInfo;
import models.User;
import play.mvc.Controller;

public class Login extends Controller{
	
	public static void login(String email,String password){
		ResultInfo result=new ResultInfo();
		User user=new User();
		user.id=1;
		user.u_name=email;
		user.u_pass=password;
		user.role_id=1;
//	    List<Map> user=SqlModel.login(username, Crypto.passwordHash(password));
	    if (email!=null) {
	    	
		}else{
			renderJSON(result.error("用户名或密码错误"));
		}
		String access_token="1234567890";
		renderJSON(result.success(user,access_token));
	}

}
