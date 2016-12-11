function setValue(elem,data){
	let $elem=elem instanceof $ ? elem : $(elem),
		name=$elem.attr("name"),
		value=data[name];

	if ( value===undefined ) return;
	
	if ( $elem.is(":radio") || $elem.is(":checkbox") ){
		if ( $.type(value)==="string" || $.type(value)==="number" ) value=[value];

		let val=$elem.val();
		if ( value.indexOf(val)!==-1 ){
			$elem.prop("checked",true);
		}else{
			$elem.prop("checked",false);
		};

		return;
	};

	$elem.val(value);
};

export default setValue
