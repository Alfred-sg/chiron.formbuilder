import FormItem from "./FormItem";
import FormItemReconcile from "./FormItemReconcile";

function createClass(type,methods){
	class FormItemClass extends FormItem{
		constructor(options){
			super(options);
			this.type=type;
		};
	};

	$.extend(FormItemClass.prototype,methods);
	FormItemReconcile[type]=FormItemClass;

	return FormItemClass;
};

export default createClass
