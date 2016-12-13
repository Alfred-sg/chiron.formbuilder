/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	$("#formWrap").chironformbuilder({
		items: [{
			type: "input", label: "姓名", placeholder: "请输入您的姓名", name: "name"
		}, {
			type: "textarea", label: "居住地址", placeholder: "请输入您的居住地址", name: "address"
		}, {
			type: "radio", name: "sex", items: [{ text: "男", value: "male" }, { text: "女", value: "female" }], label: "性别"
		}, {
			type: "checkbox", name: "animal",
			items: [{ text: "猫", value: "cat" }, { text: "狗", value: "dog" }, { text: "兔", value: "rabbit" }],
			label: "喜欢的动物"
		}, {
			type: "select", name: "season",
			items: [{ text: "春季", value: "spring" }, { text: "夏季", value: "summer" }, {
				text: "秋季", value: "autumn" }, { text: "冬季", value: "winter" }],
			label: "最爱的季节"
		}, {
			type: "upload", name: "file", label: "上传文件"
		}],
		btns: [{
			text: "提交",
			callback: function callback() {
				console.log(this);
			}
		}]
	});

	$("#formWrap").chironformbuilder().setData({
		name: "nacy",
		address: "ad street",
		sex: "female",
		animal: "dog",
		season: "summer"
	}, true);

/***/ }
/******/ ]);