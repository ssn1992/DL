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
/******/ 	return __webpack_require__(__webpack_require__.s = 269);
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

/***/ 269:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(270);


/***/ }),

/***/ 270:
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

/**
 * Categories Component instance
 */
var sliderComponent = __webpack_require__(271);

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
    console.log("About started..");

    // Init Main slider
    _slider();

    // Slider component init
    sliderComponent.start();
  }
};

self.start();

/***/ }),

/***/ 271:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slider_vue__ = __webpack_require__(272);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Slider_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Slider_vue__);
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
var _slider = function _slider() {
  // Create all requested instances
  new Vue({
    el: '#slider-collections',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__Slider_vue___default.a]
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
    _slider();
  }
};

/***/ }),

/***/ 272:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(273)
/* template */
var __vue_template__ = __webpack_require__(274)
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
Component.options.__file = "resources/assets/js/components/sliders/about/requests/about/Slider.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-1e3a3cf0", Component.options)
  } else {
    hotAPI.reload("data-v-1e3a3cf0", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 273:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
        return {
            herigateImg: ['/img/about/collections-slider/heritage/1.jpg', '/img/about/collections-slider/heritage/2.jpg', '/img/about/collections-slider/heritage/3.jpg', '/img/about/collections-slider/heritage/4.jpg', '/img/about/collections-slider/heritage/5.jpg', '/img/about/collections-slider/heritage/6.jpg', '/img/about/collections-slider/heritage/7.jpg', '/img/about/collections-slider/heritage/8.jpg', '/img/about/collections-slider/heritage/9.jpg', '/img/about/collections-slider/heritage/10.jpg'],

            graphicImg: ['/img/about/collections-slider/graphic/1.jpg', '/img/about/collections-slider/graphic/2.jpg', '/img/about/collections-slider/graphic/3.jpg', '/img/about/collections-slider/graphic/4.jpg', '/img/about/collections-slider/graphic/5.jpg', '/img/about/collections-slider/graphic/6.jpg', '/img/about/collections-slider/graphic/7.jpg', '/img/about/collections-slider/graphic/8.jpg', '/img/about/collections-slider/graphic/9.jpg']
        };
    },


    methods: {},

    mounted: function mounted() {
        var _$$slick;

        $('.items-carousel').slick((_$$slick = {
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 9000,
            nextArrow: '<i class="slick-next fa fa-angle-right"></i>',
            prevArrow: '<i class="slick-prev fa fa-angle-left"></i>'
        }, _defineProperty(_$$slick, 'autoplay', true), _defineProperty(_$$slick, 'autoplaySpeed', 8000), _defineProperty(_$$slick, 'fade', true), _defineProperty(_$$slick, 'cssEase', 'linear'), _$$slick));
    }
});

/***/ }),

/***/ 274:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container", attrs: { id: "sliders" } }, [
    _c("div", { staticClass: "row collections-block" }, [
      _c(
        "div",
        {
          staticClass: "col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x"
        },
        [
          _c("h4", { staticClass: "block-title text-center" }, [
            _vm._v("\n                OUR COLLECTIONS\n            ")
          ]),
          _vm._v(" "),
          _c(
            "div",
            {
              staticClass:
                "col-lg-12 col-md-12 col-sm-12 col-xs-12 padding-top-2x text-center "
            },
            [
              _c(
                "div",
                {
                  staticClass:
                    "col-lg-offset-2 col-lg-4 col-md-6 col-sm-12 col-xs-12"
                },
                [
                  _c(
                    "div",
                    { staticClass: "items-carousel" },
                    _vm._l(_vm.herigateImg, function(image) {
                      return _c("div", { staticClass: "slider" }, [
                        _c("img", { attrs: { src: image } })
                      ])
                    })
                  ),
                  _vm._v(" "),
                  _c("h6", { staticClass: "padding-top-1x" }, [
                    _vm._v(
                      "\n                        HERITAGE\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v(
                      "\n                        Heritage, is full of a broad selection of high quality lighting\n                        designs, versatile enough for many types of atmospheres and\n                        spaces. Heritage assorted 30’s, 40’s and 50’s Soul and Jazz\n                        inspired lamps takes on the legacy of – WISDOM – of men\n                        who craft with their own hands.\n                    "
                    )
                  ])
                ]
              ),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "col-lg-4 col-md-6 col-sm-12 col-xs-12" },
                [
                  _c(
                    "div",
                    { staticClass: "items-carousel" },
                    _vm._l(_vm.graphicImg, function(image) {
                      return _c("div", { staticClass: "slider" }, [
                        _c("img", { attrs: { src: image } })
                      ])
                    })
                  ),
                  _vm._v(" "),
                  _c("h6", { staticClass: "padding-top-1x" }, [
                    _vm._v(
                      "\n                        GRAPHIC\n                    "
                    )
                  ]),
                  _vm._v(" "),
                  _c("p", [
                    _vm._v(
                      "\n                        Non-conventional and juicy: here they are, the colorful and\n                        extremely communicative graphic lamps made for Delightfull’s\n                        new collection. Ideal for hotels and clubs, these floor, table\n                        and wall fixtures will revolutionize the lighting concepts,\n                        arriving in form of letters, numbers or symbols.\n                    "
                    )
                  ])
                ]
              )
            ]
          )
        ]
      )
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-1e3a3cf0", module.exports)
  }
}

/***/ })

/******/ });