import FormItem from "./FormItem";
import  "../less/cascader.less";

class Cascader extends FormItem{
	constructor(options){
		super(options);
		this.type="cascader";
	};
};

Cascader.prototype._createField=function(){
	let self=this,
		props=$.extend(true,{},self.scheme.field,self.setting);

	delete props.label;
	props.readonly=true;
	props.autocomplete="off";

	this.$fieldWraps=this.$fields=[$("<input>",props).css({backgroundColor:"white"})];

	this._bindSepcialEvent();
};

Cascader.prototype._bindSepcialEvent=function(){
	let self=this,
		$cascaderMenus=$("<div/>",{
			class:"ant-cascader-menus",
			html:"<ul class='ant-cascader-menu'><li class='ant-cascader-menu-item ant-cascader-menu-item-expand'>"+
				"1</li><li class='ant-cascader-menu-item ant-cascader-menu-item-expand'>2</li></ul>"
		});

	this.$fields[0].on("click",function(){
		let that=this;
		$cascaderMenus.insertAfter(that);
	})

};

export default Cascader
