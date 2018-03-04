! function(e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.droply = t() : e.droply = t()
}(this, function() {
    return function(e) {
        function t(i) {
            if (n[i]) return n[i].exports;
            var r = n[i] = {
                exports: {},
                id: i,
                loaded: !1
            };
            return e[i].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function(e, t, n) {
        var i, r, o = {};
        n(45), i = n(11), r = n(43), e.exports = i || {}, e.exports.__esModule && (e.exports = e.exports.default);
        var s = "function" == typeof e.exports ? e.exports.options || (e.exports.options = {}) : e.exports;
        r && (s.template = r), s.computed || (s.computed = {}), Object.keys(o).forEach(function(e) {
            var t = o[e];
            s.computed[e] = function() {
                return t
            }
        })
    }, function(e, t, n) {
        e.exports = !n(2)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }, function(e, t) {
        e.exports = function(e) {
            try {
                return !!e()
            } catch (e) {
                return !0
            }
        }
    }, function(e, t) {
        var n = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = n)
    }, function(e, t) {
        e.exports = function(e) {
            return "object" == typeof e ? null !== e : "function" == typeof e
        }
    }, function(e, t) {
        var n = e.exports = {
            version: "2.4.0"
        };
        "number" == typeof __e && (__e = n)
    }, function(e, t) {
        e.exports = function(e) {
            if (void 0 == e) throw TypeError("Can't call method on  " + e);
            return e
        }
    }, function(e, t, n) {
        var i = n(17);
        e.exports = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
            return "String" == i(e) ? e.split("") : Object(e)
        }
    }, function(e, t) {
        var n = Math.ceil,
            i = Math.floor;
        e.exports = function(e) {
            return isNaN(e = +e) ? 0 : (e > 0 ? i : n)(e)
        }
    }, function(e, t, n) {
        var i = n(7),
            r = n(6);
        e.exports = function(e) {
            return i(r(e))
        }
    }, function(e, t) {
        e.exports = function() {
            var e = [];
            return e.toString = function() {
                for (var e = [], t = 0; t < this.length; t++) {
                    var n = this[t];
                    n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
                }
                return e.join("")
            }, e.i = function(t, n) {
                "string" == typeof t && (t = [
                    [null, t, ""]
                ]);
                for (var i = {}, r = 0; r < this.length; r++) {
                    var o = this[r][0];
                    "number" == typeof o && (i[o] = !0)
                }
                for (r = 0; r < t.length; r++) {
                    var s = t[r];
                    "number" == typeof s[0] && i[s[0]] || (n && !s[2] ? s[2] = n : n && (s[2] = "(" + s[2] + ") and (" + n + ")"), e.push(s))
                }
            }, e
        }
    }, function(e, t, n) {
        "use strict";

        function i(e) {
            return e && e.__esModule ? e : {
                default: e
            }
        }
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var r = n(12),
            o = i(r),
            s = n(42),
            a = i(s);
        a.default.autoDiscover = !1, t.default = {
            props: {
                id: {
                    type: String,
                    required: !0
                },
                url: {
                    type: String,
                    required: !0
                },
                clickable: {
                    type: Boolean,
                    default: !0
                },
                acceptedFileTypes: {
                    type: String
                },
                thumbnailHeight: {
                    type: Number,
                    default: 200
                },
                thumbnailWidth: {
                    type: Number,
                    default: 200
                },
                showRemoveLink: {
                    type: Boolean,
                    default: !0
                },
                maxFileSizeInMB: {
                    type: Number,
                    default: 2
                },
                maxNumberOfFiles: {
                    type: Number,
                    default: 5
                },
                autoProcessQueue: {
                    type: Boolean,
                    default: !0
                },
                useFontAwesome: {
                    type: Boolean,
                    default: !1
                },
                useCustomDropzoneOptions: {
                    type: Boolean,
                    default: !1
                },
                dropzoneOptions: {
                    type: Object
                },
                icons: {
                    type: Object,
                    default: function() {
                        return {
                            cloud: "fa fa-cloud-upload",
                            done: "fa fa-check",
                            error: "fa fa-close"
                        }
                    }
                },
                uploadMessageText: {
                    type: String,
                    default: "Drop files here to upload"
                },
                removeImageText: {
                    type: String,
                    default: "Remove"
                },
                headers: {
                    type: Object
                }
            },
            methods: {
                removeAllFiles: function() {
                    this.dropzone.removeAllFiles(!0)
                },
                processQueue: function() {
                    this.dropzone.processQueue()
                },
                getQueuedFiles: function() {
                    return this.dropzone.getQueuedFiles()
                },
            },
            mounted: function() {
                var e = document.getElementById(this.id),
                    t = {
                        clickable: this.clickable,
                        thumbnailWidth: this.thumbnailWidth,
                        thumbnailHeight: this.thumbnailHeight,
                        maxFiles: this.maxNumberOfFiles,
                        maxFilesize: this.maxFileSizeInMB,
                        dictRemoveFile: this.removeImageText,
                        addRemoveLinks: this.showRemoveLink,
                        acceptedFiles: this.acceptedFileTypes,
                        autoProcessQueue: this.autoProcessQueue,
                        headers: this.headers,
                        dictDefaultMessage: '<i class="' + this.icons.cloud + '" aria-hidden="true"></i>\n                           <br>' + this.uploadMessageText,
                        previewTemplate: '\n                      <div class="dz-preview dz-file-preview">\n                          <div class="dz-image" style="width: ' + this.thumbnailWidth + "px; height: " + this.thumbnailHeight + 'px">\n                              <img data-dz-thumbnail />\n                          </div>\n                          <div class="dz-details">\n                              <div class="dz-size">\n                                  <span data-dz-size></span>\n                              </div>\n                              <div class="dz-filename">\n                                  <span data-dz-name></span>\n                              </div>\n                          </div>\n                          <div class="dz-progress">\n                              <span class="dz-upload" data-dz-uploadprogress></span>\n                          </div>\n                          <div class="dz-error-message">\n                              <span data-dz-errormessage></span>\n                          </div>\n                          <div class="dz-success-mark">\n                              <i class="' + this.icons.done + '" aria-hidden="true"></i>\n                          </div>\n                          <div class="dz-error-mark">\n                              <i class="' + this.icons.error + '" aria-hidden="true"></i>\n                          </div>\n                      </div>'
                    },
                    n = (0, o.default)({}, t, this.dropzoneOptions);
                this.dropzone = new a.default(e, n);
                var i = this;
                this.dropzone.on("addedfile", function(e) {
                    i.$emit("droply-fileAdded", e)
                }), this.dropzone.on("removedfile", function(e) {
                    i.$emit("droply-removedFile", e)
                }), this.dropzone.on("success", function(e, t) {
                    i.$emit("droply-success", e, t)
                }), this.dropzone.on("error", function(e, t, n) {
                    i.$emit("droply-error", e, t, n)
                }), this.dropzone.on("sending", function(e, t, n) {
                    i.$emit("droply-sending", e, t, n)
                })
            }
        }
    }, function(e, t, n) {
        e.exports = {
            default: n(13),
            __esModule: !0
        }
    }, function(e, t, n) {
        n(39), e.exports = n(5).Object.assign
    }, function(e, t) {
        e.exports = function(e) {
            if ("function" != typeof e) throw TypeError(e + " is not a function!");
            return e
        }
    }, function(e, t, n) {
        var i = n(4);
        e.exports = function(e) {
            if (!i(e)) throw TypeError(e + " is not an object!");
            return e
        }
    }, function(e, t, n) {
        var i = n(9),
            r = n(35),
            o = n(34);
        e.exports = function(e) {
            return function(t, n, s) {
                var a, l = i(t),
                    p = r(l.length),
                    d = o(s, p);
                if (e && n != n) {
                    for (; p > d;)
                        if (a = l[d++], a != a) return !0
                } else
                    for (; p > d; d++)
                        if ((e || d in l) && l[d] === n) return e || d || 0;
                return !e && -1
            }
        }
    }, function(e, t) {
        var n = {}.toString;
        e.exports = function(e) {
            return n.call(e).slice(8, -1)
        }
    }, function(e, t, n) {
        var i = n(14);
        e.exports = function(e, t, n) {
            if (i(e), void 0 === t) return e;
            switch (n) {
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function(n, i) {
                        return e.call(t, n, i)
                    };
                case 3:
                    return function(n, i, r) {
                        return e.call(t, n, i, r)
                    }
            }
            return function() {
                return e.apply(t, arguments)
            }
        }
    }, function(e, t, n) {
        var i = n(4),
            r = n(3).document,
            o = i(r) && i(r.createElement);
        e.exports = function(e) {
            return o ? r.createElement(e) : {}
        }
    }, function(e, t) {
        e.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
    }, function(e, t, n) {
        var i = n(3),
            r = n(5),
            o = n(18),
            s = n(23),
            a = "prototype",
            l = function(e, t, n) {
                var p, d, u, c = e & l.F,
                    h = e & l.G,
                    f = e & l.S,
                    m = e & l.P,
                    v = e & l.B,
                    g = e & l.W,
                    z = h ? r : r[t] || (r[t] = {}),
                    y = z[a],
                    b = h ? i : f ? i[t] : (i[t] || {})[a];
                h && (n = t);
                for (p in n) d = !c && b && void 0 !== b[p], d && p in z || (u = d ? b[p] : n[p], z[p] = h && "function" != typeof b[p] ? n[p] : v && d ? o(u, i) : g && b[p] == u ? function(e) {
                    var t = function(t, n, i) {
                        if (this instanceof e) {
                            switch (arguments.length) {
                                case 0:
                                    return new e;
                                case 1:
                                    return new e(t);
                                case 2:
                                    return new e(t, n)
                            }
                            return new e(t, n, i)
                        }
                        return e.apply(this, arguments)
                    };
                    return t[a] = e[a], t
                }(u) : m && "function" == typeof u ? o(Function.call, u) : u, m && ((z.virtual || (z.virtual = {}))[p] = u, e & l.R && y && !y[p] && s(y, p, u)))
            };
        l.F = 1, l.G = 2, l.S = 4, l.P = 8, l.B = 16, l.W = 32, l.U = 64, l.R = 128, e.exports = l
    }, function(e, t) {
        var n = {}.hasOwnProperty;
        e.exports = function(e, t) {
            return n.call(e, t)
        }
    }, function(e, t, n) {
        var i = n(26),
            r = n(31);
        e.exports = n(1) ? function(e, t, n) {
            return i.f(e, t, r(1, n))
        } : function(e, t, n) {
            return e[t] = n, e
        }
    }, function(e, t, n) {
        e.exports = !n(1) && !n(2)(function() {
            return 7 != Object.defineProperty(n(19)("div"), "a", {
                get: function() {
                    return 7
                }
            }).a
        })
    }, function(e, t, n) {
        "use strict";
        var i = n(29),
            r = n(27),
            o = n(30),
            s = n(36),
            a = n(7),
            l = Object.assign;
        e.exports = !l || n(2)(function() {
            var e = {},
                t = {},
                n = Symbol(),
                i = "abcdefghijklmnopqrst";
            return e[n] = 7, i.split("").forEach(function(e) {
                t[e] = e
            }), 7 != l({}, e)[n] || Object.keys(l({}, t)).join("") != i
        }) ? function(e, t) {
            for (var n = s(e), l = arguments.length, p = 1, d = r.f, u = o.f; l > p;)
                for (var c, h = a(arguments[p++]), f = d ? i(h).concat(d(h)) : i(h), m = f.length, v = 0; m > v;) u.call(h, c = f[v++]) && (n[c] = h[c]);
            return n
        } : l
    }, function(e, t, n) {
        var i = n(15),
            r = n(24),
            o = n(37),
            s = Object.defineProperty;
        t.f = n(1) ? Object.defineProperty : function(e, t, n) {
            if (i(e), t = o(t, !0), i(n), r) try {
                return s(e, t, n)
            } catch (e) {}
            if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
            return "value" in n && (e[t] = n.value), e
        }
    }, function(e, t) {
        t.f = Object.getOwnPropertySymbols
    }, function(e, t, n) {
        var i = n(22),
            r = n(9),
            o = n(16)(!1),
            s = n(32)("IE_PROTO");
        e.exports = function(e, t) {
            var n, a = r(e),
                l = 0,
                p = [];
            for (n in a) n != s && i(a, n) && p.push(n);
            for (; t.length > l;) i(a, n = t[l++]) && (~o(p, n) || p.push(n));
            return p
        }
    }, function(e, t, n) {
        var i = n(28),
            r = n(20);
        e.exports = Object.keys || function(e) {
            return i(e, r)
        }
    }, function(e, t) {
        t.f = {}.propertyIsEnumerable
    }, function(e, t) {
        e.exports = function(e, t) {
            return {
                enumerable: !(1 & e),
                configurable: !(2 & e),
                writable: !(4 & e),
                value: t
            }
        }
    }, function(e, t, n) {
        var i = n(33)("keys"),
            r = n(38);
        e.exports = function(e) {
            return i[e] || (i[e] = r(e))
        }
    }, function(e, t, n) {
        var i = n(3),
            r = "__core-js_shared__",
            o = i[r] || (i[r] = {});
        e.exports = function(e) {
            return o[e] || (o[e] = {})
        }
    }, function(e, t, n) {
        var i = n(8),
            r = Math.max,
            o = Math.min;
        e.exports = function(e, t) {
            return e = i(e), e < 0 ? r(e + t, 0) : o(e, t)
        }
    }, function(e, t, n) {
        var i = n(8),
            r = Math.min;
        e.exports = function(e) {
            return e > 0 ? r(i(e), 9007199254740991) : 0
        }
    }, function(e, t, n) {
        var i = n(6);
        e.exports = function(e) {
            return Object(i(e))
        }
    }, function(e, t, n) {
        var i = n(4);
        e.exports = function(e, t) {
            if (!i(e)) return e;
            var n, r;
            if (t && "function" == typeof(n = e.toString) && !i(r = n.call(e))) return r;
            if ("function" == typeof(n = e.valueOf) && !i(r = n.call(e))) return r;
            if (!t && "function" == typeof(n = e.toString) && !i(r = n.call(e))) return r;
            throw TypeError("Can't convert object to primitive value")
        }
    }, function(e, t) {
        var n = 0,
            i = Math.random();
        e.exports = function(e) {
            return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++n + i).toString(36))
        }
    }, function(e, t, n) {
        var i = n(21);
        i(i.S + i.F, "Object", {
            assign: n(25)
        })
    }, function(e, t, n) {
        t = e.exports = n(10)(), t.push([e.id, '@-webkit-keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(-40px);transform:translateY(-40px)}}@keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(-40px);transform:translateY(-40px)}}@-webkit-keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes pulse{0%{-webkit-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes pulse{0%{-webkit-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);transform:scale(1)}}.dropzone,.dropzone *{box-sizing:border-box}.dropzone{min-height:150px;border:2px solid rgba(0,0,0,.3);background:#fff;padding:20px}.dropzone.dz-clickable{cursor:pointer}.dropzone.dz-clickable *{cursor:default}.dropzone.dz-clickable .dz-message,.dropzone.dz-clickable .dz-message *{cursor:pointer}.dropzone.dz-started .dz-message{display:none}.dropzone.dz-drag-hover{border-style:solid}.dropzone.dz-drag-hover .dz-message{opacity:.5}.dropzone .dz-message{text-align:center;margin:2em 0}.dropzone .dz-preview{position:relative;display:inline-block;vertical-align:top;margin:16px;min-height:100px}.dropzone .dz-preview:hover{z-index:1000}.dropzone .dz-preview.dz-file-preview .dz-image{border-radius:20px;background:#999;background:linear-gradient(180deg,#eee,#ddd)}.dropzone .dz-preview.dz-file-preview .dz-details{opacity:1}.dropzone .dz-preview.dz-image-preview{background:#fff}.dropzone .dz-preview.dz-image-preview .dz-details{-webkit-transition:opacity .2s linear;transition:opacity .2s linear}.dropzone .dz-preview .dz-remove{font-size:14px;text-align:center;display:block;cursor:pointer;border:none}.dropzone .dz-preview .dz-remove:hover{text-decoration:underline}.dropzone .dz-preview:hover .dz-details{opacity:1}.dropzone .dz-preview .dz-details{z-index:20;position:absolute;top:0;left:0;opacity:0;font-size:13px;min-width:100%;max-width:100%;padding:2em 1em;text-align:center;color:rgba(0,0,0,.9);line-height:150%}.dropzone .dz-preview .dz-details .dz-size{margin-bottom:1em;font-size:16px}.dropzone .dz-preview .dz-details .dz-filename{white-space:nowrap}.dropzone .dz-preview .dz-details .dz-filename:hover span{border:1px solid hsla(0,0%,78%,.8);background-color:hsla(0,0%,100%,.8)}.dropzone .dz-preview .dz-details .dz-filename:not(:hover){overflow:hidden;text-overflow:ellipsis}.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span{border:1px solid transparent}.dropzone .dz-preview .dz-details .dz-filename span,.dropzone .dz-preview .dz-details .dz-size span{background-color:hsla(0,0%,100%,.4);padding:0 .4em;border-radius:3px}.dropzone .dz-preview:hover .dz-image img{-webkit-transform:scale(1.05);transform:scale(1.05);-webkit-filter:blur(8px);filter:blur(8px)}.dropzone .dz-preview .dz-image{border-radius:20px;overflow:hidden;width:120px;height:120px;position:relative;display:block;z-index:10}.dropzone .dz-preview .dz-image img{display:block}.dropzone .dz-preview.dz-success .dz-success-mark{-webkit-animation:passing-through 3s cubic-bezier(.77,0,.175,1);animation:passing-through 3s cubic-bezier(.77,0,.175,1)}.dropzone .dz-preview.dz-error .dz-error-mark{opacity:1;-webkit-animation:slide-in 3s cubic-bezier(.77,0,.175,1);animation:slide-in 3s cubic-bezier(.77,0,.175,1)}.dropzone .dz-preview .dz-error-mark,.dropzone .dz-preview .dz-success-mark{pointer-events:none;opacity:0;z-index:500;position:absolute;display:block;top:50%;left:50%;margin-left:-27px;margin-top:-27px}.dropzone .dz-preview .dz-error-mark svg,.dropzone .dz-preview .dz-success-mark svg{display:block;width:54px;height:54px}.dropzone .dz-preview.dz-processing .dz-progress{opacity:1;-webkit-transition:all .2s linear;transition:all .2s linear}.dropzone .dz-preview.dz-complete .dz-progress{opacity:0;-webkit-transition:opacity .4s ease-in;transition:opacity .4s ease-in}.dropzone .dz-preview:not(.dz-processing) .dz-progress{-webkit-animation:pulse 6s ease infinite;animation:pulse 6s ease infinite}.dropzone .dz-preview .dz-progress{opacity:1;z-index:1000;pointer-events:none;position:absolute;height:16px;left:50%;top:50%;margin-top:-8px;width:80px;margin-left:-40px;background:hsla(0,0%,100%,.9);-webkit-transform:scale(1);border-radius:8px;overflow:hidden}.dropzone .dz-preview .dz-progress .dz-upload{background:#333;background:linear-gradient(180deg,#666,#444);position:absolute;top:0;left:0;bottom:0;width:0;-webkit-transition:width .3s ease-in-out;transition:width .3s ease-in-out}.dropzone .dz-preview.dz-error .dz-error-message{display:block}.dropzone .dz-preview.dz-error:hover .dz-error-message{opacity:1;pointer-events:auto}.dropzone .dz-preview .dz-error-message{pointer-events:none;z-index:1000;position:absolute;display:block;display:none;opacity:0;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;border-radius:8px;font-size:13px;top:130px;left:-10px;width:140px;background:#be2626;background:linear-gradient(180deg,#be2626,#a92222);padding:.5em 1.2em;color:#fff}.dropzone .dz-preview .dz-error-message:after{content:"";position:absolute;top:-6px;left:64px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #be2626}', ""])
    }, function(e, t, n) {
        t = e.exports = n(10)(), t.i(n(40), ""), t.push([e.id, ".dropzone{border:2px dashed #EC1B33;color:#EC1B33;font-weight:400;font-size:16px;font-family:Arial,sans-serif;letter-spacing:.2px;-webkit-transition:background-color .2s linear;transition:background-color .2s linear}.dropzone:hover{background-color:rgba(66,165,245,.03)}.dropzone .dz-preview:hover .dz-image img{-webkit-transform:none;transform:none;-webkit-filter:none}.dropzone .dz-preview .dz-image{border-radius:0}.dropzone .dz-preview .dz-remove{position:absolute;z-index:30;color:#fff;margin-left:15px;padding:10px;top:inherit;bottom:15px;border:2px solid #fff;text-decoration:none;text-transform:uppercase;font-size:.8rem;font-weight:800;letter-spacing:1.1px;opacity:0}.dropzone .dz-preview .dz-details{bottom:0;top:0;color:#fff;background-color:rgba(236, 27, 51,.8);-webkit-transition:opacity .2s linear;transition:opacity .2s linear;text-align:left}.dropzone .dz-preview .dz-details .dropzone .dz-preview .dz-details .dz-size span,.dropzone .dz-preview .dz-details .dz-filename span{background-color:transparent}.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span{border:none}.dropzone .dz-preview .dz-details .dz-filename:hover span{background-color:transparent;border:none}.dropzone .dz-preview:hover .dz-remove{opacity:1}.dropzone .dz-preview .dz-error-mark,.dropzone .dz-preview .dz-success-mark{margin-left:-40px;margin-top:-50px}.dropzone .dz-preview .dz-error-mark i,.dropzone .dz-preview .dz-success-mark i{color:#fff;font-size:5rem}.dropzone .dz-message span{color:#EC1B33}.dropzone .dz-message i{font-size:86px;color:#EC1B33}", ""])
    }, function(e, t, n) {
        (function(e) {
            (function() {
                var t, n, i, r, o, s, a, l, p = [].slice,
                    d = {}.hasOwnProperty,
                    u = function(e, t) {
                        function n() {
                            this.constructor = e
                        }
                        for (var i in t) d.call(t, i) && (e[i] = t[i]);
                        return n.prototype = t.prototype, e.prototype = new n, e.__super__ = t.prototype, e
                    };
                a = function() {}, n = function() {
                    function e() {}
                    return e.prototype.addEventListener = e.prototype.on, e.prototype.on = function(e, t) {
                        return this._callbacks = this._callbacks || {}, this._callbacks[e] || (this._callbacks[e] = []), this._callbacks[e].push(t), this
                    }, e.prototype.emit = function() {
                        var e, t, n, i, r, o;
                        if (i = arguments[0], e = 2 <= arguments.length ? p.call(arguments, 1) : [], this._callbacks = this._callbacks || {}, n = this._callbacks[i])
                            for (r = 0, o = n.length; r < o; r++) t = n[r], t.apply(this, e);
                        return this
                    }, e.prototype.removeListener = e.prototype.off, e.prototype.removeAllListeners = e.prototype.off, e.prototype.removeEventListener = e.prototype.off, e.prototype.off = function(e, t) {
                        var n, i, r, o, s;
                        if (!this._callbacks || 0 === arguments.length) return this._callbacks = {}, this;
                        if (i = this._callbacks[e], !i) return this;
                        if (1 === arguments.length) return delete this._callbacks[e], this;
                        for (r = o = 0, s = i.length; o < s; r = ++o)
                            if (n = i[r], n === t) {
                                i.splice(r, 1);
                                break
                            }
                        return this
                    }, e
                }(), t = function(e) {
                    function t(e, n) {
                        var r, o, s;
                        if (this.element = e, this.version = t.version, this.defaultOptions.previewTemplate = this.defaultOptions.previewTemplate.replace(/\n*/g, ""), this.clickableElements = [], this.listeners = [], this.files = [], "string" == typeof this.element && (this.element = document.querySelector(this.element)), !this.element || null == this.element.nodeType) throw new Error("Invalid dropzone element.");
                        if (this.element.dropzone) throw new Error("Dropzone already attached.");
                        if (t.instances.push(this), this.element.dropzone = this, r = null != (s = t.optionsForElement(this.element)) ? s : {}, this.options = i({}, this.defaultOptions, r, null != n ? n : {}), this.options.forceFallback || !t.isBrowserSupported()) return this.options.fallback.call(this);
                        if (null == this.options.url && (this.options.url = this.element.getAttribute("action")), !this.options.url) throw new Error("No URL provided.");
                        if (this.options.acceptedFiles && this.options.acceptedMimeTypes) throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");
                        this.options.acceptedMimeTypes && (this.options.acceptedFiles = this.options.acceptedMimeTypes, delete this.options.acceptedMimeTypes), this.options.method = this.options.method.toUpperCase(), (o = this.getExistingFallback()) && o.parentNode && o.parentNode.removeChild(o), this.options.previewsContainer !== !1 && (this.options.previewsContainer ? this.previewsContainer = t.getElement(this.options.previewsContainer, "previewsContainer") : this.previewsContainer = this.element), this.options.clickable && (this.options.clickable === !0 ? this.clickableElements = [this.element] : this.clickableElements = t.getElements(this.options.clickable, "clickable")), this.init()
                    }
                    var i, r;
                    return u(t, e), t.prototype.Emitter = n, t.prototype.events = ["drop", "dragstart", "dragend", "dragenter", "dragover", "dragleave", "addedfile", "addedfiles", "removedfile", "thumbnail", "error", "errormultiple", "processing", "processingmultiple", "uploadprogress", "totaluploadprogress", "sending", "sendingmultiple", "success", "successmultiple", "canceled", "canceledmultiple", "complete", "completemultiple", "reset", "maxfilesexceeded", "maxfilesreached", "queuecomplete"], t.prototype.defaultOptions = {
                        url: null,
                        method: "post",
                        withCredentials: !1,
                        parallelUploads: 2,
                        uploadMultiple: !1,
                        maxFilesize: 256,
                        paramName: "file",
                        createImageThumbnails: !0,
                        maxThumbnailFilesize: 10,
                        thumbnailWidth: 120,
                        thumbnailHeight: 120,
                        filesizeBase: 1e3,
                        maxFiles: null,
                        params: {},
                        clickable: !0,
                        ignoreHiddenFiles: !0,
                        acceptedFiles: null,
                        acceptedMimeTypes: null,
                        autoProcessQueue: !0,
                        autoQueue: !0,
                        addRemoveLinks: !1,
                        previewsContainer: null,
                        hiddenInputContainer: "body",
                        capture: null,
                        renameFilename: null,
                        dictDefaultMessage: "Drop files here to upload",
                        dictFallbackMessage: "Your browser does not support drag'n'drop file uploads.",
                        dictFallbackText: "Please use the fallback form below to upload your files like in the olden days.",
                        dictFileTooBig: "File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",
                        dictInvalidFileType: "You can't upload files of this type.",
                        dictResponseError: "Server responded with {{statusCode}} code.",
                        dictCancelUpload: "Cancel upload",
                        dictCancelUploadConfirmation: "Are you sure you want to cancel this upload?",
                        dictRemoveFile: "Remove file",
                        dictRemoveFileConfirmation: null,
                        dictMaxFilesExceeded: "You can not upload any more files.",
                        accept: function(e, t) {
                            return t()
                        },
                        init: function() {
                            return a
                        },
                        forceFallback: !1,
                        fallback: function() {
                            var e, n, i, r, o, s;
                            for (this.element.className = "" + this.element.className + " dz-browser-not-supported", s = this.element.getElementsByTagName("div"), r = 0, o = s.length; r < o; r++) e = s[r], /(^| )dz-message($| )/.test(e.className) && (n = e, e.className = "dz-message");
                            return n || (n = t.createElement('<div class="dz-message"><span></span></div>'), this.element.appendChild(n)), i = n.getElementsByTagName("span")[0], i && (null != i.textContent ? i.textContent = this.options.dictFallbackMessage : null != i.innerText && (i.innerText = this.options.dictFallbackMessage)), this.element.appendChild(this.getFallbackForm())
                        },
                        resize: function(e) {
                            var t, n, i;
                            return t = {
                                srcX: 0,
                                srcY: 0,
                                srcWidth: e.width,
                                srcHeight: e.height
                            }, n = e.width / e.height, t.optWidth = this.options.thumbnailWidth, t.optHeight = this.options.thumbnailHeight, null == t.optWidth && null == t.optHeight ? (t.optWidth = t.srcWidth, t.optHeight = t.srcHeight) : null == t.optWidth ? t.optWidth = n * t.optHeight : null == t.optHeight && (t.optHeight = 1 / n * t.optWidth), i = t.optWidth / t.optHeight, e.height < t.optHeight || e.width < t.optWidth ? (t.trgHeight = t.srcHeight, t.trgWidth = t.srcWidth) : n > i ? (t.srcHeight = e.height, t.srcWidth = t.srcHeight * i) : (t.srcWidth = e.width, t.srcHeight = t.srcWidth / i), t.srcX = (e.width - t.srcWidth) / 2, t.srcY = (e.height - t.srcHeight) / 2, t
                        },
                        drop: function(e) {
                            return this.element.classList.remove("dz-drag-hover")
                        },
                        dragstart: a,
                        dragend: function(e) {
                            return this.element.classList.remove("dz-drag-hover")
                        },
                        dragenter: function(e) {
                            return this.element.classList.add("dz-drag-hover")
                        },
                        dragover: function(e) {
                            return this.element.classList.add("dz-drag-hover")
                        },
                        dragleave: function(e) {
                            return this.element.classList.remove("dz-drag-hover")
                        },
                        paste: a,
                        reset: function() {
                            return this.element.classList.remove("dz-started")
                        },
                        addedfile: function(e) {
                            var n, i, r, o, s, a, l, p, d, u, c, h, f;
                            if (this.element === this.previewsContainer && this.element.classList.add("dz-started"), this.previewsContainer) {
                                for (e.previewElement = t.createElement(this.options.previewTemplate.trim()), e.previewTemplate = e.previewElement, this.previewsContainer.appendChild(e.previewElement), u = e.previewElement.querySelectorAll("[data-dz-name]"), o = 0, l = u.length; o < l; o++) n = u[o], n.textContent = this._renameFilename(e.name);
                                for (c = e.previewElement.querySelectorAll("[data-dz-size]"), s = 0, p = c.length; s < p; s++) n = c[s], n.innerHTML = this.filesize(e.size);
                                for (this.options.addRemoveLinks && (e._removeLink = t.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>' + this.options.dictRemoveFile + "</a>"), e.previewElement.appendChild(e._removeLink)), i = function(n) {
                                    return function(i) {
                                        return i.preventDefault(), i.stopPropagation(), e.status === t.UPLOADING ? t.confirm(n.options.dictCancelUploadConfirmation, function() {
                                            return n.removeFile(e)
                                        }) : n.options.dictRemoveFileConfirmation ? t.confirm(n.options.dictRemoveFileConfirmation, function() {
                                            return n.removeFile(e)
                                        }) : n.removeFile(e)
                                    }
                                }(this), h = e.previewElement.querySelectorAll("[data-dz-remove]"), f = [], a = 0, d = h.length; a < d; a++) r = h[a], f.push(r.addEventListener("click", i));
                                return f
                            }
                        },
                        removedfile: function(e) {
                            var t;
                            return e.previewElement && null != (t = e.previewElement) && t.parentNode.removeChild(e.previewElement), this._updateMaxFilesReachedClass()
                        },
                        thumbnail: function(e, t) {
                            var n, i, r, o;
                            if (e.previewElement) {
                                for (e.previewElement.classList.remove("dz-file-preview"), o = e.previewElement.querySelectorAll("[data-dz-thumbnail]"), i = 0, r = o.length; i < r; i++) n = o[i], n.alt = e.name, n.src = t;
                                return setTimeout(function(t) {
                                    return function() {
                                        return e.previewElement.classList.add("dz-image-preview")
                                    }
                                }(this), 1)
                            }
                        },
                        error: function(e, t) {
                            var n, i, r, o, s;
                            if (e.previewElement) {
                                for (e.previewElement.classList.add("dz-error"), "String" != typeof t && t.error && (t = t.error), o = e.previewElement.querySelectorAll("[data-dz-errormessage]"), s = [], i = 0, r = o.length; i < r; i++) n = o[i], s.push(n.textContent = t);
                                return s
                            }
                        },
                        errormultiple: a,
                        processing: function(e) {
                            if (e.previewElement && (e.previewElement.classList.add("dz-processing"), e._removeLink)) return e._removeLink.textContent = this.options.dictCancelUpload
                        },
                        processingmultiple: a,
                        uploadprogress: function(e, t, n) {
                            var i, r, o, s, a;
                            if (e.previewElement) {
                                for (s = e.previewElement.querySelectorAll("[data-dz-uploadprogress]"), a = [], r = 0, o = s.length; r < o; r++) i = s[r], "PROGRESS" === i.nodeName ? a.push(i.value = t) : a.push(i.style.width = "" + t + "%");
                                return a
                            }
                        },
                        totaluploadprogress: a,
                        sending: a,
                        sendingmultiple: a,
                        success: function(e) {
                            if (e.previewElement) return e.previewElement.classList.add("dz-success")
                        },
                        successmultiple: a,
                        canceled: function(e) {
                            return this.emit("error", e, "Upload canceled.")
                        },
                        canceledmultiple: a,
                        complete: function(e) {
                            if (e._removeLink && (e._removeLink.textContent = this.options.dictRemoveFile), e.previewElement) return e.previewElement.classList.add("dz-complete")
                        },
                        completemultiple: a,
                        maxfilesexceeded: a,
                        maxfilesreached: a,
                        queuecomplete: a,
                        addedfiles: a,
                        previewTemplate: '<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'
                    }, i = function() {
                        var e, t, n, i, r, o, s;
                        for (i = arguments[0], n = 2 <= arguments.length ? p.call(arguments, 1) : [], o = 0, s = n.length; o < s; o++) {
                            t = n[o];
                            for (e in t) r = t[e], i[e] = r
                        }
                        return i
                    }, t.prototype.getAcceptedFiles = function() {
                        var e, t, n, i, r;
                        for (i = this.files, r = [], t = 0, n = i.length; t < n; t++) e = i[t], e.accepted && r.push(e);
                        return r
                    }, t.prototype.getRejectedFiles = function() {
                        var e, t, n, i, r;
                        for (i = this.files, r = [], t = 0, n = i.length; t < n; t++) e = i[t], e.accepted || r.push(e);
                        return r
                    }, t.prototype.getFilesWithStatus = function(e) {
                        var t, n, i, r, o;
                        for (r = this.files, o = [], n = 0, i = r.length; n < i; n++) t = r[n], t.status === e && o.push(t);
                        return o
                    }, t.prototype.getQueuedFiles = function() {
                        return this.getFilesWithStatus(t.QUEUED)
                    }, t.prototype.getUploadingFiles = function() {
                        return this.getFilesWithStatus(t.UPLOADING)
                    }, t.prototype.getAddedFiles = function() {
                        return this.getFilesWithStatus(t.ADDED)
                    }, t.prototype.getActiveFiles = function() {
                        var e, n, i, r, o;
                        for (r = this.files, o = [], n = 0, i = r.length; n < i; n++) e = r[n], e.status !== t.UPLOADING && e.status !== t.QUEUED || o.push(e);
                        return o
                    }, t.prototype.init = function() {
                        var e, n, i, r, o, s, a;
                        for ("form" === this.element.tagName && this.element.setAttribute("enctype", "multipart/form-data"), this.element.classList.contains("dropzone") && !this.element.querySelector(".dz-message") && this.element.appendChild(t.createElement('<div class="dz-default dz-message"><span>' + this.options.dictDefaultMessage + "</span></div>")), this.clickableElements.length && (i = function(e) {
                            return function() {
                                return e.hiddenFileInput && e.hiddenFileInput.parentNode.removeChild(e.hiddenFileInput), e.hiddenFileInput = document.createElement("input"), e.hiddenFileInput.setAttribute("type", "file"), (null == e.options.maxFiles || e.options.maxFiles > 1) && e.hiddenFileInput.setAttribute("multiple", "multiple"), e.hiddenFileInput.className = "dz-hidden-input", null != e.options.acceptedFiles && e.hiddenFileInput.setAttribute("accept", e.options.acceptedFiles), null != e.options.capture && e.hiddenFileInput.setAttribute("capture", e.options.capture), e.hiddenFileInput.style.visibility = "hidden",
                                    e.hiddenFileInput.style.position = "absolute", e.hiddenFileInput.style.top = "0", e.hiddenFileInput.style.left = "0", e.hiddenFileInput.style.height = "0", e.hiddenFileInput.style.width = "0", document.querySelector(e.options.hiddenInputContainer).appendChild(e.hiddenFileInput), e.hiddenFileInput.addEventListener("change", function() {
                                    var t, n, r, o;
                                    if (n = e.hiddenFileInput.files, n.length)
                                        for (r = 0, o = n.length; r < o; r++) t = n[r], e.addFile(t);
                                    return e.emit("addedfiles", n), i()
                                })
                            }
                        }(this))(), this.URL = null != (s = window.URL) ? s : window.webkitURL, a = this.events, r = 0, o = a.length; r < o; r++) e = a[r], this.on(e, this.options[e]);
                        return this.on("uploadprogress", function(e) {
                            return function() {
                                return e.updateTotalUploadProgress()
                            }
                        }(this)), this.on("removedfile", function(e) {
                            return function() {
                                return e.updateTotalUploadProgress()
                            }
                        }(this)), this.on("canceled", function(e) {
                            return function(t) {
                                return e.emit("complete", t)
                            }
                        }(this)), this.on("complete", function(e) {
                            return function(t) {
                                if (0 === e.getAddedFiles().length && 0 === e.getUploadingFiles().length && 0 === e.getQueuedFiles().length) return setTimeout(function() {
                                    return e.emit("queuecomplete")
                                }, 0)
                            }
                        }(this)), n = function(e) {
                            return e.stopPropagation(), e.preventDefault ? e.preventDefault() : e.returnValue = !1
                        }, this.listeners = [{
                            element: this.element,
                            events: {
                                dragstart: function(e) {
                                    return function(t) {
                                        return e.emit("dragstart", t)
                                    }
                                }(this),
                                dragenter: function(e) {
                                    return function(t) {
                                        return n(t), e.emit("dragenter", t)
                                    }
                                }(this),
                                dragover: function(e) {
                                    return function(t) {
                                        var i;
                                        try {
                                            i = t.dataTransfer.effectAllowed
                                        } catch (e) {}
                                        return t.dataTransfer.dropEffect = "move" === i || "linkMove" === i ? "move" : "copy", n(t), e.emit("dragover", t)
                                    }
                                }(this),
                                dragleave: function(e) {
                                    return function(t) {
                                        return e.emit("dragleave", t)
                                    }
                                }(this),
                                drop: function(e) {
                                    return function(t) {
                                        return n(t), e.drop(t)
                                    }
                                }(this),
                                dragend: function(e) {
                                    return function(t) {
                                        return e.emit("dragend", t)
                                    }
                                }(this)
                            }
                        }], this.clickableElements.forEach(function(e) {
                            return function(n) {
                                return e.listeners.push({
                                    element: n,
                                    events: {
                                        click: function(i) {
                                            return (n !== e.element || i.target === e.element || t.elementInside(i.target, e.element.querySelector(".dz-message"))) && e.hiddenFileInput.click(), !0
                                        }
                                    }
                                })
                            }
                        }(this)), this.enable(), this.options.init.call(this)
                    }, t.prototype.destroy = function() {
                        var e;
                        return this.disable(), this.removeAllFiles(!0), (null != (e = this.hiddenFileInput) ? e.parentNode : void 0) && (this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput), this.hiddenFileInput = null), delete this.element.dropzone, t.instances.splice(t.instances.indexOf(this), 1)
                    }, t.prototype.updateTotalUploadProgress = function() {
                        var e, t, n, i, r, o, s, a;
                        if (i = 0, n = 0, e = this.getActiveFiles(), e.length) {
                            for (a = this.getActiveFiles(), o = 0, s = a.length; o < s; o++) t = a[o], i += t.upload.bytesSent, n += t.upload.total;
                            r = 100 * i / n
                        } else r = 100;
                        return this.emit("totaluploadprogress", r, n, i)
                    }, t.prototype._getParamName = function(e) {
                        return "function" == typeof this.options.paramName ? this.options.paramName(e) : "" + this.options.paramName + (this.options.uploadMultiple ? "[" + e + "]" : "")
                    }, t.prototype._renameFilename = function(e) {
                        return "function" != typeof this.options.renameFilename ? e : this.options.renameFilename(e)
                    }, t.prototype.getFallbackForm = function() {
                        var e, n, i, r;
                        return (e = this.getExistingFallback()) ? e : (i = '<div class="dz-fallback">', this.options.dictFallbackText && (i += "<p>" + this.options.dictFallbackText + "</p>"), i += '<input type="file" name="' + this._getParamName(0) + '" ' + (this.options.uploadMultiple ? 'multiple="multiple"' : void 0) + ' /><input type="submit" value="Upload!"></div>', n = t.createElement(i), "FORM" !== this.element.tagName ? (r = t.createElement('<form action="' + this.options.url + '" enctype="multipart/form-data" method="' + this.options.method + '"></form>'), r.appendChild(n)) : (this.element.setAttribute("enctype", "multipart/form-data"), this.element.setAttribute("method", this.options.method)), null != r ? r : n)
                    }, t.prototype.getExistingFallback = function() {
                        var e, t, n, i, r, o;
                        for (t = function(e) {
                            var t, n, i;
                            for (n = 0, i = e.length; n < i; n++)
                                if (t = e[n], /(^| )fallback($| )/.test(t.className)) return t
                        }, o = ["div", "form"], i = 0, r = o.length; i < r; i++)
                            if (n = o[i], e = t(this.element.getElementsByTagName(n))) return e
                    }, t.prototype.setupEventListeners = function() {
                        var e, t, n, i, r, o, s;
                        for (o = this.listeners, s = [], i = 0, r = o.length; i < r; i++) e = o[i], s.push(function() {
                            var i, r;
                            i = e.events, r = [];
                            for (t in i) n = i[t], r.push(e.element.addEventListener(t, n, !1));
                            return r
                        }());
                        return s
                    }, t.prototype.removeEventListeners = function() {
                        var e, t, n, i, r, o, s;
                        for (o = this.listeners, s = [], i = 0, r = o.length; i < r; i++) e = o[i], s.push(function() {
                            var i, r;
                            i = e.events, r = [];
                            for (t in i) n = i[t], r.push(e.element.removeEventListener(t, n, !1));
                            return r
                        }());
                        return s
                    }, t.prototype.disable = function() {
                        var e, t, n, i, r;
                        for (this.clickableElements.forEach(function(e) {
                            return e.classList.remove("dz-clickable")
                        }), this.removeEventListeners(), i = this.files, r = [], t = 0, n = i.length; t < n; t++) e = i[t], r.push(this.cancelUpload(e));
                        return r
                    }, t.prototype.enable = function() {
                        return this.clickableElements.forEach(function(e) {
                            return e.classList.add("dz-clickable")
                        }), this.setupEventListeners()
                    }, t.prototype.filesize = function(e) {
                        var t, n, i, r, o, s, a, l;
                        if (i = 0, r = "b", e > 0) {
                            for (s = ["TB", "GB", "MB", "KB", "b"], n = a = 0, l = s.length; a < l; n = ++a)
                                if (o = s[n], t = Math.pow(this.options.filesizeBase, 4 - n) / 10, e >= t) {
                                    i = e / Math.pow(this.options.filesizeBase, 4 - n), r = o;
                                    break
                                }
                            i = Math.round(10 * i) / 10
                        }
                        return "<strong>" + i + "</strong> " + r
                    }, t.prototype._updateMaxFilesReachedClass = function() {
                        return null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (this.getAcceptedFiles().length === this.options.maxFiles && this.emit("maxfilesreached", this.files), this.element.classList.add("dz-max-files-reached")) : this.element.classList.remove("dz-max-files-reached")
                    }, t.prototype.drop = function(e) {
                        var t, n;
                        e.dataTransfer && (this.emit("drop", e), t = e.dataTransfer.files, this.emit("addedfiles", t), t.length && (n = e.dataTransfer.items, n && n.length && null != n[0].webkitGetAsEntry ? this._addFilesFromItems(n) : this.handleFiles(t)))
                    }, t.prototype.paste = function(e) {
                        var t, n;
                        if (null != (null != e && null != (n = e.clipboardData) ? n.items : void 0)) return this.emit("paste", e), t = e.clipboardData.items, t.length ? this._addFilesFromItems(t) : void 0
                    }, t.prototype.handleFiles = function(e) {
                        var t, n, i, r;
                        for (r = [], n = 0, i = e.length; n < i; n++) t = e[n], r.push(this.addFile(t));
                        return r
                    }, t.prototype._addFilesFromItems = function(e) {
                        var t, n, i, r, o;
                        for (o = [], i = 0, r = e.length; i < r; i++) n = e[i], null != n.webkitGetAsEntry && (t = n.webkitGetAsEntry()) ? t.isFile ? o.push(this.addFile(n.getAsFile())) : t.isDirectory ? o.push(this._addFilesFromDirectory(t, t.name)) : o.push(void 0) : null != n.getAsFile && (null == n.kind || "file" === n.kind) ? o.push(this.addFile(n.getAsFile())) : o.push(void 0);
                        return o
                    }, t.prototype._addFilesFromDirectory = function(e, t) {
                        var n, i, r;
                        return n = e.createReader(), i = function(e) {
                            return "undefined" != typeof console && null !== console && "function" == typeof console.log ? console.log(e) : void 0
                        }, (r = function(e) {
                            return function() {
                                return n.readEntries(function(n) {
                                    var i, o, s;
                                    if (n.length > 0) {
                                        for (o = 0, s = n.length; o < s; o++) i = n[o], i.isFile ? i.file(function(n) {
                                            if (!e.options.ignoreHiddenFiles || "." !== n.name.substring(0, 1)) return n.fullPath = "" + t + "/" + n.name, e.addFile(n)
                                        }) : i.isDirectory && e._addFilesFromDirectory(i, "" + t + "/" + i.name);
                                        r()
                                    }
                                    return null
                                }, i)
                            }
                        }(this))()
                    }, t.prototype.accept = function(e, n) {
                        return e.size > 1024 * this.options.maxFilesize * 1024 ? n(this.options.dictFileTooBig.replace("{{filesize}}", Math.round(e.size / 1024 / 10.24) / 100).replace("{{maxFilesize}}", this.options.maxFilesize)) : t.isValidFile(e, this.options.acceptedFiles) ? null != this.options.maxFiles && this.getAcceptedFiles().length >= this.options.maxFiles ? (n(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}", this.options.maxFiles)), this.emit("maxfilesexceeded", e)) : this.options.accept.call(this, e, n) : n(this.options.dictInvalidFileType)
                    }, t.prototype.addFile = function(e) {
                        return e.upload = {
                            progress: 0,
                            total: e.size,
                            bytesSent: 0
                        }, this.files.push(e), e.status = t.ADDED, this.emit("addedfile", e), this._enqueueThumbnail(e), this.accept(e, function(t) {
                            return function(n) {
                                return n ? (e.accepted = !1, t._errorProcessing([e], n)) : (e.accepted = !0, t.options.autoQueue && t.enqueueFile(e)), t._updateMaxFilesReachedClass()
                            }
                        }(this))
                    }, t.prototype.enqueueFiles = function(e) {
                        var t, n, i;
                        for (n = 0, i = e.length; n < i; n++) t = e[n], this.enqueueFile(t);
                        return null
                    }, t.prototype.enqueueFile = function(e) {
                        if (e.status !== t.ADDED || e.accepted !== !0) throw new Error("This file can't be queued because it has already been processed or was rejected.");
                        if (e.status = t.QUEUED, this.options.autoProcessQueue) return setTimeout(function(e) {
                            return function() {
                                return e.processQueue()
                            }
                        }(this), 0)
                    }, t.prototype._thumbnailQueue = [], t.prototype._processingThumbnail = !1, t.prototype._enqueueThumbnail = function(e) {
                        if (this.options.createImageThumbnails && e.type.match(/image.*/) && e.size <= 1024 * this.options.maxThumbnailFilesize * 1024) return this._thumbnailQueue.push(e), setTimeout(function(e) {
                            return function() {
                                return e._processThumbnailQueue()
                            }
                        }(this), 0)
                    }, t.prototype._processThumbnailQueue = function() {
                        if (!this._processingThumbnail && 0 !== this._thumbnailQueue.length) return this._processingThumbnail = !0, this.createThumbnail(this._thumbnailQueue.shift(), function(e) {
                            return function() {
                                return e._processingThumbnail = !1, e._processThumbnailQueue()
                            }
                        }(this))
                    }, t.prototype.removeFile = function(e) {
                        if (e.status === t.UPLOADING && this.cancelUpload(e), this.files = l(this.files, e), this.emit("removedfile", e), 0 === this.files.length) return this.emit("reset")
                    }, t.prototype.removeAllFiles = function(e) {
                        var n, i, r, o;
                        for (null == e && (e = !1), o = this.files.slice(), i = 0, r = o.length; i < r; i++) n = o[i], (n.status !== t.UPLOADING || e) && this.removeFile(n);
                        return null
                    }, t.prototype.createThumbnail = function(e, t) {
                        var n;
                        return n = new FileReader, n.onload = function(i) {
                            return function() {
                                return "image/svg+xml" === e.type ? (i.emit("thumbnail", e, n.result), void(null != t && t())) : i.createThumbnailFromUrl(e, n.result, t)
                            }
                        }(this), n.readAsDataURL(e)
                    }, t.prototype.createThumbnailFromUrl = function(e, t, n, i) {
                        var r;
                        return r = document.createElement("img"), i && (r.crossOrigin = i), r.onload = function(t) {
                            return function() {
                                var i, o, a, l, p, d, u, c;
                                if (e.width = r.width, e.height = r.height, a = t.options.resize.call(t, e), null == a.trgWidth && (a.trgWidth = a.optWidth), null == a.trgHeight && (a.trgHeight = a.optHeight), i = document.createElement("canvas"), o = i.getContext("2d"), i.width = a.trgWidth, i.height = a.trgHeight, s(o, r, null != (p = a.srcX) ? p : 0, null != (d = a.srcY) ? d : 0, a.srcWidth, a.srcHeight, null != (u = a.trgX) ? u : 0, null != (c = a.trgY) ? c : 0, a.trgWidth, a.trgHeight), l = i.toDataURL("image/png"), t.emit("thumbnail", e, l), null != n) return n()
                            }
                        }(this), null != n && (r.onerror = n), r.src = t
                    }, t.prototype.processQueue = function() {
                        var e, t, n, i;
                        if (t = this.options.parallelUploads, n = this.getUploadingFiles().length, e = n, !(n >= t) && (i = this.getQueuedFiles(), i.length > 0)) {
                            if (this.options.uploadMultiple) return this.processFiles(i.slice(0, t - n));
                            for (; e < t;) {
                                if (!i.length) return;
                                this.processFile(i.shift()), e++
                            }
                        }
                    }, t.prototype.processFile = function(e) {
                        return this.processFiles([e])
                    }, t.prototype.processFiles = function(e) {
                        var n, i, r;
                        for (i = 0, r = e.length; i < r; i++) n = e[i], n.processing = !0, n.status = t.UPLOADING, this.emit("processing", n);
                        return this.options.uploadMultiple && this.emit("processingmultiple", e), this.uploadFiles(e)
                    }, t.prototype._getFilesWithXhr = function(e) {
                        var t, n;
                        return n = function() {
                            var n, i, r, o;
                            for (r = this.files, o = [], n = 0, i = r.length; n < i; n++) t = r[n], t.xhr === e && o.push(t);
                            return o
                        }.call(this)
                    }, t.prototype.cancelUpload = function(e) {
                        var n, i, r, o, s, a, l;
                        if (e.status === t.UPLOADING) {
                            for (i = this._getFilesWithXhr(e.xhr), r = 0, s = i.length; r < s; r++) n = i[r], n.status = t.CANCELED;
                            for (e.xhr.abort(), o = 0, a = i.length; o < a; o++) n = i[o], this.emit("canceled", n);
                            this.options.uploadMultiple && this.emit("canceledmultiple", i)
                        } else(l = e.status) !== t.ADDED && l !== t.QUEUED || (e.status = t.CANCELED, this.emit("canceled", e), this.options.uploadMultiple && this.emit("canceledmultiple", [e]));
                        if (this.options.autoProcessQueue) return this.processQueue()
                    }, r = function() {
                        var e, t;
                        return t = arguments[0], e = 2 <= arguments.length ? p.call(arguments, 1) : [], "function" == typeof t ? t.apply(this, e) : t
                    }, t.prototype.uploadFile = function(e) {
                        return this.uploadFiles([e])
                    }, t.prototype.uploadFiles = function(e) {
                        var n, o, s, a, l, p, d, u, c, h, f, m, v, g, z, y, b, w, x, F, k, E, C, L, S, T, _, A, M, D, N, O, I, U;
                        for (x = new XMLHttpRequest, F = 0, L = e.length; F < L; F++) n = e[F], n.xhr = x;
                        m = r(this.options.method, e), b = r(this.options.url, e), x.open(m, b, !0), x.withCredentials = !!this.options.withCredentials, z = null, s = function(t) {
                            return function() {
                                var i, r, o;
                                for (o = [], i = 0, r = e.length; i < r; i++) n = e[i], o.push(t._errorProcessing(e, z || t.options.dictResponseError.replace("{{statusCode}}", x.status), x));
                                return o
                            }
                        }(this), y = function(t) {
                            return function(i) {
                                var r, o, s, a, l, p, d, u, c;
                                if (null != i)
                                    for (o = 100 * i.loaded / i.total, s = 0, p = e.length; s < p; s++) n = e[s], n.upload = {
                                        progress: o,
                                        total: i.total,
                                        bytesSent: i.loaded
                                    };
                                else {
                                    for (r = !0, o = 100, a = 0, d = e.length; a < d; a++) n = e[a], 100 === n.upload.progress && n.upload.bytesSent === n.upload.total || (r = !1), n.upload.progress = o, n.upload.bytesSent = n.upload.total;
                                    if (r) return
                                }
                                for (c = [], l = 0, u = e.length; l < u; l++) n = e[l], c.push(t.emit("uploadprogress", n, o, n.upload.bytesSent));
                                return c
                            }
                        }(this), x.onload = function(n) {
                            return function(i) {
                                var r;
                                if (e[0].status !== t.CANCELED && 4 === x.readyState) {
                                    if (z = x.responseText, x.getResponseHeader("content-type") && ~x.getResponseHeader("content-type").indexOf("application/json")) try {
                                        z = JSON.parse(z)
                                    } catch (e) {
                                        i = e, z = "Invalid JSON response from server."
                                    }
                                    return y(), 200 <= (r = x.status) && r < 300 ? n._finished(e, z, i) : s()
                                }
                            }
                        }(this), x.onerror = function(n) {
                            return function() {
                                if (e[0].status !== t.CANCELED) return s()
                            }
                        }(this), g = null != (M = x.upload) ? M : x, g.onprogress = y, p = {
                            Accept: "application/json",
                            "Cache-Control": "no-cache",
                            "X-Requested-With": "XMLHttpRequest"
                        }, this.options.headers && i(p, this.options.headers);
                        for (a in p) l = p[a], l && x.setRequestHeader(a, l);
                        if (o = new FormData, this.options.params) {
                            D = this.options.params;
                            for (f in D) w = D[f], o.append(f, w)
                        }
                        for (k = 0, S = e.length; k < S; k++) n = e[k], this.emit("sending", n, x, o);
                        if (this.options.uploadMultiple && this.emit("sendingmultiple", e, x, o), "FORM" === this.element.tagName)
                            for (N = this.element.querySelectorAll("input, textarea, select, button"), E = 0, T = N.length; E < T; E++)
                                if (u = N[E], c = u.getAttribute("name"), h = u.getAttribute("type"), "SELECT" === u.tagName && u.hasAttribute("multiple"))
                                    for (O = u.options, C = 0, _ = O.length; C < _; C++) v = O[C], v.selected && o.append(c, v.value);
                                else(!h || "checkbox" !== (I = h.toLowerCase()) && "radio" !== I || u.checked) && o.append(c, u.value);
                        for (d = A = 0, U = e.length - 1; 0 <= U ? A <= U : A >= U; d = 0 <= U ? ++A : --A) o.append(this._getParamName(d), e[d], this._renameFilename(e[d].name));
                        return this.submitRequest(x, o, e)
                    }, t.prototype.submitRequest = function(e, t, n) {
                        return e.send(t)
                    }, t.prototype._finished = function(e, n, i) {
                        var r, o, s;
                        for (o = 0, s = e.length; o < s; o++) r = e[o], r.status = t.SUCCESS, this.emit("success", r, n, i), this.emit("complete", r);
                        if (this.options.uploadMultiple && (this.emit("successmultiple", e, n, i), this.emit("completemultiple", e)), this.options.autoProcessQueue) return this.processQueue()
                    }, t.prototype._errorProcessing = function(e, n, i) {
                        var r, o, s;
                        for (o = 0, s = e.length; o < s; o++) r = e[o], r.status = t.ERROR, this.emit("error", r, n, i), this.emit("complete", r);
                        if (this.options.uploadMultiple && (this.emit("errormultiple", e, n, i), this.emit("completemultiple", e)), this.options.autoProcessQueue) return this.processQueue()
                    }, t
                }(n), t.version = "4.3.0", t.options = {}, t.optionsForElement = function(e) {
                    return e.getAttribute("id") ? t.options[i(e.getAttribute("id"))] : void 0
                }, t.instances = [], t.forElement = function(e) {
                    if ("string" == typeof e && (e = document.querySelector(e)), null == (null != e ? e.dropzone : void 0)) throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");
                    return e.dropzone
                }, t.autoDiscover = !0, t.discover = function() {
                    var e, n, i, r, o, s;
                    for (document.querySelectorAll ? i = document.querySelectorAll(".dropzone") : (i = [], e = function(e) {
                        var t, n, r, o;
                        for (o = [], n = 0, r = e.length; n < r; n++) t = e[n], /(^| )dropzone($| )/.test(t.className) ? o.push(i.push(t)) : o.push(void 0);
                        return o
                    }, e(document.getElementsByTagName("div")), e(document.getElementsByTagName("form"))), s = [], r = 0, o = i.length; r < o; r++) n = i[r], t.optionsForElement(n) !== !1 ? s.push(new t(n)) : s.push(void 0);
                    return s
                }, t.blacklistedBrowsers = [/opera.*Macintosh.*version\/12/i], t.isBrowserSupported = function() {
                    var e, n, i, r, o;
                    if (e = !0, window.File && window.FileReader && window.FileList && window.Blob && window.FormData && document.querySelector)
                        if ("classList" in document.createElement("a"))
                            for (o = t.blacklistedBrowsers, i = 0, r = o.length; i < r; i++) n = o[i], n.test(navigator.userAgent) && (e = !1);
                        else e = !1;
                    else e = !1;
                    return e
                }, l = function(e, t) {
                    var n, i, r, o;
                    for (o = [], i = 0, r = e.length; i < r; i++) n = e[i], n !== t && o.push(n);
                    return o
                }, i = function(e) {
                    return e.replace(/[\-_](\w)/g, function(e) {
                        return e.charAt(1).toUpperCase()
                    })
                }, t.createElement = function(e) {
                    var t;
                    return t = document.createElement("div"), t.innerHTML = e, t.childNodes[0]
                }, t.elementInside = function(e, t) {
                    if (e === t) return !0;
                    for (; e = e.parentNode;)
                        if (e === t) return !0;
                    return !1
                }, t.getElement = function(e, t) {
                    var n;
                    if ("string" == typeof e ? n = document.querySelector(e) : null != e.nodeType && (n = e), null == n) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector or a plain HTML element.");
                    return n
                }, t.getElements = function(e, t) {
                    var n, i, r, o, s, a, l, p;
                    if (e instanceof Array) {
                        r = [];
                        try {
                            for (o = 0, a = e.length; o < a; o++) i = e[o], r.push(this.getElement(i, t))
                        } catch (e) {
                            n = e, r = null
                        }
                    } else if ("string" == typeof e)
                        for (r = [], p = document.querySelectorAll(e), s = 0, l = p.length; s < l; s++) i = p[s], r.push(i);
                    else null != e.nodeType && (r = [e]);
                    if (null == r || !r.length) throw new Error("Invalid `" + t + "` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");
                    return r
                }, t.confirm = function(e, t, n) {
                    return window.confirm(e) ? t() : null != n ? n() : void 0
                }, t.isValidFile = function(e, t) {
                    var n, i, r, o, s;
                    if (!t) return !0;
                    for (t = t.split(","), i = e.type, n = i.replace(/\/.*$/, ""), o = 0, s = t.length; o < s; o++)
                        if (r = t[o], r = r.trim(), "." === r.charAt(0)) {
                            if (e.name.toLowerCase().indexOf(r.toLowerCase(), e.name.length - r.length) !== -1) return !0
                        } else if (/\/\*$/.test(r)) {
                            if (n === r.replace(/\/.*$/, "")) return !0
                        } else if (i === r) return !0;
                    return !1
                }, "undefined" != typeof jQuery && null !== jQuery && (jQuery.fn.dropzone = function(e) {
                    return this.each(function() {
                        return new t(this, e)
                    })
                }), "undefined" != typeof e && null !== e ? e.exports = t : window.Dropzone = t, t.ADDED = "added", t.QUEUED = "queued", t.ACCEPTED = t.QUEUED, t.UPLOADING = "uploading", t.PROCESSING = t.UPLOADING, t.CANCELED = "canceled", t.ERROR = "error", t.SUCCESS = "success", o = function(e) {
                    var t, n, i, r, o, s, a, l, p, d;
                    for (a = e.naturalWidth, s = e.naturalHeight, n = document.createElement("canvas"), n.width = 1, n.height = s, i = n.getContext("2d"), i.drawImage(e, 0, 0), r = i.getImageData(0, 0, 1, s).data, d = 0, o = s, l = s; l > d;) t = r[4 * (l - 1) + 3], 0 === t ? o = l : d = l, l = o + d >> 1;
                    return p = l / s, 0 === p ? 1 : p
                }, s = function(e, t, n, i, r, s, a, l, p, d) {
                    var u;
                    return u = o(t), e.drawImage(t, n, i, r, s, a, l, p, d / u)
                }, r = function(e, t) {
                    var n, i, r, o, s, a, l, p, d;
                    if (r = !1, d = !0, i = e.document, p = i.documentElement, n = i.addEventListener ? "addEventListener" : "attachEvent", l = i.addEventListener ? "removeEventListener" : "detachEvent", a = i.addEventListener ? "" : "on", o = function(n) {
                            if ("readystatechange" !== n.type || "complete" === i.readyState) return ("load" === n.type ? e : i)[l](a + n.type, o, !1), !r && (r = !0) ? t.call(e, n.type || n) : void 0
                        }, s = function() {
                            var e;
                            try {
                                p.doScroll("left")
                            } catch (t) {
                                return e = t, void setTimeout(s, 50)
                            }
                            return o("poll")
                        }, "complete" !== i.readyState) {
                        if (i.createEventObject && p.doScroll) {
                            try {
                                d = !e.frameElement
                            } catch (e) {}
                            d && s()
                        }
                        return i[n](a + "DOMContentLoaded", o, !1), i[n](a + "readystatechange", o, !1), e[n](a + "load", o, !1)
                    }
                }, t._autoDiscoverFunction = function() {
                    if (t.autoDiscover) return t.discover()
                }, r(window, t._autoDiscoverFunction)
            }).call(this)
        }).call(t, n(46)(e))
    }, function(e, t) {
        e.exports = " <div> <form :action=url class=dropzone :id=id> </form> </div> "
    }, function(e, t, n) {
        function i(e, t) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n],
                    r = u[i.id];
                if (r) {
                    r.refs++;
                    for (var o = 0; o < r.parts.length; o++) r.parts[o](i.parts[o]);
                    for (; o < i.parts.length; o++) r.parts.push(l(i.parts[o], t))
                } else {
                    for (var s = [], o = 0; o < i.parts.length; o++) s.push(l(i.parts[o], t));
                    u[i.id] = {
                        id: i.id,
                        refs: 1,
                        parts: s
                    }
                }
            }
        }

        function r(e) {
            for (var t = [], n = {}, i = 0; i < e.length; i++) {
                var r = e[i],
                    o = r[0],
                    s = r[1],
                    a = r[2],
                    l = r[3],
                    p = {
                        css: s,
                        media: a,
                        sourceMap: l
                    };
                n[o] ? n[o].parts.push(p) : t.push(n[o] = {
                    id: o,
                    parts: [p]
                })
            }
            return t
        }

        function o(e, t) {
            var n = f(),
                i = g[g.length - 1];
            if ("top" === e.insertAt) i ? i.nextSibling ? n.insertBefore(t, i.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild), g.push(t);
            else {
                if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                n.appendChild(t)
            }
        }

        function s(e) {
            e.parentNode.removeChild(e);
            var t = g.indexOf(e);
            t >= 0 && g.splice(t, 1)
        }

        function a(e) {
            var t = document.createElement("style");
            return t.type = "text/css", o(e, t), t
        }

        function l(e, t) {
            var n, i, r;
            if (t.singleton) {
                var o = v++;
                n = m || (m = a(t)), i = p.bind(null, n, o, !1), r = p.bind(null, n, o, !0)
            } else n = a(t), i = d.bind(null, n), r = function() {
                s(n)
            };
            return i(e),
                function(t) {
                    if (t) {
                        if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                        i(e = t)
                    } else r()
                }
        }

        function p(e, t, n, i) {
            var r = n ? "" : i.css;
            if (e.styleSheet) e.styleSheet.cssText = z(t, r);
            else {
                var o = document.createTextNode(r),
                    s = e.childNodes;
                s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(o, s[t]) : e.appendChild(o)
            }
        }

        function d(e, t) {
            var n = t.css,
                i = t.media,
                r = t.sourceMap;
            if (i && e.setAttribute("media", i), r && (n += "\n/*# sourceURL=" + r.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(r)))) + " */"), e.styleSheet) e.styleSheet.cssText = n;
            else {
                for (; e.firstChild;) e.removeChild(e.firstChild);
                e.appendChild(document.createTextNode(n))
            }
        }
        var u = {},
            c = function(e) {
                var t;
                return function() {
                    return "undefined" == typeof t && (t = e.apply(this, arguments)), t
                }
            },
            h = c(function() {
                return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())
            }),
            f = c(function() {
                return document.head || document.getElementsByTagName("head")[0]
            }),
            m = null,
            v = 0,
            g = [];
        e.exports = function(e, t) {
            t = t || {}, "undefined" == typeof t.singleton && (t.singleton = h()), "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
            var n = r(e);
            return i(n, t),
                function(e) {
                    for (var o = [], s = 0; s < n.length; s++) {
                        var a = n[s],
                            l = u[a.id];
                        l.refs--, o.push(l)
                    }
                    if (e) {
                        var p = r(e);
                        i(p, t)
                    }
                    for (var s = 0; s < o.length; s++) {
                        var l = o[s];
                        if (0 === l.refs) {
                            for (var d = 0; d < l.parts.length; d++) l.parts[d]();
                            delete u[l.id]
                        }
                    }
                }
        };
        var z = function() {
            var e = [];
            return function(t, n) {
                return e[t] = n, e.filter(Boolean).join("\n")
            }
        }()
    }, function(e, t, n) {
        var i = n(41);
        "string" == typeof i && (i = [
            [e.id, i, ""]
        ]);
        n(44)(i, {});
        i.locals && (e.exports = i.locals)
    }, function(e, t) {
        e.exports = function(e) {
            return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children = [], e.webpackPolyfill = 1), e
        }
    }])
});