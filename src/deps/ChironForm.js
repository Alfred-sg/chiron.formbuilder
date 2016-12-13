import scheme from "./FormScheme";
import {getInstance,setInstance} from "./InstanceMap";
import createClass from "./createClass.js";
import Form from "./Form.js";

let ChironForm={
	scheme:scheme,
	createClass:createClass,
	createForm:function(parent,options){
		return new Form(parent,options)
	},
	getInstance:getInstance
};

export default ChironForm
