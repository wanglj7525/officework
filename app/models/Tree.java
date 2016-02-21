package models;

import play.db.jpa.GenericModel;

public class Tree {
	public Integer id;
	public String t_name;
	//0为一级
	public Integer t_preid;
	public String t_description;
	public Integer t_isdelete;
}
