import FormItem from "./FormItem";

class Upload extends FormItem{
	constructor(options){
		super(options);
		this.type="Upload";
	};
};

Upload.prototype._createField=function(){
	let self=this,
		props=$.extend(true,{},self.scheme.field,self.setting),
		html=props.html,
		btnProps=$.extend(true,{},self.scheme.uploadBtn);

	delete props.label;
	delete props.html;
	props.type="file";

	if ( html!==undefined ) btnProps.html=html;

	let $uploadBtn=$("<button/>",btnProps),
		$uploadInput=$("<input/>",props).width($uploadBtn.width())
			.css({
				position:"absolute",
				left:15,
				top:0,
				opacity:0,
				filter:"alpha(opacity=0)"
			});

	this.$fields=[$uploadInput];
	this.$fieldWraps=[$uploadBtn,$uploadInput];

	this.$innerWrap.css({position:"relative"});
};

export default Upload
