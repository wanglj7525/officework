package controllers;

import java.util.ArrayList;
import java.util.List;

import models.ResultInfo;
import models.Tree;
import play.mvc.Controller;

public class Application extends Controller {

    public static void index() {
//        render();
    	renderTemplate("/public/app/index.html");
    }

    public static void getTree(){
    	ResultInfo result=new ResultInfo();
    	
    	List<Tree> arraylist=new ArrayList<Tree>();
    	Tree tree=new Tree();
//    	JSONArray json=new JSONArray();
//    	JSONObject j=new JSONObject();
    	for (int i = 1; i <= 5; i++) {
    		tree=new Tree();
    		tree.id=i;
    		tree.t_name="一级机构"+i;
    		tree.t_preid=0;
    		tree.t_isdelete=0;
    		tree.t_description="111";
    		arraylist.add(tree);
//    		j=new JSONObject();
//        	j.put("label", "一级机构"+i);
//        	j.put("data", i);
//        	j.put("children", "[]");
//        	json.add(j);
		}
    	
//    	{
//            label: '市委班子',
//            data:1,
//            children: [
//              {
//                label: '市委',
//                data: 11,
//                children:[]
//              }, {
//                label: '市人大',
//                data: 12
//              }, {
//                label: '市政协',
//                data: 13
//              }, {
//                label: '市政府',
//                data: 14,
//                children: ['141', '142', '143']
//              }
//            ]
//          }
		renderJSON(result.success(arraylist));
    }
    
    public static void getpie(){
    	
    }
}