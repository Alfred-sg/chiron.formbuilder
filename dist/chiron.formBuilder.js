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
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Form = __webpack_require__(1);

	var _Form2 = _interopRequireDefault(_Form);

	var _CreateClass = __webpack_require__(11);

	var _CreateClass2 = _interopRequireDefault(_CreateClass);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ChironFormBuilder = {
		Form: _Form2.default,
		CreateClass: _CreateClass2.default
	};

	exports.default = ChironFormBuilder;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _FormItemReconcile = __webpack_require__(2);

	var _FormItemReconcile2 = _interopRequireDefault(_FormItemReconcile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var guid = 0,
	    instanceMap = {};

	var ChironForm = function ChironForm(parent, options) {
		_classCallCheck(this, ChironForm);

		var self = this;

		this.$parent = $(parent);
		this.setting = $.extend(true, {}, options);
		this.scheme = $.extend(true, {}, ChironForm.scheme);
		this.expando = $.now();
		this.guid = "chiron-form-" + ++guid;
		this.formItems = [];

		//this.initData={};
		this.initItems = $.extend(true, [], self.setting.items);
		this.itemsChange = false;

		instanceMap[self.guid] = this;

		this._init();
	};

	;

	// 销毁实例
	ChironForm.prototype.destroy = function () {
		var self = this,
		    keys = Object.keys(this);

		this.teardown();

		delete instanceMap[self.guid];

		$.each(keys, function (_, key) {
			delete self[key];
		});
	};

	// 清空表单内容
	ChironForm.prototype.teardown = function () {
		this.$form.remove();

		delete this.$form;
		delete this.$content;
		delete this.$btns;
		this.formItems = [];
	};

	// 绘制表单及绑定事件
	ChironForm.prototype._init = function () {
		this._render();
		this._bindEvent();
	};

	// 绘制表单
	ChironForm.prototype._render = function () {
		var self = this;

		this.$form = $("<form/>", self.scheme.form).addClass("chiron-form").addClass(self.guid);

		this.$content = $("<div class='chiron-form-item-list'></div>").appendTo(self.$form);

		this._renderFormItems();

		this._renderBtns();

		this.$parent.append(self.$form);

		// 表单绘制完成，触发"formDidCreate"事件
		this.$parent.trigger("formDidCreate", this);
	};

	// 渲染表单项
	ChironForm.prototype._renderFormItems = function () {
		var self = this;

		// 绘制表单过程中，添加表单项前，触发"fieldsWillCreate"事件，用于更改所有表单项的配置
		self.$parent.trigger("fieldsWillCreate", self.setting.items);

		$.each(self.setting.items, function (index, item) {
			var type = item.type,
			    props = $.extend(true, {}, item, { scheme: self.scheme }),
			    formItem = void 0,
			    $formItem = void 0;

			delete props.type;
			delete props.scheme.form;

			// 绘制表单过程中，添加表单项前，触发"fieldWillCreate"事件，用于更改该表单项的配置
			self.$parent.trigger("fieldWillCreate", props);

			formItem = new _FormItemReconcile2.default[item.type](props);
			$formItem = formItem.init();

			self.formItems.push(formItem);
			self.$content.append($formItem);

			// 绘制表单过程中，添加表单项时，触发"fieldDidCreate"事件，用于操纵新添加的表单项
			self.$parent.trigger("fieldDidCreate", $formItem);
		});

		// 绘制表单过程中，添加表单项完成时，触发"fieldsDidCreate"事件，用于操纵所有表单项
		self.$parent.trigger("fieldsDidCreate", self.$content);
	};

	// 渲染按钮
	ChironForm.prototype._renderBtns = function () {
		var self = this;

		if (this.setting.btns) {
			this.$btns = $("<div/>", self.scheme.btnsWrap).appendTo(self.$form).addClass("chiron-form-btns");

			// 绘制表单过程中，添加按钮前，触发"btnsWillCreate"事件，用于更改按钮的配置
			self.$parent.trigger("btnsWillCreate", self.setting.btns);

			$.each(self.setting.btns, function (_, btn) {
				var type = btn.type ? btn.type : "button",
				    callback = btn.callback,
				    props = void 0,
				    $btn = void 0;

				delete btn.callback;
				props = $.extend(true, {}, self.scheme.btn, btn, { type: type });
				$btn = $("<button/>", props);

				$btn.on("click.chiron.formBuilder.btns", $.proxy(callback, self));
				self.$btns.append($btn);
			});

			this.$form.append(self.$btns);

			// 绘制表单过程中，添加按钮完成时，触发"btnsDidCreate"事件，用于操纵所有按钮
			self.$parent.trigger("btnsDidCreate", self.$btns);
		};
	};

	// 绑定事件
	ChironForm.prototype._bindEvent = function () {
		this._bindFieldChangeEvent();
	};

	// 表单项数据变动时，触发"fieldChange"事件，重绘表单或作其他操作
	ChironForm.prototype._bindFieldChangeEvent = function () {
		var self = this;

		// self.$parent.on("fieldChange",function(e,data){
		// 	if ( data.sex=="female" ){
		// 		self.setItems([{
		// 			type:"input",label:"姓名",placeholder:"请输入您的姓名",name:"name"
		// 		},{
		// 			type:"textarea",label:"居住地址",placeholder:"请输入您的居住地址",name:"address"
		// 		},{
		// 			type:"radio",name:"sex",items:[{text:"男",value:"male"},{text:"女",value:"female"}],label:"性别"
		// 		},{
		// 			type:"checkbox",name:"animal",
		//			items:[{text:"猫",value:"cat"},{text:"狗",value:"dog"},{text:"兔",value:"rabbit"}],
		//			label:"喜欢的动物"
		// 		}]);
		// 	};
		// });

		$.each(self.formItems, function (_, formItem) {
			formItem.bindFieldChangeEvent(function () {
				var data = self.getData();
				self.$parent.trigger("fieldChange", data);
			});
		});
	};

	// 重设显示表单项，可实现表单项的联动显示隐藏
	ChironForm.prototype.setItems = function (items) {
		var data = this.getData();

		this.setting.items = $.extend(true, [], items);
		this.itemsChange = true;

		this.refresh();
		this.setData(data);
	};

	// 添加表单项
	ChironForm.prototype.addItem = function (index, item) {
		var data = this.getData();

		this.setting.items.splice(index, 0, item);
		this.itemsChange = true;

		this.refresh();
		this.setData(data);
	};

	// 删除表单项
	ChironForm.prototype.delItem = function (index) {
		var data = this.getData();

		this.setting.items.splice(index, 1);
		this.itemsChange = true;

		this.refresh();
		this.setData(data);
	};

	// this.setting.items变动后，重新渲染表单
	ChironForm.prototype.refresh = function () {
		this.teardown();
		this._init();
	};

	// 获取表单数据
	ChironForm.prototype.getData = function () {
		var self = this,
		    data = {};
		$.each(self.formItems, function (_, formItem) {
			$.extend(true, data, formItem.getData());
		});

		return data;
	};

	// 设置表单数据
	ChironForm.prototype.setData = function (data, initData) {
		var self = this;
		$.each(self.formItems, function (_, formItem) {
			formItem.setData(data);
		});

		if (initData) this.initData = data;
	};

	// 重设表单项显示状况，表单数据回到this.initData
	ChironForm.prototype.reset = function () {
		var self = this;

		if (this.itemsChange) {
			this.setting.items = $.extend(true, [], self.initItems);
			this.teardown();
			this._init();
		};

		if (this.initData) this.setData(self.initData);
	};

	// 清空表单数据
	ChironForm.prototype.clean = function () {
		var self = this;
		$.each(self.formItems, function (_, formItem) {
			formItem.clean();
		});
	};

	// 表单显示框架
	ChironForm.scheme = {
		form: {
			class: "form-horizontal"
		},
		outterWrap: {
			class: "form-group"
		},
		label: {
			class: "control-label col-sm-1"
		},
		innerWrap: {
			class: "col-sm-5",
			width: 400
		},
		field: {
			class: "form-control"
		},
		// 单选框、复选框包裹元素配置
		checkboxWrap: {
			class: "control-label",
			css: { marginRight: "10px" }
		},
		btnsWrap: {
			class: "col-sm-offset-1"
		},
		btn: {
			class: "btn btn-default",
			css: { marginRight: "10px" }
		}
	};

	// 设置表单框架
	ChironForm.makeScheme = function (options) {
		ChironForm.scheme = options;
	};

	// 通过guid获取实例
	ChironForm.getInstance = function (index) {
		var guid = "chiron-form-" + index;
		return instanceMap[guid];
	};

	exports.default = ChironForm;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Input = __webpack_require__(3);

	var _Input2 = _interopRequireDefault(_Input);

	var _Textarea = __webpack_require__(7);

	var _Textarea2 = _interopRequireDefault(_Textarea);

	var _Radio = __webpack_require__(8);

	var _Radio2 = _interopRequireDefault(_Radio);

	var _Checkbox = __webpack_require__(9);

	var _Checkbox2 = _interopRequireDefault(_Checkbox);

	var _Select = __webpack_require__(10);

	var _Select2 = _interopRequireDefault(_Select);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var FormItemReconcile = {
		input: _Input2.default,
		textarea: _Textarea2.default,
		radio: _Radio2.default,
		checkbox: _Checkbox2.default,
		select: _Select2.default
	};

	exports.default = FormItemReconcile;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _FormItem2 = __webpack_require__(4);

	var _FormItem3 = _interopRequireDefault(_FormItem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Input = function (_FormItem) {
		_inherits(Input, _FormItem);

		function Input(options) {
			_classCallCheck(this, Input);

			var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, options));

			_this.type = "input";
			return _this;
		}

		return Input;
	}(_FormItem3.default);

	;

	Input.prototype._createField = function () {
		var self = this,
		    props = $.extend(true, {}, self.scheme.field, self.setting);

		delete props.label;

		this.$fieldWraps = this.$fields = [$("<input>", props)];
	};

	exports.default = Input;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _getValue = __webpack_require__(5);

	var _getValue2 = _interopRequireDefault(_getValue);

	var _setValue = __webpack_require__(6);

	var _setValue2 = _interopRequireDefault(_setValue);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var FormItem = function FormItem(options) {
		_classCallCheck(this, FormItem);

		this.scheme = $.extend(true, {}, options.scheme);
		delete options.scheme;
		this.setting = $.extend(true, {}, options);
	};

	;

	FormItem.prototype.init = function () {
		this.render();

		return this.$outerWrap;
	};

	FormItem.prototype._createOuterWrap = function () {
		var self = this;
		this.$outerWrap = $("<div/>", self.scheme.outterWrap).addClass("chiron-form-item");
	};

	FormItem.prototype._createLabel = function () {
		var self = this;
		this.$label = $("<label/>", self.scheme.label).html(self.setting.label);
	};

	FormItem.prototype._createInnerWrap = function () {
		var self = this;
		this.$innerWrap = $("<div/>", self.scheme.innerWrap);
	};

	FormItem.prototype._createField = function () {};

	FormItem.prototype.render = function () {
		var self = this;

		this._createOuterWrap();
		this._createLabel();
		this._createInnerWrap();
		this._createField();

		this.$outerWrap.append(self.$label);
		$.each(self.$fieldWraps, function (_, $fieldWrap) {
			self.$innerWrap.append($fieldWrap);
		});
		this.$outerWrap.append(self.$innerWrap);
	};

	FormItem.prototype.bindFieldChangeEvent = function (fn) {
		var self = this;

		$.each(self.$fields, function (_, $field) {
			if ($field.is(":radio") || $field.is(":checkbox")) {
				$field.on("click.chiron.formBuilder.fieldChange", fn);
			} else if ($.nodeName($field.get(0), "select")) {
				$field.on("change.chiron.formBuilder.fieldChange", fn);
			} else {
				$field.on("change.chiron.formBuilder.fieldChange", fn);
			};
		});
	};

	FormItem.prototype.getData = function () {
		var self = this,
		    data = {};

		$.each(self.$fields, function (_, $field) {
			(0, _getValue2.default)($field, data);
		});

		return data;
	};

	FormItem.prototype.setData = function (data) {
		var self = this;

		$.each(self.$fields, function (_, $field) {
			(0, _setValue2.default)($field, data);
		});
	};

	FormItem.prototype.clean = function () {
		var self = this;

		$.each(self.$fields, function (_, $field) {
			if ($field.is(":radio") || $field.is(":checkbox")) {
				$field.prop("checked", false);
			} else if ($.nodeName($field.get(0), "select")) {
				var value = $field.find("option").eq(0).val();
				$field.val(value);
			} else {
				$field.val("");
			};
		});
	};

	exports.default = FormItem;

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function getValue(elem, data) {
		var $elem = elem instanceof $ ? elem : $(elem),
		    name = $elem.attr("name"),
		    value = $elem.val();

		if ($elem.is(":radio") || $elem.is(":checkbox")) {
			if (!$elem.is(":checked")) {
				return data;
			};
		};

		if (data[name]) {
			if ($.type(data[name]) === "string") data[name] = data[name].split();
			data[name].push(value);
		} else {
			data[name] = value;
		};

		return data;
	};

	exports.default = getValue;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function setValue(elem, data) {
		var $elem = elem instanceof $ ? elem : $(elem),
		    name = $elem.attr("name"),
		    value = data[name];

		if (value === undefined) return;

		if ($elem.is(":radio") || $elem.is(":checkbox")) {
			if ($.type(value) === "string" || $.type(value) === "number") value = [value];

			var val = $elem.val();
			if (value.indexOf(val) !== -1) {
				$elem.prop("checked", true);
			} else {
				$elem.prop("checked", false);
			};

			return;
		};

		$elem.val(value);
	};

	exports.default = setValue;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _FormItem2 = __webpack_require__(4);

	var _FormItem3 = _interopRequireDefault(_FormItem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Textarea = function (_FormItem) {
		_inherits(Textarea, _FormItem);

		function Textarea(options) {
			_classCallCheck(this, Textarea);

			var _this = _possibleConstructorReturn(this, (Textarea.__proto__ || Object.getPrototypeOf(Textarea)).call(this, options));

			_this.type = "textarea";
			return _this;
		}

		return Textarea;
	}(_FormItem3.default);

	;

	Textarea.prototype._createField = function () {
		var self = this,
		    props = $.extend(true, {}, self.scheme.field, self.setting);

		delete props.label;

		this.$fieldWraps = this.$fields = [$("<textarea/>", props)];
	};

	exports.default = Textarea;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _FormItem2 = __webpack_require__(4);

	var _FormItem3 = _interopRequireDefault(_FormItem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Radio = function (_FormItem) {
		_inherits(Radio, _FormItem);

		function Radio(options) {
			_classCallCheck(this, Radio);

			var _this = _possibleConstructorReturn(this, (Radio.__proto__ || Object.getPrototypeOf(Radio)).call(this, options));

			_this.type = "radio";
			return _this;
		}

		return Radio;
	}(_FormItem3.default);

	;

	Radio.prototype._createField = function () {
		var self = this,
		    opts = $.extend(true, {}, self.setting),
		    items = $.extend(true, {}, opts.items);

		delete opts.label;
		delete opts.items;

		$.each(items, function (index, item) {
			var props = $.extend(true, {}, item, opts);
			props.type = "radio";

			var text = props.text;
			delete props.text;

			var $field = $("<input/>", props),
			    $fieldWrap = $("<label/>", self.scheme.checkboxWrap).append($field).append($("<span/>", { text: text }));

			if (self.$fields) {
				self.$fieldWraps.push($fieldWrap);
				self.$fields.push($field);
			} else {
				self.$fieldWraps = [$fieldWrap];
				self.$fields = [$field];
			};
		});
	};

	exports.default = Radio;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _FormItem2 = __webpack_require__(4);

	var _FormItem3 = _interopRequireDefault(_FormItem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Checkbox = function (_FormItem) {
		_inherits(Checkbox, _FormItem);

		function Checkbox(options) {
			_classCallCheck(this, Checkbox);

			var _this = _possibleConstructorReturn(this, (Checkbox.__proto__ || Object.getPrototypeOf(Checkbox)).call(this, options));

			_this.type = "checkbox";
			return _this;
		}

		return Checkbox;
	}(_FormItem3.default);

	;

	Checkbox.prototype._createField = function () {
		var self = this,
		    opts = $.extend(true, {}, self.setting),
		    items = $.extend(true, {}, opts.items);

		delete opts.label;
		delete opts.items;

		$.each(items, function (index, item) {
			var props = $.extend(true, {}, item, opts);
			props.type = "checkbox";

			var text = props.text;
			delete props.text;

			var $field = $("<input/>", props),
			    $fieldWrap = $("<label/>", self.scheme.checkboxWrap).append($field).append($("<span/>", { text: text }));
			if (self.$fields) {
				self.$fieldWraps.push($fieldWrap);
				self.$fields.push($field);
			} else {
				self.$fieldWraps = [$fieldWrap];
				self.$fields = [$field];
			};
		});
	};

	exports.default = Checkbox;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _FormItem2 = __webpack_require__(4);

	var _FormItem3 = _interopRequireDefault(_FormItem2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Select = function (_FormItem) {
		_inherits(Select, _FormItem);

		function Select(options) {
			_classCallCheck(this, Select);

			var _this = _possibleConstructorReturn(this, (Select.__proto__ || Object.getPrototypeOf(Select)).call(this, options));

			_this.type = "select";
			return _this;
		}

		return Select;
	}(_FormItem3.default);

	;

	Select.prototype._createField = function () {
		var self = this,
		    props = $.extend(true, {}, self.scheme.field, self.setting),
		    items = $.extend(true, {}, props.items);

		delete props.label;
		delete props.items;

		var $field = $("<select/>", props);

		$.each(items, function (index, item) {
			$field.append($("<option/>", item));
		});

		this.$fieldWraps = this.$fields = [$field];
	};

	exports.default = Select;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _FormItem2 = __webpack_require__(4);

	var _FormItem3 = _interopRequireDefault(_FormItem2);

	var _FormItemReconcile = __webpack_require__(2);

	var _FormItemReconcile2 = _interopRequireDefault(_FormItemReconcile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function CreateClass(type, methods) {
		var FormItemClass = function (_FormItem) {
			_inherits(FormItemClass, _FormItem);

			function FormItemClass(options) {
				_classCallCheck(this, FormItemClass);

				var _this = _possibleConstructorReturn(this, (FormItemClass.__proto__ || Object.getPrototypeOf(FormItemClass)).call(this, options));

				_this.type = type;
				return _this;
			}

			return FormItemClass;
		}(_FormItem3.default);

		;

		$.extend(FormItemClass.prototype, methods);
		_FormItemReconcile2.default[type] = FormItemClass;

		return FormItemClass;
	};

	exports.default = CreateClass;

/***/ }
/******/ ]);