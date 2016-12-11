import FormItem from "./FormItem";

class Input extends FormItem{
	constructor(options){
		super(options);
		this.type="input";
	};
};

Input.prototype._createField=function(){
	let self=this,
		props=$.extend(true,{},self.scheme.field,self.setting);

	delete props.label;

	this.$fieldWraps=this.$fields=[$("<input>",props)];
};

export default Input
