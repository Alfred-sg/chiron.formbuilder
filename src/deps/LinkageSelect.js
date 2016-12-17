import FormItem from "./FormItem";

class linkageSelect extends FormItem{
	constructor(options){
		super(options);
		this.type="cascader";
	};
};

linkageSelect.prototype._createField=function(){
	let self=this,
		props=$.extend(true,{},self.scheme.field,self.setting);
		console.log(self.setting)

	delete props.label;

	$.each(props.items,function(_,selectOpts){
		let $field,props,
			items=selectOpts.options;

		delete selectOpts.options;

		props=$.extend(true,{},self.scheme.field,selectOpts);
		$field=$("<select/>",props).addClass("pull-left").css({marginRight:"10px",marginBottom:"10px",width:"150px"});

		$.each(items,function(_,item){
			$field.append($("<option/>",item));
		});

		$field.on("change",function(){
			self.refresh({
				label:"级联下拉框",
				items:[
					{name:"linkageSelect1",options:[{text:"11111",value:"1"},{text:"2",value:"2"}]},
					{name:"linkageSelect2",options:[{text:"3",value:"3"},{text:"4",value:"4"}]}
				]
			});
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
