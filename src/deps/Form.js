import scheme from "./FormScheme";
import {setInstance} from "./InstanceMap";
import FormItemReconcile from "./FormItemReconcile";

let guid=0;

class ChironForm{
	constructor(parent,options){
		let self=this;

		this.$parent=$(parent);
		this.setting=$.extend(true,{},options);
		this.scheme=$.extend(true,{},scheme());
		this.expando=$.now();
		this.guid="chiron-form-"+(++guid);
		this.formItems=[];

		//this.initData={};
		this.initItems=$.extend(true,[],self.setting.items);
		this.itemsChange=false;

		setInstance(self.guid,self);

		this._init();
	};
};

// 销毁实例
ChironForm.prototype.destroy=function(){
	let self=this,
		keys=Object.keys(this);

	this.teardown();

	setInstance(self.guid);

	$.each(keys,function(_,key){
		delete self[key];
	});
};

// 清空表单内容
ChironForm.prototype.teardown=function(){
	this.$form.remove();

	delete this.$form;
	delete this.$content;
	delete this.$btns;
	this.formItems=[];
};

// 绘制表单及绑定事件
ChironForm.prototype._init=function(){
	this._render();
	this._bindEvent();
};

// 绘制表单
ChironForm.prototype._render=function(){
	let self=this;

	this.$form=$("<form/>",self.scheme.form)
		.addClass("chiron-form")
		.addClass(self.guid);

	this.$content=$("<div class='chiron-form-item-list'></div>")
		.appendTo(self.$form);

	this._renderFormItems();

	this._renderBtns();

	this.$parent.append(self.$form);

	// 表单绘制完成，触发"formDidCreate"事件
	this.$parent.trigger("formDidCreate",this);
};

// 渲染表单项
ChironForm.prototype._renderFormItems=function(){
	let self=this;

	// 绘制表单过程中，添加表单项前，触发"fieldsWillCreate"事件，用于更改所有表单项的配置
	self.$parent.trigger("fieldsWillCreate",self.setting.items);

	$.each(self.setting.items,function(index,item){
		let type=item.type,
			props=$.extend(true,{},item,{scheme:self.scheme}),
			formItem,$formItem;

		delete props.type;
		delete props.scheme.form;

		// 绘制表单过程中，添加表单项前，触发"fieldWillCreate"事件，用于更改该表单项的配置
		self.$parent.trigger("fieldWillCreate",props,index,self);

		formItem=new FormItemReconcile[item.type](props);
		formItem.index=index;
		$formItem=formItem.init();

		self.formItems.push(formItem);
		self.$content.append($formItem);

		// 绘制表单过程中，添加表单项时，触发"fieldDidCreate"事件，用于操纵新添加的表单项
		self.$parent.trigger("fieldDidCreate",formItem,index,self);
	});

	// 绘制表单过程中，添加表单项完成时，触发"fieldsDidCreate"事件，用于操纵所有表单项
	self.$parent.trigger("fieldsDidCreate",self.$content);
};

// 渲染按钮
ChironForm.prototype._renderBtns=function(){
	let self=this;

	if ( this.setting.btns ){
		this.$btns=$("<div/>",self.scheme.btnsWrap)
			.appendTo(self.$form)
			.addClass("chiron-form-btns");

		// 绘制表单过程中，添加按钮前，触发"btnsWillCreate"事件，用于更改按钮的配置
		self.$parent.trigger("btnsWillCreate",self.setting.btns);

		$.each(self.setting.btns,function(_,btn){
			let type=btn.type ? btn.type : "button",
				callback=btn.callback,
				props,$btn;

			delete btn.callback;
			props=$.extend(true,{},self.scheme.btn,btn,{type:type});
			$btn=$("<button/>",props);

			$btn.on("click.chiron.formBuilder.btns",$.proxy(callback,self));
			self.$btns.append($btn);
		});

		this.$form.append(self.$btns);

		// 绘制表单过程中，添加按钮完成时，触发"btnsDidCreate"事件，用于操纵所有按钮
		self.$parent.trigger("btnsDidCreate",self.$btns);
	};
};

// 绑定事件
ChironForm.prototype._bindEvent=function(){
	this._bindFieldChangeEvent();
};

// 表单项数据变动时，触发"fieldChange"事件，重绘表单或作其他操作
ChironForm.prototype._bindFieldChangeEvent=function(){
	let self=this;
			
	// self.$parent.on("fieldChange",function(e,data){
	// 	if ( data.sex=="female" ){
	// 		self.setItems([{
	// 			type:"input",label:"姓名",placeholder:"请输入您的姓名",name:"name"
	// 		},{
	// 			type:"textarea",label:"居住地址",placeholder:"请输入您的居住地址",name:"address"
	// 		},{
	// 			type:"radio",name:"sex",items:[{text:"男",value:"male"},{text:"女",value:"female"}],label:"性别"
	// 		},{
	// 			type:"checkbox",name:"animal",
	//			items:[{text:"猫",value:"cat"},{text:"狗",value:"dog"},{text:"兔",value:"rabbit"}],
	//			label:"喜欢的动物"
	// 		}]);
	// 	};
	// });

	$.each(self.formItems,function(_,formItem){
		formItem.bindFieldChangeEvent(function(){
			let data=self.getData();
			self.$parent.trigger("fieldChange",data);
		});
	});
};

// 重设显示表单项，可实现表单项的联动显示隐藏
ChironForm.prototype.setItems=function(items){
	let data=this.getData();

	this.setting.items=$.extend(true,[],items);
	this.itemsChange=true;

	this.refresh();
	this.setData(data);
};

// 添加表单项
ChironForm.prototype.addItem=function(index,item){
	let data=this.getData();

	this.setting.items.splice(index,0,item);
	this.itemsChange=true;

	this.refresh();
	this.setData(data);
};

// 删除表单项
ChironForm.prototype.delItem=function(index){
	let data=this.getData();

	this.setting.items.splice(index,1);
	this.itemsChange=true;

	this.refresh();
	this.setData(data);
};

// this.setting.items变动后，重新渲染表单
ChironForm.prototype.refresh=function(){
	this.teardown();
	this._init();
};

// 获取表单数据
ChironForm.prototype.getData=function(){
	let self=this,
		data={};
	$.each(self.formItems,function(_,formItem){
		$.extend(true,data,formItem.getData());
	});

	return data;
};

// 设置表单数据
ChironForm.prototype.setData=function(data,initData){
	let self=this;
	$.each(self.formItems,function(_,formItem){
		formItem.setData(data);
	});

	if ( initData ) this.initData=data;
};

// 重设表单项显示状况，表单数据回到this.initData
ChironForm.prototype.reset=function(){
	let self=this;
	
	if ( this.itemsChange ){
		this.setting.items=$.extend(true,[],self.initItems);
		this.teardown();
		this._init();
	};

	if ( this.initData ) this.setData(self.initData);
};

// 清空表单数据
ChironForm.prototype.clean=function(){
	let self=this;
	$.each(self.formItems,function(_,formItem){
		formItem.clean();
	});
};

export default ChironForm