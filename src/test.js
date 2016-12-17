$("#formWrap").on("fieldDidCreate",function(e,formItem,index){
	if ( index!==7 ) return;
	console.log(formItem)

	formItem.$fields[1].on("change",function(){
		formItem.refresh({
			label:"级联下拉框",
			items:[
				{name:"linkageSelect1",options:[{text:"11111",value:"1"},{text:"2",value:"2"}]},
				{name:"linkageSelect2",options:[{text:"3",value:"3"},{text:"4",value:"4"}]}
			]
		});
	});
});

$("#formWrap").chironformbuilder({
	items:[{
		type:"input",label:"姓名",placeholder:"请输入您的姓名",name:"name"
	},{
		type:"textarea",label:"居住地址",placeholder:"请输入您的居住地址",name:"address"
	},{
		type:"radio",name:"sex",items:[{text:"男",value:"male"},{text:"女",value:"female"}],label:"性别"
	},{
		type:"checkbox",name:"animal",
		items:[{text:"猫",value:"cat"},{text:"狗",value:"dog"},{text:"兔",value:"rabbit"}],
		label:"喜欢的动物"
	},{
		type:"select",name:"season",
		items:[{text:"春季",value:"spring"},{text:"夏季",value:"summer"},{
				text:"秋季",value:"autumn"},{text:"冬季",value:"winter"}],
		label:"最爱的季节"
	},{
		type:"upload",name:"file",label:"上传文件"
	},{
		type:"cascader",label:"级联",name:"cascader",label:"请选择级联数据"
	},{
		type:"linkageSelect",label:"级联下拉框",
		items:[
			{name:"linkageSelect1",options:[{text:"1",value:"1"},{text:"2",value:"2"}]},
			{name:"linkageSelect2",options:[{text:"3",value:"3"},{text:"4",value:"4"}]}
		]
	}],
	btns:[{
		text:"提交",
		callback:function(){
			console.log(this);
		}
	}]
});

$("#formWrap").chironformbuilder().setData({
	name:"nacy",
	address:"ad street",
	sex:"female",
	animal:"dog",
	season:"summer"
},true)