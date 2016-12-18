import FormItem from "./FormItem";
import getValue from "../util/getValue";

class linkageSelect extends FormItem{
	constructor(options){
		super(options);
		this.type="cascader";
	};
};

linkageSelect.prototype._createField=function(){
	let self=this,
		props=$.extend(true,{},self.scheme.field,self.setting);

	delete props.label;

	$.each(props.items,function(index,selectOpts){
		let $field,props,
			items=selectOpts.options;

		delete selectOpts.options;

		props=$.extend(true,{},self.scheme.field,selectOpts);
		$field=$("<select/>",props).addClass("pull-left").css({marginRight:"10px",marginBottom:"10px",width:"150px"});

		$.each(items,function(_,item){
			$field.append($("<option/>",item));
		});

		$field.on("change",function(){
			if ( !self.ajax ) return;

			let $relFields=self.$fields.slice(0,index+1),
				prevData={};

			$.each($relFields,function(_,$f){
				getValue($f,prevData);
			});

			self.setting.items.slice(0,index);
			self.ajax.data={value:$(this).val()};
			self.ajax.callback=function(){
				self.setData(prevData);
			};
			self._remoteField(self.setting);

			// self.refresh({
			// 	label:"级联下拉框",
			// 	items:[
			// 		{name:"linkageSelect1",options:[{text:"11111",value:"1"},{text:"2",value:"2"}]},
			// 		{name:"linkageSelect2",options:[{text:"3",value:"3"},{text:"4",value:"4"}]}
			// 	]
			// });
		});

		if ( self.$fields ){
			self.$fields.push($field);
		}else{
			self.$fields=[$field];
		};
	});

	this.$fieldWraps=this.$fields;
};

export default linkageSelect
