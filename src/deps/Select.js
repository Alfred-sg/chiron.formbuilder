import FormItem from "./FormItem";

class Select extends FormItem{
	constructor(options){
		super(options);
		this.type="select";
	};
};

Select.prototype._createField=function(){
	let self=this,
		props=$.extend(true,{},self.scheme.field,self.setting),
		items=$.extend(true,{},props.items);

	delete props.label;
	delete props.items;

	let $field=$("<select/>",props);

	$.each(items,function(index,item){
		$field.append($("<option/>",item));
	});

	this.$fieldWraps=this.$fields=[$field];
};

export default Select
