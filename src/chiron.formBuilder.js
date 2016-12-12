import ChironForm from "./deps/ChironForm";

$.ChironForm=ChironForm;

$.prototype.chironformbuilder=function(options){
	let self=this,
		data=$(self).data("chiron-form");

	if ( !arguments.length && data ){
		return $(self).data("chiron-form");
	};

	if ( !data && $.type(options)==="object" ){
		let form=ChironForm.createForm(self,options);
		$(this).data("chiron-form",form);
		return this;
	};
};
