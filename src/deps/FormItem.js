import getValue from "../util/getValue";
import setValue from "../util/setValue";

class FormItem{
	constructor(options){
		this.scheme=$.extend(true,{},options.scheme);
		delete options.scheme;
		this.setting=$.extend(true,{},options);
	};
};

FormItem.prototype.init=function(){
	this.render();

	return this.$outerWrap;
};

FormItem.prototype._createOuterWrap=function(){
	var self=this;
	this.$outerWrap=$("<div/>",self.scheme.outterWrap).addClass("chiron-form-item");
};

FormItem.prototype._createLabel=function(){
	var self=this;
	this.$label=$("<label/>",self.scheme.label).html(self.setting.label);
};

FormItem.prototype._createInnerWrap=function(){
	var self=this;
	this.$innerWrap=$("<div/>",self.scheme.innerWrap);
};

FormItem.prototype._createField=function(){};

FormItem.prototype.render=function(){
	let self=this;

	this._createOuterWrap();
	this._createLabel();
	this._createInnerWrap();
	this._createField();

	this.$outerWrap.append(self.$label);
	$.each(self.$fieldWraps,function(_,$fieldWrap){
		self.$innerWrap.append($fieldWrap);
	});
	this.$outerWrap.append(self.$innerWrap);
};

FormItem.prototype.bindFieldChangeEvent=function(fn){
	let self=this;

	$.each(self.$fields,function(_,$field){
		if ( $field.is(":radio") || $field.is(":checkbox") ){
			$field.on("click.chiron.formBuilder.fieldChange",fn);
		}else if( $.nodeName($field.get(0),"select") ){
			$field.on("change.chiron.formBuilder.fieldChange",fn);
		}else{
			$field.on("change.chiron.formBuilder.fieldChange",fn);
		};
	});
};

FormItem.prototype.getData=function(){
	let self=this,
		data={};

	$.each(self.$fields,function(_,$field){
		getValue($field,data);
	});

	return data;
};

FormItem.prototype.setData=function(data){
	let self=this;

	$.each(self.$fields,function(_,$field){
		setValue($field,data);
	});
};

FormItem.prototype.clean=function(){
	let self=this;

	$.each(self.$fields,function(_,$field){
		if ( $field.is(":radio") || $field.is(":checkbox") ){
			$field.prop("checked",false);
		}else if( $.nodeName($field.get(0),"select") ){
			let value=$field.find("option").eq(0).val();
			$field.val(value);
		}else{
			$field.val("");
		};
	});
};

export default FormItem
