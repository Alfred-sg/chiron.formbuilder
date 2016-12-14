import FormItem from "./FormItem";
import  "../less/cascader.less";

class Input extends FormItem{
	constructor(options){
		super(options);
		this.type="cascader";
	};
};

Input.prototype._createField=function(){
	let self=this,
		props=$.extend(true,{},self.scheme.field,self.setting);

	delete props.label;
	props.readonly=true;
	props.autocomplete="off";

	this.$fieldWraps=this.$fields=[$("<input>",props).css({backgroundColor:"white"})];

	this.$fields[0].on("click",function(){
		let that=this;
		console.log(111);
		$("<div/>",{
			class:"ant-cascader-menus",
			html:"<ul><li>1</li><li>2</li></ul>"
		}).insertAfter(that);
	})
};

export default Input
