import Form from "./deps/Form.js";
import createClass from "./deps/createClass.js";

window.form=new Form("#formWrap",{
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
	}],
	btns:[{
		text:"提交",
		callback:function(){
			console.log(this);
		}
	}]
});

form.setData({
	name:"nacy",
	address:"ad street",
	sex:"female",
	animal:"dog",
	season:"summer"
},true)