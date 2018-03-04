/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 244);
/******/ })
/************************************************************************/
/******/ ({

/***/ 1:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 2:
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ 244:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(245);


/***/ }),

/***/ 245:
/***/ (function(module, exports, __webpack_require__) {

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// *****************************
// ***** Private Variables *****
// *****************************
/**
 * Save this instance
 * @type @this;
 * @private
 */
var self = this;

/**
 * If Module has been initiated
 * @type Boolean
 * @private
 */
var _isInit = false; // to avoid 'rebinds'

// To Top Component instance
__webpack_require__(246);

/**
 * Categories Component instance
 */
var categoriesComponent = __webpack_require__(252);

/**
 * Projects Component instance
 */
var projectsComponent = __webpack_require__(258);

/**
 * Instagram Component instance
 */
var instagramComponent = __webpack_require__(264);

// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * Silder
 *
 * Init slider
 *
 */
var _slider = function _slider() {
  $(window).on('load', function () {
    var _$$slick;

    $('.items-carousel').slick((_$$slick = {
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 9000,
      nextArrow: '<i class="slick-next material-icons chevron_right"></i>',
      prevArrow: '<i class="slick-prev material-icons chevron_left"></i>'
    }, _defineProperty(_$$slick, 'autoplay', true), _defineProperty(_$$slick, 'autoplaySpeed', 8000), _defineProperty(_$$slick, 'fade', true), _defineProperty(_$$slick, 'cssEase', 'linear'), _$$slick));
  });
};

// ****************************
// ***** Public functions *****
// ****************************
/**
 * start
 *
 * Starts the module
 * Inits private variables and executes specific logic needed for the module
 * to start.
 *
 * @public
 */
this.start = function () {
  if (!_isInit) {
    console.log("Home Area started..");

    // Slider init
    _slider();

    // Categories component init
    categoriesComponent.start();

    // Instagram component init
    instagramComponent.start();

    // Projects component init
    projectsComponent.start();
  }
};

self.start();

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ToTop_vue__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ToTop_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__ToTop_vue__);
// *****************************
// ***** Private Variables *****
// *****************************
/**
 * Save this instance
 * @type @this;
 * @private
 */
var self = this;

/**
 * If Module has been initiated
 * @type Boolean
 * @private
 */
var _isInit = false; // to avoid 'rebinds'

/**
 * Instagram Instance
 */


// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * To Top
 *
 * Create a ToTop
 *
 */
var _toTop = function _toTop() {
  // Create all requested instances
  new Vue({
    el: '#to-top',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__ToTop_vue___default.a],

    beforeCreate: function beforeCreate() {}
  });
};

// ****************************
// ***** Public functions *****
// ****************************
/**
 * start
 *
 * Starts the module
 * Inits private variables and executes specific logic needed for the module
 * to start.
 *
 * @public
 */

self.start = function () {
  if (!_isInit) {
    console.log("To top Plugin started..");
    // Init To Top Plugin
    _toTop();
  }
};

this.start();

/***/ }),

/***/ 247:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(248)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(250)
/* template */
var __vue_template__ = __webpack_require__(251)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-4fb40145"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/to-top/ToTop.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fb40145", Component.options)
  } else {
    hotAPI.reload("data-v-4fb40145", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 248:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(249);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("1bf0299c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4fb40145\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ToTop.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-4fb40145\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./ToTop.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n.to-top[data-v-4fb40145] {\n    height: 100px;\n    display: block;\n    width: 100px;\n    position: absolute;\n    bottom: 0px;\n    right: 20px;\n    z-index: 999999999;\n}\n", ""]);

// exports


/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {};
    },


    methods: {
        goTop: function goTop(event) {
            console.log('click top' + event);
        }
    },

    mounted: function mounted() {
        console.log('working to top');
    }
});

/***/ }),

/***/ 251:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      staticClass: "to-top",
      staticStyle: { height: "100px", width: "100px", display: "none" }
    },
    [_c("a", { on: { click: _vm.goTop } }, [_vm._v(" Click me ")])]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4fb40145", module.exports)
  }
}

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Categories_vue__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Categories_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Categories_vue__);
// *****************************
// ***** Private Variables *****
// *****************************
/**
 * Save this instance
 * @type @this;
 * @private
 */
var self = this;

/**
 * If Module has been initiated
 * @type Boolean
 * @private
 */
var _isInit = false; // to avoid 'rebinds'


/**
 * Projects Instance
 */


// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * Forms
 *
 * Create Forms
 *
 */
var _form = function _form() {
  // Create all requested instances
  new Vue({
    el: '#categories',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__Categories_vue___default.a],

    beforeCreate: function beforeCreate() {}
  });
};

// ****************************
// ***** Public functions *****
// ****************************
/**
 * start
 *
 * Starts the module
 * Inits private variables and executes specific logic needed for the module
 * to start.
 *
 * @required
 * @param request
 * @type array
 *
 * @public
 */

self.start = function () {
  if (!_isInit) {
    // Init Forms Component
    _form();
  }
};

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(254)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(256)
/* template */
var __vue_template__ = __webpack_require__(257)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-30c40a60"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/categories/request/home/Categories.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-30c40a60", Component.options)
  } else {
    hotAPI.reload("data-v-30c40a60", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 254:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(255);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("27d5be8e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30c40a60\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Categories.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-30c40a60\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Categories.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 255:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),

/***/ 256:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    beforeMount: function beforeMount() {
        var self = this;

        // Send a POST request
        axios.post('get-categories').then(function (response) {
            // Update Instance Data
            self.updateData(response.data);
        }).catch(function () {});
    },
    data: function data() {
        return {
            categories: [],
            locale: trans.locale + '/'
        };
    },


    methods: {
        updateData: function updateData(response) {
            this.categories = response;
        }
    }
});

/***/ }),

/***/ 257:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    {
      staticClass: "col-lg-12 col-md-12 col-sm-12 hidden-xs",
      attrs: { id: "visual-menu" }
    },
    [
      _c("div", { staticClass: "container" }, [
        _vm._m(0, false, false),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "row" },
          _vm._l(_vm.categories.data, function(category) {
            return _c(
              "div",
              { staticClass: "col-lg-2 col-md-2 col-sm-2 hidden-xs" },
              [
                _c("div", { staticClass: "tile tile-visual-menu" }, [
                  _c(
                    "a",
                    {
                      staticClass: "preview-box",
                      attrs: { href: _vm.locale + category.link }
                    },
                    [
                      _c("img", { attrs: { src: category.image, alt: "" } }),
                      _vm._v(" "),
                      _c("div", { staticClass: "tile-title" }, [
                        _vm._v(_vm._s(category.name))
                      ])
                    ]
                  )
                ])
              ]
            )
          })
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "h2",
      { staticClass: "block-title text-center margin-bottom-2x" },
      [
        _vm._v("\n            Categories\n            "),
        _c("small", [_vm._v(" Lighting ")])
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-30c40a60", module.exports)
  }
}

/***/ }),

/***/ 258:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Projects_vue__ = __webpack_require__(259);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Projects_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Projects_vue__);
// *****************************
// ***** Private Variables *****
// *****************************
/**
 * Save this instance
 * @type @this;
 * @private
 */
var self = this;

/**
 * If Module has been initiated
 * @type Boolean
 * @private
 */
var _isInit = false; // to avoid 'rebinds'


/**
 * Projects Instance
 */


// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * Forms
 *
 * Create Forms
 *
 */
var _form = function _form() {
  // Create all requested instances
  new Vue({
    el: '#projects',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__Projects_vue___default.a],

    beforeCreate: function beforeCreate() {}
  });
};

// ****************************
// ***** Public functions *****
// ****************************
/**
 * start
 *
 * Starts the module
 * Inits private variables and executes specific logic needed for the module
 * to start.
 *
 * @required
 * @param request
 * @type array
 *
 * @public
 */

self.start = function () {
  if (!_isInit) {
    // Init Forms Component
    _form();
  }
};

/***/ }),

/***/ 259:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(260)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(262)
/* template */
var __vue_template__ = __webpack_require__(263)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-33a591cc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/projects/request/home/Projects.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-33a591cc", Component.options)
  } else {
    hotAPI.reload("data-v-33a591cc", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 260:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(261);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("67e741a8", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33a591cc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Projects.vue", function() {
     var newContent = require("!!../../../../../../../node_modules/css-loader/index.js!../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-33a591cc\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Projects.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 261:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/***/ }),

/***/ 262:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    beforeMount: function beforeMount() {
        var self = this;

        // Send a POST request
        axios.post('get-projects-featured').then(function (response) {
            // Update Instance Data
            self.updateData(response.data);
        }).catch(function (error) {
            // Update Instance Data with error
            console.log("error");
        });
    },
    data: function data() {
        return {
            projects: []
        };
    },


    methods: {
        updateData: function updateData(response) {
            this.projects = response;
        }
    }
});

/***/ }),

/***/ 263:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "section",
    { staticClass: "padding-top-2x col-lg-12 col-md-12 col-sm-12 col-xs-12" },
    [
      _c("div", { staticClass: "container" }, [
        _vm._m(0, false, false),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "row" },
          _vm._l(_vm.projects.data, function(project) {
            return _c(
              "div",
              { staticClass: "col-lg-4 col-md-4 col-sm-4 col-xs-12" },
              [
                _c("div", { staticClass: "tile tile-banner" }, [
                  _c(
                    "a",
                    { staticClass: "preview-box", attrs: { href: "#" } },
                    [
                      _c("img", {
                        attrs: { src: project.image, alt: project.alt }
                      }),
                      _vm._v(" "),
                      _c(
                        "div",
                        { staticClass: "banner-meta text-light text-center" },
                        [
                          _c("h4", { staticClass: "title" }, [
                            _vm._v(_vm._s(_vm.trans(project.name)))
                          ]),
                          _vm._v(" "),
                          _c("span", [
                            _vm._v(_vm._s(_vm.trans(project.subTitle)))
                          ])
                        ]
                      )
                    ]
                  )
                ])
              ]
            )
          })
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "h2",
      { staticClass: "block-title text-center margin-bottom-2x" },
      [
        _vm._v("\n            Projects\n            "),
        _c("small", [_vm._v("Design")])
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-33a591cc", module.exports)
  }
}

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Instagram_vue__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Instagram_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Instagram_vue__);
// *****************************
// ***** Private Variables *****
// *****************************
/**
 * Save this instance
 * @type @this;
 * @private
 */
var self = this;

/**
 * If Module has been initiated
 * @type Boolean
 * @private
 */
var _isInit = false; // to avoid 'rebinds'

/**
 * Request
 * @type String
 * @private
 */
var _request;

/**
 * Instagram Instance
 */


// *****************************
// ***** Private functions *****
// *****************************
/**
 *
 * Instagram
 *
 * Create Instagram
 *
 */
var _instagram = function _instagram() {
  // Create all requested instances
  new Vue({
    el: '#instagram',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__Instagram_vue___default.a],

    beforeCreate: function beforeCreate() {}
  });
};

// ****************************
// ***** Public functions *****
// ****************************
/**
 * start
 *
 * Starts the module
 * Inits private variables and executes specific logic needed for the module
 * to start.
 *
 * @required
 * @param request
 * @type array
 *
 * @public
 */

self.start = function () {
  if (!_isInit) {
    // Init Instagram Component
    _instagram();
  }
};

/***/ }),

/***/ 265:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(266)
/* template */
var __vue_template__ = __webpack_require__(268)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/instagram/Instagram.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4043c5ae", Component.options)
  } else {
    hotAPI.reload("data-v-4043c5ae", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_instagram__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_instagram___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_instagram__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        'vue-instagram': __WEBPACK_IMPORTED_MODULE_0_vue_instagram___default.a
    }
});

/***/ }),

/***/ 267:
/***/ (function(module, exports, __webpack_require__) {

!function(t,n){ true?module.exports=n():"function"==typeof define&&define.amd?define("VueInstagram",[],n):"object"==typeof exports?exports.VueInstagram=n():t.VueInstagram=n()}(this,function(){return function(t){function n(e){if(r[e])return r[e].exports;var o=r[e]={i:e,l:!1,exports:{}};return t[e].call(o.exports,o,o.exports,n),o.l=!0,o.exports}var r={};return n.m=t,n.c=r,n.d=function(t,r,e){n.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:e})},n.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(r,"a",r),r},n.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},n.p="",n(n.s=41)}([function(t,n,r){var e=r(24),o="object"==typeof self&&self&&self.Object===Object&&self,u=e||o||Function("return this")();t.exports=u},function(t,n){var r=Array.isArray;t.exports=r},function(t,n,r){function e(t,n){var r=u(t,n);return o(r)?r:void 0}var o=r(50),u=r(56);t.exports=e},function(t,n){function r(t){return null!=t&&"object"==typeof t}t.exports=r},function(t,n,r){function e(t){return null==t?void 0===t?a:c:f&&f in Object(t)?u(t):i(t)}var o=r(6),u=r(52),i=r(53),c="[object Null]",a="[object Undefined]",f=o?o.toStringTag:void 0;t.exports=e},function(t,n,r){var e=r(2),o=e(Object,"create");t.exports=o},function(t,n,r){var e=r(0),o=e.Symbol;t.exports=o},function(t,n,r){function e(t){var n=-1,r=null==t?0:t.length;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}var o=r(61),u=r(62),i=r(63),c=r(64),a=r(65);e.prototype.clear=o,e.prototype.delete=u,e.prototype.get=i,e.prototype.has=c,e.prototype.set=a,t.exports=e},function(t,n,r){function e(t,n){for(var r=t.length;r--;)if(o(t[r][0],n))return r;return-1}var o=r(26);t.exports=e},function(t,n,r){function e(t,n){var r=t.__data__;return o(n)?r["string"==typeof n?"string":"hash"]:r.map}var o=r(67);t.exports=e},function(t,n,r){function e(t){if("string"==typeof t||o(t))return t;var n=t+"";return"0"==n&&1/t==-u?"-0":n}var o=r(21),u=1/0;t.exports=e},function(t,n){function r(t,n){for(var r=-1,e=null==t?0:t.length,o=Array(e);++r<e;)o[r]=n(t[r],r,t);return o}t.exports=r},function(t,n,r){function e(t){var n=-1,r=null==t?0:t.length;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}var o=r(47),u=r(66),i=r(68),c=r(69),a=r(70);e.prototype.clear=o,e.prototype.delete=u,e.prototype.get=i,e.prototype.has=c,e.prototype.set=a,t.exports=e},function(t,n){function r(t){var n=typeof t;return null!=t&&("object"==n||"function"==n)}t.exports=r},function(t,n,r){var e=r(2),o=r(0),u=e(o,"Map");t.exports=u},function(t,n){function r(t){return t}t.exports=r},function(t,n,r){function e(t){return null!=t&&u(t.length)&&!o(t)}var o=r(23),u=r(17);t.exports=e},function(t,n){function r(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=e}var e=9007199254740991;t.exports=r},function(t,n,r){function e(t){return i(t)?o(t):u(t)}var o=r(95),u=r(101),i=r(16);t.exports=e},function(t,n){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children||(t.children=[]),Object.defineProperty(t,"loaded",{enumerable:!0,get:function(){return t.l}}),Object.defineProperty(t,"id",{enumerable:!0,get:function(){return t.i}}),t.webpackPolyfill=1),t}},function(t,n,r){function e(t,n){if(o(t))return!1;var r=typeof t;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=t&&!u(t))||(c.test(t)||!i.test(t)||null!=n&&t in Object(n))}var o=r(1),u=r(21),i=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,c=/^\w*$/;t.exports=e},function(t,n,r){function e(t){return"symbol"==typeof t||u(t)&&o(t)==i}var o=r(4),u=r(3),i="[object Symbol]";t.exports=e},function(t,n,r){function e(t){var n=-1,r=null==t?0:t.length;for(this.__data__=new o;++n<r;)this.add(t[n])}var o=r(12),u=r(71),i=r(72);e.prototype.add=e.prototype.push=u,e.prototype.has=i,t.exports=e},function(t,n,r){function e(t){if(!u(t))return!1;var n=o(t);return n==c||n==a||n==i||n==f}var o=r(4),u=r(13),i="[object AsyncFunction]",c="[object Function]",a="[object GeneratorFunction]",f="[object Proxy]";t.exports=e},function(t,n,r){(function(n){var r="object"==typeof n&&n&&n.Object===Object&&n;t.exports=r}).call(n,r(51))},function(t,n){function r(t){if(null!=t){try{return o.call(t)}catch(t){}try{return t+""}catch(t){}}return""}var e=Function.prototype,o=e.toString;t.exports=r},function(t,n){function r(t,n){return t===n||t!==t&&n!==n}t.exports=r},function(t,n){function r(t){return function(n){return t(n)}}t.exports=r},function(t,n){function r(t,n){return t.has(n)}t.exports=r},function(t,n){function r(t,n){for(var r=-1,e=null==t?0:t.length,o=0,u=[];++r<e;){var i=t[r];n(i,r,t)&&(u[o++]=i)}return u}t.exports=r},function(t,n,r){var e=r(97),o=r(3),u=Object.prototype,i=u.hasOwnProperty,c=u.propertyIsEnumerable,a=e(function(){return arguments}())?e:function(t){return o(t)&&i.call(t,"callee")&&!c.call(t,"callee")};t.exports=a},function(t,n,r){(function(t){var e=r(0),o=r(98),u="object"==typeof n&&n&&!n.nodeType&&n,i=u&&"object"==typeof t&&t&&!t.nodeType&&t,c=i&&i.exports===u,a=c?e.Buffer:void 0,f=a?a.isBuffer:void 0,s=f||o;t.exports=s}).call(n,r(19)(t))},function(t,n){function r(t,n){return!!(n=null==n?e:n)&&("number"==typeof t||o.test(t))&&t>-1&&t%1==0&&t<n}var e=9007199254740991,o=/^(?:0|[1-9]\d*)$/;t.exports=r},function(t,n,r){var e=r(99),o=r(27),u=r(100),i=u&&u.isTypedArray,c=i?o(i):e;t.exports=c},function(t,n,r){function e(t){var n=this.__data__=new o(t);this.size=n.size}var o=r(7),u=r(109),i=r(110),c=r(111),a=r(112),f=r(113);e.prototype.clear=u,e.prototype.delete=i,e.prototype.get=c,e.prototype.has=a,e.prototype.set=f,t.exports=e},function(t,n,r){function e(t,n,r,i,c){return t===n||(null==t||null==n||!u(t)&&!u(n)?t!==t&&n!==n:o(t,n,r,i,e,c))}var o=r(114),u=r(3);t.exports=e},function(t,n,r){function e(t,n,r,e,f,s){var p=r&c,l=t.length,v=n.length;if(l!=v&&!(p&&v>l))return!1;var d=s.get(t);if(d&&s.get(n))return d==n;var h=-1,x=!0,y=r&a?new o:void 0;for(s.set(t,n),s.set(n,t);++h<l;){var b=t[h],_=n[h];if(e)var g=p?e(_,b,h,n,t,s):e(b,_,h,t,n,s);if(void 0!==g){if(g)continue;x=!1;break}if(y){if(!u(n,function(t,n){if(!i(y,n)&&(b===t||f(b,t,r,e,s)))return y.push(n)})){x=!1;break}}else if(b!==_&&!f(b,_,r,e,s)){x=!1;break}}return s.delete(t),s.delete(n),x}var o=r(22),u=r(115),i=r(28),c=1,a=2;t.exports=e},function(t,n,r){function e(t){return t===t&&!o(t)}var o=r(13);t.exports=e},function(t,n){function r(t,n){return function(r){return null!=r&&(r[t]===n&&(void 0!==n||t in Object(r)))}}t.exports=r},function(t,n,r){function e(t,n){n=o(n,t);for(var r=0,e=n.length;null!=t&&r<e;)t=t[u(n[r++])];return r&&r==e?t:void 0}var o=r(40),u=r(10);t.exports=e},function(t,n,r){function e(t,n){return o(t)?t:u(t,n)?[t]:i(c(t))}var o=r(1),u=r(20),i=r(134),c=r(137);t.exports=e},function(t,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var e=r(42),o={install:function(t){t.component(e.a.name,e.a)}};e.a.install=o.install,n.default=e.a},function(t,n,r){"use strict";var e=r(44),o=r(148),u=r(43),i=u(e.a,o.a,!1,null,null,null);n.a=i.exports},function(t,n){t.exports=function(t,n,r,e,o,u){var i,c=t=t||{},a=typeof t.default;"object"!==a&&"function"!==a||(i=t,c=t.default);var f="function"==typeof c?c.options:c;n&&(f.render=n.render,f.staticRenderFns=n.staticRenderFns,f._compiled=!0),r&&(f.functional=!0),o&&(f._scopeId=o);var s;if(u?(s=function(t){t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,t||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),e&&e.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(u)},f._ssrRegister=s):e&&(s=e),s){var p=f.functional,l=p?f.render:f.beforeCreate;p?(f._injectStyles=s,f.render=function(t,n){return s.call(n),l(t,n)}):f.beforeCreate=l?[].concat(l,s):[s]}return{esModule:i,exports:c,options:f}}},function(t,n,r){"use strict";var e=r(45),o=r.n(e),u=r(89),i=r.n(u),c=r(145),a=r.n(c);n.a={name:"vue-instagram",props:{token:{type:String,required:!0},username:{type:String,required:!0},count:{type:Number,default:3,required:!1},tags:{type:Array,default:function(){return[]},required:!1}},data:function(){return{error:"",feeds:[],profile:""}},mounted:function(){var t=this;a()({url:"https://api.instagram.com/v1/users/search",data:{access_token:this.token,q:this.username},error:function(t){throw t},complete:function(n){400===n.meta.code&&(t.error=n.meta),200===n.meta.code&&(t.profile=n.data,t.getUserFeed())}})},methods:{getUserFeed:function(){var t=this;a()({url:"https://api.instagram.com/v1/users/"+this.profile[0].id+"/media/recent",data:{access_token:this.token,count:this.count},error:function(t){throw t},complete:function(n){400===n.meta.code&&(t.error=n.meta),200===n.meta.code&&(t.tags.length?t.feeds=i()(n.data,function(n){return o()(t.tags,n.tags).length}):t.feeds=n.data)}})}}}},function(t,n,r){var e=r(11),o=r(46),u=r(79),i=r(87),c=u(function(t){var n=e(t,i);return n.length&&n[0]===t[0]?o(n):[]});t.exports=c},function(t,n,r){function e(t,n,r){for(var e=r?i:u,p=t[0].length,l=t.length,v=l,d=Array(l),h=1/0,x=[];v--;){var y=t[v];v&&n&&(y=c(y,a(n))),h=s(y.length,h),d[v]=!r&&(n||p>=120&&y.length>=120)?new o(v&&y):void 0}y=t[0];var b=-1,_=d[0];t:for(;++b<p&&x.length<h;){var g=y[b],j=n?n(g):g;if(g=r||0!==g?g:0,!(_?f(_,j):e(x,j,r))){for(v=l;--v;){var m=d[v];if(!(m?f(m,j):e(t[v],j,r)))continue t}_&&_.push(j),x.push(g)}}return x}var o=r(22),u=r(73),i=r(78),c=r(11),a=r(27),f=r(28),s=Math.min;t.exports=e},function(t,n,r){function e(){this.size=0,this.__data__={hash:new o,map:new(i||u),string:new o}}var o=r(48),u=r(7),i=r(14);t.exports=e},function(t,n,r){function e(t){var n=-1,r=null==t?0:t.length;for(this.clear();++n<r;){var e=t[n];this.set(e[0],e[1])}}var o=r(49),u=r(57),i=r(58),c=r(59),a=r(60);e.prototype.clear=o,e.prototype.delete=u,e.prototype.get=i,e.prototype.has=c,e.prototype.set=a,t.exports=e},function(t,n,r){function e(){this.__data__=o?o(null):{},this.size=0}var o=r(5);t.exports=e},function(t,n,r){function e(t){return!(!i(t)||u(t))&&(o(t)?d:f).test(c(t))}var o=r(23),u=r(54),i=r(13),c=r(25),a=/[\\^$.*+?()[\]{}|]/g,f=/^\[object .+?Constructor\]$/,s=Function.prototype,p=Object.prototype,l=s.toString,v=p.hasOwnProperty,d=RegExp("^"+l.call(v).replace(a,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$");t.exports=e},function(t,n){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(r=window)}t.exports=r},function(t,n,r){function e(t){var n=i.call(t,a),r=t[a];try{t[a]=void 0;var e=!0}catch(t){}var o=c.call(t);return e&&(n?t[a]=r:delete t[a]),o}var o=r(6),u=Object.prototype,i=u.hasOwnProperty,c=u.toString,a=o?o.toStringTag:void 0;t.exports=e},function(t,n){function r(t){return o.call(t)}var e=Object.prototype,o=e.toString;t.exports=r},function(t,n,r){function e(t){return!!u&&u in t}var o=r(55),u=function(){var t=/[^.]+$/.exec(o&&o.keys&&o.keys.IE_PROTO||"");return t?"Symbol(src)_1."+t:""}();t.exports=e},function(t,n,r){var e=r(0),o=e["__core-js_shared__"];t.exports=o},function(t,n){function r(t,n){return null==t?void 0:t[n]}t.exports=r},function(t,n){function r(t){var n=this.has(t)&&delete this.__data__[t];return this.size-=n?1:0,n}t.exports=r},function(t,n,r){function e(t){var n=this.__data__;if(o){var r=n[t];return r===u?void 0:r}return c.call(n,t)?n[t]:void 0}var o=r(5),u="__lodash_hash_undefined__",i=Object.prototype,c=i.hasOwnProperty;t.exports=e},function(t,n,r){function e(t){var n=this.__data__;return o?void 0!==n[t]:i.call(n,t)}var o=r(5),u=Object.prototype,i=u.hasOwnProperty;t.exports=e},function(t,n,r){function e(t,n){var r=this.__data__;return this.size+=this.has(t)?0:1,r[t]=o&&void 0===n?u:n,this}var o=r(5),u="__lodash_hash_undefined__";t.exports=e},function(t,n){function r(){this.__data__=[],this.size=0}t.exports=r},function(t,n,r){function e(t){var n=this.__data__,r=o(n,t);return!(r<0)&&(r==n.length-1?n.pop():i.call(n,r,1),--this.size,!0)}var o=r(8),u=Array.prototype,i=u.splice;t.exports=e},function(t,n,r){function e(t){var n=this.__data__,r=o(n,t);return r<0?void 0:n[r][1]}var o=r(8);t.exports=e},function(t,n,r){function e(t){return o(this.__data__,t)>-1}var o=r(8);t.exports=e},function(t,n,r){function e(t,n){var r=this.__data__,e=o(r,t);return e<0?(++this.size,r.push([t,n])):r[e][1]=n,this}var o=r(8);t.exports=e},function(t,n,r){function e(t){var n=o(this,t).delete(t);return this.size-=n?1:0,n}var o=r(9);t.exports=e},function(t,n){function r(t){var n=typeof t;return"string"==n||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==t:null===t}t.exports=r},function(t,n,r){function e(t){return o(this,t).get(t)}var o=r(9);t.exports=e},function(t,n,r){function e(t){return o(this,t).has(t)}var o=r(9);t.exports=e},function(t,n,r){function e(t,n){var r=o(this,t),e=r.size;return r.set(t,n),this.size+=r.size==e?0:1,this}var o=r(9);t.exports=e},function(t,n){function r(t){return this.__data__.set(t,e),this}var e="__lodash_hash_undefined__";t.exports=r},function(t,n){function r(t){return this.__data__.has(t)}t.exports=r},function(t,n,r){function e(t,n){return!!(null==t?0:t.length)&&o(t,n,0)>-1}var o=r(74);t.exports=e},function(t,n,r){function e(t,n,r){return n===n?i(t,n,r):o(t,u,r)}var o=r(75),u=r(76),i=r(77);t.exports=e},function(t,n){function r(t,n,r,e){for(var o=t.length,u=r+(e?1:-1);e?u--:++u<o;)if(n(t[u],u,t))return u;return-1}t.exports=r},function(t,n){function r(t){return t!==t}t.exports=r},function(t,n){function r(t,n,r){for(var e=r-1,o=t.length;++e<o;)if(t[e]===n)return e;return-1}t.exports=r},function(t,n){function r(t,n,r){for(var e=-1,o=null==t?0:t.length;++e<o;)if(r(n,t[e]))return!0;return!1}t.exports=r},function(t,n,r){function e(t,n){return i(u(t,n,o),t+"")}var o=r(15),u=r(80),i=r(82);t.exports=e},function(t,n,r){function e(t,n,r){return n=u(void 0===n?t.length-1:n,0),function(){for(var e=arguments,i=-1,c=u(e.length-n,0),a=Array(c);++i<c;)a[i]=e[n+i];i=-1;for(var f=Array(n+1);++i<n;)f[i]=e[i];return f[n]=r(a),o(t,this,f)}}var o=r(81),u=Math.max;t.exports=e},function(t,n){function r(t,n,r){switch(r.length){case 0:return t.call(n);case 1:return t.call(n,r[0]);case 2:return t.call(n,r[0],r[1]);case 3:return t.call(n,r[0],r[1],r[2])}return t.apply(n,r)}t.exports=r},function(t,n,r){var e=r(83),o=r(86),u=o(e);t.exports=u},function(t,n,r){var e=r(84),o=r(85),u=r(15),i=o?function(t,n){return o(t,"toString",{configurable:!0,enumerable:!1,value:e(n),writable:!0})}:u;t.exports=i},function(t,n){function r(t){return function(){return t}}t.exports=r},function(t,n,r){var e=r(2),o=function(){try{var t=e(Object,"defineProperty");return t({},"",{}),t}catch(t){}}();t.exports=o},function(t,n){function r(t){var n=0,r=0;return function(){var i=u(),c=o-(i-r);if(r=i,c>0){if(++n>=e)return arguments[0]}else n=0;return t.apply(void 0,arguments)}}var e=800,o=16,u=Date.now;t.exports=r},function(t,n,r){function e(t){return o(t)?t:[]}var o=r(88);t.exports=e},function(t,n,r){function e(t){return u(t)&&o(t)}var o=r(16),u=r(3);t.exports=e},function(t,n,r){function e(t,n){return(c(t)?o:u)(t,i(n,3))}var o=r(29),u=r(90),i=r(106),c=r(1);t.exports=e},function(t,n,r){function e(t,n){var r=[];return o(t,function(t,e,o){n(t,e,o)&&r.push(t)}),r}var o=r(91);t.exports=e},function(t,n,r){var e=r(92),o=r(105),u=o(e);t.exports=u},function(t,n,r){function e(t,n){return t&&o(t,n,u)}var o=r(93),u=r(18);t.exports=e},function(t,n,r){var e=r(94),o=e();t.exports=o},function(t,n){function r(t){return function(n,r,e){for(var o=-1,u=Object(n),i=e(n),c=i.length;c--;){var a=i[t?c:++o];if(!1===r(u[a],a,u))break}return n}}t.exports=r},function(t,n,r){function e(t,n){var r=i(t),e=!r&&u(t),s=!r&&!e&&c(t),l=!r&&!e&&!s&&f(t),v=r||e||s||l,d=v?o(t.length,String):[],h=d.length;for(var x in t)!n&&!p.call(t,x)||v&&("length"==x||s&&("offset"==x||"parent"==x)||l&&("buffer"==x||"byteLength"==x||"byteOffset"==x)||a(x,h))||d.push(x);return d}var o=r(96),u=r(30),i=r(1),c=r(31),a=r(32),f=r(33),s=Object.prototype,p=s.hasOwnProperty;t.exports=e},function(t,n){function r(t,n){for(var r=-1,e=Array(t);++r<t;)e[r]=n(r);return e}t.exports=r},function(t,n,r){function e(t){return u(t)&&o(t)==i}var o=r(4),u=r(3),i="[object Arguments]";t.exports=e},function(t,n){function r(){return!1}t.exports=r},function(t,n,r){function e(t){return i(t)&&u(t.length)&&!!c[o(t)]}var o=r(4),u=r(17),i=r(3),c={};c["[object Float32Array]"]=c["[object Float64Array]"]=c["[object Int8Array]"]=c["[object Int16Array]"]=c["[object Int32Array]"]=c["[object Uint8Array]"]=c["[object Uint8ClampedArray]"]=c["[object Uint16Array]"]=c["[object Uint32Array]"]=!0,c["[object Arguments]"]=c["[object Array]"]=c["[object ArrayBuffer]"]=c["[object Boolean]"]=c["[object DataView]"]=c["[object Date]"]=c["[object Error]"]=c["[object Function]"]=c["[object Map]"]=c["[object Number]"]=c["[object Object]"]=c["[object RegExp]"]=c["[object Set]"]=c["[object String]"]=c["[object WeakMap]"]=!1,t.exports=e},function(t,n,r){(function(t){var e=r(24),o="object"==typeof n&&n&&!n.nodeType&&n,u=o&&"object"==typeof t&&t&&!t.nodeType&&t,i=u&&u.exports===o,c=i&&e.process,a=function(){try{return c&&c.binding&&c.binding("util")}catch(t){}}();t.exports=a}).call(n,r(19)(t))},function(t,n,r){function e(t){if(!o(t))return u(t);var n=[];for(var r in Object(t))c.call(t,r)&&"constructor"!=r&&n.push(r);return n}var o=r(102),u=r(103),i=Object.prototype,c=i.hasOwnProperty;t.exports=e},function(t,n){function r(t){var n=t&&t.constructor;return t===("function"==typeof n&&n.prototype||e)}var e=Object.prototype;t.exports=r},function(t,n,r){var e=r(104),o=e(Object.keys,Object);t.exports=o},function(t,n){function r(t,n){return function(r){return t(n(r))}}t.exports=r},function(t,n,r){function e(t,n){return function(r,e){if(null==r)return r;if(!o(r))return t(r,e);for(var u=r.length,i=n?u:-1,c=Object(r);(n?i--:++i<u)&&!1!==e(c[i],i,c););return r}}var o=r(16);t.exports=e},function(t,n,r){function e(t){return"function"==typeof t?t:null==t?i:"object"==typeof t?c(t)?u(t[0],t[1]):o(t):a(t)}var o=r(107),u=r(132),i=r(15),c=r(1),a=r(142);t.exports=e},function(t,n,r){function e(t){var n=u(t);return 1==n.length&&n[0][2]?i(n[0][0],n[0][1]):function(r){return r===t||o(r,t,n)}}var o=r(108),u=r(131),i=r(38);t.exports=e},function(t,n,r){function e(t,n,r,e){var a=r.length,f=a,s=!e;if(null==t)return!f;for(t=Object(t);a--;){var p=r[a];if(s&&p[2]?p[1]!==t[p[0]]:!(p[0]in t))return!1}for(;++a<f;){p=r[a];var l=p[0],v=t[l],d=p[1];if(s&&p[2]){if(void 0===v&&!(l in t))return!1}else{var h=new o;if(e)var x=e(v,d,l,t,n,h);if(!(void 0===x?u(d,v,i|c,e,h):x))return!1}}return!0}var o=r(34),u=r(35),i=1,c=2;t.exports=e},function(t,n,r){function e(){this.__data__=new o,this.size=0}var o=r(7);t.exports=e},function(t,n){function r(t){var n=this.__data__,r=n.delete(t);return this.size=n.size,r}t.exports=r},function(t,n){function r(t){return this.__data__.get(t)}t.exports=r},function(t,n){function r(t){return this.__data__.has(t)}t.exports=r},function(t,n,r){function e(t,n){var r=this.__data__;if(r instanceof o){var e=r.__data__;if(!u||e.length<c-1)return e.push([t,n]),this.size=++r.size,this;r=this.__data__=new i(e)}return r.set(t,n),this.size=r.size,this}var o=r(7),u=r(14),i=r(12),c=200;t.exports=e},function(t,n,r){function e(t,n,r,e,x,b){var _=f(t),g=f(n),j=_?d:a(t),m=g?d:a(n);j=j==v?h:j,m=m==v?h:m;var w=j==h,O=m==h,S=j==m;if(S&&s(t)){if(!s(n))return!1;_=!0,w=!1}if(S&&!w)return b||(b=new o),_||p(t)?u(t,n,r,e,x,b):i(t,n,j,r,e,x,b);if(!(r&l)){var A=w&&y.call(t,"__wrapped__"),z=O&&y.call(n,"__wrapped__");if(A||z){var P=A?t.value():t,k=z?n.value():n;return b||(b=new o),x(P,k,r,e,b)}}return!!S&&(b||(b=new o),c(t,n,r,e,x,b))}var o=r(34),u=r(36),i=r(116),c=r(120),a=r(126),f=r(1),s=r(31),p=r(33),l=1,v="[object Arguments]",d="[object Array]",h="[object Object]",x=Object.prototype,y=x.hasOwnProperty;t.exports=e},function(t,n){function r(t,n){for(var r=-1,e=null==t?0:t.length;++r<e;)if(n(t[r],r,t))return!0;return!1}t.exports=r},function(t,n,r){function e(t,n,r,e,o,w,S){switch(r){case m:if(t.byteLength!=n.byteLength||t.byteOffset!=n.byteOffset)return!1;t=t.buffer,n=n.buffer;case j:return!(t.byteLength!=n.byteLength||!w(new u(t),new u(n)));case l:case v:case x:return i(+t,+n);case d:return t.name==n.name&&t.message==n.message;case y:case _:return t==n+"";case h:var A=a;case b:var z=e&s;if(A||(A=f),t.size!=n.size&&!z)return!1;var P=S.get(t);if(P)return P==n;e|=p,S.set(t,n);var k=c(A(t),A(n),e,o,w,S);return S.delete(t),k;case g:if(O)return O.call(t)==O.call(n)}return!1}var o=r(6),u=r(117),i=r(26),c=r(36),a=r(118),f=r(119),s=1,p=2,l="[object Boolean]",v="[object Date]",d="[object Error]",h="[object Map]",x="[object Number]",y="[object RegExp]",b="[object Set]",_="[object String]",g="[object Symbol]",j="[object ArrayBuffer]",m="[object DataView]",w=o?o.prototype:void 0,O=w?w.valueOf:void 0;t.exports=e},function(t,n,r){var e=r(0),o=e.Uint8Array;t.exports=o},function(t,n){function r(t){var n=-1,r=Array(t.size);return t.forEach(function(t,e){r[++n]=[e,t]}),r}t.exports=r},function(t,n){function r(t){var n=-1,r=Array(t.size);return t.forEach(function(t){r[++n]=t}),r}t.exports=r},function(t,n,r){function e(t,n,r,e,i,a){var f=r&u,s=o(t),p=s.length;if(p!=o(n).length&&!f)return!1;for(var l=p;l--;){var v=s[l];if(!(f?v in n:c.call(n,v)))return!1}var d=a.get(t);if(d&&a.get(n))return d==n;var h=!0;a.set(t,n),a.set(n,t);for(var x=f;++l<p;){v=s[l];var y=t[v],b=n[v];if(e)var _=f?e(b,y,v,n,t,a):e(y,b,v,t,n,a);if(!(void 0===_?y===b||i(y,b,r,e,a):_)){h=!1;break}x||(x="constructor"==v)}if(h&&!x){var g=t.constructor,j=n.constructor;g!=j&&"constructor"in t&&"constructor"in n&&!("function"==typeof g&&g instanceof g&&"function"==typeof j&&j instanceof j)&&(h=!1)}return a.delete(t),a.delete(n),h}var o=r(121),u=1,i=Object.prototype,c=i.hasOwnProperty;t.exports=e},function(t,n,r){function e(t){return o(t,i,u)}var o=r(122),u=r(124),i=r(18);t.exports=e},function(t,n,r){function e(t,n,r){var e=n(t);return u(t)?e:o(e,r(t))}var o=r(123),u=r(1);t.exports=e},function(t,n){function r(t,n){for(var r=-1,e=n.length,o=t.length;++r<e;)t[o+r]=n[r];return t}t.exports=r},function(t,n,r){var e=r(29),o=r(125),u=Object.prototype,i=u.propertyIsEnumerable,c=Object.getOwnPropertySymbols,a=c?function(t){return null==t?[]:(t=Object(t),e(c(t),function(n){return i.call(t,n)}))}:o;t.exports=a},function(t,n){function r(){return[]}t.exports=r},function(t,n,r){var e=r(127),o=r(14),u=r(128),i=r(129),c=r(130),a=r(4),f=r(25),s=f(e),p=f(o),l=f(u),v=f(i),d=f(c),h=a;(e&&"[object DataView]"!=h(new e(new ArrayBuffer(1)))||o&&"[object Map]"!=h(new o)||u&&"[object Promise]"!=h(u.resolve())||i&&"[object Set]"!=h(new i)||c&&"[object WeakMap]"!=h(new c))&&(h=function(t){var n=a(t),r="[object Object]"==n?t.constructor:void 0,e=r?f(r):"";if(e)switch(e){case s:return"[object DataView]";case p:return"[object Map]";case l:return"[object Promise]";case v:return"[object Set]";case d:return"[object WeakMap]"}return n}),t.exports=h},function(t,n,r){var e=r(2),o=r(0),u=e(o,"DataView");t.exports=u},function(t,n,r){var e=r(2),o=r(0),u=e(o,"Promise");t.exports=u},function(t,n,r){var e=r(2),o=r(0),u=e(o,"Set");t.exports=u},function(t,n,r){var e=r(2),o=r(0),u=e(o,"WeakMap");t.exports=u},function(t,n,r){function e(t){for(var n=u(t),r=n.length;r--;){var e=n[r],i=t[e];n[r]=[e,i,o(i)]}return n}var o=r(37),u=r(18);t.exports=e},function(t,n,r){function e(t,n){return c(t)&&a(n)?f(s(t),n):function(r){var e=u(r,t);return void 0===e&&e===n?i(r,t):o(n,e,p|l)}}var o=r(35),u=r(133),i=r(139),c=r(20),a=r(37),f=r(38),s=r(10),p=1,l=2;t.exports=e},function(t,n,r){function e(t,n,r){var e=null==t?void 0:o(t,n);return void 0===e?r:e}var o=r(39);t.exports=e},function(t,n,r){var e=r(135),o=/^\./,u=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,i=/\\(\\)?/g,c=e(function(t){var n=[];return o.test(t)&&n.push(""),t.replace(u,function(t,r,e,o){n.push(e?o.replace(i,"$1"):r||t)}),n});t.exports=c},function(t,n,r){function e(t){var n=o(t,function(t){return r.size===u&&r.clear(),t}),r=n.cache;return n}var o=r(136),u=500;t.exports=e},function(t,n,r){function e(t,n){if("function"!=typeof t||null!=n&&"function"!=typeof n)throw new TypeError(u);var r=function(){var e=arguments,o=n?n.apply(this,e):e[0],u=r.cache;if(u.has(o))return u.get(o);var i=t.apply(this,e);return r.cache=u.set(o,i)||u,i};return r.cache=new(e.Cache||o),r}var o=r(12),u="Expected a function";e.Cache=o,t.exports=e},function(t,n,r){function e(t){return null==t?"":o(t)}var o=r(138);t.exports=e},function(t,n,r){function e(t){if("string"==typeof t)return t;if(i(t))return u(t,e)+"";if(c(t))return s?s.call(t):"";var n=t+"";return"0"==n&&1/t==-a?"-0":n}var o=r(6),u=r(11),i=r(1),c=r(21),a=1/0,f=o?o.prototype:void 0,s=f?f.toString:void 0;t.exports=e},function(t,n,r){function e(t,n){return null!=t&&u(t,n,o)}var o=r(140),u=r(141);t.exports=e},function(t,n){function r(t,n){return null!=t&&n in Object(t)}t.exports=r},function(t,n,r){function e(t,n,r){n=o(n,t);for(var e=-1,s=n.length,p=!1;++e<s;){var l=f(n[e]);if(!(p=null!=t&&r(t,l)))break;t=t[l]}return p||++e!=s?p:!!(s=null==t?0:t.length)&&a(s)&&c(l,s)&&(i(t)||u(t))}var o=r(40),u=r(30),i=r(1),c=r(32),a=r(17),f=r(10);t.exports=e},function(t,n,r){function e(t){return i(t)?o(c(t)):u(t)}var o=r(143),u=r(144),i=r(20),c=r(10);t.exports=e},function(t,n){function r(t){return function(n){return null==n?void 0:n[t]}}t.exports=r},function(t,n,r){function e(t){return function(n){return o(n,t)}}var o=r(39);t.exports=e},function(t,n,r){(function(t){var e;(function(){var o,u,i,c,a,f,s,p;i=function(t){return window.document.createElement(t)},c=window.encodeURIComponent,s=Math.random,o=function(t){var n,r,e,o,c,f,s;if(null==t&&(t={}),f={data:t.data||{},error:t.error||a,success:t.success||a,beforeSend:t.beforeSend||a,complete:t.complete||a,url:t.url||""},f.computedUrl=u(f),0===f.url.length)throw new Error("MissingUrl");return o=!1,!1!==f.beforeSend({},f)&&(e=t.callbackName||"callback",r=t.callbackFunc||"jsonp_"+p(15),n=f.data[e]=r,window[n]=function(t){return window[n]=null,f.success(t,f),f.complete(t,f)},s=i("script"),s.src=u(f),s.async=!0,s.onerror=function(t){return f.error({url:s.src,event:t}),f.complete({url:s.src,event:t},f)},s.onload=s.onreadystatechange=function(){var t,n;if(!(o||"loaded"!==(t=this.readyState)&&"complete"!==t))return o=!0,s?(s.onload=s.onreadystatechange=null,null!=(n=s.parentNode)&&n.removeChild(s),s=null):void 0},c=window.document.getElementsByTagName("head")[0]||window.document.documentElement,c.insertBefore(s,c.firstChild)),{abort:function(){if(window[n]=function(){return window[n]=null},o=!0,null!=s?s.parentNode:void 0)return s.onload=s.onreadystatechange=null,s.parentNode.removeChild(s),s=null}}},a=function(){},u=function(t){var n;return n=t.url,n+=t.url.indexOf("?")<0?"?":"&",n+=f(t.data)},p=function(t){var n;for(n="";n.length<t;)n+=s().toString(36).slice(2,3);return n},f=function(t){var n,r,e;return n=function(){var n;n=[];for(r in t)e=t[r],n.push(c(r)+"="+c(e));return n}(),n.join("&")},(null!==r(146)?r(147):void 0)?void 0!==(e=function(){return o}.call(n,r,n,t))&&(t.exports=e):(void 0!==t&&null!==t?t.exports:void 0)?t.exports=o:this.JSONP=o}).call(this)}).call(n,r(19)(t))},function(t,n){t.exports=function(){throw new Error("define cannot be used indirect")}},function(t,n){(function(n){t.exports=n}).call(n,{})},function(t,n,r){"use strict";var e=function(){var t=this,n=t.$createElement;return(t._self._c||n)("div",[t._l(t.feeds,function(n,r){return t._t("feeds",null,{feed:n})}),t._v(" "),t._t("error",null,{error:t.error})],2)},o=[],u={render:e,staticRenderFns:o};n.a=u}])});

/***/ }),

/***/ 268:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "padding-top-2x col-lg-12 col-md-12 col-sm-12 col-xs-12" },
    [
      _c("div", { staticClass: "container" }, [
        _vm._m(0, false, false),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "row" },
          [
            _c("vue-instagram", {
              attrs: {
                token: "253093357.6090697.0d9124a6373243c6aac109953ff8fa6e",
                username: "delightfulll",
                count: 6
              },
              scopedSlots: _vm._u([
                {
                  key: "feeds",
                  fn: function(props) {
                    return [
                      _c(
                        "div",
                        { staticClass: "col-lg-2 col-md-2 col-sm-4 col-xs-6" },
                        [
                          _c("div", { staticClass: "tile tile-insta" }, [
                            _c(
                              "a",
                              {
                                staticClass: "preview-box",
                                attrs: {
                                  href: props.feed.link,
                                  target: "_blank"
                                }
                              },
                              [
                                _c("img", {
                                  attrs: {
                                    src:
                                      props.feed.images.standard_resolution.url
                                  }
                                }),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticClass: "insta-meta",
                                    staticStyle: { "margin-left": "-25px" }
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "material-icons favorite"
                                    }),
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(props.feed.likes.count) +
                                        "\n                                "
                                    )
                                  ]
                                ),
                                _vm._v(" "),
                                _c(
                                  "span",
                                  {
                                    staticClass: "insta-meta",
                                    staticStyle: { "margin-left": "25px" }
                                  },
                                  [
                                    _c("i", {
                                      staticClass: "material-icons mode_comment"
                                    }),
                                    _vm._v(
                                      "\n                                    " +
                                        _vm._s(props.feed.comments.count) +
                                        "\n                                "
                                    )
                                  ]
                                )
                              ]
                            )
                          ])
                        ]
                      )
                    ]
                  }
                },
                {
                  key: "error",
                  fn: function(props) {
                    return [
                      _c("div", { staticClass: "fancy-alert" }, [
                        _vm._v(" " + _vm._s(props.error.error_message) + " ")
                      ])
                    ]
                  }
                }
              ])
            })
          ],
          1
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c(
      "h2",
      { staticClass: "block-title text-center margin-bottom-2x" },
      [
        _vm._v("\n            Instagram\n            "),
        _c("small", [_vm._v(" Get Inspired With Our ")])
      ]
    )
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-4043c5ae", module.exports)
  }
}

/***/ }),

/***/ 3:
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(4)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ 4:
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })

/******/ });