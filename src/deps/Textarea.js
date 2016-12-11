import FormItem from "./FormItem";

class Textarea extends FormItem{
	constructor(options){
		super(options);
		this.type="textarea";
	};
};

Textarea.prototype._createField=function(){
	let self=this,
		props=$.extend(true,{},self.scheme.field,self.setting);

	delete props.label;

	this.$fieldWraps=this.$fields=[$("<textarea/>",props)];
};

export default Textarea
