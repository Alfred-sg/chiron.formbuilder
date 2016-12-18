import getValue from "../util/getValue";
import setValue from "../util/setValue";

class FormItem{
	constructor(options,form){
		this.scheme=$.extend(true,{},options.scheme);
		delete options.scheme;
		this.relForm=form;
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

FormItem.prototype._appendField=function(){
	let self=this;

	if ( this.setting.ajax ){
		this._remoteFiled(self.setting);
		return;
	};

	this._createField();

	$.each(self.$fieldWraps,function(_,$fieldWrap){
		self.$innerWrap.append($fieldWrap);
	});
	this.$outerWrap.append(self.$innerWrap);
};

FormItem.prototype._remoteFiled=function(setting){
	let self=this,
		ajax,
		prev=$.extend(true,{},setting);

	if ( self.ajax ){
		ajax=self.ajax;
	}else{
		ajax=self.ajax=setting.ajax;
		delete prev.ajax;
	};

	if ( !ajax.formatReq ){
		ajax.formatReq=function(data){
			return data;
		};
	};

	if ( !ajax.formatRes ){
		ajax.formatRes=function(res,prev){
			return $.extend(true,{},prev,res);
		};
	};

	if ( !ajax.callback ){
		ajax.callback=function(){};
	};

	$.post(ajax.url,ajax.data,function(res){
		let current=ajax.formatRes(res,prev);
		self.refresh(setting);
		ajax.callback.call(self);
	});
};

FormItem.prototype.render=function(){
	let self=this;

	this._createOuterWrap();
	this._createLabel();
	this._createInnerWrap();

	this.$outerWrap.append(self.$label);
	this._appendField();
};

FormItem.prototype.refresh=function(setting){
	var self=this;

	this.setting=setting;

	this.$innerWrap.html("");
	this.$fieldWraps=[];
	this.$fields=[];
	this._appendField();
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
