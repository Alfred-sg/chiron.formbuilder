import FormItem from "./FormItem";

class Checkbox extends FormItem{
	constructor(options){
		super(options);
		this.type="checkbox";
	};
};

Checkbox.prototype._createField=function(){
	let self=this,
		opts=$.extend(true,{},self.setting),
		items=$.extend(true,{},opts.items);

	delete opts.label;
	delete opts.items;

	$.each(items,function(index,item){
		let props=$.extend(true,{},item,opts);
		props.type="checkbox";

		let text=props.text;
		delete props.text;

		let $field=$("<input/>",props),
			$fieldWrap=$("<label/>",self.scheme.checkboxWrap)
				.append($field)
				.append($("<span/>",{text:text}));
		if ( self.$fields ){
			self.$fieldWraps.push($fieldWrap);
			self.$fields.push($field);
		}else{
			self.$fieldWraps=[$fieldWrap];
			self.$fields=[$field];
		};
	});
};

export default Checkbox
