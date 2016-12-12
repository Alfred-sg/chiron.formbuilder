var InstanceMap={};

function instanceMap(key){
	if ( !arguments.length ){
		return InstanceMap;
	}else if( arguments.length==1 ){
		return FormScheme[key];
	}else{
		let key=arguments[0],
			value=arguments[1];

		InstanceMap[key]=value;
		console.log(InstanceMap)
	};
};

export default instanceMap
