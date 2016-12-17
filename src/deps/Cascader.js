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

function getItems(index){
	return [
		[{text:"1",value:"1"},{text:"2",value:"2"}],
		[{text:"3",value:"3"},{text:"4",value:"4"}]
	];
};

Cascader.prototype._bindSepcialEvent=function(){
	let self=this,
		$ulOrigin=$("<ul/>",{class:"ant-cascader-menu"}),
		$liOrigin=$("<li/>",{class:"ant-cascader-menu-item ant-cascader-menu-item-expand"}),
		$cascaderMenus=$("<div/>",{class:"ant-cascader-menus"});

	let columns=getItems(),
		$initUl=$ulOrigin.clone();

	$.each(columns,function(_,items){
		let $menu=$ulOrigin.clone();
		$.each(items,function(_,item){
			
			$menu.append($liOrigin.clone().text(item.text).attr("value",item.value));
		});
		$cascaderMenus.append($menu);
	});

	this.$fields[0].on("click",function(){
		let that=this;
		$cascaderMenus.insertAfter(that);
	});

};

export default Cascader
