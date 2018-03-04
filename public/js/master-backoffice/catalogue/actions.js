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
/******/ 	return __webpack_require__(__webpack_require__.s = 559);
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

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(3)("2f5aad82", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f1e52d30\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Tables.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-f1e52d30\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Tables.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(undefined);
// imports


// module
exports.push([module.i, "\n#table_wrapper[data-v-f1e52d30] {\n    min-height: 361px;\n}\n", ""]);

// exports


/***/ }),

/***/ 12:
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
            isLoading: true,
            tableName: null,
            tableId: null,
            columns: null,
            data: null,
            errorMessage: null,
            delteUrl: null,
            requestUrl: null,
            page: null
        };
    },


    methods: {
        // *****************************
        // ***** Private functions *****
        // *****************************
        /**
         *
         * _tablesRequest
         *
         * Tables Component Component POST
         *
         * @param isUpdate
         * @param instance
         * @param payload
         * @private
         */
        tablesRequest: function tablesRequest(_request) {
            var isUpdate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            var _page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.page;

            var self = this;

            self.url = 'tables/' + _request;
            self.requestUrl = _request;
            self.page = _page;

            // Show Loader
            self.isLoading = true;

            // Send a POST request
            axios({
                method: 'post',
                url: 'tables/' + _request
            }).then(function (response) {
                // Update Instance Data
                self.updateData(isUpdate, response.data.table);
            }).catch(function (error) {
                // Update Instance Data with error
                self.updateDataWithError(isUpdate, _request, error.response);
            });
        },
        deleteField: function deleteField(id) {
            // Create payload {id}
            var payload = {};
            payload.id = id;

            var self = this;

            // Send a POST request
            axios({
                method: 'post',
                url: self.url + '/delete',
                data: payload
            }).then(function (response) {
                window.actionsTable.tablesRequest(self.requestUrl, true);
            }).catch(function (error) {
                console.log(error);
                //Set error message
                self.errorMessage = error.response.statusText;

                // Show error modal
                $('#' + self.tableId + 'modal').modal('show');
            });
        },
        editField: function editField(id) {
            window.location.href = window.location.pathname + '/edit/en/' + id;
        },


        // Update Data instance
        updateData: function updateData() {
            var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var response = arguments[1];

            this.errorMessage = null;
            // If Table instance is already created destroy previous
            if (isUpdate) {
                window[this.tableId].destroy();
            }

            //Update Data
            this.tableId = response.tableId;
            this.tableName = response.tableName, this.data = response.data, this.columns = response.columns, this.$nextTick(function () {
                // Create Table Instance
                this.createTable(this.tableId, false, isUpdate);
            });
        },


        // Update Data instance if an error occurred
        updateDataWithError: function updateDataWithError() {
            var isUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
            var response = arguments[1];
            var error = arguments[2];

            // If Table instance is already created destroy previous
            if (isUpdate) {
                // Create Table Instance
                window[this.tableId].destroy();
            }

            // Set Error message
            if (error != undefined) {
                this.errorMessage = error.statusText;
            } else {
                this.errorMessage = 'Error';
            }

            // Update data
            this.tableId = response;
            this.tableName = 'Table - ' + this.errorMessage;
            this.data = null;
            this.columns = null, this.$nextTick(function () {
                // Create Table Instance
                this.createTable(this.tableId, true);
            });
        },


        // Create Table instance
        createTable: function createTable(instanceName) {
            var error = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            var isUpdate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

            /**
             * Create Data Table function
             *
             * @param instanceName
             */
            var self = this;
            window[instanceName] = $('#' + instanceName).DataTable({
                dom: 'Bfrtip',
                sScrollX: "100%",
                stateSave: true,
                colReorder: true,
                lengthChange: false,
                order: [[0, 'desc']],
                columnDefs: [{
                    targets: [0], //Comma separated values
                    visible: false,
                    searchable: false }],
                buttons: [{
                    text: '<i title="Add" class="material-icons">&#xE145;</i>', action: function action() {
                        window.location.href = window.location.pathname.slice(0, window.location.pathname.lastIndexOf('/')) + '/add';
                    }
                }, {
                    text: '<i title="Refresh" class="material-icons">&#xE5D5;</i>', action: function action() {
                        window.actionsTable.tablesRequest(self.requestUrl, true);
                    }
                }, {
                    extend: 'colvis',
                    text: '<i class="material-icons">visibility</i>',
                    postfixButtons: ['colvisRestore']
                }, {
                    text: '<i class="material-icons">settings_backup_restore</i>', action: function action() {
                        window[instanceName].colReorder.reset();
                    }
                }],
                oLanguage: {
                    oPaginate: {
                        "sNext": '<i class="material-icons">chevron_right</i>',
                        "sPrevious": '<i class="material-icons">chevron_left</i>'
                    }
                },
                initComplete: function initComplete() {
                    // Stop Loader
                    self.isLoading = false;

                    if (error) {
                        // Show error modal
                        $('#' + instanceName + 'modal').modal('show');
                    }
                }
            });

            window[instanceName].column('0:visible').order('desc').draw();
        }
    }
});

/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      {
        staticClass: "modal inmodal fade",
        staticStyle: { "z-index": "209999950!important" },
        attrs: {
          id: _vm.tableId + "modal",
          tabindex: "-1",
          role: "dialog",
          "aria-hidden": "true"
        }
      },
      [
        _c("div", { staticClass: "modal-dialog modal-md" }, [
          _c("div", { staticClass: "modal-content" }, [
            _vm._m(0, false, false),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "modal-body",
                staticStyle: { "text-align": "center", display: "block" }
              },
              [
                _c("i", {
                  staticClass: "fa fa-warning fa-5x text-danger",
                  staticStyle: { display: "block" }
                }),
                _vm._v(" "),
                _c("small", { staticClass: "font-bold text-danger" }, [
                  _vm._v(" " + _vm._s(_vm.errorMessage))
                ]),
                _c("br")
              ]
            ),
            _vm._v(" "),
            _vm._m(1, false, false)
          ])
        ])
      ]
    ),
    _vm._v(" "),
    _vm.isLoading
      ? _c("div", { attrs: { id: "isLoading" } }, [_vm._m(2, false, false)])
      : _vm._e(),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "col-lg-12 col-md-12", attrs: { id: "table_wrapper" } },
      [
        _c(
          "div",
          { staticClass: "card", staticStyle: { "min-height": "361px" } },
          [
            _c(
              "div",
              {
                staticClass: "card-header",
                attrs: { "data-background-color": "red" }
              },
              [
                _c("h4", { staticClass: "title" }, [
                  _vm._v(" " + _vm._s(_vm.page) + " ")
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "card-content table-responsive" }, [
              _vm.data
                ? _c(
                    "table",
                    {
                      staticClass:
                        "table table-hover mdl-data-table display nowrap mdl-typography--text-center",
                      attrs: {
                        id: _vm.tableId,
                        cellspacing: "0",
                        width: "100%"
                      }
                    },
                    [
                      _c("thead", { staticClass: "text-danger" }, [
                        _c(
                          "tr",
                          [
                            _vm._l(_vm.columns, function(column) {
                              return _c("th", [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(column) +
                                    "\n                        "
                                )
                              ])
                            }),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                "\n                            Actions\n                        "
                              )
                            ])
                          ],
                          2
                        )
                      ]),
                      _vm._v(" "),
                      _vm.data
                        ? _c(
                            "tbody",
                            _vm._l(_vm.data, function(value, index) {
                              return _c(
                                "tr",
                                [
                                  _vm._l(_vm.data[index], function(value) {
                                    return _c("td", [
                                      value === true
                                        ? _c("span", [
                                            _c(
                                              "i",
                                              { staticClass: "material-icons" },
                                              [_vm._v("")]
                                            )
                                          ])
                                        : value === false
                                          ? _c("span", [
                                              _c(
                                                "i",
                                                {
                                                  staticClass: "material-icons"
                                                },
                                                [_vm._v("")]
                                              )
                                            ])
                                          : _c("span", [
                                              _vm._v(
                                                _vm._s(_vm.trans(value)) + " "
                                              )
                                            ])
                                    ])
                                  }),
                                  _vm._v(" "),
                                  _c("td", [
                                    _c(
                                      "a",
                                      {
                                        attrs: { title: "Edit" },
                                        on: {
                                          click: function($event) {
                                            _vm.editField(_vm.data[index].id)
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "i",
                                          {
                                            staticClass: "material-icons",
                                            staticStyle: {
                                              color: "#ffa726",
                                              "font-size": "20px"
                                            }
                                          },
                                          [_vm._v("")]
                                        )
                                      ]
                                    ),
                                    _vm._v(" "),
                                    _c(
                                      "a",
                                      {
                                        attrs: { title: "Delete" },
                                        on: {
                                          click: function($event) {
                                            _vm.deleteField(_vm.data[index].id)
                                          }
                                        }
                                      },
                                      [
                                        _c(
                                          "i",
                                          {
                                            staticClass: "material-icons",
                                            staticStyle: {
                                              color: "#ED5565",
                                              "font-size": "24px",
                                              "padding-left": "5px"
                                            }
                                          },
                                          [_vm._v("")]
                                        )
                                      ]
                                    )
                                  ])
                                ],
                                2
                              )
                            })
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("tfoot", [
                        _c(
                          "tr",
                          [
                            _vm._l(_vm.columns, function(column) {
                              return _c("th", [
                                _vm._v(
                                  "\n                            " +
                                    _vm._s(column) +
                                    "\n                        "
                                )
                              ])
                            }),
                            _vm._v(" "),
                            _c("th", [
                              _vm._v(
                                "\n                            Actions\n                        "
                              )
                            ])
                          ],
                          2
                        )
                      ])
                    ]
                  )
                : _c(
                    "table",
                    {
                      staticClass: "mdl-data-table display nowrap",
                      staticStyle: { "min-height": "127px" },
                      attrs: {
                        id: _vm.tableId,
                        cellspacing: "0",
                        width: "100%"
                      }
                    },
                    [_vm._m(3, false, false), _vm._v(" "), _c("tbody")]
                  )
            ])
          ]
        )
      ]
    )
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-header" }, [
      _c(
        "button",
        {
          staticClass: "close",
          attrs: { type: "button", "data-dismiss": "modal" }
        },
        [
          _c("span", { attrs: { "aria-hidden": "true" } }, [_vm._v("×")]),
          _c("span", { staticClass: "sr-only" }, [_vm._v("Close")])
        ]
      ),
      _vm._v(" "),
      _c("h4", { staticClass: "modal-title text-center" }, [
        _vm._v("Please try again later")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "modal-footer" }, [
      _c(
        "button",
        {
          staticClass: "btn btn-primary",
          attrs: { type: "button", "data-dismiss": "modal" }
        },
        [_vm._v("Close")]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", [_c("div", { staticClass: "vue-simple-spinner" })])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [_c("tr", [_c("th")])])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-f1e52d30", module.exports)
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


/***/ }),

/***/ 559:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(560);


/***/ }),

/***/ 560:
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
 * Request Tables
 * @type {string}
 * @private
 */
var _requestTables = ["catalogue-actions-table"];

/**
 * Request Page
 * @type {string}
 * @private
 */
var _requestPage = "Catalogue";

/**
 * Tables Component instance
 */
var tablesComponent = __webpack_require__(8);

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
    console.log("Catalogue Actions Area started..");

    // Tables component init
    tablesComponent.start(_requestTables, _requestPage);
  }
};

self.start();

/***/ }),

/***/ 8:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tables_vue__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Tables_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__Tables_vue__);
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
var _page;

/**
 * Request
 * @type String
 * @private
 */
var _request;

/**
 * Tables instance
 */


/**
 *
 * Create a Table component
 *
 * @param response
 * @return {{columns, data, tableName: (*|null)}}
 * @private
 */
var _table = function _table() {
  // Create all requested instances
  for (var i = 0, len = _request.length; i < len; i++) {
    window.actionsTable = new Vue({
      el: '#' + _request[i],
      mixins: [__WEBPACK_IMPORTED_MODULE_0__Tables_vue___default.a],

      mounted: function mounted() {
        console.log(_page);

        // After mounted request data
        this.tablesRequest(_request[i], false, _page);
      }
    });
  }
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
self.start = function (request, page) {
  _page = page;
  _request = request;

  if (!_isInit) {
    console.log("Table Component started..");

    // Init search component
    _table();
  }
};

/***/ }),

/***/ 9:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(10)
}
var normalizeComponent = __webpack_require__(1)
/* script */
var __vue_script__ = __webpack_require__(12)
/* template */
var __vue_template__ = __webpack_require__(13)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-f1e52d30"
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
Component.options.__file = "resources/assets/js/components/tables/Tables.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {  return key !== "default" && key.substr(0, 2) !== "__"})) {  console.error("named exports are not supported in *.vue files.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f1e52d30", Component.options)
  } else {
    hotAPI.reload("data-v-f1e52d30", Component.options)
' + '  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

/******/ });