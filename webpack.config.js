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
            { test:/\.less$/, loader:ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader!less-loader"}) 
            },
            { test:/\.css$/, loader:ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: "css-loader"})
            }
        ]
    },
    resolve:{
    	  extensions:["",".coffee",".js"]
    }
};