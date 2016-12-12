// 表单样式框架
let FormScheme={
		form:{
			class:"form-horizontal"
		},
		outterWrap:{
			class:"form-group"
		},
		label:{
			class:"control-label col-sm-1"
		},
		innerWrap:{
			class:"col-sm-5",
			width:400
		},
		field:{
			class:"form-control"
		},
		// 单选框、复选框包裹元素配置
		checkboxWrap:{
			class:"control-label",
			css:{marginRight:"10px"}
		},
		// 文件上传按钮配置
		uploadBtn:{
			type:"button",
			class:"btn btn-default",
			html:"<i class='glyphicon glyphicon-open'></i>",
			width:40
		},
		btnsWrap:{
			class:"col-sm-offset-1"
		},
		btn:{
			class:"btn btn-default",
			css:{marginRight:"10px"}
		}
	};

function scheme(opts){
	if ( !arguments.length ){
		return FormScheme;
	}else if( arguments.length==1 ){
		FormScheme=opts;

		return FormScheme;
	}else{
		let key=arguments[0],
			value=arguments[1];

		FormScheme[key]=value;

		return FormScheme;
	};
};

export default scheme
