let InstanceMap={};

function setInstance(key,inst){
	if( arguments.length==1 ){
		delete InstanceMap[key];
	}else{
		let key=arguments[0],
			value=arguments[1];

		InstanceMap[key]=value;
	};
};

function getInstance(key){
	let guid="chiron-form-"+key;

	if( !arguments.length ){
		console.log(123)
		return InstanceMap;
	};

	if( InstanceMap[guid] ){
		return InstanceMap[guid];
	};
};

export {setInstance as setInstance}
export {getInstance as getInstance}
