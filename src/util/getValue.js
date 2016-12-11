function getValue(elem,data){
	let $elem=elem instanceof $ ? elem : $(elem),
		name=$elem.attr("name"),
		value=$elem.val();
	
	if ( $elem.is(":radio") || $elem.is(":checkbox") ){
		if ( !$elem.is(":checked") ){
			return data
		};
	};

	if ( data[name] ){
		if ( $.type(data[name])==="string" ) data[name]=data[name].split();
		data[name].push(value);
	}else{
		data[name]=value;
	};
	
	return data;
};

export default getValue
