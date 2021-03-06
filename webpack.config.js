var webpack=require("webpack");
var ExtractTextPlugin=require("extract-text-webpack-plugin"); // 分离css
var path=require("path");
var fs=require("fs");

function getEntry(){
	var jsPath="./src/";
	var dirs=fs.readdirSync(jsPath);
	var matchs=[], files={};
  	dirs.forEach(function (item){
	    matchs=item.match(/(.+)\.jsx?$/);
	    if (matchs){
	      	files[matchs[1]]=path.resolve(jsPath,item);
	    }
  	});
  	return files;
};

module.exports = {  
    // 入口文件位置  
    entry:getEntry(),  
    // 输出文件位置
    output:{
        path:"./dist/",
        publicPath:"./dist/",
        filename:"[name].js"
    },  
    module:{
    	  // require加载时编译
        loaders:[  
            { test:/\.js$/, exclude:/node_modules/, loaders: ['babel'] },
            { test:/\.jsx$/, exclude:/node_modules/, loaders: ['babel'] },
            { test:/\.less$/, exclude:/node_modules/, 
              loader:ExtractTextPlugin.extract("style-loader", "css-loader", "less-loader") 
            },
            { test:/\.css$/, exclude:/node_modules/, loader:ExtractTextPlugin.extract("style-loader", "css-loader") 
                // loaders:['style','css'] 
            }
        ]
    },
    resolve:{
        // 不需要填写扩展名
    	extensions:["",".coffee",".js"]
    },
    plugins:[
        // 分离css
        new ExtractTextPlugin("[name].css")
    ]
};