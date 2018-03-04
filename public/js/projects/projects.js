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
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ({

/***/ 2:
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
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

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(66);


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

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
 * Form Component instance
 */
var formsComponent = __webpack_require__(67);

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
    console.log("Project area started..");

    // Instagram component init
    formsComponent.start();
  }
};

self.start();

/***/ }),

/***/ 67:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Forms_vue__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Forms_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Forms_vue__);
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
 * Forms Instance
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
    el: '#forms',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__Forms_vue___default.a],

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

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(2)
/* script */
var __vue_script__ = __webpack_require__(69)
/* template */
var __vue_template__ = __webpack_require__(71)
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/assets/js/components/forms/Forms.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key.substr(0, 2) !== "__"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Forms.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-ca7087ba", Component.options)
  } else {
    hotAPI.reload("data-v-ca7087ba", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vee_validate__ = __webpack_require__(70);
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

// VeeValidate import

Vue.use(__WEBPACK_IMPORTED_MODULE_0_vee_validate__["a" /* default */]);

/* harmony default export */ __webpack_exports__["default"] = ({
    data: function data() {
        return {
            validateForm: 'none',
            payload: {
                projectName: {
                    fieldType: 'text-field',
                    label: 'Name',
                    value: 'projectName',
                    rules: 'required',
                    post: null
                },
                projectImage: {
                    fieldType: 'text-field',
                    label: 'Image',
                    value: 'projectImage',
                    rules: 'required',
                    post: null
                }
            }
        };
    },


    methods: {
        validateBeforeSubmit: function validateBeforeSubmit(request) {
            var _this = this;

            console.log('validator');
            this.$validator.validateAll().then(function (result) {
                if (result) {
                    var payload = {};

                    Object.keys(request).forEach(function (value) {
                        payload[value] = request[value].post;
                    });

                    _this.addProject(payload);

                    console.log(payload);
                    console.log('Form Submitted!');
                } else {
                    _this.validateForm = null;
                    console.log('Correct them errors!');
                }
            });
        },
        addProject: function addProject(payload) {
            var formData = new FormData();
            formData.append('image', this.payload.projectImage);

            console.log(payload);

            // Send a POST request
            axios({
                method: 'post',
                url: 'add-project',
                data: formData
            }).then(function (response) {}).catch(function (error) {});
        }
    },

    mounted: function mounted() {
        var instance = this;
        // Send a POST request
        axios.post('get-example').then(function (response) {
            console.log('success');
            console.log(response.data.example.value);

            // Update Instance Data
            instance.transVue = response.data.example.value;
        }).catch(function (error) {
            // Update Instance Data with error
            console.log('error');
        });
    }
});

/***/ }),

/***/ 70:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export install */
/* unused harmony export use */
/* unused harmony export mapFields */
/* unused harmony export Validator */
/* unused harmony export ErrorBag */
/* unused harmony export Rules */
/* unused harmony export version */
/**
 * vee-validate v2.0.0-rc.19
 * (c) 2017 Abdelrahman Awad
 * @license MIT
 */
/**
 * Gets the data attribute. the name must be kebab-case.
 */
var getDataAttribute = function (el, name) { return el.getAttribute(("data-vv-" + name)); };

/**
 * Checks if the value is either null or undefined.
 * @param {*} value
 */
var isNullOrUndefined = function (value) {
  return value === null || value === undefined;
};

/**
 * Sets the data attribute.
 * @param {*} el
 * @param {String} name
 * @param {String} value
 */
var setDataAttribute = function (el, name, value) { return el.setAttribute(("data-vv-" + name), value); };

var createProxy = function (target, handler) {
  if (typeof Proxy === 'undefined') {
    return target;
  }

  return new Proxy(target, handler);
};

var createFlags = function () { return ({
  untouched: true,
  touched: false,
  dirty: false,
  pristine: true,
  valid: null,
  invalid: null,
  validated: false,
  pending: false,
  required: false
}); };

/**
 * Shallow object comparison.
 *
 * @param {*} lhs
 * @param {*} rhs
 * @return {Boolean}
 */
var isEqual = function (lhs, rhs) {
  if (lhs instanceof RegExp && rhs instanceof RegExp) {
    return isEqual(lhs.source, rhs.source) && isEqual(lhs.flags, rhs.flags);
  }

  if (Array.isArray(lhs) && Array.isArray(rhs)) {
    if (lhs.length !== rhs.length) { return false; }

    for (var i = 0; i < lhs.length; i++) {
      if (!isEqual(lhs[i], rhs[i])) {
        return false;
      }
    }

    return true;
  }

  // if both are objects, compare each key recursively.
  if (isObject(lhs) && isObject(rhs)) {
    return Object.keys(lhs).every(function (key) {
      return isEqual(lhs[key], rhs[key]);
    }) && Object.keys(rhs).every(function (key) {
      return isEqual(lhs[key], rhs[key]);
    });
  }

  return lhs === rhs;
};

/**
 * Determines the input field scope.
 */
var getScope = function (el) {
  var scope = getDataAttribute(el, 'scope');
  if (isNullOrUndefined(scope) && el.form) {
    scope = getDataAttribute(el.form, 'scope');
  }

  return !isNullOrUndefined(scope) ? scope : null;
};

/**
 * Gets the value in an object safely.
 * @param {String} propPath
 * @param {Object} target
 * @param {*} def
 */
var getPath = function (propPath, target, def) {
  if ( def === void 0 ) def = undefined;

  if (!propPath || !target) { return def; }
  var value = target;
  propPath.split('.').every(function (prop) {
    if (! Object.prototype.hasOwnProperty.call(value, prop) && value[prop] === undefined) {
      value = def;

      return false;
    }

    value = value[prop];

    return true;
  });

  return value;
};

/**
 * Checks if path exists within an object.
 *
 * @param {String} path
 * @param {Object} target
 */
var hasPath = function (path, target) {
  var obj = target;
  return path.split('.').every(function (prop) {
    if (! Object.prototype.hasOwnProperty.call(obj, prop)) {
      return false;
    }

    obj = obj[prop];

    return true;
  });
};

/**
 * @param {String} rule
 */
var parseRule = function (rule) {
  var params = [];
  var name = rule.split(':')[0];

  if (~rule.indexOf(':')) {
    params = rule.split(':').slice(1).join(':').split(',');
  }

  return { name: name, params: params };
};

/**
 * Normalizes the given rules expression.
 *
 * @param {Object|String} rules
 */
var normalizeRules = function (rules) {
  // if falsy value return an empty object.
  if (!rules) {
    return {};
  }

  var validations = {};
  if (isObject(rules)) {
    Object.keys(rules).forEach(function (rule) {
      var params = [];
      if (rules[rule] === true) {
        params = [];
      } else if (Array.isArray(rules[rule])) {
        params = rules[rule];
      } else {
        params = [rules[rule]];
      }

      if (rules[rule] !== false) {
        validations[rule] = params;
      }
    });

    return validations;
  }

  if (typeof rules !== 'string') {
    warn('rules must be either a string or an object.');
    return {};
  }

  rules.split('|').forEach(function (rule) {
    var parsedRule = parseRule(rule);
    if (! parsedRule.name) {
      return;
    }

    validations[parsedRule.name] = parsedRule.params;
  });

  return validations;
};

/**
 * Debounces a function.
 */
var debounce = function (fn, wait, immediate) {
  if ( wait === void 0 ) wait = 0;
  if ( immediate === void 0 ) immediate = false;

  if (wait === 0) {
    return fn;
  }

  var timeout;

  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var later = function () {
      timeout = null;
      if (!immediate) { fn.apply(void 0, args); }
    };
    /* istanbul ignore next */
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    /* istanbul ignore next */
    if (callNow) { fn.apply(void 0, args); }
  };
};

/**
 * Emits a warning to the console.
 */
var warn = function (message) {
  console.warn(("[vee-validate] " + message)); // eslint-disable-line
};

/**
 * Creates a branded error object.
 * @param {String} message
 */
var createError = function (message) { return new Error(("[vee-validate] " + message)); };

/**
 * Checks if the value is an object.
 */
var isObject = function (object) { return object !== null && object && typeof object === 'object' && ! Array.isArray(object); };

/**
 * Checks if a function is callable.
 */
var isCallable = function (func) { return typeof func === 'function'; };

/**
 * Check if element has the css class on it.
 */
var hasClass = function (el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }

  return !!el.className.match(new RegExp(("(\\s|^)" + className + "(\\s|$)")));
};

/**
 * Adds the provided css className to the element.
 */
var addClass = function (el, className) {
  if (el.classList) {
    el.classList.add(className);
    return;
  }

  if (!hasClass(el, className)) {
    el.className += " " + className;
  }
};

/**
 * Remove the provided css className from the element.
 */
var removeClass = function (el, className) {
  if (el.classList) {
    el.classList.remove(className);
    return;
  }

  if (hasClass(el, className)) {
    var reg = new RegExp(("(\\s|^)" + className + "(\\s|$)"));
    el.className = el.className.replace(reg, ' ');
  }
};

/**
 * Adds or removes a class name on the input depending on the status flag.
 */
var toggleClass = function (el, className, status) {
  if (!el || !className) { return; }

  if (status) {
    return addClass(el, className);
  }

  removeClass(el, className);
};

/**
 * Converts an array-like object to array.
 * Simple polyfill for Array.from
 */
var toArray = function (arrayLike) {
  if (isCallable(Array.from)) {
    return Array.from(arrayLike);
  }

  var array = [];
  var length = arrayLike.length;
  for (var i = 0; i < length; i++) {
    array.push(arrayLike[i]);
  }

  return array;
};

/**
 * Assign polyfill from the mdn.
 * @param {Object} target
 * @return {Object}
 */
var assign = function (target) {
  var others = [], len = arguments.length - 1;
  while ( len-- > 0 ) others[ len ] = arguments[ len + 1 ];

  /* istanbul ignore else */
  if (isCallable(Object.assign)) {
    return Object.assign.apply(Object, [ target ].concat( others ));
  }

  /* istanbul ignore next */
  if (target == null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  /* istanbul ignore next */
  var to = Object(target);
  /* istanbul ignore next */
  others.forEach(function (arg) {
    // Skip over if undefined or null
    if (arg != null) {
      Object.keys(arg).forEach(function (key) {
        to[key] = arg[key];
      });
    }
  });
  /* istanbul ignore next */
  return to;
};

/**
 * Generates a unique id.
 * @return {String}
 */
var uniqId = function () { return ("_" + (Math.random().toString(36).substr(2, 9))); };

/**
 * polyfills array.find
 * @param {Array} array
 * @param {Function} predicate
 */
var find = function (array, predicate) {
  if (isObject(array)) {
    array = toArray(array);
  }
  if (array.find) {
    return array.find(predicate);
  }
  var result;
  array.some(function (item) {
    if (predicate(item)) {
      result = item;
      return true;
    }

    return false;
  });

  return result;
};

var getInputEventName = function (el) {
  if (el && (el.tagName === 'SELECT' || ~['radio', 'checkbox', 'file'].indexOf(el.type))) {
    return 'change';
  }

  return 'input';
};

var ErrorBag = function ErrorBag () {
  this.items = [];
};

/**
   * Adds an error to the internal array.
   *
   * @param {Object} error The error object.
   */
ErrorBag.prototype.add = function add (error) {
  // handle old signature.
  if (arguments.length > 1) {
    error = {
      field: arguments[0],
      msg: arguments[1],
      rule: arguments[2],
      scope: !isNullOrUndefined(arguments[3]) ? arguments[3] : null
    };
  }

  error.scope = !isNullOrUndefined(error.scope) ? error.scope : null;
  this.items.push(error);
};

/**
 * Updates a field error with the new field scope.
 *
 * @param {String} id
 * @param {Object} error
 */
ErrorBag.prototype.update = function update (id, error) {
  var item = find(this.items, function (i) { return i.id === id; });
  if (!item) {
    return;
  }

  var idx = this.items.indexOf(item);
  this.items.splice(idx, 1);
  item.scope = error.scope;
  this.items.push(item);
};

/**
   * Gets all error messages from the internal array.
   *
   * @param {String} scope The Scope name, optional.
   * @return {Array} errors Array of all error messages.
   */
ErrorBag.prototype.all = function all (scope) {
  if (isNullOrUndefined(scope)) {
    return this.items.map(function (e) { return e.msg; });
  }

  return this.items.filter(function (e) { return e.scope === scope; }).map(function (e) { return e.msg; });
};

/**
   * Checks if there are any errors in the internal array.
   * @param {String} scope The Scope name, optional.
   * @return {boolean} result True if there was at least one error, false otherwise.
   */
ErrorBag.prototype.any = function any (scope) {
  if (isNullOrUndefined(scope)) {
    return !! this.items.length;
  }

  return !! this.items.filter(function (e) { return e.scope === scope; }).length;
};

/**
   * Removes all items from the internal array.
   *
   * @param {String} scope The Scope name, optional.
   */
ErrorBag.prototype.clear = function clear (scope) {
    var this$1 = this;

  if (isNullOrUndefined(scope)) {
    scope = null;
  }

  var removeCondition = function (e) { return e.scope === scope; };

  for (var i = 0; i < this.items.length; ++i) {
    if (removeCondition(this$1.items[i])) {
      this$1.items.splice(i, 1);
      --i;
    }
  }
};

/**
   * Collects errors into groups or for a specific field.
   *
   * @param{string} field The field name.
   * @param{string} scope The scope name.
   * @param {Boolean} map If it should map the errors to strings instead of objects.
   * @return {Array} errors The errors for the specified field.
   */
ErrorBag.prototype.collect = function collect (field, scope, map) {
    if ( map === void 0 ) map = true;

  if (! field) {
    var collection = {};
    this.items.forEach(function (e) {
      if (! collection[e.field]) {
        collection[e.field] = [];
      }

      collection[e.field].push(map ? e.msg : e);
    });

    return collection;
  }

  field = !isNullOrUndefined(field) ? String(field) : field;
  if (isNullOrUndefined(scope)) {
    return this.items.filter(function (e) { return e.field === field; }).map(function (e) { return (map ? e.msg : e); });
  }

  return this.items.filter(function (e) { return e.field === field && e.scope === scope; })
    .map(function (e) { return (map ? e.msg : e); });
};
/**
   * Gets the internal array length.
   *
   * @return {Number} length The internal array length.
   */
ErrorBag.prototype.count = function count () {
  return this.items.length;
};

/**
 * Finds and fetches the first error message for the specified field id.
 *
 * @param {String} id
 */
ErrorBag.prototype.firstById = function firstById (id) {
  var error = find(this.items, function (i) { return i.id === id; });

  return error ? error.msg : null;
};

/**
   * Gets the first error message for a specific field.
   *
   * @param{String} field The field name.
   * @return {String|null} message The error message.
   */
ErrorBag.prototype.first = function first (field, scope) {
    var this$1 = this;
    if ( scope === void 0 ) scope = null;

  field = !isNullOrUndefined(field) ? String(field) : field;
  var selector = this._selector(field);
  var scoped = this._scope(field);

  if (scoped) {
    var result = this.first(scoped.name, scoped.scope);
    // if such result exist, return it. otherwise it could be a field.
    // with dot in its name.
    if (result) {
      return result;
    }
  }

  if (selector) {
    return this.firstByRule(selector.name, selector.rule, scope);
  }

  for (var i = 0; i < this.items.length; ++i) {
    if (this$1.items[i].field === field && (this$1.items[i].scope === scope)) {
      return this$1.items[i].msg;
    }
  }

  return null;
};

/**
   * Returns the first error rule for the specified field
   *
   * @param {string} field The specified field.
   * @return {string|null} First error rule on the specified field if one is found, otherwise null
   */
ErrorBag.prototype.firstRule = function firstRule (field, scope) {
  var errors = this.collect(field, scope, false);

  return (errors.length && errors[0].rule) || null;
};

/**
   * Checks if the internal array has at least one error for the specified field.
   *
   * @param{string} field The specified field.
   * @return {Boolean} result True if at least one error is found, false otherwise.
   */
ErrorBag.prototype.has = function has (field, scope) {
    if ( scope === void 0 ) scope = null;

  return !! this.first(field, scope);
};

/**
   * Gets the first error message for a specific field and a rule.
   * @param {String} name The name of the field.
   * @param {String} rule The name of the rule.
   * @param {String} scope The name of the scope (optional).
   */
ErrorBag.prototype.firstByRule = function firstByRule (name, rule, scope) {
  var error = this.collect(name, scope, false).filter(function (e) { return e.rule === rule; })[0];

  return (error && error.msg) || null;
};
/**
   * Gets the first error message for a specific field that not match the rule.
   * @param {String} name The name of the field.
   * @param {String} rule The name of the rule.
   * @param {String} scope The name of the scope (optional).
   */
ErrorBag.prototype.firstNot = function firstNot (name, rule, scope) {
    if ( rule === void 0 ) rule = 'required';

  var error = this.collect(name, scope, false).filter(function (e) { return e.rule !== rule; })[0];

  return (error && error.msg) || null;
};

/**
 * Removes errors by matching against the id.
 * @param {String} id
 */
ErrorBag.prototype.removeById = function removeById (id) {
    var this$1 = this;

  for (var i = 0; i < this.items.length; ++i) {
    if (this$1.items[i].id === id) {
      this$1.items.splice(i, 1);
      --i;
    }
  }
};

/**
   * Removes all error messages associated with a specific field.
   *
   * @param{String} field The field which messages are to be removed.
   * @param {String} scope The Scope name, optional.
   * @param {String} id The field id, optional.
   */
ErrorBag.prototype.remove = function remove (field, scope, id) {
    var this$1 = this;

  field = !isNullOrUndefined(field) ? String(field) : field;
  var removeCondition = function (e) {
    if (e.id && id) {
      return e.id === id;
    }

    if (!isNullOrUndefined(scope)) {
      return e.field === field && e.scope === scope;
    }

    return e.field === field && e.scope === null;
  };

  for (var i = 0; i < this.items.length; ++i) {
    if (removeCondition(this$1.items[i])) {
      this$1.items.splice(i, 1);
      --i;
    }
  }
};

/**
   * Get the field attributes if there's a rule selector.
   *
   * @param{String} field The specified field.
   * @return {Object|null}
   */
ErrorBag.prototype._selector = function _selector (field) {
  if (field.indexOf(':') > -1) {
    var ref = field.split(':');
      var name = ref[0];
      var rule = ref[1];

    return { name: name, rule: rule };
  }

  return null;
};

/**
   * Get the field scope if specified using dot notation.
   *
   * @param {String} field the specifie field.
   * @return {Object|null}
   */
ErrorBag.prototype._scope = function _scope (field) {
  if (field.indexOf('.') > -1) {
    var ref = field.split('.');
      var scope = ref[0];
      var name = ref.slice(1);

    return { name: name.join('.'), scope: scope };
  }

  return null;
};

var Dictionary = function Dictionary (dictionary) {
  if ( dictionary === void 0 ) dictionary = {};

  this.container = {};
  this.merge(dictionary);
};

Dictionary.prototype.hasLocale = function hasLocale (locale) {
  return !! this.container[locale];
};

Dictionary.prototype.setDateFormat = function setDateFormat (locale, format) {
  if (!this.container[locale]) {
    this.container[locale] = {};
  }

  this.container[locale].dateFormat = format;
};

Dictionary.prototype.getDateFormat = function getDateFormat (locale) {
  if (!this.container[locale]) {
    return undefined;
  }

  return this.container[locale].dateFormat;
};

Dictionary.prototype.getMessage = function getMessage (locale, key, fallback) {
  if (! this.hasMessage(locale, key)) {
    return fallback || this._getDefaultMessage(locale);
  }

  return this.container[locale].messages[key];
};

/**
 * Gets a specific message for field. fallsback to the rule message.
 *
 * @param {String} locale
 * @param {String} field
 * @param {String} key
 */
Dictionary.prototype.getFieldMessage = function getFieldMessage (locale, field, key) {
  if (! this.hasLocale(locale)) {
    return this.getMessage(locale, key);
  }

  var dict = this.container[locale].custom && this.container[locale].custom[field];
  if (! dict || ! dict[key]) {
    return this.getMessage(locale, key);
  }

  return dict[key];
};

Dictionary.prototype._getDefaultMessage = function _getDefaultMessage (locale) {
  if (this.hasMessage(locale, '_default')) {
    return this.container[locale].messages._default;
  }

  return this.container.en.messages._default;
};

Dictionary.prototype.getAttribute = function getAttribute (locale, key, fallback) {
    if ( fallback === void 0 ) fallback = '';

  if (! this.hasAttribute(locale, key)) {
    return fallback;
  }

  return this.container[locale].attributes[key];
};

Dictionary.prototype.hasMessage = function hasMessage (locale, key) {
  return !! (
    this.hasLocale(locale) &&
          this.container[locale].messages &&
          this.container[locale].messages[key]
  );
};

Dictionary.prototype.hasAttribute = function hasAttribute (locale, key) {
  return !! (
    this.hasLocale(locale) &&
          this.container[locale].attributes &&
          this.container[locale].attributes[key]
  );
};

Dictionary.prototype.merge = function merge (dictionary) {
  this._merge(this.container, dictionary);
};

Dictionary.prototype.setMessage = function setMessage (locale, key, message) {
  if (! this.hasLocale(locale)) {
    this.container[locale] = {
      messages: {},
      attributes: {}
    };
  }

  this.container[locale].messages[key] = message;
};

Dictionary.prototype.setAttribute = function setAttribute (locale, key, attribute) {
  if (! this.hasLocale(locale)) {
    this.container[locale] = {
      messages: {},
      attributes: {}
    };
  }

  this.container[locale].attributes[key] = attribute;
};

Dictionary.prototype._merge = function _merge (target, source) {
    var this$1 = this;

  if (! (isObject(target) && isObject(source))) {
    return target;
  }

  Object.keys(source).forEach(function (key) {
    if (isObject(source[key])) {
      if (! target[key]) {
        assign(target, ( obj = {}, obj[key] = {}, obj ));
          var obj;
      }

      this$1._merge(target[key], source[key]);
      return;
    }

    assign(target, ( obj$1 = {}, obj$1[key] = source[key], obj$1 ));
      var obj$1;
  });

  return target;
};

/**
 * Generates the options required to construct a field.
 */
var Generator = function Generator () {};

Generator.generate = function generate (el, binding, vnode, options) {
    if ( options === void 0 ) options = {};

  var model = Generator.resolveModel(binding, vnode);

  return {
    name: Generator.resolveName(el, vnode),
    el: el,
    listen: !binding.modifiers.disable,
    scope: Generator.resolveScope(el, binding, vnode),
    vm: Generator.makeVM(vnode.context),
    expression: binding.value,
    component: vnode.child,
    classes: options.classes,
    classNames: options.classNames,
    getter: Generator.resolveGetter(el, vnode, model),
    events: Generator.resolveEvents(el, vnode) || options.events,
    model: model,
    delay: Generator.resolveDelay(el, vnode, options),
    rules: Generator.resolveRules(el, binding),
    initial: !!binding.modifiers.initial,
    alias: Generator.resolveAlias(el, vnode),
    validity: options.validity,
    aria: options.aria,
    initialValue: Generator.resolveInitialValue(vnode)
  };
};

Generator.getCtorConfig = function getCtorConfig (vnode) {
  if (!vnode.child) { return null; }

  var config = getPath('child.$options.$_veeValidate', vnode);

  return config;
};

/**
 *
 * @param {*} el
 * @param {*} binding
 */
Generator.resolveRules = function resolveRules (el, binding) {
  if (!binding || !binding.expression) {
    return getDataAttribute(el, 'rules');
  }

  if (typeof binding.value === 'string') {
    return binding.value;
  }

  if (~['string', 'object'].indexOf(typeof binding.value.rules)) {
    return binding.value.rules;
  }

  return binding.value;
};

/**
 * @param {*} vnode
 */
Generator.resolveInitialValue = function resolveInitialValue (vnode) {
  var model = vnode.data.model || find(vnode.data.directives, function (d) { return d.name === 'model'; });

  return model && model.value;
};

/**
 * Creates a non-circular partial VM instance from a Vue instance.
 * @param {*} vm
 */
Generator.makeVM = function makeVM (vm) {
  return {
    get $el () {
      return vm.$el;
    },
    get $refs () {
      return vm.$refs;
    },
    $watch: vm.$watch ? vm.$watch.bind(vm) : function () {},
    $validator: vm.$validator ? {
      errors: vm.$validator.errors,
      validate: vm.$validator.validate.bind(vm.$validator),
      update: vm.$validator.update.bind(vm.$validator)
    } : null
  };
};

/**
 * Resolves the delay value.
 * @param {*} el
 * @param {*} vnode
 * @param {Object} options
 */
Generator.resolveDelay = function resolveDelay (el, vnode, options) {
    if ( options === void 0 ) options = {};

  return getDataAttribute(el, 'delay') || (vnode.child && vnode.child.$attrs && vnode.child.$attrs['data-vv-delay']) || options.delay;
};

/**
 * Resolves the alias for the field.
 * @param {*} el
 * @param {*} vnode
 * @return {Function} alias getter
 */
Generator.resolveAlias = function resolveAlias (el, vnode) {
  return function () { return getDataAttribute(el, 'as') || (vnode.child && vnode.child.$attrs && vnode.child.$attrs['data-vv-as']) || el.title || null; };
};

/**
 * Resolves the events to validate in response to.
 * @param {*} el
 * @param {*} vnode
 */
Generator.resolveEvents = function resolveEvents (el, vnode) {
  var events = getDataAttribute(el, 'validate-on');

  if (!events && vnode.child && vnode.child.$attrs) {
    events = vnode.child.$attrs['data-vv-validate-on'];
  }

  if (!events && vnode.child) {
    var config = Generator.getCtorConfig(vnode);
    events = config && config.events;
  }

  return events;
};

/**
 * Resolves the scope for the field.
 * @param {*} el
 * @param {*} binding
 */
Generator.resolveScope = function resolveScope (el, binding, vnode) {
    if ( vnode === void 0 ) vnode = {};

  var scope = null;
  if (isObject(binding.value)) {
    scope = binding.value.scope;
  }

  if (vnode.child && isNullOrUndefined(scope)) {
    scope = vnode.child.$attrs && vnode.child.$attrs['data-vv-scope'];
  }

  return !isNullOrUndefined(scope) ? scope : getScope(el);
};

/**
 * Checks if the node directives contains a v-model or a specified arg.
 * Args take priority over models.
 *
 * @return {Object}
 */
Generator.resolveModel = function resolveModel (binding, vnode) {
  if (binding.arg) {
    return binding.arg;
  }

  if (isObject(binding.value) && binding.value.arg) {
    return binding.value.arg;
  }

  var model = vnode.data.model || find(vnode.data.directives, function (d) { return d.name === 'model'; });
  if (!model) {
    return null;
  }

  var watchable = /^[a-z_]+[0-9]*(\w*\.[a-z_]\w*)*$/i.test(model.expression) && hasPath(model.expression, vnode.context);

  if (!watchable) {
    return null;
  }

  return model.expression;
};

/**
   * Resolves the field name to trigger validations.
   * @return {String} The field name.
   */
Generator.resolveName = function resolveName (el, vnode) {
  var name = getDataAttribute(el, 'name');

  if (!name && !vnode.child) {
    return el.name;
  }

  if (!name && vnode.child && vnode.child.$attrs) {
    name = vnode.child.$attrs['data-vv-name'] || vnode.child.$attrs['name'];
  }

  if (!name && vnode.child) {
    var config = Generator.getCtorConfig(vnode);
    if (config && isCallable(config.name)) {
      var boundGetter = config.name.bind(vnode.child);

      return boundGetter();
    }

    return vnode.child.name;
  }

  return name;
};

/**
 * Returns a value getter input type.
 */
Generator.resolveGetter = function resolveGetter (el, vnode, model) {
  if (model) {
    return function () {
      return getPath(model, vnode.context);
    };
  }

  if (vnode.child) {
    var path = getDataAttribute(el, 'value-path') || (vnode.child.$attrs && vnode.child.$attrs['data-vv-value-path']);
    if (path) {
      return function () {
        return getPath(path, vnode.child);
      };
    }

    var config = Generator.getCtorConfig(vnode);
    if (config && isCallable(config.value)) {
      var boundGetter = config.value.bind(vnode.child);

      return function () {
        return boundGetter();
      };
    }

    return function () {
      return vnode.child.value;
    };
  }

  switch (el.type) {
  case 'checkbox': return function () {
    var els = document.querySelectorAll(("input[name=\"" + (el.name) + "\"]"));

    els = toArray(els).filter(function (el) { return el.checked; });
    if (!els.length) { return undefined; }

    return els.map(function (checkbox) { return checkbox.value; });
  };
  case 'radio': return function () {
    var els = document.querySelectorAll(("input[name=\"" + (el.name) + "\"]"));
    var elm = find(els, function (el) { return el.checked; });

    return elm && elm.value;
  };
  case 'file': return function (context) {
    return toArray(el.files);
  };
  case 'select-multiple': return function () {
    return toArray(el.options).filter(function (opt) { return opt.selected; }).map(function (opt) { return opt.value; });
  };
  default: return function () {
    return el && el.value;
  };
  }
};

var DEFAULT_OPTIONS = {
  targetOf: null,
  initial: false,
  scope: null,
  listen: true,
  name: null,
  active: true,
  required: false,
  rules: {},
  vm: null,
  classes: false,
  validity: true,
  aria: true,
  events: 'input|blur',
  delay: 0,
  classNames: {
    touched: 'touched', // the control has been blurred
    untouched: 'untouched', // the control hasn't been blurred
    valid: 'valid', // model is valid
    invalid: 'invalid', // model is invalid
    pristine: 'pristine', // control has not been interacted with
    dirty: 'dirty' // control has been interacted with
  }
};

var Field = function Field (el, options) {
  if ( options === void 0 ) options = {};

  this.id = uniqId();
  this.el = el;
  this.updated = false;
  this.dependencies = [];
  this.watchers = [];
  this.events = [];
  this.rules = {};
  if (!this.isHeadless && !options.targetOf) {
    setDataAttribute(this.el, 'id', this.id); // cache field id if it is independent and has a root element.
  }
  options = assign({}, DEFAULT_OPTIONS, options);
  this.validity = options.validity;
  this.aria = options.aria;
  this.flags = createFlags();
  this.vm = options.vm;
  this.component = options.component;
  this.ctorConfig = this.component ? getPath('$options.$_veeValidate', this.component) : undefined;
  this.update(options);
  this.updated = false;
};

var prototypeAccessors$1 = { isVue: {},validator: {},isRequired: {},isDisabled: {},isHeadless: {},displayName: {},value: {},rejectsFalse: {} };

prototypeAccessors$1.isVue.get = function () {
  return !!this.component;
};

prototypeAccessors$1.validator.get = function () {
  if (!this.vm || !this.vm.$validator) {
    warn('No validator instance detected.');
    return { validate: function () {} };
  }

  return this.vm.$validator;
};

prototypeAccessors$1.isRequired.get = function () {
  return !!this.rules.required;
};

prototypeAccessors$1.isDisabled.get = function () {
  return (this.isVue && this.component.disabled) || (this.el && this.el.disabled);
};

prototypeAccessors$1.isHeadless.get = function () {
  return !this.el;
};

/**
 * Gets the display name (user-friendly name).
 * @return {String}
 */
prototypeAccessors$1.displayName.get = function () {
  return isCallable(this.alias) ? this.alias() : this.alias;
};

/**
 * Gets the input value.
 * @return {*}
 */
prototypeAccessors$1.value.get = function () {
  if (!isCallable(this.getter)) {
    return undefined;
  }

  return this.getter();
};

/**
 * If the field rejects false as a valid value for the required rule.
 */
prototypeAccessors$1.rejectsFalse.get = function () {
  if (this.isVue && this.ctorConfig) {
    return !!this.ctorConfig.rejectsFalse;
  }

  if (this.isHeadless) {
    return false;
  }

  return this.el.type === 'checkbox';
};

/**
 * Determines if the instance matches the options provided.
 * @param {Object} options The matching options.
 */
Field.prototype.matches = function matches (options) {
  if (options.id) {
    return this.id === options.id;
  }

  if (options.name === undefined && options.scope === undefined) {
    return true;
  }

  if (options.scope === undefined) {
    return this.name === options.name;
  }

  if (options.name === undefined) {
    return this.scope === options.scope;
  }

  return options.name === this.name && options.scope === this.scope;
};

/**
 *
 * @param {Object} options
 */
Field.prototype.update = function update (options) {
  this.targetOf = options.targetOf || null;
  this.initial = options.initial || this.initial || false;

  // update errors scope if the field scope was changed.
  if (this.updated && !isNullOrUndefined(options.scope) && options.scope !== this.scope && isCallable(this.validator.update)) {
    this.validator.update(this.id, { scope: options.scope });
  }
  this.scope = !isNullOrUndefined(options.scope) ? options.scope
    : !isNullOrUndefined(this.scope) ? this.scope : null;
  this.name = (!isNullOrUndefined(options.name) ? String(options.name) : options.name) || this.name || null;
  this.rules = options.rules !== undefined ? normalizeRules(options.rules) : this.rules;
  this.model = options.model || this.model;
  this.listen = options.listen !== undefined ? options.listen : this.listen;
  this.classes = options.classes || this.classes || false;
  this.classNames = options.classNames || this.classNames || DEFAULT_OPTIONS.classNames;
  this.alias = options.alias || this.alias;
  this.getter = isCallable(options.getter) ? options.getter : this.getter;
  this.delay = options.delay || this.delay || 0;
  this.events = typeof options.events === 'string' && options.events.length ? options.events.split('|') : this.events;
  this.updateDependencies();
  this.addActionListeners();

  // update required flag flags
  if (options.rules !== undefined) {
    this.flags.required = this.isRequired;
  }

  // validate if it was validated before and field was updated and there was a rules mutation.
  if (this.flags.validated && options.rules !== undefined && this.updated) {
    this.validator.validate(("#" + (this.id)));
  }

  this.updated = true;

  // no need to continue.
  if (this.isHeadless) {
    return;
  }

  this.updateClasses();
  this.addValueListeners();
  this.updateAriaAttrs();
};

/**
 * Resets field flags and errors.
 */
Field.prototype.reset = function reset () {
    var this$1 = this;

  var def = createFlags();
  Object.keys(this.flags).forEach(function (flag) {
    this$1.flags[flag] = def[flag];
  });

  this.addActionListeners();
  this.updateClasses();
  if (this.validator.errors && isCallable(this.validator.errors.removeById)) {
    this.validator.errors.removeById(this.id);
  }
};

/**
 * Sets the flags and their negated counterparts, and updates the classes and re-adds action listeners.
 * @param {Object} flags
 */
Field.prototype.setFlags = function setFlags (flags) {
    var this$1 = this;

  var negated = {
    pristine: 'dirty',
    dirty: 'pristine',
    valid: 'invalid',
    invalid: 'valid',
    touched: 'untouched',
    untouched: 'touched'
  };

  Object.keys(flags).forEach(function (flag) {
    this$1.flags[flag] = flags[flag];
    // if it has a negation and was not specified, set it as well.
    if (negated[flag] && flags[negated[flag]] === undefined) {
      this$1.flags[negated[flag]] = !flags[flag];
    }
  });

  if (
    flags.untouched !== undefined ||
    flags.touched !== undefined ||
    flags.dirty !== undefined ||
    flags.pristine !== undefined
  ) {
    this.addActionListeners();
  }
  this.updateClasses();
  this.updateAriaAttrs();
  this.updateCustomValidity();
};

/**
 * Determines if the field requires references to target fields.
*/
Field.prototype.updateDependencies = function updateDependencies () {
    var this$1 = this;

  // reset dependencies.
  this.dependencies.forEach(function (d) { return d.field.destroy(); });
  this.dependencies = [];

  // we get the selectors for each field.
  var fields = Object.keys(this.rules).reduce(function (prev, r) {
    if (r === 'confirmed') {
      prev.push({ selector: this$1.rules[r][0] || ((this$1.name) + "_confirmation"), name: r });
    } else if (/after|before/.test(r)) {
      prev.push({ selector: this$1.rules[r][0], name: r });
    }

    return prev;
  }, []);

  if (!fields.length || !this.vm || !this.vm.$el) { return; }

  // must be contained within the same component, so we use the vm root element constrain our dom search.
  fields.forEach(function (ref) {
      var selector = ref.selector;
      var name = ref.name;

    var el = null;
    // vue ref selector.
    if (selector[0] === '$') {
      el = this$1.vm.$refs[selector.slice(1)];
    } else {
      try {
        // try query selector
        el = this$1.vm.$el.querySelector(selector);
      } catch (err) {
        el = null;
      }
    }

    if (!el) {
      try {
        el = this$1.vm.$el.querySelector(("input[name=\"" + selector + "\"]"));
      } catch (err) {
        el = null;
      }
    }

    if (!el) {
      return;
    }

    var options = {
      vm: this$1.vm,
      classes: this$1.classes,
      classNames: this$1.classNames,
      delay: this$1.delay,
      scope: this$1.scope,
      events: this$1.events.join('|'),
      initial: this$1.initial,
      targetOf: this$1.id
    };

    // probably a component.
    if (isCallable(el.$watch)) {
      options.component = el;
      options.el = el.$el;
      options.alias = Generator.resolveAlias(el.$el, { child: el });
      options.getter = Generator.resolveGetter(el.$el, { child: el });
    } else {
      options.el = el;
      options.alias = Generator.resolveAlias(el, {});
      options.getter = Generator.resolveGetter(el, {});
    }

    this$1.dependencies.push({ name: name, field: new Field(options.el, options) });
  });
};

/**
 * Removes listeners.
 * @param {RegExp} tag
 */
Field.prototype.unwatch = function unwatch (tag) {
    if ( tag === void 0 ) tag = null;

  if (!tag) {
    this.watchers.forEach(function (w) { return w.unwatch(); });
    this.watchers = [];
    return;
  }
  this.watchers.filter(function (w) { return tag.test(w.tag); }).forEach(function (w) { return w.unwatch(); });
  this.watchers = this.watchers.filter(function (w) { return !tag.test(w.tag); });
};

/**
 * Updates the element classes depending on each field flag status.
 */
Field.prototype.updateClasses = function updateClasses () {
  if (!this.classes) { return; }

  toggleClass(this.el, this.classNames.dirty, this.flags.dirty);
  toggleClass(this.el, this.classNames.pristine, this.flags.pristine);
  toggleClass(this.el, this.classNames.valid, !!this.flags.valid);
  toggleClass(this.el, this.classNames.invalid, !!this.flags.invalid);
  toggleClass(this.el, this.classNames.touched, this.flags.touched);
  toggleClass(this.el, this.classNames.untouched, this.flags.untouched);
};

/**
 * Adds the listeners required for automatic classes and some flags.
 */
Field.prototype.addActionListeners = function addActionListeners () {
    var this$1 = this;

  // remove previous listeners.
  this.unwatch(/class/);

  var onBlur = function () {
    this$1.flags.touched = true;
    this$1.flags.untouched = false;
    if (this$1.classes) {
      toggleClass(this$1.el, this$1.classNames.touched, true);
      toggleClass(this$1.el, this$1.classNames.untouched, false);
    }

    // only needed once.
    this$1.unwatch(/^class_blur$/);
  };

  var inputEvent = getInputEventName(this.el);
  var onInput = function () {
    this$1.flags.dirty = true;
    this$1.flags.pristine = false;
    if (this$1.classes) {
      toggleClass(this$1.el, this$1.classNames.pristine, false);
      toggleClass(this$1.el, this$1.classNames.dirty, true);
    }

    // only needed once.
    this$1.unwatch(/^class_input$/);
  };

  if (this.isVue && isCallable(this.component.$once)) {
    this.component.$once('input', onInput);
    this.component.$once('blur', onBlur);
    this.watchers.push({
      tag: 'class_input',
      unwatch: function () {
        this$1.component.$off('input', onInput);
      }
    });
    this.watchers.push({
      tag: 'class_blur',
      unwatch: function () {
        this$1.component.$off('blur', onBlur);
      }
    });
    return;
  }

  if (this.isHeadless) { return; }

  this.el.addEventListener(inputEvent, onInput);
  // Checkboxes and radio buttons on Mac don't emit blur naturally, so we listen on click instead.
  var blurEvent = ['radio', 'checkbox'].indexOf(this.el.type) === -1 ? 'blur' : 'click';
  this.el.addEventListener(blurEvent, onBlur);
  this.watchers.push({
    tag: 'class_input',
    unwatch: function () {
      this$1.el.removeEventListener(inputEvent, onInput);
    }
  });

  this.watchers.push({
    tag: 'class_blur',
    unwatch: function () {
      this$1.el.removeEventListener(blurEvent, onBlur);
    }
  });
};

/**
 * Adds the listeners required for validation.
 */
Field.prototype.addValueListeners = function addValueListeners () {
    var this$1 = this;

  this.unwatch(/^input_.+/);
  if (!this.listen) { return; }

  var fn = this.targetOf ? function () {
    this$1.validator.validate(("#" + (this$1.targetOf)));
  } : function () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    // if its a DOM event, resolve the value, otherwise use the first parameter as the value.
    if (args.length === 0 || (isCallable(Event) && args[0] instanceof Event) || (args[0] && args[0].srcElement)) {
      args[0] = this$1.value;
    }
    this$1.validator.validate(("#" + (this$1.id)), args[0]);
  };

  var validate = debounce(fn, this.delay);
  var inputEvent = getInputEventName(this.el);
  // replace input event with suitable one.
  var events = this.events.map(function (e) {
    return e === 'input' ? inputEvent : e;
  });

  // if there is a watchable model and an on input validation is requested.
  if (this.model && events.indexOf(inputEvent) !== -1) {
    var unwatch = this.vm.$watch(this.model, validate);
    this.watchers.push({
      tag: 'input_model',
      unwatch: unwatch
    });
    // filter out input event as it is already handled by the watcher API.
    events = events.filter(function (e) { return e !== inputEvent; });
  }

  // Add events.
  events.forEach(function (e) {
    if (this$1.isVue) {
      this$1.component.$on(e, validate);
      this$1.watchers.push({
        tag: 'input_vue',
        unwatch: function () {
          this$1.component.$off(e, validate);
        }
      });
      return;
    }

    if (~['radio', 'checkbox'].indexOf(this$1.el.type)) {
      var els = document.querySelectorAll(("input[name=\"" + (this$1.el.name) + "\"]"));
      toArray(els).forEach(function (el) {
        el.addEventListener(e, validate);
        this$1.watchers.push({
          tag: 'input_native',
          unwatch: function () {
            el.removeEventListener(e, validate);
          }
        });
      });

      return;
    }

    this$1.el.addEventListener(e, validate);
    this$1.watchers.push({
      tag: 'input_native',
      unwatch: function () {
        this$1.el.removeEventListener(e, validate);
      }
    });
  });
};

/**
 * Updates aria attributes on the element.
 */
Field.prototype.updateAriaAttrs = function updateAriaAttrs () {
  if (!this.aria || this.isHeadless || !isCallable(this.el.setAttribute)) { return; }

  this.el.setAttribute('aria-required', this.isRequired ? 'true' : 'false');
  this.el.setAttribute('aria-invalid', this.flags.invalid ? 'true' : 'false');
};

/**
 * Updates the custom validity for the field.
 */
Field.prototype.updateCustomValidity = function updateCustomValidity () {
  if (!this.validity || this.isHeadless || !isCallable(this.el.setCustomValidity)) { return; }

  this.el.setCustomValidity(this.flags.valid ? '' : (this.validator.errors.firstById(this.id) || ''));
};

/**
 * Removes all listeners.
 */
Field.prototype.destroy = function destroy () {
  this.watchers.forEach(function (w) { return w.unwatch(); });
  this.watchers = [];
  this.dependencies.forEach(function (d) { return d.field.destroy(); });
  this.dependencies = [];
};

Object.defineProperties( Field.prototype, prototypeAccessors$1 );

var FieldBag = function FieldBag () {
  this.items = [];
};

var prototypeAccessors$2 = { length: {} };

/**
 * @return {Number} The current collection length.
 */
prototypeAccessors$2.length.get = function () {
  return this.items.length;
};

/**
 * Finds the first field that matches the provided matcher object.
 * @param {Object} matcher
 * @return {Field|undefined} The first matching item.
 */
FieldBag.prototype.find = function find$1 (matcher) {
  return find(this.items, function (item) { return item.matches(matcher); });
};

/**
 * @param {Object|Array} matcher
 * @return {Array} Array of matching field items.
 */
FieldBag.prototype.filter = function filter (matcher) {
  // multiple matchers to be tried.
  if (Array.isArray(matcher)) {
    return this.items.filter(function (item) { return matcher.some(function (m) { return item.matches(m); }); });
  }

  return this.items.filter(function (item) { return item.matches(matcher); });
};

/**
 * Maps the field items using the mapping function.
 *
 * @param {Function} mapper
 */
FieldBag.prototype.map = function map (mapper) {
  return this.items.map(mapper);
};

/**
 * Finds and removes the first field that matches the provided matcher object, returns the removed item.
 * @param {Object|Field} matcher
 * @return {Field|null}
 */
FieldBag.prototype.remove = function remove (matcher) {
  var item = null;
  if (matcher instanceof Field) {
    item = matcher;
  } else {
    item = this.find(matcher);
  }

  if (!item) { return null; }

  var index = this.items.indexOf(item);
  this.items.splice(index, 1);

  return item;
};

/**
 * Adds a field item to the list.
 *
 * @param {Field} item
 */
FieldBag.prototype.push = function push (item) {
  if (! (item instanceof Field)) {
    throw createError('FieldBag only accepts instances of Field that has an id defined.');
  }

  if (!item.id) {
    throw createError('Field id must be defined.');
  }

  if (this.find({ id: item.id })) {
    throw createError(("Field with id " + (item.id) + " is already added."));
  }

  this.items.push(item);
};

Object.defineProperties( FieldBag.prototype, prototypeAccessors$2 );

var RULES = {};
var LOCALE = 'en';
var STRICT_MODE = true;
var DICTIONARY = new Dictionary({
  en: {
    messages: {},
    attributes: {},
    custom: {}
  }
});

var Validator = function Validator (validations, options) {
  var this$1 = this;
  if ( options === void 0 ) options = { vm: null, fastExit: true };

  this.strict = STRICT_MODE;
  this.errors = new ErrorBag();
  this.fields = new FieldBag();
  this.flags = {};
  this._createFields(validations);
  this.paused = false;
  this.fastExit = options.fastExit || false;
  this.ownerId = options.vm && options.vm._uid;
  // create it statically since we don't need constant access to the vm.
  this.reset = options.vm && isCallable(options.vm.$nextTick) ? function () {
    options.vm.$nextTick(function () {
      this$1.fields.items.forEach(function (i) { return i.reset(); });
      this$1.errors.clear();
    });
  } : function () {
    this$1.fields.items.forEach(function (i) { return i.reset(); });
    this$1.errors.clear();
  };
  /* istanbul ignore next */
  this.clean = function () {
    warn('validator.clean is marked for deprecation, please use validator.reset instead.');
    this$1.reset();
  };
};

var prototypeAccessors = { dictionary: {},locale: {},rules: {} };
var staticAccessors = { dictionary: {},locale: {},rules: {} };

/**
 * @return {Dictionary}
 */
prototypeAccessors.dictionary.get = function () {
  return DICTIONARY;
};

/**
 * @return {Dictionary}
 */
staticAccessors.dictionary.get = function () {
  return DICTIONARY;
};

/**
 * @return {String}
 */
prototypeAccessors.locale.get = function () {
  return LOCALE;
};

/**
 * @param {String} value
 */
prototypeAccessors.locale.set = function (value) {
  Validator.locale = value;
};

/**
* @return {String}
*/
staticAccessors.locale.get = function () {
  return LOCALE;
};

/**
 * @param {String} value
 */
staticAccessors.locale.set = function (value) {
  /* istanbul ignore if */
  if (!DICTIONARY.hasLocale(value)) {
    // eslint-disable-next-line
    warn('You are setting the validator locale to a locale that is not defined in the dictionary. English messages may still be generated.');
  }

  LOCALE = value;
};

/**
 * @return {Object}
 */
prototypeAccessors.rules.get = function () {
  return RULES;
};

/**
 * @return {Object}
 */
staticAccessors.rules.get = function () {
  return RULES;
};

/**
 * Static constructor.
 *
 * @param{object} validations The validations object.
 * @return {Validator} validator A validator object.
 */
Validator.create = function create (validations, options) {
  return new Validator(validations, options);
};

/**
 * Adds a custom validator to the list of validation rules.
 *
 * @param{string} name The name of the validator.
 * @param{object|function} validator The validator object/function.
 */
Validator.extend = function extend (name, validator) {
  Validator._guardExtend(name, validator);
  Validator._merge(name, validator);
};

/**
 * Removes a rule from the list of validators.
 * @param {String} name The name of the validator/rule.
 */
Validator.remove = function remove (name) {
  delete RULES[name];
};

/**
 * Sets the default locale for all validators.
 * @deprecated
 * @param {String} language The locale id.
 */
Validator.setLocale = function setLocale (language) {
    if ( language === void 0 ) language = 'en';

  Validator.locale = language;
};

/**
 * @deprecated
 */
Validator.installDateTimeValidators = function installDateTimeValidators () {
  /* istanbul ignore next */
  warn('Date validations are now installed by default, you no longer need to install it.');
};

/**
 * @deprecated
 */
Validator.prototype.installDateTimeValidators = function installDateTimeValidators () {
  /* istanbul ignore next */
  warn('Date validations are now installed by default, you no longer need to install it.');
};

/**
 * Sets the operating mode for all newly created validators.
 * strictMode = true: Values without a rule are invalid and cause failure.
 * strictMode = false: Values without a rule are valid and are skipped.
 * @param {Boolean} strictMode.
 */
Validator.setStrictMode = function setStrictMode (strictMode) {
    if ( strictMode === void 0 ) strictMode = true;

  STRICT_MODE = strictMode;
};

/**
 * Updates the dictionary, overwriting existing values and adding new ones.
 * @deprecated
 * @param{object} data The dictionary object.
 */
Validator.updateDictionary = function updateDictionary (data) {
  DICTIONARY.merge(data);
};

/**
 * Adds a locale object to the dictionary.
 * @deprecated
 * @param {Object} locale
 */
Validator.addLocale = function addLocale (locale) {
  if (! locale.name) {
    warn('Your locale must have a name property');
    return;
  }

  this.updateDictionary(( obj = {}, obj[locale.name] = locale, obj ));
    var obj;
};

/**
 * Adds a locale object to the dictionary.
 * @deprecated
 * @param {Object} locale
 */
Validator.prototype.addLocale = function addLocale (locale) {
  Validator.addLocale(locale);
};

/**
 * Adds and sets the current locale for the validator.
 *
 * @param {String} lang
 * @param {Object} dictionary
 */
Validator.prototype.localize = function localize (lang, dictionary) {
  Validator.localize(lang, dictionary);
};

/**
 * Adds and sets the current locale for the validator.
 *
 * @param {String} lang
 * @param {Object} dictionary
 */
Validator.localize = function localize (lang, dictionary) {
  // merge the dictionary.
  if (dictionary) {
    dictionary = assign({}, dictionary, { name: lang });
    Validator.addLocale(dictionary);
  }

  // set the locale.
  Validator.locale = lang;
};

/**
 * Registers a field to be validated.
 *
 * @param{Field|Object} name The field name.
 * @return {Field}
 */
Validator.prototype.attach = function attach (field) {
  // deprecate: handle old signature.
  if (arguments.length > 1) {
    field = assign({}, {
      name: arguments[0],
      rules: arguments[1]
    }, arguments[2] || { vm: { $validator: this } });
  }

  // fixes initial value detection with v-model and select elements.
  var value = field.initialValue;
  if (!(field instanceof Field)) {
    field = new Field(field.el || null, field);
  }

  this.fields.push(field);

  // validate the field initially
  if (field.initial) {
    this.validate(("#" + (field.id)), value || field.value);
  } else {
    this._validate(field, value || field.value, true).then(function (valid) {
      field.flags.valid = valid;
      field.flags.invalid = !valid;
    });
  }

  this._addFlag(field, field.scope);
  return field;
};

/**
 * Sets the flags on a field.
 *
 * @param {String} name
 * @param {Object} flags
 */
Validator.prototype.flag = function flag (name, flags) {
  var field = this._resolveField(name);
  if (! field || !flags) {
    return;
  }

  field.setFlags(flags);
};

/**
 * Removes a field from the validator.
 *
 * @param{String} name The name of the field.
 * @param {String} scope The name of the field scope.
 */
Validator.prototype.detach = function detach (name, scope) {
  var field = name instanceof Field ? name : this._resolveField(name, scope);
  if (!field) { return; }

  field.destroy();
  this.errors.remove(field.name, field.scope, field.id);
  this.fields.remove(field);
  var flags = this.flags;
  if (!isNullOrUndefined(field.scope) && flags[("$" + (field.scope))]) {
    delete flags[("$" + (field.scope))][field.name];
  } else if (isNullOrUndefined(field.scope)) {
    delete flags[field.name];
  }

  this.flags = assign({}, flags);
};

/**
 * Adds a custom validator to the list of validation rules.
 *
 * @param{string} name The name of the validator.
 * @param{object|function} validator The validator object/function.
 */
Validator.prototype.extend = function extend (name, validator) {
  Validator.extend(name, validator);
};

/**
 * Updates a field, updating both errors and flags.
 *
 * @param {String} id
 * @param {Object} diff
 */
Validator.prototype.update = function update (id, ref) {
    var scope = ref.scope;

  var field = this._resolveField(("#" + id));
  this.errors.update(id, { scope: scope });

  // remove old scope.
  if (!isNullOrUndefined(field.scope) && this.flags[("$" + (field.scope))]) {
    delete this.flags[("$" + (field.scope))][field.name];
  } else if (isNullOrUndefined(field.scope)) {
    delete this.flags[field.name];
  }

  this._addFlag(field, scope);
};

/**
 * Removes a rule from the list of validators.
 * @param {String} name The name of the validator/rule.
 */
Validator.prototype.remove = function remove (name) {
  Validator.remove(name);
};

/**
 * Sets the validator current langauge.
 *
 * @param {string} language locale or language id.
 */
Validator.prototype.setLocale = function setLocale (language) {
  this.locale = language;
};

/**
 * Updates the messages dictionary, overwriting existing values and adding new ones.
 * @deprecated
 * @param{object} data The messages object.
 */
Validator.prototype.updateDictionary = function updateDictionary (data) {
  Validator.updateDictionary(data);
};

/**
 * Validates a value against a registered field validations.
 *
 * @param{string} name the field name.
 * @param{*} value The value to be validated.
 * @param {String} scope The scope of the field.
 * @return {Promise}
 */
Validator.prototype.validate = function validate (name, value, scope) {
    if ( scope === void 0 ) scope = null;

  if (this.paused) { return Promise.resolve(true); }

  // overload to validate all.
  if (arguments.length === 0) {
    return this.validateScopes();
  }

  // overload to validate scopeless fields.
  if (arguments.length === 1 && arguments[0] === '*') {
    return this.validateAll();
  }

  // overload to validate a scope.
  if (arguments.length === 1 && typeof arguments[0] === 'string' && /^(.+)\.\*$/.test(arguments[0])) {
    var matched = arguments[0].match(/^(.+)\.\*$/)[1];
    return this.validateAll(matched);
  }

  var field = this._resolveField(name, scope);
  if (!field) {
    return this._handleFieldNotFound(name, scope);
  }

  this.errors.remove(field.name, field.scope, field.id);
  field.flags.pending = true;
  if (arguments.length === 1) {
    value = field.value;
  }

  var silentRun = field.isDisabled;

  return this._validate(field, value, silentRun).then(function (result) {
    field.setFlags({
      pending: false,
      valid: result,
      validated: true
    });

    if (silentRun) {
      return Promise.resolve(true);
    }

    return result;
  });
};

/**
 * Pauses the validator.
 *
 * @return {Validator}
 */
Validator.prototype.pause = function pause () {
  this.paused = true;

  return this;
};

/**
 * Resumes the validator.
 *
 * @return {Validator}
 */
Validator.prototype.resume = function resume () {
  this.paused = false;

  return this;
};

/**
 * Validates each value against the corresponding field validations.
 * @param{Object|String} values The values to be validated.
 * @return {Promise} Returns a promise with the validation result.
 */
Validator.prototype.validateAll = function validateAll (values) {
    var arguments$1 = arguments;
    var this$1 = this;

  if (this.paused) { return Promise.resolve(true); }

  var matcher = null;
  var providedValues = false;

  if (typeof values === 'string') {
    matcher = { scope: values };
  } else if (isObject(values)) {
    matcher = Object.keys(values).map(function (key) {
      return { name: key, scope: arguments$1[1] || null };
    });
    providedValues = true;
  } else if (arguments.length === 0) {
    matcher = { scope: null }; // global scope.
  }

  var promises = this.fields.filter(matcher).map(function (field) { return this$1.validate(
    ("#" + (field.id)),
    providedValues ? values[field.name] : field.value
  ); });

  return Promise.all(promises).then(function (results) { return results.every(function (t) { return t; }); });
};

/**
 * Validates all scopes.
 *
 * @returns {Promise} All promises resulted from each scope.
 */
Validator.prototype.validateScopes = function validateScopes () {
    var this$1 = this;

  if (this.paused) { return Promise.resolve(true); }

  var promises = this.fields.map(function (field) { return this$1.validate(
    ("#" + (field.id)),
    field.value
  ); });

  return Promise.all(promises).then(function (results) { return results.every(function (t) { return t; }); });
};

/**
 * Creates the fields to be validated.
 *
 * @param{object} validations
 * @return {object} Normalized object.
 */
Validator.prototype._createFields = function _createFields (validations) {
    var this$1 = this;

  if (!validations) { return; }

  Object.keys(validations).forEach(function (field) {
    var options = assign({}, { name: field, rules: validations[field] });
    this$1.attach(options);
  });
};

/**
 * Date rules need the existance of a format, so date_format must be supplied.
 * @param {String} name The rule name.
 * @param {Array} validations the field validations.
 */
Validator.prototype._getDateFormat = function _getDateFormat (validations) {
  var format = null;
  if (validations.date_format && Array.isArray(validations.date_format)) {
    format = validations.date_format[0];
  }

  return format || this.dictionary.getDateFormat(this.locale);
};

/**
 * Checks if the passed rule is a date rule.
 */
Validator.prototype._isADateRule = function _isADateRule (rule) {
  return !! ~['after', 'before', 'date_between', 'date_format'].indexOf(rule);
};

/**
 * Formats an error message for field and a rule.
 *
 * @param{Field} field The field object.
 * @param{object} rule Normalized rule object.
 * @param {object} data Additional Information about the validation result.
 * @return {string} Formatted error message.
 */
Validator.prototype._formatErrorMessage = function _formatErrorMessage (field, rule, data, targetName) {
    if ( data === void 0 ) data = {};
    if ( targetName === void 0 ) targetName = null;

  var name = this._getFieldDisplayName(field);
  var params = this._getLocalizedParams(rule, targetName);
  // Defaults to english message.
  if (!this.dictionary.hasLocale(LOCALE)) {
    var msg$1 = this.dictionary.getFieldMessage('en', field.name, rule.name);

    return isCallable(msg$1) ? msg$1(name, params, data) : msg$1;
  }

  var msg = this.dictionary.getFieldMessage(LOCALE, field.name, rule.name);

  return isCallable(msg) ? msg(name, params, data) : msg;
};

/**
 * Translates the parameters passed to the rule (mainly for target fields).
 */
Validator.prototype._getLocalizedParams = function _getLocalizedParams (rule, targetName) {
    if ( targetName === void 0 ) targetName = null;

  if (~['after', 'before', 'confirmed'].indexOf(rule.name) && rule.params && rule.params[0]) {
    var localizedName = targetName || this.dictionary.getAttribute(LOCALE, rule.params[0], rule.params[0]);
    return [localizedName].concat(rule.params.slice(1));
  }

  return rule.params;
};

/**
 * Resolves an appropiate display name, first checking 'data-as' or the registered 'prettyName'
 * Then the dictionary, then fallsback to field name.
 * @param {Field} field The field object.
 * @return {String} The name to be used in the errors.
 */
Validator.prototype._getFieldDisplayName = function _getFieldDisplayName (field) {
  return field.displayName || this.dictionary.getAttribute(LOCALE, field.name, field.name);
};

/**
 * Adds a field flags to the flags collection.
 * @param {Field} field
 * @param {String|null} scope
 */
Validator.prototype._addFlag = function _addFlag (field, scope) {
    if ( scope === void 0 ) scope = null;

  if (isNullOrUndefined(scope)) {
    this.flags = assign({}, this.flags, ( obj = {}, obj[("" + (field.name))] = field.flags, obj ));
      var obj;
    return;
  }

  var scopeObj = assign({}, this.flags[("$" + scope)] || {}, ( obj$1 = {}, obj$1[("" + (field.name))] = field.flags, obj$1 ));
    var obj$1;
  this.flags = assign({}, this.flags, ( obj$2 = {}, obj$2[("$" + scope)] = scopeObj, obj$2 ));
    var obj$2;
};

/**
 * Tests a single input value against a rule.
 *
 * @param{Field} field The field under validation.
 * @param{*} valuethe value of the field.
 * @param{object} rule the rule object.
 * @return {boolean} Whether it passes the check.
 */
Validator.prototype._test = function _test (field, value, rule, silent) {
    var this$1 = this;

  var validator = RULES[rule.name];
  var params = Array.isArray(rule.params) ? toArray(rule.params) : [];
  var targetName = null;
  if (!validator || typeof validator !== 'function') {
    throw createError(("No such validator '" + (rule.name) + "' exists."));
  }

  // has field depenencies
  if (/(confirmed|after|before)/.test(rule.name)) {
    var target = find(field.dependencies, function (d) { return d.name === rule.name; });
    if (target) {
      targetName = target.field.displayName;
      params = [target.field.value].concat(params.slice(1));
    }
  } else if (rule.name === 'required' && field.rejectsFalse) {
    // invalidate false if no args were specified and the field rejects false by default.
    params = params.length ? params : [true];
  }

  if (this._isADateRule(rule.name)) {
    var dateFormat = this._getDateFormat(field.rules);
    if (rule.name !== 'date_format') {
      params.push(dateFormat);
    }
  }

  var result = validator(value, params);

  // If it is a promise.
  if (isCallable(result.then)) {
    return result.then(function (values) {
      var allValid = true;
      var data = {};
      if (Array.isArray(values)) {
        allValid = values.every(function (t) { return (isObject(t) ? t.valid : t); });
      } else { // Is a single object/boolean.
        allValid = isObject(values) ? values.valid : values;
        data = values.data;
      }

      if (!allValid && !silent) {
        this$1.errors.add({
          id: field.id,
          field: field.name,
          msg: this$1._formatErrorMessage(field, rule, data, targetName),
          rule: rule.name,
          scope: field.scope
        });
      }

      return allValid;
    });
  }

  if (!isObject(result)) {
    result = { valid: result, data: {} };
  }

  if (!result.valid && !silent) {
    this.errors.add({
      id: field.id,
      field: field.name,
      msg: this._formatErrorMessage(field, rule, result.data, targetName),
      rule: rule.name,
      scope: field.scope
    });
  }

  return result.valid;
};

/**
 * Merges a validator object into the RULES and Messages.
 *
 * @param{string} name The name of the validator.
 * @param{function|object} validator The validator object.
 */
Validator._merge = function _merge (name, validator) {
  if (isCallable(validator)) {
    RULES[name] = validator;
    return;
  }

  RULES[name] = validator.validate;
  if (isCallable(validator.getMessage)) {
    DICTIONARY.setMessage(LOCALE, name, validator.getMessage);
  }

  if (validator.messages) {
    DICTIONARY.merge(
      Object.keys(validator.messages).reduce(function (prev, curr) {
        var dict = prev;
        dict[curr] = {
          messages: ( obj = {}, obj[name] = validator.messages[curr], obj )
        };
          var obj;

        return dict;
      }, {})
    );
  }
};

/**
 * Guards from extnsion violations.
 *
 * @param{string} name name of the validation rule.
 * @param{object} validator a validation rule object.
 */
Validator._guardExtend = function _guardExtend (name, validator) {
  if (isCallable(validator)) {
    return;
  }

  if (!isCallable(validator.validate)) {
    throw createError(
      // eslint-disable-next-line
      ("Extension Error: The validator '" + name + "' must be a function or have a 'validate' method.")
    );
  }

  if (!isCallable(validator.getMessage) && !isObject(validator.messages)) {
    throw createError(
      // eslint-disable-next-line
      ("Extension Error: The validator '" + name + "' must have a 'getMessage' method or have a 'messages' object.")
    );
  }
};

/**
 * Tries different strategies to find a field.
 * @param {String} name
 * @param {String} scope
 * @return {Field}
 */
Validator.prototype._resolveField = function _resolveField (name, scope) {
  if (!isNullOrUndefined(scope)) {
    return this.fields.find({ name: name, scope: scope });
  }

  if (name[0] === '#') {
    return this.fields.find({ id: name.slice(1) });
  }

  if (name.indexOf('.') > -1) {
    var ref = name.split('.');
      var fieldScope = ref[0];
      var fieldName = ref.slice(1);
    var field = this.fields.find({ name: fieldName.join('.'), scope: fieldScope });
    if (field) {
      return field;
    }
  }

  return this.fields.find({ name: name, scope: null });
};

/**
 * Handles when a field is not found depending on the strict flag.
 *
 * @param {String} name
 * @param {String} scope
 */
Validator.prototype._handleFieldNotFound = function _handleFieldNotFound (name, scope) {
  if (!this.strict) { return Promise.resolve(true); }

  var fullName = isNullOrUndefined(scope) ? name : ("" + (!isNullOrUndefined(scope) ? scope + '.' : '') + name);
  throw createError(
    ("Validating a non-existant field: \"" + fullName + "\". Use \"attach()\" first.")
  );
};

/**
 * Starts the validation process.
 *
 * @param {Field} field
 * @param {Promise} value
 * @param {Boolean} silent
 */
Validator.prototype._validate = function _validate (field, value, silent) {
    var this$1 = this;
    if ( silent === void 0 ) silent = false;

  if (!field.isRequired && (isNullOrUndefined(value) || value === '')) {
    return Promise.resolve(true);
  }

  var promises = [];
  var isExitEarly = false;
  // use of '.some()' is to break iteration in middle by returning true
  Object.keys(field.rules).some(function (rule) {
    var result = this$1._test(field, value, { name: rule, params: field.rules[rule] }, silent);

    if (isCallable(result.then)) {
      promises.push(result);
    } else if (this$1.fastExit && !result) {
      isExitEarly = true;
    } else {
      var resultAsPromise = new Promise(function (resolve) {
        resolve(result);
      });
      promises.push(resultAsPromise);
    }

    return isExitEarly;
  });

  if (isExitEarly) { return Promise.resolve(false); }

  return Promise.all(promises).then(function (values) { return values.every(function (t) { return t; }); });
};

Object.defineProperties( Validator.prototype, prototypeAccessors );
Object.defineProperties( Validator, staticAccessors );

var fakeFlags = createProxy({}, {
  get: function get (target, key) {
    // is a scope
    if (String(key).indexOf('$') === 0) {
      return fakeFlags;
    }

    return createFlags();
  }
});

/**
 * Checks if a parent validator instance was requested.
 * @param {Object|Array} injections
 */
var requestsValidator = function (injections) {
  if (! injections) {
    return false;
  }

  /* istanbul ignore next */
  if (Array.isArray(injections) && ~injections.indexOf('$validator')) {
    return true;
  }

  if (isObject(injections) && injections.$validator) {
    return true;
  }

  return false;
};

/**
 * Creates a validator instance.
 * @param {Vue} vm
 * @param {Object} options
 */
var createValidator = function (vm, options) { return new Validator(null, { vm: vm, fastExit: options.fastExit }); };

var makeMixin = function (Vue, options) {
  if ( options === void 0 ) options = {};

  var mixin = {};
  mixin.provide = function providesValidator () {
    if (this.$validator) {
      return {
        $validator: this.$validator
      };
    }

    return {};
  };

  mixin.beforeCreate = function beforeCreate () {
    // TODO: Deprecate
    /* istanbul ignore next */
    if (this.$options.$validates) {
      warn('The ctor $validates option has been deprecated please set the $_veeValidate.validator option to "new" instead');
      this.$validator = createValidator(this, options);
    }

    // if its a root instance, inject anyways, or if it requested a new instance.
    if (!this.$parent || (this.$options.$_veeValidate && /new/.test(this.$options.$_veeValidate.validator))) {
      this.$validator = createValidator(this, options);
    }

    var requested = requestsValidator(this.$options.inject);

    // if automatic injection is enabled and no instance was requested.
    if (! this.$validator && options.inject && !requested) {
      this.$validator = createValidator(this, options);
    }

    // don't inject errors or fieldBag as no validator was resolved.
    if (! requested && ! this.$validator) {
      return;
    }

    // There is a validator but it isn't injected, mark as reactive.
    if (! requested && this.$validator) {
      Vue.util.defineReactive(this.$validator, 'errors', this.$validator.errors);
      Vue.util.defineReactive(this.$validator, 'flags', this.$validator.flags);
    }

    if (! this.$options.computed) {
      this.$options.computed = {};
    }

    this.$options.computed[options.errorBagName || 'errors'] = function errorBagGetter () {
      return this.$validator.errors;
    };
    this.$options.computed[options.fieldsBagName || 'fields'] = function fieldBagGetter () {
      if (!Object.keys(this.$validator.flags).length) {
        return fakeFlags;
      }

      return this.$validator.flags;
    };
  };

  mixin.beforeDestroy = function beforeDestroy () {
    // mark the validator paused to prevent delayed validation.
    if (this.$validator && this.$validator.ownerId === this._uid && isCallable(this.$validator.pause)) {
      this.$validator.pause();
    }
  };

  return mixin;
};

var config = {
  locale: 'en',
  delay: 0,
  errorBagName: 'errors',
  dictionary: null,
  strict: true,
  fieldsBagName: 'fields',
  classes: false,
  classNames: undefined,
  events: 'input|blur',
  inject: true,
  fastExit: true,
  aria: true,
  validity: false
};

/**
 * 
 * 
 * Finds the requested field by id from the context object.
 * @param {Object} context
 * @return {Field|null}
 */
var findField = function (el, context) {
  if (!context || !context.$validator) {
    return null;
  }

  return context.$validator.fields.find({ id: getDataAttribute(el, 'id') });
};

var createDirective$1 = function (options) {
  options = assign({}, config, options);

  return {
    bind: function bind (el, binding, vnode) {
      var validator = vnode.context.$validator;
      if (! validator) {
        warn("No validator instance is present on vm, did you forget to inject '$validator'?");
        return;
      }
      var fieldOptions = Generator.generate(el, binding, vnode, options);
      validator.attach(fieldOptions);
    },
    inserted: function (el, binding, vnode) {
      var field = findField(el, vnode.context);
      var scope = Generator.resolveScope(el, binding, vnode);

      // skip if scope hasn't changed.
      if (!field || scope === field.scope) { return; }

      // only update scope.
      field.update({ scope: scope });

      // allows the field to re-evaluated once more in the update hook.
      field.updated = false;
    },
    update: function (el, binding, vnode) {
      var field = findField(el, vnode.context);

      // make sure we don't do uneccessary work if no important change was done.
      if (!field || (field.updated && isEqual(binding.value, binding.oldValue))) { return; }
      var scope = Generator.resolveScope(el, binding, vnode);
      var rules = Generator.resolveRules(el, binding);

      field.update({
        scope: scope,
        rules: rules
      });
    },
    unbind: function unbind (el, binding, ref) {
      var context = ref.context;

      var field = findField(el, context);
      if (!field) { return; }

      context.$validator.detach(field);
    }
  };
};

var Vue;

function install (_Vue, options) {
  if ( options === void 0 ) options = {};

  if (Vue) {
    warn('already installed, Vue.use(VeeValidate) should only be called once.');
    return;
  }

  Vue = _Vue;
  var config$$1 = assign({}, config, options);
  if (config$$1.dictionary) {
    Validator.updateDictionary(config$$1.dictionary);
  }

  if (options) {
    if (options.locale) {
      Validator.locale = options.locale;
    }

    if (options.strict) {
      Validator.setStrictMode(config$$1.strict);
    }
  }

  Vue.mixin(makeMixin(Vue, config$$1));
  Vue.directive('validate', createDirective$1(config$$1));
}

/**
 * Formates file size.
 *
 * @param {Number|String} size
 */
var formatFileSize = function (size) {
  var units = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var threshold = 1024;
  size = Number(size) * threshold;
  var i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(threshold));
  return (((size / Math.pow(threshold, i)).toFixed(2) * 1) + " " + (units[i]));
};

/**
 * Checks if vee-validate is defined globally.
 */
var isDefinedGlobally = function () {
  return typeof VeeValidate !== 'undefined';
};

var messages = {
  _default: function (field) { return ("The " + field + " value is not valid."); },
  after: function (field, ref) {
    var target = ref[0];
    var inclusion = ref[1];

    return ("The " + field + " must be after " + (inclusion ? 'or equal to ' : '') + target + ".");
},
  alpha_dash: function (field) { return ("The " + field + " field may contain alpha-numeric characters as well as dashes and underscores."); },
  alpha_num: function (field) { return ("The " + field + " field may only contain alpha-numeric characters."); },
  alpha_spaces: function (field) { return ("The " + field + " field may only contain alphabetic characters as well as spaces."); },
  alpha: function (field) { return ("The " + field + " field may only contain alphabetic characters."); },
  before: function (field, ref) {
    var target = ref[0];
    var inclusion = ref[1];

    return ("The " + field + " must be before " + (inclusion ? 'or equal to ' : '') + target + ".");
},
  between: function (field, ref) {
    var min = ref[0];
    var max = ref[1];

    return ("The " + field + " field must be between " + min + " and " + max + ".");
},
  confirmed: function (field) { return ("The " + field + " confirmation does not match."); },
  credit_card: function (field) { return ("The " + field + " field is invalid."); },
  date_between: function (field, ref) {
    var min = ref[0];
    var max = ref[1];

    return ("The " + field + " must be between " + min + " and " + max + ".");
},
  date_format: function (field, ref) {
    var format = ref[0];

    return ("The " + field + " must be in the format " + format + ".");
},
  decimal: function (field, ref) {
    if ( ref === void 0 ) ref = ['*'];
    var decimals = ref[0];

    return ("The " + field + " field must be numeric and may contain " + (!decimals || decimals === '*' ? '' : decimals) + " decimal points.");
},
  digits: function (field, ref) {
    var length = ref[0];

    return ("The " + field + " field must be numeric and exactly contain " + length + " digits.");
},
  dimensions: function (field, ref) {
    var width = ref[0];
    var height = ref[1];

    return ("The " + field + " field must be " + width + " pixels by " + height + " pixels.");
},
  email: function (field) { return ("The " + field + " field must be a valid email."); },
  ext: function (field) { return ("The " + field + " field must be a valid file."); },
  image: function (field) { return ("The " + field + " field must be an image."); },
  in: function (field) { return ("The " + field + " field must be a valid value."); },
  integer: function (field) { return ("The " + field + " field must be an integer."); },
  ip: function (field) { return ("The " + field + " field must be a valid ip address."); },
  length: function (field, ref) {
    var length = ref[0];
    var max = ref[1];

    if (max) {
      return ("The " + field + " length be between " + length + " and " + max + ".");
    }

    return ("The " + field + " length must be " + length + ".");
  },
  max: function (field, ref) {
    var length = ref[0];

    return ("The " + field + " field may not be greater than " + length + " characters.");
},
  max_value: function (field, ref) {
    var max = ref[0];

    return ("The " + field + " field must be " + max + " or less.");
},
  mimes: function (field) { return ("The " + field + " field must have a valid file type."); },
  min: function (field, ref) {
    var length = ref[0];

    return ("The " + field + " field must be at least " + length + " characters.");
},
  min_value: function (field, ref) {
    var min = ref[0];

    return ("The " + field + " field must be " + min + " or more.");
},
  not_in: function (field) { return ("The " + field + " field must be a valid value."); },
  numeric: function (field) { return ("The " + field + " field may only contain numeric characters."); },
  regex: function (field) { return ("The " + field + " field format is invalid."); },
  required: function (field) { return ("The " + field + " field is required."); },
  size: function (field, ref) {
    var size = ref[0];

    return ("The " + field + " size must be less than " + (formatFileSize(size)) + ".");
},
  url: function (field) { return ("The " + field + " field is not a valid URL."); }
};

var locale = {
  name: 'en',
  messages: messages,
  attributes: {}
};

if (isDefinedGlobally()) {
  // eslint-disable-next-line
  VeeValidate.Validator.addLocale(locale);
}

function use (plugin, options) {
  if ( options === void 0 ) options = {};

  if (!isCallable(plugin)) {
    return warn('The plugin must be a callable function');
  }

  plugin({ Validator: Validator, ErrorBag: ErrorBag, Rules: Validator.rules }, options);
}

var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;

var patterns = {
  dateTimeDelimeter: /[T ]/,
  plainTime: /:/,

  // year tokens
  YY: /^(\d{2})$/,
  YYY: [
    /^([+-]\d{2})$/, // 0 additional digits
    /^([+-]\d{3})$/, // 1 additional digit
    /^([+-]\d{4})$/ // 2 additional digits
  ],
  YYYY: /^(\d{4})/,
  YYYYY: [
    /^([+-]\d{4})/, // 0 additional digits
    /^([+-]\d{5})/, // 1 additional digit
    /^([+-]\d{6})/ // 2 additional digits
  ],

  // date tokens
  MM: /^-(\d{2})$/,
  DDD: /^-?(\d{3})$/,
  MMDD: /^-?(\d{2})-?(\d{2})$/,
  Www: /^-?W(\d{2})$/,
  WwwD: /^-?W(\d{2})-?(\d{1})$/,

  HH: /^(\d{2}([.,]\d*)?)$/,
  HHMM: /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS: /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,

  // timezone tokens
  timezone: /([Z+-].*)$/,
  timezoneZ: /^(Z)$/,
  timezoneHH: /^([+-])(\d{2})$/,
  timezoneHHMM: /^([+-])(\d{2}):?(\d{2})$/
};

/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If an argument is a string, the function tries to parse it.
 * Function accepts complete ISO 8601 formats as well as partial implementations.
 * ISO 8601: http://en.wikipedia.org/wiki/ISO_8601
 *
 * If the argument is null, it is treated as an invalid date.
 *
 * If all above fails, the function passes the given argument to Date constructor.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 * All *date-fns* functions will throw `RangeError` if `options.additionalDigits` is not 0, 1, 2 or undefined.
 *
 * @param {*} argument - the value to convert
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - the additional number of digits in the extended year format
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Convert string '2014-02-11T11:30:30' to date:
 * var result = toDate('2014-02-11T11:30:30')
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert string '+02014101' to date,
 * // if the additional number of digits in the extended year format is 1:
 * var result = toDate('+02014101', {additionalDigits: 1})
 * //=> Fri Apr 11 2014 00:00:00
 */
function toDate (argument, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
  }

  if (argument === null) {
    return new Date(NaN)
  }

  var options = dirtyOptions || {};

  var additionalDigits = options.additionalDigits === undefined ? DEFAULT_ADDITIONAL_DIGITS : Number(options.additionalDigits);
  if (additionalDigits !== 2 && additionalDigits !== 1 && additionalDigits !== 0) {
    throw new RangeError('additionalDigits must be 0, 1 or 2')
  }

  // Clone the date
  if (argument instanceof Date) {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime())
  } else if (typeof argument !== 'string') {
    return new Date(argument)
  }

  var dateStrings = splitDateString(argument);

  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;

  var date = parseDate(restDateString, year);

  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;

    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }

    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone);
    } else {
      // get offset accurate to hour in timezones that change offset
      offset = new Date(timestamp + time).getTimezoneOffset();
      offset = new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE).getTimezoneOffset();
    }

    return new Date(timestamp + time + offset * MILLISECONDS_IN_MINUTE)
  } else {
    return new Date(argument)
  }
}

function splitDateString (dateString) {
  var dateStrings = {};
  var array = dateString.split(patterns.dateTimeDelimeter);
  var timeString;

  if (patterns.plainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }

  if (timeString) {
    var token = patterns.timezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], '');
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }

  return dateStrings
}

function parseYear (dateString, additionalDigits) {
  var patternYYY = patterns.YYY[additionalDigits];
  var patternYYYYY = patterns.YYYYY[additionalDigits];

  var token;

  // YYYY or ±YYYYY
  token = patterns.YYYY.exec(dateString) || patternYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    }
  }

  // YY or ±YYY
  token = patterns.YY.exec(dateString) || patternYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    }
  }

  // Invalid ISO-formatted year
  return {
    year: null
  }
}

function parseDate (dateString, year) {
  // Invalid ISO-formatted year
  if (year === null) {
    return null
  }

  var token;
  var date;
  var month;
  var week;

  // YYYY
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date
  }

  // YYYY-MM
  token = patterns.MM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date
  }

  // YYYY-DDD or YYYYDDD
  token = patterns.DDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date
  }

  // YYYY-MM-DD or YYYYMMDD
  token = patterns.MMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date
  }

  // YYYY-Www or YYYYWww
  token = patterns.Www.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week)
  }

  // YYYY-Www-D or YYYYWwwD
  token = patterns.WwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek)
  }

  // Invalid ISO-formatted date
  return null
}

function parseTime (timeString) {
  var token;
  var hours;
  var minutes;

  // hh
  token = patterns.HH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR
  }

  // hh:mm or hhmm
  token = patterns.HHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE
  }

  // hh:mm:ss or hhmmss
  token = patterns.HHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(',', '.'));
    return (hours % 24) * MILLISECONDS_IN_HOUR +
      minutes * MILLISECONDS_IN_MINUTE +
      seconds * 1000
  }

  // Invalid ISO-formatted time
  return null
}

function parseTimezone (timezoneString) {
  var token;
  var absoluteOffset;

  // Z
  token = patterns.timezoneZ.exec(timezoneString);
  if (token) {
    return 0
  }

  // ±hh
  token = patterns.timezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  // ±hh:mm or ±hhmm
  token = patterns.timezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return (token[1] === '+') ? -absoluteOffset : absoluteOffset
  }

  return 0
}

function dayOfISOYear (isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date
}

/**
 * @name addMilliseconds
 * @category Millisecond Helpers
 * @summary Add the specified number of milliseconds to the given date.
 *
 * @description
 * Add the specified number of milliseconds to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of milliseconds to be added
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the milliseconds added
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
 * var result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
 * //=> Thu Jul 10 2014 12:45:30.750
 */
function addMilliseconds (dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
  }

  var timestamp = toDate(dirtyDate, dirtyOptions).getTime();
  var amount = Number(dirtyAmount);
  return new Date(timestamp + amount)
}

function cloneObject (dirtyObject) {
  dirtyObject = dirtyObject || {};
  var object = {};

  for (var property in dirtyObject) {
    if (dirtyObject.hasOwnProperty(property)) {
      object[property] = dirtyObject[property];
    }
  }

  return object
}

var MILLISECONDS_IN_MINUTE$2 = 60000;

/**
 * @name addMinutes
 * @category Minute Helpers
 * @summary Add the specified number of minutes to the given date.
 *
 * @description
 * Add the specified number of minutes to the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be added
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the minutes added
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Add 30 minutes to 10 July 2014 12:00:00:
 * var result = addMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 12:30:00
 */
function addMinutes (dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
  }

  var amount = Number(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE$2, dirtyOptions)
}

/**
 * @name isValid
 * @category Common Helpers
 * @summary Is the given date valid?
 *
 * @description
 * Returns false if argument is Invalid Date and true otherwise.
 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * Invalid Date is a Date, whose time value is NaN.
 *
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {*} date - the date to check
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the date is valid
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // For the valid date:
 * var result = isValid(new Date(2014, 1, 31))
 * //=> true
 *
 * @example
 * // For the value, convertable into a date:
 * var result = isValid('2014-02-31')
 * //=> true
 *
 * @example
 * // For the invalid date:
 * var result = isValid(new Date(''))
 * //=> false
 */
function isValid (dirtyDate, dirtyOptions) {
  if (arguments.length < 1) {
    throw new TypeError('1 argument required, but only ' + arguments.length + ' present')
  }

  var date = toDate(dirtyDate, dirtyOptions);
  return !isNaN(date)
}

var formatDistanceLocale = {
  lessThanXSeconds: {
    one: 'less than a second',
    other: 'less than {{count}} seconds'
  },

  xSeconds: {
    one: '1 second',
    other: '{{count}} seconds'
  },

  halfAMinute: 'half a minute',

  lessThanXMinutes: {
    one: 'less than a minute',
    other: 'less than {{count}} minutes'
  },

  xMinutes: {
    one: '1 minute',
    other: '{{count}} minutes'
  },

  aboutXHours: {
    one: 'about 1 hour',
    other: 'about {{count}} hours'
  },

  xHours: {
    one: '1 hour',
    other: '{{count}} hours'
  },

  xDays: {
    one: '1 day',
    other: '{{count}} days'
  },

  aboutXMonths: {
    one: 'about 1 month',
    other: 'about {{count}} months'
  },

  xMonths: {
    one: '1 month',
    other: '{{count}} months'
  },

  aboutXYears: {
    one: 'about 1 year',
    other: 'about {{count}} years'
  },

  xYears: {
    one: '1 year',
    other: '{{count}} years'
  },

  overXYears: {
    one: 'over 1 year',
    other: 'over {{count}} years'
  },

  almostXYears: {
    one: 'almost 1 year',
    other: 'almost {{count}} years'
  }
};

function formatDistance (token, count, options) {
  options = options || {};

  var result;
  if (typeof formatDistanceLocale[token] === 'string') {
    result = formatDistanceLocale[token];
  } else if (count === 1) {
    result = formatDistanceLocale[token].one;
  } else {
    result = formatDistanceLocale[token].other.replace('{{count}}', count);
  }

  if (options.addSuffix) {
    if (options.comparison > 0) {
      return 'in ' + result
    } else {
      return result + ' ago'
    }
  }

  return result
}

var tokensToBeShortedPattern = /MMMM|MM|DD|dddd/g;

function buildShortLongFormat (format) {
  return format.replace(tokensToBeShortedPattern, function (token) {
    return token.slice(1)
  })
}

/**
 * @name buildFormatLongFn
 * @category Locale Helpers
 * @summary Build `formatLong` property for locale used by `format`, `formatRelative` and `parse` functions.
 *
 * @description
 * Build `formatLong` property for locale used by `format`, `formatRelative` and `parse` functions.
 * Returns a function which takes one of the following tokens as the argument:
 * `'LTS'`, `'LT'`, `'L'`, `'LL'`, `'LLL'`, `'l'`, `'ll'`, `'lll'`, `'llll'`
 * and returns a long format string written as `format` token strings.
 * See [format]{@link https://date-fns.org/docs/format}
 *
 * `'l'`, `'ll'`, `'lll'` and `'llll'` formats are built automatically
 * by shortening some of the tokens from corresponding unshortened formats
 * (e.g., if `LL` is `'MMMM DD YYYY'` then `ll` will be `MMM D YYYY`)
 *
 * @param {Object} obj - the object with long formats written as `format` token strings
 * @param {String} obj.LT - time format: hours and minutes
 * @param {String} obj.LTS - time format: hours, minutes and seconds
 * @param {String} obj.L - short date format: numeric day, month and year
 * @param {String} [obj.l] - short date format: numeric day, month and year (shortened)
 * @param {String} obj.LL - long date format: day, month in words, and year
 * @param {String} [obj.ll] - long date format: day, month in words, and year (shortened)
 * @param {String} obj.LLL - long date and time format
 * @param {String} [obj.lll] - long date and time format (shortened)
 * @param {String} obj.LLLL - long date, time and weekday format
 * @param {String} [obj.llll] - long date, time and weekday format (shortened)
 * @returns {Function} `formatLong` property of the locale
 *
 * @example
 * // For `en-US` locale:
 * locale.formatLong = buildFormatLongFn({
 *   LT: 'h:mm aa',
 *   LTS: 'h:mm:ss aa',
 *   L: 'MM/DD/YYYY',
 *   LL: 'MMMM D YYYY',
 *   LLL: 'MMMM D YYYY h:mm aa',
 *   LLLL: 'dddd, MMMM D YYYY h:mm aa'
 * })
 */
function buildFormatLongFn (obj) {
  var formatLongLocale = {
    LTS: obj.LTS,
    LT: obj.LT,
    L: obj.L,
    LL: obj.LL,
    LLL: obj.LLL,
    LLLL: obj.LLLL,
    l: obj.l || buildShortLongFormat(obj.L),
    ll: obj.ll || buildShortLongFormat(obj.LL),
    lll: obj.lll || buildShortLongFormat(obj.LLL),
    llll: obj.llll || buildShortLongFormat(obj.LLLL)
  };

  return function (token) {
    return formatLongLocale[token]
  }
}

var formatLong = buildFormatLongFn({
  LT: 'h:mm aa',
  LTS: 'h:mm:ss aa',
  L: 'MM/DD/YYYY',
  LL: 'MMMM D YYYY',
  LLL: 'MMMM D YYYY h:mm aa',
  LLLL: 'dddd, MMMM D YYYY h:mm aa'
});

var formatRelativeLocale = {
  lastWeek: '[last] dddd [at] LT',
  yesterday: '[yesterday at] LT',
  today: '[today at] LT',
  tomorrow: '[tomorrow at] LT',
  nextWeek: 'dddd [at] LT',
  other: 'L'
};

function formatRelative (token, date, baseDate, options) {
  return formatRelativeLocale[token]
}

/**
 * @name buildLocalizeFn
 * @category Locale Helpers
 * @summary Build `localize.weekday`, `localize.month` and `localize.timeOfDay` properties for the locale.
 *
 * @description
 * Build `localize.weekday`, `localize.month` and `localize.timeOfDay` properties for the locale
 * used by `format` function.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 *
 * `localize.weekday` function takes the weekday index as argument (0 - Sunday).
 * `localize.month` takes the month index (0 - January).
 * `localize.timeOfDay` takes the hours. Use `indexCallback` to convert them to an array index (see example).
 *
 * @param {Object} values - the object with arrays of values
 * @param {String} defaultType - the default type for the localize function
 * @param {Function} [indexCallback] - the callback which takes the resulting function argument
 *   and converts it into value array index
 * @returns {Function} the resulting function
 *
 * @example
 * var timeOfDayValues = {
 *   uppercase: ['AM', 'PM'],
 *   lowercase: ['am', 'pm'],
 *   long: ['a.m.', 'p.m.']
 * }
 * locale.localize.timeOfDay = buildLocalizeFn(timeOfDayValues, 'long', function (hours) {
 *   // 0 is a.m. array index, 1 is p.m. array index
 *   return (hours / 12) >= 1 ? 1 : 0
 * })
 * locale.localize.timeOfDay(16, {type: 'uppercase'}) //=> 'PM'
 * locale.localize.timeOfDay(5) //=> 'a.m.'
 */
function buildLocalizeFn (values, defaultType, indexCallback) {
  return function (dirtyIndex, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var valuesArray = values[type] || values[defaultType];
    var index = indexCallback ? indexCallback(Number(dirtyIndex)) : Number(dirtyIndex);
    return valuesArray[index]
  }
}

/**
 * @name buildLocalizeArrayFn
 * @category Locale Helpers
 * @summary Build `localize.weekdays`, `localize.months` and `localize.timesOfDay` properties for the locale.
 *
 * @description
 * Build `localize.weekdays`, `localize.months` and `localize.timesOfDay` properties for the locale.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 *
 * @param {Object} values - the object with arrays of values
 * @param {String} defaultType - the default type for the localize function
 * @returns {Function} the resulting function
 *
 * @example
 * var weekdayValues = {
 *   narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
 *   short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
 *   long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
 * }
 * locale.localize.weekdays = buildLocalizeArrayFn(weekdayValues, 'long')
 * locale.localize.weekdays({type: 'narrow'}) //=> ['Su', 'Mo', ...]
 * locale.localize.weekdays() //=> ['Sunday', 'Monday', ...]
 */
function buildLocalizeArrayFn (values, defaultType) {
  return function (dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    return values[type] || values[defaultType]
  }
}

// Note: in English, the names of days of the week and months are capitalized.
// If you are making a new locale based on this one, check if the same is true for the language you're working on.
// Generally, formatted dates should look like they are in the middle of a sentence,
// e.g. in Spanish language the weekdays and months should be in the lowercase.
var weekdayValues = {
  narrow: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
};

var monthValues = {
  short: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  long: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
};

// `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
// Use the system which is used the most commonly in the locale.
// For example, if the country doesn't use a.m./p.m., you can use `night`/`morning`/`afternoon`/`evening`:
//
//   var timeOfDayValues = {
//     any: ['in the night', 'in the morning', 'in the afternoon', 'in the evening']
//   }
//
// And later:
//
//   var localize = {
//     // The callback takes the hours as the argument and returns the array index
//     timeOfDay: buildLocalizeFn(timeOfDayValues, 'any', function (hours) {
//       if (hours >= 17) {
//         return 3
//       } else if (hours >= 12) {
//         return 2
//       } else if (hours >= 4) {
//         return 1
//       } else {
//         return 0
//       }
//     }),
//     timesOfDay: buildLocalizeArrayFn(timeOfDayValues, 'any')
//   }
var timeOfDayValues = {
  uppercase: ['AM', 'PM'],
  lowercase: ['am', 'pm'],
  long: ['a.m.', 'p.m.']
};

function ordinalNumber (dirtyNumber, dirtyOptions) {
  var number = Number(dirtyNumber);

  // If ordinal numbers depend on context, for example,
  // if they are different for different grammatical genders,
  // use `options.unit`:
  //
  //   var options = dirtyOptions || {}
  //   var unit = String(options.unit)
  //
  // where `unit` can be 'month', 'quarter', 'week', 'isoWeek', 'dayOfYear',
  // 'dayOfMonth' or 'dayOfWeek'

  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st'
      case 2:
        return number + 'nd'
      case 3:
        return number + 'rd'
    }
  }
  return number + 'th'
}

var localize = {
  ordinalNumber: ordinalNumber,
  weekday: buildLocalizeFn(weekdayValues, 'long'),
  weekdays: buildLocalizeArrayFn(weekdayValues, 'long'),
  month: buildLocalizeFn(monthValues, 'long'),
  months: buildLocalizeArrayFn(monthValues, 'long'),
  timeOfDay: buildLocalizeFn(timeOfDayValues, 'long', function (hours) {
    return (hours / 12) >= 1 ? 1 : 0
  }),
  timesOfDay: buildLocalizeArrayFn(timeOfDayValues, 'long')
};

/**
 * @name buildMatchFn
 * @category Locale Helpers
 * @summary Build `match.weekdays`, `match.months` and `match.timesOfDay` properties for the locale.
 *
 * @description
 * Build `match.weekdays`, `match.months` and `match.timesOfDay` properties for the locale used by `parse` function.
 * If no `type` is supplied to the options of the resulting function, `defaultType` will be used (see example).
 * The result of the match function will be passed into corresponding parser function
 * (`match.weekday`, `match.month` or `match.timeOfDay` respectively. See `buildParseFn`).
 *
 * @param {Object} values - the object with RegExps
 * @param {String} defaultType - the default type for the match function
 * @returns {Function} the resulting function
 *
 * @example
 * var matchWeekdaysPatterns = {
 *   narrow: /^(su|mo|tu|we|th|fr|sa)/i,
 *   short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
 *   long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
 * }
 * locale.match.weekdays = buildMatchFn(matchWeekdaysPatterns, 'long')
 * locale.match.weekdays('Sunday', {type: 'narrow'}) //=> ['Su', 'Su', ...]
 * locale.match.weekdays('Sunday') //=> ['Sunday', 'Sunday', ...]
 */
function buildMatchFn (patterns, defaultType) {
  return function (dirtyString, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var pattern = patterns[type] || patterns[defaultType];
    var string = String(dirtyString);
    return string.match(pattern)
  }
}

/**
 * @name buildParseFn
 * @category Locale Helpers
 * @summary Build `match.weekday`, `match.month` and `match.timeOfDay` properties for the locale.
 *
 * @description
 * Build `match.weekday`, `match.month` and `match.timeOfDay` properties for the locale used by `parse` function.
 * The argument of the resulting function is the result of the corresponding match function
 * (`match.weekdays`, `match.months` or `match.timesOfDay` respectively. See `buildMatchFn`).
 *
 * @param {Object} values - the object with arrays of RegExps
 * @param {String} defaultType - the default type for the parser function
 * @returns {Function} the resulting function
 *
 * @example
 * var parseWeekdayPatterns = {
 *   any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
 * }
 * locale.match.weekday = buildParseFn(matchWeekdaysPatterns, 'long')
 * var matchResult = locale.match.weekdays('Friday')
 * locale.match.weekday(matchResult) //=> 5
 */
function buildParseFn (patterns, defaultType) {
  return function (matchResult, dirtyOptions) {
    var options = dirtyOptions || {};
    var type = options.type ? String(options.type) : defaultType;
    var patternsArray = patterns[type] || patterns[defaultType];
    var string = matchResult[1];

    return patternsArray.findIndex(function (pattern) {
      return pattern.test(string)
    })
  }
}

/**
 * @name buildMatchPatternFn
 * @category Locale Helpers
 * @summary Build match function from a single RegExp.
 *
 * @description
 * Build match function from a single RegExp.
 * Usually used for building `match.ordinalNumbers` property of the locale.
 *
 * @param {Object} pattern - the RegExp
 * @returns {Function} the resulting function
 *
 * @example
 * locale.match.ordinalNumbers = buildMatchPatternFn(/^(\d+)(th|st|nd|rd)?/i)
 * locale.match.ordinalNumbers('3rd') //=> ['3rd', '3', 'rd', ...]
 */
function buildMatchPatternFn (pattern) {
  return function (dirtyString) {
    var string = String(dirtyString);
    return string.match(pattern)
  }
}

/**
 * @name parseDecimal
 * @category Locale Helpers
 * @summary Parses the match result into decimal number.
 *
 * @description
 * Parses the match result into decimal number.
 * Uses the string matched with the first set of parentheses of match RegExp.
 *
 * @param {Array} matchResult - the object returned by matching function
 * @returns {Number} the parsed value
 *
 * @example
 * locale.match = {
 *   ordinalNumbers: (dirtyString) {
 *     return String(dirtyString).match(/^(\d+)(th|st|nd|rd)?/i)
 *   },
 *   ordinalNumber: parseDecimal
 * }
 */
function parseDecimal (matchResult) {
  return parseInt(matchResult[1], 10)
}

var matchOrdinalNumbersPattern = /^(\d+)(th|st|nd|rd)?/i;

var matchWeekdaysPatterns = {
  narrow: /^(su|mo|tu|we|th|fr|sa)/i,
  short: /^(sun|mon|tue|wed|thu|fri|sat)/i,
  long: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
};

var parseWeekdayPatterns = {
  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
};

var matchMonthsPatterns = {
  short: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
  long: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
};

var parseMonthPatterns = {
  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
};

// `timeOfDay` is used to designate which part of the day it is, when used with 12-hour clock.
// Use the system which is used the most commonly in the locale.
// For example, if the country doesn't use a.m./p.m., you can use `night`/`morning`/`afternoon`/`evening`:
//
//   var matchTimesOfDayPatterns = {
//     long: /^((in the)? (night|morning|afternoon|evening?))/i
//   }
//
//   var parseTimeOfDayPatterns = {
//     any: [/(night|morning)/i, /(afternoon|evening)/i]
//   }
var matchTimesOfDayPatterns = {
  short: /^(am|pm)/i,
  long: /^([ap]\.?\s?m\.?)/i
};

var parseTimeOfDayPatterns = {
  any: [/^a/i, /^p/i]
};

var match = {
  ordinalNumbers: buildMatchPatternFn(matchOrdinalNumbersPattern),
  ordinalNumber: parseDecimal,
  weekdays: buildMatchFn(matchWeekdaysPatterns, 'long'),
  weekday: buildParseFn(parseWeekdayPatterns, 'any'),
  months: buildMatchFn(matchMonthsPatterns, 'long'),
  month: buildParseFn(parseMonthPatterns, 'any'),
  timesOfDay: buildMatchFn(matchTimesOfDayPatterns, 'long'),
  timeOfDay: buildParseFn(parseTimeOfDayPatterns, 'any')
};

/**
 * @type {Locale}
 * @category Locales
 * @summary English locale (United States).
 * @language English
 * @iso-639-2 eng
 */
var locale$2 = {
  formatDistance: formatDistance,
  formatLong: formatLong,
  formatRelative: formatRelative,
  localize: localize,
  match: match,
  options: {
    weekStartsOn: 0 /* Sunday */,
    firstWeekContainsDate: 1
  }
};

var MILLISECONDS_IN_DAY$1 = 86400000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCDayOfYear (dirtyDate, dirtyOptions) {
  var date = toDate(dirtyDate, dirtyOptions);
  var timestamp = date.getTime();
  date.setUTCMonth(0, 1);
  date.setUTCHours(0, 0, 0, 0);
  var startOfYearTimestamp = date.getTime();
  var difference = timestamp - startOfYearTimestamp;
  return Math.floor(difference / MILLISECONDS_IN_DAY$1) + 1
}

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeek (dirtyDate, dirtyOptions) {
  var weekStartsOn = 1;

  var date = toDate(dirtyDate, dirtyOptions);
  var day = date.getUTCDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;

  date.setUTCDate(date.getUTCDate() - diff);
  date.setUTCHours(0, 0, 0, 0);
  return date
}

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeekYear (dirtyDate, dirtyOptions) {
  var date = toDate(dirtyDate, dirtyOptions);
  var year = date.getUTCFullYear();

  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear, dirtyOptions);

  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear, dirtyOptions);

  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year
  } else {
    return year - 1
  }
}

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function startOfUTCISOWeekYear (dirtyDate, dirtyOptions) {
  var year = getUTCISOWeekYear(dirtyDate, dirtyOptions);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(year, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  var date = startOfUTCISOWeek(fourthOfJanuary, dirtyOptions);
  return date
}

var MILLISECONDS_IN_WEEK$2 = 604800000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function getUTCISOWeek (dirtyDate, dirtyOptions) {
  var date = toDate(dirtyDate, dirtyOptions);
  var diff = startOfUTCISOWeek(date, dirtyOptions).getTime() - startOfUTCISOWeekYear(date, dirtyOptions).getTime();

  // Round the number of days to the nearest integer
  // because the number of milliseconds in a week is not constant
  // (e.g. it's different in the week of the daylight saving time clock shift)
  return Math.round(diff / MILLISECONDS_IN_WEEK$2) + 1
}

var formatters = {
  // Month: 1, 2, ..., 12
  'M': function (date) {
    return date.getUTCMonth() + 1
  },

  // Month: 1st, 2nd, ..., 12th
  'Mo': function (date, options) {
    var month = date.getUTCMonth() + 1;
    return options.locale.localize.ordinalNumber(month, {unit: 'month'})
  },

  // Month: 01, 02, ..., 12
  'MM': function (date) {
    return addLeadingZeros(date.getUTCMonth() + 1, 2)
  },

  // Month: Jan, Feb, ..., Dec
  'MMM': function (date, options) {
    return options.locale.localize.month(date.getUTCMonth(), {type: 'short'})
  },

  // Month: January, February, ..., December
  'MMMM': function (date, options) {
    return options.locale.localize.month(date.getUTCMonth(), {type: 'long'})
  },

  // Quarter: 1, 2, 3, 4
  'Q': function (date) {
    return Math.ceil((date.getUTCMonth() + 1) / 3)
  },

  // Quarter: 1st, 2nd, 3rd, 4th
  'Qo': function (date, options) {
    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);
    return options.locale.localize.ordinalNumber(quarter, {unit: 'quarter'})
  },

  // Day of month: 1, 2, ..., 31
  'D': function (date) {
    return date.getUTCDate()
  },

  // Day of month: 1st, 2nd, ..., 31st
  'Do': function (date, options) {
    return options.locale.localize.ordinalNumber(date.getUTCDate(), {unit: 'dayOfMonth'})
  },

  // Day of month: 01, 02, ..., 31
  'DD': function (date) {
    return addLeadingZeros(date.getUTCDate(), 2)
  },

  // Day of year: 1, 2, ..., 366
  'DDD': function (date) {
    return getUTCDayOfYear(date)
  },

  // Day of year: 1st, 2nd, ..., 366th
  'DDDo': function (date, options) {
    return options.locale.localize.ordinalNumber(getUTCDayOfYear(date), {unit: 'dayOfYear'})
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': function (date) {
    return addLeadingZeros(getUTCDayOfYear(date), 3)
  },

  // Day of week: Su, Mo, ..., Sa
  'dd': function (date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), {type: 'narrow'})
  },

  // Day of week: Sun, Mon, ..., Sat
  'ddd': function (date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), {type: 'short'})
  },

  // Day of week: Sunday, Monday, ..., Saturday
  'dddd': function (date, options) {
    return options.locale.localize.weekday(date.getUTCDay(), {type: 'long'})
  },

  // Day of week: 0, 1, ..., 6
  'd': function (date) {
    return date.getUTCDay()
  },

  // Day of week: 0th, 1st, 2nd, ..., 6th
  'do': function (date, options) {
    return options.locale.localize.ordinalNumber(date.getUTCDay(), {unit: 'dayOfWeek'})
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': function (date) {
    return date.getUTCDay() || 7
  },

  // ISO week: 1, 2, ..., 53
  'W': function (date) {
    return getUTCISOWeek(date)
  },

  // ISO week: 1st, 2nd, ..., 53th
  'Wo': function (date, options) {
    return options.locale.localize.ordinalNumber(getUTCISOWeek(date), {unit: 'isoWeek'})
  },

  // ISO week: 01, 02, ..., 53
  'WW': function (date) {
    return addLeadingZeros(getUTCISOWeek(date), 2)
  },

  // Year: 00, 01, ..., 99
  'YY': function (date) {
    return addLeadingZeros(date.getUTCFullYear(), 4).substr(2)
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': function (date) {
    return addLeadingZeros(date.getUTCFullYear(), 4)
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': function (date) {
    return String(getUTCISOWeekYear(date)).substr(2)
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': function (date) {
    return getUTCISOWeekYear(date)
  },

  // Hour: 0, 1, ... 23
  'H': function (date) {
    return date.getUTCHours()
  },

  // Hour: 00, 01, ..., 23
  'HH': function (date) {
    return addLeadingZeros(date.getUTCHours(), 2)
  },

  // Hour: 1, 2, ..., 12
  'h': function (date) {
    var hours = date.getUTCHours();
    if (hours === 0) {
      return 12
    } else if (hours > 12) {
      return hours % 12
    } else {
      return hours
    }
  },

  // Hour: 01, 02, ..., 12
  'hh': function (date) {
    return addLeadingZeros(formatters['h'](date), 2)
  },

  // Minute: 0, 1, ..., 59
  'm': function (date) {
    return date.getUTCMinutes()
  },

  // Minute: 00, 01, ..., 59
  'mm': function (date) {
    return addLeadingZeros(date.getUTCMinutes(), 2)
  },

  // Second: 0, 1, ..., 59
  's': function (date) {
    return date.getUTCSeconds()
  },

  // Second: 00, 01, ..., 59
  'ss': function (date) {
    return addLeadingZeros(date.getUTCSeconds(), 2)
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': function (date) {
    return Math.floor(date.getUTCMilliseconds() / 100)
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': function (date) {
    return addLeadingZeros(Math.floor(date.getUTCMilliseconds() / 10), 2)
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': function (date) {
    return addLeadingZeros(date.getUTCMilliseconds(), 3)
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': function (date, options) {
    var originalDate = options._originalDate || date;
    return formatTimezone(originalDate.getTimezoneOffset(), ':')
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': function (date, options) {
    var originalDate = options._originalDate || date;
    return formatTimezone(originalDate.getTimezoneOffset())
  },

  // Seconds timestamp: 512969520
  'X': function (date, options) {
    var originalDate = options._originalDate || date;
    return Math.floor(originalDate.getTime() / 1000)
  },

  // Milliseconds timestamp: 512969520900
  'x': function (date, options) {
    var originalDate = options._originalDate || date;
    return originalDate.getTime()
  },

  // AM, PM
  'A': function (date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), {type: 'uppercase'})
  },

  // am, pm
  'a': function (date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), {type: 'lowercase'})
  },

  // a.m., p.m.
  'aa': function (date, options) {
    return options.locale.localize.timeOfDay(date.getUTCHours(), {type: 'long'})
  }
};

function formatTimezone (offset, delimeter) {
  delimeter = delimeter || '';
  var sign = offset > 0 ? '-' : '+';
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2)
}

function addLeadingZeros (number, targetLength) {
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output
}

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function addUTCMinutes (dirtyDate, dirtyAmount, dirtyOptions) {
  var date = toDate(dirtyDate, dirtyOptions);
  var amount = Number(dirtyAmount);
  date.setUTCMinutes(date.getUTCMinutes() + amount);
  return date
}

var longFormattingTokensRegExp = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
var defaultFormattingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;

/**
 * @name format
 * @category Common Helpers
 * @summary Format the date.
 *
 * @description
 * Return the formatted date string in the given format.
 *
 * Accepted tokens:
 * | Unit                    | Token | Result examples                  |
 * |-------------------------|-------|----------------------------------|
 * | Month                   | M     | 1, 2, ..., 12                    |
 * |                         | Mo    | 1st, 2nd, ..., 12th              |
 * |                         | MM    | 01, 02, ..., 12                  |
 * |                         | MMM   | Jan, Feb, ..., Dec               |
 * |                         | MMMM  | January, February, ..., December |
 * | Quarter                 | Q     | 1, 2, 3, 4                       |
 * |                         | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Day of month            | D     | 1, 2, ..., 31                    |
 * |                         | Do    | 1st, 2nd, ..., 31st              |
 * |                         | DD    | 01, 02, ..., 31                  |
 * | Day of year             | DDD   | 1, 2, ..., 366                   |
 * |                         | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         | DDDD  | 001, 002, ..., 366               |
 * | Day of week             | d     | 0, 1, ..., 6                     |
 * |                         | do    | 0th, 1st, ..., 6th               |
 * |                         | dd    | Su, Mo, ..., Sa                  |
 * |                         | ddd   | Sun, Mon, ..., Sat               |
 * |                         | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | E     | 1, 2, ..., 7                     |
 * | ISO week                | W     | 1, 2, ..., 53                    |
 * |                         | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         | WW    | 01, 02, ..., 53                  |
 * | Year                    | YY    | 00, 01, ..., 99                  |
 * |                         | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | GG    | 00, 01, ..., 99                  |
 * |                         | GGGG  | 1900, 1901, ..., 2099            |
 * | AM/PM                   | A     | AM, PM                           |
 * |                         | a     | am, pm                           |
 * |                         | aa    | a.m., p.m.                       |
 * | Hour                    | H     | 0, 1, ... 23                     |
 * |                         | HH    | 00, 01, ... 23                   |
 * |                         | h     | 1, 2, ..., 12                    |
 * |                         | hh    | 01, 02, ..., 12                  |
 * | Minute                  | m     | 0, 1, ..., 59                    |
 * |                         | mm    | 00, 01, ..., 59                  |
 * | Second                  | s     | 0, 1, ..., 59                    |
 * |                         | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | SSS   | 000, 001, ..., 999               |
 * | Timezone                | Z     | -01:00, +00:00, ... +12:00       |
 * |                         | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | X     | 512969520                        |
 * | Milliseconds timestamp  | x     | 512969520900                     |
 * | Long format             | LT    | 05:30 a.m.                       |
 * |                         | LTS   | 05:30:15 a.m.                    |
 * |                         | L     | 07/02/1995                       |
 * |                         | l     | 7/2/1995                         |
 * |                         | LL    | July 2 1995                      |
 * |                         | ll    | Jul 2 1995                       |
 * |                         | LLL   | July 2 1995 05:30 a.m.           |
 * |                         | lll   | Jul 2 1995 05:30 a.m.            |
 * |                         | LLLL  | Sunday, July 2 1995 05:30 a.m.   |
 * |                         | llll  | Sun, Jul 2 1995 05:30 a.m.       |
 *
 * The characters wrapped in square brackets are escaped.
 *
 * The result may vary by locale.
 *
 * @param {Date|String|Number} date - the original date
 * @param {String} format - the string of tokens
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @returns {String} the formatted date string
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} `options.locale` must contain `localize` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 *
 * @example
 * // Represent 11 February 2014 in middle-endian format:
 * var result = format(
 *   new Date(2014, 1, 11),
 *   'MM/DD/YYYY'
 * )
 * //=> '02/11/2014'
 *
 * @example
 * // Represent 2 July 2014 in Esperanto:
 * import { eoLocale } from 'date-fns/locale/eo'
 * var result = format(
 *   new Date(2014, 6, 2),
 *   'Do [de] MMMM YYYY',
 *   {locale: eoLocale}
 * )
 * //=> '2-a de julio 2014'
 */
function format (dirtyDate, dirtyFormatStr, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
  }

  var formatStr = String(dirtyFormatStr);
  var options = dirtyOptions || {};

  var locale = options.locale || locale$2;

  if (!locale.localize) {
    throw new RangeError('locale must contain localize property')
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property')
  }

  var localeFormatters = locale.formatters || {};
  var formattingTokensRegExp = locale.formattingTokensRegExp || defaultFormattingTokensRegExp;
  var formatLong = locale.formatLong;

  var originalDate = toDate(dirtyDate, options);

  if (!isValid(originalDate, options)) {
    return 'Invalid Date'
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376
  var timezoneOffset = originalDate.getTimezoneOffset();
  var utcDate = addUTCMinutes(originalDate, -timezoneOffset, options);

  var formatterOptions = cloneObject(options);
  formatterOptions.locale = locale;
  formatterOptions.formatters = formatters;

  // When UTC functions will be implemented, options._originalDate will likely be a part of public API.
  // Right now, please don't use it in locales. If you have to use an original date,
  // please restore it from `date`, adding a timezone offset to it.
  formatterOptions._originalDate = originalDate;

  var result = formatStr
    .replace(longFormattingTokensRegExp, function (substring) {
      if (substring[0] === '[') {
        return substring
      }

      if (substring[0] === '\\') {
        return cleanEscapedString(substring)
      }

      return formatLong(substring)
    })
    .replace(formattingTokensRegExp, function (substring) {
      var formatter = localeFormatters[substring] || formatters[substring];

      if (formatter) {
        return formatter(utcDate, formatterOptions)
      } else {
        return cleanEscapedString(substring)
      }
    });

  return result
}

function cleanEscapedString (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

/**
 * @name subMinutes
 * @category Minute Helpers
 * @summary Subtract the specified number of minutes from the given date.
 *
 * @description
 * Subtract the specified number of minutes from the given date.
 *
 * @param {Date|String|Number} date - the date to be changed
 * @param {Number} amount - the amount of minutes to be subtracted
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Date} the new date with the mintues subtracted
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Subtract 30 minutes from 10 July 2014 12:00:00:
 * var result = subMinutes(new Date(2014, 6, 10, 12, 0), 30)
 * //=> Thu Jul 10 2014 11:30:00
 */
function subMinutes (dirtyDate, dirtyAmount, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
  }

  var amount = Number(dirtyAmount);
  return addMinutes(dirtyDate, -amount, dirtyOptions)
}

/**
 * @name isAfter
 * @category Common Helpers
 * @summary Is the first date after the second one?
 *
 * @description
 * Is the first date after the second one?
 *
 * @param {Date|String|Number} date - the date that should be after the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the first date is after the second date
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Is 10 July 1989 after 11 February 1987?
 * var result = isAfter(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> true
 */
function isAfter (dirtyDate, dirtyDateToCompare, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
  }

  var date = toDate(dirtyDate, dirtyOptions);
  var dateToCompare = toDate(dirtyDateToCompare, dirtyOptions);
  return date.getTime() > dateToCompare.getTime()
}

/**
 * @name isBefore
 * @category Common Helpers
 * @summary Is the first date before the second one?
 *
 * @description
 * Is the first date before the second one?
 *
 * @param {Date|String|Number} date - the date that should be before the other one to return true
 * @param {Date|String|Number} dateToCompare - the date to compare with
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the first date is before the second date
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Is 10 July 1989 before 11 February 1987?
 * var result = isBefore(new Date(1989, 6, 10), new Date(1987, 1, 11))
 * //=> false
 */
function isBefore (dirtyDate, dirtyDateToCompare, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
  }

  var date = toDate(dirtyDate, dirtyOptions);
  var dateToCompare = toDate(dirtyDateToCompare, dirtyOptions);
  return date.getTime() < dateToCompare.getTime()
}

/**
 * @name isEqual
 * @category Common Helpers
 * @summary Are the given dates equal?
 *
 * @description
 * Are the given dates equal?
 *
 * @param {Date|String|Number} dateLeft - the first date to compare
 * @param {Date|String|Number} dateRight - the second date to compare
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @returns {Boolean} the dates are equal
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 *
 * @example
 * // Are 2 July 2014 06:30:45.000 and 2 July 2014 06:30:45.500 equal?
 * var result = isEqual(
 *   new Date(2014, 6, 2, 6, 30, 45, 0)
 *   new Date(2014, 6, 2, 6, 30, 45, 500)
 * )
 * //=> false
 */
function isEqual$1 (dirtyLeftDate, dirtyRightDate, dirtyOptions) {
  if (arguments.length < 2) {
    throw new TypeError('2 arguments required, but only ' + arguments.length + ' present')
  }

  var dateLeft = toDate(dirtyLeftDate, dirtyOptions);
  var dateRight = toDate(dirtyRightDate, dirtyOptions);
  return dateLeft.getTime() === dateRight.getTime()
}

var patterns$1 = {
  'M': /^(1[0-2]|0?\d)/, // 0 to 12
  'D': /^(3[0-1]|[0-2]?\d)/, // 0 to 31
  'DDD': /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/, // 0 to 366
  'W': /^(5[0-3]|[0-4]?\d)/, // 0 to 53
  'YYYY': /^(\d{1,4})/, // 0 to 9999
  'H': /^(2[0-3]|[0-1]?\d)/, // 0 to 23
  'm': /^([0-5]?\d)/, // 0 to 59
  'Z': /^([+-])(\d{2}):(\d{2})/,
  'ZZ': /^([+-])(\d{2})(\d{2})/,
  singleDigit: /^(\d)/,
  twoDigits: /^(\d{2})/,
  threeDigits: /^(\d{3})/,
  fourDigits: /^(\d{4})/,
  anyDigits: /^(\d+)/
};

function parseDecimal$1 (matchResult) {
  return parseInt(matchResult[1], 10)
}

var parsers = {
  // Year: 00, 01, ..., 99
  'YY': {
    unit: 'twoDigitYear',
    match: patterns$1.twoDigits,
    parse: function (matchResult) {
      return parseDecimal$1(matchResult)
    }
  },

  // Year: 1900, 1901, ..., 2099
  'YYYY': {
    unit: 'year',
    match: patterns$1.YYYY,
    parse: parseDecimal$1
  },

  // ISO week-numbering year: 00, 01, ..., 99
  'GG': {
    unit: 'isoYear',
    match: patterns$1.twoDigits,
    parse: function (matchResult) {
      return parseDecimal$1(matchResult) + 1900
    }
  },

  // ISO week-numbering year: 1900, 1901, ..., 2099
  'GGGG': {
    unit: 'isoYear',
    match: patterns$1.YYYY,
    parse: parseDecimal$1
  },

  // Quarter: 1, 2, 3, 4
  'Q': {
    unit: 'quarter',
    match: patterns$1.singleDigit,
    parse: parseDecimal$1
  },

  // Ordinal quarter
  'Qo': {
    unit: 'quarter',
    match: function (string, options) {
      return options.locale.match.ordinalNumbers(string, {unit: 'quarter'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, {unit: 'quarter'})
    }
  },

  // Month: 1, 2, ..., 12
  'M': {
    unit: 'month',
    match: patterns$1.M,
    parse: function (matchResult) {
      return parseDecimal$1(matchResult) - 1
    }
  },

  // Ordinal month
  'Mo': {
    unit: 'month',
    match: function (string, options) {
      return options.locale.match.ordinalNumbers(string, {unit: 'month'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, {unit: 'month'}) - 1
    }
  },

  // Month: 01, 02, ..., 12
  'MM': {
    unit: 'month',
    match: patterns$1.twoDigits,
    parse: function (matchResult) {
      return parseDecimal$1(matchResult) - 1
    }
  },

  // Month: Jan, Feb, ..., Dec
  'MMM': {
    unit: 'month',
    match: function (string, options) {
      return options.locale.match.months(string, {type: 'short'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.month(matchResult, {type: 'short'})
    }
  },

  // Month: January, February, ..., December
  'MMMM': {
    unit: 'month',
    match: function (string, options) {
      return options.locale.match.months(string, {type: 'long'}) ||
        options.locale.match.months(string, {type: 'short'})
    },
    parse: function (matchResult, options) {
      var parseResult = options.locale.match.month(matchResult, {type: 'long'});

      if (parseResult == null) {
        parseResult = options.locale.match.month(matchResult, {type: 'short'});
      }

      return parseResult
    }
  },

  // ISO week: 1, 2, ..., 53
  'W': {
    unit: 'isoWeek',
    match: patterns$1.W,
    parse: parseDecimal$1
  },

  // Ordinal ISO week
  'Wo': {
    unit: 'isoWeek',
    match: function (string, options) {
      return options.locale.match.ordinalNumbers(string, {unit: 'isoWeek'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, {unit: 'isoWeek'})
    }
  },

  // ISO week: 01, 02, ..., 53
  'WW': {
    unit: 'isoWeek',
    match: patterns$1.twoDigits,
    parse: parseDecimal$1
  },

  // Day of week: 0, 1, ..., 6
  'd': {
    unit: 'dayOfWeek',
    match: patterns$1.singleDigit,
    parse: parseDecimal$1
  },

  // Ordinal day of week
  'do': {
    unit: 'dayOfWeek',
    match: function (string, options) {
      return options.locale.match.ordinalNumbers(string, {unit: 'dayOfWeek'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, {unit: 'dayOfWeek'})
    }
  },

  // Day of week: Su, Mo, ..., Sa
  'dd': {
    unit: 'dayOfWeek',
    match: function (string, options) {
      return options.locale.match.weekdays(string, {type: 'narrow'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.weekday(matchResult, {type: 'narrow'})
    }
  },

  // Day of week: Sun, Mon, ..., Sat
  'ddd': {
    unit: 'dayOfWeek',
    match: function (string, options) {
      return options.locale.match.weekdays(string, {type: 'short'}) ||
        options.locale.match.weekdays(string, {type: 'narrow'})
    },
    parse: function (matchResult, options) {
      var parseResult = options.locale.match.weekday(matchResult, {type: 'short'});

      if (parseResult == null) {
        parseResult = options.locale.match.weekday(matchResult, {type: 'narrow'});
      }

      return parseResult
    }
  },

  // Day of week: Sunday, Monday, ..., Saturday
  'dddd': {
    unit: 'dayOfWeek',
    match: function (string, options) {
      return options.locale.match.weekdays(string, {type: 'long'}) ||
        options.locale.match.weekdays(string, {type: 'short'}) ||
        options.locale.match.weekdays(string, {type: 'narrow'})
    },
    parse: function (matchResult, options) {
      var parseResult = options.locale.match.weekday(matchResult, {type: 'long'});

      if (parseResult == null) {
        parseResult = options.locale.match.weekday(matchResult, {type: 'short'});

        if (parseResult == null) {
          parseResult = options.locale.match.weekday(matchResult, {type: 'narrow'});
        }
      }

      return parseResult
    }
  },

  // Day of ISO week: 1, 2, ..., 7
  'E': {
    unit: 'dayOfISOWeek',
    match: patterns$1.singleDigit,
    parse: function (matchResult) {
      return parseDecimal$1(matchResult)
    }
  },

  // Day of month: 1, 2, ..., 31
  'D': {
    unit: 'dayOfMonth',
    match: patterns$1.D,
    parse: parseDecimal$1
  },

  // Ordinal day of month
  'Do': {
    unit: 'dayOfMonth',
    match: function (string, options) {
      return options.locale.match.ordinalNumbers(string, {unit: 'dayOfMonth'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, {unit: 'dayOfMonth'})
    }
  },

  // Day of month: 01, 02, ..., 31
  'DD': {
    unit: 'dayOfMonth',
    match: patterns$1.twoDigits,
    parse: parseDecimal$1
  },

  // Day of year: 1, 2, ..., 366
  'DDD': {
    unit: 'dayOfYear',
    match: patterns$1.DDD,
    parse: parseDecimal$1
  },

  // Ordinal day of year
  'DDDo': {
    unit: 'dayOfYear',
    match: function (string, options) {
      return options.locale.match.ordinalNumbers(string, {unit: 'dayOfYear'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.ordinalNumber(matchResult, {unit: 'dayOfYear'})
    }
  },

  // Day of year: 001, 002, ..., 366
  'DDDD': {
    unit: 'dayOfYear',
    match: patterns$1.threeDigits,
    parse: parseDecimal$1
  },

  // AM, PM
  'A': {
    unit: 'timeOfDay',
    match: function (string, options) {
      return options.locale.match.timesOfDay(string, {type: 'short'})
    },
    parse: function (matchResult, options) {
      return options.locale.match.timeOfDay(matchResult, {type: 'short'})
    }
  },

  // a.m., p.m.
  'aa': {
    unit: 'timeOfDay',
    match: function (string, options) {
      return options.locale.match.timesOfDay(string, {type: 'long'}) ||
        options.locale.match.timesOfDay(string, {type: 'short'})
    },
    parse: function (matchResult, options) {
      var parseResult = options.locale.match.timeOfDay(matchResult, {type: 'long'});

      if (parseResult == null) {
        parseResult = options.locale.match.timeOfDay(matchResult, {type: 'short'});
      }

      return parseResult
    }
  },

  // Hour: 0, 1, ... 23
  'H': {
    unit: 'hours',
    match: patterns$1.H,
    parse: parseDecimal$1
  },

  // Hour: 00, 01, ..., 23
  'HH': {
    unit: 'hours',
    match: patterns$1.twoDigits,
    parse: parseDecimal$1
  },

  // Hour: 1, 2, ..., 12
  'h': {
    unit: 'timeOfDayHours',
    match: patterns$1.M,
    parse: parseDecimal$1
  },

  // Hour: 01, 02, ..., 12
  'hh': {
    unit: 'timeOfDayHours',
    match: patterns$1.twoDigits,
    parse: parseDecimal$1
  },

  // Minute: 0, 1, ..., 59
  'm': {
    unit: 'minutes',
    match: patterns$1.m,
    parse: parseDecimal$1
  },

  // Minute: 00, 01, ..., 59
  'mm': {
    unit: 'minutes',
    match: patterns$1.twoDigits,
    parse: parseDecimal$1
  },

  // Second: 0, 1, ..., 59
  's': {
    unit: 'seconds',
    match: patterns$1.m,
    parse: parseDecimal$1
  },

  // Second: 00, 01, ..., 59
  'ss': {
    unit: 'seconds',
    match: patterns$1.twoDigits,
    parse: parseDecimal$1
  },

  // 1/10 of second: 0, 1, ..., 9
  'S': {
    unit: 'milliseconds',
    match: patterns$1.singleDigit,
    parse: function (matchResult) {
      return parseDecimal$1(matchResult) * 100
    }
  },

  // 1/100 of second: 00, 01, ..., 99
  'SS': {
    unit: 'milliseconds',
    match: patterns$1.twoDigits,
    parse: function (matchResult) {
      return parseDecimal$1(matchResult) * 10
    }
  },

  // Millisecond: 000, 001, ..., 999
  'SSS': {
    unit: 'milliseconds',
    match: patterns$1.threeDigits,
    parse: parseDecimal$1
  },

  // Timezone: -01:00, +00:00, ... +12:00
  'Z': {
    unit: 'timezone',
    match: patterns$1.Z,
    parse: function (matchResult) {
      var sign = matchResult[1];
      var hours = parseInt(matchResult[2], 10);
      var minutes = parseInt(matchResult[3], 10);
      var absoluteOffset = hours * 60 + minutes;
      return (sign === '+') ? absoluteOffset : -absoluteOffset
    }
  },

  // Timezone: -0100, +0000, ... +1200
  'ZZ': {
    unit: 'timezone',
    match: patterns$1.ZZ,
    parse: function (matchResult) {
      var sign = matchResult[1];
      var hours = parseInt(matchResult[2], 10);
      var minutes = parseInt(matchResult[3], 10);
      var absoluteOffset = hours * 60 + minutes;
      return (sign === '+') ? absoluteOffset : -absoluteOffset
    }
  },

  // Seconds timestamp: 512969520
  'X': {
    unit: 'timestamp',
    match: patterns$1.anyDigits,
    parse: function (matchResult) {
      return parseDecimal$1(matchResult) * 1000
    }
  },

  // Milliseconds timestamp: 512969520900
  'x': {
    unit: 'timestamp',
    match: patterns$1.anyDigits,
    parse: parseDecimal$1
  }
};

parsers['a'] = parsers['A'];

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCDay (dirtyDate, dirtyDay, dirtyOptions) {
  var options = dirtyOptions || {};
  var locale = options.locale;
  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
  var defaultWeekStartsOn = localeWeekStartsOn === undefined ? 0 : Number(localeWeekStartsOn);
  var weekStartsOn = options.weekStartsOn === undefined ? defaultWeekStartsOn : Number(options.weekStartsOn);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  var date = toDate(dirtyDate, dirtyOptions);
  var day = Number(dirtyDay);

  var currentDay = date.getUTCDay();

  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;

  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;

  date.setUTCDate(date.getUTCDate() + diff);
  return date
}

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISODay (dirtyDate, dirtyDay, dirtyOptions) {
  var day = Number(dirtyDay);

  if (day % 7 === 0) {
    day = day - 7;
  }

  var weekStartsOn = 1;
  var date = toDate(dirtyDate, dirtyOptions);
  var currentDay = date.getUTCDay();

  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;

  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;

  date.setUTCDate(date.getUTCDate() + diff);
  return date
}

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISOWeek (dirtyDate, dirtyISOWeek, dirtyOptions) {
  var date = toDate(dirtyDate, dirtyOptions);
  var isoWeek = Number(dirtyISOWeek);
  var diff = getUTCISOWeek(date, dirtyOptions) - isoWeek;
  date.setUTCDate(date.getUTCDate() - diff * 7);
  return date
}

var MILLISECONDS_IN_DAY$3 = 86400000;

// This function will be a part of public API when UTC function will be implemented.
// See issue: https://github.com/date-fns/date-fns/issues/376
function setUTCISOWeekYear (dirtyDate, dirtyISOYear, dirtyOptions) {
  var date = toDate(dirtyDate, dirtyOptions);
  var isoYear = Number(dirtyISOYear);
  var dateStartOfYear = startOfUTCISOWeekYear(date, dirtyOptions);
  var diff = Math.floor((date.getTime() - dateStartOfYear.getTime()) / MILLISECONDS_IN_DAY$3);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setUTCFullYear(isoYear, 0, 4);
  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
  date = startOfUTCISOWeekYear(fourthOfJanuary, dirtyOptions);
  date.setUTCDate(date.getUTCDate() + diff);
  return date
}

var MILLISECONDS_IN_MINUTE$7 = 60000;

function setTimeOfDay (hours, timeOfDay) {
  var isAM = timeOfDay === 0;

  if (isAM) {
    if (hours === 12) {
      return 0
    }
  } else {
    if (hours !== 12) {
      return 12 + hours
    }
  }

  return hours
}

var units = {
  twoDigitYear: {
    priority: 10,
    set: function (dateValues, value) {
      var century = Math.floor(dateValues.date.getUTCFullYear() / 100);
      var year = century * 100 + value;
      dateValues.date.setUTCFullYear(year, 0, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues
    }
  },

  year: {
    priority: 10,
    set: function (dateValues, value) {
      dateValues.date.setUTCFullYear(value, 0, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues
    }
  },

  isoYear: {
    priority: 10,
    set: function (dateValues, value, options) {
      dateValues.date = startOfUTCISOWeekYear(setUTCISOWeekYear(dateValues.date, value, options), options);
      return dateValues
    }
  },

  quarter: {
    priority: 20,
    set: function (dateValues, value) {
      dateValues.date.setUTCMonth((value - 1) * 3, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues
    }
  },

  month: {
    priority: 30,
    set: function (dateValues, value) {
      dateValues.date.setUTCMonth(value, 1);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues
    }
  },

  isoWeek: {
    priority: 40,
    set: function (dateValues, value, options) {
      dateValues.date = startOfUTCISOWeek(setUTCISOWeek(dateValues.date, value, options), options);
      return dateValues
    }
  },

  dayOfWeek: {
    priority: 50,
    set: function (dateValues, value, options) {
      dateValues.date = setUTCDay(dateValues.date, value, options);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues
    }
  },

  dayOfISOWeek: {
    priority: 50,
    set: function (dateValues, value, options) {
      dateValues.date = setUTCISODay(dateValues.date, value, options);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues
    }
  },

  dayOfMonth: {
    priority: 50,
    set: function (dateValues, value) {
      dateValues.date.setUTCDate(value);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues
    }
  },

  dayOfYear: {
    priority: 50,
    set: function (dateValues, value) {
      dateValues.date.setUTCMonth(0, value);
      dateValues.date.setUTCHours(0, 0, 0, 0);
      return dateValues
    }
  },

  timeOfDay: {
    priority: 60,
    set: function (dateValues, value, options) {
      dateValues.timeOfDay = value;
      return dateValues
    }
  },

  hours: {
    priority: 70,
    set: function (dateValues, value, options) {
      dateValues.date.setUTCHours(value, 0, 0, 0);
      return dateValues
    }
  },

  timeOfDayHours: {
    priority: 70,
    set: function (dateValues, value, options) {
      var timeOfDay = dateValues.timeOfDay;
      if (timeOfDay != null) {
        value = setTimeOfDay(value, timeOfDay);
      }
      dateValues.date.setUTCHours(value, 0, 0, 0);
      return dateValues
    }
  },

  minutes: {
    priority: 80,
    set: function (dateValues, value) {
      dateValues.date.setUTCMinutes(value, 0, 0);
      return dateValues
    }
  },

  seconds: {
    priority: 90,
    set: function (dateValues, value) {
      dateValues.date.setUTCSeconds(value, 0);
      return dateValues
    }
  },

  milliseconds: {
    priority: 100,
    set: function (dateValues, value) {
      dateValues.date.setUTCMilliseconds(value);
      return dateValues
    }
  },

  timezone: {
    priority: 110,
    set: function (dateValues, value) {
      dateValues.date = new Date(dateValues.date.getTime() - value * MILLISECONDS_IN_MINUTE$7);
      return dateValues
    }
  },

  timestamp: {
    priority: 120,
    set: function (dateValues, value) {
      dateValues.date = new Date(value);
      return dateValues
    }
  }
};

var TIMEZONE_UNIT_PRIORITY = 110;
var MILLISECONDS_IN_MINUTE$6 = 60000;

var longFormattingTokensRegExp$1 = /(\[[^[]*])|(\\)?(LTS|LT|LLLL|LLL|LL|L|llll|lll|ll|l)/g;
var defaultParsingTokensRegExp = /(\[[^[]*])|(\\)?(x|ss|s|mm|m|hh|h|do|dddd|ddd|dd|d|aa|a|ZZ|Z|YYYY|YY|X|Wo|WW|W|SSS|SS|S|Qo|Q|Mo|MMMM|MMM|MM|M|HH|H|GGGG|GG|E|Do|DDDo|DDDD|DDD|DD|D|A|.)/g;

/**
 * @name parse
 * @category Common Helpers
 * @summary Parse the date.
 *
 * @description
 * Return the date parsed from string using the given format.
 *
 * Accepted format tokens:
 * | Unit                    | Priority | Token | Input examples                   |
 * |-------------------------|----------|-------|----------------------------------|
 * | Year                    | 10       | YY    | 00, 01, ..., 99                  |
 * |                         |          | YYYY  | 1900, 1901, ..., 2099            |
 * | ISO week-numbering year | 10       | GG    | 00, 01, ..., 99                  |
 * |                         |          | GGGG  | 1900, 1901, ..., 2099            |
 * | Quarter                 | 20       | Q     | 1, 2, 3, 4                       |
 * |                         |          | Qo    | 1st, 2nd, 3rd, 4th               |
 * | Month                   | 30       | M     | 1, 2, ..., 12                    |
 * |                         |          | Mo    | 1st, 2nd, ..., 12th              |
 * |                         |          | MM    | 01, 02, ..., 12                  |
 * |                         |          | MMM   | Jan, Feb, ..., Dec               |
 * |                         |          | MMMM  | January, February, ..., December |
 * | ISO week                | 40       | W     | 1, 2, ..., 53                    |
 * |                         |          | Wo    | 1st, 2nd, ..., 53rd              |
 * |                         |          | WW    | 01, 02, ..., 53                  |
 * | Day of week             | 50       | d     | 0, 1, ..., 6                     |
 * |                         |          | do    | 0th, 1st, ..., 6th               |
 * |                         |          | dd    | Su, Mo, ..., Sa                  |
 * |                         |          | ddd   | Sun, Mon, ..., Sat               |
 * |                         |          | dddd  | Sunday, Monday, ..., Saturday    |
 * | Day of ISO week         | 50       | E     | 1, 2, ..., 7                     |
 * | Day of month            | 50       | D     | 1, 2, ..., 31                    |
 * |                         |          | Do    | 1st, 2nd, ..., 31st              |
 * |                         |          | DD    | 01, 02, ..., 31                  |
 * | Day of year             | 50       | DDD   | 1, 2, ..., 366                   |
 * |                         |          | DDDo  | 1st, 2nd, ..., 366th             |
 * |                         |          | DDDD  | 001, 002, ..., 366               |
 * | Time of day             | 60       | A     | AM, PM                           |
 * |                         |          | a     | am, pm                           |
 * |                         |          | aa    | a.m., p.m.                       |
 * | Hour                    | 70       | H     | 0, 1, ... 23                     |
 * |                         |          | HH    | 00, 01, ... 23                   |
 * | Time of day hour        | 70       | h     | 1, 2, ..., 12                    |
 * |                         |          | hh    | 01, 02, ..., 12                  |
 * | Minute                  | 80       | m     | 0, 1, ..., 59                    |
 * |                         |          | mm    | 00, 01, ..., 59                  |
 * | Second                  | 90       | s     | 0, 1, ..., 59                    |
 * |                         |          | ss    | 00, 01, ..., 59                  |
 * | 1/10 of second          | 100      | S     | 0, 1, ..., 9                     |
 * | 1/100 of second         | 100      | SS    | 00, 01, ..., 99                  |
 * | Millisecond             | 100      | SSS   | 000, 001, ..., 999               |
 * | Timezone                | 110      | Z     | -01:00, +00:00, ... +12:00       |
 * |                         |          | ZZ    | -0100, +0000, ..., +1200         |
 * | Seconds timestamp       | 120      | X     | 512969520                        |
 * | Milliseconds timestamp  | 120      | x     | 512969520900                     |
 *
 * Values will be assigned to the date in the ascending order of its unit's priority.
 * Units of an equal priority overwrite each other in the order of appearance.
 *
 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
 * the values will be taken from 3rd argument `baseDate` which works as a context of parsing.
 *
 * `baseDate` must be passed for correct work of the function.
 * If you're not sure which `baseDate` to supply, create a new instance of Date:
 * `parse('02/11/2014', 'MM/DD/YYYY', new Date())`
 * In this case parsing will be done in the context of the current date.
 * If `baseDate` is `Invalid Date` or a value not convertible to valid `Date`,
 * then `Invalid Date` will be returned.
 *
 * Also, `parse` unfolds long formats like those in [format]{@link https://date-fns.org/docs/format}:
 * | Token | Input examples                 |
 * |-------|--------------------------------|
 * | LT    | 05:30 a.m.                     |
 * | LTS   | 05:30:15 a.m.                  |
 * | L     | 07/02/1995                     |
 * | l     | 7/2/1995                       |
 * | LL    | July 2 1995                    |
 * | ll    | Jul 2 1995                     |
 * | LLL   | July 2 1995 05:30 a.m.         |
 * | lll   | Jul 2 1995 05:30 a.m.          |
 * | LLLL  | Sunday, July 2 1995 05:30 a.m. |
 * | llll  | Sun, Jul 2 1995 05:30 a.m.     |
 *
 * The characters wrapped in square brackets in the format string are escaped.
 *
 * The result may vary by locale.
 *
 * If `formatString` matches with `dateString` but does not provides tokens, `baseDate` will be returned.
 *
 * If parsing failed, `Invalid Date` will be returned.
 * Invalid Date is a Date, whose time value is NaN.
 * Time value of Date: http://es5.github.io/#x15.9.1.1
 *
 * @param {String} dateString - the string to parse
 * @param {String} formatString - the string of tokens
 * @param {Date|String|Number} baseDate - the date to took the missing higher priority values from
 * @param {Options} [options] - the object with options. See [Options]{@link https://date-fns.org/docs/Options}
 * @param {0|1|2} [options.additionalDigits=2] - passed to `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the parsed date
 * @throws {TypeError} 3 arguments required
 * @throws {RangeError} `options.additionalDigits` must be 0, 1 or 2
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 * @throws {RangeError} `options.locale` must contain `match` property
 * @throws {RangeError} `options.locale` must contain `formatLong` property
 *
 * @example
 * // Parse 11 February 2014 from middle-endian format:
 * var result = parse(
 *   '02/11/2014',
 *   'MM/DD/YYYY',
 *   new Date()
 * )
 * //=> Tue Feb 11 2014 00:00:00
 *
 * @example
 * // Parse 28th of February in English locale in the context of 2010 year:
 * import eoLocale from 'date-fns/locale/eo'
 * var result = parse(
 *   '28-a de februaro',
 *   'Do [de] MMMM',
 *   new Date(2010, 0, 1)
 *   {locale: eoLocale}
 * )
 * //=> Sun Feb 28 2010 00:00:00
 */
function parse (dirtyDateString, dirtyFormatString, dirtyBaseDate, dirtyOptions) {
  if (arguments.length < 3) {
    throw new TypeError('3 arguments required, but only ' + arguments.length + ' present')
  }

  var dateString = String(dirtyDateString);
  var options = dirtyOptions || {};

  var weekStartsOn = options.weekStartsOn === undefined ? 0 : Number(options.weekStartsOn);

  // Test if weekStartsOn is between 0 and 6 _and_ is not NaN
  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively')
  }

  var locale = options.locale || locale$2;
  var localeParsers = locale.parsers || {};
  var localeUnits = locale.units || {};

  if (!locale.match) {
    throw new RangeError('locale must contain match property')
  }

  if (!locale.formatLong) {
    throw new RangeError('locale must contain formatLong property')
  }

  var formatString = String(dirtyFormatString)
    .replace(longFormattingTokensRegExp$1, function (substring) {
      if (substring[0] === '[') {
        return substring
      }

      if (substring[0] === '\\') {
        return cleanEscapedString$1(substring)
      }

      return locale.formatLong(substring)
    });

  if (formatString === '') {
    if (dateString === '') {
      return toDate(dirtyBaseDate, options)
    } else {
      return new Date(NaN)
    }
  }

  var subFnOptions = cloneObject(options);
  subFnOptions.locale = locale;

  var tokens = formatString.match(locale.parsingTokensRegExp || defaultParsingTokensRegExp);
  var tokensLength = tokens.length;

  // If timezone isn't specified, it will be set to the system timezone
  var setters = [{
    priority: TIMEZONE_UNIT_PRIORITY,
    set: dateToSystemTimezone,
    index: 0
  }];

  var i;
  for (i = 0; i < tokensLength; i++) {
    var token = tokens[i];
    var parser = localeParsers[token] || parsers[token];
    if (parser) {
      var matchResult;

      if (parser.match instanceof RegExp) {
        matchResult = parser.match.exec(dateString);
      } else {
        matchResult = parser.match(dateString, subFnOptions);
      }

      if (!matchResult) {
        return new Date(NaN)
      }

      var unitName = parser.unit;
      var unit = localeUnits[unitName] || units[unitName];

      setters.push({
        priority: unit.priority,
        set: unit.set,
        value: parser.parse(matchResult, subFnOptions),
        index: setters.length
      });

      var substring = matchResult[0];
      dateString = dateString.slice(substring.length);
    } else {
      var head = tokens[i].match(/^\[.*]$/) ? tokens[i].replace(/^\[|]$/g, '') : tokens[i];
      if (dateString.indexOf(head) === 0) {
        dateString = dateString.slice(head.length);
      } else {
        return new Date(NaN)
      }
    }
  }

  var uniquePrioritySetters = setters
    .map(function (setter) {
      return setter.priority
    })
    .sort(function (a, b) {
      return a - b
    })
    .filter(function (priority, index, array) {
      return array.indexOf(priority) === index
    })
    .map(function (priority) {
      return setters
        .filter(function (setter) {
          return setter.priority === priority
        })
        .reverse()
    })
    .map(function (setterArray) {
      return setterArray[0]
    });

  var date = toDate(dirtyBaseDate, options);

  if (isNaN(date)) {
    return new Date(NaN)
  }

  // Convert the date in system timezone to the same date in UTC+00:00 timezone.
  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37
  var utcDate = subMinutes(date, date.getTimezoneOffset());

  var dateValues = {date: utcDate};

  var settersLength = uniquePrioritySetters.length;
  for (i = 0; i < settersLength; i++) {
    var setter = uniquePrioritySetters[i];
    dateValues = setter.set(dateValues, setter.value, subFnOptions);
  }

  return dateValues.date
}

function dateToSystemTimezone (dateValues) {
  var date = dateValues.date;
  var time = date.getTime();

  // Get the system timezone offset at (moment of time - offset)
  var offset = date.getTimezoneOffset();

  // Get the system timezone offset at the exact moment of time
  offset = new Date(time + offset * MILLISECONDS_IN_MINUTE$6).getTimezoneOffset();

  // Convert date in timezone "UTC+00:00" to the system timezone
  dateValues.date = new Date(time + offset * MILLISECONDS_IN_MINUTE$6);

  return dateValues
}

function cleanEscapedString$1 (input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, '')
  }
  return input.replace(/\\/g, '')
}

// This file is generated automatically by `scripts/build/indices.js`. Please, don't change it.

/**
 * Custom parse behavior on top of date-fns parse function.
 * @param {String} date
 * @param {String} format
 * @return {Date|null}
 */
var parseDate$1 = function (date, format$$1) {
  var parsed = parse(date, format$$1, new Date());

  // if date is not valid or the formatted output after parsing does not match
  // the string value passed in (avoids overflows)
  if (!isValid(parsed) || format(parsed, format$$1) !== date) {
    return null;
  }

  return parsed;
};

var after = function (value, ref) {
  var otherValue = ref[0];
  var inclusion = ref[1];
  var format = ref[2];

  if (typeof format === 'undefined') {
    format = inclusion;
    inclusion = false;
  }
  value = parseDate$1(value, format);
  otherValue = parseDate$1(otherValue, format);

  // if either is not valid.
  if (!value || !otherValue) {
    return false;
  }

  return isAfter(value, otherValue) || (inclusion && isEqual$1(value, otherValue));
};

/**
 * Some Alpha Regex helpers.
 * https://github.com/chriso/validator.js/blob/master/src/lib/alpha.js
 */

var alpha$1 = {
  en: /^[A-Z]*$/i,
  cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
  da: /^[A-ZÆØÅ]*$/i,
  de: /^[A-ZÄÖÜß]*$/i,
  es: /^[A-ZÁÉÍÑÓÚÜ]*$/i,
  fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
  lt: /^[A-ZĄČĘĖĮŠŲŪŽ]*$/i,
  nl: /^[A-ZÉËÏÓÖÜ]*$/i,
  hu: /^[A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
  pl: /^[A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
  pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
  ru: /^[А-ЯЁ]*$/i,
  sk: /^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,
  sr: /^[A-ZČĆŽŠĐ]*$/i,
  tr: /^[A-ZÇĞİıÖŞÜ]*$/i,
  uk: /^[А-ЩЬЮЯЄІЇҐ]*$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/
};

var alphaSpaces = {
  en: /^[A-Z\s]*$/i,
  cs: /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ\s]*$/i,
  da: /^[A-ZÆØÅ\s]*$/i,
  de: /^[A-ZÄÖÜß\s]*$/i,
  es: /^[A-ZÁÉÍÑÓÚÜ\s]*$/i,
  fr: /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ\s]*$/i,
  lt: /^[A-ZĄČĘĖĮŠŲŪŽ\s]*$/i,
  nl: /^[A-ZÉËÏÓÖÜ\s]*$/i,
  hu: /^[A-ZÁÉÍÓÖŐÚÜŰ\s]*$/i,
  pl: /^[A-ZĄĆĘŚŁŃÓŻŹ\s]*$/i,
  pt: /^[A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ\s]*$/i,
  ru: /^[А-ЯЁ\s]*$/i,
  sk: /^[A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ\s]*$/i,
  sr: /^[A-ZČĆŽŠĐ\s]*$/i,
  tr: /^[A-ZÇĞİıÖŞÜ\s]*$/i,
  uk: /^[А-ЩЬЮЯЄІЇҐ\s]*$/i,
  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ\s]*$/
};

var alphanumeric = {
  en: /^[0-9A-Z]*$/i,
  cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]*$/i,
  da: /^[0-9A-ZÆØÅ]$/i,
  de: /^[0-9A-ZÄÖÜß]*$/i,
  es: /^[0-9A-ZÁÉÍÑÓÚÜ]*$/i,
  fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]*$/i,
  lt: /^[0-9A-ZĄČĘĖĮŠŲŪŽ]*$/i,
  hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]*$/i,
  nl: /^[0-9A-ZÉËÏÓÖÜ]*$/i,
  pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]*$/i,
  pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ]*$/i,
  ru: /^[0-9А-ЯЁ]*$/i,
  sk: /^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ]*$/i,
  sr: /^[0-9A-ZČĆŽŠĐ]*$/i,
  tr: /^[0-9A-ZÇĞİıÖŞÜ]*$/i,
  uk: /^[0-9А-ЩЬЮЯЄІЇҐ]*$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]*$/
};

var alphaDash = {
  en: /^[0-9A-Z_-]*$/i,
  cs: /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ_-]*$/i,
  da: /^[0-9A-ZÆØÅ_-]*$/i,
  de: /^[0-9A-ZÄÖÜß_-]*$/i,
  es: /^[0-9A-ZÁÉÍÑÓÚÜ_-]*$/i,
  fr: /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ_-]*$/i,
  lt: /^[0-9A-ZĄČĘĖĮŠŲŪŽ_-]*$/i,
  nl: /^[0-9A-ZÉËÏÓÖÜ_-]*$/i,
  hu: /^[0-9A-ZÁÉÍÓÖŐÚÜŰ_-]*$/i,
  pl: /^[0-9A-ZĄĆĘŚŁŃÓŻŹ_-]*$/i,
  pt: /^[0-9A-ZÃÁÀÂÇÉÊÍÕÓÔÚÜ_-]*$/i,
  ru: /^[0-9А-ЯЁ_-]*$/i,
  sk: /^[0-9A-ZÁÄČĎÉÍĹĽŇÓŔŠŤÚÝŽ_-]*$/i,
  sr: /^[0-9A-ZČĆŽŠĐ_-]*$/i,
  tr: /^[0-9A-ZÇĞİıÖŞÜ_-]*$/i,
  uk: /^[0-9А-ЩЬЮЯЄІЇҐ_-]*$/i,
  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ_-]*$/
};

var validate = function (value, ref) {
  if ( ref === void 0 ) ref = [null];
  var locale = ref[0];

  if (Array.isArray(value)) {
    return value.every(function (val) { return validate(val, [locale]); });
  }

  // Match at least one locale.
  if (! locale) {
    return Object.keys(alpha$1).some(function (loc) { return alpha$1[loc].test(value); });
  }

  return (alpha$1[locale] || alpha$1.en).test(value);
};

var validate$1 = function (value, ref) {
  if ( ref === void 0 ) ref = [null];
  var locale = ref[0];

  if (Array.isArray(value)) {
    return value.every(function (val) { return validate$1(val, [locale]); });
  }

  // Match at least one locale.
  if (! locale) {
    return Object.keys(alphaDash).some(function (loc) { return alphaDash[loc].test(value); });
  }

  return (alphaDash[locale] || alphaDash.en).test(value);
};

var validate$2 = function (value, ref) {
  if ( ref === void 0 ) ref = [null];
  var locale = ref[0];

  if (Array.isArray(value)) {
    return value.every(function (val) { return validate$2(val, [locale]); });
  }

  // Match at least one locale.
  if (! locale) {
    return Object.keys(alphanumeric).some(function (loc) { return alphanumeric[loc].test(value); });
  }

  return (alphanumeric[locale] || alphanumeric.en).test(value);
};

var validate$3 = function (value, ref) {
  if ( ref === void 0 ) ref = [null];
  var locale = ref[0];

  if (Array.isArray(value)) {
    return value.every(function (val) { return validate$3(val, [locale]); });
  }

  // Match at least one locale.
  if (! locale) {
    return Object.keys(alphaSpaces).some(function (loc) { return alphaSpaces[loc].test(value); });
  }

  return (alphaSpaces[locale] || alphaSpaces.en).test(value);
};

var before = function (value, ref) {
  var otherValue = ref[0];
  var inclusion = ref[1];
  var format = ref[2];

  if (typeof format === 'undefined') {
    format = inclusion;
    inclusion = false;
  }
  value = parseDate$1(value, format);
  otherValue = parseDate$1(otherValue, format);

  // if either is not valid.
  if (!value || !otherValue) {
    return false;
  }

  return isBefore(value, otherValue) || (inclusion && isEqual$1(value, otherValue));
};

var validate$4 = function (value, ref) {
  var min = ref[0];
  var max = ref[1];

  if (Array.isArray(value)) {
    return value.every(function (val) { return validate$4(val, [min, max]); });
  }

  return Number(min) <= value && Number(max) >= value;
};

var confirmed = function (value, other) { return String(value) === String(other); };

function unwrapExports (x) {
	return x && x.__esModule ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var assertString_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = assertString;
function assertString(input) {
  var isString = typeof input === 'string' || input instanceof String;

  if (!isString) {
    throw new TypeError('This library (validator.js) validates strings only');
  }
}
module.exports = exports['default'];
});

unwrapExports(assertString_1);

var isCreditCard_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isCreditCard;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable max-len */
var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|62[0-9]{14})$/;
/* eslint-enable max-len */

function isCreditCard(str) {
  (0, _assertString2.default)(str);
  var sanitized = str.replace(/[- ]+/g, '');
  if (!creditCard.test(sanitized)) {
    return false;
  }
  var sum = 0;
  var digit = void 0;
  var tmpNum = void 0;
  var shouldDouble = void 0;
  for (var i = sanitized.length - 1; i >= 0; i--) {
    digit = sanitized.substring(i, i + 1);
    tmpNum = parseInt(digit, 10);
    if (shouldDouble) {
      tmpNum *= 2;
      if (tmpNum >= 10) {
        sum += tmpNum % 10 + 1;
      } else {
        sum += tmpNum;
      }
    } else {
      sum += tmpNum;
    }
    shouldDouble = !shouldDouble;
  }
  return !!(sum % 10 === 0 ? sanitized : false);
}
module.exports = exports['default'];
});

var isCreditCard = unwrapExports(isCreditCard_1);

var credit_card = function (value) { return isCreditCard(String(value)); };

var validate$5 = function (value, params) {
  var decimals = Array.isArray(params) ? (params[0] || '*') : '*';
  if (Array.isArray(value)) {
    return value.every(function (val) { return validate$5(val, params); });
  }

  if (value === null || value === undefined || value === '') {
    return true;
  }

  // if is 0.
  if (Number(decimals) === 0) {
    return /^-?\d*$/.test(value);
  }

  var regexPart = decimals === '*' ? '+' : ("{1," + decimals + "}");
  var regex = new RegExp(("^-?\\d*(\\.\\d" + regexPart + ")?$"));

  if (! regex.test(value)) {
    return false;
  }

  var parsedValue = parseFloat(value);

  // eslint-disable-next-line
    return parsedValue === parsedValue;
};

var date_between = function (value, params) {
  var min;
  var max;
  var format;
  var inclusivity = '()';

  if (params.length > 3) {
    var assign;
    (assign = params, min = assign[0], max = assign[1], inclusivity = assign[2], format = assign[3]);
  } else {
    var assign$1;
    (assign$1 = params, min = assign$1[0], max = assign$1[1], format = assign$1[2]);
  }

  var minDate = parseDate$1(min, format);
  var maxDate = parseDate$1(max, format);
  var dateVal = parseDate$1(value, format);

  if (!minDate || !maxDate || !dateVal) {
    return false;
  }

  if (inclusivity === '()') {
    return isAfter(dateVal, minDate) && isBefore(dateVal, maxDate);
  }

  if (inclusivity === '(]') {
    return isAfter(dateVal, minDate) && (isEqual$1(dateVal, maxDate) || isBefore(dateVal, maxDate));
  }

  if (inclusivity === '[)') {
    return isBefore(dateVal, maxDate) && (isEqual$1(dateVal, minDate) || isAfter(dateVal, minDate));
  }

  return isEqual$1(dateVal, maxDate) || isEqual$1(dateVal, minDate) ||
        (isBefore(dateVal, maxDate) && isAfter(dateVal, minDate));
};

var date_format = function (value, ref) {
  var format = ref[0];

  return !!parseDate$1(value, format);
};

var validate$6 = function (value, ref) {
  var length = ref[0];

  if (Array.isArray(value)) {
    return value.every(function (val) { return validate$6(val, [length]); });
  }
  var strVal = String(value);

  return /^[0-9]*$/.test(strVal) && strVal.length === Number(length);
};

var validateImage = function (file, width, height) {
  var URL = window.URL || window.webkitURL;
  return new Promise(function (resolve) {
    var image = new Image();
    image.onerror = function () { return resolve({ valid: false }); };
    image.onload = function () { return resolve({
      valid: image.width === Number(width) && image.height === Number(height)
    }); };

    image.src = URL.createObjectURL(file);
  });
};

var dimensions = function (files, ref) {
  var width = ref[0];
  var height = ref[1];

  var list = [];
  for (var i = 0; i < files.length; i++) {
    // if file is not an image, reject.
    if (! /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(files[i].name)) {
      return false;
    }

    list.push(files[i]);
  }

  return Promise.all(list.map(function (file) { return validateImage(file, width, height); }));
};

var merge_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = merge;
function merge() {
  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var defaults = arguments[1];

  for (var key in defaults) {
    if (typeof obj[key] === 'undefined') {
      obj[key] = defaults[key];
    }
  }
  return obj;
}
module.exports = exports['default'];
});

unwrapExports(merge_1);

var isByteLength_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isByteLength;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable prefer-rest-params */
function isByteLength(str, options) {
  (0, _assertString2.default)(str);
  var min = void 0;
  var max = void 0;
  if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
    min = options.min || 0;
    max = options.max;
  } else {
    // backwards compatibility: isByteLength(str, min [, max])
    min = arguments[1];
    max = arguments[2];
  }
  var len = encodeURI(str).split(/%..|./).length - 1;
  return len >= min && (typeof max === 'undefined' || len <= max);
}
module.exports = exports['default'];
});

unwrapExports(isByteLength_1);

var isFQDN = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isFDQN;



var _assertString2 = _interopRequireDefault(assertString_1);



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_fqdn_options = {
  require_tld: true,
  allow_underscores: false,
  allow_trailing_dot: false
};

function isFDQN(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_fqdn_options);

  /* Remove the optional trailing dot before checking validity */
  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
    str = str.substring(0, str.length - 1);
  }
  var parts = str.split('.');
  if (options.require_tld) {
    var tld = parts.pop();
    if (!parts.length || !/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
      return false;
    }
    // disallow spaces
    if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20]/.test(tld)) {
      return false;
    }
  }
  for (var part, i = 0; i < parts.length; i++) {
    part = parts[i];
    if (options.allow_underscores) {
      part = part.replace(/_/g, '');
    }
    if (!/^[a-z\u00a1-\uffff0-9-]+$/i.test(part)) {
      return false;
    }
    // disallow full-width chars
    if (/[\uff01-\uff5e]/.test(part)) {
      return false;
    }
    if (part[0] === '-' || part[part.length - 1] === '-') {
      return false;
    }
  }
  return true;
}
module.exports = exports['default'];
});

unwrapExports(isFQDN);

var isEmail_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isEmail;



var _assertString2 = _interopRequireDefault(assertString_1);



var _merge2 = _interopRequireDefault(merge_1);



var _isByteLength2 = _interopRequireDefault(isByteLength_1);



var _isFQDN2 = _interopRequireDefault(isFQDN);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_email_options = {
  allow_display_name: false,
  require_display_name: false,
  allow_utf8_local_part: true,
  require_tld: true
};

/* eslint-disable max-len */
/* eslint-disable no-control-regex */
var displayName = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\,\.\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF\s]*<(.+)>$/i;
var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
/* eslint-enable max-len */
/* eslint-enable no-control-regex */

function isEmail(str, options) {
  (0, _assertString2.default)(str);
  options = (0, _merge2.default)(options, default_email_options);

  if (options.require_display_name || options.allow_display_name) {
    var display_email = str.match(displayName);
    if (display_email) {
      str = display_email[1];
    } else if (options.require_display_name) {
      return false;
    }
  }

  var parts = str.split('@');
  var domain = parts.pop();
  var user = parts.join('@');

  var lower_domain = domain.toLowerCase();
  if (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com') {
    user = user.replace(/\./g, '').toLowerCase();
  }

  if (!(0, _isByteLength2.default)(user, { max: 64 }) || !(0, _isByteLength2.default)(domain, { max: 254 })) {
    return false;
  }

  if (!(0, _isFQDN2.default)(domain, { require_tld: options.require_tld })) {
    return false;
  }

  if (user[0] === '"') {
    user = user.slice(1, user.length - 1);
    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
  }

  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;

  var user_parts = user.split('.');
  for (var i = 0; i < user_parts.length; i++) {
    if (!pattern.test(user_parts[i])) {
      return false;
    }
  }

  return true;
}
module.exports = exports['default'];
});

var isEmail = unwrapExports(isEmail_1);

var validate$7 = function (value) {
  if (Array.isArray(value)) {
    return value.every(function (val) { return isEmail(String(val)); });
  }

  return isEmail(String(value));
};

var ext = function (files, extensions) {
  var regex = new RegExp((".(" + (extensions.join('|')) + ")$"), 'i');

  return files.every(function (file) { return regex.test(file.name); });
};

var image = function (files) { return files.every(function (file) { return /\.(jpg|svg|jpeg|png|bmp|gif)$/i.test(file.name); }
); };

var validate$8 = function (value, options) {
  if (Array.isArray(value)) {
    return value.every(function (val) { return validate$8(val, options); });
  }

  // eslint-disable-next-line
  return !! options.filter(function (option) { return option == value; }).length;
};

var isIP_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isIP;



var _assertString2 = _interopRequireDefault(assertString_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ipv4Maybe = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
var ipv6Block = /^[0-9A-F]{1,4}$/i;

function isIP(str) {
  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  (0, _assertString2.default)(str);
  version = String(version);
  if (!version) {
    return isIP(str, 4) || isIP(str, 6);
  } else if (version === '4') {
    if (!ipv4Maybe.test(str)) {
      return false;
    }
    var parts = str.split('.').sort(function (a, b) {
      return a - b;
    });
    return parts[3] <= 255;
  } else if (version === '6') {
    var blocks = str.split(':');
    var foundOmissionBlock = false; // marker to indicate ::

    // At least some OS accept the last 32 bits of an IPv6 address
    // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
    // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
    // and '::a.b.c.d' is deprecated, but also valid.
    var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
    var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

    if (blocks.length > expectedNumberOfBlocks) {
      return false;
    }
    // initial or final ::
    if (str === '::') {
      return true;
    } else if (str.substr(0, 2) === '::') {
      blocks.shift();
      blocks.shift();
      foundOmissionBlock = true;
    } else if (str.substr(str.length - 2) === '::') {
      blocks.pop();
      blocks.pop();
      foundOmissionBlock = true;
    }

    for (var i = 0; i < blocks.length; ++i) {
      // test for a :: which can not be at the string start/end
      // since those cases have been handled above
      if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
        if (foundOmissionBlock) {
          return false; // multiple :: in address
        }
        foundOmissionBlock = true;
      } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {
        // it has been checked before that the last
        // block is a valid IPv4 address
      } else if (!ipv6Block.test(blocks[i])) {
        return false;
      }
    }
    if (foundOmissionBlock) {
      return blocks.length >= 1;
    }
    return blocks.length === expectedNumberOfBlocks;
  }
  return false;
}
module.exports = exports['default'];
});

var isIP = unwrapExports(isIP_1);

var ip = function (value, ref) {
  if ( ref === void 0 ) ref = [4];
  var version = ref[0];

  if (Array.isArray(value)) {
    return value.every(function (val) { return isIP(val, [version]); });
  }

  return isIP(value, version);
};

/**
 * @param {Array|String} value 
 * @param {Number} length
 * @param {Number} max 
 */
var compare = function (value, length, max) {
  if (max === undefined) {
    return value.length === length;
  }

  // cast to number.
  max = Number(max);

  return value.length >= length && value.length <= max;
};

var length = function (value, ref) {
  var length = ref[0];
  var max = ref[1]; if ( max === void 0 ) max = undefined;

  length = Number(length);
  if (value === undefined || value === null) {
    return false;
  }

  if (typeof value === 'number') {
    value = String(value);
  }

  if (!value.length) {
    value = toArray(value);
  }

  return compare(value, length, max);
};

var integer = function (value) {
  if (Array.isArray(value)) {
    return value.every(function (val) { return /^-?[0-9]+$/.test(String(val)); });
  }

  return /^-?[0-9]+$/.test(String(value));
};

var max$1 = function (value, ref) {
  var length = ref[0];

  if (value === undefined || value === null) {
    return length >= 0;
  }

  return String(value).length <= length;
};

var max_value = function (value, ref) {
  var max = ref[0];

  if (Array.isArray(value) || value === null || value === undefined || value === '') {
    return false;
  }

  return Number(value) <= max;
};

var mimes = function (files, mimes) {
  var regex = new RegExp(((mimes.join('|').replace('*', '.+')) + "$"), 'i');

  return files.every(function (file) { return regex.test(file.type); });
};

var min$1 = function (value, ref) {
  var length = ref[0];

  if (value === undefined || value === null) {
    return false;
  }
  return String(value).length >= length;
};

var min_value = function (value, ref) {
  var min = ref[0];

  if (Array.isArray(value) || value === null || value === undefined || value === '') {
    return false;
  }

  return Number(value) >= min;
};

var validate$9 = function (value, options) {
  if (Array.isArray(value)) {
    return value.every(function (val) { return validate$9(val, options); });
  }

  // eslint-disable-next-line
  return ! options.filter(function (option) { return option == value; }).length;
};

var numeric = function (value) {
  if (Array.isArray(value)) {
    return value.every(function (val) { return /^[0-9]+$/.test(String(val)); });
  }

  return /^[0-9]+$/.test(String(value));
};

var regex = function (value, ref) {
  var regex = ref[0];
  var flags = ref.slice(1);

  if (regex instanceof RegExp) {
    return regex.test(value);
  }

  return new RegExp(regex, flags).test(String(value));
};

var required = function (value, params) {
  if ( params === void 0 ) params = [false];

  if (Array.isArray(value)) {
    return !! value.length;
  }

  // incase a field considers `false` as an empty value like checkboxes.
  var invalidateFalse = params[0];
  if (value === false && invalidateFalse) {
    return false;
  }

  if (value === undefined || value === null) {
    return false;
  }

  return !! String(value).trim().length;
};

var size = function (files, ref) {
  var size = ref[0];

  if (isNaN(size)) {
    return false;
  }

  var nSize = Number(size) * 1024;
  for (var i = 0; i < files.length; i++) {
    if (files[i].size > nSize) {
      return false;
    }
  }

  return true;
};

var isURL_1 = createCommonjsModule(function (module, exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isURL;



var _assertString2 = _interopRequireDefault(assertString_1);



var _isFQDN2 = _interopRequireDefault(isFQDN);



var _isIP2 = _interopRequireDefault(isIP_1);



var _merge2 = _interopRequireDefault(merge_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var default_url_options = {
  protocols: ['http', 'https', 'ftp'],
  require_tld: true,
  require_protocol: false,
  require_host: true,
  require_valid_protocol: true,
  allow_underscores: false,
  allow_trailing_dot: false,
  allow_protocol_relative_urls: false
};

var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

function isRegExp(obj) {
  return Object.prototype.toString.call(obj) === '[object RegExp]';
}

function checkHost(host, matches) {
  for (var i = 0; i < matches.length; i++) {
    var match = matches[i];
    if (host === match || isRegExp(match) && match.test(host)) {
      return true;
    }
  }
  return false;
}

function isURL(url, options) {
  (0, _assertString2.default)(url);
  if (!url || url.length >= 2083 || /[\s<>]/.test(url)) {
    return false;
  }
  if (url.indexOf('mailto:') === 0) {
    return false;
  }
  options = (0, _merge2.default)(options, default_url_options);
  var protocol = void 0,
      auth = void 0,
      host = void 0,
      hostname = void 0,
      port = void 0,
      port_str = void 0,
      split = void 0,
      ipv6 = void 0;

  split = url.split('#');
  url = split.shift();

  split = url.split('?');
  url = split.shift();

  split = url.split('://');
  if (split.length > 1) {
    protocol = split.shift();
    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
      return false;
    }
  } else if (options.require_protocol) {
    return false;
  } else if (options.allow_protocol_relative_urls && url.substr(0, 2) === '//') {
    split[0] = url.substr(2);
  }
  url = split.join('://');

  if (url === '') {
    return false;
  }

  split = url.split('/');
  url = split.shift();

  if (url === '' && !options.require_host) {
    return true;
  }

  split = url.split('@');
  if (split.length > 1) {
    auth = split.shift();
    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
      return false;
    }
  }
  hostname = split.join('@');

  port_str = null;
  ipv6 = null;
  var ipv6_match = hostname.match(wrapped_ipv6);
  if (ipv6_match) {
    host = '';
    ipv6 = ipv6_match[1];
    port_str = ipv6_match[2] || null;
  } else {
    split = hostname.split(':');
    host = split.shift();
    if (split.length) {
      port_str = split.join(':');
    }
  }

  if (port_str !== null) {
    port = parseInt(port_str, 10);
    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
      return false;
    }
  }

  if (!(0, _isIP2.default)(host) && !(0, _isFQDN2.default)(host, options) && (!ipv6 || !(0, _isIP2.default)(ipv6, 6))) {
    return false;
  }

  host = host || ipv6;

  if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
    return false;
  }
  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
    return false;
  }

  return true;
}
module.exports = exports['default'];
});

var isURL = unwrapExports(isURL_1);

var url = function (value, ref) {
  if ( ref === void 0 ) ref = [true];
  var requireProtocol = ref[0];

  var options = { require_protocol: !!requireProtocol, allow_underscores: true };
  if (Array.isArray(value)) {
    return value.every(function (val) { return isURL(val, options); });
  }

  return isURL(value, options);
};

/* eslint-disable camelcase */
var Rules = {
  after: after,
  alpha_dash: validate$1,
  alpha_num: validate$2,
  alpha_spaces: validate$3,
  alpha: validate,
  before: before,
  between: validate$4,
  confirmed: confirmed,
  credit_card: credit_card,
  date_between: date_between,
  date_format: date_format,
  decimal: validate$5,
  digits: validate$6,
  dimensions: dimensions,
  email: validate$7,
  ext: ext,
  image: image,
  in: validate$8,
  integer: integer,
  length: length,
  ip: ip,
  max: max$1,
  max_value: max_value,
  mimes: mimes,
  min: min$1,
  min_value: min_value,
  not_in: validate$9,
  numeric: numeric,
  regex: regex,
  required: required,
  size: size,
  url: url
};

var normalize = function (fields) {
  if (Array.isArray(fields)) {
    return fields.reduce(function (prev, curr) {
      if (~curr.indexOf('.')) {
        prev[curr.split('.')[1]] = curr;
      } else {
        prev[curr] = curr;
      }

      return prev;
    }, {});
  }

  return fields;
};

/**
 * Maps fields to computed functions.
 *
 * @param {Array|Object} fields
 */
var mapFields = function (fields) {
  var normalized = normalize(fields);
  return Object.keys(normalized).reduce(function (prev, curr) {
    var field = normalized[curr];
    prev[curr] = function mappedField () {
      // if field exists
      if (this.$validator.flags[field]) {
        return this.$validator.flags[field];
      }

      // if it has a scope defined
      var index = field.indexOf('.');
      if (index <= 0) {
        return {};
      }

      var ref = field.split('.');
      var scope = ref[0];
      var name = ref.slice(1);
      scope = this.$validator.flags[("$" + scope)];
      name = name.join('.');

      if (scope && scope[name]) {
        return scope[name];
      }

      return {};
    };

    return prev;
  }, {});
};

var version = '2.0.0-rc.19';

var rulesPlugin = function (ref) {
  var Validator$$1 = ref.Validator;

  Object.keys(Rules).forEach(function (rule) {
    Validator$$1.extend(rule, Rules[rule]);
  });

  // Merge the english messages.
  Validator$$1.localize('en', {
    messages: messages
  });
};

use(rulesPlugin);

var index_esm = {
  install: install,
  use: use,
  mapFields: mapFields,
  Validator: Validator,
  ErrorBag: ErrorBag,
  Rules: Rules,
  version: version
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),

/***/ 71:
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
        _c("div", { staticClass: "row" }, [
          _c(
            "h4",
            {
              staticClass: "modal-title text-center",
              staticStyle: { color: "#EC1B33" }
            },
            [_vm._v("DOWNLOAD NOW")]
          ),
          _vm._v(" "),
          _c(
            "form",
            {
              attrs: { id: "form-section-projects" },
              on: {
                submit: function($event) {
                  $event.preventDefault()
                  _vm.validateBeforeSubmit(_vm.payload)
                }
              }
            },
            [
              _c("p", { staticStyle: { color: "#4d4c4c" } }, [
                _vm._v(
                  "Just fill in your details below and download the Ebook "
                )
              ]),
              _vm._v(" "),
              _vm._l(_vm.payload, function(data, index) {
                return _c(
                  "div",
                  {
                    model: {
                      value: _vm.payload,
                      callback: function($$v) {
                        _vm.payload = $$v
                      },
                      expression: "payload"
                    }
                  },
                  [
                    data.fieldType == "text-field"
                      ? _c(
                          "div",
                          {
                            staticClass: "form-group col-lg-6 padding-bottom",
                            class: { "has-error": _vm.errors.has(data.value) }
                          },
                          [
                            _c("label", { staticClass: "label" }, [
                              _vm._v(_vm._s(data.label))
                            ]),
                            _vm._v(" "),
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: data.post,
                                  expression: "data.post"
                                },
                                { name: "validate", rawName: "v-validate" }
                              ],
                              staticClass:
                                "form-control text-center margin-bottom-none",
                              attrs: {
                                name: data.value,
                                "data-vv-rules": data.rules,
                                "data-vv-validate-on": _vm.validateForm,
                                type: "text",
                                placeholder: data.label
                              },
                              domProps: { value: data.post },
                              on: {
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  data.post = $event.target.value
                                }
                              }
                            }),
                            _vm._v(" "),
                            _c(
                              "span",
                              {
                                directives: [
                                  {
                                    name: "show",
                                    rawName: "v-show",
                                    value: _vm.errors.has(data.value),
                                    expression: "errors.has(data.value)"
                                  }
                                ],
                                staticClass:
                                  "help-block text-danger text-center"
                              },
                              [
                                _c("strong", [
                                  _vm._v(_vm._s(_vm.errors.first(data.value)))
                                ])
                              ]
                            )
                          ]
                        )
                      : _vm._e()
                  ]
                )
              }),
              _vm._v(" "),
              _vm._m(0)
            ],
            2
          )
        ])
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-lg-12" }, [
      _c(
        "button",
        {
          staticClass: "ladda-button ladda-button-selector btn btn-primary",
          attrs: { "data-style": "zoom-in", type: "submit" }
        },
        [_vm._v("Submit\n                    ")]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-ca7087ba", module.exports)
  }
}

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOTIxNjMxMDNlMjIxZGMxOGU4MzgiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2NvbXBvbmVudC1ub3JtYWxpemVyLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvcHJvamVjdHMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vLy4vcmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Zvcm1zL2Zvcm1zLmpzIiwid2VicGFjazovLy8uL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9mb3Jtcy9Gb3Jtcy52dWUiLCJ3ZWJwYWNrOi8vL0Zvcm1zLnZ1ZSIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdmVlLXZhbGlkYXRlL2Rpc3QvdmVlLXZhbGlkYXRlLmVzbS5qcyIsIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvYXNzZXRzL2pzL2NvbXBvbmVudHMvZm9ybXMvRm9ybXMudnVlPzliZDMiXSwibmFtZXMiOlsic2VsZiIsIl9pc0luaXQiLCJmb3Jtc0NvbXBvbmVudCIsInJlcXVpcmUiLCJzdGFydCIsImNvbnNvbGUiLCJsb2ciLCJfcmVxdWVzdCIsIl9mb3JtIiwiVnVlIiwiZWwiLCJtaXhpbnMiLCJiZWZvcmVDcmVhdGUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhE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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsRUFBRTtBQUNiLFdBQVcsUUFBUSxvREFBb0Q7QUFDdkUsV0FBVyxNQUFNO0FBQ2pCLGFBQWEsS0FBSztBQUNsQixZQUFZLFVBQVU7QUFDdEIsWUFBWSxXQUFXO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxvQkFBb0I7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtB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RixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsdUVBQXVFLGdCQUFnQjtBQUN2RixHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxrRUFBa0Usa0JBQWtCO0FBQ3BGLEdBQUc7O0FBRUg7QUFDQTtBQUNBLGtFQUFrRSxrQkFBa0I7QUFDcEYsR0FBRzs7QUFFSDtBQUNBO0FBQ0Esa0VBQWtFLGFBQWE7QUFDL0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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O0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkRBQTZELHVDQUF1QztBQUNwRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLG1CQUFtQjtBQUM5QixXQUFXLFFBQVEsb0RBQW9EO0FBQ3ZFLFdBQVcsTUFBTSxpRUFBaUU7QUFDbEYsV0FBVyxPQUFPLGtFQUFrRTtBQUNwRixXQUFXLGNBQWM7QUFDekIsYUFBYSxLQUFLO0FBQ2xCLFlBQVksVUFBVTtBQUN0QixZQUFZLFdBQVc7QUFDdkIsWUFBWSxXQUFXO0FBQ3ZCLFlBQVksV0FBVztBQUN2QixZQUFZLFdBQVc7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0I7O0FBRXBCO0FBQ0EsYUFBYSxtQkFBbUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDLDJCQUEyQjtBQUMzQjtBQUNBLHlDQUF5Qyx1QkFBdUI7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakMsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix5Q0FBeUMsbUJBQW1CO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwyQkFBMkI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEIsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQyIsImZpbGUiOiIvanMvcHJvamVjdHMvcHJvamVjdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2NSk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgOTIxNjMxMDNlMjIxZGMxOGU4MzgiLCIvKiBnbG9iYWxzIF9fVlVFX1NTUl9DT05URVhUX18gKi9cblxuLy8gdGhpcyBtb2R1bGUgaXMgYSBydW50aW1lIHV0aWxpdHkgZm9yIGNsZWFuZXIgY29tcG9uZW50IG1vZHVsZSBvdXRwdXQgYW5kIHdpbGxcbi8vIGJlIGluY2x1ZGVkIGluIHRoZSBmaW5hbCB3ZWJwYWNrIHVzZXIgYnVuZGxlXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgcmF3U2NyaXB0RXhwb3J0cyxcbiAgY29tcGlsZWRUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyIC8qIHNlcnZlciBvbmx5ICovXG4pIHtcbiAgdmFyIGVzTW9kdWxlXG4gIHZhciBzY3JpcHRFeHBvcnRzID0gcmF3U2NyaXB0RXhwb3J0cyA9IHJhd1NjcmlwdEV4cG9ydHMgfHwge31cblxuICAvLyBFUzYgbW9kdWxlcyBpbnRlcm9wXG4gIHZhciB0eXBlID0gdHlwZW9mIHJhd1NjcmlwdEV4cG9ydHMuZGVmYXVsdFxuICBpZiAodHlwZSA9PT0gJ29iamVjdCcgfHwgdHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVzTW9kdWxlID0gcmF3U2NyaXB0RXhwb3J0c1xuICAgIHNjcmlwdEV4cG9ydHMgPSByYXdTY3JpcHRFeHBvcnRzLmRlZmF1bHRcbiAgfVxuXG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAoY29tcGlsZWRUZW1wbGF0ZSkge1xuICAgIG9wdGlvbnMucmVuZGVyID0gY29tcGlsZWRUZW1wbGF0ZS5yZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IGNvbXBpbGVkVGVtcGxhdGUuc3RhdGljUmVuZGVyRm5zXG4gIH1cblxuICAvLyBzY29wZWRJZFxuICBpZiAoc2NvcGVJZCkge1xuICAgIG9wdGlvbnMuX3Njb3BlSWQgPSBzY29wZUlkXG4gIH1cblxuICB2YXIgaG9va1xuICBpZiAobW9kdWxlSWRlbnRpZmllcikgeyAvLyBzZXJ2ZXIgYnVpbGRcbiAgICBob29rID0gZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICAgIC8vIDIuMyBpbmplY3Rpb25cbiAgICAgIGNvbnRleHQgPVxuICAgICAgICBjb250ZXh0IHx8IC8vIGNhY2hlZCBjYWxsXG4gICAgICAgICh0aGlzLiR2bm9kZSAmJiB0aGlzLiR2bm9kZS5zc3JDb250ZXh0KSB8fCAvLyBzdGF0ZWZ1bFxuICAgICAgICAodGhpcy5wYXJlbnQgJiYgdGhpcy5wYXJlbnQuJHZub2RlICYmIHRoaXMucGFyZW50LiR2bm9kZS5zc3JDb250ZXh0KSAvLyBmdW5jdGlvbmFsXG4gICAgICAvLyAyLjIgd2l0aCBydW5Jbk5ld0NvbnRleHQ6IHRydWVcbiAgICAgIGlmICghY29udGV4dCAmJiB0eXBlb2YgX19WVUVfU1NSX0NPTlRFWFRfXyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29udGV4dCA9IF9fVlVFX1NTUl9DT05URVhUX19cbiAgICAgIH1cbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgc3R5bGVzXG4gICAgICBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgICAgIGluamVjdFN0eWxlcy5jYWxsKHRoaXMsIGNvbnRleHQpXG4gICAgICB9XG4gICAgICAvLyByZWdpc3RlciBjb21wb25lbnQgbW9kdWxlIGlkZW50aWZpZXIgZm9yIGFzeW5jIGNodW5rIGluZmVycmVuY2VcbiAgICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzKSB7XG4gICAgICAgIGNvbnRleHQuX3JlZ2lzdGVyZWRDb21wb25lbnRzLmFkZChtb2R1bGVJZGVudGlmaWVyKVxuICAgICAgfVxuICAgIH1cbiAgICAvLyB1c2VkIGJ5IHNzciBpbiBjYXNlIGNvbXBvbmVudCBpcyBjYWNoZWQgYW5kIGJlZm9yZUNyZWF0ZVxuICAgIC8vIG5ldmVyIGdldHMgY2FsbGVkXG4gICAgb3B0aW9ucy5fc3NyUmVnaXN0ZXIgPSBob29rXG4gIH0gZWxzZSBpZiAoaW5qZWN0U3R5bGVzKSB7XG4gICAgaG9vayA9IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICB2YXIgZnVuY3Rpb25hbCA9IG9wdGlvbnMuZnVuY3Rpb25hbFxuICAgIHZhciBleGlzdGluZyA9IGZ1bmN0aW9uYWxcbiAgICAgID8gb3B0aW9ucy5yZW5kZXJcbiAgICAgIDogb3B0aW9ucy5iZWZvcmVDcmVhdGVcbiAgICBpZiAoIWZ1bmN0aW9uYWwpIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICBvcHRpb25zLmJlZm9yZUNyZWF0ZSA9IGV4aXN0aW5nXG4gICAgICAgID8gW10uY29uY2F0KGV4aXN0aW5nLCBob29rKVxuICAgICAgICA6IFtob29rXVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyByZWdpc3RlciBmb3IgZnVuY3Rpb2FsIGNvbXBvbmVudCBpbiB2dWUgZmlsZVxuICAgICAgb3B0aW9ucy5yZW5kZXIgPSBmdW5jdGlvbiByZW5kZXJXaXRoU3R5bGVJbmplY3Rpb24gKGgsIGNvbnRleHQpIHtcbiAgICAgICAgaG9vay5jYWxsKGNvbnRleHQpXG4gICAgICAgIHJldHVybiBleGlzdGluZyhoLCBjb250ZXh0KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZXNNb2R1bGU6IGVzTW9kdWxlLFxuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9jb21wb25lbnQtbm9ybWFsaXplci5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDEgMiIsIi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vLyAqKioqKiBQcml2YXRlIFZhcmlhYmxlcyAqKioqKlxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8qKlxuICogU2F2ZSB0aGlzIGluc3RhbmNlXG4gKiBAdHlwZSBAdGhpcztcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBzZWxmID0gdGhpcztcblxuLyoqXG4gKiBJZiBNb2R1bGUgaGFzIGJlZW4gaW5pdGlhdGVkXG4gKiBAdHlwZSBCb29sZWFuXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgX2lzSW5pdCA9IGZhbHNlOyAvLyB0byBhdm9pZCAncmViaW5kcydcblxuLyoqXG4gKiBGb3JtIENvbXBvbmVudCBpbnN0YW5jZVxuICovXG5jb25zdCBmb3Jtc0NvbXBvbmVudCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvZm9ybXMvZm9ybXMnKTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gKioqKiogUHVibGljIGZ1bmN0aW9ucyAqKioqKlxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBzdGFydFxuICpcbiAqIFN0YXJ0cyB0aGUgbW9kdWxlXG4gKiBJbml0cyBwcml2YXRlIHZhcmlhYmxlcyBhbmQgZXhlY3V0ZXMgc3BlY2lmaWMgbG9naWMgbmVlZGVkIGZvciB0aGUgbW9kdWxlXG4gKiB0byBzdGFydC5cbiAqXG4gKiBAcHVibGljXG4gKi9cbnRoaXMuc3RhcnQgPSBmdW5jdGlvbigpIHtcbiAgICBpZighX2lzSW5pdCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlByb2plY3QgYXJlYSBzdGFydGVkLi5cIik7XG5cbiAgICAgICAgLy8gSW5zdGFncmFtIGNvbXBvbmVudCBpbml0XG4gICAgICAgIGZvcm1zQ29tcG9uZW50LnN0YXJ0KCk7XG4gICAgfVxufTtcblxuc2VsZi5zdGFydCgpO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvcHJvamVjdHMvcHJvamVjdHMuanMiLCIvLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gKioqKiogUHJpdmF0ZSBWYXJpYWJsZXMgKioqKipcbi8vICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4vKipcbiAqIFNhdmUgdGhpcyBpbnN0YW5jZVxuICogQHR5cGUgQHRoaXM7XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgc2VsZiA9IHRoaXM7XG5cbi8qKlxuICogSWYgTW9kdWxlIGhhcyBiZWVuIGluaXRpYXRlZFxuICogQHR5cGUgQm9vbGVhblxuICogQHByaXZhdGVcbiAqL1xudmFyIF9pc0luaXQgPSBmYWxzZTsgLy8gdG8gYXZvaWQgJ3JlYmluZHMnXG5cbi8qKlxuICogUmVxdWVzdFxuICogQHR5cGUgU3RyaW5nXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgX3JlcXVlc3Q7XG5cbi8qKlxuICogRm9ybXMgSW5zdGFuY2VcbiAqL1xuaW1wb3J0IEZvcm1zIGZyb20gJy4vRm9ybXMudnVlJztcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbi8vICoqKioqIFByaXZhdGUgZnVuY3Rpb25zICoqKioqXG4vLyAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKlxuICogRm9ybXNcbiAqXG4gKiBDcmVhdGUgRm9ybXNcbiAqXG4gKi9cbnZhciBfZm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvLyBDcmVhdGUgYWxsIHJlcXVlc3RlZCBpbnN0YW5jZXNcbiAgICBuZXcgVnVlKHtcbiAgICAgICAgZWw6ICcjZm9ybXMnLFxuICAgICAgICBtaXhpbnM6IFtGb3Jtc10sXG5cbiAgICAgICAgYmVmb3JlQ3JlYXRlKCkge1xuICAgICAgICB9LFxuICAgIH0pO1xufTtcblxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLy8gKioqKiogUHVibGljIGZ1bmN0aW9ucyAqKioqKlxuLy8gKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuLyoqXG4gKiBzdGFydFxuICpcbiAqIFN0YXJ0cyB0aGUgbW9kdWxlXG4gKiBJbml0cyBwcml2YXRlIHZhcmlhYmxlcyBhbmQgZXhlY3V0ZXMgc3BlY2lmaWMgbG9naWMgbmVlZGVkIGZvciB0aGUgbW9kdWxlXG4gKiB0byBzdGFydC5cbiAqXG4gKiBAcmVxdWlyZWRcbiAqIEBwYXJhbSByZXF1ZXN0XG4gKiBAdHlwZSBhcnJheVxuICpcbiAqIEBwdWJsaWNcbiAqL1xuXG5zZWxmLnN0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gICAgaWYoIV9pc0luaXQpIHtcbiAgICAgICAgLy8gSW5pdCBGb3JtcyBDb21wb25lbnRcbiAgICAgICAgX2Zvcm0oKTtcbiAgICB9XG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9mb3Jtcy9mb3Jtcy5qcyIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG52YXIgbm9ybWFsaXplQ29tcG9uZW50ID0gcmVxdWlyZShcIiEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvY29tcG9uZW50LW5vcm1hbGl6ZXJcIilcbi8qIHNjcmlwdCAqL1xudmFyIF9fdnVlX3NjcmlwdF9fID0gcmVxdWlyZShcIiEhYmFiZWwtbG9hZGVyP3tcXFwiY2FjaGVEaXJlY3RvcnlcXFwiOnRydWUsXFxcInByZXNldHNcXFwiOltbXFxcImVudlxcXCIse1xcXCJtb2R1bGVzXFxcIjpmYWxzZSxcXFwidGFyZ2V0c1xcXCI6e1xcXCJicm93c2Vyc1xcXCI6W1xcXCI+IDIlXFxcIl0sXFxcInVnbGlmeVxcXCI6dHJ1ZX19XV0sXFxcInBsdWdpbnNcXFwiOltcXFwidHJhbnNmb3JtLW9iamVjdC1yZXN0LXNwcmVhZFxcXCJdfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL0Zvcm1zLnZ1ZVwiKVxuLyogdGVtcGxhdGUgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9fID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtY2E3MDg3YmFcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlfSEuLi8uLi8uLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vRm9ybXMudnVlXCIpXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxudmFyIENvbXBvbmVudCA9IG5vcm1hbGl6ZUNvbXBvbmVudChcbiAgX192dWVfc2NyaXB0X18sXG4gIF9fdnVlX3RlbXBsYXRlX18sXG4gIF9fdnVlX3N0eWxlc19fLFxuICBfX3Z1ZV9zY29wZUlkX18sXG4gIF9fdnVlX21vZHVsZV9pZGVudGlmaWVyX19cbilcbkNvbXBvbmVudC5vcHRpb25zLl9fZmlsZSA9IFwicmVzb3VyY2VzL2Fzc2V0cy9qcy9jb21wb25lbnRzL2Zvcm1zL0Zvcm1zLnZ1ZVwiXG5pZiAoQ29tcG9uZW50LmVzTW9kdWxlICYmIE9iamVjdC5rZXlzKENvbXBvbmVudC5lc01vZHVsZSkuc29tZShmdW5jdGlvbiAoa2V5KSB7cmV0dXJuIGtleSAhPT0gXCJkZWZhdWx0XCIgJiYga2V5LnN1YnN0cigwLCAyKSAhPT0gXCJfX1wifSkpIHtjb25zb2xlLmVycm9yKFwibmFtZWQgZXhwb3J0cyBhcmUgbm90IHN1cHBvcnRlZCBpbiAqLnZ1ZSBmaWxlcy5cIil9XG5pZiAoQ29tcG9uZW50Lm9wdGlvbnMuZnVuY3Rpb25hbCkge2NvbnNvbGUuZXJyb3IoXCJbdnVlLWxvYWRlcl0gRm9ybXMudnVlOiBmdW5jdGlvbmFsIGNvbXBvbmVudHMgYXJlIG5vdCBzdXBwb3J0ZWQgd2l0aCB0ZW1wbGF0ZXMsIHRoZXkgc2hvdWxkIHVzZSByZW5kZXIgZnVuY3Rpb25zLlwiKX1cblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHsoZnVuY3Rpb24gKCkge1xuICB2YXIgaG90QVBJID0gcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKVxuICBob3RBUEkuaW5zdGFsbChyZXF1aXJlKFwidnVlXCIpLCBmYWxzZSlcbiAgaWYgKCFob3RBUEkuY29tcGF0aWJsZSkgcmV0dXJuXG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICBob3RBUEkuY3JlYXRlUmVjb3JkKFwiZGF0YS12LWNhNzA4N2JhXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGhvdEFQSS5yZWxvYWQoXCJkYXRhLXYtY2E3MDg3YmFcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH1cbiAgbW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgZGlzcG9zZWQgPSB0cnVlXG4gIH0pXG59KSgpfVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9mb3Jtcy9Gb3Jtcy52dWVcbi8vIG1vZHVsZSBpZCA9IDY4XG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsIjx0ZW1wbGF0ZT5cbiAgICA8ZGl2ICBjbGFzcz1cInBhZGRpbmctdG9wLTJ4IGNvbC1sZy0xMiBjb2wtbWQtMTIgY29sLXNtLTEyIGNvbC14cy0xMlwiPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicm93XCI+XG4gICAgICAgICAgICAgICAgPGg0IHN0eWxlPVwiY29sb3I6ICNFQzFCMzNcIiBjbGFzcz1cIm1vZGFsLXRpdGxlIHRleHQtY2VudGVyXCI+RE9XTkxPQUQgTk9XPC9oND5cblxuICAgICAgICAgICAgICAgIDxmb3JtIEBzdWJtaXQucHJldmVudD1cInZhbGlkYXRlQmVmb3JlU3VibWl0KHBheWxvYWQpXCIgaWQ9XCJmb3JtLXNlY3Rpb24tcHJvamVjdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5bGU9XCJjb2xvcjogIzRkNGM0Y1wiPkp1c3QgZmlsbCBpbiB5b3VyIGRldGFpbHMgYmVsb3cgYW5kIGRvd25sb2FkIHRoZSBFYm9vayA8L3A+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiB2LWZvcj1cIihkYXRhLCBpbmRleCkgaW4gcGF5bG9hZFwiIHYtbW9kZWw9XCJwYXlsb2FkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IHYtaWY9XCJkYXRhLmZpZWxkVHlwZSA9PSAndGV4dC1maWVsZCdcIiBjbGFzcz1cImZvcm0tZ3JvdXAgY29sLWxnLTYgcGFkZGluZy1ib3R0b21cIiA6Y2xhc3M9XCJ7J2hhcy1lcnJvcic6IGVycm9ycy5oYXMoZGF0YS52YWx1ZSl9XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIj57eyBkYXRhLmxhYmVsIH19PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdi1tb2RlbD1cImRhdGEucG9zdFwiIDpuYW1lPWRhdGEudmFsdWUgIHYtdmFsaWRhdGUgOmRhdGEtdnYtcnVsZXM9ZGF0YS5ydWxlcyA6ZGF0YS12di12YWxpZGF0ZS1vbj1cInZhbGlkYXRlRm9ybVwiIGNsYXNzPVwiZm9ybS1jb250cm9sIHRleHQtY2VudGVyIG1hcmdpbi1ib3R0b20tbm9uZVwiIHR5cGU9XCJ0ZXh0XCIgOnBsYWNlaG9sZGVyPVwiZGF0YS5sYWJlbFwiLz5cblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gdi1zaG93PVwiZXJyb3JzLmhhcyhkYXRhLnZhbHVlKVwiIGNsYXNzPVwiaGVscC1ibG9jayB0ZXh0LWRhbmdlciB0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnt7IGVycm9ycy5maXJzdChkYXRhLnZhbHVlKSB9fTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1sZy0xMlwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAgY2xhc3M9XCJsYWRkYS1idXR0b24gbGFkZGEtYnV0dG9uLXNlbGVjdG9yIGJ0biBidG4tcHJpbWFyeVwiIGRhdGEtc3R5bGU9XCJ6b29tLWluXCIgdHlwZT1cInN1Ym1pdFwiPlN1Ym1pdFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9mb3JtPlxuXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIC8vIFZlZVZhbGlkYXRlIGltcG9ydFxuICAgIGltcG9ydCBWZWVWYWxpZGF0ZSBmcm9tICd2ZWUtdmFsaWRhdGUnO1xuICAgIFZ1ZS51c2UoVmVlVmFsaWRhdGUpO1xuXG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBkYXRhKCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWxpZGF0ZUZvcm06ICdub25lJyxcbiAgICAgICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgICAgICAgIHByb2plY3ROYW1lICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGU6ICd0ZXh0LWZpZWxkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsIDogJ05hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAncHJvamVjdE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcnVsZXMgOiAncmVxdWlyZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zdCAgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0SW1hZ2UgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZTogJ3RleHQtZmllbGQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWwgOiAnSW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUgOiAncHJvamVjdEltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGVzIDogJ3JlcXVpcmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc3QgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgdmFsaWRhdGVCZWZvcmVTdWJtaXQocmVxdWVzdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCd2YWxpZGF0b3InKTtcbiAgICAgICAgICAgICAgICB0aGlzLiR2YWxpZGF0b3IudmFsaWRhdGVBbGwoKS50aGVuKChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBheWxvYWQgICAgICAgID0ge307XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHJlcXVlc3QpLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF5bG9hZFt2YWx1ZV0gPSByZXF1ZXN0W3ZhbHVlXS5wb3N0O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUHJvamVjdChwYXlsb2FkKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cocGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnRm9ybSBTdWJtaXR0ZWQhJyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnQ29ycmVjdCB0aGVtIGVycm9ycyEnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgYWRkUHJvamVjdCAocGF5bG9hZCkge1xuICAgICAgICAgICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2UnLCB0aGlzLnBheWxvYWQucHJvamVjdEltYWdlKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBheWxvYWQpO1xuXG4gICAgICAgICAgICAgICAgLy8gU2VuZCBhIFBPU1QgcmVxdWVzdFxuICAgICAgICAgICAgICAgIGF4aW9zKHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJ2FkZC1wcm9qZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YTogZm9ybURhdGEsXG4gICAgICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuXG4gICAgICAgIG1vdW50ZWQoKSB7XG4gICAgICAgICAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xuICAgICAgICAgICAgLy8gU2VuZCBhIFBPU1QgcmVxdWVzdFxuICAgICAgICAgICAgYXhpb3MucG9zdCgnZ2V0LWV4YW1wbGUnKVxuXG4gICAgICAgICAgICAudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc3VjY2VzcycpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRhdGEuZXhhbXBsZS52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgSW5zdGFuY2UgRGF0YVxuICAgICAgICAgICAgICAgIGluc3RhbmNlLnRyYW5zVnVlID0gcmVzcG9uc2UuZGF0YS5leGFtcGxlLnZhbHVlXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2F0Y2goZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIEluc3RhbmNlIERhdGEgd2l0aCBlcnJvclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdlcnJvcicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gRm9ybXMudnVlP2ZkZDAxNmQ2IiwiLyoqXG4gKiB2ZWUtdmFsaWRhdGUgdjIuMC4wLXJjLjE5XG4gKiAoYykgMjAxNyBBYmRlbHJhaG1hbiBBd2FkXG4gKiBAbGljZW5zZSBNSVRcbiAqL1xuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGF0dHJpYnV0ZS4gdGhlIG5hbWUgbXVzdCBiZSBrZWJhYi1jYXNlLlxuICovXG52YXIgZ2V0RGF0YUF0dHJpYnV0ZSA9IGZ1bmN0aW9uIChlbCwgbmFtZSkgeyByZXR1cm4gZWwuZ2V0QXR0cmlidXRlKChcImRhdGEtdnYtXCIgKyBuYW1lKSk7IH07XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSB2YWx1ZSBpcyBlaXRoZXIgbnVsbCBvciB1bmRlZmluZWQuXG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKi9cbnZhciBpc051bGxPclVuZGVmaW5lZCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmaW5lZDtcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZGF0YSBhdHRyaWJ1dGUuXG4gKiBAcGFyYW0geyp9IGVsXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKi9cbnZhciBzZXREYXRhQXR0cmlidXRlID0gZnVuY3Rpb24gKGVsLCBuYW1lLCB2YWx1ZSkgeyByZXR1cm4gZWwuc2V0QXR0cmlidXRlKChcImRhdGEtdnYtXCIgKyBuYW1lKSwgdmFsdWUpOyB9O1xuXG52YXIgY3JlYXRlUHJveHkgPSBmdW5jdGlvbiAodGFyZ2V0LCBoYW5kbGVyKSB7XG4gIGlmICh0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBuZXcgUHJveHkodGFyZ2V0LCBoYW5kbGVyKTtcbn07XG5cbnZhciBjcmVhdGVGbGFncyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICh7XG4gIHVudG91Y2hlZDogdHJ1ZSxcbiAgdG91Y2hlZDogZmFsc2UsXG4gIGRpcnR5OiBmYWxzZSxcbiAgcHJpc3RpbmU6IHRydWUsXG4gIHZhbGlkOiBudWxsLFxuICBpbnZhbGlkOiBudWxsLFxuICB2YWxpZGF0ZWQ6IGZhbHNlLFxuICBwZW5kaW5nOiBmYWxzZSxcbiAgcmVxdWlyZWQ6IGZhbHNlXG59KTsgfTtcblxuLyoqXG4gKiBTaGFsbG93IG9iamVjdCBjb21wYXJpc29uLlxuICpcbiAqIEBwYXJhbSB7Kn0gbGhzXG4gKiBAcGFyYW0geyp9IHJoc1xuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xudmFyIGlzRXF1YWwgPSBmdW5jdGlvbiAobGhzLCByaHMpIHtcbiAgaWYgKGxocyBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByaHMgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICByZXR1cm4gaXNFcXVhbChsaHMuc291cmNlLCByaHMuc291cmNlKSAmJiBpc0VxdWFsKGxocy5mbGFncywgcmhzLmZsYWdzKTtcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KGxocykgJiYgQXJyYXkuaXNBcnJheShyaHMpKSB7XG4gICAgaWYgKGxocy5sZW5ndGggIT09IHJocy5sZW5ndGgpIHsgcmV0dXJuIGZhbHNlOyB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxocy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKCFpc0VxdWFsKGxoc1tpXSwgcmhzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBpZiBib3RoIGFyZSBvYmplY3RzLCBjb21wYXJlIGVhY2gga2V5IHJlY3Vyc2l2ZWx5LlxuICBpZiAoaXNPYmplY3QobGhzKSAmJiBpc09iamVjdChyaHMpKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGxocykuZXZlcnkoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIGlzRXF1YWwobGhzW2tleV0sIHJoc1trZXldKTtcbiAgICB9KSAmJiBPYmplY3Qua2V5cyhyaHMpLmV2ZXJ5KGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHJldHVybiBpc0VxdWFsKGxoc1trZXldLCByaHNba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICByZXR1cm4gbGhzID09PSByaHM7XG59O1xuXG4vKipcbiAqIERldGVybWluZXMgdGhlIGlucHV0IGZpZWxkIHNjb3BlLlxuICovXG52YXIgZ2V0U2NvcGUgPSBmdW5jdGlvbiAoZWwpIHtcbiAgdmFyIHNjb3BlID0gZ2V0RGF0YUF0dHJpYnV0ZShlbCwgJ3Njb3BlJyk7XG4gIGlmIChpc051bGxPclVuZGVmaW5lZChzY29wZSkgJiYgZWwuZm9ybSkge1xuICAgIHNjb3BlID0gZ2V0RGF0YUF0dHJpYnV0ZShlbC5mb3JtLCAnc2NvcGUnKTtcbiAgfVxuXG4gIHJldHVybiAhaXNOdWxsT3JVbmRlZmluZWQoc2NvcGUpID8gc2NvcGUgOiBudWxsO1xufTtcblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBpbiBhbiBvYmplY3Qgc2FmZWx5LlxuICogQHBhcmFtIHtTdHJpbmd9IHByb3BQYXRoXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0geyp9IGRlZlxuICovXG52YXIgZ2V0UGF0aCA9IGZ1bmN0aW9uIChwcm9wUGF0aCwgdGFyZ2V0LCBkZWYpIHtcbiAgaWYgKCBkZWYgPT09IHZvaWQgMCApIGRlZiA9IHVuZGVmaW5lZDtcblxuICBpZiAoIXByb3BQYXRoIHx8ICF0YXJnZXQpIHsgcmV0dXJuIGRlZjsgfVxuICB2YXIgdmFsdWUgPSB0YXJnZXQ7XG4gIHByb3BQYXRoLnNwbGl0KCcuJykuZXZlcnkoZnVuY3Rpb24gKHByb3ApIHtcbiAgICBpZiAoISBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIHByb3ApICYmIHZhbHVlW3Byb3BdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhbHVlID0gZGVmO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFsdWUgPSB2YWx1ZVtwcm9wXTtcblxuICAgIHJldHVybiB0cnVlO1xuICB9KTtcblxuICByZXR1cm4gdmFsdWU7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiBwYXRoIGV4aXN0cyB3aXRoaW4gYW4gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKi9cbnZhciBoYXNQYXRoID0gZnVuY3Rpb24gKHBhdGgsIHRhcmdldCkge1xuICB2YXIgb2JqID0gdGFyZ2V0O1xuICByZXR1cm4gcGF0aC5zcGxpdCgnLicpLmV2ZXJ5KGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgaWYgKCEgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBvYmogPSBvYmpbcHJvcF07XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7U3RyaW5nfSBydWxlXG4gKi9cbnZhciBwYXJzZVJ1bGUgPSBmdW5jdGlvbiAocnVsZSkge1xuICB2YXIgcGFyYW1zID0gW107XG4gIHZhciBuYW1lID0gcnVsZS5zcGxpdCgnOicpWzBdO1xuXG4gIGlmICh+cnVsZS5pbmRleE9mKCc6JykpIHtcbiAgICBwYXJhbXMgPSBydWxlLnNwbGl0KCc6Jykuc2xpY2UoMSkuam9pbignOicpLnNwbGl0KCcsJyk7XG4gIH1cblxuICByZXR1cm4geyBuYW1lOiBuYW1lLCBwYXJhbXM6IHBhcmFtcyB9O1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemVzIHRoZSBnaXZlbiBydWxlcyBleHByZXNzaW9uLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gcnVsZXNcbiAqL1xudmFyIG5vcm1hbGl6ZVJ1bGVzID0gZnVuY3Rpb24gKHJ1bGVzKSB7XG4gIC8vIGlmIGZhbHN5IHZhbHVlIHJldHVybiBhbiBlbXB0eSBvYmplY3QuXG4gIGlmICghcnVsZXMpIHtcbiAgICByZXR1cm4ge307XG4gIH1cblxuICB2YXIgdmFsaWRhdGlvbnMgPSB7fTtcbiAgaWYgKGlzT2JqZWN0KHJ1bGVzKSkge1xuICAgIE9iamVjdC5rZXlzKHJ1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgICB2YXIgcGFyYW1zID0gW107XG4gICAgICBpZiAocnVsZXNbcnVsZV0gPT09IHRydWUpIHtcbiAgICAgICAgcGFyYW1zID0gW107XG4gICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocnVsZXNbcnVsZV0pKSB7XG4gICAgICAgIHBhcmFtcyA9IHJ1bGVzW3J1bGVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1zID0gW3J1bGVzW3J1bGVdXTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJ1bGVzW3J1bGVdICE9PSBmYWxzZSkge1xuICAgICAgICB2YWxpZGF0aW9uc1tydWxlXSA9IHBhcmFtcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB2YWxpZGF0aW9ucztcbiAgfVxuXG4gIGlmICh0eXBlb2YgcnVsZXMgIT09ICdzdHJpbmcnKSB7XG4gICAgd2FybigncnVsZXMgbXVzdCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gb2JqZWN0LicpO1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHJ1bGVzLnNwbGl0KCd8JykuZm9yRWFjaChmdW5jdGlvbiAocnVsZSkge1xuICAgIHZhciBwYXJzZWRSdWxlID0gcGFyc2VSdWxlKHJ1bGUpO1xuICAgIGlmICghIHBhcnNlZFJ1bGUubmFtZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhbGlkYXRpb25zW3BhcnNlZFJ1bGUubmFtZV0gPSBwYXJzZWRSdWxlLnBhcmFtcztcbiAgfSk7XG5cbiAgcmV0dXJuIHZhbGlkYXRpb25zO1xufTtcblxuLyoqXG4gKiBEZWJvdW5jZXMgYSBmdW5jdGlvbi5cbiAqL1xudmFyIGRlYm91bmNlID0gZnVuY3Rpb24gKGZuLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgaWYgKCB3YWl0ID09PSB2b2lkIDAgKSB3YWl0ID0gMDtcbiAgaWYgKCBpbW1lZGlhdGUgPT09IHZvaWQgMCApIGltbWVkaWF0ZSA9IGZhbHNlO1xuXG4gIGlmICh3YWl0ID09PSAwKSB7XG4gICAgcmV0dXJuIGZuO1xuICB9XG5cbiAgdmFyIHRpbWVvdXQ7XG5cbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgIGlmICghaW1tZWRpYXRlKSB7IGZuLmFwcGx5KHZvaWQgMCwgYXJncyk7IH1cbiAgICB9O1xuICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmIChjYWxsTm93KSB7IGZuLmFwcGx5KHZvaWQgMCwgYXJncyk7IH1cbiAgfTtcbn07XG5cbi8qKlxuICogRW1pdHMgYSB3YXJuaW5nIHRvIHRoZSBjb25zb2xlLlxuICovXG52YXIgd2FybiA9IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gIGNvbnNvbGUud2FybigoXCJbdmVlLXZhbGlkYXRlXSBcIiArIG1lc3NhZ2UpKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgYnJhbmRlZCBlcnJvciBvYmplY3QuXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZVxuICovXG52YXIgY3JlYXRlRXJyb3IgPSBmdW5jdGlvbiAobWVzc2FnZSkgeyByZXR1cm4gbmV3IEVycm9yKChcIlt2ZWUtdmFsaWRhdGVdIFwiICsgbWVzc2FnZSkpOyB9O1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgdmFsdWUgaXMgYW4gb2JqZWN0LlxuICovXG52YXIgaXNPYmplY3QgPSBmdW5jdGlvbiAob2JqZWN0KSB7IHJldHVybiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0ICYmIHR5cGVvZiBvYmplY3QgPT09ICdvYmplY3QnICYmICEgQXJyYXkuaXNBcnJheShvYmplY3QpOyB9O1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGZ1bmN0aW9uIGlzIGNhbGxhYmxlLlxuICovXG52YXIgaXNDYWxsYWJsZSA9IGZ1bmN0aW9uIChmdW5jKSB7IHJldHVybiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJzsgfTtcblxuLyoqXG4gKiBDaGVjayBpZiBlbGVtZW50IGhhcyB0aGUgY3NzIGNsYXNzIG9uIGl0LlxuICovXG52YXIgaGFzQ2xhc3MgPSBmdW5jdGlvbiAoZWwsIGNsYXNzTmFtZSkge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9XG5cbiAgcmV0dXJuICEhZWwuY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoKFwiKFxcXFxzfF4pXCIgKyBjbGFzc05hbWUgKyBcIihcXFxcc3wkKVwiKSkpO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBwcm92aWRlZCBjc3MgY2xhc3NOYW1lIHRvIHRoZSBlbGVtZW50LlxuICovXG52YXIgYWRkQ2xhc3MgPSBmdW5jdGlvbiAoZWwsIGNsYXNzTmFtZSkge1xuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICBlbC5jbGFzc05hbWUgKz0gXCIgXCIgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBwcm92aWRlZCBjc3MgY2xhc3NOYW1lIGZyb20gdGhlIGVsZW1lbnQuXG4gKi9cbnZhciByZW1vdmVDbGFzcyA9IGZ1bmN0aW9uIChlbCwgY2xhc3NOYW1lKSB7XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoKFwiKFxcXFxzfF4pXCIgKyBjbGFzc05hbWUgKyBcIihcXFxcc3wkKVwiKSk7XG4gICAgZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UocmVnLCAnICcpO1xuICB9XG59O1xuXG4vKipcbiAqIEFkZHMgb3IgcmVtb3ZlcyBhIGNsYXNzIG5hbWUgb24gdGhlIGlucHV0IGRlcGVuZGluZyBvbiB0aGUgc3RhdHVzIGZsYWcuXG4gKi9cbnZhciB0b2dnbGVDbGFzcyA9IGZ1bmN0aW9uIChlbCwgY2xhc3NOYW1lLCBzdGF0dXMpIHtcbiAgaWYgKCFlbCB8fCAhY2xhc3NOYW1lKSB7IHJldHVybjsgfVxuXG4gIGlmIChzdGF0dXMpIHtcbiAgICByZXR1cm4gYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gIH1cblxuICByZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbn07XG5cbi8qKlxuICogQ29udmVydHMgYW4gYXJyYXktbGlrZSBvYmplY3QgdG8gYXJyYXkuXG4gKiBTaW1wbGUgcG9seWZpbGwgZm9yIEFycmF5LmZyb21cbiAqL1xudmFyIHRvQXJyYXkgPSBmdW5jdGlvbiAoYXJyYXlMaWtlKSB7XG4gIGlmIChpc0NhbGxhYmxlKEFycmF5LmZyb20pKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oYXJyYXlMaWtlKTtcbiAgfVxuXG4gIHZhciBhcnJheSA9IFtdO1xuICB2YXIgbGVuZ3RoID0gYXJyYXlMaWtlLmxlbmd0aDtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGFycmF5LnB1c2goYXJyYXlMaWtlW2ldKTtcbiAgfVxuXG4gIHJldHVybiBhcnJheTtcbn07XG5cbi8qKlxuICogQXNzaWduIHBvbHlmaWxsIGZyb20gdGhlIG1kbi5cbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xudmFyIGFzc2lnbiA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgdmFyIG90aGVycyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoIC0gMTtcbiAgd2hpbGUgKCBsZW4tLSA+IDAgKSBvdGhlcnNbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gKyAxIF07XG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGVsc2UgKi9cbiAgaWYgKGlzQ2FsbGFibGUoT2JqZWN0LmFzc2lnbikpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbi5hcHBseShPYmplY3QsIFsgdGFyZ2V0IF0uY29uY2F0KCBvdGhlcnMgKSk7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAodGFyZ2V0ID09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY29udmVydCB1bmRlZmluZWQgb3IgbnVsbCB0byBvYmplY3QnKTtcbiAgfVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHZhciB0byA9IE9iamVjdCh0YXJnZXQpO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBvdGhlcnMuZm9yRWFjaChmdW5jdGlvbiAoYXJnKSB7XG4gICAgLy8gU2tpcCBvdmVyIGlmIHVuZGVmaW5lZCBvciBudWxsXG4gICAgaWYgKGFyZyAhPSBudWxsKSB7XG4gICAgICBPYmplY3Qua2V5cyhhcmcpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB0b1trZXldID0gYXJnW2tleV07XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICByZXR1cm4gdG87XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhIHVuaXF1ZSBpZC5cbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xudmFyIHVuaXFJZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIChcIl9cIiArIChNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHIoMiwgOSkpKTsgfTtcblxuLyoqXG4gKiBwb2x5ZmlsbHMgYXJyYXkuZmluZFxuICogQHBhcmFtIHtBcnJheX0gYXJyYXlcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRpY2F0ZVxuICovXG52YXIgZmluZCA9IGZ1bmN0aW9uIChhcnJheSwgcHJlZGljYXRlKSB7XG4gIGlmIChpc09iamVjdChhcnJheSkpIHtcbiAgICBhcnJheSA9IHRvQXJyYXkoYXJyYXkpO1xuICB9XG4gIGlmIChhcnJheS5maW5kKSB7XG4gICAgcmV0dXJuIGFycmF5LmZpbmQocHJlZGljYXRlKTtcbiAgfVxuICB2YXIgcmVzdWx0O1xuICBhcnJheS5zb21lKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgaWYgKHByZWRpY2F0ZShpdGVtKSkge1xuICAgICAgcmVzdWx0ID0gaXRlbTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbnZhciBnZXRJbnB1dEV2ZW50TmFtZSA9IGZ1bmN0aW9uIChlbCkge1xuICBpZiAoZWwgJiYgKGVsLnRhZ05hbWUgPT09ICdTRUxFQ1QnIHx8IH5bJ3JhZGlvJywgJ2NoZWNrYm94JywgJ2ZpbGUnXS5pbmRleE9mKGVsLnR5cGUpKSkge1xuICAgIHJldHVybiAnY2hhbmdlJztcbiAgfVxuXG4gIHJldHVybiAnaW5wdXQnO1xufTtcblxudmFyIEVycm9yQmFnID0gZnVuY3Rpb24gRXJyb3JCYWcgKCkge1xuICB0aGlzLml0ZW1zID0gW107XG59O1xuXG4vKipcbiAgICogQWRkcyBhbiBlcnJvciB0byB0aGUgaW50ZXJuYWwgYXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlcnJvciBUaGUgZXJyb3Igb2JqZWN0LlxuICAgKi9cbkVycm9yQmFnLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiBhZGQgKGVycm9yKSB7XG4gIC8vIGhhbmRsZSBvbGQgc2lnbmF0dXJlLlxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICBlcnJvciA9IHtcbiAgICAgIGZpZWxkOiBhcmd1bWVudHNbMF0sXG4gICAgICBtc2c6IGFyZ3VtZW50c1sxXSxcbiAgICAgIHJ1bGU6IGFyZ3VtZW50c1syXSxcbiAgICAgIHNjb3BlOiAhaXNOdWxsT3JVbmRlZmluZWQoYXJndW1lbnRzWzNdKSA/IGFyZ3VtZW50c1szXSA6IG51bGxcbiAgICB9O1xuICB9XG5cbiAgZXJyb3Iuc2NvcGUgPSAhaXNOdWxsT3JVbmRlZmluZWQoZXJyb3Iuc2NvcGUpID8gZXJyb3Iuc2NvcGUgOiBudWxsO1xuICB0aGlzLml0ZW1zLnB1c2goZXJyb3IpO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIGEgZmllbGQgZXJyb3Igd2l0aCB0aGUgbmV3IGZpZWxkIHNjb3BlLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpZFxuICogQHBhcmFtIHtPYmplY3R9IGVycm9yXG4gKi9cbkVycm9yQmFnLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiB1cGRhdGUgKGlkLCBlcnJvcikge1xuICB2YXIgaXRlbSA9IGZpbmQodGhpcy5pdGVtcywgZnVuY3Rpb24gKGkpIHsgcmV0dXJuIGkuaWQgPT09IGlkOyB9KTtcbiAgaWYgKCFpdGVtKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGlkeCA9IHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgdGhpcy5pdGVtcy5zcGxpY2UoaWR4LCAxKTtcbiAgaXRlbS5zY29wZSA9IGVycm9yLnNjb3BlO1xuICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG59O1xuXG4vKipcbiAgICogR2V0cyBhbGwgZXJyb3IgbWVzc2FnZXMgZnJvbSB0aGUgaW50ZXJuYWwgYXJyYXkuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzY29wZSBUaGUgU2NvcGUgbmFtZSwgb3B0aW9uYWwuXG4gICAqIEByZXR1cm4ge0FycmF5fSBlcnJvcnMgQXJyYXkgb2YgYWxsIGVycm9yIG1lc3NhZ2VzLlxuICAgKi9cbkVycm9yQmFnLnByb3RvdHlwZS5hbGwgPSBmdW5jdGlvbiBhbGwgKHNjb3BlKSB7XG4gIGlmIChpc051bGxPclVuZGVmaW5lZChzY29wZSkpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUubXNnOyB9KTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5zY29wZSA9PT0gc2NvcGU7IH0pLm1hcChmdW5jdGlvbiAoZSkgeyByZXR1cm4gZS5tc2c7IH0pO1xufTtcblxuLyoqXG4gICAqIENoZWNrcyBpZiB0aGVyZSBhcmUgYW55IGVycm9ycyBpbiB0aGUgaW50ZXJuYWwgYXJyYXkuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzY29wZSBUaGUgU2NvcGUgbmFtZSwgb3B0aW9uYWwuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IHJlc3VsdCBUcnVlIGlmIHRoZXJlIHdhcyBhdCBsZWFzdCBvbmUgZXJyb3IsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5FcnJvckJhZy5wcm90b3R5cGUuYW55ID0gZnVuY3Rpb24gYW55IChzY29wZSkge1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoc2NvcGUpKSB7XG4gICAgcmV0dXJuICEhIHRoaXMuaXRlbXMubGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuICEhIHRoaXMuaXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnNjb3BlID09PSBzY29wZTsgfSkubGVuZ3RoO1xufTtcblxuLyoqXG4gICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhlIGludGVybmFsIGFycmF5LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2NvcGUgVGhlIFNjb3BlIG5hbWUsIG9wdGlvbmFsLlxuICAgKi9cbkVycm9yQmFnLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIGNsZWFyIChzY29wZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmIChpc051bGxPclVuZGVmaW5lZChzY29wZSkpIHtcbiAgICBzY29wZSA9IG51bGw7XG4gIH1cblxuICB2YXIgcmVtb3ZlQ29uZGl0aW9uID0gZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuc2NvcGUgPT09IHNjb3BlOyB9O1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChyZW1vdmVDb25kaXRpb24odGhpcyQxLml0ZW1zW2ldKSkge1xuICAgICAgdGhpcyQxLml0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgIC0taTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICAgKiBDb2xsZWN0cyBlcnJvcnMgaW50byBncm91cHMgb3IgZm9yIGEgc3BlY2lmaWMgZmllbGQuXG4gICAqXG4gICAqIEBwYXJhbXtzdHJpbmd9IGZpZWxkIFRoZSBmaWVsZCBuYW1lLlxuICAgKiBAcGFyYW17c3RyaW5nfSBzY29wZSBUaGUgc2NvcGUgbmFtZS5cbiAgICogQHBhcmFtIHtCb29sZWFufSBtYXAgSWYgaXQgc2hvdWxkIG1hcCB0aGUgZXJyb3JzIHRvIHN0cmluZ3MgaW5zdGVhZCBvZiBvYmplY3RzLlxuICAgKiBAcmV0dXJuIHtBcnJheX0gZXJyb3JzIFRoZSBlcnJvcnMgZm9yIHRoZSBzcGVjaWZpZWQgZmllbGQuXG4gICAqL1xuRXJyb3JCYWcucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbiBjb2xsZWN0IChmaWVsZCwgc2NvcGUsIG1hcCkge1xuICAgIGlmICggbWFwID09PSB2b2lkIDAgKSBtYXAgPSB0cnVlO1xuXG4gIGlmICghIGZpZWxkKSB7XG4gICAgdmFyIGNvbGxlY3Rpb24gPSB7fTtcbiAgICB0aGlzLml0ZW1zLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgIGlmICghIGNvbGxlY3Rpb25bZS5maWVsZF0pIHtcbiAgICAgICAgY29sbGVjdGlvbltlLmZpZWxkXSA9IFtdO1xuICAgICAgfVxuXG4gICAgICBjb2xsZWN0aW9uW2UuZmllbGRdLnB1c2gobWFwID8gZS5tc2cgOiBlKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9XG5cbiAgZmllbGQgPSAhaXNOdWxsT3JVbmRlZmluZWQoZmllbGQpID8gU3RyaW5nKGZpZWxkKSA6IGZpZWxkO1xuICBpZiAoaXNOdWxsT3JVbmRlZmluZWQoc2NvcGUpKSB7XG4gICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLmZpZWxkID09PSBmaWVsZDsgfSkubWFwKGZ1bmN0aW9uIChlKSB7IHJldHVybiAobWFwID8gZS5tc2cgOiBlKTsgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUuZmllbGQgPT09IGZpZWxkICYmIGUuc2NvcGUgPT09IHNjb3BlOyB9KVxuICAgIC5tYXAoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIChtYXAgPyBlLm1zZyA6IGUpOyB9KTtcbn07XG4vKipcbiAgICogR2V0cyB0aGUgaW50ZXJuYWwgYXJyYXkgbGVuZ3RoLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOdW1iZXJ9IGxlbmd0aCBUaGUgaW50ZXJuYWwgYXJyYXkgbGVuZ3RoLlxuICAgKi9cbkVycm9yQmFnLnByb3RvdHlwZS5jb3VudCA9IGZ1bmN0aW9uIGNvdW50ICgpIHtcbiAgcmV0dXJuIHRoaXMuaXRlbXMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBGaW5kcyBhbmQgZmV0Y2hlcyB0aGUgZmlyc3QgZXJyb3IgbWVzc2FnZSBmb3IgdGhlIHNwZWNpZmllZCBmaWVsZCBpZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqL1xuRXJyb3JCYWcucHJvdG90eXBlLmZpcnN0QnlJZCA9IGZ1bmN0aW9uIGZpcnN0QnlJZCAoaWQpIHtcbiAgdmFyIGVycm9yID0gZmluZCh0aGlzLml0ZW1zLCBmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5pZCA9PT0gaWQ7IH0pO1xuXG4gIHJldHVybiBlcnJvciA/IGVycm9yLm1zZyA6IG51bGw7XG59O1xuXG4vKipcbiAgICogR2V0cyB0aGUgZmlyc3QgZXJyb3IgbWVzc2FnZSBmb3IgYSBzcGVjaWZpYyBmaWVsZC5cbiAgICpcbiAgICogQHBhcmFte1N0cmluZ30gZmllbGQgVGhlIGZpZWxkIG5hbWUuXG4gICAqIEByZXR1cm4ge1N0cmluZ3xudWxsfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICAgKi9cbkVycm9yQmFnLnByb3RvdHlwZS5maXJzdCA9IGZ1bmN0aW9uIGZpcnN0IChmaWVsZCwgc2NvcGUpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcbiAgICBpZiAoIHNjb3BlID09PSB2b2lkIDAgKSBzY29wZSA9IG51bGw7XG5cbiAgZmllbGQgPSAhaXNOdWxsT3JVbmRlZmluZWQoZmllbGQpID8gU3RyaW5nKGZpZWxkKSA6IGZpZWxkO1xuICB2YXIgc2VsZWN0b3IgPSB0aGlzLl9zZWxlY3RvcihmaWVsZCk7XG4gIHZhciBzY29wZWQgPSB0aGlzLl9zY29wZShmaWVsZCk7XG5cbiAgaWYgKHNjb3BlZCkge1xuICAgIHZhciByZXN1bHQgPSB0aGlzLmZpcnN0KHNjb3BlZC5uYW1lLCBzY29wZWQuc2NvcGUpO1xuICAgIC8vIGlmIHN1Y2ggcmVzdWx0IGV4aXN0LCByZXR1cm4gaXQuIG90aGVyd2lzZSBpdCBjb3VsZCBiZSBhIGZpZWxkLlxuICAgIC8vIHdpdGggZG90IGluIGl0cyBuYW1lLlxuICAgIGlmIChyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKHNlbGVjdG9yKSB7XG4gICAgcmV0dXJuIHRoaXMuZmlyc3RCeVJ1bGUoc2VsZWN0b3IubmFtZSwgc2VsZWN0b3IucnVsZSwgc2NvcGUpO1xuICB9XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHRoaXMkMS5pdGVtc1tpXS5maWVsZCA9PT0gZmllbGQgJiYgKHRoaXMkMS5pdGVtc1tpXS5zY29wZSA9PT0gc2NvcGUpKSB7XG4gICAgICByZXR1cm4gdGhpcyQxLml0ZW1zW2ldLm1zZztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn07XG5cbi8qKlxuICAgKiBSZXR1cm5zIHRoZSBmaXJzdCBlcnJvciBydWxlIGZvciB0aGUgc3BlY2lmaWVkIGZpZWxkXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmaWVsZCBUaGUgc3BlY2lmaWVkIGZpZWxkLlxuICAgKiBAcmV0dXJuIHtzdHJpbmd8bnVsbH0gRmlyc3QgZXJyb3IgcnVsZSBvbiB0aGUgc3BlY2lmaWVkIGZpZWxkIGlmIG9uZSBpcyBmb3VuZCwgb3RoZXJ3aXNlIG51bGxcbiAgICovXG5FcnJvckJhZy5wcm90b3R5cGUuZmlyc3RSdWxlID0gZnVuY3Rpb24gZmlyc3RSdWxlIChmaWVsZCwgc2NvcGUpIHtcbiAgdmFyIGVycm9ycyA9IHRoaXMuY29sbGVjdChmaWVsZCwgc2NvcGUsIGZhbHNlKTtcblxuICByZXR1cm4gKGVycm9ycy5sZW5ndGggJiYgZXJyb3JzWzBdLnJ1bGUpIHx8IG51bGw7XG59O1xuXG4vKipcbiAgICogQ2hlY2tzIGlmIHRoZSBpbnRlcm5hbCBhcnJheSBoYXMgYXQgbGVhc3Qgb25lIGVycm9yIGZvciB0aGUgc3BlY2lmaWVkIGZpZWxkLlxuICAgKlxuICAgKiBAcGFyYW17c3RyaW5nfSBmaWVsZCBUaGUgc3BlY2lmaWVkIGZpZWxkLlxuICAgKiBAcmV0dXJuIHtCb29sZWFufSByZXN1bHQgVHJ1ZSBpZiBhdCBsZWFzdCBvbmUgZXJyb3IgaXMgZm91bmQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICovXG5FcnJvckJhZy5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gaGFzIChmaWVsZCwgc2NvcGUpIHtcbiAgICBpZiAoIHNjb3BlID09PSB2b2lkIDAgKSBzY29wZSA9IG51bGw7XG5cbiAgcmV0dXJuICEhIHRoaXMuZmlyc3QoZmllbGQsIHNjb3BlKTtcbn07XG5cbi8qKlxuICAgKiBHZXRzIHRoZSBmaXJzdCBlcnJvciBtZXNzYWdlIGZvciBhIHNwZWNpZmljIGZpZWxkIGFuZCBhIHJ1bGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWVsZC5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHJ1bGUgVGhlIG5hbWUgb2YgdGhlIHJ1bGUuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzY29wZSBUaGUgbmFtZSBvZiB0aGUgc2NvcGUgKG9wdGlvbmFsKS5cbiAgICovXG5FcnJvckJhZy5wcm90b3R5cGUuZmlyc3RCeVJ1bGUgPSBmdW5jdGlvbiBmaXJzdEJ5UnVsZSAobmFtZSwgcnVsZSwgc2NvcGUpIHtcbiAgdmFyIGVycm9yID0gdGhpcy5jb2xsZWN0KG5hbWUsIHNjb3BlLCBmYWxzZSkuZmlsdGVyKGZ1bmN0aW9uIChlKSB7IHJldHVybiBlLnJ1bGUgPT09IHJ1bGU7IH0pWzBdO1xuXG4gIHJldHVybiAoZXJyb3IgJiYgZXJyb3IubXNnKSB8fCBudWxsO1xufTtcbi8qKlxuICAgKiBHZXRzIHRoZSBmaXJzdCBlcnJvciBtZXNzYWdlIGZvciBhIHNwZWNpZmljIGZpZWxkIHRoYXQgbm90IG1hdGNoIHRoZSBydWxlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZmllbGQuXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBydWxlIFRoZSBuYW1lIG9mIHRoZSBydWxlLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2NvcGUgVGhlIG5hbWUgb2YgdGhlIHNjb3BlIChvcHRpb25hbCkuXG4gICAqL1xuRXJyb3JCYWcucHJvdG90eXBlLmZpcnN0Tm90ID0gZnVuY3Rpb24gZmlyc3ROb3QgKG5hbWUsIHJ1bGUsIHNjb3BlKSB7XG4gICAgaWYgKCBydWxlID09PSB2b2lkIDAgKSBydWxlID0gJ3JlcXVpcmVkJztcblxuICB2YXIgZXJyb3IgPSB0aGlzLmNvbGxlY3QobmFtZSwgc2NvcGUsIGZhbHNlKS5maWx0ZXIoZnVuY3Rpb24gKGUpIHsgcmV0dXJuIGUucnVsZSAhPT0gcnVsZTsgfSlbMF07XG5cbiAgcmV0dXJuIChlcnJvciAmJiBlcnJvci5tc2cpIHx8IG51bGw7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgZXJyb3JzIGJ5IG1hdGNoaW5nIGFnYWluc3QgdGhlIGlkLlxuICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gKi9cbkVycm9yQmFnLnByb3RvdHlwZS5yZW1vdmVCeUlkID0gZnVuY3Rpb24gcmVtb3ZlQnlJZCAoaWQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAodGhpcyQxLml0ZW1zW2ldLmlkID09PSBpZCkge1xuICAgICAgdGhpcyQxLml0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgIC0taTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICAgKiBSZW1vdmVzIGFsbCBlcnJvciBtZXNzYWdlcyBhc3NvY2lhdGVkIHdpdGggYSBzcGVjaWZpYyBmaWVsZC5cbiAgICpcbiAgICogQHBhcmFte1N0cmluZ30gZmllbGQgVGhlIGZpZWxkIHdoaWNoIG1lc3NhZ2VzIGFyZSB0byBiZSByZW1vdmVkLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2NvcGUgVGhlIFNjb3BlIG5hbWUsIG9wdGlvbmFsLlxuICAgKiBAcGFyYW0ge1N0cmluZ30gaWQgVGhlIGZpZWxkIGlkLCBvcHRpb25hbC5cbiAgICovXG5FcnJvckJhZy5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChmaWVsZCwgc2NvcGUsIGlkKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgZmllbGQgPSAhaXNOdWxsT3JVbmRlZmluZWQoZmllbGQpID8gU3RyaW5nKGZpZWxkKSA6IGZpZWxkO1xuICB2YXIgcmVtb3ZlQ29uZGl0aW9uID0gZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS5pZCAmJiBpZCkge1xuICAgICAgcmV0dXJuIGUuaWQgPT09IGlkO1xuICAgIH1cblxuICAgIGlmICghaXNOdWxsT3JVbmRlZmluZWQoc2NvcGUpKSB7XG4gICAgICByZXR1cm4gZS5maWVsZCA9PT0gZmllbGQgJiYgZS5zY29wZSA9PT0gc2NvcGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIGUuZmllbGQgPT09IGZpZWxkICYmIGUuc2NvcGUgPT09IG51bGw7XG4gIH07XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHJlbW92ZUNvbmRpdGlvbih0aGlzJDEuaXRlbXNbaV0pKSB7XG4gICAgICB0aGlzJDEuaXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgLS1pO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gICAqIEdldCB0aGUgZmllbGQgYXR0cmlidXRlcyBpZiB0aGVyZSdzIGEgcnVsZSBzZWxlY3Rvci5cbiAgICpcbiAgICogQHBhcmFte1N0cmluZ30gZmllbGQgVGhlIHNwZWNpZmllZCBmaWVsZC5cbiAgICogQHJldHVybiB7T2JqZWN0fG51bGx9XG4gICAqL1xuRXJyb3JCYWcucHJvdG90eXBlLl9zZWxlY3RvciA9IGZ1bmN0aW9uIF9zZWxlY3RvciAoZmllbGQpIHtcbiAgaWYgKGZpZWxkLmluZGV4T2YoJzonKSA+IC0xKSB7XG4gICAgdmFyIHJlZiA9IGZpZWxkLnNwbGl0KCc6Jyk7XG4gICAgICB2YXIgbmFtZSA9IHJlZlswXTtcbiAgICAgIHZhciBydWxlID0gcmVmWzFdO1xuXG4gICAgcmV0dXJuIHsgbmFtZTogbmFtZSwgcnVsZTogcnVsZSB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG4vKipcbiAgICogR2V0IHRoZSBmaWVsZCBzY29wZSBpZiBzcGVjaWZpZWQgdXNpbmcgZG90IG5vdGF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZmllbGQgdGhlIHNwZWNpZmllIGZpZWxkLlxuICAgKiBAcmV0dXJuIHtPYmplY3R8bnVsbH1cbiAgICovXG5FcnJvckJhZy5wcm90b3R5cGUuX3Njb3BlID0gZnVuY3Rpb24gX3Njb3BlIChmaWVsZCkge1xuICBpZiAoZmllbGQuaW5kZXhPZignLicpID4gLTEpIHtcbiAgICB2YXIgcmVmID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgIHZhciBzY29wZSA9IHJlZlswXTtcbiAgICAgIHZhciBuYW1lID0gcmVmLnNsaWNlKDEpO1xuXG4gICAgcmV0dXJuIHsgbmFtZTogbmFtZS5qb2luKCcuJyksIHNjb3BlOiBzY29wZSB9O1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59O1xuXG52YXIgRGljdGlvbmFyeSA9IGZ1bmN0aW9uIERpY3Rpb25hcnkgKGRpY3Rpb25hcnkpIHtcbiAgaWYgKCBkaWN0aW9uYXJ5ID09PSB2b2lkIDAgKSBkaWN0aW9uYXJ5ID0ge307XG5cbiAgdGhpcy5jb250YWluZXIgPSB7fTtcbiAgdGhpcy5tZXJnZShkaWN0aW9uYXJ5KTtcbn07XG5cbkRpY3Rpb25hcnkucHJvdG90eXBlLmhhc0xvY2FsZSA9IGZ1bmN0aW9uIGhhc0xvY2FsZSAobG9jYWxlKSB7XG4gIHJldHVybiAhISB0aGlzLmNvbnRhaW5lcltsb2NhbGVdO1xufTtcblxuRGljdGlvbmFyeS5wcm90b3R5cGUuc2V0RGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHNldERhdGVGb3JtYXQgKGxvY2FsZSwgZm9ybWF0KSB7XG4gIGlmICghdGhpcy5jb250YWluZXJbbG9jYWxlXSkge1xuICAgIHRoaXMuY29udGFpbmVyW2xvY2FsZV0gPSB7fTtcbiAgfVxuXG4gIHRoaXMuY29udGFpbmVyW2xvY2FsZV0uZGF0ZUZvcm1hdCA9IGZvcm1hdDtcbn07XG5cbkRpY3Rpb25hcnkucHJvdG90eXBlLmdldERhdGVGb3JtYXQgPSBmdW5jdGlvbiBnZXREYXRlRm9ybWF0IChsb2NhbGUpIHtcbiAgaWYgKCF0aGlzLmNvbnRhaW5lcltsb2NhbGVdKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmNvbnRhaW5lcltsb2NhbGVdLmRhdGVGb3JtYXQ7XG59O1xuXG5EaWN0aW9uYXJ5LnByb3RvdHlwZS5nZXRNZXNzYWdlID0gZnVuY3Rpb24gZ2V0TWVzc2FnZSAobG9jYWxlLCBrZXksIGZhbGxiYWNrKSB7XG4gIGlmICghIHRoaXMuaGFzTWVzc2FnZShsb2NhbGUsIGtleSkpIHtcbiAgICByZXR1cm4gZmFsbGJhY2sgfHwgdGhpcy5fZ2V0RGVmYXVsdE1lc3NhZ2UobG9jYWxlKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmNvbnRhaW5lcltsb2NhbGVdLm1lc3NhZ2VzW2tleV07XG59O1xuXG4vKipcbiAqIEdldHMgYSBzcGVjaWZpYyBtZXNzYWdlIGZvciBmaWVsZC4gZmFsbHNiYWNrIHRvIHRoZSBydWxlIG1lc3NhZ2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGxvY2FsZVxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKi9cbkRpY3Rpb25hcnkucHJvdG90eXBlLmdldEZpZWxkTWVzc2FnZSA9IGZ1bmN0aW9uIGdldEZpZWxkTWVzc2FnZSAobG9jYWxlLCBmaWVsZCwga2V5KSB7XG4gIGlmICghIHRoaXMuaGFzTG9jYWxlKGxvY2FsZSkpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRNZXNzYWdlKGxvY2FsZSwga2V5KTtcbiAgfVxuXG4gIHZhciBkaWN0ID0gdGhpcy5jb250YWluZXJbbG9jYWxlXS5jdXN0b20gJiYgdGhpcy5jb250YWluZXJbbG9jYWxlXS5jdXN0b21bZmllbGRdO1xuICBpZiAoISBkaWN0IHx8ICEgZGljdFtrZXldKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0TWVzc2FnZShsb2NhbGUsIGtleSk7XG4gIH1cblxuICByZXR1cm4gZGljdFtrZXldO1xufTtcblxuRGljdGlvbmFyeS5wcm90b3R5cGUuX2dldERlZmF1bHRNZXNzYWdlID0gZnVuY3Rpb24gX2dldERlZmF1bHRNZXNzYWdlIChsb2NhbGUpIHtcbiAgaWYgKHRoaXMuaGFzTWVzc2FnZShsb2NhbGUsICdfZGVmYXVsdCcpKSB7XG4gICAgcmV0dXJuIHRoaXMuY29udGFpbmVyW2xvY2FsZV0ubWVzc2FnZXMuX2RlZmF1bHQ7XG4gIH1cblxuICByZXR1cm4gdGhpcy5jb250YWluZXIuZW4ubWVzc2FnZXMuX2RlZmF1bHQ7XG59O1xuXG5EaWN0aW9uYXJ5LnByb3RvdHlwZS5nZXRBdHRyaWJ1dGUgPSBmdW5jdGlvbiBnZXRBdHRyaWJ1dGUgKGxvY2FsZSwga2V5LCBmYWxsYmFjaykge1xuICAgIGlmICggZmFsbGJhY2sgPT09IHZvaWQgMCApIGZhbGxiYWNrID0gJyc7XG5cbiAgaWYgKCEgdGhpcy5oYXNBdHRyaWJ1dGUobG9jYWxlLCBrZXkpKSB7XG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuY29udGFpbmVyW2xvY2FsZV0uYXR0cmlidXRlc1trZXldO1xufTtcblxuRGljdGlvbmFyeS5wcm90b3R5cGUuaGFzTWVzc2FnZSA9IGZ1bmN0aW9uIGhhc01lc3NhZ2UgKGxvY2FsZSwga2V5KSB7XG4gIHJldHVybiAhISAoXG4gICAgdGhpcy5oYXNMb2NhbGUobG9jYWxlKSAmJlxuICAgICAgICAgIHRoaXMuY29udGFpbmVyW2xvY2FsZV0ubWVzc2FnZXMgJiZcbiAgICAgICAgICB0aGlzLmNvbnRhaW5lcltsb2NhbGVdLm1lc3NhZ2VzW2tleV1cbiAgKTtcbn07XG5cbkRpY3Rpb25hcnkucHJvdG90eXBlLmhhc0F0dHJpYnV0ZSA9IGZ1bmN0aW9uIGhhc0F0dHJpYnV0ZSAobG9jYWxlLCBrZXkpIHtcbiAgcmV0dXJuICEhIChcbiAgICB0aGlzLmhhc0xvY2FsZShsb2NhbGUpICYmXG4gICAgICAgICAgdGhpcy5jb250YWluZXJbbG9jYWxlXS5hdHRyaWJ1dGVzICYmXG4gICAgICAgICAgdGhpcy5jb250YWluZXJbbG9jYWxlXS5hdHRyaWJ1dGVzW2tleV1cbiAgKTtcbn07XG5cbkRpY3Rpb25hcnkucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24gbWVyZ2UgKGRpY3Rpb25hcnkpIHtcbiAgdGhpcy5fbWVyZ2UodGhpcy5jb250YWluZXIsIGRpY3Rpb25hcnkpO1xufTtcblxuRGljdGlvbmFyeS5wcm90b3R5cGUuc2V0TWVzc2FnZSA9IGZ1bmN0aW9uIHNldE1lc3NhZ2UgKGxvY2FsZSwga2V5LCBtZXNzYWdlKSB7XG4gIGlmICghIHRoaXMuaGFzTG9jYWxlKGxvY2FsZSkpIHtcbiAgICB0aGlzLmNvbnRhaW5lcltsb2NhbGVdID0ge1xuICAgICAgbWVzc2FnZXM6IHt9LFxuICAgICAgYXR0cmlidXRlczoge31cbiAgICB9O1xuICB9XG5cbiAgdGhpcy5jb250YWluZXJbbG9jYWxlXS5tZXNzYWdlc1trZXldID0gbWVzc2FnZTtcbn07XG5cbkRpY3Rpb25hcnkucHJvdG90eXBlLnNldEF0dHJpYnV0ZSA9IGZ1bmN0aW9uIHNldEF0dHJpYnV0ZSAobG9jYWxlLCBrZXksIGF0dHJpYnV0ZSkge1xuICBpZiAoISB0aGlzLmhhc0xvY2FsZShsb2NhbGUpKSB7XG4gICAgdGhpcy5jb250YWluZXJbbG9jYWxlXSA9IHtcbiAgICAgIG1lc3NhZ2VzOiB7fSxcbiAgICAgIGF0dHJpYnV0ZXM6IHt9XG4gICAgfTtcbiAgfVxuXG4gIHRoaXMuY29udGFpbmVyW2xvY2FsZV0uYXR0cmlidXRlc1trZXldID0gYXR0cmlidXRlO1xufTtcblxuRGljdGlvbmFyeS5wcm90b3R5cGUuX21lcmdlID0gZnVuY3Rpb24gX21lcmdlICh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIGlmICghIChpc09iamVjdCh0YXJnZXQpICYmIGlzT2JqZWN0KHNvdXJjZSkpKSB7XG4gICAgcmV0dXJuIHRhcmdldDtcbiAgfVxuXG4gIE9iamVjdC5rZXlzKHNvdXJjZSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgaWYgKGlzT2JqZWN0KHNvdXJjZVtrZXldKSkge1xuICAgICAgaWYgKCEgdGFyZ2V0W2tleV0pIHtcbiAgICAgICAgYXNzaWduKHRhcmdldCwgKCBvYmogPSB7fSwgb2JqW2tleV0gPSB7fSwgb2JqICkpO1xuICAgICAgICAgIHZhciBvYmo7XG4gICAgICB9XG5cbiAgICAgIHRoaXMkMS5fbWVyZ2UodGFyZ2V0W2tleV0sIHNvdXJjZVtrZXldKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhc3NpZ24odGFyZ2V0LCAoIG9iaiQxID0ge30sIG9iaiQxW2tleV0gPSBzb3VyY2Vba2V5XSwgb2JqJDEgKSk7XG4gICAgICB2YXIgb2JqJDE7XG4gIH0pO1xuXG4gIHJldHVybiB0YXJnZXQ7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlcyB0aGUgb3B0aW9ucyByZXF1aXJlZCB0byBjb25zdHJ1Y3QgYSBmaWVsZC5cbiAqL1xudmFyIEdlbmVyYXRvciA9IGZ1bmN0aW9uIEdlbmVyYXRvciAoKSB7fTtcblxuR2VuZXJhdG9yLmdlbmVyYXRlID0gZnVuY3Rpb24gZ2VuZXJhdGUgKGVsLCBiaW5kaW5nLCB2bm9kZSwgb3B0aW9ucykge1xuICAgIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gIHZhciBtb2RlbCA9IEdlbmVyYXRvci5yZXNvbHZlTW9kZWwoYmluZGluZywgdm5vZGUpO1xuXG4gIHJldHVybiB7XG4gICAgbmFtZTogR2VuZXJhdG9yLnJlc29sdmVOYW1lKGVsLCB2bm9kZSksXG4gICAgZWw6IGVsLFxuICAgIGxpc3RlbjogIWJpbmRpbmcubW9kaWZpZXJzLmRpc2FibGUsXG4gICAgc2NvcGU6IEdlbmVyYXRvci5yZXNvbHZlU2NvcGUoZWwsIGJpbmRpbmcsIHZub2RlKSxcbiAgICB2bTogR2VuZXJhdG9yLm1ha2VWTSh2bm9kZS5jb250ZXh0KSxcbiAgICBleHByZXNzaW9uOiBiaW5kaW5nLnZhbHVlLFxuICAgIGNvbXBvbmVudDogdm5vZGUuY2hpbGQsXG4gICAgY2xhc3Nlczogb3B0aW9ucy5jbGFzc2VzLFxuICAgIGNsYXNzTmFtZXM6IG9wdGlvbnMuY2xhc3NOYW1lcyxcbiAgICBnZXR0ZXI6IEdlbmVyYXRvci5yZXNvbHZlR2V0dGVyKGVsLCB2bm9kZSwgbW9kZWwpLFxuICAgIGV2ZW50czogR2VuZXJhdG9yLnJlc29sdmVFdmVudHMoZWwsIHZub2RlKSB8fCBvcHRpb25zLmV2ZW50cyxcbiAgICBtb2RlbDogbW9kZWwsXG4gICAgZGVsYXk6IEdlbmVyYXRvci5yZXNvbHZlRGVsYXkoZWwsIHZub2RlLCBvcHRpb25zKSxcbiAgICBydWxlczogR2VuZXJhdG9yLnJlc29sdmVSdWxlcyhlbCwgYmluZGluZyksXG4gICAgaW5pdGlhbDogISFiaW5kaW5nLm1vZGlmaWVycy5pbml0aWFsLFxuICAgIGFsaWFzOiBHZW5lcmF0b3IucmVzb2x2ZUFsaWFzKGVsLCB2bm9kZSksXG4gICAgdmFsaWRpdHk6IG9wdGlvbnMudmFsaWRpdHksXG4gICAgYXJpYTogb3B0aW9ucy5hcmlhLFxuICAgIGluaXRpYWxWYWx1ZTogR2VuZXJhdG9yLnJlc29sdmVJbml0aWFsVmFsdWUodm5vZGUpXG4gIH07XG59O1xuXG5HZW5lcmF0b3IuZ2V0Q3RvckNvbmZpZyA9IGZ1bmN0aW9uIGdldEN0b3JDb25maWcgKHZub2RlKSB7XG4gIGlmICghdm5vZGUuY2hpbGQpIHsgcmV0dXJuIG51bGw7IH1cblxuICB2YXIgY29uZmlnID0gZ2V0UGF0aCgnY2hpbGQuJG9wdGlvbnMuJF92ZWVWYWxpZGF0ZScsIHZub2RlKTtcblxuICByZXR1cm4gY29uZmlnO1xufTtcblxuLyoqXG4gKlxuICogQHBhcmFtIHsqfSBlbFxuICogQHBhcmFtIHsqfSBiaW5kaW5nXG4gKi9cbkdlbmVyYXRvci5yZXNvbHZlUnVsZXMgPSBmdW5jdGlvbiByZXNvbHZlUnVsZXMgKGVsLCBiaW5kaW5nKSB7XG4gIGlmICghYmluZGluZyB8fCAhYmluZGluZy5leHByZXNzaW9uKSB7XG4gICAgcmV0dXJuIGdldERhdGFBdHRyaWJ1dGUoZWwsICdydWxlcycpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBiaW5kaW5nLnZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBiaW5kaW5nLnZhbHVlO1xuICB9XG5cbiAgaWYgKH5bJ3N0cmluZycsICdvYmplY3QnXS5pbmRleE9mKHR5cGVvZiBiaW5kaW5nLnZhbHVlLnJ1bGVzKSkge1xuICAgIHJldHVybiBiaW5kaW5nLnZhbHVlLnJ1bGVzO1xuICB9XG5cbiAgcmV0dXJuIGJpbmRpbmcudmFsdWU7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7Kn0gdm5vZGVcbiAqL1xuR2VuZXJhdG9yLnJlc29sdmVJbml0aWFsVmFsdWUgPSBmdW5jdGlvbiByZXNvbHZlSW5pdGlhbFZhbHVlICh2bm9kZSkge1xuICB2YXIgbW9kZWwgPSB2bm9kZS5kYXRhLm1vZGVsIHx8IGZpbmQodm5vZGUuZGF0YS5kaXJlY3RpdmVzLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5uYW1lID09PSAnbW9kZWwnOyB9KTtcblxuICByZXR1cm4gbW9kZWwgJiYgbW9kZWwudmFsdWU7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBub24tY2lyY3VsYXIgcGFydGlhbCBWTSBpbnN0YW5jZSBmcm9tIGEgVnVlIGluc3RhbmNlLlxuICogQHBhcmFtIHsqfSB2bVxuICovXG5HZW5lcmF0b3IubWFrZVZNID0gZnVuY3Rpb24gbWFrZVZNICh2bSkge1xuICByZXR1cm4ge1xuICAgIGdldCAkZWwgKCkge1xuICAgICAgcmV0dXJuIHZtLiRlbDtcbiAgICB9LFxuICAgIGdldCAkcmVmcyAoKSB7XG4gICAgICByZXR1cm4gdm0uJHJlZnM7XG4gICAgfSxcbiAgICAkd2F0Y2g6IHZtLiR3YXRjaCA/IHZtLiR3YXRjaC5iaW5kKHZtKSA6IGZ1bmN0aW9uICgpIHt9LFxuICAgICR2YWxpZGF0b3I6IHZtLiR2YWxpZGF0b3IgPyB7XG4gICAgICBlcnJvcnM6IHZtLiR2YWxpZGF0b3IuZXJyb3JzLFxuICAgICAgdmFsaWRhdGU6IHZtLiR2YWxpZGF0b3IudmFsaWRhdGUuYmluZCh2bS4kdmFsaWRhdG9yKSxcbiAgICAgIHVwZGF0ZTogdm0uJHZhbGlkYXRvci51cGRhdGUuYmluZCh2bS4kdmFsaWRhdG9yKVxuICAgIH0gOiBudWxsXG4gIH07XG59O1xuXG4vKipcbiAqIFJlc29sdmVzIHRoZSBkZWxheSB2YWx1ZS5cbiAqIEBwYXJhbSB7Kn0gZWxcbiAqIEBwYXJhbSB7Kn0gdm5vZGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKi9cbkdlbmVyYXRvci5yZXNvbHZlRGVsYXkgPSBmdW5jdGlvbiByZXNvbHZlRGVsYXkgKGVsLCB2bm9kZSwgb3B0aW9ucykge1xuICAgIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gIHJldHVybiBnZXREYXRhQXR0cmlidXRlKGVsLCAnZGVsYXknKSB8fCAodm5vZGUuY2hpbGQgJiYgdm5vZGUuY2hpbGQuJGF0dHJzICYmIHZub2RlLmNoaWxkLiRhdHRyc1snZGF0YS12di1kZWxheSddKSB8fCBvcHRpb25zLmRlbGF5O1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgYWxpYXMgZm9yIHRoZSBmaWVsZC5cbiAqIEBwYXJhbSB7Kn0gZWxcbiAqIEBwYXJhbSB7Kn0gdm5vZGVcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhbGlhcyBnZXR0ZXJcbiAqL1xuR2VuZXJhdG9yLnJlc29sdmVBbGlhcyA9IGZ1bmN0aW9uIHJlc29sdmVBbGlhcyAoZWwsIHZub2RlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7IHJldHVybiBnZXREYXRhQXR0cmlidXRlKGVsLCAnYXMnKSB8fCAodm5vZGUuY2hpbGQgJiYgdm5vZGUuY2hpbGQuJGF0dHJzICYmIHZub2RlLmNoaWxkLiRhdHRyc1snZGF0YS12di1hcyddKSB8fCBlbC50aXRsZSB8fCBudWxsOyB9O1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgZXZlbnRzIHRvIHZhbGlkYXRlIGluIHJlc3BvbnNlIHRvLlxuICogQHBhcmFtIHsqfSBlbFxuICogQHBhcmFtIHsqfSB2bm9kZVxuICovXG5HZW5lcmF0b3IucmVzb2x2ZUV2ZW50cyA9IGZ1bmN0aW9uIHJlc29sdmVFdmVudHMgKGVsLCB2bm9kZSkge1xuICB2YXIgZXZlbnRzID0gZ2V0RGF0YUF0dHJpYnV0ZShlbCwgJ3ZhbGlkYXRlLW9uJyk7XG5cbiAgaWYgKCFldmVudHMgJiYgdm5vZGUuY2hpbGQgJiYgdm5vZGUuY2hpbGQuJGF0dHJzKSB7XG4gICAgZXZlbnRzID0gdm5vZGUuY2hpbGQuJGF0dHJzWydkYXRhLXZ2LXZhbGlkYXRlLW9uJ107XG4gIH1cblxuICBpZiAoIWV2ZW50cyAmJiB2bm9kZS5jaGlsZCkge1xuICAgIHZhciBjb25maWcgPSBHZW5lcmF0b3IuZ2V0Q3RvckNvbmZpZyh2bm9kZSk7XG4gICAgZXZlbnRzID0gY29uZmlnICYmIGNvbmZpZy5ldmVudHM7XG4gIH1cblxuICByZXR1cm4gZXZlbnRzO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyB0aGUgc2NvcGUgZm9yIHRoZSBmaWVsZC5cbiAqIEBwYXJhbSB7Kn0gZWxcbiAqIEBwYXJhbSB7Kn0gYmluZGluZ1xuICovXG5HZW5lcmF0b3IucmVzb2x2ZVNjb3BlID0gZnVuY3Rpb24gcmVzb2x2ZVNjb3BlIChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICBpZiAoIHZub2RlID09PSB2b2lkIDAgKSB2bm9kZSA9IHt9O1xuXG4gIHZhciBzY29wZSA9IG51bGw7XG4gIGlmIChpc09iamVjdChiaW5kaW5nLnZhbHVlKSkge1xuICAgIHNjb3BlID0gYmluZGluZy52YWx1ZS5zY29wZTtcbiAgfVxuXG4gIGlmICh2bm9kZS5jaGlsZCAmJiBpc051bGxPclVuZGVmaW5lZChzY29wZSkpIHtcbiAgICBzY29wZSA9IHZub2RlLmNoaWxkLiRhdHRycyAmJiB2bm9kZS5jaGlsZC4kYXR0cnNbJ2RhdGEtdnYtc2NvcGUnXTtcbiAgfVxuXG4gIHJldHVybiAhaXNOdWxsT3JVbmRlZmluZWQoc2NvcGUpID8gc2NvcGUgOiBnZXRTY29wZShlbCk7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgbm9kZSBkaXJlY3RpdmVzIGNvbnRhaW5zIGEgdi1tb2RlbCBvciBhIHNwZWNpZmllZCBhcmcuXG4gKiBBcmdzIHRha2UgcHJpb3JpdHkgb3ZlciBtb2RlbHMuXG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5HZW5lcmF0b3IucmVzb2x2ZU1vZGVsID0gZnVuY3Rpb24gcmVzb2x2ZU1vZGVsIChiaW5kaW5nLCB2bm9kZSkge1xuICBpZiAoYmluZGluZy5hcmcpIHtcbiAgICByZXR1cm4gYmluZGluZy5hcmc7XG4gIH1cblxuICBpZiAoaXNPYmplY3QoYmluZGluZy52YWx1ZSkgJiYgYmluZGluZy52YWx1ZS5hcmcpIHtcbiAgICByZXR1cm4gYmluZGluZy52YWx1ZS5hcmc7XG4gIH1cblxuICB2YXIgbW9kZWwgPSB2bm9kZS5kYXRhLm1vZGVsIHx8IGZpbmQodm5vZGUuZGF0YS5kaXJlY3RpdmVzLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5uYW1lID09PSAnbW9kZWwnOyB9KTtcbiAgaWYgKCFtb2RlbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFyIHdhdGNoYWJsZSA9IC9eW2Etel9dK1swLTldKihcXHcqXFwuW2Etel9dXFx3KikqJC9pLnRlc3QobW9kZWwuZXhwcmVzc2lvbikgJiYgaGFzUGF0aChtb2RlbC5leHByZXNzaW9uLCB2bm9kZS5jb250ZXh0KTtcblxuICBpZiAoIXdhdGNoYWJsZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIG1vZGVsLmV4cHJlc3Npb247XG59O1xuXG4vKipcbiAgICogUmVzb2x2ZXMgdGhlIGZpZWxkIG5hbWUgdG8gdHJpZ2dlciB2YWxpZGF0aW9ucy5cbiAgICogQHJldHVybiB7U3RyaW5nfSBUaGUgZmllbGQgbmFtZS5cbiAgICovXG5HZW5lcmF0b3IucmVzb2x2ZU5hbWUgPSBmdW5jdGlvbiByZXNvbHZlTmFtZSAoZWwsIHZub2RlKSB7XG4gIHZhciBuYW1lID0gZ2V0RGF0YUF0dHJpYnV0ZShlbCwgJ25hbWUnKTtcblxuICBpZiAoIW5hbWUgJiYgIXZub2RlLmNoaWxkKSB7XG4gICAgcmV0dXJuIGVsLm5hbWU7XG4gIH1cblxuICBpZiAoIW5hbWUgJiYgdm5vZGUuY2hpbGQgJiYgdm5vZGUuY2hpbGQuJGF0dHJzKSB7XG4gICAgbmFtZSA9IHZub2RlLmNoaWxkLiRhdHRyc1snZGF0YS12di1uYW1lJ10gfHwgdm5vZGUuY2hpbGQuJGF0dHJzWyduYW1lJ107XG4gIH1cblxuICBpZiAoIW5hbWUgJiYgdm5vZGUuY2hpbGQpIHtcbiAgICB2YXIgY29uZmlnID0gR2VuZXJhdG9yLmdldEN0b3JDb25maWcodm5vZGUpO1xuICAgIGlmIChjb25maWcgJiYgaXNDYWxsYWJsZShjb25maWcubmFtZSkpIHtcbiAgICAgIHZhciBib3VuZEdldHRlciA9IGNvbmZpZy5uYW1lLmJpbmQodm5vZGUuY2hpbGQpO1xuXG4gICAgICByZXR1cm4gYm91bmRHZXR0ZXIoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdm5vZGUuY2hpbGQubmFtZTtcbiAgfVxuXG4gIHJldHVybiBuYW1lO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGEgdmFsdWUgZ2V0dGVyIGlucHV0IHR5cGUuXG4gKi9cbkdlbmVyYXRvci5yZXNvbHZlR2V0dGVyID0gZnVuY3Rpb24gcmVzb2x2ZUdldHRlciAoZWwsIHZub2RlLCBtb2RlbCkge1xuICBpZiAobW9kZWwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGdldFBhdGgobW9kZWwsIHZub2RlLmNvbnRleHQpO1xuICAgIH07XG4gIH1cblxuICBpZiAodm5vZGUuY2hpbGQpIHtcbiAgICB2YXIgcGF0aCA9IGdldERhdGFBdHRyaWJ1dGUoZWwsICd2YWx1ZS1wYXRoJykgfHwgKHZub2RlLmNoaWxkLiRhdHRycyAmJiB2bm9kZS5jaGlsZC4kYXR0cnNbJ2RhdGEtdnYtdmFsdWUtcGF0aCddKTtcbiAgICBpZiAocGF0aCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhdGgocGF0aCwgdm5vZGUuY2hpbGQpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgY29uZmlnID0gR2VuZXJhdG9yLmdldEN0b3JDb25maWcodm5vZGUpO1xuICAgIGlmIChjb25maWcgJiYgaXNDYWxsYWJsZShjb25maWcudmFsdWUpKSB7XG4gICAgICB2YXIgYm91bmRHZXR0ZXIgPSBjb25maWcudmFsdWUuYmluZCh2bm9kZS5jaGlsZCk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBib3VuZEdldHRlcigpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHZub2RlLmNoaWxkLnZhbHVlO1xuICAgIH07XG4gIH1cblxuICBzd2l0Y2ggKGVsLnR5cGUpIHtcbiAgY2FzZSAnY2hlY2tib3gnOiByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKChcImlucHV0W25hbWU9XFxcIlwiICsgKGVsLm5hbWUpICsgXCJcXFwiXVwiKSk7XG5cbiAgICBlbHMgPSB0b0FycmF5KGVscykuZmlsdGVyKGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuY2hlY2tlZDsgfSk7XG4gICAgaWYgKCFlbHMubGVuZ3RoKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cblxuICAgIHJldHVybiBlbHMubWFwKGZ1bmN0aW9uIChjaGVja2JveCkgeyByZXR1cm4gY2hlY2tib3gudmFsdWU7IH0pO1xuICB9O1xuICBjYXNlICdyYWRpbyc6IHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGVscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoKFwiaW5wdXRbbmFtZT1cXFwiXCIgKyAoZWwubmFtZSkgKyBcIlxcXCJdXCIpKTtcbiAgICB2YXIgZWxtID0gZmluZChlbHMsIGZ1bmN0aW9uIChlbCkgeyByZXR1cm4gZWwuY2hlY2tlZDsgfSk7XG5cbiAgICByZXR1cm4gZWxtICYmIGVsbS52YWx1ZTtcbiAgfTtcbiAgY2FzZSAnZmlsZSc6IHJldHVybiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIHJldHVybiB0b0FycmF5KGVsLmZpbGVzKTtcbiAgfTtcbiAgY2FzZSAnc2VsZWN0LW11bHRpcGxlJzogcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdG9BcnJheShlbC5vcHRpb25zKS5maWx0ZXIoZnVuY3Rpb24gKG9wdCkgeyByZXR1cm4gb3B0LnNlbGVjdGVkOyB9KS5tYXAoZnVuY3Rpb24gKG9wdCkgeyByZXR1cm4gb3B0LnZhbHVlOyB9KTtcbiAgfTtcbiAgZGVmYXVsdDogcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZWwgJiYgZWwudmFsdWU7XG4gIH07XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX09QVElPTlMgPSB7XG4gIHRhcmdldE9mOiBudWxsLFxuICBpbml0aWFsOiBmYWxzZSxcbiAgc2NvcGU6IG51bGwsXG4gIGxpc3RlbjogdHJ1ZSxcbiAgbmFtZTogbnVsbCxcbiAgYWN0aXZlOiB0cnVlLFxuICByZXF1aXJlZDogZmFsc2UsXG4gIHJ1bGVzOiB7fSxcbiAgdm06IG51bGwsXG4gIGNsYXNzZXM6IGZhbHNlLFxuICB2YWxpZGl0eTogdHJ1ZSxcbiAgYXJpYTogdHJ1ZSxcbiAgZXZlbnRzOiAnaW5wdXR8Ymx1cicsXG4gIGRlbGF5OiAwLFxuICBjbGFzc05hbWVzOiB7XG4gICAgdG91Y2hlZDogJ3RvdWNoZWQnLCAvLyB0aGUgY29udHJvbCBoYXMgYmVlbiBibHVycmVkXG4gICAgdW50b3VjaGVkOiAndW50b3VjaGVkJywgLy8gdGhlIGNvbnRyb2wgaGFzbid0IGJlZW4gYmx1cnJlZFxuICAgIHZhbGlkOiAndmFsaWQnLCAvLyBtb2RlbCBpcyB2YWxpZFxuICAgIGludmFsaWQ6ICdpbnZhbGlkJywgLy8gbW9kZWwgaXMgaW52YWxpZFxuICAgIHByaXN0aW5lOiAncHJpc3RpbmUnLCAvLyBjb250cm9sIGhhcyBub3QgYmVlbiBpbnRlcmFjdGVkIHdpdGhcbiAgICBkaXJ0eTogJ2RpcnR5JyAvLyBjb250cm9sIGhhcyBiZWVuIGludGVyYWN0ZWQgd2l0aFxuICB9XG59O1xuXG52YXIgRmllbGQgPSBmdW5jdGlvbiBGaWVsZCAoZWwsIG9wdGlvbnMpIHtcbiAgaWYgKCBvcHRpb25zID09PSB2b2lkIDAgKSBvcHRpb25zID0ge307XG5cbiAgdGhpcy5pZCA9IHVuaXFJZCgpO1xuICB0aGlzLmVsID0gZWw7XG4gIHRoaXMudXBkYXRlZCA9IGZhbHNlO1xuICB0aGlzLmRlcGVuZGVuY2llcyA9IFtdO1xuICB0aGlzLndhdGNoZXJzID0gW107XG4gIHRoaXMuZXZlbnRzID0gW107XG4gIHRoaXMucnVsZXMgPSB7fTtcbiAgaWYgKCF0aGlzLmlzSGVhZGxlc3MgJiYgIW9wdGlvbnMudGFyZ2V0T2YpIHtcbiAgICBzZXREYXRhQXR0cmlidXRlKHRoaXMuZWwsICdpZCcsIHRoaXMuaWQpOyAvLyBjYWNoZSBmaWVsZCBpZCBpZiBpdCBpcyBpbmRlcGVuZGVudCBhbmQgaGFzIGEgcm9vdCBlbGVtZW50LlxuICB9XG4gIG9wdGlvbnMgPSBhc3NpZ24oe30sIERFRkFVTFRfT1BUSU9OUywgb3B0aW9ucyk7XG4gIHRoaXMudmFsaWRpdHkgPSBvcHRpb25zLnZhbGlkaXR5O1xuICB0aGlzLmFyaWEgPSBvcHRpb25zLmFyaWE7XG4gIHRoaXMuZmxhZ3MgPSBjcmVhdGVGbGFncygpO1xuICB0aGlzLnZtID0gb3B0aW9ucy52bTtcbiAgdGhpcy5jb21wb25lbnQgPSBvcHRpb25zLmNvbXBvbmVudDtcbiAgdGhpcy5jdG9yQ29uZmlnID0gdGhpcy5jb21wb25lbnQgPyBnZXRQYXRoKCckb3B0aW9ucy4kX3ZlZVZhbGlkYXRlJywgdGhpcy5jb21wb25lbnQpIDogdW5kZWZpbmVkO1xuICB0aGlzLnVwZGF0ZShvcHRpb25zKTtcbiAgdGhpcy51cGRhdGVkID0gZmFsc2U7XG59O1xuXG52YXIgcHJvdG90eXBlQWNjZXNzb3JzJDEgPSB7IGlzVnVlOiB7fSx2YWxpZGF0b3I6IHt9LGlzUmVxdWlyZWQ6IHt9LGlzRGlzYWJsZWQ6IHt9LGlzSGVhZGxlc3M6IHt9LGRpc3BsYXlOYW1lOiB7fSx2YWx1ZToge30scmVqZWN0c0ZhbHNlOiB7fSB9O1xuXG5wcm90b3R5cGVBY2Nlc3NvcnMkMS5pc1Z1ZS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIXRoaXMuY29tcG9uZW50O1xufTtcblxucHJvdG90eXBlQWNjZXNzb3JzJDEudmFsaWRhdG9yLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKCF0aGlzLnZtIHx8ICF0aGlzLnZtLiR2YWxpZGF0b3IpIHtcbiAgICB3YXJuKCdObyB2YWxpZGF0b3IgaW5zdGFuY2UgZGV0ZWN0ZWQuJyk7XG4gICAgcmV0dXJuIHsgdmFsaWRhdGU6IGZ1bmN0aW9uICgpIHt9IH07XG4gIH1cblxuICByZXR1cm4gdGhpcy52bS4kdmFsaWRhdG9yO1xufTtcblxucHJvdG90eXBlQWNjZXNzb3JzJDEuaXNSZXF1aXJlZC5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiAhIXRoaXMucnVsZXMucmVxdWlyZWQ7XG59O1xuXG5wcm90b3R5cGVBY2Nlc3NvcnMkMS5pc0Rpc2FibGVkLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuICh0aGlzLmlzVnVlICYmIHRoaXMuY29tcG9uZW50LmRpc2FibGVkKSB8fCAodGhpcy5lbCAmJiB0aGlzLmVsLmRpc2FibGVkKTtcbn07XG5cbnByb3RvdHlwZUFjY2Vzc29ycyQxLmlzSGVhZGxlc3MuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gIXRoaXMuZWw7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIGRpc3BsYXkgbmFtZSAodXNlci1mcmllbmRseSBuYW1lKS5cbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xucHJvdG90eXBlQWNjZXNzb3JzJDEuZGlzcGxheU5hbWUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gaXNDYWxsYWJsZSh0aGlzLmFsaWFzKSA/IHRoaXMuYWxpYXMoKSA6IHRoaXMuYWxpYXM7XG59O1xuXG4vKipcbiAqIEdldHMgdGhlIGlucHV0IHZhbHVlLlxuICogQHJldHVybiB7Kn1cbiAqL1xucHJvdG90eXBlQWNjZXNzb3JzJDEudmFsdWUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICBpZiAoIWlzQ2FsbGFibGUodGhpcy5nZXR0ZXIpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmdldHRlcigpO1xufTtcblxuLyoqXG4gKiBJZiB0aGUgZmllbGQgcmVqZWN0cyBmYWxzZSBhcyBhIHZhbGlkIHZhbHVlIGZvciB0aGUgcmVxdWlyZWQgcnVsZS5cbiAqL1xucHJvdG90eXBlQWNjZXNzb3JzJDEucmVqZWN0c0ZhbHNlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHRoaXMuaXNWdWUgJiYgdGhpcy5jdG9yQ29uZmlnKSB7XG4gICAgcmV0dXJuICEhdGhpcy5jdG9yQ29uZmlnLnJlamVjdHNGYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLmlzSGVhZGxlc3MpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lbC50eXBlID09PSAnY2hlY2tib3gnO1xufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBpbnN0YW5jZSBtYXRjaGVzIHRoZSBvcHRpb25zIHByb3ZpZGVkLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgVGhlIG1hdGNoaW5nIG9wdGlvbnMuXG4gKi9cbkZpZWxkLnByb3RvdHlwZS5tYXRjaGVzID0gZnVuY3Rpb24gbWF0Y2hlcyAob3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5pZCkge1xuICAgIHJldHVybiB0aGlzLmlkID09PSBvcHRpb25zLmlkO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMubmFtZSA9PT0gdW5kZWZpbmVkICYmIG9wdGlvbnMuc2NvcGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuc2NvcGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLm5hbWUgPT09IG9wdGlvbnMubmFtZTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLm5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB0aGlzLnNjb3BlID09PSBvcHRpb25zLnNjb3BlO1xuICB9XG5cbiAgcmV0dXJuIG9wdGlvbnMubmFtZSA9PT0gdGhpcy5uYW1lICYmIG9wdGlvbnMuc2NvcGUgPT09IHRoaXMuc2NvcGU7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICovXG5GaWVsZC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChvcHRpb25zKSB7XG4gIHRoaXMudGFyZ2V0T2YgPSBvcHRpb25zLnRhcmdldE9mIHx8IG51bGw7XG4gIHRoaXMuaW5pdGlhbCA9IG9wdGlvbnMuaW5pdGlhbCB8fCB0aGlzLmluaXRpYWwgfHwgZmFsc2U7XG5cbiAgLy8gdXBkYXRlIGVycm9ycyBzY29wZSBpZiB0aGUgZmllbGQgc2NvcGUgd2FzIGNoYW5nZWQuXG4gIGlmICh0aGlzLnVwZGF0ZWQgJiYgIWlzTnVsbE9yVW5kZWZpbmVkKG9wdGlvbnMuc2NvcGUpICYmIG9wdGlvbnMuc2NvcGUgIT09IHRoaXMuc2NvcGUgJiYgaXNDYWxsYWJsZSh0aGlzLnZhbGlkYXRvci51cGRhdGUpKSB7XG4gICAgdGhpcy52YWxpZGF0b3IudXBkYXRlKHRoaXMuaWQsIHsgc2NvcGU6IG9wdGlvbnMuc2NvcGUgfSk7XG4gIH1cbiAgdGhpcy5zY29wZSA9ICFpc051bGxPclVuZGVmaW5lZChvcHRpb25zLnNjb3BlKSA/IG9wdGlvbnMuc2NvcGVcbiAgICA6ICFpc051bGxPclVuZGVmaW5lZCh0aGlzLnNjb3BlKSA/IHRoaXMuc2NvcGUgOiBudWxsO1xuICB0aGlzLm5hbWUgPSAoIWlzTnVsbE9yVW5kZWZpbmVkKG9wdGlvbnMubmFtZSkgPyBTdHJpbmcob3B0aW9ucy5uYW1lKSA6IG9wdGlvbnMubmFtZSkgfHwgdGhpcy5uYW1lIHx8IG51bGw7XG4gIHRoaXMucnVsZXMgPSBvcHRpb25zLnJ1bGVzICE9PSB1bmRlZmluZWQgPyBub3JtYWxpemVSdWxlcyhvcHRpb25zLnJ1bGVzKSA6IHRoaXMucnVsZXM7XG4gIHRoaXMubW9kZWwgPSBvcHRpb25zLm1vZGVsIHx8IHRoaXMubW9kZWw7XG4gIHRoaXMubGlzdGVuID0gb3B0aW9ucy5saXN0ZW4gIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubGlzdGVuIDogdGhpcy5saXN0ZW47XG4gIHRoaXMuY2xhc3NlcyA9IG9wdGlvbnMuY2xhc3NlcyB8fCB0aGlzLmNsYXNzZXMgfHwgZmFsc2U7XG4gIHRoaXMuY2xhc3NOYW1lcyA9IG9wdGlvbnMuY2xhc3NOYW1lcyB8fCB0aGlzLmNsYXNzTmFtZXMgfHwgREVGQVVMVF9PUFRJT05TLmNsYXNzTmFtZXM7XG4gIHRoaXMuYWxpYXMgPSBvcHRpb25zLmFsaWFzIHx8IHRoaXMuYWxpYXM7XG4gIHRoaXMuZ2V0dGVyID0gaXNDYWxsYWJsZShvcHRpb25zLmdldHRlcikgPyBvcHRpb25zLmdldHRlciA6IHRoaXMuZ2V0dGVyO1xuICB0aGlzLmRlbGF5ID0gb3B0aW9ucy5kZWxheSB8fCB0aGlzLmRlbGF5IHx8IDA7XG4gIHRoaXMuZXZlbnRzID0gdHlwZW9mIG9wdGlvbnMuZXZlbnRzID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmV2ZW50cy5sZW5ndGggPyBvcHRpb25zLmV2ZW50cy5zcGxpdCgnfCcpIDogdGhpcy5ldmVudHM7XG4gIHRoaXMudXBkYXRlRGVwZW5kZW5jaWVzKCk7XG4gIHRoaXMuYWRkQWN0aW9uTGlzdGVuZXJzKCk7XG5cbiAgLy8gdXBkYXRlIHJlcXVpcmVkIGZsYWcgZmxhZ3NcbiAgaWYgKG9wdGlvbnMucnVsZXMgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuZmxhZ3MucmVxdWlyZWQgPSB0aGlzLmlzUmVxdWlyZWQ7XG4gIH1cblxuICAvLyB2YWxpZGF0ZSBpZiBpdCB3YXMgdmFsaWRhdGVkIGJlZm9yZSBhbmQgZmllbGQgd2FzIHVwZGF0ZWQgYW5kIHRoZXJlIHdhcyBhIHJ1bGVzIG11dGF0aW9uLlxuICBpZiAodGhpcy5mbGFncy52YWxpZGF0ZWQgJiYgb3B0aW9ucy5ydWxlcyAhPT0gdW5kZWZpbmVkICYmIHRoaXMudXBkYXRlZCkge1xuICAgIHRoaXMudmFsaWRhdG9yLnZhbGlkYXRlKChcIiNcIiArICh0aGlzLmlkKSkpO1xuICB9XG5cbiAgdGhpcy51cGRhdGVkID0gdHJ1ZTtcblxuICAvLyBubyBuZWVkIHRvIGNvbnRpbnVlLlxuICBpZiAodGhpcy5pc0hlYWRsZXNzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XG4gIHRoaXMuYWRkVmFsdWVMaXN0ZW5lcnMoKTtcbiAgdGhpcy51cGRhdGVBcmlhQXR0cnMoKTtcbn07XG5cbi8qKlxuICogUmVzZXRzIGZpZWxkIGZsYWdzIGFuZCBlcnJvcnMuXG4gKi9cbkZpZWxkLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uIHJlc2V0ICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgZGVmID0gY3JlYXRlRmxhZ3MoKTtcbiAgT2JqZWN0LmtleXModGhpcy5mbGFncykuZm9yRWFjaChmdW5jdGlvbiAoZmxhZykge1xuICAgIHRoaXMkMS5mbGFnc1tmbGFnXSA9IGRlZltmbGFnXTtcbiAgfSk7XG5cbiAgdGhpcy5hZGRBY3Rpb25MaXN0ZW5lcnMoKTtcbiAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XG4gIGlmICh0aGlzLnZhbGlkYXRvci5lcnJvcnMgJiYgaXNDYWxsYWJsZSh0aGlzLnZhbGlkYXRvci5lcnJvcnMucmVtb3ZlQnlJZCkpIHtcbiAgICB0aGlzLnZhbGlkYXRvci5lcnJvcnMucmVtb3ZlQnlJZCh0aGlzLmlkKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBmbGFncyBhbmQgdGhlaXIgbmVnYXRlZCBjb3VudGVycGFydHMsIGFuZCB1cGRhdGVzIHRoZSBjbGFzc2VzIGFuZCByZS1hZGRzIGFjdGlvbiBsaXN0ZW5lcnMuXG4gKiBAcGFyYW0ge09iamVjdH0gZmxhZ3NcbiAqL1xuRmllbGQucHJvdG90eXBlLnNldEZsYWdzID0gZnVuY3Rpb24gc2V0RmxhZ3MgKGZsYWdzKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdmFyIG5lZ2F0ZWQgPSB7XG4gICAgcHJpc3RpbmU6ICdkaXJ0eScsXG4gICAgZGlydHk6ICdwcmlzdGluZScsXG4gICAgdmFsaWQ6ICdpbnZhbGlkJyxcbiAgICBpbnZhbGlkOiAndmFsaWQnLFxuICAgIHRvdWNoZWQ6ICd1bnRvdWNoZWQnLFxuICAgIHVudG91Y2hlZDogJ3RvdWNoZWQnXG4gIH07XG5cbiAgT2JqZWN0LmtleXMoZmxhZ3MpLmZvckVhY2goZnVuY3Rpb24gKGZsYWcpIHtcbiAgICB0aGlzJDEuZmxhZ3NbZmxhZ10gPSBmbGFnc1tmbGFnXTtcbiAgICAvLyBpZiBpdCBoYXMgYSBuZWdhdGlvbiBhbmQgd2FzIG5vdCBzcGVjaWZpZWQsIHNldCBpdCBhcyB3ZWxsLlxuICAgIGlmIChuZWdhdGVkW2ZsYWddICYmIGZsYWdzW25lZ2F0ZWRbZmxhZ11dID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMkMS5mbGFnc1tuZWdhdGVkW2ZsYWddXSA9ICFmbGFnc1tmbGFnXTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChcbiAgICBmbGFncy51bnRvdWNoZWQgIT09IHVuZGVmaW5lZCB8fFxuICAgIGZsYWdzLnRvdWNoZWQgIT09IHVuZGVmaW5lZCB8fFxuICAgIGZsYWdzLmRpcnR5ICE9PSB1bmRlZmluZWQgfHxcbiAgICBmbGFncy5wcmlzdGluZSAhPT0gdW5kZWZpbmVkXG4gICkge1xuICAgIHRoaXMuYWRkQWN0aW9uTGlzdGVuZXJzKCk7XG4gIH1cbiAgdGhpcy51cGRhdGVDbGFzc2VzKCk7XG4gIHRoaXMudXBkYXRlQXJpYUF0dHJzKCk7XG4gIHRoaXMudXBkYXRlQ3VzdG9tVmFsaWRpdHkoKTtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyBpZiB0aGUgZmllbGQgcmVxdWlyZXMgcmVmZXJlbmNlcyB0byB0YXJnZXQgZmllbGRzLlxuKi9cbkZpZWxkLnByb3RvdHlwZS51cGRhdGVEZXBlbmRlbmNpZXMgPSBmdW5jdGlvbiB1cGRhdGVEZXBlbmRlbmNpZXMgKCkge1xuICAgIHZhciB0aGlzJDEgPSB0aGlzO1xuXG4gIC8vIHJlc2V0IGRlcGVuZGVuY2llcy5cbiAgdGhpcy5kZXBlbmRlbmNpZXMuZm9yRWFjaChmdW5jdGlvbiAoZCkgeyByZXR1cm4gZC5maWVsZC5kZXN0cm95KCk7IH0pO1xuICB0aGlzLmRlcGVuZGVuY2llcyA9IFtdO1xuXG4gIC8vIHdlIGdldCB0aGUgc2VsZWN0b3JzIGZvciBlYWNoIGZpZWxkLlxuICB2YXIgZmllbGRzID0gT2JqZWN0LmtleXModGhpcy5ydWxlcykucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCByKSB7XG4gICAgaWYgKHIgPT09ICdjb25maXJtZWQnKSB7XG4gICAgICBwcmV2LnB1c2goeyBzZWxlY3RvcjogdGhpcyQxLnJ1bGVzW3JdWzBdIHx8ICgodGhpcyQxLm5hbWUpICsgXCJfY29uZmlybWF0aW9uXCIpLCBuYW1lOiByIH0pO1xuICAgIH0gZWxzZSBpZiAoL2FmdGVyfGJlZm9yZS8udGVzdChyKSkge1xuICAgICAgcHJldi5wdXNoKHsgc2VsZWN0b3I6IHRoaXMkMS5ydWxlc1tyXVswXSwgbmFtZTogciB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJldjtcbiAgfSwgW10pO1xuXG4gIGlmICghZmllbGRzLmxlbmd0aCB8fCAhdGhpcy52bSB8fCAhdGhpcy52bS4kZWwpIHsgcmV0dXJuOyB9XG5cbiAgLy8gbXVzdCBiZSBjb250YWluZWQgd2l0aGluIHRoZSBzYW1lIGNvbXBvbmVudCwgc28gd2UgdXNlIHRoZSB2bSByb290IGVsZW1lbnQgY29uc3RyYWluIG91ciBkb20gc2VhcmNoLlxuICBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSByZWYuc2VsZWN0b3I7XG4gICAgICB2YXIgbmFtZSA9IHJlZi5uYW1lO1xuXG4gICAgdmFyIGVsID0gbnVsbDtcbiAgICAvLyB2dWUgcmVmIHNlbGVjdG9yLlxuICAgIGlmIChzZWxlY3RvclswXSA9PT0gJyQnKSB7XG4gICAgICBlbCA9IHRoaXMkMS52bS4kcmVmc1tzZWxlY3Rvci5zbGljZSgxKV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIHRyeSBxdWVyeSBzZWxlY3RvclxuICAgICAgICBlbCA9IHRoaXMkMS52bS4kZWwucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgZWwgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZWwpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGVsID0gdGhpcyQxLnZtLiRlbC5xdWVyeVNlbGVjdG9yKChcImlucHV0W25hbWU9XFxcIlwiICsgc2VsZWN0b3IgKyBcIlxcXCJdXCIpKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlbCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgdm06IHRoaXMkMS52bSxcbiAgICAgIGNsYXNzZXM6IHRoaXMkMS5jbGFzc2VzLFxuICAgICAgY2xhc3NOYW1lczogdGhpcyQxLmNsYXNzTmFtZXMsXG4gICAgICBkZWxheTogdGhpcyQxLmRlbGF5LFxuICAgICAgc2NvcGU6IHRoaXMkMS5zY29wZSxcbiAgICAgIGV2ZW50czogdGhpcyQxLmV2ZW50cy5qb2luKCd8JyksXG4gICAgICBpbml0aWFsOiB0aGlzJDEuaW5pdGlhbCxcbiAgICAgIHRhcmdldE9mOiB0aGlzJDEuaWRcbiAgICB9O1xuXG4gICAgLy8gcHJvYmFibHkgYSBjb21wb25lbnQuXG4gICAgaWYgKGlzQ2FsbGFibGUoZWwuJHdhdGNoKSkge1xuICAgICAgb3B0aW9ucy5jb21wb25lbnQgPSBlbDtcbiAgICAgIG9wdGlvbnMuZWwgPSBlbC4kZWw7XG4gICAgICBvcHRpb25zLmFsaWFzID0gR2VuZXJhdG9yLnJlc29sdmVBbGlhcyhlbC4kZWwsIHsgY2hpbGQ6IGVsIH0pO1xuICAgICAgb3B0aW9ucy5nZXR0ZXIgPSBHZW5lcmF0b3IucmVzb2x2ZUdldHRlcihlbC4kZWwsIHsgY2hpbGQ6IGVsIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBvcHRpb25zLmVsID0gZWw7XG4gICAgICBvcHRpb25zLmFsaWFzID0gR2VuZXJhdG9yLnJlc29sdmVBbGlhcyhlbCwge30pO1xuICAgICAgb3B0aW9ucy5nZXR0ZXIgPSBHZW5lcmF0b3IucmVzb2x2ZUdldHRlcihlbCwge30pO1xuICAgIH1cblxuICAgIHRoaXMkMS5kZXBlbmRlbmNpZXMucHVzaCh7IG5hbWU6IG5hbWUsIGZpZWxkOiBuZXcgRmllbGQob3B0aW9ucy5lbCwgb3B0aW9ucykgfSk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxpc3RlbmVycy5cbiAqIEBwYXJhbSB7UmVnRXhwfSB0YWdcbiAqL1xuRmllbGQucHJvdG90eXBlLnVud2F0Y2ggPSBmdW5jdGlvbiB1bndhdGNoICh0YWcpIHtcbiAgICBpZiAoIHRhZyA9PT0gdm9pZCAwICkgdGFnID0gbnVsbDtcblxuICBpZiAoIXRhZykge1xuICAgIHRoaXMud2F0Y2hlcnMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy51bndhdGNoKCk7IH0pO1xuICAgIHRoaXMud2F0Y2hlcnMgPSBbXTtcbiAgICByZXR1cm47XG4gIH1cbiAgdGhpcy53YXRjaGVycy5maWx0ZXIoZnVuY3Rpb24gKHcpIHsgcmV0dXJuIHRhZy50ZXN0KHcudGFnKTsgfSkuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy51bndhdGNoKCk7IH0pO1xuICB0aGlzLndhdGNoZXJzID0gdGhpcy53YXRjaGVycy5maWx0ZXIoZnVuY3Rpb24gKHcpIHsgcmV0dXJuICF0YWcudGVzdCh3LnRhZyk7IH0pO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBlbGVtZW50IGNsYXNzZXMgZGVwZW5kaW5nIG9uIGVhY2ggZmllbGQgZmxhZyBzdGF0dXMuXG4gKi9cbkZpZWxkLnByb3RvdHlwZS51cGRhdGVDbGFzc2VzID0gZnVuY3Rpb24gdXBkYXRlQ2xhc3NlcyAoKSB7XG4gIGlmICghdGhpcy5jbGFzc2VzKSB7IHJldHVybjsgfVxuXG4gIHRvZ2dsZUNsYXNzKHRoaXMuZWwsIHRoaXMuY2xhc3NOYW1lcy5kaXJ0eSwgdGhpcy5mbGFncy5kaXJ0eSk7XG4gIHRvZ2dsZUNsYXNzKHRoaXMuZWwsIHRoaXMuY2xhc3NOYW1lcy5wcmlzdGluZSwgdGhpcy5mbGFncy5wcmlzdGluZSk7XG4gIHRvZ2dsZUNsYXNzKHRoaXMuZWwsIHRoaXMuY2xhc3NOYW1lcy52YWxpZCwgISF0aGlzLmZsYWdzLnZhbGlkKTtcbiAgdG9nZ2xlQ2xhc3ModGhpcy5lbCwgdGhpcy5jbGFzc05hbWVzLmludmFsaWQsICEhdGhpcy5mbGFncy5pbnZhbGlkKTtcbiAgdG9nZ2xlQ2xhc3ModGhpcy5lbCwgdGhpcy5jbGFzc05hbWVzLnRvdWNoZWQsIHRoaXMuZmxhZ3MudG91Y2hlZCk7XG4gIHRvZ2dsZUNsYXNzKHRoaXMuZWwsIHRoaXMuY2xhc3NOYW1lcy51bnRvdWNoZWQsIHRoaXMuZmxhZ3MudW50b3VjaGVkKTtcbn07XG5cbi8qKlxuICogQWRkcyB0aGUgbGlzdGVuZXJzIHJlcXVpcmVkIGZvciBhdXRvbWF0aWMgY2xhc3NlcyBhbmQgc29tZSBmbGFncy5cbiAqL1xuRmllbGQucHJvdG90eXBlLmFkZEFjdGlvbkxpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZEFjdGlvbkxpc3RlbmVycyAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgLy8gcmVtb3ZlIHByZXZpb3VzIGxpc3RlbmVycy5cbiAgdGhpcy51bndhdGNoKC9jbGFzcy8pO1xuXG4gIHZhciBvbkJsdXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcyQxLmZsYWdzLnRvdWNoZWQgPSB0cnVlO1xuICAgIHRoaXMkMS5mbGFncy51bnRvdWNoZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcyQxLmNsYXNzZXMpIHtcbiAgICAgIHRvZ2dsZUNsYXNzKHRoaXMkMS5lbCwgdGhpcyQxLmNsYXNzTmFtZXMudG91Y2hlZCwgdHJ1ZSk7XG4gICAgICB0b2dnbGVDbGFzcyh0aGlzJDEuZWwsIHRoaXMkMS5jbGFzc05hbWVzLnVudG91Y2hlZCwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8vIG9ubHkgbmVlZGVkIG9uY2UuXG4gICAgdGhpcyQxLnVud2F0Y2goL15jbGFzc19ibHVyJC8pO1xuICB9O1xuXG4gIHZhciBpbnB1dEV2ZW50ID0gZ2V0SW5wdXRFdmVudE5hbWUodGhpcy5lbCk7XG4gIHZhciBvbklucHV0ID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMkMS5mbGFncy5kaXJ0eSA9IHRydWU7XG4gICAgdGhpcyQxLmZsYWdzLnByaXN0aW5lID0gZmFsc2U7XG4gICAgaWYgKHRoaXMkMS5jbGFzc2VzKSB7XG4gICAgICB0b2dnbGVDbGFzcyh0aGlzJDEuZWwsIHRoaXMkMS5jbGFzc05hbWVzLnByaXN0aW5lLCBmYWxzZSk7XG4gICAgICB0b2dnbGVDbGFzcyh0aGlzJDEuZWwsIHRoaXMkMS5jbGFzc05hbWVzLmRpcnR5LCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBvbmx5IG5lZWRlZCBvbmNlLlxuICAgIHRoaXMkMS51bndhdGNoKC9eY2xhc3NfaW5wdXQkLyk7XG4gIH07XG5cbiAgaWYgKHRoaXMuaXNWdWUgJiYgaXNDYWxsYWJsZSh0aGlzLmNvbXBvbmVudC4kb25jZSkpIHtcbiAgICB0aGlzLmNvbXBvbmVudC4kb25jZSgnaW5wdXQnLCBvbklucHV0KTtcbiAgICB0aGlzLmNvbXBvbmVudC4kb25jZSgnYmx1cicsIG9uQmx1cik7XG4gICAgdGhpcy53YXRjaGVycy5wdXNoKHtcbiAgICAgIHRhZzogJ2NsYXNzX2lucHV0JyxcbiAgICAgIHVud2F0Y2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcyQxLmNvbXBvbmVudC4kb2ZmKCdpbnB1dCcsIG9uSW5wdXQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMud2F0Y2hlcnMucHVzaCh7XG4gICAgICB0YWc6ICdjbGFzc19ibHVyJyxcbiAgICAgIHVud2F0Y2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcyQxLmNvbXBvbmVudC4kb2ZmKCdibHVyJywgb25CbHVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5pc0hlYWRsZXNzKSB7IHJldHVybjsgfVxuXG4gIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihpbnB1dEV2ZW50LCBvbklucHV0KTtcbiAgLy8gQ2hlY2tib3hlcyBhbmQgcmFkaW8gYnV0dG9ucyBvbiBNYWMgZG9uJ3QgZW1pdCBibHVyIG5hdHVyYWxseSwgc28gd2UgbGlzdGVuIG9uIGNsaWNrIGluc3RlYWQuXG4gIHZhciBibHVyRXZlbnQgPSBbJ3JhZGlvJywgJ2NoZWNrYm94J10uaW5kZXhPZih0aGlzLmVsLnR5cGUpID09PSAtMSA/ICdibHVyJyA6ICdjbGljayc7XG4gIHRoaXMuZWwuYWRkRXZlbnRMaXN0ZW5lcihibHVyRXZlbnQsIG9uQmx1cik7XG4gIHRoaXMud2F0Y2hlcnMucHVzaCh7XG4gICAgdGFnOiAnY2xhc3NfaW5wdXQnLFxuICAgIHVud2F0Y2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMkMS5lbC5yZW1vdmVFdmVudExpc3RlbmVyKGlucHV0RXZlbnQsIG9uSW5wdXQpO1xuICAgIH1cbiAgfSk7XG5cbiAgdGhpcy53YXRjaGVycy5wdXNoKHtcbiAgICB0YWc6ICdjbGFzc19ibHVyJyxcbiAgICB1bndhdGNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzJDEuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihibHVyRXZlbnQsIG9uQmx1cik7XG4gICAgfVxuICB9KTtcbn07XG5cbi8qKlxuICogQWRkcyB0aGUgbGlzdGVuZXJzIHJlcXVpcmVkIGZvciB2YWxpZGF0aW9uLlxuICovXG5GaWVsZC5wcm90b3R5cGUuYWRkVmFsdWVMaXN0ZW5lcnMgPSBmdW5jdGlvbiBhZGRWYWx1ZUxpc3RlbmVycyAoKSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG5cbiAgdGhpcy51bndhdGNoKC9eaW5wdXRfLisvKTtcbiAgaWYgKCF0aGlzLmxpc3RlbikgeyByZXR1cm47IH1cblxuICB2YXIgZm4gPSB0aGlzLnRhcmdldE9mID8gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMkMS52YWxpZGF0b3IudmFsaWRhdGUoKFwiI1wiICsgKHRoaXMkMS50YXJnZXRPZikpKTtcbiAgfSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuXG4gICAgLy8gaWYgaXRzIGEgRE9NIGV2ZW50LCByZXNvbHZlIHRoZSB2YWx1ZSwgb3RoZXJ3aXNlIHVzZSB0aGUgZmlyc3QgcGFyYW1ldGVyIGFzIHRoZSB2YWx1ZS5cbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDAgfHwgKGlzQ2FsbGFibGUoRXZlbnQpICYmIGFyZ3NbMF0gaW5zdGFuY2VvZiBFdmVudCkgfHwgKGFyZ3NbMF0gJiYgYXJnc1swXS5zcmNFbGVtZW50KSkge1xuICAgICAgYXJnc1swXSA9IHRoaXMkMS52YWx1ZTtcbiAgICB9XG4gICAgdGhpcyQxLnZhbGlkYXRvci52YWxpZGF0ZSgoXCIjXCIgKyAodGhpcyQxLmlkKSksIGFyZ3NbMF0pO1xuICB9O1xuXG4gIHZhciB2YWxpZGF0ZSA9IGRlYm91bmNlKGZuLCB0aGlzLmRlbGF5KTtcbiAgdmFyIGlucHV0RXZlbnQgPSBnZXRJbnB1dEV2ZW50TmFtZSh0aGlzLmVsKTtcbiAgLy8gcmVwbGFjZSBpbnB1dCBldmVudCB3aXRoIHN1aXRhYmxlIG9uZS5cbiAgdmFyIGV2ZW50cyA9IHRoaXMuZXZlbnRzLm1hcChmdW5jdGlvbiAoZSkge1xuICAgIHJldHVybiBlID09PSAnaW5wdXQnID8gaW5wdXRFdmVudCA6IGU7XG4gIH0pO1xuXG4gIC8vIGlmIHRoZXJlIGlzIGEgd2F0Y2hhYmxlIG1vZGVsIGFuZCBhbiBvbiBpbnB1dCB2YWxpZGF0aW9uIGlzIHJlcXVlc3RlZC5cbiAgaWYgKHRoaXMubW9kZWwgJiYgZXZlbnRzLmluZGV4T2YoaW5wdXRFdmVudCkgIT09IC0xKSB7XG4gICAgdmFyIHVud2F0Y2ggPSB0aGlzLnZtLiR3YXRjaCh0aGlzLm1vZGVsLCB2YWxpZGF0ZSk7XG4gICAgdGhpcy53YXRjaGVycy5wdXNoKHtcbiAgICAgIHRhZzogJ2lucHV0X21vZGVsJyxcbiAgICAgIHVud2F0Y2g6IHVud2F0Y2hcbiAgICB9KTtcbiAgICAvLyBmaWx0ZXIgb3V0IGlucHV0IGV2ZW50IGFzIGl0IGlzIGFscmVhZHkgaGFuZGxlZCBieSB0aGUgd2F0Y2hlciBBUEkuXG4gICAgZXZlbnRzID0gZXZlbnRzLmZpbHRlcihmdW5jdGlvbiAoZSkgeyByZXR1cm4gZSAhPT0gaW5wdXRFdmVudDsgfSk7XG4gIH1cblxuICAvLyBBZGQgZXZlbnRzLlxuICBldmVudHMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgIGlmICh0aGlzJDEuaXNWdWUpIHtcbiAgICAgIHRoaXMkMS5jb21wb25lbnQuJG9uKGUsIHZhbGlkYXRlKTtcbiAgICAgIHRoaXMkMS53YXRjaGVycy5wdXNoKHtcbiAgICAgICAgdGFnOiAnaW5wdXRfdnVlJyxcbiAgICAgICAgdW53YXRjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoaXMkMS5jb21wb25lbnQuJG9mZihlLCB2YWxpZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh+WydyYWRpbycsICdjaGVja2JveCddLmluZGV4T2YodGhpcyQxLmVsLnR5cGUpKSB7XG4gICAgICB2YXIgZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgoXCJpbnB1dFtuYW1lPVxcXCJcIiArICh0aGlzJDEuZWwubmFtZSkgKyBcIlxcXCJdXCIpKTtcbiAgICAgIHRvQXJyYXkoZWxzKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGUsIHZhbGlkYXRlKTtcbiAgICAgICAgdGhpcyQxLndhdGNoZXJzLnB1c2goe1xuICAgICAgICAgIHRhZzogJ2lucHV0X25hdGl2ZScsXG4gICAgICAgICAgdW53YXRjaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihlLCB2YWxpZGF0ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcyQxLmVsLmFkZEV2ZW50TGlzdGVuZXIoZSwgdmFsaWRhdGUpO1xuICAgIHRoaXMkMS53YXRjaGVycy5wdXNoKHtcbiAgICAgIHRhZzogJ2lucHV0X25hdGl2ZScsXG4gICAgICB1bndhdGNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMkMS5lbC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIHZhbGlkYXRlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgYXJpYSBhdHRyaWJ1dGVzIG9uIHRoZSBlbGVtZW50LlxuICovXG5GaWVsZC5wcm90b3R5cGUudXBkYXRlQXJpYUF0dHJzID0gZnVuY3Rpb24gdXBkYXRlQXJpYUF0dHJzICgpIHtcbiAgaWYgKCF0aGlzLmFyaWEgfHwgdGhpcy5pc0hlYWRsZXNzIHx8ICFpc0NhbGxhYmxlKHRoaXMuZWwuc2V0QXR0cmlidXRlKSkgeyByZXR1cm47IH1cblxuICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1yZXF1aXJlZCcsIHRoaXMuaXNSZXF1aXJlZCA/ICd0cnVlJyA6ICdmYWxzZScpO1xuICB0aGlzLmVsLnNldEF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJywgdGhpcy5mbGFncy5pbnZhbGlkID8gJ3RydWUnIDogJ2ZhbHNlJyk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIGN1c3RvbSB2YWxpZGl0eSBmb3IgdGhlIGZpZWxkLlxuICovXG5GaWVsZC5wcm90b3R5cGUudXBkYXRlQ3VzdG9tVmFsaWRpdHkgPSBmdW5jdGlvbiB1cGRhdGVDdXN0b21WYWxpZGl0eSAoKSB7XG4gIGlmICghdGhpcy52YWxpZGl0eSB8fCB0aGlzLmlzSGVhZGxlc3MgfHwgIWlzQ2FsbGFibGUodGhpcy5lbC5zZXRDdXN0b21WYWxpZGl0eSkpIHsgcmV0dXJuOyB9XG5cbiAgdGhpcy5lbC5zZXRDdXN0b21WYWxpZGl0eSh0aGlzLmZsYWdzLnZhbGlkID8gJycgOiAodGhpcy52YWxpZGF0b3IuZXJyb3JzLmZpcnN0QnlJZCh0aGlzLmlkKSB8fCAnJykpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMuXG4gKi9cbkZpZWxkLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSAoKSB7XG4gIHRoaXMud2F0Y2hlcnMuZm9yRWFjaChmdW5jdGlvbiAodykgeyByZXR1cm4gdy51bndhdGNoKCk7IH0pO1xuICB0aGlzLndhdGNoZXJzID0gW107XG4gIHRoaXMuZGVwZW5kZW5jaWVzLmZvckVhY2goZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQuZmllbGQuZGVzdHJveSgpOyB9KTtcbiAgdGhpcy5kZXBlbmRlbmNpZXMgPSBbXTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBGaWVsZC5wcm90b3R5cGUsIHByb3RvdHlwZUFjY2Vzc29ycyQxICk7XG5cbnZhciBGaWVsZEJhZyA9IGZ1bmN0aW9uIEZpZWxkQmFnICgpIHtcbiAgdGhpcy5pdGVtcyA9IFtdO1xufTtcblxudmFyIHByb3RvdHlwZUFjY2Vzc29ycyQyID0geyBsZW5ndGg6IHt9IH07XG5cbi8qKlxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgY3VycmVudCBjb2xsZWN0aW9uIGxlbmd0aC5cbiAqL1xucHJvdG90eXBlQWNjZXNzb3JzJDIubGVuZ3RoLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIHRoaXMuaXRlbXMubGVuZ3RoO1xufTtcblxuLyoqXG4gKiBGaW5kcyB0aGUgZmlyc3QgZmllbGQgdGhhdCBtYXRjaGVzIHRoZSBwcm92aWRlZCBtYXRjaGVyIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXRjaGVyXG4gKiBAcmV0dXJuIHtGaWVsZHx1bmRlZmluZWR9IFRoZSBmaXJzdCBtYXRjaGluZyBpdGVtLlxuICovXG5GaWVsZEJhZy5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uIGZpbmQkMSAobWF0Y2hlcikge1xuICByZXR1cm4gZmluZCh0aGlzLml0ZW1zLCBmdW5jdGlvbiAoaXRlbSkgeyByZXR1cm4gaXRlbS5tYXRjaGVzKG1hdGNoZXIpOyB9KTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtPYmplY3R8QXJyYXl9IG1hdGNoZXJcbiAqIEByZXR1cm4ge0FycmF5fSBBcnJheSBvZiBtYXRjaGluZyBmaWVsZCBpdGVtcy5cbiAqL1xuRmllbGRCYWcucHJvdG90eXBlLmZpbHRlciA9IGZ1bmN0aW9uIGZpbHRlciAobWF0Y2hlcikge1xuICAvLyBtdWx0aXBsZSBtYXRjaGVycyB0byBiZSB0cmllZC5cbiAgaWYgKEFycmF5LmlzQXJyYXkobWF0Y2hlcikpIHtcbiAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIG1hdGNoZXIuc29tZShmdW5jdGlvbiAobSkgeyByZXR1cm4gaXRlbS5tYXRjaGVzKG0pOyB9KTsgfSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoZnVuY3Rpb24gKGl0ZW0pIHsgcmV0dXJuIGl0ZW0ubWF0Y2hlcyhtYXRjaGVyKTsgfSk7XG59O1xuXG4vKipcbiAqIE1hcHMgdGhlIGZpZWxkIGl0ZW1zIHVzaW5nIHRoZSBtYXBwaW5nIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1hcHBlclxuICovXG5GaWVsZEJhZy5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24gbWFwIChtYXBwZXIpIHtcbiAgcmV0dXJuIHRoaXMuaXRlbXMubWFwKG1hcHBlcik7XG59O1xuXG4vKipcbiAqIEZpbmRzIGFuZCByZW1vdmVzIHRoZSBmaXJzdCBmaWVsZCB0aGF0IG1hdGNoZXMgdGhlIHByb3ZpZGVkIG1hdGNoZXIgb2JqZWN0LCByZXR1cm5zIHRoZSByZW1vdmVkIGl0ZW0uXG4gKiBAcGFyYW0ge09iamVjdHxGaWVsZH0gbWF0Y2hlclxuICogQHJldHVybiB7RmllbGR8bnVsbH1cbiAqL1xuRmllbGRCYWcucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIHJlbW92ZSAobWF0Y2hlcikge1xuICB2YXIgaXRlbSA9IG51bGw7XG4gIGlmIChtYXRjaGVyIGluc3RhbmNlb2YgRmllbGQpIHtcbiAgICBpdGVtID0gbWF0Y2hlcjtcbiAgfSBlbHNlIHtcbiAgICBpdGVtID0gdGhpcy5maW5kKG1hdGNoZXIpO1xuICB9XG5cbiAgaWYgKCFpdGVtKSB7IHJldHVybiBudWxsOyB9XG5cbiAgdmFyIGluZGV4ID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICB0aGlzLml0ZW1zLnNwbGljZShpbmRleCwgMSk7XG5cbiAgcmV0dXJuIGl0ZW07XG59O1xuXG4vKipcbiAqIEFkZHMgYSBmaWVsZCBpdGVtIHRvIHRoZSBsaXN0LlxuICpcbiAqIEBwYXJhbSB7RmllbGR9IGl0ZW1cbiAqL1xuRmllbGRCYWcucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbiBwdXNoIChpdGVtKSB7XG4gIGlmICghIChpdGVtIGluc3RhbmNlb2YgRmllbGQpKSB7XG4gICAgdGhyb3cgY3JlYXRlRXJyb3IoJ0ZpZWxkQmFnIG9ubHkgYWNjZXB0cyBpbnN0YW5jZXMgb2YgRmllbGQgdGhhdCBoYXMgYW4gaWQgZGVmaW5lZC4nKTtcbiAgfVxuXG4gIGlmICghaXRlbS5pZCkge1xuICAgIHRocm93IGNyZWF0ZUVycm9yKCdGaWVsZCBpZCBtdXN0IGJlIGRlZmluZWQuJyk7XG4gIH1cblxuICBpZiAodGhpcy5maW5kKHsgaWQ6IGl0ZW0uaWQgfSkpIHtcbiAgICB0aHJvdyBjcmVhdGVFcnJvcigoXCJGaWVsZCB3aXRoIGlkIFwiICsgKGl0ZW0uaWQpICsgXCIgaXMgYWxyZWFkeSBhZGRlZC5cIikpO1xuICB9XG5cbiAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoIEZpZWxkQmFnLnByb3RvdHlwZSwgcHJvdG90eXBlQWNjZXNzb3JzJDIgKTtcblxudmFyIFJVTEVTID0ge307XG52YXIgTE9DQUxFID0gJ2VuJztcbnZhciBTVFJJQ1RfTU9ERSA9IHRydWU7XG52YXIgRElDVElPTkFSWSA9IG5ldyBEaWN0aW9uYXJ5KHtcbiAgZW46IHtcbiAgICBtZXNzYWdlczoge30sXG4gICAgYXR0cmlidXRlczoge30sXG4gICAgY3VzdG9tOiB7fVxuICB9XG59KTtcblxudmFyIFZhbGlkYXRvciA9IGZ1bmN0aW9uIFZhbGlkYXRvciAodmFsaWRhdGlvbnMsIG9wdGlvbnMpIHtcbiAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHsgdm06IG51bGwsIGZhc3RFeGl0OiB0cnVlIH07XG5cbiAgdGhpcy5zdHJpY3QgPSBTVFJJQ1RfTU9ERTtcbiAgdGhpcy5lcnJvcnMgPSBuZXcgRXJyb3JCYWcoKTtcbiAgdGhpcy5maWVsZHMgPSBuZXcgRmllbGRCYWcoKTtcbiAgdGhpcy5mbGFncyA9IHt9O1xuICB0aGlzLl9jcmVhdGVGaWVsZHModmFsaWRhdGlvbnMpO1xuICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICB0aGlzLmZhc3RFeGl0ID0gb3B0aW9ucy5mYXN0RXhpdCB8fCBmYWxzZTtcbiAgdGhpcy5vd25lcklkID0gb3B0aW9ucy52bSAmJiBvcHRpb25zLnZtLl91aWQ7XG4gIC8vIGNyZWF0ZSBpdCBzdGF0aWNhbGx5IHNpbmNlIHdlIGRvbid0IG5lZWQgY29uc3RhbnQgYWNjZXNzIHRvIHRoZSB2bS5cbiAgdGhpcy5yZXNldCA9IG9wdGlvbnMudm0gJiYgaXNDYWxsYWJsZShvcHRpb25zLnZtLiRuZXh0VGljaykgPyBmdW5jdGlvbiAoKSB7XG4gICAgb3B0aW9ucy52bS4kbmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcyQxLmZpZWxkcy5pdGVtcy5mb3JFYWNoKGZ1bmN0aW9uIChpKSB7IHJldHVybiBpLnJlc2V0KCk7IH0pO1xuICAgICAgdGhpcyQxLmVycm9ycy5jbGVhcigpO1xuICAgIH0pO1xuICB9IDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMkMS5maWVsZHMuaXRlbXMuZm9yRWFjaChmdW5jdGlvbiAoaSkgeyByZXR1cm4gaS5yZXNldCgpOyB9KTtcbiAgICB0aGlzJDEuZXJyb3JzLmNsZWFyKCk7XG4gIH07XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHRoaXMuY2xlYW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgd2FybigndmFsaWRhdG9yLmNsZWFuIGlzIG1hcmtlZCBmb3IgZGVwcmVjYXRpb24sIHBsZWFzZSB1c2UgdmFsaWRhdG9yLnJlc2V0IGluc3RlYWQuJyk7XG4gICAgdGhpcyQxLnJlc2V0KCk7XG4gIH07XG59O1xuXG52YXIgcHJvdG90eXBlQWNjZXNzb3JzID0geyBkaWN0aW9uYXJ5OiB7fSxsb2NhbGU6IHt9LHJ1bGVzOiB7fSB9O1xudmFyIHN0YXRpY0FjY2Vzc29ycyA9IHsgZGljdGlvbmFyeToge30sbG9jYWxlOiB7fSxydWxlczoge30gfTtcblxuLyoqXG4gKiBAcmV0dXJuIHtEaWN0aW9uYXJ5fVxuICovXG5wcm90b3R5cGVBY2Nlc3NvcnMuZGljdGlvbmFyeS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBESUNUSU9OQVJZO1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHtEaWN0aW9uYXJ5fVxuICovXG5zdGF0aWNBY2Nlc3NvcnMuZGljdGlvbmFyeS5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBESUNUSU9OQVJZO1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbnByb3RvdHlwZUFjY2Vzc29ycy5sb2NhbGUuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gTE9DQUxFO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsdWVcbiAqL1xucHJvdG90eXBlQWNjZXNzb3JzLmxvY2FsZS5zZXQgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgVmFsaWRhdG9yLmxvY2FsZSA9IHZhbHVlO1xufTtcblxuLyoqXG4qIEByZXR1cm4ge1N0cmluZ31cbiovXG5zdGF0aWNBY2Nlc3NvcnMubG9jYWxlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIExPQ0FMRTtcbn07XG5cbi8qKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbHVlXG4gKi9cbnN0YXRpY0FjY2Vzc29ycy5sb2NhbGUuc2V0ID0gZnVuY3Rpb24gKHZhbHVlKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoIURJQ1RJT05BUlkuaGFzTG9jYWxlKHZhbHVlKSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHdhcm4oJ1lvdSBhcmUgc2V0dGluZyB0aGUgdmFsaWRhdG9yIGxvY2FsZSB0byBhIGxvY2FsZSB0aGF0IGlzIG5vdCBkZWZpbmVkIGluIHRoZSBkaWN0aW9uYXJ5LiBFbmdsaXNoIG1lc3NhZ2VzIG1heSBzdGlsbCBiZSBnZW5lcmF0ZWQuJyk7XG4gIH1cblxuICBMT0NBTEUgPSB2YWx1ZTtcbn07XG5cbi8qKlxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5wcm90b3R5cGVBY2Nlc3NvcnMucnVsZXMuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gUlVMRVM7XG59O1xuXG4vKipcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuc3RhdGljQWNjZXNzb3JzLnJ1bGVzLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIFJVTEVTO1xufTtcblxuLyoqXG4gKiBTdGF0aWMgY29uc3RydWN0b3IuXG4gKlxuICogQHBhcmFte29iamVjdH0gdmFsaWRhdGlvbnMgVGhlIHZhbGlkYXRpb25zIG9iamVjdC5cbiAqIEByZXR1cm4ge1ZhbGlkYXRvcn0gdmFsaWRhdG9yIEEgdmFsaWRhdG9yIG9iamVjdC5cbiAqL1xuVmFsaWRhdG9yLmNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZSAodmFsaWRhdGlvbnMsIG9wdGlvbnMpIHtcbiAgcmV0dXJuIG5ldyBWYWxpZGF0b3IodmFsaWRhdGlvbnMsIG9wdGlvbnMpO1xufTtcblxuLyoqXG4gKiBBZGRzIGEgY3VzdG9tIHZhbGlkYXRvciB0byB0aGUgbGlzdCBvZiB2YWxpZGF0aW9uIHJ1bGVzLlxuICpcbiAqIEBwYXJhbXtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHZhbGlkYXRvci5cbiAqIEBwYXJhbXtvYmplY3R8ZnVuY3Rpb259IHZhbGlkYXRvciBUaGUgdmFsaWRhdG9yIG9iamVjdC9mdW5jdGlvbi5cbiAqL1xuVmFsaWRhdG9yLmV4dGVuZCA9IGZ1bmN0aW9uIGV4dGVuZCAobmFtZSwgdmFsaWRhdG9yKSB7XG4gIFZhbGlkYXRvci5fZ3VhcmRFeHRlbmQobmFtZSwgdmFsaWRhdG9yKTtcbiAgVmFsaWRhdG9yLl9tZXJnZShuYW1lLCB2YWxpZGF0b3IpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGEgcnVsZSBmcm9tIHRoZSBsaXN0IG9mIHZhbGlkYXRvcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdmFsaWRhdG9yL3J1bGUuXG4gKi9cblZhbGlkYXRvci5yZW1vdmUgPSBmdW5jdGlvbiByZW1vdmUgKG5hbWUpIHtcbiAgZGVsZXRlIFJVTEVTW25hbWVdO1xufTtcblxuLyoqXG4gKiBTZXRzIHRoZSBkZWZhdWx0IGxvY2FsZSBmb3IgYWxsIHZhbGlkYXRvcnMuXG4gKiBAZGVwcmVjYXRlZFxuICogQHBhcmFtIHtTdHJpbmd9IGxhbmd1YWdlIFRoZSBsb2NhbGUgaWQuXG4gKi9cblZhbGlkYXRvci5zZXRMb2NhbGUgPSBmdW5jdGlvbiBzZXRMb2NhbGUgKGxhbmd1YWdlKSB7XG4gICAgaWYgKCBsYW5ndWFnZSA9PT0gdm9pZCAwICkgbGFuZ3VhZ2UgPSAnZW4nO1xuXG4gIFZhbGlkYXRvci5sb2NhbGUgPSBsYW5ndWFnZTtcbn07XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuVmFsaWRhdG9yLmluc3RhbGxEYXRlVGltZVZhbGlkYXRvcnMgPSBmdW5jdGlvbiBpbnN0YWxsRGF0ZVRpbWVWYWxpZGF0b3JzICgpIHtcbiAgLyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cbiAgd2FybignRGF0ZSB2YWxpZGF0aW9ucyBhcmUgbm93IGluc3RhbGxlZCBieSBkZWZhdWx0LCB5b3Ugbm8gbG9uZ2VyIG5lZWQgdG8gaW5zdGFsbCBpdC4nKTtcbn07XG5cbi8qKlxuICogQGRlcHJlY2F0ZWRcbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5pbnN0YWxsRGF0ZVRpbWVWYWxpZGF0b3JzID0gZnVuY3Rpb24gaW5zdGFsbERhdGVUaW1lVmFsaWRhdG9ycyAoKSB7XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICovXG4gIHdhcm4oJ0RhdGUgdmFsaWRhdGlvbnMgYXJlIG5vdyBpbnN0YWxsZWQgYnkgZGVmYXVsdCwgeW91IG5vIGxvbmdlciBuZWVkIHRvIGluc3RhbGwgaXQuJyk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIG9wZXJhdGluZyBtb2RlIGZvciBhbGwgbmV3bHkgY3JlYXRlZCB2YWxpZGF0b3JzLlxuICogc3RyaWN0TW9kZSA9IHRydWU6IFZhbHVlcyB3aXRob3V0IGEgcnVsZSBhcmUgaW52YWxpZCBhbmQgY2F1c2UgZmFpbHVyZS5cbiAqIHN0cmljdE1vZGUgPSBmYWxzZTogVmFsdWVzIHdpdGhvdXQgYSBydWxlIGFyZSB2YWxpZCBhbmQgYXJlIHNraXBwZWQuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHN0cmljdE1vZGUuXG4gKi9cblZhbGlkYXRvci5zZXRTdHJpY3RNb2RlID0gZnVuY3Rpb24gc2V0U3RyaWN0TW9kZSAoc3RyaWN0TW9kZSkge1xuICAgIGlmICggc3RyaWN0TW9kZSA9PT0gdm9pZCAwICkgc3RyaWN0TW9kZSA9IHRydWU7XG5cbiAgU1RSSUNUX01PREUgPSBzdHJpY3RNb2RlO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBkaWN0aW9uYXJ5LCBvdmVyd3JpdGluZyBleGlzdGluZyB2YWx1ZXMgYW5kIGFkZGluZyBuZXcgb25lcy5cbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW17b2JqZWN0fSBkYXRhIFRoZSBkaWN0aW9uYXJ5IG9iamVjdC5cbiAqL1xuVmFsaWRhdG9yLnVwZGF0ZURpY3Rpb25hcnkgPSBmdW5jdGlvbiB1cGRhdGVEaWN0aW9uYXJ5IChkYXRhKSB7XG4gIERJQ1RJT05BUlkubWVyZ2UoZGF0YSk7XG59O1xuXG4vKipcbiAqIEFkZHMgYSBsb2NhbGUgb2JqZWN0IHRvIHRoZSBkaWN0aW9uYXJ5LlxuICogQGRlcHJlY2F0ZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBsb2NhbGVcbiAqL1xuVmFsaWRhdG9yLmFkZExvY2FsZSA9IGZ1bmN0aW9uIGFkZExvY2FsZSAobG9jYWxlKSB7XG4gIGlmICghIGxvY2FsZS5uYW1lKSB7XG4gICAgd2FybignWW91ciBsb2NhbGUgbXVzdCBoYXZlIGEgbmFtZSBwcm9wZXJ0eScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMudXBkYXRlRGljdGlvbmFyeSgoIG9iaiA9IHt9LCBvYmpbbG9jYWxlLm5hbWVdID0gbG9jYWxlLCBvYmogKSk7XG4gICAgdmFyIG9iajtcbn07XG5cbi8qKlxuICogQWRkcyBhIGxvY2FsZSBvYmplY3QgdG8gdGhlIGRpY3Rpb25hcnkuXG4gKiBAZGVwcmVjYXRlZFxuICogQHBhcmFtIHtPYmplY3R9IGxvY2FsZVxuICovXG5WYWxpZGF0b3IucHJvdG90eXBlLmFkZExvY2FsZSA9IGZ1bmN0aW9uIGFkZExvY2FsZSAobG9jYWxlKSB7XG4gIFZhbGlkYXRvci5hZGRMb2NhbGUobG9jYWxlKTtcbn07XG5cbi8qKlxuICogQWRkcyBhbmQgc2V0cyB0aGUgY3VycmVudCBsb2NhbGUgZm9yIHRoZSB2YWxpZGF0b3IuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGxhbmdcbiAqIEBwYXJhbSB7T2JqZWN0fSBkaWN0aW9uYXJ5XG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUubG9jYWxpemUgPSBmdW5jdGlvbiBsb2NhbGl6ZSAobGFuZywgZGljdGlvbmFyeSkge1xuICBWYWxpZGF0b3IubG9jYWxpemUobGFuZywgZGljdGlvbmFyeSk7XG59O1xuXG4vKipcbiAqIEFkZHMgYW5kIHNldHMgdGhlIGN1cnJlbnQgbG9jYWxlIGZvciB0aGUgdmFsaWRhdG9yLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBsYW5nXG4gKiBAcGFyYW0ge09iamVjdH0gZGljdGlvbmFyeVxuICovXG5WYWxpZGF0b3IubG9jYWxpemUgPSBmdW5jdGlvbiBsb2NhbGl6ZSAobGFuZywgZGljdGlvbmFyeSkge1xuICAvLyBtZXJnZSB0aGUgZGljdGlvbmFyeS5cbiAgaWYgKGRpY3Rpb25hcnkpIHtcbiAgICBkaWN0aW9uYXJ5ID0gYXNzaWduKHt9LCBkaWN0aW9uYXJ5LCB7IG5hbWU6IGxhbmcgfSk7XG4gICAgVmFsaWRhdG9yLmFkZExvY2FsZShkaWN0aW9uYXJ5KTtcbiAgfVxuXG4gIC8vIHNldCB0aGUgbG9jYWxlLlxuICBWYWxpZGF0b3IubG9jYWxlID0gbGFuZztcbn07XG5cbi8qKlxuICogUmVnaXN0ZXJzIGEgZmllbGQgdG8gYmUgdmFsaWRhdGVkLlxuICpcbiAqIEBwYXJhbXtGaWVsZHxPYmplY3R9IG5hbWUgVGhlIGZpZWxkIG5hbWUuXG4gKiBAcmV0dXJuIHtGaWVsZH1cbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5hdHRhY2ggPSBmdW5jdGlvbiBhdHRhY2ggKGZpZWxkKSB7XG4gIC8vIGRlcHJlY2F0ZTogaGFuZGxlIG9sZCBzaWduYXR1cmUuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIGZpZWxkID0gYXNzaWduKHt9LCB7XG4gICAgICBuYW1lOiBhcmd1bWVudHNbMF0sXG4gICAgICBydWxlczogYXJndW1lbnRzWzFdXG4gICAgfSwgYXJndW1lbnRzWzJdIHx8IHsgdm06IHsgJHZhbGlkYXRvcjogdGhpcyB9IH0pO1xuICB9XG5cbiAgLy8gZml4ZXMgaW5pdGlhbCB2YWx1ZSBkZXRlY3Rpb24gd2l0aCB2LW1vZGVsIGFuZCBzZWxlY3QgZWxlbWVudHMuXG4gIHZhciB2YWx1ZSA9IGZpZWxkLmluaXRpYWxWYWx1ZTtcbiAgaWYgKCEoZmllbGQgaW5zdGFuY2VvZiBGaWVsZCkpIHtcbiAgICBmaWVsZCA9IG5ldyBGaWVsZChmaWVsZC5lbCB8fCBudWxsLCBmaWVsZCk7XG4gIH1cblxuICB0aGlzLmZpZWxkcy5wdXNoKGZpZWxkKTtcblxuICAvLyB2YWxpZGF0ZSB0aGUgZmllbGQgaW5pdGlhbGx5XG4gIGlmIChmaWVsZC5pbml0aWFsKSB7XG4gICAgdGhpcy52YWxpZGF0ZSgoXCIjXCIgKyAoZmllbGQuaWQpKSwgdmFsdWUgfHwgZmllbGQudmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuX3ZhbGlkYXRlKGZpZWxkLCB2YWx1ZSB8fCBmaWVsZC52YWx1ZSwgdHJ1ZSkudGhlbihmdW5jdGlvbiAodmFsaWQpIHtcbiAgICAgIGZpZWxkLmZsYWdzLnZhbGlkID0gdmFsaWQ7XG4gICAgICBmaWVsZC5mbGFncy5pbnZhbGlkID0gIXZhbGlkO1xuICAgIH0pO1xuICB9XG5cbiAgdGhpcy5fYWRkRmxhZyhmaWVsZCwgZmllbGQuc2NvcGUpO1xuICByZXR1cm4gZmllbGQ7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGZsYWdzIG9uIGEgZmllbGQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7T2JqZWN0fSBmbGFnc1xuICovXG5WYWxpZGF0b3IucHJvdG90eXBlLmZsYWcgPSBmdW5jdGlvbiBmbGFnIChuYW1lLCBmbGFncykge1xuICB2YXIgZmllbGQgPSB0aGlzLl9yZXNvbHZlRmllbGQobmFtZSk7XG4gIGlmICghIGZpZWxkIHx8ICFmbGFncykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGZpZWxkLnNldEZsYWdzKGZsYWdzKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlcyBhIGZpZWxkIGZyb20gdGhlIHZhbGlkYXRvci5cbiAqXG4gKiBAcGFyYW17U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWVsZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzY29wZSBUaGUgbmFtZSBvZiB0aGUgZmllbGQgc2NvcGUuXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUuZGV0YWNoID0gZnVuY3Rpb24gZGV0YWNoIChuYW1lLCBzY29wZSkge1xuICB2YXIgZmllbGQgPSBuYW1lIGluc3RhbmNlb2YgRmllbGQgPyBuYW1lIDogdGhpcy5fcmVzb2x2ZUZpZWxkKG5hbWUsIHNjb3BlKTtcbiAgaWYgKCFmaWVsZCkgeyByZXR1cm47IH1cblxuICBmaWVsZC5kZXN0cm95KCk7XG4gIHRoaXMuZXJyb3JzLnJlbW92ZShmaWVsZC5uYW1lLCBmaWVsZC5zY29wZSwgZmllbGQuaWQpO1xuICB0aGlzLmZpZWxkcy5yZW1vdmUoZmllbGQpO1xuICB2YXIgZmxhZ3MgPSB0aGlzLmZsYWdzO1xuICBpZiAoIWlzTnVsbE9yVW5kZWZpbmVkKGZpZWxkLnNjb3BlKSAmJiBmbGFnc1soXCIkXCIgKyAoZmllbGQuc2NvcGUpKV0pIHtcbiAgICBkZWxldGUgZmxhZ3NbKFwiJFwiICsgKGZpZWxkLnNjb3BlKSldW2ZpZWxkLm5hbWVdO1xuICB9IGVsc2UgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGZpZWxkLnNjb3BlKSkge1xuICAgIGRlbGV0ZSBmbGFnc1tmaWVsZC5uYW1lXTtcbiAgfVxuXG4gIHRoaXMuZmxhZ3MgPSBhc3NpZ24oe30sIGZsYWdzKTtcbn07XG5cbi8qKlxuICogQWRkcyBhIGN1c3RvbSB2YWxpZGF0b3IgdG8gdGhlIGxpc3Qgb2YgdmFsaWRhdGlvbiBydWxlcy5cbiAqXG4gKiBAcGFyYW17c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSB2YWxpZGF0b3IuXG4gKiBAcGFyYW17b2JqZWN0fGZ1bmN0aW9ufSB2YWxpZGF0b3IgVGhlIHZhbGlkYXRvciBvYmplY3QvZnVuY3Rpb24uXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUuZXh0ZW5kID0gZnVuY3Rpb24gZXh0ZW5kIChuYW1lLCB2YWxpZGF0b3IpIHtcbiAgVmFsaWRhdG9yLmV4dGVuZChuYW1lLCB2YWxpZGF0b3IpO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIGEgZmllbGQsIHVwZGF0aW5nIGJvdGggZXJyb3JzIGFuZCBmbGFncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkaWZmXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlIChpZCwgcmVmKSB7XG4gICAgdmFyIHNjb3BlID0gcmVmLnNjb3BlO1xuXG4gIHZhciBmaWVsZCA9IHRoaXMuX3Jlc29sdmVGaWVsZCgoXCIjXCIgKyBpZCkpO1xuICB0aGlzLmVycm9ycy51cGRhdGUoaWQsIHsgc2NvcGU6IHNjb3BlIH0pO1xuXG4gIC8vIHJlbW92ZSBvbGQgc2NvcGUuXG4gIGlmICghaXNOdWxsT3JVbmRlZmluZWQoZmllbGQuc2NvcGUpICYmIHRoaXMuZmxhZ3NbKFwiJFwiICsgKGZpZWxkLnNjb3BlKSldKSB7XG4gICAgZGVsZXRlIHRoaXMuZmxhZ3NbKFwiJFwiICsgKGZpZWxkLnNjb3BlKSldW2ZpZWxkLm5hbWVdO1xuICB9IGVsc2UgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKGZpZWxkLnNjb3BlKSkge1xuICAgIGRlbGV0ZSB0aGlzLmZsYWdzW2ZpZWxkLm5hbWVdO1xuICB9XG5cbiAgdGhpcy5fYWRkRmxhZyhmaWVsZCwgc2NvcGUpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGEgcnVsZSBmcm9tIHRoZSBsaXN0IG9mIHZhbGlkYXRvcnMuXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdmFsaWRhdG9yL3J1bGUuXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gcmVtb3ZlIChuYW1lKSB7XG4gIFZhbGlkYXRvci5yZW1vdmUobmFtZSk7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZhbGlkYXRvciBjdXJyZW50IGxhbmdhdWdlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBsYW5ndWFnZSBsb2NhbGUgb3IgbGFuZ3VhZ2UgaWQuXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUuc2V0TG9jYWxlID0gZnVuY3Rpb24gc2V0TG9jYWxlIChsYW5ndWFnZSkge1xuICB0aGlzLmxvY2FsZSA9IGxhbmd1YWdlO1xufTtcblxuLyoqXG4gKiBVcGRhdGVzIHRoZSBtZXNzYWdlcyBkaWN0aW9uYXJ5LCBvdmVyd3JpdGluZyBleGlzdGluZyB2YWx1ZXMgYW5kIGFkZGluZyBuZXcgb25lcy5cbiAqIEBkZXByZWNhdGVkXG4gKiBAcGFyYW17b2JqZWN0fSBkYXRhIFRoZSBtZXNzYWdlcyBvYmplY3QuXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUudXBkYXRlRGljdGlvbmFyeSA9IGZ1bmN0aW9uIHVwZGF0ZURpY3Rpb25hcnkgKGRhdGEpIHtcbiAgVmFsaWRhdG9yLnVwZGF0ZURpY3Rpb25hcnkoZGF0YSk7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlcyBhIHZhbHVlIGFnYWluc3QgYSByZWdpc3RlcmVkIGZpZWxkIHZhbGlkYXRpb25zLlxuICpcbiAqIEBwYXJhbXtzdHJpbmd9IG5hbWUgdGhlIGZpZWxkIG5hbWUuXG4gKiBAcGFyYW17Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGJlIHZhbGlkYXRlZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBzY29wZSBUaGUgc2NvcGUgb2YgdGhlIGZpZWxkLlxuICogQHJldHVybiB7UHJvbWlzZX1cbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS52YWxpZGF0ZSA9IGZ1bmN0aW9uIHZhbGlkYXRlIChuYW1lLCB2YWx1ZSwgc2NvcGUpIHtcbiAgICBpZiAoIHNjb3BlID09PSB2b2lkIDAgKSBzY29wZSA9IG51bGw7XG5cbiAgaWYgKHRoaXMucGF1c2VkKSB7IHJldHVybiBQcm9taXNlLnJlc29sdmUodHJ1ZSk7IH1cblxuICAvLyBvdmVybG9hZCB0byB2YWxpZGF0ZSBhbGwuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGVTY29wZXMoKTtcbiAgfVxuXG4gIC8vIG92ZXJsb2FkIHRvIHZhbGlkYXRlIHNjb3BlbGVzcyBmaWVsZHMuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIGFyZ3VtZW50c1swXSA9PT0gJyonKSB7XG4gICAgcmV0dXJuIHRoaXMudmFsaWRhdGVBbGwoKTtcbiAgfVxuXG4gIC8vIG92ZXJsb2FkIHRvIHZhbGlkYXRlIGEgc2NvcGUuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxICYmIHR5cGVvZiBhcmd1bWVudHNbMF0gPT09ICdzdHJpbmcnICYmIC9eKC4rKVxcLlxcKiQvLnRlc3QoYXJndW1lbnRzWzBdKSkge1xuICAgIHZhciBtYXRjaGVkID0gYXJndW1lbnRzWzBdLm1hdGNoKC9eKC4rKVxcLlxcKiQvKVsxXTtcbiAgICByZXR1cm4gdGhpcy52YWxpZGF0ZUFsbChtYXRjaGVkKTtcbiAgfVxuXG4gIHZhciBmaWVsZCA9IHRoaXMuX3Jlc29sdmVGaWVsZChuYW1lLCBzY29wZSk7XG4gIGlmICghZmllbGQpIHtcbiAgICByZXR1cm4gdGhpcy5faGFuZGxlRmllbGROb3RGb3VuZChuYW1lLCBzY29wZSk7XG4gIH1cblxuICB0aGlzLmVycm9ycy5yZW1vdmUoZmllbGQubmFtZSwgZmllbGQuc2NvcGUsIGZpZWxkLmlkKTtcbiAgZmllbGQuZmxhZ3MucGVuZGluZyA9IHRydWU7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFsdWUgPSBmaWVsZC52YWx1ZTtcbiAgfVxuXG4gIHZhciBzaWxlbnRSdW4gPSBmaWVsZC5pc0Rpc2FibGVkO1xuXG4gIHJldHVybiB0aGlzLl92YWxpZGF0ZShmaWVsZCwgdmFsdWUsIHNpbGVudFJ1bikudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgZmllbGQuc2V0RmxhZ3Moe1xuICAgICAgcGVuZGluZzogZmFsc2UsXG4gICAgICB2YWxpZDogcmVzdWx0LFxuICAgICAgdmFsaWRhdGVkOiB0cnVlXG4gICAgfSk7XG5cbiAgICBpZiAoc2lsZW50UnVuKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBQYXVzZXMgdGhlIHZhbGlkYXRvci5cbiAqXG4gKiBAcmV0dXJuIHtWYWxpZGF0b3J9XG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiBwYXVzZSAoKSB7XG4gIHRoaXMucGF1c2VkID0gdHJ1ZTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVzdW1lcyB0aGUgdmFsaWRhdG9yLlxuICpcbiAqIEByZXR1cm4ge1ZhbGlkYXRvcn1cbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiByZXN1bWUgKCkge1xuICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgZWFjaCB2YWx1ZSBhZ2FpbnN0IHRoZSBjb3JyZXNwb25kaW5nIGZpZWxkIHZhbGlkYXRpb25zLlxuICogQHBhcmFte09iamVjdHxTdHJpbmd9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGJlIHZhbGlkYXRlZC5cbiAqIEByZXR1cm4ge1Byb21pc2V9IFJldHVybnMgYSBwcm9taXNlIHdpdGggdGhlIHZhbGlkYXRpb24gcmVzdWx0LlxuICovXG5WYWxpZGF0b3IucHJvdG90eXBlLnZhbGlkYXRlQWxsID0gZnVuY3Rpb24gdmFsaWRhdGVBbGwgKHZhbHVlcykge1xuICAgIHZhciBhcmd1bWVudHMkMSA9IGFyZ3VtZW50cztcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAodGhpcy5wYXVzZWQpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTsgfVxuXG4gIHZhciBtYXRjaGVyID0gbnVsbDtcbiAgdmFyIHByb3ZpZGVkVmFsdWVzID0gZmFsc2U7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgbWF0Y2hlciA9IHsgc2NvcGU6IHZhbHVlcyB9O1xuICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlcykpIHtcbiAgICBtYXRjaGVyID0gT2JqZWN0LmtleXModmFsdWVzKS5tYXAoZnVuY3Rpb24gKGtleSkge1xuICAgICAgcmV0dXJuIHsgbmFtZToga2V5LCBzY29wZTogYXJndW1lbnRzJDFbMV0gfHwgbnVsbCB9O1xuICAgIH0pO1xuICAgIHByb3ZpZGVkVmFsdWVzID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgbWF0Y2hlciA9IHsgc2NvcGU6IG51bGwgfTsgLy8gZ2xvYmFsIHNjb3BlLlxuICB9XG5cbiAgdmFyIHByb21pc2VzID0gdGhpcy5maWVsZHMuZmlsdGVyKG1hdGNoZXIpLm1hcChmdW5jdGlvbiAoZmllbGQpIHsgcmV0dXJuIHRoaXMkMS52YWxpZGF0ZShcbiAgICAoXCIjXCIgKyAoZmllbGQuaWQpKSxcbiAgICBwcm92aWRlZFZhbHVlcyA/IHZhbHVlc1tmaWVsZC5uYW1lXSA6IGZpZWxkLnZhbHVlXG4gICk7IH0pO1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbiAocmVzdWx0cykgeyByZXR1cm4gcmVzdWx0cy5ldmVyeShmdW5jdGlvbiAodCkgeyByZXR1cm4gdDsgfSk7IH0pO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZXMgYWxsIHNjb3Blcy5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQWxsIHByb21pc2VzIHJlc3VsdGVkIGZyb20gZWFjaCBzY29wZS5cbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS52YWxpZGF0ZVNjb3BlcyA9IGZ1bmN0aW9uIHZhbGlkYXRlU2NvcGVzICgpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAodGhpcy5wYXVzZWQpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTsgfVxuXG4gIHZhciBwcm9taXNlcyA9IHRoaXMuZmllbGRzLm1hcChmdW5jdGlvbiAoZmllbGQpIHsgcmV0dXJuIHRoaXMkMS52YWxpZGF0ZShcbiAgICAoXCIjXCIgKyAoZmllbGQuaWQpKSxcbiAgICBmaWVsZC52YWx1ZVxuICApOyB9KTtcblxuICByZXR1cm4gUHJvbWlzZS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKHJlc3VsdHMpIHsgcmV0dXJuIHJlc3VsdHMuZXZlcnkoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQ7IH0pOyB9KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgZmllbGRzIHRvIGJlIHZhbGlkYXRlZC5cbiAqXG4gKiBAcGFyYW17b2JqZWN0fSB2YWxpZGF0aW9uc1xuICogQHJldHVybiB7b2JqZWN0fSBOb3JtYWxpemVkIG9iamVjdC5cbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5fY3JlYXRlRmllbGRzID0gZnVuY3Rpb24gX2NyZWF0ZUZpZWxkcyAodmFsaWRhdGlvbnMpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICBpZiAoIXZhbGlkYXRpb25zKSB7IHJldHVybjsgfVxuXG4gIE9iamVjdC5rZXlzKHZhbGlkYXRpb25zKS5mb3JFYWNoKGZ1bmN0aW9uIChmaWVsZCkge1xuICAgIHZhciBvcHRpb25zID0gYXNzaWduKHt9LCB7IG5hbWU6IGZpZWxkLCBydWxlczogdmFsaWRhdGlvbnNbZmllbGRdIH0pO1xuICAgIHRoaXMkMS5hdHRhY2gob3B0aW9ucyk7XG4gIH0pO1xufTtcblxuLyoqXG4gKiBEYXRlIHJ1bGVzIG5lZWQgdGhlIGV4aXN0YW5jZSBvZiBhIGZvcm1hdCwgc28gZGF0ZV9mb3JtYXQgbXVzdCBiZSBzdXBwbGllZC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lIFRoZSBydWxlIG5hbWUuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWxpZGF0aW9ucyB0aGUgZmllbGQgdmFsaWRhdGlvbnMuXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUuX2dldERhdGVGb3JtYXQgPSBmdW5jdGlvbiBfZ2V0RGF0ZUZvcm1hdCAodmFsaWRhdGlvbnMpIHtcbiAgdmFyIGZvcm1hdCA9IG51bGw7XG4gIGlmICh2YWxpZGF0aW9ucy5kYXRlX2Zvcm1hdCAmJiBBcnJheS5pc0FycmF5KHZhbGlkYXRpb25zLmRhdGVfZm9ybWF0KSkge1xuICAgIGZvcm1hdCA9IHZhbGlkYXRpb25zLmRhdGVfZm9ybWF0WzBdO1xuICB9XG5cbiAgcmV0dXJuIGZvcm1hdCB8fCB0aGlzLmRpY3Rpb25hcnkuZ2V0RGF0ZUZvcm1hdCh0aGlzLmxvY2FsZSk7XG59O1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgcGFzc2VkIHJ1bGUgaXMgYSBkYXRlIHJ1bGUuXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUuX2lzQURhdGVSdWxlID0gZnVuY3Rpb24gX2lzQURhdGVSdWxlIChydWxlKSB7XG4gIHJldHVybiAhISB+WydhZnRlcicsICdiZWZvcmUnLCAnZGF0ZV9iZXR3ZWVuJywgJ2RhdGVfZm9ybWF0J10uaW5kZXhPZihydWxlKTtcbn07XG5cbi8qKlxuICogRm9ybWF0cyBhbiBlcnJvciBtZXNzYWdlIGZvciBmaWVsZCBhbmQgYSBydWxlLlxuICpcbiAqIEBwYXJhbXtGaWVsZH0gZmllbGQgVGhlIGZpZWxkIG9iamVjdC5cbiAqIEBwYXJhbXtvYmplY3R9IHJ1bGUgTm9ybWFsaXplZCBydWxlIG9iamVjdC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhIEFkZGl0aW9uYWwgSW5mb3JtYXRpb24gYWJvdXQgdGhlIHZhbGlkYXRpb24gcmVzdWx0LlxuICogQHJldHVybiB7c3RyaW5nfSBGb3JtYXR0ZWQgZXJyb3IgbWVzc2FnZS5cbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5fZm9ybWF0RXJyb3JNZXNzYWdlID0gZnVuY3Rpb24gX2Zvcm1hdEVycm9yTWVzc2FnZSAoZmllbGQsIHJ1bGUsIGRhdGEsIHRhcmdldE5hbWUpIHtcbiAgICBpZiAoIGRhdGEgPT09IHZvaWQgMCApIGRhdGEgPSB7fTtcbiAgICBpZiAoIHRhcmdldE5hbWUgPT09IHZvaWQgMCApIHRhcmdldE5hbWUgPSBudWxsO1xuXG4gIHZhciBuYW1lID0gdGhpcy5fZ2V0RmllbGREaXNwbGF5TmFtZShmaWVsZCk7XG4gIHZhciBwYXJhbXMgPSB0aGlzLl9nZXRMb2NhbGl6ZWRQYXJhbXMocnVsZSwgdGFyZ2V0TmFtZSk7XG4gIC8vIERlZmF1bHRzIHRvIGVuZ2xpc2ggbWVzc2FnZS5cbiAgaWYgKCF0aGlzLmRpY3Rpb25hcnkuaGFzTG9jYWxlKExPQ0FMRSkpIHtcbiAgICB2YXIgbXNnJDEgPSB0aGlzLmRpY3Rpb25hcnkuZ2V0RmllbGRNZXNzYWdlKCdlbicsIGZpZWxkLm5hbWUsIHJ1bGUubmFtZSk7XG5cbiAgICByZXR1cm4gaXNDYWxsYWJsZShtc2ckMSkgPyBtc2ckMShuYW1lLCBwYXJhbXMsIGRhdGEpIDogbXNnJDE7XG4gIH1cblxuICB2YXIgbXNnID0gdGhpcy5kaWN0aW9uYXJ5LmdldEZpZWxkTWVzc2FnZShMT0NBTEUsIGZpZWxkLm5hbWUsIHJ1bGUubmFtZSk7XG5cbiAgcmV0dXJuIGlzQ2FsbGFibGUobXNnKSA/IG1zZyhuYW1lLCBwYXJhbXMsIGRhdGEpIDogbXNnO1xufTtcblxuLyoqXG4gKiBUcmFuc2xhdGVzIHRoZSBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGUgcnVsZSAobWFpbmx5IGZvciB0YXJnZXQgZmllbGRzKS5cbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5fZ2V0TG9jYWxpemVkUGFyYW1zID0gZnVuY3Rpb24gX2dldExvY2FsaXplZFBhcmFtcyAocnVsZSwgdGFyZ2V0TmFtZSkge1xuICAgIGlmICggdGFyZ2V0TmFtZSA9PT0gdm9pZCAwICkgdGFyZ2V0TmFtZSA9IG51bGw7XG5cbiAgaWYgKH5bJ2FmdGVyJywgJ2JlZm9yZScsICdjb25maXJtZWQnXS5pbmRleE9mKHJ1bGUubmFtZSkgJiYgcnVsZS5wYXJhbXMgJiYgcnVsZS5wYXJhbXNbMF0pIHtcbiAgICB2YXIgbG9jYWxpemVkTmFtZSA9IHRhcmdldE5hbWUgfHwgdGhpcy5kaWN0aW9uYXJ5LmdldEF0dHJpYnV0ZShMT0NBTEUsIHJ1bGUucGFyYW1zWzBdLCBydWxlLnBhcmFtc1swXSk7XG4gICAgcmV0dXJuIFtsb2NhbGl6ZWROYW1lXS5jb25jYXQocnVsZS5wYXJhbXMuc2xpY2UoMSkpO1xuICB9XG5cbiAgcmV0dXJuIHJ1bGUucGFyYW1zO1xufTtcblxuLyoqXG4gKiBSZXNvbHZlcyBhbiBhcHByb3BpYXRlIGRpc3BsYXkgbmFtZSwgZmlyc3QgY2hlY2tpbmcgJ2RhdGEtYXMnIG9yIHRoZSByZWdpc3RlcmVkICdwcmV0dHlOYW1lJ1xuICogVGhlbiB0aGUgZGljdGlvbmFyeSwgdGhlbiBmYWxsc2JhY2sgdG8gZmllbGQgbmFtZS5cbiAqIEBwYXJhbSB7RmllbGR9IGZpZWxkIFRoZSBmaWVsZCBvYmplY3QuXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBuYW1lIHRvIGJlIHVzZWQgaW4gdGhlIGVycm9ycy5cbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5fZ2V0RmllbGREaXNwbGF5TmFtZSA9IGZ1bmN0aW9uIF9nZXRGaWVsZERpc3BsYXlOYW1lIChmaWVsZCkge1xuICByZXR1cm4gZmllbGQuZGlzcGxheU5hbWUgfHwgdGhpcy5kaWN0aW9uYXJ5LmdldEF0dHJpYnV0ZShMT0NBTEUsIGZpZWxkLm5hbWUsIGZpZWxkLm5hbWUpO1xufTtcblxuLyoqXG4gKiBBZGRzIGEgZmllbGQgZmxhZ3MgdG8gdGhlIGZsYWdzIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd8bnVsbH0gc2NvcGVcbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5fYWRkRmxhZyA9IGZ1bmN0aW9uIF9hZGRGbGFnIChmaWVsZCwgc2NvcGUpIHtcbiAgICBpZiAoIHNjb3BlID09PSB2b2lkIDAgKSBzY29wZSA9IG51bGw7XG5cbiAgaWYgKGlzTnVsbE9yVW5kZWZpbmVkKHNjb3BlKSkge1xuICAgIHRoaXMuZmxhZ3MgPSBhc3NpZ24oe30sIHRoaXMuZmxhZ3MsICggb2JqID0ge30sIG9ialsoXCJcIiArIChmaWVsZC5uYW1lKSldID0gZmllbGQuZmxhZ3MsIG9iaiApKTtcbiAgICAgIHZhciBvYmo7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHNjb3BlT2JqID0gYXNzaWduKHt9LCB0aGlzLmZsYWdzWyhcIiRcIiArIHNjb3BlKV0gfHwge30sICggb2JqJDEgPSB7fSwgb2JqJDFbKFwiXCIgKyAoZmllbGQubmFtZSkpXSA9IGZpZWxkLmZsYWdzLCBvYmokMSApKTtcbiAgICB2YXIgb2JqJDE7XG4gIHRoaXMuZmxhZ3MgPSBhc3NpZ24oe30sIHRoaXMuZmxhZ3MsICggb2JqJDIgPSB7fSwgb2JqJDJbKFwiJFwiICsgc2NvcGUpXSA9IHNjb3BlT2JqLCBvYmokMiApKTtcbiAgICB2YXIgb2JqJDI7XG59O1xuXG4vKipcbiAqIFRlc3RzIGEgc2luZ2xlIGlucHV0IHZhbHVlIGFnYWluc3QgYSBydWxlLlxuICpcbiAqIEBwYXJhbXtGaWVsZH0gZmllbGQgVGhlIGZpZWxkIHVuZGVyIHZhbGlkYXRpb24uXG4gKiBAcGFyYW17Kn0gdmFsdWV0aGUgdmFsdWUgb2YgdGhlIGZpZWxkLlxuICogQHBhcmFte29iamVjdH0gcnVsZSB0aGUgcnVsZSBvYmplY3QuXG4gKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIGl0IHBhc3NlcyB0aGUgY2hlY2suXG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUuX3Rlc3QgPSBmdW5jdGlvbiBfdGVzdCAoZmllbGQsIHZhbHVlLCBydWxlLCBzaWxlbnQpIHtcbiAgICB2YXIgdGhpcyQxID0gdGhpcztcblxuICB2YXIgdmFsaWRhdG9yID0gUlVMRVNbcnVsZS5uYW1lXTtcbiAgdmFyIHBhcmFtcyA9IEFycmF5LmlzQXJyYXkocnVsZS5wYXJhbXMpID8gdG9BcnJheShydWxlLnBhcmFtcykgOiBbXTtcbiAgdmFyIHRhcmdldE5hbWUgPSBudWxsO1xuICBpZiAoIXZhbGlkYXRvciB8fCB0eXBlb2YgdmFsaWRhdG9yICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgY3JlYXRlRXJyb3IoKFwiTm8gc3VjaCB2YWxpZGF0b3IgJ1wiICsgKHJ1bGUubmFtZSkgKyBcIicgZXhpc3RzLlwiKSk7XG4gIH1cblxuICAvLyBoYXMgZmllbGQgZGVwZW5lbmNpZXNcbiAgaWYgKC8oY29uZmlybWVkfGFmdGVyfGJlZm9yZSkvLnRlc3QocnVsZS5uYW1lKSkge1xuICAgIHZhciB0YXJnZXQgPSBmaW5kKGZpZWxkLmRlcGVuZGVuY2llcywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQubmFtZSA9PT0gcnVsZS5uYW1lOyB9KTtcbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICB0YXJnZXROYW1lID0gdGFyZ2V0LmZpZWxkLmRpc3BsYXlOYW1lO1xuICAgICAgcGFyYW1zID0gW3RhcmdldC5maWVsZC52YWx1ZV0uY29uY2F0KHBhcmFtcy5zbGljZSgxKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHJ1bGUubmFtZSA9PT0gJ3JlcXVpcmVkJyAmJiBmaWVsZC5yZWplY3RzRmFsc2UpIHtcbiAgICAvLyBpbnZhbGlkYXRlIGZhbHNlIGlmIG5vIGFyZ3Mgd2VyZSBzcGVjaWZpZWQgYW5kIHRoZSBmaWVsZCByZWplY3RzIGZhbHNlIGJ5IGRlZmF1bHQuXG4gICAgcGFyYW1zID0gcGFyYW1zLmxlbmd0aCA/IHBhcmFtcyA6IFt0cnVlXTtcbiAgfVxuXG4gIGlmICh0aGlzLl9pc0FEYXRlUnVsZShydWxlLm5hbWUpKSB7XG4gICAgdmFyIGRhdGVGb3JtYXQgPSB0aGlzLl9nZXREYXRlRm9ybWF0KGZpZWxkLnJ1bGVzKTtcbiAgICBpZiAocnVsZS5uYW1lICE9PSAnZGF0ZV9mb3JtYXQnKSB7XG4gICAgICBwYXJhbXMucHVzaChkYXRlRm9ybWF0KTtcbiAgICB9XG4gIH1cblxuICB2YXIgcmVzdWx0ID0gdmFsaWRhdG9yKHZhbHVlLCBwYXJhbXMpO1xuXG4gIC8vIElmIGl0IGlzIGEgcHJvbWlzZS5cbiAgaWYgKGlzQ2FsbGFibGUocmVzdWx0LnRoZW4pKSB7XG4gICAgcmV0dXJuIHJlc3VsdC50aGVuKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICAgIHZhciBhbGxWYWxpZCA9IHRydWU7XG4gICAgICB2YXIgZGF0YSA9IHt9O1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWVzKSkge1xuICAgICAgICBhbGxWYWxpZCA9IHZhbHVlcy5ldmVyeShmdW5jdGlvbiAodCkgeyByZXR1cm4gKGlzT2JqZWN0KHQpID8gdC52YWxpZCA6IHQpOyB9KTtcbiAgICAgIH0gZWxzZSB7IC8vIElzIGEgc2luZ2xlIG9iamVjdC9ib29sZWFuLlxuICAgICAgICBhbGxWYWxpZCA9IGlzT2JqZWN0KHZhbHVlcykgPyB2YWx1ZXMudmFsaWQgOiB2YWx1ZXM7XG4gICAgICAgIGRhdGEgPSB2YWx1ZXMuZGF0YTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFhbGxWYWxpZCAmJiAhc2lsZW50KSB7XG4gICAgICAgIHRoaXMkMS5lcnJvcnMuYWRkKHtcbiAgICAgICAgICBpZDogZmllbGQuaWQsXG4gICAgICAgICAgZmllbGQ6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgbXNnOiB0aGlzJDEuX2Zvcm1hdEVycm9yTWVzc2FnZShmaWVsZCwgcnVsZSwgZGF0YSwgdGFyZ2V0TmFtZSksXG4gICAgICAgICAgcnVsZTogcnVsZS5uYW1lLFxuICAgICAgICAgIHNjb3BlOiBmaWVsZC5zY29wZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGFsbFZhbGlkO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKCFpc09iamVjdChyZXN1bHQpKSB7XG4gICAgcmVzdWx0ID0geyB2YWxpZDogcmVzdWx0LCBkYXRhOiB7fSB9O1xuICB9XG5cbiAgaWYgKCFyZXN1bHQudmFsaWQgJiYgIXNpbGVudCkge1xuICAgIHRoaXMuZXJyb3JzLmFkZCh7XG4gICAgICBpZDogZmllbGQuaWQsXG4gICAgICBmaWVsZDogZmllbGQubmFtZSxcbiAgICAgIG1zZzogdGhpcy5fZm9ybWF0RXJyb3JNZXNzYWdlKGZpZWxkLCBydWxlLCByZXN1bHQuZGF0YSwgdGFyZ2V0TmFtZSksXG4gICAgICBydWxlOiBydWxlLm5hbWUsXG4gICAgICBzY29wZTogZmllbGQuc2NvcGVcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQudmFsaWQ7XG59O1xuXG4vKipcbiAqIE1lcmdlcyBhIHZhbGlkYXRvciBvYmplY3QgaW50byB0aGUgUlVMRVMgYW5kIE1lc3NhZ2VzLlxuICpcbiAqIEBwYXJhbXtzdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHZhbGlkYXRvci5cbiAqIEBwYXJhbXtmdW5jdGlvbnxvYmplY3R9IHZhbGlkYXRvciBUaGUgdmFsaWRhdG9yIG9iamVjdC5cbiAqL1xuVmFsaWRhdG9yLl9tZXJnZSA9IGZ1bmN0aW9uIF9tZXJnZSAobmFtZSwgdmFsaWRhdG9yKSB7XG4gIGlmIChpc0NhbGxhYmxlKHZhbGlkYXRvcikpIHtcbiAgICBSVUxFU1tuYW1lXSA9IHZhbGlkYXRvcjtcbiAgICByZXR1cm47XG4gIH1cblxuICBSVUxFU1tuYW1lXSA9IHZhbGlkYXRvci52YWxpZGF0ZTtcbiAgaWYgKGlzQ2FsbGFibGUodmFsaWRhdG9yLmdldE1lc3NhZ2UpKSB7XG4gICAgRElDVElPTkFSWS5zZXRNZXNzYWdlKExPQ0FMRSwgbmFtZSwgdmFsaWRhdG9yLmdldE1lc3NhZ2UpO1xuICB9XG5cbiAgaWYgKHZhbGlkYXRvci5tZXNzYWdlcykge1xuICAgIERJQ1RJT05BUlkubWVyZ2UoXG4gICAgICBPYmplY3Qua2V5cyh2YWxpZGF0b3IubWVzc2FnZXMpLnJlZHVjZShmdW5jdGlvbiAocHJldiwgY3Vycikge1xuICAgICAgICB2YXIgZGljdCA9IHByZXY7XG4gICAgICAgIGRpY3RbY3Vycl0gPSB7XG4gICAgICAgICAgbWVzc2FnZXM6ICggb2JqID0ge30sIG9ialtuYW1lXSA9IHZhbGlkYXRvci5tZXNzYWdlc1tjdXJyXSwgb2JqIClcbiAgICAgICAgfTtcbiAgICAgICAgICB2YXIgb2JqO1xuXG4gICAgICAgIHJldHVybiBkaWN0O1xuICAgICAgfSwge30pXG4gICAgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBHdWFyZHMgZnJvbSBleHRuc2lvbiB2aW9sYXRpb25zLlxuICpcbiAqIEBwYXJhbXtzdHJpbmd9IG5hbWUgbmFtZSBvZiB0aGUgdmFsaWRhdGlvbiBydWxlLlxuICogQHBhcmFte29iamVjdH0gdmFsaWRhdG9yIGEgdmFsaWRhdGlvbiBydWxlIG9iamVjdC5cbiAqL1xuVmFsaWRhdG9yLl9ndWFyZEV4dGVuZCA9IGZ1bmN0aW9uIF9ndWFyZEV4dGVuZCAobmFtZSwgdmFsaWRhdG9yKSB7XG4gIGlmIChpc0NhbGxhYmxlKHZhbGlkYXRvcikpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIWlzQ2FsbGFibGUodmFsaWRhdG9yLnZhbGlkYXRlKSkge1xuICAgIHRocm93IGNyZWF0ZUVycm9yKFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAoXCJFeHRlbnNpb24gRXJyb3I6IFRoZSB2YWxpZGF0b3IgJ1wiICsgbmFtZSArIFwiJyBtdXN0IGJlIGEgZnVuY3Rpb24gb3IgaGF2ZSBhICd2YWxpZGF0ZScgbWV0aG9kLlwiKVxuICAgICk7XG4gIH1cblxuICBpZiAoIWlzQ2FsbGFibGUodmFsaWRhdG9yLmdldE1lc3NhZ2UpICYmICFpc09iamVjdCh2YWxpZGF0b3IubWVzc2FnZXMpKSB7XG4gICAgdGhyb3cgY3JlYXRlRXJyb3IoXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIChcIkV4dGVuc2lvbiBFcnJvcjogVGhlIHZhbGlkYXRvciAnXCIgKyBuYW1lICsgXCInIG11c3QgaGF2ZSBhICdnZXRNZXNzYWdlJyBtZXRob2Qgb3IgaGF2ZSBhICdtZXNzYWdlcycgb2JqZWN0LlwiKVxuICAgICk7XG4gIH1cbn07XG5cbi8qKlxuICogVHJpZXMgZGlmZmVyZW50IHN0cmF0ZWdpZXMgdG8gZmluZCBhIGZpZWxkLlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzY29wZVxuICogQHJldHVybiB7RmllbGR9XG4gKi9cblZhbGlkYXRvci5wcm90b3R5cGUuX3Jlc29sdmVGaWVsZCA9IGZ1bmN0aW9uIF9yZXNvbHZlRmllbGQgKG5hbWUsIHNjb3BlKSB7XG4gIGlmICghaXNOdWxsT3JVbmRlZmluZWQoc2NvcGUpKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRzLmZpbmQoeyBuYW1lOiBuYW1lLCBzY29wZTogc2NvcGUgfSk7XG4gIH1cblxuICBpZiAobmFtZVswXSA9PT0gJyMnKSB7XG4gICAgcmV0dXJuIHRoaXMuZmllbGRzLmZpbmQoeyBpZDogbmFtZS5zbGljZSgxKSB9KTtcbiAgfVxuXG4gIGlmIChuYW1lLmluZGV4T2YoJy4nKSA+IC0xKSB7XG4gICAgdmFyIHJlZiA9IG5hbWUuc3BsaXQoJy4nKTtcbiAgICAgIHZhciBmaWVsZFNjb3BlID0gcmVmWzBdO1xuICAgICAgdmFyIGZpZWxkTmFtZSA9IHJlZi5zbGljZSgxKTtcbiAgICB2YXIgZmllbGQgPSB0aGlzLmZpZWxkcy5maW5kKHsgbmFtZTogZmllbGROYW1lLmpvaW4oJy4nKSwgc2NvcGU6IGZpZWxkU2NvcGUgfSk7XG4gICAgaWYgKGZpZWxkKSB7XG4gICAgICByZXR1cm4gZmllbGQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXMuZmllbGRzLmZpbmQoeyBuYW1lOiBuYW1lLCBzY29wZTogbnVsbCB9KTtcbn07XG5cbi8qKlxuICogSGFuZGxlcyB3aGVuIGEgZmllbGQgaXMgbm90IGZvdW5kIGRlcGVuZGluZyBvbiB0aGUgc3RyaWN0IGZsYWcuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzY29wZVxuICovXG5WYWxpZGF0b3IucHJvdG90eXBlLl9oYW5kbGVGaWVsZE5vdEZvdW5kID0gZnVuY3Rpb24gX2hhbmRsZUZpZWxkTm90Rm91bmQgKG5hbWUsIHNjb3BlKSB7XG4gIGlmICghdGhpcy5zdHJpY3QpIHsgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0cnVlKTsgfVxuXG4gIHZhciBmdWxsTmFtZSA9IGlzTnVsbE9yVW5kZWZpbmVkKHNjb3BlKSA/IG5hbWUgOiAoXCJcIiArICghaXNOdWxsT3JVbmRlZmluZWQoc2NvcGUpID8gc2NvcGUgKyAnLicgOiAnJykgKyBuYW1lKTtcbiAgdGhyb3cgY3JlYXRlRXJyb3IoXG4gICAgKFwiVmFsaWRhdGluZyBhIG5vbi1leGlzdGFudCBmaWVsZDogXFxcIlwiICsgZnVsbE5hbWUgKyBcIlxcXCIuIFVzZSBcXFwiYXR0YWNoKClcXFwiIGZpcnN0LlwiKVxuICApO1xufTtcblxuLyoqXG4gKiBTdGFydHMgdGhlIHZhbGlkYXRpb24gcHJvY2Vzcy5cbiAqXG4gKiBAcGFyYW0ge0ZpZWxkfSBmaWVsZFxuICogQHBhcmFtIHtQcm9taXNlfSB2YWx1ZVxuICogQHBhcmFtIHtCb29sZWFufSBzaWxlbnRcbiAqL1xuVmFsaWRhdG9yLnByb3RvdHlwZS5fdmFsaWRhdGUgPSBmdW5jdGlvbiBfdmFsaWRhdGUgKGZpZWxkLCB2YWx1ZSwgc2lsZW50KSB7XG4gICAgdmFyIHRoaXMkMSA9IHRoaXM7XG4gICAgaWYgKCBzaWxlbnQgPT09IHZvaWQgMCApIHNpbGVudCA9IGZhbHNlO1xuXG4gIGlmICghZmllbGQuaXNSZXF1aXJlZCAmJiAoaXNOdWxsT3JVbmRlZmluZWQodmFsdWUpIHx8IHZhbHVlID09PSAnJykpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICB9XG5cbiAgdmFyIHByb21pc2VzID0gW107XG4gIHZhciBpc0V4aXRFYXJseSA9IGZhbHNlO1xuICAvLyB1c2Ugb2YgJy5zb21lKCknIGlzIHRvIGJyZWFrIGl0ZXJhdGlvbiBpbiBtaWRkbGUgYnkgcmV0dXJuaW5nIHRydWVcbiAgT2JqZWN0LmtleXMoZmllbGQucnVsZXMpLnNvbWUoZnVuY3Rpb24gKHJ1bGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gdGhpcyQxLl90ZXN0KGZpZWxkLCB2YWx1ZSwgeyBuYW1lOiBydWxlLCBwYXJhbXM6IGZpZWxkLnJ1bGVzW3J1bGVdIH0sIHNpbGVudCk7XG5cbiAgICBpZiAoaXNDYWxsYWJsZShyZXN1bHQudGhlbikpIHtcbiAgICAgIHByb21pc2VzLnB1c2gocmVzdWx0KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMkMS5mYXN0RXhpdCAmJiAhcmVzdWx0KSB7XG4gICAgICBpc0V4aXRFYXJseSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciByZXN1bHRBc1Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICB9KTtcbiAgICAgIHByb21pc2VzLnB1c2gocmVzdWx0QXNQcm9taXNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNFeGl0RWFybHk7XG4gIH0pO1xuXG4gIGlmIChpc0V4aXRFYXJseSkgeyByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGZhbHNlKTsgfVxuXG4gIHJldHVybiBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbiAodmFsdWVzKSB7IHJldHVybiB2YWx1ZXMuZXZlcnkoZnVuY3Rpb24gKHQpIHsgcmV0dXJuIHQ7IH0pOyB9KTtcbn07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBWYWxpZGF0b3IucHJvdG90eXBlLCBwcm90b3R5cGVBY2Nlc3NvcnMgKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBWYWxpZGF0b3IsIHN0YXRpY0FjY2Vzc29ycyApO1xuXG52YXIgZmFrZUZsYWdzID0gY3JlYXRlUHJveHkoe30sIHtcbiAgZ2V0OiBmdW5jdGlvbiBnZXQgKHRhcmdldCwga2V5KSB7XG4gICAgLy8gaXMgYSBzY29wZVxuICAgIGlmIChTdHJpbmcoa2V5KS5pbmRleE9mKCckJykgPT09IDApIHtcbiAgICAgIHJldHVybiBmYWtlRmxhZ3M7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNyZWF0ZUZsYWdzKCk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIHBhcmVudCB2YWxpZGF0b3IgaW5zdGFuY2Ugd2FzIHJlcXVlc3RlZC5cbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBpbmplY3Rpb25zXG4gKi9cbnZhciByZXF1ZXN0c1ZhbGlkYXRvciA9IGZ1bmN0aW9uIChpbmplY3Rpb25zKSB7XG4gIGlmICghIGluamVjdGlvbnMpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICBpZiAoQXJyYXkuaXNBcnJheShpbmplY3Rpb25zKSAmJiB+aW5qZWN0aW9ucy5pbmRleE9mKCckdmFsaWRhdG9yJykpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChpbmplY3Rpb25zKSAmJiBpbmplY3Rpb25zLiR2YWxpZGF0b3IpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIHZhbGlkYXRvciBpbnN0YW5jZS5cbiAqIEBwYXJhbSB7VnVlfSB2bVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqL1xudmFyIGNyZWF0ZVZhbGlkYXRvciA9IGZ1bmN0aW9uICh2bSwgb3B0aW9ucykgeyByZXR1cm4gbmV3IFZhbGlkYXRvcihudWxsLCB7IHZtOiB2bSwgZmFzdEV4aXQ6IG9wdGlvbnMuZmFzdEV4aXQgfSk7IH07XG5cbnZhciBtYWtlTWl4aW4gPSBmdW5jdGlvbiAoVnVlLCBvcHRpb25zKSB7XG4gIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gIHZhciBtaXhpbiA9IHt9O1xuICBtaXhpbi5wcm92aWRlID0gZnVuY3Rpb24gcHJvdmlkZXNWYWxpZGF0b3IgKCkge1xuICAgIGlmICh0aGlzLiR2YWxpZGF0b3IpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgICR2YWxpZGF0b3I6IHRoaXMuJHZhbGlkYXRvclxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge307XG4gIH07XG5cbiAgbWl4aW4uYmVmb3JlQ3JlYXRlID0gZnVuY3Rpb24gYmVmb3JlQ3JlYXRlICgpIHtcbiAgICAvLyBUT0RPOiBEZXByZWNhdGVcbiAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAqL1xuICAgIGlmICh0aGlzLiRvcHRpb25zLiR2YWxpZGF0ZXMpIHtcbiAgICAgIHdhcm4oJ1RoZSBjdG9yICR2YWxpZGF0ZXMgb3B0aW9uIGhhcyBiZWVuIGRlcHJlY2F0ZWQgcGxlYXNlIHNldCB0aGUgJF92ZWVWYWxpZGF0ZS52YWxpZGF0b3Igb3B0aW9uIHRvIFwibmV3XCIgaW5zdGVhZCcpO1xuICAgICAgdGhpcy4kdmFsaWRhdG9yID0gY3JlYXRlVmFsaWRhdG9yKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGlmIGl0cyBhIHJvb3QgaW5zdGFuY2UsIGluamVjdCBhbnl3YXlzLCBvciBpZiBpdCByZXF1ZXN0ZWQgYSBuZXcgaW5zdGFuY2UuXG4gICAgaWYgKCF0aGlzLiRwYXJlbnQgfHwgKHRoaXMuJG9wdGlvbnMuJF92ZWVWYWxpZGF0ZSAmJiAvbmV3Ly50ZXN0KHRoaXMuJG9wdGlvbnMuJF92ZWVWYWxpZGF0ZS52YWxpZGF0b3IpKSkge1xuICAgICAgdGhpcy4kdmFsaWRhdG9yID0gY3JlYXRlVmFsaWRhdG9yKHRoaXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHZhciByZXF1ZXN0ZWQgPSByZXF1ZXN0c1ZhbGlkYXRvcih0aGlzLiRvcHRpb25zLmluamVjdCk7XG5cbiAgICAvLyBpZiBhdXRvbWF0aWMgaW5qZWN0aW9uIGlzIGVuYWJsZWQgYW5kIG5vIGluc3RhbmNlIHdhcyByZXF1ZXN0ZWQuXG4gICAgaWYgKCEgdGhpcy4kdmFsaWRhdG9yICYmIG9wdGlvbnMuaW5qZWN0ICYmICFyZXF1ZXN0ZWQpIHtcbiAgICAgIHRoaXMuJHZhbGlkYXRvciA9IGNyZWF0ZVZhbGlkYXRvcih0aGlzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICAvLyBkb24ndCBpbmplY3QgZXJyb3JzIG9yIGZpZWxkQmFnIGFzIG5vIHZhbGlkYXRvciB3YXMgcmVzb2x2ZWQuXG4gICAgaWYgKCEgcmVxdWVzdGVkICYmICEgdGhpcy4kdmFsaWRhdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVGhlcmUgaXMgYSB2YWxpZGF0b3IgYnV0IGl0IGlzbid0IGluamVjdGVkLCBtYXJrIGFzIHJlYWN0aXZlLlxuICAgIGlmICghIHJlcXVlc3RlZCAmJiB0aGlzLiR2YWxpZGF0b3IpIHtcbiAgICAgIFZ1ZS51dGlsLmRlZmluZVJlYWN0aXZlKHRoaXMuJHZhbGlkYXRvciwgJ2Vycm9ycycsIHRoaXMuJHZhbGlkYXRvci5lcnJvcnMpO1xuICAgICAgVnVlLnV0aWwuZGVmaW5lUmVhY3RpdmUodGhpcy4kdmFsaWRhdG9yLCAnZmxhZ3MnLCB0aGlzLiR2YWxpZGF0b3IuZmxhZ3MpO1xuICAgIH1cblxuICAgIGlmICghIHRoaXMuJG9wdGlvbnMuY29tcHV0ZWQpIHtcbiAgICAgIHRoaXMuJG9wdGlvbnMuY29tcHV0ZWQgPSB7fTtcbiAgICB9XG5cbiAgICB0aGlzLiRvcHRpb25zLmNvbXB1dGVkW29wdGlvbnMuZXJyb3JCYWdOYW1lIHx8ICdlcnJvcnMnXSA9IGZ1bmN0aW9uIGVycm9yQmFnR2V0dGVyICgpIHtcbiAgICAgIHJldHVybiB0aGlzLiR2YWxpZGF0b3IuZXJyb3JzO1xuICAgIH07XG4gICAgdGhpcy4kb3B0aW9ucy5jb21wdXRlZFtvcHRpb25zLmZpZWxkc0JhZ05hbWUgfHwgJ2ZpZWxkcyddID0gZnVuY3Rpb24gZmllbGRCYWdHZXR0ZXIgKCkge1xuICAgICAgaWYgKCFPYmplY3Qua2V5cyh0aGlzLiR2YWxpZGF0b3IuZmxhZ3MpLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFrZUZsYWdzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy4kdmFsaWRhdG9yLmZsYWdzO1xuICAgIH07XG4gIH07XG5cbiAgbWl4aW4uYmVmb3JlRGVzdHJveSA9IGZ1bmN0aW9uIGJlZm9yZURlc3Ryb3kgKCkge1xuICAgIC8vIG1hcmsgdGhlIHZhbGlkYXRvciBwYXVzZWQgdG8gcHJldmVudCBkZWxheWVkIHZhbGlkYXRpb24uXG4gICAgaWYgKHRoaXMuJHZhbGlkYXRvciAmJiB0aGlzLiR2YWxpZGF0b3Iub3duZXJJZCA9PT0gdGhpcy5fdWlkICYmIGlzQ2FsbGFibGUodGhpcy4kdmFsaWRhdG9yLnBhdXNlKSkge1xuICAgICAgdGhpcy4kdmFsaWRhdG9yLnBhdXNlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBtaXhpbjtcbn07XG5cbnZhciBjb25maWcgPSB7XG4gIGxvY2FsZTogJ2VuJyxcbiAgZGVsYXk6IDAsXG4gIGVycm9yQmFnTmFtZTogJ2Vycm9ycycsXG4gIGRpY3Rpb25hcnk6IG51bGwsXG4gIHN0cmljdDogdHJ1ZSxcbiAgZmllbGRzQmFnTmFtZTogJ2ZpZWxkcycsXG4gIGNsYXNzZXM6IGZhbHNlLFxuICBjbGFzc05hbWVzOiB1bmRlZmluZWQsXG4gIGV2ZW50czogJ2lucHV0fGJsdXInLFxuICBpbmplY3Q6IHRydWUsXG4gIGZhc3RFeGl0OiB0cnVlLFxuICBhcmlhOiB0cnVlLFxuICB2YWxpZGl0eTogZmFsc2Vcbn07XG5cbi8qKlxuICogXG4gKiBcbiAqIEZpbmRzIHRoZSByZXF1ZXN0ZWQgZmllbGQgYnkgaWQgZnJvbSB0aGUgY29udGV4dCBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybiB7RmllbGR8bnVsbH1cbiAqL1xudmFyIGZpbmRGaWVsZCA9IGZ1bmN0aW9uIChlbCwgY29udGV4dCkge1xuICBpZiAoIWNvbnRleHQgfHwgIWNvbnRleHQuJHZhbGlkYXRvcikge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIGNvbnRleHQuJHZhbGlkYXRvci5maWVsZHMuZmluZCh7IGlkOiBnZXREYXRhQXR0cmlidXRlKGVsLCAnaWQnKSB9KTtcbn07XG5cbnZhciBjcmVhdGVEaXJlY3RpdmUkMSA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBhc3NpZ24oe30sIGNvbmZpZywgb3B0aW9ucyk7XG5cbiAgcmV0dXJuIHtcbiAgICBiaW5kOiBmdW5jdGlvbiBiaW5kIChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICAgIHZhciB2YWxpZGF0b3IgPSB2bm9kZS5jb250ZXh0LiR2YWxpZGF0b3I7XG4gICAgICBpZiAoISB2YWxpZGF0b3IpIHtcbiAgICAgICAgd2FybihcIk5vIHZhbGlkYXRvciBpbnN0YW5jZSBpcyBwcmVzZW50IG9uIHZtLCBkaWQgeW91IGZvcmdldCB0byBpbmplY3QgJyR2YWxpZGF0b3InP1wiKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGZpZWxkT3B0aW9ucyA9IEdlbmVyYXRvci5nZW5lcmF0ZShlbCwgYmluZGluZywgdm5vZGUsIG9wdGlvbnMpO1xuICAgICAgdmFsaWRhdG9yLmF0dGFjaChmaWVsZE9wdGlvbnMpO1xuICAgIH0sXG4gICAgaW5zZXJ0ZWQ6IGZ1bmN0aW9uIChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICAgIHZhciBmaWVsZCA9IGZpbmRGaWVsZChlbCwgdm5vZGUuY29udGV4dCk7XG4gICAgICB2YXIgc2NvcGUgPSBHZW5lcmF0b3IucmVzb2x2ZVNjb3BlKGVsLCBiaW5kaW5nLCB2bm9kZSk7XG5cbiAgICAgIC8vIHNraXAgaWYgc2NvcGUgaGFzbid0IGNoYW5nZWQuXG4gICAgICBpZiAoIWZpZWxkIHx8IHNjb3BlID09PSBmaWVsZC5zY29wZSkgeyByZXR1cm47IH1cblxuICAgICAgLy8gb25seSB1cGRhdGUgc2NvcGUuXG4gICAgICBmaWVsZC51cGRhdGUoeyBzY29wZTogc2NvcGUgfSk7XG5cbiAgICAgIC8vIGFsbG93cyB0aGUgZmllbGQgdG8gcmUtZXZhbHVhdGVkIG9uY2UgbW9yZSBpbiB0aGUgdXBkYXRlIGhvb2suXG4gICAgICBmaWVsZC51cGRhdGVkID0gZmFsc2U7XG4gICAgfSxcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIChlbCwgYmluZGluZywgdm5vZGUpIHtcbiAgICAgIHZhciBmaWVsZCA9IGZpbmRGaWVsZChlbCwgdm5vZGUuY29udGV4dCk7XG5cbiAgICAgIC8vIG1ha2Ugc3VyZSB3ZSBkb24ndCBkbyB1bmVjY2Vzc2FyeSB3b3JrIGlmIG5vIGltcG9ydGFudCBjaGFuZ2Ugd2FzIGRvbmUuXG4gICAgICBpZiAoIWZpZWxkIHx8IChmaWVsZC51cGRhdGVkICYmIGlzRXF1YWwoYmluZGluZy52YWx1ZSwgYmluZGluZy5vbGRWYWx1ZSkpKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHNjb3BlID0gR2VuZXJhdG9yLnJlc29sdmVTY29wZShlbCwgYmluZGluZywgdm5vZGUpO1xuICAgICAgdmFyIHJ1bGVzID0gR2VuZXJhdG9yLnJlc29sdmVSdWxlcyhlbCwgYmluZGluZyk7XG5cbiAgICAgIGZpZWxkLnVwZGF0ZSh7XG4gICAgICAgIHNjb3BlOiBzY29wZSxcbiAgICAgICAgcnVsZXM6IHJ1bGVzXG4gICAgICB9KTtcbiAgICB9LFxuICAgIHVuYmluZDogZnVuY3Rpb24gdW5iaW5kIChlbCwgYmluZGluZywgcmVmKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHJlZi5jb250ZXh0O1xuXG4gICAgICB2YXIgZmllbGQgPSBmaW5kRmllbGQoZWwsIGNvbnRleHQpO1xuICAgICAgaWYgKCFmaWVsZCkgeyByZXR1cm47IH1cblxuICAgICAgY29udGV4dC4kdmFsaWRhdG9yLmRldGFjaChmaWVsZCk7XG4gICAgfVxuICB9O1xufTtcblxudmFyIFZ1ZTtcblxuZnVuY3Rpb24gaW5zdGFsbCAoX1Z1ZSwgb3B0aW9ucykge1xuICBpZiAoIG9wdGlvbnMgPT09IHZvaWQgMCApIG9wdGlvbnMgPSB7fTtcblxuICBpZiAoVnVlKSB7XG4gICAgd2FybignYWxyZWFkeSBpbnN0YWxsZWQsIFZ1ZS51c2UoVmVlVmFsaWRhdGUpIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBvbmNlLicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIFZ1ZSA9IF9WdWU7XG4gIHZhciBjb25maWckJDEgPSBhc3NpZ24oe30sIGNvbmZpZywgb3B0aW9ucyk7XG4gIGlmIChjb25maWckJDEuZGljdGlvbmFyeSkge1xuICAgIFZhbGlkYXRvci51cGRhdGVEaWN0aW9uYXJ5KGNvbmZpZyQkMS5kaWN0aW9uYXJ5KTtcbiAgfVxuXG4gIGlmIChvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMubG9jYWxlKSB7XG4gICAgICBWYWxpZGF0b3IubG9jYWxlID0gb3B0aW9ucy5sb2NhbGU7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICBWYWxpZGF0b3Iuc2V0U3RyaWN0TW9kZShjb25maWckJDEuc3RyaWN0KTtcbiAgICB9XG4gIH1cblxuICBWdWUubWl4aW4obWFrZU1peGluKFZ1ZSwgY29uZmlnJCQxKSk7XG4gIFZ1ZS5kaXJlY3RpdmUoJ3ZhbGlkYXRlJywgY3JlYXRlRGlyZWN0aXZlJDEoY29uZmlnJCQxKSk7XG59XG5cbi8qKlxuICogRm9ybWF0ZXMgZmlsZSBzaXplLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gc2l6ZVxuICovXG52YXIgZm9ybWF0RmlsZVNpemUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICB2YXIgdW5pdHMgPSBbJ0J5dGUnLCAnS0InLCAnTUInLCAnR0InLCAnVEInLCAnUEInLCAnRUInLCAnWkInLCAnWUInXTtcbiAgdmFyIHRocmVzaG9sZCA9IDEwMjQ7XG4gIHNpemUgPSBOdW1iZXIoc2l6ZSkgKiB0aHJlc2hvbGQ7XG4gIHZhciBpID0gc2l6ZSA9PT0gMCA/IDAgOiBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5sb2codGhyZXNob2xkKSk7XG4gIHJldHVybiAoKChzaXplIC8gTWF0aC5wb3codGhyZXNob2xkLCBpKSkudG9GaXhlZCgyKSAqIDEpICsgXCIgXCIgKyAodW5pdHNbaV0pKTtcbn07XG5cbi8qKlxuICogQ2hlY2tzIGlmIHZlZS12YWxpZGF0ZSBpcyBkZWZpbmVkIGdsb2JhbGx5LlxuICovXG52YXIgaXNEZWZpbmVkR2xvYmFsbHkgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0eXBlb2YgVmVlVmFsaWRhdGUgIT09ICd1bmRlZmluZWQnO1xufTtcblxudmFyIG1lc3NhZ2VzID0ge1xuICBfZGVmYXVsdDogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIHZhbHVlIGlzIG5vdCB2YWxpZC5cIik7IH0sXG4gIGFmdGVyOiBmdW5jdGlvbiAoZmllbGQsIHJlZikge1xuICAgIHZhciB0YXJnZXQgPSByZWZbMF07XG4gICAgdmFyIGluY2x1c2lvbiA9IHJlZlsxXTtcblxuICAgIHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIG11c3QgYmUgYWZ0ZXIgXCIgKyAoaW5jbHVzaW9uID8gJ29yIGVxdWFsIHRvICcgOiAnJykgKyB0YXJnZXQgKyBcIi5cIik7XG59LFxuICBhbHBoYV9kYXNoOiBmdW5jdGlvbiAoZmllbGQpIHsgcmV0dXJuIChcIlRoZSBcIiArIGZpZWxkICsgXCIgZmllbGQgbWF5IGNvbnRhaW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXJzIGFzIHdlbGwgYXMgZGFzaGVzIGFuZCB1bmRlcnNjb3Jlcy5cIik7IH0sXG4gIGFscGhhX251bTogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIG1heSBvbmx5IGNvbnRhaW4gYWxwaGEtbnVtZXJpYyBjaGFyYWN0ZXJzLlwiKTsgfSxcbiAgYWxwaGFfc3BhY2VzOiBmdW5jdGlvbiAoZmllbGQpIHsgcmV0dXJuIChcIlRoZSBcIiArIGZpZWxkICsgXCIgZmllbGQgbWF5IG9ubHkgY29udGFpbiBhbHBoYWJldGljIGNoYXJhY3RlcnMgYXMgd2VsbCBhcyBzcGFjZXMuXCIpOyB9LFxuICBhbHBoYTogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIG1heSBvbmx5IGNvbnRhaW4gYWxwaGFiZXRpYyBjaGFyYWN0ZXJzLlwiKTsgfSxcbiAgYmVmb3JlOiBmdW5jdGlvbiAoZmllbGQsIHJlZikge1xuICAgIHZhciB0YXJnZXQgPSByZWZbMF07XG4gICAgdmFyIGluY2x1c2lvbiA9IHJlZlsxXTtcblxuICAgIHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIG11c3QgYmUgYmVmb3JlIFwiICsgKGluY2x1c2lvbiA/ICdvciBlcXVhbCB0byAnIDogJycpICsgdGFyZ2V0ICsgXCIuXCIpO1xufSxcbiAgYmV0d2VlbjogZnVuY3Rpb24gKGZpZWxkLCByZWYpIHtcbiAgICB2YXIgbWluID0gcmVmWzBdO1xuICAgIHZhciBtYXggPSByZWZbMV07XG5cbiAgICByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBtdXN0IGJlIGJldHdlZW4gXCIgKyBtaW4gKyBcIiBhbmQgXCIgKyBtYXggKyBcIi5cIik7XG59LFxuICBjb25maXJtZWQ6IGZ1bmN0aW9uIChmaWVsZCkgeyByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBjb25maXJtYXRpb24gZG9lcyBub3QgbWF0Y2guXCIpOyB9LFxuICBjcmVkaXRfY2FyZDogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIGlzIGludmFsaWQuXCIpOyB9LFxuICBkYXRlX2JldHdlZW46IGZ1bmN0aW9uIChmaWVsZCwgcmVmKSB7XG4gICAgdmFyIG1pbiA9IHJlZlswXTtcbiAgICB2YXIgbWF4ID0gcmVmWzFdO1xuXG4gICAgcmV0dXJuIChcIlRoZSBcIiArIGZpZWxkICsgXCIgbXVzdCBiZSBiZXR3ZWVuIFwiICsgbWluICsgXCIgYW5kIFwiICsgbWF4ICsgXCIuXCIpO1xufSxcbiAgZGF0ZV9mb3JtYXQ6IGZ1bmN0aW9uIChmaWVsZCwgcmVmKSB7XG4gICAgdmFyIGZvcm1hdCA9IHJlZlswXTtcblxuICAgIHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIG11c3QgYmUgaW4gdGhlIGZvcm1hdCBcIiArIGZvcm1hdCArIFwiLlwiKTtcbn0sXG4gIGRlY2ltYWw6IGZ1bmN0aW9uIChmaWVsZCwgcmVmKSB7XG4gICAgaWYgKCByZWYgPT09IHZvaWQgMCApIHJlZiA9IFsnKiddO1xuICAgIHZhciBkZWNpbWFscyA9IHJlZlswXTtcblxuICAgIHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIG11c3QgYmUgbnVtZXJpYyBhbmQgbWF5IGNvbnRhaW4gXCIgKyAoIWRlY2ltYWxzIHx8IGRlY2ltYWxzID09PSAnKicgPyAnJyA6IGRlY2ltYWxzKSArIFwiIGRlY2ltYWwgcG9pbnRzLlwiKTtcbn0sXG4gIGRpZ2l0czogZnVuY3Rpb24gKGZpZWxkLCByZWYpIHtcbiAgICB2YXIgbGVuZ3RoID0gcmVmWzBdO1xuXG4gICAgcmV0dXJuIChcIlRoZSBcIiArIGZpZWxkICsgXCIgZmllbGQgbXVzdCBiZSBudW1lcmljIGFuZCBleGFjdGx5IGNvbnRhaW4gXCIgKyBsZW5ndGggKyBcIiBkaWdpdHMuXCIpO1xufSxcbiAgZGltZW5zaW9uczogZnVuY3Rpb24gKGZpZWxkLCByZWYpIHtcbiAgICB2YXIgd2lkdGggPSByZWZbMF07XG4gICAgdmFyIGhlaWdodCA9IHJlZlsxXTtcblxuICAgIHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIG11c3QgYmUgXCIgKyB3aWR0aCArIFwiIHBpeGVscyBieSBcIiArIGhlaWdodCArIFwiIHBpeGVscy5cIik7XG59LFxuICBlbWFpbDogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIG11c3QgYmUgYSB2YWxpZCBlbWFpbC5cIik7IH0sXG4gIGV4dDogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIG11c3QgYmUgYSB2YWxpZCBmaWxlLlwiKTsgfSxcbiAgaW1hZ2U6IGZ1bmN0aW9uIChmaWVsZCkgeyByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBtdXN0IGJlIGFuIGltYWdlLlwiKTsgfSxcbiAgaW46IGZ1bmN0aW9uIChmaWVsZCkgeyByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBtdXN0IGJlIGEgdmFsaWQgdmFsdWUuXCIpOyB9LFxuICBpbnRlZ2VyOiBmdW5jdGlvbiAoZmllbGQpIHsgcmV0dXJuIChcIlRoZSBcIiArIGZpZWxkICsgXCIgZmllbGQgbXVzdCBiZSBhbiBpbnRlZ2VyLlwiKTsgfSxcbiAgaXA6IGZ1bmN0aW9uIChmaWVsZCkgeyByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBtdXN0IGJlIGEgdmFsaWQgaXAgYWRkcmVzcy5cIik7IH0sXG4gIGxlbmd0aDogZnVuY3Rpb24gKGZpZWxkLCByZWYpIHtcbiAgICB2YXIgbGVuZ3RoID0gcmVmWzBdO1xuICAgIHZhciBtYXggPSByZWZbMV07XG5cbiAgICBpZiAobWF4KSB7XG4gICAgICByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBsZW5ndGggYmUgYmV0d2VlbiBcIiArIGxlbmd0aCArIFwiIGFuZCBcIiArIG1heCArIFwiLlwiKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBsZW5ndGggbXVzdCBiZSBcIiArIGxlbmd0aCArIFwiLlwiKTtcbiAgfSxcbiAgbWF4OiBmdW5jdGlvbiAoZmllbGQsIHJlZikge1xuICAgIHZhciBsZW5ndGggPSByZWZbMF07XG5cbiAgICByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBtYXkgbm90IGJlIGdyZWF0ZXIgdGhhbiBcIiArIGxlbmd0aCArIFwiIGNoYXJhY3RlcnMuXCIpO1xufSxcbiAgbWF4X3ZhbHVlOiBmdW5jdGlvbiAoZmllbGQsIHJlZikge1xuICAgIHZhciBtYXggPSByZWZbMF07XG5cbiAgICByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBtdXN0IGJlIFwiICsgbWF4ICsgXCIgb3IgbGVzcy5cIik7XG59LFxuICBtaW1lczogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIG11c3QgaGF2ZSBhIHZhbGlkIGZpbGUgdHlwZS5cIik7IH0sXG4gIG1pbjogZnVuY3Rpb24gKGZpZWxkLCByZWYpIHtcbiAgICB2YXIgbGVuZ3RoID0gcmVmWzBdO1xuXG4gICAgcmV0dXJuIChcIlRoZSBcIiArIGZpZWxkICsgXCIgZmllbGQgbXVzdCBiZSBhdCBsZWFzdCBcIiArIGxlbmd0aCArIFwiIGNoYXJhY3RlcnMuXCIpO1xufSxcbiAgbWluX3ZhbHVlOiBmdW5jdGlvbiAoZmllbGQsIHJlZikge1xuICAgIHZhciBtaW4gPSByZWZbMF07XG5cbiAgICByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBtdXN0IGJlIFwiICsgbWluICsgXCIgb3IgbW9yZS5cIik7XG59LFxuICBub3RfaW46IGZ1bmN0aW9uIChmaWVsZCkgeyByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBtdXN0IGJlIGEgdmFsaWQgdmFsdWUuXCIpOyB9LFxuICBudW1lcmljOiBmdW5jdGlvbiAoZmllbGQpIHsgcmV0dXJuIChcIlRoZSBcIiArIGZpZWxkICsgXCIgZmllbGQgbWF5IG9ubHkgY29udGFpbiBudW1lcmljIGNoYXJhY3RlcnMuXCIpOyB9LFxuICByZWdleDogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIGZvcm1hdCBpcyBpbnZhbGlkLlwiKTsgfSxcbiAgcmVxdWlyZWQ6IGZ1bmN0aW9uIChmaWVsZCkgeyByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBmaWVsZCBpcyByZXF1aXJlZC5cIik7IH0sXG4gIHNpemU6IGZ1bmN0aW9uIChmaWVsZCwgcmVmKSB7XG4gICAgdmFyIHNpemUgPSByZWZbMF07XG5cbiAgICByZXR1cm4gKFwiVGhlIFwiICsgZmllbGQgKyBcIiBzaXplIG11c3QgYmUgbGVzcyB0aGFuIFwiICsgKGZvcm1hdEZpbGVTaXplKHNpemUpKSArIFwiLlwiKTtcbn0sXG4gIHVybDogZnVuY3Rpb24gKGZpZWxkKSB7IHJldHVybiAoXCJUaGUgXCIgKyBmaWVsZCArIFwiIGZpZWxkIGlzIG5vdCBhIHZhbGlkIFVSTC5cIik7IH1cbn07XG5cbnZhciBsb2NhbGUgPSB7XG4gIG5hbWU6ICdlbicsXG4gIG1lc3NhZ2VzOiBtZXNzYWdlcyxcbiAgYXR0cmlidXRlczoge31cbn07XG5cbmlmIChpc0RlZmluZWRHbG9iYWxseSgpKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBWZWVWYWxpZGF0ZS5WYWxpZGF0b3IuYWRkTG9jYWxlKGxvY2FsZSk7XG59XG5cbmZ1bmN0aW9uIHVzZSAocGx1Z2luLCBvcHRpb25zKSB7XG4gIGlmICggb3B0aW9ucyA9PT0gdm9pZCAwICkgb3B0aW9ucyA9IHt9O1xuXG4gIGlmICghaXNDYWxsYWJsZShwbHVnaW4pKSB7XG4gICAgcmV0dXJuIHdhcm4oJ1RoZSBwbHVnaW4gbXVzdCBiZSBhIGNhbGxhYmxlIGZ1bmN0aW9uJyk7XG4gIH1cblxuICBwbHVnaW4oeyBWYWxpZGF0b3I6IFZhbGlkYXRvciwgRXJyb3JCYWc6IEVycm9yQmFnLCBSdWxlczogVmFsaWRhdG9yLnJ1bGVzIH0sIG9wdGlvbnMpO1xufVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX0hPVVIgPSAzNjAwMDAwO1xudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUgPSA2MDAwMDtcbnZhciBERUZBVUxUX0FERElUSU9OQUxfRElHSVRTID0gMjtcblxudmFyIHBhdHRlcm5zID0ge1xuICBkYXRlVGltZURlbGltZXRlcjogL1tUIF0vLFxuICBwbGFpblRpbWU6IC86LyxcblxuICAvLyB5ZWFyIHRva2Vuc1xuICBZWTogL14oXFxkezJ9KSQvLFxuICBZWVk6IFtcbiAgICAvXihbKy1dXFxkezJ9KSQvLCAvLyAwIGFkZGl0aW9uYWwgZGlnaXRzXG4gICAgL14oWystXVxcZHszfSkkLywgLy8gMSBhZGRpdGlvbmFsIGRpZ2l0XG4gICAgL14oWystXVxcZHs0fSkkLyAvLyAyIGFkZGl0aW9uYWwgZGlnaXRzXG4gIF0sXG4gIFlZWVk6IC9eKFxcZHs0fSkvLFxuICBZWVlZWTogW1xuICAgIC9eKFsrLV1cXGR7NH0pLywgLy8gMCBhZGRpdGlvbmFsIGRpZ2l0c1xuICAgIC9eKFsrLV1cXGR7NX0pLywgLy8gMSBhZGRpdGlvbmFsIGRpZ2l0XG4gICAgL14oWystXVxcZHs2fSkvIC8vIDIgYWRkaXRpb25hbCBkaWdpdHNcbiAgXSxcblxuICAvLyBkYXRlIHRva2Vuc1xuICBNTTogL14tKFxcZHsyfSkkLyxcbiAgREREOiAvXi0/KFxcZHszfSkkLyxcbiAgTU1ERDogL14tPyhcXGR7Mn0pLT8oXFxkezJ9KSQvLFxuICBXd3c6IC9eLT9XKFxcZHsyfSkkLyxcbiAgV3d3RDogL14tP1coXFxkezJ9KS0/KFxcZHsxfSkkLyxcblxuICBISDogL14oXFxkezJ9KFsuLF1cXGQqKT8pJC8sXG4gIEhITU06IC9eKFxcZHsyfSk6PyhcXGR7Mn0oWy4sXVxcZCopPykkLyxcbiAgSEhNTVNTOiAvXihcXGR7Mn0pOj8oXFxkezJ9KTo/KFxcZHsyfShbLixdXFxkKik/KSQvLFxuXG4gIC8vIHRpbWV6b25lIHRva2Vuc1xuICB0aW1lem9uZTogLyhbWistXS4qKSQvLFxuICB0aW1lem9uZVo6IC9eKFopJC8sXG4gIHRpbWV6b25lSEg6IC9eKFsrLV0pKFxcZHsyfSkkLyxcbiAgdGltZXpvbmVISE1NOiAvXihbKy1dKShcXGR7Mn0pOj8oXFxkezJ9KSQvXG59O1xuXG4vKipcbiAqIEBuYW1lIHRvRGF0ZVxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBDb252ZXJ0IHRoZSBnaXZlbiBhcmd1bWVudCB0byBhbiBpbnN0YW5jZSBvZiBEYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQ29udmVydCB0aGUgZ2l2ZW4gYXJndW1lbnQgdG8gYW4gaW5zdGFuY2Ugb2YgRGF0ZS5cbiAqXG4gKiBJZiB0aGUgYXJndW1lbnQgaXMgYW4gaW5zdGFuY2Ugb2YgRGF0ZSwgdGhlIGZ1bmN0aW9uIHJldHVybnMgaXRzIGNsb25lLlxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBhIG51bWJlciwgaXQgaXMgdHJlYXRlZCBhcyBhIHRpbWVzdGFtcC5cbiAqXG4gKiBJZiBhbiBhcmd1bWVudCBpcyBhIHN0cmluZywgdGhlIGZ1bmN0aW9uIHRyaWVzIHRvIHBhcnNlIGl0LlxuICogRnVuY3Rpb24gYWNjZXB0cyBjb21wbGV0ZSBJU08gODYwMSBmb3JtYXRzIGFzIHdlbGwgYXMgcGFydGlhbCBpbXBsZW1lbnRhdGlvbnMuXG4gKiBJU08gODYwMTogaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9JU09fODYwMVxuICpcbiAqIElmIHRoZSBhcmd1bWVudCBpcyBudWxsLCBpdCBpcyB0cmVhdGVkIGFzIGFuIGludmFsaWQgZGF0ZS5cbiAqXG4gKiBJZiBhbGwgYWJvdmUgZmFpbHMsIHRoZSBmdW5jdGlvbiBwYXNzZXMgdGhlIGdpdmVuIGFyZ3VtZW50IHRvIERhdGUgY29uc3RydWN0b3IuXG4gKlxuICogKipOb3RlKio6ICphbGwqIERhdGUgYXJndW1lbnRzIHBhc3NlZCB0byBhbnkgKmRhdGUtZm5zKiBmdW5jdGlvbiBpcyBwcm9jZXNzZWQgYnkgYHRvRGF0ZWAuXG4gKiBBbGwgKmRhdGUtZm5zKiBmdW5jdGlvbnMgd2lsbCB0aHJvdyBgUmFuZ2VFcnJvcmAgaWYgYG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0c2AgaXMgbm90IDAsIDEsIDIgb3IgdW5kZWZpbmVkLlxuICpcbiAqIEBwYXJhbSB7Kn0gYXJndW1lbnQgLSB0aGUgdmFsdWUgdG8gY29udmVydFxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9ucy4gU2VlIFtPcHRpb25zXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL09wdGlvbnN9XG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gdGhlIGFkZGl0aW9uYWwgbnVtYmVyIG9mIGRpZ2l0cyBpbiB0aGUgZXh0ZW5kZWQgeWVhciBmb3JtYXRcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGUgaW4gdGhlIGxvY2FsIHRpbWUgem9uZVxuICogQHRocm93cyB7VHlwZUVycm9yfSAxIGFyZ3VtZW50IHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBDb252ZXJ0IHN0cmluZyAnMjAxNC0wMi0xMVQxMTozMDozMCcgdG8gZGF0ZTpcbiAqIHZhciByZXN1bHQgPSB0b0RhdGUoJzIwMTQtMDItMTFUMTE6MzA6MzAnKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMTE6MzA6MzBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ29udmVydCBzdHJpbmcgJyswMjAxNDEwMScgdG8gZGF0ZSxcbiAqIC8vIGlmIHRoZSBhZGRpdGlvbmFsIG51bWJlciBvZiBkaWdpdHMgaW4gdGhlIGV4dGVuZGVkIHllYXIgZm9ybWF0IGlzIDE6XG4gKiB2YXIgcmVzdWx0ID0gdG9EYXRlKCcrMDIwMTQxMDEnLCB7YWRkaXRpb25hbERpZ2l0czogMX0pXG4gKiAvLz0+IEZyaSBBcHIgMTEgMjAxNCAwMDowMDowMFxuICovXG5mdW5jdGlvbiB0b0RhdGUgKGFyZ3VtZW50LCBkaXJ0eU9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHByZXNlbnQnKVxuICB9XG5cbiAgaWYgKGFyZ3VtZW50ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTilcbiAgfVxuXG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuXG4gIHZhciBhZGRpdGlvbmFsRGlnaXRzID0gb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzID09PSB1bmRlZmluZWQgPyBERUZBVUxUX0FERElUSU9OQUxfRElHSVRTIDogTnVtYmVyKG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0cyk7XG4gIGlmIChhZGRpdGlvbmFsRGlnaXRzICE9PSAyICYmIGFkZGl0aW9uYWxEaWdpdHMgIT09IDEgJiYgYWRkaXRpb25hbERpZ2l0cyAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdhZGRpdGlvbmFsRGlnaXRzIG11c3QgYmUgMCwgMSBvciAyJylcbiAgfVxuXG4gIC8vIENsb25lIHRoZSBkYXRlXG4gIGlmIChhcmd1bWVudCBpbnN0YW5jZW9mIERhdGUpIHtcbiAgICAvLyBQcmV2ZW50IHRoZSBkYXRlIHRvIGxvc2UgdGhlIG1pbGxpc2Vjb25kcyB3aGVuIHBhc3NlZCB0byBuZXcgRGF0ZSgpIGluIElFMTBcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQuZ2V0VGltZSgpKVxuICB9IGVsc2UgaWYgKHR5cGVvZiBhcmd1bWVudCAhPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpXG4gIH1cblxuICB2YXIgZGF0ZVN0cmluZ3MgPSBzcGxpdERhdGVTdHJpbmcoYXJndW1lbnQpO1xuXG4gIHZhciBwYXJzZVllYXJSZXN1bHQgPSBwYXJzZVllYXIoZGF0ZVN0cmluZ3MuZGF0ZSwgYWRkaXRpb25hbERpZ2l0cyk7XG4gIHZhciB5ZWFyID0gcGFyc2VZZWFyUmVzdWx0LnllYXI7XG4gIHZhciByZXN0RGF0ZVN0cmluZyA9IHBhcnNlWWVhclJlc3VsdC5yZXN0RGF0ZVN0cmluZztcblxuICB2YXIgZGF0ZSA9IHBhcnNlRGF0ZShyZXN0RGF0ZVN0cmluZywgeWVhcik7XG5cbiAgaWYgKGRhdGUpIHtcbiAgICB2YXIgdGltZXN0YW1wID0gZGF0ZS5nZXRUaW1lKCk7XG4gICAgdmFyIHRpbWUgPSAwO1xuICAgIHZhciBvZmZzZXQ7XG5cbiAgICBpZiAoZGF0ZVN0cmluZ3MudGltZSkge1xuICAgICAgdGltZSA9IHBhcnNlVGltZShkYXRlU3RyaW5ncy50aW1lKTtcbiAgICB9XG5cbiAgICBpZiAoZGF0ZVN0cmluZ3MudGltZXpvbmUpIHtcbiAgICAgIG9mZnNldCA9IHBhcnNlVGltZXpvbmUoZGF0ZVN0cmluZ3MudGltZXpvbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBnZXQgb2Zmc2V0IGFjY3VyYXRlIHRvIGhvdXIgaW4gdGltZXpvbmVzIHRoYXQgY2hhbmdlIG9mZnNldFxuICAgICAgb2Zmc2V0ID0gbmV3IERhdGUodGltZXN0YW1wICsgdGltZSkuZ2V0VGltZXpvbmVPZmZzZXQoKTtcbiAgICAgIG9mZnNldCA9IG5ldyBEYXRlKHRpbWVzdGFtcCArIHRpbWUgKyBvZmZzZXQgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFKS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgRGF0ZSh0aW1lc3RhbXAgKyB0aW1lICsgb2Zmc2V0ICogTUlMTElTRUNPTkRTX0lOX01JTlVURSlcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IERhdGUoYXJndW1lbnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gc3BsaXREYXRlU3RyaW5nIChkYXRlU3RyaW5nKSB7XG4gIHZhciBkYXRlU3RyaW5ncyA9IHt9O1xuICB2YXIgYXJyYXkgPSBkYXRlU3RyaW5nLnNwbGl0KHBhdHRlcm5zLmRhdGVUaW1lRGVsaW1ldGVyKTtcbiAgdmFyIHRpbWVTdHJpbmc7XG5cbiAgaWYgKHBhdHRlcm5zLnBsYWluVGltZS50ZXN0KGFycmF5WzBdKSkge1xuICAgIGRhdGVTdHJpbmdzLmRhdGUgPSBudWxsO1xuICAgIHRpbWVTdHJpbmcgPSBhcnJheVswXTtcbiAgfSBlbHNlIHtcbiAgICBkYXRlU3RyaW5ncy5kYXRlID0gYXJyYXlbMF07XG4gICAgdGltZVN0cmluZyA9IGFycmF5WzFdO1xuICB9XG5cbiAgaWYgKHRpbWVTdHJpbmcpIHtcbiAgICB2YXIgdG9rZW4gPSBwYXR0ZXJucy50aW1lem9uZS5leGVjKHRpbWVTdHJpbmcpO1xuICAgIGlmICh0b2tlbikge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmcucmVwbGFjZSh0b2tlblsxXSwgJycpO1xuICAgICAgZGF0ZVN0cmluZ3MudGltZXpvbmUgPSB0b2tlblsxXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0ZVN0cmluZ3MudGltZSA9IHRpbWVTdHJpbmc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGRhdGVTdHJpbmdzXG59XG5cbmZ1bmN0aW9uIHBhcnNlWWVhciAoZGF0ZVN0cmluZywgYWRkaXRpb25hbERpZ2l0cykge1xuICB2YXIgcGF0dGVybllZWSA9IHBhdHRlcm5zLllZWVthZGRpdGlvbmFsRGlnaXRzXTtcbiAgdmFyIHBhdHRlcm5ZWVlZWSA9IHBhdHRlcm5zLllZWVlZW2FkZGl0aW9uYWxEaWdpdHNdO1xuXG4gIHZhciB0b2tlbjtcblxuICAvLyBZWVlZIG9yIMKxWVlZWVlcbiAgdG9rZW4gPSBwYXR0ZXJucy5ZWVlZLmV4ZWMoZGF0ZVN0cmluZykgfHwgcGF0dGVybllZWVlZLmV4ZWMoZGF0ZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIHZhciB5ZWFyU3RyaW5nID0gdG9rZW5bMV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IHBhcnNlSW50KHllYXJTdHJpbmcsIDEwKSxcbiAgICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKHllYXJTdHJpbmcubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIC8vIFlZIG9yIMKxWVlZXG4gIHRva2VuID0gcGF0dGVybnMuWVkuZXhlYyhkYXRlU3RyaW5nKSB8fCBwYXR0ZXJuWVlZLmV4ZWMoZGF0ZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIHZhciBjZW50dXJ5U3RyaW5nID0gdG9rZW5bMV07XG4gICAgcmV0dXJuIHtcbiAgICAgIHllYXI6IHBhcnNlSW50KGNlbnR1cnlTdHJpbmcsIDEwKSAqIDEwMCxcbiAgICAgIHJlc3REYXRlU3RyaW5nOiBkYXRlU3RyaW5nLnNsaWNlKGNlbnR1cnlTdHJpbmcubGVuZ3RoKVxuICAgIH1cbiAgfVxuXG4gIC8vIEludmFsaWQgSVNPLWZvcm1hdHRlZCB5ZWFyXG4gIHJldHVybiB7XG4gICAgeWVhcjogbnVsbFxuICB9XG59XG5cbmZ1bmN0aW9uIHBhcnNlRGF0ZSAoZGF0ZVN0cmluZywgeWVhcikge1xuICAvLyBJbnZhbGlkIElTTy1mb3JtYXR0ZWQgeWVhclxuICBpZiAoeWVhciA9PT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cblxuICB2YXIgdG9rZW47XG4gIHZhciBkYXRlO1xuICB2YXIgbW9udGg7XG4gIHZhciB3ZWVrO1xuXG4gIC8vIFlZWVlcbiAgaWYgKGRhdGVTdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgZGF0ZSA9IG5ldyBEYXRlKDApO1xuICAgIGRhdGUuc2V0VVRDRnVsbFllYXIoeWVhcik7XG4gICAgcmV0dXJuIGRhdGVcbiAgfVxuXG4gIC8vIFlZWVktTU1cbiAgdG9rZW4gPSBwYXR0ZXJucy5NTS5leGVjKGRhdGVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgbW9udGggPSBwYXJzZUludCh0b2tlblsxXSwgMTApIC0gMTtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoKTtcbiAgICByZXR1cm4gZGF0ZVxuICB9XG5cbiAgLy8gWVlZWS1EREQgb3IgWVlZWURERFxuICB0b2tlbiA9IHBhdHRlcm5zLkRERC5leGVjKGRhdGVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgdmFyIGRheU9mWWVhciA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCk7XG4gICAgZGF0ZS5zZXRVVENGdWxsWWVhcih5ZWFyLCAwLCBkYXlPZlllYXIpO1xuICAgIHJldHVybiBkYXRlXG4gIH1cblxuICAvLyBZWVlZLU1NLUREIG9yIFlZWVlNTUREXG4gIHRva2VuID0gcGF0dGVybnMuTU1ERC5leGVjKGRhdGVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICBkYXRlID0gbmV3IERhdGUoMCk7XG4gICAgbW9udGggPSBwYXJzZUludCh0b2tlblsxXSwgMTApIC0gMTtcbiAgICB2YXIgZGF5ID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKTtcbiAgICBkYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIG1vbnRoLCBkYXkpO1xuICAgIHJldHVybiBkYXRlXG4gIH1cblxuICAvLyBZWVlZLVd3dyBvciBZWVlZV3d3XG4gIHRva2VuID0gcGF0dGVybnMuV3d3LmV4ZWMoZGF0ZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIHdlZWsgPSBwYXJzZUludCh0b2tlblsxXSwgMTApIC0gMTtcbiAgICByZXR1cm4gZGF5T2ZJU09ZZWFyKHllYXIsIHdlZWspXG4gIH1cblxuICAvLyBZWVlZLVd3dy1EIG9yIFlZWVlXd3dEXG4gIHRva2VuID0gcGF0dGVybnMuV3d3RC5leGVjKGRhdGVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICB3ZWVrID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKSAtIDE7XG4gICAgdmFyIGRheU9mV2VlayA9IHBhcnNlSW50KHRva2VuWzJdLCAxMCkgLSAxO1xuICAgIHJldHVybiBkYXlPZklTT1llYXIoeWVhciwgd2VlaywgZGF5T2ZXZWVrKVxuICB9XG5cbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIGRhdGVcbiAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lICh0aW1lU3RyaW5nKSB7XG4gIHZhciB0b2tlbjtcbiAgdmFyIGhvdXJzO1xuICB2YXIgbWludXRlcztcblxuICAvLyBoaFxuICB0b2tlbiA9IHBhdHRlcm5zLkhILmV4ZWModGltZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIGhvdXJzID0gcGFyc2VGbG9hdCh0b2tlblsxXS5yZXBsYWNlKCcsJywgJy4nKSk7XG4gICAgcmV0dXJuIChob3VycyAlIDI0KSAqIE1JTExJU0VDT05EU19JTl9IT1VSXG4gIH1cblxuICAvLyBoaDptbSBvciBoaG1tXG4gIHRva2VuID0gcGF0dGVybnMuSEhNTS5leGVjKHRpbWVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICBob3VycyA9IHBhcnNlSW50KHRva2VuWzFdLCAxMCk7XG4gICAgbWludXRlcyA9IHBhcnNlRmxvYXQodG9rZW5bMl0ucmVwbGFjZSgnLCcsICcuJykpO1xuICAgIHJldHVybiAoaG91cnMgJSAyNCkgKiBNSUxMSVNFQ09ORFNfSU5fSE9VUiArXG4gICAgICBtaW51dGVzICogTUlMTElTRUNPTkRTX0lOX01JTlVURVxuICB9XG5cbiAgLy8gaGg6bW06c3Mgb3IgaGhtbXNzXG4gIHRva2VuID0gcGF0dGVybnMuSEhNTVNTLmV4ZWModGltZVN0cmluZyk7XG4gIGlmICh0b2tlbikge1xuICAgIGhvdXJzID0gcGFyc2VJbnQodG9rZW5bMV0sIDEwKTtcbiAgICBtaW51dGVzID0gcGFyc2VJbnQodG9rZW5bMl0sIDEwKTtcbiAgICB2YXIgc2Vjb25kcyA9IHBhcnNlRmxvYXQodG9rZW5bM10ucmVwbGFjZSgnLCcsICcuJykpO1xuICAgIHJldHVybiAoaG91cnMgJSAyNCkgKiBNSUxMSVNFQ09ORFNfSU5fSE9VUiArXG4gICAgICBtaW51dGVzICogTUlMTElTRUNPTkRTX0lOX01JTlVURSArXG4gICAgICBzZWNvbmRzICogMTAwMFxuICB9XG5cbiAgLy8gSW52YWxpZCBJU08tZm9ybWF0dGVkIHRpbWVcbiAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gcGFyc2VUaW1lem9uZSAodGltZXpvbmVTdHJpbmcpIHtcbiAgdmFyIHRva2VuO1xuICB2YXIgYWJzb2x1dGVPZmZzZXQ7XG5cbiAgLy8gWlxuICB0b2tlbiA9IHBhdHRlcm5zLnRpbWV6b25lWi5leGVjKHRpbWV6b25lU3RyaW5nKTtcbiAgaWYgKHRva2VuKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuXG4gIC8vIMKxaGhcbiAgdG9rZW4gPSBwYXR0ZXJucy50aW1lem9uZUhILmV4ZWModGltZXpvbmVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICBhYnNvbHV0ZU9mZnNldCA9IHBhcnNlSW50KHRva2VuWzJdLCAxMCkgKiA2MDtcbiAgICByZXR1cm4gKHRva2VuWzFdID09PSAnKycpID8gLWFic29sdXRlT2Zmc2V0IDogYWJzb2x1dGVPZmZzZXRcbiAgfVxuXG4gIC8vIMKxaGg6bW0gb3IgwrFoaG1tXG4gIHRva2VuID0gcGF0dGVybnMudGltZXpvbmVISE1NLmV4ZWModGltZXpvbmVTdHJpbmcpO1xuICBpZiAodG9rZW4pIHtcbiAgICBhYnNvbHV0ZU9mZnNldCA9IHBhcnNlSW50KHRva2VuWzJdLCAxMCkgKiA2MCArIHBhcnNlSW50KHRva2VuWzNdLCAxMCk7XG4gICAgcmV0dXJuICh0b2tlblsxXSA9PT0gJysnKSA/IC1hYnNvbHV0ZU9mZnNldCA6IGFic29sdXRlT2Zmc2V0XG4gIH1cblxuICByZXR1cm4gMFxufVxuXG5mdW5jdGlvbiBkYXlPZklTT1llYXIgKGlzb1llYXIsIHdlZWssIGRheSkge1xuICB3ZWVrID0gd2VlayB8fCAwO1xuICBkYXkgPSBkYXkgfHwgMDtcbiAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgwKTtcbiAgZGF0ZS5zZXRVVENGdWxsWWVhcihpc29ZZWFyLCAwLCA0KTtcbiAgdmFyIGZvdXJ0aE9mSmFudWFyeURheSA9IGRhdGUuZ2V0VVRDRGF5KCkgfHwgNztcbiAgdmFyIGRpZmYgPSB3ZWVrICogNyArIGRheSArIDEgLSBmb3VydGhPZkphbnVhcnlEYXk7XG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpZmYpO1xuICByZXR1cm4gZGF0ZVxufVxuXG4vKipcbiAqIEBuYW1lIGFkZE1pbGxpc2Vjb25kc1xuICogQGNhdGVnb3J5IE1pbGxpc2Vjb25kIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWlsbGlzZWNvbmRzIHRvIGJlIGFkZGVkXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zLiBTZWUgW09wdGlvbnNde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvT3B0aW9uc31cbiAqIEBwYXJhbSB7MHwxfDJ9IFtvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHM9Ml0gLSBwYXNzZWQgdG8gYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgbmV3IGRhdGUgd2l0aCB0aGUgbWlsbGlzZWNvbmRzIGFkZGVkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBBZGQgNzUwIG1pbGxpc2Vjb25kcyB0byAxMCBKdWx5IDIwMTQgMTI6NDU6MzAuMDAwOlxuICogdmFyIHJlc3VsdCA9IGFkZE1pbGxpc2Vjb25kcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDQ1LCAzMCwgMCksIDc1MClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDEyOjQ1OjMwLjc1MFxuICovXG5mdW5jdGlvbiBhZGRNaWxsaXNlY29uZHMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcyIGFyZ3VtZW50cyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHByZXNlbnQnKVxuICB9XG5cbiAgdmFyIHRpbWVzdGFtcCA9IHRvRGF0ZShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykuZ2V0VGltZSgpO1xuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KTtcbiAgcmV0dXJuIG5ldyBEYXRlKHRpbWVzdGFtcCArIGFtb3VudClcbn1cblxuZnVuY3Rpb24gY2xvbmVPYmplY3QgKGRpcnR5T2JqZWN0KSB7XG4gIGRpcnR5T2JqZWN0ID0gZGlydHlPYmplY3QgfHwge307XG4gIHZhciBvYmplY3QgPSB7fTtcblxuICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBkaXJ0eU9iamVjdCkge1xuICAgIGlmIChkaXJ0eU9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgIG9iamVjdFtwcm9wZXJ0eV0gPSBkaXJ0eU9iamVjdFtwcm9wZXJ0eV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iamVjdFxufVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX01JTlVURSQyID0gNjAwMDA7XG5cbi8qKlxuICogQG5hbWUgYWRkTWludXRlc1xuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBBZGQgdGhlIHNwZWNpZmllZCBudW1iZXIgb2YgbWludXRlcyB0byB0aGUgZ2l2ZW4gZGF0ZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFkZCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaW51dGVzIHRvIHRoZSBnaXZlbiBkYXRlLlxuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdG8gYmUgY2hhbmdlZFxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCAtIHRoZSBhbW91bnQgb2YgbWludXRlcyB0byBiZSBhZGRlZFxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9ucy4gU2VlIFtPcHRpb25zXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL09wdGlvbnN9XG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gcGFzc2VkIHRvIGB0b0RhdGVgLiBTZWUgW3RvRGF0ZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy90b0RhdGV9XG4gKiBAcmV0dXJucyB7RGF0ZX0gdGhlIG5ldyBkYXRlIHdpdGggdGhlIG1pbnV0ZXMgYWRkZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEFkZCAzMCBtaW51dGVzIHRvIDEwIEp1bHkgMjAxNCAxMjowMDowMDpcbiAqIHZhciByZXN1bHQgPSBhZGRNaW51dGVzKG5ldyBEYXRlKDIwMTQsIDYsIDEwLCAxMiwgMCksIDMwKVxuICogLy89PiBUaHUgSnVsIDEwIDIwMTQgMTI6MzA6MDBcbiAqL1xuZnVuY3Rpb24gYWRkTWludXRlcyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCwgZGlydHlPcHRpb25zKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzIgYXJndW1lbnRzIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgcHJlc2VudCcpXG4gIH1cblxuICB2YXIgYW1vdW50ID0gTnVtYmVyKGRpcnR5QW1vdW50KTtcbiAgcmV0dXJuIGFkZE1pbGxpc2Vjb25kcyhkaXJ0eURhdGUsIGFtb3VudCAqIE1JTExJU0VDT05EU19JTl9NSU5VVEUkMiwgZGlydHlPcHRpb25zKVxufVxuXG4vKipcbiAqIEBuYW1lIGlzVmFsaWRcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGdpdmVuIGRhdGUgdmFsaWQ/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm5zIGZhbHNlIGlmIGFyZ3VtZW50IGlzIEludmFsaWQgRGF0ZSBhbmQgdHJ1ZSBvdGhlcndpc2UuXG4gKiBBcmd1bWVudCBpcyBjb252ZXJ0ZWQgdG8gRGF0ZSB1c2luZyBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogSW52YWxpZCBEYXRlIGlzIGEgRGF0ZSwgd2hvc2UgdGltZSB2YWx1ZSBpcyBOYU4uXG4gKlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogQHBhcmFtIHsqfSBkYXRlIC0gdGhlIGRhdGUgdG8gY2hlY2tcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnMuIFNlZSBbT3B0aW9uc117QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9PcHRpb25zfVxuICogQHBhcmFtIHswfDF8Mn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHBhc3NlZCB0byBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogQHJldHVybnMge0Jvb2xlYW59IHRoZSBkYXRlIGlzIHZhbGlkXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDEgYXJndW1lbnQgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciB0aGUgdmFsaWQgZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKDIwMTQsIDEsIDMxKSlcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIHZhbHVlLCBjb252ZXJ0YWJsZSBpbnRvIGEgZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBpc1ZhbGlkKCcyMDE0LTAyLTMxJylcbiAqIC8vPT4gdHJ1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBGb3IgdGhlIGludmFsaWQgZGF0ZTpcbiAqIHZhciByZXN1bHQgPSBpc1ZhbGlkKG5ldyBEYXRlKCcnKSlcbiAqIC8vPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNWYWxpZCAoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMSBhcmd1bWVudCByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHByZXNlbnQnKVxuICB9XG5cbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpO1xuICByZXR1cm4gIWlzTmFOKGRhdGUpXG59XG5cbnZhciBmb3JtYXREaXN0YW5jZUxvY2FsZSA9IHtcbiAgbGVzc1RoYW5YU2Vjb25kczoge1xuICAgIG9uZTogJ2xlc3MgdGhhbiBhIHNlY29uZCcsXG4gICAgb3RoZXI6ICdsZXNzIHRoYW4ge3tjb3VudH19IHNlY29uZHMnXG4gIH0sXG5cbiAgeFNlY29uZHM6IHtcbiAgICBvbmU6ICcxIHNlY29uZCcsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gc2Vjb25kcydcbiAgfSxcblxuICBoYWxmQU1pbnV0ZTogJ2hhbGYgYSBtaW51dGUnLFxuXG4gIGxlc3NUaGFuWE1pbnV0ZXM6IHtcbiAgICBvbmU6ICdsZXNzIHRoYW4gYSBtaW51dGUnLFxuICAgIG90aGVyOiAnbGVzcyB0aGFuIHt7Y291bnR9fSBtaW51dGVzJ1xuICB9LFxuXG4gIHhNaW51dGVzOiB7XG4gICAgb25lOiAnMSBtaW51dGUnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1pbnV0ZXMnXG4gIH0sXG5cbiAgYWJvdXRYSG91cnM6IHtcbiAgICBvbmU6ICdhYm91dCAxIGhvdXInLFxuICAgIG90aGVyOiAnYWJvdXQge3tjb3VudH19IGhvdXJzJ1xuICB9LFxuXG4gIHhIb3Vyczoge1xuICAgIG9uZTogJzEgaG91cicsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gaG91cnMnXG4gIH0sXG5cbiAgeERheXM6IHtcbiAgICBvbmU6ICcxIGRheScsXG4gICAgb3RoZXI6ICd7e2NvdW50fX0gZGF5cydcbiAgfSxcblxuICBhYm91dFhNb250aHM6IHtcbiAgICBvbmU6ICdhYm91dCAxIG1vbnRoJyxcbiAgICBvdGhlcjogJ2Fib3V0IHt7Y291bnR9fSBtb250aHMnXG4gIH0sXG5cbiAgeE1vbnRoczoge1xuICAgIG9uZTogJzEgbW9udGgnLFxuICAgIG90aGVyOiAne3tjb3VudH19IG1vbnRocydcbiAgfSxcblxuICBhYm91dFhZZWFyczoge1xuICAgIG9uZTogJ2Fib3V0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhYm91dCB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG5cbiAgeFllYXJzOiB7XG4gICAgb25lOiAnMSB5ZWFyJyxcbiAgICBvdGhlcjogJ3t7Y291bnR9fSB5ZWFycydcbiAgfSxcblxuICBvdmVyWFllYXJzOiB7XG4gICAgb25lOiAnb3ZlciAxIHllYXInLFxuICAgIG90aGVyOiAnb3ZlciB7e2NvdW50fX0geWVhcnMnXG4gIH0sXG5cbiAgYWxtb3N0WFllYXJzOiB7XG4gICAgb25lOiAnYWxtb3N0IDEgeWVhcicsXG4gICAgb3RoZXI6ICdhbG1vc3Qge3tjb3VudH19IHllYXJzJ1xuICB9XG59O1xuXG5mdW5jdGlvbiBmb3JtYXREaXN0YW5jZSAodG9rZW4sIGNvdW50LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciByZXN1bHQ7XG4gIGlmICh0eXBlb2YgZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dID09PSAnc3RyaW5nJykge1xuICAgIHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXTtcbiAgfSBlbHNlIGlmIChjb3VudCA9PT0gMSkge1xuICAgIHJlc3VsdCA9IGZvcm1hdERpc3RhbmNlTG9jYWxlW3Rva2VuXS5vbmU7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0ID0gZm9ybWF0RGlzdGFuY2VMb2NhbGVbdG9rZW5dLm90aGVyLnJlcGxhY2UoJ3t7Y291bnR9fScsIGNvdW50KTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmFkZFN1ZmZpeCkge1xuICAgIGlmIChvcHRpb25zLmNvbXBhcmlzb24gPiAwKSB7XG4gICAgICByZXR1cm4gJ2luICcgKyByZXN1bHRcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHJlc3VsdCArICcgYWdvJ1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxudmFyIHRva2Vuc1RvQmVTaG9ydGVkUGF0dGVybiA9IC9NTU1NfE1NfEREfGRkZGQvZztcblxuZnVuY3Rpb24gYnVpbGRTaG9ydExvbmdGb3JtYXQgKGZvcm1hdCkge1xuICByZXR1cm4gZm9ybWF0LnJlcGxhY2UodG9rZW5zVG9CZVNob3J0ZWRQYXR0ZXJuLCBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICByZXR1cm4gdG9rZW4uc2xpY2UoMSlcbiAgfSlcbn1cblxuLyoqXG4gKiBAbmFtZSBidWlsZEZvcm1hdExvbmdGblxuICogQGNhdGVnb3J5IExvY2FsZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBCdWlsZCBgZm9ybWF0TG9uZ2AgcHJvcGVydHkgZm9yIGxvY2FsZSB1c2VkIGJ5IGBmb3JtYXRgLCBgZm9ybWF0UmVsYXRpdmVgIGFuZCBgcGFyc2VgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEJ1aWxkIGBmb3JtYXRMb25nYCBwcm9wZXJ0eSBmb3IgbG9jYWxlIHVzZWQgYnkgYGZvcm1hdGAsIGBmb3JtYXRSZWxhdGl2ZWAgYW5kIGBwYXJzZWAgZnVuY3Rpb25zLlxuICogUmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoIHRha2VzIG9uZSBvZiB0aGUgZm9sbG93aW5nIHRva2VucyBhcyB0aGUgYXJndW1lbnQ6XG4gKiBgJ0xUUydgLCBgJ0xUJ2AsIGAnTCdgLCBgJ0xMJ2AsIGAnTExMJ2AsIGAnbCdgLCBgJ2xsJ2AsIGAnbGxsJ2AsIGAnbGxsbCdgXG4gKiBhbmQgcmV0dXJucyBhIGxvbmcgZm9ybWF0IHN0cmluZyB3cml0dGVuIGFzIGBmb3JtYXRgIHRva2VuIHN0cmluZ3MuXG4gKiBTZWUgW2Zvcm1hdF17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9mb3JtYXR9XG4gKlxuICogYCdsJ2AsIGAnbGwnYCwgYCdsbGwnYCBhbmQgYCdsbGxsJ2AgZm9ybWF0cyBhcmUgYnVpbHQgYXV0b21hdGljYWxseVxuICogYnkgc2hvcnRlbmluZyBzb21lIG9mIHRoZSB0b2tlbnMgZnJvbSBjb3JyZXNwb25kaW5nIHVuc2hvcnRlbmVkIGZvcm1hdHNcbiAqIChlLmcuLCBpZiBgTExgIGlzIGAnTU1NTSBERCBZWVlZJ2AgdGhlbiBgbGxgIHdpbGwgYmUgYE1NTSBEIFlZWVlgKVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogLSB0aGUgb2JqZWN0IHdpdGggbG9uZyBmb3JtYXRzIHdyaXR0ZW4gYXMgYGZvcm1hdGAgdG9rZW4gc3RyaW5nc1xuICogQHBhcmFtIHtTdHJpbmd9IG9iai5MVCAtIHRpbWUgZm9ybWF0OiBob3VycyBhbmQgbWludXRlc1xuICogQHBhcmFtIHtTdHJpbmd9IG9iai5MVFMgLSB0aW1lIGZvcm1hdDogaG91cnMsIG1pbnV0ZXMgYW5kIHNlY29uZHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBvYmouTCAtIHNob3J0IGRhdGUgZm9ybWF0OiBudW1lcmljIGRheSwgbW9udGggYW5kIHllYXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb2JqLmxdIC0gc2hvcnQgZGF0ZSBmb3JtYXQ6IG51bWVyaWMgZGF5LCBtb250aCBhbmQgeWVhciAoc2hvcnRlbmVkKVxuICogQHBhcmFtIHtTdHJpbmd9IG9iai5MTCAtIGxvbmcgZGF0ZSBmb3JtYXQ6IGRheSwgbW9udGggaW4gd29yZHMsIGFuZCB5ZWFyXG4gKiBAcGFyYW0ge1N0cmluZ30gW29iai5sbF0gLSBsb25nIGRhdGUgZm9ybWF0OiBkYXksIG1vbnRoIGluIHdvcmRzLCBhbmQgeWVhciAoc2hvcnRlbmVkKVxuICogQHBhcmFtIHtTdHJpbmd9IG9iai5MTEwgLSBsb25nIGRhdGUgYW5kIHRpbWUgZm9ybWF0XG4gKiBAcGFyYW0ge1N0cmluZ30gW29iai5sbGxdIC0gbG9uZyBkYXRlIGFuZCB0aW1lIGZvcm1hdCAoc2hvcnRlbmVkKVxuICogQHBhcmFtIHtTdHJpbmd9IG9iai5MTExMIC0gbG9uZyBkYXRlLCB0aW1lIGFuZCB3ZWVrZGF5IGZvcm1hdFxuICogQHBhcmFtIHtTdHJpbmd9IFtvYmoubGxsbF0gLSBsb25nIGRhdGUsIHRpbWUgYW5kIHdlZWtkYXkgZm9ybWF0IChzaG9ydGVuZWQpXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IGBmb3JtYXRMb25nYCBwcm9wZXJ0eSBvZiB0aGUgbG9jYWxlXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIEZvciBgZW4tVVNgIGxvY2FsZTpcbiAqIGxvY2FsZS5mb3JtYXRMb25nID0gYnVpbGRGb3JtYXRMb25nRm4oe1xuICogICBMVDogJ2g6bW0gYWEnLFxuICogICBMVFM6ICdoOm1tOnNzIGFhJyxcbiAqICAgTDogJ01NL0REL1lZWVknLFxuICogICBMTDogJ01NTU0gRCBZWVlZJyxcbiAqICAgTExMOiAnTU1NTSBEIFlZWVkgaDptbSBhYScsXG4gKiAgIExMTEw6ICdkZGRkLCBNTU1NIEQgWVlZWSBoOm1tIGFhJ1xuICogfSlcbiAqL1xuZnVuY3Rpb24gYnVpbGRGb3JtYXRMb25nRm4gKG9iaikge1xuICB2YXIgZm9ybWF0TG9uZ0xvY2FsZSA9IHtcbiAgICBMVFM6IG9iai5MVFMsXG4gICAgTFQ6IG9iai5MVCxcbiAgICBMOiBvYmouTCxcbiAgICBMTDogb2JqLkxMLFxuICAgIExMTDogb2JqLkxMTCxcbiAgICBMTExMOiBvYmouTExMTCxcbiAgICBsOiBvYmoubCB8fCBidWlsZFNob3J0TG9uZ0Zvcm1hdChvYmouTCksXG4gICAgbGw6IG9iai5sbCB8fCBidWlsZFNob3J0TG9uZ0Zvcm1hdChvYmouTEwpLFxuICAgIGxsbDogb2JqLmxsbCB8fCBidWlsZFNob3J0TG9uZ0Zvcm1hdChvYmouTExMKSxcbiAgICBsbGxsOiBvYmoubGxsbCB8fCBidWlsZFNob3J0TG9uZ0Zvcm1hdChvYmouTExMTClcbiAgfTtcblxuICByZXR1cm4gZnVuY3Rpb24gKHRva2VuKSB7XG4gICAgcmV0dXJuIGZvcm1hdExvbmdMb2NhbGVbdG9rZW5dXG4gIH1cbn1cblxudmFyIGZvcm1hdExvbmcgPSBidWlsZEZvcm1hdExvbmdGbih7XG4gIExUOiAnaDptbSBhYScsXG4gIExUUzogJ2g6bW06c3MgYWEnLFxuICBMOiAnTU0vREQvWVlZWScsXG4gIExMOiAnTU1NTSBEIFlZWVknLFxuICBMTEw6ICdNTU1NIEQgWVlZWSBoOm1tIGFhJyxcbiAgTExMTDogJ2RkZGQsIE1NTU0gRCBZWVlZIGg6bW0gYWEnXG59KTtcblxudmFyIGZvcm1hdFJlbGF0aXZlTG9jYWxlID0ge1xuICBsYXN0V2VlazogJ1tsYXN0XSBkZGRkIFthdF0gTFQnLFxuICB5ZXN0ZXJkYXk6ICdbeWVzdGVyZGF5IGF0XSBMVCcsXG4gIHRvZGF5OiAnW3RvZGF5IGF0XSBMVCcsXG4gIHRvbW9ycm93OiAnW3RvbW9ycm93IGF0XSBMVCcsXG4gIG5leHRXZWVrOiAnZGRkZCBbYXRdIExUJyxcbiAgb3RoZXI6ICdMJ1xufTtcblxuZnVuY3Rpb24gZm9ybWF0UmVsYXRpdmUgKHRva2VuLCBkYXRlLCBiYXNlRGF0ZSwgb3B0aW9ucykge1xuICByZXR1cm4gZm9ybWF0UmVsYXRpdmVMb2NhbGVbdG9rZW5dXG59XG5cbi8qKlxuICogQG5hbWUgYnVpbGRMb2NhbGl6ZUZuXG4gKiBAY2F0ZWdvcnkgTG9jYWxlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEJ1aWxkIGBsb2NhbGl6ZS53ZWVrZGF5YCwgYGxvY2FsaXplLm1vbnRoYCBhbmQgYGxvY2FsaXplLnRpbWVPZkRheWAgcHJvcGVydGllcyBmb3IgdGhlIGxvY2FsZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEJ1aWxkIGBsb2NhbGl6ZS53ZWVrZGF5YCwgYGxvY2FsaXplLm1vbnRoYCBhbmQgYGxvY2FsaXplLnRpbWVPZkRheWAgcHJvcGVydGllcyBmb3IgdGhlIGxvY2FsZVxuICogdXNlZCBieSBgZm9ybWF0YCBmdW5jdGlvbi5cbiAqIElmIG5vIGB0eXBlYCBpcyBzdXBwbGllZCB0byB0aGUgb3B0aW9ucyBvZiB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uLCBgZGVmYXVsdFR5cGVgIHdpbGwgYmUgdXNlZCAoc2VlIGV4YW1wbGUpLlxuICpcbiAqIGBsb2NhbGl6ZS53ZWVrZGF5YCBmdW5jdGlvbiB0YWtlcyB0aGUgd2Vla2RheSBpbmRleCBhcyBhcmd1bWVudCAoMCAtIFN1bmRheSkuXG4gKiBgbG9jYWxpemUubW9udGhgIHRha2VzIHRoZSBtb250aCBpbmRleCAoMCAtIEphbnVhcnkpLlxuICogYGxvY2FsaXplLnRpbWVPZkRheWAgdGFrZXMgdGhlIGhvdXJzLiBVc2UgYGluZGV4Q2FsbGJhY2tgIHRvIGNvbnZlcnQgdGhlbSB0byBhbiBhcnJheSBpbmRleCAoc2VlIGV4YW1wbGUpLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXMgLSB0aGUgb2JqZWN0IHdpdGggYXJyYXlzIG9mIHZhbHVlc1xuICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRUeXBlIC0gdGhlIGRlZmF1bHQgdHlwZSBmb3IgdGhlIGxvY2FsaXplIGZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbaW5kZXhDYWxsYmFja10gLSB0aGUgY2FsbGJhY2sgd2hpY2ggdGFrZXMgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiBhcmd1bWVudFxuICogICBhbmQgY29udmVydHMgaXQgaW50byB2YWx1ZSBhcnJheSBpbmRleFxuICogQHJldHVybnMge0Z1bmN0aW9ufSB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciB0aW1lT2ZEYXlWYWx1ZXMgPSB7XG4gKiAgIHVwcGVyY2FzZTogWydBTScsICdQTSddLFxuICogICBsb3dlcmNhc2U6IFsnYW0nLCAncG0nXSxcbiAqICAgbG9uZzogWydhLm0uJywgJ3AubS4nXVxuICogfVxuICogbG9jYWxlLmxvY2FsaXplLnRpbWVPZkRheSA9IGJ1aWxkTG9jYWxpemVGbih0aW1lT2ZEYXlWYWx1ZXMsICdsb25nJywgZnVuY3Rpb24gKGhvdXJzKSB7XG4gKiAgIC8vIDAgaXMgYS5tLiBhcnJheSBpbmRleCwgMSBpcyBwLm0uIGFycmF5IGluZGV4XG4gKiAgIHJldHVybiAoaG91cnMgLyAxMikgPj0gMSA/IDEgOiAwXG4gKiB9KVxuICogbG9jYWxlLmxvY2FsaXplLnRpbWVPZkRheSgxNiwge3R5cGU6ICd1cHBlcmNhc2UnfSkgLy89PiAnUE0nXG4gKiBsb2NhbGUubG9jYWxpemUudGltZU9mRGF5KDUpIC8vPT4gJ2EubS4nXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVGbiAodmFsdWVzLCBkZWZhdWx0VHlwZSwgaW5kZXhDYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24gKGRpcnR5SW5kZXgsIGRpcnR5T3B0aW9ucykge1xuICAgIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlID8gU3RyaW5nKG9wdGlvbnMudHlwZSkgOiBkZWZhdWx0VHlwZTtcbiAgICB2YXIgdmFsdWVzQXJyYXkgPSB2YWx1ZXNbdHlwZV0gfHwgdmFsdWVzW2RlZmF1bHRUeXBlXTtcbiAgICB2YXIgaW5kZXggPSBpbmRleENhbGxiYWNrID8gaW5kZXhDYWxsYmFjayhOdW1iZXIoZGlydHlJbmRleCkpIDogTnVtYmVyKGRpcnR5SW5kZXgpO1xuICAgIHJldHVybiB2YWx1ZXNBcnJheVtpbmRleF1cbiAgfVxufVxuXG4vKipcbiAqIEBuYW1lIGJ1aWxkTG9jYWxpemVBcnJheUZuXG4gKiBAY2F0ZWdvcnkgTG9jYWxlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEJ1aWxkIGBsb2NhbGl6ZS53ZWVrZGF5c2AsIGBsb2NhbGl6ZS5tb250aHNgIGFuZCBgbG9jYWxpemUudGltZXNPZkRheWAgcHJvcGVydGllcyBmb3IgdGhlIGxvY2FsZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEJ1aWxkIGBsb2NhbGl6ZS53ZWVrZGF5c2AsIGBsb2NhbGl6ZS5tb250aHNgIGFuZCBgbG9jYWxpemUudGltZXNPZkRheWAgcHJvcGVydGllcyBmb3IgdGhlIGxvY2FsZS5cbiAqIElmIG5vIGB0eXBlYCBpcyBzdXBwbGllZCB0byB0aGUgb3B0aW9ucyBvZiB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uLCBgZGVmYXVsdFR5cGVgIHdpbGwgYmUgdXNlZCAoc2VlIGV4YW1wbGUpLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXMgLSB0aGUgb2JqZWN0IHdpdGggYXJyYXlzIG9mIHZhbHVlc1xuICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRUeXBlIC0gdGhlIGRlZmF1bHQgdHlwZSBmb3IgdGhlIGxvY2FsaXplIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IHRoZSByZXN1bHRpbmcgZnVuY3Rpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIHdlZWtkYXlWYWx1ZXMgPSB7XG4gKiAgIG5hcnJvdzogWydTdScsICdNbycsICdUdScsICdXZScsICdUaCcsICdGcicsICdTYSddLFxuICogICBzaG9ydDogWydTdW4nLCAnTW9uJywgJ1R1ZScsICdXZWQnLCAnVGh1JywgJ0ZyaScsICdTYXQnXSxcbiAqICAgbG9uZzogWydTdW5kYXknLCAnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheSddXG4gKiB9XG4gKiBsb2NhbGUubG9jYWxpemUud2Vla2RheXMgPSBidWlsZExvY2FsaXplQXJyYXlGbih3ZWVrZGF5VmFsdWVzLCAnbG9uZycpXG4gKiBsb2NhbGUubG9jYWxpemUud2Vla2RheXMoe3R5cGU6ICduYXJyb3cnfSkgLy89PiBbJ1N1JywgJ01vJywgLi4uXVxuICogbG9jYWxlLmxvY2FsaXplLndlZWtkYXlzKCkgLy89PiBbJ1N1bmRheScsICdNb25kYXknLCAuLi5dXG4gKi9cbmZ1bmN0aW9uIGJ1aWxkTG9jYWxpemVBcnJheUZuICh2YWx1ZXMsIGRlZmF1bHRUeXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlPcHRpb25zKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gICAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGUgPyBTdHJpbmcob3B0aW9ucy50eXBlKSA6IGRlZmF1bHRUeXBlO1xuICAgIHJldHVybiB2YWx1ZXNbdHlwZV0gfHwgdmFsdWVzW2RlZmF1bHRUeXBlXVxuICB9XG59XG5cbi8vIE5vdGU6IGluIEVuZ2xpc2gsIHRoZSBuYW1lcyBvZiBkYXlzIG9mIHRoZSB3ZWVrIGFuZCBtb250aHMgYXJlIGNhcGl0YWxpemVkLlxuLy8gSWYgeW91IGFyZSBtYWtpbmcgYSBuZXcgbG9jYWxlIGJhc2VkIG9uIHRoaXMgb25lLCBjaGVjayBpZiB0aGUgc2FtZSBpcyB0cnVlIGZvciB0aGUgbGFuZ3VhZ2UgeW91J3JlIHdvcmtpbmcgb24uXG4vLyBHZW5lcmFsbHksIGZvcm1hdHRlZCBkYXRlcyBzaG91bGQgbG9vayBsaWtlIHRoZXkgYXJlIGluIHRoZSBtaWRkbGUgb2YgYSBzZW50ZW5jZSxcbi8vIGUuZy4gaW4gU3BhbmlzaCBsYW5ndWFnZSB0aGUgd2Vla2RheXMgYW5kIG1vbnRocyBzaG91bGQgYmUgaW4gdGhlIGxvd2VyY2FzZS5cbnZhciB3ZWVrZGF5VmFsdWVzID0ge1xuICBuYXJyb3c6IFsnU3UnLCAnTW8nLCAnVHUnLCAnV2UnLCAnVGgnLCAnRnInLCAnU2EnXSxcbiAgc2hvcnQ6IFsnU3VuJywgJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0J10sXG4gIGxvbmc6IFsnU3VuZGF5JywgJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknXVxufTtcblxudmFyIG1vbnRoVmFsdWVzID0ge1xuICBzaG9ydDogWydKYW4nLCAnRmViJywgJ01hcicsICdBcHInLCAnTWF5JywgJ0p1bicsICdKdWwnLCAnQXVnJywgJ1NlcCcsICdPY3QnLCAnTm92JywgJ0RlYyddLFxuICBsb25nOiBbJ0phbnVhcnknLCAnRmVicnVhcnknLCAnTWFyY2gnLCAnQXByaWwnLCAnTWF5JywgJ0p1bmUnLCAnSnVseScsICdBdWd1c3QnLCAnU2VwdGVtYmVyJywgJ09jdG9iZXInLCAnTm92ZW1iZXInLCAnRGVjZW1iZXInXVxufTtcblxuLy8gYHRpbWVPZkRheWAgaXMgdXNlZCB0byBkZXNpZ25hdGUgd2hpY2ggcGFydCBvZiB0aGUgZGF5IGl0IGlzLCB3aGVuIHVzZWQgd2l0aCAxMi1ob3VyIGNsb2NrLlxuLy8gVXNlIHRoZSBzeXN0ZW0gd2hpY2ggaXMgdXNlZCB0aGUgbW9zdCBjb21tb25seSBpbiB0aGUgbG9jYWxlLlxuLy8gRm9yIGV4YW1wbGUsIGlmIHRoZSBjb3VudHJ5IGRvZXNuJ3QgdXNlIGEubS4vcC5tLiwgeW91IGNhbiB1c2UgYG5pZ2h0YC9gbW9ybmluZ2AvYGFmdGVybm9vbmAvYGV2ZW5pbmdgOlxuLy9cbi8vICAgdmFyIHRpbWVPZkRheVZhbHVlcyA9IHtcbi8vICAgICBhbnk6IFsnaW4gdGhlIG5pZ2h0JywgJ2luIHRoZSBtb3JuaW5nJywgJ2luIHRoZSBhZnRlcm5vb24nLCAnaW4gdGhlIGV2ZW5pbmcnXVxuLy8gICB9XG4vL1xuLy8gQW5kIGxhdGVyOlxuLy9cbi8vICAgdmFyIGxvY2FsaXplID0ge1xuLy8gICAgIC8vIFRoZSBjYWxsYmFjayB0YWtlcyB0aGUgaG91cnMgYXMgdGhlIGFyZ3VtZW50IGFuZCByZXR1cm5zIHRoZSBhcnJheSBpbmRleFxuLy8gICAgIHRpbWVPZkRheTogYnVpbGRMb2NhbGl6ZUZuKHRpbWVPZkRheVZhbHVlcywgJ2FueScsIGZ1bmN0aW9uIChob3Vycykge1xuLy8gICAgICAgaWYgKGhvdXJzID49IDE3KSB7XG4vLyAgICAgICAgIHJldHVybiAzXG4vLyAgICAgICB9IGVsc2UgaWYgKGhvdXJzID49IDEyKSB7XG4vLyAgICAgICAgIHJldHVybiAyXG4vLyAgICAgICB9IGVsc2UgaWYgKGhvdXJzID49IDQpIHtcbi8vICAgICAgICAgcmV0dXJuIDFcbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHJldHVybiAwXG4vLyAgICAgICB9XG4vLyAgICAgfSksXG4vLyAgICAgdGltZXNPZkRheTogYnVpbGRMb2NhbGl6ZUFycmF5Rm4odGltZU9mRGF5VmFsdWVzLCAnYW55Jylcbi8vICAgfVxudmFyIHRpbWVPZkRheVZhbHVlcyA9IHtcbiAgdXBwZXJjYXNlOiBbJ0FNJywgJ1BNJ10sXG4gIGxvd2VyY2FzZTogWydhbScsICdwbSddLFxuICBsb25nOiBbJ2EubS4nLCAncC5tLiddXG59O1xuXG5mdW5jdGlvbiBvcmRpbmFsTnVtYmVyIChkaXJ0eU51bWJlciwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBudW1iZXIgPSBOdW1iZXIoZGlydHlOdW1iZXIpO1xuXG4gIC8vIElmIG9yZGluYWwgbnVtYmVycyBkZXBlbmQgb24gY29udGV4dCwgZm9yIGV4YW1wbGUsXG4gIC8vIGlmIHRoZXkgYXJlIGRpZmZlcmVudCBmb3IgZGlmZmVyZW50IGdyYW1tYXRpY2FsIGdlbmRlcnMsXG4gIC8vIHVzZSBgb3B0aW9ucy51bml0YDpcbiAgLy9cbiAgLy8gICB2YXIgb3B0aW9ucyA9IGRpcnR5T3B0aW9ucyB8fCB7fVxuICAvLyAgIHZhciB1bml0ID0gU3RyaW5nKG9wdGlvbnMudW5pdClcbiAgLy9cbiAgLy8gd2hlcmUgYHVuaXRgIGNhbiBiZSAnbW9udGgnLCAncXVhcnRlcicsICd3ZWVrJywgJ2lzb1dlZWsnLCAnZGF5T2ZZZWFyJyxcbiAgLy8gJ2RheU9mTW9udGgnIG9yICdkYXlPZldlZWsnXG5cbiAgdmFyIHJlbTEwMCA9IG51bWJlciAlIDEwMDtcbiAgaWYgKHJlbTEwMCA+IDIwIHx8IHJlbTEwMCA8IDEwKSB7XG4gICAgc3dpdGNoIChyZW0xMDAgJSAxMCkge1xuICAgICAgY2FzZSAxOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3N0J1xuICAgICAgY2FzZSAyOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ25kJ1xuICAgICAgY2FzZSAzOlxuICAgICAgICByZXR1cm4gbnVtYmVyICsgJ3JkJ1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVtYmVyICsgJ3RoJ1xufVxuXG52YXIgbG9jYWxpemUgPSB7XG4gIG9yZGluYWxOdW1iZXI6IG9yZGluYWxOdW1iZXIsXG4gIHdlZWtkYXk6IGJ1aWxkTG9jYWxpemVGbih3ZWVrZGF5VmFsdWVzLCAnbG9uZycpLFxuICB3ZWVrZGF5czogYnVpbGRMb2NhbGl6ZUFycmF5Rm4od2Vla2RheVZhbHVlcywgJ2xvbmcnKSxcbiAgbW9udGg6IGJ1aWxkTG9jYWxpemVGbihtb250aFZhbHVlcywgJ2xvbmcnKSxcbiAgbW9udGhzOiBidWlsZExvY2FsaXplQXJyYXlGbihtb250aFZhbHVlcywgJ2xvbmcnKSxcbiAgdGltZU9mRGF5OiBidWlsZExvY2FsaXplRm4odGltZU9mRGF5VmFsdWVzLCAnbG9uZycsIGZ1bmN0aW9uIChob3Vycykge1xuICAgIHJldHVybiAoaG91cnMgLyAxMikgPj0gMSA/IDEgOiAwXG4gIH0pLFxuICB0aW1lc09mRGF5OiBidWlsZExvY2FsaXplQXJyYXlGbih0aW1lT2ZEYXlWYWx1ZXMsICdsb25nJylcbn07XG5cbi8qKlxuICogQG5hbWUgYnVpbGRNYXRjaEZuXG4gKiBAY2F0ZWdvcnkgTG9jYWxlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEJ1aWxkIGBtYXRjaC53ZWVrZGF5c2AsIGBtYXRjaC5tb250aHNgIGFuZCBgbWF0Y2gudGltZXNPZkRheWAgcHJvcGVydGllcyBmb3IgdGhlIGxvY2FsZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEJ1aWxkIGBtYXRjaC53ZWVrZGF5c2AsIGBtYXRjaC5tb250aHNgIGFuZCBgbWF0Y2gudGltZXNPZkRheWAgcHJvcGVydGllcyBmb3IgdGhlIGxvY2FsZSB1c2VkIGJ5IGBwYXJzZWAgZnVuY3Rpb24uXG4gKiBJZiBubyBgdHlwZWAgaXMgc3VwcGxpZWQgdG8gdGhlIG9wdGlvbnMgb2YgdGhlIHJlc3VsdGluZyBmdW5jdGlvbiwgYGRlZmF1bHRUeXBlYCB3aWxsIGJlIHVzZWQgKHNlZSBleGFtcGxlKS5cbiAqIFRoZSByZXN1bHQgb2YgdGhlIG1hdGNoIGZ1bmN0aW9uIHdpbGwgYmUgcGFzc2VkIGludG8gY29ycmVzcG9uZGluZyBwYXJzZXIgZnVuY3Rpb25cbiAqIChgbWF0Y2gud2Vla2RheWAsIGBtYXRjaC5tb250aGAgb3IgYG1hdGNoLnRpbWVPZkRheWAgcmVzcGVjdGl2ZWx5LiBTZWUgYGJ1aWxkUGFyc2VGbmApLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWx1ZXMgLSB0aGUgb2JqZWN0IHdpdGggUmVnRXhwc1xuICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRUeXBlIC0gdGhlIGRlZmF1bHQgdHlwZSBmb3IgdGhlIG1hdGNoIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IHRoZSByZXN1bHRpbmcgZnVuY3Rpb25cbiAqXG4gKiBAZXhhbXBsZVxuICogdmFyIG1hdGNoV2Vla2RheXNQYXR0ZXJucyA9IHtcbiAqICAgbmFycm93OiAvXihzdXxtb3x0dXx3ZXx0aHxmcnxzYSkvaSxcbiAqICAgc2hvcnQ6IC9eKHN1bnxtb258dHVlfHdlZHx0aHV8ZnJpfHNhdCkvaSxcbiAqICAgbG9uZzogL14oc3VuZGF5fG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXkpL2lcbiAqIH1cbiAqIGxvY2FsZS5tYXRjaC53ZWVrZGF5cyA9IGJ1aWxkTWF0Y2hGbihtYXRjaFdlZWtkYXlzUGF0dGVybnMsICdsb25nJylcbiAqIGxvY2FsZS5tYXRjaC53ZWVrZGF5cygnU3VuZGF5Jywge3R5cGU6ICduYXJyb3cnfSkgLy89PiBbJ1N1JywgJ1N1JywgLi4uXVxuICogbG9jYWxlLm1hdGNoLndlZWtkYXlzKCdTdW5kYXknKSAvLz0+IFsnU3VuZGF5JywgJ1N1bmRheScsIC4uLl1cbiAqL1xuZnVuY3Rpb24gYnVpbGRNYXRjaEZuIChwYXR0ZXJucywgZGVmYXVsdFR5cGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChkaXJ0eVN0cmluZywgZGlydHlPcHRpb25zKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBkaXJ0eU9wdGlvbnMgfHwge307XG4gICAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGUgPyBTdHJpbmcob3B0aW9ucy50eXBlKSA6IGRlZmF1bHRUeXBlO1xuICAgIHZhciBwYXR0ZXJuID0gcGF0dGVybnNbdHlwZV0gfHwgcGF0dGVybnNbZGVmYXVsdFR5cGVdO1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcoZGlydHlTdHJpbmcpO1xuICAgIHJldHVybiBzdHJpbmcubWF0Y2gocGF0dGVybilcbiAgfVxufVxuXG4vKipcbiAqIEBuYW1lIGJ1aWxkUGFyc2VGblxuICogQGNhdGVnb3J5IExvY2FsZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBCdWlsZCBgbWF0Y2gud2Vla2RheWAsIGBtYXRjaC5tb250aGAgYW5kIGBtYXRjaC50aW1lT2ZEYXlgIHByb3BlcnRpZXMgZm9yIHRoZSBsb2NhbGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBCdWlsZCBgbWF0Y2gud2Vla2RheWAsIGBtYXRjaC5tb250aGAgYW5kIGBtYXRjaC50aW1lT2ZEYXlgIHByb3BlcnRpZXMgZm9yIHRoZSBsb2NhbGUgdXNlZCBieSBgcGFyc2VgIGZ1bmN0aW9uLlxuICogVGhlIGFyZ3VtZW50IG9mIHRoZSByZXN1bHRpbmcgZnVuY3Rpb24gaXMgdGhlIHJlc3VsdCBvZiB0aGUgY29ycmVzcG9uZGluZyBtYXRjaCBmdW5jdGlvblxuICogKGBtYXRjaC53ZWVrZGF5c2AsIGBtYXRjaC5tb250aHNgIG9yIGBtYXRjaC50aW1lc09mRGF5YCByZXNwZWN0aXZlbHkuIFNlZSBgYnVpbGRNYXRjaEZuYCkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbHVlcyAtIHRoZSBvYmplY3Qgd2l0aCBhcnJheXMgb2YgUmVnRXhwc1xuICogQHBhcmFtIHtTdHJpbmd9IGRlZmF1bHRUeXBlIC0gdGhlIGRlZmF1bHQgdHlwZSBmb3IgdGhlIHBhcnNlciBmdW5jdGlvblxuICogQHJldHVybnMge0Z1bmN0aW9ufSB0aGUgcmVzdWx0aW5nIGZ1bmN0aW9uXG4gKlxuICogQGV4YW1wbGVcbiAqIHZhciBwYXJzZVdlZWtkYXlQYXR0ZXJucyA9IHtcbiAqICAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXVxuICogfVxuICogbG9jYWxlLm1hdGNoLndlZWtkYXkgPSBidWlsZFBhcnNlRm4obWF0Y2hXZWVrZGF5c1BhdHRlcm5zLCAnbG9uZycpXG4gKiB2YXIgbWF0Y2hSZXN1bHQgPSBsb2NhbGUubWF0Y2gud2Vla2RheXMoJ0ZyaWRheScpXG4gKiBsb2NhbGUubWF0Y2gud2Vla2RheShtYXRjaFJlc3VsdCkgLy89PiA1XG4gKi9cbmZ1bmN0aW9uIGJ1aWxkUGFyc2VGbiAocGF0dGVybnMsIGRlZmF1bHRUeXBlKSB7XG4gIHJldHVybiBmdW5jdGlvbiAobWF0Y2hSZXN1bHQsIGRpcnR5T3B0aW9ucykge1xuICAgIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlID8gU3RyaW5nKG9wdGlvbnMudHlwZSkgOiBkZWZhdWx0VHlwZTtcbiAgICB2YXIgcGF0dGVybnNBcnJheSA9IHBhdHRlcm5zW3R5cGVdIHx8IHBhdHRlcm5zW2RlZmF1bHRUeXBlXTtcbiAgICB2YXIgc3RyaW5nID0gbWF0Y2hSZXN1bHRbMV07XG5cbiAgICByZXR1cm4gcGF0dGVybnNBcnJheS5maW5kSW5kZXgoZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgIHJldHVybiBwYXR0ZXJuLnRlc3Qoc3RyaW5nKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBAbmFtZSBidWlsZE1hdGNoUGF0dGVybkZuXG4gKiBAY2F0ZWdvcnkgTG9jYWxlIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEJ1aWxkIG1hdGNoIGZ1bmN0aW9uIGZyb20gYSBzaW5nbGUgUmVnRXhwLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQnVpbGQgbWF0Y2ggZnVuY3Rpb24gZnJvbSBhIHNpbmdsZSBSZWdFeHAuXG4gKiBVc3VhbGx5IHVzZWQgZm9yIGJ1aWxkaW5nIGBtYXRjaC5vcmRpbmFsTnVtYmVyc2AgcHJvcGVydHkgb2YgdGhlIGxvY2FsZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcGF0dGVybiAtIHRoZSBSZWdFeHBcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gdGhlIHJlc3VsdGluZyBmdW5jdGlvblxuICpcbiAqIEBleGFtcGxlXG4gKiBsb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcnMgPSBidWlsZE1hdGNoUGF0dGVybkZuKC9eKFxcZCspKHRofHN0fG5kfHJkKT8vaSlcbiAqIGxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVycygnM3JkJykgLy89PiBbJzNyZCcsICczJywgJ3JkJywgLi4uXVxuICovXG5mdW5jdGlvbiBidWlsZE1hdGNoUGF0dGVybkZuIChwYXR0ZXJuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoZGlydHlTdHJpbmcpIHtcbiAgICB2YXIgc3RyaW5nID0gU3RyaW5nKGRpcnR5U3RyaW5nKTtcbiAgICByZXR1cm4gc3RyaW5nLm1hdGNoKHBhdHRlcm4pXG4gIH1cbn1cblxuLyoqXG4gKiBAbmFtZSBwYXJzZURlY2ltYWxcbiAqIEBjYXRlZ29yeSBMb2NhbGUgSGVscGVyc1xuICogQHN1bW1hcnkgUGFyc2VzIHRoZSBtYXRjaCByZXN1bHQgaW50byBkZWNpbWFsIG51bWJlci5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFBhcnNlcyB0aGUgbWF0Y2ggcmVzdWx0IGludG8gZGVjaW1hbCBudW1iZXIuXG4gKiBVc2VzIHRoZSBzdHJpbmcgbWF0Y2hlZCB3aXRoIHRoZSBmaXJzdCBzZXQgb2YgcGFyZW50aGVzZXMgb2YgbWF0Y2ggUmVnRXhwLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IG1hdGNoUmVzdWx0IC0gdGhlIG9iamVjdCByZXR1cm5lZCBieSBtYXRjaGluZyBmdW5jdGlvblxuICogQHJldHVybnMge051bWJlcn0gdGhlIHBhcnNlZCB2YWx1ZVxuICpcbiAqIEBleGFtcGxlXG4gKiBsb2NhbGUubWF0Y2ggPSB7XG4gKiAgIG9yZGluYWxOdW1iZXJzOiAoZGlydHlTdHJpbmcpIHtcbiAqICAgICByZXR1cm4gU3RyaW5nKGRpcnR5U3RyaW5nKS5tYXRjaCgvXihcXGQrKSh0aHxzdHxuZHxyZCk/L2kpXG4gKiAgIH0sXG4gKiAgIG9yZGluYWxOdW1iZXI6IHBhcnNlRGVjaW1hbFxuICogfVxuICovXG5mdW5jdGlvbiBwYXJzZURlY2ltYWwgKG1hdGNoUmVzdWx0KSB7XG4gIHJldHVybiBwYXJzZUludChtYXRjaFJlc3VsdFsxXSwgMTApXG59XG5cbnZhciBtYXRjaE9yZGluYWxOdW1iZXJzUGF0dGVybiA9IC9eKFxcZCspKHRofHN0fG5kfHJkKT8vaTtcblxudmFyIG1hdGNoV2Vla2RheXNQYXR0ZXJucyA9IHtcbiAgbmFycm93OiAvXihzdXxtb3x0dXx3ZXx0aHxmcnxzYSkvaSxcbiAgc2hvcnQ6IC9eKHN1bnxtb258dHVlfHdlZHx0aHV8ZnJpfHNhdCkvaSxcbiAgbG9uZzogL14oc3VuZGF5fG1vbmRheXx0dWVzZGF5fHdlZG5lc2RheXx0aHVyc2RheXxmcmlkYXl8c2F0dXJkYXkpL2lcbn07XG5cbnZhciBwYXJzZVdlZWtkYXlQYXR0ZXJucyA9IHtcbiAgYW55OiBbL15zdS9pLCAvXm0vaSwgL150dS9pLCAvXncvaSwgL150aC9pLCAvXmYvaSwgL15zYS9pXVxufTtcblxudmFyIG1hdGNoTW9udGhzUGF0dGVybnMgPSB7XG4gIHNob3J0OiAvXihqYW58ZmVifG1hcnxhcHJ8bWF5fGp1bnxqdWx8YXVnfHNlcHxvY3R8bm92fGRlYykvaSxcbiAgbG9uZzogL14oamFudWFyeXxmZWJydWFyeXxtYXJjaHxhcHJpbHxtYXl8anVuZXxqdWx5fGF1Z3VzdHxzZXB0ZW1iZXJ8b2N0b2Jlcnxub3ZlbWJlcnxkZWNlbWJlcikvaVxufTtcblxudmFyIHBhcnNlTW9udGhQYXR0ZXJucyA9IHtcbiAgYW55OiBbL15qYS9pLCAvXmYvaSwgL15tYXIvaSwgL15hcC9pLCAvXm1heS9pLCAvXmp1bi9pLCAvXmp1bC9pLCAvXmF1L2ksIC9ecy9pLCAvXm8vaSwgL15uL2ksIC9eZC9pXVxufTtcblxuLy8gYHRpbWVPZkRheWAgaXMgdXNlZCB0byBkZXNpZ25hdGUgd2hpY2ggcGFydCBvZiB0aGUgZGF5IGl0IGlzLCB3aGVuIHVzZWQgd2l0aCAxMi1ob3VyIGNsb2NrLlxuLy8gVXNlIHRoZSBzeXN0ZW0gd2hpY2ggaXMgdXNlZCB0aGUgbW9zdCBjb21tb25seSBpbiB0aGUgbG9jYWxlLlxuLy8gRm9yIGV4YW1wbGUsIGlmIHRoZSBjb3VudHJ5IGRvZXNuJ3QgdXNlIGEubS4vcC5tLiwgeW91IGNhbiB1c2UgYG5pZ2h0YC9gbW9ybmluZ2AvYGFmdGVybm9vbmAvYGV2ZW5pbmdgOlxuLy9cbi8vICAgdmFyIG1hdGNoVGltZXNPZkRheVBhdHRlcm5zID0ge1xuLy8gICAgIGxvbmc6IC9eKChpbiB0aGUpPyAobmlnaHR8bW9ybmluZ3xhZnRlcm5vb258ZXZlbmluZz8pKS9pXG4vLyAgIH1cbi8vXG4vLyAgIHZhciBwYXJzZVRpbWVPZkRheVBhdHRlcm5zID0ge1xuLy8gICAgIGFueTogWy8obmlnaHR8bW9ybmluZykvaSwgLyhhZnRlcm5vb258ZXZlbmluZykvaV1cbi8vICAgfVxudmFyIG1hdGNoVGltZXNPZkRheVBhdHRlcm5zID0ge1xuICBzaG9ydDogL14oYW18cG0pL2ksXG4gIGxvbmc6IC9eKFthcF1cXC4/XFxzP21cXC4/KS9pXG59O1xuXG52YXIgcGFyc2VUaW1lT2ZEYXlQYXR0ZXJucyA9IHtcbiAgYW55OiBbL15hL2ksIC9ecC9pXVxufTtcblxudmFyIG1hdGNoID0ge1xuICBvcmRpbmFsTnVtYmVyczogYnVpbGRNYXRjaFBhdHRlcm5GbihtYXRjaE9yZGluYWxOdW1iZXJzUGF0dGVybiksXG4gIG9yZGluYWxOdW1iZXI6IHBhcnNlRGVjaW1hbCxcbiAgd2Vla2RheXM6IGJ1aWxkTWF0Y2hGbihtYXRjaFdlZWtkYXlzUGF0dGVybnMsICdsb25nJyksXG4gIHdlZWtkYXk6IGJ1aWxkUGFyc2VGbihwYXJzZVdlZWtkYXlQYXR0ZXJucywgJ2FueScpLFxuICBtb250aHM6IGJ1aWxkTWF0Y2hGbihtYXRjaE1vbnRoc1BhdHRlcm5zLCAnbG9uZycpLFxuICBtb250aDogYnVpbGRQYXJzZUZuKHBhcnNlTW9udGhQYXR0ZXJucywgJ2FueScpLFxuICB0aW1lc09mRGF5OiBidWlsZE1hdGNoRm4obWF0Y2hUaW1lc09mRGF5UGF0dGVybnMsICdsb25nJyksXG4gIHRpbWVPZkRheTogYnVpbGRQYXJzZUZuKHBhcnNlVGltZU9mRGF5UGF0dGVybnMsICdhbnknKVxufTtcblxuLyoqXG4gKiBAdHlwZSB7TG9jYWxlfVxuICogQGNhdGVnb3J5IExvY2FsZXNcbiAqIEBzdW1tYXJ5IEVuZ2xpc2ggbG9jYWxlIChVbml0ZWQgU3RhdGVzKS5cbiAqIEBsYW5ndWFnZSBFbmdsaXNoXG4gKiBAaXNvLTYzOS0yIGVuZ1xuICovXG52YXIgbG9jYWxlJDIgPSB7XG4gIGZvcm1hdERpc3RhbmNlOiBmb3JtYXREaXN0YW5jZSxcbiAgZm9ybWF0TG9uZzogZm9ybWF0TG9uZyxcbiAgZm9ybWF0UmVsYXRpdmU6IGZvcm1hdFJlbGF0aXZlLFxuICBsb2NhbGl6ZTogbG9jYWxpemUsXG4gIG1hdGNoOiBtYXRjaCxcbiAgb3B0aW9uczoge1xuICAgIHdlZWtTdGFydHNPbjogMCAvKiBTdW5kYXkgKi8sXG4gICAgZmlyc3RXZWVrQ29udGFpbnNEYXRlOiAxXG4gIH1cbn07XG5cbnZhciBNSUxMSVNFQ09ORFNfSU5fREFZJDEgPSA4NjQwMDAwMDtcblxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGEgcGFydCBvZiBwdWJsaWMgQVBJIHdoZW4gVVRDIGZ1bmN0aW9uIHdpbGwgYmUgaW1wbGVtZW50ZWQuXG4vLyBTZWUgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG5mdW5jdGlvbiBnZXRVVENEYXlPZlllYXIgKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKTtcbiAgdmFyIHRpbWVzdGFtcCA9IGRhdGUuZ2V0VGltZSgpO1xuICBkYXRlLnNldFVUQ01vbnRoKDAsIDEpO1xuICBkYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICB2YXIgc3RhcnRPZlllYXJUaW1lc3RhbXAgPSBkYXRlLmdldFRpbWUoKTtcbiAgdmFyIGRpZmZlcmVuY2UgPSB0aW1lc3RhbXAgLSBzdGFydE9mWWVhclRpbWVzdGFtcDtcbiAgcmV0dXJuIE1hdGguZmxvb3IoZGlmZmVyZW5jZSAvIE1JTExJU0VDT05EU19JTl9EQVkkMSkgKyAxXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhIHBhcnQgb2YgcHVibGljIEFQSSB3aGVuIFVUQyBmdW5jdGlvbiB3aWxsIGJlIGltcGxlbWVudGVkLlxuLy8gU2VlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuZnVuY3Rpb24gc3RhcnRPZlVUQ0lTT1dlZWsgKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciB3ZWVrU3RhcnRzT24gPSAxO1xuXG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKTtcbiAgdmFyIGRheSA9IGRhdGUuZ2V0VVRDRGF5KCk7XG4gIHZhciBkaWZmID0gKGRheSA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIHdlZWtTdGFydHNPbjtcblxuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgLSBkaWZmKTtcbiAgZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgcmV0dXJuIGRhdGVcbn1cblxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGEgcGFydCBvZiBwdWJsaWMgQVBJIHdoZW4gVVRDIGZ1bmN0aW9uIHdpbGwgYmUgaW1wbGVtZW50ZWQuXG4vLyBTZWUgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG5mdW5jdGlvbiBnZXRVVENJU09XZWVrWWVhciAoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpO1xuICB2YXIgeWVhciA9IGRhdGUuZ2V0VVRDRnVsbFllYXIoKTtcblxuICB2YXIgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhciA9IG5ldyBEYXRlKDApO1xuICBmb3VydGhPZkphbnVhcnlPZk5leHRZZWFyLnNldFVUQ0Z1bGxZZWFyKHllYXIgKyAxLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZOZXh0WWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZOZXh0WWVhciA9IHN0YXJ0T2ZVVENJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mTmV4dFllYXIsIGRpcnR5T3B0aW9ucyk7XG5cbiAgdmFyIGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIgPSBuZXcgRGF0ZSgwKTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhci5zZXRVVENGdWxsWWVhcih5ZWFyLCAwLCA0KTtcbiAgZm91cnRoT2ZKYW51YXJ5T2ZUaGlzWWVhci5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgdmFyIHN0YXJ0T2ZUaGlzWWVhciA9IHN0YXJ0T2ZVVENJU09XZWVrKGZvdXJ0aE9mSmFudWFyeU9mVGhpc1llYXIsIGRpcnR5T3B0aW9ucyk7XG5cbiAgaWYgKGRhdGUuZ2V0VGltZSgpID49IHN0YXJ0T2ZOZXh0WWVhci5nZXRUaW1lKCkpIHtcbiAgICByZXR1cm4geWVhciArIDFcbiAgfSBlbHNlIGlmIChkYXRlLmdldFRpbWUoKSA+PSBzdGFydE9mVGhpc1llYXIuZ2V0VGltZSgpKSB7XG4gICAgcmV0dXJuIHllYXJcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4geWVhciAtIDFcbiAgfVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgYSBwYXJ0IG9mIHB1YmxpYyBBUEkgd2hlbiBVVEMgZnVuY3Rpb24gd2lsbCBiZSBpbXBsZW1lbnRlZC5cbi8vIFNlZSBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zNzZcbmZ1bmN0aW9uIHN0YXJ0T2ZVVENJU09XZWVrWWVhciAoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIHllYXIgPSBnZXRVVENJU09XZWVrWWVhcihkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBmb3VydGhPZkphbnVhcnkgPSBuZXcgRGF0ZSgwKTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnkuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIHZhciBkYXRlID0gc3RhcnRPZlVUQ0lTT1dlZWsoZm91cnRoT2ZKYW51YXJ5LCBkaXJ0eU9wdGlvbnMpO1xuICByZXR1cm4gZGF0ZVxufVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX1dFRUskMiA9IDYwNDgwMDAwMDtcblxuLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGEgcGFydCBvZiBwdWJsaWMgQVBJIHdoZW4gVVRDIGZ1bmN0aW9uIHdpbGwgYmUgaW1wbGVtZW50ZWQuXG4vLyBTZWUgaXNzdWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG5mdW5jdGlvbiBnZXRVVENJU09XZWVrIChkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucykge1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBkaWZmID0gc3RhcnRPZlVUQ0lTT1dlZWsoZGF0ZSwgZGlydHlPcHRpb25zKS5nZXRUaW1lKCkgLSBzdGFydE9mVVRDSVNPV2Vla1llYXIoZGF0ZSwgZGlydHlPcHRpb25zKS5nZXRUaW1lKCk7XG5cbiAgLy8gUm91bmQgdGhlIG51bWJlciBvZiBkYXlzIHRvIHRoZSBuZWFyZXN0IGludGVnZXJcbiAgLy8gYmVjYXVzZSB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpbiBhIHdlZWsgaXMgbm90IGNvbnN0YW50XG4gIC8vIChlLmcuIGl0J3MgZGlmZmVyZW50IGluIHRoZSB3ZWVrIG9mIHRoZSBkYXlsaWdodCBzYXZpbmcgdGltZSBjbG9jayBzaGlmdClcbiAgcmV0dXJuIE1hdGgucm91bmQoZGlmZiAvIE1JTExJU0VDT05EU19JTl9XRUVLJDIpICsgMVxufVxuXG52YXIgZm9ybWF0dGVycyA9IHtcbiAgLy8gTW9udGg6IDEsIDIsIC4uLiwgMTJcbiAgJ00nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ01vbnRoKCkgKyAxXG4gIH0sXG5cbiAgLy8gTW9udGg6IDFzdCwgMm5kLCAuLi4sIDEydGhcbiAgJ01vJzogZnVuY3Rpb24gKGRhdGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgbW9udGggPSBkYXRlLmdldFVUQ01vbnRoKCkgKyAxO1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKG1vbnRoLCB7dW5pdDogJ21vbnRoJ30pXG4gIH0sXG5cbiAgLy8gTW9udGg6IDAxLCAwMiwgLi4uLCAxMlxuICAnTU0nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENNb250aCgpICsgMSwgMilcbiAgfSxcblxuICAvLyBNb250aDogSmFuLCBGZWIsIC4uLiwgRGVjXG4gICdNTU0nOiBmdW5jdGlvbiAoZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5tb250aChkYXRlLmdldFVUQ01vbnRoKCksIHt0eXBlOiAnc2hvcnQnfSlcbiAgfSxcblxuICAvLyBNb250aDogSmFudWFyeSwgRmVicnVhcnksIC4uLiwgRGVjZW1iZXJcbiAgJ01NTU0nOiBmdW5jdGlvbiAoZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5tb250aChkYXRlLmdldFVUQ01vbnRoKCksIHt0eXBlOiAnbG9uZyd9KVxuICB9LFxuXG4gIC8vIFF1YXJ0ZXI6IDEsIDIsIDMsIDRcbiAgJ1EnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBNYXRoLmNlaWwoKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEpIC8gMylcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxc3QsIDJuZCwgM3JkLCA0dGhcbiAgJ1FvJzogZnVuY3Rpb24gKGRhdGUsIG9wdGlvbnMpIHtcbiAgICB2YXIgcXVhcnRlciA9IE1hdGguY2VpbCgoZGF0ZS5nZXRVVENNb250aCgpICsgMSkgLyAzKTtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUub3JkaW5hbE51bWJlcihxdWFydGVyLCB7dW5pdDogJ3F1YXJ0ZXInfSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDEsIDIsIC4uLiwgMzFcbiAgJ0QnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0RhdGUoKVxuICB9LFxuXG4gIC8vIERheSBvZiBtb250aDogMXN0LCAybmQsIC4uLiwgMzFzdFxuICAnRG8nOiBmdW5jdGlvbiAoZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGRhdGUuZ2V0VVRDRGF0ZSgpLCB7dW5pdDogJ2RheU9mTW9udGgnfSlcbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDAxLCAwMiwgLi4uLCAzMVxuICAnREQnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENEYXRlKCksIDIpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHllYXI6IDEsIDIsIC4uLiwgMzY2XG4gICdEREQnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBnZXRVVENEYXlPZlllYXIoZGF0ZSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMXN0LCAybmQsIC4uLiwgMzY2dGhcbiAgJ0RERG8nOiBmdW5jdGlvbiAoZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS5vcmRpbmFsTnVtYmVyKGdldFVUQ0RheU9mWWVhcihkYXRlKSwge3VuaXQ6ICdkYXlPZlllYXInfSlcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMDAxLCAwMDIsIC4uLiwgMzY2XG4gICdEREREJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGdldFVUQ0RheU9mWWVhcihkYXRlKSwgMylcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3UsIE1vLCAuLi4sIFNhXG4gICdkZCc6IGZ1bmN0aW9uIChkYXRlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLmxvY2FsaXplLndlZWtkYXkoZGF0ZS5nZXRVVENEYXkoKSwge3R5cGU6ICduYXJyb3cnfSlcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuLCBNb24sIC4uLiwgU2F0XG4gICdkZGQnOiBmdW5jdGlvbiAoZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS53ZWVrZGF5KGRhdGUuZ2V0VVRDRGF5KCksIHt0eXBlOiAnc2hvcnQnfSlcbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuZGF5LCBNb25kYXksIC4uLiwgU2F0dXJkYXlcbiAgJ2RkZGQnOiBmdW5jdGlvbiAoZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS53ZWVrZGF5KGRhdGUuZ2V0VVRDRGF5KCksIHt0eXBlOiAnbG9uZyd9KVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiAwLCAxLCAuLi4sIDZcbiAgJ2QnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBkYXRlLmdldFVUQ0RheSgpXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IDB0aCwgMXN0LCAybmQsIC4uLiwgNnRoXG4gICdkbyc6IGZ1bmN0aW9uIChkYXRlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLmxvY2FsaXplLm9yZGluYWxOdW1iZXIoZGF0ZS5nZXRVVENEYXkoKSwge3VuaXQ6ICdkYXlPZldlZWsnfSlcbiAgfSxcblxuICAvLyBEYXkgb2YgSVNPIHdlZWs6IDEsIDIsIC4uLiwgN1xuICAnRSc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGRhdGUuZ2V0VVRDRGF5KCkgfHwgN1xuICB9LFxuXG4gIC8vIElTTyB3ZWVrOiAxLCAyLCAuLi4sIDUzXG4gICdXJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZ2V0VVRDSVNPV2VlayhkYXRlKVxuICB9LFxuXG4gIC8vIElTTyB3ZWVrOiAxc3QsIDJuZCwgLi4uLCA1M3RoXG4gICdXbyc6IGZ1bmN0aW9uIChkYXRlLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLmxvY2FsaXplLm9yZGluYWxOdW1iZXIoZ2V0VVRDSVNPV2VlayhkYXRlKSwge3VuaXQ6ICdpc29XZWVrJ30pXG4gIH0sXG5cbiAgLy8gSVNPIHdlZWs6IDAxLCAwMiwgLi4uLCA1M1xuICAnV1cnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZ2V0VVRDSVNPV2VlayhkYXRlKSwgMilcbiAgfSxcblxuICAvLyBZZWFyOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ1lZJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSwgNCkuc3Vic3RyKDIpXG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gICdZWVlZJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gYWRkTGVhZGluZ1plcm9zKGRhdGUuZ2V0VVRDRnVsbFllYXIoKSwgNClcbiAgfSxcblxuICAvLyBJU08gd2Vlay1udW1iZXJpbmcgeWVhcjogMDAsIDAxLCAuLi4sIDk5XG4gICdHRyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIFN0cmluZyhnZXRVVENJU09XZWVrWWVhcihkYXRlKSkuc3Vic3RyKDIpXG4gIH0sXG5cbiAgLy8gSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IDE5MDAsIDE5MDEsIC4uLiwgMjA5OVxuICAnR0dHRyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGdldFVUQ0lTT1dlZWtZZWFyKGRhdGUpXG4gIH0sXG5cbiAgLy8gSG91cjogMCwgMSwgLi4uIDIzXG4gICdIJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENIb3VycygpXG4gIH0sXG5cbiAgLy8gSG91cjogMDAsIDAxLCAuLi4sIDIzXG4gICdISCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ0hvdXJzKCksIDIpXG4gIH0sXG5cbiAgLy8gSG91cjogMSwgMiwgLi4uLCAxMlxuICAnaCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgdmFyIGhvdXJzID0gZGF0ZS5nZXRVVENIb3VycygpO1xuICAgIGlmIChob3VycyA9PT0gMCkge1xuICAgICAgcmV0dXJuIDEyXG4gICAgfSBlbHNlIGlmIChob3VycyA+IDEyKSB7XG4gICAgICByZXR1cm4gaG91cnMgJSAxMlxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gaG91cnNcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91cjogMDEsIDAyLCAuLi4sIDEyXG4gICdoaCc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhmb3JtYXR0ZXJzWydoJ10oZGF0ZSksIDIpXG4gIH0sXG5cbiAgLy8gTWludXRlOiAwLCAxLCAuLi4sIDU5XG4gICdtJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENNaW51dGVzKClcbiAgfSxcblxuICAvLyBNaW51dGU6IDAwLCAwMSwgLi4uLCA1OVxuICAnbW0nOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENNaW51dGVzKCksIDIpXG4gIH0sXG5cbiAgLy8gU2Vjb25kOiAwLCAxLCAuLi4sIDU5XG4gICdzJzogZnVuY3Rpb24gKGRhdGUpIHtcbiAgICByZXR1cm4gZGF0ZS5nZXRVVENTZWNvbmRzKClcbiAgfSxcblxuICAvLyBTZWNvbmQ6IDAwLCAwMSwgLi4uLCA1OVxuICAnc3MnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoZGF0ZS5nZXRVVENTZWNvbmRzKCksIDIpXG4gIH0sXG5cbiAgLy8gMS8xMCBvZiBzZWNvbmQ6IDAsIDEsIC4uLiwgOVxuICAnUyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoZGF0ZS5nZXRVVENNaWxsaXNlY29uZHMoKSAvIDEwMClcbiAgfSxcblxuICAvLyAxLzEwMCBvZiBzZWNvbmQ6IDAwLCAwMSwgLi4uLCA5OVxuICAnU1MnOiBmdW5jdGlvbiAoZGF0ZSkge1xuICAgIHJldHVybiBhZGRMZWFkaW5nWmVyb3MoTWF0aC5mbG9vcihkYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpIC8gMTApLCAyKVxuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kOiAwMDAsIDAwMSwgLi4uLCA5OTlcbiAgJ1NTUyc6IGZ1bmN0aW9uIChkYXRlKSB7XG4gICAgcmV0dXJuIGFkZExlYWRpbmdaZXJvcyhkYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpLCAzKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDE6MDAsICswMDowMCwgLi4uICsxMjowMFxuICAnWic6IGZ1bmN0aW9uIChkYXRlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHJldHVybiBmb3JtYXRUaW1lem9uZShvcmlnaW5hbERhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKSwgJzonKVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICAnWlonOiBmdW5jdGlvbiAoZGF0ZSwgb3B0aW9ucykge1xuICAgIHZhciBvcmlnaW5hbERhdGUgPSBvcHRpb25zLl9vcmlnaW5hbERhdGUgfHwgZGF0ZTtcbiAgICByZXR1cm4gZm9ybWF0VGltZXpvbmUob3JpZ2luYWxEYXRlLmdldFRpbWV6b25lT2Zmc2V0KCkpXG4gIH0sXG5cbiAgLy8gU2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMFxuICAnWCc6IGZ1bmN0aW9uIChkYXRlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHJldHVybiBNYXRoLmZsb29yKG9yaWdpbmFsRGF0ZS5nZXRUaW1lKCkgLyAxMDAwKVxuICB9LFxuXG4gIC8vIE1pbGxpc2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMDkwMFxuICAneCc6IGZ1bmN0aW9uIChkYXRlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9yaWdpbmFsRGF0ZSA9IG9wdGlvbnMuX29yaWdpbmFsRGF0ZSB8fCBkYXRlO1xuICAgIHJldHVybiBvcmlnaW5hbERhdGUuZ2V0VGltZSgpXG4gIH0sXG5cbiAgLy8gQU0sIFBNXG4gICdBJzogZnVuY3Rpb24gKGRhdGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUudGltZU9mRGF5KGRhdGUuZ2V0VVRDSG91cnMoKSwge3R5cGU6ICd1cHBlcmNhc2UnfSlcbiAgfSxcblxuICAvLyBhbSwgcG1cbiAgJ2EnOiBmdW5jdGlvbiAoZGF0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5sb2NhbGl6ZS50aW1lT2ZEYXkoZGF0ZS5nZXRVVENIb3VycygpLCB7dHlwZTogJ2xvd2VyY2FzZSd9KVxuICB9LFxuXG4gIC8vIGEubS4sIHAubS5cbiAgJ2FhJzogZnVuY3Rpb24gKGRhdGUsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubG9jYWxpemUudGltZU9mRGF5KGRhdGUuZ2V0VVRDSG91cnMoKSwge3R5cGU6ICdsb25nJ30pXG4gIH1cbn07XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWV6b25lIChvZmZzZXQsIGRlbGltZXRlcikge1xuICBkZWxpbWV0ZXIgPSBkZWxpbWV0ZXIgfHwgJyc7XG4gIHZhciBzaWduID0gb2Zmc2V0ID4gMCA/ICctJyA6ICcrJztcbiAgdmFyIGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gIHZhciBob3VycyA9IE1hdGguZmxvb3IoYWJzT2Zmc2V0IC8gNjApO1xuICB2YXIgbWludXRlcyA9IGFic09mZnNldCAlIDYwO1xuICByZXR1cm4gc2lnbiArIGFkZExlYWRpbmdaZXJvcyhob3VycywgMikgKyBkZWxpbWV0ZXIgKyBhZGRMZWFkaW5nWmVyb3MobWludXRlcywgMilcbn1cblxuZnVuY3Rpb24gYWRkTGVhZGluZ1plcm9zIChudW1iZXIsIHRhcmdldExlbmd0aCkge1xuICB2YXIgb3V0cHV0ID0gTWF0aC5hYnMobnVtYmVyKS50b1N0cmluZygpO1xuICB3aGlsZSAob3V0cHV0Lmxlbmd0aCA8IHRhcmdldExlbmd0aCkge1xuICAgIG91dHB1dCA9ICcwJyArIG91dHB1dDtcbiAgfVxuICByZXR1cm4gb3V0cHV0XG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhIHBhcnQgb2YgcHVibGljIEFQSSB3aGVuIFVUQyBmdW5jdGlvbiB3aWxsIGJlIGltcGxlbWVudGVkLlxuLy8gU2VlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuZnVuY3Rpb24gYWRkVVRDTWludXRlcyAoZGlydHlEYXRlLCBkaXJ0eUFtb3VudCwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBkYXRlID0gdG9EYXRlKGRpcnR5RGF0ZSwgZGlydHlPcHRpb25zKTtcbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudCk7XG4gIGRhdGUuc2V0VVRDTWludXRlcyhkYXRlLmdldFVUQ01pbnV0ZXMoKSArIGFtb3VudCk7XG4gIHJldHVybiBkYXRlXG59XG5cbnZhciBsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCA9IC8oXFxbW15bXSpdKXwoXFxcXCk/KExUU3xMVHxMTExMfExMTHxMTHxMfGxsbGx8bGxsfGxsfGwpL2c7XG52YXIgZGVmYXVsdEZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgPSAvKFxcW1teW10qXSl8KFxcXFwpPyh4fHNzfHN8bW18bXxoaHxofGRvfGRkZGR8ZGRkfGRkfGR8YWF8YXxaWnxafFlZWVl8WVl8WHxXb3xXV3xXfFNTU3xTU3xTfFFvfFF8TW98TU1NTXxNTU18TU18TXxISHxIfEdHR0d8R0d8RXxEb3xERERvfERERER8REREfEREfER8QXwuKS9nO1xuXG4vKipcbiAqIEBuYW1lIGZvcm1hdFxuICogQGNhdGVnb3J5IENvbW1vbiBIZWxwZXJzXG4gKiBAc3VtbWFyeSBGb3JtYXQgdGhlIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZXR1cm4gdGhlIGZvcm1hdHRlZCBkYXRlIHN0cmluZyBpbiB0aGUgZ2l2ZW4gZm9ybWF0LlxuICpcbiAqIEFjY2VwdGVkIHRva2VuczpcbiAqIHwgVW5pdCAgICAgICAgICAgICAgICAgICAgfCBUb2tlbiB8IFJlc3VsdCBleGFtcGxlcyAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLXxcbiAqIHwgTW9udGggICAgICAgICAgICAgICAgICAgfCBNICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNbyAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTSAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU0gICB8IEphbiwgRmViLCAuLi4sIERlYyAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBNTU1NICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyIHxcbiAqIHwgUXVhcnRlciAgICAgICAgICAgICAgICAgfCBRICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBRbyAgICB8IDFzdCwgMm5kLCAzcmQsIDR0aCAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgfCBEICAgICB8IDEsIDIsIC4uLiwgMzEgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBEbyAgICB8IDFzdCwgMm5kLCAuLi4sIDMxc3QgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBERCAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgfCBEREQgICB8IDEsIDIsIC4uLiwgMzY2ICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBERERvICB8IDFzdCwgMm5kLCAuLi4sIDM2NnRoICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBEREREICB8IDAwMSwgMDAyLCAuLi4sIDM2NiAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHdlZWsgICAgICAgICAgICAgfCBkICAgICB8IDAsIDEsIC4uLiwgNiAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkbyAgICB8IDB0aCwgMXN0LCAuLi4sIDZ0aCAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZCAgICB8IFN1LCBNbywgLi4uLCBTYSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZGQgICB8IFN1biwgTW9uLCAuLi4sIFNhdCAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBkZGRkICB8IFN1bmRheSwgTW9uZGF5LCAuLi4sIFNhdHVyZGF5ICAgIHxcbiAqIHwgRGF5IG9mIElTTyB3ZWVrICAgICAgICAgfCBFICAgICB8IDEsIDIsIC4uLiwgNyAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgSVNPIHdlZWsgICAgICAgICAgICAgICAgfCBXICAgICB8IDEsIDIsIC4uLiwgNTMgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBXbyAgICB8IDFzdCwgMm5kLCAuLi4sIDUzcmQgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBXVyAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgIHxcbiAqIHwgWWVhciAgICAgICAgICAgICAgICAgICAgfCBZWSAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBZWVlZICB8IDE5MDAsIDE5MDEsIC4uLiwgMjA5OSAgICAgICAgICAgIHxcbiAqIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgfCBHRyAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBHR0dHICB8IDE5MDAsIDE5MDEsIC4uLiwgMjA5OSAgICAgICAgICAgIHxcbiAqIHwgQU0vUE0gICAgICAgICAgICAgICAgICAgfCBBICAgICB8IEFNLCBQTSAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBhICAgICB8IGFtLCBwbSAgICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgSG91ciAgICAgICAgICAgICAgICAgICAgfCBIICAgICB8IDAsIDEsIC4uLiAyMyAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBISCAgICB8IDAwLCAwMSwgLi4uIDIzICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBoICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBoaCAgICB8IDAxLCAwMiwgLi4uLCAxMiAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWludXRlICAgICAgICAgICAgICAgICAgfCBtICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBtbSAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgfCBzICAgICB8IDAsIDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBzcyAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgMS8xMCBvZiBzZWNvbmQgICAgICAgICAgfCBTICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgMS8xMDAgb2Ygc2Vjb25kICAgICAgICAgfCBTUyAgICB8IDAwLCAwMSwgLi4uLCA5OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWlsbGlzZWNvbmQgICAgICAgICAgICAgfCBTU1MgICB8IDAwMCwgMDAxLCAuLi4sIDk5OSAgICAgICAgICAgICAgIHxcbiAqIHwgVGltZXpvbmUgICAgICAgICAgICAgICAgfCBaICAgICB8IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBaWiAgICB8IC0wMTAwLCArMDAwMCwgLi4uLCArMTIwMCAgICAgICAgIHxcbiAqIHwgU2Vjb25kcyB0aW1lc3RhbXAgICAgICAgfCBYICAgICB8IDUxMjk2OTUyMCAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTWlsbGlzZWNvbmRzIHRpbWVzdGFtcCAgfCB4ICAgICB8IDUxMjk2OTUyMDkwMCAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTG9uZyBmb3JtYXQgICAgICAgICAgICAgfCBMVCAgICB8IDA1OjMwIGEubS4gICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMVFMgICB8IDA1OjMwOjE1IGEubS4gICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMICAgICB8IDA3LzAyLzE5OTUgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBsICAgICB8IDcvMi8xOTk1ICAgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTCAgICB8IEp1bHkgMiAxOTk1ICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBsbCAgICB8IEp1bCAyIDE5OTUgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTEwgICB8IEp1bHkgMiAxOTk1IDA1OjMwIGEubS4gICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBsbGwgICB8IEp1bCAyIDE5OTUgMDU6MzAgYS5tLiAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBMTExMICB8IFN1bmRheSwgSnVseSAyIDE5OTUgMDU6MzAgYS5tLiAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCBsbGxsICB8IFN1biwgSnVsIDIgMTk5NSAwNTozMCBhLm0uICAgICAgIHxcbiAqXG4gKiBUaGUgY2hhcmFjdGVycyB3cmFwcGVkIGluIHNxdWFyZSBicmFja2V0cyBhcmUgZXNjYXBlZC5cbiAqXG4gKiBUaGUgcmVzdWx0IG1heSB2YXJ5IGJ5IGxvY2FsZS5cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBvcmlnaW5hbCBkYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0IC0gdGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnMuIFNlZSBbT3B0aW9uc117QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9PcHRpb25zfVxuICogQHBhcmFtIHswfDF8Mn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHBhc3NlZCB0byBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogQHBhcmFtIHtMb2NhbGV9IFtvcHRpb25zLmxvY2FsZT1kZWZhdWx0TG9jYWxlXSAtIHRoZSBsb2NhbGUgb2JqZWN0LiBTZWUgW0xvY2FsZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9Mb2NhbGV9XG4gKiBAcmV0dXJucyB7U3RyaW5nfSB0aGUgZm9ybWF0dGVkIGRhdGUgc3RyaW5nXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGxvY2FsaXplYCBwcm9wZXJ0eVxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMubG9jYWxlYCBtdXN0IGNvbnRhaW4gYGZvcm1hdExvbmdgIHByb3BlcnR5XG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAxMSBGZWJydWFyeSAyMDE0IGluIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogdmFyIHJlc3VsdCA9IGZvcm1hdChcbiAqICAgbmV3IERhdGUoMjAxNCwgMSwgMTEpLFxuICogICAnTU0vREQvWVlZWSdcbiAqIClcbiAqIC8vPT4gJzAyLzExLzIwMTQnXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFJlcHJlc2VudCAyIEp1bHkgMjAxNCBpbiBFc3BlcmFudG86XG4gKiBpbXBvcnQgeyBlb0xvY2FsZSB9IGZyb20gJ2RhdGUtZm5zL2xvY2FsZS9lbydcbiAqIHZhciByZXN1bHQgPSBmb3JtYXQoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIpLFxuICogICAnRG8gW2RlXSBNTU1NIFlZWVknLFxuICogICB7bG9jYWxlOiBlb0xvY2FsZX1cbiAqIClcbiAqIC8vPT4gJzItYSBkZSBqdWxpbyAyMDE0J1xuICovXG5mdW5jdGlvbiBmb3JtYXQgKGRpcnR5RGF0ZSwgZGlydHlGb3JtYXRTdHIsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcyIGFyZ3VtZW50cyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHByZXNlbnQnKVxuICB9XG5cbiAgdmFyIGZvcm1hdFN0ciA9IFN0cmluZyhkaXJ0eUZvcm1hdFN0cik7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuXG4gIHZhciBsb2NhbGUgPSBvcHRpb25zLmxvY2FsZSB8fCBsb2NhbGUkMjtcblxuICBpZiAoIWxvY2FsZS5sb2NhbGl6ZSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdsb2NhbGUgbXVzdCBjb250YWluIGxvY2FsaXplIHByb3BlcnR5JylcbiAgfVxuXG4gIGlmICghbG9jYWxlLmZvcm1hdExvbmcpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBmb3JtYXRMb25nIHByb3BlcnR5JylcbiAgfVxuXG4gIHZhciBsb2NhbGVGb3JtYXR0ZXJzID0gbG9jYWxlLmZvcm1hdHRlcnMgfHwge307XG4gIHZhciBmb3JtYXR0aW5nVG9rZW5zUmVnRXhwID0gbG9jYWxlLmZvcm1hdHRpbmdUb2tlbnNSZWdFeHAgfHwgZGVmYXVsdEZvcm1hdHRpbmdUb2tlbnNSZWdFeHA7XG4gIHZhciBmb3JtYXRMb25nID0gbG9jYWxlLmZvcm1hdExvbmc7XG5cbiAgdmFyIG9yaWdpbmFsRGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUsIG9wdGlvbnMpO1xuXG4gIGlmICghaXNWYWxpZChvcmlnaW5hbERhdGUsIG9wdGlvbnMpKSB7XG4gICAgcmV0dXJuICdJbnZhbGlkIERhdGUnXG4gIH1cblxuICAvLyBDb252ZXJ0IHRoZSBkYXRlIGluIHN5c3RlbSB0aW1lem9uZSB0byB0aGUgc2FtZSBkYXRlIGluIFVUQyswMDowMCB0aW1lem9uZS5cbiAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgd2hlbiBVVEMgZnVuY3Rpb25zIHdpbGwgYmUgaW1wbGVtZW50ZWQsIGxvY2FsZXMgd2lsbCBiZSBjb21wYXRpYmxlIHdpdGggdGhlbS5cbiAgLy8gU2VlIGFuIGlzc3VlIGFib3V0IFVUQyBmdW5jdGlvbnM6IGh0dHBzOi8vZ2l0aHViLmNvbS9kYXRlLWZucy9kYXRlLWZucy9pc3N1ZXMvMzc2XG4gIHZhciB0aW1lem9uZU9mZnNldCA9IG9yaWdpbmFsRGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpO1xuICB2YXIgdXRjRGF0ZSA9IGFkZFVUQ01pbnV0ZXMob3JpZ2luYWxEYXRlLCAtdGltZXpvbmVPZmZzZXQsIG9wdGlvbnMpO1xuXG4gIHZhciBmb3JtYXR0ZXJPcHRpb25zID0gY2xvbmVPYmplY3Qob3B0aW9ucyk7XG4gIGZvcm1hdHRlck9wdGlvbnMubG9jYWxlID0gbG9jYWxlO1xuICBmb3JtYXR0ZXJPcHRpb25zLmZvcm1hdHRlcnMgPSBmb3JtYXR0ZXJzO1xuXG4gIC8vIFdoZW4gVVRDIGZ1bmN0aW9ucyB3aWxsIGJlIGltcGxlbWVudGVkLCBvcHRpb25zLl9vcmlnaW5hbERhdGUgd2lsbCBsaWtlbHkgYmUgYSBwYXJ0IG9mIHB1YmxpYyBBUEkuXG4gIC8vIFJpZ2h0IG5vdywgcGxlYXNlIGRvbid0IHVzZSBpdCBpbiBsb2NhbGVzLiBJZiB5b3UgaGF2ZSB0byB1c2UgYW4gb3JpZ2luYWwgZGF0ZSxcbiAgLy8gcGxlYXNlIHJlc3RvcmUgaXQgZnJvbSBgZGF0ZWAsIGFkZGluZyBhIHRpbWV6b25lIG9mZnNldCB0byBpdC5cbiAgZm9ybWF0dGVyT3B0aW9ucy5fb3JpZ2luYWxEYXRlID0gb3JpZ2luYWxEYXRlO1xuXG4gIHZhciByZXN1bHQgPSBmb3JtYXRTdHJcbiAgICAucmVwbGFjZShsb25nRm9ybWF0dGluZ1Rva2Vuc1JlZ0V4cCwgZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgaWYgKHN1YnN0cmluZ1swXSA9PT0gJ1snKSB7XG4gICAgICAgIHJldHVybiBzdWJzdHJpbmdcbiAgICAgIH1cblxuICAgICAgaWYgKHN1YnN0cmluZ1swXSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgIHJldHVybiBjbGVhbkVzY2FwZWRTdHJpbmcoc3Vic3RyaW5nKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZm9ybWF0TG9uZyhzdWJzdHJpbmcpXG4gICAgfSlcbiAgICAucmVwbGFjZShmb3JtYXR0aW5nVG9rZW5zUmVnRXhwLCBmdW5jdGlvbiAoc3Vic3RyaW5nKSB7XG4gICAgICB2YXIgZm9ybWF0dGVyID0gbG9jYWxlRm9ybWF0dGVyc1tzdWJzdHJpbmddIHx8IGZvcm1hdHRlcnNbc3Vic3RyaW5nXTtcblxuICAgICAgaWYgKGZvcm1hdHRlcikge1xuICAgICAgICByZXR1cm4gZm9ybWF0dGVyKHV0Y0RhdGUsIGZvcm1hdHRlck9wdGlvbnMpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY2xlYW5Fc2NhcGVkU3RyaW5nKHN1YnN0cmluZylcbiAgICAgIH1cbiAgICB9KTtcblxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGNsZWFuRXNjYXBlZFN0cmluZyAoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXFt8XSQvZywgJycpXG4gIH1cbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcXFwvZywgJycpXG59XG5cbi8qKlxuICogQG5hbWUgc3ViTWludXRlc1xuICogQGNhdGVnb3J5IE1pbnV0ZSBIZWxwZXJzXG4gKiBAc3VtbWFyeSBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaW51dGVzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBTdWJ0cmFjdCB0aGUgc3BlY2lmaWVkIG51bWJlciBvZiBtaW51dGVzIGZyb20gdGhlIGdpdmVuIGRhdGUuXG4gKlxuICogQHBhcmFtIHtEYXRlfFN0cmluZ3xOdW1iZXJ9IGRhdGUgLSB0aGUgZGF0ZSB0byBiZSBjaGFuZ2VkXG4gKiBAcGFyYW0ge051bWJlcn0gYW1vdW50IC0gdGhlIGFtb3VudCBvZiBtaW51dGVzIHRvIGJlIHN1YnRyYWN0ZWRcbiAqIEBwYXJhbSB7T3B0aW9uc30gW29wdGlvbnNdIC0gdGhlIG9iamVjdCB3aXRoIG9wdGlvbnMuIFNlZSBbT3B0aW9uc117QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy9PcHRpb25zfVxuICogQHBhcmFtIHswfDF8Mn0gW29wdGlvbnMuYWRkaXRpb25hbERpZ2l0cz0yXSAtIHBhc3NlZCB0byBgdG9EYXRlYC4gU2VlIFt0b0RhdGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvdG9EYXRlfVxuICogQHJldHVybnMge0RhdGV9IHRoZSBuZXcgZGF0ZSB3aXRoIHRoZSBtaW50dWVzIHN1YnRyYWN0ZWRcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIFN1YnRyYWN0IDMwIG1pbnV0ZXMgZnJvbSAxMCBKdWx5IDIwMTQgMTI6MDA6MDA6XG4gKiB2YXIgcmVzdWx0ID0gc3ViTWludXRlcyhuZXcgRGF0ZSgyMDE0LCA2LCAxMCwgMTIsIDApLCAzMClcbiAqIC8vPT4gVGh1IEp1bCAxMCAyMDE0IDExOjMwOjAwXG4gKi9cbmZ1bmN0aW9uIHN1Yk1pbnV0ZXMgKGRpcnR5RGF0ZSwgZGlydHlBbW91bnQsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcyIGFyZ3VtZW50cyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHByZXNlbnQnKVxuICB9XG5cbiAgdmFyIGFtb3VudCA9IE51bWJlcihkaXJ0eUFtb3VudCk7XG4gIHJldHVybiBhZGRNaW51dGVzKGRpcnR5RGF0ZSwgLWFtb3VudCwgZGlydHlPcHRpb25zKVxufVxuXG4vKipcbiAqIEBuYW1lIGlzQWZ0ZXJcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGZpcnN0IGRhdGUgYWZ0ZXIgdGhlIHNlY29uZCBvbmU/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBJcyB0aGUgZmlyc3QgZGF0ZSBhZnRlciB0aGUgc2Vjb25kIG9uZT9cbiAqXG4gKiBAcGFyYW0ge0RhdGV8U3RyaW5nfE51bWJlcn0gZGF0ZSAtIHRoZSBkYXRlIHRoYXQgc2hvdWxkIGJlIGFmdGVyIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlVG9Db21wYXJlIC0gdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zLiBTZWUgW09wdGlvbnNde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvT3B0aW9uc31cbiAqIEBwYXJhbSB7MHwxfDJ9IFtvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHM9Ml0gLSBwYXNzZWQgdG8gYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZmlyc3QgZGF0ZSBpcyBhZnRlciB0aGUgc2Vjb25kIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMiBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKlxuICogQGV4YW1wbGVcbiAqIC8vIElzIDEwIEp1bHkgMTk4OSBhZnRlciAxMSBGZWJydWFyeSAxOTg3P1xuICogdmFyIHJlc3VsdCA9IGlzQWZ0ZXIobmV3IERhdGUoMTk4OSwgNiwgMTApLCBuZXcgRGF0ZSgxOTg3LCAxLCAxMSkpXG4gKiAvLz0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNBZnRlciAoZGlydHlEYXRlLCBkaXJ0eURhdGVUb0NvbXBhcmUsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcyIGFyZ3VtZW50cyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHByZXNlbnQnKVxuICB9XG5cbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpO1xuICB2YXIgZGF0ZVRvQ29tcGFyZSA9IHRvRGF0ZShkaXJ0eURhdGVUb0NvbXBhcmUsIGRpcnR5T3B0aW9ucyk7XG4gIHJldHVybiBkYXRlLmdldFRpbWUoKSA+IGRhdGVUb0NvbXBhcmUuZ2V0VGltZSgpXG59XG5cbi8qKlxuICogQG5hbWUgaXNCZWZvcmVcbiAqIEBjYXRlZ29yeSBDb21tb24gSGVscGVyc1xuICogQHN1bW1hcnkgSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogSXMgdGhlIGZpcnN0IGRhdGUgYmVmb3JlIHRoZSBzZWNvbmQgb25lP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlIC0gdGhlIGRhdGUgdGhhdCBzaG91bGQgYmUgYmVmb3JlIHRoZSBvdGhlciBvbmUgdG8gcmV0dXJuIHRydWVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlVG9Db21wYXJlIC0gdGhlIGRhdGUgdG8gY29tcGFyZSB3aXRoXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zLiBTZWUgW09wdGlvbnNde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvT3B0aW9uc31cbiAqIEBwYXJhbSB7MHwxfDJ9IFtvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHM9Ml0gLSBwYXNzZWQgdG8gYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEByZXR1cm5zIHtCb29sZWFufSB0aGUgZmlyc3QgZGF0ZSBpcyBiZWZvcmUgdGhlIHNlY29uZCBkYXRlXG4gKiBAdGhyb3dzIHtUeXBlRXJyb3J9IDIgYXJndW1lbnRzIHJlcXVpcmVkXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzYCBtdXN0IGJlIDAsIDEgb3IgMlxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBJcyAxMCBKdWx5IDE5ODkgYmVmb3JlIDExIEZlYnJ1YXJ5IDE5ODc/XG4gKiB2YXIgcmVzdWx0ID0gaXNCZWZvcmUobmV3IERhdGUoMTk4OSwgNiwgMTApLCBuZXcgRGF0ZSgxOTg3LCAxLCAxMSkpXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmVmb3JlIChkaXJ0eURhdGUsIGRpcnR5RGF0ZVRvQ29tcGFyZSwgZGlydHlPcHRpb25zKSB7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJzIgYXJndW1lbnRzIHJlcXVpcmVkLCBidXQgb25seSAnICsgYXJndW1lbnRzLmxlbmd0aCArICcgcHJlc2VudCcpXG4gIH1cblxuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBkYXRlVG9Db21wYXJlID0gdG9EYXRlKGRpcnR5RGF0ZVRvQ29tcGFyZSwgZGlydHlPcHRpb25zKTtcbiAgcmV0dXJuIGRhdGUuZ2V0VGltZSgpIDwgZGF0ZVRvQ29tcGFyZS5nZXRUaW1lKClcbn1cblxuLyoqXG4gKiBAbmFtZSBpc0VxdWFsXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IEFyZSB0aGUgZ2l2ZW4gZGF0ZXMgZXF1YWw/XG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBBcmUgdGhlIGdpdmVuIGRhdGVzIGVxdWFsP1xuICpcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlTGVmdCAtIHRoZSBmaXJzdCBkYXRlIHRvIGNvbXBhcmVcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBkYXRlUmlnaHQgLSB0aGUgc2Vjb25kIGRhdGUgdG8gY29tcGFyZVxuICogQHBhcmFtIHtPcHRpb25zfSBbb3B0aW9uc10gLSB0aGUgb2JqZWN0IHdpdGggb3B0aW9ucy4gU2VlIFtPcHRpb25zXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL09wdGlvbnN9XG4gKiBAcGFyYW0gezB8MXwyfSBbb3B0aW9ucy5hZGRpdGlvbmFsRGlnaXRzPTJdIC0gcGFzc2VkIHRvIGB0b0RhdGVgLiBTZWUgW3RvRGF0ZV17QGxpbmsgaHR0cHM6Ly9kYXRlLWZucy5vcmcvZG9jcy90b0RhdGV9XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gdGhlIGRhdGVzIGFyZSBlcXVhbFxuICogQHRocm93cyB7VHlwZUVycm9yfSAyIGFyZ3VtZW50cyByZXF1aXJlZFxuICogQHRocm93cyB7UmFuZ2VFcnJvcn0gYG9wdGlvbnMuYWRkaXRpb25hbERpZ2l0c2AgbXVzdCBiZSAwLCAxIG9yIDJcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQXJlIDIgSnVseSAyMDE0IDA2OjMwOjQ1LjAwMCBhbmQgMiBKdWx5IDIwMTQgMDY6MzA6NDUuNTAwIGVxdWFsP1xuICogdmFyIHJlc3VsdCA9IGlzRXF1YWwoXG4gKiAgIG5ldyBEYXRlKDIwMTQsIDYsIDIsIDYsIDMwLCA0NSwgMClcbiAqICAgbmV3IERhdGUoMjAxNCwgNiwgMiwgNiwgMzAsIDQ1LCA1MDApXG4gKiApXG4gKiAvLz0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRXF1YWwkMSAoZGlydHlMZWZ0RGF0ZSwgZGlydHlSaWdodERhdGUsIGRpcnR5T3B0aW9ucykge1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCcyIGFyZ3VtZW50cyByZXF1aXJlZCwgYnV0IG9ubHkgJyArIGFyZ3VtZW50cy5sZW5ndGggKyAnIHByZXNlbnQnKVxuICB9XG5cbiAgdmFyIGRhdGVMZWZ0ID0gdG9EYXRlKGRpcnR5TGVmdERhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBkYXRlUmlnaHQgPSB0b0RhdGUoZGlydHlSaWdodERhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHJldHVybiBkYXRlTGVmdC5nZXRUaW1lKCkgPT09IGRhdGVSaWdodC5nZXRUaW1lKClcbn1cblxudmFyIHBhdHRlcm5zJDEgPSB7XG4gICdNJzogL14oMVswLTJdfDA/XFxkKS8sIC8vIDAgdG8gMTJcbiAgJ0QnOiAvXigzWzAtMV18WzAtMl0/XFxkKS8sIC8vIDAgdG8gMzFcbiAgJ0RERCc6IC9eKDM2WzAtNl18M1swLTVdXFxkfFswLTJdP1xcZD9cXGQpLywgLy8gMCB0byAzNjZcbiAgJ1cnOiAvXig1WzAtM118WzAtNF0/XFxkKS8sIC8vIDAgdG8gNTNcbiAgJ1lZWVknOiAvXihcXGR7MSw0fSkvLCAvLyAwIHRvIDk5OTlcbiAgJ0gnOiAvXigyWzAtM118WzAtMV0/XFxkKS8sIC8vIDAgdG8gMjNcbiAgJ20nOiAvXihbMC01XT9cXGQpLywgLy8gMCB0byA1OVxuICAnWic6IC9eKFsrLV0pKFxcZHsyfSk6KFxcZHsyfSkvLFxuICAnWlonOiAvXihbKy1dKShcXGR7Mn0pKFxcZHsyfSkvLFxuICBzaW5nbGVEaWdpdDogL14oXFxkKS8sXG4gIHR3b0RpZ2l0czogL14oXFxkezJ9KS8sXG4gIHRocmVlRGlnaXRzOiAvXihcXGR7M30pLyxcbiAgZm91ckRpZ2l0czogL14oXFxkezR9KS8sXG4gIGFueURpZ2l0czogL14oXFxkKykvXG59O1xuXG5mdW5jdGlvbiBwYXJzZURlY2ltYWwkMSAobWF0Y2hSZXN1bHQpIHtcbiAgcmV0dXJuIHBhcnNlSW50KG1hdGNoUmVzdWx0WzFdLCAxMClcbn1cblxudmFyIHBhcnNlcnMgPSB7XG4gIC8vIFllYXI6IDAwLCAwMSwgLi4uLCA5OVxuICAnWVknOiB7XG4gICAgdW5pdDogJ3R3b0RpZ2l0WWVhcicsXG4gICAgbWF0Y2g6IHBhdHRlcm5zJDEudHdvRGlnaXRzLFxuICAgIHBhcnNlOiBmdW5jdGlvbiAobWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBwYXJzZURlY2ltYWwkMShtYXRjaFJlc3VsdClcbiAgICB9XG4gIH0sXG5cbiAgLy8gWWVhcjogMTkwMCwgMTkwMSwgLi4uLCAyMDk5XG4gICdZWVlZJzoge1xuICAgIHVuaXQ6ICd5ZWFyJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5ZWVlZLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIElTTyB3ZWVrLW51bWJlcmluZyB5ZWFyOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ0dHJzoge1xuICAgIHVuaXQ6ICdpc29ZZWFyJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS50d29EaWdpdHMsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChtYXRjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHBhcnNlRGVjaW1hbCQxKG1hdGNoUmVzdWx0KSArIDE5MDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gSVNPIHdlZWstbnVtYmVyaW5nIHllYXI6IDE5MDAsIDE5MDEsIC4uLiwgMjA5OVxuICAnR0dHRyc6IHtcbiAgICB1bml0OiAnaXNvWWVhcicsXG4gICAgbWF0Y2g6IHBhdHRlcm5zJDEuWVlZWSxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsJDFcbiAgfSxcblxuICAvLyBRdWFydGVyOiAxLCAyLCAzLCA0XG4gICdRJzoge1xuICAgIHVuaXQ6ICdxdWFydGVyJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5zaW5nbGVEaWdpdCxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsJDFcbiAgfSxcblxuICAvLyBPcmRpbmFsIHF1YXJ0ZXJcbiAgJ1FvJzoge1xuICAgIHVuaXQ6ICdxdWFydGVyJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gKHN0cmluZywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLm9yZGluYWxOdW1iZXJzKHN0cmluZywge3VuaXQ6ICdxdWFydGVyJ30pXG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcihtYXRjaFJlc3VsdCwge3VuaXQ6ICdxdWFydGVyJ30pXG4gICAgfVxuICB9LFxuXG4gIC8vIE1vbnRoOiAxLCAyLCAuLi4sIDEyXG4gICdNJzoge1xuICAgIHVuaXQ6ICdtb250aCcsXG4gICAgbWF0Y2g6IHBhdHRlcm5zJDEuTSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gcGFyc2VEZWNpbWFsJDEobWF0Y2hSZXN1bHQpIC0gMVxuICAgIH1cbiAgfSxcblxuICAvLyBPcmRpbmFsIG1vbnRoXG4gICdNbyc6IHtcbiAgICB1bml0OiAnbW9udGgnLFxuICAgIG1hdGNoOiBmdW5jdGlvbiAoc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcnMoc3RyaW5nLCB7dW5pdDogJ21vbnRoJ30pXG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcihtYXRjaFJlc3VsdCwge3VuaXQ6ICdtb250aCd9KSAtIDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gTW9udGg6IDAxLCAwMiwgLi4uLCAxMlxuICAnTU0nOiB7XG4gICAgdW5pdDogJ21vbnRoJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS50d29EaWdpdHMsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChtYXRjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHBhcnNlRGVjaW1hbCQxKG1hdGNoUmVzdWx0KSAtIDFcbiAgICB9XG4gIH0sXG5cbiAgLy8gTW9udGg6IEphbiwgRmViLCAuLi4sIERlY1xuICAnTU1NJzoge1xuICAgIHVuaXQ6ICdtb250aCcsXG4gICAgbWF0Y2g6IGZ1bmN0aW9uIChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5tb250aHMoc3RyaW5nLCB7dHlwZTogJ3Nob3J0J30pXG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gubW9udGgobWF0Y2hSZXN1bHQsIHt0eXBlOiAnc2hvcnQnfSlcbiAgICB9XG4gIH0sXG5cbiAgLy8gTW9udGg6IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyXG4gICdNTU1NJzoge1xuICAgIHVuaXQ6ICdtb250aCcsXG4gICAgbWF0Y2g6IGZ1bmN0aW9uIChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5tb250aHMoc3RyaW5nLCB7dHlwZTogJ2xvbmcnfSkgfHxcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUubWF0Y2gubW9udGhzKHN0cmluZywge3R5cGU6ICdzaG9ydCd9KVxuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChtYXRjaFJlc3VsdCwgb3B0aW9ucykge1xuICAgICAgdmFyIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gubW9udGgobWF0Y2hSZXN1bHQsIHt0eXBlOiAnbG9uZyd9KTtcblxuICAgICAgaWYgKHBhcnNlUmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgcGFyc2VSZXN1bHQgPSBvcHRpb25zLmxvY2FsZS5tYXRjaC5tb250aChtYXRjaFJlc3VsdCwge3R5cGU6ICdzaG9ydCd9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcnNlUmVzdWx0XG4gICAgfVxuICB9LFxuXG4gIC8vIElTTyB3ZWVrOiAxLCAyLCAuLi4sIDUzXG4gICdXJzoge1xuICAgIHVuaXQ6ICdpc29XZWVrJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5XLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIE9yZGluYWwgSVNPIHdlZWtcbiAgJ1dvJzoge1xuICAgIHVuaXQ6ICdpc29XZWVrJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gKHN0cmluZywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLm9yZGluYWxOdW1iZXJzKHN0cmluZywge3VuaXQ6ICdpc29XZWVrJ30pXG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gub3JkaW5hbE51bWJlcihtYXRjaFJlc3VsdCwge3VuaXQ6ICdpc29XZWVrJ30pXG4gICAgfVxuICB9LFxuXG4gIC8vIElTTyB3ZWVrOiAwMSwgMDIsIC4uLiwgNTNcbiAgJ1dXJzoge1xuICAgIHVuaXQ6ICdpc29XZWVrJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS50d29EaWdpdHMsXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbCQxXG4gIH0sXG5cbiAgLy8gRGF5IG9mIHdlZWs6IDAsIDEsIC4uLiwgNlxuICAnZCc6IHtcbiAgICB1bml0OiAnZGF5T2ZXZWVrJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5zaW5nbGVEaWdpdCxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsJDFcbiAgfSxcblxuICAvLyBPcmRpbmFsIGRheSBvZiB3ZWVrXG4gICdkbyc6IHtcbiAgICB1bml0OiAnZGF5T2ZXZWVrJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gKHN0cmluZywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLm9yZGluYWxOdW1iZXJzKHN0cmluZywge3VuaXQ6ICdkYXlPZldlZWsnfSlcbiAgICB9LFxuICAgIHBhcnNlOiBmdW5jdGlvbiAobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVyKG1hdGNoUmVzdWx0LCB7dW5pdDogJ2RheU9mV2Vlayd9KVxuICAgIH1cbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3UsIE1vLCAuLi4sIFNhXG4gICdkZCc6IHtcbiAgICB1bml0OiAnZGF5T2ZXZWVrJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gKHN0cmluZywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLndlZWtkYXlzKHN0cmluZywge3R5cGU6ICduYXJyb3cnfSlcbiAgICB9LFxuICAgIHBhcnNlOiBmdW5jdGlvbiAobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5KG1hdGNoUmVzdWx0LCB7dHlwZTogJ25hcnJvdyd9KVxuICAgIH1cbiAgfSxcblxuICAvLyBEYXkgb2Ygd2VlazogU3VuLCBNb24sIC4uLiwgU2F0XG4gICdkZGQnOiB7XG4gICAgdW5pdDogJ2RheU9mV2VlaycsXG4gICAgbWF0Y2g6IGZ1bmN0aW9uIChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5cyhzdHJpbmcsIHt0eXBlOiAnc2hvcnQnfSkgfHxcbiAgICAgICAgb3B0aW9ucy5sb2NhbGUubWF0Y2gud2Vla2RheXMoc3RyaW5nLCB7dHlwZTogJ25hcnJvdyd9KVxuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChtYXRjaFJlc3VsdCwgb3B0aW9ucykge1xuICAgICAgdmFyIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gud2Vla2RheShtYXRjaFJlc3VsdCwge3R5cGU6ICdzaG9ydCd9KTtcblxuICAgICAgaWYgKHBhcnNlUmVzdWx0ID09IG51bGwpIHtcbiAgICAgICAgcGFyc2VSZXN1bHQgPSBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5KG1hdGNoUmVzdWx0LCB7dHlwZTogJ25hcnJvdyd9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcnNlUmVzdWx0XG4gICAgfVxuICB9LFxuXG4gIC8vIERheSBvZiB3ZWVrOiBTdW5kYXksIE1vbmRheSwgLi4uLCBTYXR1cmRheVxuICAnZGRkZCc6IHtcbiAgICB1bml0OiAnZGF5T2ZXZWVrJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gKHN0cmluZywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLndlZWtkYXlzKHN0cmluZywge3R5cGU6ICdsb25nJ30pIHx8XG4gICAgICAgIG9wdGlvbnMubG9jYWxlLm1hdGNoLndlZWtkYXlzKHN0cmluZywge3R5cGU6ICdzaG9ydCd9KSB8fFxuICAgICAgICBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5cyhzdHJpbmcsIHt0eXBlOiAnbmFycm93J30pXG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICB2YXIgcGFyc2VSZXN1bHQgPSBvcHRpb25zLmxvY2FsZS5tYXRjaC53ZWVrZGF5KG1hdGNoUmVzdWx0LCB7dHlwZTogJ2xvbmcnfSk7XG5cbiAgICAgIGlmIChwYXJzZVJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gud2Vla2RheShtYXRjaFJlc3VsdCwge3R5cGU6ICdzaG9ydCd9KTtcblxuICAgICAgICBpZiAocGFyc2VSZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gud2Vla2RheShtYXRjaFJlc3VsdCwge3R5cGU6ICduYXJyb3cnfSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHBhcnNlUmVzdWx0XG4gICAgfVxuICB9LFxuXG4gIC8vIERheSBvZiBJU08gd2VlazogMSwgMiwgLi4uLCA3XG4gICdFJzoge1xuICAgIHVuaXQ6ICdkYXlPZklTT1dlZWsnLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLnNpbmdsZURpZ2l0LFxuICAgIHBhcnNlOiBmdW5jdGlvbiAobWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBwYXJzZURlY2ltYWwkMShtYXRjaFJlc3VsdClcbiAgICB9XG4gIH0sXG5cbiAgLy8gRGF5IG9mIG1vbnRoOiAxLCAyLCAuLi4sIDMxXG4gICdEJzoge1xuICAgIHVuaXQ6ICdkYXlPZk1vbnRoJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5ELFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIE9yZGluYWwgZGF5IG9mIG1vbnRoXG4gICdEbyc6IHtcbiAgICB1bml0OiAnZGF5T2ZNb250aCcsXG4gICAgbWF0Y2g6IGZ1bmN0aW9uIChzdHJpbmcsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVycyhzdHJpbmcsIHt1bml0OiAnZGF5T2ZNb250aCd9KVxuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChtYXRjaFJlc3VsdCwgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLm9yZGluYWxOdW1iZXIobWF0Y2hSZXN1bHQsIHt1bml0OiAnZGF5T2ZNb250aCd9KVxuICAgIH1cbiAgfSxcblxuICAvLyBEYXkgb2YgbW9udGg6IDAxLCAwMiwgLi4uLCAzMVxuICAnREQnOiB7XG4gICAgdW5pdDogJ2RheU9mTW9udGgnLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLnR3b0RpZ2l0cyxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsJDFcbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMSwgMiwgLi4uLCAzNjZcbiAgJ0RERCc6IHtcbiAgICB1bml0OiAnZGF5T2ZZZWFyJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5EREQsXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbCQxXG4gIH0sXG5cbiAgLy8gT3JkaW5hbCBkYXkgb2YgeWVhclxuICAnREREbyc6IHtcbiAgICB1bml0OiAnZGF5T2ZZZWFyJyxcbiAgICBtYXRjaDogZnVuY3Rpb24gKHN0cmluZywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLm9yZGluYWxOdW1iZXJzKHN0cmluZywge3VuaXQ6ICdkYXlPZlllYXInfSlcbiAgICB9LFxuICAgIHBhcnNlOiBmdW5jdGlvbiAobWF0Y2hSZXN1bHQsIG9wdGlvbnMpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLmxvY2FsZS5tYXRjaC5vcmRpbmFsTnVtYmVyKG1hdGNoUmVzdWx0LCB7dW5pdDogJ2RheU9mWWVhcid9KVxuICAgIH1cbiAgfSxcblxuICAvLyBEYXkgb2YgeWVhcjogMDAxLCAwMDIsIC4uLiwgMzY2XG4gICdEREREJzoge1xuICAgIHVuaXQ6ICdkYXlPZlllYXInLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLnRocmVlRGlnaXRzLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIEFNLCBQTVxuICAnQSc6IHtcbiAgICB1bml0OiAndGltZU9mRGF5JyxcbiAgICBtYXRjaDogZnVuY3Rpb24gKHN0cmluZywgb3B0aW9ucykge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubG9jYWxlLm1hdGNoLnRpbWVzT2ZEYXkoc3RyaW5nLCB7dHlwZTogJ3Nob3J0J30pXG4gICAgfSxcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0LCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gudGltZU9mRGF5KG1hdGNoUmVzdWx0LCB7dHlwZTogJ3Nob3J0J30pXG4gICAgfVxuICB9LFxuXG4gIC8vIGEubS4sIHAubS5cbiAgJ2FhJzoge1xuICAgIHVuaXQ6ICd0aW1lT2ZEYXknLFxuICAgIG1hdGNoOiBmdW5jdGlvbiAoc3RyaW5nLCBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5sb2NhbGUubWF0Y2gudGltZXNPZkRheShzdHJpbmcsIHt0eXBlOiAnbG9uZyd9KSB8fFxuICAgICAgICBvcHRpb25zLmxvY2FsZS5tYXRjaC50aW1lc09mRGF5KHN0cmluZywge3R5cGU6ICdzaG9ydCd9KVxuICAgIH0sXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChtYXRjaFJlc3VsdCwgb3B0aW9ucykge1xuICAgICAgdmFyIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gudGltZU9mRGF5KG1hdGNoUmVzdWx0LCB7dHlwZTogJ2xvbmcnfSk7XG5cbiAgICAgIGlmIChwYXJzZVJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgIHBhcnNlUmVzdWx0ID0gb3B0aW9ucy5sb2NhbGUubWF0Y2gudGltZU9mRGF5KG1hdGNoUmVzdWx0LCB7dHlwZTogJ3Nob3J0J30pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcGFyc2VSZXN1bHRcbiAgICB9XG4gIH0sXG5cbiAgLy8gSG91cjogMCwgMSwgLi4uIDIzXG4gICdIJzoge1xuICAgIHVuaXQ6ICdob3VycycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zJDEuSCxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsJDFcbiAgfSxcblxuICAvLyBIb3VyOiAwMCwgMDEsIC4uLiwgMjNcbiAgJ0hIJzoge1xuICAgIHVuaXQ6ICdob3VycycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zJDEudHdvRGlnaXRzLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIEhvdXI6IDEsIDIsIC4uLiwgMTJcbiAgJ2gnOiB7XG4gICAgdW5pdDogJ3RpbWVPZkRheUhvdXJzJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5NLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIEhvdXI6IDAxLCAwMiwgLi4uLCAxMlxuICAnaGgnOiB7XG4gICAgdW5pdDogJ3RpbWVPZkRheUhvdXJzJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS50d29EaWdpdHMsXG4gICAgcGFyc2U6IHBhcnNlRGVjaW1hbCQxXG4gIH0sXG5cbiAgLy8gTWludXRlOiAwLCAxLCAuLi4sIDU5XG4gICdtJzoge1xuICAgIHVuaXQ6ICdtaW51dGVzJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5tLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIE1pbnV0ZTogMDAsIDAxLCAuLi4sIDU5XG4gICdtbSc6IHtcbiAgICB1bml0OiAnbWludXRlcycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zJDEudHdvRGlnaXRzLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIFNlY29uZDogMCwgMSwgLi4uLCA1OVxuICAncyc6IHtcbiAgICB1bml0OiAnc2Vjb25kcycsXG4gICAgbWF0Y2g6IHBhdHRlcm5zJDEubSxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsJDFcbiAgfSxcblxuICAvLyBTZWNvbmQ6IDAwLCAwMSwgLi4uLCA1OVxuICAnc3MnOiB7XG4gICAgdW5pdDogJ3NlY29uZHMnLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLnR3b0RpZ2l0cyxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsJDFcbiAgfSxcblxuICAvLyAxLzEwIG9mIHNlY29uZDogMCwgMSwgLi4uLCA5XG4gICdTJzoge1xuICAgIHVuaXQ6ICdtaWxsaXNlY29uZHMnLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLnNpbmdsZURpZ2l0LFxuICAgIHBhcnNlOiBmdW5jdGlvbiAobWF0Y2hSZXN1bHQpIHtcbiAgICAgIHJldHVybiBwYXJzZURlY2ltYWwkMShtYXRjaFJlc3VsdCkgKiAxMDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gMS8xMDAgb2Ygc2Vjb25kOiAwMCwgMDEsIC4uLiwgOTlcbiAgJ1NTJzoge1xuICAgIHVuaXQ6ICdtaWxsaXNlY29uZHMnLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLnR3b0RpZ2l0cyxcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0KSB7XG4gICAgICByZXR1cm4gcGFyc2VEZWNpbWFsJDEobWF0Y2hSZXN1bHQpICogMTBcbiAgICB9XG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmQ6IDAwMCwgMDAxLCAuLi4sIDk5OVxuICAnU1NTJzoge1xuICAgIHVuaXQ6ICdtaWxsaXNlY29uZHMnLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLnRocmVlRGlnaXRzLFxuICAgIHBhcnNlOiBwYXJzZURlY2ltYWwkMVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDE6MDAsICswMDowMCwgLi4uICsxMjowMFxuICAnWic6IHtcbiAgICB1bml0OiAndGltZXpvbmUnLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLlosXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChtYXRjaFJlc3VsdCkge1xuICAgICAgdmFyIHNpZ24gPSBtYXRjaFJlc3VsdFsxXTtcbiAgICAgIHZhciBob3VycyA9IHBhcnNlSW50KG1hdGNoUmVzdWx0WzJdLCAxMCk7XG4gICAgICB2YXIgbWludXRlcyA9IHBhcnNlSW50KG1hdGNoUmVzdWx0WzNdLCAxMCk7XG4gICAgICB2YXIgYWJzb2x1dGVPZmZzZXQgPSBob3VycyAqIDYwICsgbWludXRlcztcbiAgICAgIHJldHVybiAoc2lnbiA9PT0gJysnKSA/IGFic29sdXRlT2Zmc2V0IDogLWFic29sdXRlT2Zmc2V0XG4gICAgfVxuICB9LFxuXG4gIC8vIFRpbWV6b25lOiAtMDEwMCwgKzAwMDAsIC4uLiArMTIwMFxuICAnWlonOiB7XG4gICAgdW5pdDogJ3RpbWV6b25lJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5aWixcbiAgICBwYXJzZTogZnVuY3Rpb24gKG1hdGNoUmVzdWx0KSB7XG4gICAgICB2YXIgc2lnbiA9IG1hdGNoUmVzdWx0WzFdO1xuICAgICAgdmFyIGhvdXJzID0gcGFyc2VJbnQobWF0Y2hSZXN1bHRbMl0sIDEwKTtcbiAgICAgIHZhciBtaW51dGVzID0gcGFyc2VJbnQobWF0Y2hSZXN1bHRbM10sIDEwKTtcbiAgICAgIHZhciBhYnNvbHV0ZU9mZnNldCA9IGhvdXJzICogNjAgKyBtaW51dGVzO1xuICAgICAgcmV0dXJuIChzaWduID09PSAnKycpID8gYWJzb2x1dGVPZmZzZXQgOiAtYWJzb2x1dGVPZmZzZXRcbiAgICB9XG4gIH0sXG5cbiAgLy8gU2Vjb25kcyB0aW1lc3RhbXA6IDUxMjk2OTUyMFxuICAnWCc6IHtcbiAgICB1bml0OiAndGltZXN0YW1wJyxcbiAgICBtYXRjaDogcGF0dGVybnMkMS5hbnlEaWdpdHMsXG4gICAgcGFyc2U6IGZ1bmN0aW9uIChtYXRjaFJlc3VsdCkge1xuICAgICAgcmV0dXJuIHBhcnNlRGVjaW1hbCQxKG1hdGNoUmVzdWx0KSAqIDEwMDBcbiAgICB9XG4gIH0sXG5cbiAgLy8gTWlsbGlzZWNvbmRzIHRpbWVzdGFtcDogNTEyOTY5NTIwOTAwXG4gICd4Jzoge1xuICAgIHVuaXQ6ICd0aW1lc3RhbXAnLFxuICAgIG1hdGNoOiBwYXR0ZXJucyQxLmFueURpZ2l0cyxcbiAgICBwYXJzZTogcGFyc2VEZWNpbWFsJDFcbiAgfVxufTtcblxucGFyc2Vyc1snYSddID0gcGFyc2Vyc1snQSddO1xuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgYSBwYXJ0IG9mIHB1YmxpYyBBUEkgd2hlbiBVVEMgZnVuY3Rpb24gd2lsbCBiZSBpbXBsZW1lbnRlZC5cbi8vIFNlZSBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zNzZcbmZ1bmN0aW9uIHNldFVUQ0RheSAoZGlydHlEYXRlLCBkaXJ0eURheSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuICB2YXIgbG9jYWxlID0gb3B0aW9ucy5sb2NhbGU7XG4gIHZhciBsb2NhbGVXZWVrU3RhcnRzT24gPSBsb2NhbGUgJiYgbG9jYWxlLm9wdGlvbnMgJiYgbG9jYWxlLm9wdGlvbnMud2Vla1N0YXJ0c09uO1xuICB2YXIgZGVmYXVsdFdlZWtTdGFydHNPbiA9IGxvY2FsZVdlZWtTdGFydHNPbiA9PT0gdW5kZWZpbmVkID8gMCA6IE51bWJlcihsb2NhbGVXZWVrU3RhcnRzT24pO1xuICB2YXIgd2Vla1N0YXJ0c09uID0gb3B0aW9ucy53ZWVrU3RhcnRzT24gPT09IHVuZGVmaW5lZCA/IGRlZmF1bHRXZWVrU3RhcnRzT24gOiBOdW1iZXIob3B0aW9ucy53ZWVrU3RhcnRzT24pO1xuXG4gIC8vIFRlc3QgaWYgd2Vla1N0YXJ0c09uIGlzIGJldHdlZW4gMCBhbmQgNiBfYW5kXyBpcyBub3QgTmFOXG4gIGlmICghKHdlZWtTdGFydHNPbiA+PSAwICYmIHdlZWtTdGFydHNPbiA8PSA2KSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd3ZWVrU3RhcnRzT24gbXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDYgaW5jbHVzaXZlbHknKVxuICB9XG5cbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpO1xuICB2YXIgZGF5ID0gTnVtYmVyKGRpcnR5RGF5KTtcblxuICB2YXIgY3VycmVudERheSA9IGRhdGUuZ2V0VVRDRGF5KCk7XG5cbiAgdmFyIHJlbWFpbmRlciA9IGRheSAlIDc7XG4gIHZhciBkYXlJbmRleCA9IChyZW1haW5kZXIgKyA3KSAlIDc7XG5cbiAgdmFyIGRpZmYgPSAoZGF5SW5kZXggPCB3ZWVrU3RhcnRzT24gPyA3IDogMCkgKyBkYXkgLSBjdXJyZW50RGF5O1xuXG4gIGRhdGUuc2V0VVRDRGF0ZShkYXRlLmdldFVUQ0RhdGUoKSArIGRpZmYpO1xuICByZXR1cm4gZGF0ZVxufVxuXG4vLyBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgYSBwYXJ0IG9mIHB1YmxpYyBBUEkgd2hlbiBVVEMgZnVuY3Rpb24gd2lsbCBiZSBpbXBsZW1lbnRlZC5cbi8vIFNlZSBpc3N1ZTogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zNzZcbmZ1bmN0aW9uIHNldFVUQ0lTT0RheSAoZGlydHlEYXRlLCBkaXJ0eURheSwgZGlydHlPcHRpb25zKSB7XG4gIHZhciBkYXkgPSBOdW1iZXIoZGlydHlEYXkpO1xuXG4gIGlmIChkYXkgJSA3ID09PSAwKSB7XG4gICAgZGF5ID0gZGF5IC0gNztcbiAgfVxuXG4gIHZhciB3ZWVrU3RhcnRzT24gPSAxO1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBjdXJyZW50RGF5ID0gZGF0ZS5nZXRVVENEYXkoKTtcblxuICB2YXIgcmVtYWluZGVyID0gZGF5ICUgNztcbiAgdmFyIGRheUluZGV4ID0gKHJlbWFpbmRlciArIDcpICUgNztcblxuICB2YXIgZGlmZiA9IChkYXlJbmRleCA8IHdlZWtTdGFydHNPbiA/IDcgOiAwKSArIGRheSAtIGN1cnJlbnREYXk7XG5cbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpICsgZGlmZik7XG4gIHJldHVybiBkYXRlXG59XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhIHBhcnQgb2YgcHVibGljIEFQSSB3aGVuIFVUQyBmdW5jdGlvbiB3aWxsIGJlIGltcGxlbWVudGVkLlxuLy8gU2VlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuZnVuY3Rpb24gc2V0VVRDSVNPV2VlayAoZGlydHlEYXRlLCBkaXJ0eUlTT1dlZWssIGRpcnR5T3B0aW9ucykge1xuICB2YXIgZGF0ZSA9IHRvRGF0ZShkaXJ0eURhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBpc29XZWVrID0gTnVtYmVyKGRpcnR5SVNPV2Vlayk7XG4gIHZhciBkaWZmID0gZ2V0VVRDSVNPV2VlayhkYXRlLCBkaXJ0eU9wdGlvbnMpIC0gaXNvV2VlaztcbiAgZGF0ZS5zZXRVVENEYXRlKGRhdGUuZ2V0VVRDRGF0ZSgpIC0gZGlmZiAqIDcpO1xuICByZXR1cm4gZGF0ZVxufVxuXG52YXIgTUlMTElTRUNPTkRTX0lOX0RBWSQzID0gODY0MDAwMDA7XG5cbi8vIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBhIHBhcnQgb2YgcHVibGljIEFQSSB3aGVuIFVUQyBmdW5jdGlvbiB3aWxsIGJlIGltcGxlbWVudGVkLlxuLy8gU2VlIGlzc3VlOiBodHRwczovL2dpdGh1Yi5jb20vZGF0ZS1mbnMvZGF0ZS1mbnMvaXNzdWVzLzM3NlxuZnVuY3Rpb24gc2V0VVRDSVNPV2Vla1llYXIgKGRpcnR5RGF0ZSwgZGlydHlJU09ZZWFyLCBkaXJ0eU9wdGlvbnMpIHtcbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlEYXRlLCBkaXJ0eU9wdGlvbnMpO1xuICB2YXIgaXNvWWVhciA9IE51bWJlcihkaXJ0eUlTT1llYXIpO1xuICB2YXIgZGF0ZVN0YXJ0T2ZZZWFyID0gc3RhcnRPZlVUQ0lTT1dlZWtZZWFyKGRhdGUsIGRpcnR5T3B0aW9ucyk7XG4gIHZhciBkaWZmID0gTWF0aC5mbG9vcigoZGF0ZS5nZXRUaW1lKCkgLSBkYXRlU3RhcnRPZlllYXIuZ2V0VGltZSgpKSAvIE1JTExJU0VDT05EU19JTl9EQVkkMyk7XG4gIHZhciBmb3VydGhPZkphbnVhcnkgPSBuZXcgRGF0ZSgwKTtcbiAgZm91cnRoT2ZKYW51YXJ5LnNldFVUQ0Z1bGxZZWFyKGlzb1llYXIsIDAsIDQpO1xuICBmb3VydGhPZkphbnVhcnkuc2V0VVRDSG91cnMoMCwgMCwgMCwgMCk7XG4gIGRhdGUgPSBzdGFydE9mVVRDSVNPV2Vla1llYXIoZm91cnRoT2ZKYW51YXJ5LCBkaXJ0eU9wdGlvbnMpO1xuICBkYXRlLnNldFVUQ0RhdGUoZGF0ZS5nZXRVVENEYXRlKCkgKyBkaWZmKTtcbiAgcmV0dXJuIGRhdGVcbn1cblxudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUkNyA9IDYwMDAwO1xuXG5mdW5jdGlvbiBzZXRUaW1lT2ZEYXkgKGhvdXJzLCB0aW1lT2ZEYXkpIHtcbiAgdmFyIGlzQU0gPSB0aW1lT2ZEYXkgPT09IDA7XG5cbiAgaWYgKGlzQU0pIHtcbiAgICBpZiAoaG91cnMgPT09IDEyKSB7XG4gICAgICByZXR1cm4gMFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoaG91cnMgIT09IDEyKSB7XG4gICAgICByZXR1cm4gMTIgKyBob3Vyc1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBob3Vyc1xufVxuXG52YXIgdW5pdHMgPSB7XG4gIHR3b0RpZ2l0WWVhcjoge1xuICAgIHByaW9yaXR5OiAxMCxcbiAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgdmFyIGNlbnR1cnkgPSBNYXRoLmZsb29yKGRhdGVWYWx1ZXMuZGF0ZS5nZXRVVENGdWxsWWVhcigpIC8gMTAwKTtcbiAgICAgIHZhciB5ZWFyID0gY2VudHVyeSAqIDEwMCArIHZhbHVlO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0Z1bGxZZWFyKHllYXIsIDAsIDEpO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH0sXG5cbiAgeWVhcjoge1xuICAgIHByaW9yaXR5OiAxMCxcbiAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0Z1bGxZZWFyKHZhbHVlLCAwLCAxKTtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzXG4gICAgfVxuICB9LFxuXG4gIGlzb1llYXI6IHtcbiAgICBwcmlvcml0eTogMTAsXG4gICAgc2V0OiBmdW5jdGlvbiAoZGF0ZVZhbHVlcywgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZSA9IHN0YXJ0T2ZVVENJU09XZWVrWWVhcihzZXRVVENJU09XZWVrWWVhcihkYXRlVmFsdWVzLmRhdGUsIHZhbHVlLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gZGF0ZVZhbHVlc1xuICAgIH1cbiAgfSxcblxuICBxdWFydGVyOiB7XG4gICAgcHJpb3JpdHk6IDIwLFxuICAgIHNldDogZnVuY3Rpb24gKGRhdGVWYWx1ZXMsIHZhbHVlKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDTW9udGgoKHZhbHVlIC0gMSkgKiAzLCAxKTtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzXG4gICAgfVxuICB9LFxuXG4gIG1vbnRoOiB7XG4gICAgcHJpb3JpdHk6IDMwLFxuICAgIHNldDogZnVuY3Rpb24gKGRhdGVWYWx1ZXMsIHZhbHVlKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDTW9udGgodmFsdWUsIDEpO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH0sXG5cbiAgaXNvV2Vlazoge1xuICAgIHByaW9yaXR5OiA0MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlVmFsdWVzLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlID0gc3RhcnRPZlVUQ0lTT1dlZWsoc2V0VVRDSVNPV2VlayhkYXRlVmFsdWVzLmRhdGUsIHZhbHVlLCBvcHRpb25zKSwgb3B0aW9ucyk7XG4gICAgICByZXR1cm4gZGF0ZVZhbHVlc1xuICAgIH1cbiAgfSxcblxuICBkYXlPZldlZWs6IHtcbiAgICBwcmlvcml0eTogNTAsXG4gICAgc2V0OiBmdW5jdGlvbiAoZGF0ZVZhbHVlcywgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZSA9IHNldFVUQ0RheShkYXRlVmFsdWVzLmRhdGUsIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENIb3VycygwLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzXG4gICAgfVxuICB9LFxuXG4gIGRheU9mSVNPV2Vlazoge1xuICAgIHByaW9yaXR5OiA1MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlVmFsdWVzLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlID0gc2V0VVRDSVNPRGF5KGRhdGVWYWx1ZXMuZGF0ZSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH0sXG5cbiAgZGF5T2ZNb250aDoge1xuICAgIHByaW9yaXR5OiA1MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0RhdGUodmFsdWUpO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH0sXG5cbiAgZGF5T2ZZZWFyOiB7XG4gICAgcHJpb3JpdHk6IDUwLFxuICAgIHNldDogZnVuY3Rpb24gKGRhdGVWYWx1ZXMsIHZhbHVlKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUuc2V0VVRDTW9udGgoMCwgdmFsdWUpO1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKDAsIDAsIDAsIDApO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH0sXG5cbiAgdGltZU9mRGF5OiB7XG4gICAgcHJpb3JpdHk6IDYwLFxuICAgIHNldDogZnVuY3Rpb24gKGRhdGVWYWx1ZXMsIHZhbHVlLCBvcHRpb25zKSB7XG4gICAgICBkYXRlVmFsdWVzLnRpbWVPZkRheSA9IHZhbHVlO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH0sXG5cbiAgaG91cnM6IHtcbiAgICBwcmlvcml0eTogNzAsXG4gICAgc2V0OiBmdW5jdGlvbiAoZGF0ZVZhbHVlcywgdmFsdWUsIG9wdGlvbnMpIHtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENIb3Vycyh2YWx1ZSwgMCwgMCwgMCk7XG4gICAgICByZXR1cm4gZGF0ZVZhbHVlc1xuICAgIH1cbiAgfSxcblxuICB0aW1lT2ZEYXlIb3Vyczoge1xuICAgIHByaW9yaXR5OiA3MCxcbiAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlVmFsdWVzLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgICAgdmFyIHRpbWVPZkRheSA9IGRhdGVWYWx1ZXMudGltZU9mRGF5O1xuICAgICAgaWYgKHRpbWVPZkRheSAhPSBudWxsKSB7XG4gICAgICAgIHZhbHVlID0gc2V0VGltZU9mRGF5KHZhbHVlLCB0aW1lT2ZEYXkpO1xuICAgICAgfVxuICAgICAgZGF0ZVZhbHVlcy5kYXRlLnNldFVUQ0hvdXJzKHZhbHVlLCAwLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzXG4gICAgfVxuICB9LFxuXG4gIG1pbnV0ZXM6IHtcbiAgICBwcmlvcml0eTogODAsXG4gICAgc2V0OiBmdW5jdGlvbiAoZGF0ZVZhbHVlcywgdmFsdWUpIHtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENNaW51dGVzKHZhbHVlLCAwLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzXG4gICAgfVxuICB9LFxuXG4gIHNlY29uZHM6IHtcbiAgICBwcmlvcml0eTogOTAsXG4gICAgc2V0OiBmdW5jdGlvbiAoZGF0ZVZhbHVlcywgdmFsdWUpIHtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENTZWNvbmRzKHZhbHVlLCAwKTtcbiAgICAgIHJldHVybiBkYXRlVmFsdWVzXG4gICAgfVxuICB9LFxuXG4gIG1pbGxpc2Vjb25kczoge1xuICAgIHByaW9yaXR5OiAxMDAsXG4gICAgc2V0OiBmdW5jdGlvbiAoZGF0ZVZhbHVlcywgdmFsdWUpIHtcbiAgICAgIGRhdGVWYWx1ZXMuZGF0ZS5zZXRVVENNaWxsaXNlY29uZHModmFsdWUpO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH0sXG5cbiAgdGltZXpvbmU6IHtcbiAgICBwcmlvcml0eTogMTEwLFxuICAgIHNldDogZnVuY3Rpb24gKGRhdGVWYWx1ZXMsIHZhbHVlKSB7XG4gICAgICBkYXRlVmFsdWVzLmRhdGUgPSBuZXcgRGF0ZShkYXRlVmFsdWVzLmRhdGUuZ2V0VGltZSgpIC0gdmFsdWUgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFJDcpO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH0sXG5cbiAgdGltZXN0YW1wOiB7XG4gICAgcHJpb3JpdHk6IDEyMCxcbiAgICBzZXQ6IGZ1bmN0aW9uIChkYXRlVmFsdWVzLCB2YWx1ZSkge1xuICAgICAgZGF0ZVZhbHVlcy5kYXRlID0gbmV3IERhdGUodmFsdWUpO1xuICAgICAgcmV0dXJuIGRhdGVWYWx1ZXNcbiAgICB9XG4gIH1cbn07XG5cbnZhciBUSU1FWk9ORV9VTklUX1BSSU9SSVRZID0gMTEwO1xudmFyIE1JTExJU0VDT05EU19JTl9NSU5VVEUkNiA9IDYwMDAwO1xuXG52YXIgbG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAkMSA9IC8oXFxbW15bXSpdKXwoXFxcXCk/KExUU3xMVHxMTExMfExMTHxMTHxMfGxsbGx8bGxsfGxsfGwpL2c7XG52YXIgZGVmYXVsdFBhcnNpbmdUb2tlbnNSZWdFeHAgPSAvKFxcW1teW10qXSl8KFxcXFwpPyh4fHNzfHN8bW18bXxoaHxofGRvfGRkZGR8ZGRkfGRkfGR8YWF8YXxaWnxafFlZWVl8WVl8WHxXb3xXV3xXfFNTU3xTU3xTfFFvfFF8TW98TU1NTXxNTU18TU18TXxISHxIfEdHR0d8R0d8RXxEb3xERERvfERERER8REREfEREfER8QXwuKS9nO1xuXG4vKipcbiAqIEBuYW1lIHBhcnNlXG4gKiBAY2F0ZWdvcnkgQ29tbW9uIEhlbHBlcnNcbiAqIEBzdW1tYXJ5IFBhcnNlIHRoZSBkYXRlLlxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogUmV0dXJuIHRoZSBkYXRlIHBhcnNlZCBmcm9tIHN0cmluZyB1c2luZyB0aGUgZ2l2ZW4gZm9ybWF0LlxuICpcbiAqIEFjY2VwdGVkIGZvcm1hdCB0b2tlbnM6XG4gKiB8IFVuaXQgICAgICAgICAgICAgICAgICAgIHwgUHJpb3JpdHkgfCBUb2tlbiB8IElucHV0IGV4YW1wbGVzICAgICAgICAgICAgICAgICAgIHxcbiAqIHwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfC0tLS0tLS0tLS18LS0tLS0tLXwtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tfFxuICogfCBZZWFyICAgICAgICAgICAgICAgICAgICB8IDEwICAgICAgIHwgWVkgICAgfCAwMCwgMDEsIC4uLiwgOTkgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBZWVlZICB8IDE5MDAsIDE5MDEsIC4uLiwgMjA5OSAgICAgICAgICAgIHxcbiAqIHwgSVNPIHdlZWstbnVtYmVyaW5nIHllYXIgfCAxMCAgICAgICB8IEdHICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgR0dHRyAgfCAxOTAwLCAxOTAxLCAuLi4sIDIwOTkgICAgICAgICAgICB8XG4gKiB8IFF1YXJ0ZXIgICAgICAgICAgICAgICAgIHwgMjAgICAgICAgfCBRICAgICB8IDEsIDIsIDMsIDQgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IFFvICAgIHwgMXN0LCAybmQsIDNyZCwgNHRoICAgICAgICAgICAgICAgfFxuICogfCBNb250aCAgICAgICAgICAgICAgICAgICB8IDMwICAgICAgIHwgTSAgICAgfCAxLCAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBNbyAgICB8IDFzdCwgMm5kLCAuLi4sIDEydGggICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IE1NICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgTU1NICAgfCBKYW4sIEZlYiwgLi4uLCBEZWMgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBNTU1NICB8IEphbnVhcnksIEZlYnJ1YXJ5LCAuLi4sIERlY2VtYmVyIHxcbiAqIHwgSVNPIHdlZWsgICAgICAgICAgICAgICAgfCA0MCAgICAgICB8IFcgICAgIHwgMSwgMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgV28gICAgfCAxc3QsIDJuZCwgLi4uLCA1M3JkICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBXVyAgICB8IDAxLCAwMiwgLi4uLCA1MyAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHdlZWsgICAgICAgICAgICAgfCA1MCAgICAgICB8IGQgICAgIHwgMCwgMSwgLi4uLCA2ICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgZG8gICAgfCAwdGgsIDFzdCwgLi4uLCA2dGggICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBkZCAgICB8IFN1LCBNbywgLi4uLCBTYSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IGRkZCAgIHwgU3VuLCBNb24sIC4uLiwgU2F0ICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgZGRkZCAgfCBTdW5kYXksIE1vbmRheSwgLi4uLCBTYXR1cmRheSAgICB8XG4gKiB8IERheSBvZiBJU08gd2VlayAgICAgICAgIHwgNTAgICAgICAgfCBFICAgICB8IDEsIDIsIC4uLiwgNyAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIG1vbnRoICAgICAgICAgICAgfCA1MCAgICAgICB8IEQgICAgIHwgMSwgMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgRG8gICAgfCAxc3QsIDJuZCwgLi4uLCAzMXN0ICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBERCAgICB8IDAxLCAwMiwgLi4uLCAzMSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgRGF5IG9mIHllYXIgICAgICAgICAgICAgfCA1MCAgICAgICB8IERERCAgIHwgMSwgMiwgLi4uLCAzNjYgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgREREbyAgfCAxc3QsIDJuZCwgLi4uLCAzNjZ0aCAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBEREREICB8IDAwMSwgMDAyLCAuLi4sIDM2NiAgICAgICAgICAgICAgIHxcbiAqIHwgVGltZSBvZiBkYXkgICAgICAgICAgICAgfCA2MCAgICAgICB8IEEgICAgIHwgQU0sIFBNICAgICAgICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgYSAgICAgfCBhbSwgcG0gICAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBhYSAgICB8IGEubS4sIHAubS4gICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgSG91ciAgICAgICAgICAgICAgICAgICAgfCA3MCAgICAgICB8IEggICAgIHwgMCwgMSwgLi4uIDIzICAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgSEggICAgfCAwMCwgMDEsIC4uLiAyMyAgICAgICAgICAgICAgICAgICB8XG4gKiB8IFRpbWUgb2YgZGF5IGhvdXIgICAgICAgIHwgNzAgICAgICAgfCBoICAgICB8IDEsIDIsIC4uLiwgMTIgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IGhoICAgIHwgMDEsIDAyLCAuLi4sIDEyICAgICAgICAgICAgICAgICAgfFxuICogfCBNaW51dGUgICAgICAgICAgICAgICAgICB8IDgwICAgICAgIHwgbSAgICAgfCAwLCAxLCAuLi4sIDU5ICAgICAgICAgICAgICAgICAgICB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgfCBtbSAgICB8IDAwLCAwMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgIHxcbiAqIHwgU2Vjb25kICAgICAgICAgICAgICAgICAgfCA5MCAgICAgICB8IHMgICAgIHwgMCwgMSwgLi4uLCA1OSAgICAgICAgICAgICAgICAgICAgfFxuICogfCAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgIHwgc3MgICAgfCAwMCwgMDEsIC4uLiwgNTkgICAgICAgICAgICAgICAgICB8XG4gKiB8IDEvMTAgb2Ygc2Vjb25kICAgICAgICAgIHwgMTAwICAgICAgfCBTICAgICB8IDAsIDEsIC4uLiwgOSAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgMS8xMDAgb2Ygc2Vjb25kICAgICAgICAgfCAxMDAgICAgICB8IFNTICAgIHwgMDAsIDAxLCAuLi4sIDk5ICAgICAgICAgICAgICAgICAgfFxuICogfCBNaWxsaXNlY29uZCAgICAgICAgICAgICB8IDEwMCAgICAgIHwgU1NTICAgfCAwMDAsIDAwMSwgLi4uLCA5OTkgICAgICAgICAgICAgICB8XG4gKiB8IFRpbWV6b25lICAgICAgICAgICAgICAgIHwgMTEwICAgICAgfCBaICAgICB8IC0wMTowMCwgKzAwOjAwLCAuLi4gKzEyOjAwICAgICAgIHxcbiAqIHwgICAgICAgICAgICAgICAgICAgICAgICAgfCAgICAgICAgICB8IFpaICAgIHwgLTAxMDAsICswMDAwLCAuLi4sICsxMjAwICAgICAgICAgfFxuICogfCBTZWNvbmRzIHRpbWVzdGFtcCAgICAgICB8IDEyMCAgICAgIHwgWCAgICAgfCA1MTI5Njk1MjAgICAgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IE1pbGxpc2Vjb25kcyB0aW1lc3RhbXAgIHwgMTIwICAgICAgfCB4ICAgICB8IDUxMjk2OTUyMDkwMCAgICAgICAgICAgICAgICAgICAgIHxcbiAqXG4gKiBWYWx1ZXMgd2lsbCBiZSBhc3NpZ25lZCB0byB0aGUgZGF0ZSBpbiB0aGUgYXNjZW5kaW5nIG9yZGVyIG9mIGl0cyB1bml0J3MgcHJpb3JpdHkuXG4gKiBVbml0cyBvZiBhbiBlcXVhbCBwcmlvcml0eSBvdmVyd3JpdGUgZWFjaCBvdGhlciBpbiB0aGUgb3JkZXIgb2YgYXBwZWFyYW5jZS5cbiAqXG4gKiBJZiBubyB2YWx1ZXMgb2YgaGlnaGVyIHByaW9yaXR5IGFyZSBwYXJzZWQgKGUuZy4gd2hlbiBwYXJzaW5nIHN0cmluZyAnSmFudWFyeSAxc3QnIHdpdGhvdXQgYSB5ZWFyKSxcbiAqIHRoZSB2YWx1ZXMgd2lsbCBiZSB0YWtlbiBmcm9tIDNyZCBhcmd1bWVudCBgYmFzZURhdGVgIHdoaWNoIHdvcmtzIGFzIGEgY29udGV4dCBvZiBwYXJzaW5nLlxuICpcbiAqIGBiYXNlRGF0ZWAgbXVzdCBiZSBwYXNzZWQgZm9yIGNvcnJlY3Qgd29yayBvZiB0aGUgZnVuY3Rpb24uXG4gKiBJZiB5b3UncmUgbm90IHN1cmUgd2hpY2ggYGJhc2VEYXRlYCB0byBzdXBwbHksIGNyZWF0ZSBhIG5ldyBpbnN0YW5jZSBvZiBEYXRlOlxuICogYHBhcnNlKCcwMi8xMS8yMDE0JywgJ01NL0REL1lZWVknLCBuZXcgRGF0ZSgpKWBcbiAqIEluIHRoaXMgY2FzZSBwYXJzaW5nIHdpbGwgYmUgZG9uZSBpbiB0aGUgY29udGV4dCBvZiB0aGUgY3VycmVudCBkYXRlLlxuICogSWYgYGJhc2VEYXRlYCBpcyBgSW52YWxpZCBEYXRlYCBvciBhIHZhbHVlIG5vdCBjb252ZXJ0aWJsZSB0byB2YWxpZCBgRGF0ZWAsXG4gKiB0aGVuIGBJbnZhbGlkIERhdGVgIHdpbGwgYmUgcmV0dXJuZWQuXG4gKlxuICogQWxzbywgYHBhcnNlYCB1bmZvbGRzIGxvbmcgZm9ybWF0cyBsaWtlIHRob3NlIGluIFtmb3JtYXRde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvZm9ybWF0fTpcbiAqIHwgVG9rZW4gfCBJbnB1dCBleGFtcGxlcyAgICAgICAgICAgICAgICAgfFxuICogfC0tLS0tLS18LS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS18XG4gKiB8IExUICAgIHwgMDU6MzAgYS5tLiAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTFRTICAgfCAwNTozMDoxNSBhLm0uICAgICAgICAgICAgICAgICAgfFxuICogfCBMICAgICB8IDA3LzAyLzE5OTUgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IGwgICAgIHwgNy8yLzE5OTUgICAgICAgICAgICAgICAgICAgICAgIHxcbiAqIHwgTEwgICAgfCBKdWx5IDIgMTk5NSAgICAgICAgICAgICAgICAgICAgfFxuICogfCBsbCAgICB8IEp1bCAyIDE5OTUgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IExMTCAgIHwgSnVseSAyIDE5OTUgMDU6MzAgYS5tLiAgICAgICAgIHxcbiAqIHwgbGxsICAgfCBKdWwgMiAxOTk1IDA1OjMwIGEubS4gICAgICAgICAgfFxuICogfCBMTExMICB8IFN1bmRheSwgSnVseSAyIDE5OTUgMDU6MzAgYS5tLiB8XG4gKiB8IGxsbGwgIHwgU3VuLCBKdWwgMiAxOTk1IDA1OjMwIGEubS4gICAgIHxcbiAqXG4gKiBUaGUgY2hhcmFjdGVycyB3cmFwcGVkIGluIHNxdWFyZSBicmFja2V0cyBpbiB0aGUgZm9ybWF0IHN0cmluZyBhcmUgZXNjYXBlZC5cbiAqXG4gKiBUaGUgcmVzdWx0IG1heSB2YXJ5IGJ5IGxvY2FsZS5cbiAqXG4gKiBJZiBgZm9ybWF0U3RyaW5nYCBtYXRjaGVzIHdpdGggYGRhdGVTdHJpbmdgIGJ1dCBkb2VzIG5vdCBwcm92aWRlcyB0b2tlbnMsIGBiYXNlRGF0ZWAgd2lsbCBiZSByZXR1cm5lZC5cbiAqXG4gKiBJZiBwYXJzaW5nIGZhaWxlZCwgYEludmFsaWQgRGF0ZWAgd2lsbCBiZSByZXR1cm5lZC5cbiAqIEludmFsaWQgRGF0ZSBpcyBhIERhdGUsIHdob3NlIHRpbWUgdmFsdWUgaXMgTmFOLlxuICogVGltZSB2YWx1ZSBvZiBEYXRlOiBodHRwOi8vZXM1LmdpdGh1Yi5pby8jeDE1LjkuMS4xXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGRhdGVTdHJpbmcgLSB0aGUgc3RyaW5nIHRvIHBhcnNlXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0U3RyaW5nIC0gdGhlIHN0cmluZyBvZiB0b2tlbnNcbiAqIEBwYXJhbSB7RGF0ZXxTdHJpbmd8TnVtYmVyfSBiYXNlRGF0ZSAtIHRoZSBkYXRlIHRvIHRvb2sgdGhlIG1pc3NpbmcgaGlnaGVyIHByaW9yaXR5IHZhbHVlcyBmcm9tXG4gKiBAcGFyYW0ge09wdGlvbnN9IFtvcHRpb25zXSAtIHRoZSBvYmplY3Qgd2l0aCBvcHRpb25zLiBTZWUgW09wdGlvbnNde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvT3B0aW9uc31cbiAqIEBwYXJhbSB7MHwxfDJ9IFtvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHM9Ml0gLSBwYXNzZWQgdG8gYHRvRGF0ZWAuIFNlZSBbdG9EYXRlXXtAbGluayBodHRwczovL2RhdGUtZm5zLm9yZy9kb2NzL3RvRGF0ZX1cbiAqIEBwYXJhbSB7TG9jYWxlfSBbb3B0aW9ucy5sb2NhbGU9ZGVmYXVsdExvY2FsZV0gLSB0aGUgbG9jYWxlIG9iamVjdC4gU2VlIFtMb2NhbGVde0BsaW5rIGh0dHBzOi8vZGF0ZS1mbnMub3JnL2RvY3MvTG9jYWxlfVxuICogQHBhcmFtIHswfDF8MnwzfDR8NXw2fSBbb3B0aW9ucy53ZWVrU3RhcnRzT249MF0gLSB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGRheSBvZiB0aGUgd2VlayAoMCAtIFN1bmRheSlcbiAqIEByZXR1cm5zIHtEYXRlfSB0aGUgcGFyc2VkIGRhdGVcbiAqIEB0aHJvd3Mge1R5cGVFcnJvcn0gMyBhcmd1bWVudHMgcmVxdWlyZWRcbiAqIEB0aHJvd3Mge1JhbmdlRXJyb3J9IGBvcHRpb25zLmFkZGl0aW9uYWxEaWdpdHNgIG11c3QgYmUgMCwgMSBvciAyXG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy53ZWVrU3RhcnRzT25gIG11c3QgYmUgYmV0d2VlbiAwIGFuZCA2XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgbWF0Y2hgIHByb3BlcnR5XG4gKiBAdGhyb3dzIHtSYW5nZUVycm9yfSBgb3B0aW9ucy5sb2NhbGVgIG11c3QgY29udGFpbiBgZm9ybWF0TG9uZ2AgcHJvcGVydHlcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUGFyc2UgMTEgRmVicnVhcnkgMjAxNCBmcm9tIG1pZGRsZS1lbmRpYW4gZm9ybWF0OlxuICogdmFyIHJlc3VsdCA9IHBhcnNlKFxuICogICAnMDIvMTEvMjAxNCcsXG4gKiAgICdNTS9ERC9ZWVlZJyxcbiAqICAgbmV3IERhdGUoKVxuICogKVxuICogLy89PiBUdWUgRmViIDExIDIwMTQgMDA6MDA6MDBcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gUGFyc2UgMjh0aCBvZiBGZWJydWFyeSBpbiBFbmdsaXNoIGxvY2FsZSBpbiB0aGUgY29udGV4dCBvZiAyMDEwIHllYXI6XG4gKiBpbXBvcnQgZW9Mb2NhbGUgZnJvbSAnZGF0ZS1mbnMvbG9jYWxlL2VvJ1xuICogdmFyIHJlc3VsdCA9IHBhcnNlKFxuICogICAnMjgtYSBkZSBmZWJydWFybycsXG4gKiAgICdEbyBbZGVdIE1NTU0nLFxuICogICBuZXcgRGF0ZSgyMDEwLCAwLCAxKVxuICogICB7bG9jYWxlOiBlb0xvY2FsZX1cbiAqIClcbiAqIC8vPT4gU3VuIEZlYiAyOCAyMDEwIDAwOjAwOjAwXG4gKi9cbmZ1bmN0aW9uIHBhcnNlIChkaXJ0eURhdGVTdHJpbmcsIGRpcnR5Rm9ybWF0U3RyaW5nLCBkaXJ0eUJhc2VEYXRlLCBkaXJ0eU9wdGlvbnMpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignMyBhcmd1bWVudHMgcmVxdWlyZWQsIGJ1dCBvbmx5ICcgKyBhcmd1bWVudHMubGVuZ3RoICsgJyBwcmVzZW50JylcbiAgfVxuXG4gIHZhciBkYXRlU3RyaW5nID0gU3RyaW5nKGRpcnR5RGF0ZVN0cmluZyk7XG4gIHZhciBvcHRpb25zID0gZGlydHlPcHRpb25zIHx8IHt9O1xuXG4gIHZhciB3ZWVrU3RhcnRzT24gPSBvcHRpb25zLndlZWtTdGFydHNPbiA9PT0gdW5kZWZpbmVkID8gMCA6IE51bWJlcihvcHRpb25zLndlZWtTdGFydHNPbik7XG5cbiAgLy8gVGVzdCBpZiB3ZWVrU3RhcnRzT24gaXMgYmV0d2VlbiAwIGFuZCA2IF9hbmRfIGlzIG5vdCBOYU5cbiAgaWYgKCEod2Vla1N0YXJ0c09uID49IDAgJiYgd2Vla1N0YXJ0c09uIDw9IDYpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3dlZWtTdGFydHNPbiBtdXN0IGJlIGJldHdlZW4gMCBhbmQgNiBpbmNsdXNpdmVseScpXG4gIH1cblxuICB2YXIgbG9jYWxlID0gb3B0aW9ucy5sb2NhbGUgfHwgbG9jYWxlJDI7XG4gIHZhciBsb2NhbGVQYXJzZXJzID0gbG9jYWxlLnBhcnNlcnMgfHwge307XG4gIHZhciBsb2NhbGVVbml0cyA9IGxvY2FsZS51bml0cyB8fCB7fTtcblxuICBpZiAoIWxvY2FsZS5tYXRjaCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdsb2NhbGUgbXVzdCBjb250YWluIG1hdGNoIHByb3BlcnR5JylcbiAgfVxuXG4gIGlmICghbG9jYWxlLmZvcm1hdExvbmcpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignbG9jYWxlIG11c3QgY29udGFpbiBmb3JtYXRMb25nIHByb3BlcnR5JylcbiAgfVxuXG4gIHZhciBmb3JtYXRTdHJpbmcgPSBTdHJpbmcoZGlydHlGb3JtYXRTdHJpbmcpXG4gICAgLnJlcGxhY2UobG9uZ0Zvcm1hdHRpbmdUb2tlbnNSZWdFeHAkMSwgZnVuY3Rpb24gKHN1YnN0cmluZykge1xuICAgICAgaWYgKHN1YnN0cmluZ1swXSA9PT0gJ1snKSB7XG4gICAgICAgIHJldHVybiBzdWJzdHJpbmdcbiAgICAgIH1cblxuICAgICAgaWYgKHN1YnN0cmluZ1swXSA9PT0gJ1xcXFwnKSB7XG4gICAgICAgIHJldHVybiBjbGVhbkVzY2FwZWRTdHJpbmckMShzdWJzdHJpbmcpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsb2NhbGUuZm9ybWF0TG9uZyhzdWJzdHJpbmcpXG4gICAgfSk7XG5cbiAgaWYgKGZvcm1hdFN0cmluZyA9PT0gJycpIHtcbiAgICBpZiAoZGF0ZVN0cmluZyA9PT0gJycpIHtcbiAgICAgIHJldHVybiB0b0RhdGUoZGlydHlCYXNlRGF0ZSwgb3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTilcbiAgICB9XG4gIH1cblxuICB2YXIgc3ViRm5PcHRpb25zID0gY2xvbmVPYmplY3Qob3B0aW9ucyk7XG4gIHN1YkZuT3B0aW9ucy5sb2NhbGUgPSBsb2NhbGU7XG5cbiAgdmFyIHRva2VucyA9IGZvcm1hdFN0cmluZy5tYXRjaChsb2NhbGUucGFyc2luZ1Rva2Vuc1JlZ0V4cCB8fCBkZWZhdWx0UGFyc2luZ1Rva2Vuc1JlZ0V4cCk7XG4gIHZhciB0b2tlbnNMZW5ndGggPSB0b2tlbnMubGVuZ3RoO1xuXG4gIC8vIElmIHRpbWV6b25lIGlzbid0IHNwZWNpZmllZCwgaXQgd2lsbCBiZSBzZXQgdG8gdGhlIHN5c3RlbSB0aW1lem9uZVxuICB2YXIgc2V0dGVycyA9IFt7XG4gICAgcHJpb3JpdHk6IFRJTUVaT05FX1VOSVRfUFJJT1JJVFksXG4gICAgc2V0OiBkYXRlVG9TeXN0ZW1UaW1lem9uZSxcbiAgICBpbmRleDogMFxuICB9XTtcblxuICB2YXIgaTtcbiAgZm9yIChpID0gMDsgaSA8IHRva2Vuc0xlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuICAgIHZhciBwYXJzZXIgPSBsb2NhbGVQYXJzZXJzW3Rva2VuXSB8fCBwYXJzZXJzW3Rva2VuXTtcbiAgICBpZiAocGFyc2VyKSB7XG4gICAgICB2YXIgbWF0Y2hSZXN1bHQ7XG5cbiAgICAgIGlmIChwYXJzZXIubWF0Y2ggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgbWF0Y2hSZXN1bHQgPSBwYXJzZXIubWF0Y2guZXhlYyhkYXRlU3RyaW5nKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1hdGNoUmVzdWx0ID0gcGFyc2VyLm1hdGNoKGRhdGVTdHJpbmcsIHN1YkZuT3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghbWF0Y2hSZXN1bHQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKE5hTilcbiAgICAgIH1cblxuICAgICAgdmFyIHVuaXROYW1lID0gcGFyc2VyLnVuaXQ7XG4gICAgICB2YXIgdW5pdCA9IGxvY2FsZVVuaXRzW3VuaXROYW1lXSB8fCB1bml0c1t1bml0TmFtZV07XG5cbiAgICAgIHNldHRlcnMucHVzaCh7XG4gICAgICAgIHByaW9yaXR5OiB1bml0LnByaW9yaXR5LFxuICAgICAgICBzZXQ6IHVuaXQuc2V0LFxuICAgICAgICB2YWx1ZTogcGFyc2VyLnBhcnNlKG1hdGNoUmVzdWx0LCBzdWJGbk9wdGlvbnMpLFxuICAgICAgICBpbmRleDogc2V0dGVycy5sZW5ndGhcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgc3Vic3RyaW5nID0gbWF0Y2hSZXN1bHRbMF07XG4gICAgICBkYXRlU3RyaW5nID0gZGF0ZVN0cmluZy5zbGljZShzdWJzdHJpbmcubGVuZ3RoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGhlYWQgPSB0b2tlbnNbaV0ubWF0Y2goL15cXFsuKl0kLykgPyB0b2tlbnNbaV0ucmVwbGFjZSgvXlxcW3xdJC9nLCAnJykgOiB0b2tlbnNbaV07XG4gICAgICBpZiAoZGF0ZVN0cmluZy5pbmRleE9mKGhlYWQpID09PSAwKSB7XG4gICAgICAgIGRhdGVTdHJpbmcgPSBkYXRlU3RyaW5nLnNsaWNlKGhlYWQubGVuZ3RoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBuZXcgRGF0ZShOYU4pXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIHVuaXF1ZVByaW9yaXR5U2V0dGVycyA9IHNldHRlcnNcbiAgICAubWFwKGZ1bmN0aW9uIChzZXR0ZXIpIHtcbiAgICAgIHJldHVybiBzZXR0ZXIucHJpb3JpdHlcbiAgICB9KVxuICAgIC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYSAtIGJcbiAgICB9KVxuICAgIC5maWx0ZXIoZnVuY3Rpb24gKHByaW9yaXR5LCBpbmRleCwgYXJyYXkpIHtcbiAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKHByaW9yaXR5KSA9PT0gaW5kZXhcbiAgICB9KVxuICAgIC5tYXAoZnVuY3Rpb24gKHByaW9yaXR5KSB7XG4gICAgICByZXR1cm4gc2V0dGVyc1xuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uIChzZXR0ZXIpIHtcbiAgICAgICAgICByZXR1cm4gc2V0dGVyLnByaW9yaXR5ID09PSBwcmlvcml0eVxuICAgICAgICB9KVxuICAgICAgICAucmV2ZXJzZSgpXG4gICAgfSlcbiAgICAubWFwKGZ1bmN0aW9uIChzZXR0ZXJBcnJheSkge1xuICAgICAgcmV0dXJuIHNldHRlckFycmF5WzBdXG4gICAgfSk7XG5cbiAgdmFyIGRhdGUgPSB0b0RhdGUoZGlydHlCYXNlRGF0ZSwgb3B0aW9ucyk7XG5cbiAgaWYgKGlzTmFOKGRhdGUpKSB7XG4gICAgcmV0dXJuIG5ldyBEYXRlKE5hTilcbiAgfVxuXG4gIC8vIENvbnZlcnQgdGhlIGRhdGUgaW4gc3lzdGVtIHRpbWV6b25lIHRvIHRoZSBzYW1lIGRhdGUgaW4gVVRDKzAwOjAwIHRpbWV6b25lLlxuICAvLyBUaGlzIGVuc3VyZXMgdGhhdCB3aGVuIFVUQyBmdW5jdGlvbnMgd2lsbCBiZSBpbXBsZW1lbnRlZCwgbG9jYWxlcyB3aWxsIGJlIGNvbXBhdGlibGUgd2l0aCB0aGVtLlxuICAvLyBTZWUgYW4gaXNzdWUgYWJvdXQgVVRDIGZ1bmN0aW9uczogaHR0cHM6Ly9naXRodWIuY29tL2RhdGUtZm5zL2RhdGUtZm5zL2lzc3Vlcy8zN1xuICB2YXIgdXRjRGF0ZSA9IHN1Yk1pbnV0ZXMoZGF0ZSwgZGF0ZS5nZXRUaW1lem9uZU9mZnNldCgpKTtcblxuICB2YXIgZGF0ZVZhbHVlcyA9IHtkYXRlOiB1dGNEYXRlfTtcblxuICB2YXIgc2V0dGVyc0xlbmd0aCA9IHVuaXF1ZVByaW9yaXR5U2V0dGVycy5sZW5ndGg7XG4gIGZvciAoaSA9IDA7IGkgPCBzZXR0ZXJzTGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc2V0dGVyID0gdW5pcXVlUHJpb3JpdHlTZXR0ZXJzW2ldO1xuICAgIGRhdGVWYWx1ZXMgPSBzZXR0ZXIuc2V0KGRhdGVWYWx1ZXMsIHNldHRlci52YWx1ZSwgc3ViRm5PcHRpb25zKTtcbiAgfVxuXG4gIHJldHVybiBkYXRlVmFsdWVzLmRhdGVcbn1cblxuZnVuY3Rpb24gZGF0ZVRvU3lzdGVtVGltZXpvbmUgKGRhdGVWYWx1ZXMpIHtcbiAgdmFyIGRhdGUgPSBkYXRlVmFsdWVzLmRhdGU7XG4gIHZhciB0aW1lID0gZGF0ZS5nZXRUaW1lKCk7XG5cbiAgLy8gR2V0IHRoZSBzeXN0ZW0gdGltZXpvbmUgb2Zmc2V0IGF0IChtb21lbnQgb2YgdGltZSAtIG9mZnNldClcbiAgdmFyIG9mZnNldCA9IGRhdGUuZ2V0VGltZXpvbmVPZmZzZXQoKTtcblxuICAvLyBHZXQgdGhlIHN5c3RlbSB0aW1lem9uZSBvZmZzZXQgYXQgdGhlIGV4YWN0IG1vbWVudCBvZiB0aW1lXG4gIG9mZnNldCA9IG5ldyBEYXRlKHRpbWUgKyBvZmZzZXQgKiBNSUxMSVNFQ09ORFNfSU5fTUlOVVRFJDYpLmdldFRpbWV6b25lT2Zmc2V0KCk7XG5cbiAgLy8gQ29udmVydCBkYXRlIGluIHRpbWV6b25lIFwiVVRDKzAwOjAwXCIgdG8gdGhlIHN5c3RlbSB0aW1lem9uZVxuICBkYXRlVmFsdWVzLmRhdGUgPSBuZXcgRGF0ZSh0aW1lICsgb2Zmc2V0ICogTUlMTElTRUNPTkRTX0lOX01JTlVURSQ2KTtcblxuICByZXR1cm4gZGF0ZVZhbHVlc1xufVxuXG5mdW5jdGlvbiBjbGVhbkVzY2FwZWRTdHJpbmckMSAoaW5wdXQpIHtcbiAgaWYgKGlucHV0Lm1hdGNoKC9cXFtbXFxzXFxTXS8pKSB7XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15cXFt8XSQvZywgJycpXG4gIH1cbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcXFwvZywgJycpXG59XG5cbi8vIFRoaXMgZmlsZSBpcyBnZW5lcmF0ZWQgYXV0b21hdGljYWxseSBieSBgc2NyaXB0cy9idWlsZC9pbmRpY2VzLmpzYC4gUGxlYXNlLCBkb24ndCBjaGFuZ2UgaXQuXG5cbi8qKlxuICogQ3VzdG9tIHBhcnNlIGJlaGF2aW9yIG9uIHRvcCBvZiBkYXRlLWZucyBwYXJzZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7U3RyaW5nfSBkYXRlXG4gKiBAcGFyYW0ge1N0cmluZ30gZm9ybWF0XG4gKiBAcmV0dXJuIHtEYXRlfG51bGx9XG4gKi9cbnZhciBwYXJzZURhdGUkMSA9IGZ1bmN0aW9uIChkYXRlLCBmb3JtYXQkJDEpIHtcbiAgdmFyIHBhcnNlZCA9IHBhcnNlKGRhdGUsIGZvcm1hdCQkMSwgbmV3IERhdGUoKSk7XG5cbiAgLy8gaWYgZGF0ZSBpcyBub3QgdmFsaWQgb3IgdGhlIGZvcm1hdHRlZCBvdXRwdXQgYWZ0ZXIgcGFyc2luZyBkb2VzIG5vdCBtYXRjaFxuICAvLyB0aGUgc3RyaW5nIHZhbHVlIHBhc3NlZCBpbiAoYXZvaWRzIG92ZXJmbG93cylcbiAgaWYgKCFpc1ZhbGlkKHBhcnNlZCkgfHwgZm9ybWF0KHBhcnNlZCwgZm9ybWF0JCQxKSAhPT0gZGF0ZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIHBhcnNlZDtcbn07XG5cbnZhciBhZnRlciA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVmKSB7XG4gIHZhciBvdGhlclZhbHVlID0gcmVmWzBdO1xuICB2YXIgaW5jbHVzaW9uID0gcmVmWzFdO1xuICB2YXIgZm9ybWF0ID0gcmVmWzJdO1xuXG4gIGlmICh0eXBlb2YgZm9ybWF0ID09PSAndW5kZWZpbmVkJykge1xuICAgIGZvcm1hdCA9IGluY2x1c2lvbjtcbiAgICBpbmNsdXNpb24gPSBmYWxzZTtcbiAgfVxuICB2YWx1ZSA9IHBhcnNlRGF0ZSQxKHZhbHVlLCBmb3JtYXQpO1xuICBvdGhlclZhbHVlID0gcGFyc2VEYXRlJDEob3RoZXJWYWx1ZSwgZm9ybWF0KTtcblxuICAvLyBpZiBlaXRoZXIgaXMgbm90IHZhbGlkLlxuICBpZiAoIXZhbHVlIHx8ICFvdGhlclZhbHVlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIGlzQWZ0ZXIodmFsdWUsIG90aGVyVmFsdWUpIHx8IChpbmNsdXNpb24gJiYgaXNFcXVhbCQxKHZhbHVlLCBvdGhlclZhbHVlKSk7XG59O1xuXG4vKipcbiAqIFNvbWUgQWxwaGEgUmVnZXggaGVscGVycy5cbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9jaHJpc28vdmFsaWRhdG9yLmpzL2Jsb2IvbWFzdGVyL3NyYy9saWIvYWxwaGEuanNcbiAqL1xuXG52YXIgYWxwaGEkMSA9IHtcbiAgZW46IC9eW0EtWl0qJC9pLFxuICBjczogL15bQS1aw4HEjMSOw4nEmsONxYfDk8WYxaDFpMOaxa7DncW9XSokL2ksXG4gIGRhOiAvXltBLVrDhsOYw4VdKiQvaSxcbiAgZGU6IC9eW0EtWsOEw5bDnMOfXSokL2ksXG4gIGVzOiAvXltBLVrDgcOJw43DkcOTw5rDnF0qJC9pLFxuICBmcjogL15bQS1aw4DDgsOGw4fDicOIw4rDi8OPw47DlMWSw5nDm8OcxbhdKiQvaSxcbiAgbHQ6IC9eW0EtWsSExIzEmMSWxK7FoMWyxarFvV0qJC9pLFxuICBubDogL15bQS1aw4nDi8OPw5PDlsOcXSokL2ksXG4gIGh1OiAvXltBLVrDgcOJw43Dk8OWxZDDmsOcxbBdKiQvaSxcbiAgcGw6IC9eW0EtWsSExIbEmMWaxYHFg8OTxbvFuV0qJC9pLFxuICBwdDogL15bQS1aw4PDgcOAw4LDh8OJw4rDjcOVw5PDlMOaw5xdKiQvaSxcbiAgcnU6IC9eW9CQLdCv0IFdKiQvaSxcbiAgc2s6IC9eW0EtWsOBw4TEjMSOw4nDjcS5xL3Fh8OTxZTFoMWkw5rDncW9XSokL2ksXG4gIHNyOiAvXltBLVrEjMSGxb3FoMSQXSokL2ksXG4gIHRyOiAvXltBLVrDh8SexLDEscOWxZ7DnF0qJC9pLFxuICB1azogL15b0JAt0KnQrNCu0K/QhNCG0IfSkF0qJC9pLFxuICBhcjogL15b2KHYotij2KTYpdim2KfYqNip2KrYq9is2K3Yrtiv2LDYsdiy2LPYtNi12LbYt9i42LnYutmB2YLZg9mE2YXZhtmH2YjZidmK2YvZjNmN2Y7Zj9mQ2ZHZktmwXSokL1xufTtcblxudmFyIGFscGhhU3BhY2VzID0ge1xuICBlbjogL15bQS1aXFxzXSokL2ksXG4gIGNzOiAvXltBLVrDgcSMxI7DicSaw43Fh8OTxZjFoMWkw5rFrsOdxb1cXHNdKiQvaSxcbiAgZGE6IC9eW0EtWsOGw5jDhVxcc10qJC9pLFxuICBkZTogL15bQS1aw4TDlsOcw59cXHNdKiQvaSxcbiAgZXM6IC9eW0EtWsOBw4nDjcORw5PDmsOcXFxzXSokL2ksXG4gIGZyOiAvXltBLVrDgMOCw4bDh8OJw4jDisOLw4/DjsOUxZLDmcObw5zFuFxcc10qJC9pLFxuICBsdDogL15bQS1axITEjMSYxJbErsWgxbLFqsW9XFxzXSokL2ksXG4gIG5sOiAvXltBLVrDicOLw4/Dk8OWw5xcXHNdKiQvaSxcbiAgaHU6IC9eW0EtWsOBw4nDjcOTw5bFkMOaw5zFsFxcc10qJC9pLFxuICBwbDogL15bQS1axITEhsSYxZrFgcWDw5PFu8W5XFxzXSokL2ksXG4gIHB0OiAvXltBLVrDg8OBw4DDgsOHw4nDisONw5XDk8OUw5rDnFxcc10qJC9pLFxuICBydTogL15b0JAt0K/QgVxcc10qJC9pLFxuICBzazogL15bQS1aw4HDhMSMxI7DicONxLnEvcWHw5PFlMWgxaTDmsOdxb1cXHNdKiQvaSxcbiAgc3I6IC9eW0EtWsSMxIbFvcWgxJBcXHNdKiQvaSxcbiAgdHI6IC9eW0EtWsOHxJ7EsMSxw5bFnsOcXFxzXSokL2ksXG4gIHVrOiAvXlvQkC3QqdCs0K7Qr9CE0IbQh9KQXFxzXSokL2ksXG4gIGFyOiAvXlvYodii2KPYpNil2KbYp9io2KnYqtir2KzYrdiu2K/YsNix2LLYs9i02LXYtti32LjYudi62YHZgtmD2YTZhdmG2YfZiNmJ2YrZi9mM2Y3ZjtmP2ZDZkdmS2bBcXHNdKiQvXG59O1xuXG52YXIgYWxwaGFudW1lcmljID0ge1xuICBlbjogL15bMC05QS1aXSokL2ksXG4gIGNzOiAvXlswLTlBLVrDgcSMxI7DicSaw43Fh8OTxZjFoMWkw5rFrsOdxb1dKiQvaSxcbiAgZGE6IC9eWzAtOUEtWsOGw5jDhV0kL2ksXG4gIGRlOiAvXlswLTlBLVrDhMOWw5zDn10qJC9pLFxuICBlczogL15bMC05QS1aw4HDicONw5HDk8Oaw5xdKiQvaSxcbiAgZnI6IC9eWzAtOUEtWsOAw4LDhsOHw4nDiMOKw4vDj8OOw5TFksOZw5vDnMW4XSokL2ksXG4gIGx0OiAvXlswLTlBLVrEhMSMxJjElsSuxaDFssWqxb1dKiQvaSxcbiAgaHU6IC9eWzAtOUEtWsOBw4nDjcOTw5bFkMOaw5zFsF0qJC9pLFxuICBubDogL15bMC05QS1aw4nDi8OPw5PDlsOcXSokL2ksXG4gIHBsOiAvXlswLTlBLVrEhMSGxJjFmsWBxYPDk8W7xbldKiQvaSxcbiAgcHQ6IC9eWzAtOUEtWsODw4HDgMOCw4fDicOKw43DlcOTw5TDmsOcXSokL2ksXG4gIHJ1OiAvXlswLTnQkC3Qr9CBXSokL2ksXG4gIHNrOiAvXlswLTlBLVrDgcOExIzEjsOJw43EucS9xYfDk8WUxaDFpMOaw53FvV0qJC9pLFxuICBzcjogL15bMC05QS1axIzEhsW9xaDEkF0qJC9pLFxuICB0cjogL15bMC05QS1aw4fEnsSwxLHDlsWew5xdKiQvaSxcbiAgdWs6IC9eWzAtOdCQLdCp0KzQrtCv0ITQhtCH0pBdKiQvaSxcbiAgYXI6IC9eW9mg2aHZotmj2aTZpdmm2afZqNmpMC052KHYotij2KTYpdim2KfYqNip2KrYq9is2K3Yrtiv2LDYsdiy2LPYtNi12LbYt9i42LnYutmB2YLZg9mE2YXZhtmH2YjZidmK2YvZjNmN2Y7Zj9mQ2ZHZktmwXSokL1xufTtcblxudmFyIGFscGhhRGFzaCA9IHtcbiAgZW46IC9eWzAtOUEtWl8tXSokL2ksXG4gIGNzOiAvXlswLTlBLVrDgcSMxI7DicSaw43Fh8OTxZjFoMWkw5rFrsOdxb1fLV0qJC9pLFxuICBkYTogL15bMC05QS1aw4bDmMOFXy1dKiQvaSxcbiAgZGU6IC9eWzAtOUEtWsOEw5bDnMOfXy1dKiQvaSxcbiAgZXM6IC9eWzAtOUEtWsOBw4nDjcORw5PDmsOcXy1dKiQvaSxcbiAgZnI6IC9eWzAtOUEtWsOAw4LDhsOHw4nDiMOKw4vDj8OOw5TFksOZw5vDnMW4Xy1dKiQvaSxcbiAgbHQ6IC9eWzAtOUEtWsSExIzEmMSWxK7FoMWyxarFvV8tXSokL2ksXG4gIG5sOiAvXlswLTlBLVrDicOLw4/Dk8OWw5xfLV0qJC9pLFxuICBodTogL15bMC05QS1aw4HDicONw5PDlsWQw5rDnMWwXy1dKiQvaSxcbiAgcGw6IC9eWzAtOUEtWsSExIbEmMWaxYHFg8OTxbvFuV8tXSokL2ksXG4gIHB0OiAvXlswLTlBLVrDg8OBw4DDgsOHw4nDisONw5XDk8OUw5rDnF8tXSokL2ksXG4gIHJ1OiAvXlswLTnQkC3Qr9CBXy1dKiQvaSxcbiAgc2s6IC9eWzAtOUEtWsOBw4TEjMSOw4nDjcS5xL3Fh8OTxZTFoMWkw5rDncW9Xy1dKiQvaSxcbiAgc3I6IC9eWzAtOUEtWsSMxIbFvcWgxJBfLV0qJC9pLFxuICB0cjogL15bMC05QS1aw4fEnsSwxLHDlsWew5xfLV0qJC9pLFxuICB1azogL15bMC050JAt0KnQrNCu0K/QhNCG0IfSkF8tXSokL2ksXG4gIGFyOiAvXlvZoNmh2aLZo9mk2aXZptmn2ajZqTAtOdih2KLYo9ik2KXYptin2KjYqdiq2KvYrNit2K7Yr9iw2LHYstiz2LTYtdi22LfYuNi52LrZgdmC2YPZhNmF2YbZh9mI2YnZitmL2YzZjdmO2Y/ZkNmR2ZLZsF8tXSokL1xufTtcblxudmFyIHZhbGlkYXRlID0gZnVuY3Rpb24gKHZhbHVlLCByZWYpIHtcbiAgaWYgKCByZWYgPT09IHZvaWQgMCApIHJlZiA9IFtudWxsXTtcbiAgdmFyIGxvY2FsZSA9IHJlZlswXTtcblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuZXZlcnkoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gdmFsaWRhdGUodmFsLCBbbG9jYWxlXSk7IH0pO1xuICB9XG5cbiAgLy8gTWF0Y2ggYXQgbGVhc3Qgb25lIGxvY2FsZS5cbiAgaWYgKCEgbG9jYWxlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGFscGhhJDEpLnNvbWUoZnVuY3Rpb24gKGxvYykgeyByZXR1cm4gYWxwaGEkMVtsb2NdLnRlc3QodmFsdWUpOyB9KTtcbiAgfVxuXG4gIHJldHVybiAoYWxwaGEkMVtsb2NhbGVdIHx8IGFscGhhJDEuZW4pLnRlc3QodmFsdWUpO1xufTtcblxudmFyIHZhbGlkYXRlJDEgPSBmdW5jdGlvbiAodmFsdWUsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0gW251bGxdO1xuICB2YXIgbG9jYWxlID0gcmVmWzBdO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5ldmVyeShmdW5jdGlvbiAodmFsKSB7IHJldHVybiB2YWxpZGF0ZSQxKHZhbCwgW2xvY2FsZV0pOyB9KTtcbiAgfVxuXG4gIC8vIE1hdGNoIGF0IGxlYXN0IG9uZSBsb2NhbGUuXG4gIGlmICghIGxvY2FsZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhhbHBoYURhc2gpLnNvbWUoZnVuY3Rpb24gKGxvYykgeyByZXR1cm4gYWxwaGFEYXNoW2xvY10udGVzdCh2YWx1ZSk7IH0pO1xuICB9XG5cbiAgcmV0dXJuIChhbHBoYURhc2hbbG9jYWxlXSB8fCBhbHBoYURhc2guZW4pLnRlc3QodmFsdWUpO1xufTtcblxudmFyIHZhbGlkYXRlJDIgPSBmdW5jdGlvbiAodmFsdWUsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0gW251bGxdO1xuICB2YXIgbG9jYWxlID0gcmVmWzBdO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5ldmVyeShmdW5jdGlvbiAodmFsKSB7IHJldHVybiB2YWxpZGF0ZSQyKHZhbCwgW2xvY2FsZV0pOyB9KTtcbiAgfVxuXG4gIC8vIE1hdGNoIGF0IGxlYXN0IG9uZSBsb2NhbGUuXG4gIGlmICghIGxvY2FsZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhhbHBoYW51bWVyaWMpLnNvbWUoZnVuY3Rpb24gKGxvYykgeyByZXR1cm4gYWxwaGFudW1lcmljW2xvY10udGVzdCh2YWx1ZSk7IH0pO1xuICB9XG5cbiAgcmV0dXJuIChhbHBoYW51bWVyaWNbbG9jYWxlXSB8fCBhbHBoYW51bWVyaWMuZW4pLnRlc3QodmFsdWUpO1xufTtcblxudmFyIHZhbGlkYXRlJDMgPSBmdW5jdGlvbiAodmFsdWUsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0gW251bGxdO1xuICB2YXIgbG9jYWxlID0gcmVmWzBdO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZS5ldmVyeShmdW5jdGlvbiAodmFsKSB7IHJldHVybiB2YWxpZGF0ZSQzKHZhbCwgW2xvY2FsZV0pOyB9KTtcbiAgfVxuXG4gIC8vIE1hdGNoIGF0IGxlYXN0IG9uZSBsb2NhbGUuXG4gIGlmICghIGxvY2FsZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhhbHBoYVNwYWNlcykuc29tZShmdW5jdGlvbiAobG9jKSB7IHJldHVybiBhbHBoYVNwYWNlc1tsb2NdLnRlc3QodmFsdWUpOyB9KTtcbiAgfVxuXG4gIHJldHVybiAoYWxwaGFTcGFjZXNbbG9jYWxlXSB8fCBhbHBoYVNwYWNlcy5lbikudGVzdCh2YWx1ZSk7XG59O1xuXG52YXIgYmVmb3JlID0gZnVuY3Rpb24gKHZhbHVlLCByZWYpIHtcbiAgdmFyIG90aGVyVmFsdWUgPSByZWZbMF07XG4gIHZhciBpbmNsdXNpb24gPSByZWZbMV07XG4gIHZhciBmb3JtYXQgPSByZWZbMl07XG5cbiAgaWYgKHR5cGVvZiBmb3JtYXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZm9ybWF0ID0gaW5jbHVzaW9uO1xuICAgIGluY2x1c2lvbiA9IGZhbHNlO1xuICB9XG4gIHZhbHVlID0gcGFyc2VEYXRlJDEodmFsdWUsIGZvcm1hdCk7XG4gIG90aGVyVmFsdWUgPSBwYXJzZURhdGUkMShvdGhlclZhbHVlLCBmb3JtYXQpO1xuXG4gIC8vIGlmIGVpdGhlciBpcyBub3QgdmFsaWQuXG4gIGlmICghdmFsdWUgfHwgIW90aGVyVmFsdWUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gaXNCZWZvcmUodmFsdWUsIG90aGVyVmFsdWUpIHx8IChpbmNsdXNpb24gJiYgaXNFcXVhbCQxKHZhbHVlLCBvdGhlclZhbHVlKSk7XG59O1xuXG52YXIgdmFsaWRhdGUkNCA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVmKSB7XG4gIHZhciBtaW4gPSByZWZbMF07XG4gIHZhciBtYXggPSByZWZbMV07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIHZhbGlkYXRlJDQodmFsLCBbbWluLCBtYXhdKTsgfSk7XG4gIH1cblxuICByZXR1cm4gTnVtYmVyKG1pbikgPD0gdmFsdWUgJiYgTnVtYmVyKG1heCkgPj0gdmFsdWU7XG59O1xuXG52YXIgY29uZmlybWVkID0gZnVuY3Rpb24gKHZhbHVlLCBvdGhlcikgeyByZXR1cm4gU3RyaW5nKHZhbHVlKSA9PT0gU3RyaW5nKG90aGVyKTsgfTtcblxuZnVuY3Rpb24gdW53cmFwRXhwb3J0cyAoeCkge1xuXHRyZXR1cm4geCAmJiB4Ll9fZXNNb2R1bGUgPyB4WydkZWZhdWx0J10gOiB4O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVDb21tb25qc01vZHVsZShmbiwgbW9kdWxlKSB7XG5cdHJldHVybiBtb2R1bGUgPSB7IGV4cG9ydHM6IHt9IH0sIGZuKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMpLCBtb2R1bGUuZXhwb3J0cztcbn1cblxudmFyIGFzc2VydFN0cmluZ18xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gYXNzZXJ0U3RyaW5nO1xuZnVuY3Rpb24gYXNzZXJ0U3RyaW5nKGlucHV0KSB7XG4gIHZhciBpc1N0cmluZyA9IHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHwgaW5wdXQgaW5zdGFuY2VvZiBTdHJpbmc7XG5cbiAgaWYgKCFpc1N0cmluZykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoaXMgbGlicmFyeSAodmFsaWRhdG9yLmpzKSB2YWxpZGF0ZXMgc3RyaW5ncyBvbmx5Jyk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xufSk7XG5cbnVud3JhcEV4cG9ydHMoYXNzZXJ0U3RyaW5nXzEpO1xuXG52YXIgaXNDcmVkaXRDYXJkXzEgPSBjcmVhdGVDb21tb25qc01vZHVsZShmdW5jdGlvbiAobW9kdWxlLCBleHBvcnRzKSB7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBpc0NyZWRpdENhcmQ7XG5cblxuXG52YXIgX2Fzc2VydFN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGFzc2VydFN0cmluZ18xKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWxlbiAqL1xudmFyIGNyZWRpdENhcmQgPSAvXig/OjRbMC05XXsxMn0oPzpbMC05XXszfSk/fDVbMS01XVswLTldezE0fXwoMjIyWzEtOV18MjJbMy05XVswLTldfDJbMy02XVswLTldezJ9fDI3WzAxXVswLTldfDI3MjApWzAtOV17MTJ9fDYoPzowMTF8NVswLTldWzAtOV0pWzAtOV17MTJ9fDNbNDddWzAtOV17MTN9fDMoPzowWzAtNV18WzY4XVswLTldKVswLTldezExfXwoPzoyMTMxfDE4MDB8MzVcXGR7M30pXFxkezExfXw2MlswLTldezE0fSkkLztcbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuXG5mdW5jdGlvbiBpc0NyZWRpdENhcmQoc3RyKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nMi5kZWZhdWx0KShzdHIpO1xuICB2YXIgc2FuaXRpemVkID0gc3RyLnJlcGxhY2UoL1stIF0rL2csICcnKTtcbiAgaWYgKCFjcmVkaXRDYXJkLnRlc3Qoc2FuaXRpemVkKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgc3VtID0gMDtcbiAgdmFyIGRpZ2l0ID0gdm9pZCAwO1xuICB2YXIgdG1wTnVtID0gdm9pZCAwO1xuICB2YXIgc2hvdWxkRG91YmxlID0gdm9pZCAwO1xuICBmb3IgKHZhciBpID0gc2FuaXRpemVkLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgZGlnaXQgPSBzYW5pdGl6ZWQuc3Vic3RyaW5nKGksIGkgKyAxKTtcbiAgICB0bXBOdW0gPSBwYXJzZUludChkaWdpdCwgMTApO1xuICAgIGlmIChzaG91bGREb3VibGUpIHtcbiAgICAgIHRtcE51bSAqPSAyO1xuICAgICAgaWYgKHRtcE51bSA+PSAxMCkge1xuICAgICAgICBzdW0gKz0gdG1wTnVtICUgMTAgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VtICs9IHRtcE51bTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3VtICs9IHRtcE51bTtcbiAgICB9XG4gICAgc2hvdWxkRG91YmxlID0gIXNob3VsZERvdWJsZTtcbiAgfVxuICByZXR1cm4gISEoc3VtICUgMTAgPT09IDAgPyBzYW5pdGl6ZWQgOiBmYWxzZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0pO1xuXG52YXIgaXNDcmVkaXRDYXJkID0gdW53cmFwRXhwb3J0cyhpc0NyZWRpdENhcmRfMSk7XG5cbnZhciBjcmVkaXRfY2FyZCA9IGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gaXNDcmVkaXRDYXJkKFN0cmluZyh2YWx1ZSkpOyB9O1xuXG52YXIgdmFsaWRhdGUkNSA9IGZ1bmN0aW9uICh2YWx1ZSwgcGFyYW1zKSB7XG4gIHZhciBkZWNpbWFscyA9IEFycmF5LmlzQXJyYXkocGFyYW1zKSA/IChwYXJhbXNbMF0gfHwgJyonKSA6ICcqJztcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIHZhbGlkYXRlJDUodmFsLCBwYXJhbXMpOyB9KTtcbiAgfVxuXG4gIGlmICh2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gaWYgaXMgMC5cbiAgaWYgKE51bWJlcihkZWNpbWFscykgPT09IDApIHtcbiAgICByZXR1cm4gL14tP1xcZCokLy50ZXN0KHZhbHVlKTtcbiAgfVxuXG4gIHZhciByZWdleFBhcnQgPSBkZWNpbWFscyA9PT0gJyonID8gJysnIDogKFwiezEsXCIgKyBkZWNpbWFscyArIFwifVwiKTtcbiAgdmFyIHJlZ2V4ID0gbmV3IFJlZ0V4cCgoXCJeLT9cXFxcZCooXFxcXC5cXFxcZFwiICsgcmVnZXhQYXJ0ICsgXCIpPyRcIikpO1xuXG4gIGlmICghIHJlZ2V4LnRlc3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdmFyIHBhcnNlZFZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgcmV0dXJuIHBhcnNlZFZhbHVlID09PSBwYXJzZWRWYWx1ZTtcbn07XG5cbnZhciBkYXRlX2JldHdlZW4gPSBmdW5jdGlvbiAodmFsdWUsIHBhcmFtcykge1xuICB2YXIgbWluO1xuICB2YXIgbWF4O1xuICB2YXIgZm9ybWF0O1xuICB2YXIgaW5jbHVzaXZpdHkgPSAnKCknO1xuXG4gIGlmIChwYXJhbXMubGVuZ3RoID4gMykge1xuICAgIHZhciBhc3NpZ247XG4gICAgKGFzc2lnbiA9IHBhcmFtcywgbWluID0gYXNzaWduWzBdLCBtYXggPSBhc3NpZ25bMV0sIGluY2x1c2l2aXR5ID0gYXNzaWduWzJdLCBmb3JtYXQgPSBhc3NpZ25bM10pO1xuICB9IGVsc2Uge1xuICAgIHZhciBhc3NpZ24kMTtcbiAgICAoYXNzaWduJDEgPSBwYXJhbXMsIG1pbiA9IGFzc2lnbiQxWzBdLCBtYXggPSBhc3NpZ24kMVsxXSwgZm9ybWF0ID0gYXNzaWduJDFbMl0pO1xuICB9XG5cbiAgdmFyIG1pbkRhdGUgPSBwYXJzZURhdGUkMShtaW4sIGZvcm1hdCk7XG4gIHZhciBtYXhEYXRlID0gcGFyc2VEYXRlJDEobWF4LCBmb3JtYXQpO1xuICB2YXIgZGF0ZVZhbCA9IHBhcnNlRGF0ZSQxKHZhbHVlLCBmb3JtYXQpO1xuXG4gIGlmICghbWluRGF0ZSB8fCAhbWF4RGF0ZSB8fCAhZGF0ZVZhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpbmNsdXNpdml0eSA9PT0gJygpJykge1xuICAgIHJldHVybiBpc0FmdGVyKGRhdGVWYWwsIG1pbkRhdGUpICYmIGlzQmVmb3JlKGRhdGVWYWwsIG1heERhdGUpO1xuICB9XG5cbiAgaWYgKGluY2x1c2l2aXR5ID09PSAnKF0nKSB7XG4gICAgcmV0dXJuIGlzQWZ0ZXIoZGF0ZVZhbCwgbWluRGF0ZSkgJiYgKGlzRXF1YWwkMShkYXRlVmFsLCBtYXhEYXRlKSB8fCBpc0JlZm9yZShkYXRlVmFsLCBtYXhEYXRlKSk7XG4gIH1cblxuICBpZiAoaW5jbHVzaXZpdHkgPT09ICdbKScpIHtcbiAgICByZXR1cm4gaXNCZWZvcmUoZGF0ZVZhbCwgbWF4RGF0ZSkgJiYgKGlzRXF1YWwkMShkYXRlVmFsLCBtaW5EYXRlKSB8fCBpc0FmdGVyKGRhdGVWYWwsIG1pbkRhdGUpKTtcbiAgfVxuXG4gIHJldHVybiBpc0VxdWFsJDEoZGF0ZVZhbCwgbWF4RGF0ZSkgfHwgaXNFcXVhbCQxKGRhdGVWYWwsIG1pbkRhdGUpIHx8XG4gICAgICAgIChpc0JlZm9yZShkYXRlVmFsLCBtYXhEYXRlKSAmJiBpc0FmdGVyKGRhdGVWYWwsIG1pbkRhdGUpKTtcbn07XG5cbnZhciBkYXRlX2Zvcm1hdCA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVmKSB7XG4gIHZhciBmb3JtYXQgPSByZWZbMF07XG5cbiAgcmV0dXJuICEhcGFyc2VEYXRlJDEodmFsdWUsIGZvcm1hdCk7XG59O1xuXG52YXIgdmFsaWRhdGUkNiA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVmKSB7XG4gIHZhciBsZW5ndGggPSByZWZbMF07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIHZhbGlkYXRlJDYodmFsLCBbbGVuZ3RoXSk7IH0pO1xuICB9XG4gIHZhciBzdHJWYWwgPSBTdHJpbmcodmFsdWUpO1xuXG4gIHJldHVybiAvXlswLTldKiQvLnRlc3Qoc3RyVmFsKSAmJiBzdHJWYWwubGVuZ3RoID09PSBOdW1iZXIobGVuZ3RoKTtcbn07XG5cbnZhciB2YWxpZGF0ZUltYWdlID0gZnVuY3Rpb24gKGZpbGUsIHdpZHRoLCBoZWlnaHQpIHtcbiAgdmFyIFVSTCA9IHdpbmRvdy5VUkwgfHwgd2luZG93LndlYmtpdFVSTDtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG4gICAgdmFyIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uub25lcnJvciA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlc29sdmUoeyB2YWxpZDogZmFsc2UgfSk7IH07XG4gICAgaW1hZ2Uub25sb2FkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gcmVzb2x2ZSh7XG4gICAgICB2YWxpZDogaW1hZ2Uud2lkdGggPT09IE51bWJlcih3aWR0aCkgJiYgaW1hZ2UuaGVpZ2h0ID09PSBOdW1iZXIoaGVpZ2h0KVxuICAgIH0pOyB9O1xuXG4gICAgaW1hZ2Uuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlKTtcbiAgfSk7XG59O1xuXG52YXIgZGltZW5zaW9ucyA9IGZ1bmN0aW9uIChmaWxlcywgcmVmKSB7XG4gIHZhciB3aWR0aCA9IHJlZlswXTtcbiAgdmFyIGhlaWdodCA9IHJlZlsxXTtcblxuICB2YXIgbGlzdCA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gaWYgZmlsZSBpcyBub3QgYW4gaW1hZ2UsIHJlamVjdC5cbiAgICBpZiAoISAvXFwuKGpwZ3xzdmd8anBlZ3xwbmd8Ym1wfGdpZikkL2kudGVzdChmaWxlc1tpXS5uYW1lKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGxpc3QucHVzaChmaWxlc1tpXSk7XG4gIH1cblxuICByZXR1cm4gUHJvbWlzZS5hbGwobGlzdC5tYXAoZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIHZhbGlkYXRlSW1hZ2UoZmlsZSwgd2lkdGgsIGhlaWdodCk7IH0pKTtcbn07XG5cbnZhciBtZXJnZV8xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gbWVyZ2U7XG5mdW5jdGlvbiBtZXJnZSgpIHtcbiAgdmFyIG9iaiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG4gIHZhciBkZWZhdWx0cyA9IGFyZ3VtZW50c1sxXTtcblxuICBmb3IgKHZhciBrZXkgaW4gZGVmYXVsdHMpIHtcbiAgICBpZiAodHlwZW9mIG9ialtrZXldID09PSAndW5kZWZpbmVkJykge1xuICAgICAgb2JqW2tleV0gPSBkZWZhdWx0c1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG59KTtcblxudW53cmFwRXhwb3J0cyhtZXJnZV8xKTtcblxudmFyIGlzQnl0ZUxlbmd0aF8xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGlzQnl0ZUxlbmd0aDtcblxuXG5cbnZhciBfYXNzZXJ0U3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoYXNzZXJ0U3RyaW5nXzEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBwcmVmZXItcmVzdC1wYXJhbXMgKi9cbmZ1bmN0aW9uIGlzQnl0ZUxlbmd0aChzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcyLmRlZmF1bHQpKHN0cik7XG4gIHZhciBtaW4gPSB2b2lkIDA7XG4gIHZhciBtYXggPSB2b2lkIDA7XG4gIGlmICgodHlwZW9mIG9wdGlvbnMgPT09ICd1bmRlZmluZWQnID8gJ3VuZGVmaW5lZCcgOiBfdHlwZW9mKG9wdGlvbnMpKSA9PT0gJ29iamVjdCcpIHtcbiAgICBtaW4gPSBvcHRpb25zLm1pbiB8fCAwO1xuICAgIG1heCA9IG9wdGlvbnMubWF4O1xuICB9IGVsc2Uge1xuICAgIC8vIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5OiBpc0J5dGVMZW5ndGgoc3RyLCBtaW4gWywgbWF4XSlcbiAgICBtaW4gPSBhcmd1bWVudHNbMV07XG4gICAgbWF4ID0gYXJndW1lbnRzWzJdO1xuICB9XG4gIHZhciBsZW4gPSBlbmNvZGVVUkkoc3RyKS5zcGxpdCgvJS4ufC4vKS5sZW5ndGggLSAxO1xuICByZXR1cm4gbGVuID49IG1pbiAmJiAodHlwZW9mIG1heCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGVuIDw9IG1heCk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0pO1xuXG51bndyYXBFeHBvcnRzKGlzQnl0ZUxlbmd0aF8xKTtcblxudmFyIGlzRlFETiA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRkRRTjtcblxuXG5cbnZhciBfYXNzZXJ0U3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoYXNzZXJ0U3RyaW5nXzEpO1xuXG5cblxudmFyIF9tZXJnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG1lcmdlXzEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdF9mcWRuX29wdGlvbnMgPSB7XG4gIHJlcXVpcmVfdGxkOiB0cnVlLFxuICBhbGxvd191bmRlcnNjb3JlczogZmFsc2UsXG4gIGFsbG93X3RyYWlsaW5nX2RvdDogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIGlzRkRRTihzdHIsIG9wdGlvbnMpIHtcbiAgKDAsIF9hc3NlcnRTdHJpbmcyLmRlZmF1bHQpKHN0cik7XG4gIG9wdGlvbnMgPSAoMCwgX21lcmdlMi5kZWZhdWx0KShvcHRpb25zLCBkZWZhdWx0X2ZxZG5fb3B0aW9ucyk7XG5cbiAgLyogUmVtb3ZlIHRoZSBvcHRpb25hbCB0cmFpbGluZyBkb3QgYmVmb3JlIGNoZWNraW5nIHZhbGlkaXR5ICovXG4gIGlmIChvcHRpb25zLmFsbG93X3RyYWlsaW5nX2RvdCAmJiBzdHJbc3RyLmxlbmd0aCAtIDFdID09PSAnLicpIHtcbiAgICBzdHIgPSBzdHIuc3Vic3RyaW5nKDAsIHN0ci5sZW5ndGggLSAxKTtcbiAgfVxuICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJy4nKTtcbiAgaWYgKG9wdGlvbnMucmVxdWlyZV90bGQpIHtcbiAgICB2YXIgdGxkID0gcGFydHMucG9wKCk7XG4gICAgaWYgKCFwYXJ0cy5sZW5ndGggfHwgIS9eKFthLXpcXHUwMGExLVxcdWZmZmZdezIsfXx4blthLXowLTktXXsyLH0pJC9pLnRlc3QodGxkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBkaXNhbGxvdyBzcGFjZXNcbiAgICBpZiAoL1tcXHNcXHUyMDAyLVxcdTIwMEJcXHUyMDJGXFx1MjA1RlxcdTMwMDBcXHVGRUZGXFx1REI0MFxcdURDMjBdLy50ZXN0KHRsZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgZm9yICh2YXIgcGFydCwgaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHBhcnQgPSBwYXJ0c1tpXTtcbiAgICBpZiAob3B0aW9ucy5hbGxvd191bmRlcnNjb3Jlcykge1xuICAgICAgcGFydCA9IHBhcnQucmVwbGFjZSgvXy9nLCAnJyk7XG4gICAgfVxuICAgIGlmICghL15bYS16XFx1MDBhMS1cXHVmZmZmMC05LV0rJC9pLnRlc3QocGFydCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gZGlzYWxsb3cgZnVsbC13aWR0aCBjaGFyc1xuICAgIGlmICgvW1xcdWZmMDEtXFx1ZmY1ZV0vLnRlc3QocGFydCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHBhcnRbMF0gPT09ICctJyB8fCBwYXJ0W3BhcnQubGVuZ3RoIC0gMV0gPT09ICctJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xufSk7XG5cbnVud3JhcEV4cG9ydHMoaXNGUUROKTtcblxudmFyIGlzRW1haWxfMSA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzRW1haWw7XG5cblxuXG52YXIgX2Fzc2VydFN0cmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGFzc2VydFN0cmluZ18xKTtcblxuXG5cbnZhciBfbWVyZ2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChtZXJnZV8xKTtcblxuXG5cbnZhciBfaXNCeXRlTGVuZ3RoMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoaXNCeXRlTGVuZ3RoXzEpO1xuXG5cblxudmFyIF9pc0ZRRE4yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChpc0ZRRE4pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdF9lbWFpbF9vcHRpb25zID0ge1xuICBhbGxvd19kaXNwbGF5X25hbWU6IGZhbHNlLFxuICByZXF1aXJlX2Rpc3BsYXlfbmFtZTogZmFsc2UsXG4gIGFsbG93X3V0ZjhfbG9jYWxfcGFydDogdHJ1ZSxcbiAgcmVxdWlyZV90bGQ6IHRydWVcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIG1heC1sZW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnRyb2wtcmVnZXggKi9cbnZhciBkaXNwbGF5TmFtZSA9IC9eW2EtelxcZCEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XFwuXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXStbYS16XFxkISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5cXCxcXC5cXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZcXHNdKjwoLispPiQvaTtcbnZhciBlbWFpbFVzZXJQYXJ0ID0gL15bYS16XFxkISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5dKyQvaTtcbnZhciBxdW90ZWRFbWFpbFVzZXIgPSAvXihbXFxzXFx4MDEtXFx4MDhcXHgwYlxceDBjXFx4MGUtXFx4MWZcXHg3ZlxceDIxXFx4MjMtXFx4NWJcXHg1ZC1cXHg3ZV18KFxcXFxbXFx4MDEtXFx4MDlcXHgwYlxceDBjXFx4MGQtXFx4N2ZdKSkqJC9pO1xudmFyIGVtYWlsVXNlclV0ZjhQYXJ0ID0gL15bYS16XFxkISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5cXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKyQvaTtcbnZhciBxdW90ZWRFbWFpbFVzZXJVdGY4ID0gL14oW1xcc1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4N2ZcXHgyMVxceDIzLVxceDViXFx4NWQtXFx4N2VcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdfChcXFxcW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBkLVxceDdmXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKiQvaTtcbi8qIGVzbGludC1lbmFibGUgbWF4LWxlbiAqL1xuLyogZXNsaW50LWVuYWJsZSBuby1jb250cm9sLXJlZ2V4ICovXG5cbmZ1bmN0aW9uIGlzRW1haWwoc3RyLCBvcHRpb25zKSB7XG4gICgwLCBfYXNzZXJ0U3RyaW5nMi5kZWZhdWx0KShzdHIpO1xuICBvcHRpb25zID0gKDAsIF9tZXJnZTIuZGVmYXVsdCkob3B0aW9ucywgZGVmYXVsdF9lbWFpbF9vcHRpb25zKTtcblxuICBpZiAob3B0aW9ucy5yZXF1aXJlX2Rpc3BsYXlfbmFtZSB8fCBvcHRpb25zLmFsbG93X2Rpc3BsYXlfbmFtZSkge1xuICAgIHZhciBkaXNwbGF5X2VtYWlsID0gc3RyLm1hdGNoKGRpc3BsYXlOYW1lKTtcbiAgICBpZiAoZGlzcGxheV9lbWFpbCkge1xuICAgICAgc3RyID0gZGlzcGxheV9lbWFpbFsxXTtcbiAgICB9IGVsc2UgaWYgKG9wdGlvbnMucmVxdWlyZV9kaXNwbGF5X25hbWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJ0AnKTtcbiAgdmFyIGRvbWFpbiA9IHBhcnRzLnBvcCgpO1xuICB2YXIgdXNlciA9IHBhcnRzLmpvaW4oJ0AnKTtcblxuICB2YXIgbG93ZXJfZG9tYWluID0gZG9tYWluLnRvTG93ZXJDYXNlKCk7XG4gIGlmIChsb3dlcl9kb21haW4gPT09ICdnbWFpbC5jb20nIHx8IGxvd2VyX2RvbWFpbiA9PT0gJ2dvb2dsZW1haWwuY29tJykge1xuICAgIHVzZXIgPSB1c2VyLnJlcGxhY2UoL1xcLi9nLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIGlmICghKDAsIF9pc0J5dGVMZW5ndGgyLmRlZmF1bHQpKHVzZXIsIHsgbWF4OiA2NCB9KSB8fCAhKDAsIF9pc0J5dGVMZW5ndGgyLmRlZmF1bHQpKGRvbWFpbiwgeyBtYXg6IDI1NCB9KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghKDAsIF9pc0ZRRE4yLmRlZmF1bHQpKGRvbWFpbiwgeyByZXF1aXJlX3RsZDogb3B0aW9ucy5yZXF1aXJlX3RsZCB9KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh1c2VyWzBdID09PSAnXCInKSB7XG4gICAgdXNlciA9IHVzZXIuc2xpY2UoMSwgdXNlci5sZW5ndGggLSAxKTtcbiAgICByZXR1cm4gb3B0aW9ucy5hbGxvd191dGY4X2xvY2FsX3BhcnQgPyBxdW90ZWRFbWFpbFVzZXJVdGY4LnRlc3QodXNlcikgOiBxdW90ZWRFbWFpbFVzZXIudGVzdCh1c2VyKTtcbiAgfVxuXG4gIHZhciBwYXR0ZXJuID0gb3B0aW9ucy5hbGxvd191dGY4X2xvY2FsX3BhcnQgPyBlbWFpbFVzZXJVdGY4UGFydCA6IGVtYWlsVXNlclBhcnQ7XG5cbiAgdmFyIHVzZXJfcGFydHMgPSB1c2VyLnNwbGl0KCcuJyk7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdXNlcl9wYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIGlmICghcGF0dGVybi50ZXN0KHVzZXJfcGFydHNbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbn0pO1xuXG52YXIgaXNFbWFpbCA9IHVud3JhcEV4cG9ydHMoaXNFbWFpbF8xKTtcblxudmFyIHZhbGlkYXRlJDcgPSBmdW5jdGlvbiAodmFsdWUpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIGlzRW1haWwoU3RyaW5nKHZhbCkpOyB9KTtcbiAgfVxuXG4gIHJldHVybiBpc0VtYWlsKFN0cmluZyh2YWx1ZSkpO1xufTtcblxudmFyIGV4dCA9IGZ1bmN0aW9uIChmaWxlcywgZXh0ZW5zaW9ucykge1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKChcIi4oXCIgKyAoZXh0ZW5zaW9ucy5qb2luKCd8JykpICsgXCIpJFwiKSwgJ2knKTtcblxuICByZXR1cm4gZmlsZXMuZXZlcnkoZnVuY3Rpb24gKGZpbGUpIHsgcmV0dXJuIHJlZ2V4LnRlc3QoZmlsZS5uYW1lKTsgfSk7XG59O1xuXG52YXIgaW1hZ2UgPSBmdW5jdGlvbiAoZmlsZXMpIHsgcmV0dXJuIGZpbGVzLmV2ZXJ5KGZ1bmN0aW9uIChmaWxlKSB7IHJldHVybiAvXFwuKGpwZ3xzdmd8anBlZ3xwbmd8Ym1wfGdpZikkL2kudGVzdChmaWxlLm5hbWUpOyB9XG4pOyB9O1xuXG52YXIgdmFsaWRhdGUkOCA9IGZ1bmN0aW9uICh2YWx1ZSwgb3B0aW9ucykge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuZXZlcnkoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gdmFsaWRhdGUkOCh2YWwsIG9wdGlvbnMpOyB9KTtcbiAgfVxuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICByZXR1cm4gISEgb3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKG9wdGlvbikgeyByZXR1cm4gb3B0aW9uID09IHZhbHVlOyB9KS5sZW5ndGg7XG59O1xuXG52YXIgaXNJUF8xID0gY3JlYXRlQ29tbW9uanNNb2R1bGUoZnVuY3Rpb24gKG1vZHVsZSwgZXhwb3J0cykge1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0gaXNJUDtcblxuXG5cbnZhciBfYXNzZXJ0U3RyaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoYXNzZXJ0U3RyaW5nXzEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgaXB2NE1heWJlID0gL14oXFxkezEsM30pXFwuKFxcZHsxLDN9KVxcLihcXGR7MSwzfSlcXC4oXFxkezEsM30pJC87XG52YXIgaXB2NkJsb2NrID0gL15bMC05QS1GXXsxLDR9JC9pO1xuXG5mdW5jdGlvbiBpc0lQKHN0cikge1xuICB2YXIgdmVyc2lvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG5cbiAgKDAsIF9hc3NlcnRTdHJpbmcyLmRlZmF1bHQpKHN0cik7XG4gIHZlcnNpb24gPSBTdHJpbmcodmVyc2lvbik7XG4gIGlmICghdmVyc2lvbikge1xuICAgIHJldHVybiBpc0lQKHN0ciwgNCkgfHwgaXNJUChzdHIsIDYpO1xuICB9IGVsc2UgaWYgKHZlcnNpb24gPT09ICc0Jykge1xuICAgIGlmICghaXB2NE1heWJlLnRlc3Qoc3RyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoJy4nKS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICByZXR1cm4gYSAtIGI7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhcnRzWzNdIDw9IDI1NTtcbiAgfSBlbHNlIGlmICh2ZXJzaW9uID09PSAnNicpIHtcbiAgICB2YXIgYmxvY2tzID0gc3RyLnNwbGl0KCc6Jyk7XG4gICAgdmFyIGZvdW5kT21pc3Npb25CbG9jayA9IGZhbHNlOyAvLyBtYXJrZXIgdG8gaW5kaWNhdGUgOjpcblxuICAgIC8vIEF0IGxlYXN0IHNvbWUgT1MgYWNjZXB0IHRoZSBsYXN0IDMyIGJpdHMgb2YgYW4gSVB2NiBhZGRyZXNzXG4gICAgLy8gKGkuZS4gMiBvZiB0aGUgYmxvY2tzKSBpbiBJUHY0IG5vdGF0aW9uLCBhbmQgUkZDIDM0OTMgc2F5c1xuICAgIC8vIHRoYXQgJzo6ZmZmZjphLmIuYy5kJyBpcyB2YWxpZCBmb3IgSVB2NC1tYXBwZWQgSVB2NiBhZGRyZXNzZXMsXG4gICAgLy8gYW5kICc6OmEuYi5jLmQnIGlzIGRlcHJlY2F0ZWQsIGJ1dCBhbHNvIHZhbGlkLlxuICAgIHZhciBmb3VuZElQdjRUcmFuc2l0aW9uQmxvY2sgPSBpc0lQKGJsb2Nrc1tibG9ja3MubGVuZ3RoIC0gMV0sIDQpO1xuICAgIHZhciBleHBlY3RlZE51bWJlck9mQmxvY2tzID0gZm91bmRJUHY0VHJhbnNpdGlvbkJsb2NrID8gNyA6IDg7XG5cbiAgICBpZiAoYmxvY2tzLmxlbmd0aCA+IGV4cGVjdGVkTnVtYmVyT2ZCbG9ja3MpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gaW5pdGlhbCBvciBmaW5hbCA6OlxuICAgIGlmIChzdHIgPT09ICc6OicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoc3RyLnN1YnN0cigwLCAyKSA9PT0gJzo6Jykge1xuICAgICAgYmxvY2tzLnNoaWZ0KCk7XG4gICAgICBibG9ja3Muc2hpZnQoKTtcbiAgICAgIGZvdW5kT21pc3Npb25CbG9jayA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChzdHIuc3Vic3RyKHN0ci5sZW5ndGggLSAyKSA9PT0gJzo6Jykge1xuICAgICAgYmxvY2tzLnBvcCgpO1xuICAgICAgYmxvY2tzLnBvcCgpO1xuICAgICAgZm91bmRPbWlzc2lvbkJsb2NrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGJsb2Nrcy5sZW5ndGg7ICsraSkge1xuICAgICAgLy8gdGVzdCBmb3IgYSA6OiB3aGljaCBjYW4gbm90IGJlIGF0IHRoZSBzdHJpbmcgc3RhcnQvZW5kXG4gICAgICAvLyBzaW5jZSB0aG9zZSBjYXNlcyBoYXZlIGJlZW4gaGFuZGxlZCBhYm92ZVxuICAgICAgaWYgKGJsb2Nrc1tpXSA9PT0gJycgJiYgaSA+IDAgJiYgaSA8IGJsb2Nrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIGlmIChmb3VuZE9taXNzaW9uQmxvY2spIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7IC8vIG11bHRpcGxlIDo6IGluIGFkZHJlc3NcbiAgICAgICAgfVxuICAgICAgICBmb3VuZE9taXNzaW9uQmxvY2sgPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChmb3VuZElQdjRUcmFuc2l0aW9uQmxvY2sgJiYgaSA9PT0gYmxvY2tzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgLy8gaXQgaGFzIGJlZW4gY2hlY2tlZCBiZWZvcmUgdGhhdCB0aGUgbGFzdFxuICAgICAgICAvLyBibG9jayBpcyBhIHZhbGlkIElQdjQgYWRkcmVzc1xuICAgICAgfSBlbHNlIGlmICghaXB2NkJsb2NrLnRlc3QoYmxvY2tzW2ldKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChmb3VuZE9taXNzaW9uQmxvY2spIHtcbiAgICAgIHJldHVybiBibG9ja3MubGVuZ3RoID49IDE7XG4gICAgfVxuICAgIHJldHVybiBibG9ja3MubGVuZ3RoID09PSBleHBlY3RlZE51bWJlck9mQmxvY2tzO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xufSk7XG5cbnZhciBpc0lQID0gdW53cmFwRXhwb3J0cyhpc0lQXzEpO1xuXG52YXIgaXAgPSBmdW5jdGlvbiAodmFsdWUsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0gWzRdO1xuICB2YXIgdmVyc2lvbiA9IHJlZlswXTtcblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuZXZlcnkoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gaXNJUCh2YWwsIFt2ZXJzaW9uXSk7IH0pO1xuICB9XG5cbiAgcmV0dXJuIGlzSVAodmFsdWUsIHZlcnNpb24pO1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gdmFsdWUgXG4gKiBAcGFyYW0ge051bWJlcn0gbGVuZ3RoXG4gKiBAcGFyYW0ge051bWJlcn0gbWF4IFxuICovXG52YXIgY29tcGFyZSA9IGZ1bmN0aW9uICh2YWx1ZSwgbGVuZ3RoLCBtYXgpIHtcbiAgaWYgKG1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICB9XG5cbiAgLy8gY2FzdCB0byBudW1iZXIuXG4gIG1heCA9IE51bWJlcihtYXgpO1xuXG4gIHJldHVybiB2YWx1ZS5sZW5ndGggPj0gbGVuZ3RoICYmIHZhbHVlLmxlbmd0aCA8PSBtYXg7XG59O1xuXG52YXIgbGVuZ3RoID0gZnVuY3Rpb24gKHZhbHVlLCByZWYpIHtcbiAgdmFyIGxlbmd0aCA9IHJlZlswXTtcbiAgdmFyIG1heCA9IHJlZlsxXTsgaWYgKCBtYXggPT09IHZvaWQgMCApIG1heCA9IHVuZGVmaW5lZDtcblxuICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKTtcbiAgfVxuXG4gIGlmICghdmFsdWUubGVuZ3RoKSB7XG4gICAgdmFsdWUgPSB0b0FycmF5KHZhbHVlKTtcbiAgfVxuXG4gIHJldHVybiBjb21wYXJlKHZhbHVlLCBsZW5ndGgsIG1heCk7XG59O1xuXG52YXIgaW50ZWdlciA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuZXZlcnkoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gL14tP1swLTldKyQvLnRlc3QoU3RyaW5nKHZhbCkpOyB9KTtcbiAgfVxuXG4gIHJldHVybiAvXi0/WzAtOV0rJC8udGVzdChTdHJpbmcodmFsdWUpKTtcbn07XG5cbnZhciBtYXgkMSA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVmKSB7XG4gIHZhciBsZW5ndGggPSByZWZbMF07XG5cbiAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gbGVuZ3RoID49IDA7XG4gIH1cblxuICByZXR1cm4gU3RyaW5nKHZhbHVlKS5sZW5ndGggPD0gbGVuZ3RoO1xufTtcblxudmFyIG1heF92YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVmKSB7XG4gIHZhciBtYXggPSByZWZbMF07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIE51bWJlcih2YWx1ZSkgPD0gbWF4O1xufTtcblxudmFyIG1pbWVzID0gZnVuY3Rpb24gKGZpbGVzLCBtaW1lcykge1xuICB2YXIgcmVnZXggPSBuZXcgUmVnRXhwKCgobWltZXMuam9pbignfCcpLnJlcGxhY2UoJyonLCAnLisnKSkgKyBcIiRcIiksICdpJyk7XG5cbiAgcmV0dXJuIGZpbGVzLmV2ZXJ5KGZ1bmN0aW9uIChmaWxlKSB7IHJldHVybiByZWdleC50ZXN0KGZpbGUudHlwZSk7IH0pO1xufTtcblxudmFyIG1pbiQxID0gZnVuY3Rpb24gKHZhbHVlLCByZWYpIHtcbiAgdmFyIGxlbmd0aCA9IHJlZlswXTtcblxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gU3RyaW5nKHZhbHVlKS5sZW5ndGggPj0gbGVuZ3RoO1xufTtcblxudmFyIG1pbl92YWx1ZSA9IGZ1bmN0aW9uICh2YWx1ZSwgcmVmKSB7XG4gIHZhciBtaW4gPSByZWZbMF07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpIHx8IHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIE51bWJlcih2YWx1ZSkgPj0gbWluO1xufTtcblxudmFyIHZhbGlkYXRlJDkgPSBmdW5jdGlvbiAodmFsdWUsIG9wdGlvbnMpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIHZhbGlkYXRlJDkodmFsLCBvcHRpb25zKTsgfSk7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgcmV0dXJuICEgb3B0aW9ucy5maWx0ZXIoZnVuY3Rpb24gKG9wdGlvbikgeyByZXR1cm4gb3B0aW9uID09IHZhbHVlOyB9KS5sZW5ndGg7XG59O1xuXG52YXIgbnVtZXJpYyA9IGZ1bmN0aW9uICh2YWx1ZSkge1xuICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWUuZXZlcnkoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gL15bMC05XSskLy50ZXN0KFN0cmluZyh2YWwpKTsgfSk7XG4gIH1cblxuICByZXR1cm4gL15bMC05XSskLy50ZXN0KFN0cmluZyh2YWx1ZSkpO1xufTtcblxudmFyIHJlZ2V4ID0gZnVuY3Rpb24gKHZhbHVlLCByZWYpIHtcbiAgdmFyIHJlZ2V4ID0gcmVmWzBdO1xuICB2YXIgZmxhZ3MgPSByZWYuc2xpY2UoMSk7XG5cbiAgaWYgKHJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgcmV0dXJuIHJlZ2V4LnRlc3QodmFsdWUpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgsIGZsYWdzKS50ZXN0KFN0cmluZyh2YWx1ZSkpO1xufTtcblxudmFyIHJlcXVpcmVkID0gZnVuY3Rpb24gKHZhbHVlLCBwYXJhbXMpIHtcbiAgaWYgKCBwYXJhbXMgPT09IHZvaWQgMCApIHBhcmFtcyA9IFtmYWxzZV07XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuICEhIHZhbHVlLmxlbmd0aDtcbiAgfVxuXG4gIC8vIGluY2FzZSBhIGZpZWxkIGNvbnNpZGVycyBgZmFsc2VgIGFzIGFuIGVtcHR5IHZhbHVlIGxpa2UgY2hlY2tib3hlcy5cbiAgdmFyIGludmFsaWRhdGVGYWxzZSA9IHBhcmFtc1swXTtcbiAgaWYgKHZhbHVlID09PSBmYWxzZSAmJiBpbnZhbGlkYXRlRmFsc2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiAhISBTdHJpbmcodmFsdWUpLnRyaW0oKS5sZW5ndGg7XG59O1xuXG52YXIgc2l6ZSA9IGZ1bmN0aW9uIChmaWxlcywgcmVmKSB7XG4gIHZhciBzaXplID0gcmVmWzBdO1xuXG4gIGlmIChpc05hTihzaXplKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBuU2l6ZSA9IE51bWJlcihzaXplKSAqIDEwMjQ7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoZmlsZXNbaV0uc2l6ZSA+IG5TaXplKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG52YXIgaXNVUkxfMSA9IGNyZWF0ZUNvbW1vbmpzTW9kdWxlKGZ1bmN0aW9uIChtb2R1bGUsIGV4cG9ydHMpIHtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGlzVVJMO1xuXG5cblxudmFyIF9hc3NlcnRTdHJpbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChhc3NlcnRTdHJpbmdfMSk7XG5cblxuXG52YXIgX2lzRlFETjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KGlzRlFETik7XG5cblxuXG52YXIgX2lzSVAyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChpc0lQXzEpO1xuXG5cblxudmFyIF9tZXJnZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG1lcmdlXzEpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgZGVmYXVsdF91cmxfb3B0aW9ucyA9IHtcbiAgcHJvdG9jb2xzOiBbJ2h0dHAnLCAnaHR0cHMnLCAnZnRwJ10sXG4gIHJlcXVpcmVfdGxkOiB0cnVlLFxuICByZXF1aXJlX3Byb3RvY29sOiBmYWxzZSxcbiAgcmVxdWlyZV9ob3N0OiB0cnVlLFxuICByZXF1aXJlX3ZhbGlkX3Byb3RvY29sOiB0cnVlLFxuICBhbGxvd191bmRlcnNjb3JlczogZmFsc2UsXG4gIGFsbG93X3RyYWlsaW5nX2RvdDogZmFsc2UsXG4gIGFsbG93X3Byb3RvY29sX3JlbGF0aXZlX3VybHM6IGZhbHNlXG59O1xuXG52YXIgd3JhcHBlZF9pcHY2ID0gL15cXFsoW15cXF1dKylcXF0oPzo6KFswLTldKykpPyQvO1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cblxuZnVuY3Rpb24gY2hlY2tIb3N0KGhvc3QsIG1hdGNoZXMpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXRjaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG1hdGNoID0gbWF0Y2hlc1tpXTtcbiAgICBpZiAoaG9zdCA9PT0gbWF0Y2ggfHwgaXNSZWdFeHAobWF0Y2gpICYmIG1hdGNoLnRlc3QoaG9zdCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzVVJMKHVybCwgb3B0aW9ucykge1xuICAoMCwgX2Fzc2VydFN0cmluZzIuZGVmYXVsdCkodXJsKTtcbiAgaWYgKCF1cmwgfHwgdXJsLmxlbmd0aCA+PSAyMDgzIHx8IC9bXFxzPD5dLy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHVybC5pbmRleE9mKCdtYWlsdG86JykgPT09IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgb3B0aW9ucyA9ICgwLCBfbWVyZ2UyLmRlZmF1bHQpKG9wdGlvbnMsIGRlZmF1bHRfdXJsX29wdGlvbnMpO1xuICB2YXIgcHJvdG9jb2wgPSB2b2lkIDAsXG4gICAgICBhdXRoID0gdm9pZCAwLFxuICAgICAgaG9zdCA9IHZvaWQgMCxcbiAgICAgIGhvc3RuYW1lID0gdm9pZCAwLFxuICAgICAgcG9ydCA9IHZvaWQgMCxcbiAgICAgIHBvcnRfc3RyID0gdm9pZCAwLFxuICAgICAgc3BsaXQgPSB2b2lkIDAsXG4gICAgICBpcHY2ID0gdm9pZCAwO1xuXG4gIHNwbGl0ID0gdXJsLnNwbGl0KCcjJyk7XG4gIHVybCA9IHNwbGl0LnNoaWZ0KCk7XG5cbiAgc3BsaXQgPSB1cmwuc3BsaXQoJz8nKTtcbiAgdXJsID0gc3BsaXQuc2hpZnQoKTtcblxuICBzcGxpdCA9IHVybC5zcGxpdCgnOi8vJyk7XG4gIGlmIChzcGxpdC5sZW5ndGggPiAxKSB7XG4gICAgcHJvdG9jb2wgPSBzcGxpdC5zaGlmdCgpO1xuICAgIGlmIChvcHRpb25zLnJlcXVpcmVfdmFsaWRfcHJvdG9jb2wgJiYgb3B0aW9ucy5wcm90b2NvbHMuaW5kZXhPZihwcm90b2NvbCkgPT09IC0xKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9IGVsc2UgaWYgKG9wdGlvbnMucmVxdWlyZV9wcm90b2NvbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLmFsbG93X3Byb3RvY29sX3JlbGF0aXZlX3VybHMgJiYgdXJsLnN1YnN0cigwLCAyKSA9PT0gJy8vJykge1xuICAgIHNwbGl0WzBdID0gdXJsLnN1YnN0cigyKTtcbiAgfVxuICB1cmwgPSBzcGxpdC5qb2luKCc6Ly8nKTtcblxuICBpZiAodXJsID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHNwbGl0ID0gdXJsLnNwbGl0KCcvJyk7XG4gIHVybCA9IHNwbGl0LnNoaWZ0KCk7XG5cbiAgaWYgKHVybCA9PT0gJycgJiYgIW9wdGlvbnMucmVxdWlyZV9ob3N0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzcGxpdCA9IHVybC5zcGxpdCgnQCcpO1xuICBpZiAoc3BsaXQubGVuZ3RoID4gMSkge1xuICAgIGF1dGggPSBzcGxpdC5zaGlmdCgpO1xuICAgIGlmIChhdXRoLmluZGV4T2YoJzonKSA+PSAwICYmIGF1dGguc3BsaXQoJzonKS5sZW5ndGggPiAyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGhvc3RuYW1lID0gc3BsaXQuam9pbignQCcpO1xuXG4gIHBvcnRfc3RyID0gbnVsbDtcbiAgaXB2NiA9IG51bGw7XG4gIHZhciBpcHY2X21hdGNoID0gaG9zdG5hbWUubWF0Y2god3JhcHBlZF9pcHY2KTtcbiAgaWYgKGlwdjZfbWF0Y2gpIHtcbiAgICBob3N0ID0gJyc7XG4gICAgaXB2NiA9IGlwdjZfbWF0Y2hbMV07XG4gICAgcG9ydF9zdHIgPSBpcHY2X21hdGNoWzJdIHx8IG51bGw7XG4gIH0gZWxzZSB7XG4gICAgc3BsaXQgPSBob3N0bmFtZS5zcGxpdCgnOicpO1xuICAgIGhvc3QgPSBzcGxpdC5zaGlmdCgpO1xuICAgIGlmIChzcGxpdC5sZW5ndGgpIHtcbiAgICAgIHBvcnRfc3RyID0gc3BsaXQuam9pbignOicpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwb3J0X3N0ciAhPT0gbnVsbCkge1xuICAgIHBvcnQgPSBwYXJzZUludChwb3J0X3N0ciwgMTApO1xuICAgIGlmICghL15bMC05XSskLy50ZXN0KHBvcnRfc3RyKSB8fCBwb3J0IDw9IDAgfHwgcG9ydCA+IDY1NTM1KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaWYgKCEoMCwgX2lzSVAyLmRlZmF1bHQpKGhvc3QpICYmICEoMCwgX2lzRlFETjIuZGVmYXVsdCkoaG9zdCwgb3B0aW9ucykgJiYgKCFpcHY2IHx8ICEoMCwgX2lzSVAyLmRlZmF1bHQpKGlwdjYsIDYpKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGhvc3QgPSBob3N0IHx8IGlwdjY7XG5cbiAgaWYgKG9wdGlvbnMuaG9zdF93aGl0ZWxpc3QgJiYgIWNoZWNrSG9zdChob3N0LCBvcHRpb25zLmhvc3Rfd2hpdGVsaXN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAob3B0aW9ucy5ob3N0X2JsYWNrbGlzdCAmJiBjaGVja0hvc3QoaG9zdCwgb3B0aW9ucy5ob3N0X2JsYWNrbGlzdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn1cbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xufSk7XG5cbnZhciBpc1VSTCA9IHVud3JhcEV4cG9ydHMoaXNVUkxfMSk7XG5cbnZhciB1cmwgPSBmdW5jdGlvbiAodmFsdWUsIHJlZikge1xuICBpZiAoIHJlZiA9PT0gdm9pZCAwICkgcmVmID0gW3RydWVdO1xuICB2YXIgcmVxdWlyZVByb3RvY29sID0gcmVmWzBdO1xuXG4gIHZhciBvcHRpb25zID0geyByZXF1aXJlX3Byb3RvY29sOiAhIXJlcXVpcmVQcm90b2NvbCwgYWxsb3dfdW5kZXJzY29yZXM6IHRydWUgfTtcbiAgaWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlLmV2ZXJ5KGZ1bmN0aW9uICh2YWwpIHsgcmV0dXJuIGlzVVJMKHZhbCwgb3B0aW9ucyk7IH0pO1xuICB9XG5cbiAgcmV0dXJuIGlzVVJMKHZhbHVlLCBvcHRpb25zKTtcbn07XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xudmFyIFJ1bGVzID0ge1xuICBhZnRlcjogYWZ0ZXIsXG4gIGFscGhhX2Rhc2g6IHZhbGlkYXRlJDEsXG4gIGFscGhhX251bTogdmFsaWRhdGUkMixcbiAgYWxwaGFfc3BhY2VzOiB2YWxpZGF0ZSQzLFxuICBhbHBoYTogdmFsaWRhdGUsXG4gIGJlZm9yZTogYmVmb3JlLFxuICBiZXR3ZWVuOiB2YWxpZGF0ZSQ0LFxuICBjb25maXJtZWQ6IGNvbmZpcm1lZCxcbiAgY3JlZGl0X2NhcmQ6IGNyZWRpdF9jYXJkLFxuICBkYXRlX2JldHdlZW46IGRhdGVfYmV0d2VlbixcbiAgZGF0ZV9mb3JtYXQ6IGRhdGVfZm9ybWF0LFxuICBkZWNpbWFsOiB2YWxpZGF0ZSQ1LFxuICBkaWdpdHM6IHZhbGlkYXRlJDYsXG4gIGRpbWVuc2lvbnM6IGRpbWVuc2lvbnMsXG4gIGVtYWlsOiB2YWxpZGF0ZSQ3LFxuICBleHQ6IGV4dCxcbiAgaW1hZ2U6IGltYWdlLFxuICBpbjogdmFsaWRhdGUkOCxcbiAgaW50ZWdlcjogaW50ZWdlcixcbiAgbGVuZ3RoOiBsZW5ndGgsXG4gIGlwOiBpcCxcbiAgbWF4OiBtYXgkMSxcbiAgbWF4X3ZhbHVlOiBtYXhfdmFsdWUsXG4gIG1pbWVzOiBtaW1lcyxcbiAgbWluOiBtaW4kMSxcbiAgbWluX3ZhbHVlOiBtaW5fdmFsdWUsXG4gIG5vdF9pbjogdmFsaWRhdGUkOSxcbiAgbnVtZXJpYzogbnVtZXJpYyxcbiAgcmVnZXg6IHJlZ2V4LFxuICByZXF1aXJlZDogcmVxdWlyZWQsXG4gIHNpemU6IHNpemUsXG4gIHVybDogdXJsXG59O1xuXG52YXIgbm9ybWFsaXplID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICBpZiAoQXJyYXkuaXNBcnJheShmaWVsZHMpKSB7XG4gICAgcmV0dXJuIGZpZWxkcy5yZWR1Y2UoZnVuY3Rpb24gKHByZXYsIGN1cnIpIHtcbiAgICAgIGlmICh+Y3Vyci5pbmRleE9mKCcuJykpIHtcbiAgICAgICAgcHJldltjdXJyLnNwbGl0KCcuJylbMV1dID0gY3VycjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZXZbY3Vycl0gPSBjdXJyO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldjtcbiAgICB9LCB7fSk7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufTtcblxuLyoqXG4gKiBNYXBzIGZpZWxkcyB0byBjb21wdXRlZCBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGZpZWxkc1xuICovXG52YXIgbWFwRmllbGRzID0gZnVuY3Rpb24gKGZpZWxkcykge1xuICB2YXIgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZShmaWVsZHMpO1xuICByZXR1cm4gT2JqZWN0LmtleXMobm9ybWFsaXplZCkucmVkdWNlKGZ1bmN0aW9uIChwcmV2LCBjdXJyKSB7XG4gICAgdmFyIGZpZWxkID0gbm9ybWFsaXplZFtjdXJyXTtcbiAgICBwcmV2W2N1cnJdID0gZnVuY3Rpb24gbWFwcGVkRmllbGQgKCkge1xuICAgICAgLy8gaWYgZmllbGQgZXhpc3RzXG4gICAgICBpZiAodGhpcy4kdmFsaWRhdG9yLmZsYWdzW2ZpZWxkXSkge1xuICAgICAgICByZXR1cm4gdGhpcy4kdmFsaWRhdG9yLmZsYWdzW2ZpZWxkXTtcbiAgICAgIH1cblxuICAgICAgLy8gaWYgaXQgaGFzIGEgc2NvcGUgZGVmaW5lZFxuICAgICAgdmFyIGluZGV4ID0gZmllbGQuaW5kZXhPZignLicpO1xuICAgICAgaWYgKGluZGV4IDw9IDApIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVmID0gZmllbGQuc3BsaXQoJy4nKTtcbiAgICAgIHZhciBzY29wZSA9IHJlZlswXTtcbiAgICAgIHZhciBuYW1lID0gcmVmLnNsaWNlKDEpO1xuICAgICAgc2NvcGUgPSB0aGlzLiR2YWxpZGF0b3IuZmxhZ3NbKFwiJFwiICsgc2NvcGUpXTtcbiAgICAgIG5hbWUgPSBuYW1lLmpvaW4oJy4nKTtcblxuICAgICAgaWYgKHNjb3BlICYmIHNjb3BlW25hbWVdKSB7XG4gICAgICAgIHJldHVybiBzY29wZVtuYW1lXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHt9O1xuICAgIH07XG5cbiAgICByZXR1cm4gcHJldjtcbiAgfSwge30pO1xufTtcblxudmFyIHZlcnNpb24gPSAnMi4wLjAtcmMuMTknO1xuXG52YXIgcnVsZXNQbHVnaW4gPSBmdW5jdGlvbiAocmVmKSB7XG4gIHZhciBWYWxpZGF0b3IkJDEgPSByZWYuVmFsaWRhdG9yO1xuXG4gIE9iamVjdC5rZXlzKFJ1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChydWxlKSB7XG4gICAgVmFsaWRhdG9yJCQxLmV4dGVuZChydWxlLCBSdWxlc1tydWxlXSk7XG4gIH0pO1xuXG4gIC8vIE1lcmdlIHRoZSBlbmdsaXNoIG1lc3NhZ2VzLlxuICBWYWxpZGF0b3IkJDEubG9jYWxpemUoJ2VuJywge1xuICAgIG1lc3NhZ2VzOiBtZXNzYWdlc1xuICB9KTtcbn07XG5cbnVzZShydWxlc1BsdWdpbik7XG5cbnZhciBpbmRleF9lc20gPSB7XG4gIGluc3RhbGw6IGluc3RhbGwsXG4gIHVzZTogdXNlLFxuICBtYXBGaWVsZHM6IG1hcEZpZWxkcyxcbiAgVmFsaWRhdG9yOiBWYWxpZGF0b3IsXG4gIEVycm9yQmFnOiBFcnJvckJhZyxcbiAgUnVsZXM6IFJ1bGVzLFxuICB2ZXJzaW9uOiB2ZXJzaW9uXG59O1xuXG5leHBvcnQgeyBpbnN0YWxsLCB1c2UsIG1hcEZpZWxkcywgVmFsaWRhdG9yLCBFcnJvckJhZywgUnVsZXMsIHZlcnNpb24gfTtcbmV4cG9ydCBkZWZhdWx0IGluZGV4X2VzbTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3ZlZS12YWxpZGF0ZS9kaXN0L3ZlZS12YWxpZGF0ZS5lc20uanNcbi8vIG1vZHVsZSBpZCA9IDcwXG4vLyBtb2R1bGUgY2h1bmtzID0gMiIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXG4gICAgXCJkaXZcIixcbiAgICB7IHN0YXRpY0NsYXNzOiBcInBhZGRpbmctdG9wLTJ4IGNvbC1sZy0xMiBjb2wtbWQtMTIgY29sLXNtLTEyIGNvbC14cy0xMlwiIH0sXG4gICAgW1xuICAgICAgX2MoXCJkaXZcIiwgeyBzdGF0aWNDbGFzczogXCJjb250YWluZXJcIiB9LCBbXG4gICAgICAgIF9jKFwiZGl2XCIsIHsgc3RhdGljQ2xhc3M6IFwicm93XCIgfSwgW1xuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJoNFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBzdGF0aWNDbGFzczogXCJtb2RhbC10aXRsZSB0ZXh0LWNlbnRlclwiLFxuICAgICAgICAgICAgICBzdGF0aWNTdHlsZTogeyBjb2xvcjogXCIjRUMxQjMzXCIgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFtfdm0uX3YoXCJET1dOTE9BRCBOT1dcIildXG4gICAgICAgICAgKSxcbiAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgIF9jKFxuICAgICAgICAgICAgXCJmb3JtXCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGF0dHJzOiB7IGlkOiBcImZvcm0tc2VjdGlvbi1wcm9qZWN0c1wiIH0sXG4gICAgICAgICAgICAgIG9uOiB7XG4gICAgICAgICAgICAgICAgc3VibWl0OiBmdW5jdGlvbigkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICRldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICBfdm0udmFsaWRhdGVCZWZvcmVTdWJtaXQoX3ZtLnBheWxvYWQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBfYyhcInBcIiwgeyBzdGF0aWNTdHlsZTogeyBjb2xvcjogXCIjNGQ0YzRjXCIgfSB9LCBbXG4gICAgICAgICAgICAgICAgX3ZtLl92KFxuICAgICAgICAgICAgICAgICAgXCJKdXN0IGZpbGwgaW4geW91ciBkZXRhaWxzIGJlbG93IGFuZCBkb3dubG9hZCB0aGUgRWJvb2sgXCJcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICBfdm0uX3YoXCIgXCIpLFxuICAgICAgICAgICAgICBfdm0uX2woX3ZtLnBheWxvYWQsIGZ1bmN0aW9uKGRhdGEsIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jKFxuICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbW9kZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogX3ZtLnBheWxvYWQsXG4gICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2s6IGZ1bmN0aW9uKCQkdikge1xuICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLnBheWxvYWQgPSAkJHZcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIGV4cHJlc3Npb246IFwicGF5bG9hZFwiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuZmllbGRUeXBlID09IFwidGV4dC1maWVsZFwiXG4gICAgICAgICAgICAgICAgICAgICAgPyBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkaXZcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXAgY29sLWxnLTYgcGFkZGluZy1ib3R0b21cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzczogeyBcImhhcy1lcnJvclwiOiBfdm0uZXJyb3JzLmhhcyhkYXRhLnZhbHVlKSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcImxhYmVsXCIsIHsgc3RhdGljQ2xhc3M6IFwibGFiZWxcIiB9LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdm0uX3YoX3ZtLl9zKGRhdGEubGFiZWwpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF92bS5fdihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmF3TmFtZTogXCJ2LW1vZGVsXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGRhdGEucG9zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHByZXNzaW9uOiBcImRhdGEucG9zdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgbmFtZTogXCJ2YWxpZGF0ZVwiLCByYXdOYW1lOiBcInYtdmFsaWRhdGVcIiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGljQ2xhc3M6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybS1jb250cm9sIHRleHQtY2VudGVyIG1hcmdpbi1ib3R0b20tbm9uZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXR0cnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZGF0YS52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJkYXRhLXZ2LXJ1bGVzXCI6IGRhdGEucnVsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiZGF0YS12di12YWxpZGF0ZS1vblwiOiBfdm0udmFsaWRhdGVGb3JtLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI6IGRhdGEubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb21Qcm9wczogeyB2YWx1ZTogZGF0YS5wb3N0IH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnB1dDogZnVuY3Rpb24oJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCRldmVudC50YXJnZXQuY29tcG9zaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5wb3N0ID0gJGV2ZW50LnRhcmdldC52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwic3BhblwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3RpdmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzaG93XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYXdOYW1lOiBcInYtc2hvd1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IF92bS5lcnJvcnMuaGFzKGRhdGEudmFsdWUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwcmVzc2lvbjogXCJlcnJvcnMuaGFzKGRhdGEudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRpY0NsYXNzOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiaGVscC1ibG9jayB0ZXh0LWRhbmdlciB0ZXh0LWNlbnRlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfYyhcInN0cm9uZ1wiLCBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3ZtLl92KF92bS5fcyhfdm0uZXJyb3JzLmZpcnN0KGRhdGEudmFsdWUpKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICA6IF92bS5fZSgpXG4gICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgX3ZtLl92KFwiIFwiKSxcbiAgICAgICAgICAgICAgX3ZtLl9tKDApXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgMlxuICAgICAgICAgIClcbiAgICAgICAgXSlcbiAgICAgIF0pXG4gICAgXVxuICApXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW1xuICBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3ZtID0gdGhpc1xuICAgIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICAgIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICAgIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImNvbC1sZy0xMlwiIH0sIFtcbiAgICAgIF9jKFxuICAgICAgICBcImJ1dHRvblwiLFxuICAgICAgICB7XG4gICAgICAgICAgc3RhdGljQ2xhc3M6IFwibGFkZGEtYnV0dG9uIGxhZGRhLWJ1dHRvbi1zZWxlY3RvciBidG4gYnRuLXByaW1hcnlcIixcbiAgICAgICAgICBhdHRyczogeyBcImRhdGEtc3R5bGVcIjogXCJ6b29tLWluXCIsIHR5cGU6IFwic3VibWl0XCIgfVxuICAgICAgICB9LFxuICAgICAgICBbX3ZtLl92KFwiU3VibWl0XFxuICAgICAgICAgICAgICAgICAgICBcIildXG4gICAgICApXG4gICAgXSlcbiAgfVxuXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5tb2R1bGUuZXhwb3J0cyA9IHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH1cbmlmIChtb2R1bGUuaG90KSB7XG4gIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgaWYgKG1vZHVsZS5ob3QuZGF0YSkge1xuICAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpLnJlcmVuZGVyKFwiZGF0YS12LWNhNzA4N2JhXCIsIG1vZHVsZS5leHBvcnRzKVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi1jYTcwODdiYVwiLFwiaGFzU2NvcGVkXCI6ZmFsc2V9IS4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yLmpzP3R5cGU9dGVtcGxhdGUmaW5kZXg9MCEuL3Jlc291cmNlcy9hc3NldHMvanMvY29tcG9uZW50cy9mb3Jtcy9Gb3Jtcy52dWVcbi8vIG1vZHVsZSBpZCA9IDcxXG4vLyBtb2R1bGUgY2h1bmtzID0gMiJdLCJzb3VyY2VSb290IjoiIn0=