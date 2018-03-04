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
/******/ 	return __webpack_require__(__webpack_require__.s = 338);
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

/***/ 15:
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 17:
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(24);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),

/***/ 23:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.9
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ("development" !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "development" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "development" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "development" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if ("development" !== 'production' && inject) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ("development" !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (true) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ("development" !== 'production' && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
      "development" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "development" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */

/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = child.data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if ("development" !== 'production' && config.performance && mark) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ("development" !== 'production' && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "development" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "development" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "development" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ("development" !== 'production' && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if ("development" !== 'production' &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
        ? Reflect.ownKeys(inject).filter(function (key) {
          /* istanbul ignore next */
          return Object.getOwnPropertyDescriptor(inject, key).enumerable
        })
        : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ("development" !== 'production' && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if ("development" !== 'production' && slotNodes._rendered) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "development" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor,
  isOnce
) {
  // render fns generated by compiler < 2.5.4 does not provide v-once
  // information to runtime so be conservative
  var isOldVersion = arguments.length < 3;
  // if a static tree is generated by v-once, it is cached on the instance;
  // otherwise it is purely static and can be cached on the shared options
  // across all instances.
  var renderFns = this.$options.staticRenderFns;
  var cached = isOldVersion || isOnce
    ? (this._staticTrees || (this._staticTrees = []))
    : (renderFns.cached || (renderFns.cached = []));
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = renderFns[index].call(this._renderProxy, null, this);
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "development" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "development" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ("development" !== 'production' &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    warn(
      'Avoid using non-primitive value as key, ' +
      'use string/number value instead.',
      context
    );
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (true) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ("development" !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid$1 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$1++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if ("development" !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if ("development" !== 'production' &&
    !(this instanceof Vue$3)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (true) {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (true) {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.9';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);

var isPreTag = function (tag) { return tag === 'pre'; };

var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "development" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (true) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if ("development" !== 'production' && data && data.pre) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if ("development" !== 'production' && !vnodeToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (true) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if ("development" !== 'production' &&
                typeof console !== 'undefined' &&
                !hydrationBailed
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (true) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var validDivisionCharRE = /[\w).+\-_$\]]/;

function parseFilters (exp) {
  var inSingle = false;
  var inDouble = false;
  var inTemplateString = false;
  var inRegex = false;
  var curly = 0;
  var square = 0;
  var paren = 0;
  var lastFilterIndex = 0;
  var c, prev, i, expression, filters;

  for (i = 0; i < exp.length; i++) {
    prev = c;
    c = exp.charCodeAt(i);
    if (inSingle) {
      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
    } else if (inDouble) {
      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
    } else if (inTemplateString) {
      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
    } else if (inRegex) {
      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
    } else if (
      c === 0x7C && // pipe
      exp.charCodeAt(i + 1) !== 0x7C &&
      exp.charCodeAt(i - 1) !== 0x7C &&
      !curly && !square && !paren
    ) {
      if (expression === undefined) {
        // first filter, end of expression
        lastFilterIndex = i + 1;
        expression = exp.slice(0, i).trim();
      } else {
        pushFilter();
      }
    } else {
      switch (c) {
        case 0x22: inDouble = true; break         // "
        case 0x27: inSingle = true; break         // '
        case 0x60: inTemplateString = true; break // `
        case 0x28: paren++; break                 // (
        case 0x29: paren--; break                 // )
        case 0x5B: square++; break                // [
        case 0x5D: square--; break                // ]
        case 0x7B: curly++; break                 // {
        case 0x7D: curly--; break                 // }
      }
      if (c === 0x2f) { // /
        var j = i - 1;
        var p = (void 0);
        // find first non-whitespace prev char
        for (; j >= 0; j--) {
          p = exp.charAt(j);
          if (p !== ' ') { break }
        }
        if (!p || !validDivisionCharRE.test(p)) {
          inRegex = true;
        }
      }
    }
  }

  if (expression === undefined) {
    expression = exp.slice(0, i).trim();
  } else if (lastFilterIndex !== 0) {
    pushFilter();
  }

  function pushFilter () {
    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
    lastFilterIndex = i + 1;
  }

  if (filters) {
    for (i = 0; i < filters.length; i++) {
      expression = wrapFilter(expression, filters[i]);
    }
  }

  return expression
}

function wrapFilter (exp, filter) {
  var i = filter.indexOf('(');
  if (i < 0) {
    // _f: resolveFilter
    return ("_f(\"" + filter + "\")(" + exp + ")")
  } else {
    var name = filter.slice(0, i);
    var args = filter.slice(i + 1);
    return ("_f(\"" + name + "\")(" + exp + "," + args)
  }
}

/*  */

function baseWarn (msg) {
  console.error(("[Vue compiler]: " + msg));
}

function pluckModuleFunction (
  modules,
  key
) {
  return modules
    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
    : []
}

function addProp (el, name, value) {
  (el.props || (el.props = [])).push({ name: name, value: value });
}

function addAttr (el, name, value) {
  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
}

function addDirective (
  el,
  name,
  rawName,
  value,
  arg,
  modifiers
) {
  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
}

function addHandler (
  el,
  name,
  value,
  modifiers,
  important,
  warn
) {
  modifiers = modifiers || emptyObject;
  // warn prevent and passive modifier
  /* istanbul ignore if */
  if (
    "development" !== 'production' && warn &&
    modifiers.prevent && modifiers.passive
  ) {
    warn(
      'passive and prevent can\'t be used together. ' +
      'Passive handler can\'t prevent default event.'
    );
  }

  // check capture modifier
  if (modifiers.capture) {
    delete modifiers.capture;
    name = '!' + name; // mark the event as captured
  }
  if (modifiers.once) {
    delete modifiers.once;
    name = '~' + name; // mark the event as once
  }
  /* istanbul ignore if */
  if (modifiers.passive) {
    delete modifiers.passive;
    name = '&' + name; // mark the event as passive
  }

  // normalize click.right and click.middle since they don't actually fire
  // this is technically browser-specific, but at least for now browsers are
  // the only target envs that have right/middle clicks.
  if (name === 'click') {
    if (modifiers.right) {
      name = 'contextmenu';
      delete modifiers.right;
    } else if (modifiers.middle) {
      name = 'mouseup';
    }
  }

  var events;
  if (modifiers.native) {
    delete modifiers.native;
    events = el.nativeEvents || (el.nativeEvents = {});
  } else {
    events = el.events || (el.events = {});
  }

  var newHandler = { value: value };
  if (modifiers !== emptyObject) {
    newHandler.modifiers = modifiers;
  }

  var handlers = events[name];
  /* istanbul ignore if */
  if (Array.isArray(handlers)) {
    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
  } else if (handlers) {
    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
  } else {
    events[name] = newHandler;
  }
}

function getBindingAttr (
  el,
  name,
  getStatic
) {
  var dynamicValue =
    getAndRemoveAttr(el, ':' + name) ||
    getAndRemoveAttr(el, 'v-bind:' + name);
  if (dynamicValue != null) {
    return parseFilters(dynamicValue)
  } else if (getStatic !== false) {
    var staticValue = getAndRemoveAttr(el, name);
    if (staticValue != null) {
      return JSON.stringify(staticValue)
    }
  }
}

// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.
function getAndRemoveAttr (
  el,
  name,
  removeFromMap
) {
  var val;
  if ((val = el.attrsMap[name]) != null) {
    var list = el.attrsList;
    for (var i = 0, l = list.length; i < l; i++) {
      if (list[i].name === name) {
        list.splice(i, 1);
        break
      }
    }
  }
  if (removeFromMap) {
    delete el.attrsMap[name];
  }
  return val
}

/*  */

/**
 * Cross-platform code generation for component v-model
 */
function genComponentModel (
  el,
  value,
  modifiers
) {
  var ref = modifiers || {};
  var number = ref.number;
  var trim = ref.trim;

  var baseValueExpression = '$$v';
  var valueExpression = baseValueExpression;
  if (trim) {
    valueExpression =
      "(typeof " + baseValueExpression + " === 'string'" +
        "? " + baseValueExpression + ".trim()" +
        ": " + baseValueExpression + ")";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }
  var assignment = genAssignmentCode(value, valueExpression);

  el.model = {
    value: ("(" + value + ")"),
    expression: ("\"" + value + "\""),
    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
  };
}

/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */
function genAssignmentCode (
  value,
  assignment
) {
  var res = parseModel(value);
  if (res.key === null) {
    return (value + "=" + assignment)
  } else {
    return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
  }
}

/**
 * Parse a v-model expression into a base path and a final key segment.
 * Handles both dot-path and possible square brackets.
 *
 * Possible cases:
 *
 * - test
 * - test[key]
 * - test[test1[key]]
 * - test["a"][key]
 * - xxx.test[a[a].test1[key]]
 * - test.xxx.a["asa"][test1[key]]
 *
 */

var len;
var str;
var chr;
var index$1;
var expressionPos;
var expressionEndPos;



function parseModel (val) {
  len = val.length;

  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
    index$1 = val.lastIndexOf('.');
    if (index$1 > -1) {
      return {
        exp: val.slice(0, index$1),
        key: '"' + val.slice(index$1 + 1) + '"'
      }
    } else {
      return {
        exp: val,
        key: null
      }
    }
  }

  str = val;
  index$1 = expressionPos = expressionEndPos = 0;

  while (!eof()) {
    chr = next();
    /* istanbul ignore if */
    if (isStringStart(chr)) {
      parseString(chr);
    } else if (chr === 0x5B) {
      parseBracket(chr);
    }
  }

  return {
    exp: val.slice(0, expressionPos),
    key: val.slice(expressionPos + 1, expressionEndPos)
  }
}

function next () {
  return str.charCodeAt(++index$1)
}

function eof () {
  return index$1 >= len
}

function isStringStart (chr) {
  return chr === 0x22 || chr === 0x27
}

function parseBracket (chr) {
  var inBracket = 1;
  expressionPos = index$1;
  while (!eof()) {
    chr = next();
    if (isStringStart(chr)) {
      parseString(chr);
      continue
    }
    if (chr === 0x5B) { inBracket++; }
    if (chr === 0x5D) { inBracket--; }
    if (inBracket === 0) {
      expressionEndPos = index$1;
      break
    }
  }
}

function parseString (chr) {
  var stringQuote = chr;
  while (!eof()) {
    chr = next();
    if (chr === stringQuote) {
      break
    }
  }
}

/*  */

var warn$1;

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

function model (
  el,
  dir,
  _warn
) {
  warn$1 = _warn;
  var value = dir.value;
  var modifiers = dir.modifiers;
  var tag = el.tag;
  var type = el.attrsMap.type;

  if (true) {
    // inputs with type="file" are read only and setting the input's
    // value will throw an error.
    if (tag === 'input' && type === 'file') {
      warn$1(
        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
        "File inputs are read only. Use a v-on:change listener instead."
      );
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers);
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers);
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers);
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers);
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers);
    // component v-model doesn't need extra runtime
    return false
  } else if (true) {
    warn$1(
      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
      "v-model is not supported on this element type. " +
      'If you are working with contenteditable, it\'s recommended to ' +
      'wrap a library dedicated for that purpose inside a custom component.'
    );
  }

  // ensure runtime directive metadata
  return true
}

function genCheckboxModel (
  el,
  value,
  modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
  addProp(el, 'checked',
    "Array.isArray(" + value + ")" +
      "?_i(" + value + "," + valueBinding + ")>-1" + (
        trueValueBinding === 'true'
          ? (":(" + value + ")")
          : (":_q(" + value + "," + trueValueBinding + ")")
      )
  );
  addHandler(el, 'change',
    "var $$a=" + value + "," +
        '$$el=$event.target,' +
        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
    'if(Array.isArray($$a)){' +
      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
          '$$i=_i($$a,$$v);' +
      "if($$el.checked){$$i<0&&(" + value + "=$$a.concat([$$v]))}" +
      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
    null, true
  );
}

function genRadioModel (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var valueBinding = getBindingAttr(el, 'value') || 'null';
  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
  addHandler(el, 'change', genAssignmentCode(value, valueBinding), null, true);
}

function genSelect (
    el,
    value,
    modifiers
) {
  var number = modifiers && modifiers.number;
  var selectedVal = "Array.prototype.filter" +
    ".call($event.target.options,function(o){return o.selected})" +
    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
    "return " + (number ? '_n(val)' : 'val') + "})";

  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
  var code = "var $$selectedVal = " + selectedVal + ";";
  code = code + " " + (genAssignmentCode(value, assignment));
  addHandler(el, 'change', code, null, true);
}

function genDefaultModel (
  el,
  value,
  modifiers
) {
  var type = el.attrsMap.type;

  // warn if v-bind:value conflicts with v-model
  if (true) {
    var value$1 = el.attrsMap['v-bind:value'] || el.attrsMap[':value'];
    if (value$1) {
      var binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value';
      warn$1(
        binding + "=\"" + value$1 + "\" conflicts with v-model on the same element " +
        'because the latter already expands to a value binding internally'
      );
    }
  }

  var ref = modifiers || {};
  var lazy = ref.lazy;
  var number = ref.number;
  var trim = ref.trim;
  var needCompositionGuard = !lazy && type !== 'range';
  var event = lazy
    ? 'change'
    : type === 'range'
      ? RANGE_TOKEN
      : 'input';

  var valueExpression = '$event.target.value';
  if (trim) {
    valueExpression = "$event.target.value.trim()";
  }
  if (number) {
    valueExpression = "_n(" + valueExpression + ")";
  }

  var code = genAssignmentCode(value, valueExpression);
  if (needCompositionGuard) {
    code = "if($event.target.composing)return;" + code;
  }

  addProp(el, 'value', ("(" + value + ")"));
  addHandler(el, event, code, null, true);
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()');
  }
}

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isDirty(elm, checkVal) ||
    isInputChanged(elm, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isInputChanged (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers) && modifiers.number) {
    return toNumber(value) !== toNumber(newVal)
  }
  if (isDef(modifiers) && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if ("development" !== 'production' && explicitEnterDuration != null) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "development" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if ("development" !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if ("development" !== 'production' &&
      mode && mode !== 'in-out' && mode !== 'out-in'
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (true) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if ("development" !== 'production' && isChrome) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if ("development" !== 'production' &&
    config.productionTip !== false &&
    inBrowser && typeof console !== 'undefined'
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

var buildRegex = cached(function (delimiters) {
  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
});

function parseText (
  text,
  delimiters
) {
  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
  if (!tagRE.test(text)) {
    return
  }
  var tokens = [];
  var lastIndex = tagRE.lastIndex = 0;
  var match, index;
  while ((match = tagRE.exec(text))) {
    index = match.index;
    // push text token
    if (index > lastIndex) {
      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
    }
    // tag token
    var exp = parseFilters(match[1].trim());
    tokens.push(("_s(" + exp + ")"));
    lastIndex = index + match[0].length;
  }
  if (lastIndex < text.length) {
    tokens.push(JSON.stringify(text.slice(lastIndex)));
  }
  return tokens.join('+')
}

/*  */

function transformNode (el, options) {
  var warn = options.warn || baseWarn;
  var staticClass = getAndRemoveAttr(el, 'class');
  if ("development" !== 'production' && staticClass) {
    var expression = parseText(staticClass, options.delimiters);
    if (expression) {
      warn(
        "class=\"" + staticClass + "\": " +
        'Interpolation inside attributes has been removed. ' +
        'Use v-bind or the colon shorthand instead. For example, ' +
        'instead of <div class="{{ val }}">, use <div :class="val">.'
      );
    }
  }
  if (staticClass) {
    el.staticClass = JSON.stringify(staticClass);
  }
  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
  if (classBinding) {
    el.classBinding = classBinding;
  }
}

function genData (el) {
  var data = '';
  if (el.staticClass) {
    data += "staticClass:" + (el.staticClass) + ",";
  }
  if (el.classBinding) {
    data += "class:" + (el.classBinding) + ",";
  }
  return data
}

var klass$1 = {
  staticKeys: ['staticClass'],
  transformNode: transformNode,
  genData: genData
};

/*  */

function transformNode$1 (el, options) {
  var warn = options.warn || baseWarn;
  var staticStyle = getAndRemoveAttr(el, 'style');
  if (staticStyle) {
    /* istanbul ignore if */
    if (true) {
      var expression = parseText(staticStyle, options.delimiters);
      if (expression) {
        warn(
          "style=\"" + staticStyle + "\": " +
          'Interpolation inside attributes has been removed. ' +
          'Use v-bind or the colon shorthand instead. For example, ' +
          'instead of <div style="{{ val }}">, use <div :style="val">.'
        );
      }
    }
    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
  }

  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
  if (styleBinding) {
    el.styleBinding = styleBinding;
  }
}

function genData$1 (el) {
  var data = '';
  if (el.staticStyle) {
    data += "staticStyle:" + (el.staticStyle) + ",";
  }
  if (el.styleBinding) {
    data += "style:(" + (el.styleBinding) + "),";
  }
  return data
}

var style$1 = {
  staticKeys: ['staticStyle'],
  transformNode: transformNode$1,
  genData: genData$1
};

/*  */

var decoder;

var he = {
  decode: function decode (html) {
    decoder = decoder || document.createElement('div');
    decoder.innerHTML = html;
    return decoder.textContent
  }
};

/*  */

var isUnaryTag = makeMap(
  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
  'link,meta,param,source,track,wbr'
);

// Elements that you can, intentionally, leave open
// (and which close themselves)
var canBeLeftOpenTag = makeMap(
  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
);

// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
var isNonPhrasingTag = makeMap(
  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
  'title,tr,track'
);

/**
 * Not type-checking this file because it's mostly vendor code.
 */

/*!
 * HTML Parser By John Resig (ejohn.org)
 * Modified by Juriy "kangax" Zaytsev
 * Original code by Erik Arvidsson, Mozilla Public License
 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
 */

// Regular Expressions for parsing tags and attributes
var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
// but for Vue templates we can enforce a simple charset
var ncname = '[a-zA-Z_][\\w\\-\\.]*';
var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")";
var startTagOpen = new RegExp(("^<" + qnameCapture));
var startTagClose = /^\s*(\/?)>/;
var endTag = new RegExp(("^<\\/" + qnameCapture + "[^>]*>"));
var doctype = /^<!DOCTYPE [^>]+>/i;
var comment = /^<!--/;
var conditionalComment = /^<!\[/;

var IS_REGEX_CAPTURING_BROKEN = false;
'x'.replace(/x(.)?/g, function (m, g) {
  IS_REGEX_CAPTURING_BROKEN = g === '';
});

// Special Elements (can contain anything)
var isPlainTextElement = makeMap('script,style,textarea', true);
var reCache = {};

var decodingMap = {
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&amp;': '&',
  '&#10;': '\n',
  '&#9;': '\t'
};
var encodedAttr = /&(?:lt|gt|quot|amp);/g;
var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10|#9);/g;

// #5992
var isIgnoreNewlineTag = makeMap('pre,textarea', true);
var shouldIgnoreFirstNewline = function (tag, html) { return tag && isIgnoreNewlineTag(tag) && html[0] === '\n'; };

function decodeAttr (value, shouldDecodeNewlines) {
  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
  return value.replace(re, function (match) { return decodingMap[match]; })
}

function parseHTML (html, options) {
  var stack = [];
  var expectHTML = options.expectHTML;
  var isUnaryTag$$1 = options.isUnaryTag || no;
  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
  var index = 0;
  var last, lastTag;
  while (html) {
    last = html;
    // Make sure we're not in a plaintext content element like script/style
    if (!lastTag || !isPlainTextElement(lastTag)) {
      var textEnd = html.indexOf('<');
      if (textEnd === 0) {
        // Comment:
        if (comment.test(html)) {
          var commentEnd = html.indexOf('-->');

          if (commentEnd >= 0) {
            if (options.shouldKeepComment) {
              options.comment(html.substring(4, commentEnd));
            }
            advance(commentEnd + 3);
            continue
          }
        }

        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
        if (conditionalComment.test(html)) {
          var conditionalEnd = html.indexOf(']>');

          if (conditionalEnd >= 0) {
            advance(conditionalEnd + 2);
            continue
          }
        }

        // Doctype:
        var doctypeMatch = html.match(doctype);
        if (doctypeMatch) {
          advance(doctypeMatch[0].length);
          continue
        }

        // End tag:
        var endTagMatch = html.match(endTag);
        if (endTagMatch) {
          var curIndex = index;
          advance(endTagMatch[0].length);
          parseEndTag(endTagMatch[1], curIndex, index);
          continue
        }

        // Start tag:
        var startTagMatch = parseStartTag();
        if (startTagMatch) {
          handleStartTag(startTagMatch);
          if (shouldIgnoreFirstNewline(lastTag, html)) {
            advance(1);
          }
          continue
        }
      }

      var text = (void 0), rest = (void 0), next = (void 0);
      if (textEnd >= 0) {
        rest = html.slice(textEnd);
        while (
          !endTag.test(rest) &&
          !startTagOpen.test(rest) &&
          !comment.test(rest) &&
          !conditionalComment.test(rest)
        ) {
          // < in plain text, be forgiving and treat it as text
          next = rest.indexOf('<', 1);
          if (next < 0) { break }
          textEnd += next;
          rest = html.slice(textEnd);
        }
        text = html.substring(0, textEnd);
        advance(textEnd);
      }

      if (textEnd < 0) {
        text = html;
        html = '';
      }

      if (options.chars && text) {
        options.chars(text);
      }
    } else {
      var endTagLength = 0;
      var stackedTag = lastTag.toLowerCase();
      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
      var rest$1 = html.replace(reStackedTag, function (all, text, endTag) {
        endTagLength = endTag.length;
        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
          text = text
            .replace(/<!--([\s\S]*?)-->/g, '$1')
            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
        }
        if (shouldIgnoreFirstNewline(stackedTag, text)) {
          text = text.slice(1);
        }
        if (options.chars) {
          options.chars(text);
        }
        return ''
      });
      index += html.length - rest$1.length;
      html = rest$1;
      parseEndTag(stackedTag, index - endTagLength, index);
    }

    if (html === last) {
      options.chars && options.chars(html);
      if ("development" !== 'production' && !stack.length && options.warn) {
        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
      }
      break
    }
  }

  // Clean up any remaining tags
  parseEndTag();

  function advance (n) {
    index += n;
    html = html.substring(n);
  }

  function parseStartTag () {
    var start = html.match(startTagOpen);
    if (start) {
      var match = {
        tagName: start[1],
        attrs: [],
        start: index
      };
      advance(start[0].length);
      var end, attr;
      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        advance(attr[0].length);
        match.attrs.push(attr);
      }
      if (end) {
        match.unarySlash = end[1];
        advance(end[0].length);
        match.end = index;
        return match
      }
    }
  }

  function handleStartTag (match) {
    var tagName = match.tagName;
    var unarySlash = match.unarySlash;

    if (expectHTML) {
      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
        parseEndTag(lastTag);
      }
      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
        parseEndTag(tagName);
      }
    }

    var unary = isUnaryTag$$1(tagName) || !!unarySlash;

    var l = match.attrs.length;
    var attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      var args = match.attrs[i];
      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
        if (args[3] === '') { delete args[3]; }
        if (args[4] === '') { delete args[4]; }
        if (args[5] === '') { delete args[5]; }
      }
      var value = args[3] || args[4] || args[5] || '';
      var shouldDecodeNewlines = tagName === 'a' && args[1] === 'href'
        ? options.shouldDecodeNewlinesForHref
        : options.shouldDecodeNewlines;
      attrs[i] = {
        name: args[1],
        value: decodeAttr(value, shouldDecodeNewlines)
      };
    }

    if (!unary) {
      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
      lastTag = tagName;
    }

    if (options.start) {
      options.start(tagName, attrs, unary, match.start, match.end);
    }
  }

  function parseEndTag (tagName, start, end) {
    var pos, lowerCasedTagName;
    if (start == null) { start = index; }
    if (end == null) { end = index; }

    if (tagName) {
      lowerCasedTagName = tagName.toLowerCase();
    }

    // Find the closest opened tag of the same type
    if (tagName) {
      for (pos = stack.length - 1; pos >= 0; pos--) {
        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
          break
        }
      }
    } else {
      // If no tag name is provided, clean shop
      pos = 0;
    }

    if (pos >= 0) {
      // Close all the open elements, up the stack
      for (var i = stack.length - 1; i >= pos; i--) {
        if ("development" !== 'production' &&
          (i > pos || !tagName) &&
          options.warn
        ) {
          options.warn(
            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
          );
        }
        if (options.end) {
          options.end(stack[i].tag, start, end);
        }
      }

      // Remove the open elements from the stack
      stack.length = pos;
      lastTag = pos && stack[pos - 1].tag;
    } else if (lowerCasedTagName === 'br') {
      if (options.start) {
        options.start(tagName, [], true, start, end);
      }
    } else if (lowerCasedTagName === 'p') {
      if (options.start) {
        options.start(tagName, [], false, start, end);
      }
      if (options.end) {
        options.end(tagName, start, end);
      }
    }
  }
}

/*  */

var onRE = /^@|^v-on:/;
var dirRE = /^v-|^@|^:/;
var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
var forIteratorRE = /\((\{[^}]*\}|[^,{]*),([^,]*)(?:,([^,]*))?\)/;
var stripParensRE = /^\(|\)$/g;

var argRE = /:(.*)$/;
var bindRE = /^:|^v-bind:/;
var modifierRE = /\.[^.]+/g;

var decodeHTMLCached = cached(he.decode);

// configurable state
var warn$2;
var delimiters;
var transforms;
var preTransforms;
var postTransforms;
var platformIsPreTag;
var platformMustUseProp;
var platformGetTagNamespace;



function createASTElement (
  tag,
  attrs,
  parent
) {
  return {
    type: 1,
    tag: tag,
    attrsList: attrs,
    attrsMap: makeAttrsMap(attrs),
    parent: parent,
    children: []
  }
}

/**
 * Convert HTML string to AST.
 */
function parse (
  template,
  options
) {
  warn$2 = options.warn || baseWarn;

  platformIsPreTag = options.isPreTag || no;
  platformMustUseProp = options.mustUseProp || no;
  platformGetTagNamespace = options.getTagNamespace || no;

  transforms = pluckModuleFunction(options.modules, 'transformNode');
  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');

  delimiters = options.delimiters;

  var stack = [];
  var preserveWhitespace = options.preserveWhitespace !== false;
  var root;
  var currentParent;
  var inVPre = false;
  var inPre = false;
  var warned = false;

  function warnOnce (msg) {
    if (!warned) {
      warned = true;
      warn$2(msg);
    }
  }

  function endPre (element) {
    // check pre state
    if (element.pre) {
      inVPre = false;
    }
    if (platformIsPreTag(element.tag)) {
      inPre = false;
    }
  }

  parseHTML(template, {
    warn: warn$2,
    expectHTML: options.expectHTML,
    isUnaryTag: options.isUnaryTag,
    canBeLeftOpenTag: options.canBeLeftOpenTag,
    shouldDecodeNewlines: options.shouldDecodeNewlines,
    shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
    shouldKeepComment: options.comments,
    start: function start (tag, attrs, unary) {
      // check namespace.
      // inherit parent ns if there is one
      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

      // handle IE svg bug
      /* istanbul ignore if */
      if (isIE && ns === 'svg') {
        attrs = guardIESVGBug(attrs);
      }

      var element = createASTElement(tag, attrs, currentParent);
      if (ns) {
        element.ns = ns;
      }

      if (isForbiddenTag(element) && !isServerRendering()) {
        element.forbidden = true;
        "development" !== 'production' && warn$2(
          'Templates should only be responsible for mapping the state to the ' +
          'UI. Avoid placing tags with side-effects in your templates, such as ' +
          "<" + tag + ">" + ', as they will not be parsed.'
        );
      }

      // apply pre-transforms
      for (var i = 0; i < preTransforms.length; i++) {
        element = preTransforms[i](element, options) || element;
      }

      if (!inVPre) {
        processPre(element);
        if (element.pre) {
          inVPre = true;
        }
      }
      if (platformIsPreTag(element.tag)) {
        inPre = true;
      }
      if (inVPre) {
        processRawAttrs(element);
      } else if (!element.processed) {
        // structural directives
        processFor(element);
        processIf(element);
        processOnce(element);
        // element-scope stuff
        processElement(element, options);
      }

      function checkRootConstraints (el) {
        if (true) {
          if (el.tag === 'slot' || el.tag === 'template') {
            warnOnce(
              "Cannot use <" + (el.tag) + "> as component root element because it may " +
              'contain multiple nodes.'
            );
          }
          if (el.attrsMap.hasOwnProperty('v-for')) {
            warnOnce(
              'Cannot use v-for on stateful component root element because ' +
              'it renders multiple elements.'
            );
          }
        }
      }

      // tree management
      if (!root) {
        root = element;
        checkRootConstraints(root);
      } else if (!stack.length) {
        // allow root elements with v-if, v-else-if and v-else
        if (root.if && (element.elseif || element.else)) {
          checkRootConstraints(element);
          addIfCondition(root, {
            exp: element.elseif,
            block: element
          });
        } else if (true) {
          warnOnce(
            "Component template should contain exactly one root element. " +
            "If you are using v-if on multiple elements, " +
            "use v-else-if to chain them instead."
          );
        }
      }
      if (currentParent && !element.forbidden) {
        if (element.elseif || element.else) {
          processIfConditions(element, currentParent);
        } else if (element.slotScope) { // scoped slot
          currentParent.plain = false;
          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
        } else {
          currentParent.children.push(element);
          element.parent = currentParent;
        }
      }
      if (!unary) {
        currentParent = element;
        stack.push(element);
      } else {
        endPre(element);
      }
      // apply post-transforms
      for (var i$1 = 0; i$1 < postTransforms.length; i$1++) {
        postTransforms[i$1](element, options);
      }
    },

    end: function end () {
      // remove trailing whitespace
      var element = stack[stack.length - 1];
      var lastNode = element.children[element.children.length - 1];
      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
        element.children.pop();
      }
      // pop stack
      stack.length -= 1;
      currentParent = stack[stack.length - 1];
      endPre(element);
    },

    chars: function chars (text) {
      if (!currentParent) {
        if (true) {
          if (text === template) {
            warnOnce(
              'Component template requires a root element, rather than just text.'
            );
          } else if ((text = text.trim())) {
            warnOnce(
              ("text \"" + text + "\" outside root element will be ignored.")
            );
          }
        }
        return
      }
      // IE textarea placeholder bug
      /* istanbul ignore if */
      if (isIE &&
        currentParent.tag === 'textarea' &&
        currentParent.attrsMap.placeholder === text
      ) {
        return
      }
      var children = currentParent.children;
      text = inPre || text.trim()
        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
        // only preserve whitespace if its not right after a starting tag
        : preserveWhitespace && children.length ? ' ' : '';
      if (text) {
        var expression;
        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
          children.push({
            type: 2,
            expression: expression,
            text: text
          });
        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
          children.push({
            type: 3,
            text: text
          });
        }
      }
    },
    comment: function comment (text) {
      currentParent.children.push({
        type: 3,
        text: text,
        isComment: true
      });
    }
  });
  return root
}

function processPre (el) {
  if (getAndRemoveAttr(el, 'v-pre') != null) {
    el.pre = true;
  }
}

function processRawAttrs (el) {
  var l = el.attrsList.length;
  if (l) {
    var attrs = el.attrs = new Array(l);
    for (var i = 0; i < l; i++) {
      attrs[i] = {
        name: el.attrsList[i].name,
        value: JSON.stringify(el.attrsList[i].value)
      };
    }
  } else if (!el.pre) {
    // non root node in pre blocks with no attributes
    el.plain = true;
  }
}

function processElement (element, options) {
  processKey(element);

  // determine whether this is a plain element after
  // removing structural attributes
  element.plain = !element.key && !element.attrsList.length;

  processRef(element);
  processSlot(element);
  processComponent(element);
  for (var i = 0; i < transforms.length; i++) {
    element = transforms[i](element, options) || element;
  }
  processAttrs(element);
}

function processKey (el) {
  var exp = getBindingAttr(el, 'key');
  if (exp) {
    if ("development" !== 'production' && el.tag === 'template') {
      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
    }
    el.key = exp;
  }
}

function processRef (el) {
  var ref = getBindingAttr(el, 'ref');
  if (ref) {
    el.ref = ref;
    el.refInFor = checkInFor(el);
  }
}

function processFor (el) {
  var exp;
  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
    var inMatch = exp.match(forAliasRE);
    if (!inMatch) {
      "development" !== 'production' && warn$2(
        ("Invalid v-for expression: " + exp)
      );
      return
    }
    el.for = inMatch[2].trim();
    var alias = inMatch[1].trim();
    var iteratorMatch = alias.match(forIteratorRE);
    if (iteratorMatch) {
      el.alias = iteratorMatch[1].trim();
      el.iterator1 = iteratorMatch[2].trim();
      if (iteratorMatch[3]) {
        el.iterator2 = iteratorMatch[3].trim();
      }
    } else {
      el.alias = alias.replace(stripParensRE, '');
    }
  }
}

function processIf (el) {
  var exp = getAndRemoveAttr(el, 'v-if');
  if (exp) {
    el.if = exp;
    addIfCondition(el, {
      exp: exp,
      block: el
    });
  } else {
    if (getAndRemoveAttr(el, 'v-else') != null) {
      el.else = true;
    }
    var elseif = getAndRemoveAttr(el, 'v-else-if');
    if (elseif) {
      el.elseif = elseif;
    }
  }
}

function processIfConditions (el, parent) {
  var prev = findPrevElement(parent.children);
  if (prev && prev.if) {
    addIfCondition(prev, {
      exp: el.elseif,
      block: el
    });
  } else if (true) {
    warn$2(
      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
      "used on element <" + (el.tag) + "> without corresponding v-if."
    );
  }
}

function findPrevElement (children) {
  var i = children.length;
  while (i--) {
    if (children[i].type === 1) {
      return children[i]
    } else {
      if ("development" !== 'production' && children[i].text !== ' ') {
        warn$2(
          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
          "will be ignored."
        );
      }
      children.pop();
    }
  }
}

function addIfCondition (el, condition) {
  if (!el.ifConditions) {
    el.ifConditions = [];
  }
  el.ifConditions.push(condition);
}

function processOnce (el) {
  var once$$1 = getAndRemoveAttr(el, 'v-once');
  if (once$$1 != null) {
    el.once = true;
  }
}

function processSlot (el) {
  if (el.tag === 'slot') {
    el.slotName = getBindingAttr(el, 'name');
    if ("development" !== 'production' && el.key) {
      warn$2(
        "`key` does not work on <slot> because slots are abstract outlets " +
        "and can possibly expand into multiple elements. " +
        "Use the key on a wrapping element instead."
      );
    }
  } else {
    var slotScope;
    if (el.tag === 'template') {
      slotScope = getAndRemoveAttr(el, 'scope');
      /* istanbul ignore if */
      if ("development" !== 'production' && slotScope) {
        warn$2(
          "the \"scope\" attribute for scoped slots have been deprecated and " +
          "replaced by \"slot-scope\" since 2.5. The new \"slot-scope\" attribute " +
          "can also be used on plain elements in addition to <template> to " +
          "denote scoped slots.",
          true
        );
      }
      el.slotScope = slotScope || getAndRemoveAttr(el, 'slot-scope');
    } else if ((slotScope = getAndRemoveAttr(el, 'slot-scope'))) {
      /* istanbul ignore if */
      if ("development" !== 'production' && el.attrsMap['v-for']) {
        warn$2(
          "Ambiguous combined usage of slot-scope and v-for on <" + (el.tag) + "> " +
          "(v-for takes higher priority). Use a wrapper <template> for the " +
          "scoped slot to make it clearer.",
          true
        );
      }
      el.slotScope = slotScope;
    }
    var slotTarget = getBindingAttr(el, 'slot');
    if (slotTarget) {
      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
      // preserve slot as an attribute for native shadow DOM compat
      // only for non-scoped slots.
      if (el.tag !== 'template' && !el.slotScope) {
        addAttr(el, 'slot', slotTarget);
      }
    }
  }
}

function processComponent (el) {
  var binding;
  if ((binding = getBindingAttr(el, 'is'))) {
    el.component = binding;
  }
  if (getAndRemoveAttr(el, 'inline-template') != null) {
    el.inlineTemplate = true;
  }
}

function processAttrs (el) {
  var list = el.attrsList;
  var i, l, name, rawName, value, modifiers, isProp;
  for (i = 0, l = list.length; i < l; i++) {
    name = rawName = list[i].name;
    value = list[i].value;
    if (dirRE.test(name)) {
      // mark element as dynamic
      el.hasBindings = true;
      // modifiers
      modifiers = parseModifiers(name);
      if (modifiers) {
        name = name.replace(modifierRE, '');
      }
      if (bindRE.test(name)) { // v-bind
        name = name.replace(bindRE, '');
        value = parseFilters(value);
        isProp = false;
        if (modifiers) {
          if (modifiers.prop) {
            isProp = true;
            name = camelize(name);
            if (name === 'innerHtml') { name = 'innerHTML'; }
          }
          if (modifiers.camel) {
            name = camelize(name);
          }
          if (modifiers.sync) {
            addHandler(
              el,
              ("update:" + (camelize(name))),
              genAssignmentCode(value, "$event")
            );
          }
        }
        if (isProp || (
          !el.component && platformMustUseProp(el.tag, el.attrsMap.type, name)
        )) {
          addProp(el, name, value);
        } else {
          addAttr(el, name, value);
        }
      } else if (onRE.test(name)) { // v-on
        name = name.replace(onRE, '');
        addHandler(el, name, value, modifiers, false, warn$2);
      } else { // normal directives
        name = name.replace(dirRE, '');
        // parse arg
        var argMatch = name.match(argRE);
        var arg = argMatch && argMatch[1];
        if (arg) {
          name = name.slice(0, -(arg.length + 1));
        }
        addDirective(el, name, rawName, value, arg, modifiers);
        if ("development" !== 'production' && name === 'model') {
          checkForAliasModel(el, value);
        }
      }
    } else {
      // literal attribute
      if (true) {
        var expression = parseText(value, delimiters);
        if (expression) {
          warn$2(
            name + "=\"" + value + "\": " +
            'Interpolation inside attributes has been removed. ' +
            'Use v-bind or the colon shorthand instead. For example, ' +
            'instead of <div id="{{ val }}">, use <div :id="val">.'
          );
        }
      }
      addAttr(el, name, JSON.stringify(value));
      // #6887 firefox doesn't update muted state if set via attribute
      // even immediately after element creation
      if (!el.component &&
          name === 'muted' &&
          platformMustUseProp(el.tag, el.attrsMap.type, name)) {
        addProp(el, name, 'true');
      }
    }
  }
}

function checkInFor (el) {
  var parent = el;
  while (parent) {
    if (parent.for !== undefined) {
      return true
    }
    parent = parent.parent;
  }
  return false
}

function parseModifiers (name) {
  var match = name.match(modifierRE);
  if (match) {
    var ret = {};
    match.forEach(function (m) { ret[m.slice(1)] = true; });
    return ret
  }
}

function makeAttrsMap (attrs) {
  var map = {};
  for (var i = 0, l = attrs.length; i < l; i++) {
    if (
      "development" !== 'production' &&
      map[attrs[i].name] && !isIE && !isEdge
    ) {
      warn$2('duplicate attribute: ' + attrs[i].name);
    }
    map[attrs[i].name] = attrs[i].value;
  }
  return map
}

// for script (e.g. type="x/template") or style, do not decode content
function isTextTag (el) {
  return el.tag === 'script' || el.tag === 'style'
}

function isForbiddenTag (el) {
  return (
    el.tag === 'style' ||
    (el.tag === 'script' && (
      !el.attrsMap.type ||
      el.attrsMap.type === 'text/javascript'
    ))
  )
}

var ieNSBug = /^xmlns:NS\d+/;
var ieNSPrefix = /^NS\d+:/;

/* istanbul ignore next */
function guardIESVGBug (attrs) {
  var res = [];
  for (var i = 0; i < attrs.length; i++) {
    var attr = attrs[i];
    if (!ieNSBug.test(attr.name)) {
      attr.name = attr.name.replace(ieNSPrefix, '');
      res.push(attr);
    }
  }
  return res
}

function checkForAliasModel (el, value) {
  var _el = el;
  while (_el) {
    if (_el.for && _el.alias === value) {
      warn$2(
        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
        "You are binding v-model directly to a v-for iteration alias. " +
        "This will not be able to modify the v-for source array because " +
        "writing to the alias is like modifying a function local variable. " +
        "Consider using an array of objects and use v-model on an object property instead."
      );
    }
    _el = _el.parent;
  }
}

/*  */

/**
 * Expand input[v-model] with dyanmic type bindings into v-if-else chains
 * Turn this:
 *   <input v-model="data[type]" :type="type">
 * into this:
 *   <input v-if="type === 'checkbox'" type="checkbox" v-model="data[type]">
 *   <input v-else-if="type === 'radio'" type="radio" v-model="data[type]">
 *   <input v-else :type="type" v-model="data[type]">
 */

function preTransformNode (el, options) {
  if (el.tag === 'input') {
    var map = el.attrsMap;
    if (map['v-model'] && (map['v-bind:type'] || map[':type'])) {
      var typeBinding = getBindingAttr(el, 'type');
      var ifCondition = getAndRemoveAttr(el, 'v-if', true);
      var ifConditionExtra = ifCondition ? ("&&(" + ifCondition + ")") : "";
      var hasElse = getAndRemoveAttr(el, 'v-else', true) != null;
      var elseIfCondition = getAndRemoveAttr(el, 'v-else-if', true);
      // 1. checkbox
      var branch0 = cloneASTElement(el);
      // process for on the main node
      processFor(branch0);
      addRawAttr(branch0, 'type', 'checkbox');
      processElement(branch0, options);
      branch0.processed = true; // prevent it from double-processed
      branch0.if = "(" + typeBinding + ")==='checkbox'" + ifConditionExtra;
      addIfCondition(branch0, {
        exp: branch0.if,
        block: branch0
      });
      // 2. add radio else-if condition
      var branch1 = cloneASTElement(el);
      getAndRemoveAttr(branch1, 'v-for', true);
      addRawAttr(branch1, 'type', 'radio');
      processElement(branch1, options);
      addIfCondition(branch0, {
        exp: "(" + typeBinding + ")==='radio'" + ifConditionExtra,
        block: branch1
      });
      // 3. other
      var branch2 = cloneASTElement(el);
      getAndRemoveAttr(branch2, 'v-for', true);
      addRawAttr(branch2, ':type', typeBinding);
      processElement(branch2, options);
      addIfCondition(branch0, {
        exp: ifCondition,
        block: branch2
      });

      if (hasElse) {
        branch0.else = true;
      } else if (elseIfCondition) {
        branch0.elseif = elseIfCondition;
      }

      return branch0
    }
  }
}

function cloneASTElement (el) {
  return createASTElement(el.tag, el.attrsList.slice(), el.parent)
}

function addRawAttr (el, name, value) {
  el.attrsMap[name] = value;
  el.attrsList.push({ name: name, value: value });
}

var model$2 = {
  preTransformNode: preTransformNode
};

var modules$1 = [
  klass$1,
  style$1,
  model$2
];

/*  */

function text (el, dir) {
  if (dir.value) {
    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
  }
}

/*  */

function html (el, dir) {
  if (dir.value) {
    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
  }
}

var directives$1 = {
  model: model,
  text: text,
  html: html
};

/*  */

var baseOptions = {
  expectHTML: true,
  modules: modules$1,
  directives: directives$1,
  isPreTag: isPreTag,
  isUnaryTag: isUnaryTag,
  mustUseProp: mustUseProp,
  canBeLeftOpenTag: canBeLeftOpenTag,
  isReservedTag: isReservedTag,
  getTagNamespace: getTagNamespace,
  staticKeys: genStaticKeys(modules$1)
};

/*  */

var isStaticKey;
var isPlatformReservedTag;

var genStaticKeysCached = cached(genStaticKeys$1);

/**
 * Goal of the optimizer: walk the generated template AST tree
 * and detect sub-trees that are purely static, i.e. parts of
 * the DOM that never needs to change.
 *
 * Once we detect these sub-trees, we can:
 *
 * 1. Hoist them into constants, so that we no longer need to
 *    create fresh nodes for them on each re-render;
 * 2. Completely skip them in the patching process.
 */
function optimize (root, options) {
  if (!root) { return }
  isStaticKey = genStaticKeysCached(options.staticKeys || '');
  isPlatformReservedTag = options.isReservedTag || no;
  // first pass: mark all non-static nodes.
  markStatic$1(root);
  // second pass: mark static roots.
  markStaticRoots(root, false);
}

function genStaticKeys$1 (keys) {
  return makeMap(
    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
    (keys ? ',' + keys : '')
  )
}

function markStatic$1 (node) {
  node.static = isStatic(node);
  if (node.type === 1) {
    // do not make component slot content static. this avoids
    // 1. components not able to mutate slot nodes
    // 2. static slot content fails for hot-reloading
    if (
      !isPlatformReservedTag(node.tag) &&
      node.tag !== 'slot' &&
      node.attrsMap['inline-template'] == null
    ) {
      return
    }
    for (var i = 0, l = node.children.length; i < l; i++) {
      var child = node.children[i];
      markStatic$1(child);
      if (!child.static) {
        node.static = false;
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        var block = node.ifConditions[i$1].block;
        markStatic$1(block);
        if (!block.static) {
          node.static = false;
        }
      }
    }
  }
}

function markStaticRoots (node, isInFor) {
  if (node.type === 1) {
    if (node.static || node.once) {
      node.staticInFor = isInFor;
    }
    // For a node to qualify as a static root, it should have children that
    // are not just static text. Otherwise the cost of hoisting out will
    // outweigh the benefits and it's better off to just always render it fresh.
    if (node.static && node.children.length && !(
      node.children.length === 1 &&
      node.children[0].type === 3
    )) {
      node.staticRoot = true;
      return
    } else {
      node.staticRoot = false;
    }
    if (node.children) {
      for (var i = 0, l = node.children.length; i < l; i++) {
        markStaticRoots(node.children[i], isInFor || !!node.for);
      }
    }
    if (node.ifConditions) {
      for (var i$1 = 1, l$1 = node.ifConditions.length; i$1 < l$1; i$1++) {
        markStaticRoots(node.ifConditions[i$1].block, isInFor);
      }
    }
  }
}

function isStatic (node) {
  if (node.type === 2) { // expression
    return false
  }
  if (node.type === 3) { // text
    return true
  }
  return !!(node.pre || (
    !node.hasBindings && // no dynamic bindings
    !node.if && !node.for && // not v-if or v-for or v-else
    !isBuiltInTag(node.tag) && // not a built-in
    isPlatformReservedTag(node.tag) && // not a component
    !isDirectChildOfTemplateFor(node) &&
    Object.keys(node).every(isStaticKey)
  ))
}

function isDirectChildOfTemplateFor (node) {
  while (node.parent) {
    node = node.parent;
    if (node.tag !== 'template') {
      return false
    }
    if (node.for) {
      return true
    }
  }
  return false
}

/*  */

var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;

// keyCode aliases
var keyCodes = {
  esc: 27,
  tab: 9,
  enter: 13,
  space: 32,
  up: 38,
  left: 37,
  right: 39,
  down: 40,
  'delete': [8, 46]
};

// #4868: modifiers that prevent the execution of the listener
// need to explicitly return null so that we can determine whether to remove
// the listener for .once
var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };

var modifierCode = {
  stop: '$event.stopPropagation();',
  prevent: '$event.preventDefault();',
  self: genGuard("$event.target !== $event.currentTarget"),
  ctrl: genGuard("!$event.ctrlKey"),
  shift: genGuard("!$event.shiftKey"),
  alt: genGuard("!$event.altKey"),
  meta: genGuard("!$event.metaKey"),
  left: genGuard("'button' in $event && $event.button !== 0"),
  middle: genGuard("'button' in $event && $event.button !== 1"),
  right: genGuard("'button' in $event && $event.button !== 2")
};

function genHandlers (
  events,
  isNative,
  warn
) {
  var res = isNative ? 'nativeOn:{' : 'on:{';
  for (var name in events) {
    res += "\"" + name + "\":" + (genHandler(name, events[name])) + ",";
  }
  return res.slice(0, -1) + '}'
}

function genHandler (
  name,
  handler
) {
  if (!handler) {
    return 'function(){}'
  }

  if (Array.isArray(handler)) {
    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
  }

  var isMethodPath = simplePathRE.test(handler.value);
  var isFunctionExpression = fnExpRE.test(handler.value);

  if (!handler.modifiers) {
    return isMethodPath || isFunctionExpression
      ? handler.value
      : ("function($event){" + (handler.value) + "}") // inline statement
  } else {
    var code = '';
    var genModifierCode = '';
    var keys = [];
    for (var key in handler.modifiers) {
      if (modifierCode[key]) {
        genModifierCode += modifierCode[key];
        // left/right
        if (keyCodes[key]) {
          keys.push(key);
        }
      } else if (key === 'exact') {
        var modifiers = (handler.modifiers);
        genModifierCode += genGuard(
          ['ctrl', 'shift', 'alt', 'meta']
            .filter(function (keyModifier) { return !modifiers[keyModifier]; })
            .map(function (keyModifier) { return ("$event." + keyModifier + "Key"); })
            .join('||')
        );
      } else {
        keys.push(key);
      }
    }
    if (keys.length) {
      code += genKeyFilter(keys);
    }
    // Make sure modifiers like prevent and stop get executed after key filtering
    if (genModifierCode) {
      code += genModifierCode;
    }
    var handlerCode = isMethodPath
      ? handler.value + '($event)'
      : isFunctionExpression
        ? ("(" + (handler.value) + ")($event)")
        : handler.value;
    return ("function($event){" + code + handlerCode + "}")
  }
}

function genKeyFilter (keys) {
  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
}

function genFilterCode (key) {
  var keyVal = parseInt(key, 10);
  if (keyVal) {
    return ("$event.keyCode!==" + keyVal)
  }
  var code = keyCodes[key];
  return (
    "_k($event.keyCode," +
    (JSON.stringify(key)) + "," +
    (JSON.stringify(code)) + "," +
    "$event.key)"
  )
}

/*  */

function on (el, dir) {
  if ("development" !== 'production' && dir.modifiers) {
    warn("v-on without argument does not support modifiers.");
  }
  el.wrapListeners = function (code) { return ("_g(" + code + "," + (dir.value) + ")"); };
}

/*  */

function bind$1 (el, dir) {
  el.wrapData = function (code) {
    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + "," + (dir.modifiers && dir.modifiers.prop ? 'true' : 'false') + (dir.modifiers && dir.modifiers.sync ? ',true' : '') + ")")
  };
}

/*  */

var baseDirectives = {
  on: on,
  bind: bind$1,
  cloak: noop
};

/*  */

var CodegenState = function CodegenState (options) {
  this.options = options;
  this.warn = options.warn || baseWarn;
  this.transforms = pluckModuleFunction(options.modules, 'transformCode');
  this.dataGenFns = pluckModuleFunction(options.modules, 'genData');
  this.directives = extend(extend({}, baseDirectives), options.directives);
  var isReservedTag = options.isReservedTag || no;
  this.maybeComponent = function (el) { return !isReservedTag(el.tag); };
  this.onceId = 0;
  this.staticRenderFns = [];
};



function generate (
  ast,
  options
) {
  var state = new CodegenState(options);
  var code = ast ? genElement(ast, state) : '_c("div")';
  return {
    render: ("with(this){return " + code + "}"),
    staticRenderFns: state.staticRenderFns
  }
}

function genElement (el, state) {
  if (el.staticRoot && !el.staticProcessed) {
    return genStatic(el, state)
  } else if (el.once && !el.onceProcessed) {
    return genOnce(el, state)
  } else if (el.for && !el.forProcessed) {
    return genFor(el, state)
  } else if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.tag === 'template' && !el.slotTarget) {
    return genChildren(el, state) || 'void 0'
  } else if (el.tag === 'slot') {
    return genSlot(el, state)
  } else {
    // component or element
    var code;
    if (el.component) {
      code = genComponent(el.component, el, state);
    } else {
      var data = el.plain ? undefined : genData$2(el, state);

      var children = el.inlineTemplate ? null : genChildren(el, state, true);
      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
    }
    // module transforms
    for (var i = 0; i < state.transforms.length; i++) {
      code = state.transforms[i](el, code);
    }
    return code
  }
}

// hoist static sub-trees out
function genStatic (el, state, once$$1) {
  el.staticProcessed = true;
  state.staticRenderFns.push(("with(this){return " + (genElement(el, state)) + "}"));
  return ("_m(" + (state.staticRenderFns.length - 1) + "," + (el.staticInFor ? 'true' : 'false') + "," + (once$$1 ? 'true' : 'false') + ")")
}

// v-once
function genOnce (el, state) {
  el.onceProcessed = true;
  if (el.if && !el.ifProcessed) {
    return genIf(el, state)
  } else if (el.staticInFor) {
    var key = '';
    var parent = el.parent;
    while (parent) {
      if (parent.for) {
        key = parent.key;
        break
      }
      parent = parent.parent;
    }
    if (!key) {
      "development" !== 'production' && state.warn(
        "v-once can only be used inside v-for that is keyed. "
      );
      return genElement(el, state)
    }
    return ("_o(" + (genElement(el, state)) + "," + (state.onceId++) + "," + key + ")")
  } else {
    return genStatic(el, state, true)
  }
}

function genIf (
  el,
  state,
  altGen,
  altEmpty
) {
  el.ifProcessed = true; // avoid recursion
  return genIfConditions(el.ifConditions.slice(), state, altGen, altEmpty)
}

function genIfConditions (
  conditions,
  state,
  altGen,
  altEmpty
) {
  if (!conditions.length) {
    return altEmpty || '_e()'
  }

  var condition = conditions.shift();
  if (condition.exp) {
    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions, state, altGen, altEmpty)))
  } else {
    return ("" + (genTernaryExp(condition.block)))
  }

  // v-if with v-once should generate code like (a)?_m(0):_m(1)
  function genTernaryExp (el) {
    return altGen
      ? altGen(el, state)
      : el.once
        ? genOnce(el, state)
        : genElement(el, state)
  }
}

function genFor (
  el,
  state,
  altGen,
  altHelper
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';

  if ("development" !== 'production' &&
    state.maybeComponent(el) &&
    el.tag !== 'slot' &&
    el.tag !== 'template' &&
    !el.key
  ) {
    state.warn(
      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
      "v-for should have explicit keys. " +
      "See https://vuejs.org/guide/list.html#key for more info.",
      true /* tip */
    );
  }

  el.forProcessed = true; // avoid recursion
  return (altHelper || '_l') + "((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + ((altGen || genElement)(el, state)) +
    '})'
}

function genData$2 (el, state) {
  var data = '{';

  // directives first.
  // directives may mutate the el's other properties before they are generated.
  var dirs = genDirectives(el, state);
  if (dirs) { data += dirs + ','; }

  // key
  if (el.key) {
    data += "key:" + (el.key) + ",";
  }
  // ref
  if (el.ref) {
    data += "ref:" + (el.ref) + ",";
  }
  if (el.refInFor) {
    data += "refInFor:true,";
  }
  // pre
  if (el.pre) {
    data += "pre:true,";
  }
  // record original tag name for components using "is" attribute
  if (el.component) {
    data += "tag:\"" + (el.tag) + "\",";
  }
  // module data generation functions
  for (var i = 0; i < state.dataGenFns.length; i++) {
    data += state.dataGenFns[i](el);
  }
  // attributes
  if (el.attrs) {
    data += "attrs:{" + (genProps(el.attrs)) + "},";
  }
  // DOM props
  if (el.props) {
    data += "domProps:{" + (genProps(el.props)) + "},";
  }
  // event handlers
  if (el.events) {
    data += (genHandlers(el.events, false, state.warn)) + ",";
  }
  if (el.nativeEvents) {
    data += (genHandlers(el.nativeEvents, true, state.warn)) + ",";
  }
  // slot target
  // only for non-scoped slots
  if (el.slotTarget && !el.slotScope) {
    data += "slot:" + (el.slotTarget) + ",";
  }
  // scoped slots
  if (el.scopedSlots) {
    data += (genScopedSlots(el.scopedSlots, state)) + ",";
  }
  // component v-model
  if (el.model) {
    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
  }
  // inline-template
  if (el.inlineTemplate) {
    var inlineTemplate = genInlineTemplate(el, state);
    if (inlineTemplate) {
      data += inlineTemplate + ",";
    }
  }
  data = data.replace(/,$/, '') + '}';
  // v-bind data wrap
  if (el.wrapData) {
    data = el.wrapData(data);
  }
  // v-on data wrap
  if (el.wrapListeners) {
    data = el.wrapListeners(data);
  }
  return data
}

function genDirectives (el, state) {
  var dirs = el.directives;
  if (!dirs) { return }
  var res = 'directives:[';
  var hasRuntime = false;
  var i, l, dir, needRuntime;
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i];
    needRuntime = true;
    var gen = state.directives[dir.name];
    if (gen) {
      // compile-time directive that manipulates AST.
      // returns true if it also needs a runtime counterpart.
      needRuntime = !!gen(el, dir, state.warn);
    }
    if (needRuntime) {
      hasRuntime = true;
      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
    }
  }
  if (hasRuntime) {
    return res.slice(0, -1) + ']'
  }
}

function genInlineTemplate (el, state) {
  var ast = el.children[0];
  if ("development" !== 'production' && (
    el.children.length !== 1 || ast.type !== 1
  )) {
    state.warn('Inline-template components must have exactly one child element.');
  }
  if (ast.type === 1) {
    var inlineRenderFns = generate(ast, state.options);
    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
  }
}

function genScopedSlots (
  slots,
  state
) {
  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) {
      return genScopedSlot(key, slots[key], state)
    }).join(',')) + "])")
}

function genScopedSlot (
  key,
  el,
  state
) {
  if (el.for && !el.forProcessed) {
    return genForScopedSlot(key, el, state)
  }
  var fn = "function(" + (String(el.slotScope)) + "){" +
    "return " + (el.tag === 'template'
      ? el.if
        ? ((el.if) + "?" + (genChildren(el, state) || 'undefined') + ":undefined")
        : genChildren(el, state) || 'undefined'
      : genElement(el, state)) + "}";
  return ("{key:" + key + ",fn:" + fn + "}")
}

function genForScopedSlot (
  key,
  el,
  state
) {
  var exp = el.for;
  var alias = el.alias;
  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
  el.forProcessed = true; // avoid recursion
  return "_l((" + exp + ")," +
    "function(" + alias + iterator1 + iterator2 + "){" +
      "return " + (genScopedSlot(key, el, state)) +
    '})'
}

function genChildren (
  el,
  state,
  checkSkip,
  altGenElement,
  altGenNode
) {
  var children = el.children;
  if (children.length) {
    var el$1 = children[0];
    // optimize single v-for
    if (children.length === 1 &&
      el$1.for &&
      el$1.tag !== 'template' &&
      el$1.tag !== 'slot'
    ) {
      return (altGenElement || genElement)(el$1, state)
    }
    var normalizationType = checkSkip
      ? getNormalizationType(children, state.maybeComponent)
      : 0;
    var gen = altGenNode || genNode;
    return ("[" + (children.map(function (c) { return gen(c, state); }).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
  }
}

// determine the normalization needed for the children array.
// 0: no normalization needed
// 1: simple normalization needed (possible 1-level deep nested array)
// 2: full normalization needed
function getNormalizationType (
  children,
  maybeComponent
) {
  var res = 0;
  for (var i = 0; i < children.length; i++) {
    var el = children[i];
    if (el.type !== 1) {
      continue
    }
    if (needsNormalization(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
      res = 2;
      break
    }
    if (maybeComponent(el) ||
        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
      res = 1;
    }
  }
  return res
}

function needsNormalization (el) {
  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
}

function genNode (node, state) {
  if (node.type === 1) {
    return genElement(node, state)
  } if (node.type === 3 && node.isComment) {
    return genComment(node)
  } else {
    return genText(node)
  }
}

function genText (text) {
  return ("_v(" + (text.type === 2
    ? text.expression // no need for () because already wrapped in _s()
    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
}

function genComment (comment) {
  return ("_e(" + (JSON.stringify(comment.text)) + ")")
}

function genSlot (el, state) {
  var slotName = el.slotName || '"default"';
  var children = genChildren(el, state);
  var res = "_t(" + slotName + (children ? ("," + children) : '');
  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
  var bind$$1 = el.attrsMap['v-bind'];
  if ((attrs || bind$$1) && !children) {
    res += ",null";
  }
  if (attrs) {
    res += "," + attrs;
  }
  if (bind$$1) {
    res += (attrs ? '' : ',null') + "," + bind$$1;
  }
  return res + ')'
}

// componentName is el.component, take it as argument to shun flow's pessimistic refinement
function genComponent (
  componentName,
  el,
  state
) {
  var children = el.inlineTemplate ? null : genChildren(el, state, true);
  return ("_c(" + componentName + "," + (genData$2(el, state)) + (children ? ("," + children) : '') + ")")
}

function genProps (props) {
  var res = '';
  for (var i = 0; i < props.length; i++) {
    var prop = props[i];
    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
  }
  return res.slice(0, -1)
}

// #3895, #4268
function transformSpecialNewlines (text) {
  return text
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

/*  */

// these keywords should not appear inside expressions, but operators like
// typeof, instanceof and in are allowed
var prohibitedKeywordRE = new RegExp('\\b' + (
  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
  'super,throw,while,yield,delete,export,import,return,switch,default,' +
  'extends,finally,continue,debugger,function,arguments'
).split(',').join('\\b|\\b') + '\\b');

// these unary operators should not be used as property/method names
var unaryOperatorsRE = new RegExp('\\b' + (
  'delete,typeof,void'
).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');

// strip strings in expressions
var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

// detect problematic expressions in a template
function detectErrors (ast) {
  var errors = [];
  if (ast) {
    checkNode(ast, errors);
  }
  return errors
}

function checkNode (node, errors) {
  if (node.type === 1) {
    for (var name in node.attrsMap) {
      if (dirRE.test(name)) {
        var value = node.attrsMap[name];
        if (value) {
          if (name === 'v-for') {
            checkFor(node, ("v-for=\"" + value + "\""), errors);
          } else if (onRE.test(name)) {
            checkEvent(value, (name + "=\"" + value + "\""), errors);
          } else {
            checkExpression(value, (name + "=\"" + value + "\""), errors);
          }
        }
      }
    }
    if (node.children) {
      for (var i = 0; i < node.children.length; i++) {
        checkNode(node.children[i], errors);
      }
    }
  } else if (node.type === 2) {
    checkExpression(node.expression, node.text, errors);
  }
}

function checkEvent (exp, text, errors) {
  var stipped = exp.replace(stripStringRE, '');
  var keywordMatch = stipped.match(unaryOperatorsRE);
  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
    errors.push(
      "avoid using JavaScript unary operator as property name: " +
      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
    );
  }
  checkExpression(exp, text, errors);
}

function checkFor (node, text, errors) {
  checkExpression(node.for || '', text, errors);
  checkIdentifier(node.alias, 'v-for alias', text, errors);
  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
}

function checkIdentifier (
  ident,
  type,
  text,
  errors
) {
  if (typeof ident === 'string') {
    try {
      new Function(("var " + ident + "=_"));
    } catch (e) {
      errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
    }
  }
}

function checkExpression (exp, text, errors) {
  try {
    new Function(("return " + exp));
  } catch (e) {
    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
    if (keywordMatch) {
      errors.push(
        "avoid using JavaScript keyword as property name: " +
        "\"" + (keywordMatch[0]) + "\"\n  Raw expression: " + (text.trim())
      );
    } else {
      errors.push(
        "invalid expression: " + (e.message) + " in\n\n" +
        "    " + exp + "\n\n" +
        "  Raw expression: " + (text.trim()) + "\n"
      );
    }
  }
}

/*  */

function createFunction (code, errors) {
  try {
    return new Function(code)
  } catch (err) {
    errors.push({ err: err, code: code });
    return noop
  }
}

function createCompileToFunctionFn (compile) {
  var cache = Object.create(null);

  return function compileToFunctions (
    template,
    options,
    vm
  ) {
    options = extend({}, options);
    var warn$$1 = options.warn || warn;
    delete options.warn;

    /* istanbul ignore if */
    if (true) {
      // detect possible CSP restriction
      try {
        new Function('return 1');
      } catch (e) {
        if (e.toString().match(/unsafe-eval|CSP/)) {
          warn$$1(
            'It seems you are using the standalone build of Vue.js in an ' +
            'environment with Content Security Policy that prohibits unsafe-eval. ' +
            'The template compiler cannot work in this environment. Consider ' +
            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
            'templates into render functions.'
          );
        }
      }
    }

    // check cache
    var key = options.delimiters
      ? String(options.delimiters) + template
      : template;
    if (cache[key]) {
      return cache[key]
    }

    // compile
    var compiled = compile(template, options);

    // check compilation errors/tips
    if (true) {
      if (compiled.errors && compiled.errors.length) {
        warn$$1(
          "Error compiling template:\n\n" + template + "\n\n" +
          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
          vm
        );
      }
      if (compiled.tips && compiled.tips.length) {
        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
      }
    }

    // turn code into functions
    var res = {};
    var fnGenErrors = [];
    res.render = createFunction(compiled.render, fnGenErrors);
    res.staticRenderFns = compiled.staticRenderFns.map(function (code) {
      return createFunction(code, fnGenErrors)
    });

    // check function generation errors.
    // this should only happen if there is a bug in the compiler itself.
    // mostly for codegen development use
    /* istanbul ignore if */
    if (true) {
      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
        warn$$1(
          "Failed to generate render function:\n\n" +
          fnGenErrors.map(function (ref) {
            var err = ref.err;
            var code = ref.code;

            return ((err.toString()) + " in\n\n" + code + "\n");
        }).join('\n'),
          vm
        );
      }
    }

    return (cache[key] = res)
  }
}

/*  */

function createCompilerCreator (baseCompile) {
  return function createCompiler (baseOptions) {
    function compile (
      template,
      options
    ) {
      var finalOptions = Object.create(baseOptions);
      var errors = [];
      var tips = [];
      finalOptions.warn = function (msg, tip) {
        (tip ? tips : errors).push(msg);
      };

      if (options) {
        // merge custom modules
        if (options.modules) {
          finalOptions.modules =
            (baseOptions.modules || []).concat(options.modules);
        }
        // merge custom directives
        if (options.directives) {
          finalOptions.directives = extend(
            Object.create(baseOptions.directives),
            options.directives
          );
        }
        // copy other options
        for (var key in options) {
          if (key !== 'modules' && key !== 'directives') {
            finalOptions[key] = options[key];
          }
        }
      }

      var compiled = baseCompile(template, finalOptions);
      if (true) {
        errors.push.apply(errors, detectErrors(compiled.ast));
      }
      compiled.errors = errors;
      compiled.tips = tips;
      return compiled
    }

    return {
      compile: compile,
      compileToFunctions: createCompileToFunctionFn(compile)
    }
  }
}

/*  */

// `createCompilerCreator` allows creating compilers that use alternative
// parser/optimizer/codegen, e.g the SSR optimizing compiler.
// Here we just export a default compiler using the default parts.
var createCompiler = createCompilerCreator(function baseCompile (
  template,
  options
) {
  var ast = parse(template.trim(), options);
  optimize(ast, options);
  var code = generate(ast, options);
  return {
    ast: ast,
    render: code.render,
    staticRenderFns: code.staticRenderFns
  }
});

/*  */

var ref$1 = createCompiler(baseOptions);
var compileToFunctions = ref$1.compileToFunctions;

/*  */

// check whether current browser encodes a char inside attribute values
var div;
function getShouldDecode (href) {
  div = div || document.createElement('div');
  div.innerHTML = href ? "<a href=\"\n\"/>" : "<div a=\"\n\"/>";
  return div.innerHTML.indexOf('&#10;') > 0
}

// #3663: IE encodes newlines inside attribute values while other browsers don't
var shouldDecodeNewlines = inBrowser ? getShouldDecode(false) : false;
// #6828: chrome encodes content in a[href]
var shouldDecodeNewlinesForHref = inBrowser ? getShouldDecode(true) : false;

/*  */

var idToTemplate = cached(function (id) {
  var el = query(id);
  return el && el.innerHTML
});

var mount = Vue$3.prototype.$mount;
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && query(el);

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {
    "development" !== 'production' && warn(
      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
    );
    return this
  }

  var options = this.$options;
  // resolve template/el and convert to render function
  if (!options.render) {
    var template = options.template;
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template);
          /* istanbul ignore if */
          if ("development" !== 'production' && !template) {
            warn(
              ("Template element not found or is empty: " + (options.template)),
              this
            );
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML;
      } else {
        if (true) {
          warn('invalid template option:' + template, this);
        }
        return this
      }
    } else if (el) {
      template = getOuterHTML(el);
    }
    if (template) {
      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile');
      }

      var ref = compileToFunctions(template, {
        shouldDecodeNewlines: shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this);
      var render = ref.render;
      var staticRenderFns = ref.staticRenderFns;
      options.render = render;
      options.staticRenderFns = staticRenderFns;

      /* istanbul ignore if */
      if ("development" !== 'production' && config.performance && mark) {
        mark('compile end');
        measure(("vue " + (this._name) + " compile"), 'compile', 'compile end');
      }
    }
  }
  return mount.call(this, el, hydrating)
};

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML (el) {
  if (el.outerHTML) {
    return el.outerHTML
  } else {
    var container = document.createElement('div');
    container.appendChild(el.cloneNode(true));
    return container.innerHTML
  }
}

Vue$3.compile = compileToFunctions;

module.exports = Vue$3;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(19).setImmediate))

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(15), __webpack_require__(17)))

/***/ }),

/***/ 338:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(339);


/***/ }),

/***/ 339:
/***/ (function(module, exports, __webpack_require__) {

var Chartist = __webpack_require__(340);

type = ['', 'info', 'success', 'warning', 'danger'];

demo = {
    initPickColor: function initPickColor() {
        $('.pick-class-label').click(function () {
            var new_class = $(this).attr('new-class');
            var old_class = $('#display-buttons').attr('data-class');
            var display_div = $('#display-buttons');
            if (display_div.length) {
                var display_buttons = display_div.find('.btn');
                display_buttons.removeClass(old_class);
                display_buttons.addClass(new_class);
                display_div.attr('data-class', new_class);
            }
        });
    },

    initDocumentationCharts: function initDocumentationCharts() {
        /* ----------==========     Daily Sales Chart initialization For Documentation    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [[12, 17, 7, 17, 23, 18, 38]]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        };

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);
    },

    initDashboardPageCharts: function initDashboardPageCharts() {

        /* ----------==========     Daily Sales Chart initialization    ==========---------- */

        dataDailySalesChart = {
            labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
            series: [[12, 17, 7, 17, 23, 18, 38]]
        };

        optionsDailySalesChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        };

        var dailySalesChart = new Chartist.Line('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);

        md.startAnimationForLineChart(dailySalesChart);

        /* ----------==========     Completed Tasks Chart initialization    ==========---------- */

        dataCompletedTasksChart = {
            labels: ['12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am'],
            series: [[230, 750, 450, 300, 280, 240, 200, 190]]
        };

        optionsCompletedTasksChart = {
            lineSmooth: Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0
            }
        };

        var completedTasksChart = new Chartist.Line('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        md.startAnimationForLineChart(completedTasksChart);

        /* ----------==========     Emails Subscription Chart initialization    ==========---------- */

        var dataEmailsSubscriptionChart = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
        };
        var optionsEmailsSubscriptionChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 0
            }
        };
        var responsiveOptions = [['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
                labelInterpolationFnc: function labelInterpolationFnc(value) {
                    return value[0];
                }
            }
        }]];
        var emailsSubscriptionChart = Chartist.Bar('#emailsSubscriptionChart', dataEmailsSubscriptionChart, optionsEmailsSubscriptionChart, responsiveOptions);

        //start animation for the Emails Subscription Chart
        md.startAnimationForBarChart(emailsSubscriptionChart);
    },

    initGoogleMaps: function initGoogleMaps() {
        var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{
                "featureType": "water",
                "stylers": [{
                    "saturation": 43
                }, {
                    "lightness": -11
                }, {
                    "hue": "#0088ff"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "hue": "#ff0000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 99
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#808080"
                }, {
                    "lightness": 54
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ece2d9"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ccdca1"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#767676"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b8cb93"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.medical",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }]

        };
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);

        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "Hello World!"
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);
    },

    showNotification: function showNotification(from, align) {
        color = Math.floor(Math.random() * 4 + 1);

        $.notify({
            icon: "notifications",
            message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

        }, {
            type: type[color],
            timer: 4000,
            placement: {
                from: from,
                align: align
            }
        });
    }
};

$(document).ready(function () {

    // Javascript method's body can be found in assets/js/demos.js
    demo.initDashboardPageCharts();
});

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
var tmodelComponent = __webpack_require__(341);

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
        tmodelComponent.start();
    }
};

self.start();

/***/ }),

/***/ 340:
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory) {
  if (true) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return (root['Chartist'] = factory());
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    root['Chartist'] = factory();
  }
}(this, function () {

/* Chartist.js 0.11.0
 * Copyright © 2017 Gion Kunz
 * Free to use under either the WTFPL license or the MIT license.
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
 * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
 */
/**
 * The core module of Chartist that is mainly providing static functions and higher level functions for chart modules.
 *
 * @module Chartist.Core
 */
var Chartist = {
  version: '0.11.0'
};

(function (window, document, Chartist) {
  'use strict';

  /**
   * This object contains all namespaces used within Chartist.
   *
   * @memberof Chartist.Core
   * @type {{svg: string, xmlns: string, xhtml: string, xlink: string, ct: string}}
   */
  Chartist.namespaces = {
    svg: 'http://www.w3.org/2000/svg',
    xmlns: 'http://www.w3.org/2000/xmlns/',
    xhtml: 'http://www.w3.org/1999/xhtml',
    xlink: 'http://www.w3.org/1999/xlink',
    ct: 'http://gionkunz.github.com/chartist-js/ct'
  };

  /**
   * Helps to simplify functional style code
   *
   * @memberof Chartist.Core
   * @param {*} n This exact value will be returned by the noop function
   * @return {*} The same value that was provided to the n parameter
   */
  Chartist.noop = function (n) {
    return n;
  };

  /**
   * Generates a-z from a number 0 to 26
   *
   * @memberof Chartist.Core
   * @param {Number} n A number from 0 to 26 that will result in a letter a-z
   * @return {String} A character from a-z based on the input number n
   */
  Chartist.alphaNumerate = function (n) {
    // Limit to a-z
    return String.fromCharCode(97 + n % 26);
  };

  /**
   * Simple recursive object extend
   *
   * @memberof Chartist.Core
   * @param {Object} target Target object where the source will be merged into
   * @param {Object...} sources This object (objects) will be merged into target and then target is returned
   * @return {Object} An object that has the same reference as target but is extended and merged with the properties of source
   */
  Chartist.extend = function (target) {
    var i, source, sourceProp;
    target = target || {};

    for (i = 1; i < arguments.length; i++) {
      source = arguments[i];
      for (var prop in source) {
        sourceProp = source[prop];
        if (typeof sourceProp === 'object' && sourceProp !== null && !(sourceProp instanceof Array)) {
          target[prop] = Chartist.extend(target[prop], sourceProp);
        } else {
          target[prop] = sourceProp;
        }
      }
    }

    return target;
  };

  /**
   * Replaces all occurrences of subStr in str with newSubStr and returns a new string.
   *
   * @memberof Chartist.Core
   * @param {String} str
   * @param {String} subStr
   * @param {String} newSubStr
   * @return {String}
   */
  Chartist.replaceAll = function(str, subStr, newSubStr) {
    return str.replace(new RegExp(subStr, 'g'), newSubStr);
  };

  /**
   * Converts a number to a string with a unit. If a string is passed then this will be returned unmodified.
   *
   * @memberof Chartist.Core
   * @param {Number} value
   * @param {String} unit
   * @return {String} Returns the passed number value with unit.
   */
  Chartist.ensureUnit = function(value, unit) {
    if(typeof value === 'number') {
      value = value + unit;
    }

    return value;
  };

  /**
   * Converts a number or string to a quantity object.
   *
   * @memberof Chartist.Core
   * @param {String|Number} input
   * @return {Object} Returns an object containing the value as number and the unit as string.
   */
  Chartist.quantity = function(input) {
    if (typeof input === 'string') {
      var match = (/^(\d+)\s*(.*)$/g).exec(input);
      return {
        value : +match[1],
        unit: match[2] || undefined
      };
    }
    return { value: input };
  };

  /**
   * This is a wrapper around document.querySelector that will return the query if it's already of type Node
   *
   * @memberof Chartist.Core
   * @param {String|Node} query The query to use for selecting a Node or a DOM node that will be returned directly
   * @return {Node}
   */
  Chartist.querySelector = function(query) {
    return query instanceof Node ? query : document.querySelector(query);
  };

  /**
   * Functional style helper to produce array with given length initialized with undefined values
   *
   * @memberof Chartist.Core
   * @param length
   * @return {Array}
   */
  Chartist.times = function(length) {
    return Array.apply(null, new Array(length));
  };

  /**
   * Sum helper to be used in reduce functions
   *
   * @memberof Chartist.Core
   * @param previous
   * @param current
   * @return {*}
   */
  Chartist.sum = function(previous, current) {
    return previous + (current ? current : 0);
  };

  /**
   * Multiply helper to be used in `Array.map` for multiplying each value of an array with a factor.
   *
   * @memberof Chartist.Core
   * @param {Number} factor
   * @returns {Function} Function that can be used in `Array.map` to multiply each value in an array
   */
  Chartist.mapMultiply = function(factor) {
    return function(num) {
      return num * factor;
    };
  };

  /**
   * Add helper to be used in `Array.map` for adding a addend to each value of an array.
   *
   * @memberof Chartist.Core
   * @param {Number} addend
   * @returns {Function} Function that can be used in `Array.map` to add a addend to each value in an array
   */
  Chartist.mapAdd = function(addend) {
    return function(num) {
      return num + addend;
    };
  };

  /**
   * Map for multi dimensional arrays where their nested arrays will be mapped in serial. The output array will have the length of the largest nested array. The callback function is called with variable arguments where each argument is the nested array value (or undefined if there are no more values).
   *
   * @memberof Chartist.Core
   * @param arr
   * @param cb
   * @return {Array}
   */
  Chartist.serialMap = function(arr, cb) {
    var result = [],
        length = Math.max.apply(null, arr.map(function(e) {
          return e.length;
        }));

    Chartist.times(length).forEach(function(e, index) {
      var args = arr.map(function(e) {
        return e[index];
      });

      result[index] = cb.apply(null, args);
    });

    return result;
  };

  /**
   * This helper function can be used to round values with certain precision level after decimal. This is used to prevent rounding errors near float point precision limit.
   *
   * @memberof Chartist.Core
   * @param {Number} value The value that should be rounded with precision
   * @param {Number} [digits] The number of digits after decimal used to do the rounding
   * @returns {number} Rounded value
   */
  Chartist.roundWithPrecision = function(value, digits) {
    var precision = Math.pow(10, digits || Chartist.precision);
    return Math.round(value * precision) / precision;
  };

  /**
   * Precision level used internally in Chartist for rounding. If you require more decimal places you can increase this number.
   *
   * @memberof Chartist.Core
   * @type {number}
   */
  Chartist.precision = 8;

  /**
   * A map with characters to escape for strings to be safely used as attribute values.
   *
   * @memberof Chartist.Core
   * @type {Object}
   */
  Chartist.escapingMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  };

  /**
   * This function serializes arbitrary data to a string. In case of data that can't be easily converted to a string, this function will create a wrapper object and serialize the data using JSON.stringify. The outcoming string will always be escaped using Chartist.escapingMap.
   * If called with null or undefined the function will return immediately with null or undefined.
   *
   * @memberof Chartist.Core
   * @param {Number|String|Object} data
   * @return {String}
   */
  Chartist.serialize = function(data) {
    if(data === null || data === undefined) {
      return data;
    } else if(typeof data === 'number') {
      data = ''+data;
    } else if(typeof data === 'object') {
      data = JSON.stringify({data: data});
    }

    return Object.keys(Chartist.escapingMap).reduce(function(result, key) {
      return Chartist.replaceAll(result, key, Chartist.escapingMap[key]);
    }, data);
  };

  /**
   * This function de-serializes a string previously serialized with Chartist.serialize. The string will always be unescaped using Chartist.escapingMap before it's returned. Based on the input value the return type can be Number, String or Object. JSON.parse is used with try / catch to see if the unescaped string can be parsed into an Object and this Object will be returned on success.
   *
   * @memberof Chartist.Core
   * @param {String} data
   * @return {String|Number|Object}
   */
  Chartist.deserialize = function(data) {
    if(typeof data !== 'string') {
      return data;
    }

    data = Object.keys(Chartist.escapingMap).reduce(function(result, key) {
      return Chartist.replaceAll(result, Chartist.escapingMap[key], key);
    }, data);

    try {
      data = JSON.parse(data);
      data = data.data !== undefined ? data.data : data;
    } catch(e) {}

    return data;
  };

  /**
   * Create or reinitialize the SVG element for the chart
   *
   * @memberof Chartist.Core
   * @param {Node} container The containing DOM Node object that will be used to plant the SVG element
   * @param {String} width Set the width of the SVG element. Default is 100%
   * @param {String} height Set the height of the SVG element. Default is 100%
   * @param {String} className Specify a class to be added to the SVG element
   * @return {Object} The created/reinitialized SVG element
   */
  Chartist.createSvg = function (container, width, height, className) {
    var svg;

    width = width || '100%';
    height = height || '100%';

    // Check if there is a previous SVG element in the container that contains the Chartist XML namespace and remove it
    // Since the DOM API does not support namespaces we need to manually search the returned list http://www.w3.org/TR/selectors-api/
    Array.prototype.slice.call(container.querySelectorAll('svg')).filter(function filterChartistSvgObjects(svg) {
      return svg.getAttributeNS(Chartist.namespaces.xmlns, 'ct');
    }).forEach(function removePreviousElement(svg) {
      container.removeChild(svg);
    });

    // Create svg object with width and height or use 100% as default
    svg = new Chartist.Svg('svg').attr({
      width: width,
      height: height
    }).addClass(className);

    svg._node.style.width = width;
    svg._node.style.height = height;

    // Add the DOM node to our container
    container.appendChild(svg._node);

    return svg;
  };

  /**
   * Ensures that the data object passed as second argument to the charts is present and correctly initialized.
   *
   * @param  {Object} data The data object that is passed as second argument to the charts
   * @return {Object} The normalized data object
   */
  Chartist.normalizeData = function(data, reverse, multi) {
    var labelCount;
    var output = {
      raw: data,
      normalized: {}
    };

    // Check if we should generate some labels based on existing series data
    output.normalized.series = Chartist.getDataArray({
      series: data.series || []
    }, reverse, multi);

    // If all elements of the normalized data array are arrays we're dealing with
    // multi series data and we need to find the largest series if they are un-even
    if (output.normalized.series.every(function(value) {
        return value instanceof Array;
      })) {
      // Getting the series with the the most elements
      labelCount = Math.max.apply(null, output.normalized.series.map(function(series) {
        return series.length;
      }));
    } else {
      // We're dealing with Pie data so we just take the normalized array length
      labelCount = output.normalized.series.length;
    }

    output.normalized.labels = (data.labels || []).slice();
    // Padding the labels to labelCount with empty strings
    Array.prototype.push.apply(
      output.normalized.labels,
      Chartist.times(Math.max(0, labelCount - output.normalized.labels.length)).map(function() {
        return '';
      })
    );

    if(reverse) {
      Chartist.reverseData(output.normalized);
    }

    return output;
  };

  /**
   * This function safely checks if an objects has an owned property.
   *
   * @param {Object} object The object where to check for a property
   * @param {string} property The property name
   * @returns {boolean} Returns true if the object owns the specified property
   */
  Chartist.safeHasProperty = function(object, property) {
    return object !== null &&
      typeof object === 'object' &&
      object.hasOwnProperty(property);
  };

  /**
   * Checks if a value is considered a hole in the data series.
   *
   * @param {*} value
   * @returns {boolean} True if the value is considered a data hole
   */
  Chartist.isDataHoleValue = function(value) {
    return value === null ||
      value === undefined ||
      (typeof value === 'number' && isNaN(value));
  };

  /**
   * Reverses the series, labels and series data arrays.
   *
   * @memberof Chartist.Core
   * @param data
   */
  Chartist.reverseData = function(data) {
    data.labels.reverse();
    data.series.reverse();
    for (var i = 0; i < data.series.length; i++) {
      if(typeof(data.series[i]) === 'object' && data.series[i].data !== undefined) {
        data.series[i].data.reverse();
      } else if(data.series[i] instanceof Array) {
        data.series[i].reverse();
      }
    }
  };

  /**
   * Convert data series into plain array
   *
   * @memberof Chartist.Core
   * @param {Object} data The series object that contains the data to be visualized in the chart
   * @param {Boolean} [reverse] If true the whole data is reversed by the getDataArray call. This will modify the data object passed as first parameter. The labels as well as the series order is reversed. The whole series data arrays are reversed too.
   * @param {Boolean} [multi] Create a multi dimensional array from a series data array where a value object with `x` and `y` values will be created.
   * @return {Array} A plain array that contains the data to be visualized in the chart
   */
  Chartist.getDataArray = function(data, reverse, multi) {
    // Recursively walks through nested arrays and convert string values to numbers and objects with value properties
    // to values. Check the tests in data core -> data normalization for a detailed specification of expected values
    function recursiveConvert(value) {
      if(Chartist.safeHasProperty(value, 'value')) {
        // We are dealing with value object notation so we need to recurse on value property
        return recursiveConvert(value.value);
      } else if(Chartist.safeHasProperty(value, 'data')) {
        // We are dealing with series object notation so we need to recurse on data property
        return recursiveConvert(value.data);
      } else if(value instanceof Array) {
        // Data is of type array so we need to recurse on the series
        return value.map(recursiveConvert);
      } else if(Chartist.isDataHoleValue(value)) {
        // We're dealing with a hole in the data and therefore need to return undefined
        // We're also returning undefined for multi value output
        return undefined;
      } else {
        // We need to prepare multi value output (x and y data)
        if(multi) {
          var multiValue = {};

          // Single series value arrays are assumed to specify the Y-Axis value
          // For example: [1, 2] => [{x: undefined, y: 1}, {x: undefined, y: 2}]
          // If multi is a string then it's assumed that it specified which dimension should be filled as default
          if(typeof multi === 'string') {
            multiValue[multi] = Chartist.getNumberOrUndefined(value);
          } else {
            multiValue.y = Chartist.getNumberOrUndefined(value);
          }

          multiValue.x = value.hasOwnProperty('x') ? Chartist.getNumberOrUndefined(value.x) : multiValue.x;
          multiValue.y = value.hasOwnProperty('y') ? Chartist.getNumberOrUndefined(value.y) : multiValue.y;

          return multiValue;

        } else {
          // We can return simple data
          return Chartist.getNumberOrUndefined(value);
        }
      }
    }

    return data.series.map(recursiveConvert);
  };

  /**
   * Converts a number into a padding object.
   *
   * @memberof Chartist.Core
   * @param {Object|Number} padding
   * @param {Number} [fallback] This value is used to fill missing values if a incomplete padding object was passed
   * @returns {Object} Returns a padding object containing top, right, bottom, left properties filled with the padding number passed in as argument. If the argument is something else than a number (presumably already a correct padding object) then this argument is directly returned.
   */
  Chartist.normalizePadding = function(padding, fallback) {
    fallback = fallback || 0;

    return typeof padding === 'number' ? {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    } : {
      top: typeof padding.top === 'number' ? padding.top : fallback,
      right: typeof padding.right === 'number' ? padding.right : fallback,
      bottom: typeof padding.bottom === 'number' ? padding.bottom : fallback,
      left: typeof padding.left === 'number' ? padding.left : fallback
    };
  };

  Chartist.getMetaData = function(series, index) {
    var value = series.data ? series.data[index] : series[index];
    return value ? value.meta : undefined;
  };

  /**
   * Calculate the order of magnitude for the chart scale
   *
   * @memberof Chartist.Core
   * @param {Number} value The value Range of the chart
   * @return {Number} The order of magnitude
   */
  Chartist.orderOfMagnitude = function (value) {
    return Math.floor(Math.log(Math.abs(value)) / Math.LN10);
  };

  /**
   * Project a data length into screen coordinates (pixels)
   *
   * @memberof Chartist.Core
   * @param {Object} axisLength The svg element for the chart
   * @param {Number} length Single data value from a series array
   * @param {Object} bounds All the values to set the bounds of the chart
   * @return {Number} The projected data length in pixels
   */
  Chartist.projectLength = function (axisLength, length, bounds) {
    return length / bounds.range * axisLength;
  };

  /**
   * Get the height of the area in the chart for the data series
   *
   * @memberof Chartist.Core
   * @param {Object} svg The svg element for the chart
   * @param {Object} options The Object that contains all the optional values for the chart
   * @return {Number} The height of the area in the chart for the data series
   */
  Chartist.getAvailableHeight = function (svg, options) {
    return Math.max((Chartist.quantity(options.height).value || svg.height()) - (options.chartPadding.top +  options.chartPadding.bottom) - options.axisX.offset, 0);
  };

  /**
   * Get highest and lowest value of data array. This Array contains the data that will be visualized in the chart.
   *
   * @memberof Chartist.Core
   * @param {Array} data The array that contains the data to be visualized in the chart
   * @param {Object} options The Object that contains the chart options
   * @param {String} dimension Axis dimension 'x' or 'y' used to access the correct value and high / low configuration
   * @return {Object} An object that contains the highest and lowest value that will be visualized on the chart.
   */
  Chartist.getHighLow = function (data, options, dimension) {
    // TODO: Remove workaround for deprecated global high / low config. Axis high / low configuration is preferred
    options = Chartist.extend({}, options, dimension ? options['axis' + dimension.toUpperCase()] : {});

    var highLow = {
        high: options.high === undefined ? -Number.MAX_VALUE : +options.high,
        low: options.low === undefined ? Number.MAX_VALUE : +options.low
      };
    var findHigh = options.high === undefined;
    var findLow = options.low === undefined;

    // Function to recursively walk through arrays and find highest and lowest number
    function recursiveHighLow(data) {
      if(data === undefined) {
        return undefined;
      } else if(data instanceof Array) {
        for (var i = 0; i < data.length; i++) {
          recursiveHighLow(data[i]);
        }
      } else {
        var value = dimension ? +data[dimension] : +data;

        if (findHigh && value > highLow.high) {
          highLow.high = value;
        }

        if (findLow && value < highLow.low) {
          highLow.low = value;
        }
      }
    }

    // Start to find highest and lowest number recursively
    if(findHigh || findLow) {
      recursiveHighLow(data);
    }

    // Overrides of high / low based on reference value, it will make sure that the invisible reference value is
    // used to generate the chart. This is useful when the chart always needs to contain the position of the
    // invisible reference value in the view i.e. for bipolar scales.
    if (options.referenceValue || options.referenceValue === 0) {
      highLow.high = Math.max(options.referenceValue, highLow.high);
      highLow.low = Math.min(options.referenceValue, highLow.low);
    }

    // If high and low are the same because of misconfiguration or flat data (only the same value) we need
    // to set the high or low to 0 depending on the polarity
    if (highLow.high <= highLow.low) {
      // If both values are 0 we set high to 1
      if (highLow.low === 0) {
        highLow.high = 1;
      } else if (highLow.low < 0) {
        // If we have the same negative value for the bounds we set bounds.high to 0
        highLow.high = 0;
      } else if (highLow.high > 0) {
        // If we have the same positive value for the bounds we set bounds.low to 0
        highLow.low = 0;
      } else {
        // If data array was empty, values are Number.MAX_VALUE and -Number.MAX_VALUE. Set bounds to prevent errors
        highLow.high = 1;
        highLow.low = 0;
      }
    }

    return highLow;
  };

  /**
   * Checks if a value can be safely coerced to a number. This includes all values except null which result in finite numbers when coerced. This excludes NaN, since it's not finite.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {Boolean}
   */
  Chartist.isNumeric = function(value) {
    return value === null ? false : isFinite(value);
  };

  /**
   * Returns true on all falsey values except the numeric value 0.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {boolean}
   */
  Chartist.isFalseyButZero = function(value) {
    return !value && value !== 0;
  };

  /**
   * Returns a number if the passed parameter is a valid number or the function will return undefined. On all other values than a valid number, this function will return undefined.
   *
   * @memberof Chartist.Core
   * @param value
   * @returns {*}
   */
  Chartist.getNumberOrUndefined = function(value) {
    return Chartist.isNumeric(value) ? +value : undefined;
  };

  /**
   * Checks if provided value object is multi value (contains x or y properties)
   *
   * @memberof Chartist.Core
   * @param value
   */
  Chartist.isMultiValue = function(value) {
    return typeof value === 'object' && ('x' in value || 'y' in value);
  };

  /**
   * Gets a value from a dimension `value.x` or `value.y` while returning value directly if it's a valid numeric value. If the value is not numeric and it's falsey this function will return `defaultValue`.
   *
   * @memberof Chartist.Core
   * @param value
   * @param dimension
   * @param defaultValue
   * @returns {*}
   */
  Chartist.getMultiValue = function(value, dimension) {
    if(Chartist.isMultiValue(value)) {
      return Chartist.getNumberOrUndefined(value[dimension || 'y']);
    } else {
      return Chartist.getNumberOrUndefined(value);
    }
  };

  /**
   * Pollard Rho Algorithm to find smallest factor of an integer value. There are more efficient algorithms for factorization, but this one is quite efficient and not so complex.
   *
   * @memberof Chartist.Core
   * @param {Number} num An integer number where the smallest factor should be searched for
   * @returns {Number} The smallest integer factor of the parameter num.
   */
  Chartist.rho = function(num) {
    if(num === 1) {
      return num;
    }

    function gcd(p, q) {
      if (p % q === 0) {
        return q;
      } else {
        return gcd(q, p % q);
      }
    }

    function f(x) {
      return x * x + 1;
    }

    var x1 = 2, x2 = 2, divisor;
    if (num % 2 === 0) {
      return 2;
    }

    do {
      x1 = f(x1) % num;
      x2 = f(f(x2)) % num;
      divisor = gcd(Math.abs(x1 - x2), num);
    } while (divisor === 1);

    return divisor;
  };

  /**
   * Calculate and retrieve all the bounds for the chart and return them in one array
   *
   * @memberof Chartist.Core
   * @param {Number} axisLength The length of the Axis used for
   * @param {Object} highLow An object containing a high and low property indicating the value range of the chart.
   * @param {Number} scaleMinSpace The minimum projected length a step should result in
   * @param {Boolean} onlyInteger
   * @return {Object} All the values to set the bounds of the chart
   */
  Chartist.getBounds = function (axisLength, highLow, scaleMinSpace, onlyInteger) {
    var i,
      optimizationCounter = 0,
      newMin,
      newMax,
      bounds = {
        high: highLow.high,
        low: highLow.low
      };

    bounds.valueRange = bounds.high - bounds.low;
    bounds.oom = Chartist.orderOfMagnitude(bounds.valueRange);
    bounds.step = Math.pow(10, bounds.oom);
    bounds.min = Math.floor(bounds.low / bounds.step) * bounds.step;
    bounds.max = Math.ceil(bounds.high / bounds.step) * bounds.step;
    bounds.range = bounds.max - bounds.min;
    bounds.numberOfSteps = Math.round(bounds.range / bounds.step);

    // Optimize scale step by checking if subdivision is possible based on horizontalGridMinSpace
    // If we are already below the scaleMinSpace value we will scale up
    var length = Chartist.projectLength(axisLength, bounds.step, bounds);
    var scaleUp = length < scaleMinSpace;
    var smallestFactor = onlyInteger ? Chartist.rho(bounds.range) : 0;

    // First check if we should only use integer steps and if step 1 is still larger than scaleMinSpace so we can use 1
    if(onlyInteger && Chartist.projectLength(axisLength, 1, bounds) >= scaleMinSpace) {
      bounds.step = 1;
    } else if(onlyInteger && smallestFactor < bounds.step && Chartist.projectLength(axisLength, smallestFactor, bounds) >= scaleMinSpace) {
      // If step 1 was too small, we can try the smallest factor of range
      // If the smallest factor is smaller than the current bounds.step and the projected length of smallest factor
      // is larger than the scaleMinSpace we should go for it.
      bounds.step = smallestFactor;
    } else {
      // Trying to divide or multiply by 2 and find the best step value
      while (true) {
        if (scaleUp && Chartist.projectLength(axisLength, bounds.step, bounds) <= scaleMinSpace) {
          bounds.step *= 2;
        } else if (!scaleUp && Chartist.projectLength(axisLength, bounds.step / 2, bounds) >= scaleMinSpace) {
          bounds.step /= 2;
          if(onlyInteger && bounds.step % 1 !== 0) {
            bounds.step *= 2;
            break;
          }
        } else {
          break;
        }

        if(optimizationCounter++ > 1000) {
          throw new Error('Exceeded maximum number of iterations while optimizing scale step!');
        }
      }
    }

    var EPSILON = 2.221E-16;
    bounds.step = Math.max(bounds.step, EPSILON);
    function safeIncrement(value, increment) {
      // If increment is too small use *= (1+EPSILON) as a simple nextafter
      if (value === (value += increment)) {
      	value *= (1 + (increment > 0 ? EPSILON : -EPSILON));
      }
      return value;
    }

    // Narrow min and max based on new step
    newMin = bounds.min;
    newMax = bounds.max;
    while (newMin + bounds.step <= bounds.low) {
    	newMin = safeIncrement(newMin, bounds.step);
    }
    while (newMax - bounds.step >= bounds.high) {
    	newMax = safeIncrement(newMax, -bounds.step);
    }
    bounds.min = newMin;
    bounds.max = newMax;
    bounds.range = bounds.max - bounds.min;

    var values = [];
    for (i = bounds.min; i <= bounds.max; i = safeIncrement(i, bounds.step)) {
      var value = Chartist.roundWithPrecision(i);
      if (value !== values[values.length - 1]) {
        values.push(value);
      }
    }
    bounds.values = values;
    return bounds;
  };

  /**
   * Calculate cartesian coordinates of polar coordinates
   *
   * @memberof Chartist.Core
   * @param {Number} centerX X-axis coordinates of center point of circle segment
   * @param {Number} centerY X-axis coordinates of center point of circle segment
   * @param {Number} radius Radius of circle segment
   * @param {Number} angleInDegrees Angle of circle segment in degrees
   * @return {{x:Number, y:Number}} Coordinates of point on circumference
   */
  Chartist.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  /**
   * Initialize chart drawing rectangle (area where chart is drawn) x1,y1 = bottom left / x2,y2 = top right
   *
   * @memberof Chartist.Core
   * @param {Object} svg The svg element for the chart
   * @param {Object} options The Object that contains all the optional values for the chart
   * @param {Number} [fallbackPadding] The fallback padding if partial padding objects are used
   * @return {Object} The chart rectangles coordinates inside the svg element plus the rectangles measurements
   */
  Chartist.createChartRect = function (svg, options, fallbackPadding) {
    var hasAxis = !!(options.axisX || options.axisY);
    var yAxisOffset = hasAxis ? options.axisY.offset : 0;
    var xAxisOffset = hasAxis ? options.axisX.offset : 0;
    // If width or height results in invalid value (including 0) we fallback to the unitless settings or even 0
    var width = svg.width() || Chartist.quantity(options.width).value || 0;
    var height = svg.height() || Chartist.quantity(options.height).value || 0;
    var normalizedPadding = Chartist.normalizePadding(options.chartPadding, fallbackPadding);

    // If settings were to small to cope with offset (legacy) and padding, we'll adjust
    width = Math.max(width, yAxisOffset + normalizedPadding.left + normalizedPadding.right);
    height = Math.max(height, xAxisOffset + normalizedPadding.top + normalizedPadding.bottom);

    var chartRect = {
      padding: normalizedPadding,
      width: function () {
        return this.x2 - this.x1;
      },
      height: function () {
        return this.y1 - this.y2;
      }
    };

    if(hasAxis) {
      if (options.axisX.position === 'start') {
        chartRect.y2 = normalizedPadding.top + xAxisOffset;
        chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
      } else {
        chartRect.y2 = normalizedPadding.top;
        chartRect.y1 = Math.max(height - normalizedPadding.bottom - xAxisOffset, chartRect.y2 + 1);
      }

      if (options.axisY.position === 'start') {
        chartRect.x1 = normalizedPadding.left + yAxisOffset;
        chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
      } else {
        chartRect.x1 = normalizedPadding.left;
        chartRect.x2 = Math.max(width - normalizedPadding.right - yAxisOffset, chartRect.x1 + 1);
      }
    } else {
      chartRect.x1 = normalizedPadding.left;
      chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
      chartRect.y2 = normalizedPadding.top;
      chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
    }

    return chartRect;
  };

  /**
   * Creates a grid line based on a projected value.
   *
   * @memberof Chartist.Core
   * @param position
   * @param index
   * @param axis
   * @param offset
   * @param length
   * @param group
   * @param classes
   * @param eventEmitter
   */
  Chartist.createGrid = function(position, index, axis, offset, length, group, classes, eventEmitter) {
    var positionalData = {};
    positionalData[axis.units.pos + '1'] = position;
    positionalData[axis.units.pos + '2'] = position;
    positionalData[axis.counterUnits.pos + '1'] = offset;
    positionalData[axis.counterUnits.pos + '2'] = offset + length;

    var gridElement = group.elem('line', positionalData, classes.join(' '));

    // Event for grid draw
    eventEmitter.emit('draw',
      Chartist.extend({
        type: 'grid',
        axis: axis,
        index: index,
        group: group,
        element: gridElement
      }, positionalData)
    );
  };

  /**
   * Creates a grid background rect and emits the draw event.
   *
   * @memberof Chartist.Core
   * @param gridGroup
   * @param chartRect
   * @param className
   * @param eventEmitter
   */
  Chartist.createGridBackground = function (gridGroup, chartRect, className, eventEmitter) {
    var gridBackground = gridGroup.elem('rect', {
        x: chartRect.x1,
        y: chartRect.y2,
        width: chartRect.width(),
        height: chartRect.height(),
      }, className, true);

      // Event for grid background draw
      eventEmitter.emit('draw', {
        type: 'gridBackground',
        group: gridGroup,
        element: gridBackground
      });
  };

  /**
   * Creates a label based on a projected value and an axis.
   *
   * @memberof Chartist.Core
   * @param position
   * @param length
   * @param index
   * @param labels
   * @param axis
   * @param axisOffset
   * @param labelOffset
   * @param group
   * @param classes
   * @param useForeignObject
   * @param eventEmitter
   */
  Chartist.createLabel = function(position, length, index, labels, axis, axisOffset, labelOffset, group, classes, useForeignObject, eventEmitter) {
    var labelElement;
    var positionalData = {};

    positionalData[axis.units.pos] = position + labelOffset[axis.units.pos];
    positionalData[axis.counterUnits.pos] = labelOffset[axis.counterUnits.pos];
    positionalData[axis.units.len] = length;
    positionalData[axis.counterUnits.len] = Math.max(0, axisOffset - 10);

    if(useForeignObject) {
      // We need to set width and height explicitly to px as span will not expand with width and height being
      // 100% in all browsers
      var content = document.createElement('span');
      content.className = classes.join(' ');
      content.setAttribute('xmlns', Chartist.namespaces.xhtml);
      content.innerText = labels[index];
      content.style[axis.units.len] = Math.round(positionalData[axis.units.len]) + 'px';
      content.style[axis.counterUnits.len] = Math.round(positionalData[axis.counterUnits.len]) + 'px';

      labelElement = group.foreignObject(content, Chartist.extend({
        style: 'overflow: visible;'
      }, positionalData));
    } else {
      labelElement = group.elem('text', positionalData, classes.join(' ')).text(labels[index]);
    }

    eventEmitter.emit('draw', Chartist.extend({
      type: 'label',
      axis: axis,
      index: index,
      group: group,
      element: labelElement,
      text: labels[index]
    }, positionalData));
  };

  /**
   * Helper to read series specific options from options object. It automatically falls back to the global option if
   * there is no option in the series options.
   *
   * @param {Object} series Series object
   * @param {Object} options Chartist options object
   * @param {string} key The options key that should be used to obtain the options
   * @returns {*}
   */
  Chartist.getSeriesOption = function(series, options, key) {
    if(series.name && options.series && options.series[series.name]) {
      var seriesOptions = options.series[series.name];
      return seriesOptions.hasOwnProperty(key) ? seriesOptions[key] : options[key];
    } else {
      return options[key];
    }
  };

  /**
   * Provides options handling functionality with callback for options changes triggered by responsive options and media query matches
   *
   * @memberof Chartist.Core
   * @param {Object} options Options set by user
   * @param {Array} responsiveOptions Optional functions to add responsive behavior to chart
   * @param {Object} eventEmitter The event emitter that will be used to emit the options changed events
   * @return {Object} The consolidated options object from the defaults, base and matching responsive options
   */
  Chartist.optionsProvider = function (options, responsiveOptions, eventEmitter) {
    var baseOptions = Chartist.extend({}, options),
      currentOptions,
      mediaQueryListeners = [],
      i;

    function updateCurrentOptions(mediaEvent) {
      var previousOptions = currentOptions;
      currentOptions = Chartist.extend({}, baseOptions);

      if (responsiveOptions) {
        for (i = 0; i < responsiveOptions.length; i++) {
          var mql = window.matchMedia(responsiveOptions[i][0]);
          if (mql.matches) {
            currentOptions = Chartist.extend(currentOptions, responsiveOptions[i][1]);
          }
        }
      }

      if(eventEmitter && mediaEvent) {
        eventEmitter.emit('optionsChanged', {
          previousOptions: previousOptions,
          currentOptions: currentOptions
        });
      }
    }

    function removeMediaQueryListeners() {
      mediaQueryListeners.forEach(function(mql) {
        mql.removeListener(updateCurrentOptions);
      });
    }

    if (!window.matchMedia) {
      throw 'window.matchMedia not found! Make sure you\'re using a polyfill.';
    } else if (responsiveOptions) {

      for (i = 0; i < responsiveOptions.length; i++) {
        var mql = window.matchMedia(responsiveOptions[i][0]);
        mql.addListener(updateCurrentOptions);
        mediaQueryListeners.push(mql);
      }
    }
    // Execute initially without an event argument so we get the correct options
    updateCurrentOptions();

    return {
      removeMediaQueryListeners: removeMediaQueryListeners,
      getCurrentOptions: function getCurrentOptions() {
        return Chartist.extend({}, currentOptions);
      }
    };
  };


  /**
   * Splits a list of coordinates and associated values into segments. Each returned segment contains a pathCoordinates
   * valueData property describing the segment.
   *
   * With the default options, segments consist of contiguous sets of points that do not have an undefined value. Any
   * points with undefined values are discarded.
   *
   * **Options**
   * The following options are used to determine how segments are formed
   * ```javascript
   * var options = {
   *   // If fillHoles is true, undefined values are simply discarded without creating a new segment. Assuming other options are default, this returns single segment.
   *   fillHoles: false,
   *   // If increasingX is true, the coordinates in all segments have strictly increasing x-values.
   *   increasingX: false
   * };
   * ```
   *
   * @memberof Chartist.Core
   * @param {Array} pathCoordinates List of point coordinates to be split in the form [x1, y1, x2, y2 ... xn, yn]
   * @param {Array} values List of associated point values in the form [v1, v2 .. vn]
   * @param {Object} options Options set by user
   * @return {Array} List of segments, each containing a pathCoordinates and valueData property.
   */
  Chartist.splitIntoSegments = function(pathCoordinates, valueData, options) {
    var defaultOptions = {
      increasingX: false,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    var segments = [];
    var hole = true;

    for(var i = 0; i < pathCoordinates.length; i += 2) {
      // If this value is a "hole" we set the hole flag
      if(Chartist.getMultiValue(valueData[i / 2].value) === undefined) {
      // if(valueData[i / 2].value === undefined) {
        if(!options.fillHoles) {
          hole = true;
        }
      } else {
        if(options.increasingX && i >= 2 && pathCoordinates[i] <= pathCoordinates[i-2]) {
          // X is not increasing, so we need to make sure we start a new segment
          hole = true;
        }


        // If it's a valid value we need to check if we're coming out of a hole and create a new empty segment
        if(hole) {
          segments.push({
            pathCoordinates: [],
            valueData: []
          });
          // As we have a valid value now, we are not in a "hole" anymore
          hole = false;
        }

        // Add to the segment pathCoordinates and valueData
        segments[segments.length - 1].pathCoordinates.push(pathCoordinates[i], pathCoordinates[i + 1]);
        segments[segments.length - 1].valueData.push(valueData[i / 2]);
      }
    }

    return segments;
  };
}(window, document, Chartist));
;/**
 * Chartist path interpolation functions.
 *
 * @module Chartist.Interpolation
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  Chartist.Interpolation = {};

  /**
   * This interpolation function does not smooth the path and the result is only containing lines and no curves.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.none({
   *     fillHoles: false
   *   })
   * });
   *
   *
   * @memberof Chartist.Interpolation
   * @return {Function}
   */
  Chartist.Interpolation.none = function(options) {
    var defaultOptions = {
      fillHoles: false
    };
    options = Chartist.extend({}, defaultOptions, options);
    return function none(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();
      var hole = true;

      for(var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var currData = valueData[i / 2];

        if(Chartist.getMultiValue(currData.value) !== undefined) {

          if(hole) {
            path.move(currX, currY, false, currData);
          } else {
            path.line(currX, currY, false, currData);
          }

          hole = false;
        } else if(!options.fillHoles) {
          hole = true;
        }
      }

      return path;
    };
  };

  /**
   * Simple smoothing creates horizontal handles that are positioned with a fraction of the length between two data points. You can use the divisor option to specify the amount of smoothing.
   *
   * Simple smoothing can be used instead of `Chartist.Smoothing.cardinal` if you'd like to get rid of the artifacts it produces sometimes. Simple smoothing produces less flowing lines but is accurate by hitting the points and it also doesn't swing below or above the given data point.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The simple interpolation function accepts one configuration parameter `divisor`, between 1 and ∞, which controls the smoothing characteristics.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.simple({
   *     divisor: 2,
   *     fillHoles: false
   *   })
   * });
   *
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the simple interpolation factory function.
   * @return {Function}
   */
  Chartist.Interpolation.simple = function(options) {
    var defaultOptions = {
      divisor: 2,
      fillHoles: false
    };
    options = Chartist.extend({}, defaultOptions, options);

    var d = 1 / Math.max(1, options.divisor);

    return function simple(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();
      var prevX, prevY, prevData;

      for(var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var length = (currX - prevX) * d;
        var currData = valueData[i / 2];

        if(currData.value !== undefined) {

          if(prevData === undefined) {
            path.move(currX, currY, false, currData);
          } else {
            path.curve(
              prevX + length,
              prevY,
              currX - length,
              currY,
              currX,
              currY,
              false,
              currData
            );
          }

          prevX = currX;
          prevY = currY;
          prevData = currData;
        } else if(!options.fillHoles) {
          prevX = currX = prevData = undefined;
        }
      }

      return path;
    };
  };

  /**
   * Cardinal / Catmull-Rome spline interpolation is the default smoothing function in Chartist. It produces nice results where the splines will always meet the points. It produces some artifacts though when data values are increased or decreased rapidly. The line may not follow a very accurate path and if the line should be accurate this smoothing function does not produce the best results.
   *
   * Cardinal splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The cardinal interpolation function accepts one configuration parameter `tension`, between 0 and 1, which controls the smoothing intensity.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.cardinal({
   *     tension: 1,
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the cardinal factory function.
   * @return {Function}
   */
  Chartist.Interpolation.cardinal = function(options) {
    var defaultOptions = {
      tension: 1,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    var t = Math.min(1, Math.max(0, options.tension)),
      c = 1 - t;

    return function cardinal(pathCoordinates, valueData) {
      // First we try to split the coordinates into segments
      // This is necessary to treat "holes" in line charts
      var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
        fillHoles: options.fillHoles
      });

      if(!segments.length) {
        // If there were no segments return 'Chartist.Interpolation.none'
        return Chartist.Interpolation.none()([]);
      } else if(segments.length > 1) {
        // If the split resulted in more that one segment we need to interpolate each segment individually and join them
        // afterwards together into a single path.
          var paths = [];
        // For each segment we will recurse the cardinal function
        segments.forEach(function(segment) {
          paths.push(cardinal(segment.pathCoordinates, segment.valueData));
        });
        // Join the segment path data into a single path and return
        return Chartist.Svg.Path.join(paths);
      } else {
        // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
        // segment
        pathCoordinates = segments[0].pathCoordinates;
        valueData = segments[0].valueData;

        // If less than two points we need to fallback to no smoothing
        if(pathCoordinates.length <= 4) {
          return Chartist.Interpolation.none()(pathCoordinates, valueData);
        }

        var path = new Chartist.Svg.Path().move(pathCoordinates[0], pathCoordinates[1], false, valueData[0]),
          z;

        for (var i = 0, iLen = pathCoordinates.length; iLen - 2 * !z > i; i += 2) {
          var p = [
            {x: +pathCoordinates[i - 2], y: +pathCoordinates[i - 1]},
            {x: +pathCoordinates[i], y: +pathCoordinates[i + 1]},
            {x: +pathCoordinates[i + 2], y: +pathCoordinates[i + 3]},
            {x: +pathCoordinates[i + 4], y: +pathCoordinates[i + 5]}
          ];
          if (z) {
            if (!i) {
              p[0] = {x: +pathCoordinates[iLen - 2], y: +pathCoordinates[iLen - 1]};
            } else if (iLen - 4 === i) {
              p[3] = {x: +pathCoordinates[0], y: +pathCoordinates[1]};
            } else if (iLen - 2 === i) {
              p[2] = {x: +pathCoordinates[0], y: +pathCoordinates[1]};
              p[3] = {x: +pathCoordinates[2], y: +pathCoordinates[3]};
            }
          } else {
            if (iLen - 4 === i) {
              p[3] = p[2];
            } else if (!i) {
              p[0] = {x: +pathCoordinates[i], y: +pathCoordinates[i + 1]};
            }
          }

          path.curve(
            (t * (-p[0].x + 6 * p[1].x + p[2].x) / 6) + (c * p[2].x),
            (t * (-p[0].y + 6 * p[1].y + p[2].y) / 6) + (c * p[2].y),
            (t * (p[1].x + 6 * p[2].x - p[3].x) / 6) + (c * p[2].x),
            (t * (p[1].y + 6 * p[2].y - p[3].y) / 6) + (c * p[2].y),
            p[2].x,
            p[2].y,
            false,
            valueData[(i + 2) / 2]
          );
        }

        return path;
      }
    };
  };

  /**
   * Monotone Cubic spline interpolation produces a smooth curve which preserves monotonicity. Unlike cardinal splines, the curve will not extend beyond the range of y-values of the original data points.
   *
   * Monotone Cubic splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
   *
   * The x-values of subsequent points must be increasing to fit a Monotone Cubic spline. If this condition is not met for a pair of adjacent points, then there will be a break in the curve between those data points.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.monotoneCubic({
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param {Object} options The options of the monotoneCubic factory function.
   * @return {Function}
   */
  Chartist.Interpolation.monotoneCubic = function(options) {
    var defaultOptions = {
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    return function monotoneCubic(pathCoordinates, valueData) {
      // First we try to split the coordinates into segments
      // This is necessary to treat "holes" in line charts
      var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
        fillHoles: options.fillHoles,
        increasingX: true
      });

      if(!segments.length) {
        // If there were no segments return 'Chartist.Interpolation.none'
        return Chartist.Interpolation.none()([]);
      } else if(segments.length > 1) {
        // If the split resulted in more that one segment we need to interpolate each segment individually and join them
        // afterwards together into a single path.
          var paths = [];
        // For each segment we will recurse the monotoneCubic fn function
        segments.forEach(function(segment) {
          paths.push(monotoneCubic(segment.pathCoordinates, segment.valueData));
        });
        // Join the segment path data into a single path and return
        return Chartist.Svg.Path.join(paths);
      } else {
        // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
        // segment
        pathCoordinates = segments[0].pathCoordinates;
        valueData = segments[0].valueData;

        // If less than three points we need to fallback to no smoothing
        if(pathCoordinates.length <= 4) {
          return Chartist.Interpolation.none()(pathCoordinates, valueData);
        }

        var xs = [],
          ys = [],
          i,
          n = pathCoordinates.length / 2,
          ms = [],
          ds = [], dys = [], dxs = [],
          path;

        // Populate x and y coordinates into separate arrays, for readability

        for(i = 0; i < n; i++) {
          xs[i] = pathCoordinates[i * 2];
          ys[i] = pathCoordinates[i * 2 + 1];
        }

        // Calculate deltas and derivative

        for(i = 0; i < n - 1; i++) {
          dys[i] = ys[i + 1] - ys[i];
          dxs[i] = xs[i + 1] - xs[i];
          ds[i] = dys[i] / dxs[i];
        }

        // Determine desired slope (m) at each point using Fritsch-Carlson method
        // See: http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation

        ms[0] = ds[0];
        ms[n - 1] = ds[n - 2];

        for(i = 1; i < n - 1; i++) {
          if(ds[i] === 0 || ds[i - 1] === 0 || (ds[i - 1] > 0) !== (ds[i] > 0)) {
            ms[i] = 0;
          } else {
            ms[i] = 3 * (dxs[i - 1] + dxs[i]) / (
              (2 * dxs[i] + dxs[i - 1]) / ds[i - 1] +
              (dxs[i] + 2 * dxs[i - 1]) / ds[i]);

            if(!isFinite(ms[i])) {
              ms[i] = 0;
            }
          }
        }

        // Now build a path from the slopes

        path = new Chartist.Svg.Path().move(xs[0], ys[0], false, valueData[0]);

        for(i = 0; i < n - 1; i++) {
          path.curve(
            // First control point
            xs[i] + dxs[i] / 3,
            ys[i] + ms[i] * dxs[i] / 3,
            // Second control point
            xs[i + 1] - dxs[i] / 3,
            ys[i + 1] - ms[i + 1] * dxs[i] / 3,
            // End point
            xs[i + 1],
            ys[i + 1],

            false,
            valueData[i + 1]
          );
        }

        return path;
      }
    };
  };

  /**
   * Step interpolation will cause the line chart to move in steps rather than diagonal or smoothed lines. This interpolation will create additional points that will also be drawn when the `showPoint` option is enabled.
   *
   * All smoothing functions within Chartist are factory functions that accept an options parameter. The step interpolation function accepts one configuration parameter `postpone`, that can be `true` or `false`. The default value is `true` and will cause the step to occur where the value actually changes. If a different behaviour is needed where the step is shifted to the left and happens before the actual value, this option can be set to `false`.
   *
   * @example
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [[1, 2, 8, 1, 7]]
   * }, {
   *   lineSmooth: Chartist.Interpolation.step({
   *     postpone: true,
   *     fillHoles: false
   *   })
   * });
   *
   * @memberof Chartist.Interpolation
   * @param options
   * @returns {Function}
   */
  Chartist.Interpolation.step = function(options) {
    var defaultOptions = {
      postpone: true,
      fillHoles: false
    };

    options = Chartist.extend({}, defaultOptions, options);

    return function step(pathCoordinates, valueData) {
      var path = new Chartist.Svg.Path();

      var prevX, prevY, prevData;

      for (var i = 0; i < pathCoordinates.length; i += 2) {
        var currX = pathCoordinates[i];
        var currY = pathCoordinates[i + 1];
        var currData = valueData[i / 2];

        // If the current point is also not a hole we can draw the step lines
        if(currData.value !== undefined) {
          if(prevData === undefined) {
            path.move(currX, currY, false, currData);
          } else {
            if(options.postpone) {
              // If postponed we should draw the step line with the value of the previous value
              path.line(currX, prevY, false, prevData);
            } else {
              // If not postponed we should draw the step line with the value of the current value
              path.line(prevX, currY, false, currData);
            }
            // Line to the actual point (this should only be a Y-Axis movement
            path.line(currX, currY, false, currData);
          }

          prevX = currX;
          prevY = currY;
          prevData = currData;
        } else if(!options.fillHoles) {
          prevX = prevY = prevData = undefined;
        }
      }

      return path;
    };
  };

}(window, document, Chartist));
;/**
 * A very basic event module that helps to generate and catch events.
 *
 * @module Chartist.Event
 */
/* global Chartist */
(function (window, document, Chartist) {
  'use strict';

  Chartist.EventEmitter = function () {
    var handlers = [];

    /**
     * Add an event handler for a specific event
     *
     * @memberof Chartist.Event
     * @param {String} event The event name
     * @param {Function} handler A event handler function
     */
    function addEventHandler(event, handler) {
      handlers[event] = handlers[event] || [];
      handlers[event].push(handler);
    }

    /**
     * Remove an event handler of a specific event name or remove all event handlers for a specific event.
     *
     * @memberof Chartist.Event
     * @param {String} event The event name where a specific or all handlers should be removed
     * @param {Function} [handler] An optional event handler function. If specified only this specific handler will be removed and otherwise all handlers are removed.
     */
    function removeEventHandler(event, handler) {
      // Only do something if there are event handlers with this name existing
      if(handlers[event]) {
        // If handler is set we will look for a specific handler and only remove this
        if(handler) {
          handlers[event].splice(handlers[event].indexOf(handler), 1);
          if(handlers[event].length === 0) {
            delete handlers[event];
          }
        } else {
          // If no handler is specified we remove all handlers for this event
          delete handlers[event];
        }
      }
    }

    /**
     * Use this function to emit an event. All handlers that are listening for this event will be triggered with the data parameter.
     *
     * @memberof Chartist.Event
     * @param {String} event The event name that should be triggered
     * @param {*} data Arbitrary data that will be passed to the event handler callback functions
     */
    function emit(event, data) {
      // Only do something if there are event handlers with this name existing
      if(handlers[event]) {
        handlers[event].forEach(function(handler) {
          handler(data);
        });
      }

      // Emit event to star event handlers
      if(handlers['*']) {
        handlers['*'].forEach(function(starHandler) {
          starHandler(event, data);
        });
      }
    }

    return {
      addEventHandler: addEventHandler,
      removeEventHandler: removeEventHandler,
      emit: emit
    };
  };

}(window, document, Chartist));
;/**
 * This module provides some basic prototype inheritance utilities.
 *
 * @module Chartist.Class
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  function listToArray(list) {
    var arr = [];
    if (list.length) {
      for (var i = 0; i < list.length; i++) {
        arr.push(list[i]);
      }
    }
    return arr;
  }

  /**
   * Method to extend from current prototype.
   *
   * @memberof Chartist.Class
   * @param {Object} properties The object that serves as definition for the prototype that gets created for the new class. This object should always contain a constructor property that is the desired constructor for the newly created class.
   * @param {Object} [superProtoOverride] By default extens will use the current class prototype or Chartist.class. With this parameter you can specify any super prototype that will be used.
   * @return {Function} Constructor function of the new class
   *
   * @example
   * var Fruit = Class.extend({
     * color: undefined,
     *   sugar: undefined,
     *
     *   constructor: function(color, sugar) {
     *     this.color = color;
     *     this.sugar = sugar;
     *   },
     *
     *   eat: function() {
     *     this.sugar = 0;
     *     return this;
     *   }
     * });
   *
   * var Banana = Fruit.extend({
     *   length: undefined,
     *
     *   constructor: function(length, sugar) {
     *     Banana.super.constructor.call(this, 'Yellow', sugar);
     *     this.length = length;
     *   }
     * });
   *
   * var banana = new Banana(20, 40);
   * console.log('banana instanceof Fruit', banana instanceof Fruit);
   * console.log('Fruit is prototype of banana', Fruit.prototype.isPrototypeOf(banana));
   * console.log('bananas prototype is Fruit', Object.getPrototypeOf(banana) === Fruit.prototype);
   * console.log(banana.sugar);
   * console.log(banana.eat().sugar);
   * console.log(banana.color);
   */
  function extend(properties, superProtoOverride) {
    var superProto = superProtoOverride || this.prototype || Chartist.Class;
    var proto = Object.create(superProto);

    Chartist.Class.cloneDefinitions(proto, properties);

    var constr = function() {
      var fn = proto.constructor || function () {},
        instance;

      // If this is linked to the Chartist namespace the constructor was not called with new
      // To provide a fallback we will instantiate here and return the instance
      instance = this === Chartist ? Object.create(proto) : this;
      fn.apply(instance, Array.prototype.slice.call(arguments, 0));

      // If this constructor was not called with new we need to return the instance
      // This will not harm when the constructor has been called with new as the returned value is ignored
      return instance;
    };

    constr.prototype = proto;
    constr.super = superProto;
    constr.extend = this.extend;

    return constr;
  }

  // Variable argument list clones args > 0 into args[0] and retruns modified args[0]
  function cloneDefinitions() {
    var args = listToArray(arguments);
    var target = args[0];

    args.splice(1, args.length - 1).forEach(function (source) {
      Object.getOwnPropertyNames(source).forEach(function (propName) {
        // If this property already exist in target we delete it first
        delete target[propName];
        // Define the property with the descriptor from source
        Object.defineProperty(target, propName,
          Object.getOwnPropertyDescriptor(source, propName));
      });
    });

    return target;
  }

  Chartist.Class = {
    extend: extend,
    cloneDefinitions: cloneDefinitions
  };

}(window, document, Chartist));
;/**
 * Base for all chart types. The methods in Chartist.Base are inherited to all chart types.
 *
 * @module Chartist.Base
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  // TODO: Currently we need to re-draw the chart on window resize. This is usually very bad and will affect performance.
  // This is done because we can't work with relative coordinates when drawing the chart because SVG Path does not
  // work with relative positions yet. We need to check if we can do a viewBox hack to switch to percentage.
  // See http://mozilla.6506.n7.nabble.com/Specyfing-paths-with-percentages-unit-td247474.html
  // Update: can be done using the above method tested here: http://codepen.io/gionkunz/pen/KDvLj
  // The problem is with the label offsets that can't be converted into percentage and affecting the chart container
  /**
   * Updates the chart which currently does a full reconstruction of the SVG DOM
   *
   * @param {Object} [data] Optional data you'd like to set for the chart before it will update. If not specified the update method will use the data that is already configured with the chart.
   * @param {Object} [options] Optional options you'd like to add to the previous options for the chart before it will update. If not specified the update method will use the options that have been already configured with the chart.
   * @param {Boolean} [override] If set to true, the passed options will be used to extend the options that have been configured already. Otherwise the chart default options will be used as the base
   * @memberof Chartist.Base
   */
  function update(data, options, override) {
    if(data) {
      this.data = data || {};
      this.data.labels = this.data.labels || [];
      this.data.series = this.data.series || [];
      // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
      this.eventEmitter.emit('data', {
        type: 'update',
        data: this.data
      });
    }

    if(options) {
      this.options = Chartist.extend({}, override ? this.options : this.defaultOptions, options);

      // If chartist was not initialized yet, we just set the options and leave the rest to the initialization
      // Otherwise we re-create the optionsProvider at this point
      if(!this.initializeTimeoutId) {
        this.optionsProvider.removeMediaQueryListeners();
        this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
      }
    }

    // Only re-created the chart if it has been initialized yet
    if(!this.initializeTimeoutId) {
      this.createChart(this.optionsProvider.getCurrentOptions());
    }

    // Return a reference to the chart object to chain up calls
    return this;
  }

  /**
   * This method can be called on the API object of each chart and will un-register all event listeners that were added to other components. This currently includes a window.resize listener as well as media query listeners if any responsive options have been provided. Use this function if you need to destroy and recreate Chartist charts dynamically.
   *
   * @memberof Chartist.Base
   */
  function detach() {
    // Only detach if initialization already occurred on this chart. If this chart still hasn't initialized (therefore
    // the initializationTimeoutId is still a valid timeout reference, we will clear the timeout
    if(!this.initializeTimeoutId) {
      window.removeEventListener('resize', this.resizeListener);
      this.optionsProvider.removeMediaQueryListeners();
    } else {
      window.clearTimeout(this.initializeTimeoutId);
    }

    return this;
  }

  /**
   * Use this function to register event handlers. The handler callbacks are synchronous and will run in the main thread rather than the event loop.
   *
   * @memberof Chartist.Base
   * @param {String} event Name of the event. Check the examples for supported events.
   * @param {Function} handler The handler function that will be called when an event with the given name was emitted. This function will receive a data argument which contains event data. See the example for more details.
   */
  function on(event, handler) {
    this.eventEmitter.addEventHandler(event, handler);
    return this;
  }

  /**
   * Use this function to un-register event handlers. If the handler function parameter is omitted all handlers for the given event will be un-registered.
   *
   * @memberof Chartist.Base
   * @param {String} event Name of the event for which a handler should be removed
   * @param {Function} [handler] The handler function that that was previously used to register a new event handler. This handler will be removed from the event handler list. If this parameter is omitted then all event handlers for the given event are removed from the list.
   */
  function off(event, handler) {
    this.eventEmitter.removeEventHandler(event, handler);
    return this;
  }

  function initialize() {
    // Add window resize listener that re-creates the chart
    window.addEventListener('resize', this.resizeListener);

    // Obtain current options based on matching media queries (if responsive options are given)
    // This will also register a listener that is re-creating the chart based on media changes
    this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
    // Register options change listener that will trigger a chart update
    this.eventEmitter.addEventHandler('optionsChanged', function() {
      this.update();
    }.bind(this));

    // Before the first chart creation we need to register us with all plugins that are configured
    // Initialize all relevant plugins with our chart object and the plugin options specified in the config
    if(this.options.plugins) {
      this.options.plugins.forEach(function(plugin) {
        if(plugin instanceof Array) {
          plugin[0](this, plugin[1]);
        } else {
          plugin(this);
        }
      }.bind(this));
    }

    // Event for data transformation that allows to manipulate the data before it gets rendered in the charts
    this.eventEmitter.emit('data', {
      type: 'initial',
      data: this.data
    });

    // Create the first chart
    this.createChart(this.optionsProvider.getCurrentOptions());

    // As chart is initialized from the event loop now we can reset our timeout reference
    // This is important if the chart gets initialized on the same element twice
    this.initializeTimeoutId = undefined;
  }

  /**
   * Constructor of chart base class.
   *
   * @param query
   * @param data
   * @param defaultOptions
   * @param options
   * @param responsiveOptions
   * @constructor
   */
  function Base(query, data, defaultOptions, options, responsiveOptions) {
    this.container = Chartist.querySelector(query);
    this.data = data || {};
    this.data.labels = this.data.labels || [];
    this.data.series = this.data.series || [];
    this.defaultOptions = defaultOptions;
    this.options = options;
    this.responsiveOptions = responsiveOptions;
    this.eventEmitter = Chartist.EventEmitter();
    this.supportsForeignObject = Chartist.Svg.isSupported('Extensibility');
    this.supportsAnimations = Chartist.Svg.isSupported('AnimationEventsAttribute');
    this.resizeListener = function resizeListener(){
      this.update();
    }.bind(this);

    if(this.container) {
      // If chartist was already initialized in this container we are detaching all event listeners first
      if(this.container.__chartist__) {
        this.container.__chartist__.detach();
      }

      this.container.__chartist__ = this;
    }

    // Using event loop for first draw to make it possible to register event listeners in the same call stack where
    // the chart was created.
    this.initializeTimeoutId = setTimeout(initialize.bind(this), 0);
  }

  // Creating the chart base class
  Chartist.Base = Chartist.Class.extend({
    constructor: Base,
    optionsProvider: undefined,
    container: undefined,
    svg: undefined,
    eventEmitter: undefined,
    createChart: function() {
      throw new Error('Base chart type can\'t be instantiated!');
    },
    update: update,
    detach: detach,
    on: on,
    off: off,
    version: Chartist.version,
    supportsForeignObject: false
  });

}(window, document, Chartist));
;/**
 * Chartist SVG module for simple SVG DOM abstraction
 *
 * @module Chartist.Svg
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  /**
   * Chartist.Svg creates a new SVG object wrapper with a starting element. You can use the wrapper to fluently create sub-elements and modify them.
   *
   * @memberof Chartist.Svg
   * @constructor
   * @param {String|Element} name The name of the SVG element to create or an SVG dom element which should be wrapped into Chartist.Svg
   * @param {Object} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param {String} className This class or class list will be added to the SVG element
   * @param {Object} parent The parent SVG wrapper object where this newly created wrapper and it's element will be attached to as child
   * @param {Boolean} insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   */
  function Svg(name, attributes, className, parent, insertFirst) {
    // If Svg is getting called with an SVG element we just return the wrapper
    if(name instanceof Element) {
      this._node = name;
    } else {
      this._node = document.createElementNS(Chartist.namespaces.svg, name);

      // If this is an SVG element created then custom namespace
      if(name === 'svg') {
        this.attr({
          'xmlns:ct': Chartist.namespaces.ct
        });
      }
    }

    if(attributes) {
      this.attr(attributes);
    }

    if(className) {
      this.addClass(className);
    }

    if(parent) {
      if (insertFirst && parent._node.firstChild) {
        parent._node.insertBefore(this._node, parent._node.firstChild);
      } else {
        parent._node.appendChild(this._node);
      }
    }
  }

  /**
   * Set attributes on the current SVG element of the wrapper you're currently working on.
   *
   * @memberof Chartist.Svg
   * @param {Object|String} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added. If this parameter is a String then the function is used as a getter and will return the attribute value.
   * @param {String} [ns] If specified, the attribute will be obtained using getAttributeNs. In order to write namepsaced attributes you can use the namespace:attribute notation within the attributes object.
   * @return {Object|String} The current wrapper object will be returned so it can be used for chaining or the attribute value if used as getter function.
   */
  function attr(attributes, ns) {
    if(typeof attributes === 'string') {
      if(ns) {
        return this._node.getAttributeNS(ns, attributes);
      } else {
        return this._node.getAttribute(attributes);
      }
    }

    Object.keys(attributes).forEach(function(key) {
      // If the attribute value is undefined we can skip this one
      if(attributes[key] === undefined) {
        return;
      }

      if (key.indexOf(':') !== -1) {
        var namespacedAttribute = key.split(':');
        this._node.setAttributeNS(Chartist.namespaces[namespacedAttribute[0]], key, attributes[key]);
      } else {
        this._node.setAttribute(key, attributes[key]);
      }
    }.bind(this));

    return this;
  }

  /**
   * Create a new SVG element whose wrapper object will be selected for further operations. This way you can also create nested groups easily.
   *
   * @memberof Chartist.Svg
   * @param {String} name The name of the SVG element that should be created as child element of the currently selected element wrapper
   * @param {Object} [attributes] An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
   * @param {String} [className] This class or class list will be added to the SVG element
   * @param {Boolean} [insertFirst] If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
   * @return {Chartist.Svg} Returns a Chartist.Svg wrapper object that can be used to modify the containing SVG data
   */
  function elem(name, attributes, className, insertFirst) {
    return new Chartist.Svg(name, attributes, className, this, insertFirst);
  }

  /**
   * Returns the parent Chartist.SVG wrapper object
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} Returns a Chartist.Svg wrapper around the parent node of the current node. If the parent node is not existing or it's not an SVG node then this function will return null.
   */
  function parent() {
    return this._node.parentNode instanceof SVGElement ? new Chartist.Svg(this._node.parentNode) : null;
  }

  /**
   * This method returns a Chartist.Svg wrapper around the root SVG element of the current tree.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The root SVG element wrapped in a Chartist.Svg element
   */
  function root() {
    var node = this._node;
    while(node.nodeName !== 'svg') {
      node = node.parentNode;
    }
    return new Chartist.Svg(node);
  }

  /**
   * Find the first child SVG element of the current element that matches a CSS selector. The returned object is a Chartist.Svg wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} selector A CSS selector that is used to query for child SVG elements
   * @return {Chartist.Svg} The SVG wrapper for the element found or null if no element was found
   */
  function querySelector(selector) {
    var foundNode = this._node.querySelector(selector);
    return foundNode ? new Chartist.Svg(foundNode) : null;
  }

  /**
   * Find the all child SVG elements of the current element that match a CSS selector. The returned object is a Chartist.Svg.List wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} selector A CSS selector that is used to query for child SVG elements
   * @return {Chartist.Svg.List} The SVG wrapper list for the element found or null if no element was found
   */
  function querySelectorAll(selector) {
    var foundNodes = this._node.querySelectorAll(selector);
    return foundNodes.length ? new Chartist.Svg.List(foundNodes) : null;
  }

  /**
   * Returns the underlying SVG node for the current element.
   *
   * @memberof Chartist.Svg
   * @returns {Node}
   */
  function getNode() {
    return this._node;
  }

  /**
   * This method creates a foreignObject (see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) that allows to embed HTML content into a SVG graphic. With the help of foreignObjects you can enable the usage of regular HTML elements inside of SVG where they are subject for SVG positioning and transformation but the Browser will use the HTML rendering capabilities for the containing DOM.
   *
   * @memberof Chartist.Svg
   * @param {Node|String} content The DOM Node, or HTML string that will be converted to a DOM Node, that is then placed into and wrapped by the foreignObject
   * @param {String} [attributes] An object with properties that will be added as attributes to the foreignObject element that is created. Attributes with undefined values will not be added.
   * @param {String} [className] This class or class list will be added to the SVG element
   * @param {Boolean} [insertFirst] Specifies if the foreignObject should be inserted as first child
   * @return {Chartist.Svg} New wrapper object that wraps the foreignObject element
   */
  function foreignObject(content, attributes, className, insertFirst) {
    // If content is string then we convert it to DOM
    // TODO: Handle case where content is not a string nor a DOM Node
    if(typeof content === 'string') {
      var container = document.createElement('div');
      container.innerHTML = content;
      content = container.firstChild;
    }

    // Adding namespace to content element
    content.setAttribute('xmlns', Chartist.namespaces.xmlns);

    // Creating the foreignObject without required extension attribute (as described here
    // http://www.w3.org/TR/SVG/extend.html#ForeignObjectElement)
    var fnObj = this.elem('foreignObject', attributes, className, insertFirst);

    // Add content to foreignObjectElement
    fnObj._node.appendChild(content);

    return fnObj;
  }

  /**
   * This method adds a new text element to the current Chartist.Svg wrapper.
   *
   * @memberof Chartist.Svg
   * @param {String} t The text that should be added to the text element that is created
   * @return {Chartist.Svg} The same wrapper object that was used to add the newly created element
   */
  function text(t) {
    this._node.appendChild(document.createTextNode(t));
    return this;
  }

  /**
   * This method will clear all child nodes of the current wrapper object.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The same wrapper object that got emptied
   */
  function empty() {
    while (this._node.firstChild) {
      this._node.removeChild(this._node.firstChild);
    }

    return this;
  }

  /**
   * This method will cause the current wrapper to remove itself from its parent wrapper. Use this method if you'd like to get rid of an element in a given DOM structure.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The parent wrapper object of the element that got removed
   */
  function remove() {
    this._node.parentNode.removeChild(this._node);
    return this.parent();
  }

  /**
   * This method will replace the element with a new element that can be created outside of the current DOM.
   *
   * @memberof Chartist.Svg
   * @param {Chartist.Svg} newElement The new Chartist.Svg object that will be used to replace the current wrapper object
   * @return {Chartist.Svg} The wrapper of the new element
   */
  function replace(newElement) {
    this._node.parentNode.replaceChild(newElement._node, this._node);
    return newElement;
  }

  /**
   * This method will append an element to the current element as a child.
   *
   * @memberof Chartist.Svg
   * @param {Chartist.Svg} element The Chartist.Svg element that should be added as a child
   * @param {Boolean} [insertFirst] Specifies if the element should be inserted as first child
   * @return {Chartist.Svg} The wrapper of the appended object
   */
  function append(element, insertFirst) {
    if(insertFirst && this._node.firstChild) {
      this._node.insertBefore(element._node, this._node.firstChild);
    } else {
      this._node.appendChild(element._node);
    }

    return this;
  }

  /**
   * Returns an array of class names that are attached to the current wrapper element. This method can not be chained further.
   *
   * @memberof Chartist.Svg
   * @return {Array} A list of classes or an empty array if there are no classes on the current element
   */
  function classes() {
    return this._node.getAttribute('class') ? this._node.getAttribute('class').trim().split(/\s+/) : [];
  }

  /**
   * Adds one or a space separated list of classes to the current element and ensures the classes are only existing once.
   *
   * @memberof Chartist.Svg
   * @param {String} names A white space separated list of class names
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function addClass(names) {
    this._node.setAttribute('class',
      this.classes(this._node)
        .concat(names.trim().split(/\s+/))
        .filter(function(elem, pos, self) {
          return self.indexOf(elem) === pos;
        }).join(' ')
    );

    return this;
  }

  /**
   * Removes one or a space separated list of classes from the current element.
   *
   * @memberof Chartist.Svg
   * @param {String} names A white space separated list of class names
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function removeClass(names) {
    var removedClasses = names.trim().split(/\s+/);

    this._node.setAttribute('class', this.classes(this._node).filter(function(name) {
      return removedClasses.indexOf(name) === -1;
    }).join(' '));

    return this;
  }

  /**
   * Removes all classes from the current element.
   *
   * @memberof Chartist.Svg
   * @return {Chartist.Svg} The wrapper of the current element
   */
  function removeAllClasses() {
    this._node.setAttribute('class', '');

    return this;
  }

  /**
   * Get element height using `getBoundingClientRect`
   *
   * @memberof Chartist.Svg
   * @return {Number} The elements height in pixels
   */
  function height() {
    return this._node.getBoundingClientRect().height;
  }

  /**
   * Get element width using `getBoundingClientRect`
   *
   * @memberof Chartist.Core
   * @return {Number} The elements width in pixels
   */
  function width() {
    return this._node.getBoundingClientRect().width;
  }

  /**
   * The animate function lets you animate the current element with SMIL animations. You can add animations for multiple attributes at the same time by using an animation definition object. This object should contain SMIL animation attributes. Please refer to http://www.w3.org/TR/SVG/animate.html for a detailed specification about the available animation attributes. Additionally an easing property can be passed in the animation definition object. This can be a string with a name of an easing function in `Chartist.Svg.Easing` or an array with four numbers specifying a cubic Bézier curve.
   * **An animations object could look like this:**
   * ```javascript
   * element.animate({
   *   opacity: {
   *     dur: 1000,
   *     from: 0,
   *     to: 1
   *   },
   *   x1: {
   *     dur: '1000ms',
   *     from: 100,
   *     to: 200,
   *     easing: 'easeOutQuart'
   *   },
   *   y1: {
   *     dur: '2s',
   *     from: 0,
   *     to: 100
   *   }
   * });
   * ```
   * **Automatic unit conversion**
   * For the `dur` and the `begin` animate attribute you can also omit a unit by passing a number. The number will automatically be converted to milli seconds.
   * **Guided mode**
   * The default behavior of SMIL animations with offset using the `begin` attribute is that the attribute will keep it's original value until the animation starts. Mostly this behavior is not desired as you'd like to have your element attributes already initialized with the animation `from` value even before the animation starts. Also if you don't specify `fill="freeze"` on an animate element or if you delete the animation after it's done (which is done in guided mode) the attribute will switch back to the initial value. This behavior is also not desired when performing simple one-time animations. For one-time animations you'd want to trigger animations immediately instead of relative to the document begin time. That's why in guided mode Chartist.Svg will also use the `begin` property to schedule a timeout and manually start the animation after the timeout. If you're using multiple SMIL definition objects for an attribute (in an array), guided mode will be disabled for this attribute, even if you explicitly enabled it.
   * If guided mode is enabled the following behavior is added:
   * - Before the animation starts (even when delayed with `begin`) the animated attribute will be set already to the `from` value of the animation
   * - `begin` is explicitly set to `indefinite` so it can be started manually without relying on document begin time (creation)
   * - The animate element will be forced to use `fill="freeze"`
   * - The animation will be triggered with `beginElement()` in a timeout where `begin` of the definition object is interpreted in milli seconds. If no `begin` was specified the timeout is triggered immediately.
   * - After the animation the element attribute value will be set to the `to` value of the animation
   * - The animate element is deleted from the DOM
   *
   * @memberof Chartist.Svg
   * @param {Object} animations An animations object where the property keys are the attributes you'd like to animate. The properties should be objects again that contain the SMIL animation attributes (usually begin, dur, from, and to). The property begin and dur is auto converted (see Automatic unit conversion). You can also schedule multiple animations for the same attribute by passing an Array of SMIL definition objects. Attributes that contain an array of SMIL definition objects will not be executed in guided mode.
   * @param {Boolean} guided Specify if guided mode should be activated for this animation (see Guided mode). If not otherwise specified, guided mode will be activated.
   * @param {Object} eventEmitter If specified, this event emitter will be notified when an animation starts or ends.
   * @return {Chartist.Svg} The current element where the animation was added
   */
  function animate(animations, guided, eventEmitter) {
    if(guided === undefined) {
      guided = true;
    }

    Object.keys(animations).forEach(function createAnimateForAttributes(attribute) {

      function createAnimate(animationDefinition, guided) {
        var attributeProperties = {},
          animate,
          timeout,
          easing;

        // Check if an easing is specified in the definition object and delete it from the object as it will not
        // be part of the animate element attributes.
        if(animationDefinition.easing) {
          // If already an easing Bézier curve array we take it or we lookup a easing array in the Easing object
          easing = animationDefinition.easing instanceof Array ?
            animationDefinition.easing :
            Chartist.Svg.Easing[animationDefinition.easing];
          delete animationDefinition.easing;
        }

        // If numeric dur or begin was provided we assume milli seconds
        animationDefinition.begin = Chartist.ensureUnit(animationDefinition.begin, 'ms');
        animationDefinition.dur = Chartist.ensureUnit(animationDefinition.dur, 'ms');

        if(easing) {
          animationDefinition.calcMode = 'spline';
          animationDefinition.keySplines = easing.join(' ');
          animationDefinition.keyTimes = '0;1';
        }

        // Adding "fill: freeze" if we are in guided mode and set initial attribute values
        if(guided) {
          animationDefinition.fill = 'freeze';
          // Animated property on our element should already be set to the animation from value in guided mode
          attributeProperties[attribute] = animationDefinition.from;
          this.attr(attributeProperties);

          // In guided mode we also set begin to indefinite so we can trigger the start manually and put the begin
          // which needs to be in ms aside
          timeout = Chartist.quantity(animationDefinition.begin || 0).value;
          animationDefinition.begin = 'indefinite';
        }

        animate = this.elem('animate', Chartist.extend({
          attributeName: attribute
        }, animationDefinition));

        if(guided) {
          // If guided we take the value that was put aside in timeout and trigger the animation manually with a timeout
          setTimeout(function() {
            // If beginElement fails we set the animated attribute to the end position and remove the animate element
            // This happens if the SMIL ElementTimeControl interface is not supported or any other problems occured in
            // the browser. (Currently FF 34 does not support animate elements in foreignObjects)
            try {
              animate._node.beginElement();
            } catch(err) {
              // Set animated attribute to current animated value
              attributeProperties[attribute] = animationDefinition.to;
              this.attr(attributeProperties);
              // Remove the animate element as it's no longer required
              animate.remove();
            }
          }.bind(this), timeout);
        }

        if(eventEmitter) {
          animate._node.addEventListener('beginEvent', function handleBeginEvent() {
            eventEmitter.emit('animationBegin', {
              element: this,
              animate: animate._node,
              params: animationDefinition
            });
          }.bind(this));
        }

        animate._node.addEventListener('endEvent', function handleEndEvent() {
          if(eventEmitter) {
            eventEmitter.emit('animationEnd', {
              element: this,
              animate: animate._node,
              params: animationDefinition
            });
          }

          if(guided) {
            // Set animated attribute to current animated value
            attributeProperties[attribute] = animationDefinition.to;
            this.attr(attributeProperties);
            // Remove the animate element as it's no longer required
            animate.remove();
          }
        }.bind(this));
      }

      // If current attribute is an array of definition objects we create an animate for each and disable guided mode
      if(animations[attribute] instanceof Array) {
        animations[attribute].forEach(function(animationDefinition) {
          createAnimate.bind(this)(animationDefinition, false);
        }.bind(this));
      } else {
        createAnimate.bind(this)(animations[attribute], guided);
      }

    }.bind(this));

    return this;
  }

  Chartist.Svg = Chartist.Class.extend({
    constructor: Svg,
    attr: attr,
    elem: elem,
    parent: parent,
    root: root,
    querySelector: querySelector,
    querySelectorAll: querySelectorAll,
    getNode: getNode,
    foreignObject: foreignObject,
    text: text,
    empty: empty,
    remove: remove,
    replace: replace,
    append: append,
    classes: classes,
    addClass: addClass,
    removeClass: removeClass,
    removeAllClasses: removeAllClasses,
    height: height,
    width: width,
    animate: animate
  });

  /**
   * This method checks for support of a given SVG feature like Extensibility, SVG-animation or the like. Check http://www.w3.org/TR/SVG11/feature for a detailed list.
   *
   * @memberof Chartist.Svg
   * @param {String} feature The SVG 1.1 feature that should be checked for support.
   * @return {Boolean} True of false if the feature is supported or not
   */
  Chartist.Svg.isSupported = function(feature) {
    return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#' + feature, '1.1');
  };

  /**
   * This Object contains some standard easing cubic bezier curves. Then can be used with their name in the `Chartist.Svg.animate`. You can also extend the list and use your own name in the `animate` function. Click the show code button to see the available bezier functions.
   *
   * @memberof Chartist.Svg
   */
  var easingCubicBeziers = {
    easeInSine: [0.47, 0, 0.745, 0.715],
    easeOutSine: [0.39, 0.575, 0.565, 1],
    easeInOutSine: [0.445, 0.05, 0.55, 0.95],
    easeInQuad: [0.55, 0.085, 0.68, 0.53],
    easeOutQuad: [0.25, 0.46, 0.45, 0.94],
    easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
    easeInCubic: [0.55, 0.055, 0.675, 0.19],
    easeOutCubic: [0.215, 0.61, 0.355, 1],
    easeInOutCubic: [0.645, 0.045, 0.355, 1],
    easeInQuart: [0.895, 0.03, 0.685, 0.22],
    easeOutQuart: [0.165, 0.84, 0.44, 1],
    easeInOutQuart: [0.77, 0, 0.175, 1],
    easeInQuint: [0.755, 0.05, 0.855, 0.06],
    easeOutQuint: [0.23, 1, 0.32, 1],
    easeInOutQuint: [0.86, 0, 0.07, 1],
    easeInExpo: [0.95, 0.05, 0.795, 0.035],
    easeOutExpo: [0.19, 1, 0.22, 1],
    easeInOutExpo: [1, 0, 0, 1],
    easeInCirc: [0.6, 0.04, 0.98, 0.335],
    easeOutCirc: [0.075, 0.82, 0.165, 1],
    easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
    easeInBack: [0.6, -0.28, 0.735, 0.045],
    easeOutBack: [0.175, 0.885, 0.32, 1.275],
    easeInOutBack: [0.68, -0.55, 0.265, 1.55]
  };

  Chartist.Svg.Easing = easingCubicBeziers;

  /**
   * This helper class is to wrap multiple `Chartist.Svg` elements into a list where you can call the `Chartist.Svg` functions on all elements in the list with one call. This is helpful when you'd like to perform calls with `Chartist.Svg` on multiple elements.
   * An instance of this class is also returned by `Chartist.Svg.querySelectorAll`.
   *
   * @memberof Chartist.Svg
   * @param {Array<Node>|NodeList} nodeList An Array of SVG DOM nodes or a SVG DOM NodeList (as returned by document.querySelectorAll)
   * @constructor
   */
  function SvgList(nodeList) {
    var list = this;

    this.svgElements = [];
    for(var i = 0; i < nodeList.length; i++) {
      this.svgElements.push(new Chartist.Svg(nodeList[i]));
    }

    // Add delegation methods for Chartist.Svg
    Object.keys(Chartist.Svg.prototype).filter(function(prototypeProperty) {
      return ['constructor',
          'parent',
          'querySelector',
          'querySelectorAll',
          'replace',
          'append',
          'classes',
          'height',
          'width'].indexOf(prototypeProperty) === -1;
    }).forEach(function(prototypeProperty) {
      list[prototypeProperty] = function() {
        var args = Array.prototype.slice.call(arguments, 0);
        list.svgElements.forEach(function(element) {
          Chartist.Svg.prototype[prototypeProperty].apply(element, args);
        });
        return list;
      };
    });
  }

  Chartist.Svg.List = Chartist.Class.extend({
    constructor: SvgList
  });
}(window, document, Chartist));
;/**
 * Chartist SVG path module for SVG path description creation and modification.
 *
 * @module Chartist.Svg.Path
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  /**
   * Contains the descriptors of supported element types in a SVG path. Currently only move, line and curve are supported.
   *
   * @memberof Chartist.Svg.Path
   * @type {Object}
   */
  var elementDescriptions = {
    m: ['x', 'y'],
    l: ['x', 'y'],
    c: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
    a: ['rx', 'ry', 'xAr', 'lAf', 'sf', 'x', 'y']
  };

  /**
   * Default options for newly created SVG path objects.
   *
   * @memberof Chartist.Svg.Path
   * @type {Object}
   */
  var defaultOptions = {
    // The accuracy in digit count after the decimal point. This will be used to round numbers in the SVG path. If this option is set to false then no rounding will be performed.
    accuracy: 3
  };

  function element(command, params, pathElements, pos, relative, data) {
    var pathElement = Chartist.extend({
      command: relative ? command.toLowerCase() : command.toUpperCase()
    }, params, data ? { data: data } : {} );

    pathElements.splice(pos, 0, pathElement);
  }

  function forEachParam(pathElements, cb) {
    pathElements.forEach(function(pathElement, pathElementIndex) {
      elementDescriptions[pathElement.command.toLowerCase()].forEach(function(paramName, paramIndex) {
        cb(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
      });
    });
  }

  /**
   * Used to construct a new path object.
   *
   * @memberof Chartist.Svg.Path
   * @param {Boolean} close If set to true then this path will be closed when stringified (with a Z at the end)
   * @param {Object} options Options object that overrides the default objects. See default options for more details.
   * @constructor
   */
  function SvgPath(close, options) {
    this.pathElements = [];
    this.pos = 0;
    this.close = close;
    this.options = Chartist.extend({}, defaultOptions, options);
  }

  /**
   * Gets or sets the current position (cursor) inside of the path. You can move around the cursor freely but limited to 0 or the count of existing elements. All modifications with element functions will insert new elements at the position of this cursor.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} [pos] If a number is passed then the cursor is set to this position in the path element array.
   * @return {Chartist.Svg.Path|Number} If the position parameter was passed then the return value will be the path object for easy call chaining. If no position parameter was passed then the current position is returned.
   */
  function position(pos) {
    if(pos !== undefined) {
      this.pos = Math.max(0, Math.min(this.pathElements.length, pos));
      return this;
    } else {
      return this.pos;
    }
  }

  /**
   * Removes elements from the path starting at the current position.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} count Number of path elements that should be removed from the current position.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function remove(count) {
    this.pathElements.splice(this.pos, count);
    return this;
  }

  /**
   * Use this function to add a new move SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The x coordinate for the move element.
   * @param {Number} y The y coordinate for the move element.
   * @param {Boolean} [relative] If set to true the move element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function move(x, y, relative, data) {
    element('M', {
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new line SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The x coordinate for the line element.
   * @param {Number} y The y coordinate for the line element.
   * @param {Boolean} [relative] If set to true the line element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function line(x, y, relative, data) {
    element('L', {
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new curve SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x1 The x coordinate for the first control point of the bezier curve.
   * @param {Number} y1 The y coordinate for the first control point of the bezier curve.
   * @param {Number} x2 The x coordinate for the second control point of the bezier curve.
   * @param {Number} y2 The y coordinate for the second control point of the bezier curve.
   * @param {Number} x The x coordinate for the target point of the curve element.
   * @param {Number} y The y coordinate for the target point of the curve element.
   * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function curve(x1, y1, x2, y2, x, y, relative, data) {
    element('C', {
      x1: +x1,
      y1: +y1,
      x2: +x2,
      y2: +y2,
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Use this function to add a new non-bezier curve SVG path element.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} rx The radius to be used for the x-axis of the arc.
   * @param {Number} ry The radius to be used for the y-axis of the arc.
   * @param {Number} xAr Defines the orientation of the arc
   * @param {Number} lAf Large arc flag
   * @param {Number} sf Sweep flag
   * @param {Number} x The x coordinate for the target point of the curve element.
   * @param {Number} y The y coordinate for the target point of the curve element.
   * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
   * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function arc(rx, ry, xAr, lAf, sf, x, y, relative, data) {
    element('A', {
      rx: +rx,
      ry: +ry,
      xAr: +xAr,
      lAf: +lAf,
      sf: +sf,
      x: +x,
      y: +y
    }, this.pathElements, this.pos++, relative, data);
    return this;
  }

  /**
   * Parses an SVG path seen in the d attribute of path elements, and inserts the parsed elements into the existing path object at the current cursor position. Any closing path indicators (Z at the end of the path) will be ignored by the parser as this is provided by the close option in the options of the path object.
   *
   * @memberof Chartist.Svg.Path
   * @param {String} path Any SVG path that contains move (m), line (l) or curve (c) components.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function parse(path) {
    // Parsing the SVG path string into an array of arrays [['M', '10', '10'], ['L', '100', '100']]
    var chunks = path.replace(/([A-Za-z])([0-9])/g, '$1 $2')
      .replace(/([0-9])([A-Za-z])/g, '$1 $2')
      .split(/[\s,]+/)
      .reduce(function(result, element) {
        if(element.match(/[A-Za-z]/)) {
          result.push([]);
        }

        result[result.length - 1].push(element);
        return result;
      }, []);

    // If this is a closed path we remove the Z at the end because this is determined by the close option
    if(chunks[chunks.length - 1][0].toUpperCase() === 'Z') {
      chunks.pop();
    }

    // Using svgPathElementDescriptions to map raw path arrays into objects that contain the command and the parameters
    // For example {command: 'M', x: '10', y: '10'}
    var elements = chunks.map(function(chunk) {
        var command = chunk.shift(),
          description = elementDescriptions[command.toLowerCase()];

        return Chartist.extend({
          command: command
        }, description.reduce(function(result, paramName, index) {
          result[paramName] = +chunk[index];
          return result;
        }, {}));
      });

    // Preparing a splice call with the elements array as var arg params and insert the parsed elements at the current position
    var spliceArgs = [this.pos, 0];
    Array.prototype.push.apply(spliceArgs, elements);
    Array.prototype.splice.apply(this.pathElements, spliceArgs);
    // Increase the internal position by the element count
    this.pos += elements.length;

    return this;
  }

  /**
   * This function renders to current SVG path object into a final SVG string that can be used in the d attribute of SVG path elements. It uses the accuracy option to round big decimals. If the close parameter was set in the constructor of this path object then a path closing Z will be appended to the output string.
   *
   * @memberof Chartist.Svg.Path
   * @return {String}
   */
  function stringify() {
    var accuracyMultiplier = Math.pow(10, this.options.accuracy);

    return this.pathElements.reduce(function(path, pathElement) {
        var params = elementDescriptions[pathElement.command.toLowerCase()].map(function(paramName) {
          return this.options.accuracy ?
            (Math.round(pathElement[paramName] * accuracyMultiplier) / accuracyMultiplier) :
            pathElement[paramName];
        }.bind(this));

        return path + pathElement.command + params.join(',');
      }.bind(this), '') + (this.close ? 'Z' : '');
  }

  /**
   * Scales all elements in the current SVG path object. There is an individual parameter for each coordinate. Scaling will also be done for control points of curves, affecting the given coordinate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The number which will be used to scale the x, x1 and x2 of all path elements.
   * @param {Number} y The number which will be used to scale the y, y1 and y2 of all path elements.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function scale(x, y) {
    forEachParam(this.pathElements, function(pathElement, paramName) {
      pathElement[paramName] *= paramName[0] === 'x' ? x : y;
    });
    return this;
  }

  /**
   * Translates all elements in the current SVG path object. The translation is relative and there is an individual parameter for each coordinate. Translation will also be done for control points of curves, affecting the given coordinate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Number} x The number which will be used to translate the x, x1 and x2 of all path elements.
   * @param {Number} y The number which will be used to translate the y, y1 and y2 of all path elements.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function translate(x, y) {
    forEachParam(this.pathElements, function(pathElement, paramName) {
      pathElement[paramName] += paramName[0] === 'x' ? x : y;
    });
    return this;
  }

  /**
   * This function will run over all existing path elements and then loop over their attributes. The callback function will be called for every path element attribute that exists in the current path.
   * The method signature of the callback function looks like this:
   * ```javascript
   * function(pathElement, paramName, pathElementIndex, paramIndex, pathElements)
   * ```
   * If something else than undefined is returned by the callback function, this value will be used to replace the old value. This allows you to build custom transformations of path objects that can't be achieved using the basic transformation functions scale and translate.
   *
   * @memberof Chartist.Svg.Path
   * @param {Function} transformFnc The callback function for the transformation. Check the signature in the function description.
   * @return {Chartist.Svg.Path} The current path object for easy call chaining.
   */
  function transform(transformFnc) {
    forEachParam(this.pathElements, function(pathElement, paramName, pathElementIndex, paramIndex, pathElements) {
      var transformed = transformFnc(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
      if(transformed || transformed === 0) {
        pathElement[paramName] = transformed;
      }
    });
    return this;
  }

  /**
   * This function clones a whole path object with all its properties. This is a deep clone and path element objects will also be cloned.
   *
   * @memberof Chartist.Svg.Path
   * @param {Boolean} [close] Optional option to set the new cloned path to closed. If not specified or false, the original path close option will be used.
   * @return {Chartist.Svg.Path}
   */
  function clone(close) {
    var c = new Chartist.Svg.Path(close || this.close);
    c.pos = this.pos;
    c.pathElements = this.pathElements.slice().map(function cloneElements(pathElement) {
      return Chartist.extend({}, pathElement);
    });
    c.options = Chartist.extend({}, this.options);
    return c;
  }

  /**
   * Split a Svg.Path object by a specific command in the path chain. The path chain will be split and an array of newly created paths objects will be returned. This is useful if you'd like to split an SVG path by it's move commands, for example, in order to isolate chunks of drawings.
   *
   * @memberof Chartist.Svg.Path
   * @param {String} command The command you'd like to use to split the path
   * @return {Array<Chartist.Svg.Path>}
   */
  function splitByCommand(command) {
    var split = [
      new Chartist.Svg.Path()
    ];

    this.pathElements.forEach(function(pathElement) {
      if(pathElement.command === command.toUpperCase() && split[split.length - 1].pathElements.length !== 0) {
        split.push(new Chartist.Svg.Path());
      }

      split[split.length - 1].pathElements.push(pathElement);
    });

    return split;
  }

  /**
   * This static function on `Chartist.Svg.Path` is joining multiple paths together into one paths.
   *
   * @memberof Chartist.Svg.Path
   * @param {Array<Chartist.Svg.Path>} paths A list of paths to be joined together. The order is important.
   * @param {boolean} close If the newly created path should be a closed path
   * @param {Object} options Path options for the newly created path.
   * @return {Chartist.Svg.Path}
   */

  function join(paths, close, options) {
    var joinedPath = new Chartist.Svg.Path(close, options);
    for(var i = 0; i < paths.length; i++) {
      var path = paths[i];
      for(var j = 0; j < path.pathElements.length; j++) {
        joinedPath.pathElements.push(path.pathElements[j]);
      }
    }
    return joinedPath;
  }

  Chartist.Svg.Path = Chartist.Class.extend({
    constructor: SvgPath,
    position: position,
    remove: remove,
    move: move,
    line: line,
    curve: curve,
    arc: arc,
    scale: scale,
    translate: translate,
    transform: transform,
    parse: parse,
    stringify: stringify,
    clone: clone,
    splitByCommand: splitByCommand
  });

  Chartist.Svg.Path.elementDescriptions = elementDescriptions;
  Chartist.Svg.Path.join = join;
}(window, document, Chartist));
;/* global Chartist */
(function (window, document, Chartist) {
  'use strict';

  var axisUnits = {
    x: {
      pos: 'x',
      len: 'width',
      dir: 'horizontal',
      rectStart: 'x1',
      rectEnd: 'x2',
      rectOffset: 'y2'
    },
    y: {
      pos: 'y',
      len: 'height',
      dir: 'vertical',
      rectStart: 'y2',
      rectEnd: 'y1',
      rectOffset: 'x1'
    }
  };

  function Axis(units, chartRect, ticks, options) {
    this.units = units;
    this.counterUnits = units === axisUnits.x ? axisUnits.y : axisUnits.x;
    this.chartRect = chartRect;
    this.axisLength = chartRect[units.rectEnd] - chartRect[units.rectStart];
    this.gridOffset = chartRect[units.rectOffset];
    this.ticks = ticks;
    this.options = options;
  }

  function createGridAndLabels(gridGroup, labelGroup, useForeignObject, chartOptions, eventEmitter) {
    var axisOptions = chartOptions['axis' + this.units.pos.toUpperCase()];
    var projectedValues = this.ticks.map(this.projectValue.bind(this));
    var labelValues = this.ticks.map(axisOptions.labelInterpolationFnc);

    projectedValues.forEach(function(projectedValue, index) {
      var labelOffset = {
        x: 0,
        y: 0
      };

      // TODO: Find better solution for solving this problem
      // Calculate how much space we have available for the label
      var labelLength;
      if(projectedValues[index + 1]) {
        // If we still have one label ahead, we can calculate the distance to the next tick / label
        labelLength = projectedValues[index + 1] - projectedValue;
      } else {
        // If we don't have a label ahead and we have only two labels in total, we just take the remaining distance to
        // on the whole axis length. We limit that to a minimum of 30 pixel, so that labels close to the border will
        // still be visible inside of the chart padding.
        labelLength = Math.max(this.axisLength - projectedValue, 30);
      }

      // Skip grid lines and labels where interpolated label values are falsey (execpt for 0)
      if(Chartist.isFalseyButZero(labelValues[index]) && labelValues[index] !== '') {
        return;
      }

      // Transform to global coordinates using the chartRect
      // We also need to set the label offset for the createLabel function
      if(this.units.pos === 'x') {
        projectedValue = this.chartRect.x1 + projectedValue;
        labelOffset.x = chartOptions.axisX.labelOffset.x;

        // If the labels should be positioned in start position (top side for vertical axis) we need to set a
        // different offset as for positioned with end (bottom)
        if(chartOptions.axisX.position === 'start') {
          labelOffset.y = this.chartRect.padding.top + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
        } else {
          labelOffset.y = this.chartRect.y1 + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
        }
      } else {
        projectedValue = this.chartRect.y1 - projectedValue;
        labelOffset.y = chartOptions.axisY.labelOffset.y - (useForeignObject ? labelLength : 0);

        // If the labels should be positioned in start position (left side for horizontal axis) we need to set a
        // different offset as for positioned with end (right side)
        if(chartOptions.axisY.position === 'start') {
          labelOffset.x = useForeignObject ? this.chartRect.padding.left + chartOptions.axisY.labelOffset.x : this.chartRect.x1 - 10;
        } else {
          labelOffset.x = this.chartRect.x2 + chartOptions.axisY.labelOffset.x + 10;
        }
      }

      if(axisOptions.showGrid) {
        Chartist.createGrid(projectedValue, index, this, this.gridOffset, this.chartRect[this.counterUnits.len](), gridGroup, [
          chartOptions.classNames.grid,
          chartOptions.classNames[this.units.dir]
        ], eventEmitter);
      }

      if(axisOptions.showLabel) {
        Chartist.createLabel(projectedValue, labelLength, index, labelValues, this, axisOptions.offset, labelOffset, labelGroup, [
          chartOptions.classNames.label,
          chartOptions.classNames[this.units.dir],
          (axisOptions.position === 'start' ? chartOptions.classNames[axisOptions.position] : chartOptions.classNames['end'])
        ], useForeignObject, eventEmitter);
      }
    }.bind(this));
  }

  Chartist.Axis = Chartist.Class.extend({
    constructor: Axis,
    createGridAndLabels: createGridAndLabels,
    projectValue: function(value, index, data) {
      throw new Error('Base axis can\'t be instantiated!');
    }
  });

  Chartist.Axis.units = axisUnits;

}(window, document, Chartist));
;/**
 * The auto scale axis uses standard linear scale projection of values along an axis. It uses order of magnitude to find a scale automatically and evaluates the available space in order to find the perfect amount of ticks for your chart.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,
 *   // This option will be used when finding the right scale division settings. The amount of ticks on the scale will be determined so that as many ticks as possible will be displayed, while not violating this minimum required space (in pixel).
 *   scaleMinSpace: 20,
 *   // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.
 *   onlyInteger: true,
 *   // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
 *   referenceValue: 5
 * };
 * ```
 *
 * @module Chartist.AutoScaleAxis
 */
/* global Chartist */
(function (window, document, Chartist) {
  'use strict';

  function AutoScaleAxis(axisUnit, data, chartRect, options) {
    // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options
    var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
    this.bounds = Chartist.getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
    this.range = {
      min: this.bounds.min,
      max: this.bounds.max
    };

    Chartist.AutoScaleAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      this.bounds.values,
      options);
  }

  function projectValue(value) {
    return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.bounds.min) / this.bounds.range;
  }

  Chartist.AutoScaleAxis = Chartist.Axis.extend({
    constructor: AutoScaleAxis,
    projectValue: projectValue
  });

}(window, document, Chartist));
;/**
 * The fixed scale axis uses standard linear projection of values along an axis. It makes use of a divisor option to divide the range provided from the minimum and maximum value or the options high and low that will override the computed minimum and maximum.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
 *   high: 100,
 *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
 *   low: 0,
 *   // If specified then the value range determined from minimum to maximum (or low and high) will be divided by this number and ticks will be generated at those division points. The default divisor is 1.
 *   divisor: 4,
 *   // If ticks is explicitly set, then the axis will not compute the ticks with the divisor, but directly use the data in ticks to determine at what points on the axis a tick need to be generated.
 *   ticks: [1, 10, 20, 30]
 * };
 * ```
 *
 * @module Chartist.FixedScaleAxis
 */
/* global Chartist */
(function (window, document, Chartist) {
  'use strict';

  function FixedScaleAxis(axisUnit, data, chartRect, options) {
    var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
    this.divisor = options.divisor || 1;
    this.ticks = options.ticks || Chartist.times(this.divisor).map(function(value, index) {
      return highLow.low + (highLow.high - highLow.low) / this.divisor * index;
    }.bind(this));
    this.ticks.sort(function(a, b) {
      return a - b;
    });
    this.range = {
      min: highLow.low,
      max: highLow.high
    };

    Chartist.FixedScaleAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      this.ticks,
      options);

    this.stepLength = this.axisLength / this.divisor;
  }

  function projectValue(value) {
    return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.range.min) / (this.range.max - this.range.min);
  }

  Chartist.FixedScaleAxis = Chartist.Axis.extend({
    constructor: FixedScaleAxis,
    projectValue: projectValue
  });

}(window, document, Chartist));
;/**
 * The step axis for step based charts like bar chart or step based line charts. It uses a fixed amount of ticks that will be equally distributed across the whole axis length. The projection is done using the index of the data value rather than the value itself and therefore it's only useful for distribution purpose.
 * **Options**
 * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
 * ```javascript
 * var options = {
 *   // Ticks to be used to distribute across the axis length. As this axis type relies on the index of the value rather than the value, arbitrary data that can be converted to a string can be used as ticks.
 *   ticks: ['One', 'Two', 'Three'],
 *   // If set to true the full width will be used to distribute the values where the last value will be at the maximum of the axis length. If false the spaces between the ticks will be evenly distributed instead.
 *   stretch: true
 * };
 * ```
 *
 * @module Chartist.StepAxis
 */
/* global Chartist */
(function (window, document, Chartist) {
  'use strict';

  function StepAxis(axisUnit, data, chartRect, options) {
    Chartist.StepAxis.super.constructor.call(this,
      axisUnit,
      chartRect,
      options.ticks,
      options);

    var calc = Math.max(1, options.ticks.length - (options.stretch ? 1 : 0));
    this.stepLength = this.axisLength / calc;
  }

  function projectValue(value, index) {
    return this.stepLength * index;
  }

  Chartist.StepAxis = Chartist.Axis.extend({
    constructor: StepAxis,
    projectValue: projectValue
  });

}(window, document, Chartist));
;/**
 * The Chartist line chart can be used to draw Line or Scatter charts. If used in the browser you can access the global `Chartist` namespace where you find the `Line` function as a main entry point.
 *
 * For examples on how to use the line chart please check the examples of the `Chartist.Line` method.
 *
 * @module Chartist.Line
 */
/* global Chartist */
(function(window, document, Chartist){
  'use strict';

  /**
   * Default options in line charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Line
   */
  var defaultOptions = {
    // Options for X-Axis
    axisX: {
      // The offset of the labels to the chart area
      offset: 30,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined
    },
    // Options for Y-Axis
    axisY: {
      // The offset of the labels to the chart area
      offset: 40,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
      type: undefined,
      // This value specifies the minimum height in pixel of the scale steps
      scaleMinSpace: 20,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // If the line should be drawn or not
    showLine: true,
    // If dots should be drawn or not
    showPoint: true,
    // If the line chart should draw an area
    showArea: false,
    // The base for the area chart that will be used to close the area shape (is normally 0)
    areaBase: 0,
    // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
    lineSmooth: true,
    // If the line chart should add a background fill to the .ct-grids group.
    showGridBackground: false,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
      top: 15,
      right: 15,
      bottom: 5,
      left: 10
    },
    // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
    fullWidth: false,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
      chart: 'ct-chart-line',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      line: 'ct-line',
      point: 'ct-point',
      area: 'ct-area',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      gridBackground: 'ct-grid-background',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
  };

  /**
   * Creates a new chart
   *
   */
  function createChart(options) {
    var data = Chartist.normalizeData(this.data, options.reverseData, true);

    // Create new svg object
    this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart);
    // Create groups for labels, grid and series
    var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
    var seriesGroup = this.svg.elem('g');
    var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);

    var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
    var axisX, axisY;

    if(options.axisX.type === undefined) {
      axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
        ticks: data.normalized.labels,
        stretch: options.fullWidth
      }));
    } else {
      axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
    }

    if(options.axisY.type === undefined) {
      axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
        high: Chartist.isNumeric(options.high) ? options.high : options.axisY.high,
        low: Chartist.isNumeric(options.low) ? options.low : options.axisY.low
      }));
    } else {
      axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
    }

    axisX.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
    axisY.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

    if (options.showGridBackground) {
      Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
    }

    // Draw the series
    data.raw.series.forEach(function(series, seriesIndex) {
      var seriesElement = seriesGroup.elem('g');

      // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
      seriesElement.attr({
        'ct:series-name': series.name,
        'ct:meta': Chartist.serialize(series.meta)
      });

      // Use series class from series data or if not set generate one
      seriesElement.addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex))
      ].join(' '));

      var pathCoordinates = [],
        pathData = [];

      data.normalized.series[seriesIndex].forEach(function(value, valueIndex) {
        var p = {
          x: chartRect.x1 + axisX.projectValue(value, valueIndex, data.normalized.series[seriesIndex]),
          y: chartRect.y1 - axisY.projectValue(value, valueIndex, data.normalized.series[seriesIndex])
        };
        pathCoordinates.push(p.x, p.y);
        pathData.push({
          value: value,
          valueIndex: valueIndex,
          meta: Chartist.getMetaData(series, valueIndex)
        });
      }.bind(this));

      var seriesOptions = {
        lineSmooth: Chartist.getSeriesOption(series, options, 'lineSmooth'),
        showPoint: Chartist.getSeriesOption(series, options, 'showPoint'),
        showLine: Chartist.getSeriesOption(series, options, 'showLine'),
        showArea: Chartist.getSeriesOption(series, options, 'showArea'),
        areaBase: Chartist.getSeriesOption(series, options, 'areaBase')
      };

      var smoothing = typeof seriesOptions.lineSmooth === 'function' ?
        seriesOptions.lineSmooth : (seriesOptions.lineSmooth ? Chartist.Interpolation.monotoneCubic() : Chartist.Interpolation.none());
      // Interpolating path where pathData will be used to annotate each path element so we can trace back the original
      // index, value and meta data
      var path = smoothing(pathCoordinates, pathData);

      // If we should show points we need to create them now to avoid secondary loop
      // Points are drawn from the pathElements returned by the interpolation function
      // Small offset for Firefox to render squares correctly
      if (seriesOptions.showPoint) {

        path.pathElements.forEach(function(pathElement) {
          var point = seriesElement.elem('line', {
            x1: pathElement.x,
            y1: pathElement.y,
            x2: pathElement.x + 0.01,
            y2: pathElement.y
          }, options.classNames.point).attr({
            'ct:value': [pathElement.data.value.x, pathElement.data.value.y].filter(Chartist.isNumeric).join(','),
            'ct:meta': Chartist.serialize(pathElement.data.meta)
          });

          this.eventEmitter.emit('draw', {
            type: 'point',
            value: pathElement.data.value,
            index: pathElement.data.valueIndex,
            meta: pathElement.data.meta,
            series: series,
            seriesIndex: seriesIndex,
            axisX: axisX,
            axisY: axisY,
            group: seriesElement,
            element: point,
            x: pathElement.x,
            y: pathElement.y
          });
        }.bind(this));
      }

      if(seriesOptions.showLine) {
        var line = seriesElement.elem('path', {
          d: path.stringify()
        }, options.classNames.line, true);

        this.eventEmitter.emit('draw', {
          type: 'line',
          values: data.normalized.series[seriesIndex],
          path: path.clone(),
          chartRect: chartRect,
          index: seriesIndex,
          series: series,
          seriesIndex: seriesIndex,
          seriesMeta: series.meta,
          axisX: axisX,
          axisY: axisY,
          group: seriesElement,
          element: line
        });
      }

      // Area currently only works with axes that support a range!
      if(seriesOptions.showArea && axisY.range) {
        // If areaBase is outside the chart area (< min or > max) we need to set it respectively so that
        // the area is not drawn outside the chart area.
        var areaBase = Math.max(Math.min(seriesOptions.areaBase, axisY.range.max), axisY.range.min);

        // We project the areaBase value into screen coordinates
        var areaBaseProjected = chartRect.y1 - axisY.projectValue(areaBase);

        // In order to form the area we'll first split the path by move commands so we can chunk it up into segments
        path.splitByCommand('M').filter(function onlySolidSegments(pathSegment) {
          // We filter only "solid" segments that contain more than one point. Otherwise there's no need for an area
          return pathSegment.pathElements.length > 1;
        }).map(function convertToArea(solidPathSegments) {
          // Receiving the filtered solid path segments we can now convert those segments into fill areas
          var firstElement = solidPathSegments.pathElements[0];
          var lastElement = solidPathSegments.pathElements[solidPathSegments.pathElements.length - 1];

          // Cloning the solid path segment with closing option and removing the first move command from the clone
          // We then insert a new move that should start at the area base and draw a straight line up or down
          // at the end of the path we add an additional straight line to the projected area base value
          // As the closing option is set our path will be automatically closed
          return solidPathSegments.clone(true)
            .position(0)
            .remove(1)
            .move(firstElement.x, areaBaseProjected)
            .line(firstElement.x, firstElement.y)
            .position(solidPathSegments.pathElements.length + 1)
            .line(lastElement.x, areaBaseProjected);

        }).forEach(function createArea(areaPath) {
          // For each of our newly created area paths, we'll now create path elements by stringifying our path objects
          // and adding the created DOM elements to the correct series group
          var area = seriesElement.elem('path', {
            d: areaPath.stringify()
          }, options.classNames.area, true);

          // Emit an event for each area that was drawn
          this.eventEmitter.emit('draw', {
            type: 'area',
            values: data.normalized.series[seriesIndex],
            path: areaPath.clone(),
            series: series,
            seriesIndex: seriesIndex,
            axisX: axisX,
            axisY: axisY,
            chartRect: chartRect,
            index: seriesIndex,
            group: seriesElement,
            element: area
          });
        }.bind(this));
      }
    }.bind(this));

    this.eventEmitter.emit('created', {
      bounds: axisY.bounds,
      chartRect: chartRect,
      axisX: axisX,
      axisY: axisY,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new line chart.
   *
   * @memberof Chartist.Line
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object that needs to consist of a labels and a series array
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object which exposes the API for the created chart
   *
   * @example
   * // Create a simple line chart
   * var data = {
   *   // A labels array that can contain any sort of values
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
   *   // Our series array that contains series objects or in this case series data arrays
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // As options we currently only set a static size of 300x200 px
   * var options = {
   *   width: '300px',
   *   height: '200px'
   * };
   *
   * // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
   * new Chartist.Line('.ct-chart', data, options);
   *
   * @example
   * // Use specific interpolation function with configuration from the Chartist.Interpolation module
   *
   * var chart = new Chartist.Line('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5],
   *   series: [
   *     [1, 1, 8, 1, 7]
   *   ]
   * }, {
   *   lineSmooth: Chartist.Interpolation.cardinal({
   *     tension: 0.2
   *   })
   * });
   *
   * @example
   * // Create a line chart with responsive options
   *
   * var data = {
   *   // A labels array that can contain any sort of values
   *   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
   *   // Our series array that contains series objects or in this case series data arrays
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
   * var responsiveOptions = [
   *   ['screen and (min-width: 641px) and (max-width: 1024px)', {
   *     showPoint: false,
   *     axisX: {
   *       labelInterpolationFnc: function(value) {
   *         // Will return Mon, Tue, Wed etc. on medium screens
   *         return value.slice(0, 3);
   *       }
   *     }
   *   }],
   *   ['screen and (max-width: 640px)', {
   *     showLine: false,
   *     axisX: {
   *       labelInterpolationFnc: function(value) {
   *         // Will return M, T, W etc. on small screens
   *         return value[0];
   *       }
   *     }
   *   }]
   * ];
   *
   * new Chartist.Line('.ct-chart', data, null, responsiveOptions);
   *
   */
  function Line(query, data, options, responsiveOptions) {
    Chartist.Line.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating line chart type in Chartist namespace
  Chartist.Line = Chartist.Base.extend({
    constructor: Line,
    createChart: createChart
  });

}(window, document, Chartist));
;/**
 * The bar chart module of Chartist that can be used to draw unipolar or bipolar bar and grouped bar charts.
 *
 * @module Chartist.Bar
 */
/* global Chartist */
(function(window, document, Chartist){
  'use strict';

  /**
   * Default options in bar charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Bar
   */
  var defaultOptions = {
    // Options for X-Axis
    axisX: {
      // The offset of the chart drawing area to the border of the container
      offset: 30,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'end',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // This value specifies the minimum width in pixel of the scale steps
      scaleMinSpace: 30,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Options for Y-Axis
    axisY: {
      // The offset of the chart drawing area to the border of the container
      offset: 40,
      // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
      position: 'start',
      // Allows you to correct label positioning on this axis by positive or negative x and y offset.
      labelOffset: {
        x: 0,
        y: 0
      },
      // If labels should be shown or not
      showLabel: true,
      // If the axis grid should be drawn or not
      showGrid: true,
      // Interpolation function that allows you to intercept the value from the axis label
      labelInterpolationFnc: Chartist.noop,
      // This value specifies the minimum height in pixel of the scale steps
      scaleMinSpace: 20,
      // Use only integer values (whole numbers) for the scale steps
      onlyInteger: false
    },
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
    high: undefined,
    // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
    low: undefined,
    // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
    referenceValue: 0,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: {
      top: 15,
      right: 15,
      bottom: 5,
      left: 10
    },
    // Specify the distance in pixel of bars in a group
    seriesBarDistance: 15,
    // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
    stackBars: false,
    // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
    // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
    stackMode: 'accumulate',
    // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
    horizontalBars: false,
    // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
    distributeSeries: false,
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // If the bar chart should add a background fill to the .ct-grids group.
    showGridBackground: false,
    // Override the class names that get used to generate the SVG structure of the chart
    classNames: {
      chart: 'ct-chart-bar',
      horizontalBars: 'ct-horizontal-bars',
      label: 'ct-label',
      labelGroup: 'ct-labels',
      series: 'ct-series',
      bar: 'ct-bar',
      grid: 'ct-grid',
      gridGroup: 'ct-grids',
      gridBackground: 'ct-grid-background',
      vertical: 'ct-vertical',
      horizontal: 'ct-horizontal',
      start: 'ct-start',
      end: 'ct-end'
    }
  };

  /**
   * Creates a new chart
   *
   */
  function createChart(options) {
    var data;
    var highLow;

    if(options.distributeSeries) {
      data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
      data.normalized.series = data.normalized.series.map(function(value) {
        return [value];
      });
    } else {
      data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
    }

    // Create new svg element
    this.svg = Chartist.createSvg(
      this.container,
      options.width,
      options.height,
      options.classNames.chart + (options.horizontalBars ? ' ' + options.classNames.horizontalBars : '')
    );

    // Drawing groups in correct order
    var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
    var seriesGroup = this.svg.elem('g');
    var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);

    if(options.stackBars && data.normalized.series.length !== 0) {

      // If stacked bars we need to calculate the high low from stacked values from each series
      var serialSums = Chartist.serialMap(data.normalized.series, function serialSums() {
        return Array.prototype.slice.call(arguments).map(function(value) {
          return value;
        }).reduce(function(prev, curr) {
          return {
            x: prev.x + (curr && curr.x) || 0,
            y: prev.y + (curr && curr.y) || 0
          };
        }, {x: 0, y: 0});
      });

      highLow = Chartist.getHighLow([serialSums], options, options.horizontalBars ? 'x' : 'y');

    } else {

      highLow = Chartist.getHighLow(data.normalized.series, options, options.horizontalBars ? 'x' : 'y');
    }

    // Overrides of high / low from settings
    highLow.high = +options.high || (options.high === 0 ? 0 : highLow.high);
    highLow.low = +options.low || (options.low === 0 ? 0 : highLow.low);

    var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);

    var valueAxis,
      labelAxisTicks,
      labelAxis,
      axisX,
      axisY;

    // We need to set step count based on some options combinations
    if(options.distributeSeries && options.stackBars) {
      // If distributed series are enabled and bars need to be stacked, we'll only have one bar and therefore should
      // use only the first label for the step axis
      labelAxisTicks = data.normalized.labels.slice(0, 1);
    } else {
      // If distributed series are enabled but stacked bars aren't, we should use the series labels
      // If we are drawing a regular bar chart with two dimensional series data, we just use the labels array
      // as the bars are normalized
      labelAxisTicks = data.normalized.labels;
    }

    // Set labelAxis and valueAxis based on the horizontalBars setting. This setting will flip the axes if necessary.
    if(options.horizontalBars) {
      if(options.axisX.type === undefined) {
        valueAxis = axisX = new Chartist.AutoScaleAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
          highLow: highLow,
          referenceValue: 0
        }));
      } else {
        valueAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
          highLow: highLow,
          referenceValue: 0
        }));
      }

      if(options.axisY.type === undefined) {
        labelAxis = axisY = new Chartist.StepAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, {
          ticks: labelAxisTicks
        });
      } else {
        labelAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
      }
    } else {
      if(options.axisX.type === undefined) {
        labelAxis = axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, {
          ticks: labelAxisTicks
        });
      } else {
        labelAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
      }

      if(options.axisY.type === undefined) {
        valueAxis = axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
          highLow: highLow,
          referenceValue: 0
        }));
      } else {
        valueAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
          highLow: highLow,
          referenceValue: 0
        }));
      }
    }

    // Projected 0 point
    var zeroPoint = options.horizontalBars ? (chartRect.x1 + valueAxis.projectValue(0)) : (chartRect.y1 - valueAxis.projectValue(0));
    // Used to track the screen coordinates of stacked bars
    var stackedBarValues = [];

    labelAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
    valueAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

    if (options.showGridBackground) {
      Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
    }

    // Draw the series
    data.raw.series.forEach(function(series, seriesIndex) {
      // Calculating bi-polar value of index for seriesOffset. For i = 0..4 biPol will be -1.5, -0.5, 0.5, 1.5 etc.
      var biPol = seriesIndex - (data.raw.series.length - 1) / 2;
      // Half of the period width between vertical grid lines used to position bars
      var periodHalfLength;
      // Current series SVG element
      var seriesElement;

      // We need to set periodHalfLength based on some options combinations
      if(options.distributeSeries && !options.stackBars) {
        // If distributed series are enabled but stacked bars aren't, we need to use the length of the normaizedData array
        // which is the series count and divide by 2
        periodHalfLength = labelAxis.axisLength / data.normalized.series.length / 2;
      } else if(options.distributeSeries && options.stackBars) {
        // If distributed series and stacked bars are enabled we'll only get one bar so we should just divide the axis
        // length by 2
        periodHalfLength = labelAxis.axisLength / 2;
      } else {
        // On regular bar charts we should just use the series length
        periodHalfLength = labelAxis.axisLength / data.normalized.series[seriesIndex].length / 2;
      }

      // Adding the series group to the series element
      seriesElement = seriesGroup.elem('g');

      // Write attributes to series group element. If series name or meta is undefined the attributes will not be written
      seriesElement.attr({
        'ct:series-name': series.name,
        'ct:meta': Chartist.serialize(series.meta)
      });

      // Use series class from series data or if not set generate one
      seriesElement.addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex))
      ].join(' '));

      data.normalized.series[seriesIndex].forEach(function(value, valueIndex) {
        var projected,
          bar,
          previousStack,
          labelAxisValueIndex;

        // We need to set labelAxisValueIndex based on some options combinations
        if(options.distributeSeries && !options.stackBars) {
          // If distributed series are enabled but stacked bars aren't, we can use the seriesIndex for later projection
          // on the step axis for label positioning
          labelAxisValueIndex = seriesIndex;
        } else if(options.distributeSeries && options.stackBars) {
          // If distributed series and stacked bars are enabled, we will only get one bar and therefore always use
          // 0 for projection on the label step axis
          labelAxisValueIndex = 0;
        } else {
          // On regular bar charts we just use the value index to project on the label step axis
          labelAxisValueIndex = valueIndex;
        }

        // We need to transform coordinates differently based on the chart layout
        if(options.horizontalBars) {
          projected = {
            x: chartRect.x1 + valueAxis.projectValue(value && value.x ? value.x : 0, valueIndex, data.normalized.series[seriesIndex]),
            y: chartRect.y1 - labelAxis.projectValue(value && value.y ? value.y : 0, labelAxisValueIndex, data.normalized.series[seriesIndex])
          };
        } else {
          projected = {
            x: chartRect.x1 + labelAxis.projectValue(value && value.x ? value.x : 0, labelAxisValueIndex, data.normalized.series[seriesIndex]),
            y: chartRect.y1 - valueAxis.projectValue(value && value.y ? value.y : 0, valueIndex, data.normalized.series[seriesIndex])
          }
        }

        // If the label axis is a step based axis we will offset the bar into the middle of between two steps using
        // the periodHalfLength value. Also we do arrange the different series so that they align up to each other using
        // the seriesBarDistance. If we don't have a step axis, the bar positions can be chosen freely so we should not
        // add any automated positioning.
        if(labelAxis instanceof Chartist.StepAxis) {
          // Offset to center bar between grid lines, but only if the step axis is not stretched
          if(!labelAxis.options.stretch) {
            projected[labelAxis.units.pos] += periodHalfLength * (options.horizontalBars ? -1 : 1);
          }
          // Using bi-polar offset for multiple series if no stacked bars or series distribution is used
          projected[labelAxis.units.pos] += (options.stackBars || options.distributeSeries) ? 0 : biPol * options.seriesBarDistance * (options.horizontalBars ? -1 : 1);
        }

        // Enter value in stacked bar values used to remember previous screen value for stacking up bars
        previousStack = stackedBarValues[valueIndex] || zeroPoint;
        stackedBarValues[valueIndex] = previousStack - (zeroPoint - projected[labelAxis.counterUnits.pos]);

        // Skip if value is undefined
        if(value === undefined) {
          return;
        }

        var positions = {};
        positions[labelAxis.units.pos + '1'] = projected[labelAxis.units.pos];
        positions[labelAxis.units.pos + '2'] = projected[labelAxis.units.pos];

        if(options.stackBars && (options.stackMode === 'accumulate' || !options.stackMode)) {
          // Stack mode: accumulate (default)
          // If bars are stacked we use the stackedBarValues reference and otherwise base all bars off the zero line
          // We want backwards compatibility, so the expected fallback without the 'stackMode' option
          // to be the original behaviour (accumulate)
          positions[labelAxis.counterUnits.pos + '1'] = previousStack;
          positions[labelAxis.counterUnits.pos + '2'] = stackedBarValues[valueIndex];
        } else {
          // Draw from the zero line normally
          // This is also the same code for Stack mode: overlap
          positions[labelAxis.counterUnits.pos + '1'] = zeroPoint;
          positions[labelAxis.counterUnits.pos + '2'] = projected[labelAxis.counterUnits.pos];
        }

        // Limit x and y so that they are within the chart rect
        positions.x1 = Math.min(Math.max(positions.x1, chartRect.x1), chartRect.x2);
        positions.x2 = Math.min(Math.max(positions.x2, chartRect.x1), chartRect.x2);
        positions.y1 = Math.min(Math.max(positions.y1, chartRect.y2), chartRect.y1);
        positions.y2 = Math.min(Math.max(positions.y2, chartRect.y2), chartRect.y1);

        var metaData = Chartist.getMetaData(series, valueIndex);

        // Create bar element
        bar = seriesElement.elem('line', positions, options.classNames.bar).attr({
          'ct:value': [value.x, value.y].filter(Chartist.isNumeric).join(','),
          'ct:meta': Chartist.serialize(metaData)
        });

        this.eventEmitter.emit('draw', Chartist.extend({
          type: 'bar',
          value: value,
          index: valueIndex,
          meta: metaData,
          series: series,
          seriesIndex: seriesIndex,
          axisX: axisX,
          axisY: axisY,
          chartRect: chartRect,
          group: seriesElement,
          element: bar
        }, positions));
      }.bind(this));
    }.bind(this));

    this.eventEmitter.emit('created', {
      bounds: valueAxis.bounds,
      chartRect: chartRect,
      axisX: axisX,
      axisY: axisY,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new bar chart and returns API object that you can use for later changes.
   *
   * @memberof Chartist.Bar
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object that needs to consist of a labels and a series array
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object which exposes the API for the created chart
   *
   * @example
   * // Create a simple bar chart
   * var data = {
   *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
   *   series: [
   *     [5, 2, 4, 2, 0]
   *   ]
   * };
   *
   * // In the global name space Chartist we call the Bar function to initialize a bar chart. As a first parameter we pass in a selector where we would like to get our chart created and as a second parameter we pass our data object.
   * new Chartist.Bar('.ct-chart', data);
   *
   * @example
   * // This example creates a bipolar grouped bar chart where the boundaries are limitted to -10 and 10
   * new Chartist.Bar('.ct-chart', {
   *   labels: [1, 2, 3, 4, 5, 6, 7],
   *   series: [
   *     [1, 3, 2, -5, -3, 1, -6],
   *     [-5, -2, -4, -1, 2, -3, 1]
   *   ]
   * }, {
   *   seriesBarDistance: 12,
   *   low: -10,
   *   high: 10
   * });
   *
   */
  function Bar(query, data, options, responsiveOptions) {
    Chartist.Bar.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating bar chart type in Chartist namespace
  Chartist.Bar = Chartist.Base.extend({
    constructor: Bar,
    createChart: createChart
  });

}(window, document, Chartist));
;/**
 * The pie chart module of Chartist that can be used to draw pie, donut or gauge charts
 *
 * @module Chartist.Pie
 */
/* global Chartist */
(function(window, document, Chartist) {
  'use strict';

  /**
   * Default options in line charts. Expand the code view to see a detailed list of options with comments.
   *
   * @memberof Chartist.Pie
   */
  var defaultOptions = {
    // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
    width: undefined,
    // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
    height: undefined,
    // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
    chartPadding: 5,
    // Override the class names that are used to generate the SVG structure of the chart
    classNames: {
      chartPie: 'ct-chart-pie',
      chartDonut: 'ct-chart-donut',
      series: 'ct-series',
      slicePie: 'ct-slice-pie',
      sliceDonut: 'ct-slice-donut',
      sliceDonutSolid: 'ct-slice-donut-solid',
      label: 'ct-label'
    },
    // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
    startAngle: 0,
    // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
    total: undefined,
    // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
    donut: false,
    // If specified the donut segments will be drawn as shapes instead of strokes.
    donutSolid: false,
    // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
    // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
    donutWidth: 60,
    // If a label should be shown or not
    showLabel: true,
    // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
    labelOffset: 0,
    // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
    labelPosition: 'inside',
    // An interpolation function for the label value
    labelInterpolationFnc: Chartist.noop,
    // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
    labelDirection: 'neutral',
    // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
    reverseData: false,
    // If true empty values will be ignored to avoid drawing unncessary slices and labels
    ignoreEmptyValues: false
  };

  /**
   * Determines SVG anchor position based on direction and center parameter
   *
   * @param center
   * @param label
   * @param direction
   * @return {string}
   */
  function determineAnchorPosition(center, label, direction) {
    var toTheRight = label.x > center.x;

    if(toTheRight && direction === 'explode' ||
      !toTheRight && direction === 'implode') {
      return 'start';
    } else if(toTheRight && direction === 'implode' ||
      !toTheRight && direction === 'explode') {
      return 'end';
    } else {
      return 'middle';
    }
  }

  /**
   * Creates the pie chart
   *
   * @param options
   */
  function createChart(options) {
    var data = Chartist.normalizeData(this.data);
    var seriesGroups = [],
      labelsGroup,
      chartRect,
      radius,
      labelRadius,
      totalDataSum,
      startAngle = options.startAngle;

    // Create SVG.js draw
    this.svg = Chartist.createSvg(this.container, options.width, options.height,options.donut ? options.classNames.chartDonut : options.classNames.chartPie);
    // Calculate charting rect
    chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
    // Get biggest circle radius possible within chartRect
    radius = Math.min(chartRect.width() / 2, chartRect.height() / 2);
    // Calculate total of all series to get reference value or use total reference from optional options
    totalDataSum = options.total || data.normalized.series.reduce(function(previousValue, currentValue) {
      return previousValue + currentValue;
    }, 0);

    var donutWidth = Chartist.quantity(options.donutWidth);
    if (donutWidth.unit === '%') {
      donutWidth.value *= radius / 100;
    }

    // If this is a donut chart we need to adjust our radius to enable strokes to be drawn inside
    // Unfortunately this is not possible with the current SVG Spec
    // See this proposal for more details: http://lists.w3.org/Archives/Public/www-svg/2003Oct/0000.html
    radius -= options.donut && !options.donutSolid ? donutWidth.value / 2  : 0;

    // If labelPosition is set to `outside` or a donut chart is drawn then the label position is at the radius,
    // if regular pie chart it's half of the radius
    if(options.labelPosition === 'outside' || options.donut && !options.donutSolid) {
      labelRadius = radius;
    } else if(options.labelPosition === 'center') {
      // If labelPosition is center we start with 0 and will later wait for the labelOffset
      labelRadius = 0;
    } else if(options.donutSolid) {
      labelRadius = radius - donutWidth.value / 2;
    } else {
      // Default option is 'inside' where we use half the radius so the label will be placed in the center of the pie
      // slice
      labelRadius = radius / 2;
    }
    // Add the offset to the labelRadius where a negative offset means closed to the center of the chart
    labelRadius += options.labelOffset;

    // Calculate end angle based on total sum and current data value and offset with padding
    var center = {
      x: chartRect.x1 + chartRect.width() / 2,
      y: chartRect.y2 + chartRect.height() / 2
    };

    // Check if there is only one non-zero value in the series array.
    var hasSingleValInSeries = data.raw.series.filter(function(val) {
      return val.hasOwnProperty('value') ? val.value !== 0 : val !== 0;
    }).length === 1;

    // Creating the series groups
    data.raw.series.forEach(function(series, index) {
      seriesGroups[index] = this.svg.elem('g', null, null);
    }.bind(this));
    //if we need to show labels we create the label group now
    if(options.showLabel) {
      labelsGroup = this.svg.elem('g', null, null);
    }

    // Draw the series
    // initialize series groups
    data.raw.series.forEach(function(series, index) {
      // If current value is zero and we are ignoring empty values then skip to next value
      if (data.normalized.series[index] === 0 && options.ignoreEmptyValues) return;

      // If the series is an object and contains a name or meta data we add a custom attribute
      seriesGroups[index].attr({
        'ct:series-name': series.name
      });

      // Use series class from series data or if not set generate one
      seriesGroups[index].addClass([
        options.classNames.series,
        (series.className || options.classNames.series + '-' + Chartist.alphaNumerate(index))
      ].join(' '));

      // If the whole dataset is 0 endAngle should be zero. Can't divide by 0.
      var endAngle = (totalDataSum > 0 ? startAngle + data.normalized.series[index] / totalDataSum * 360 : 0);

      // Use slight offset so there are no transparent hairline issues
      var overlappigStartAngle = Math.max(0, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));

      // If we need to draw the arc for all 360 degrees we need to add a hack where we close the circle
      // with Z and use 359.99 degrees
      if(endAngle - overlappigStartAngle >= 359.99) {
        endAngle = overlappigStartAngle + 359.99;
      }

      var start = Chartist.polarToCartesian(center.x, center.y, radius, overlappigStartAngle),
        end = Chartist.polarToCartesian(center.x, center.y, radius, endAngle);

      var innerStart,
        innerEnd,
        donutSolidRadius;

      // Create a new path element for the pie chart. If this isn't a donut chart we should close the path for a correct stroke
      var path = new Chartist.Svg.Path(!options.donut || options.donutSolid)
        .move(end.x, end.y)
        .arc(radius, radius, 0, endAngle - startAngle > 180, 0, start.x, start.y);

      // If regular pie chart (no donut) we add a line to the center of the circle for completing the pie
      if(!options.donut) {
        path.line(center.x, center.y);
      } else if (options.donutSolid) {
        donutSolidRadius = radius - donutWidth.value;
        innerStart = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));
        innerEnd = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, endAngle);
        path.line(innerStart.x, innerStart.y);
        path.arc(donutSolidRadius, donutSolidRadius, 0, endAngle - startAngle  > 180, 1, innerEnd.x, innerEnd.y);
      }

      // Create the SVG path
      // If this is a donut chart we add the donut class, otherwise just a regular slice
      var pathClassName = options.classNames.slicePie;
      if (options.donut) {
        pathClassName = options.classNames.sliceDonut;
        if (options.donutSolid) {
          pathClassName = options.classNames.sliceDonutSolid;
        }
      }
      var pathElement = seriesGroups[index].elem('path', {
        d: path.stringify()
      }, pathClassName);

      // Adding the pie series value to the path
      pathElement.attr({
        'ct:value': data.normalized.series[index],
        'ct:meta': Chartist.serialize(series.meta)
      });

      // If this is a donut, we add the stroke-width as style attribute
      if(options.donut && !options.donutSolid) {
        pathElement._node.style.strokeWidth = donutWidth.value + 'px';
      }

      // Fire off draw event
      this.eventEmitter.emit('draw', {
        type: 'slice',
        value: data.normalized.series[index],
        totalDataSum: totalDataSum,
        index: index,
        meta: series.meta,
        series: series,
        group: seriesGroups[index],
        element: pathElement,
        path: path.clone(),
        center: center,
        radius: radius,
        startAngle: startAngle,
        endAngle: endAngle
      });

      // If we need to show labels we need to add the label for this slice now
      if(options.showLabel) {
        var labelPosition;
        if(data.raw.series.length === 1) {
          // If we have only 1 series, we can position the label in the center of the pie
          labelPosition = {
            x: center.x,
            y: center.y
          };
        } else {
          // Position at the labelRadius distance from center and between start and end angle
          labelPosition = Chartist.polarToCartesian(
            center.x,
            center.y,
            labelRadius,
            startAngle + (endAngle - startAngle) / 2
          );
        }

        var rawValue;
        if(data.normalized.labels && !Chartist.isFalseyButZero(data.normalized.labels[index])) {
          rawValue = data.normalized.labels[index];
        } else {
          rawValue = data.normalized.series[index];
        }

        var interpolatedValue = options.labelInterpolationFnc(rawValue, index);

        if(interpolatedValue || interpolatedValue === 0) {
          var labelElement = labelsGroup.elem('text', {
            dx: labelPosition.x,
            dy: labelPosition.y,
            'text-anchor': determineAnchorPosition(center, labelPosition, options.labelDirection)
          }, options.classNames.label).text('' + interpolatedValue);

          // Fire off draw event
          this.eventEmitter.emit('draw', {
            type: 'label',
            index: index,
            group: labelsGroup,
            element: labelElement,
            text: '' + interpolatedValue,
            x: labelPosition.x,
            y: labelPosition.y
          });
        }
      }

      // Set next startAngle to current endAngle.
      // (except for last slice)
      startAngle = endAngle;
    }.bind(this));

    this.eventEmitter.emit('created', {
      chartRect: chartRect,
      svg: this.svg,
      options: options
    });
  }

  /**
   * This method creates a new pie chart and returns an object that can be used to redraw the chart.
   *
   * @memberof Chartist.Pie
   * @param {String|Node} query A selector query string or directly a DOM element
   * @param {Object} data The data object in the pie chart needs to have a series property with a one dimensional data array. The values will be normalized against each other and don't necessarily need to be in percentage. The series property can also be an array of value objects that contain a value property and a className property to override the CSS class name for the series group.
   * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
   * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
   * @return {Object} An object with a version and an update method to manually redraw the chart
   *
   * @example
   * // Simple pie chart example with four series
   * new Chartist.Pie('.ct-chart', {
   *   series: [10, 2, 4, 3]
   * });
   *
   * @example
   * // Drawing a donut chart
   * new Chartist.Pie('.ct-chart', {
   *   series: [10, 2, 4, 3]
   * }, {
   *   donut: true
   * });
   *
   * @example
   * // Using donut, startAngle and total to draw a gauge chart
   * new Chartist.Pie('.ct-chart', {
   *   series: [20, 10, 30, 40]
   * }, {
   *   donut: true,
   *   donutWidth: 20,
   *   startAngle: 270,
   *   total: 200
   * });
   *
   * @example
   * // Drawing a pie chart with padding and labels that are outside the pie
   * new Chartist.Pie('.ct-chart', {
   *   series: [20, 10, 30, 40]
   * }, {
   *   chartPadding: 30,
   *   labelOffset: 50,
   *   labelDirection: 'explode'
   * });
   *
   * @example
   * // Overriding the class names for individual series as well as a name and meta data.
   * // The name will be written as ct:series-name attribute and the meta data will be serialized and written
   * // to a ct:meta attribute.
   * new Chartist.Pie('.ct-chart', {
   *   series: [{
   *     value: 20,
   *     name: 'Series 1',
   *     className: 'my-custom-class-one',
   *     meta: 'Meta One'
   *   }, {
   *     value: 10,
   *     name: 'Series 2',
   *     className: 'my-custom-class-two',
   *     meta: 'Meta Two'
   *   }, {
   *     value: 70,
   *     name: 'Series 3',
   *     className: 'my-custom-class-three',
   *     meta: 'Meta Three'
   *   }]
   * });
   */
  function Pie(query, data, options, responsiveOptions) {
    Chartist.Pie.super.constructor.call(this,
      query,
      data,
      defaultOptions,
      Chartist.extend({}, defaultOptions, options),
      responsiveOptions);
  }

  // Creating pie chart type in Chartist namespace
  Chartist.Pie = Chartist.Base.extend({
    constructor: Pie,
    createChart: createChart,
    determineAnchorPosition: determineAnchorPosition
  });

}(window, document, Chartist));

return Chartist;

}));


/***/ }),

/***/ 341:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tmodel_vue__ = __webpack_require__(342);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tmodel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Tmodel_vue__);
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
var _TmodelComponent = function _TmodelComponent() {
  // Create all requested instances
  new Vue({
    el: '#tmodel',
    mixins: [__WEBPACK_IMPORTED_MODULE_0__Tmodel_vue___default.a],

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
    _TmodelComponent();

    console.log('cenas');
  }
};

/***/ }),

/***/ 342:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(343)
/* template */
var __vue_template__ = __webpack_require__(344)
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
Component.options.__file = "resources/assets/js/components/tmodel/Tmodel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11634130", Component.options)
  } else {
    hotAPI.reload("data-v-11634130", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 343:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_3d_model__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue_3d_model___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_vue_3d_model__);
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["default"] = ({
    components: { ModelThree: __WEBPACK_IMPORTED_MODULE_0_vue_3d_model__["ModelThree"] },

    mounted: function mounted() {
        console.log('3d model');
    }
});

/***/ }),

/***/ 344:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [_c("model-three", { attrs: { src: "../models/json/scene.json" } })],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-11634130", module.exports)
  }
}

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__(23)):"function"==typeof define&&define.amd?define(["vue"],e):"object"==typeof exports?exports.Vue3DModel=e(require("vue")):t.Vue3DModel=e(t.Vue)}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return t[i].call(r.exports,r,r.exports,e),r.l=!0,r.exports}var n={};return e.m=t,e.c=n,e.i=function(t){return t},e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=31)}([function(t,e,n){"use strict";function i(){}function r(t,e){this.x=t||0,this.y=e||0}function a(t,e,n,i,o,s,c,h,l,u){Object.defineProperty(this,"id",{value:qo++}),this.uuid=Xo.generateUUID(),this.name="",this.image=void 0!==t?t:a.DEFAULT_IMAGE,this.mipmaps=[],this.mapping=void 0!==e?e:a.DEFAULT_MAPPING,this.wrapS=void 0!==n?n:Za,this.wrapT=void 0!==i?i:Za,this.magFilter=void 0!==o?o:to,this.minFilter=void 0!==s?s:no,this.anisotropy=void 0!==l?l:1,this.format=void 0!==c?c:yo,this.type=void 0!==h?h:io,this.offset=new r(0,0),this.repeat=new r(1,1),this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=void 0!==u?u:Fo,this.version=0,this.onUpdate=null}function o(t,e,n,i){this.x=t||0,this.y=e||0,this.z=n||0,this.w=void 0!==i?i:1}function s(t,e,n){this.uuid=Xo.generateUUID(),this.width=t,this.height=e,this.scissor=new o(0,0,t,e),this.scissorTest=!1,this.viewport=new o(0,0,t,e),n=n||{},void 0===n.minFilter&&(n.minFilter=to),this.texture=new a(void 0,void 0,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.depthBuffer=void 0===n.depthBuffer||n.depthBuffer,this.stencilBuffer=void 0===n.stencilBuffer||n.stencilBuffer,this.depthTexture=void 0!==n.depthTexture?n.depthTexture:null}function c(t,e,n){s.call(this,t,e,n),this.activeCubeFace=0,this.activeMipMapLevel=0}function h(t,e,n,i){this._x=t||0,this._y=e||0,this._z=n||0,this._w=void 0!==i?i:1}function l(t,e,n){this.x=t||0,this.y=e||0,this.z=n||0}function u(){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")}function d(t,e,n,i,r,o,s,c,h,l,u,d){a.call(this,null,o,s,c,h,l,i,r,u,d),this.image={data:t,width:e,height:n},this.magFilter=void 0!==h?h:Qa,this.minFilter=void 0!==l?l:Qa,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}function p(t,e,n,i,r,o,s,c,h,l){t=void 0!==t?t:[],e=void 0!==e?e:ja,a.call(this,t,e,n,i,r,o,s,c,h,l),this.flipY=!1}function f(){this.seq=[],this.map={}}function m(t,e,n){var i=t[0];if(i<=0||i>0)return t;var r=e*n,a=Jo[r];if(void 0===a&&(a=new Float32Array(r),Jo[r]=a),0!==e){i.toArray(a,0);for(var o=1,s=0;o!==e;++o)s+=n,t[o].toArray(a,s)}return a}function v(t,e){var n=Qo[e];void 0===n&&(n=new Int32Array(e),Qo[e]=n);for(var i=0;i!==e;++i)n[i]=t.allocTextureUnit();return n}function g(t,e){t.uniform1f(this.addr,e)}function y(t,e){t.uniform1i(this.addr,e)}function x(t,e){void 0===e.x?t.uniform2fv(this.addr,e):t.uniform2f(this.addr,e.x,e.y)}function b(t,e){void 0!==e.x?t.uniform3f(this.addr,e.x,e.y,e.z):void 0!==e.r?t.uniform3f(this.addr,e.r,e.g,e.b):t.uniform3fv(this.addr,e)}function _(t,e){void 0===e.x?t.uniform4fv(this.addr,e):t.uniform4f(this.addr,e.x,e.y,e.z,e.w)}function w(t,e){t.uniformMatrix2fv(this.addr,!1,e.elements||e)}function M(t,e){void 0===e.elements?t.uniformMatrix3fv(this.addr,!1,e):($o.set(e.elements),t.uniformMatrix3fv(this.addr,!1,$o))}function E(t,e){void 0===e.elements?t.uniformMatrix4fv(this.addr,!1,e):(Ko.set(e.elements),t.uniformMatrix4fv(this.addr,!1,Ko))}function T(t,e,n){var i=n.allocTextureUnit();t.uniform1i(this.addr,i),n.setTexture2D(e||Yo,i)}function S(t,e,n){var i=n.allocTextureUnit();t.uniform1i(this.addr,i),n.setTextureCube(e||Zo,i)}function A(t,e){t.uniform2iv(this.addr,e)}function L(t,e){t.uniform3iv(this.addr,e)}function R(t,e){t.uniform4iv(this.addr,e)}function P(t){switch(t){case 5126:return g;case 35664:return x;case 35665:return b;case 35666:return _;case 35674:return w;case 35675:return M;case 35676:return E;case 35678:case 36198:return T;case 35680:return S;case 5124:case 35670:return y;case 35667:case 35671:return A;case 35668:case 35672:return L;case 35669:case 35673:return R}}function C(t,e){t.uniform1fv(this.addr,e)}function N(t,e){t.uniform1iv(this.addr,e)}function I(t,e){t.uniform2fv(this.addr,m(e,this.size,2))}function O(t,e){t.uniform3fv(this.addr,m(e,this.size,3))}function U(t,e){t.uniform4fv(this.addr,m(e,this.size,4))}function D(t,e){t.uniformMatrix2fv(this.addr,!1,m(e,this.size,4))}function F(t,e){t.uniformMatrix3fv(this.addr,!1,m(e,this.size,9))}function z(t,e){t.uniformMatrix4fv(this.addr,!1,m(e,this.size,16))}function B(t,e,n){var i=e.length,r=v(n,i);t.uniform1iv(this.addr,r);for(var a=0;a!==i;++a)n.setTexture2D(e[a]||Yo,r[a])}function k(t,e,n){var i=e.length,r=v(n,i);t.uniform1iv(this.addr,r);for(var a=0;a!==i;++a)n.setTextureCube(e[a]||Zo,r[a])}function j(t){switch(t){case 5126:return C;case 35664:return I;case 35665:return O;case 35666:return U;case 35674:return D;case 35675:return F;case 35676:return z;case 35678:return B;case 35680:return k;case 5124:case 35670:return N;case 35667:case 35671:return A;case 35668:case 35672:return L;case 35669:case 35673:return R}}function G(t,e,n){this.id=t,this.addr=n,this.setValue=P(e.type)}function V(t,e,n){this.id=t,this.addr=n,this.size=e.size,this.setValue=j(e.type)}function H(t){this.id=t,f.call(this)}function W(t,e){t.seq.push(e),t.map[e.id]=e}function X(t,e,n){var i=t.name,r=i.length;for(ts.lastIndex=0;;){var a=ts.exec(i),o=ts.lastIndex,s=a[1],c="]"===a[2],h=a[3];if(c&&(s|=0),void 0===h||"["===h&&o+2===r){W(n,void 0===h?new G(s,t,e):new V(s,t,e));break}var l=n.map,u=l[s];void 0===u&&(u=new H(s),W(n,u)),n=u}}function q(t,e,n){f.call(this),this.renderer=n;for(var i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS),r=0;r<i;++r){var a=t.getActiveUniform(e,r),o=a.name;X(a,t.getUniformLocation(e,o),this)}}function Y(t,e,n){return void 0===e&&void 0===n?this.set(t):this.setRGB(t,e,n)}function Z(t,e){this.min=void 0!==t?t:new r(1/0,1/0),this.max=void 0!==e?e:new r(-1/0,-1/0)}function J(t,e,n,i,a){function o(){var t=new Float32Array([-1,-1,0,0,1,-1,1,0,1,1,1,1,-1,1,0,1]),i=new Uint16Array([0,1,2,0,2,3]);c=e.createBuffer(),h=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,h),e.bufferData(e.ELEMENT_ARRAY_BUFFER,i,e.STATIC_DRAW),m=e.createTexture(),v=e.createTexture(),n.bindTexture(e.TEXTURE_2D,m),e.texImage2D(e.TEXTURE_2D,0,e.RGB,16,16,0,e.RGB,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),n.bindTexture(e.TEXTURE_2D,v),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,16,16,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MAG_FILTER,e.NEAREST),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.NEAREST),u={vertexShader:["uniform lowp int renderType;","uniform vec3 screenPosition;","uniform vec2 scale;","uniform float rotation;","uniform sampler2D occlusionMap;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","varying float vVisibility;","void main() {","vUV = uv;","vec2 pos = position;","if ( renderType == 2 ) {","vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );","visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );","visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );","visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );","vVisibility =        visibility.r / 9.0;","vVisibility *= 1.0 - visibility.g / 9.0;","vVisibility *=       visibility.b / 9.0;","vVisibility *= 1.0 - visibility.a / 9.0;","pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;","pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;","}","gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );","}"].join("\n"),fragmentShader:["uniform lowp int renderType;","uniform sampler2D map;","uniform float opacity;","uniform vec3 color;","varying vec2 vUV;","varying float vVisibility;","void main() {","if ( renderType == 0 ) {","gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );","} else if ( renderType == 1 ) {","gl_FragColor = texture2D( map, vUV );","} else {","vec4 texture = texture2D( map, vUV );","texture.a *= opacity * vVisibility;","gl_FragColor = texture;","gl_FragColor.rgb *= color;","}","}"].join("\n")},d=s(u),p={vertex:e.getAttribLocation(d,"position"),uv:e.getAttribLocation(d,"uv")},f={renderType:e.getUniformLocation(d,"renderType"),map:e.getUniformLocation(d,"map"),occlusionMap:e.getUniformLocation(d,"occlusionMap"),opacity:e.getUniformLocation(d,"opacity"),color:e.getUniformLocation(d,"color"),scale:e.getUniformLocation(d,"scale"),rotation:e.getUniformLocation(d,"rotation"),screenPosition:e.getUniformLocation(d,"screenPosition")}}function s(t){var n=e.createProgram(),i=e.createShader(e.FRAGMENT_SHADER),r=e.createShader(e.VERTEX_SHADER),o="precision "+a.precision+" float;\n";return e.shaderSource(i,o+t.fragmentShader),e.shaderSource(r,o+t.vertexShader),e.compileShader(i),e.compileShader(r),e.attachShader(n,i),e.attachShader(n,r),e.linkProgram(n),n}var c,h,u,d,p,f,m,v;this.render=function(t,a,s,u){if(0!==t.length){var g=new l,y=u.w/u.z,x=.5*u.z,b=.5*u.w,_=16/u.w,w=new r(_*y,_),M=new l(1,1,0),E=new r(1,1),T=new Z;T.min.set(u.x,u.y),T.max.set(u.x+(u.z-16),u.y+(u.w-16)),void 0===d&&o(),n.useProgram(d),n.initAttributes(),n.enableAttribute(p.vertex),n.enableAttribute(p.uv),n.disableUnusedAttributes(),e.uniform1i(f.occlusionMap,0),e.uniform1i(f.map,1),e.bindBuffer(e.ARRAY_BUFFER,c),e.vertexAttribPointer(p.vertex,2,e.FLOAT,!1,16,0),e.vertexAttribPointer(p.uv,2,e.FLOAT,!1,16,8),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,h),n.disable(e.CULL_FACE),n.buffers.depth.setMask(!1);for(var S=0,A=t.length;S<A;S++){_=16/u.w,w.set(_*y,_);var L=t[S];if(g.set(L.matrixWorld.elements[12],L.matrixWorld.elements[13],L.matrixWorld.elements[14]),g.applyMatrix4(s.matrixWorldInverse),g.applyMatrix4(s.projectionMatrix),M.copy(g),E.x=u.x+M.x*x+x-8,E.y=u.y+M.y*b+b-8,!0===T.containsPoint(E)){n.activeTexture(e.TEXTURE0),n.bindTexture(e.TEXTURE_2D,null),n.activeTexture(e.TEXTURE1),n.bindTexture(e.TEXTURE_2D,m),e.copyTexImage2D(e.TEXTURE_2D,0,e.RGB,E.x,E.y,16,16,0),e.uniform1i(f.renderType,0),e.uniform2f(f.scale,w.x,w.y),e.uniform3f(f.screenPosition,M.x,M.y,M.z),n.disable(e.BLEND),n.enable(e.DEPTH_TEST),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0),n.activeTexture(e.TEXTURE0),n.bindTexture(e.TEXTURE_2D,v),e.copyTexImage2D(e.TEXTURE_2D,0,e.RGBA,E.x,E.y,16,16,0),e.uniform1i(f.renderType,1),n.disable(e.DEPTH_TEST),n.activeTexture(e.TEXTURE1),n.bindTexture(e.TEXTURE_2D,m),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0),L.positionScreen.copy(M),L.customUpdateCallback?L.customUpdateCallback(L):L.updateLensFlares(),e.uniform1i(f.renderType,2),n.enable(e.BLEND);for(var R=0,P=L.lensFlares.length;R<P;R++){var C=L.lensFlares[R];C.opacity>.001&&C.scale>.001&&(M.x=C.x,M.y=C.y,M.z=C.z,_=C.size*C.scale/u.w,w.x=_*y,w.y=_,e.uniform3f(f.screenPosition,M.x,M.y,M.z),e.uniform2f(f.scale,w.x,w.y),e.uniform1f(f.rotation,C.rotation),e.uniform1f(f.opacity,C.opacity),e.uniform3f(f.color,C.color.r,C.color.g,C.color.b),n.setBlending(C.blending,C.blendEquation,C.blendSrc,C.blendDst),i.setTexture2D(C.texture,1),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0))}}}n.enable(e.CULL_FACE),n.enable(e.DEPTH_TEST),n.buffers.depth.setMask(!0),n.reset()}}}function Q(t,e,n,i,r,o,s,c,h){a.call(this,t,e,n,i,r,o,s,c,h),this.needsUpdate=!0}function K(t,e,n,i,r){function a(){var t=new Float32Array([-.5,-.5,0,0,.5,-.5,1,0,.5,.5,1,1,-.5,.5,0,1]),n=new Uint16Array([0,1,2,0,2,3]);c=e.createBuffer(),u=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,c),e.bufferData(e.ARRAY_BUFFER,t,e.STATIC_DRAW),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,u),e.bufferData(e.ELEMENT_ARRAY_BUFFER,n,e.STATIC_DRAW),d=o(),p={position:e.getAttribLocation(d,"position"),uv:e.getAttribLocation(d,"uv")},f={uvOffset:e.getUniformLocation(d,"uvOffset"),uvScale:e.getUniformLocation(d,"uvScale"),rotation:e.getUniformLocation(d,"rotation"),scale:e.getUniformLocation(d,"scale"),color:e.getUniformLocation(d,"color"),map:e.getUniformLocation(d,"map"),opacity:e.getUniformLocation(d,"opacity"),modelViewMatrix:e.getUniformLocation(d,"modelViewMatrix"),projectionMatrix:e.getUniformLocation(d,"projectionMatrix"),fogType:e.getUniformLocation(d,"fogType"),fogDensity:e.getUniformLocation(d,"fogDensity"),fogNear:e.getUniformLocation(d,"fogNear"),fogFar:e.getUniformLocation(d,"fogFar"),fogColor:e.getUniformLocation(d,"fogColor"),alphaTest:e.getUniformLocation(d,"alphaTest")};var i=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");i.width=8,i.height=8;var r=i.getContext("2d");r.fillStyle="white",r.fillRect(0,0,8,8),m=new Q(i)}function o(){var t=e.createProgram(),n=e.createShader(e.VERTEX_SHADER),i=e.createShader(e.FRAGMENT_SHADER);return e.shaderSource(n,["precision "+r.precision+" float;","#define SHADER_NAME SpriteMaterial","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform float rotation;","uniform vec2 scale;","uniform vec2 uvOffset;","uniform vec2 uvScale;","attribute vec2 position;","attribute vec2 uv;","varying vec2 vUV;","void main() {","vUV = uvOffset + uv * uvScale;","vec2 alignedPosition = position * scale;","vec2 rotatedPosition;","rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;","rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;","vec4 finalPosition;","finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );","finalPosition.xy += rotatedPosition;","finalPosition = projectionMatrix * finalPosition;","gl_Position = finalPosition;","}"].join("\n")),e.shaderSource(i,["precision "+r.precision+" float;","#define SHADER_NAME SpriteMaterial","uniform vec3 color;","uniform sampler2D map;","uniform float opacity;","uniform int fogType;","uniform vec3 fogColor;","uniform float fogDensity;","uniform float fogNear;","uniform float fogFar;","uniform float alphaTest;","varying vec2 vUV;","void main() {","vec4 texture = texture2D( map, vUV );","if ( texture.a < alphaTest ) discard;","gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );","if ( fogType > 0 ) {","float depth = gl_FragCoord.z / gl_FragCoord.w;","float fogFactor = 0.0;","if ( fogType == 1 ) {","fogFactor = smoothstep( fogNear, fogFar, depth );","} else {","const float LOG2 = 1.442695;","fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );","fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );","}","gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );","}","}"].join("\n")),e.compileShader(n),e.compileShader(i),e.attachShader(t,n),e.attachShader(t,i),e.linkProgram(t),t}function s(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:e.id-t.id}var c,u,d,p,f,m,v=new l,g=new h,y=new l;this.render=function(r,o,h){if(0!==r.length){void 0===d&&a(),n.useProgram(d),n.initAttributes(),n.enableAttribute(p.position),n.enableAttribute(p.uv),n.disableUnusedAttributes(),n.disable(e.CULL_FACE),n.enable(e.BLEND),e.bindBuffer(e.ARRAY_BUFFER,c),e.vertexAttribPointer(p.position,2,e.FLOAT,!1,16,0),e.vertexAttribPointer(p.uv,2,e.FLOAT,!1,16,8),e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,u),e.uniformMatrix4fv(f.projectionMatrix,!1,h.projectionMatrix.elements),n.activeTexture(e.TEXTURE0),e.uniform1i(f.map,0);var l=0,x=0,b=o.fog;b?(e.uniform3f(f.fogColor,b.color.r,b.color.g,b.color.b),b.isFog?(e.uniform1f(f.fogNear,b.near),e.uniform1f(f.fogFar,b.far),e.uniform1i(f.fogType,1),l=1,x=1):b.isFogExp2&&(e.uniform1f(f.fogDensity,b.density),e.uniform1i(f.fogType,2),l=2,x=2)):(e.uniform1i(f.fogType,0),l=0,x=0);for(var _=0,w=r.length;_<w;_++){var M=r[_];M.modelViewMatrix.multiplyMatrices(h.matrixWorldInverse,M.matrixWorld),M.z=-M.modelViewMatrix.elements[14]}r.sort(s);for(var E=[],_=0,w=r.length;_<w;_++){var M=r[_],T=M.material;if(!1!==T.visible){M.onBeforeRender(t,o,h,void 0,T,void 0),e.uniform1f(f.alphaTest,T.alphaTest),e.uniformMatrix4fv(f.modelViewMatrix,!1,M.modelViewMatrix.elements),M.matrixWorld.decompose(v,g,y),E[0]=y.x,E[1]=y.y;var S=0;o.fog&&T.fog&&(S=x),l!==S&&(e.uniform1i(f.fogType,S),l=S),null!==T.map?(e.uniform2f(f.uvOffset,T.map.offset.x,T.map.offset.y),e.uniform2f(f.uvScale,T.map.repeat.x,T.map.repeat.y)):(e.uniform2f(f.uvOffset,0,0),e.uniform2f(f.uvScale,1,1)),e.uniform1f(f.opacity,T.opacity),e.uniform3f(f.color,T.color.r,T.color.g,T.color.b),e.uniform1f(f.rotation,T.rotation),e.uniform2fv(f.scale,E),n.setBlending(T.blending,T.blendEquation,T.blendSrc,T.blendDst,T.blendEquationAlpha,T.blendSrcAlpha,T.blendDstAlpha,T.premultipliedAlpha),n.buffers.depth.setTest(T.depthTest),n.buffers.depth.setMask(T.depthWrite),i.setTexture2D(T.map||m,0),e.drawElements(e.TRIANGLES,6,e.UNSIGNED_SHORT,0),M.onAfterRender(t,o,h,void 0,T,void 0)}}n.enable(e.CULL_FACE),n.reset()}}}function $(){Object.defineProperty(this,"id",{value:os++}),this.uuid=Xo.generateUUID(),this.name="",this.type="Material",this.fog=!0,this.lights=!0,this.blending=ra,this.side=Zr,this.flatShading=!1,this.vertexColors=ta,this.opacity=1,this.transparent=!1,this.blendSrc=ya,this.blendDst=xa,this.blendEquation=ha,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=La,this.depthTest=!0,this.depthWrite=!0,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaTest=0,this.premultipliedAlpha=!1,this.overdraw=0,this.visible=!0,this.userData={},this.needsUpdate=!0}function tt(t){$.call(this),this.type="ShaderMaterial",this.defines={},this.uniforms={},this.vertexShader="void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",this.fragmentShader="void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,void 0!==t&&(void 0!==t.attributes&&console.error("THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead."),this.setValues(t))}function et(t){$.call(this),this.type="MeshDepthMaterial",this.depthPacking=Ho,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.setValues(t)}function nt(t){$.call(this),this.type="MeshDistanceMaterial",this.referencePosition=new l,this.nearDistance=1,this.farDistance=1e3,this.skinning=!1,this.morphTargets=!1,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.fog=!1,this.lights=!1,this.setValues(t)}function it(t,e){this.min=void 0!==t?t:new l(1/0,1/0,1/0),this.max=void 0!==e?e:new l(-1/0,-1/0,-1/0)}function rt(t,e){this.center=void 0!==t?t:new l,this.radius=void 0!==e?e:0}function at(){this.elements=[1,0,0,0,1,0,0,0,1],arguments.length>0&&console.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")}function ot(t,e){this.normal=void 0!==t?t:new l(1,0,0),this.constant=void 0!==e?e:0}function st(t,e,n,i,r,a){this.planes=[void 0!==t?t:new ot,void 0!==e?e:new ot,void 0!==n?n:new ot,void 0!==i?i:new ot,void 0!==r?r:new ot,void 0!==a?a:new ot]}function ct(t,e,n){function i(e,n,i,r,a,o){var s=e.geometry,c=null,h=x,l=e.customDepthMaterial;if(i&&(h=b,l=e.customDistanceMaterial),l)c=l;else{var u=!1;n.morphTargets&&(s&&s.isBufferGeometry?u=s.morphAttributes&&s.morphAttributes.position&&s.morphAttributes.position.length>0:s&&s.isGeometry&&(u=s.morphTargets&&s.morphTargets.length>0)),e.isSkinnedMesh&&!1===n.skinning&&console.warn("THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:",e);var d=e.isSkinnedMesh&&n.skinning,p=0;u&&(p|=v),d&&(p|=g),c=h[p]}if(t.localClippingEnabled&&!0===n.clipShadows&&0!==n.clippingPlanes.length){var f=c.uuid,m=n.uuid,y=_[f];void 0===y&&(y={},_[f]=y);var w=y[m];void 0===w&&(w=c.clone(),y[m]=w),c=w}c.visible=n.visible,c.wireframe=n.wireframe;var M=n.side;return P.renderSingleSided&&M==Qr&&(M=Zr),P.renderReverseSided&&(M===Zr?M=Jr:M===Jr&&(M=Zr)),c.side=M,c.clipShadows=n.clipShadows,c.clippingPlanes=n.clippingPlanes,c.clipIntersection=n.clipIntersection,c.wireframeLinewidth=n.wireframeLinewidth,c.linewidth=n.linewidth,i&&c.isMeshDistanceMaterial&&(c.referencePosition.copy(r),c.nearDistance=a,c.farDistance=o),c}function a(n,r,o,s){if(!1!==n.visible){if(n.layers.test(r.layers)&&(n.isMesh||n.isLine||n.isPoints)&&n.castShadow&&(!n.frustumCulled||c.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(o.matrixWorldInverse,n.matrixWorld);var h=e.update(n),l=n.material;if(Array.isArray(l))for(var u=h.groups,d=0,p=u.length;d<p;d++){var f=u[d],v=l[f.materialIndex];if(v&&v.visible){var g=i(n,v,s,m,o.near,o.far);t.renderBufferDirect(o,null,h,g,n,f)}}else if(l.visible){var g=i(n,l,s,m,o.near,o.far);t.renderBufferDirect(o,null,h,g,n,null)}}for(var y=n.children,x=0,b=y.length;x<b;x++)a(y[x],r,o,s)}}for(var c=new st,h=new u,d=new r,p=new r(n,n),f=new l,m=new l,v=1,g=2,y=1+(v|g),x=new Array(y),b=new Array(y),_={},w=[new l(1,0,0),new l(-1,0,0),new l(0,0,1),new l(0,0,-1),new l(0,1,0),new l(0,-1,0)],M=[new l(0,1,0),new l(0,1,0),new l(0,1,0),new l(0,1,0),new l(0,0,1),new l(0,0,-1)],E=[new o,new o,new o,new o,new o,new o],T=0;T!==y;++T){var S=0!=(T&v),A=0!=(T&g),L=new et({depthPacking:Wo,morphTargets:S,skinning:A});x[T]=L;var R=new nt({morphTargets:S,skinning:A});b[T]=R}var P=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=qr,this.renderReverseSided=!0,this.renderSingleSided=!0,this.render=function(e,n,i){if(!1!==P.enabled&&(!1!==P.autoUpdate||!1!==P.needsUpdate)&&0!==e.length){var r=t.context,o=t.state;o.disable(r.BLEND),o.buffers.color.setClear(1,1,1,1),o.buffers.depth.setTest(!0),o.setScissorTest(!1);for(var l,u=0,v=e.length;u<v;u++){var g=e[u],y=g.shadow,x=g&&g.isPointLight;if(void 0!==y){var b=y.camera;if(d.copy(y.mapSize),d.min(p),x){var _=d.x,T=d.y;E[0].set(2*_,T,_,T),E[1].set(0,T,_,T),E[2].set(3*_,T,_,T),E[3].set(_,T,_,T),E[4].set(3*_,0,_,T),E[5].set(_,0,_,T),d.x*=4,d.y*=2}if(null===y.map){var S={minFilter:Qa,magFilter:Qa,format:yo};y.map=new s(d.x,d.y,S),y.map.texture.name=g.name+".shadowMap",b.updateProjectionMatrix()}y.isSpotLightShadow&&y.update(g);var A=y.map,L=y.matrix;m.setFromMatrixPosition(g.matrixWorld),b.position.copy(m),x?(l=6,L.makeTranslation(-m.x,-m.y,-m.z)):(l=1,f.setFromMatrixPosition(g.target.matrixWorld),b.lookAt(f),b.updateMatrixWorld(),L.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),L.multiply(b.projectionMatrix),L.multiply(b.matrixWorldInverse)),t.setRenderTarget(A),t.clear();for(var R=0;R<l;R++){if(x){f.copy(b.position),f.add(w[R]),b.up.copy(M[R]),b.lookAt(f),b.updateMatrixWorld();var C=E[R];o.viewport(C)}h.multiplyMatrices(b.projectionMatrix,b.matrixWorldInverse),c.setFromMatrix(h),a(n,i,b,x)}}else console.warn("THREE.WebGLShadowMap:",g,"has no shadow.")}P.needsUpdate=!1}}}function ht(t){function e(e,n){var i=e.array,r=e.dynamic?t.DYNAMIC_DRAW:t.STATIC_DRAW,a=t.createBuffer();t.bindBuffer(n,a),t.bufferData(n,i,r),e.onUploadCallback();var o=t.FLOAT;return i instanceof Float32Array?o=t.FLOAT:i instanceof Float64Array?console.warn("THREE.WebGLAttributes: Unsupported data buffer format: Float64Array."):i instanceof Uint16Array?o=t.UNSIGNED_SHORT:i instanceof Int16Array?o=t.SHORT:i instanceof Uint32Array?o=t.UNSIGNED_INT:i instanceof Int32Array?o=t.INT:i instanceof Int8Array?o=t.BYTE:i instanceof Uint8Array&&(o=t.UNSIGNED_BYTE),{buffer:a,type:o,bytesPerElement:i.BYTES_PER_ELEMENT,version:e.version}}function n(e,n,i){var r=n.array,a=n.updateRange;t.bindBuffer(i,e),!1===n.dynamic?t.bufferData(i,r,t.STATIC_DRAW):-1===a.count?t.bufferSubData(i,0,r):0===a.count?console.error("THREE.WebGLObjects.updateBuffer: dynamic THREE.BufferAttribute marked as needsUpdate but updateRange.count is 0, ensure you are using set methods or updating manually."):(t.bufferSubData(i,a.offset*r.BYTES_PER_ELEMENT,r.subarray(a.offset,a.offset+a.count)),a.count=-1)}function i(t){return t.isInterleavedBufferAttribute&&(t=t.data),o[t.uuid]}function r(e){e.isInterleavedBufferAttribute&&(e=e.data);var n=o[e.uuid];n&&(t.deleteBuffer(n.buffer),delete o[e.uuid])}function a(t,i){t.isInterleavedBufferAttribute&&(t=t.data);var r=o[t.uuid];void 0===r?o[t.uuid]=e(t,i):r.version<t.version&&(n(r.buffer,t,i),r.version=t.version)}var o={};return{get:i,remove:r,update:a}}function lt(t,e,n,i){this._x=t||0,this._y=e||0,this._z=n||0,this._order=i||lt.DefaultOrder}function ut(){this.mask=1}function dt(){function t(){r.setFromEuler(i,!1)}function e(){i.setFromQuaternion(r,void 0,!1)}Object.defineProperty(this,"id",{value:ss++}),this.uuid=Xo.generateUUID(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=dt.DefaultUp.clone();var n=new l,i=new lt,r=new h,a=new l(1,1,1);i.onChange(t),r.onChange(e),Object.defineProperties(this,{position:{enumerable:!0,value:n},rotation:{enumerable:!0,value:i},quaternion:{enumerable:!0,value:r},scale:{enumerable:!0,value:a},modelViewMatrix:{value:new u},normalMatrix:{value:new at}}),this.matrix=new u,this.matrixWorld=new u,this.matrixAutoUpdate=dt.DefaultMatrixAutoUpdate,this.matrixWorldNeedsUpdate=!1,this.layers=new ut,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.userData={}}function pt(){dt.call(this),this.type="Camera",this.matrixWorldInverse=new u,this.projectionMatrix=new u}function ft(t,e,n,i,r,a){pt.call(this),this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=void 0!==r?r:.1,this.far=void 0!==a?a:2e3,this.updateProjectionMatrix()}function mt(t,e,n,i){pt.call(this),this.type="PerspectiveCamera",this.fov=void 0!==t?t:50,this.zoom=1,this.near=void 0!==n?n:.1,this.far=void 0!==i?i:2e3,this.focus=10,this.aspect=void 0!==e?e:1,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}function vt(t,e,n,i,r,a){this.a=t,this.b=e,this.c=n,this.normal=i&&i.isVector3?i:new l,this.vertexNormals=Array.isArray(i)?i:[],this.color=r&&r.isColor?r:new Y,this.vertexColors=Array.isArray(r)?r:[],this.materialIndex=void 0!==a?a:0}function gt(){return cs++}function yt(){Object.defineProperty(this,"id",{value:gt()}),this.uuid=Xo.generateUUID(),this.name="",this.type="Geometry",this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.elementsNeedUpdate=!1,this.verticesNeedUpdate=!1,this.uvsNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.lineDistancesNeedUpdate=!1,this.groupsNeedUpdate=!1}function xt(t,e,n){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.uuid=Xo.generateUUID(),this.name="",this.array=t,this.itemSize=e,this.count=void 0!==t?t.length/e:0,this.normalized=!0===n,this.dynamic=!1,this.updateRange={offset:0,count:-1},this.onUploadCallback=function(){},this.version=0}function bt(t,e){xt.call(this,new Int8Array(t),e)}function _t(t,e){xt.call(this,new Uint8Array(t),e)}function wt(t,e){xt.call(this,new Uint8ClampedArray(t),e)}function Mt(t,e){xt.call(this,new Int16Array(t),e)}function Et(t,e){xt.call(this,new Uint16Array(t),e)}function Tt(t,e){xt.call(this,new Int32Array(t),e)}function St(t,e){xt.call(this,new Uint32Array(t),e)}function At(t,e){xt.call(this,new Float32Array(t),e)}function Lt(t,e){xt.call(this,new Float64Array(t),e)}function Rt(){this.indices=[],this.vertices=[],this.normals=[],this.colors=[],this.uvs=[],this.uvs2=[],this.groups=[],this.morphTargets={},this.skinWeights=[],this.skinIndices=[],this.boundingBox=null,this.boundingSphere=null,this.verticesNeedUpdate=!1,this.normalsNeedUpdate=!1,this.colorsNeedUpdate=!1,this.uvsNeedUpdate=!1,this.groupsNeedUpdate=!1}function Pt(t){if(0===t.length)return-1/0;for(var e=t[0],n=1,i=t.length;n<i;++n)t[n]>e&&(e=t[n]);return e}function Ct(){Object.defineProperty(this,"id",{value:gt()}),this.uuid=Xo.generateUUID(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0}}function Nt(t,e,n,i,r,a){yt.call(this),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a},this.fromBufferGeometry(new It(t,e,n,i,r,a)),this.mergeVertices()}function It(t,e,n,i,r,a){function o(t,e,n,i,r,a,o,m,v,g,y){var x,b,_=a/v,w=o/g,M=a/2,E=o/2,T=m/2,S=v+1,A=g+1,L=0,R=0,P=new l;for(b=0;b<A;b++){var C=b*w-E;for(x=0;x<S;x++){var N=x*_-M;P[t]=N*i,P[e]=C*r,P[n]=T,h.push(P.x,P.y,P.z),P[t]=0,P[e]=0,P[n]=m>0?1:-1,u.push(P.x,P.y,P.z),d.push(x/v),d.push(1-b/g),L+=1}}for(b=0;b<g;b++)for(x=0;x<v;x++){var I=p+x+S*b,O=p+x+S*(b+1),U=p+(x+1)+S*(b+1),D=p+(x+1)+S*b;c.push(I,O,D),c.push(O,U,D),R+=6}s.addGroup(f,R,y),f+=R,p+=L}Ct.call(this),this.type="BoxBufferGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};var s=this;i=Math.floor(i)||1,r=Math.floor(r)||1,a=Math.floor(a)||1;var c=[],h=[],u=[],d=[],p=0,f=0;o("z","y","x",-1,-1,n,e,t,a,r,0),o("z","y","x",1,-1,n,e,-t,a,r,1),o("x","z","y",1,1,t,n,e,i,a,2),o("x","z","y",1,-1,t,n,-e,i,a,3),o("x","y","z",1,-1,t,e,n,i,r,4),o("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.addAttribute("position",new At(h,3)),this.addAttribute("normal",new At(u,3)),this.addAttribute("uv",new At(d,2))}function Ot(t,e,n,i){yt.call(this),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i},this.fromBufferGeometry(new Ut(t,e,n,i)),this.mergeVertices()}function Ut(t,e,n,i){Ct.call(this),this.type="PlaneBufferGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};var r,a,o=t/2,s=e/2,c=Math.floor(n)||1,h=Math.floor(i)||1,l=c+1,u=h+1,d=t/c,p=e/h,f=[],m=[],v=[],g=[];for(a=0;a<u;a++){var y=a*p-s;for(r=0;r<l;r++){var x=r*d-o;m.push(x,-y,0),v.push(0,0,1),g.push(r/c),g.push(1-a/h)}}for(a=0;a<h;a++)for(r=0;r<c;r++){var b=r+l*a,_=r+l*(a+1),w=r+1+l*(a+1),M=r+1+l*a;f.push(b,_,M),f.push(_,w,M)}this.setIndex(f),this.addAttribute("position",new At(m,3)),this.addAttribute("normal",new At(v,3)),this.addAttribute("uv",new At(g,2))}function Dt(t){$.call(this),this.type="MeshBasicMaterial",this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.lights=!1,this.setValues(t)}function Ft(t,e){this.origin=void 0!==t?t:new l,this.direction=void 0!==e?e:new l}function zt(t,e){this.start=void 0!==t?t:new l,this.end=void 0!==e?e:new l}function Bt(t,e,n){this.a=void 0!==t?t:new l,this.b=void 0!==e?e:new l,this.c=void 0!==n?n:new l}function kt(t,e){dt.call(this),this.type="Mesh",this.geometry=void 0!==t?t:new Ct,this.material=void 0!==e?e:new Dt({color:16777215*Math.random()}),this.drawMode=Oo,this.updateMorphTargets()}function jt(t,e,n,i){function r(e,i,r,u){var d=i.background;null===d?a(h,l):d&&d.isColor&&(a(d,1),u=!0),(t.autoClear||u)&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),d&&d.isCubeTexture?(void 0===c&&(c=new kt(new It(1,1,1),new tt({uniforms:as.cube.uniforms,vertexShader:as.cube.vertexShader,fragmentShader:as.cube.fragmentShader,side:Jr,depthTest:!0,depthWrite:!1,polygonOffset:!0,fog:!1})),c.geometry.removeAttribute("normal"),c.geometry.removeAttribute("uv"),c.onBeforeRender=function(t,e,n){var i=n.far;this.matrixWorld.makeScale(i,i,i),this.matrixWorld.copyPosition(n.matrixWorld),this.material.polygonOffsetUnits=10*i},n.update(c.geometry)),c.material.uniforms.tCube.value=d,e.push(c,c.geometry,c.material,0,null)):d&&d.isTexture&&(void 0===o&&(o=new ft(-1,1,1,-1,0,1),s=new kt(new Ut(2,2),new Dt({depthTest:!1,depthWrite:!1,fog:!1})),n.update(s.geometry)),s.material.map=d,t.renderBufferDirect(o,null,s.geometry,s.material,s,null))}function a(t,n){e.buffers.color.setClear(t.r,t.g,t.b,n,i)}var o,s,c,h=new Y(0),l=0;return{getClearColor:function(){return h},setClearColor:function(t,e){h.set(t),l=void 0!==e?e:1,a(h,l)},getClearAlpha:function(){return l},setClearAlpha:function(t){l=t,a(h,l)},render:r}}function Gt(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.program&&e.program&&t.program!==e.program?t.program.id-e.program.id:t.material.id!==e.material.id?t.material.id-e.material.id:t.z!==e.z?t.z-e.z:t.id-e.id}function Vt(t,e){return t.renderOrder!==e.renderOrder?t.renderOrder-e.renderOrder:t.z!==e.z?e.z-t.z:t.id-e.id}function Ht(){function t(){r=0,a.length=0,o.length=0}function e(t,e,n,s,c){var h=i[r];void 0===h?(h={id:t.id,object:t,geometry:e,material:n,program:n.program,renderOrder:t.renderOrder,z:s,group:c},i[r]=h):(h.id=t.id,h.object=t,h.geometry=e,h.material=n,h.program=n.program,h.renderOrder=t.renderOrder,h.z=s,h.group=c),(!0===n.transparent?o:a).push(h),r++}function n(){a.length>1&&a.sort(Gt),o.length>1&&o.sort(Vt)}var i=[],r=0,a=[],o=[];return{opaque:a,transparent:o,init:t,push:e,sort:n}}function Wt(){function t(t,e){var i=t.id+","+e.id,r=n[i];return void 0===r&&(r=new Ht,n[i]=r),r}function e(){n={}}var n={};return{get:t,dispose:e}}function Xt(t,e){return Math.abs(e[1])-Math.abs(t[1])}function qt(t){function e(e,r,a,o){var s=e.morphTargetInfluences,c=s.length,h=n[r.id];if(void 0===h){h=[];for(var l=0;l<c;l++)h[l]=[l,0];n[r.id]=h}for(var u=a.morphTargets&&r.morphAttributes.position,d=a.morphNormals&&r.morphAttributes.normal,l=0;l<c;l++){var p=h[l];0!==p[1]&&(u&&r.removeAttribute("morphTarget"+l),d&&r.removeAttribute("morphNormal"+l))}for(var l=0;l<c;l++){var p=h[l];p[0]=l,p[1]=s[l]}h.sort(Xt);for(var l=0;l<8;l++){var p=h[l];if(p){var f=p[0],m=p[1];if(m){u&&r.addAttribute("morphTarget"+l,u[f]),d&&r.addAttribute("morphNormal"+l,d[f]),i[l]=m;continue}}i[l]=0}o.getUniforms().setValue(t,"morphTargetInfluences",i)}var n={},i=new Float32Array(8);return{update:e}}function Yt(t,e,n){function i(t){s=t}function r(t){c=t.type,h=t.bytesPerElement}function a(e,i){t.drawElements(s,i,c,e*h),n.calls++,n.vertices+=i,s===t.TRIANGLES?n.faces+=i/3:s===t.POINTS&&(n.points+=i)}function o(i,r,a){var o=e.get("ANGLE_instanced_arrays");if(null===o)return void console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");o.drawElementsInstancedANGLE(s,a,c,r*h,i.maxInstancedCount),n.calls++,n.vertices+=a*i.maxInstancedCount,s===t.TRIANGLES?n.faces+=i.maxInstancedCount*a/3:s===t.POINTS&&(n.points+=i.maxInstancedCount*a)}var s,c,h;this.setMode=i,this.setIndex=r,this.render=a,this.renderInstances=o}function Zt(t,e,n){function i(t){o=t}function r(e,i){t.drawArrays(o,e,i),n.calls++,n.vertices+=i,o===t.TRIANGLES?n.faces+=i/3:o===t.POINTS&&(n.points+=i)}function a(i,r,a){var s=e.get("ANGLE_instanced_arrays");if(null===s)return void console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");var c=i.attributes.position;c.isInterleavedBufferAttribute?(a=c.data.count,s.drawArraysInstancedANGLE(o,0,a,i.maxInstancedCount)):s.drawArraysInstancedANGLE(o,r,a,i.maxInstancedCount),n.calls++,n.vertices+=a*i.maxInstancedCount,o===t.TRIANGLES?n.faces+=i.maxInstancedCount*a/3:o===t.POINTS&&(n.points+=i.maxInstancedCount*a)}var o;this.setMode=i,this.render=r,this.renderInstances=a}function Jt(t,e,n){function i(t){var r=t.target,a=s[r.id];null!==a.index&&e.remove(a.index);for(var o in a.attributes)e.remove(a.attributes[o]);r.removeEventListener("dispose",i),delete s[r.id];var h=c[r.id];h&&(e.remove(h),delete c[r.id]),h=c[a.id],h&&(e.remove(h),delete c[a.id]),n.geometries--}function r(t,e){var r=s[e.id];return r||(e.addEventListener("dispose",i),e.isBufferGeometry?r=e:e.isGeometry&&(void 0===e._bufferGeometry&&(e._bufferGeometry=(new Ct).setFromObject(t)),r=e._bufferGeometry),s[e.id]=r,n.geometries++,r)}function a(n){var i=n.index,r=n.attributes;null!==i&&e.update(i,t.ELEMENT_ARRAY_BUFFER);for(var a in r)e.update(r[a],t.ARRAY_BUFFER);var o=n.morphAttributes;for(var a in o)for(var s=o[a],c=0,h=s.length;c<h;c++)e.update(s[c],t.ARRAY_BUFFER)}function o(n){var i=c[n.id];if(i)return i;var r=[],a=n.index,o=n.attributes;if(null!==a)for(var s=a.array,h=0,l=s.length;h<l;h+=3){var u=s[h+0],d=s[h+1],p=s[h+2];r.push(u,d,d,p,p,u)}else for(var s=o.position.array,h=0,l=s.length/3-1;h<l;h+=3){var u=h+0,d=h+1,p=h+2;r.push(u,d,d,p,p,u)}return i=new(Pt(r)>65535?St:Et)(r,1),e.update(i,t.ELEMENT_ARRAY_BUFFER),c[n.id]=i,i}var s={},c={};return{get:r,update:a,getWireframeAttribute:o}}function Qt(){var t={};return{get:function(e){if(void 0!==t[e.id])return t[e.id];var n;switch(e.type){case"DirectionalLight":n={direction:new l,color:new Y,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new r};break;case"SpotLight":n={position:new l,direction:new l,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new r};break;case"PointLight":n={position:new l,color:new Y,distance:0,decay:0,shadow:!1,shadowBias:0,shadowRadius:1,shadowMapSize:new r,shadowCameraNear:1,shadowCameraFar:1e3};break;case"HemisphereLight":n={direction:new l,skyColor:new Y,groundColor:new Y};break;case"RectAreaLight":n={color:new Y,position:new l,halfWidth:new l,halfHeight:new l}}return t[e.id]=n,n}}}function Kt(){function t(t,o,s){for(var c=0,h=0,l=0,u=0,d=0,p=0,f=0,m=0,v=s.matrixWorldInverse,g=0,y=t.length;g<y;g++){var x=t[g],b=x.color,_=x.intensity,w=x.distance,M=x.shadow&&x.shadow.map?x.shadow.map.texture:null;if(x.isAmbientLight)c+=b.r*_,h+=b.g*_,l+=b.b*_;else if(x.isDirectionalLight){var E=e.get(x);if(E.color.copy(x.color).multiplyScalar(x.intensity),E.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(v),E.shadow=x.castShadow,x.castShadow){var T=x.shadow;E.shadowBias=T.bias,E.shadowRadius=T.radius,E.shadowMapSize=T.mapSize}n.directionalShadowMap[u]=M,n.directionalShadowMatrix[u]=x.shadow.matrix,n.directional[u]=E,u++}else if(x.isSpotLight){var E=e.get(x);if(E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(v),E.color.copy(b).multiplyScalar(_),E.distance=w,E.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(v),E.coneCos=Math.cos(x.angle),E.penumbraCos=Math.cos(x.angle*(1-x.penumbra)),E.decay=0===x.distance?0:x.decay,E.shadow=x.castShadow,x.castShadow){var T=x.shadow;E.shadowBias=T.bias,E.shadowRadius=T.radius,E.shadowMapSize=T.mapSize}n.spotShadowMap[p]=M,n.spotShadowMatrix[p]=x.shadow.matrix,n.spot[p]=E,p++}else if(x.isRectAreaLight){var E=e.get(x);E.color.copy(b).multiplyScalar(_/(x.width*x.height)),E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(v),a.identity(),r.copy(x.matrixWorld),r.premultiply(v),a.extractRotation(r),E.halfWidth.set(.5*x.width,0,0),E.halfHeight.set(0,.5*x.height,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),n.rectArea[f]=E,f++}else if(x.isPointLight){var E=e.get(x);if(E.position.setFromMatrixPosition(x.matrixWorld),E.position.applyMatrix4(v),E.color.copy(x.color).multiplyScalar(x.intensity),E.distance=x.distance,E.decay=0===x.distance?0:x.decay,E.shadow=x.castShadow,x.castShadow){var T=x.shadow;E.shadowBias=T.bias,E.shadowRadius=T.radius,E.shadowMapSize=T.mapSize,E.shadowCameraNear=T.camera.near,E.shadowCameraFar=T.camera.far}n.pointShadowMap[d]=M,n.pointShadowMatrix[d]=x.shadow.matrix,n.point[d]=E,d++}else if(x.isHemisphereLight){var E=e.get(x);E.direction.setFromMatrixPosition(x.matrixWorld),E.direction.transformDirection(v),E.direction.normalize(),E.skyColor.copy(x.color).multiplyScalar(_),E.groundColor.copy(x.groundColor).multiplyScalar(_),n.hemi[m]=E,m++}}n.ambient[0]=c,n.ambient[1]=h,n.ambient[2]=l,n.directional.length=u,n.spot.length=p,n.rectArea.length=f,n.point.length=d,n.hemi.length=m,n.hash=u+","+d+","+p+","+f+","+m+","+o.length}var e=new Qt,n={hash:"",ambient:[0,0,0],directional:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotShadowMap:[],spotShadowMatrix:[],rectArea:[],point:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[]},i=new l,r=new u,a=new u;return{setup:t,state:n}}function $t(t,e){function n(n){var i=e.frame,a=n.geometry,o=t.get(n,a);return r[o.id]!==i&&(a.isGeometry&&o.updateFromObject(n),t.update(o),r[o.id]=i),o}function i(){r={}}var r={};return{update:n,clear:i}}function te(t){for(var e=t.split("\n"),n=0;n<e.length;n++)e[n]=n+1+": "+e[n];return e.join("\n")}function ee(t,e,n){var i=t.createShader(e);return t.shaderSource(i,n),t.compileShader(i),!1===t.getShaderParameter(i,t.COMPILE_STATUS)&&console.error("THREE.WebGLShader: Shader couldn't compile."),""!==t.getShaderInfoLog(i)&&console.warn("THREE.WebGLShader: gl.getShaderInfoLog()",e===t.VERTEX_SHADER?"vertex":"fragment",t.getShaderInfoLog(i),te(n)),i}function ne(t){switch(t){case Fo:return["Linear","( value )"];case zo:return["sRGB","( value )"];case ko:return["RGBE","( value )"];case jo:return["RGBM","( value, 7.0 )"];case Go:return["RGBM","( value, 16.0 )"];case Vo:return["RGBD","( value, 256.0 )"];case Bo:return["Gamma","( value, float( GAMMA_FACTOR ) )"];default:throw new Error("unsupported encoding: "+t)}}function ie(t,e){var n=ne(e);return"vec4 "+t+"( vec4 value ) { return "+n[0]+"ToLinear"+n[1]+"; }"}function re(t,e){var n=ne(e);return"vec4 "+t+"( vec4 value ) { return LinearTo"+n[0]+n[1]+"; }"}function ae(t,e){var n;switch(e){case Fa:n="Linear";break;case za:n="Reinhard";break;case Ba:n="Uncharted2";break;case ka:n="OptimizedCineon";break;default:throw new Error("unsupported toneMapping: "+e)}return"vec3 "+t+"( vec3 color ) { return "+n+"ToneMapping( color ); }"}function oe(t,e,n){return t=t||{},[t.derivatives||e.envMapCubeUV||e.bumpMap||e.normalMap||e.flatShading?"#extension GL_OES_standard_derivatives : enable":"",(t.fragDepth||e.logarithmicDepthBuffer)&&n.get("EXT_frag_depth")?"#extension GL_EXT_frag_depth : enable":"",t.drawBuffers&&n.get("WEBGL_draw_buffers")?"#extension GL_EXT_draw_buffers : require":"",(t.shaderTextureLOD||e.envMap)&&n.get("EXT_shader_texture_lod")?"#extension GL_EXT_shader_texture_lod : enable":""].filter(he).join("\n")}function se(t){var e=[];for(var n in t){var i=t[n];!1!==i&&e.push("#define "+n+" "+i)}return e.join("\n")}function ce(t,e,n){for(var i={},r=t.getProgramParameter(e,t.ACTIVE_ATTRIBUTES),a=0;a<r;a++){var o=t.getActiveAttrib(e,a),s=o.name;i[s]=t.getAttribLocation(e,s)}return i}function he(t){return""!==t}function le(t,e){return t.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights)}function ue(t){function e(t,e){var n=rs[e];if(void 0===n)throw new Error("Can not resolve #include <"+e+">");return ue(n)}var n=/^[ \t]*#include +<([\w\d.]+)>/gm;return t.replace(n,e)}function de(t){function e(t,e,n,i){for(var r="",a=parseInt(e);a<parseInt(n);a++)r+=i.replace(/\[ i \]/g,"[ "+a+" ]");return r}var n=/for \( int i \= (\d+)\; i < (\d+)\; i \+\+ \) \{([\s\S]+?)(?=\})\}/g;return t.replace(n,e)}function pe(t,e,n,i,r,a){var o=t.context,s=i.defines,c=r.vertexShader,h=r.fragmentShader,l="SHADOWMAP_TYPE_BASIC";a.shadowMapType===qr?l="SHADOWMAP_TYPE_PCF":a.shadowMapType===Yr&&(l="SHADOWMAP_TYPE_PCF_SOFT");var u="ENVMAP_TYPE_CUBE",d="ENVMAP_MODE_REFLECTION",p="ENVMAP_BLENDING_MULTIPLY";if(a.envMap){switch(i.envMap.mapping){case ja:case Ga:u="ENVMAP_TYPE_CUBE";break;case Xa:case qa:u="ENVMAP_TYPE_CUBE_UV";break;case Va:case Ha:u="ENVMAP_TYPE_EQUIREC";break;case Wa:u="ENVMAP_TYPE_SPHERE"}switch(i.envMap.mapping){case Ga:case Ha:d="ENVMAP_MODE_REFRACTION"}switch(i.combine){case Ia:p="ENVMAP_BLENDING_MULTIPLY";break;case Oa:p="ENVMAP_BLENDING_MIX";break;case Ua:p="ENVMAP_BLENDING_ADD"}}var f,m,v=t.gammaFactor>0?t.gammaFactor:1,g=oe(i.extensions,a,e),y=se(s),x=o.createProgram();i.isRawShaderMaterial?(f=[y,"\n"].filter(he).join("\n"),m=[g,y,"\n"].filter(he).join("\n")):(f=["precision "+a.precision+" float;","precision "+a.precision+" int;","#define SHADER_NAME "+r.name,y,a.supportsVertexTextures?"#define VERTEX_TEXTURES":"","#define GAMMA_FACTOR "+v,"#define MAX_BONES "+a.maxBones,a.useFog&&a.fog?"#define USE_FOG":"",a.useFog&&a.fogExp?"#define FOG_EXP2":"",a.map?"#define USE_MAP":"",a.envMap?"#define USE_ENVMAP":"",a.envMap?"#define "+d:"",a.lightMap?"#define USE_LIGHTMAP":"",a.aoMap?"#define USE_AOMAP":"",a.emissiveMap?"#define USE_EMISSIVEMAP":"",a.bumpMap?"#define USE_BUMPMAP":"",a.normalMap?"#define USE_NORMALMAP":"",a.displacementMap&&a.supportsVertexTextures?"#define USE_DISPLACEMENTMAP":"",a.specularMap?"#define USE_SPECULARMAP":"",a.roughnessMap?"#define USE_ROUGHNESSMAP":"",a.metalnessMap?"#define USE_METALNESSMAP":"",a.alphaMap?"#define USE_ALPHAMAP":"",a.vertexColors?"#define USE_COLOR":"",a.flatShading?"#define FLAT_SHADED":"",a.skinning?"#define USE_SKINNING":"",a.useVertexTexture?"#define BONE_TEXTURE":"",a.morphTargets?"#define USE_MORPHTARGETS":"",a.morphNormals&&!1===a.flatShading?"#define USE_MORPHNORMALS":"",a.doubleSided?"#define DOUBLE_SIDED":"",a.flipSided?"#define FLIP_SIDED":"","#define NUM_CLIPPING_PLANES "+a.numClippingPlanes,a.shadowMapEnabled?"#define USE_SHADOWMAP":"",a.shadowMapEnabled?"#define "+l:"",a.sizeAttenuation?"#define USE_SIZEATTENUATION":"",a.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",a.logarithmicDepthBuffer&&e.get("EXT_frag_depth")?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_COLOR","\tattribute vec3 color;","#endif","#ifdef USE_MORPHTARGETS","\tattribute vec3 morphTarget0;","\tattribute vec3 morphTarget1;","\tattribute vec3 morphTarget2;","\tattribute vec3 morphTarget3;","\t#ifdef USE_MORPHNORMALS","\t\tattribute vec3 morphNormal0;","\t\tattribute vec3 morphNormal1;","\t\tattribute vec3 morphNormal2;","\t\tattribute vec3 morphNormal3;","\t#else","\t\tattribute vec3 morphTarget4;","\t\tattribute vec3 morphTarget5;","\t\tattribute vec3 morphTarget6;","\t\tattribute vec3 morphTarget7;","\t#endif","#endif","#ifdef USE_SKINNING","\tattribute vec4 skinIndex;","\tattribute vec4 skinWeight;","#endif","\n"].filter(he).join("\n"),m=[g,"precision "+a.precision+" float;","precision "+a.precision+" int;","#define SHADER_NAME "+r.name,y,a.alphaTest?"#define ALPHATEST "+a.alphaTest:"","#define GAMMA_FACTOR "+v,a.useFog&&a.fog?"#define USE_FOG":"",a.useFog&&a.fogExp?"#define FOG_EXP2":"",a.map?"#define USE_MAP":"",a.envMap?"#define USE_ENVMAP":"",a.envMap?"#define "+u:"",a.envMap?"#define "+d:"",a.envMap?"#define "+p:"",a.lightMap?"#define USE_LIGHTMAP":"",a.aoMap?"#define USE_AOMAP":"",a.emissiveMap?"#define USE_EMISSIVEMAP":"",a.bumpMap?"#define USE_BUMPMAP":"",a.normalMap?"#define USE_NORMALMAP":"",a.specularMap?"#define USE_SPECULARMAP":"",a.roughnessMap?"#define USE_ROUGHNESSMAP":"",a.metalnessMap?"#define USE_METALNESSMAP":"",a.alphaMap?"#define USE_ALPHAMAP":"",a.vertexColors?"#define USE_COLOR":"",a.gradientMap?"#define USE_GRADIENTMAP":"",a.flatShading?"#define FLAT_SHADED":"",a.doubleSided?"#define DOUBLE_SIDED":"",a.flipSided?"#define FLIP_SIDED":"","#define NUM_CLIPPING_PLANES "+a.numClippingPlanes,"#define UNION_CLIPPING_PLANES "+(a.numClippingPlanes-a.numClipIntersection),a.shadowMapEnabled?"#define USE_SHADOWMAP":"",a.shadowMapEnabled?"#define "+l:"",a.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",a.physicallyCorrectLights?"#define PHYSICALLY_CORRECT_LIGHTS":"",a.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",a.logarithmicDepthBuffer&&e.get("EXT_frag_depth")?"#define USE_LOGDEPTHBUF_EXT":"",a.envMap&&e.get("EXT_shader_texture_lod")?"#define TEXTURE_LOD_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;",a.toneMapping!==Da?"#define TONE_MAPPING":"",a.toneMapping!==Da?rs.tonemapping_pars_fragment:"",a.toneMapping!==Da?ae("toneMapping",a.toneMapping):"",a.dithering?"#define DITHERING":"",a.outputEncoding||a.mapEncoding||a.envMapEncoding||a.emissiveMapEncoding?rs.encodings_pars_fragment:"",a.mapEncoding?ie("mapTexelToLinear",a.mapEncoding):"",a.envMapEncoding?ie("envMapTexelToLinear",a.envMapEncoding):"",a.emissiveMapEncoding?ie("emissiveMapTexelToLinear",a.emissiveMapEncoding):"",a.outputEncoding?re("linearToOutputTexel",a.outputEncoding):"",a.depthPacking?"#define DEPTH_PACKING "+i.depthPacking:"","\n"].filter(he).join("\n")),c=ue(c),c=le(c,a),h=ue(h),h=le(h,a),i.isShaderMaterial||(c=de(c),h=de(h));var b=f+c,_=m+h,w=ee(o,o.VERTEX_SHADER,b),M=ee(o,o.FRAGMENT_SHADER,_);o.attachShader(x,w),o.attachShader(x,M),void 0!==i.index0AttributeName?o.bindAttribLocation(x,0,i.index0AttributeName):!0===a.morphTargets&&o.bindAttribLocation(x,0,"position"),o.linkProgram(x);var E=o.getProgramInfoLog(x),T=o.getShaderInfoLog(w),S=o.getShaderInfoLog(M),A=!0,L=!0;!1===o.getProgramParameter(x,o.LINK_STATUS)?(A=!1,console.error("THREE.WebGLProgram: shader error: ",o.getError(),"gl.VALIDATE_STATUS",o.getProgramParameter(x,o.VALIDATE_STATUS),"gl.getProgramInfoLog",E,T,S)):""!==E?console.warn("THREE.WebGLProgram: gl.getProgramInfoLog()",E):""!==T&&""!==S||(L=!1),L&&(this.diagnostics={runnable:A,material:i,programLog:E,vertexShader:{log:T,prefix:f},fragmentShader:{log:S,prefix:m}}),o.deleteShader(w),o.deleteShader(M);var R;this.getUniforms=function(){return void 0===R&&(R=new q(o,x,t)),R};var P;return this.getAttributes=function(){return void 0===P&&(P=ce(o,x)),P},this.destroy=function(){o.deleteProgram(x),this.program=void 0},Object.defineProperties(this,{uniforms:{get:function(){return console.warn("THREE.WebGLProgram: .uniforms is now .getUniforms()."),this.getUniforms()}},attributes:{get:function(){return console.warn("THREE.WebGLProgram: .attributes is now .getAttributes()."),this.getAttributes()}}}),this.id=hs++,this.code=n,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=M,this}function fe(t,e,n){function i(t){var e=t.skeleton,i=e.bones;if(n.floatVertexTextures)return 1024;var r=n.maxVertexUniforms,a=Math.floor((r-20)/4),o=Math.min(a,i.length);return o<i.length?(console.warn("THREE.WebGLRenderer: Skeleton has "+i.length+" bones. This GPU supports "+o+"."),0):o}function r(t,e){var n;return t?t.isTexture?n=t.encoding:t.isWebGLRenderTarget&&(console.warn("THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead."),n=t.texture.encoding):n=Fo,n===Fo&&e&&(n=Bo),n}var a=[],o={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"phong",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow"},s=["precision","supportsVertexTextures","map","mapEncoding","envMap","envMapMode","envMapEncoding","lightMap","aoMap","emissiveMap","emissiveMapEncoding","bumpMap","normalMap","displacementMap","specularMap","roughnessMap","metalnessMap","gradientMap","alphaMap","combine","vertexColors","fog","useFog","fogExp","flatShading","sizeAttenuation","logarithmicDepthBuffer","skinning","maxBones","useVertexTexture","morphTargets","morphNormals","maxMorphTargets","maxMorphNormals","premultipliedAlpha","numDirLights","numPointLights","numSpotLights","numHemiLights","numRectAreaLights","shadowMapEnabled","shadowMapType","toneMapping","physicallyCorrectLights","alphaTest","doubleSided","flipSided","numClippingPlanes","numClipIntersection","depthPacking","dithering"];this.getParameters=function(e,a,s,c,h,l,u){var d=o[e.type],p=u.isSkinnedMesh?i(u):0,f=n.precision;null!==e.precision&&(f=n.getMaxPrecision(e.precision))!==e.precision&&console.warn("THREE.WebGLProgram.getParameters:",e.precision,"not supported, using",f,"instead.");var m=t.getRenderTarget();return{shaderID:d,precision:f,supportsVertexTextures:n.vertexTextures,outputEncoding:r(m?m.texture:null,t.gammaOutput),map:!!e.map,mapEncoding:r(e.map,t.gammaInput),envMap:!!e.envMap,envMapMode:e.envMap&&e.envMap.mapping,envMapEncoding:r(e.envMap,t.gammaInput),envMapCubeUV:!!e.envMap&&(e.envMap.mapping===Xa||e.envMap.mapping===qa),lightMap:!!e.lightMap,aoMap:!!e.aoMap,emissiveMap:!!e.emissiveMap,emissiveMapEncoding:r(e.emissiveMap,t.gammaInput),bumpMap:!!e.bumpMap,normalMap:!!e.normalMap,displacementMap:!!e.displacementMap,roughnessMap:!!e.roughnessMap,metalnessMap:!!e.metalnessMap,specularMap:!!e.specularMap,alphaMap:!!e.alphaMap,gradientMap:!!e.gradientMap,combine:e.combine,vertexColors:e.vertexColors,fog:!!c,useFog:e.fog,fogExp:c&&c.isFogExp2,flatShading:e.flatShading,sizeAttenuation:e.sizeAttenuation,logarithmicDepthBuffer:n.logarithmicDepthBuffer,skinning:e.skinning&&p>0,maxBones:p,useVertexTexture:n.floatVertexTextures,morphTargets:e.morphTargets,morphNormals:e.morphNormals,maxMorphTargets:t.maxMorphTargets,maxMorphNormals:t.maxMorphNormals,numDirLights:a.directional.length,numPointLights:a.point.length,numSpotLights:a.spot.length,numRectAreaLights:a.rectArea.length,numHemiLights:a.hemi.length,numClippingPlanes:h,numClipIntersection:l,dithering:e.dithering,shadowMapEnabled:t.shadowMap.enabled&&u.receiveShadow&&s.length>0,shadowMapType:t.shadowMap.type,toneMapping:t.toneMapping,physicallyCorrectLights:t.physicallyCorrectLights,premultipliedAlpha:e.premultipliedAlpha,alphaTest:e.alphaTest,doubleSided:e.side===Qr,flipSided:e.side===Jr,depthPacking:void 0!==e.depthPacking&&e.depthPacking}},this.getProgramCode=function(e,n){var i=[];if(n.shaderID?i.push(n.shaderID):(i.push(e.fragmentShader),i.push(e.vertexShader)),void 0!==e.defines)for(var r in e.defines)i.push(r),i.push(e.defines[r]);for(var a=0;a<s.length;a++)i.push(n[s[a]]);return i.push(e.onBeforeCompile.toString()),i.push(t.gammaOutput),i.join()},this.acquireProgram=function(n,i,r,o){for(var s,c=0,h=a.length;c<h;c++){var l=a[c];if(l.code===o){s=l,++s.usedTimes;break}}return void 0===s&&(s=new pe(t,e,o,n,i,r),a.push(s)),s},this.releaseProgram=function(t){if(0==--t.usedTimes){var e=a.indexOf(t);a[e]=a[a.length-1],a.pop(),t.destroy()}},this.programs=a}function me(t,e,n,i,r,a,o){function s(t,e){if(t.width>e||t.height>e){var n=e/Math.max(t.width,t.height),i=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");i.width=Math.floor(t.width*n),i.height=Math.floor(t.height*n);return i.getContext("2d").drawImage(t,0,0,t.width,t.height,0,0,i.width,i.height),console.warn("THREE.WebGLRenderer: image is too big ("+t.width+"x"+t.height+"). Resized to "+i.width+"x"+i.height,t),i}return t}function c(t){return Xo.isPowerOfTwo(t.width)&&Xo.isPowerOfTwo(t.height)}function h(t){if(t instanceof HTMLImageElement||t instanceof HTMLCanvasElement){var e=document.createElementNS("http://www.w3.org/1999/xhtml","canvas");e.width=Xo.nearestPowerOfTwo(t.width),e.height=Xo.nearestPowerOfTwo(t.height);return e.getContext("2d").drawImage(t,0,0,e.width,e.height),console.warn("THREE.WebGLRenderer: image is not power of two ("+t.width+"x"+t.height+"). Resized to "+e.width+"x"+e.height,t),e}return t}function l(t){return t.wrapS!==Za||t.wrapT!==Za||t.minFilter!==Qa&&t.minFilter!==to}function u(t,e){return t.generateMipmaps&&e&&t.minFilter!==Qa&&t.minFilter!==to}function d(e){return e===Qa||e===Ka||e===$a?t.NEAREST:t.LINEAR}function p(t){var e=t.target;e.removeEventListener("dispose",p),m(e),o.textures--}function f(t){var e=t.target;e.removeEventListener("dispose",f),v(e),o.textures--}function m(e){var n=i.get(e);if(e.image&&n.__image__webglTextureCube)t.deleteTexture(n.__image__webglTextureCube);else{if(void 0===n.__webglInit)return;t.deleteTexture(n.__webglTexture)}i.remove(e)}function v(e){var n=i.get(e),r=i.get(e.texture);if(e){if(void 0!==r.__webglTexture&&t.deleteTexture(r.__webglTexture),e.depthTexture&&e.depthTexture.dispose(),e.isWebGLRenderTargetCube)for(var a=0;a<6;a++)t.deleteFramebuffer(n.__webglFramebuffer[a]),n.__webglDepthbuffer&&t.deleteRenderbuffer(n.__webglDepthbuffer[a]);else t.deleteFramebuffer(n.__webglFramebuffer),n.__webglDepthbuffer&&t.deleteRenderbuffer(n.__webglDepthbuffer);i.remove(e.texture),i.remove(e)}}function g(e,r){var a=i.get(e);if(e.version>0&&a.__version!==e.version){var o=e.image;if(void 0===o)console.warn("THREE.WebGLRenderer: Texture marked for update but image is undefined",e);else{if(!1!==o.complete)return void _(a,e,r);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete",e)}}n.activeTexture(t.TEXTURE0+r),n.bindTexture(t.TEXTURE_2D,a.__webglTexture)}function y(e,h){var l=i.get(e);if(6===e.image.length)if(e.version>0&&l.__version!==e.version){l.__image__webglTextureCube||(e.addEventListener("dispose",p),l.__image__webglTextureCube=t.createTexture(),o.textures++),n.activeTexture(t.TEXTURE0+h),n.bindTexture(t.TEXTURE_CUBE_MAP,l.__image__webglTextureCube),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,e.flipY);for(var d=e&&e.isCompressedTexture,f=e.image[0]&&e.image[0].isDataTexture,m=[],v=0;v<6;v++)m[v]=d||f?f?e.image[v].image:e.image[v]:s(e.image[v],r.maxCubemapSize);var g=m[0],y=c(g),x=a.convert(e.format),_=a.convert(e.type);b(t.TEXTURE_CUBE_MAP,e,y);for(var v=0;v<6;v++)if(d)for(var w,M=m[v].mipmaps,E=0,T=M.length;E<T;E++)w=M[E],e.format!==yo&&e.format!==go?n.getCompressedTextureFormats().indexOf(x)>-1?n.compressedTexImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+v,E,x,w.width,w.height,0,w.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+v,E,x,w.width,w.height,0,x,_,w.data);else f?n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+v,0,x,m[v].width,m[v].height,0,x,_,m[v].data):n.texImage2D(t.TEXTURE_CUBE_MAP_POSITIVE_X+v,0,x,x,_,m[v]);u(e,y)&&t.generateMipmap(t.TEXTURE_CUBE_MAP),l.__version=e.version,e.onUpdate&&e.onUpdate(e)}else n.activeTexture(t.TEXTURE0+h),n.bindTexture(t.TEXTURE_CUBE_MAP,l.__image__webglTextureCube)}function x(e,r){n.activeTexture(t.TEXTURE0+r),n.bindTexture(t.TEXTURE_CUBE_MAP,i.get(e).__webglTexture)}function b(n,o,s){var c;if(s?(t.texParameteri(n,t.TEXTURE_WRAP_S,a.convert(o.wrapS)),t.texParameteri(n,t.TEXTURE_WRAP_T,a.convert(o.wrapT)),t.texParameteri(n,t.TEXTURE_MAG_FILTER,a.convert(o.magFilter)),t.texParameteri(n,t.TEXTURE_MIN_FILTER,a.convert(o.minFilter))):(t.texParameteri(n,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(n,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),o.wrapS===Za&&o.wrapT===Za||console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.",o),t.texParameteri(n,t.TEXTURE_MAG_FILTER,d(o.magFilter)),t.texParameteri(n,t.TEXTURE_MIN_FILTER,d(o.minFilter)),o.minFilter!==Qa&&o.minFilter!==to&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.",o)),c=e.get("EXT_texture_filter_anisotropic")){if(o.type===ho&&null===e.get("OES_texture_float_linear"))return;if(o.type===lo&&null===e.get("OES_texture_half_float_linear"))return;(o.anisotropy>1||i.get(o).__currentAnisotropy)&&(t.texParameterf(n,c.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(o.anisotropy,r.getMaxAnisotropy())),i.get(o).__currentAnisotropy=o.anisotropy)}}function _(e,i,d){void 0===e.__webglInit&&(e.__webglInit=!0,i.addEventListener("dispose",p),e.__webglTexture=t.createTexture(),o.textures++),n.activeTexture(t.TEXTURE0+d),n.bindTexture(t.TEXTURE_2D,e.__webglTexture),t.pixelStorei(t.UNPACK_FLIP_Y_WEBGL,i.flipY),t.pixelStorei(t.UNPACK_PREMULTIPLY_ALPHA_WEBGL,i.premultiplyAlpha),t.pixelStorei(t.UNPACK_ALIGNMENT,i.unpackAlignment);var f=s(i.image,r.maxTextureSize);l(i)&&!1===c(f)&&(f=h(f));var m=c(f),v=a.convert(i.format),g=a.convert(i.type);b(t.TEXTURE_2D,i,m);var y,x=i.mipmaps;if(i.isDepthTexture){var _=t.DEPTH_COMPONENT;if(i.type===ho){if(!L)throw new Error("Float Depth Texture only supported in WebGL2.0");_=t.DEPTH_COMPONENT32F}else L&&(_=t.DEPTH_COMPONENT16);i.format===_o&&_===t.DEPTH_COMPONENT&&i.type!==oo&&i.type!==co&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),i.type=oo,g=a.convert(i.type)),i.format===wo&&(_=t.DEPTH_STENCIL,i.type!==mo&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),i.type=mo,g=a.convert(i.type))),n.texImage2D(t.TEXTURE_2D,0,_,f.width,f.height,0,v,g,null)}else if(i.isDataTexture)if(x.length>0&&m){for(var w=0,M=x.length;w<M;w++)y=x[w],n.texImage2D(t.TEXTURE_2D,w,v,y.width,y.height,0,v,g,y.data);i.generateMipmaps=!1}else n.texImage2D(t.TEXTURE_2D,0,v,f.width,f.height,0,v,g,f.data);else if(i.isCompressedTexture)for(var w=0,M=x.length;w<M;w++)y=x[w],i.format!==yo&&i.format!==go?n.getCompressedTextureFormats().indexOf(v)>-1?n.compressedTexImage2D(t.TEXTURE_2D,w,v,y.width,y.height,0,y.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):n.texImage2D(t.TEXTURE_2D,w,v,y.width,y.height,0,v,g,y.data);else if(x.length>0&&m){for(var w=0,M=x.length;w<M;w++)y=x[w],n.texImage2D(t.TEXTURE_2D,w,v,v,g,y);i.generateMipmaps=!1}else n.texImage2D(t.TEXTURE_2D,0,v,v,g,f);u(i,m)&&t.generateMipmap(t.TEXTURE_2D),e.__version=i.version,i.onUpdate&&i.onUpdate(i)}function w(e,r,o,s){var c=a.convert(r.texture.format),h=a.convert(r.texture.type);n.texImage2D(s,0,c,r.width,r.height,0,c,h,null),t.bindFramebuffer(t.FRAMEBUFFER,e),t.framebufferTexture2D(t.FRAMEBUFFER,o,s,i.get(r.texture).__webglTexture,0),t.bindFramebuffer(t.FRAMEBUFFER,null)}function M(e,n){t.bindRenderbuffer(t.RENDERBUFFER,e),n.depthBuffer&&!n.stencilBuffer?(t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_COMPONENT16,n.width,n.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.RENDERBUFFER,e)):n.depthBuffer&&n.stencilBuffer?(t.renderbufferStorage(t.RENDERBUFFER,t.DEPTH_STENCIL,n.width,n.height),t.framebufferRenderbuffer(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.RENDERBUFFER,e)):t.renderbufferStorage(t.RENDERBUFFER,t.RGBA4,n.width,n.height),t.bindRenderbuffer(t.RENDERBUFFER,null)}function E(e,n){if(n&&n.isWebGLRenderTargetCube)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(t.FRAMEBUFFER,e),!n.depthTexture||!n.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");i.get(n.depthTexture).__webglTexture&&n.depthTexture.image.width===n.width&&n.depthTexture.image.height===n.height||(n.depthTexture.image.width=n.width,n.depthTexture.image.height=n.height,n.depthTexture.needsUpdate=!0),g(n.depthTexture,0);var r=i.get(n.depthTexture).__webglTexture;if(n.depthTexture.format===_o)t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_ATTACHMENT,t.TEXTURE_2D,r,0);else{if(n.depthTexture.format!==wo)throw new Error("Unknown depthTexture format");t.framebufferTexture2D(t.FRAMEBUFFER,t.DEPTH_STENCIL_ATTACHMENT,t.TEXTURE_2D,r,0)}}function T(e){var n=i.get(e),r=!0===e.isWebGLRenderTargetCube;if(e.depthTexture){if(r)throw new Error("target.depthTexture not supported in Cube render targets");E(n.__webglFramebuffer,e)}else if(r){n.__webglDepthbuffer=[];for(var a=0;a<6;a++)t.bindFramebuffer(t.FRAMEBUFFER,n.__webglFramebuffer[a]),n.__webglDepthbuffer[a]=t.createRenderbuffer(),M(n.__webglDepthbuffer[a],e)}else t.bindFramebuffer(t.FRAMEBUFFER,n.__webglFramebuffer),n.__webglDepthbuffer=t.createRenderbuffer(),M(n.__webglDepthbuffer,e);t.bindFramebuffer(t.FRAMEBUFFER,null)}function S(e){var r=i.get(e),a=i.get(e.texture);e.addEventListener("dispose",f),a.__webglTexture=t.createTexture(),o.textures++;var s=!0===e.isWebGLRenderTargetCube,h=c(e);if(s){r.__webglFramebuffer=[];for(var l=0;l<6;l++)r.__webglFramebuffer[l]=t.createFramebuffer()}else r.__webglFramebuffer=t.createFramebuffer();if(s){n.bindTexture(t.TEXTURE_CUBE_MAP,a.__webglTexture),b(t.TEXTURE_CUBE_MAP,e.texture,h);for(var l=0;l<6;l++)w(r.__webglFramebuffer[l],e,t.COLOR_ATTACHMENT0,t.TEXTURE_CUBE_MAP_POSITIVE_X+l);u(e.texture,h)&&t.generateMipmap(t.TEXTURE_CUBE_MAP),n.bindTexture(t.TEXTURE_CUBE_MAP,null)}else n.bindTexture(t.TEXTURE_2D,a.__webglTexture),b(t.TEXTURE_2D,e.texture,h),w(r.__webglFramebuffer,e,t.COLOR_ATTACHMENT0,t.TEXTURE_2D),u(e.texture,h)&&t.generateMipmap(t.TEXTURE_2D),n.bindTexture(t.TEXTURE_2D,null);e.depthBuffer&&T(e)}function A(e){var r=e.texture;if(u(r,c(e))){var a=e.isWebGLRenderTargetCube?t.TEXTURE_CUBE_MAP:t.TEXTURE_2D,o=i.get(r).__webglTexture;n.bindTexture(a,o),t.generateMipmap(a),n.bindTexture(a,null)}}var L="undefined"!=typeof WebGL2RenderingContext&&t instanceof WebGL2RenderingContext;this.setTexture2D=g,this.setTextureCube=y,this.setTextureCubeDynamic=x,this.setupRenderTarget=S,this.updateRenderTargetMipmap=A}function ve(){function t(t){var e=t.uuid,n=i[e];return void 0===n&&(n={},i[e]=n),n}function e(t){delete i[t.uuid]}function n(){i={}}var i={};return{get:t,remove:e,clear:n}}function ge(t,e,n){function i(){var e=!1,n=new o,i=null,r=new o(0,0,0,0);return{setMask:function(n){i===n||e||(t.colorMask(n,n,n,n),i=n)},setLocked:function(t){e=t},setClear:function(e,i,a,o,s){!0===s&&(e*=o,i*=o,a*=o),n.set(e,i,a,o),!1===r.equals(n)&&(t.clearColor(e,i,a,o),r.copy(n))},reset:function(){e=!1,i=null,r.set(-1,0,0,0)}}}function r(){var e=!1,n=null,i=null,r=null;return{setTest:function(e){e?d(t.DEPTH_TEST):p(t.DEPTH_TEST)},setMask:function(i){n===i||e||(t.depthMask(i),n=i)},setFunc:function(e){if(i!==e){if(e)switch(e){case Ta:t.depthFunc(t.NEVER);break;case Sa:t.depthFunc(t.ALWAYS);break;case Aa:t.depthFunc(t.LESS);break;case La:t.depthFunc(t.LEQUAL);break;case Ra:t.depthFunc(t.EQUAL);break;case Pa:t.depthFunc(t.GEQUAL);break;case Ca:t.depthFunc(t.GREATER);break;case Na:t.depthFunc(t.NOTEQUAL);break;default:t.depthFunc(t.LEQUAL)}else t.depthFunc(t.LEQUAL);i=e}},setLocked:function(t){e=t},setClear:function(e){r!==e&&(t.clearDepth(e),r=e)},reset:function(){e=!1,n=null,i=null,r=null}}}function a(){var e=!1,n=null,i=null,r=null,a=null,o=null,s=null,c=null,h=null;return{setTest:function(e){e?d(t.STENCIL_TEST):p(t.STENCIL_TEST)},setMask:function(i){n===i||e||(t.stencilMask(i),n=i)},setFunc:function(e,n,o){i===e&&r===n&&a===o||(t.stencilFunc(e,n,o),i=e,r=n,a=o)},setOp:function(e,n,i){o===e&&s===n&&c===i||(t.stencilOp(e,n,i),o=e,s=n,c=i)},setLocked:function(t){e=t},setClear:function(e){h!==e&&(t.clearStencil(e),h=e)},reset:function(){e=!1,n=null,i=null,r=null,a=null,o=null,s=null,c=null,h=null}}}function s(e,n,i){var r=new Uint8Array(4),a=t.createTexture();t.bindTexture(e,a),t.texParameteri(e,t.TEXTURE_MIN_FILTER,t.NEAREST),t.texParameteri(e,t.TEXTURE_MAG_FILTER,t.NEAREST);for(var o=0;o<i;o++)t.texImage2D(n+o,0,t.RGBA,1,1,0,t.RGBA,t.UNSIGNED_BYTE,r);return a}function c(){for(var t=0,e=O.length;t<e;t++)O[t]=0}function h(n){if(O[n]=1,0===U[n]&&(t.enableVertexAttribArray(n),U[n]=1),0!==D[n]){e.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(n,0),D[n]=0}}function l(n,i){if(O[n]=1,0===U[n]&&(t.enableVertexAttribArray(n),U[n]=1),D[n]!==i){e.get("ANGLE_instanced_arrays").vertexAttribDivisorANGLE(n,i),D[n]=i}}function u(){for(var e=0,n=U.length;e!==n;++e)U[e]!==O[e]&&(t.disableVertexAttribArray(e),U[e]=0)}function d(e){!0!==F[e]&&(t.enable(e),F[e]=!0)}function p(e){!1!==F[e]&&(t.disable(e),F[e]=!1)}function f(){if(null===z&&(z=[],e.get("WEBGL_compressed_texture_pvrtc")||e.get("WEBGL_compressed_texture_s3tc")||e.get("WEBGL_compressed_texture_etc1")))for(var n=t.getParameter(t.COMPRESSED_TEXTURE_FORMATS),i=0;i<n.length;i++)z.push(n[i]);return z}function m(e){return B!==e&&(t.useProgram(e),B=e,!0)}function v(e,i,r,a,o,s,c,h){if(e!==ia?d(t.BLEND):p(t.BLEND),e!==ca){if(e!==k||h!==q)switch(e){case aa:h?(t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD),t.blendFuncSeparate(t.ONE,t.ONE,t.ONE,t.ONE)):(t.blendEquation(t.FUNC_ADD),t.blendFunc(t.SRC_ALPHA,t.ONE));break;case oa:h?(t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD),t.blendFuncSeparate(t.ZERO,t.ZERO,t.ONE_MINUS_SRC_COLOR,t.ONE_MINUS_SRC_ALPHA)):(t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ZERO,t.ONE_MINUS_SRC_COLOR));break;case sa:h?(t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD),t.blendFuncSeparate(t.ZERO,t.SRC_COLOR,t.ZERO,t.SRC_ALPHA)):(t.blendEquation(t.FUNC_ADD),t.blendFunc(t.ZERO,t.SRC_COLOR));break;default:h?(t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD),t.blendFuncSeparate(t.ONE,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA)):(t.blendEquationSeparate(t.FUNC_ADD,t.FUNC_ADD),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE_MINUS_SRC_ALPHA))}j=null,G=null,V=null,H=null,W=null,X=null}else o=o||i,s=s||r,c=c||a,i===j&&o===H||(t.blendEquationSeparate(n.convert(i),n.convert(o)),j=i,H=o),r===G&&a===V&&s===W&&c===X||(t.blendFuncSeparate(n.convert(r),n.convert(a),n.convert(s),n.convert(c)),G=r,V=a,W=s,X=c);k=e,q=h}function g(e){e.side===Qr?p(t.CULL_FACE):d(t.CULL_FACE),y(e.side===Jr),!0===e.transparent?v(e.blending,e.blendEquation,e.blendSrc,e.blendDst,e.blendEquationAlpha,e.blendSrcAlpha,e.blendDstAlpha,e.premultipliedAlpha):v(ia),C.setFunc(e.depthFunc),C.setTest(e.depthTest),C.setMask(e.depthWrite),P.setMask(e.colorWrite),_(e.polygonOffset,e.polygonOffsetFactor,e.polygonOffsetUnits)}function y(e){Y!==e&&(e?t.frontFace(t.CW):t.frontFace(t.CCW),Y=e)}function x(e){e!==Vr?(d(t.CULL_FACE),e!==Z&&(e===Hr?t.cullFace(t.BACK):e===Wr?t.cullFace(t.FRONT):t.cullFace(t.FRONT_AND_BACK))):p(t.CULL_FACE),Z=e}function b(e){e!==J&&(et&&t.lineWidth(e),J=e)}function _(e,n,i){e?(d(t.POLYGON_OFFSET_FILL),Q===n&&K===i||(t.polygonOffset(n,i),Q=n,K=i)):p(t.POLYGON_OFFSET_FILL)}function w(e){e?d(t.SCISSOR_TEST):p(t.SCISSOR_TEST)}function M(e){void 0===e&&(e=t.TEXTURE0+$-1),nt!==e&&(t.activeTexture(e),nt=e)}function E(e,n){null===nt&&M();var i=it[nt];void 0===i&&(i={type:void 0,texture:void 0},it[nt]=i),i.type===e&&i.texture===n||(t.bindTexture(e,n||ot[e]),i.type=e,i.texture=n)}function T(){try{t.compressedTexImage2D.apply(t,arguments)}catch(t){console.error("THREE.WebGLState:",t)}}function S(){try{t.texImage2D.apply(t,arguments)}catch(t){console.error("THREE.WebGLState:",t)}}function A(e){!1===rt.equals(e)&&(t.scissor(e.x,e.y,e.z,e.w),rt.copy(e))}function L(e){!1===at.equals(e)&&(t.viewport(e.x,e.y,e.z,e.w),at.copy(e))}function R(){for(var e=0;e<U.length;e++)1===U[e]&&(t.disableVertexAttribArray(e),U[e]=0);F={},z=null,nt=null,it={},B=null,k=null,Y=null,Z=null,P.reset(),C.reset(),N.reset()}var P=new i,C=new r,N=new a,I=t.getParameter(t.MAX_VERTEX_ATTRIBS),O=new Uint8Array(I),U=new Uint8Array(I),D=new Uint8Array(I),F={},z=null,B=null,k=null,j=null,G=null,V=null,H=null,W=null,X=null,q=!1,Y=null,Z=null,J=null,Q=null,K=null,$=t.getParameter(t.MAX_COMBINED_TEXTURE_IMAGE_UNITS),tt=parseFloat(/^WebGL\ ([0-9])/.exec(t.getParameter(t.VERSION))[1]),et=parseFloat(tt)>=1,nt=null,it={},rt=new o,at=new o,ot={};return ot[t.TEXTURE_2D]=s(t.TEXTURE_2D,t.TEXTURE_2D,1),ot[t.TEXTURE_CUBE_MAP]=s(t.TEXTURE_CUBE_MAP,t.TEXTURE_CUBE_MAP_POSITIVE_X,6),P.setClear(0,0,0,1),C.setClear(1),N.setClear(0),d(t.DEPTH_TEST),C.setFunc(La),y(!1),x(Hr),d(t.CULL_FACE),d(t.BLEND),v(ra),{buffers:{color:P,depth:C,stencil:N},initAttributes:c,enableAttribute:h,enableAttributeAndDivisor:l,disableUnusedAttributes:u,enable:d,disable:p,getCompressedTextureFormats:f,useProgram:m,setBlending:v,setMaterial:g,setFlipSided:y,setCullFace:x,setLineWidth:b,setPolygonOffset:_,setScissorTest:w,activeTexture:M,bindTexture:E,compressedTexImage2D:T,texImage2D:S,scissor:A,viewport:L,reset:R}}function ye(t,e,n){function i(){if(void 0!==a)return a;var n=e.get("EXT_texture_filter_anisotropic");return a=null!==n?t.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}function r(e){if("highp"===e){if(t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.HIGH_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.HIGH_FLOAT).precision>0)return"highp";e="mediump"}return"mediump"===e&&t.getShaderPrecisionFormat(t.VERTEX_SHADER,t.MEDIUM_FLOAT).precision>0&&t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}var a,o=void 0!==n.precision?n.precision:"highp",s=r(o);s!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",s,"instead."),o=s);var c=!0===n.logarithmicDepthBuffer&&!!e.get("EXT_frag_depth"),h=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS),l=t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS),u=t.getParameter(t.MAX_TEXTURE_SIZE),d=t.getParameter(t.MAX_CUBE_MAP_TEXTURE_SIZE),p=t.getParameter(t.MAX_VERTEX_ATTRIBS),f=t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS),m=t.getParameter(t.MAX_VARYING_VECTORS),v=t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS),g=l>0,y=!!e.get("OES_texture_float");return{getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:c,maxTextures:h,maxVertexTextures:l,maxTextureSize:u,maxCubemapSize:d,maxAttributes:p,maxVertexUniforms:f,maxVaryings:m,maxFragmentUniforms:v,vertexTextures:g,floatFragmentTextures:y,floatVertexTextures:g&&y}}function xe(t){mt.call(this),this.cameras=t||[]}function be(t){function e(){if(null!==i&&i.isPresenting){var e=i.getEyeParameters("left"),r=e.renderWidth,a=e.renderHeight;f=t.getPixelRatio(),p=t.getSize(),t.setDrawingBufferSize(2*r,a,1)}else n.enabled&&t.setDrawingBufferSize(p.width,p.height,f)}var n=this,i=null,r=null;"VRFrameData"in window&&(r=new window.VRFrameData);var a=new u,s=new u,c=new u,h=new mt;h.bounds=new o(0,0,.5,1),h.layers.enable(1);var l=new mt;l.bounds=new o(.5,0,.5,1),l.layers.enable(2);var d=new xe([h,l]);d.layers.enable(1),d.layers.enable(2);var p,f;window.addEventListener("vrdisplaypresentchange",e,!1),this.enabled=!1,this.standing=!1,this.getDevice=function(){return i},this.setDevice=function(t){void 0!==t&&(i=t)},this.getCamera=function(t){if(null===i)return t;i.depthNear=t.near,i.depthFar=t.far,i.getFrameData(r);var e=r.pose;null!==e.position?t.position.fromArray(e.position):t.position.set(0,0,0),null!==e.orientation&&t.quaternion.fromArray(e.orientation),t.updateMatrixWorld();var n=i.stageParameters;if(this.standing&&n&&(s.fromArray(n.sittingToStandingTransform),c.getInverse(s),t.matrixWorld.multiply(s),t.matrixWorldInverse.multiply(c)),!1===i.isPresenting)return t;h.near=t.near,l.near=t.near,h.far=t.far,l.far=t.far,d.matrixWorld.copy(t.matrixWorld),d.matrixWorldInverse.copy(t.matrixWorldInverse),h.matrixWorldInverse.fromArray(r.leftViewMatrix),l.matrixWorldInverse.fromArray(r.rightViewMatrix),this.standing&&n&&(h.matrixWorldInverse.multiply(c),l.matrixWorldInverse.multiply(c));var o=t.parent;null!==o&&(a.getInverse(o.matrixWorld),h.matrixWorldInverse.multiply(a),l.matrixWorldInverse.multiply(a)),h.matrixWorld.getInverse(h.matrixWorldInverse),l.matrixWorld.getInverse(l.matrixWorldInverse),h.projectionMatrix.fromArray(r.leftProjectionMatrix),l.projectionMatrix.fromArray(r.rightProjectionMatrix),d.projectionMatrix.copy(h.projectionMatrix);var u=i.getLayers();if(u.length){var p=u[0];null!==p.leftBounds&&4===p.leftBounds.length&&h.bounds.fromArray(p.leftBounds),null!==p.rightBounds&&4===p.rightBounds.length&&l.bounds.fromArray(p.rightBounds)}return d},this.getStandingMatrix=function(){return s},this.submitFrame=function(){i&&i.isPresenting&&i.submitFrame()},this.dispose=function(){window.removeEventListener("vrdisplaypresentchange",e)}}function _e(t){var e={};return{get:function(n){if(void 0!==e[n])return e[n];var i;switch(n){case"WEBGL_depth_texture":i=t.getExtension("WEBGL_depth_texture")||t.getExtension("MOZ_WEBGL_depth_texture")||t.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=t.getExtension("EXT_texture_filter_anisotropic")||t.getExtension("MOZ_EXT_texture_filter_anisotropic")||t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=t.getExtension("WEBGL_compressed_texture_s3tc")||t.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=t.getExtension("WEBGL_compressed_texture_pvrtc")||t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;case"WEBGL_compressed_texture_etc1":i=t.getExtension("WEBGL_compressed_texture_etc1");break;default:i=t.getExtension(n)}return null===i&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),e[n]=i,i}}}function we(){function t(){h.value!==i&&(h.value=i,h.needsUpdate=r>0),n.numPlanes=r,n.numIntersection=0}function e(t,e,i,r){var a=null!==t?t.length:0,o=null;if(0!==a){if(o=h.value,!0!==r||null===o){var l=i+4*a,u=e.matrixWorldInverse;c.getNormalMatrix(u),(null===o||o.length<l)&&(o=new Float32Array(l));for(var d=0,p=i;d!==a;++d,p+=4)s.copy(t[d]).applyMatrix4(u,c),s.normal.toArray(o,p),o[p+3]=s.constant}h.value=o,h.needsUpdate=!0}return n.numPlanes=a,o}var n=this,i=null,r=0,a=!1,o=!1,s=new ot,c=new at,h={value:null,needsUpdate:!1};this.uniform=h,this.numPlanes=0,this.numIntersection=0,this.init=function(t,n,o){var s=0!==t.length||n||0!==r||a;return a=n,i=e(t,o,0),r=t.length,s},this.beginShadows=function(){o=!0,e(null)},this.endShadows=function(){o=!1,t()},this.setState=function(n,s,c,l,u,d){if(!a||null===n||0===n.length||o&&!c)o?e(null):t();else{var p=o?0:r,f=4*p,m=u.clippingState||null;h.value=m,m=e(n,l,f,d);for(var v=0;v!==f;++v)m[v]=i[v];u.clippingState=m,this.numIntersection=s?this.numPlanes:0,this.numPlanes+=p}}}function Me(t,e){function n(n){var i;if(n===Ya)return t.REPEAT;if(n===Za)return t.CLAMP_TO_EDGE;if(n===Ja)return t.MIRRORED_REPEAT;if(n===Qa)return t.NEAREST;if(n===Ka)return t.NEAREST_MIPMAP_NEAREST;if(n===$a)return t.NEAREST_MIPMAP_LINEAR;if(n===to)return t.LINEAR;if(n===eo)return t.LINEAR_MIPMAP_NEAREST;if(n===no)return t.LINEAR_MIPMAP_LINEAR;if(n===io)return t.UNSIGNED_BYTE;if(n===uo)return t.UNSIGNED_SHORT_4_4_4_4;if(n===po)return t.UNSIGNED_SHORT_5_5_5_1;if(n===fo)return t.UNSIGNED_SHORT_5_6_5;if(n===ro)return t.BYTE;if(n===ao)return t.SHORT;if(n===oo)return t.UNSIGNED_SHORT;if(n===so)return t.INT;if(n===co)return t.UNSIGNED_INT;if(n===ho)return t.FLOAT;if(n===lo&&null!==(i=e.get("OES_texture_half_float")))return i.HALF_FLOAT_OES;if(n===vo)return t.ALPHA;if(n===go)return t.RGB;if(n===yo)return t.RGBA;if(n===xo)return t.LUMINANCE;if(n===bo)return t.LUMINANCE_ALPHA;if(n===_o)return t.DEPTH_COMPONENT;if(n===wo)return t.DEPTH_STENCIL;if(n===ha)return t.FUNC_ADD;if(n===la)return t.FUNC_SUBTRACT;if(n===ua)return t.FUNC_REVERSE_SUBTRACT;if(n===fa)return t.ZERO;if(n===ma)return t.ONE;if(n===va)return t.SRC_COLOR;if(n===ga)return t.ONE_MINUS_SRC_COLOR;if(n===ya)return t.SRC_ALPHA;if(n===xa)return t.ONE_MINUS_SRC_ALPHA;if(n===ba)return t.DST_ALPHA;if(n===_a)return t.ONE_MINUS_DST_ALPHA;if(n===wa)return t.DST_COLOR;if(n===Ma)return t.ONE_MINUS_DST_COLOR;if(n===Ea)return t.SRC_ALPHA_SATURATE;if((n===Mo||n===Eo||n===To||n===So)&&null!==(i=e.get("WEBGL_compressed_texture_s3tc"))){if(n===Mo)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Eo)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===To)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===So)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if((n===Ao||n===Lo||n===Ro||n===Po)&&null!==(i=e.get("WEBGL_compressed_texture_pvrtc"))){if(n===Ao)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Lo)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ro)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Po)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(n===Co&&null!==(i=e.get("WEBGL_compressed_texture_etc1")))return i.COMPRESSED_RGB_ETC1_WEBGL;if((n===da||n===pa)&&null!==(i=e.get("EXT_blend_minmax"))){if(n===da)return i.MIN_EXT;if(n===pa)return i.MAX_EXT}return n===mo&&null!==(i=e.get("WEBGL_depth_texture"))?i.UNSIGNED_INT_24_8_WEBGL:0}return{convert:n}}function Ee(t){function e(){return null===tt?mt:1}function n(){Rt=new _e(At),Rt.get("WEBGL_depth_texture"),Rt.get("OES_texture_float"),Rt.get("OES_texture_float_linear"),Rt.get("OES_texture_half_float"),Rt.get("OES_texture_half_float_linear"),Rt.get("OES_standard_derivatives"),Rt.get("ANGLE_instanced_arrays"),Rt.get("OES_element_index_uint")&&(Ct.MaxIndex=4294967296),ee=new Me(At,Rt),Pt=new ye(At,Rt,t),Nt=new ge(At,Rt,ee),Nt.scissor(lt.copy(gt).multiplyScalar(mt)),Nt.viewport(ot.copy(vt).multiplyScalar(mt)),It=new ve,Ot=new me(At,Rt,Nt,It,Pt,ee,Tt),Ut=new ht(At),Dt=new Jt(At,Ut,Tt),Ft=new $t(Dt,St),Vt=new qt(At),Bt=new fe(Q,Rt,Pt),zt=new Kt,kt=new Wt,Gt=new jt(Q,Nt,Dt,G),Ht=new Zt(At,Rt,St),Xt=new Yt(At,Rt,St),Qt=new J(Q,At,Nt,Ot,Pt),te=new K(Q,At,Nt,Ot,Pt),Q.info.programs=Bt.programs,Q.context=At,Q.capabilities=Pt,Q.extensions=Rt,Q.properties=It,Q.renderLists=kt,Q.state=Nt}function i(t){t.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),$=!0}function r(t){console.log("THREE.WebGLRenderer: Context Restored."),$=!1,n()}function a(t){var e=t.target;e.removeEventListener("dispose",a),s(e)}function s(t){c(t),It.remove(t)}function c(t){var e=It.get(t).program;t.program=void 0,void 0!==e&&Bt.releaseProgram(e)}function h(t,e,n){t.render(function(t){Q.renderBufferImmediate(t,e,n)})}function p(t,e,n,i){if(n&&n.isInstancedBufferGeometry&&null===Rt.get("ANGLE_instanced_arrays"))return void console.error("THREE.WebGLRenderer.setupVertexAttributes: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");void 0===i&&(i=0),Nt.initAttributes();var r=n.attributes,a=e.getAttributes(),o=t.defaultAttributeValues;for(var s in a){var c=a[s];if(c>=0){var h=r[s];if(void 0!==h){var l=h.normalized,u=h.itemSize,d=Ut.get(h);if(void 0===d)continue;var p=d.buffer,f=d.type,m=d.bytesPerElement;if(h.isInterleavedBufferAttribute){var v=h.data,g=v.stride,y=h.offset;v&&v.isInstancedInterleavedBuffer?(Nt.enableAttributeAndDivisor(c,v.meshPerAttribute),void 0===n.maxInstancedCount&&(n.maxInstancedCount=v.meshPerAttribute*v.count)):Nt.enableAttribute(c),At.bindBuffer(At.ARRAY_BUFFER,p),At.vertexAttribPointer(c,u,f,l,g*m,(i*g+y)*m)}else h.isInstancedBufferAttribute?(Nt.enableAttributeAndDivisor(c,h.meshPerAttribute),void 0===n.maxInstancedCount&&(n.maxInstancedCount=h.meshPerAttribute*h.count)):Nt.enableAttribute(c),At.bindBuffer(At.ARRAY_BUFFER,p),At.vertexAttribPointer(c,u,f,l,0,i*u*m)}else if(void 0!==o){var x=o[s];if(void 0!==x)switch(x.length){case 2:At.vertexAttrib2fv(c,x);break;case 3:At.vertexAttrib3fv(c,x);break;case 4:At.vertexAttrib4fv(c,x);break;default:At.vertexAttrib1fv(c,x)}}}}Nt.disableUnusedAttributes()}function f(){re||((ne.getDevice()||window).requestAnimationFrame(m),re=!0)}function m(t){null!==ae&&ae(t),(ne.getDevice()||window).requestAnimationFrame(m)}function v(t,e,n){if(t.visible){if(t.layers.test(e.layers))if(t.isLight)H.push(t),t.castShadow&&W.push(t);else if(t.isSprite)t.frustumCulled&&!xt.intersectsSprite(t)||Y.push(t);else if(t.isLensFlare)Z.push(t);else if(t.isImmediateRenderObject)n&&Et.setFromMatrixPosition(t.matrixWorld).applyMatrix4(Mt),X.push(t,null,t.material,Et.z,null);else if((t.isMesh||t.isLine||t.isPoints)&&(t.isSkinnedMesh&&t.skeleton.update(),!t.frustumCulled||xt.intersectsObject(t))){n&&Et.setFromMatrixPosition(t.matrixWorld).applyMatrix4(Mt);var i=Ft.update(t),r=t.material;if(Array.isArray(r))for(var a=i.groups,o=0,s=a.length;o<s;o++){var c=a[o],h=r[c.materialIndex];h&&h.visible&&X.push(t,i,h,Et.z,c)}else r.visible&&X.push(t,i,r,Et.z,null)}for(var l=t.children,o=0,s=l.length;o<s;o++)v(l[o],e,n)}}function g(t,e,n,i){for(var r=0,a=t.length;r<a;r++){var o=t[r],s=o.object,c=o.geometry,h=void 0===i?o.material:i,l=o.group;if(n.isArrayCamera){at=n;for(var u=n.cameras,d=0,p=u.length;d<p;d++){var f=u[d];if(s.layers.test(f.layers)){var m=f.bounds,v=m.x*pt,g=m.y*ft,x=m.z*pt,b=m.w*ft;Nt.viewport(ot.set(v,g,x,b).multiplyScalar(mt)),y(s,e,f,c,h,l)}}}else at=null,y(s,e,n,c,h,l)}}function y(t,e,n,i,r,a){if(t.onBeforeRender(Q,e,n,i,r,a),t.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,t.matrixWorld),t.normalMatrix.getNormalMatrix(t.modelViewMatrix),t.isImmediateRenderObject){Nt.setMaterial(r);var o=b(n,e.fog,r,t);it="",h(t,o,r)}else Q.renderBufferDirect(n,e.fog,i,r,t,a);t.onAfterRender(Q,e,n,i,r,a)}function x(t,e,n){var i=It.get(t),r=Bt.getParameters(t,zt.state,W,e,bt.numPlanes,bt.numIntersection,n),o=Bt.getProgramCode(t,r),s=i.program,h=!0;if(void 0===s)t.addEventListener("dispose",a);else if(s.code!==o)c(t);else{if(void 0!==r.shaderID)return;h=!1}if(h){if(r.shaderID){var l=as[r.shaderID];i.shader={name:t.type,uniforms:is.clone(l.uniforms),vertexShader:l.vertexShader,fragmentShader:l.fragmentShader}}else i.shader={name:t.type,uniforms:t.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader};t.onBeforeCompile(i.shader),s=Bt.acquireProgram(t,i.shader,r,o),i.program=s,t.program=s}var u=s.getAttributes();if(t.morphTargets){t.numSupportedMorphTargets=0;for(var d=0;d<Q.maxMorphTargets;d++)u["morphTarget"+d]>=0&&t.numSupportedMorphTargets++}if(t.morphNormals){t.numSupportedMorphNormals=0;for(var d=0;d<Q.maxMorphNormals;d++)u["morphNormal"+d]>=0&&t.numSupportedMorphNormals++}var p=i.shader.uniforms;(t.isShaderMaterial||t.isRawShaderMaterial)&&!0!==t.clipping||(i.numClippingPlanes=bt.numPlanes,i.numIntersection=bt.numIntersection,p.clippingPlanes=bt.uniform),i.fog=e,i.lightsHash=zt.state.hash,t.lights&&(p.ambientLightColor.value=zt.state.ambient,p.directionalLights.value=zt.state.directional,p.spotLights.value=zt.state.spot,p.rectAreaLights.value=zt.state.rectArea,p.pointLights.value=zt.state.point,p.hemisphereLights.value=zt.state.hemi,p.directionalShadowMap.value=zt.state.directionalShadowMap,p.directionalShadowMatrix.value=zt.state.directionalShadowMatrix,p.spotShadowMap.value=zt.state.spotShadowMap,p.spotShadowMatrix.value=zt.state.spotShadowMatrix,p.pointShadowMap.value=zt.state.pointShadowMap,p.pointShadowMatrix.value=zt.state.pointShadowMatrix);var f=i.program.getUniforms(),m=q.seqWithValue(f.seq,p);i.uniformsList=m}function b(t,e,n,i){dt=0;var r=It.get(n);if(_t&&(wt||t!==rt)){var a=t===rt&&n.id===nt;bt.setState(n.clippingPlanes,n.clipIntersection,n.clipShadows,t,r,a)}!1===n.needsUpdate&&(void 0===r.program?n.needsUpdate=!0:n.fog&&r.fog!==e?n.needsUpdate=!0:n.lights&&r.lightsHash!==zt.state.hash?n.needsUpdate=!0:void 0===r.numClippingPlanes||r.numClippingPlanes===bt.numPlanes&&r.numIntersection===bt.numIntersection||(n.needsUpdate=!0)),n.needsUpdate&&(x(n,e,i),n.needsUpdate=!1);var o=!1,s=!1,c=!1,h=r.program,l=h.getUniforms(),u=r.shader.uniforms;if(Nt.useProgram(h.program)&&(o=!0,s=!0,c=!0),n.id!==nt&&(nt=n.id,s=!0),o||t!==rt){if(l.setValue(At,"projectionMatrix",t.projectionMatrix),Pt.logarithmicDepthBuffer&&l.setValue(At,"logDepthBufFC",2/(Math.log(t.far+1)/Math.LN2)),rt!==(at||t)&&(rt=at||t,s=!0,c=!0),n.isShaderMaterial||n.isMeshPhongMaterial||n.isMeshStandardMaterial||n.envMap){var p=l.map.cameraPosition;void 0!==p&&p.setValue(At,Et.setFromMatrixPosition(t.matrixWorld))}(n.isMeshPhongMaterial||n.isMeshLambertMaterial||n.isMeshBasicMaterial||n.isMeshStandardMaterial||n.isShaderMaterial||n.skinning)&&l.setValue(At,"viewMatrix",t.matrixWorldInverse)}if(n.skinning){l.setOptional(At,i,"bindMatrix"),l.setOptional(At,i,"bindMatrixInverse");var f=i.skeleton;if(f){var m=f.bones;if(Pt.floatVertexTextures){if(void 0===f.boneTexture){var v=Math.sqrt(4*m.length);v=Xo.nextPowerOfTwo(Math.ceil(v)),v=Math.max(v,4);var g=new Float32Array(v*v*4);g.set(f.boneMatrices);var y=new d(g,v,v,yo,ho);f.boneMatrices=g,f.boneTexture=y,f.boneTextureSize=v}l.setValue(At,"boneTexture",f.boneTexture),l.setValue(At,"boneTextureSize",f.boneTextureSize)}else l.setOptional(At,f,"boneMatrices")}}return s&&(l.setValue(At,"toneMappingExposure",Q.toneMappingExposure),l.setValue(At,"toneMappingWhitePoint",Q.toneMappingWhitePoint),n.lights&&O(u,c),e&&n.fog&&T(u,e),n.isMeshBasicMaterial?_(u,n):n.isMeshLambertMaterial?(_(u,n),S(u,n)):n.isMeshPhongMaterial?(_(u,n),n.isMeshToonMaterial?L(u,n):A(u,n)):n.isMeshStandardMaterial?(_(u,n),n.isMeshPhysicalMaterial?P(u,n):R(u,n)):n.isMeshDepthMaterial?(_(u,n),C(u,n)):n.isMeshDistanceMaterial?(_(u,n),N(u,n)):n.isMeshNormalMaterial?(_(u,n),I(u,n)):n.isLineBasicMaterial?(w(u,n),n.isLineDashedMaterial&&M(u,n)):n.isPointsMaterial?E(u,n):n.isShadowMaterial&&(u.color.value=n.color,u.opacity.value=n.opacity),void 0!==u.ltcMat&&(u.ltcMat.value=ns.LTC_MAT_TEXTURE),void 0!==u.ltcMag&&(u.ltcMag.value=ns.LTC_MAG_TEXTURE),q.upload(At,r.uniformsList,u,Q)),l.setValue(At,"modelViewMatrix",i.modelViewMatrix),l.setValue(At,"normalMatrix",i.normalMatrix),l.setValue(At,"modelMatrix",i.matrixWorld),h}function _(t,e){t.opacity.value=e.opacity,e.color&&(t.diffuse.value=e.color),e.emissive&&t.emissive.value.copy(e.emissive).multiplyScalar(e.emissiveIntensity),e.map&&(t.map.value=e.map),e.alphaMap&&(t.alphaMap.value=e.alphaMap),e.specularMap&&(t.specularMap.value=e.specularMap),e.envMap&&(t.envMap.value=e.envMap,t.flipEnvMap.value=e.envMap&&e.envMap.isCubeTexture?-1:1,t.reflectivity.value=e.reflectivity,t.refractionRatio.value=e.refractionRatio),e.lightMap&&(t.lightMap.value=e.lightMap,t.lightMapIntensity.value=e.lightMapIntensity),e.aoMap&&(t.aoMap.value=e.aoMap,t.aoMapIntensity.value=e.aoMapIntensity);var n;if(e.map?n=e.map:e.specularMap?n=e.specularMap:e.displacementMap?n=e.displacementMap:e.normalMap?n=e.normalMap:e.bumpMap?n=e.bumpMap:e.roughnessMap?n=e.roughnessMap:e.metalnessMap?n=e.metalnessMap:e.alphaMap?n=e.alphaMap:e.emissiveMap&&(n=e.emissiveMap),void 0!==n){n.isWebGLRenderTarget&&(n=n.texture);var i=n.offset,r=n.repeat;t.offsetRepeat.value.set(i.x,i.y,r.x,r.y)}}function w(t,e){t.diffuse.value=e.color,t.opacity.value=e.opacity}function M(t,e){t.dashSize.value=e.dashSize,t.totalSize.value=e.dashSize+e.gapSize,t.scale.value=e.scale}function E(t,e){if(t.diffuse.value=e.color,t.opacity.value=e.opacity,t.size.value=e.size*mt,t.scale.value=.5*ft,t.map.value=e.map,null!==e.map){var n=e.map.offset,i=e.map.repeat;t.offsetRepeat.value.set(n.x,n.y,i.x,i.y)}}function T(t,e){t.fogColor.value=e.color,e.isFog?(t.fogNear.value=e.near,t.fogFar.value=e.far):e.isFogExp2&&(t.fogDensity.value=e.density)}function S(t,e){e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap)}function A(t,e){t.specular.value=e.specular,t.shininess.value=Math.max(e.shininess,1e-4),e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap),e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale),e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale)),e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias)}function L(t,e){A(t,e),e.gradientMap&&(t.gradientMap.value=e.gradientMap)}function R(t,e){t.roughness.value=e.roughness,t.metalness.value=e.metalness,e.roughnessMap&&(t.roughnessMap.value=e.roughnessMap),e.metalnessMap&&(t.metalnessMap.value=e.metalnessMap),e.emissiveMap&&(t.emissiveMap.value=e.emissiveMap),e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale),e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale)),e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias),e.envMap&&(t.envMapIntensity.value=e.envMapIntensity)}function P(t,e){t.clearCoat.value=e.clearCoat,t.clearCoatRoughness.value=e.clearCoatRoughness,R(t,e)}function C(t,e){e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias)}function N(t,e){e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias),t.referencePosition.value.copy(e.referencePosition),t.nearDistance.value=e.nearDistance,t.farDistance.value=e.farDistance}function I(t,e){e.bumpMap&&(t.bumpMap.value=e.bumpMap,t.bumpScale.value=e.bumpScale),e.normalMap&&(t.normalMap.value=e.normalMap,t.normalScale.value.copy(e.normalScale)),e.displacementMap&&(t.displacementMap.value=e.displacementMap,t.displacementScale.value=e.displacementScale,t.displacementBias.value=e.displacementBias)}function O(t,e){t.ambientLightColor.needsUpdate=e,t.directionalLights.needsUpdate=e,t.pointLights.needsUpdate=e,t.spotLights.needsUpdate=e,t.rectAreaLights.needsUpdate=e,t.hemisphereLights.needsUpdate=e}function U(){var t=dt;return t>=Pt.maxTextures&&console.warn("THREE.WebGLRenderer: Trying to use "+t+" texture units while this GPU supports only "+Pt.maxTextures),dt+=1,t}console.log("THREE.WebGLRenderer",jr),t=t||{};var D=void 0!==t.canvas?t.canvas:document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),F=void 0!==t.context?t.context:null,z=void 0!==t.alpha&&t.alpha,B=void 0===t.depth||t.depth,k=void 0===t.stencil||t.stencil,j=void 0!==t.antialias&&t.antialias,G=void 0===t.premultipliedAlpha||t.premultipliedAlpha,V=void 0!==t.preserveDrawingBuffer&&t.preserveDrawingBuffer,H=[],W=[],X=null,Y=[],Z=[];this.domElement=D,this.context=null,this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.gammaFactor=2,this.gammaInput=!1,this.gammaOutput=!1,this.physicallyCorrectLights=!1,this.toneMapping=Fa,this.toneMappingExposure=1,this.toneMappingWhitePoint=1,this.maxMorphTargets=8,this.maxMorphNormals=4;var Q=this,$=!1,tt=null,et=null,nt=-1,it="",rt=null,at=null,ot=new o,lt=new o,ut=null,dt=0,pt=D.width,ft=D.height,mt=1,vt=new o(0,0,pt,ft),gt=new o(0,0,pt,ft),yt=!1,xt=new st,bt=new we,_t=!1,wt=!1,Mt=new u,Et=new l,Tt={geometries:0,textures:0},St={frame:0,calls:0,vertices:0,faces:0,points:0};this.info={render:St,memory:Tt,programs:null};var At;try{var Lt={alpha:z,depth:B,stencil:k,antialias:j,premultipliedAlpha:G,preserveDrawingBuffer:V};if(null===(At=F||D.getContext("webgl",Lt)||D.getContext("experimental-webgl",Lt)))throw null!==D.getContext("webgl")?"Error creating WebGL context with your selected attributes.":"Error creating WebGL context.";void 0===At.getShaderPrecisionFormat&&(At.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}}),D.addEventListener("webglcontextlost",i,!1),D.addEventListener("webglcontextrestored",r,!1)}catch(t){console.error("THREE.WebGLRenderer: "+t)}var Rt,Pt,Nt,It,Ot,Ut,Dt,Ft,zt,Bt,kt,Gt,Vt,Ht,Xt,Qt,te,ee;n();var ne=new be(Q);this.vr=ne;var ie=new ct(Q,Ft,Pt.maxTextureSize);this.shadowMap=ie,this.getContext=function(){return At},this.getContextAttributes=function(){return At.getContextAttributes()},this.forceContextLoss=function(){var t=Rt.get("WEBGL_lose_context");t&&t.loseContext()},this.forceContextRestore=function(){var t=Rt.get("WEBGL_lose_context");t&&t.restoreContext()},this.getPixelRatio=function(){return mt},this.setPixelRatio=function(t){void 0!==t&&(mt=t,this.setSize(pt,ft,!1))},this.getSize=function(){return{width:pt,height:ft}},this.setSize=function(t,e,n){var i=ne.getDevice();if(i&&i.isPresenting)return void console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");pt=t,ft=e,D.width=t*mt,D.height=e*mt,!1!==n&&(D.style.width=t+"px",D.style.height=e+"px"),this.setViewport(0,0,t,e)},this.getDrawingBufferSize=function(){return{width:pt*mt,height:ft*mt}},this.setDrawingBufferSize=function(t,e,n){pt=t,ft=e,mt=n,D.width=t*n,D.height=e*n,this.setViewport(0,0,t,e)},this.setViewport=function(t,e,n,i){vt.set(t,ft-e-i,n,i),Nt.viewport(ot.copy(vt).multiplyScalar(mt))},this.setScissor=function(t,e,n,i){gt.set(t,ft-e-i,n,i),Nt.scissor(lt.copy(gt).multiplyScalar(mt))},this.setScissorTest=function(t){Nt.setScissorTest(yt=t)},this.getClearColor=Gt.getClearColor,this.setClearColor=Gt.setClearColor,this.getClearAlpha=Gt.getClearAlpha,this.setClearAlpha=Gt.setClearAlpha,this.clear=function(t,e,n){var i=0;(void 0===t||t)&&(i|=At.COLOR_BUFFER_BIT),(void 0===e||e)&&(i|=At.DEPTH_BUFFER_BIT),(void 0===n||n)&&(i|=At.STENCIL_BUFFER_BIT),At.clear(i)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.clearTarget=function(t,e,n,i){this.setRenderTarget(t),this.clear(e,n,i)},this.dispose=function(){D.removeEventListener("webglcontextlost",i,!1),D.removeEventListener("webglcontextrestored",r,!1),kt.dispose(),ne.dispose()},this.renderBufferImmediate=function(t,e,n){Nt.initAttributes();var i=It.get(t);t.hasPositions&&!i.position&&(i.position=At.createBuffer()),t.hasNormals&&!i.normal&&(i.normal=At.createBuffer()),t.hasUvs&&!i.uv&&(i.uv=At.createBuffer()),t.hasColors&&!i.color&&(i.color=At.createBuffer());var r=e.getAttributes();if(t.hasPositions&&(At.bindBuffer(At.ARRAY_BUFFER,i.position),At.bufferData(At.ARRAY_BUFFER,t.positionArray,At.DYNAMIC_DRAW),Nt.enableAttribute(r.position),At.vertexAttribPointer(r.position,3,At.FLOAT,!1,0,0)),t.hasNormals){if(At.bindBuffer(At.ARRAY_BUFFER,i.normal),!n.isMeshPhongMaterial&&!n.isMeshStandardMaterial&&!n.isMeshNormalMaterial&&!0===n.flatShading)for(var a=0,o=3*t.count;a<o;a+=9){var s=t.normalArray,c=(s[a+0]+s[a+3]+s[a+6])/3,h=(s[a+1]+s[a+4]+s[a+7])/3,l=(s[a+2]+s[a+5]+s[a+8])/3;s[a+0]=c,s[a+1]=h,s[a+2]=l,s[a+3]=c,s[a+4]=h,s[a+5]=l,s[a+6]=c,s[a+7]=h,s[a+8]=l}At.bufferData(At.ARRAY_BUFFER,t.normalArray,At.DYNAMIC_DRAW),Nt.enableAttribute(r.normal),At.vertexAttribPointer(r.normal,3,At.FLOAT,!1,0,0)}t.hasUvs&&n.map&&(At.bindBuffer(At.ARRAY_BUFFER,i.uv),At.bufferData(At.ARRAY_BUFFER,t.uvArray,At.DYNAMIC_DRAW),Nt.enableAttribute(r.uv),At.vertexAttribPointer(r.uv,2,At.FLOAT,!1,0,0)),t.hasColors&&n.vertexColors!==ta&&(At.bindBuffer(At.ARRAY_BUFFER,i.color),At.bufferData(At.ARRAY_BUFFER,t.colorArray,At.DYNAMIC_DRAW),Nt.enableAttribute(r.color),At.vertexAttribPointer(r.color,3,At.FLOAT,!1,0,0)),Nt.disableUnusedAttributes(),At.drawArrays(At.TRIANGLES,0,t.count),t.count=0},this.renderBufferDirect=function(t,n,i,r,a,o){Nt.setMaterial(r);var s=b(t,n,r,a),c=i.id+"_"+s.id+"_"+(!0===r.wireframe),h=!1;c!==it&&(it=c,h=!0),a.morphTargetInfluences&&(Vt.update(a,i,r,s),h=!0);var l=i.index,u=i.attributes.position,d=1;!0===r.wireframe&&(l=Dt.getWireframeAttribute(i),d=2);var f,m=Ht;null!==l&&(f=Ut.get(l),m=Xt,m.setIndex(f)),h&&(p(r,s,i),null!==l&&At.bindBuffer(At.ELEMENT_ARRAY_BUFFER,f.buffer));var v=0;null!==l?v=l.count:void 0!==u&&(v=u.count);var g=i.drawRange.start*d,y=i.drawRange.count*d,x=null!==o?o.start*d:0,_=null!==o?o.count*d:1/0,w=Math.max(g,x),M=Math.min(v,g+y,x+_)-1,E=Math.max(0,M-w+1);if(0!==E){if(a.isMesh)if(!0===r.wireframe)Nt.setLineWidth(r.wireframeLinewidth*e()),m.setMode(At.LINES);else switch(a.drawMode){case Oo:m.setMode(At.TRIANGLES);break;case Uo:m.setMode(At.TRIANGLE_STRIP);break;case Do:m.setMode(At.TRIANGLE_FAN)}else if(a.isLine){var T=r.linewidth;void 0===T&&(T=1),Nt.setLineWidth(T*e()),a.isLineSegments?m.setMode(At.LINES):a.isLineLoop?m.setMode(At.LINE_LOOP):m.setMode(At.LINE_STRIP)}else a.isPoints&&m.setMode(At.POINTS);i&&i.isInstancedBufferGeometry?i.maxInstancedCount>0&&m.renderInstances(i,w,E):m.render(w,E)}},this.compile=function(t,e){H.length=0,W.length=0,t.traverse(function(t){t.isLight&&(H.push(t),t.castShadow&&W.push(t))}),zt.setup(H,W,e),t.traverse(function(e){if(e.material)if(Array.isArray(e.material))for(var n=0;n<e.material.length;n++)x(e.material[n],t.fog,e);else x(e.material,t.fog,e)})};var re=!1,ae=null;this.animate=function(t){ae=t,f()},this.render=function(t,e,n,i){if(!e||!e.isCamera)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(!$){it="",nt=-1,rt=null,!0===t.autoUpdate&&t.updateMatrixWorld(),null===e.parent&&e.updateMatrixWorld(),ne.enabled&&(e=ne.getCamera(e)),Mt.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),xt.setFromMatrix(Mt),H.length=0,W.length=0,Y.length=0,Z.length=0,wt=this.localClippingEnabled,_t=bt.init(this.clippingPlanes,wt,e),X=kt.get(t,e),X.init(),v(t,e,Q.sortObjects),!0===Q.sortObjects&&X.sort(),_t&&bt.beginShadows(),ie.render(W,t,e),zt.setup(H,W,e),_t&&bt.endShadows(),St.frame++,St.calls=0,St.vertices=0,St.faces=0,St.points=0,void 0===n&&(n=null),this.setRenderTarget(n),Gt.render(X,t,e,i);var r=X.opaque,a=X.transparent;if(t.overrideMaterial){var o=t.overrideMaterial;r.length&&g(r,t,e,o),a.length&&g(a,t,e,o)}else r.length&&g(r,t,e),a.length&&g(a,t,e);te.render(Y,t,e),Qt.render(Z,t,e,ot),n&&Ot.updateRenderTargetMipmap(n),Nt.buffers.depth.setTest(!0),Nt.buffers.depth.setMask(!0),Nt.buffers.color.setMask(!0),Nt.setPolygonOffset(!1),ne.enabled&&ne.submitFrame()}},this.setFaceCulling=function(t,e){Nt.setCullFace(t),Nt.setFlipSided(e===Xr)},this.allocTextureUnit=U,this.setTexture2D=function(){var t=!1;return function(e,n){e&&e.isWebGLRenderTarget&&(t||(console.warn("THREE.WebGLRenderer.setTexture2D: don't use render targets as textures. Use their .texture property instead."),t=!0),e=e.texture),Ot.setTexture2D(e,n)}}(),this.setTexture=function(){var t=!1;return function(e,n){t||(console.warn("THREE.WebGLRenderer: .setTexture is deprecated, use setTexture2D instead."),t=!0),Ot.setTexture2D(e,n)}}(),this.setTextureCube=function(){var t=!1;return function(e,n){e&&e.isWebGLRenderTargetCube&&(t||(console.warn("THREE.WebGLRenderer.setTextureCube: don't use cube render targets as textures. Use their .texture property instead."),t=!0),e=e.texture),e&&e.isCubeTexture||Array.isArray(e.image)&&6===e.image.length?Ot.setTextureCube(e,n):Ot.setTextureCubeDynamic(e,n)}}(),this.getRenderTarget=function(){return tt},this.setRenderTarget=function(t){tt=t,t&&void 0===It.get(t).__webglFramebuffer&&Ot.setupRenderTarget(t);var e=null,n=!1;if(t){var i=It.get(t).__webglFramebuffer;t.isWebGLRenderTargetCube?(e=i[t.activeCubeFace],n=!0):e=i,ot.copy(t.viewport),lt.copy(t.scissor),ut=t.scissorTest}else ot.copy(vt).multiplyScalar(mt),lt.copy(gt).multiplyScalar(mt),ut=yt;if(et!==e&&(At.bindFramebuffer(At.FRAMEBUFFER,e),et=e),Nt.viewport(ot),Nt.scissor(lt),Nt.setScissorTest(ut),n){var r=It.get(t.texture);At.framebufferTexture2D(At.FRAMEBUFFER,At.COLOR_ATTACHMENT0,At.TEXTURE_CUBE_MAP_POSITIVE_X+t.activeCubeFace,r.__webglTexture,t.activeMipMapLevel)}},this.readRenderTargetPixels=function(t,e,n,i,r,a){if(!t||!t.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");var o=It.get(t).__webglFramebuffer;if(o){var s=!1;o!==et&&(At.bindFramebuffer(At.FRAMEBUFFER,o),s=!0);try{var c=t.texture,h=c.format,l=c.type;if(h!==yo&&ee.convert(h)!==At.getParameter(At.IMPLEMENTATION_COLOR_READ_FORMAT))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!(l===io||ee.convert(l)===At.getParameter(At.IMPLEMENTATION_COLOR_READ_TYPE)||l===ho&&(Rt.get("OES_texture_float")||Rt.get("WEBGL_color_buffer_float"))||l===lo&&Rt.get("EXT_color_buffer_half_float")))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");At.checkFramebufferStatus(At.FRAMEBUFFER)===At.FRAMEBUFFER_COMPLETE?e>=0&&e<=t.width-i&&n>=0&&n<=t.height-r&&At.readPixels(e,n,i,r,ee.convert(h),ee.convert(l),a):console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.")}finally{s&&At.bindFramebuffer(At.FRAMEBUFFER,et)}}}}function Te(t,e){this.name="",this.color=new Y(t),this.density=void 0!==e?e:25e-5}function Se(t,e,n){this.name="",this.color=new Y(t),this.near=void 0!==e?e:1,this.far=void 0!==n?n:1e3}function Ae(){dt.call(this),this.type="Scene",this.background=null,this.fog=null,this.overrideMaterial=null,this.autoUpdate=!0}function Le(t,e,n,i,r){dt.call(this),this.lensFlares=[],this.positionScreen=new l,this.customUpdateCallback=void 0,void 0!==t&&this.add(t,e,n,i,r)}function Re(t){$.call(this),this.type="SpriteMaterial",this.color=new Y(16777215),this.map=null,this.rotation=0,this.fog=!1,this.lights=!1,this.setValues(t)}function Pe(t){dt.call(this),this.type="Sprite",this.material=void 0!==t?t:new Re}function Ce(){dt.call(this),this.type="LOD",Object.defineProperties(this,{levels:{enumerable:!0,value:[]}})}function Ne(t,e){if(t=t||[],this.bones=t.slice(0),this.boneMatrices=new Float32Array(16*this.bones.length),void 0===e)this.calculateInverses();else if(this.bones.length===e.length)this.boneInverses=e.slice(0);else{console.warn("THREE.Skeleton boneInverses is the wrong length."),this.boneInverses=[];for(var n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new u)}}function Ie(){dt.call(this),this.type="Bone"}function Oe(t,e){kt.call(this,t,e),this.type="SkinnedMesh",this.bindMode="attached",this.bindMatrix=new u,this.bindMatrixInverse=new u;var n=this.initBones(),i=new Ne(n);this.bind(i,this.matrixWorld),this.normalizeSkinWeights()}function Ue(t){$.call(this),this.type="LineBasicMaterial",this.color=new Y(16777215),this.linewidth=1,this.linecap="round",this.linejoin="round",this.lights=!1,this.setValues(t)}function De(t,e,n){if(1===n)return console.warn("THREE.Line: parameter THREE.LinePieces no longer supported. Created THREE.LineSegments instead."),new Fe(t,e);dt.call(this),this.type="Line",this.geometry=void 0!==t?t:new Ct,this.material=void 0!==e?e:new Ue({color:16777215*Math.random()})}function Fe(t,e){De.call(this,t,e),this.type="LineSegments"}function ze(t,e){De.call(this,t,e),this.type="LineLoop"}function Be(t){$.call(this),this.type="PointsMaterial",this.color=new Y(16777215),this.map=null,this.size=1,this.sizeAttenuation=!0,this.lights=!1,this.setValues(t)}function ke(t,e){dt.call(this),this.type="Points",this.geometry=void 0!==t?t:new Ct,this.material=void 0!==e?e:new Be({color:16777215*Math.random()})}function je(){dt.call(this),this.type="Group"}function Ge(t,e,n,i,r,o,s,c,h){function l(){requestAnimationFrame(l),t.readyState>=t.HAVE_CURRENT_DATA&&(u.needsUpdate=!0)}a.call(this,t,e,n,i,r,o,s,c,h),this.generateMipmaps=!1;var u=this;l()}function Ve(t,e,n,i,r,o,s,c,h,l,u,d){a.call(this,null,o,s,c,h,l,i,r,u,d),this.image={width:e,height:n},this.mipmaps=t,this.flipY=!1,this.generateMipmaps=!1}function He(t,e,n,i,r,o,s,c,h,l){if((l=void 0!==l?l:_o)!==_o&&l!==wo)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");void 0===n&&l===_o&&(n=oo),void 0===n&&l===wo&&(n=mo),a.call(this,null,i,r,o,s,c,l,n,h),this.image={width:t,height:e},this.magFilter=void 0!==s?s:Qa,this.minFilter=void 0!==c?c:Qa,this.flipY=!1,this.generateMipmaps=!1}function We(t){Ct.call(this),this.type="WireframeGeometry";var e,n,i,r,a,o,s,c,h,u,d=[],p=[0,0],f={},m=["a","b","c"];if(t&&t.isGeometry){var v=t.faces;for(e=0,i=v.length;e<i;e++){var g=v[e];for(n=0;n<3;n++)s=g[m[n]],c=g[m[(n+1)%3]],p[0]=Math.min(s,c),p[1]=Math.max(s,c),h=p[0]+","+p[1],void 0===f[h]&&(f[h]={index1:p[0],index2:p[1]})}for(h in f)o=f[h],u=t.vertices[o.index1],d.push(u.x,u.y,u.z),u=t.vertices[o.index2],d.push(u.x,u.y,u.z)}else if(t&&t.isBufferGeometry){var y,x,b,_,w,M,E,T;if(u=new l,null!==t.index){for(y=t.attributes.position,x=t.index,b=t.groups,0===b.length&&(b=[{start:0,count:x.count,materialIndex:0}]),r=0,a=b.length;r<a;++r)for(_=b[r],w=_.start,M=_.count,e=w,i=w+M;e<i;e+=3)for(n=0;n<3;n++)s=x.getX(e+n),c=x.getX(e+(n+1)%3),p[0]=Math.min(s,c),p[1]=Math.max(s,c),h=p[0]+","+p[1],void 0===f[h]&&(f[h]={index1:p[0],index2:p[1]});for(h in f)o=f[h],u.fromBufferAttribute(y,o.index1),d.push(u.x,u.y,u.z),u.fromBufferAttribute(y,o.index2),d.push(u.x,u.y,u.z)}else for(y=t.attributes.position,e=0,i=y.count/3;e<i;e++)for(n=0;n<3;n++)E=3*e+n,u.fromBufferAttribute(y,E),d.push(u.x,u.y,u.z),T=3*e+(n+1)%3,u.fromBufferAttribute(y,T),d.push(u.x,u.y,u.z)}this.addAttribute("position",new At(d,3))}function Xe(t,e,n){yt.call(this),this.type="ParametricGeometry",this.parameters={func:t,slices:e,stacks:n},this.fromBufferGeometry(new qe(t,e,n)),this.mergeVertices()}function qe(t,e,n){Ct.call(this),this.type="ParametricBufferGeometry",this.parameters={func:t,slices:e,stacks:n};var i,r,a=[],o=[],s=[],c=[],h=new l,u=new l,d=new l,p=new l,f=new l,m=e+1;for(i=0;i<=n;i++){var v=i/n;for(r=0;r<=e;r++){var g=r/e;u=t(g,v,u),o.push(u.x,u.y,u.z),g-1e-5>=0?(d=t(g-1e-5,v,d),p.subVectors(u,d)):(d=t(g+1e-5,v,d),p.subVectors(d,u)),v-1e-5>=0?(d=t(g,v-1e-5,d),f.subVectors(u,d)):(d=t(g,v+1e-5,d),f.subVectors(d,u)),h.crossVectors(p,f).normalize(),s.push(h.x,h.y,h.z),c.push(g,v)}}for(i=0;i<n;i++)for(r=0;r<e;r++){var y=i*m+r,x=i*m+r+1,b=(i+1)*m+r+1,_=(i+1)*m+r;a.push(y,x,_),a.push(x,b,_)}this.setIndex(a),this.addAttribute("position",new At(o,3)),this.addAttribute("normal",new At(s,3)),this.addAttribute("uv",new At(c,2))}function Ye(t,e,n,i){yt.call(this),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i},this.fromBufferGeometry(new Ze(t,e,n,i)),this.mergeVertices()}function Ze(t,e,n,i){function a(t,e,n,i){var r,a,o=Math.pow(2,i),c=[];for(r=0;r<=o;r++){c[r]=[];var h=t.clone().lerp(n,r/o),l=e.clone().lerp(n,r/o),u=o-r;for(a=0;a<=u;a++)c[r][a]=0===a&&r===o?h:h.clone().lerp(l,a/u)}for(r=0;r<o;r++)for(a=0;a<2*(o-r)-1;a++){var d=Math.floor(a/2);a%2==0?(s(c[r][d+1]),s(c[r+1][d]),s(c[r][d])):(s(c[r][d+1]),s(c[r+1][d+1]),s(c[r+1][d]))}}function o(){for(var t=0;t<m.length;t+=6){var e=m[t+0],n=m[t+2],i=m[t+4],r=Math.max(e,n,i),a=Math.min(e,n,i);r>.9&&a<.1&&(e<.2&&(m[t+0]+=1),n<.2&&(m[t+2]+=1),i<.2&&(m[t+4]+=1))}}function s(t){f.push(t.x,t.y,t.z)}function c(e,n){var i=3*e;n.x=t[i+0],n.y=t[i+1],n.z=t[i+2]}function h(){for(var t=new l,e=new l,n=new l,i=new l,a=new r,o=new r,s=new r,c=0,h=0;c<f.length;c+=9,h+=6){t.set(f[c+0],f[c+1],f[c+2]),e.set(f[c+3],f[c+4],f[c+5]),n.set(f[c+6],f[c+7],f[c+8]),a.set(m[h+0],m[h+1]),o.set(m[h+2],m[h+3]),s.set(m[h+4],m[h+5]),i.copy(t).add(e).add(n).divideScalar(3);var p=d(i);u(a,h+0,t,p),u(o,h+2,e,p),u(s,h+4,n,p)}}function u(t,e,n,i){i<0&&1===t.x&&(m[e]=t.x-1),0===n.x&&0===n.z&&(m[e]=i/2/Math.PI+.5)}function d(t){return Math.atan2(t.z,-t.x)}function p(t){return Math.atan2(-t.y,Math.sqrt(t.x*t.x+t.z*t.z))}Ct.call(this),this.type="PolyhedronBufferGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i},n=n||1,i=i||0;var f=[],m=[];!function(t){for(var n=new l,i=new l,r=new l,o=0;o<e.length;o+=3)c(e[o+0],n),c(e[o+1],i),c(e[o+2],r),a(n,i,r,t)}(i),function(t){for(var e=new l,n=0;n<f.length;n+=3)e.x=f[n+0],e.y=f[n+1],e.z=f[n+2],e.normalize().multiplyScalar(t),f[n+0]=e.x,f[n+1]=e.y,f[n+2]=e.z}(n),function(){for(var t=new l,e=0;e<f.length;e+=3){t.x=f[e+0],t.y=f[e+1],t.z=f[e+2];var n=d(t)/2/Math.PI+.5,i=p(t)/Math.PI+.5;m.push(n,1-i)}h(),o()}(),this.addAttribute("position",new At(f,3)),this.addAttribute("normal",new At(f.slice(),3)),this.addAttribute("uv",new At(m,2)),0===i?this.computeVertexNormals():this.normalizeNormals()}function Je(t,e){yt.call(this),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e},this.fromBufferGeometry(new Qe(t,e)),this.mergeVertices()}function Qe(t,e){var n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];Ze.call(this,n,i,t,e),this.type="TetrahedronBufferGeometry",this.parameters={radius:t,detail:e}}function Ke(t,e){yt.call(this),this.type="OctahedronGeometry",this.parameters={radius:t,detail:e},this.fromBufferGeometry(new $e(t,e)),this.mergeVertices()}function $e(t,e){var n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];Ze.call(this,n,i,t,e),this.type="OctahedronBufferGeometry",this.parameters={radius:t,detail:e}}function tn(t,e){yt.call(this),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e},this.fromBufferGeometry(new en(t,e)),this.mergeVertices()}function en(t,e){var n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];Ze.call(this,i,r,t,e),this.type="IcosahedronBufferGeometry",this.parameters={radius:t,detail:e}}function nn(t,e){yt.call(this),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e},this.fromBufferGeometry(new rn(t,e)),this.mergeVertices()}function rn(t,e){var n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];Ze.call(this,r,a,t,e),this.type="DodecahedronBufferGeometry",this.parameters={radius:t,detail:e}}function an(t,e,n,i,r,a){yt.call(this),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r},void 0!==a&&console.warn("THREE.TubeGeometry: taper has been removed.");var o=new on(t,e,n,i,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals,this.fromBufferGeometry(o),this.mergeVertices()}function on(t,e,n,i,a){function o(r){var a=t.getPointAt(r/e),o=h.normals[r],s=h.binormals[r];for(d=0;d<=i;d++){var c=d/i*Math.PI*2,l=Math.sin(c),u=-Math.cos(c);f.x=u*o.x+l*s.x,f.y=u*o.y+l*s.y,f.z=u*o.z+l*s.z,f.normalize(),g.push(f.x,f.y,f.z),p.x=a.x+n*f.x,p.y=a.y+n*f.y,p.z=a.z+n*f.z,v.push(p.x,p.y,p.z)}}function s(){for(d=1;d<=e;d++)for(u=1;u<=i;u++){var t=(i+1)*(d-1)+(u-1),n=(i+1)*d+(u-1),r=(i+1)*d+u,a=(i+1)*(d-1)+u;x.push(t,n,a),x.push(n,r,a)}}function c(){for(u=0;u<=e;u++)for(d=0;d<=i;d++)m.x=u/e,m.y=d/i,y.push(m.x,m.y)}Ct.call(this),this.type="TubeBufferGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:a},e=e||64,n=n||1,i=i||8,a=a||!1;var h=t.computeFrenetFrames(e,a);this.tangents=h.tangents,this.normals=h.normals,this.binormals=h.binormals;var u,d,p=new l,f=new l,m=new r,v=[],g=[],y=[],x=[];!function(){for(u=0;u<e;u++)o(u);o(!1===a?e:0),c(),s()}(),this.setIndex(x),this.addAttribute("position",new At(v,3)),this.addAttribute("normal",new At(g,3)),this.addAttribute("uv",new At(y,2))}function sn(t,e,n,i,r,a,o){yt.call(this),this.type="TorusKnotGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:r,q:a},void 0!==o&&console.warn("THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead."),this.fromBufferGeometry(new cn(t,e,n,i,r,a)),this.mergeVertices()}function cn(t,e,n,i,r,a){function o(t,e,n,i,r){var a=Math.cos(t),o=Math.sin(t),s=n/e*t,c=Math.cos(s);r.x=i*(2+c)*.5*a,r.y=i*(2+c)*o*.5,r.z=i*Math.sin(s)*.5}Ct.call(this),this.type="TorusKnotBufferGeometry",this.parameters={radius:t,tube:e,tubularSegments:n,radialSegments:i,p:r,q:a},t=t||100,e=e||40,n=Math.floor(n)||64,i=Math.floor(i)||8,r=r||2,a=a||3;var s,c,h=[],u=[],d=[],p=[],f=new l,m=new l,v=new l,g=new l,y=new l,x=new l,b=new l;for(s=0;s<=n;++s){var _=s/n*r*Math.PI*2;for(o(_,r,a,t,v),o(_+.01,r,a,t,g),x.subVectors(g,v),b.addVectors(g,v),y.crossVectors(x,b),b.crossVectors(y,x),y.normalize(),b.normalize(),c=0;c<=i;++c){var w=c/i*Math.PI*2,M=-e*Math.cos(w),E=e*Math.sin(w);f.x=v.x+(M*b.x+E*y.x),f.y=v.y+(M*b.y+E*y.y),f.z=v.z+(M*b.z+E*y.z),u.push(f.x,f.y,f.z),m.subVectors(f,v).normalize(),d.push(m.x,m.y,m.z),p.push(s/n),p.push(c/i)}}for(c=1;c<=n;c++)for(s=1;s<=i;s++){var T=(i+1)*(c-1)+(s-1),S=(i+1)*c+(s-1),A=(i+1)*c+s,L=(i+1)*(c-1)+s;h.push(T,S,L),h.push(S,A,L)}this.setIndex(h),this.addAttribute("position",new At(u,3)),this.addAttribute("normal",new At(d,3)),this.addAttribute("uv",new At(p,2))}function hn(t,e,n,i,r){yt.call(this),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},this.fromBufferGeometry(new ln(t,e,n,i,r)),this.mergeVertices()}function ln(t,e,n,i,r){Ct.call(this),this.type="TorusBufferGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},t=t||100,e=e||40,n=Math.floor(n)||8,i=Math.floor(i)||6,r=r||2*Math.PI;var a,o,s=[],c=[],h=[],u=[],d=new l,p=new l,f=new l;for(a=0;a<=n;a++)for(o=0;o<=i;o++){var m=o/i*r,v=a/n*Math.PI*2;p.x=(t+e*Math.cos(v))*Math.cos(m),p.y=(t+e*Math.cos(v))*Math.sin(m),p.z=e*Math.sin(v),c.push(p.x,p.y,p.z),d.x=t*Math.cos(m),d.y=t*Math.sin(m),f.subVectors(p,d).normalize(),h.push(f.x,f.y,f.z),u.push(o/i),u.push(a/n)}for(a=1;a<=n;a++)for(o=1;o<=i;o++){var g=(i+1)*a+o-1,y=(i+1)*(a-1)+o-1,x=(i+1)*(a-1)+o,b=(i+1)*a+o;s.push(g,y,b),s.push(y,x,b)}this.setIndex(s),this.addAttribute("position",new At(c,3)),this.addAttribute("normal",new At(h,3)),this.addAttribute("uv",new At(u,2))}function un(t,e){yt.call(this),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},this.fromBufferGeometry(new dn(t,e)),this.mergeVertices()}function dn(t,e){void 0!==t&&(Ct.call(this),this.type="ExtrudeBufferGeometry",t=Array.isArray(t)?t:[t],this.addShapeList(t,e),this.computeVertexNormals())}function pn(t,e){yt.call(this),this.type="TextGeometry",this.parameters={text:t,parameters:e},this.fromBufferGeometry(new fn(t,e)),this.mergeVertices()}function fn(t,e){e=e||{};var n=e.font;if(!n||!n.isFont)return console.error("THREE.TextGeometry: font parameter is not an instance of THREE.Font."),new yt;var i=n.generateShapes(t,e.size,e.curveSegments);e.amount=void 0!==e.height?e.height:50,void 0===e.bevelThickness&&(e.bevelThickness=10),void 0===e.bevelSize&&(e.bevelSize=8),void 0===e.bevelEnabled&&(e.bevelEnabled=!1),dn.call(this,i,e),this.type="TextBufferGeometry"}function mn(t,e,n,i,r,a,o){yt.call(this),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},this.fromBufferGeometry(new vn(t,e,n,i,r,a,o)),this.mergeVertices()}function vn(t,e,n,i,r,a,o){Ct.call(this),this.type="SphereBufferGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},t=t||50,e=Math.max(3,Math.floor(e)||8),n=Math.max(2,Math.floor(n)||6),i=void 0!==i?i:0,r=void 0!==r?r:2*Math.PI,a=void 0!==a?a:0,o=void 0!==o?o:Math.PI;var s,c,h=a+o,u=0,d=[],p=new l,f=new l,m=[],v=[],g=[],y=[];for(c=0;c<=n;c++){var x=[],b=c/n;for(s=0;s<=e;s++){var _=s/e;p.x=-t*Math.cos(i+_*r)*Math.sin(a+b*o),p.y=t*Math.cos(a+b*o),p.z=t*Math.sin(i+_*r)*Math.sin(a+b*o),v.push(p.x,p.y,p.z),f.set(p.x,p.y,p.z).normalize(),g.push(f.x,f.y,f.z),y.push(_,1-b),x.push(u++)}d.push(x)}for(c=0;c<n;c++)for(s=0;s<e;s++){var w=d[c][s+1],M=d[c][s],E=d[c+1][s],T=d[c+1][s+1];(0!==c||a>0)&&m.push(w,M,T),(c!==n-1||h<Math.PI)&&m.push(M,E,T)}this.setIndex(m),this.addAttribute("position",new At(v,3)),this.addAttribute("normal",new At(g,3)),this.addAttribute("uv",new At(y,2))}function gn(t,e,n,i,r,a){yt.call(this),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},this.fromBufferGeometry(new yn(t,e,n,i,r,a)),this.mergeVertices()}function yn(t,e,n,i,a,o){Ct.call(this),this.type="RingBufferGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:a,thetaLength:o},t=t||20,e=e||50,a=void 0!==a?a:0,o=void 0!==o?o:2*Math.PI,n=void 0!==n?Math.max(3,n):8,i=void 0!==i?Math.max(1,i):1;var s,c,h,u=[],d=[],p=[],f=[],m=t,v=(e-t)/i,g=new l,y=new r;for(c=0;c<=i;c++){for(h=0;h<=n;h++)s=a+h/n*o,g.x=m*Math.cos(s),g.y=m*Math.sin(s),d.push(g.x,g.y,g.z),p.push(0,0,1),y.x=(g.x/e+1)/2,y.y=(g.y/e+1)/2,f.push(y.x,y.y);m+=v}for(c=0;c<i;c++){var x=c*(n+1);for(h=0;h<n;h++){s=h+x;var b=s,_=s+n+1,w=s+n+2,M=s+1;u.push(b,_,M),u.push(_,w,M)}}this.setIndex(u),this.addAttribute("position",new At(d,3)),this.addAttribute("normal",new At(p,3)),this.addAttribute("uv",new At(f,2))}function xn(t,e,n,i){yt.call(this),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},this.fromBufferGeometry(new bn(t,e,n,i)),this.mergeVertices()}function bn(t,e,n,i){Ct.call(this),this.type="LatheBufferGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e)||12,n=n||0,i=i||2*Math.PI,i=Xo.clamp(i,0,2*Math.PI);var a,o,s,c=[],h=[],u=[],d=1/e,p=new l,f=new r;for(o=0;o<=e;o++){var m=n+o*d*i,v=Math.sin(m),g=Math.cos(m);for(s=0;s<=t.length-1;s++)p.x=t[s].x*v,p.y=t[s].y,p.z=t[s].x*g,h.push(p.x,p.y,p.z),f.x=o/e,f.y=s/(t.length-1),u.push(f.x,f.y)}for(o=0;o<e;o++)for(s=0;s<t.length-1;s++){a=s+o*t.length;var y=a,x=a+t.length,b=a+t.length+1,_=a+1;c.push(y,x,_),c.push(x,b,_)}if(this.setIndex(c),this.addAttribute("position",new At(h,3)),this.addAttribute("uv",new At(u,2)),this.computeVertexNormals(),i===2*Math.PI){var w=this.attributes.normal.array,M=new l,E=new l,T=new l;for(a=e*t.length*3,o=0,s=0;o<t.length;o++,s+=3)M.x=w[s+0],M.y=w[s+1],M.z=w[s+2],E.x=w[a+s+0],E.y=w[a+s+1],E.z=w[a+s+2],T.addVectors(M,E).normalize(),w[s+0]=w[a+s+0]=T.x,w[s+1]=w[a+s+1]=T.y,w[s+2]=w[a+s+2]=T.z}}function _n(t,e){yt.call(this),this.type="ShapeGeometry","object"==typeof e&&(console.warn("THREE.ShapeGeometry: Options parameter has been removed."),e=e.curveSegments),this.parameters={shapes:t,curveSegments:e},this.fromBufferGeometry(new wn(t,e)),this.mergeVertices()}function wn(t,e){function n(t){var n,s,h,l=r.length/3,u=t.extractPoints(e),d=u.shape,p=u.holes;if(!1===ls.isClockWise(d))for(d=d.reverse(),n=0,s=p.length;n<s;n++)h=p[n],!0===ls.isClockWise(h)&&(p[n]=h.reverse());var f=ls.triangulateShape(d,p);for(n=0,s=p.length;n<s;n++)h=p[n],d=d.concat(h);for(n=0,s=d.length;n<s;n++){var m=d[n];r.push(m.x,m.y,0),a.push(0,0,1),o.push(m.x,m.y)}for(n=0,s=f.length;n<s;n++){var v=f[n],g=v[0]+l,y=v[1]+l,x=v[2]+l;i.push(g,y,x),c+=3}}Ct.call(this),this.type="ShapeBufferGeometry",this.parameters={shapes:t,curveSegments:e},e=e||12;var i=[],r=[],a=[],o=[],s=0,c=0;if(!1===Array.isArray(t))n(t);else for(var h=0;h<t.length;h++)n(t[h]),this.addGroup(s,c,h),s+=c,c=0;this.setIndex(i),this.addAttribute("position",new At(r,3)),this.addAttribute("normal",new At(a,3)),this.addAttribute("uv",new At(o,2))}function Mn(t,e){Ct.call(this),this.type="EdgesGeometry",this.parameters={thresholdAngle:e},e=void 0!==e?e:1;var n,i,r,a,o=[],s=Math.cos(Xo.DEG2RAD*e),c=[0,0],h={},l=["a","b","c"];t.isBufferGeometry?(a=new yt,a.fromBufferGeometry(t)):a=t.clone(),a.mergeVertices(),a.computeFaceNormals();for(var u=a.vertices,d=a.faces,p=0,f=d.length;p<f;p++)for(var m=d[p],v=0;v<3;v++)n=m[l[v]],i=m[l[(v+1)%3]],c[0]=Math.min(n,i),c[1]=Math.max(n,i),r=c[0]+","+c[1],void 0===h[r]?h[r]={index1:c[0],index2:c[1],face1:p,face2:void 0}:h[r].face2=p;for(r in h){var g=h[r];if(void 0===g.face2||d[g.face1].normal.dot(d[g.face2].normal)<=s){var y=u[g.index1];o.push(y.x,y.y,y.z),y=u[g.index2],o.push(y.x,y.y,y.z)}}this.addAttribute("position",new At(o,3))}function En(t,e,n,i,r,a,o,s){yt.call(this),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:s},this.fromBufferGeometry(new Tn(t,e,n,i,r,a,o,s)),this.mergeVertices()}function Tn(t,e,n,i,a,o,s,c){function h(n){var a,o,h,g=new r,b=new l,_=0,w=!0===n?t:e,M=!0===n?1:-1;for(o=v,a=1;a<=i;a++)p.push(0,y*M,0),f.push(0,M,0),m.push(.5,.5),v++;for(h=v,a=0;a<=i;a++){var E=a/i,T=E*c+s,S=Math.cos(T),A=Math.sin(T);b.x=w*A,b.y=y*M,b.z=w*S,p.push(b.x,b.y,b.z),f.push(0,M,0),g.x=.5*S+.5,g.y=.5*A*M+.5,m.push(g.x,g.y),v++}for(a=0;a<i;a++){var L=o+a,R=h+a;!0===n?d.push(R,R+1,L):d.push(R+1,R,L),_+=3}u.addGroup(x,_,!0===n?1:2),x+=_}Ct.call(this),this.type="CylinderBufferGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:a,openEnded:o,thetaStart:s,thetaLength:c};var u=this;t=void 0!==t?t:20,e=void 0!==e?e:20,n=void 0!==n?n:100,i=Math.floor(i)||8,a=Math.floor(a)||1,o=void 0!==o&&o,s=void 0!==s?s:0,c=void 0!==c?c:2*Math.PI;var d=[],p=[],f=[],m=[],v=0,g=[],y=n/2,x=0;!function(){var r,o,h=new l,b=new l,_=0,w=(e-t)/n;for(o=0;o<=a;o++){var M=[],E=o/a,T=E*(e-t)+t;for(r=0;r<=i;r++){var S=r/i,A=S*c+s,L=Math.sin(A),R=Math.cos(A);b.x=T*L,b.y=-E*n+y,b.z=T*R,p.push(b.x,b.y,b.z),h.set(L,w,R).normalize(),f.push(h.x,h.y,h.z),m.push(S,1-E),M.push(v++)}g.push(M)}for(r=0;r<i;r++)for(o=0;o<a;o++){var P=g[o][r],C=g[o+1][r],N=g[o+1][r+1],I=g[o][r+1];d.push(P,C,I),d.push(C,N,I),_+=6}u.addGroup(x,_,0),x+=_}(),!1===o&&(t>0&&h(!0),e>0&&h(!1)),this.setIndex(d),this.addAttribute("position",new At(p,3)),this.addAttribute("normal",new At(f,3)),this.addAttribute("uv",new At(m,2))}function Sn(t,e,n,i,r,a,o){En.call(this,0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}function An(t,e,n,i,r,a,o){Tn.call(this,0,t,e,n,i,r,a,o),this.type="ConeBufferGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}function Ln(t,e,n,i){yt.call(this),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},this.fromBufferGeometry(new Rn(t,e,n,i)),this.mergeVertices()}function Rn(t,e,n,i){Ct.call(this),this.type="CircleBufferGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},t=t||50,e=void 0!==e?Math.max(3,e):8,n=void 0!==n?n:0,i=void 0!==i?i:2*Math.PI;var a,o,s=[],c=[],h=[],u=[],d=new l,p=new r;for(c.push(0,0,0),h.push(0,0,1),u.push(.5,.5),o=0,a=3;o<=e;o++,a+=3){var f=n+o/e*i;d.x=t*Math.cos(f),d.y=t*Math.sin(f),c.push(d.x,d.y,d.z),h.push(0,0,1),p.x=(c[a]/t+1)/2,p.y=(c[a+1]/t+1)/2,u.push(p.x,p.y)}for(a=1;a<=e;a++)s.push(a,a+1,0);this.setIndex(s),this.addAttribute("position",new At(c,3)),this.addAttribute("normal",new At(h,3)),this.addAttribute("uv",new At(u,2))}function Pn(t){$.call(this),this.type="ShadowMaterial",this.color=new Y(0),this.opacity=1,this.lights=!0,this.transparent=!0,this.setValues(t)}function Cn(t){tt.call(this,t),this.type="RawShaderMaterial"}function Nn(t){$.call(this),this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Y(16777215),this.roughness=.5,this.metalness=.5,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalScale=new r(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}function In(t){Nn.call(this),this.defines={PHYSICAL:""},this.type="MeshPhysicalMaterial",this.reflectivity=.5,this.clearCoat=0,this.clearCoatRoughness=0,this.setValues(t)}function On(t){$.call(this),this.type="MeshPhongMaterial",this.color=new Y(16777215),this.specular=new Y(1118481),this.shininess=30,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalScale=new r(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}function Un(t){On.call(this),this.defines={TOON:""},this.type="MeshToonMaterial",this.gradientMap=null,this.setValues(t)}function Dn(t){$.call(this),this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalScale=new r(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}function Fn(t){$.call(this),this.type="MeshLambertMaterial",this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Ia,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.skinning=!1,this.morphTargets=!1,this.morphNormals=!1,this.setValues(t)}function zn(t){Ue.call(this),this.type="LineDashedMaterial",this.scale=1,this.dashSize=3,this.gapSize=1,this.setValues(t)}function Bn(t,e,n){var i=this,r=!1,a=0,o=0;this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(t){o++,!1===r&&void 0!==i.onStart&&i.onStart(t,a,o),r=!0},this.itemEnd=function(t){a++,void 0!==i.onProgress&&i.onProgress(t,a,o),a===o&&(r=!1,void 0!==i.onLoad&&i.onLoad())},this.itemError=function(t){void 0!==i.onError&&i.onError(t)}}function kn(t){this.manager=void 0!==t?t:fs}function jn(t){this.manager=void 0!==t?t:fs,this._parser=null}function Gn(t){this.manager=void 0!==t?t:fs,this._parser=null}function Vn(t){this.manager=void 0!==t?t:fs}function Hn(t){this.manager=void 0!==t?t:fs}function Wn(t){this.manager=void 0!==t?t:fs}function Xn(t,e){dt.call(this),this.type="Light",this.color=new Y(t),this.intensity=void 0!==e?e:1,this.receiveShadow=void 0}function qn(t,e,n){Xn.call(this,t,n),this.type="HemisphereLight",this.castShadow=void 0,this.position.copy(dt.DefaultUp),this.updateMatrix(),this.groundColor=new Y(e)}function Yn(t){this.camera=t,this.bias=0,this.radius=1,this.mapSize=new r(512,512),this.map=null,this.matrix=new u}function Zn(){Yn.call(this,new mt(50,1,.5,500))}function Jn(t,e,n,i,r,a){Xn.call(this,t,e),this.type="SpotLight",this.position.copy(dt.DefaultUp),this.updateMatrix(),this.target=new dt,Object.defineProperty(this,"power",{get:function(){return this.intensity*Math.PI},set:function(t){this.intensity=t/Math.PI}}),this.distance=void 0!==n?n:0,this.angle=void 0!==i?i:Math.PI/3,this.penumbra=void 0!==r?r:0,this.decay=void 0!==a?a:1,this.shadow=new Zn}function Qn(t,e,n,i){Xn.call(this,t,e),this.type="PointLight",Object.defineProperty(this,"power",{get:function(){return 4*this.intensity*Math.PI},set:function(t){this.intensity=t/(4*Math.PI)}}),this.distance=void 0!==n?n:0,this.decay=void 0!==i?i:1,this.shadow=new Yn(new mt(90,1,.5,500))}function Kn(){Yn.call(this,new ft(-5,5,5,-5,.5,500))}function $n(t,e){Xn.call(this,t,e),this.type="DirectionalLight",this.position.copy(dt.DefaultUp),this.updateMatrix(),this.target=new dt,this.shadow=new Kn}function ti(t,e){Xn.call(this,t,e),this.type="AmbientLight",this.castShadow=void 0}function ei(t,e,n,i){Xn.call(this,t,e),this.type="RectAreaLight",this.position.set(0,1,0),this.updateMatrix(),this.width=void 0!==n?n:10,this.height=void 0!==i?i:10}function ni(t,e,n,i){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=void 0!==i?i:new e.constructor(n),this.sampleValues=e,this.valueSize=n}function ii(t,e,n,i){ni.call(this,t,e,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0}function ri(t,e,n,i){ni.call(this,t,e,n,i)}function ai(t,e,n,i){ni.call(this,t,e,n,i)}function oi(t,e,n,i){if(void 0===t)throw new Error("track name is undefined");if(void 0===e||0===e.length)throw new Error("no keyframes in track named "+t);this.name=t,this.times=ms.convertArray(e,this.TimeBufferType),this.values=ms.convertArray(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation),this.validate(),this.optimize()}function si(t,e,n,i){oi.call(this,t,e,n,i)}function ci(t,e,n,i){ni.call(this,t,e,n,i)}function hi(t,e,n,i){oi.call(this,t,e,n,i)}function li(t,e,n,i){oi.call(this,t,e,n,i)}function ui(t,e,n,i){oi.call(this,t,e,n,i)}function di(t,e,n){oi.call(this,t,e,n)}function pi(t,e,n,i){oi.call(this,t,e,n,i)}function fi(t,e,n,i){oi.apply(this,arguments)}function mi(t,e,n){this.name=t,this.tracks=n,this.duration=void 0!==e?e:-1,this.uuid=Xo.generateUUID(),this.duration<0&&this.resetDuration(),this.optimize()}function vi(t){this.manager=void 0!==t?t:fs,this.textures={}}function gi(t){this.manager=void 0!==t?t:fs}function yi(){this.onLoadStart=function(){},this.onLoadProgress=function(){},this.onLoadComplete=function(){}}function xi(t){"boolean"==typeof t&&(console.warn("THREE.JSONLoader: showStatus parameter has been removed from constructor."),t=void 0),this.manager=void 0!==t?t:fs,this.withCredentials=!1}function bi(t){this.manager=void 0!==t?t:fs,this.texturePath=""}function _i(t,e,n,i,r){var a=.5*(i-e),o=.5*(r-n),s=t*t;return(2*n-2*i+a+o)*(t*s)+(-3*n+3*i-2*a-o)*s+a*t+n}function wi(t,e){var n=1-t;return n*n*e}function Mi(t,e){return 2*(1-t)*t*e}function Ei(t,e){return t*t*e}function Ti(t,e,n,i){return wi(t,e)+Mi(t,n)+Ei(t,i)}function Si(t,e){var n=1-t;return n*n*n*e}function Ai(t,e){var n=1-t;return 3*n*n*t*e}function Li(t,e){return 3*(1-t)*t*t*e}function Ri(t,e){return t*t*t*e}function Pi(t,e,n,i,r){return Si(t,e)+Ai(t,n)+Li(t,i)+Ri(t,r)}function Ci(){this.arcLengthDivisions=200}function Ni(t,e){Ci.call(this),this.v1=t,this.v2=e}function Ii(){Ci.call(this),this.curves=[],this.autoClose=!1}function Oi(t,e,n,i,r,a,o,s){Ci.call(this),this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s||0}function Ui(t){Ci.call(this),this.points=void 0===t?[]:t}function Di(t,e,n,i){Ci.call(this),this.v0=t,this.v1=e,this.v2=n,this.v3=i}function Fi(t,e,n){Ci.call(this),this.v0=t,this.v1=e,this.v2=n}function zi(t){Ii.call(this),this.currentPoint=new r,t&&this.fromPoints(t)}function Bi(){zi.apply(this,arguments),this.holes=[]}function ki(){this.subPaths=[],this.currentPath=null}function ji(t){this.data=t}function Gi(t){this.manager=void 0!==t?t:fs}function Vi(t){this.manager=void 0!==t?t:fs}function Hi(){this.type="StereoCamera",this.aspect=1,this.eyeSep=.064,this.cameraL=new mt,this.cameraL.layers.enable(1),this.cameraL.matrixAutoUpdate=!1,this.cameraR=new mt,this.cameraR.layers.enable(2),this.cameraR.matrixAutoUpdate=!1}function Wi(t,e,n){dt.call(this),this.type="CubeCamera";var i=new mt(90,1,t,e);i.up.set(0,-1,0),i.lookAt(new l(1,0,0)),this.add(i);var r=new mt(90,1,t,e);r.up.set(0,-1,0),r.lookAt(new l(-1,0,0)),this.add(r);var a=new mt(90,1,t,e);a.up.set(0,0,1),a.lookAt(new l(0,1,0)),this.add(a);var o=new mt(90,1,t,e);o.up.set(0,0,-1),o.lookAt(new l(0,-1,0)),this.add(o);var s=new mt(90,1,t,e);s.up.set(0,-1,0),s.lookAt(new l(0,0,1)),this.add(s);var h=new mt(90,1,t,e);h.up.set(0,-1,0),h.lookAt(new l(0,0,-1)),this.add(h);var u={format:go,magFilter:to,minFilter:to};this.renderTarget=new c(n,n,u),this.renderTarget.texture.name="CubeCamera",this.update=function(t,e){null===this.parent&&this.updateMatrixWorld();var n=this.renderTarget,c=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,n.activeCubeFace=0,t.render(e,i,n),n.activeCubeFace=1,t.render(e,r,n),n.activeCubeFace=2,t.render(e,a,n),n.activeCubeFace=3,t.render(e,o,n),n.activeCubeFace=4,t.render(e,s,n),n.texture.generateMipmaps=c,n.activeCubeFace=5,t.render(e,h,n),t.setRenderTarget(null)},this.clear=function(t,e,n,i){for(var r=this.renderTarget,a=0;a<6;a++)r.activeCubeFace=a,t.setRenderTarget(r),t.clear(e,n,i);t.setRenderTarget(null)}}function Xi(){dt.call(this),this.type="AudioListener",this.context=Ms.getContext(),this.gain=this.context.createGain(),this.gain.connect(this.context.destination),this.filter=null}function qi(t){dt.call(this),this.type="Audio",this.context=t.context,this.gain=this.context.createGain(),this.gain.connect(t.getInput()),this.autoplay=!1,this.buffer=null,this.loop=!1,this.startTime=0,this.playbackRate=1,this.isPlaying=!1,this.hasPlaybackControl=!0,this.sourceType="empty",this.filters=[]}function Yi(t){qi.call(this,t),this.panner=this.context.createPanner(),this.panner.connect(this.gain)}function Zi(t,e){this.analyser=t.context.createAnalyser(),this.analyser.fftSize=void 0!==e?e:2048,this.data=new Uint8Array(this.analyser.frequencyBinCount),t.getOutput().connect(this.analyser)}function Ji(t,e,n){this.binding=t,this.valueSize=n;var i,r=Float64Array;switch(e){case"quaternion":i=this._slerp;break;case"string":case"bool":r=Array,i=this._select;break;default:i=this._lerp}this.buffer=new r(4*n),this._mixBufferRegion=i,this.cumulativeWeight=0,this.useCount=0,this.referenceCount=0}function Qi(t,e,n){var i=n||Ki.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,i)}function Ki(t,e,n){this.path=e,this.parsedPath=n||Ki.parseTrackName(e),this.node=Ki.findNode(t,this.parsedPath.nodeName)||t,this.rootNode=t}function $i(t){this.uuid=Xo.generateUUID(),this._objects=Array.prototype.slice.call(arguments),this.nCachedObjects_=0;var e={};this._indicesByUUID=e;for(var n=0,i=arguments.length;n!==i;++n)e[arguments[n].uuid]=n;this._paths=[],this._parsedPaths=[],this._bindings=[],this._bindingsIndicesByPath={};var r=this;this.stats={objects:{get total(){return r._objects.length},get inUse(){return this.total-r.nCachedObjects_}},get bindingsPerObject(){return r._bindings.length}}}function tr(t,e,n){this._mixer=t,this._clip=e,this._localRoot=n||null;for(var i=e.tracks,r=i.length,a=new Array(r),o={endingStart:Io,endingEnd:Io},s=0;s!==r;++s){var c=i[s].createInterpolant(null);a[s]=c,c.settings=o}this._interpolantSettings=o,this._interpolants=a,this._propertyBindings=new Array(r),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=No,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}function er(t){this._root=t,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}function nr(t){"string"==typeof t&&(console.warn("THREE.Uniform: Type parameter is no longer needed."),t=arguments[1]),this.value=t}function ir(){Ct.call(this),this.type="InstancedBufferGeometry",this.maxInstancedCount=void 0}function rr(t,e,n,i){this.uuid=Xo.generateUUID(),this.data=t,this.itemSize=e,this.offset=n,this.normalized=!0===i}function ar(t,e){this.uuid=Xo.generateUUID(),this.array=t,this.stride=e,this.count=void 0!==t?t.length/e:0,this.dynamic=!1,this.updateRange={offset:0,count:-1},this.onUploadCallback=function(){},this.version=0}function or(t,e,n){ar.call(this,t,e),this.meshPerAttribute=n||1}function sr(t,e,n){xt.call(this,t,e),this.meshPerAttribute=n||1}function cr(t,e,n,i){this.ray=new Ft(t,e),this.near=n||0,this.far=i||1/0,this.params={Mesh:{},Line:{},LOD:{},Points:{threshold:1},Sprite:{}},Object.defineProperties(this.params,{PointCloud:{get:function(){return console.warn("THREE.Raycaster: params.PointCloud has been renamed to params.Points."),this.Points}}})}function hr(t,e){return t.distance-e.distance}function lr(t,e,n,i){if(!1!==t.visible&&(t.raycast(e,n),!0===i))for(var r=t.children,a=0,o=r.length;a<o;a++)lr(r[a],e,n,!0)}function ur(t){this.autoStart=void 0===t||t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}function dr(t,e,n){return this.radius=void 0!==t?t:1,this.phi=void 0!==e?e:0,this.theta=void 0!==n?n:0,this}function pr(t,e,n){return this.radius=void 0!==t?t:1,this.theta=void 0!==e?e:0,this.y=void 0!==n?n:0,this}function fr(t){dt.call(this),this.material=t,this.render=function(t){}}function mr(t,e,n,i){this.object=t,this.size=void 0!==e?e:1;var r=void 0!==n?n:16711680,a=void 0!==i?i:1,o=0,s=this.object.geometry;s&&s.isGeometry?o=3*s.faces.length:s&&s.isBufferGeometry&&(o=s.attributes.normal.count);var c=new Ct,h=new At(2*o*3,3);c.addAttribute("position",h),Fe.call(this,c,new Ue({color:r,linewidth:a})),this.matrixAutoUpdate=!1,this.update()}function vr(t,e){dt.call(this),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=e;for(var n=new Ct,i=[0,0,0,0,0,1,0,0,0,1,0,1,0,0,0,-1,0,1,0,0,0,0,1,1,0,0,0,0,-1,1],r=0,a=1;r<32;r++,a++){var o=r/32*Math.PI*2,s=a/32*Math.PI*2;i.push(Math.cos(o),Math.sin(o),1,Math.cos(s),Math.sin(s),1)}n.addAttribute("position",new At(i,3));var c=new Ue({fog:!1});this.cone=new Fe(n,c),this.add(this.cone),this.update()}function gr(t){var e=[];t&&t.isBone&&e.push(t);for(var n=0;n<t.children.length;n++)e.push.apply(e,gr(t.children[n]));return e}function yr(t){for(var e=gr(t),n=new Ct,i=[],r=[],a=new Y(0,0,1),o=new Y(0,1,0),s=0;s<e.length;s++){var c=e[s];c.parent&&c.parent.isBone&&(i.push(0,0,0),i.push(0,0,0),r.push(a.r,a.g,a.b),r.push(o.r,o.g,o.b))}n.addAttribute("position",new At(i,3)),n.addAttribute("color",new At(r,3));var h=new Ue({vertexColors:na,depthTest:!1,depthWrite:!1,transparent:!0});Fe.call(this,n,h),this.root=t,this.bones=e,this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.onBeforeRender()}function xr(t,e,n){this.light=t,this.light.updateMatrixWorld(),this.color=n;var i=new vn(e,4,2),r=new Dt({wireframe:!0,fog:!1});kt.call(this,i,r),this.matrix=this.light.matrixWorld,this.matrixAutoUpdate=!1,this.update()}function br(t,e){dt.call(this),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=e;var n=new Ue({fog:!1}),i=new Ct;i.addAttribute("position",new xt(new Float32Array(15),3)),this.line=new De(i,n),this.add(this.line),this.update()}function _r(t,e,n){dt.call(this),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n;var i=new $e(e);i.rotateY(.5*Math.PI),this.material=new Dt({wireframe:!0,fog:!1}),void 0===this.color&&(this.material.vertexColors=na);var r=i.getAttribute("position"),a=new Float32Array(3*r.count);i.addAttribute("color",new xt(a,3)),this.add(new kt(i,this.material)),this.update()}function wr(t,e,n,i){t=t||10,e=e||10,n=new Y(void 0!==n?n:4473924),i=new Y(void 0!==i?i:8947848);for(var r=e/2,a=t/e,o=t/2,s=[],c=[],h=0,l=0,u=-o;h<=e;h++,u+=a){s.push(-o,0,u,o,0,u),s.push(u,0,-o,u,0,o);var d=h===r?n:i;d.toArray(c,l),l+=3,d.toArray(c,l),l+=3,d.toArray(c,l),l+=3,d.toArray(c,l),l+=3}var p=new Ct;p.addAttribute("position",new At(s,3)),p.addAttribute("color",new At(c,3));var f=new Ue({vertexColors:na});Fe.call(this,p,f)}function Mr(t,e,n,i,r,a){t=t||10,e=e||16,n=n||8,i=i||64,r=new Y(void 0!==r?r:4473924),a=new Y(void 0!==a?a:8947848);var o,s,c,h,l,u,d,p=[],f=[];for(h=0;h<=e;h++)c=h/e*(2*Math.PI),o=Math.sin(c)*t,s=Math.cos(c)*t,p.push(0,0,0),p.push(o,0,s),d=1&h?r:a,f.push(d.r,d.g,d.b),f.push(d.r,d.g,d.b);for(h=0;h<=n;h++)for(d=1&h?r:a,u=t-t/n*h,l=0;l<i;l++)c=l/i*(2*Math.PI),o=Math.sin(c)*u,s=Math.cos(c)*u,p.push(o,0,s),f.push(d.r,d.g,d.b),c=(l+1)/i*(2*Math.PI),o=Math.sin(c)*u,s=Math.cos(c)*u,p.push(o,0,s),f.push(d.r,d.g,d.b);var m=new Ct;m.addAttribute("position",new At(p,3)),m.addAttribute("color",new At(f,3));var v=new Ue({vertexColors:na});Fe.call(this,m,v)}function Er(t,e,n,i){this.object=t,this.size=void 0!==e?e:1;var r=void 0!==n?n:16776960,a=void 0!==i?i:1,o=0,s=this.object.geometry;s&&s.isGeometry?o=s.faces.length:console.warn("THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.");var c=new Ct,h=new At(2*o*3,3);c.addAttribute("position",h),Fe.call(this,c,new Ue({color:r,linewidth:a})),this.matrixAutoUpdate=!1,this.update()}function Tr(t,e,n){dt.call(this),this.light=t,this.light.updateMatrixWorld(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,void 0===e&&(e=1);var i=new Ct;i.addAttribute("position",new At([-e,e,0,e,e,0,e,-e,0,-e,-e,0,-e,e,0],3));var r=new Ue({fog:!1});this.lightPlane=new De(i,r),this.add(this.lightPlane),i=new Ct,i.addAttribute("position",new At([0,0,0,0,0,1],3)),this.targetLine=new De(i,r),this.add(this.targetLine),this.update()}function Sr(t){function e(t,e,i){n(t,i),n(e,i)}function n(t,e){a.push(0,0,0),o.push(e.r,e.g,e.b),void 0===s[t]&&(s[t]=[]),s[t].push(a.length/3-1)}var i=new Ct,r=new Ue({color:16777215,vertexColors:ea}),a=[],o=[],s={},c=new Y(16755200),h=new Y(16711680),l=new Y(43775),u=new Y(16777215),d=new Y(3355443);e("n1","n2",c),e("n2","n4",c),e("n4","n3",c),e("n3","n1",c),e("f1","f2",c),e("f2","f4",c),e("f4","f3",c),e("f3","f1",c),e("n1","f1",c),e("n2","f2",c),e("n3","f3",c),e("n4","f4",c),e("p","n1",h),e("p","n2",h),e("p","n3",h),e("p","n4",h),e("u1","u2",l),e("u2","u3",l),e("u3","u1",l),e("c","t",u),e("p","c",d),e("cn1","cn2",d),e("cn3","cn4",d),e("cf1","cf2",d),e("cf3","cf4",d),i.addAttribute("position",new At(a,3)),i.addAttribute("color",new At(o,3)),Fe.call(this,i,r),this.camera=t,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=t.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=s,this.update()}function Ar(t,e){this.object=t,void 0===e&&(e=16776960);var n=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),i=new Float32Array(24),r=new Ct;r.setIndex(new xt(n,1)),r.addAttribute("position",new xt(i,3)),Fe.call(this,r,new Ue({color:e})),this.matrixAutoUpdate=!1,this.update()}function Lr(t,e){this.type="Box3Helper",this.box=t;var n=void 0!==e?e:16776960,i=new Uint16Array([0,1,1,2,2,3,3,0,4,5,5,6,6,7,7,4,0,4,1,5,2,6,3,7]),r=[1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1],a=new Ct;a.setIndex(new xt(i,1)),a.addAttribute("position",new At(r,3)),Fe.call(this,a,new Ue({color:n})),this.geometry.computeBoundingSphere(),this.onBeforeRender()}function Rr(t,e,n){this.type="PlaneHelper",this.plane=t,this.size=void 0===e?1:e;var i=void 0!==n?n:16776960,r=[1,-1,1,-1,1,1,-1,-1,1,1,1,1,-1,1,1,-1,-1,1,1,-1,1,1,1,1,0,0,1,0,0,0],a=new Ct;a.addAttribute("position",new At(r,3)),a.computeBoundingSphere(),De.call(this,a,new Ue({color:i}));var o=[1,1,1,-1,1,1,-1,-1,1,1,1,1,-1,-1,1,1,-1,1],s=new Ct;s.addAttribute("position",new At(o,3)),s.computeBoundingSphere(),this.add(new kt(s,new Dt({color:i,opacity:.2,transparent:!0,depthWrite:!1}))),this.onBeforeRender()}function Pr(t,e,n,i,r,a){dt.call(this),void 0===i&&(i=16776960),void 0===n&&(n=1),void 0===r&&(r=.2*n),void 0===a&&(a=.2*r),void 0===Es&&(Es=new Ct,Es.addAttribute("position",new At([0,0,0,0,1,0],3)),Ts=new Tn(0,.5,1,5,1),Ts.translate(0,-.5,0)),this.position.copy(e),this.line=new De(Es,new Ue({color:i})),this.line.matrixAutoUpdate=!1,this.add(this.line),this.cone=new kt(Ts,new Dt({color:i})),this.cone.matrixAutoUpdate=!1,this.add(this.cone),this.setDirection(t),this.setLength(n,r,a)}function Cr(t){t=t||1;var e=[0,0,0,t,0,0,0,0,0,0,t,0,0,0,0,0,0,t],n=[1,0,0,1,.6,0,0,1,0,.6,1,0,0,0,1,0,.6,1],i=new Ct;i.addAttribute("position",new At(e,3)),i.addAttribute("color",new At(n,3));var r=new Ue({vertexColors:na});Fe.call(this,i,r)}function Nr(){function t(t,a,o,s){e=t,n=o,i=-3*t+3*a-2*o-s,r=2*t-2*a+o+s}var e=0,n=0,i=0,r=0;return{initCatmullRom:function(e,n,i,r,a){t(n,i,a*(i-e),a*(r-n))},initNonuniformCatmullRom:function(e,n,i,r,a,o,s){var c=(n-e)/a-(i-e)/(a+o)+(i-n)/o,h=(i-n)/o-(r-n)/(o+s)+(r-i)/s;c*=o,h*=o,t(n,i,c,h)},calc:function(t){var a=t*t;return e+n*t+i*a+r*(a*t)}}}function Ir(t){Ci.call(this),t.length<2&&console.warn("THREE.CatmullRomCurve3: Points array needs at least two entries."),this.points=t||[],this.closed=!1}function Or(t,e,n,i){Ci.call(this),this.v0=t,this.v1=e,this.v2=n,this.v3=i}function Ur(t,e,n){Ci.call(this),this.v0=t,this.v1=e,this.v2=n}function Dr(t,e){Ci.call(this),this.v1=t,this.v2=e}function Fr(t,e,n,i,r,a){Oi.call(this,t,e,n,n,i,r,a)}function zr(t){console.warn("THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."),Ir.call(this,t),this.type="catmullrom",this.closed=!0}function Br(t){console.warn("THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead."),Ir.call(this,t),this.type="catmullrom"}function kr(t){console.warn("THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead."),Ir.call(this,t),this.type="catmullrom"}n.d(e,"m",function(){return Ee}),n.d(e,"k",function(){return Ae}),n.d(e,"_0",function(){return Oe}),n.d(e,"X",function(){return Ne}),n.d(e,"Y",function(){return Ie}),n.d(e,"a",function(){return kt}),n.d(e,"L",function(){return Fe}),n.d(e,"Z",function(){return De}),n.d(e,"H",function(){return je}),n.d(e,"B",function(){return jn}),n.d(e,"A",function(){return Wn}),n.d(e,"_1",function(){return bi}),n.d(e,"c",function(){return fs}),n.d(e,"d",function(){return kn}),n.d(e,"x",function(){return yi}),n.d(e,"U",function(){return Jn}),n.d(e,"T",function(){return Qn}),n.d(e,"q",function(){return qn}),n.d(e,"p",function(){return $n}),n.d(e,"o",function(){return ti}),n.d(e,"j",function(){return mt}),n.d(e,"v",function(){return ft}),n.d(e,"M",function(){return si}),n.d(e,"N",function(){return hi}),n.d(e,"O",function(){return mi}),n.d(e,"e",function(){return Ct}),n.d(e,"l",function(){return dt}),n.d(e,"h",function(){return cr}),n.d(e,"w",function(){return i}),n.d(e,"W",function(){return Xo}),n.d(e,"u",function(){return dr}),n.d(e,"P",function(){return u}),n.d(e,"r",function(){return it}),n.d(e,"g",function(){return l}),n.d(e,"i",function(){return r}),n.d(e,"t",function(){return h}),n.d(e,"n",function(){return Y}),n.d(e,"b",function(){return On}),n.d(e,"Q",function(){return Fn}),n.d(e,"R",function(){return Dt}),n.d(e,"I",function(){return Ue}),n.d(e,"V",function(){return At}),n.d(e,"f",function(){return xt}),n.d(e,"s",function(){return Gr}),n.d(e,"y",function(){return Zr}),n.d(e,"K",function(){return Kr}),n.d(e,"J",function(){return $r}),n.d(e,"z",function(){return Ya}),n.d(e,"S",function(){return Za}),n.d(e,"G",function(){return yo}),n.d(e,"C",function(){return Mo}),n.d(e,"D",function(){return To}),n.d(e,"E",function(){return So}),n.d(e,"F",function(){return Co}),void 0===Number.EPSILON&&(Number.EPSILON=Math.pow(2,-52)),void 0===Number.isInteger&&(Number.isInteger=function(t){return"number"==typeof t&&isFinite(t)&&Math.floor(t)===t}),void 0===Math.sign&&(Math.sign=function(t){return t<0?-1:t>0?1:+t}),void 0===Function.prototype.name&&Object.defineProperty(Function.prototype,"name",{get:function(){return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]}}),void 0===Object.assign&&function(){Object.assign=function(t){if(void 0===t||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(void 0!==i&&null!==i)for(var r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r])}return e}}(),Object.assign(i.prototype,{addEventListener:function(t,e){void 0===this._listeners&&(this._listeners={});var n=this._listeners;void 0===n[t]&&(n[t]=[]),-1===n[t].indexOf(e)&&n[t].push(e)},hasEventListener:function(t,e){if(void 0===this._listeners)return!1;var n=this._listeners;return void 0!==n[t]&&-1!==n[t].indexOf(e)},removeEventListener:function(t,e){if(void 0!==this._listeners){var n=this._listeners,i=n[t];if(void 0!==i){var r=i.indexOf(e);-1!==r&&i.splice(r,1)}}},dispatchEvent:function(t){if(void 0!==this._listeners){var e=this._listeners,n=e[t.type];if(void 0!==n){t.target=this;for(var i=n.slice(0),r=0,a=i.length;r<a;r++)i[r].call(this,t)}}}});var jr="87",Gr={LEFT:0,MIDDLE:1,RIGHT:2},Vr=0,Hr=1,Wr=2,Xr=0,qr=1,Yr=2,Zr=0,Jr=1,Qr=2,Kr=1,$r=2,ta=0,ea=1,na=2,ia=0,ra=1,aa=2,oa=3,sa=4,ca=5,ha=100,la=101,ua=102,da=103,pa=104,fa=200,ma=201,va=202,ga=203,ya=204,xa=205,ba=206,_a=207,wa=208,Ma=209,Ea=210,Ta=0,Sa=1,Aa=2,La=3,Ra=4,Pa=5,Ca=6,Na=7,Ia=0,Oa=1,Ua=2,Da=0,Fa=1,za=2,Ba=3,ka=4,ja=301,Ga=302,Va=303,Ha=304,Wa=305,Xa=306,qa=307,Ya=1e3,Za=1001,Ja=1002,Qa=1003,Ka=1004,$a=1005,to=1006,eo=1007,no=1008,io=1009,ro=1010,ao=1011,oo=1012,so=1013,co=1014,ho=1015,lo=1016,uo=1017,po=1018,fo=1019,mo=1020,vo=1021,go=1022,yo=1023,xo=1024,bo=1025,_o=1026,wo=1027,Mo=2001,Eo=2002,To=2003,So=2004,Ao=2100,Lo=2101,Ro=2102,Po=2103,Co=2151,No=2201,Io=2400,Oo=0,Uo=1,Do=2,Fo=3e3,zo=3001,Bo=3007,ko=3002,jo=3004,Go=3005,Vo=3006,Ho=3200,Wo=3201,Xo={DEG2RAD:Math.PI/180,RAD2DEG:180/Math.PI,generateUUID:function(){var t,e="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),n=new Array(36),i=0;return function(){for(var r=0;r<36;r++)8===r||13===r||18===r||23===r?n[r]="-":14===r?n[r]="4":(i<=2&&(i=33554432+16777216*Math.random()|0),t=15&i,i>>=4,n[r]=e[19===r?3&t|8:t]);return n.join("")}}(),clamp:function(t,e,n){return Math.max(e,Math.min(n,t))},euclideanModulo:function(t,e){return(t%e+e)%e},mapLinear:function(t,e,n,i,r){return i+(t-e)*(r-i)/(n-e)},lerp:function(t,e,n){return(1-n)*t+n*e},smoothstep:function(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*(3-2*t)},smootherstep:function(t,e,n){return t<=e?0:t>=n?1:(t=(t-e)/(n-e))*t*t*(t*(6*t-15)+10)},randInt:function(t,e){return t+Math.floor(Math.random()*(e-t+1))},randFloat:function(t,e){return t+Math.random()*(e-t)},randFloatSpread:function(t){return t*(.5-Math.random())},degToRad:function(t){return t*Xo.DEG2RAD},radToDeg:function(t){return t*Xo.RAD2DEG},isPowerOfTwo:function(t){return 0==(t&t-1)&&0!==t},nearestPowerOfTwo:function(t){return Math.pow(2,Math.round(Math.log(t)/Math.LN2))},nextPowerOfTwo:function(t){return t--,t|=t>>1,t|=t>>2,t|=t>>4,t|=t>>8,t|=t>>16,++t}};Object.defineProperties(r.prototype,{width:{get:function(){return this.x},set:function(t){this.x=t}},height:{get:function(){return this.y},set:function(t){this.y=t}}}),Object.assign(r.prototype,{isVector2:!0,set:function(t,e){return this.x=t,this.y=e,this},setScalar:function(t){return this.x=t,this.y=t,this},setX:function(t){return this.x=t,this},setY:function(t){return this.y=t,this},setComponent:function(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this},getComponent:function(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}},clone:function(){return new this.constructor(this.x,this.y)},copy:function(t){return this.x=t.x,this.y=t.y,this},add:function(t,e){return void 0!==e?(console.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this)},addScalar:function(t){return this.x+=t,this.y+=t,this},addVectors:function(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this},addScaledVector:function(t,e){return this.x+=t.x*e,this.y+=t.y*e,this},sub:function(t,e){return void 0!==e?(console.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this)},subScalar:function(t){return this.x-=t,this.y-=t,this},subVectors:function(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this},multiply:function(t){return this.x*=t.x,this.y*=t.y,this},multiplyScalar:function(t){return this.x*=t,this.y*=t,this},divide:function(t){return this.x/=t.x,this.y/=t.y,this},divideScalar:function(t){return this.multiplyScalar(1/t)},min:function(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this},max:function(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this},clamp:function(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this},clampScalar:function(){var t=new r,e=new r;return function(n,i){return t.set(n,n),e.set(i,i),this.clamp(t,e)}}(),clampLength:function(t,e){var n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this},negate:function(){return this.x=-this.x,this.y=-this.y,this},dot:function(t){return this.x*t.x+this.y*t.y},lengthSq:function(){return this.x*this.x+this.y*this.y},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)},normalize:function(){return this.divideScalar(this.length()||1)},angle:function(){var t=Math.atan2(this.y,this.x);return t<0&&(t+=2*Math.PI),t},distanceTo:function(t){return Math.sqrt(this.distanceToSquared(t))},distanceToSquared:function(t){var e=this.x-t.x,n=this.y-t.y;return e*e+n*n},distanceToManhattan:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)},setLength:function(t){return this.normalize().multiplyScalar(t)},lerp:function(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this},lerpVectors:function(t,e,n){return this.subVectors(e,t).multiplyScalar(n).add(t)},equals:function(t){return t.x===this.x&&t.y===this.y},fromArray:function(t,e){return void 0===e&&(e=0),this.x=t[e],this.y=t[e+1],this},toArray:function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this.x,t[e+1]=this.y,t},fromBufferAttribute:function(t,e,n){return void 0!==n&&console.warn("THREE.Vector2: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this},rotateAround:function(t,e){var n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}});var qo=0;a.DEFAULT_IMAGE=void 0,a.DEFAULT_MAPPING=300,Object.defineProperty(a.prototype,"needsUpdate",{set:function(t){!0===t&&this.version++}}),Object.assign(a.prototype,i.prototype,{constructor:a,isTexture:!0,clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.name=t.name,this.image=t.image,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this},toJSON:function(t){if(void 0!==t.textures[this.uuid])return t.textures[this.uuid];var e={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,mapping:this.mapping,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],wrap:[this.wrapS,this.wrapT],minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY};if(void 0!==this.image){var n=this.image;void 0===n.uuid&&(n.uuid=Xo.generateUUID()),void 0===t.images[n.uuid]&&(t.images[n.uuid]={uuid:n.uuid,url:function(t){var e;if(t instanceof HTMLCanvasElement)e=t;else{e=document.createElementNS("http://www.w3.org/1999/xhtml","canvas"),e.width=t.width,e.height=t.height;var n=e.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height)}return e.width>2048||e.height>2048?e.toDataURL("image/jpeg",.6):e.toDataURL("image/png")}(n)}),e.image=n.uuid}return t.textures[this.uuid]=e,e},dispose:function(){this.dispatchEvent({type:"dispose"})},transformUv:function(t){if(300===this.mapping){if(t.multiply(this.repeat),t.add(this.offset),t.x<0||t.x>1)switch(this.wrapS){case Ya:t.x=t.x-Math.floor(t.x);break;case Za:t.x=t.x<0?0:1;break;case Ja:1===Math.abs(Math.floor(t.x)%2)?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x)}if(t.y<0||t.y>1)switch(this.wrapT){case Ya:t.y=t.y-Math.floor(t.y);break;case Za:t.y=t.y<0?0:1;break;case Ja:1===Math.abs(Math.floor(t.y)%2)?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y)}this.flipY&&(t.y=1-t.y)}}}),Object.assign(o.prototype,{isVector4:!0,set:function(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this},setScalar:function(t){return this.x=t,this.y=t,this.z=t,this.w=t,this},setX:function(t){return this.x=t,this},setY:function(t){return this.y=t,this},setZ:function(t){return this.z=t,this},setW:function(t){return this.w=t,this},setComponent:function(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this},getComponent:function(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}},clone:function(){return new this.constructor(this.x,this.y,this.z,this.w)},copy:function(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=void 0!==t.w?t.w:1,this},add:function(t,e){return void 0!==e?(console.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this)},addScalar:function(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this},addVectors:function(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this},addScaledVector:function(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this},sub:function(t,e){return void 0!==e?(console.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this)},subScalar:function(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this},subVectors:function(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this},multiplyScalar:function(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this},applyMatrix4:function(t){var e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this},divideScalar:function(t){return this.multiplyScalar(1/t)},setAxisAngleFromQuaternion:function(t){this.w=2*Math.acos(t.w);var e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this},setAxisAngleFromRotationMatrix:function(t){var e,n,i,r,a=t.elements,o=a[0],s=a[4],c=a[8],h=a[1],l=a[5],u=a[9],d=a[2],p=a[6],f=a[10];if(Math.abs(s-h)<.01&&Math.abs(c-d)<.01&&Math.abs(u-p)<.01){if(Math.abs(s+h)<.1&&Math.abs(c+d)<.1&&Math.abs(u+p)<.1&&Math.abs(o+l+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;var m=(o+1)/2,v=(l+1)/2,g=(f+1)/2,y=(s+h)/4,x=(c+d)/4,b=(u+p)/4;return m>v&&m>g?m<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(m),i=y/n,r=x/n):v>g?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=y/i,r=b/i):g<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(g),n=x/r,i=b/r),this.set(n,i,r,e),this}var _=Math.sqrt((p-u)*(p-u)+(c-d)*(c-d)+(h-s)*(h-s));return Math.abs(_)<.001&&(_=1),this.x=(p-u)/_,this.y=(c-d)/_,this.z=(h-s)/_,this.w=Math.acos((o+l+f-1)/2),this},min:function(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this},max:function(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this},clamp:function(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this},clampScalar:function(){var t,e;return function(n,i){return void 0===t&&(t=new o,e=new o),t.set(n,n,n,n),e.set(i,i,i,i),this.clamp(t,e)}}(),clampLength:function(t,e){var n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this},dot:function(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(t){return this.normalize().multiplyScalar(t)},lerp:function(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this},lerpVectors:function(t,e,n){return this.subVectors(e,t).multiplyScalar(n).add(t)},equals:function(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w},fromArray:function(t,e){return void 0===e&&(e=0),this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this},toArray:function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t},fromBufferAttribute:function(t,e,n){return void 0!==n&&console.warn("THREE.Vector4: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}}),Object.assign(s.prototype,i.prototype,{isWebGLRenderTarget:!0,setSize:function(t,e){this.width===t&&this.height===e||(this.width=t,this.height=e,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)},clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.width=t.width,this.height=t.height,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.depthTexture=t.depthTexture,this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),c.prototype=Object.create(s.prototype),c.prototype.constructor=c,c.prototype.isWebGLRenderTargetCube=!0,Object.assign(h,{slerp:function(t,e,n,i){return n.copy(t).slerp(e,i)},slerpFlat:function(t,e,n,i,r,a,o){var s=n[i+0],c=n[i+1],h=n[i+2],l=n[i+3],u=r[a+0],d=r[a+1],p=r[a+2],f=r[a+3];if(l!==f||s!==u||c!==d||h!==p){var m=1-o,v=s*u+c*d+h*p+l*f,g=v>=0?1:-1,y=1-v*v;if(y>Number.EPSILON){var x=Math.sqrt(y),b=Math.atan2(x,v*g);m=Math.sin(m*b)/x,o=Math.sin(o*b)/x}var _=o*g;if(s=s*m+u*_,c=c*m+d*_,h=h*m+p*_,l=l*m+f*_,m===1-o){var w=1/Math.sqrt(s*s+c*c+h*h+l*l);s*=w,c*=w,h*=w,l*=w}}t[e]=s,t[e+1]=c,t[e+2]=h,t[e+3]=l}}),Object.defineProperties(h.prototype,{x:{get:function(){return this._x},set:function(t){this._x=t,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(t){this._y=t,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(t){this._z=t,this.onChangeCallback()}},w:{get:function(){return this._w},set:function(t){this._w=t,this.onChangeCallback()}}}),Object.assign(h.prototype,{set:function(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._w)},copy:function(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this.onChangeCallback(),this},setFromEuler:function(t,e){if(!t||!t.isEuler)throw new Error("THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.");var n=t._x,i=t._y,r=t._z,a=t.order,o=Math.cos,s=Math.sin,c=o(n/2),h=o(i/2),l=o(r/2),u=s(n/2),d=s(i/2),p=s(r/2);return"XYZ"===a?(this._x=u*h*l+c*d*p,this._y=c*d*l-u*h*p,this._z=c*h*p+u*d*l,this._w=c*h*l-u*d*p):"YXZ"===a?(this._x=u*h*l+c*d*p,this._y=c*d*l-u*h*p,this._z=c*h*p-u*d*l,this._w=c*h*l+u*d*p):"ZXY"===a?(this._x=u*h*l-c*d*p,this._y=c*d*l+u*h*p,this._z=c*h*p+u*d*l,this._w=c*h*l-u*d*p):"ZYX"===a?(this._x=u*h*l-c*d*p,this._y=c*d*l+u*h*p,this._z=c*h*p-u*d*l,this._w=c*h*l+u*d*p):"YZX"===a?(this._x=u*h*l+c*d*p,this._y=c*d*l+u*h*p,this._z=c*h*p-u*d*l,this._w=c*h*l-u*d*p):"XZY"===a&&(this._x=u*h*l-c*d*p,this._y=c*d*l-u*h*p,this._z=c*h*p+u*d*l,this._w=c*h*l+u*d*p),!1!==e&&this.onChangeCallback(),this},setFromAxisAngle:function(t,e){var n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this.onChangeCallback(),this},setFromRotationMatrix:function(t){var e,n=t.elements,i=n[0],r=n[4],a=n[8],o=n[1],s=n[5],c=n[9],h=n[2],l=n[6],u=n[10],d=i+s+u;return d>0?(e=.5/Math.sqrt(d+1),this._w=.25/e,this._x=(l-c)*e,this._y=(a-h)*e,this._z=(o-r)*e):i>s&&i>u?(e=2*Math.sqrt(1+i-s-u),this._w=(l-c)/e,this._x=.25*e,this._y=(r+o)/e,this._z=(a+h)/e):s>u?(e=2*Math.sqrt(1+s-i-u),this._w=(a-h)/e,this._x=(r+o)/e,this._y=.25*e,this._z=(c+l)/e):(e=2*Math.sqrt(1+u-i-s),this._w=(o-r)/e,this._x=(a+h)/e,this._y=(c+l)/e,this._z=.25*e),this.onChangeCallback(),this},setFromUnitVectors:function(){var t,e=new l;return function(n,i){return void 0===e&&(e=new l),t=n.dot(i)+1,t<1e-6?(t=0,Math.abs(n.x)>Math.abs(n.z)?e.set(-n.y,n.x,0):e.set(0,-n.z,n.y)):e.crossVectors(n,i),this._x=e.x,this._y=e.y,this._z=e.z,this._w=t,this.normalize()}}(),inverse:function(){return this.conjugate().normalize()},conjugate:function(){return this._x*=-1,this._y*=-1,this._z*=-1,this.onChangeCallback(),this},dot:function(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w},lengthSq:function(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w},length:function(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)},normalize:function(){var t=this.length();return 0===t?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this.onChangeCallback(),this},multiply:function(t,e){return void 0!==e?(console.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),this.multiplyQuaternions(t,e)):this.multiplyQuaternions(this,t)},premultiply:function(t){return this.multiplyQuaternions(t,this)},multiplyQuaternions:function(t,e){var n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,s=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*s,this._y=i*h+a*s+r*o-n*c,this._z=r*h+a*c+n*s-i*o,this._w=a*h-n*o-i*s-r*c,this.onChangeCallback(),this},slerp:function(t,e){if(0===e)return this;if(1===e)return this.copy(t);var n=this._x,i=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;var s=Math.sqrt(1-o*o);if(Math.abs(s)<.001)return this._w=.5*(a+this._w),this._x=.5*(n+this._x),this._y=.5*(i+this._y),this._z=.5*(r+this._z),this;var c=Math.atan2(s,o),h=Math.sin((1-e)*c)/s,l=Math.sin(e*c)/s;return this._w=a*h+this._w*l,this._x=n*h+this._x*l,this._y=i*h+this._y*l,this._z=r*h+this._z*l,this.onChangeCallback(),this},equals:function(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w},fromArray:function(t,e){return void 0===e&&(e=0),this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this.onChangeCallback(),this},toArray:function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t},onChange:function(t){return this.onChangeCallback=t,this},onChangeCallback:function(){}}),Object.assign(l.prototype,{isVector3:!0,set:function(t,e,n){return this.x=t,this.y=e,this.z=n,this},setScalar:function(t){return this.x=t,this.y=t,this.z=t,this},setX:function(t){return this.x=t,this},setY:function(t){return this.y=t,this},setZ:function(t){return this.z=t,this},setComponent:function(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this},getComponent:function(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}},clone:function(){return new this.constructor(this.x,this.y,this.z)},copy:function(t){return this.x=t.x,this.y=t.y,this.z=t.z,this},add:function(t,e){return void 0!==e?(console.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),this.addVectors(t,e)):(this.x+=t.x,this.y+=t.y,this.z+=t.z,this)},addScalar:function(t){return this.x+=t,this.y+=t,this.z+=t,this},addVectors:function(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this},addScaledVector:function(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this},sub:function(t,e){return void 0!==e?(console.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),this.subVectors(t,e)):(this.x-=t.x,this.y-=t.y,this.z-=t.z,this)},subScalar:function(t){return this.x-=t,this.y-=t,this.z-=t,this},subVectors:function(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this},multiply:function(t,e){return void 0!==e?(console.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),this.multiplyVectors(t,e)):(this.x*=t.x,this.y*=t.y,this.z*=t.z,this)},multiplyScalar:function(t){return this.x*=t,this.y*=t,this.z*=t,this},multiplyVectors:function(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this},applyEuler:function(){var t=new h;return function(e){return e&&e.isEuler||console.error("THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order."),this.applyQuaternion(t.setFromEuler(e))}}(),applyAxisAngle:function(){var t=new h;return function(e,n){return this.applyQuaternion(t.setFromAxisAngle(e,n))}}(),applyMatrix3:function(t){var e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this},applyMatrix4:function(t){var e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this},applyQuaternion:function(t){var e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,s=t.w,c=s*e+a*i-o*n,h=s*n+o*e-r*i,l=s*i+r*n-a*e,u=-r*e-a*n-o*i;return this.x=c*s+u*-r+h*-o-l*-a,this.y=h*s+u*-a+l*-r-c*-o,this.z=l*s+u*-o+c*-a-h*-r,this},project:function(){var t=new u;return function(e){return t.multiplyMatrices(e.projectionMatrix,t.getInverse(e.matrixWorld)),this.applyMatrix4(t)}}(),unproject:function(){var t=new u;return function(e){return t.multiplyMatrices(e.matrixWorld,t.getInverse(e.projectionMatrix)),this.applyMatrix4(t)}}(),transformDirection:function(t){var e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()},divide:function(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this},divideScalar:function(t){return this.multiplyScalar(1/t)},min:function(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this},max:function(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this},clamp:function(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this},clampScalar:function(){var t=new l,e=new l;return function(n,i){return t.set(n,n,n),e.set(i,i,i),this.clamp(t,e)}}(),clampLength:function(t,e){var n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))},floor:function(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this},ceil:function(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this},round:function(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this},roundToZero:function(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this},negate:function(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this},dot:function(t){return this.x*t.x+this.y*t.y+this.z*t.z},lengthSq:function(){return this.x*this.x+this.y*this.y+this.z*this.z},length:function(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)},lengthManhattan:function(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)},normalize:function(){return this.divideScalar(this.length()||1)},setLength:function(t){return this.normalize().multiplyScalar(t)},lerp:function(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this},lerpVectors:function(t,e,n){return this.subVectors(e,t).multiplyScalar(n).add(t)},cross:function(t,e){if(void 0!==e)return console.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),this.crossVectors(t,e);var n=this.x,i=this.y,r=this.z;return this.x=i*t.z-r*t.y,this.y=r*t.x-n*t.z,this.z=n*t.y-i*t.x,this},crossVectors:function(t,e){var n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,s=e.z;return this.x=i*s-r*o,this.y=r*a-n*s,this.z=n*o-i*a,this},projectOnVector:function(t){var e=t.dot(this)/t.lengthSq();return this.copy(t).multiplyScalar(e)},projectOnPlane:function(){var t=new l;return function(e){return t.copy(this).projectOnVector(e),this.sub(t)}}(),reflect:function(){var t=new l;return function(e){return this.sub(t.copy(e).multiplyScalar(2*this.dot(e)))}}(),angleTo:function(t){var e=this.dot(t)/Math.sqrt(this.lengthSq()*t.lengthSq());return Math.acos(Xo.clamp(e,-1,1))},distanceTo:function(t){return Math.sqrt(this.distanceToSquared(t))},distanceToSquared:function(t){var e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i},distanceToManhattan:function(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)},setFromSpherical:function(t){var e=Math.sin(t.phi)*t.radius;return this.x=e*Math.sin(t.theta),this.y=Math.cos(t.phi)*t.radius,this.z=e*Math.cos(t.theta),this},setFromCylindrical:function(t){return this.x=t.radius*Math.sin(t.theta),this.y=t.y,this.z=t.radius*Math.cos(t.theta),this},setFromMatrixPosition:function(t){var e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this},setFromMatrixScale:function(t){var e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this},setFromMatrixColumn:function(t,e){return this.fromArray(t.elements,4*e)},equals:function(t){return t.x===this.x&&t.y===this.y&&t.z===this.z},fromArray:function(t,e){return void 0===e&&(e=0),this.x=t[e],this.y=t[e+1],this.z=t[e+2],this},toArray:function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t},fromBufferAttribute:function(t,e,n){return void 0!==n&&console.warn("THREE.Vector3: offset has been removed from .fromBufferAttribute()."),this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}}),Object.assign(u.prototype,{isMatrix4:!0,set:function(t,e,n,i,r,a,o,s,c,h,l,u,d,p,f,m){var v=this.elements;return v[0]=t,v[4]=e,v[8]=n,v[12]=i,v[1]=r,v[5]=a,v[9]=o,v[13]=s,v[2]=c,v[6]=h,v[10]=l,v[14]=u,v[3]=d,v[7]=p,v[11]=f,v[15]=m,this},identity:function(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this},clone:function(){return(new u).fromArray(this.elements)},copy:function(t){var e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this},copyPosition:function(t){var e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this},extractBasis:function(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this},makeBasis:function(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this},extractRotation:function(){var t=new l;return function(e){var n=this.elements,i=e.elements,r=1/t.setFromMatrixColumn(e,0).length(),a=1/t.setFromMatrixColumn(e,1).length(),o=1/t.setFromMatrixColumn(e,2).length();return n[0]=i[0]*r,n[1]=i[1]*r,n[2]=i[2]*r,n[4]=i[4]*a,n[5]=i[5]*a,n[6]=i[6]*a,n[8]=i[8]*o,n[9]=i[9]*o,n[10]=i[10]*o,this}}(),makeRotationFromEuler:function(t){t&&t.isEuler||console.error("THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");var e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(i),c=Math.sin(i),h=Math.cos(r),l=Math.sin(r);if("XYZ"===t.order){var u=a*h,d=a*l,p=o*h,f=o*l;e[0]=s*h,e[4]=-s*l,e[8]=c,e[1]=d+p*c,e[5]=u-f*c,e[9]=-o*s,e[2]=f-u*c,e[6]=p+d*c,e[10]=a*s}else if("YXZ"===t.order){var m=s*h,v=s*l,g=c*h,y=c*l;e[0]=m+y*o,e[4]=g*o-v,e[8]=a*c,e[1]=a*l,e[5]=a*h,e[9]=-o,e[2]=v*o-g,e[6]=y+m*o,e[10]=a*s}else if("ZXY"===t.order){var m=s*h,v=s*l,g=c*h,y=c*l;e[0]=m-y*o,e[4]=-a*l,e[8]=g+v*o,e[1]=v+g*o,e[5]=a*h,e[9]=y-m*o,e[2]=-a*c,e[6]=o,e[10]=a*s}else if("ZYX"===t.order){var u=a*h,d=a*l,p=o*h,f=o*l;e[0]=s*h,e[4]=p*c-d,e[8]=u*c+f,e[1]=s*l,e[5]=f*c+u,e[9]=d*c-p,e[2]=-c,e[6]=o*s,e[10]=a*s}else if("YZX"===t.order){var x=a*s,b=a*c,_=o*s,w=o*c;e[0]=s*h,e[4]=w-x*l,e[8]=_*l+b,e[1]=l,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=b*l+_,e[10]=x-w*l}else if("XZY"===t.order){var x=a*s,b=a*c,_=o*s,w=o*c;e[0]=s*h,e[4]=-l,e[8]=c*h,e[1]=x*l+w,e[5]=a*h,e[9]=b*l-_,e[2]=_*l-b,e[6]=o*h,e[10]=w*l+x}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this},makeRotationFromQuaternion:function(t){var e=this.elements,n=t._x,i=t._y,r=t._z,a=t._w,o=n+n,s=i+i,c=r+r,h=n*o,l=n*s,u=n*c,d=i*s,p=i*c,f=r*c,m=a*o,v=a*s,g=a*c;return e[0]=1-(d+f),e[4]=l-g,e[8]=u+v,e[1]=l+g,e[5]=1-(h+f),e[9]=p-m,e[2]=u-v,e[6]=p+m,e[10]=1-(h+d),e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this},lookAt:function(){var t=new l,e=new l,n=new l;return function(i,r,a){var o=this.elements;return n.subVectors(i,r),0===n.lengthSq()&&(n.z=1),n.normalize(),t.crossVectors(a,n),0===t.lengthSq()&&(1===Math.abs(a.z)?n.x+=1e-4:n.z+=1e-4,n.normalize(),t.crossVectors(a,n)),t.normalize(),e.crossVectors(n,t),o[0]=t.x,o[4]=e.x,o[8]=n.x,o[1]=t.y,o[5]=e.y,o[9]=n.y,o[2]=t.z,o[6]=e.z,o[10]=n.z,this}}(),multiply:function(t,e){return void 0!==e?(console.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),this.multiplyMatrices(t,e)):this.multiplyMatrices(this,t)},premultiply:function(t){return this.multiplyMatrices(t,this)},multiplyMatrices:function(t,e){var n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],h=n[1],l=n[5],u=n[9],d=n[13],p=n[2],f=n[6],m=n[10],v=n[14],g=n[3],y=n[7],x=n[11],b=n[15],_=i[0],w=i[4],M=i[8],E=i[12],T=i[1],S=i[5],A=i[9],L=i[13],R=i[2],P=i[6],C=i[10],N=i[14],I=i[3],O=i[7],U=i[11],D=i[15];return r[0]=a*_+o*T+s*R+c*I,r[4]=a*w+o*S+s*P+c*O,r[8]=a*M+o*A+s*C+c*U,r[12]=a*E+o*L+s*N+c*D,r[1]=h*_+l*T+u*R+d*I,r[5]=h*w+l*S+u*P+d*O,r[9]=h*M+l*A+u*C+d*U,r[13]=h*E+l*L+u*N+d*D,r[2]=p*_+f*T+m*R+v*I,r[6]=p*w+f*S+m*P+v*O,r[10]=p*M+f*A+m*C+v*U,r[14]=p*E+f*L+m*N+v*D,r[3]=g*_+y*T+x*R+b*I,r[7]=g*w+y*S+x*P+b*O,r[11]=g*M+y*A+x*C+b*U,r[15]=g*E+y*L+x*N+b*D,this},multiplyScalar:function(t){var e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this},applyToBufferAttribute:function(){var t=new l;return function(e){for(var n=0,i=e.count;n<i;n++)t.x=e.getX(n),t.y=e.getY(n),t.z=e.getZ(n),t.applyMatrix4(this),e.setXYZ(n,t.x,t.y,t.z);return e}}(),determinant:function(){var t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],s=t[9],c=t[13],h=t[2],l=t[6],u=t[10],d=t[14];return t[3]*(+r*s*l-i*c*l-r*o*u+n*c*u+i*o*d-n*s*d)+t[7]*(+e*s*d-e*c*u+r*a*u-i*a*d+i*c*h-r*s*h)+t[11]*(+e*c*l-e*o*d-r*a*l+n*a*d+r*o*h-n*c*h)+t[15]*(-i*o*h-e*s*l+e*o*u+i*a*l-n*a*u+n*s*h)},transpose:function(){var t,e=this.elements;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this},setPosition:function(t){var e=this.elements;return e[12]=t.x,e[13]=t.y,e[14]=t.z,this},getInverse:function(t,e){var n=this.elements,i=t.elements,r=i[0],a=i[1],o=i[2],s=i[3],c=i[4],h=i[5],l=i[6],u=i[7],d=i[8],p=i[9],f=i[10],m=i[11],v=i[12],g=i[13],y=i[14],x=i[15],b=p*y*u-g*f*u+g*l*m-h*y*m-p*l*x+h*f*x,_=v*f*u-d*y*u-v*l*m+c*y*m+d*l*x-c*f*x,w=d*g*u-v*p*u+v*h*m-c*g*m-d*h*x+c*p*x,M=v*p*l-d*g*l-v*h*f+c*g*f+d*h*y-c*p*y,E=r*b+a*_+o*w+s*M;if(0===E){var T="THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0";if(!0===e)throw new Error(T);return console.warn(T),this.identity()}var S=1/E;return n[0]=b*S,n[1]=(g*f*s-p*y*s-g*o*m+a*y*m+p*o*x-a*f*x)*S,n[2]=(h*y*s-g*l*s+g*o*u-a*y*u-h*o*x+a*l*x)*S,n[3]=(p*l*s-h*f*s-p*o*u+a*f*u+h*o*m-a*l*m)*S,n[4]=_*S,n[5]=(d*y*s-v*f*s+v*o*m-r*y*m-d*o*x+r*f*x)*S,n[6]=(v*l*s-c*y*s-v*o*u+r*y*u+c*o*x-r*l*x)*S,n[7]=(c*f*s-d*l*s+d*o*u-r*f*u-c*o*m+r*l*m)*S,n[8]=w*S,n[9]=(v*p*s-d*g*s-v*a*m+r*g*m+d*a*x-r*p*x)*S,n[10]=(c*g*s-v*h*s+v*a*u-r*g*u-c*a*x+r*h*x)*S,n[11]=(d*h*s-c*p*s-d*a*u+r*p*u+c*a*m-r*h*m)*S,n[12]=M*S,n[13]=(d*g*o-v*p*o+v*a*f-r*g*f-d*a*y+r*p*y)*S,n[14]=(v*h*o-c*g*o-v*a*l+r*g*l+c*a*y-r*h*y)*S,n[15]=(c*p*o-d*h*o+d*a*l-r*p*l-c*a*f+r*h*f)*S,this},scale:function(t){var e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this},getMaxScaleOnAxis:function(){var t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))},makeTranslation:function(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this},makeRotationX:function(t){var e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this},makeRotationY:function(t){var e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this},makeRotationZ:function(t){var e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this},makeRotationAxis:function(t,e){var n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,s=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*s,c*s+i*o,0,c*o+i*s,h*o+n,h*s-i*a,0,c*s-i*o,h*s+i*a,r*s*s+n,0,0,0,0,1),this},makeScale:function(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this},makeShear:function(t,e,n){return this.set(1,e,n,0,t,1,n,0,t,e,1,0,0,0,0,1),this},compose:function(t,e,n){return this.makeRotationFromQuaternion(e),this.scale(n),this.setPosition(t),this},decompose:function(){var t=new l,e=new u;return function(n,i,r){var a=this.elements,o=t.set(a[0],a[1],a[2]).length(),s=t.set(a[4],a[5],a[6]).length(),c=t.set(a[8],a[9],a[10]).length();this.determinant()<0&&(o=-o),n.x=a[12],n.y=a[13],n.z=a[14],e.copy(this);var h=1/o,l=1/s,u=1/c;return e.elements[0]*=h,e.elements[1]*=h,e.elements[2]*=h,e.elements[4]*=l,e.elements[5]*=l,e.elements[6]*=l,e.elements[8]*=u,e.elements[9]*=u,e.elements[10]*=u,i.setFromRotationMatrix(e),r.x=o,r.y=s,r.z=c,this}}(),makePerspective:function(t,e,n,i,r,a){void 0===a&&console.warn("THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.");var o=this.elements,s=2*r/(e-t),c=2*r/(n-i),h=(e+t)/(e-t),l=(n+i)/(n-i),u=-(a+r)/(a-r),d=-2*a*r/(a-r);return o[0]=s,o[4]=0,o[8]=h,o[12]=0,o[1]=0,o[5]=c,o[9]=l,o[13]=0,o[2]=0,o[6]=0,o[10]=u,o[14]=d,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this},makeOrthographic:function(t,e,n,i,r,a){var o=this.elements,s=1/(e-t),c=1/(n-i),h=1/(a-r),l=(e+t)*s,u=(n+i)*c,d=(a+r)*h;return o[0]=2*s,o[4]=0,o[8]=0,o[12]=-l,o[1]=0,o[5]=2*c,o[9]=0,o[13]=-u,o[2]=0,o[6]=0,o[10]=-2*h,o[14]=-d,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this},equals:function(t){for(var e=this.elements,n=t.elements,i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0},fromArray:function(t,e){void 0===e&&(e=0);for(var n=0;n<16;n++)this.elements[n]=t[n+e];return this},toArray:function(t,e){void 0===t&&(t=[]),void 0===e&&(e=0);var n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}),d.prototype=Object.create(a.prototype),d.prototype.constructor=d,d.prototype.isDataTexture=!0,p.prototype=Object.create(a.prototype),p.prototype.constructor=p,p.prototype.isCubeTexture=!0,Object.defineProperty(p.prototype,"images",{get:function(){return this.image},set:function(t){this.image=t}});var Yo=new a,Zo=new p,Jo=[],Qo=[],Ko=new Float32Array(16),$o=new Float32Array(9);H.prototype.setValue=function(t,e){for(var n=this.seq,i=0,r=n.length;i!==r;++i){var a=n[i];a.setValue(t,e[a.id])}};var ts=/([\w\d_]+)(\])?(\[|\.)?/g;q.prototype.setValue=function(t,e,n){var i=this.map[e];void 0!==i&&i.setValue(t,n,this.renderer)},q.prototype.setOptional=function(t,e,n){var i=e[n];void 0!==i&&this.setValue(t,n,i)},q.upload=function(t,e,n,i){for(var r=0,a=e.length;r!==a;++r){var o=e[r],s=n[o.id];!1!==s.needsUpdate&&o.setValue(t,s.value,i)}},q.seqWithValue=function(t,e){for(var n=[],i=0,r=t.length;i!==r;++i){var a=t[i];a.id in e&&n.push(a)}return n};var es={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074};Object.assign(Y.prototype,{isColor:!0,r:1,g:1,b:1,set:function(t){return t&&t.isColor?this.copy(t):"number"==typeof t?this.setHex(t):"string"==typeof t&&this.setStyle(t),this},setScalar:function(t){return this.r=t,this.g=t,this.b=t,this},setHex:function(t){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(255&t)/255,this},setRGB:function(t,e,n){return this.r=t,this.g=e,this.b=n,this},setHSL:function(){function t(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+6*(e-t)*(2/3-n):t}return function(e,n,i){if(e=Xo.euclideanModulo(e,1),n=Xo.clamp(n,0,1),i=Xo.clamp(i,0,1),0===n)this.r=this.g=this.b=i;else{var r=i<=.5?i*(1+n):i+n-i*n,a=2*i-r;this.r=t(a,r,e+1/3),this.g=t(a,r,e),this.b=t(a,r,e-1/3)}return this}}(),setStyle:function(t){function e(e){void 0!==e&&parseFloat(e)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}var n;if(n=/^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(t)){var i,r=n[1],a=n[2];switch(r){case"rgb":case"rgba":if(i=/^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a))return this.r=Math.min(255,parseInt(i[1],10))/255,this.g=Math.min(255,parseInt(i[2],10))/255,this.b=Math.min(255,parseInt(i[3],10))/255,e(i[5]),this;if(i=/^(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a))return this.r=Math.min(100,parseInt(i[1],10))/100,this.g=Math.min(100,parseInt(i[2],10))/100,this.b=Math.min(100,parseInt(i[3],10))/100,e(i[5]),this;break;case"hsl":case"hsla":if(i=/^([0-9]*\.?[0-9]+)\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(a)){var o=parseFloat(i[1])/360,s=parseInt(i[2],10)/100,c=parseInt(i[3],10)/100;return e(i[5]),this.setHSL(o,s,c)}}}else if(n=/^\#([A-Fa-f0-9]+)$/.exec(t)){var h=n[1],l=h.length;if(3===l)return this.r=parseInt(h.charAt(0)+h.charAt(0),16)/255,this.g=parseInt(h.charAt(1)+h.charAt(1),16)/255,this.b=parseInt(h.charAt(2)+h.charAt(2),16)/255,this;if(6===l)return this.r=parseInt(h.charAt(0)+h.charAt(1),16)/255,this.g=parseInt(h.charAt(2)+h.charAt(3),16)/255,this.b=parseInt(h.charAt(4)+h.charAt(5),16)/255,this}if(t&&t.length>0){var h=es[t];void 0!==h?this.setHex(h):console.warn("THREE.Color: Unknown color "+t)}return this},clone:function(){return new this.constructor(this.r,this.g,this.b)},copy:function(t){return this.r=t.r,this.g=t.g,this.b=t.b,this},copyGammaToLinear:function(t,e){return void 0===e&&(e=2),this.r=Math.pow(t.r,e),this.g=Math.pow(t.g,e),this.b=Math.pow(t.b,e),this},copyLinearToGamma:function(t,e){void 0===e&&(e=2);var n=e>0?1/e:1;return this.r=Math.pow(t.r,n),this.g=Math.pow(t.g,n),this.b=Math.pow(t.b,n),this},convertGammaToLinear:function(){var t=this.r,e=this.g,n=this.b;return this.r=t*t,this.g=e*e,this.b=n*n,this},convertLinearToGamma:function(){return this.r=Math.sqrt(this.r),this.g=Math.sqrt(this.g),this.b=Math.sqrt(this.b),this},getHex:function(){return 255*this.r<<16^255*this.g<<8^255*this.b<<0},getHexString:function(){return("000000"+this.getHex().toString(16)).slice(-6)},getHSL:function(t){var e,n,i=t||{h:0,s:0,l:0},r=this.r,a=this.g,o=this.b,s=Math.max(r,a,o),c=Math.min(r,a,o),h=(c+s)/2;if(c===s)e=0,n=0;else{var l=s-c;switch(n=h<=.5?l/(s+c):l/(2-s-c),s){case r:e=(a-o)/l+(a<o?6:0);break;case a:e=(o-r)/l+2;break;case o:e=(r-a)/l+4}e/=6}return i.h=e,i.s=n,i.l=h,i},getStyle:function(){return"rgb("+(255*this.r|0)+","+(255*this.g|0)+","+(255*this.b|0)+")"},offsetHSL:function(t,e,n){var i=this.getHSL();return i.h+=t,i.s+=e,i.l+=n,this.setHSL(i.h,i.s,i.l),this},add:function(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this},addColors:function(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this},addScalar:function(t){return this.r+=t,this.g+=t,this.b+=t,this},sub:function(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this},multiply:function(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this},multiplyScalar:function(t){return this.r*=t,this.g*=t,this.b*=t,this},lerp:function(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this},equals:function(t){return t.r===this.r&&t.g===this.g&&t.b===this.b},fromArray:function(t,e){return void 0===e&&(e=0),this.r=t[e],this.g=t[e+1],this.b=t[e+2],this},toArray:function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t},toJSON:function(){return this.getHex()}});var ns={common:{diffuse:{value:new Y(15658734)},opacity:{value:1},map:{value:null},offsetRepeat:{value:new o(0,0,1,1)},alphaMap:{value:null}},specularmap:{specularMap:{value:null}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1}},emissivemap:{emissiveMap:{value:null}},bumpmap:{bumpMap:{value:null},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalScale:{value:new r(1,1)}},displacementmap:{displacementMap:{value:null},displacementScale:{value:1},displacementBias:{value:0}},roughnessmap:{roughnessMap:{value:null}},metalnessmap:{metalnessMap:{value:null}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{}}},spotShadowMap:{value:[]},spotShadowMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{},shadow:{},shadowBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}}},points:{diffuse:{value:new Y(15658734)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},offsetRepeat:{value:new o(0,0,1,1)}}},is={merge:function(t){for(var e={},n=0;n<t.length;n++){var i=this.clone(t[n]);for(var r in i)e[r]=i[r]}return e},clone:function(t){var e={};for(var n in t){e[n]={};for(var i in t[n]){var r=t[n][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture)?e[n][i]=r.clone():Array.isArray(r)?e[n][i]=r.slice():e[n][i]=r}}return e}},rs={alphamap_fragment:"#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif\n",alphamap_pars_fragment:"#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif\n",alphatest_fragment:"#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif\n",aomap_fragment:"#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif\n",aomap_pars_fragment:"#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif",begin_vertex:"\nvec3 transformed = vec3( position );\n",beginnormal_vertex:"\nvec3 objectNormal = vec3( normal );\n",bsdfs:"float punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n\tif( decayExponent > 0.0 ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\t\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\t\tfloat maxDistanceCutoffFactor = pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t\treturn distanceFalloff * maxDistanceCutoffFactor;\n#else\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n#endif\n\t}\n\treturn 1.0;\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNL = saturate( dot( geometry.normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat theta = acos( dot( N, V ) );\n\tvec2 uv = vec2(\n\t\tsqrt( saturate( roughness ) ),\n\t\tsaturate( theta / ( 0.5 * PI ) ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.86267 + (0.49788 + 0.01436 * y ) * y;\n\tfloat b = 3.45068 + (4.18814 + y) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = (x > 0.0) ? v : 0.5 * inversesqrt( 1.0 - x * x ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transpose( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tvec3 result = vec3( LTC_ClippedSphereFormFactor( vectorFormFactor ) );\n\treturn result;\n}\nvec3 BRDF_Specular_GGX_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\tvec2 AB = vec2( -1.04, 1.04 ) * a004 + r.zw;\n\treturn specularColor * AB.x + AB.y;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n",bumpmap_pars_fragment:"#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif\n",clipping_planes_fragment:"#if NUM_CLIPPING_PLANES > 0\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; ++ i ) {\n\t\tvec4 plane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t\t\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; ++ i ) {\n\t\t\tvec4 plane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t\n\t#endif\n#endif\n",clipping_planes_pars_fragment:"#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( PHYSICAL ) && ! defined( PHONG )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif\n",clipping_planes_pars_vertex:"#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvarying vec3 vViewPosition;\n#endif\n",clipping_planes_vertex:"#if NUM_CLIPPING_PLANES > 0 && ! defined( PHYSICAL ) && ! defined( PHONG )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n",color_fragment:"#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif",color_pars_fragment:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif\n",color_pars_vertex:"#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif",color_vertex:"#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif",common:"#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#define whiteCompliment(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transpose( const in mat3 v ) {\n\tmat3 tmp;\n\ttmp[0] = vec3(v[0].x, v[1].x, v[2].x);\n\ttmp[1] = vec3(v[0].y, v[1].y, v[2].y);\n\ttmp[2] = vec3(v[0].z, v[1].z, v[2].z);\n\treturn tmp;\n}\n",cube_uv_reflection_fragment:"#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV(vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif\n",defaultnormal_vertex:"vec3 transformedNormal = normalMatrix * objectNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n",displacementmap_pars_vertex:"#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif\n",displacementmap_vertex:"#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, uv ).x * displacementScale + displacementBias );\n#endif\n",emissivemap_fragment:"#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif\n",emissivemap_pars_fragment:"#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif\n",encodings_fragment:"  gl_FragColor = linearToOutputTexel( gl_FragColor );\n",encodings_pars_fragment:"\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( gammaFactor ) ), value.w );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.xyz, vec3( 1.0 / gammaFactor ) ), value.w );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.w );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.w );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.xyz * value.w * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat M      = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM            = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.x, max( value.g, value.b ) );\n\tfloat D      = max( maxRange / maxRGB, 1.0 );\n\tD            = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = value.rgb * cLogLuvM;\n\tXp_Y_XYZp = max(Xp_Y_XYZp, vec3(1e-6, 1e-6, 1e-6));\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract(Le);\n\tvResult.z = (Le - (floor(vResult.w*255.0))/255.0)/255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2((Le - 127.0) / 2.0);\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = Xp_Y_XYZp.rgb * cLogLuvInverseM;\n\treturn vec4( max(vRGB, 0.0), 1.0 );\n}\n",envmap_fragment:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif\n",envmap_pars_fragment:"#if defined( USE_ENVMAP ) || defined( PHYSICAL )\n\tuniform float reflectivity;\n\tuniform float envMapIntensity;\n#endif\n#ifdef USE_ENVMAP\n\t#if ! defined( PHYSICAL ) && ( defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) )\n\t\tvarying vec3 vWorldPosition;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( PHYSICAL )\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif\n",envmap_pars_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif\n",envmap_vertex:"#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif\n",fog_vertex:"\n#ifdef USE_FOG\nfogDepth = -mvPosition.z;\n#endif",fog_pars_vertex:"#ifdef USE_FOG\n  varying float fogDepth;\n#endif\n",fog_fragment:"#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = whiteCompliment( exp2( - fogDensity * fogDensity * fogDepth * fogDepth * LOG2 ) );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif\n",fog_pars_fragment:"#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif\n",gradientmap_pars_fragment:"#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif\n",lightmap_fragment:"#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif\n",lightmap_pars_fragment:"#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif",lights_lambert_vertex:"vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvLightFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif\n",lights_pars:"uniform vec3 ambientLightColor;\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltcMat;\tuniform sampler2D ltcMag;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif\n#if defined( USE_ENVMAP ) && defined( PHYSICAL )\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar - 0.79248 - 0.5 * log2( pow2( blinnShininessExponent ) + 1.0 );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in GeometricContext geometry, const in float blinnShininessExponent, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( -geometry.viewDir, geometry.normal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( -geometry.viewDir, geometry.normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( blinnShininessExponent, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV(queryReflectVec, BlinnExponentToGGXRoughness(blinnShininessExponent));\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif\n",lights_phong_fragment:"BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;\n",lights_phong_pars_fragment:"varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)\n",lights_physical_fragment:"PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef STANDARD\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n\tmaterial.clearCoat = saturate( clearCoat );\tmaterial.clearCoatRoughness = clamp( clearCoatRoughness, 0.04, 1.0 );\n#endif\n",lights_physical_pars_fragment:"struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n\t#ifndef STANDARD\n\t\tfloat clearCoat;\n\t\tfloat clearCoatRoughness;\n\t#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearCoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos - halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos + halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos + halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos - halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tfloat norm = texture2D( ltcMag, uv ).a;\n\t\tvec4 t = texture2D( ltcMat, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3(   1,   0, t.y ),\n\t\t\tvec3(   0, t.z,   0 ),\n\t\t\tvec3( t.w,   0, t.x )\n\t\t);\n\t\treflectedLight.directSpecular += lightColor * material.specularColor * norm * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifndef STANDARD\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.directSpecular += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry, material.specularColor, material.specularRoughness );\n\treflectedLight.directDiffuse += ( 1.0 - clearCoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\t#ifndef STANDARD\n\t\treflectedLight.directSpecular += irradiance * material.clearCoat * BRDF_Specular_GGX( directLight, geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 clearCoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifndef STANDARD\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\tfloat dotNL = dotNV;\n\t\tfloat clearCoatDHR = material.clearCoat * clearCoatDHRApprox( material.clearCoatRoughness, dotNL );\n\t#else\n\t\tfloat clearCoatDHR = 0.0;\n\t#endif\n\treflectedLight.indirectSpecular += ( 1.0 - clearCoatDHR ) * radiance * BRDF_Specular_GGX_Environment( geometry, material.specularColor, material.specularRoughness );\n\t#ifndef STANDARD\n\t\treflectedLight.indirectSpecular += clearCoatRadiance * material.clearCoat * BRDF_Specular_GGX_Environment( geometry, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearCoatRoughness );\n\t#endif\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\n#define Material_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.specularRoughness )\n#define Material_ClearCoat_BlinnShininessExponent( material )   GGXRoughnessToBlinnExponent( material.clearCoatRoughness )\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}\n",lights_template:"\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = normalize( vViewPosition );\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( pointLight.shadow, directLight.visible ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( spotLight.shadow, directLight.visible ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#ifdef USE_SHADOWMAP\n\t\tdirectLight.color *= all( bvec2( directionalLight.shadow, directLight.visible ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( PHYSICAL ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tirradiance += getLightProbeIndirectIrradiance( geometry, 8 );\n\t#endif\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tvec3 radiance = getLightProbeIndirectRadiance( geometry, Material_BlinnShininessExponent( material ), 8 );\n\t#ifndef STANDARD\n\t\tvec3 clearCoatRadiance = getLightProbeIndirectRadiance( geometry, Material_ClearCoat_BlinnShininessExponent( material ), 8 );\n\t#else\n\t\tvec3 clearCoatRadiance = vec3( 0.0 );\n\t#endif\n\tRE_IndirectSpecular( radiance, clearCoatRadiance, geometry, material, reflectedLight );\n#endif\n",logdepthbuf_fragment:"#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n#endif",logdepthbuf_pars_fragment:"#ifdef USE_LOGDEPTHBUF\n\tuniform float logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n#endif\n",logdepthbuf_pars_vertex:"#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t#endif\n\tuniform float logDepthBufFC;\n#endif",logdepthbuf_vertex:"#ifdef USE_LOGDEPTHBUF\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t#else\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\t#endif\n#endif\n",map_fragment:"#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif\n",map_pars_fragment:"#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n",map_particle_fragment:"#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n",map_particle_pars_fragment:"#ifdef USE_MAP\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n#endif\n",metalnessmap_fragment:"float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif\n",metalnessmap_pars_fragment:"#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif",morphnormal_vertex:"#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif\n",morphtarget_pars_vertex:"#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif",morphtarget_vertex:"#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif\n",normal_fragment:"#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n#endif\n#ifdef USE_NORMALMAP\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif\n",normalmap_pars_fragment:"#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif\n",packing:"vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 1.0 - 2.0 * rgb.xyz;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}\n",premultiplied_alpha_fragment:"#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif\n",project_vertex:"vec4 mvPosition = modelViewMatrix * vec4( transformed, 1.0 );\ngl_Position = projectionMatrix * mvPosition;\n",dithering_fragment:"#if defined( DITHERING )\n  gl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif\n",dithering_pars_fragment:"#if defined( DITHERING )\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif\n",roughnessmap_fragment:"float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif\n",roughnessmap_pars_fragment:"#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif",shadowmap_pars_fragment:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = floor( uv * size + 0.5 ) / size;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif\n",shadowmap_pars_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHTS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHTS ];\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHTS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHTS ];\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHTS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHTS ];\n\t#endif\n#endif\n",shadowmap_vertex:"#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif\n",shadowmask_pars_fragment:"float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHTS > 0\n\tDirectionalLight directionalLight;\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= bool( directionalLight.shadow ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHTS > 0\n\tSpotLight spotLight;\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= bool( spotLight.shadow ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHTS > 0\n\tPointLight pointLight;\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= bool( pointLight.shadow ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}\n",skinbase_vertex:"#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif",skinning_pars_vertex:"#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif\n",skinning_vertex:"#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif\n",skinnormal_vertex:"#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n#endif\n",specularmap_fragment:"float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif",specularmap_pars_fragment:"#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif",tonemapping_fragment:"#if defined( TONE_MAPPING )\n  gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif\n",tonemapping_pars_fragment:"#define saturate(a) clamp( a, 0.0, 1.0 )\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\n",uv_pars_fragment:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n#endif",uv_pars_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n#endif\n",uv_vertex:"#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP ) || defined( USE_EMISSIVEMAP ) || defined( USE_ROUGHNESSMAP ) || defined( USE_METALNESSMAP )\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n#endif",uv2_pars_fragment:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif",uv2_pars_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif",uv2_vertex:"#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif",worldpos_vertex:"#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( PHYSICAL ) || defined( LAMBERT ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = modelMatrix * vec4( transformed, 1.0 );\n#endif\n",cube_frag:"uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldPosition;\nvoid main() {\n\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );\n\tgl_FragColor.a *= opacity;\n}\n",cube_vert:"varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",depth_frag:"#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}\n",depth_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}\n",distanceRGBA_frag:"#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}\n",distanceRGBA_vert:"#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}\n",equirect_frag:"uniform sampler2D tEquirect;\nvarying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldPosition );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}\n",equirect_vert:"varying vec3 vWorldPosition;\n#include <common>\nvoid main() {\n\tvWorldPosition = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}\n",linedashed_frag:"uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",linedashed_vert:"uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}\n",meshbasic_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",meshbasic_vert:"#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}\n",meshlambert_frag:"uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",meshlambert_vert:"#define LAMBERT\nvarying vec3 vLightFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",meshphong_frag:"#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",meshphong_vert:"#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",meshphysical_frag:"#define PHYSICAL\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifndef STANDARD\n\tuniform float clearCoat;\n\tuniform float clearCoatRoughness;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <lights_pars>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_template>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}\n",meshphysical_vert:"#define PHYSICAL\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",normal_frag:"#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\nvoid main() {\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}\n",normal_vert:"#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}\n",points_frag:"uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}\n",points_vert:"uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#ifdef USE_SIZEATTENUATION\n\t\tgl_PointSize = size * ( scale / - mvPosition.z );\n\t#else\n\t\tgl_PointSize = size;\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}\n",shadow_frag:"uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <bsdfs>\n#include <lights_pars>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n}\n",shadow_vert:"#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n}\n"},as={basic:{uniforms:is.merge([ns.common,ns.specularmap,ns.envmap,ns.aomap,ns.lightmap,ns.fog]),vertexShader:rs.meshbasic_vert,fragmentShader:rs.meshbasic_frag},lambert:{uniforms:is.merge([ns.common,ns.specularmap,ns.envmap,ns.aomap,ns.lightmap,ns.emissivemap,ns.fog,ns.lights,{emissive:{value:new Y(0)}}]),vertexShader:rs.meshlambert_vert,fragmentShader:rs.meshlambert_frag},phong:{uniforms:is.merge([ns.common,ns.specularmap,ns.envmap,ns.aomap,ns.lightmap,ns.emissivemap,ns.bumpmap,ns.normalmap,ns.displacementmap,ns.gradientmap,ns.fog,ns.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30}}]),vertexShader:rs.meshphong_vert,fragmentShader:rs.meshphong_frag},standard:{uniforms:is.merge([ns.common,ns.envmap,ns.aomap,ns.lightmap,ns.emissivemap,ns.bumpmap,ns.normalmap,ns.displacementmap,ns.roughnessmap,ns.metalnessmap,ns.fog,ns.lights,{emissive:{value:new Y(0)},roughness:{value:.5},metalness:{value:.5},envMapIntensity:{value:1}}]),vertexShader:rs.meshphysical_vert,fragmentShader:rs.meshphysical_frag},points:{uniforms:is.merge([ns.points,ns.fog]),vertexShader:rs.points_vert,fragmentShader:rs.points_frag},dashed:{uniforms:is.merge([ns.common,ns.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rs.linedashed_vert,fragmentShader:rs.linedashed_frag},depth:{uniforms:is.merge([ns.common,ns.displacementmap]),vertexShader:rs.depth_vert,fragmentShader:rs.depth_frag},normal:{uniforms:is.merge([ns.common,ns.bumpmap,ns.normalmap,ns.displacementmap,{opacity:{value:1}}]),vertexShader:rs.normal_vert,fragmentShader:rs.normal_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rs.cube_vert,fragmentShader:rs.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rs.equirect_vert,fragmentShader:rs.equirect_frag},distanceRGBA:{uniforms:is.merge([ns.common,ns.displacementmap,{referencePosition:{value:new l},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rs.distanceRGBA_vert,fragmentShader:rs.distanceRGBA_frag},shadow:{uniforms:is.merge([ns.lights,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:rs.shadow_vert,fragmentShader:rs.shadow_frag}};as.physical={uniforms:is.merge([as.standard.uniforms,{clearCoat:{value:0},clearCoatRoughness:{value:0}}]),vertexShader:rs.meshphysical_vert,fragmentShader:rs.meshphysical_frag},Object.assign(Z.prototype,{set:function(t,e){return this.min.copy(t),this.max.copy(e),this},setFromPoints:function(t){this.makeEmpty();for(var e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this},setFromCenterAndSize:function(){var t=new r;return function(e,n){var i=t.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.min.copy(t.min),this.max.copy(t.max),this},makeEmpty:function(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this},isEmpty:function(){return this.max.x<this.min.x||this.max.y<this.min.y},getCenter:function(t){var e=t||new r;return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(t){var e=t||new r;return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)},expandByPoint:function(t){return this.min.min(t),this.max.max(t),this},expandByVector:function(t){return this.min.sub(t),this.max.add(t),this},expandByScalar:function(t){return this.min.addScalar(-t),this.max.addScalar(t),this},containsPoint:function(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y)},containsBox:function(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y},getParameter:function(t,e){return(e||new r).set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))},intersectsBox:function(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y)},clampPoint:function(t,e){return(e||new r).copy(t).clamp(this.min,this.max)},distanceToPoint:function(){var t=new r;return function(e){return t.copy(e).clamp(this.min,this.max).sub(e).length()}}(),intersect:function(t){return this.min.max(t.min),this.max.min(t.max),this},union:function(t){return this.min.min(t.min),this.max.max(t.max),this},translate:function(t){return this.min.add(t),this.max.add(t),this},equals:function(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}),Q.prototype=Object.create(a.prototype),Q.prototype.constructor=Q;var os=0;Object.assign($.prototype,i.prototype,{isMaterial:!0,onBeforeCompile:function(){},setValues:function(t){if(void 0!==t)for(var e in t){var n=t[e];if(void 0!==n)if("shading"!==e){var i=this[e];void 0!==i?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]="overdraw"===e?Number(n):n:console.warn("THREE."+this.type+": '"+e+"' is not a property of this material.")}else console.warn("THREE."+this.type+": .shading has been removed. Use the boolean .flatShading instead."),this.flatShading=n===Kr;else console.warn("THREE.Material: '"+e+"' parameter is undefined.")}},toJSON:function(t){function e(t){var e=[];for(var n in t){var i=t[n];delete i.metadata,e.push(i)}return e}var n=void 0===t;n&&(t={textures:{},images:{}});var i={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};if(i.uuid=this.uuid,i.type=this.type,""!==this.name&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),void 0!==this.roughness&&(i.roughness=this.roughness),void 0!==this.metalness&&(i.metalness=this.metalness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),void 0!==this.shininess&&(i.shininess=this.shininess),void 0!==this.clearCoat&&(i.clearCoat=this.clearCoat),void 0!==this.clearCoatRoughness&&(i.clearCoatRoughness=this.clearCoatRoughness),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,i.reflectivity=this.reflectivity),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),void 0!==this.size&&(i.size=this.size),void 0!==this.sizeAttenuation&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==ra&&(i.blending=this.blending),!0===this.flatShading&&(i.flatShading=this.flatShading),this.side!==Zr&&(i.side=this.side),this.vertexColors!==ta&&(i.vertexColors=this.vertexColors),this.opacity<1&&(i.opacity=this.opacity),!0===this.transparent&&(i.transparent=this.transparent),i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,!0===this.dithering&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),!0===this.premultipliedAlpha&&(i.premultipliedAlpha=this.premultipliedAlpha),!0===this.wireframe&&(i.wireframe=this.wireframe),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),"round"!==this.wireframeLinecap&&(i.wireframeLinecap=this.wireframeLinecap),"round"!==this.wireframeLinejoin&&(i.wireframeLinejoin=this.wireframeLinejoin),!0===this.morphTargets&&(i.morphTargets=!0),!0===this.skinning&&(i.skinning=!0),!1===this.visible&&(i.visible=!1),"{}"!==JSON.stringify(this.userData)&&(i.userData=this.userData),n){var r=e(t.textures),a=e(t.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i},clone:function(){return(new this.constructor).copy(this)},copy:function(t){this.name=t.name,this.fog=t.fog,this.lights=t.lights,this.blending=t.blending,this.side=t.side,this.flatShading=t.flatShading,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.premultipliedAlpha=t.premultipliedAlpha,this.overdraw=t.overdraw,this.visible=t.visible,this.userData=JSON.parse(JSON.stringify(t.userData)),this.clipShadows=t.clipShadows,this.clipIntersection=t.clipIntersection;var e=t.clippingPlanes,n=null;if(null!==e){var i=e.length;n=new Array(i);for(var r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),tt.prototype=Object.create($.prototype),tt.prototype.constructor=tt,tt.prototype.isShaderMaterial=!0,tt.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is.clone(t.uniforms),this.defines=t.defines,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.lights=t.lights,this.clipping=t.clipping,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this.extensions=t.extensions,this},tt.prototype.toJSON=function(t){var e=$.prototype.toJSON.call(this,t);return e.uniforms=this.uniforms,e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e},et.prototype=Object.create($.prototype),et.prototype.constructor=et,et.prototype.isMeshDepthMaterial=!0,et.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.depthPacking=t.depthPacking,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this},nt.prototype=Object.create($.prototype),nt.prototype.constructor=nt,nt.prototype.isMeshDistanceMaterial=!0,nt.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.referencePosition.copy(t.referencePosition),this.nearDistance=t.nearDistance,this.farDistance=t.farDistance,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this},Object.assign(it.prototype,{isBox3:!0,set:function(t,e){return this.min.copy(t),this.max.copy(e),this},setFromArray:function(t){for(var e=1/0,n=1/0,i=1/0,r=-1/0,a=-1/0,o=-1/0,s=0,c=t.length;s<c;s+=3){var h=t[s],l=t[s+1],u=t[s+2];h<e&&(e=h),l<n&&(n=l),u<i&&(i=u),h>r&&(r=h),l>a&&(a=l),u>o&&(o=u)}return this.min.set(e,n,i),this.max.set(r,a,o),this},setFromBufferAttribute:function(t){for(var e=1/0,n=1/0,i=1/0,r=-1/0,a=-1/0,o=-1/0,s=0,c=t.count;s<c;s++){var h=t.getX(s),l=t.getY(s),u=t.getZ(s);h<e&&(e=h),l<n&&(n=l),u<i&&(i=u),h>r&&(r=h),l>a&&(a=l),u>o&&(o=u)}return this.min.set(e,n,i),this.max.set(r,a,o),this},setFromPoints:function(t){this.makeEmpty();for(var e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this},setFromCenterAndSize:function(){var t=new l;return function(e,n){var i=t.copy(n).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}}(),setFromObject:function(t){return this.makeEmpty(),this.expandByObject(t)},clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.min.copy(t.min),this.max.copy(t.max),this},makeEmpty:function(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this},isEmpty:function(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z},getCenter:function(t){var e=t||new l;return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)},getSize:function(t){var e=t||new l;return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)},expandByPoint:function(t){return this.min.min(t),this.max.max(t),this},expandByVector:function(t){return this.min.sub(t),this.max.add(t),this},expandByScalar:function(t){return this.min.addScalar(-t),this.max.addScalar(t),this},expandByObject:function(){var t=new l;return function(e){var n=this;return e.updateMatrixWorld(!0),e.traverse(function(e){var i,r,a=e.geometry;if(void 0!==a)if(a.isGeometry){var o=a.vertices;for(i=0,r=o.length;i<r;i++)t.copy(o[i]),t.applyMatrix4(e.matrixWorld),n.expandByPoint(t)}else if(a.isBufferGeometry){var s=a.attributes.position;if(void 0!==s)for(i=0,r=s.count;i<r;i++)t.fromBufferAttribute(s,i).applyMatrix4(e.matrixWorld),n.expandByPoint(t)}}),this}}(),containsPoint:function(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)},containsBox:function(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z},getParameter:function(t,e){return(e||new l).set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))},intersectsBox:function(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)},intersectsSphere:function(){var t=new l;return function(e){return this.clampPoint(e.center,t),t.distanceToSquared(e.center)<=e.radius*e.radius}}(),intersectsPlane:function(t){var e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=t.constant&&n>=t.constant},clampPoint:function(t,e){return(e||new l).copy(t).clamp(this.min,this.max)},distanceToPoint:function(){var t=new l;return function(e){return t.copy(e).clamp(this.min,this.max).sub(e).length()}}(),getBoundingSphere:function(){var t=new l;return function(e){var n=e||new rt;return this.getCenter(n.center),n.radius=.5*this.getSize(t).length(),n}}(),intersect:function(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this},union:function(t){return this.min.min(t.min),this.max.max(t.max),this},applyMatrix4:function(){var t=[new l,new l,new l,new l,new l,new l,new l,new l];return function(e){return this.isEmpty()?this:(t[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),t[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),t[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),t[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),t[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),t[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),t[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),t[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(t),this)}}(),translate:function(t){return this.min.add(t),this.max.add(t),this},equals:function(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}),Object.assign(rt.prototype,{set:function(t,e){return this.center.copy(t),this.radius=e,this},setFromPoints:function(){var t=new it;return function(e,n){var i=this.center;void 0!==n?i.copy(n):t.setFromPoints(e).getCenter(i);for(var r=0,a=0,o=e.length;a<o;a++)r=Math.max(r,i.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.center.copy(t.center),this.radius=t.radius,this},empty:function(){return this.radius<=0},containsPoint:function(t){return t.distanceToSquared(this.center)<=this.radius*this.radius},distanceToPoint:function(t){return t.distanceTo(this.center)-this.radius},intersectsSphere:function(t){var e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e},intersectsBox:function(t){return t.intersectsSphere(this)},intersectsPlane:function(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius},clampPoint:function(t,e){var n=this.center.distanceToSquared(t),i=e||new l;return i.copy(t),n>this.radius*this.radius&&(i.sub(this.center).normalize(),i.multiplyScalar(this.radius).add(this.center)),i},getBoundingBox:function(t){var e=t||new it;return e.set(this.center,this.center),e.expandByScalar(this.radius),e},applyMatrix4:function(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this},translate:function(t){return this.center.add(t),this},equals:function(t){return t.center.equals(this.center)&&t.radius===this.radius}}),Object.assign(at.prototype,{isMatrix3:!0,set:function(t,e,n,i,r,a,o,s,c){var h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=s,h[6]=n,h[7]=a,h[8]=c,this},identity:function(){return this.set(1,0,0,0,1,0,0,0,1),this},clone:function(){return(new this.constructor).fromArray(this.elements)},copy:function(t){var e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this},setFromMatrix4:function(t){var e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this},applyToBufferAttribute:function(){var t=new l;return function(e){for(var n=0,i=e.count;n<i;n++)t.x=e.getX(n),t.y=e.getY(n),t.z=e.getZ(n),t.applyMatrix3(this),e.setXYZ(n,t.x,t.y,t.z);return e}}(),multiply:function(t){return this.multiplyMatrices(this,t)},premultiply:function(t){return this.multiplyMatrices(t,this)},multiplyMatrices:function(t,e){var n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],h=n[4],l=n[7],u=n[2],d=n[5],p=n[8],f=i[0],m=i[3],v=i[6],g=i[1],y=i[4],x=i[7],b=i[2],_=i[5],w=i[8];return r[0]=a*f+o*g+s*b,r[3]=a*m+o*y+s*_,r[6]=a*v+o*x+s*w,r[1]=c*f+h*g+l*b,r[4]=c*m+h*y+l*_,r[7]=c*v+h*x+l*w,r[2]=u*f+d*g+p*b,r[5]=u*m+d*y+p*_,r[8]=u*v+d*x+p*w,this},multiplyScalar:function(t){var e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this},determinant:function(){var t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],s=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*s+i*r*c-i*a*s},getInverse:function(t,e){t&&t.isMatrix4&&console.error("THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.");var n=t.elements,i=this.elements,r=n[0],a=n[1],o=n[2],s=n[3],c=n[4],h=n[5],l=n[6],u=n[7],d=n[8],p=d*c-h*u,f=h*l-d*s,m=u*s-c*l,v=r*p+a*f+o*m;if(0===v){var g="THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0";if(!0===e)throw new Error(g);return console.warn(g),this.identity()}var y=1/v;return i[0]=p*y,i[1]=(o*u-d*a)*y,i[2]=(h*a-o*c)*y,i[3]=f*y,i[4]=(d*r-o*l)*y,i[5]=(o*s-h*r)*y,i[6]=m*y,i[7]=(a*l-u*r)*y,i[8]=(c*r-a*s)*y,this},transpose:function(){var t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this},getNormalMatrix:function(t){return this.setFromMatrix4(t).getInverse(this).transpose()},transposeIntoArray:function(t){var e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this},equals:function(t){for(var e=this.elements,n=t.elements,i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0},fromArray:function(t,e){void 0===e&&(e=0);for(var n=0;n<9;n++)this.elements[n]=t[n+e];return this},toArray:function(t,e){void 0===t&&(t=[]),void 0===e&&(e=0);var n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}}),Object.assign(ot.prototype,{set:function(t,e){return this.normal.copy(t),this.constant=e,this},setComponents:function(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this},setFromNormalAndCoplanarPoint:function(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this},setFromCoplanarPoints:function(){var t=new l,e=new l;return function(n,i,r){var a=t.subVectors(r,i).cross(e.subVectors(n,i)).normalize();return this.setFromNormalAndCoplanarPoint(a,n),this}}(),clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.normal.copy(t.normal),this.constant=t.constant,this},normalize:function(){var t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this},negate:function(){return this.constant*=-1,this.normal.negate(),this},distanceToPoint:function(t){return this.normal.dot(t)+this.constant},distanceToSphere:function(t){return this.distanceToPoint(t.center)-t.radius},projectPoint:function(t,e){return(e||new l).copy(this.normal).multiplyScalar(-this.distanceToPoint(t)).add(t)},intersectLine:function(){var t=new l;return function(e,n){var i=n||new l,r=e.delta(t),a=this.normal.dot(r);if(0!==a){var o=-(e.start.dot(this.normal)+this.constant)/a;if(!(o<0||o>1))return i.copy(r).multiplyScalar(o).add(e.start)}else if(0===this.distanceToPoint(e.start))return i.copy(e.start)}}(),intersectsLine:function(t){var e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0},intersectsBox:function(t){return t.intersectsPlane(this)},intersectsSphere:function(t){return t.intersectsPlane(this)},coplanarPoint:function(t){return(t||new l).copy(this.normal).multiplyScalar(-this.constant)},applyMatrix4:function(){var t=new l,e=new at;return function(n,i){var r=i||e.getNormalMatrix(n),a=this.coplanarPoint(t).applyMatrix4(n),o=this.normal.applyMatrix3(r).normalize();return this.constant=-a.dot(o),this}}(),translate:function(t){return this.constant-=t.dot(this.normal),this},equals:function(t){return t.normal.equals(this.normal)&&t.constant===this.constant}}),Object.assign(st.prototype,{set:function(t,e,n,i,r,a){var o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this},clone:function(){return(new this.constructor).copy(this)},copy:function(t){for(var e=this.planes,n=0;n<6;n++)e[n].copy(t.planes[n]);return this},setFromMatrix:function(t){var e=this.planes,n=t.elements,i=n[0],r=n[1],a=n[2],o=n[3],s=n[4],c=n[5],h=n[6],l=n[7],u=n[8],d=n[9],p=n[10],f=n[11],m=n[12],v=n[13],g=n[14],y=n[15];return e[0].setComponents(o-i,l-s,f-u,y-m).normalize(),e[1].setComponents(o+i,l+s,f+u,y+m).normalize(),e[2].setComponents(o+r,l+c,f+d,y+v).normalize(),e[3].setComponents(o-r,l-c,f-d,y-v).normalize(),e[4].setComponents(o-a,l-h,f-p,y-g).normalize(),e[5].setComponents(o+a,l+h,f+p,y+g).normalize(),this},intersectsObject:function(){var t=new rt;return function(e){var n=e.geometry;return null===n.boundingSphere&&n.computeBoundingSphere(),t.copy(n.boundingSphere).applyMatrix4(e.matrixWorld),this.intersectsSphere(t)}}(),intersectsSprite:function(){var t=new rt;return function(e){return t.center.set(0,0,0),t.radius=.7071067811865476,t.applyMatrix4(e.matrixWorld),this.intersectsSphere(t)}}(),intersectsSphere:function(t){for(var e=this.planes,n=t.center,i=-t.radius,r=0;r<6;r++){if(e[r].distanceToPoint(n)<i)return!1}return!0},intersectsBox:function(){var t=new l,e=new l;return function(n){for(var i=this.planes,r=0;r<6;r++){var a=i[r];t.x=a.normal.x>0?n.min.x:n.max.x,e.x=a.normal.x>0?n.max.x:n.min.x,t.y=a.normal.y>0?n.min.y:n.max.y,e.y=a.normal.y>0?n.max.y:n.min.y,t.z=a.normal.z>0?n.min.z:n.max.z,e.z=a.normal.z>0?n.max.z:n.min.z;var o=a.distanceToPoint(t),s=a.distanceToPoint(e);if(o<0&&s<0)return!1}return!0}}(),containsPoint:function(t){for(var e=this.planes,n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}}),lt.RotationOrders=["XYZ","YZX","ZXY","XZY","YXZ","ZYX"],lt.DefaultOrder="XYZ",Object.defineProperties(lt.prototype,{x:{get:function(){return this._x},set:function(t){this._x=t,this.onChangeCallback()}},y:{get:function(){return this._y},set:function(t){this._y=t,this.onChangeCallback()}},z:{get:function(){return this._z},set:function(t){this._z=t,this.onChangeCallback()}},order:{get:function(){return this._order},set:function(t){this._order=t,this.onChangeCallback()}}}),Object.assign(lt.prototype,{isEuler:!0,set:function(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._order=i||this._order,this.onChangeCallback(),this},clone:function(){return new this.constructor(this._x,this._y,this._z,this._order)},copy:function(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this.onChangeCallback(),this},setFromRotationMatrix:function(t,e,n){var i=Xo.clamp,r=t.elements,a=r[0],o=r[4],s=r[8],c=r[1],h=r[5],l=r[9],u=r[2],d=r[6],p=r[10];return e=e||this._order,"XYZ"===e?(this._y=Math.asin(i(s,-1,1)),Math.abs(s)<.99999?(this._x=Math.atan2(-l,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,h),this._z=0)):"YXZ"===e?(this._x=Math.asin(-i(l,-1,1)),Math.abs(l)<.99999?(this._y=Math.atan2(s,p),this._z=Math.atan2(c,h)):(this._y=Math.atan2(-u,a),this._z=0)):"ZXY"===e?(this._x=Math.asin(i(d,-1,1)),Math.abs(d)<.99999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,h)):(this._y=0,this._z=Math.atan2(c,a))):"ZYX"===e?(this._y=Math.asin(-i(u,-1,1)),Math.abs(u)<.99999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,a)):(this._x=0,this._z=Math.atan2(-o,h))):"YZX"===e?(this._z=Math.asin(i(c,-1,1)),Math.abs(c)<.99999?(this._x=Math.atan2(-l,h),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(s,p))):"XZY"===e?(this._z=Math.asin(-i(o,-1,1)),Math.abs(o)<.99999?(this._x=Math.atan2(d,h),this._y=Math.atan2(s,a)):(this._x=Math.atan2(-l,p),this._y=0)):console.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: "+e),this._order=e,!1!==n&&this.onChangeCallback(),this},setFromQuaternion:function(){var t=new u;return function(e,n,i){return t.makeRotationFromQuaternion(e),this.setFromRotationMatrix(t,n,i)}}(),setFromVector3:function(t,e){return this.set(t.x,t.y,t.z,e||this._order)},reorder:function(){var t=new h;return function(e){return t.setFromEuler(this),this.setFromQuaternion(t,e)}}(),equals:function(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order},fromArray:function(t){return this._x=t[0],this._y=t[1],this._z=t[2],void 0!==t[3]&&(this._order=t[3]),this.onChangeCallback(),this},toArray:function(t,e){return void 0===t&&(t=[]),void 0===e&&(e=0),t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t},toVector3:function(t){return t?t.set(this._x,this._y,this._z):new l(this._x,this._y,this._z)},onChange:function(t){return this.onChangeCallback=t,this},onChangeCallback:function(){}}),Object.assign(ut.prototype,{set:function(t){this.mask=1<<t|0},enable:function(t){this.mask|=1<<t|0},toggle:function(t){this.mask^=1<<t|0},disable:function(t){this.mask&=~(1<<t|0)},test:function(t){return 0!=(this.mask&t.mask)}});var ss=0;dt.DefaultUp=new l(0,1,0),dt.DefaultMatrixAutoUpdate=!0,Object.assign(dt.prototype,i.prototype,{isObject3D:!0,onBeforeRender:function(){},onAfterRender:function(){},applyMatrix:function(t){this.matrix.multiplyMatrices(t,this.matrix),this.matrix.decompose(this.position,this.quaternion,this.scale)},applyQuaternion:function(t){return this.quaternion.premultiply(t),this},setRotationFromAxisAngle:function(t,e){this.quaternion.setFromAxisAngle(t,e)},setRotationFromEuler:function(t){this.quaternion.setFromEuler(t,!0)},setRotationFromMatrix:function(t){this.quaternion.setFromRotationMatrix(t)},setRotationFromQuaternion:function(t){this.quaternion.copy(t)},rotateOnAxis:function(){var t=new h;return function(e,n){return t.setFromAxisAngle(e,n),this.quaternion.multiply(t),this}}(),rotateX:function(){var t=new l(1,0,0);return function(e){return this.rotateOnAxis(t,e)}}(),rotateY:function(){var t=new l(0,1,0);return function(e){return this.rotateOnAxis(t,e)}}(),rotateZ:function(){var t=new l(0,0,1);return function(e){return this.rotateOnAxis(t,e)}}(),translateOnAxis:function(){var t=new l;return function(e,n){return t.copy(e).applyQuaternion(this.quaternion),this.position.add(t.multiplyScalar(n)),this}}(),translateX:function(){var t=new l(1,0,0);return function(e){return this.translateOnAxis(t,e)}}(),translateY:function(){var t=new l(0,1,0);return function(e){return this.translateOnAxis(t,e)}}(),translateZ:function(){var t=new l(0,0,1);return function(e){return this.translateOnAxis(t,e)}}(),localToWorld:function(t){return t.applyMatrix4(this.matrixWorld)},worldToLocal:function(){var t=new u;return function(e){return e.applyMatrix4(t.getInverse(this.matrixWorld))}}(),lookAt:function(){var t=new u;return function(e){this.isCamera?t.lookAt(this.position,e,this.up):t.lookAt(e,this.position,this.up),this.quaternion.setFromRotationMatrix(t)}}(),add:function(t){if(arguments.length>1){for(var e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(null!==t.parent&&t.parent.remove(t),t.parent=this,t.dispatchEvent({type:"added"}),this.children.push(t)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)},remove:function(t){if(arguments.length>1){for(var e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}var n=this.children.indexOf(t);return-1!==n&&(t.parent=null,t.dispatchEvent({type:"removed"}),this.children.splice(n,1)),this},getObjectById:function(t){return this.getObjectByProperty("id",t)},getObjectByName:function(t){return this.getObjectByProperty("name",t)},getObjectByProperty:function(t,e){if(this[t]===e)return this;for(var n=0,i=this.children.length;n<i;n++){var r=this.children[n],a=r.getObjectByProperty(t,e);if(void 0!==a)return a}},getWorldPosition:function(t){var e=t||new l;return this.updateMatrixWorld(!0),e.setFromMatrixPosition(this.matrixWorld)},getWorldQuaternion:function(){var t=new l,e=new l;return function(n){var i=n||new h;return this.updateMatrixWorld(!0),this.matrixWorld.decompose(t,i,e),i}}(),getWorldRotation:function(){var t=new h;return function(e){var n=e||new lt;return this.getWorldQuaternion(t),n.setFromQuaternion(t,this.rotation.order,!1)}}(),getWorldScale:function(){var t=new l,e=new h;return function(n){var i=n||new l;return this.updateMatrixWorld(!0),this.matrixWorld.decompose(t,e,i),i}}(),getWorldDirection:function(){var t=new h;return function(e){var n=e||new l;return this.getWorldQuaternion(t),n.set(0,0,1).applyQuaternion(t)}}(),raycast:function(){},traverse:function(t){t(this);for(var e=this.children,n=0,i=e.length;n<i;n++)e[n].traverse(t)},traverseVisible:function(t){if(!1!==this.visible){t(this);for(var e=this.children,n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}},traverseAncestors:function(t){var e=this.parent;null!==e&&(t(e),e.traverseAncestors(t))},updateMatrix:function(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0},updateMatrixWorld:function(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(null===this.parent?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);for(var e=this.children,n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)},toJSON:function(t){function e(e,n){return void 0===e[n.uuid]&&(e[n.uuid]=n.toJSON(t)),n.uuid}function n(t){var e=[];for(var n in t){var i=t[n];delete i.metadata,e.push(i)}return e}var i=void 0===t||""===t,r={};i&&(t={geometries:{},materials:{},textures:{},images:{}},r.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});var a={};if(a.uuid=this.uuid,a.type=this.type,""!==this.name&&(a.name=this.name),!0===this.castShadow&&(a.castShadow=!0),!0===this.receiveShadow&&(a.receiveShadow=!0),!1===this.visible&&(a.visible=!1),"{}"!==JSON.stringify(this.userData)&&(a.userData=this.userData),a.matrix=this.matrix.toArray(),void 0!==this.geometry&&(a.geometry=e(t.geometries,this.geometry)),void 0!==this.material)if(Array.isArray(this.material)){for(var o=[],s=0,c=this.material.length;s<c;s++)o.push(e(t.materials,this.material[s]));a.material=o}else a.material=e(t.materials,this.material);if(this.children.length>0){a.children=[];for(var s=0;s<this.children.length;s++)a.children.push(this.children[s].toJSON(t).object)}if(i){var h=n(t.geometries),l=n(t.materials),u=n(t.textures),d=n(t.images);h.length>0&&(r.geometries=h),l.length>0&&(r.materials=l),u.length>0&&(r.textures=u),d.length>0&&(r.images=d)}return r.object=a,r},clone:function(t){return(new this.constructor).copy(this,t)},copy:function(t,e){if(void 0===e&&(e=!0),this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),!0===e)for(var n=0;n<t.children.length;n++){var i=t.children[n];this.add(i.clone())}return this}}),pt.prototype=Object.assign(Object.create(dt.prototype),{constructor:pt,isCamera:!0,copy:function(t,e){return dt.prototype.copy.call(this,t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this},getWorldDirection:function(){var t=new h;return function(e){var n=e||new l;return this.getWorldQuaternion(t),n.set(0,0,-1).applyQuaternion(t)}}(),updateMatrixWorld:function(t){dt.prototype.updateMatrixWorld.call(this,t),this.matrixWorldInverse.getInverse(this.matrixWorld)},clone:function(){return(new this.constructor).copy(this)}}),ft.prototype=Object.assign(Object.create(pt.prototype),{constructor:ft,isOrthographicCamera:!0,copy:function(t,e){return pt.prototype.copy.call(this,t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=null===t.view?null:Object.assign({},t.view),this},setViewOffset:function(t,e,n,i,r,a){this.view={fullWidth:t,fullHeight:e,offsetX:n,offsetY:i,width:r,height:a},this.updateProjectionMatrix()},clearViewOffset:function(){this.view=null,this.updateProjectionMatrix()},updateProjectionMatrix:function(){var t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,r=n-t,a=n+t,o=i+e,s=i-e;if(null!==this.view){var c=this.zoom/(this.view.width/this.view.fullWidth),h=this.zoom/(this.view.height/this.view.fullHeight),l=(this.right-this.left)/this.view.width,u=(this.top-this.bottom)/this.view.height;r+=l*(this.view.offsetX/c),a=r+l*(this.view.width/c),o-=u*(this.view.offsetY/h),s=o-u*(this.view.height/h)}this.projectionMatrix.makeOrthographic(r,a,o,s,this.near,this.far)},toJSON:function(t){var e=dt.prototype.toJSON.call(this,t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,null!==this.view&&(e.object.view=Object.assign({},this.view)),e}}),mt.prototype=Object.assign(Object.create(pt.prototype),{constructor:mt,isPerspectiveCamera:!0,copy:function(t,e){return pt.prototype.copy.call(this,t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=null===t.view?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this},setFocalLength:function(t){var e=.5*this.getFilmHeight()/t;this.fov=2*Xo.RAD2DEG*Math.atan(e),this.updateProjectionMatrix()},getFocalLength:function(){var t=Math.tan(.5*Xo.DEG2RAD*this.fov);return.5*this.getFilmHeight()/t},getEffectiveFOV:function(){return 2*Xo.RAD2DEG*Math.atan(Math.tan(.5*Xo.DEG2RAD*this.fov)/this.zoom)},getFilmWidth:function(){return this.filmGauge*Math.min(this.aspect,1)},getFilmHeight:function(){return this.filmGauge/Math.max(this.aspect,1)},setViewOffset:function(t,e,n,i,r,a){this.aspect=t/e,this.view={fullWidth:t,fullHeight:e,offsetX:n,offsetY:i,width:r,height:a},this.updateProjectionMatrix()},clearViewOffset:function(){this.view=null,this.updateProjectionMatrix()},updateProjectionMatrix:function(){var t=this.near,e=t*Math.tan(.5*Xo.DEG2RAD*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i,a=this.view;if(null!==a){var o=a.fullWidth,s=a.fullHeight;r+=a.offsetX*i/o,e-=a.offsetY*n/s,i*=a.width/o,n*=a.height/s}var c=this.filmOffset;0!==c&&(r+=t*c/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far)},toJSON:function(t){var e=dt.prototype.toJSON.call(this,t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,null!==this.view&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}),Object.assign(vt.prototype,{clone:function(){return(new this.constructor).copy(this)},copy:function(t){this.a=t.a,this.b=t.b,this.c=t.c,this.normal.copy(t.normal),this.color.copy(t.color),this.materialIndex=t.materialIndex;for(var e=0,n=t.vertexNormals.length;e<n;e++)this.vertexNormals[e]=t.vertexNormals[e].clone();for(var e=0,n=t.vertexColors.length;e<n;e++)this.vertexColors[e]=t.vertexColors[e].clone();return this}});var cs=0;Object.assign(yt.prototype,i.prototype,{isGeometry:!0,applyMatrix:function(t){for(var e=(new at).getNormalMatrix(t),n=0,i=this.vertices.length;n<i;n++){this.vertices[n].applyMatrix4(t)}for(var n=0,i=this.faces.length;n<i;n++){var r=this.faces[n];r.normal.applyMatrix3(e).normalize();for(var a=0,o=r.vertexNormals.length;a<o;a++)r.vertexNormals[a].applyMatrix3(e).normalize()}return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this.verticesNeedUpdate=!0,this.normalsNeedUpdate=!0,this},rotateX:function(){var t=new u;return function(e){return t.makeRotationX(e),this.applyMatrix(t),this}}(),rotateY:function(){var t=new u;return function(e){return t.makeRotationY(e),this.applyMatrix(t),this}}(),rotateZ:function(){var t=new u;return function(e){return t.makeRotationZ(e),this.applyMatrix(t),this}}(),translate:function(){var t=new u;return function(e,n,i){return t.makeTranslation(e,n,i),this.applyMatrix(t),this}}(),scale:function(){var t=new u;return function(e,n,i){return t.makeScale(e,n,i),this.applyMatrix(t),this}}(),lookAt:function(){var t=new dt;return function(e){t.lookAt(e),t.updateMatrix(),this.applyMatrix(t.matrix)}}(),fromBufferGeometry:function(t){function e(t,e,i,r){var a=void 0!==s?[d[t].clone(),d[e].clone(),d[i].clone()]:[],o=void 0!==c?[n.colors[t].clone(),n.colors[e].clone(),n.colors[i].clone()]:[],l=new vt(t,e,i,a,o,r);n.faces.push(l),void 0!==h&&n.faceVertexUvs[0].push([p[t].clone(),p[e].clone(),p[i].clone()]),void 0!==u&&n.faceVertexUvs[1].push([f[t].clone(),f[e].clone(),f[i].clone()])}var n=this,i=null!==t.index?t.index.array:void 0,a=t.attributes,o=a.position.array,s=void 0!==a.normal?a.normal.array:void 0,c=void 0!==a.color?a.color.array:void 0,h=void 0!==a.uv?a.uv.array:void 0,u=void 0!==a.uv2?a.uv2.array:void 0;void 0!==u&&(this.faceVertexUvs[1]=[]);for(var d=[],p=[],f=[],m=0,v=0;m<o.length;m+=3,v+=2)n.vertices.push(new l(o[m],o[m+1],o[m+2])),void 0!==s&&d.push(new l(s[m],s[m+1],s[m+2])),void 0!==c&&n.colors.push(new Y(c[m],c[m+1],c[m+2])),void 0!==h&&p.push(new r(h[v],h[v+1])),void 0!==u&&f.push(new r(u[v],u[v+1]));var g=t.groups;if(g.length>0)for(var m=0;m<g.length;m++)for(var y=g[m],x=y.start,b=y.count,v=x,_=x+b;v<_;v+=3)void 0!==i?e(i[v],i[v+1],i[v+2],y.materialIndex):e(v,v+1,v+2,y.materialIndex);else if(void 0!==i)for(var m=0;m<i.length;m+=3)e(i[m],i[m+1],i[m+2]);else for(var m=0;m<o.length/3;m+=3)e(m,m+1,m+2);return this.computeFaceNormals(),null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),this},center:function(){this.computeBoundingBox();var t=this.boundingBox.getCenter().negate();return this.translate(t.x,t.y,t.z),t},normalize:function(){this.computeBoundingSphere();var t=this.boundingSphere.center,e=this.boundingSphere.radius,n=0===e?1:1/e,i=new u;return i.set(n,0,0,-n*t.x,0,n,0,-n*t.y,0,0,n,-n*t.z,0,0,0,1),this.applyMatrix(i),this},computeFaceNormals:function(){for(var t=new l,e=new l,n=0,i=this.faces.length;n<i;n++){var r=this.faces[n],a=this.vertices[r.a],o=this.vertices[r.b],s=this.vertices[r.c];t.subVectors(s,o),e.subVectors(a,o),t.cross(e),t.normalize(),r.normal.copy(t)}},computeVertexNormals:function(t){void 0===t&&(t=!0);var e,n,i,r,a,o;for(o=new Array(this.vertices.length),e=0,n=this.vertices.length;e<n;e++)o[e]=new l;if(t){var s,c,h,u=new l,d=new l;for(i=0,r=this.faces.length;i<r;i++)a=this.faces[i],s=this.vertices[a.a],c=this.vertices[a.b],h=this.vertices[a.c],u.subVectors(h,c),d.subVectors(s,c),u.cross(d),o[a.a].add(u),o[a.b].add(u),o[a.c].add(u)}else for(this.computeFaceNormals(),i=0,r=this.faces.length;i<r;i++)a=this.faces[i],o[a.a].add(a.normal),o[a.b].add(a.normal),o[a.c].add(a.normal);for(e=0,n=this.vertices.length;e<n;e++)o[e].normalize();for(i=0,r=this.faces.length;i<r;i++){a=this.faces[i];var p=a.vertexNormals;3===p.length?(p[0].copy(o[a.a]),p[1].copy(o[a.b]),p[2].copy(o[a.c])):(p[0]=o[a.a].clone(),p[1]=o[a.b].clone(),p[2]=o[a.c].clone())}this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeFlatVertexNormals:function(){var t,e,n;for(this.computeFaceNormals(),t=0,e=this.faces.length;t<e;t++){n=this.faces[t];var i=n.vertexNormals;3===i.length?(i[0].copy(n.normal),i[1].copy(n.normal),i[2].copy(n.normal)):(i[0]=n.normal.clone(),i[1]=n.normal.clone(),i[2]=n.normal.clone())}this.faces.length>0&&(this.normalsNeedUpdate=!0)},computeMorphNormals:function(){var t,e,n,i,r;for(n=0,i=this.faces.length;n<i;n++)for(r=this.faces[n],r.__originalFaceNormal?r.__originalFaceNormal.copy(r.normal):r.__originalFaceNormal=r.normal.clone(),r.__originalVertexNormals||(r.__originalVertexNormals=[]),t=0,e=r.vertexNormals.length;t<e;t++)r.__originalVertexNormals[t]?r.__originalVertexNormals[t].copy(r.vertexNormals[t]):r.__originalVertexNormals[t]=r.vertexNormals[t].clone();var a=new yt;for(a.faces=this.faces,t=0,e=this.morphTargets.length;t<e;t++){if(!this.morphNormals[t]){this.morphNormals[t]={},this.morphNormals[t].faceNormals=[],this.morphNormals[t].vertexNormals=[];var o,s,c=this.morphNormals[t].faceNormals,h=this.morphNormals[t].vertexNormals;for(n=0,i=this.faces.length;n<i;n++)o=new l,s={a:new l,b:new l,c:new l},c.push(o),h.push(s)}var u=this.morphNormals[t];a.vertices=this.morphTargets[t].vertices,a.computeFaceNormals(),a.computeVertexNormals();var o,s;for(n=0,i=this.faces.length;n<i;n++)r=this.faces[n],o=u.faceNormals[n],s=u.vertexNormals[n],o.copy(r.normal),s.a.copy(r.vertexNormals[0]),s.b.copy(r.vertexNormals[1]),s.c.copy(r.vertexNormals[2])}for(n=0,i=this.faces.length;n<i;n++)r=this.faces[n],r.normal=r.__originalFaceNormal,r.vertexNormals=r.__originalVertexNormals},computeLineDistances:function(){for(var t=0,e=this.vertices,n=0,i=e.length;n<i;n++)n>0&&(t+=e[n].distanceTo(e[n-1])),this.lineDistances[n]=t},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new it),this.boundingBox.setFromPoints(this.vertices)},computeBoundingSphere:function(){null===this.boundingSphere&&(this.boundingSphere=new rt),this.boundingSphere.setFromPoints(this.vertices)},merge:function(t,e,n){if(!t||!t.isGeometry)return void console.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.",t);var i,r=this.vertices.length,a=this.vertices,o=t.vertices,s=this.faces,c=t.faces,h=this.faceVertexUvs[0],l=t.faceVertexUvs[0],u=this.colors,d=t.colors;void 0===n&&(n=0),void 0!==e&&(i=(new at).getNormalMatrix(e));for(var p=0,f=o.length;p<f;p++){var m=o[p],v=m.clone();void 0!==e&&v.applyMatrix4(e),a.push(v)}for(var p=0,f=d.length;p<f;p++)u.push(d[p].clone());for(p=0,f=c.length;p<f;p++){var g,y,x,b=c[p],_=b.vertexNormals,w=b.vertexColors;g=new vt(b.a+r,b.b+r,b.c+r),g.normal.copy(b.normal),void 0!==i&&g.normal.applyMatrix3(i).normalize();for(var M=0,E=_.length;M<E;M++)y=_[M].clone(),void 0!==i&&y.applyMatrix3(i).normalize(),g.vertexNormals.push(y);g.color.copy(b.color);for(var M=0,E=w.length;M<E;M++)x=w[M],g.vertexColors.push(x.clone());g.materialIndex=b.materialIndex+n,s.push(g)}for(p=0,f=l.length;p<f;p++){var T=l[p],S=[];if(void 0!==T){for(var M=0,E=T.length;M<E;M++)S.push(T[M].clone());h.push(S)}}},mergeMesh:function(t){if(!t||!t.isMesh)return void console.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.",t);t.matrixAutoUpdate&&t.updateMatrix(),this.merge(t.geometry,t.matrix)},mergeVertices:function(){var t,e,n,i,r,a,o,s,c={},h=[],l=[],u=Math.pow(10,4);for(n=0,i=this.vertices.length;n<i;n++)t=this.vertices[n],e=Math.round(t.x*u)+"_"+Math.round(t.y*u)+"_"+Math.round(t.z*u),void 0===c[e]?(c[e]=n,h.push(this.vertices[n]),l[n]=h.length-1):l[n]=l[c[e]];var d=[];for(n=0,i=this.faces.length;n<i;n++){r=this.faces[n],r.a=l[r.a],r.b=l[r.b],r.c=l[r.c],a=[r.a,r.b,r.c];for(var p=0;p<3;p++)if(a[p]===a[(p+1)%3]){d.push(n);break}}for(n=d.length-1;n>=0;n--){var f=d[n];for(this.faces.splice(f,1),o=0,s=this.faceVertexUvs.length;o<s;o++)this.faceVertexUvs[o].splice(f,1)}var m=this.vertices.length-h.length;return this.vertices=h,m},sortFacesByMaterialIndex:function(){function t(t,e){return t.materialIndex-e.materialIndex}for(var e=this.faces,n=e.length,i=0;i<n;i++)e[i]._id=i;e.sort(t);var r,a,o=this.faceVertexUvs[0],s=this.faceVertexUvs[1];o&&o.length===n&&(r=[]),s&&s.length===n&&(a=[]);for(var i=0;i<n;i++){var c=e[i]._id;r&&r.push(o[c]),a&&a.push(s[c])}r&&(this.faceVertexUvs[0]=r),a&&(this.faceVertexUvs[1]=a)},toJSON:function(){function t(t,e,n){return n?t|1<<e:t&~(1<<e)}function e(t){var e=t.x.toString()+t.y.toString()+t.z.toString();return void 0!==d[e]?d[e]:(d[e]=u.length/3,u.push(t.x,t.y,t.z),d[e])}function n(t){var e=t.r.toString()+t.g.toString()+t.b.toString();return void 0!==f[e]?f[e]:(f[e]=p.length,p.push(t.getHex()),f[e])}function i(t){var e=t.x.toString()+t.y.toString();return void 0!==v[e]?v[e]:(v[e]=m.length/2,m.push(t.x,t.y),v[e])}var r={metadata:{version:4.5,type:"Geometry",generator:"Geometry.toJSON"}};if(r.uuid=this.uuid,r.type=this.type,""!==this.name&&(r.name=this.name),void 0!==this.parameters){var a=this.parameters;for(var o in a)void 0!==a[o]&&(r[o]=a[o]);return r}for(var s=[],c=0;c<this.vertices.length;c++){var h=this.vertices[c];s.push(h.x,h.y,h.z)}for(var l=[],u=[],d={},p=[],f={},m=[],v={},c=0;c<this.faces.length;c++){var g=this.faces[c],y=void 0!==this.faceVertexUvs[0][c],x=g.normal.length()>0,b=g.vertexNormals.length>0,_=1!==g.color.r||1!==g.color.g||1!==g.color.b,w=g.vertexColors.length>0,M=0;if(M=t(M,0,0),M=t(M,1,!0),M=t(M,2,!1),M=t(M,3,y),M=t(M,4,x),M=t(M,5,b),M=t(M,6,_),M=t(M,7,w),l.push(M),l.push(g.a,g.b,g.c),l.push(g.materialIndex),y){var E=this.faceVertexUvs[0][c];l.push(i(E[0]),i(E[1]),i(E[2]))}if(x&&l.push(e(g.normal)),b){var T=g.vertexNormals;l.push(e(T[0]),e(T[1]),e(T[2]))}if(_&&l.push(n(g.color)),w){var S=g.vertexColors;l.push(n(S[0]),n(S[1]),n(S[2]))}}return r.data={},r.data.vertices=s,r.data.normals=u,p.length>0&&(r.data.colors=p),m.length>0&&(r.data.uvs=[m]),r.data.faces=l,r},clone:function(){return(new yt).copy(this)},copy:function(t){var e,n,i,r,a,o;this.vertices=[],this.colors=[],this.faces=[],this.faceVertexUvs=[[]],this.morphTargets=[],this.morphNormals=[],this.skinWeights=[],this.skinIndices=[],this.lineDistances=[],this.boundingBox=null,this.boundingSphere=null,this.name=t.name;var s=t.vertices;for(e=0,n=s.length;e<n;e++)this.vertices.push(s[e].clone());var c=t.colors;for(e=0,n=c.length;e<n;e++)this.colors.push(c[e].clone());var h=t.faces;for(e=0,n=h.length;e<n;e++)this.faces.push(h[e].clone());for(e=0,n=t.faceVertexUvs.length;e<n;e++){var l=t.faceVertexUvs[e];for(void 0===this.faceVertexUvs[e]&&(this.faceVertexUvs[e]=[]),i=0,r=l.length;i<r;i++){var u=l[i],d=[];for(a=0,o=u.length;a<o;a++){var p=u[a];d.push(p.clone())}this.faceVertexUvs[e].push(d)}}var f=t.morphTargets;for(e=0,n=f.length;e<n;e++){var m={};if(m.name=f[e].name,void 0!==f[e].vertices)for(m.vertices=[],i=0,r=f[e].vertices.length;i<r;i++)m.vertices.push(f[e].vertices[i].clone());if(void 0!==f[e].normals)for(m.normals=[],i=0,r=f[e].normals.length;i<r;i++)m.normals.push(f[e].normals[i].clone());this.morphTargets.push(m)}var v=t.morphNormals;for(e=0,n=v.length;e<n;e++){var g={};if(void 0!==v[e].vertexNormals)for(g.vertexNormals=[],i=0,r=v[e].vertexNormals.length;i<r;i++){var y=v[e].vertexNormals[i],x={};x.a=y.a.clone(),x.b=y.b.clone(),x.c=y.c.clone(),g.vertexNormals.push(x)}if(void 0!==v[e].faceNormals)for(g.faceNormals=[],i=0,r=v[e].faceNormals.length;i<r;i++)g.faceNormals.push(v[e].faceNormals[i].clone());this.morphNormals.push(g)}var b=t.skinWeights;for(e=0,n=b.length;e<n;e++)this.skinWeights.push(b[e].clone());var _=t.skinIndices;for(e=0,n=_.length;e<n;e++)this.skinIndices.push(_[e].clone());var w=t.lineDistances;for(e=0,n=w.length;e<n;e++)this.lineDistances.push(w[e]);var M=t.boundingBox;null!==M&&(this.boundingBox=M.clone());var E=t.boundingSphere;return null!==E&&(this.boundingSphere=E.clone()),this.elementsNeedUpdate=t.elementsNeedUpdate,this.verticesNeedUpdate=t.verticesNeedUpdate,this.uvsNeedUpdate=t.uvsNeedUpdate,this.normalsNeedUpdate=t.normalsNeedUpdate,this.colorsNeedUpdate=t.colorsNeedUpdate,this.lineDistancesNeedUpdate=t.lineDistancesNeedUpdate,this.groupsNeedUpdate=t.groupsNeedUpdate,this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),Object.defineProperty(xt.prototype,"needsUpdate",{set:function(t){!0===t&&this.version++}}),Object.assign(xt.prototype,{isBufferAttribute:!0,setArray:function(t){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.count=void 0!==t?t.length/this.itemSize:0,this.array=t},setDynamic:function(t){return this.dynamic=t,this},copy:function(t){return this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.dynamic=t.dynamic,this},copyAt:function(t,e,n){t*=this.itemSize,n*=e.itemSize;for(var i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this},copyArray:function(t){return this.array.set(t),this},copyColorsArray:function(t){for(var e=this.array,n=0,i=0,r=t.length;i<r;i++){var a=t[i];void 0===a&&(console.warn("THREE.BufferAttribute.copyColorsArray(): color is undefined",i),a=new Y),e[n++]=a.r,e[n++]=a.g,e[n++]=a.b}return this},copyIndicesArray:function(t){for(var e=this.array,n=0,i=0,r=t.length;i<r;i++){var a=t[i];e[n++]=a.a,e[n++]=a.b,e[n++]=a.c}return this},copyVector2sArray:function(t){for(var e=this.array,n=0,i=0,a=t.length;i<a;i++){var o=t[i];void 0===o&&(console.warn("THREE.BufferAttribute.copyVector2sArray(): vector is undefined",i),o=new r),e[n++]=o.x,e[n++]=o.y}return this},copyVector3sArray:function(t){for(var e=this.array,n=0,i=0,r=t.length;i<r;i++){var a=t[i];void 0===a&&(console.warn("THREE.BufferAttribute.copyVector3sArray(): vector is undefined",i),a=new l),e[n++]=a.x,e[n++]=a.y,e[n++]=a.z}return this},copyVector4sArray:function(t){for(var e=this.array,n=0,i=0,r=t.length;i<r;i++){var a=t[i];void 0===a&&(console.warn("THREE.BufferAttribute.copyVector4sArray(): vector is undefined",i),a=new o),e[n++]=a.x,e[n++]=a.y,e[n++]=a.z,e[n++]=a.w}return this},set:function(t,e){return void 0===e&&(e=0),this.array.set(t,e),this},getX:function(t){return this.array[t*this.itemSize]},setX:function(t,e){return this.array[t*this.itemSize]=e,this},getY:function(t){return this.array[t*this.itemSize+1]},setY:function(t,e){return this.array[t*this.itemSize+1]=e,this},getZ:function(t){return this.array[t*this.itemSize+2]},setZ:function(t,e){return this.array[t*this.itemSize+2]=e,this},getW:function(t){return this.array[t*this.itemSize+3]},setW:function(t,e){return this.array[t*this.itemSize+3]=e,this},setXY:function(t,e,n){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this},setXYZ:function(t,e,n,i){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this},setXYZW:function(t,e,n,i,r){return t*=this.itemSize,this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this},onUpload:function(t){return this.onUploadCallback=t,this},clone:function(){return new this.constructor(this.array,this.itemSize).copy(this)}}),bt.prototype=Object.create(xt.prototype),bt.prototype.constructor=bt,_t.prototype=Object.create(xt.prototype),_t.prototype.constructor=_t,wt.prototype=Object.create(xt.prototype),wt.prototype.constructor=wt,Mt.prototype=Object.create(xt.prototype),Mt.prototype.constructor=Mt,Et.prototype=Object.create(xt.prototype),Et.prototype.constructor=Et,Tt.prototype=Object.create(xt.prototype),Tt.prototype.constructor=Tt,St.prototype=Object.create(xt.prototype),St.prototype.constructor=St,At.prototype=Object.create(xt.prototype),At.prototype.constructor=At,Lt.prototype=Object.create(xt.prototype),Lt.prototype.constructor=Lt,Object.assign(Rt.prototype,{computeGroups:function(t){for(var e,n=[],i=void 0,r=t.faces,a=0;a<r.length;a++){var o=r[a];o.materialIndex!==i&&(i=o.materialIndex,void 0!==e&&(e.count=3*a-e.start,n.push(e)),e={start:3*a,materialIndex:i})}void 0!==e&&(e.count=3*a-e.start,n.push(e)),this.groups=n},fromGeometry:function(t){var e,n=t.faces,i=t.vertices,a=t.faceVertexUvs,o=a[0]&&a[0].length>0,s=a[1]&&a[1].length>0,c=t.morphTargets,h=c.length;if(h>0){e=[];for(var l=0;l<h;l++)e[l]=[];this.morphTargets.position=e}var u,d=t.morphNormals,p=d.length;if(p>0){u=[];for(var l=0;l<p;l++)u[l]=[];this.morphTargets.normal=u}for(var f=t.skinIndices,m=t.skinWeights,v=f.length===i.length,g=m.length===i.length,l=0;l<n.length;l++){var y=n[l];this.vertices.push(i[y.a],i[y.b],i[y.c]);var x=y.vertexNormals;if(3===x.length)this.normals.push(x[0],x[1],x[2]);else{var b=y.normal;this.normals.push(b,b,b)}var _=y.vertexColors;if(3===_.length)this.colors.push(_[0],_[1],_[2]);else{var w=y.color;this.colors.push(w,w,w)}if(!0===o){var M=a[0][l];void 0!==M?this.uvs.push(M[0],M[1],M[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ",l),this.uvs.push(new r,new r,new r))}if(!0===s){var M=a[1][l];void 0!==M?this.uvs2.push(M[0],M[1],M[2]):(console.warn("THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ",l),this.uvs2.push(new r,new r,new r))}for(var E=0;E<h;E++){var T=c[E].vertices;e[E].push(T[y.a],T[y.b],T[y.c])}for(var E=0;E<p;E++){var S=d[E].vertexNormals[l];u[E].push(S.a,S.b,S.c)}v&&this.skinIndices.push(f[y.a],f[y.b],f[y.c]),g&&this.skinWeights.push(m[y.a],m[y.b],m[y.c])}return this.computeGroups(t),this.verticesNeedUpdate=t.verticesNeedUpdate,this.normalsNeedUpdate=t.normalsNeedUpdate,this.colorsNeedUpdate=t.colorsNeedUpdate,this.uvsNeedUpdate=t.uvsNeedUpdate,this.groupsNeedUpdate=t.groupsNeedUpdate,this}}),Ct.MaxIndex=65535,Object.assign(Ct.prototype,i.prototype,{isBufferGeometry:!0,getIndex:function(){return this.index},setIndex:function(t){Array.isArray(t)?this.index=new(Pt(t)>65535?St:Et)(t,1):this.index=t},addAttribute:function(t,e){return e&&e.isBufferAttribute||e&&e.isInterleavedBufferAttribute?"index"===t?(console.warn("THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute."),void this.setIndex(e)):(this.attributes[t]=e,this):(console.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),void this.addAttribute(t,new xt(arguments[1],arguments[2])))},getAttribute:function(t){return this.attributes[t]},removeAttribute:function(t){return delete this.attributes[t],this},addGroup:function(t,e,n){this.groups.push({start:t,count:e,materialIndex:void 0!==n?n:0})},clearGroups:function(){this.groups=[]},setDrawRange:function(t,e){this.drawRange.start=t,this.drawRange.count=e},applyMatrix:function(t){var e=this.attributes.position;void 0!==e&&(t.applyToBufferAttribute(e),e.needsUpdate=!0);var n=this.attributes.normal;if(void 0!==n){(new at).getNormalMatrix(t).applyToBufferAttribute(n),n.needsUpdate=!0}return null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this},rotateX:function(){var t=new u;return function(e){return t.makeRotationX(e),this.applyMatrix(t),this}}(),rotateY:function(){var t=new u;return function(e){return t.makeRotationY(e),this.applyMatrix(t),this}}(),rotateZ:function(){var t=new u;return function(e){return t.makeRotationZ(e),this.applyMatrix(t),this}}(),translate:function(){var t=new u;return function(e,n,i){return t.makeTranslation(e,n,i),this.applyMatrix(t),this}}(),scale:function(){var t=new u;return function(e,n,i){return t.makeScale(e,n,i),this.applyMatrix(t),this}}(),lookAt:function(){var t=new dt;return function(e){t.lookAt(e),t.updateMatrix(),this.applyMatrix(t.matrix)}}(),center:function(){this.computeBoundingBox();var t=this.boundingBox.getCenter().negate();return this.translate(t.x,t.y,t.z),t},setFromObject:function(t){var e=t.geometry;if(t.isPoints||t.isLine){var n=new At(3*e.vertices.length,3),i=new At(3*e.colors.length,3);if(this.addAttribute("position",n.copyVector3sArray(e.vertices)),this.addAttribute("color",i.copyColorsArray(e.colors)),e.lineDistances&&e.lineDistances.length===e.vertices.length){var r=new At(e.lineDistances.length,1);this.addAttribute("lineDistance",r.copyArray(e.lineDistances))}null!==e.boundingSphere&&(this.boundingSphere=e.boundingSphere.clone()),null!==e.boundingBox&&(this.boundingBox=e.boundingBox.clone())}else t.isMesh&&e&&e.isGeometry&&this.fromGeometry(e);return this},updateFromObject:function(t){var e=t.geometry;if(t.isMesh){var n=e.__directGeometry;if(!0===e.elementsNeedUpdate&&(n=void 0,e.elementsNeedUpdate=!1),void 0===n)return this.fromGeometry(e);n.verticesNeedUpdate=e.verticesNeedUpdate,n.normalsNeedUpdate=e.normalsNeedUpdate,n.colorsNeedUpdate=e.colorsNeedUpdate,n.uvsNeedUpdate=e.uvsNeedUpdate,n.groupsNeedUpdate=e.groupsNeedUpdate,e.verticesNeedUpdate=!1,e.normalsNeedUpdate=!1,e.colorsNeedUpdate=!1,e.uvsNeedUpdate=!1,e.groupsNeedUpdate=!1,e=n}var i;return!0===e.verticesNeedUpdate&&(i=this.attributes.position,void 0!==i&&(i.copyVector3sArray(e.vertices),i.needsUpdate=!0),e.verticesNeedUpdate=!1),!0===e.normalsNeedUpdate&&(i=this.attributes.normal,void 0!==i&&(i.copyVector3sArray(e.normals),i.needsUpdate=!0),e.normalsNeedUpdate=!1),!0===e.colorsNeedUpdate&&(i=this.attributes.color,void 0!==i&&(i.copyColorsArray(e.colors),i.needsUpdate=!0),e.colorsNeedUpdate=!1),e.uvsNeedUpdate&&(i=this.attributes.uv,void 0!==i&&(i.copyVector2sArray(e.uvs),i.needsUpdate=!0),e.uvsNeedUpdate=!1),e.lineDistancesNeedUpdate&&(i=this.attributes.lineDistance,void 0!==i&&(i.copyArray(e.lineDistances),i.needsUpdate=!0),e.lineDistancesNeedUpdate=!1),e.groupsNeedUpdate&&(e.computeGroups(t.geometry),this.groups=e.groups,e.groupsNeedUpdate=!1),this},fromGeometry:function(t){return t.__directGeometry=(new Rt).fromGeometry(t),this.fromDirectGeometry(t.__directGeometry)},fromDirectGeometry:function(t){var e=new Float32Array(3*t.vertices.length);if(this.addAttribute("position",new xt(e,3).copyVector3sArray(t.vertices)),t.normals.length>0){var n=new Float32Array(3*t.normals.length);this.addAttribute("normal",new xt(n,3).copyVector3sArray(t.normals))}if(t.colors.length>0){var i=new Float32Array(3*t.colors.length);this.addAttribute("color",new xt(i,3).copyColorsArray(t.colors))}if(t.uvs.length>0){var r=new Float32Array(2*t.uvs.length);this.addAttribute("uv",new xt(r,2).copyVector2sArray(t.uvs))}if(t.uvs2.length>0){var a=new Float32Array(2*t.uvs2.length);this.addAttribute("uv2",new xt(a,2).copyVector2sArray(t.uvs2))}if(t.indices.length>0){var o=Pt(t.indices)>65535?Uint32Array:Uint16Array,s=new o(3*t.indices.length);this.setIndex(new xt(s,1).copyIndicesArray(t.indices))}this.groups=t.groups;for(var c in t.morphTargets){for(var h=[],l=t.morphTargets[c],u=0,d=l.length;u<d;u++){var p=l[u],f=new At(3*p.length,3);h.push(f.copyVector3sArray(p))}this.morphAttributes[c]=h}if(t.skinIndices.length>0){var m=new At(4*t.skinIndices.length,4);this.addAttribute("skinIndex",m.copyVector4sArray(t.skinIndices))}if(t.skinWeights.length>0){var v=new At(4*t.skinWeights.length,4);this.addAttribute("skinWeight",v.copyVector4sArray(t.skinWeights))}return null!==t.boundingSphere&&(this.boundingSphere=t.boundingSphere.clone()),null!==t.boundingBox&&(this.boundingBox=t.boundingBox.clone()),this},computeBoundingBox:function(){null===this.boundingBox&&(this.boundingBox=new it);var t=this.attributes.position;void 0!==t?this.boundingBox.setFromBufferAttribute(t):this.boundingBox.makeEmpty(),(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)},computeBoundingSphere:function(){var t=new it,e=new l;return function(){null===this.boundingSphere&&(this.boundingSphere=new rt);var n=this.attributes.position;if(n){var i=this.boundingSphere.center;t.setFromBufferAttribute(n),t.getCenter(i);for(var r=0,a=0,o=n.count;a<o;a++)e.x=n.getX(a),e.y=n.getY(a),e.z=n.getZ(a),r=Math.max(r,i.distanceToSquared(e));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}}(),computeFaceNormals:function(){},computeVertexNormals:function(){var t=this.index,e=this.attributes,n=this.groups;if(e.position){var i=e.position.array;if(void 0===e.normal)this.addAttribute("normal",new xt(new Float32Array(i.length),3));else for(var r=e.normal.array,a=0,o=r.length;a<o;a++)r[a]=0;var s,c,h,u=e.normal.array,d=new l,p=new l,f=new l,m=new l,v=new l;if(t){var g=t.array;0===n.length&&this.addGroup(0,g.length);for(var y=0,x=n.length;y<x;++y)for(var b=n[y],_=b.start,w=b.count,a=_,o=_+w;a<o;a+=3)s=3*g[a+0],c=3*g[a+1],h=3*g[a+2],d.fromArray(i,s),p.fromArray(i,c),f.fromArray(i,h),m.subVectors(f,p),v.subVectors(d,p),m.cross(v),u[s]+=m.x,u[s+1]+=m.y,u[s+2]+=m.z,u[c]+=m.x,u[c+1]+=m.y,u[c+2]+=m.z,u[h]+=m.x,u[h+1]+=m.y,u[h+2]+=m.z}else for(var a=0,o=i.length;a<o;a+=9)d.fromArray(i,a),p.fromArray(i,a+3),f.fromArray(i,a+6),m.subVectors(f,p),v.subVectors(d,p),m.cross(v),u[a]=m.x,u[a+1]=m.y,u[a+2]=m.z,u[a+3]=m.x,u[a+4]=m.y,u[a+5]=m.z,u[a+6]=m.x,u[a+7]=m.y,u[a+8]=m.z;this.normalizeNormals(),e.normal.needsUpdate=!0}},merge:function(t,e){if(!t||!t.isBufferGeometry)return void console.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.",t);void 0===e&&(e=0);var n=this.attributes;for(var i in n)if(void 0!==t.attributes[i])for(var r=n[i],a=r.array,o=t.attributes[i],s=o.array,c=o.itemSize,h=0,l=c*e;h<s.length;h++,l++)a[l]=s[h];return this},normalizeNormals:function(){var t=new l;return function(){for(var e=this.attributes.normal,n=0,i=e.count;n<i;n++)t.x=e.getX(n),t.y=e.getY(n),t.z=e.getZ(n),t.normalize(),e.setXYZ(n,t.x,t.y,t.z)}}(),toNonIndexed:function(){if(null===this.index)return console.warn("THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed."),this;var t=new Ct,e=this.index.array,n=this.attributes;for(var i in n){for(var r=n[i],a=r.array,o=r.itemSize,s=new a.constructor(e.length*o),c=0,h=0,l=0,u=e.length;l<u;l++){c=e[l]*o;for(var d=0;d<o;d++)s[h++]=a[c++]}t.addAttribute(i,new xt(s,o))}return t},toJSON:function(){var t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,""!==this.name&&(t.name=this.name),void 0!==this.parameters){var e=this.parameters;for(var n in e)void 0!==e[n]&&(t[n]=e[n]);return t}t.data={attributes:{}};var i=this.index;if(null!==i){var r=Array.prototype.slice.call(i.array);t.data.index={type:i.array.constructor.name,array:r}}var a=this.attributes;for(var n in a){var o=a[n],r=Array.prototype.slice.call(o.array);t.data.attributes[n]={itemSize:o.itemSize,type:o.array.constructor.name,array:r,normalized:o.normalized}}var s=this.groups;s.length>0&&(t.data.groups=JSON.parse(JSON.stringify(s)));var c=this.boundingSphere;return null!==c&&(t.data.boundingSphere={center:c.center.toArray(),radius:c.radius}),t},clone:function(){return(new Ct).copy(this)},copy:function(t){var e,n,i;this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.name=t.name;var r=t.index;null!==r&&this.setIndex(r.clone());var a=t.attributes;for(e in a){var o=a[e];this.addAttribute(e,o.clone())}var s=t.morphAttributes;for(e in s){var c=[],h=s[e];for(n=0,i=h.length;n<i;n++)c.push(h[n].clone());this.morphAttributes[e]=c}var l=t.groups;for(n=0,i=l.length;n<i;n++){var u=l[n];this.addGroup(u.start,u.count,u.materialIndex)}var d=t.boundingBox;null!==d&&(this.boundingBox=d.clone());var p=t.boundingSphere;return null!==p&&(this.boundingSphere=p.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this},dispose:function(){this.dispatchEvent({type:"dispose"})}}),Nt.prototype=Object.create(yt.prototype),Nt.prototype.constructor=Nt,It.prototype=Object.create(Ct.prototype),It.prototype.constructor=It,Ot.prototype=Object.create(yt.prototype),Ot.prototype.constructor=Ot,Ut.prototype=Object.create(Ct.prototype),Ut.prototype.constructor=Ut,Dt.prototype=Object.create($.prototype),Dt.prototype.constructor=Dt,Dt.prototype.isMeshBasicMaterial=!0,Dt.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this},Object.assign(Ft.prototype,{set:function(t,e){return this.origin.copy(t),this.direction.copy(e),this},clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this},at:function(t,e){return(e||new l).copy(this.direction).multiplyScalar(t).add(this.origin)},lookAt:function(t){return this.direction.copy(t).sub(this.origin).normalize(),this},recast:function(){var t=new l;return function(e){return this.origin.copy(this.at(e,t)),this}}(),closestPointToPoint:function(t,e){var n=e||new l;n.subVectors(t,this.origin);var i=n.dot(this.direction);return i<0?n.copy(this.origin):n.copy(this.direction).multiplyScalar(i).add(this.origin)},distanceToPoint:function(t){return Math.sqrt(this.distanceSqToPoint(t))},distanceSqToPoint:function(){var t=new l;return function(e){var n=t.subVectors(e,this.origin).dot(this.direction);return n<0?this.origin.distanceToSquared(e):(t.copy(this.direction).multiplyScalar(n).add(this.origin),t.distanceToSquared(e))}}(),distanceSqToSegment:function(){var t=new l,e=new l,n=new l;return function(i,r,a,o){t.copy(i).add(r).multiplyScalar(.5),e.copy(r).sub(i).normalize(),n.copy(this.origin).sub(t);var s,c,h,l,u=.5*i.distanceTo(r),d=-this.direction.dot(e),p=n.dot(this.direction),f=-n.dot(e),m=n.lengthSq(),v=Math.abs(1-d*d);if(v>0)if(s=d*f-p,c=d*p-f,l=u*v,s>=0)if(c>=-l)if(c<=l){var g=1/v;s*=g,c*=g,h=s*(s+d*c+2*p)+c*(d*s+c+2*f)+m}else c=u,s=Math.max(0,-(d*c+p)),h=-s*s+c*(c+2*f)+m;else c=-u,s=Math.max(0,-(d*c+p)),h=-s*s+c*(c+2*f)+m;else c<=-l?(s=Math.max(0,-(-d*u+p)),c=s>0?-u:Math.min(Math.max(-u,-f),u),h=-s*s+c*(c+2*f)+m):c<=l?(s=0,c=Math.min(Math.max(-u,-f),u),h=c*(c+2*f)+m):(s=Math.max(0,-(d*u+p)),c=s>0?u:Math.min(Math.max(-u,-f),u),h=-s*s+c*(c+2*f)+m);else c=d>0?-u:u,s=Math.max(0,-(d*c+p)),h=-s*s+c*(c+2*f)+m;return a&&a.copy(this.direction).multiplyScalar(s).add(this.origin),o&&o.copy(e).multiplyScalar(c).add(t),h}}(),intersectSphere:function(){var t=new l;return function(e,n){t.subVectors(e.center,this.origin);var i=t.dot(this.direction),r=t.dot(t)-i*i,a=e.radius*e.radius;if(r>a)return null;var o=Math.sqrt(a-r),s=i-o,c=i+o;return s<0&&c<0?null:s<0?this.at(c,n):this.at(s,n)}}(),intersectsSphere:function(t){return this.distanceToPoint(t.center)<=t.radius},distanceToPlane:function(t){var e=t.normal.dot(this.direction);if(0===e)return 0===t.distanceToPoint(this.origin)?0:null;var n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null},intersectPlane:function(t,e){var n=this.distanceToPlane(t);return null===n?null:this.at(n,e)},intersectsPlane:function(t){var e=t.distanceToPoint(this.origin);return 0===e||t.normal.dot(this.direction)*e<0},intersectBox:function(t,e){var n,i,r,a,o,s,c=1/this.direction.x,h=1/this.direction.y,l=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i?null:((r>n||n!==n)&&(n=r),(a<i||i!==i)&&(i=a),l>=0?(o=(t.min.z-u.z)*l,s=(t.max.z-u.z)*l):(o=(t.max.z-u.z)*l,s=(t.min.z-u.z)*l),n>s||o>i?null:((o>n||n!==n)&&(n=o),(s<i||i!==i)&&(i=s),i<0?null:this.at(n>=0?n:i,e)))},intersectsBox:function(){var t=new l;return function(e){return null!==this.intersectBox(e,t)}}(),intersectTriangle:function(){var t=new l,e=new l,n=new l,i=new l;return function(r,a,o,s,c){e.subVectors(a,r),n.subVectors(o,r),i.crossVectors(e,n);var h,l=this.direction.dot(i);if(l>0){if(s)return null;h=1}else{if(!(l<0))return null;h=-1,l=-l}t.subVectors(this.origin,r);var u=h*this.direction.dot(n.crossVectors(t,n));if(u<0)return null;var d=h*this.direction.dot(e.cross(t));if(d<0)return null;if(u+d>l)return null;var p=-h*t.dot(i);return p<0?null:this.at(p/l,c)}}(),applyMatrix4:function(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this},equals:function(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}}),Object.assign(zt.prototype,{set:function(t,e){return this.start.copy(t),this.end.copy(e),this},clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.start.copy(t.start),this.end.copy(t.end),this},getCenter:function(t){return(t||new l).addVectors(this.start,this.end).multiplyScalar(.5)},delta:function(t){return(t||new l).subVectors(this.end,this.start)},distanceSq:function(){return this.start.distanceToSquared(this.end)},distance:function(){return this.start.distanceTo(this.end)},at:function(t,e){var n=e||new l;return this.delta(n).multiplyScalar(t).add(this.start)},closestPointToPointParameter:function(){var t=new l,e=new l;return function(n,i){t.subVectors(n,this.start),e.subVectors(this.end,this.start);var r=e.dot(e),a=e.dot(t),o=a/r;return i&&(o=Xo.clamp(o,0,1)),o}}(),closestPointToPoint:function(t,e,n){var i=this.closestPointToPointParameter(t,e),r=n||new l;return this.delta(r).multiplyScalar(i).add(this.start)},applyMatrix4:function(t){return this.start.applyMatrix4(t),this.end.applyMatrix4(t),this},equals:function(t){return t.start.equals(this.start)&&t.end.equals(this.end)}}),Object.assign(Bt,{normal:function(){var t=new l;return function(e,n,i,r){var a=r||new l;a.subVectors(i,n),t.subVectors(e,n),a.cross(t);var o=a.lengthSq();return o>0?a.multiplyScalar(1/Math.sqrt(o)):a.set(0,0,0)}}(),barycoordFromPoint:function(){var t=new l,e=new l,n=new l;return function(i,r,a,o,s){t.subVectors(o,r),e.subVectors(a,r),n.subVectors(i,r);var c=t.dot(t),h=t.dot(e),u=t.dot(n),d=e.dot(e),p=e.dot(n),f=c*d-h*h,m=s||new l;if(0===f)return m.set(-2,-1,-1);var v=1/f,g=(d*u-h*p)*v,y=(c*p-h*u)*v;return m.set(1-g-y,y,g)}}(),containsPoint:function(){var t=new l;return function(e,n,i,r){var a=Bt.barycoordFromPoint(e,n,i,r,t);return a.x>=0&&a.y>=0&&a.x+a.y<=1}}()}),Object.assign(Bt.prototype,{set:function(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this},setFromPointsAndIndices:function(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this},clone:function(){return(new this.constructor).copy(this)},copy:function(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this},area:function(){var t=new l,e=new l;return function(){return t.subVectors(this.c,this.b),e.subVectors(this.a,this.b),.5*t.cross(e).length()}}(),midpoint:function(t){return(t||new l).addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)},normal:function(t){return Bt.normal(this.a,this.b,this.c,t)},plane:function(t){return(t||new ot).setFromCoplanarPoints(this.a,this.b,this.c)},barycoordFromPoint:function(t,e){return Bt.barycoordFromPoint(t,this.a,this.b,this.c,e)},containsPoint:function(t){return Bt.containsPoint(t,this.a,this.b,this.c)},closestPointToPoint:function(){var t=new ot,e=[new zt,new zt,new zt],n=new l,i=new l;return function(r,a){var o=a||new l,s=1/0;if(t.setFromCoplanarPoints(this.a,this.b,this.c),t.projectPoint(r,n),!0===this.containsPoint(n))o.copy(n);else{e[0].set(this.a,this.b),e[1].set(this.b,this.c),e[2].set(this.c,this.a);for(var c=0;c<e.length;c++){e[c].closestPointToPoint(n,!0,i);var h=n.distanceToSquared(i);h<s&&(s=h,o.copy(i))}}return o}}(),equals:function(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}),kt.prototype=Object.assign(Object.create(dt.prototype),{constructor:kt,isMesh:!0,setDrawMode:function(t){this.drawMode=t},copy:function(t){return dt.prototype.copy.call(this,t),this.drawMode=t.drawMode,this},updateMorphTargets:function(){var t,e,n,i=this.geometry;if(i.isBufferGeometry){var r=i.morphAttributes,a=Object.keys(r);if(a.length>0){var o=r[a[0]];if(void 0!==o)for(this.morphTargetInfluences=[],this.morphTargetDictionary={},t=0,e=o.length;t<e;t++)n=o[t].name||String(t),this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=t}}else{var s=i.morphTargets;if(void 0!==s&&s.length>0)for(this.morphTargetInfluences=[],this.morphTargetDictionary={},t=0,e=s.length;t<e;t++)n=s[t].name||String(t),this.morphTargetInfluences.push(0),this.morphTargetDictionary[n]=t}},raycast:function(){function t(t,e,n,i,r,a,o){return Bt.barycoordFromPoint(t,e,n,i,y),r.multiplyScalar(y.x),a.multiplyScalar(y.y),o.multiplyScalar(y.z),r.add(a).add(o),r.clone()}function e(t,e,n,i,r,a,o,s){if(null===(e.side===Jr?i.intersectTriangle(o,a,r,!0,s):i.intersectTriangle(r,a,o,e.side!==Qr,s)))return null;b.copy(s),b.applyMatrix4(t.matrixWorld);var c=n.ray.origin.distanceTo(b);return c<n.near||c>n.far?null:{distance:c,point:b.clone(),object:t}}function n(n,i,r,a,o,l,u,d){s.fromBufferAttribute(a,l),c.fromBufferAttribute(a,u),h.fromBufferAttribute(a,d);var p=e(n,n.material,i,r,s,c,h,x);return p&&(o&&(m.fromBufferAttribute(o,l),v.fromBufferAttribute(o,u),g.fromBufferAttribute(o,d),p.uv=t(x,s,c,h,m,v,g)),p.face=new vt(l,u,d,Bt.normal(s,c,h)),p.faceIndex=l),p}var i=new u,a=new Ft,o=new rt,s=new l,c=new l,h=new l,d=new l,p=new l,f=new l,m=new r,v=new r,g=new r,y=new l,x=new l,b=new l;return function(r,l){var u=this.geometry,y=this.material,b=this.matrixWorld;if(void 0!==y&&(null===u.boundingSphere&&u.computeBoundingSphere(),o.copy(u.boundingSphere),o.applyMatrix4(b),!1!==r.ray.intersectsSphere(o)&&(i.getInverse(b),a.copy(r.ray).applyMatrix4(i),null===u.boundingBox||!1!==a.intersectsBox(u.boundingBox)))){var _;if(u.isBufferGeometry){var w,M,E,T,S,A=u.index,L=u.attributes.position,R=u.attributes.uv;if(null!==A)for(T=0,S=A.count;T<S;T+=3)w=A.getX(T),M=A.getX(T+1),E=A.getX(T+2),(_=n(this,r,a,L,R,w,M,E))&&(_.faceIndex=Math.floor(T/3),l.push(_));else for(T=0,S=L.count;T<S;T+=3)w=T,M=T+1,E=T+2,(_=n(this,r,a,L,R,w,M,E))&&(_.index=w,l.push(_))}else if(u.isGeometry){var P,C,N,I,O=Array.isArray(y),U=u.vertices,D=u.faces,F=u.faceVertexUvs[0];F.length>0&&(I=F);for(var z=0,B=D.length;z<B;z++){var k=D[z],j=O?y[k.materialIndex]:y;if(void 0!==j){if(P=U[k.a],C=U[k.b],N=U[k.c],!0===j.morphTargets){var G=u.morphTargets,V=this.morphTargetInfluences;s.set(0,0,0),c.set(0,0,0),h.set(0,0,0);for(var H=0,W=G.length;H<W;H++){var X=V[H];if(0!==X){var q=G[H].vertices;s.addScaledVector(d.subVectors(q[k.a],P),X),c.addScaledVector(p.subVectors(q[k.b],C),X),h.addScaledVector(f.subVectors(q[k.c],N),X)}}s.add(P),c.add(C),h.add(N),P=s,C=c,N=h}if(_=e(this,j,r,a,P,C,N,x)){if(I&&I[z]){var Y=I[z];m.copy(Y[0]),v.copy(Y[1]),g.copy(Y[2]),_.uv=t(x,P,C,N,m,v,g)}_.face=k,_.faceIndex=z,l.push(_)}}}}}}}(),clone:function(){return new this.constructor(this.geometry,this.material).copy(this)}});var hs=0;xe.prototype=Object.assign(Object.create(mt.prototype),{constructor:xe,isArrayCamera:!0}),Te.prototype.isFogExp2=!0,Te.prototype.clone=function(){return new Te(this.color.getHex(),this.density)},Te.prototype.toJSON=function(t){return{type:"FogExp2",color:this.color.getHex(),density:this.density}},Se.prototype.isFog=!0,Se.prototype.clone=function(){return new Se(this.color.getHex(),this.near,this.far)},Se.prototype.toJSON=function(t){return{type:"Fog",color:this.color.getHex(),near:this.near,far:this.far}},Ae.prototype=Object.assign(Object.create(dt.prototype),{constructor:Ae,copy:function(t,e){return dt.prototype.copy.call(this,t,e),null!==t.background&&(this.background=t.background.clone()),null!==t.fog&&(this.fog=t.fog.clone()),null!==t.overrideMaterial&&(this.overrideMaterial=t.overrideMaterial.clone()),this.autoUpdate=t.autoUpdate,this.matrixAutoUpdate=t.matrixAutoUpdate,this},toJSON:function(t){var e=dt.prototype.toJSON.call(this,t);return null!==this.background&&(e.object.background=this.background.toJSON(t)),null!==this.fog&&(e.object.fog=this.fog.toJSON()),e}}),Le.prototype=Object.assign(Object.create(dt.prototype),{constructor:Le,isLensFlare:!0,copy:function(t){dt.prototype.copy.call(this,t),this.positionScreen.copy(t.positionScreen),this.customUpdateCallback=t.customUpdateCallback;for(var e=0,n=t.lensFlares.length;e<n;e++)this.lensFlares.push(t.lensFlares[e]);return this},add:function(t,e,n,i,r,a){void 0===e&&(e=-1),void 0===n&&(n=0),void 0===a&&(a=1),void 0===r&&(r=new Y(16777215)),void 0===i&&(i=ra),n=Math.min(n,Math.max(0,n)),this.lensFlares.push({texture:t,size:e,distance:n,x:0,y:0,z:0,scale:1,rotation:0,opacity:a,color:r,blending:i})},updateLensFlares:function(){var t,e,n=this.lensFlares.length,i=2*-this.positionScreen.x,r=2*-this.positionScreen.y;for(t=0;t<n;t++)e=this.lensFlares[t],e.x=this.positionScreen.x+i*e.distance,e.y=this.positionScreen.y+r*e.distance,e.wantedRotation=e.x*Math.PI*.25,e.rotation+=.25*(e.wantedRotation-e.rotation)}}),Re.prototype=Object.create($.prototype),Re.prototype.constructor=Re,Re.prototype.isSpriteMaterial=!0,Re.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.color.copy(t.color),this.map=t.map,this.rotation=t.rotation,this},Pe.prototype=Object.assign(Object.create(dt.prototype),{constructor:Pe,isSprite:!0,raycast:function(){var t=new l,e=new l,n=new l;return function(i,r){e.setFromMatrixPosition(this.matrixWorld),i.ray.closestPointToPoint(e,t),n.setFromMatrixScale(this.matrixWorld);var a=n.x*n.y/4;if(!(e.distanceToSquared(t)>a)){var o=i.ray.origin.distanceTo(t);o<i.near||o>i.far||r.push({distance:o,point:t.clone(),face:null,object:this})}}}(),clone:function(){return new this.constructor(this.material).copy(this)}}),Ce.prototype=Object.assign(Object.create(dt.prototype),{constructor:Ce,copy:function(t){dt.prototype.copy.call(this,t,!1);for(var e=t.levels,n=0,i=e.length;n<i;n++){var r=e[n];this.addLevel(r.object.clone(),r.distance)}return this},addLevel:function(t,e){void 0===e&&(e=0),e=Math.abs(e);for(var n=this.levels,i=0;i<n.length&&!(e<n[i].distance);i++);n.splice(i,0,{distance:e,object:t}),this.add(t)},getObjectForDistance:function(t){for(var e=this.levels,n=1,i=e.length;n<i&&!(t<e[n].distance);n++);return e[n-1].object},raycast:function(){var t=new l;return function(e,n){t.setFromMatrixPosition(this.matrixWorld);var i=e.ray.origin.distanceTo(t);this.getObjectForDistance(i).raycast(e,n)}}(),update:function(){var t=new l,e=new l;return function(n){var i=this.levels;if(i.length>1){t.setFromMatrixPosition(n.matrixWorld),e.setFromMatrixPosition(this.matrixWorld);var r=t.distanceTo(e);i[0].object.visible=!0;for(var a=1,o=i.length;a<o&&r>=i[a].distance;a++)i[a-1].object.visible=!1,i[a].object.visible=!0;for(;a<o;a++)i[a].object.visible=!1}}}(),toJSON:function(t){var e=dt.prototype.toJSON.call(this,t);e.object.levels=[];for(var n=this.levels,i=0,r=n.length;i<r;i++){var a=n[i];e.object.levels.push({object:a.object.uuid,distance:a.distance})}return e}}),Object.assign(Ne.prototype,{calculateInverses:function(){this.boneInverses=[];for(var t=0,e=this.bones.length;t<e;t++){var n=new u;this.bones[t]&&n.getInverse(this.bones[t].matrixWorld),this.boneInverses.push(n)}},pose:function(){var t,e,n;for(e=0,n=this.bones.length;e<n;e++)(t=this.bones[e])&&t.matrixWorld.getInverse(this.boneInverses[e]);for(e=0,n=this.bones.length;e<n;e++)(t=this.bones[e])&&(t.parent&&t.parent.isBone?(t.matrix.getInverse(t.parent.matrixWorld),t.matrix.multiply(t.matrixWorld)):t.matrix.copy(t.matrixWorld),t.matrix.decompose(t.position,t.quaternion,t.scale))},update:function(){var t=new u,e=new u;return function(){for(var n=this.bones,i=this.boneInverses,r=this.boneMatrices,a=this.boneTexture,o=0,s=n.length;o<s;o++){var c=n[o]?n[o].matrixWorld:e;t.multiplyMatrices(c,i[o]),t.toArray(r,16*o)}void 0!==a&&(a.needsUpdate=!0)}}(),clone:function(){return new Ne(this.bones,this.boneInverses)}}),Ie.prototype=Object.assign(Object.create(dt.prototype),{constructor:Ie,isBone:!0}),Oe.prototype=Object.assign(Object.create(kt.prototype),{constructor:Oe,isSkinnedMesh:!0,initBones:function(){var t,e,n,i,r=[];if(this.geometry&&void 0!==this.geometry.bones){for(n=0,i=this.geometry.bones.length;n<i;n++)e=this.geometry.bones[n],t=new Ie,r.push(t),t.name=e.name,t.position.fromArray(e.pos),t.quaternion.fromArray(e.rotq),void 0!==e.scl&&t.scale.fromArray(e.scl);for(n=0,i=this.geometry.bones.length;n<i;n++)e=this.geometry.bones[n],-1!==e.parent&&null!==e.parent&&void 0!==r[e.parent]?r[e.parent].add(r[n]):this.add(r[n])}return this.updateMatrixWorld(!0),r},bind:function(t,e){this.skeleton=t,void 0===e&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),e=this.matrixWorld),this.bindMatrix.copy(e),this.bindMatrixInverse.getInverse(e)},pose:function(){this.skeleton.pose()},normalizeSkinWeights:function(){var t,e;if(this.geometry&&this.geometry.isGeometry)for(e=0;e<this.geometry.skinWeights.length;e++){var n=this.geometry.skinWeights[e];t=1/n.lengthManhattan(),t!==1/0?n.multiplyScalar(t):n.set(1,0,0,0)}else if(this.geometry&&this.geometry.isBufferGeometry){var i=new o,r=this.geometry.attributes.skinWeight;for(e=0;e<r.count;e++)i.x=r.getX(e),i.y=r.getY(e),i.z=r.getZ(e),i.w=r.getW(e),t=1/i.lengthManhattan(),t!==1/0?i.multiplyScalar(t):i.set(1,0,0,0),r.setXYZW(e,i.x,i.y,i.z,i.w)}},updateMatrixWorld:function(t){kt.prototype.updateMatrixWorld.call(this,t),"attached"===this.bindMode?this.bindMatrixInverse.getInverse(this.matrixWorld):"detached"===this.bindMode?this.bindMatrixInverse.getInverse(this.bindMatrix):console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)},clone:function(){return new this.constructor(this.geometry,this.material).copy(this)}}),Ue.prototype=Object.create($.prototype),Ue.prototype.constructor=Ue,Ue.prototype.isLineBasicMaterial=!0,Ue.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.color.copy(t.color),this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this},De.prototype=Object.assign(Object.create(dt.prototype),{constructor:De,isLine:!0,raycast:function(){var t=new u,e=new Ft,n=new rt;return function(i,r){var a=i.linePrecision,o=a*a,s=this.geometry,c=this.matrixWorld;if(null===s.boundingSphere&&s.computeBoundingSphere(),n.copy(s.boundingSphere),n.applyMatrix4(c),!1!==i.ray.intersectsSphere(n)){t.getInverse(c),e.copy(i.ray).applyMatrix4(t);var h=new l,u=new l,d=new l,p=new l,f=this&&this.isLineSegments?2:1;if(s.isBufferGeometry){var m=s.index,v=s.attributes,g=v.position.array;if(null!==m)for(var y=m.array,x=0,b=y.length-1;x<b;x+=f){var _=y[x],w=y[x+1];h.fromArray(g,3*_),u.fromArray(g,3*w);var M=e.distanceSqToSegment(h,u,p,d);if(!(M>o)){p.applyMatrix4(this.matrixWorld);var E=i.ray.origin.distanceTo(p);E<i.near||E>i.far||r.push({distance:E,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}else for(var x=0,b=g.length/3-1;x<b;x+=f){h.fromArray(g,3*x),u.fromArray(g,3*x+3);var M=e.distanceSqToSegment(h,u,p,d);if(!(M>o)){p.applyMatrix4(this.matrixWorld);var E=i.ray.origin.distanceTo(p);E<i.near||E>i.far||r.push({distance:E,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}else if(s.isGeometry)for(var T=s.vertices,S=T.length,x=0;x<S-1;x+=f){var M=e.distanceSqToSegment(T[x],T[x+1],p,d);if(!(M>o)){p.applyMatrix4(this.matrixWorld);var E=i.ray.origin.distanceTo(p);E<i.near||E>i.far||r.push({distance:E,point:d.clone().applyMatrix4(this.matrixWorld),index:x,face:null,faceIndex:null,object:this})}}}}}(),clone:function(){return new this.constructor(this.geometry,this.material).copy(this)}}),Fe.prototype=Object.assign(Object.create(De.prototype),{constructor:Fe,isLineSegments:!0}),ze.prototype=Object.assign(Object.create(De.prototype),{constructor:ze,isLineLoop:!0}),Be.prototype=Object.create($.prototype),Be.prototype.constructor=Be,Be.prototype.isPointsMaterial=!0,Be.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.color.copy(t.color),this.map=t.map,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this},ke.prototype=Object.assign(Object.create(dt.prototype),{constructor:ke,isPoints:!0,raycast:function(){var t=new u,e=new Ft,n=new rt;return function(i,r){function a(t,n){var a=e.distanceSqToPoint(t);if(a<d){var s=e.closestPointToPoint(t);s.applyMatrix4(c);var h=i.ray.origin.distanceTo(s);if(h<i.near||h>i.far)return;r.push({distance:h,distanceToRay:Math.sqrt(a),point:s.clone(),index:n,face:null,object:o})}}var o=this,s=this.geometry,c=this.matrixWorld,h=i.params.Points.threshold;if(null===s.boundingSphere&&s.computeBoundingSphere(),n.copy(s.boundingSphere),n.applyMatrix4(c),n.radius+=h,!1!==i.ray.intersectsSphere(n)){t.getInverse(c),e.copy(i.ray).applyMatrix4(t);var u=h/((this.scale.x+this.scale.y+this.scale.z)/3),d=u*u,p=new l;if(s.isBufferGeometry){var f=s.index,m=s.attributes,v=m.position.array;if(null!==f)for(var g=f.array,y=0,x=g.length;y<x;y++){var b=g[y];p.fromArray(v,3*b),a(p,b)}else for(var y=0,_=v.length/3;y<_;y++)p.fromArray(v,3*y),a(p,y)}else for(var w=s.vertices,y=0,_=w.length;y<_;y++)a(w[y],y)}}}(),clone:function(){return new this.constructor(this.geometry,this.material).copy(this)}}),je.prototype=Object.assign(Object.create(dt.prototype),{constructor:je}),Ge.prototype=Object.create(a.prototype),Ge.prototype.constructor=Ge,Ve.prototype=Object.create(a.prototype),Ve.prototype.constructor=Ve,Ve.prototype.isCompressedTexture=!0,He.prototype=Object.create(a.prototype),He.prototype.constructor=He,He.prototype.isDepthTexture=!0,We.prototype=Object.create(Ct.prototype),We.prototype.constructor=We,Xe.prototype=Object.create(yt.prototype),Xe.prototype.constructor=Xe,qe.prototype=Object.create(Ct.prototype),qe.prototype.constructor=qe,Ye.prototype=Object.create(yt.prototype),Ye.prototype.constructor=Ye,Ze.prototype=Object.create(Ct.prototype),Ze.prototype.constructor=Ze,Je.prototype=Object.create(yt.prototype),Je.prototype.constructor=Je,Qe.prototype=Object.create(Ze.prototype),Qe.prototype.constructor=Qe,Ke.prototype=Object.create(yt.prototype),Ke.prototype.constructor=Ke,$e.prototype=Object.create(Ze.prototype),$e.prototype.constructor=$e,tn.prototype=Object.create(yt.prototype),tn.prototype.constructor=tn,en.prototype=Object.create(Ze.prototype),en.prototype.constructor=en,nn.prototype=Object.create(yt.prototype),nn.prototype.constructor=nn,rn.prototype=Object.create(Ze.prototype),rn.prototype.constructor=rn,an.prototype=Object.create(yt.prototype),an.prototype.constructor=an,on.prototype=Object.create(Ct.prototype),on.prototype.constructor=on,sn.prototype=Object.create(yt.prototype),sn.prototype.constructor=sn,cn.prototype=Object.create(Ct.prototype),cn.prototype.constructor=cn,hn.prototype=Object.create(yt.prototype),hn.prototype.constructor=hn,ln.prototype=Object.create(Ct.prototype),ln.prototype.constructor=ln;var ls={area:function(t){for(var e=t.length,n=0,i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return.5*n},triangulate:function(){function t(t,e,n,i,r,a){var o,s,c,h,l,u,d,p,f;if(s=t[a[e]].x,c=t[a[e]].y,h=t[a[n]].x,l=t[a[n]].y,u=t[a[i]].x,d=t[a[i]].y,(h-s)*(d-c)-(l-c)*(u-s)<=0)return!1;var m,v,g,y,x,b,_,w,M,E,T,S,A,L,R;for(m=u-h,v=d-l,g=s-u,y=c-d,x=h-s,b=l-c,o=0;o<r;o++)if(p=t[a[o]].x,f=t[a[o]].y,!(p===s&&f===c||p===h&&f===l||p===u&&f===d)&&(_=p-s,w=f-c,M=p-h,E=f-l,T=p-u,S=f-d,R=m*E-v*M,A=x*w-b*_,L=g*S-y*T,R>=-Number.EPSILON&&L>=-Number.EPSILON&&A>=-Number.EPSILON))return!1;return!0}return function(e,n){var i=e.length;if(i<3)return null;var r,a,o,s=[],c=[],h=[];if(ls.area(e)>0)for(a=0;a<i;a++)c[a]=a;else for(a=0;a<i;a++)c[a]=i-1-a;var l=i,u=2*l;for(a=l-1;l>2;){if(u--<=0)return console.warn("THREE.ShapeUtils: Unable to triangulate polygon! in triangulate()"),n?h:s;if(r=a,l<=r&&(r=0),a=r+1,l<=a&&(a=0),o=a+1,l<=o&&(o=0),t(e,r,a,o,l,c)){var d,p,f,m,v;for(d=c[r],p=c[a],f=c[o],s.push([e[d],e[p],e[f]]),h.push([c[r],c[a],c[o]]),m=a,v=a+1;v<l;m++,v++)c[m]=c[v];l--,u=2*l}}return n?h:s}}(),triangulateShape:function(t,e){function n(t){var e=t.length;e>2&&t[e-1].equals(t[0])&&t.pop()}function i(t,e,n){return t.x!==e.x?t.x<e.x?t.x<=n.x&&n.x<=e.x:e.x<=n.x&&n.x<=t.x:t.y<e.y?t.y<=n.y&&n.y<=e.y:e.y<=n.y&&n.y<=t.y}function r(t,e,n,r,a){var o=e.x-t.x,s=e.y-t.y,c=r.x-n.x,h=r.y-n.y,l=t.x-n.x,u=t.y-n.y,d=s*c-o*h,p=s*l-o*u;if(Math.abs(d)>Number.EPSILON){var f;if(d>0){if(p<0||p>d)return[];if((f=h*l-c*u)<0||f>d)return[]}else{if(p>0||p<d)return[];if((f=h*l-c*u)>0||f<d)return[]}if(0===f)return!a||0!==p&&p!==d?[t]:[];if(f===d)return!a||0!==p&&p!==d?[e]:[];if(0===p)return[n];if(p===d)return[r];var m=f/d;return[{x:t.x+m*o,y:t.y+m*s}]}if(0!==p||h*l!=c*u)return[];var v=0===o&&0===s,g=0===c&&0===h;if(v&&g)return t.x!==n.x||t.y!==n.y?[]:[t];if(v)return i(n,r,t)?[t]:[];if(g)return i(t,e,n)?[n]:[];var y,x,b,_,w,M,E,T;return 0!==o?(t.x<e.x?(y=t,b=t.x,x=e,_=e.x):(y=e,b=e.x,x=t,_=t.x),n.x<r.x?(w=n,E=n.x,M=r,T=r.x):(w=r,E=r.x,M=n,T=n.x)):(t.y<e.y?(y=t,b=t.y,x=e,_=e.y):(y=e,b=e.y,x=t,_=t.y),n.y<r.y?(w=n,E=n.y,M=r,T=r.y):(w=r,E=r.y,M=n,T=n.y)),b<=E?_<E?[]:_===E?a?[]:[w]:_<=T?[w,x]:[w,M]:b>T?[]:b===T?a?[]:[y]:_<=T?[y,x]:[y,M]}function a(t,e,n,i){var r=e.x-t.x,a=e.y-t.y,o=n.x-t.x,s=n.y-t.y,c=i.x-t.x,h=i.y-t.y,l=r*s-a*o,u=r*h-a*c;if(Math.abs(l)>Number.EPSILON){var d=c*s-h*o;return l>0?u>=0&&d>=0:u>=0||d>=0}return u>0}n(t),e.forEach(n);for(var o,s,c,h,l,u,d={},p=t.concat(),f=0,m=e.length;f<m;f++)Array.prototype.push.apply(p,e[f]);for(o=0,s=p.length;o<s;o++)l=p[o].x+":"+p[o].y,void 0!==d[l]&&console.warn("THREE.ShapeUtils: Duplicate point",l,o),d[l]=o;var v=function(t,e){for(var n,i,o,s,c,h,l,u,d,p,f,m=t.concat(),v=[],g=[],y=0,x=e.length;y<x;y++)v.push(y);for(var b=0,_=2*v.length;v.length>0;){if(--_<0){console.log('THREE.ShapeUtils: Infinite Loop! Holes left:" + indepHoles.length + ", Probably Hole outside Shape!');break}for(o=b;o<m.length;o++){s=m[o],i=-1;for(var y=0;y<v.length;y++)if(h=v[y],l=s.x+":"+s.y+":"+h,void 0===g[l]){n=e[h];for(var w=0;w<n.length;w++)if(c=n[w],function(t,e){var i=m.length-1,r=t-1;r<0&&(r=i);var o=t+1;o>i&&(o=0);var s=a(m[t],m[r],m[o],n[e]);if(!s)return!1;var c=n.length-1,h=e-1;h<0&&(h=c);var l=e+1;return l>c&&(l=0),!!(s=a(n[e],n[h],n[l],m[t]))}(o,w)&&!function(t,e){var n,i,a;for(n=0;n<m.length;n++)if(i=n+1,i%=m.length,a=r(t,e,m[n],m[i],!0),a.length>0)return!0;return!1}(s,c)&&!function(t,n){var i,a,o,s,c;for(i=0;i<v.length;i++)for(a=e[v[i]],o=0;o<a.length;o++)if(s=o+1,s%=a.length,c=r(t,n,a[o],a[s],!0),c.length>0)return!0;return!1}(s,c)){i=w,v.splice(y,1),u=m.slice(0,o+1),d=m.slice(o),p=n.slice(i),f=n.slice(0,i+1),m=u.concat(p).concat(f).concat(d),b=o;break}if(i>=0)break;g[l]=!0}if(i>=0)break}}return m}(t,e),g=ls.triangulate(v,!1);for(o=0,s=g.length;o<s;o++)for(h=g[o],c=0;c<3;c++)l=h[c].x+":"+h[c].y,void 0!==(u=d[l])&&(h[c]=u);return g.concat()},isClockWise:function(t){return ls.area(t)<0}};un.prototype=Object.create(yt.prototype),un.prototype.constructor=un,dn.prototype=Object.create(Ct.prototype),dn.prototype.constructor=dn,dn.prototype.getArrays=function(){var t=this.getAttribute("position"),e=t?Array.prototype.slice.call(t.array):[],n=this.getAttribute("uv"),i=n?Array.prototype.slice.call(n.array):[],r=this.index;return{position:e,uv:i,index:r?Array.prototype.slice.call(r.array):[]}},dn.prototype.addShapeList=function(t,e){var n=t.length;e.arrays=this.getArrays();for(var i=0;i<n;i++){var r=t[i];this.addShape(r,e)}this.setIndex(e.arrays.index),this.addAttribute("position",new At(e.arrays.position,3)),this.addAttribute("uv",new At(e.arrays.uv,2))},dn.prototype.addShape=function(t,e){function n(t,e,n){return e||console.error("THREE.ExtrudeGeometry: vec does not exist"),e.clone().multiplyScalar(n).add(t)}function i(t,e,n){var i,a,o,s=t.x-e.x,c=t.y-e.y,h=n.x-t.x,l=n.y-t.y,u=s*s+c*c,d=s*l-c*h;if(Math.abs(d)>Number.EPSILON){var p=Math.sqrt(u),f=Math.sqrt(h*h+l*l),m=e.x-c/p,v=e.y+s/p,g=n.x-l/f,y=n.y+h/f,x=((g-m)*l-(y-v)*h)/(s*l-c*h);i=m+s*x-t.x,a=v+c*x-t.y;var b=i*i+a*a;if(b<=2)return new r(i,a);o=Math.sqrt(b/2)}else{var _=!1;s>Number.EPSILON?h>Number.EPSILON&&(_=!0):s<-Number.EPSILON?h<-Number.EPSILON&&(_=!0):Math.sign(c)===Math.sign(l)&&(_=!0),_?(i=-c,a=s,o=Math.sqrt(u)):(i=s,a=c,o=Math.sqrt(u/2))}return new r(i/o,a/o)}function a(t,e){var n,i;for(J=t.length;--J>=0;){n=J,i=J-1,i<0&&(i=t.length-1);var r=0,a=L+2*T;for(r=0;r<a;r++){var o=q*r,s=q*(r+1);c(e+n+o,e+i+o,e+i+s,e+n+s,t,r,a,n,i)}}}function o(t,e,n){_.push(t),_.push(e),_.push(n)}function s(t,e,n){h(t),h(e),h(n);var i=y.length/3,r=C.generateTopUV(U,y,i-3,i-2,i-1);u(r[0]),u(r[1]),u(r[2])}function c(t,e,n,i,r,a,o,s,c){h(t),h(e),h(i),h(e),h(n),h(i);var l=y.length/3,d=C.generateSideWallUV(U,y,l-6,l-3,l-2,l-1);u(d[0]),u(d[1]),u(d[3]),u(d[1]),u(d[2]),u(d[3])}function h(t){x.push(y.length/3),y.push(_[3*t+0]),y.push(_[3*t+1]),y.push(_[3*t+2])}function u(t){b.push(t.x),b.push(t.y)}var d,p,f,m,v,g=e.arrays?e.arrays:this.getArrays(),y=g.position,x=g.index,b=g.uv,_=[],w=void 0!==e.amount?e.amount:100,M=void 0!==e.bevelThickness?e.bevelThickness:6,E=void 0!==e.bevelSize?e.bevelSize:M-2,T=void 0!==e.bevelSegments?e.bevelSegments:3,S=void 0===e.bevelEnabled||e.bevelEnabled,A=void 0!==e.curveSegments?e.curveSegments:12,L=void 0!==e.steps?e.steps:1,R=e.extrudePath,P=!1,C=void 0!==e.UVGenerator?e.UVGenerator:un.WorldUVGenerator;R&&(d=R.getSpacedPoints(L),P=!0,S=!1,p=void 0!==e.frames?e.frames:R.computeFrenetFrames(L,!1),f=new l,m=new l,v=new l),S||(T=0,M=0,E=0);var N,I,O,U=this,D=t.extractPoints(A),F=D.shape,z=D.holes;if(!ls.isClockWise(F))for(F=F.reverse(),I=0,O=z.length;I<O;I++)N=z[I],ls.isClockWise(N)&&(z[I]=N.reverse());var B=ls.triangulateShape(F,z),k=F;for(I=0,O=z.length;I<O;I++)N=z[I],F=F.concat(N);for(var j,G,V,H,W,X,q=F.length,Y=B.length,Z=[],J=0,Q=k.length,K=Q-1,$=J+1;J<Q;J++,K++,$++)K===Q&&(K=0),$===Q&&($=0),Z[J]=i(k[J],k[K],k[$]);var tt,et=[],nt=Z.concat();for(I=0,O=z.length;I<O;I++){for(N=z[I],tt=[],J=0,Q=N.length,K=Q-1,$=J+1;J<Q;J++,K++,$++)K===Q&&(K=0),$===Q&&($=0),tt[J]=i(N[J],N[K],N[$]);et.push(tt),nt=nt.concat(tt)}for(j=0;j<T;j++){for(V=j/T,H=M*Math.cos(V*Math.PI/2),G=E*Math.sin(V*Math.PI/2),J=0,Q=k.length;J<Q;J++)W=n(k[J],Z[J],G),o(W.x,W.y,-H);for(I=0,O=z.length;I<O;I++)for(N=z[I],tt=et[I],J=0,Q=N.length;J<Q;J++)W=n(N[J],tt[J],G),o(W.x,W.y,-H)}for(G=E,J=0;J<q;J++)W=S?n(F[J],nt[J],G):F[J],P?(m.copy(p.normals[0]).multiplyScalar(W.x),f.copy(p.binormals[0]).multiplyScalar(W.y),v.copy(d[0]).add(m).add(f),o(v.x,v.y,v.z)):o(W.x,W.y,0);var it;for(it=1;it<=L;it++)for(J=0;J<q;J++)W=S?n(F[J],nt[J],G):F[J],P?(m.copy(p.normals[it]).multiplyScalar(W.x),f.copy(p.binormals[it]).multiplyScalar(W.y),v.copy(d[it]).add(m).add(f),o(v.x,v.y,v.z)):o(W.x,W.y,w/L*it);for(j=T-1;j>=0;j--){for(V=j/T,H=M*Math.cos(V*Math.PI/2),G=E*Math.sin(V*Math.PI/2),J=0,Q=k.length;J<Q;J++)W=n(k[J],Z[J],G),o(W.x,W.y,w+H);for(I=0,O=z.length;I<O;I++)for(N=z[I],tt=et[I],J=0,Q=N.length;J<Q;J++)W=n(N[J],tt[J],G),P?o(W.x,W.y+d[L-1].y,d[L-1].x+H):o(W.x,W.y,w+H)}!function(){var t=y.length/3;if(S){var n=0,i=q*n;for(J=0;J<Y;J++)X=B[J],s(X[2]+i,X[1]+i,X[0]+i);for(n=L+2*T,i=q*n,J=0;J<Y;J++)X=B[J],s(X[0]+i,X[1]+i,X[2]+i)}else{for(J=0;J<Y;J++)X=B[J],s(X[2],X[1],X[0]);for(J=0;J<Y;J++)X=B[J],s(X[0]+q*L,X[1]+q*L,X[2]+q*L)}U.addGroup(t,y.length/3-t,void 0!==e.material?e.material:0)}(),function(){var t=y.length/3,n=0;for(a(k,n),n+=k.length,I=0,O=z.length;I<O;I++)N=z[I],a(N,n),n+=N.length;U.addGroup(t,y.length/3-t,void 0!==e.extrudeMaterial?e.extrudeMaterial:1)}(),e.arrays||(this.setIndex(x),this.addAttribute("position",new At(y,3)),this.addAttribute("uv",new At(e.arrays.uv,2)))},un.WorldUVGenerator={generateTopUV:function(t,e,n,i,a){var o=e[3*n],s=e[3*n+1],c=e[3*i],h=e[3*i+1],l=e[3*a],u=e[3*a+1];return[new r(o,s),new r(c,h),new r(l,u)]},generateSideWallUV:function(t,e,n,i,a,o){var s=e[3*n],c=e[3*n+1],h=e[3*n+2],l=e[3*i],u=e[3*i+1],d=e[3*i+2],p=e[3*a],f=e[3*a+1],m=e[3*a+2],v=e[3*o],g=e[3*o+1],y=e[3*o+2];return Math.abs(c-u)<.01?[new r(s,1-h),new r(l,1-d),new r(p,1-m),new r(v,1-y)]:[new r(c,1-h),new r(u,1-d),new r(f,1-m),new r(g,1-y)]}},pn.prototype=Object.create(yt.prototype),pn.prototype.constructor=pn,fn.prototype=Object.create(dn.prototype),fn.prototype.constructor=fn,mn.prototype=Object.create(yt.prototype),mn.prototype.constructor=mn,vn.prototype=Object.create(Ct.prototype),vn.prototype.constructor=vn,gn.prototype=Object.create(yt.prototype),gn.prototype.constructor=gn,yn.prototype=Object.create(Ct.prototype),yn.prototype.constructor=yn,xn.prototype=Object.create(yt.prototype),xn.prototype.constructor=xn,bn.prototype=Object.create(Ct.prototype),bn.prototype.constructor=bn,_n.prototype=Object.create(yt.prototype),_n.prototype.constructor=_n,wn.prototype=Object.create(Ct.prototype),wn.prototype.constructor=wn,Mn.prototype=Object.create(Ct.prototype),Mn.prototype.constructor=Mn,En.prototype=Object.create(yt.prototype),En.prototype.constructor=En,Tn.prototype=Object.create(Ct.prototype),Tn.prototype.constructor=Tn,Sn.prototype=Object.create(En.prototype),Sn.prototype.constructor=Sn,An.prototype=Object.create(Tn.prototype),An.prototype.constructor=An,Ln.prototype=Object.create(yt.prototype),Ln.prototype.constructor=Ln,Rn.prototype=Object.create(Ct.prototype),Rn.prototype.constructor=Rn;var us=Object.freeze({WireframeGeometry:We,ParametricGeometry:Xe,ParametricBufferGeometry:qe,TetrahedronGeometry:Je,TetrahedronBufferGeometry:Qe,OctahedronGeometry:Ke,OctahedronBufferGeometry:$e,IcosahedronGeometry:tn,IcosahedronBufferGeometry:en,DodecahedronGeometry:nn,DodecahedronBufferGeometry:rn,PolyhedronGeometry:Ye,PolyhedronBufferGeometry:Ze,TubeGeometry:an,TubeBufferGeometry:on,TorusKnotGeometry:sn,TorusKnotBufferGeometry:cn,TorusGeometry:hn,TorusBufferGeometry:ln,TextGeometry:pn,TextBufferGeometry:fn,SphereGeometry:mn,SphereBufferGeometry:vn,RingGeometry:gn,RingBufferGeometry:yn,PlaneGeometry:Ot,PlaneBufferGeometry:Ut,LatheGeometry:xn,LatheBufferGeometry:bn,ShapeGeometry:_n,ShapeBufferGeometry:wn,ExtrudeGeometry:un,ExtrudeBufferGeometry:dn,EdgesGeometry:Mn,ConeGeometry:Sn,ConeBufferGeometry:An,CylinderGeometry:En,CylinderBufferGeometry:Tn,CircleGeometry:Ln,CircleBufferGeometry:Rn,BoxGeometry:Nt,BoxBufferGeometry:It});Pn.prototype=Object.create($.prototype),Pn.prototype.constructor=Pn,Pn.prototype.isShadowMaterial=!0,Cn.prototype=Object.create(tt.prototype),Cn.prototype.constructor=Cn,Cn.prototype.isRawShaderMaterial=!0,Nn.prototype=Object.create($.prototype),Nn.prototype.constructor=Nn,Nn.prototype.isMeshStandardMaterial=!0,Nn.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this},In.prototype=Object.create(Nn.prototype),In.prototype.constructor=In,In.prototype.isMeshPhysicalMaterial=!0,In.prototype.copy=function(t){return Nn.prototype.copy.call(this,t),this.defines={PHYSICAL:""},this.reflectivity=t.reflectivity,this.clearCoat=t.clearCoat,this.clearCoatRoughness=t.clearCoatRoughness,this},On.prototype=Object.create($.prototype),On.prototype.constructor=On,On.prototype.isMeshPhongMaterial=!0,On.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.color.copy(t.color),this.specular.copy(t.specular),this.shininess=t.shininess,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this},Un.prototype=Object.create(On.prototype),Un.prototype.constructor=Un,Un.prototype.isMeshToonMaterial=!0,Un.prototype.copy=function(t){return On.prototype.copy.call(this,t),this.gradientMap=t.gradientMap,this},Dn.prototype=Object.create($.prototype),Dn.prototype.constructor=Dn,Dn.prototype.isMeshNormalMaterial=!0,Dn.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this},Fn.prototype=Object.create($.prototype),Fn.prototype.constructor=Fn,Fn.prototype.isMeshLambertMaterial=!0,Fn.prototype.copy=function(t){return $.prototype.copy.call(this,t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.skinning=t.skinning,this.morphTargets=t.morphTargets,this.morphNormals=t.morphNormals,this},zn.prototype=Object.create(Ue.prototype),zn.prototype.constructor=zn,zn.prototype.isLineDashedMaterial=!0,zn.prototype.copy=function(t){return Ue.prototype.copy.call(this,t),this.scale=t.scale,this.dashSize=t.dashSize,this.gapSize=t.gapSize,this};var ds=Object.freeze({ShadowMaterial:Pn,SpriteMaterial:Re,RawShaderMaterial:Cn,ShaderMaterial:tt,PointsMaterial:Be,MeshPhysicalMaterial:In,MeshStandardMaterial:Nn,MeshPhongMaterial:On,MeshToonMaterial:Un,MeshNormalMaterial:Dn,MeshLambertMaterial:Fn,MeshDepthMaterial:et,MeshDistanceMaterial:nt,MeshBasicMaterial:Dt,LineDashedMaterial:zn,LineBasicMaterial:Ue,Material:$}),ps={enabled:!1,files:{},add:function(t,e){!1!==this.enabled&&(this.files[t]=e)},get:function(t){if(!1!==this.enabled)return this.files[t]},remove:function(t){delete this.files[t]},clear:function(){this.files={}}},fs=new Bn;Object.assign(kn.prototype,{load:function(t,e,n,i){void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t);var r=this,a=ps.get(t);if(void 0!==a)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;var o=/^data:(.*?)(;base64)?,(.*)$/,s=t.match(o);if(s){var c=s[1],h=!!s[2],l=s[3];l=window.decodeURIComponent(l),h&&(l=window.atob(l));try{var u,d=(this.responseType||"").toLowerCase();switch(d){case"arraybuffer":case"blob":u=new ArrayBuffer(l.length);for(var p=new Uint8Array(u),f=0;f<l.length;f++)p[f]=l.charCodeAt(f);"blob"===d&&(u=new Blob([u],{type:c}));break;case"document":var m=new DOMParser;u=m.parseFromString(l,c);break;case"json":u=JSON.parse(l);break;default:u=l}window.setTimeout(function(){e&&e(u),r.manager.itemEnd(t)},0)}catch(e){window.setTimeout(function(){i&&i(e),r.manager.itemEnd(t),r.manager.itemError(t)},0)}}else{var v=new XMLHttpRequest;v.open("GET",t,!0),v.addEventListener("load",function(n){var a=n.target.response;ps.add(t,a),200===this.status?(e&&e(a),r.manager.itemEnd(t)):0===this.status?(console.warn("THREE.FileLoader: HTTP Status 0 received."),e&&e(a),r.manager.itemEnd(t)):(i&&i(n),r.manager.itemEnd(t),r.manager.itemError(t))},!1),void 0!==n&&v.addEventListener("progress",function(t){n(t)},!1),v.addEventListener("error",function(e){i&&i(e),r.manager.itemEnd(t),r.manager.itemError(t)},!1),void 0!==this.responseType&&(v.responseType=this.responseType),void 0!==this.withCredentials&&(v.withCredentials=this.withCredentials),v.overrideMimeType&&v.overrideMimeType(void 0!==this.mimeType?this.mimeType:"text/plain");for(var g in this.requestHeader)v.setRequestHeader(g,this.requestHeader[g]);v.send(null)}return r.manager.itemStart(t),v},setPath:function(t){return this.path=t,this},setResponseType:function(t){return this.responseType=t,this},setWithCredentials:function(t){return this.withCredentials=t,this},setMimeType:function(t){return this.mimeType=t,this},setRequestHeader:function(t){return this.requestHeader=t,this}}),Object.assign(jn.prototype,{load:function(t,e,n,i){var r=this,a=[],o=new Ve;o.image=a;var s=new kn(this.manager);if(s.setPath(this.path),s.setResponseType("arraybuffer"),Array.isArray(t))for(var c=0,h=0,l=t.length;h<l;++h)!function(h){s.load(t[h],function(t){var n=r._parser(t,!0);a[h]={width:n.width,height:n.height,format:n.format,mipmaps:n.mipmaps},6===(c+=1)&&(1===n.mipmapCount&&(o.minFilter=to),o.format=n.format,o.needsUpdate=!0,e&&e(o))},n,i)}(h);else s.load(t,function(t){var n=r._parser(t,!0);if(n.isCubemap)for(var i=n.mipmaps.length/n.mipmapCount,s=0;s<i;s++){a[s]={mipmaps:[]};for(var c=0;c<n.mipmapCount;c++)a[s].mipmaps.push(n.mipmaps[s*n.mipmapCount+c]),a[s].format=n.format,a[s].width=n.width,a[s].height=n.height}else o.image.width=n.width,o.image.height=n.height,o.mipmaps=n.mipmaps;1===n.mipmapCount&&(o.minFilter=to),o.format=n.format,o.needsUpdate=!0,e&&e(o)},n,i);return o},setPath:function(t){return this.path=t,this}}),Object.assign(Gn.prototype,{load:function(t,e,n,i){var r=this,a=new d,o=new kn(this.manager);return o.setResponseType("arraybuffer"),o.load(t,function(t){var n=r._parser(t);n&&(void 0!==n.image?a.image=n.image:void 0!==n.data&&(a.image.width=n.width,a.image.height=n.height,a.image.data=n.data),a.wrapS=void 0!==n.wrapS?n.wrapS:Za,a.wrapT=void 0!==n.wrapT?n.wrapT:Za,a.magFilter=void 0!==n.magFilter?n.magFilter:to,a.minFilter=void 0!==n.minFilter?n.minFilter:no,a.anisotropy=void 0!==n.anisotropy?n.anisotropy:1,void 0!==n.format&&(a.format=n.format),void 0!==n.type&&(a.type=n.type),void 0!==n.mipmaps&&(a.mipmaps=n.mipmaps),1===n.mipmapCount&&(a.minFilter=to),a.needsUpdate=!0,e&&e(a,n))},n,i),a}}),Object.assign(Vn.prototype,{crossOrigin:"Anonymous",load:function(t,e,n,i){void 0===t&&(t=""),void 0!==this.path&&(t=this.path+t);var r=this,a=ps.get(t);if(void 0!==a)return r.manager.itemStart(t),setTimeout(function(){e&&e(a),r.manager.itemEnd(t)},0),a;var o=document.createElementNS("http://www.w3.org/1999/xhtml","img");return o.addEventListener("load",function(){ps.add(t,this),e&&e(this),r.manager.itemEnd(t)},!1),o.addEventListener("error",function(e){i&&i(e),r.manager.itemEnd(t),r.manager.itemError(t)},!1),"data:"!==t.substr(0,5)&&void 0!==this.crossOrigin&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(t),o.src=t,o},setCrossOrigin:function(t){return this.crossOrigin=t,this},setPath:function(t){return this.path=t,this}}),Object.assign(Hn.prototype,{crossOrigin:"Anonymous",load:function(t,e,n,i){var r=new p,a=new Vn(this.manager);a.setCrossOrigin(this.crossOrigin),a.setPath(this.path);for(var o=0,s=0;s<t.length;++s)!function(n){a.load(t[n],function(t){r.images[n]=t,6==++o&&(r.needsUpdate=!0,e&&e(r))},void 0,i)}(s);return r},setCrossOrigin:function(t){return this.crossOrigin=t,this},setPath:function(t){return this.path=t,this}}),Object.assign(Wn.prototype,{crossOrigin:"Anonymous",load:function(t,e,n,i){var r=new Vn(this.manager);r.setCrossOrigin(this.crossOrigin),r.setPath(this.path);var o=new a;return o.image=r.load(t,function(){var n=t.search(/\.(jpg|jpeg)$/)>0||0===t.search(/^data\:image\/jpeg/);o.format=n?go:yo,o.needsUpdate=!0,void 0!==e&&e(o)},n,i),o},setCrossOrigin:function(t){return this.crossOrigin=t,this},setPath:function(t){return this.path=t,this}}),Xn.prototype=Object.assign(Object.create(dt.prototype),{constructor:Xn,isLight:!0,copy:function(t){return dt.prototype.copy.call(this,t),this.color.copy(t.color),this.intensity=t.intensity,this},toJSON:function(t){var e=dt.prototype.toJSON.call(this,t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,void 0!==this.groundColor&&(e.object.groundColor=this.groundColor.getHex()),void 0!==this.distance&&(e.object.distance=this.distance),void 0!==this.angle&&(e.object.angle=this.angle),void 0!==this.decay&&(e.object.decay=this.decay),void 0!==this.penumbra&&(e.object.penumbra=this.penumbra),void 0!==this.shadow&&(e.object.shadow=this.shadow.toJSON()),e}}),qn.prototype=Object.assign(Object.create(Xn.prototype),{constructor:qn,isHemisphereLight:!0,copy:function(t){return Xn.prototype.copy.call(this,t),this.groundColor.copy(t.groundColor),this}}),Object.assign(Yn.prototype,{copy:function(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this},clone:function(){return(new this.constructor).copy(this)},toJSON:function(){var t={};return 0!==this.bias&&(t.bias=this.bias),1!==this.radius&&(t.radius=this.radius),512===this.mapSize.x&&512===this.mapSize.y||(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}),Zn.prototype=Object.assign(Object.create(Yn.prototype),{constructor:Zn,isSpotLightShadow:!0,update:function(t){var e=this.camera,n=2*Xo.RAD2DEG*t.angle,i=this.mapSize.width/this.mapSize.height,r=t.distance||e.far;n===e.fov&&i===e.aspect&&r===e.far||(e.fov=n,e.aspect=i,e.far=r,e.updateProjectionMatrix())}}),Jn.prototype=Object.assign(Object.create(Xn.prototype),{constructor:Jn,isSpotLight:!0,copy:function(t){return Xn.prototype.copy.call(this,t),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}),Qn.prototype=Object.assign(Object.create(Xn.prototype),{constructor:Qn,isPointLight:!0,copy:function(t){return Xn.prototype.copy.call(this,t),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}),Kn.prototype=Object.assign(Object.create(Yn.prototype),{constructor:Kn}),$n.prototype=Object.assign(Object.create(Xn.prototype),{constructor:$n,isDirectionalLight:!0,copy:function(t){return Xn.prototype.copy.call(this,t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}),ti.prototype=Object.assign(Object.create(Xn.prototype),{constructor:ti,isAmbientLight:!0}),ei.prototype=Object.assign(Object.create(Xn.prototype),{constructor:ei,isRectAreaLight:!0,copy:function(t){return Xn.prototype.copy.call(this,t),this.width=t.width,this.height=t.height,this},toJSON:function(t){var e=Xn.prototype.toJSON.call(this,t);return e.object.width=this.width,e.object.height=this.height,e}});var ms={arraySlice:function(t,e,n){return ms.isTypedArray(t)?new t.constructor(t.subarray(e,void 0!==n?n:t.length)):t.slice(e,n)},convertArray:function(t,e,n){return!t||!n&&t.constructor===e?t:"number"==typeof e.BYTES_PER_ELEMENT?new e(t):Array.prototype.slice.call(t)},isTypedArray:function(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)},getKeyframeOrder:function(t){function e(e,n){return t[e]-t[n]}for(var n=t.length,i=new Array(n),r=0;r!==n;++r)i[r]=r;return i.sort(e),i},sortedArray:function(t,e,n){for(var i=t.length,r=new t.constructor(i),a=0,o=0;o!==i;++a)for(var s=n[a]*e,c=0;c!==e;++c)r[o++]=t[s+c];return r},flattenJSON:function(t,e,n,i){for(var r=1,a=t[0];void 0!==a&&void 0===a[i];)a=t[r++];if(void 0!==a){var o=a[i];if(void 0!==o)if(Array.isArray(o))do{o=a[i],void 0!==o&&(e.push(a.time),n.push.apply(n,o)),a=t[r++]}while(void 0!==a);else if(void 0!==o.toArray)do{o=a[i],void 0!==o&&(e.push(a.time),o.toArray(n,n.length)),a=t[r++]}while(void 0!==a);else do{o=a[i],void 0!==o&&(e.push(a.time),n.push(o)),a=t[r++]}while(void 0!==a)}}};Object.assign(ni.prototype,{evaluate:function(t){var e=this.parameterPositions,n=this._cachedIndex,i=e[n],r=e[n-1];t:{e:{var a;n:{i:if(!(t<i)){for(var o=n+2;;){if(void 0===i){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.afterEnd_(n-1,t,r)}if(n===o)break;if(r=i,i=e[++n],t<i)break e}a=e.length;break n}{if(t>=r)break t;var s=e[1];t<s&&(n=2,r=s);for(var o=n-2;;){if(void 0===r)return this._cachedIndex=0,this.beforeStart_(0,t,i);if(n===o)break;if(i=r,r=e[--n-1],t>=r)break e}a=n,n=0}}for(;n<a;){var c=n+a>>>1;t<e[c]?a=c:n=c+1}if(i=e[n],void 0===(r=e[n-1]))return this._cachedIndex=0,this.beforeStart_(0,t,i);if(void 0===i)return n=e.length,this._cachedIndex=n,this.afterEnd_(n-1,r,t)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,t,i)},settings:null,DefaultSettings_:{},getSettings_:function(){return this.settings||this.DefaultSettings_},copySampleValue_:function(t){for(var e=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=t*i,a=0;a!==i;++a)e[a]=n[r+a];return e},interpolate_:function(t,e,n,i){throw new Error("call to abstract method")},intervalChanged_:function(t,e,n){}}),
//!\ DECLARE ALIAS AFTER assign prototype !
Object.assign(ni.prototype,{beforeStart_:ni.prototype.copySampleValue_,afterEnd_:ni.prototype.copySampleValue_}),ii.prototype=Object.assign(Object.create(ni.prototype),{constructor:ii,DefaultSettings_:{endingStart:Io,endingEnd:Io},intervalChanged_:function(t,e,n){var i=this.parameterPositions,r=t-2,a=t+1,o=i[r],s=i[a];if(void 0===o)switch(this.getSettings_().endingStart){case 2401:r=t,o=2*e-n;break;case 2402:r=i.length-2,o=e+i[r]-i[r+1];break;default:r=t,o=n}if(void 0===s)switch(this.getSettings_().endingEnd){case 2401:a=t,s=2*n-e;break;case 2402:a=1,s=n+i[1]-i[0];break;default:a=t-1,s=e}var c=.5*(n-e),h=this.valueSize;this._weightPrev=c/(e-o),this._weightNext=c/(s-n),this._offsetPrev=r*h,this._offsetNext=a*h},interpolate_:function(t,e,n,i){for(var r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=t*o,c=s-o,h=this._offsetPrev,l=this._offsetNext,u=this._weightPrev,d=this._weightNext,p=(n-e)/(i-e),f=p*p,m=f*p,v=-u*m+2*u*f-u*p,g=(1+u)*m+(-1.5-2*u)*f+(-.5+u)*p+1,y=(-1-d)*m+(1.5+d)*f+.5*p,x=d*m-d*f,b=0;b!==o;++b)r[b]=v*a[h+b]+g*a[c+b]+y*a[s+b]+x*a[l+b];return r}}),ri.prototype=Object.assign(Object.create(ni.prototype),{constructor:ri,interpolate_:function(t,e,n,i){for(var r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=t*o,c=s-o,h=(n-e)/(i-e),l=1-h,u=0;u!==o;++u)r[u]=a[c+u]*l+a[s+u]*h;return r}}),ai.prototype=Object.assign(Object.create(ni.prototype),{constructor:ai,interpolate_:function(t,e,n,i){return this.copySampleValue_(t-1)}});var vs;vs={TimeBufferType:Float32Array,ValueBufferType:Float32Array,DefaultInterpolation:2301,InterpolantFactoryMethodDiscrete:function(t){return new ai(this.times,this.values,this.getValueSize(),t)},InterpolantFactoryMethodLinear:function(t){return new ri(this.times,this.values,this.getValueSize(),t)},InterpolantFactoryMethodSmooth:function(t){return new ii(this.times,this.values,this.getValueSize(),t)},setInterpolation:function(t){var e;switch(t){case 2300:e=this.InterpolantFactoryMethodDiscrete;break;case 2301:e=this.InterpolantFactoryMethodLinear;break;case 2302:e=this.InterpolantFactoryMethodSmooth}if(void 0===e){var n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(void 0===this.createInterpolant){if(t===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return void console.warn("THREE.KeyframeTrackPrototype:",n)}this.createInterpolant=e},getInterpolation:function(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return 2300;case this.InterpolantFactoryMethodLinear:return 2301;case this.InterpolantFactoryMethodSmooth:return 2302}},getValueSize:function(){return this.values.length/this.times.length},shift:function(t){if(0!==t)for(var e=this.times,n=0,i=e.length;n!==i;++n)e[n]+=t;return this},scale:function(t){if(1!==t)for(var e=this.times,n=0,i=e.length;n!==i;++n)e[n]*=t;return this},trim:function(t,e){for(var n=this.times,i=n.length,r=0,a=i-1;r!==i&&n[r]<t;)++r;for(;-1!==a&&n[a]>e;)--a;if(++a,0!==r||a!==i){r>=a&&(a=Math.max(a,1),r=a-1);var o=this.getValueSize();this.times=ms.arraySlice(n,r,a),this.values=ms.arraySlice(this.values,r*o,a*o)}return this},validate:function(){var t=!0,e=this.getValueSize();e-Math.floor(e)!=0&&(console.error("THREE.KeyframeTrackPrototype: Invalid value size in track.",this),t=!1);var n=this.times,i=this.values,r=n.length;0===r&&(console.error("THREE.KeyframeTrackPrototype: Track is empty.",this),t=!1);for(var a=null,o=0;o!==r;o++){var s=n[o];if("number"==typeof s&&isNaN(s)){console.error("THREE.KeyframeTrackPrototype: Time is not a valid number.",this,o,s),t=!1;break}if(null!==a&&a>s){console.error("THREE.KeyframeTrackPrototype: Out of order keys.",this,o,s,a),t=!1;break}a=s}if(void 0!==i&&ms.isTypedArray(i))for(var o=0,c=i.length;o!==c;++o){var h=i[o];if(isNaN(h)){console.error("THREE.KeyframeTrackPrototype: Value is not a valid number.",this,o,h),t=!1;break}}return t},optimize:function(){for(var t=this.times,e=this.values,n=this.getValueSize(),i=2302===this.getInterpolation(),r=1,a=t.length-1,o=1;o<a;++o){var s=!1,c=t[o];if(c!==t[o+1]&&(1!==o||c!==c[0]))if(i)s=!0;else for(var h=o*n,l=h-n,u=h+n,d=0;d!==n;++d){var p=e[h+d];if(p!==e[l+d]||p!==e[u+d]){s=!0;break}}if(s){if(o!==r){t[r]=t[o];for(var f=o*n,m=r*n,d=0;d!==n;++d)e[m+d]=e[f+d]}++r}}if(a>0){t[r]=t[a];for(var f=a*n,m=r*n,d=0;d!==n;++d)e[m+d]=e[f+d];++r}return r!==t.length&&(this.times=ms.arraySlice(t,0,r),this.values=ms.arraySlice(e,0,r*n)),this}},si.prototype=Object.assign(Object.create(vs),{constructor:si,ValueTypeName:"vector"}),ci.prototype=Object.assign(Object.create(ni.prototype),{constructor:ci,interpolate_:function(t,e,n,i){for(var r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=t*o,c=(n-e)/(i-e),l=s+o;s!==l;s+=4)h.slerpFlat(r,0,a,s-o,a,s,c);return r}}),hi.prototype=Object.assign(Object.create(vs),{constructor:hi,ValueTypeName:"quaternion",DefaultInterpolation:2301,InterpolantFactoryMethodLinear:function(t){return new ci(this.times,this.values,this.getValueSize(),t)},InterpolantFactoryMethodSmooth:void 0}),li.prototype=Object.assign(Object.create(vs),{constructor:li,ValueTypeName:"number"}),ui.prototype=Object.assign(Object.create(vs),{constructor:ui,ValueTypeName:"string",ValueBufferType:Array,DefaultInterpolation:2300,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0}),di.prototype=Object.assign(Object.create(vs),{constructor:di,ValueTypeName:"bool",ValueBufferType:Array,DefaultInterpolation:2300,InterpolantFactoryMethodLinear:void 0,InterpolantFactoryMethodSmooth:void 0}),pi.prototype=Object.assign(Object.create(vs),{constructor:pi,ValueTypeName:"color"}),fi.prototype=vs,vs.constructor=fi,Object.assign(fi,{parse:function(t){if(void 0===t.type)throw new Error("track type undefined, can not parse");var e=fi._getTrackTypeForValueTypeName(t.type);if(void 0===t.times){var n=[],i=[];ms.flattenJSON(t.keys,n,i,"value"),t.times=n,t.values=i}return void 0!==e.parse?e.parse(t):new e(t.name,t.times,t.values,t.interpolation)},toJSON:function(t){var e,n=t.constructor;if(void 0!==n.toJSON)e=n.toJSON(t);else{e={name:t.name,times:ms.convertArray(t.times,Array),values:ms.convertArray(t.values,Array)};var i=t.getInterpolation();i!==t.DefaultInterpolation&&(e.interpolation=i)}return e.type=t.ValueTypeName,e},_getTrackTypeForValueTypeName:function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return li;case"vector":case"vector2":case"vector3":case"vector4":return si;case"color":return pi;case"quaternion":return hi;case"bool":case"boolean":return di;case"string":return ui}throw new Error("Unsupported typeName: "+t)}}),Object.assign(mi,{parse:function(t){for(var e=[],n=t.tracks,i=1/(t.fps||1),r=0,a=n.length;r!==a;++r)e.push(fi.parse(n[r]).scale(i));return new mi(t.name,t.duration,e)},toJSON:function(t){for(var e=[],n=t.tracks,i={name:t.name,duration:t.duration,tracks:e},r=0,a=n.length;r!==a;++r)e.push(fi.toJSON(n[r]));return i},CreateFromMorphTargetSequence:function(t,e,n,i){for(var r=e.length,a=[],o=0;o<r;o++){var s=[],c=[];s.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);var h=ms.getKeyframeOrder(s);s=ms.sortedArray(s,1,h),c=ms.sortedArray(c,1,h),i||0!==s[0]||(s.push(r),c.push(c[0])),a.push(new li(".morphTargetInfluences["+e[o].name+"]",s,c).scale(1/n))}return new mi(t,-1,a)},findByName:function(t,e){var n=t;if(!Array.isArray(t)){var i=t;n=i.geometry&&i.geometry.animations||i.animations}for(var r=0;r<n.length;r++)if(n[r].name===e)return n[r];return null},CreateClipsFromMorphTargetSequences:function(t,e,n){for(var i={},r=/^([\w-]*?)([\d]+)$/,a=0,o=t.length;a<o;a++){var s=t[a],c=s.name.match(r);if(c&&c.length>1){var h=c[1],l=i[h];l||(i[h]=l=[]),l.push(s)}}var u=[];for(var h in i)u.push(mi.CreateFromMorphTargetSequence(h,i[h],e,n));return u},parseAnimation:function(t,e){if(!t)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;for(var n=function(t,e,n,i,r){if(0!==n.length){var a=[],o=[];ms.flattenJSON(n,a,o,i),0!==a.length&&r.push(new t(e,a,o))}},i=[],r=t.name||"default",a=t.length||-1,o=t.fps||30,s=t.hierarchy||[],c=0;c<s.length;c++){var h=s[c].keys;if(h&&0!==h.length)if(h[0].morphTargets){for(var l={},u=0;u<h.length;u++)if(h[u].morphTargets)for(var d=0;d<h[u].morphTargets.length;d++)l[h[u].morphTargets[d]]=-1;for(var p in l){for(var f=[],m=[],d=0;d!==h[u].morphTargets.length;++d){var v=h[u];f.push(v.time),m.push(v.morphTarget===p?1:0)}i.push(new li(".morphTargetInfluence["+p+"]",f,m))}a=l.length*(o||1)}else{var g=".bones["+e[c].name+"]";n(si,g+".position",h,"pos",i),n(hi,g+".quaternion",h,"rot",i),n(si,g+".scale",h,"scl",i)}}return 0===i.length?null:new mi(r,a,i)}}),Object.assign(mi.prototype,{resetDuration:function(){for(var t=this.tracks,e=0,n=0,i=t.length;n!==i;++n){var r=this.tracks[n];e=Math.max(e,r.times[r.times.length-1])}this.duration=e},trim:function(){for(var t=0;t<this.tracks.length;t++)this.tracks[t].trim(0,this.duration);return this},optimize:function(){for(var t=0;t<this.tracks.length;t++)this.tracks[t].optimize();return this}}),Object.assign(vi.prototype,{load:function(t,e,n,i){var r=this;new kn(r.manager).load(t,function(t){e(r.parse(JSON.parse(t)))},n,i)},setTextures:function(t){this.textures=t},parse:function(t){function e(t){return void 0===n[t]&&console.warn("THREE.MaterialLoader: Undefined texture",t),n[t]}var n=this.textures,i=new ds[t.type];if(void 0!==t.uuid&&(i.uuid=t.uuid),void 0!==t.name&&(i.name=t.name),void 0!==t.color&&i.color.setHex(t.color),void 0!==t.roughness&&(i.roughness=t.roughness),void 0!==t.metalness&&(i.metalness=t.metalness),void 0!==t.emissive&&i.emissive.setHex(t.emissive),void 0!==t.specular&&i.specular.setHex(t.specular),void 0!==t.shininess&&(i.shininess=t.shininess),void 0!==t.clearCoat&&(i.clearCoat=t.clearCoat),void 0!==t.clearCoatRoughness&&(i.clearCoatRoughness=t.clearCoatRoughness),void 0!==t.uniforms&&(i.uniforms=t.uniforms),void 0!==t.vertexShader&&(i.vertexShader=t.vertexShader),void 0!==t.fragmentShader&&(i.fragmentShader=t.fragmentShader),void 0!==t.vertexColors&&(i.vertexColors=t.vertexColors),void 0!==t.fog&&(i.fog=t.fog),void 0!==t.flatShading&&(i.flatShading=t.flatShading),void 0!==t.blending&&(i.blending=t.blending),void 0!==t.side&&(i.side=t.side),void 0!==t.opacity&&(i.opacity=t.opacity),void 0!==t.transparent&&(i.transparent=t.transparent),void 0!==t.alphaTest&&(i.alphaTest=t.alphaTest),void 0!==t.depthTest&&(i.depthTest=t.depthTest),void 0!==t.depthWrite&&(i.depthWrite=t.depthWrite),void 0!==t.colorWrite&&(i.colorWrite=t.colorWrite),void 0!==t.wireframe&&(i.wireframe=t.wireframe),void 0!==t.wireframeLinewidth&&(i.wireframeLinewidth=t.wireframeLinewidth),void 0!==t.wireframeLinecap&&(i.wireframeLinecap=t.wireframeLinecap),void 0!==t.wireframeLinejoin&&(i.wireframeLinejoin=t.wireframeLinejoin),void 0!==t.skinning&&(i.skinning=t.skinning),void 0!==t.morphTargets&&(i.morphTargets=t.morphTargets),void 0!==t.dithering&&(i.dithering=t.dithering),void 0!==t.visible&&(i.visible=t.visible),void 0!==t.userData&&(i.userData=t.userData),void 0!==t.shading&&(i.flatShading=1===t.shading),void 0!==t.size&&(i.size=t.size),void 0!==t.sizeAttenuation&&(i.sizeAttenuation=t.sizeAttenuation),void 0!==t.map&&(i.map=e(t.map)),void 0!==t.alphaMap&&(i.alphaMap=e(t.alphaMap),i.transparent=!0),void 0!==t.bumpMap&&(i.bumpMap=e(t.bumpMap)),void 0!==t.bumpScale&&(i.bumpScale=t.bumpScale),void 0!==t.normalMap&&(i.normalMap=e(t.normalMap)),void 0!==t.normalScale){var a=t.normalScale;!1===Array.isArray(a)&&(a=[a,a]),i.normalScale=(new r).fromArray(a)}return void 0!==t.displacementMap&&(i.displacementMap=e(t.displacementMap)),void 0!==t.displacementScale&&(i.displacementScale=t.displacementScale),void 0!==t.displacementBias&&(i.displacementBias=t.displacementBias),void 0!==t.roughnessMap&&(i.roughnessMap=e(t.roughnessMap)),void 0!==t.metalnessMap&&(i.metalnessMap=e(t.metalnessMap)),void 0!==t.emissiveMap&&(i.emissiveMap=e(t.emissiveMap)),void 0!==t.emissiveIntensity&&(i.emissiveIntensity=t.emissiveIntensity),void 0!==t.specularMap&&(i.specularMap=e(t.specularMap)),void 0!==t.envMap&&(i.envMap=e(t.envMap)),void 0!==t.reflectivity&&(i.reflectivity=t.reflectivity),void 0!==t.lightMap&&(i.lightMap=e(t.lightMap)),void 0!==t.lightMapIntensity&&(i.lightMapIntensity=t.lightMapIntensity),void 0!==t.aoMap&&(i.aoMap=e(t.aoMap)),void 0!==t.aoMapIntensity&&(i.aoMapIntensity=t.aoMapIntensity),void 0!==t.gradientMap&&(i.gradientMap=e(t.gradientMap)),i}}),Object.assign(gi.prototype,{load:function(t,e,n,i){var r=this;new kn(r.manager).load(t,function(t){e(r.parse(JSON.parse(t)))},n,i)},parse:function(t){var e=new Ct,n=t.data.index;if(void 0!==n){var i=new gs[n.type](n.array);e.setIndex(new xt(i,1))}var r=t.data.attributes;for(var a in r){var o=r[a],i=new gs[o.type](o.array);e.addAttribute(a,new xt(i,o.itemSize,o.normalized))}var s=t.data.groups||t.data.drawcalls||t.data.offsets;if(void 0!==s)for(var c=0,h=s.length;c!==h;++c){var u=s[c];e.addGroup(u.start,u.count,u.materialIndex)}var d=t.data.boundingSphere;if(void 0!==d){var p=new l;void 0!==d.center&&p.fromArray(d.center),e.boundingSphere=new rt(p,d.radius)}return e}});var gs={Int8Array:Int8Array,Uint8Array:Uint8Array,Uint8ClampedArray:"undefined"!=typeof Uint8ClampedArray?Uint8ClampedArray:Uint8Array,Int16Array:Int16Array,Uint16Array:Uint16Array,Int32Array:Int32Array,Uint32Array:Uint32Array,Float32Array:Float32Array,Float64Array:Float64Array};yi.Handlers={handlers:[],add:function(t,e){this.handlers.push(t,e)},get:function(t){for(var e=this.handlers,n=0,i=e.length;n<i;n+=2){var r=e[n],a=e[n+1];if(r.test(t))return a}return null}},Object.assign(yi.prototype,{crossOrigin:void 0,extractUrlBase:function(t){var e=t.split("/");return 1===e.length?"./":(e.pop(),e.join("/")+"/")},initMaterials:function(t,e,n){for(var i=[],r=0;r<t.length;++r)i[r]=this.createMaterial(t[r],e,n);return i},createMaterial:function(){var t={NoBlending:ia,NormalBlending:ra,AdditiveBlending:aa,SubtractiveBlending:oa,MultiplyBlending:sa,CustomBlending:ca},e=new Y,n=new Wn,i=new vi;return function(r,a,o){function s(t,e,i,r,s){var h,l=a+t,u=yi.Handlers.get(l);null!==u?h=u.load(l):(n.setCrossOrigin(o),h=n.load(l)),void 0!==e&&(h.repeat.fromArray(e),1!==e[0]&&(h.wrapS=Ya),1!==e[1]&&(h.wrapT=Ya)),void 0!==i&&h.offset.fromArray(i),void 0!==r&&("repeat"===r[0]&&(h.wrapS=Ya),"mirror"===r[0]&&(h.wrapS=Ja),"repeat"===r[1]&&(h.wrapT=Ya),"mirror"===r[1]&&(h.wrapT=Ja)),void 0!==s&&(h.anisotropy=s);var d=Xo.generateUUID();return c[d]=h,d}var c={},h={uuid:Xo.generateUUID(),type:"MeshLambertMaterial"};for(var l in r){var u=r[l];switch(l){case"DbgColor":case"DbgIndex":case"opticalDensity":case"illumination":break;case"DbgName":h.name=u;break;case"blending":h.blending=t[u];break;case"colorAmbient":case"mapAmbient":console.warn("THREE.Loader.createMaterial:",l,"is no longer supported.");break;case"colorDiffuse":h.color=e.fromArray(u).getHex();break;case"colorSpecular":h.specular=e.fromArray(u).getHex();break;case"colorEmissive":h.emissive=e.fromArray(u).getHex();break;case"specularCoef":h.shininess=u;break;case"shading":"basic"===u.toLowerCase()&&(h.type="MeshBasicMaterial"),"phong"===u.toLowerCase()&&(h.type="MeshPhongMaterial"),"standard"===u.toLowerCase()&&(h.type="MeshStandardMaterial");break;case"mapDiffuse":h.map=s(u,r.mapDiffuseRepeat,r.mapDiffuseOffset,r.mapDiffuseWrap,r.mapDiffuseAnisotropy);break;case"mapDiffuseRepeat":case"mapDiffuseOffset":case"mapDiffuseWrap":case"mapDiffuseAnisotropy":break;case"mapEmissive":h.emissiveMap=s(u,r.mapEmissiveRepeat,r.mapEmissiveOffset,r.mapEmissiveWrap,r.mapEmissiveAnisotropy);break;case"mapEmissiveRepeat":case"mapEmissiveOffset":case"mapEmissiveWrap":case"mapEmissiveAnisotropy":break;case"mapLight":h.lightMap=s(u,r.mapLightRepeat,r.mapLightOffset,r.mapLightWrap,r.mapLightAnisotropy);break;case"mapLightRepeat":case"mapLightOffset":case"mapLightWrap":case"mapLightAnisotropy":break;case"mapAO":h.aoMap=s(u,r.mapAORepeat,r.mapAOOffset,r.mapAOWrap,r.mapAOAnisotropy);break;case"mapAORepeat":case"mapAOOffset":case"mapAOWrap":case"mapAOAnisotropy":break;case"mapBump":h.bumpMap=s(u,r.mapBumpRepeat,r.mapBumpOffset,r.mapBumpWrap,r.mapBumpAnisotropy);break;case"mapBumpScale":h.bumpScale=u;break;case"mapBumpRepeat":case"mapBumpOffset":case"mapBumpWrap":case"mapBumpAnisotropy":break;case"mapNormal":h.normalMap=s(u,r.mapNormalRepeat,r.mapNormalOffset,r.mapNormalWrap,r.mapNormalAnisotropy);break;case"mapNormalFactor":h.normalScale=[u,u];break;case"mapNormalRepeat":case"mapNormalOffset":case"mapNormalWrap":case"mapNormalAnisotropy":break;case"mapSpecular":h.specularMap=s(u,r.mapSpecularRepeat,r.mapSpecularOffset,r.mapSpecularWrap,r.mapSpecularAnisotropy);break;case"mapSpecularRepeat":case"mapSpecularOffset":case"mapSpecularWrap":case"mapSpecularAnisotropy":break;case"mapMetalness":h.metalnessMap=s(u,r.mapMetalnessRepeat,r.mapMetalnessOffset,r.mapMetalnessWrap,r.mapMetalnessAnisotropy);break;case"mapMetalnessRepeat":case"mapMetalnessOffset":case"mapMetalnessWrap":case"mapMetalnessAnisotropy":break;case"mapRoughness":h.roughnessMap=s(u,r.mapRoughnessRepeat,r.mapRoughnessOffset,r.mapRoughnessWrap,r.mapRoughnessAnisotropy);break;case"mapRoughnessRepeat":case"mapRoughnessOffset":case"mapRoughnessWrap":case"mapRoughnessAnisotropy":break;case"mapAlpha":h.alphaMap=s(u,r.mapAlphaRepeat,r.mapAlphaOffset,r.mapAlphaWrap,r.mapAlphaAnisotropy);break;case"mapAlphaRepeat":case"mapAlphaOffset":case"mapAlphaWrap":case"mapAlphaAnisotropy":break;case"flipSided":h.side=Jr;break;case"doubleSided":h.side=Qr;break;case"transparency":console.warn("THREE.Loader.createMaterial: transparency has been renamed to opacity"),h.opacity=u;break;case"depthTest":case"depthWrite":case"colorWrite":case"opacity":case"reflectivity":case"transparent":case"visible":case"wireframe":h[l]=u;break;case"vertexColors":!0===u&&(h.vertexColors=na),"face"===u&&(h.vertexColors=ea);break;default:console.error("THREE.Loader.createMaterial: Unsupported",l,u)}}return"MeshBasicMaterial"===h.type&&delete h.emissive,"MeshPhongMaterial"!==h.type&&delete h.specular,h.opacity<1&&(h.transparent=!0),i.setTextures(c),i.parse(h)}}()}),Object.assign(xi.prototype,{load:function(t,e,n,i){var r=this,a=this.texturePath&&"string"==typeof this.texturePath?this.texturePath:yi.prototype.extractUrlBase(t),o=new kn(this.manager);o.setWithCredentials(this.withCredentials),o.load(t,function(n){var i=JSON.parse(n),o=i.metadata;if(void 0!==o){var s=o.type;if(void 0!==s){if("object"===s.toLowerCase())return void console.error("THREE.JSONLoader: "+t+" should be loaded with THREE.ObjectLoader instead.");if("scene"===s.toLowerCase())return void console.error("THREE.JSONLoader: "+t+" should be loaded with THREE.SceneLoader instead.")}}var c=r.parse(i,a);e(c.geometry,c.materials)},n,i)},setTexturePath:function(t){this.texturePath=t},parse:function(){function t(t,e){function n(t,e){return t&1<<e}var i,a,o,s,c,h,u,d,p,f,m,v,g,y,x,b,_,w,M,E,T,S,A,L,R,P,C,N=t.faces,I=t.vertices,O=t.normals,U=t.colors,D=t.scale,F=0;if(void 0!==t.uvs){for(i=0;i<t.uvs.length;i++)t.uvs[i].length&&F++;for(i=0;i<F;i++)e.faceVertexUvs[i]=[]}for(s=0,c=I.length;s<c;)w=new l,w.x=I[s++]*D,w.y=I[s++]*D,w.z=I[s++]*D,e.vertices.push(w);for(s=0,c=N.length;s<c;)if(f=N[s++],m=n(f,0),v=n(f,1),g=n(f,3),y=n(f,4),x=n(f,5),b=n(f,6),_=n(f,7),m){if(E=new vt,E.a=N[s],E.b=N[s+1],E.c=N[s+3],T=new vt,T.a=N[s+1],T.b=N[s+2],T.c=N[s+3],s+=4,v&&(p=N[s++],E.materialIndex=p,T.materialIndex=p),o=e.faces.length,g)for(i=0;i<F;i++)for(L=t.uvs[i],e.faceVertexUvs[i][o]=[],e.faceVertexUvs[i][o+1]=[],a=0;a<4;a++)d=N[s++],P=L[2*d],C=L[2*d+1],R=new r(P,C),2!==a&&e.faceVertexUvs[i][o].push(R),0!==a&&e.faceVertexUvs[i][o+1].push(R);if(y&&(u=3*N[s++],E.normal.set(O[u++],O[u++],O[u]),T.normal.copy(E.normal)),x)for(i=0;i<4;i++)u=3*N[s++],A=new l(O[u++],O[u++],O[u]),2!==i&&E.vertexNormals.push(A),0!==i&&T.vertexNormals.push(A);if(b&&(h=N[s++],S=U[h],E.color.setHex(S),T.color.setHex(S)),_)for(i=0;i<4;i++)h=N[s++],S=U[h],2!==i&&E.vertexColors.push(new Y(S)),0!==i&&T.vertexColors.push(new Y(S));e.faces.push(E),e.faces.push(T)}else{if(M=new vt,M.a=N[s++],M.b=N[s++],M.c=N[s++],v&&(p=N[s++],M.materialIndex=p),o=e.faces.length,g)for(i=0;i<F;i++)for(L=t.uvs[i],e.faceVertexUvs[i][o]=[],a=0;a<3;a++)d=N[s++],P=L[2*d],C=L[2*d+1],R=new r(P,C),e.faceVertexUvs[i][o].push(R);if(y&&(u=3*N[s++],M.normal.set(O[u++],O[u++],O[u])),x)for(i=0;i<3;i++)u=3*N[s++],A=new l(O[u++],O[u++],O[u]),M.vertexNormals.push(A);if(b&&(h=N[s++],M.color.setHex(U[h])),_)for(i=0;i<3;i++)h=N[s++],M.vertexColors.push(new Y(U[h]));e.faces.push(M)}}function e(t,e){var n=void 0!==t.influencesPerVertex?t.influencesPerVertex:2;if(t.skinWeights)for(var i=0,r=t.skinWeights.length;i<r;i+=n){var a=t.skinWeights[i],s=n>1?t.skinWeights[i+1]:0,c=n>2?t.skinWeights[i+2]:0,h=n>3?t.skinWeights[i+3]:0;e.skinWeights.push(new o(a,s,c,h))}if(t.skinIndices)for(var i=0,r=t.skinIndices.length;i<r;i+=n){var l=t.skinIndices[i],u=n>1?t.skinIndices[i+1]:0,d=n>2?t.skinIndices[i+2]:0,p=n>3?t.skinIndices[i+3]:0;e.skinIndices.push(new o(l,u,d,p))}e.bones=t.bones,e.bones&&e.bones.length>0&&(e.skinWeights.length!==e.skinIndices.length||e.skinIndices.length!==e.vertices.length)&&console.warn("When skinning, number of vertices ("+e.vertices.length+"), skinIndices ("+e.skinIndices.length+"), and skinWeights ("+e.skinWeights.length+") should match.")}function n(t,e){var n=t.scale;if(void 0!==t.morphTargets)for(var i=0,r=t.morphTargets.length;i<r;i++){e.morphTargets[i]={},e.morphTargets[i].name=t.morphTargets[i].name,e.morphTargets[i].vertices=[];for(var a=e.morphTargets[i].vertices,o=t.morphTargets[i].vertices,s=0,c=o.length;s<c;s+=3){var h=new l;h.x=o[s]*n,h.y=o[s+1]*n,h.z=o[s+2]*n,a.push(h)}}if(void 0!==t.morphColors&&t.morphColors.length>0){console.warn('THREE.JSONLoader: "morphColors" no longer supported. Using them as face colors.');for(var u=e.faces,d=t.morphColors[0].colors,i=0,r=u.length;i<r;i++)u[i].color.fromArray(d,3*i)}}function i(t,e){var n=[],i=[];void 0!==t.animation&&i.push(t.animation),void 0!==t.animations&&(t.animations.length?i=i.concat(t.animations):i.push(t.animations));for(var r=0;r<i.length;r++){var a=mi.parseAnimation(i[r],e.bones);a&&n.push(a)}if(e.morphTargets){var o=mi.CreateClipsFromMorphTargetSequences(e.morphTargets,10);n=n.concat(o)}n.length>0&&(e.animations=n)}return function(r,a){void 0!==r.data&&(r=r.data),void 0!==r.scale?r.scale=1/r.scale:r.scale=1;var o=new yt;return t(r,o),e(r,o),n(r,o),i(r,o),o.computeFaceNormals(),o.computeBoundingSphere(),void 0===r.materials||0===r.materials.length?{geometry:o}:{geometry:o,materials:yi.prototype.initMaterials(r.materials,a,this.crossOrigin)}}}()}),Object.assign(bi.prototype,{load:function(t,e,n,i){""===this.texturePath&&(this.texturePath=t.substring(0,t.lastIndexOf("/")+1));var r=this;new kn(r.manager).load(t,function(n){var a=null;try{a=JSON.parse(n)}catch(e){return void 0!==i&&i(e),void console.error("THREE:ObjectLoader: Can't parse "+t+".",e.message)}var o=a.metadata;if(void 0===o||void 0===o.type||"geometry"===o.type.toLowerCase())return void console.error("THREE.ObjectLoader: Can't load "+t+". Use THREE.JSONLoader instead.");r.parse(a,e)},n,i)},setTexturePath:function(t){this.texturePath=t},setCrossOrigin:function(t){this.crossOrigin=t},parse:function(t,e){var n=this.parseGeometries(t.geometries),i=this.parseImages(t.images,function(){void 0!==e&&e(o)}),r=this.parseTextures(t.textures,i),a=this.parseMaterials(t.materials,r),o=this.parseObject(t.object,n,a);return t.animations&&(o.animations=this.parseAnimations(t.animations)),void 0!==t.images&&0!==t.images.length||void 0!==e&&e(o),o},parseGeometries:function(t){var e={};if(void 0!==t)for(var n=new xi,i=new gi,r=0,a=t.length;r<a;r++){var o,s=t[r];switch(s.type){case"PlaneGeometry":case"PlaneBufferGeometry":o=new us[s.type](s.width,s.height,s.widthSegments,s.heightSegments);break;case"BoxGeometry":case"BoxBufferGeometry":case"CubeGeometry":o=new us[s.type](s.width,s.height,s.depth,s.widthSegments,s.heightSegments,s.depthSegments);break;case"CircleGeometry":case"CircleBufferGeometry":o=new us[s.type](s.radius,s.segments,s.thetaStart,s.thetaLength);break;case"CylinderGeometry":case"CylinderBufferGeometry":o=new us[s.type](s.radiusTop,s.radiusBottom,s.height,s.radialSegments,s.heightSegments,s.openEnded,s.thetaStart,s.thetaLength);break;case"ConeGeometry":case"ConeBufferGeometry":o=new us[s.type](s.radius,s.height,s.radialSegments,s.heightSegments,s.openEnded,s.thetaStart,s.thetaLength);break;case"SphereGeometry":case"SphereBufferGeometry":o=new us[s.type](s.radius,s.widthSegments,s.heightSegments,s.phiStart,s.phiLength,s.thetaStart,s.thetaLength);break;case"DodecahedronGeometry":case"IcosahedronGeometry":case"OctahedronGeometry":case"TetrahedronGeometry":o=new us[s.type](s.radius,s.detail);break;case"RingGeometry":case"RingBufferGeometry":o=new us[s.type](s.innerRadius,s.outerRadius,s.thetaSegments,s.phiSegments,s.thetaStart,s.thetaLength);break;case"TorusGeometry":case"TorusBufferGeometry":o=new us[s.type](s.radius,s.tube,s.radialSegments,s.tubularSegments,s.arc);break;case"TorusKnotGeometry":case"TorusKnotBufferGeometry":o=new us[s.type](s.radius,s.tube,s.tubularSegments,s.radialSegments,s.p,s.q);break;case"LatheGeometry":case"LatheBufferGeometry":o=new us[s.type](s.points,s.segments,s.phiStart,s.phiLength);break;case"BufferGeometry":o=i.parse(s);break;case"Geometry":o=n.parse(s,this.texturePath).geometry;break;default:console.warn('THREE.ObjectLoader: Unsupported geometry type "'+s.type+'"');continue}o.uuid=s.uuid,void 0!==s.name&&(o.name=s.name),e[s.uuid]=o}return e},parseMaterials:function(t,e){var n={};if(void 0!==t){var i=new vi;i.setTextures(e);for(var r=0,a=t.length;r<a;r++){var o=t[r];if("MultiMaterial"===o.type){for(var s=[],c=0;c<o.materials.length;c++)s.push(i.parse(o.materials[c]));n[o.uuid]=s}else n[o.uuid]=i.parse(o)}}return n},parseAnimations:function(t){for(var e=[],n=0;n<t.length;n++){var i=mi.parse(t[n]);e.push(i)}return e},parseImages:function(t,e){var n=this,i={};if(void 0!==t&&t.length>0){var r=new Bn(e),a=new Vn(r);a.setCrossOrigin(this.crossOrigin);for(var o=0,s=t.length;o<s;o++){var c=t[o],h=/^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url)?c.url:n.texturePath+c.url;i[c.uuid]=function(t){return n.manager.itemStart(t),a.load(t,function(){n.manager.itemEnd(t)},void 0,function(){n.manager.itemEnd(t),n.manager.itemError(t)})}(h)}}return i},parseTextures:function(t,e){function n(t,e){return"number"==typeof t?t:(console.warn("THREE.ObjectLoader.parseTexture: Constant should be in numeric form.",t),e[t])}var i={};if(void 0!==t)for(var r=0,o=t.length;r<o;r++){var s=t[r];void 0===s.image&&console.warn('THREE.ObjectLoader: No "image" specified for',s.uuid),void 0===e[s.image]&&console.warn("THREE.ObjectLoader: Undefined image",s.image);var c=new a(e[s.image]);c.needsUpdate=!0,c.uuid=s.uuid,void 0!==s.name&&(c.name=s.name),void 0!==s.mapping&&(c.mapping=n(s.mapping,ys)),void 0!==s.offset&&c.offset.fromArray(s.offset),void 0!==s.repeat&&c.repeat.fromArray(s.repeat),void 0!==s.wrap&&(c.wrapS=n(s.wrap[0],xs),c.wrapT=n(s.wrap[1],xs)),void 0!==s.minFilter&&(c.minFilter=n(s.minFilter,bs)),void 0!==s.magFilter&&(c.magFilter=n(s.magFilter,bs)),void 0!==s.anisotropy&&(c.anisotropy=s.anisotropy),void 0!==s.flipY&&(c.flipY=s.flipY),i[s.uuid]=c}return i},parseObject:function(){var t=new u;return function(e,n,i){function r(t){return void 0===n[t]&&console.warn("THREE.ObjectLoader: Undefined geometry",t),n[t]}function a(t){if(void 0!==t){if(Array.isArray(t)){for(var e=[],n=0,r=t.length;n<r;n++){var a=t[n];void 0===i[a]&&console.warn("THREE.ObjectLoader: Undefined material",a),e.push(i[a])}return e}return void 0===i[t]&&console.warn("THREE.ObjectLoader: Undefined material",t),i[t]}}var o;switch(e.type){case"Scene":o=new Ae,void 0!==e.background&&Number.isInteger(e.background)&&(o.background=new Y(e.background)),void 0!==e.fog&&("Fog"===e.fog.type?o.fog=new Se(e.fog.color,e.fog.near,e.fog.far):"FogExp2"===e.fog.type&&(o.fog=new Te(e.fog.color,e.fog.density)));break;case"PerspectiveCamera":o=new mt(e.fov,e.aspect,e.near,e.far),void 0!==e.focus&&(o.focus=e.focus),void 0!==e.zoom&&(o.zoom=e.zoom),void 0!==e.filmGauge&&(o.filmGauge=e.filmGauge),void 0!==e.filmOffset&&(o.filmOffset=e.filmOffset),void 0!==e.view&&(o.view=Object.assign({},e.view));break;case"OrthographicCamera":o=new ft(e.left,e.right,e.top,e.bottom,e.near,e.far);break;case"AmbientLight":o=new ti(e.color,e.intensity);break;case"DirectionalLight":o=new $n(e.color,e.intensity);break;case"PointLight":o=new Qn(e.color,e.intensity,e.distance,e.decay);break;case"RectAreaLight":o=new ei(e.color,e.intensity,e.width,e.height);break;case"SpotLight":o=new Jn(e.color,e.intensity,e.distance,e.angle,e.penumbra,e.decay);break;case"HemisphereLight":o=new qn(e.color,e.groundColor,e.intensity);break;case"SkinnedMesh":console.warn("THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.");case"Mesh":var s=r(e.geometry),c=a(e.material);o=s.bones&&s.bones.length>0?new Oe(s,c):new kt(s,c);break;case"LOD":o=new Ce;break;case"Line":o=new De(r(e.geometry),a(e.material),e.mode);break;case"LineLoop":o=new ze(r(e.geometry),a(e.material));break;case"LineSegments":o=new Fe(r(e.geometry),a(e.material));break;case"PointCloud":case"Points":o=new ke(r(e.geometry),a(e.material));break;case"Sprite":o=new Pe(a(e.material));break;case"Group":o=new je;break;default:o=new dt}if(o.uuid=e.uuid,void 0!==e.name&&(o.name=e.name),void 0!==e.matrix?(t.fromArray(e.matrix),t.decompose(o.position,o.quaternion,o.scale)):(void 0!==e.position&&o.position.fromArray(e.position),void 0!==e.rotation&&o.rotation.fromArray(e.rotation),void 0!==e.quaternion&&o.quaternion.fromArray(e.quaternion),void 0!==e.scale&&o.scale.fromArray(e.scale)),void 0!==e.castShadow&&(o.castShadow=e.castShadow),void 0!==e.receiveShadow&&(o.receiveShadow=e.receiveShadow),e.shadow&&(void 0!==e.shadow.bias&&(o.shadow.bias=e.shadow.bias),void 0!==e.shadow.radius&&(o.shadow.radius=e.shadow.radius),void 0!==e.shadow.mapSize&&o.shadow.mapSize.fromArray(e.shadow.mapSize),void 0!==e.shadow.camera&&(o.shadow.camera=this.parseObject(e.shadow.camera))),void 0!==e.visible&&(o.visible=e.visible),void 0!==e.userData&&(o.userData=e.userData),void 0!==e.children)for(var h=e.children,l=0;l<h.length;l++)o.add(this.parseObject(h[l],n,i));if("LOD"===e.type)for(var u=e.levels,d=0;d<u.length;d++){var p=u[d],f=o.getObjectByProperty("uuid",p.object);void 0!==f&&o.addLevel(f,p.distance)}return o}}()});var ys={UVMapping:300,CubeReflectionMapping:ja,CubeRefractionMapping:Ga,EquirectangularReflectionMapping:Va,EquirectangularRefractionMapping:Ha,SphericalReflectionMapping:Wa,CubeUVReflectionMapping:Xa,CubeUVRefractionMapping:qa},xs={RepeatWrapping:Ya,ClampToEdgeWrapping:Za,MirroredRepeatWrapping:Ja},bs={NearestFilter:Qa,NearestMipMapNearestFilter:Ka,NearestMipMapLinearFilter:$a,LinearFilter:to,LinearMipMapNearestFilter:eo,LinearMipMapLinearFilter:no};Object.assign(Ci.prototype,{getPoint:function(){return console.warn("THREE.Curve: .getPoint() not implemented."),null},getPointAt:function(t){var e=this.getUtoTmapping(t);return this.getPoint(e)},getPoints:function(t){void 0===t&&(t=5);for(var e=[],n=0;n<=t;n++)e.push(this.getPoint(n/t));return e},getSpacedPoints:function(t){void 0===t&&(t=5);for(var e=[],n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e},getLength:function(){var t=this.getLengths();return t[t.length-1]},getLengths:function(t){if(void 0===t&&(t=this.arcLengthDivisions),this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;var e,n,i=[],r=this.getPoint(0),a=0;for(i.push(0),n=1;n<=t;n++)e=this.getPoint(n/t),a+=e.distanceTo(r),i.push(a),r=e;return this.cacheArcLengths=i,i},updateArcLengths:function(){this.needsUpdate=!0,this.getLengths()},getUtoTmapping:function(t,e){var n,i=this.getLengths(),r=0,a=i.length;n=e||t*i[a-1];for(var o,s=0,c=a-1;s<=c;)if(r=Math.floor(s+(c-s)/2),(o=i[r]-n)<0)s=r+1;else{if(!(o>0)){c=r;break}c=r-1}if(r=c,i[r]===n)return r/(a-1);var h=i[r];return(r+(n-h)/(i[r+1]-h))/(a-1)},getTangent:function(t){var e=t-1e-4,n=t+1e-4;e<0&&(e=0),n>1&&(n=1);var i=this.getPoint(e);return this.getPoint(n).clone().sub(i).normalize()},getTangentAt:function(t){var e=this.getUtoTmapping(t);return this.getTangent(e)},computeFrenetFrames:function(t,e){var n,i,r,a=new l,o=[],s=[],c=[],h=new l,d=new u;for(n=0;n<=t;n++)i=n/t,o[n]=this.getTangentAt(i),o[n].normalize();s[0]=new l,c[0]=new l;var p=Number.MAX_VALUE,f=Math.abs(o[0].x),m=Math.abs(o[0].y),v=Math.abs(o[0].z);for(f<=p&&(p=f,a.set(1,0,0)),m<=p&&(p=m,a.set(0,1,0)),v<=p&&a.set(0,0,1),h.crossVectors(o[0],a).normalize(),s[0].crossVectors(o[0],h),c[0].crossVectors(o[0],s[0]),n=1;n<=t;n++)s[n]=s[n-1].clone(),c[n]=c[n-1].clone(),h.crossVectors(o[n-1],o[n]),h.length()>Number.EPSILON&&(h.normalize(),r=Math.acos(Xo.clamp(o[n-1].dot(o[n]),-1,1)),s[n].applyMatrix4(d.makeRotationAxis(h,r))),c[n].crossVectors(o[n],s[n]);if(!0===e)for(r=Math.acos(Xo.clamp(s[0].dot(s[t]),-1,1)),r/=t,o[0].dot(h.crossVectors(s[0],s[t]))>0&&(r=-r),n=1;n<=t;n++)s[n].applyMatrix4(d.makeRotationAxis(o[n],r*n)),c[n].crossVectors(o[n],s[n]);return{tangents:o,normals:s,binormals:c}}}),Ni.prototype=Object.create(Ci.prototype),Ni.prototype.constructor=Ni,Ni.prototype.isLineCurve=!0,Ni.prototype.getPoint=function(t){if(1===t)return this.v2.clone();var e=this.v2.clone().sub(this.v1);return e.multiplyScalar(t).add(this.v1),e},Ni.prototype.getPointAt=function(t){return this.getPoint(t)},Ni.prototype.getTangent=function(t){return this.v2.clone().sub(this.v1).normalize()},Ii.prototype=Object.assign(Object.create(Ci.prototype),{constructor:Ii,add:function(t){this.curves.push(t)},closePath:function(){var t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);t.equals(e)||this.curves.push(new Ni(e,t))},getPoint:function(t){for(var e=t*this.getLength(),n=this.getCurveLengths(),i=0;i<n.length;){if(n[i]>=e){var r=n[i]-e,a=this.curves[i],o=a.getLength(),s=0===o?0:1-r/o;return a.getPointAt(s)}i++}return null},getLength:function(){var t=this.getCurveLengths();return t[t.length-1]},updateArcLengths:function(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()},getCurveLengths:function(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;for(var t=[],e=0,n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t},getSpacedPoints:function(t){void 0===t&&(t=40);for(var e=[],n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e},getPoints:function(t){t=t||12;for(var e,n=[],i=0,r=this.curves;i<r.length;i++)for(var a=r[i],o=a&&a.isEllipseCurve?2*t:a&&a.isLineCurve?1:a&&a.isSplineCurve?t*a.points.length:t,s=a.getPoints(o),c=0;c<s.length;c++){var h=s[c];e&&e.equals(h)||(n.push(h),e=h)}return this.autoClose&&n.length>1&&!n[n.length-1].equals(n[0])&&n.push(n[0]),n},createPointsGeometry:function(t){var e=this.getPoints(t);return this.createGeometry(e)},createSpacedPointsGeometry:function(t){var e=this.getSpacedPoints(t);return this.createGeometry(e)},createGeometry:function(t){for(var e=new yt,n=0,i=t.length;n<i;n++){var r=t[n];e.vertices.push(new l(r.x,r.y,r.z||0))}return e}}),Oi.prototype=Object.create(Ci.prototype),Oi.prototype.constructor=Oi,Oi.prototype.isEllipseCurve=!0,Oi.prototype.getPoint=function(t){for(var e=2*Math.PI,n=this.aEndAngle-this.aStartAngle,i=Math.abs(n)<Number.EPSILON;n<0;)n+=e;for(;n>e;)n-=e;n<Number.EPSILON&&(n=i?0:e),!0!==this.aClockwise||i||(n===e?n=-e:n-=e);var a=this.aStartAngle+t*n,o=this.aX+this.xRadius*Math.cos(a),s=this.aY+this.yRadius*Math.sin(a);if(0!==this.aRotation){var c=Math.cos(this.aRotation),h=Math.sin(this.aRotation),l=o-this.aX,u=s-this.aY;o=l*c-u*h+this.aX,s=l*h+u*c+this.aY}return new r(o,s)},Ui.prototype=Object.create(Ci.prototype),Ui.prototype.constructor=Ui,Ui.prototype.isSplineCurve=!0,Ui.prototype.getPoint=function(t){var e=this.points,n=(e.length-1)*t,i=Math.floor(n),a=n-i,o=e[0===i?i:i-1],s=e[i],c=e[i>e.length-2?e.length-1:i+1],h=e[i>e.length-3?e.length-1:i+2];return new r(_i(a,o.x,s.x,c.x,h.x),_i(a,o.y,s.y,c.y,h.y))},Di.prototype=Object.create(Ci.prototype),Di.prototype.constructor=Di,Di.prototype.getPoint=function(t){var e=this.v0,n=this.v1,i=this.v2,a=this.v3;return new r(Pi(t,e.x,n.x,i.x,a.x),Pi(t,e.y,n.y,i.y,a.y))},Fi.prototype=Object.create(Ci.prototype),Fi.prototype.constructor=Fi,Fi.prototype.getPoint=function(t){var e=this.v0,n=this.v1,i=this.v2;return new r(Ti(t,e.x,n.x,i.x),Ti(t,e.y,n.y,i.y))};var _s=Object.assign(Object.create(Ii.prototype),{fromPoints:function(t){this.moveTo(t[0].x,t[0].y);for(var e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y)},moveTo:function(t,e){this.currentPoint.set(t,e)},lineTo:function(t,e){var n=new Ni(this.currentPoint.clone(),new r(t,e));this.curves.push(n),this.currentPoint.set(t,e)},quadraticCurveTo:function(t,e,n,i){var a=new Fi(this.currentPoint.clone(),new r(t,e),new r(n,i));this.curves.push(a),this.currentPoint.set(n,i)},bezierCurveTo:function(t,e,n,i,a,o){var s=new Di(this.currentPoint.clone(),new r(t,e),new r(n,i),new r(a,o));this.curves.push(s),this.currentPoint.set(a,o)},splineThru:function(t){var e=[this.currentPoint.clone()].concat(t),n=new Ui(e);this.curves.push(n),this.currentPoint.copy(t[t.length-1])},arc:function(t,e,n,i,r,a){var o=this.currentPoint.x,s=this.currentPoint.y;this.absarc(t+o,e+s,n,i,r,a)},absarc:function(t,e,n,i,r,a){this.absellipse(t,e,n,n,i,r,a)},ellipse:function(t,e,n,i,r,a,o,s){var c=this.currentPoint.x,h=this.currentPoint.y;this.absellipse(t+c,e+h,n,i,r,a,o,s)},absellipse:function(t,e,n,i,r,a,o,s){var c=new Oi(t,e,n,i,r,a,o,s);if(this.curves.length>0){var h=c.getPoint(0);h.equals(this.currentPoint)||this.lineTo(h.x,h.y)}this.curves.push(c);var l=c.getPoint(1);this.currentPoint.copy(l)}});zi.prototype=_s,_s.constructor=zi,Bi.prototype=Object.assign(Object.create(_s),{constructor:Bi,getPointsHoles:function(t){for(var e=[],n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e},extractAllPoints:function(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}},extractPoints:function(t){return this.extractAllPoints(t)}}),Object.assign(ki.prototype,{moveTo:function(t,e){this.currentPath=new zi,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e)},lineTo:function(t,e){this.currentPath.lineTo(t,e)},quadraticCurveTo:function(t,e,n,i){this.currentPath.quadraticCurveTo(t,e,n,i)},bezierCurveTo:function(t,e,n,i,r,a){this.currentPath.bezierCurveTo(t,e,n,i,r,a)},splineThru:function(t){this.currentPath.splineThru(t)},toShapes:function(t,e){function n(t){for(var e=[],n=0,i=t.length;n<i;n++){var r=t[n],a=new Bi;a.curves=r.curves,e.push(a)}return e}var i=ls.isClockWise,r=this.subPaths;if(0===r.length)return[];if(!0===e)return n(r);var a,o,s,c=[];if(1===r.length)return o=r[0],s=new Bi,s.curves=o.curves,c.push(s),c;var h=!i(r[0].getPoints());h=t?!h:h;var l,u=[],d=[],p=[],f=0;d[f]=void 0,p[f]=[];for(var m=0,v=r.length;m<v;m++)o=r[m],l=o.getPoints(),a=i(l),a=t?!a:a,a?(!h&&d[f]&&f++,d[f]={s:new Bi,p:l},d[f].s.curves=o.curves,h&&f++,p[f]=[]):p[f].push({h:o,p:l[0]});if(!d[0])return n(r);if(d.length>1){for(var g=!1,y=[],x=0,b=d.length;x<b;x++)u[x]=[];for(var x=0,b=d.length;x<b;x++)for(var _=p[x],w=0;w<_.length;w++){for(var M=_[w],E=!0,T=0;T<d.length;T++)(function(t,e){for(var n=e.length,i=!1,r=n-1,a=0;a<n;r=a++){var o=e[r],s=e[a],c=s.x-o.x,h=s.y-o.y;if(Math.abs(h)>Number.EPSILON){if(h<0&&(o=e[a],c=-c,s=e[r],h=-h),t.y<o.y||t.y>s.y)continue;if(t.y===o.y){if(t.x===o.x)return!0}else{var l=h*(t.x-o.x)-c*(t.y-o.y);if(0===l)return!0;if(l<0)continue;i=!i}}else{if(t.y!==o.y)continue;if(s.x<=t.x&&t.x<=o.x||o.x<=t.x&&t.x<=s.x)return!0}}return i})(M.p,d[T].p)&&(x!==T&&y.push({froms:x,tos:T,hole:w}),E?(E=!1,u[T].push(M)):g=!0);E&&u[x].push(M)}y.length>0&&(g||(p=u))}for(var S,m=0,A=d.length;m<A;m++){s=d[m].s,c.push(s),S=p[m];for(var L=0,R=S.length;L<R;L++)s.holes.push(S[L].h)}return c}}),Object.assign(ji.prototype,{isFont:!0,generateShapes:function(t,e,n){function i(t,e,i,a){var o=r.glyphs[t]||r.glyphs["?"];if(o){var s,c,h,l,u,d,p,f,m,v,g,y=new ki,x=[];if(o.o)for(var b=o._cachedOutline||(o._cachedOutline=o.o.split(" ")),_=0,w=b.length;_<w;){var M=b[_++];switch(M){case"m":s=b[_++]*e+i,c=b[_++]*e+a,y.moveTo(s,c);break;case"l":s=b[_++]*e+i,c=b[_++]*e+a,y.lineTo(s,c);break;case"q":if(h=b[_++]*e+i,l=b[_++]*e+a,p=b[_++]*e+i,f=b[_++]*e+a,y.quadraticCurveTo(p,f,h,l),g=x[x.length-1]){u=g.x,d=g.y;for(var E=1;E<=n;E++){var T=E/n;Ti(T,u,p,h),Ti(T,d,f,l)}}break;case"b":if(h=b[_++]*e+i,l=b[_++]*e+a,p=b[_++]*e+i,f=b[_++]*e+a,m=b[_++]*e+i,v=b[_++]*e+a,y.bezierCurveTo(p,f,m,v,h,l),g=x[x.length-1]){u=g.x,d=g.y;for(var E=1;E<=n;E++){var T=E/n;Pi(T,u,p,m,h),Pi(T,d,f,v,l)}}}}return{offsetX:o.ha*e,path:y}}}void 0===e&&(e=100),void 0===n&&(n=4);for(var r=this.data,a=function(t){for(var n=String(t).split(""),a=e/r.resolution,o=(r.boundingBox.yMax-r.boundingBox.yMin+r.underlineThickness)*a,s=0,c=0,h=[],l=0;l<n.length;l++){var u=n[l];if("\n"===u)s=0,c-=o;else{var d=i(u,a,s,c);s+=d.offsetX,h.push(d.path)}}return h}(t),o=[],s=0,c=a.length;s<c;s++)Array.prototype.push.apply(o,a[s].toShapes());return o}}),Object.assign(Gi.prototype,{load:function(t,e,n,i){var r=this;new kn(this.manager).load(t,function(t){var n;try{n=JSON.parse(t)}catch(e){console.warn("THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead."),n=JSON.parse(t.substring(65,t.length-2))}var i=r.parse(n);e&&e(i)},n,i)},parse:function(t){return new ji(t)}});var ws,Ms={getContext:function(){return void 0===ws&&(ws=new(window.AudioContext||window.webkitAudioContext)),ws},setContext:function(t){ws=t}};Object.assign(Vi.prototype,{load:function(t,e,n,i){var r=new kn(this.manager);r.setResponseType("arraybuffer"),r.load(t,function(t){Ms.getContext().decodeAudioData(t,function(t){e(t)})},n,i)}}),Object.assign(Hi.prototype,{update:function(){var t,e,n,i,r,a,o,s,c=new u,h=new u;return function(l){if(t!==this||e!==l.focus||n!==l.fov||i!==l.aspect*this.aspect||r!==l.near||a!==l.far||o!==l.zoom||s!==this.eyeSep){t=this,e=l.focus,n=l.fov,i=l.aspect*this.aspect,r=l.near,a=l.far,o=l.zoom;var u=l.projectionMatrix.clone();s=this.eyeSep/2;var d,p,f=s*r/e,m=r*Math.tan(Xo.DEG2RAD*n*.5)/o;h.elements[12]=-s,c.elements[12]=s,d=-m*i+f,p=m*i+f,u.elements[0]=2*r/(p-d),u.elements[8]=(p+d)/(p-d),this.cameraL.projectionMatrix.copy(u),d=-m*i-f,p=m*i-f,u.elements[0]=2*r/(p-d),u.elements[8]=(p+d)/(p-d),this.cameraR.projectionMatrix.copy(u)}this.cameraL.matrixWorld.copy(l.matrixWorld).multiply(h),this.cameraR.matrixWorld.copy(l.matrixWorld).multiply(c)}}()}),Wi.prototype=Object.create(dt.prototype),Wi.prototype.constructor=Wi,Xi.prototype=Object.assign(Object.create(dt.prototype),{constructor:Xi,getInput:function(){return this.gain},removeFilter:function(){null!==this.filter&&(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination),this.gain.connect(this.context.destination),this.filter=null)},getFilter:function(){return this.filter},setFilter:function(t){null!==this.filter?(this.gain.disconnect(this.filter),this.filter.disconnect(this.context.destination)):this.gain.disconnect(this.context.destination),this.filter=t,this.gain.connect(this.filter),this.filter.connect(this.context.destination)},getMasterVolume:function(){return this.gain.gain.value},setMasterVolume:function(t){this.gain.gain.value=t},updateMatrixWorld:function(){var t=new l,e=new h,n=new l,i=new l;return function(r){dt.prototype.updateMatrixWorld.call(this,r);var a=this.context.listener,o=this.up;this.matrixWorld.decompose(t,e,n),i.set(0,0,-1).applyQuaternion(e),a.positionX?(a.positionX.setValueAtTime(t.x,this.context.currentTime),a.positionY.setValueAtTime(t.y,this.context.currentTime),a.positionZ.setValueAtTime(t.z,this.context.currentTime),a.forwardX.setValueAtTime(i.x,this.context.currentTime),a.forwardY.setValueAtTime(i.y,this.context.currentTime),a.forwardZ.setValueAtTime(i.z,this.context.currentTime),a.upX.setValueAtTime(o.x,this.context.currentTime),a.upY.setValueAtTime(o.y,this.context.currentTime),a.upZ.setValueAtTime(o.z,this.context.currentTime)):(a.setPosition(t.x,t.y,t.z),a.setOrientation(i.x,i.y,i.z,o.x,o.y,o.z))}}()}),qi.prototype=Object.assign(Object.create(dt.prototype),{constructor:qi,getOutput:function(){return this.gain},setNodeSource:function(t){return this.hasPlaybackControl=!1,this.sourceType="audioNode",this.source=t,this.connect(),this},setBuffer:function(t){return this.buffer=t,this.sourceType="buffer",this.autoplay&&this.play(),this},play:function(){if(!0===this.isPlaying)return void console.warn("THREE.Audio: Audio is already playing.");if(!1===this.hasPlaybackControl)return void console.warn("THREE.Audio: this Audio has no playback control.");var t=this.context.createBufferSource();return t.buffer=this.buffer,t.loop=this.loop,t.onended=this.onEnded.bind(this),t.playbackRate.setValueAtTime(this.playbackRate,this.startTime),t.start(0,this.startTime),this.isPlaying=!0,this.source=t,this.connect()},pause:function(){return!1===this.hasPlaybackControl?void console.warn("THREE.Audio: this Audio has no playback control."):(this.source.stop(),this.startTime=this.context.currentTime,this.isPlaying=!1,this)},stop:function(){return!1===this.hasPlaybackControl?void console.warn("THREE.Audio: this Audio has no playback control."):(this.source.stop(),this.startTime=0,this.isPlaying=!1,this)},connect:function(){if(this.filters.length>0){this.source.connect(this.filters[0]);for(var t=1,e=this.filters.length;t<e;t++)this.filters[t-1].connect(this.filters[t]);this.filters[this.filters.length-1].connect(this.getOutput())}else this.source.connect(this.getOutput());return this},disconnect:function(){if(this.filters.length>0){this.source.disconnect(this.filters[0]);for(var t=1,e=this.filters.length;t<e;t++)this.filters[t-1].disconnect(this.filters[t]);this.filters[this.filters.length-1].disconnect(this.getOutput())}else this.source.disconnect(this.getOutput());return this},getFilters:function(){return this.filters},setFilters:function(t){return t||(t=[]),!0===this.isPlaying?(this.disconnect(),this.filters=t,this.connect()):this.filters=t,this},getFilter:function(){return this.getFilters()[0]},setFilter:function(t){return this.setFilters(t?[t]:[])},setPlaybackRate:function(t){return!1===this.hasPlaybackControl?void console.warn("THREE.Audio: this Audio has no playback control."):(this.playbackRate=t,!0===this.isPlaying&&this.source.playbackRate.setValueAtTime(this.playbackRate,this.context.currentTime),this)},getPlaybackRate:function(){return this.playbackRate},onEnded:function(){this.isPlaying=!1},getLoop:function(){return!1===this.hasPlaybackControl?(console.warn("THREE.Audio: this Audio has no playback control."),!1):this.loop},setLoop:function(t){return!1===this.hasPlaybackControl?void console.warn("THREE.Audio: this Audio has no playback control."):(this.loop=t,!0===this.isPlaying&&(this.source.loop=this.loop),this)},getVolume:function(){return this.gain.gain.value},setVolume:function(t){return this.gain.gain.value=t,this}}),Yi.prototype=Object.assign(Object.create(qi.prototype),{constructor:Yi,getOutput:function(){return this.panner},getRefDistance:function(){return this.panner.refDistance},setRefDistance:function(t){this.panner.refDistance=t},getRolloffFactor:function(){return this.panner.rolloffFactor},setRolloffFactor:function(t){this.panner.rolloffFactor=t},getDistanceModel:function(){return this.panner.distanceModel},setDistanceModel:function(t){this.panner.distanceModel=t},getMaxDistance:function(){return this.panner.maxDistance},setMaxDistance:function(t){this.panner.maxDistance=t},updateMatrixWorld:function(){var t=new l;return function(e){dt.prototype.updateMatrixWorld.call(this,e),t.setFromMatrixPosition(this.matrixWorld),this.panner.setPosition(t.x,t.y,t.z)}}()}),Object.assign(Zi.prototype,{getFrequencyData:function(){return this.analyser.getByteFrequencyData(this.data),this.data},getAverageFrequency:function(){for(var t=0,e=this.getFrequencyData(),n=0;n<e.length;n++)t+=e[n];return t/e.length}}),Object.assign(Ji.prototype,{accumulate:function(t,e){var n=this.buffer,i=this.valueSize,r=t*i+i,a=this.cumulativeWeight;if(0===a){for(var o=0;o!==i;++o)n[r+o]=n[o];a=e}else{a+=e;var s=e/a;this._mixBufferRegion(n,r,0,s,i)}this.cumulativeWeight=a},apply:function(t){var e=this.valueSize,n=this.buffer,i=t*e+e,r=this.cumulativeWeight,a=this.binding;if(this.cumulativeWeight=0,r<1){var o=3*e;this._mixBufferRegion(n,i,o,1-r,e)}for(var s=e,c=e+e;s!==c;++s)if(n[s]!==n[s+e]){a.setValue(n,i);break}},saveOriginalState:function(){var t=this.binding,e=this.buffer,n=this.valueSize,i=3*n;t.getValue(e,i);for(var r=n,a=i;r!==a;++r)e[r]=e[i+r%n];this.cumulativeWeight=0},restoreOriginalState:function(){var t=3*this.valueSize;this.binding.setValue(this.buffer,t)},_select:function(t,e,n,i,r){if(i>=.5)for(var a=0;a!==r;++a)t[e+a]=t[n+a]},_slerp:function(t,e,n,i){h.slerpFlat(t,e,t,e,t,n,i)},_lerp:function(t,e,n,i,r){for(var a=1-i,o=0;o!==r;++o){var s=e+o;t[s]=t[s]*a+t[n+o]*i}}}),Object.assign(Qi.prototype,{getValue:function(t,e){this.bind();var n=this._targetGroup.nCachedObjects_,i=this._bindings[n];void 0!==i&&i.getValue(t,e)},setValue:function(t,e){for(var n=this._bindings,i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(t,e)},bind:function(){for(var t=this._bindings,e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()},unbind:function(){for(var t=this._bindings,e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}}),Object.assign(Ki,{Composite:Qi,create:function(t,e,n){return t&&t.isAnimationObjectGroup?new Ki.Composite(t,e,n):new Ki(t,e,n)},sanitizeNodeName:function(t){return t.replace(/\s/g,"_").replace(/[^\w-]/g,"")},parseTrackName:function(){var t=/((?:[\w-]+[\/:])*)/,e=/([\w-\.]+)?/,n=/(?:\.([\w-]+)(?:\[(.+)\])?)?/,i=/\.([\w-]+)(?:\[(.+)\])?/,r=new RegExp("^"+t.source+e.source+n.source+i.source+"$"),a=["material","materials","bones"];return function(t){var e=r.exec(t);if(!e)throw new Error("PropertyBinding: Cannot parse trackName: "+t);var n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(void 0!==i&&-1!==i){var o=n.nodeName.substring(i+1);-1!==a.indexOf(o)&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=o)}if(null===n.propertyName||0===n.propertyName.length)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}}(),findNode:function(t,e){if(!e||""===e||"root"===e||"."===e||-1===e||e===t.name||e===t.uuid)return t;if(t.skeleton){var n=function(t){for(var n=0;n<t.bones.length;n++){var i=t.bones[n];if(i.name===e)return i}return null}(t.skeleton);if(n)return n}if(t.children){var i=function(t){for(var n=0;n<t.length;n++){var r=t[n];if(r.name===e||r.uuid===e)return r;var a=i(r.children);if(a)return a}return null},r=i(t.children);if(r)return r}return null}}),Object.assign(Ki.prototype,{_getValue_unavailable:function(){},_setValue_unavailable:function(){},BindingType:{Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Versioning:{None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},GetterByBindingType:[function(t,e){t[e]=this.node[this.propertyName]},function(t,e){for(var n=this.resolvedProperty,i=0,r=n.length;i!==r;++i)t[e++]=n[i]},function(t,e){t[e]=this.resolvedProperty[this.propertyIndex]},function(t,e){this.resolvedProperty.toArray(t,e)}],SetterByBindingTypeAndVersioning:[[function(t,e){this.node[this.propertyName]=t[e]},function(t,e){this.node[this.propertyName]=t[e],this.targetObject.needsUpdate=!0},function(t,e){this.node[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,e){for(var n=this.resolvedProperty,i=0,r=n.length;i!==r;++i)n[i]=t[e++]},function(t,e){for(var n=this.resolvedProperty,i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.needsUpdate=!0},function(t,e){for(var n=this.resolvedProperty,i=0,r=n.length;i!==r;++i)n[i]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,e){this.resolvedProperty[this.propertyIndex]=t[e]},function(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0},function(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}],[function(t,e){this.resolvedProperty.fromArray(t,e)},function(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0},function(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}]],getValue:function(t,e){this.bind(),this.getValue(t,e)},setValue:function(t,e){this.bind(),this.setValue(t,e)},bind:function(){var t=this.node,e=this.parsedPath,n=e.objectName,i=e.propertyName,r=e.propertyIndex;if(t||(t=Ki.findNode(this.rootNode,e.nodeName)||this.rootNode,this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t)return void console.error("THREE.PropertyBinding: Trying to update node for track: "+this.path+" but it wasn't found.");if(n){var a=e.objectIndex;switch(n){case"materials":if(!t.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!t.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);t=t.material.materials;break;case"bones":if(!t.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);t=t.skeleton.bones;for(var o=0;o<t.length;o++)if(t[o].name===a){a=o;break}break;default:if(void 0===t[n])return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);t=t[n]}if(void 0!==a){if(void 0===t[a])return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);t=t[a]}}var s=t[i];if(void 0===s){var c=e.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",t)}var h=this.Versioning.None;void 0!==t.needsUpdate?(h=this.Versioning.NeedsUpdate,this.targetObject=t):void 0!==t.matrixWorldNeedsUpdate&&(h=this.Versioning.MatrixWorldNeedsUpdate,this.targetObject=t);var l=this.BindingType.Direct;if(void 0!==r){if("morphTargetInfluences"===i){if(!t.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(t.geometry.isBufferGeometry){if(!t.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);for(var o=0;o<this.node.geometry.morphAttributes.position.length;o++)if(t.geometry.morphAttributes.position[o].name===r){r=o;break}}else{if(!t.geometry.morphTargets)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.",this);for(var o=0;o<this.node.geometry.morphTargets.length;o++)if(t.geometry.morphTargets[o].name===r){r=o;break}}}l=this.BindingType.ArrayElement,this.resolvedProperty=s,this.propertyIndex=r}else void 0!==s.fromArray&&void 0!==s.toArray?(l=this.BindingType.HasFromToArray,this.resolvedProperty=s):Array.isArray(s)?(l=this.BindingType.EntireArray,this.resolvedProperty=s):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][h]},unbind:function(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}),
//!\ DECLARE ALIAS AFTER assign prototype !

/***/ })

/******/ });