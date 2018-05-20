var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var event;
        (function (event) {
            var Event = (function () {
                function Event(type) {
                    this.type = type;
                }
                Event.COMPLETE = "complete";
                Event.CHANGE = "change";
                return Event;
            }());
            event.Event = Event;
        })(event = enirva.event || (enirva.event = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var event;
        (function (event) {
            var EventDispatcher = (function () {
                function EventDispatcher() {
                    this.listeners = new Array();
                    this.useDeltaTime = false;
                }
                EventDispatcher.prototype.addEventListener = function (type, func, scope) {
                    if (scope === void 0) { scope = null; }
                    if (!this.listeners) {
                        this.listeners = new Array();
                    }
                    this.listeners.push({ type: type, func: func, scope: scope });
                };
                EventDispatcher.prototype.removeEventListener = function (type, func) {
                    var ls = this.listeners;
                    var tmp = new Array();
                    for (var i = 0, ln = ls.length; i < ln; i++) {
                        var ob = ls[i];
                        if (ob.type != type || ob.func != func) {
                            tmp.push(ob);
                        }
                    }
                    this.listeners = tmp;
                };
                EventDispatcher.prototype.removeAllEventListener = function () {
                    this.listeners = new Array();
                };
                EventDispatcher.prototype.dispatchEvent = function (evt) {
                    var ls = this.listeners;
                    if (!ls)
                        return;
                    for (var i = 0, ln = ls.length; i < ln; i++) {
                        var ob = ls[i];
                        if (ob.type == evt.type) {
                            evt.target = this;
                            if (ob.scope) {
                                ob.func.call(ob.scope, evt);
                            }
                            else {
                                ob.func(evt);
                            }
                        }
                    }
                };
                Object.defineProperty(EventDispatcher.prototype, "onEnterFrame", {
                    set: function (func) {
                        if (this.enterFrameFunc) {
                            this.deleteEnterFrame;
                        }
                        this.enterFrameFunc = func;
                        var scope = this;
                        if (this.useDeltaTime) {
                            if (!this.isEnterFrame) {
                                this.isEnterFrame = true;
                                var current = new Date().getTime();
                                (function loop() {
                                    if (!scope.enterFrameFunc) {
                                        scope.isEnterFrame = false;
                                        return;
                                    }
                                    var tmp = new Date().getTime();
                                    var deltaTime = tmp - current;
                                    if (deltaTime < 0) {
                                        deltaTime = 1;
                                    }
                                    scope.enterFrameFunc(deltaTime);
                                    current = tmp;
                                    scope.intervalTimer = requestAnimationFrame(function () { return loop(); });
                                })();
                            }
                        }
                        else {
                            if (!this.isEnterFrame) {
                                this.isEnterFrame = true;
                                (function loop() {
                                    if (!scope.enterFrameFunc) {
                                        scope.isEnterFrame = false;
                                        return;
                                    }
                                    scope.enterFrameFunc();
                                    scope.intervalTimer = requestAnimationFrame(function () { return loop(); });
                                })();
                            }
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(EventDispatcher.prototype, "deleteEnterFrame", {
                    get: function () {
                        this.isEnterFrame = false;
                        this.enterFrameFunc = null;
                        cancelAnimationFrame(this.intervalTimer);
                        this.intervalTimer = null;
                        return true;
                    },
                    enumerable: true,
                    configurable: true
                });
                return EventDispatcher;
            }());
            event.EventDispatcher = EventDispatcher;
        })(event = enirva.event || (enirva.event = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var debug;
        (function (debug) {
            var EventDispatcher = com.enirva.event.EventDispatcher;
            var Debugger = (function (_super) {
                __extends(Debugger, _super);
                function Debugger() {
                    _super.apply(this, arguments);
                }
                Debugger.initialize = function (container) {
                    if (Debugger.initialized) {
                        return;
                    }
                    if (Debugger._instance == null) {
                        Debugger._instance = new Debugger();
                        Debugger._instance.logText = "";
                    }
                    Debugger.isDebug = true;
                    var tag = document.createElement("div");
                    tag.setAttribute("id", "ENIRVA_Debugger");
                    tag.style.position = "absolute";
                    tag.style.right = "0";
                    tag.style.top = "0";
                    tag.style.zIndex = "99999";
                    tag.style.margin = "0";
                    tag.style.padding = "5px";
                    tag.style.background = "rgba(30, 30, 30, 0.75)";
                    tag.style.minWidth = "100px";
                    var hideContainer = document.createElement("div");
                    var fps = document.createElement("p");
                    fps.style.padding = "5px";
                    fps.style.margin = "0";
                    fps.style.fontSize = Debugger.fontSize;
                    fps.style.color = Debugger.fontColor;
                    fps.style.lineHeight = "1.5";
                    fps.innerHTML = "fps:0";
                    var input = document.createElement("input");
                    input.setAttribute("type", "button");
                    input.setAttribute("value", "clear");
                    input.onclick = function () {
                        Debugger.clear();
                    };
                    var inputT1 = document.createElement("input");
                    inputT1.setAttribute("type", "text");
                    var inputT2 = document.createElement("input");
                    inputT2.setAttribute("type", "text");
                    var inputT3 = document.createElement("input");
                    inputT3.setAttribute("type", "text");
                    var inputT4 = document.createElement("input");
                    inputT4.setAttribute("type", "text");
                    var div1 = document.createElement("div");
                    var div2 = document.createElement("div");
                    var div3 = document.createElement("div");
                    var div4 = document.createElement("div");
                    var log = document.createElement("p");
                    log.style.padding = "5px";
                    log.style.margin = "0";
                    log.style.fontSize = Debugger.fontSize;
                    log.style.color = Debugger.fontColor;
                    log.style.lineHeight = "1.5";
                    tag.appendChild(fps);
                    tag.appendChild(hideContainer);
                    hideContainer.appendChild(input);
                    hideContainer.appendChild(div1);
                    hideContainer.appendChild(div2);
                    hideContainer.appendChild(div3);
                    hideContainer.appendChild(div4);
                    div1.appendChild(inputT1);
                    div2.appendChild(inputT2);
                    div3.appendChild(inputT3);
                    div4.appendChild(inputT4);
                    hideContainer.appendChild(log);
                    Debugger._instance.logTag = log;
                    Debugger._instance.fpsTag = fps;
                    Debugger._instance.inputText1 = inputT1;
                    Debugger._instance.inputText2 = inputT2;
                    Debugger._instance.inputText3 = inputT3;
                    Debugger._instance.inputText4 = inputT4;
                    Debugger._instance.minimizeHideContainer = hideContainer;
                    Debugger._instance.recFps();
                    container.appendChild(tag);
                    Debugger.initialized = true;
                };
                Object.defineProperty(Debugger, "isMinimize", {
                    get: function () {
                        return Debugger._isMinimize;
                    },
                    set: function (value) {
                        Debugger._isMinimize = value;
                        if (value) {
                            Debugger._instance.minimizeHideContainer.style.display = "none";
                        }
                        else {
                            Debugger._instance.minimizeHideContainer.style.display = "block";
                        }
                    },
                    enumerable: true,
                    configurable: true
                });
                Debugger.text = function (index, str) {
                    if (!Debugger._instance)
                        return;
                    if (Debugger.isMinimize)
                        return;
                    if (index == 0) {
                        $(Debugger._instance.inputText1).val(str);
                    }
                    else if (index == 1) {
                        $(Debugger._instance.inputText2).val(str);
                    }
                    else if (index == 2) {
                        $(Debugger._instance.inputText3).val(str);
                    }
                    else if (index == 3) {
                        $(Debugger._instance.inputText4).val(str);
                    }
                    else {
                        console.log(str);
                    }
                };
                Debugger.log = function (msg) {
                    if (Debugger.isDebug) {
                        console.log(msg);
                        Debugger._instance.logText += msg + "<br>";
                        Debugger._instance.update();
                    }
                };
                Debugger.clear = function () {
                    if (Debugger.isDebug) {
                        console.log("clear ok");
                        Debugger._instance.logText = "";
                        Debugger._instance.update();
                    }
                };
                Debugger.prototype.update = function () {
                    var deb = Debugger._instance;
                    deb.logTag.innerHTML = deb.logText;
                };
                Debugger.prototype.recFps = function () {
                    this.useDeltaTime = true;
                    var t = 0;
                    var cc = 0;
                    var tag = this.fpsTag;
                    this.onEnterFrame = function (deltaTime) {
                        cc++;
                        if ((t += deltaTime) >= 1000) {
                            tag.innerHTML = "fps:" + cc.toString();
                            t = 0;
                            cc = 0;
                        }
                    };
                };
                Debugger.fontSize = "0.6em";
                Debugger.fontColor = "#fff";
                return Debugger;
            }(EventDispatcher));
            debug.Debugger = Debugger;
        })(debug = enirva.debug || (enirva.debug = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var debug;
        (function (debug) {
            var EventDispatcher = com.enirva.event.EventDispatcher;
            var Controller = (function (_super) {
                __extends(Controller, _super);
                function Controller(_bindableObject) {
                    _super.call(this);
                    this.bindableObject = _bindableObject;
                    this.values = [];
                    this.setEvent("rotationY", 0.1);
                    this.setEvent("z", 0.1);
                    this.setEvent("x", 0.1);
                    this.setEvent("camX", 0.1);
                    this.setEvent("camY", 0.1);
                    this.setEvent("camZ", 0.1);
                    this.setEvent("lightX", 0.1);
                    this.setEvent("lightY", 0.1);
                    this.setEvent("lightZ", 0.1);
                    this.setEvent("light2X", 0.1);
                    this.setEvent("light2Y", 0.1);
                    this.setEvent("light2Z", 0.1);
                    this.normalMode();
                    var scope = this;
                    this.onEnterFrame = function () {
                        if (scope.updateFunc) {
                            scope.updateFunc();
                        }
                    };
                    $(".controller").css("display", "block");
                }
                Controller.prototype.setEvent = function (elm, value) {
                    var bindableObj = this.bindableObject;
                    var scope = this;
                    $("." + elm + "0").bind("mousedown", function () {
                        scope.update(elm, value);
                    });
                    $("." + elm + "1").bind("mousedown", function () {
                        scope.update(elm, -value);
                    });
                    this.values.push(elm);
                };
                Controller.prototype.update = function (elm, value) {
                    var scope = this;
                    var bindableObj = this.bindableObject;
                    this.updateFunc = function () {
                        bindableObj[elm] += value;
                        $("." + elm).text(scope.bindableObject[elm]);
                    };
                    $(window).bind("mouseup", function () {
                        scope.normalMode();
                        $(window).unbind("mouseup");
                    });
                };
                Controller.prototype.normalMode = function () {
                    var scope = this;
                    this.updateFunc = function () {
                        for (var i = 0; i < scope.values.length; i++) {
                            var elm = scope.values[i];
                            $("." + elm).text(scope.bindableObject[elm]);
                        }
                    };
                };
                return Controller;
            }(EventDispatcher));
            debug.Controller = Controller;
        })(debug = enirva.debug || (enirva.debug = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var event;
        (function (event) {
            var MouseEvent = (function () {
                function MouseEvent(type) {
                    this.type = type;
                }
                MouseEvent.CLICK = "click";
                return MouseEvent;
            }());
            event.MouseEvent = MouseEvent;
        })(event = enirva.event || (enirva.event = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var net;
        (function (net) {
            var EventDispatcher = com.enirva.event.EventDispatcher;
            var Event = com.enirva.event.Event;
            var URLLoader = (function (_super) {
                __extends(URLLoader, _super);
                function URLLoader() {
                    _super.call(this);
                }
                URLLoader.prototype.load = function (request) {
                    var scope = this;
                    $(function () {
                        $.ajax({
                            url: request.url,
                            type: "GET",
                            dataType: "html",
                            timeout: 2000,
                            error: function () {
                                console.log("load error");
                            },
                            success: function (text) {
                                scope.data = text;
                                var evt = new Event(Event.COMPLETE);
                                scope.dispatchEvent(evt);
                            }
                        });
                    });
                };
                return URLLoader;
            }(EventDispatcher));
            net.URLLoader = URLLoader;
        })(net = enirva.net || (enirva.net = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var net;
        (function (net) {
            var URLRequest = (function () {
                function URLRequest(url) {
                    if (url === void 0) { url = null; }
                    this.url = url;
                }
                return URLRequest;
            }());
            net.URLRequest = URLRequest;
        })(net = enirva.net || (enirva.net = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var net;
        (function (net) {
            var EventDispatcher = com.enirva.event.EventDispatcher;
            var Event = com.enirva.event.Event;
            var MultipleLoader = (function (_super) {
                __extends(MultipleLoader, _super);
                function MultipleLoader() {
                    _super.call(this);
                    this.percent = 0;
                    this.loadIndex = 0;
                    this.textRequests = {};
                    this.textRequestsArray = [];
                }
                MultipleLoader.prototype.addRequestURL = function (urls) {
                    for (var i = 0, ln = urls.length; i < ln; i++) {
                        var url = urls[i];
                        this.textRequests[url] = url;
                        this.textRequestsArray.push(url);
                    }
                };
                MultipleLoader.prototype.load = function () {
                    if (this.isParallel) {
                        if (this.textRequestsArray.length > 0) {
                            for (var i = 0, ln = this.textRequestsArray.length; i < ln; i++) {
                                this.loadTextParallel(i);
                            }
                        }
                    }
                    else {
                        if (this.textRequestsArray.length > 0) {
                            this.loadText();
                        }
                    }
                };
                MultipleLoader.prototype.loadText = function () {
                    var scope = this;
                    var url = this.textRequestsArray[this.loadIndex];
                    var req = new net.URLRequest(url);
                    var loader = new net.URLLoader();
                    loader.addEventListener(Event.COMPLETE, function (e) {
                        scope.completeHandler(url, loader.data);
                    });
                    loader.load(req);
                };
                MultipleLoader.prototype.completeHandler = function (url, data) {
                    this.textRequests[url] = data;
                    ++this.loadIndex;
                    var ln = this.textRequestsArray.length;
                    this.percent = this.loadIndex / ln;
                    if (this.loadIndex >= ln) {
                        var evt = new Event(Event.COMPLETE);
                        this.dispatchEvent(evt);
                    }
                    else {
                        this.loadText();
                    }
                };
                MultipleLoader.prototype.loadTextParallel = function (index) {
                    var scope = this;
                    var url = this.textRequestsArray[index];
                    var req = new net.URLRequest(url);
                    var loader = new net.URLLoader();
                    loader.addEventListener(Event.COMPLETE, function (e) {
                        scope.completeHandlerParallel(url, loader.data);
                    });
                    loader.load(req);
                };
                MultipleLoader.prototype.completeHandlerParallel = function (url, data) {
                    this.textRequests[url] = data;
                    ++this.loadIndex;
                    var ln = this.textRequestsArray.length;
                    this.percent = this.loadIndex / ln;
                    if (this.loadIndex >= ln) {
                        var evt = new Event(Event.COMPLETE);
                        this.dispatchEvent(evt);
                    }
                };
                return MultipleLoader;
            }(EventDispatcher));
            net.MultipleLoader = MultipleLoader;
        })(net = enirva.net || (enirva.net = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var util;
        (function (util) {
            var UserAgent = (function () {
                function UserAgent() {
                    var agent = navigator.userAgent;
                    this.isIOS = agent.indexOf('iPhone') > -1 || agent.indexOf('iPod') > -1 || agent.indexOf('iPad') > -1;
                    this.isAndroid = agent.indexOf('Android') > -1;
                }
                Object.defineProperty(UserAgent, "instance", {
                    get: function () {
                        if (UserAgent._instance == null) {
                            UserAgent._instance = new UserAgent();
                        }
                        return UserAgent._instance;
                    },
                    enumerable: true,
                    configurable: true
                });
                return UserAgent;
            }());
            util.UserAgent = UserAgent;
        })(util = enirva.util || (enirva.util = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var webgl;
        (function (webgl) {
            var core;
            (function (core) {
                var WebGLContext = (function () {
                    function WebGLContext(containerId, w, h) {
                        var canvas = document.createElement("canvas");
                        canvas.setAttribute("width", w.toString());
                        canvas.setAttribute("height", h.toString());
                        document.getElementById(containerId).appendChild(canvas);
                        var gl = (canvas.getContext("webgl")
                            || canvas.getContext("experimental-webgl"));
                        gl.clearColor(0.0, 0.0, 0.0, 1.0);
                        gl.enable(gl.DEPTH_TEST);
                        this.gl = gl;
                        this.canvas = canvas;
                        this.programs = [];
                    }
                    WebGLContext.prototype.linkProgram = function (vShader, fShader) {
                        var gl = this.gl;
                        var fragmentShader = this.getShader(vShader, gl.VERTEX_SHADER);
                        var vertexShader = this.getShader(fShader, gl.FRAGMENT_SHADER);
                        var shaderProgram = gl.createProgram();
                        gl.attachShader(shaderProgram, vertexShader);
                        gl.attachShader(shaderProgram, fragmentShader);
                        gl.linkProgram(shaderProgram);
                        gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
                        gl.useProgram(shaderProgram);
                        this.program = shaderProgram;
                        this.programs.push(shaderProgram);
                    };
                    WebGLContext.prototype.addProgram = function (vShader, fShader) {
                        var gl = this.gl;
                        var fragmentShader = this.getShader(vShader, gl.VERTEX_SHADER);
                        var vertexShader = this.getShader(fShader, gl.FRAGMENT_SHADER);
                        var shaderProgram = gl.createProgram();
                        gl.attachShader(shaderProgram, vertexShader);
                        gl.attachShader(shaderProgram, fragmentShader);
                        gl.linkProgram(shaderProgram);
                        gl.getProgramParameter(shaderProgram, gl.LINK_STATUS);
                        this.programs.push(shaderProgram);
                    };
                    WebGLContext.prototype.changeProgram = function (index) {
                        this.program = this.programs[index];
                        this.gl.useProgram(this.program);
                    };
                    WebGLContext.prototype.getShader = function (text, type) {
                        var gl = this.gl;
                        var shader = shader = gl.createShader(type);
                        gl.shaderSource(shader, text);
                        gl.compileShader(shader);
                        gl.getShaderParameter(shader, gl.COMPILE_STATUS);
                        return shader;
                    };
                    return WebGLContext;
                }());
                core.WebGLContext = WebGLContext;
            })(core = webgl.core || (webgl.core = {}));
        })(webgl = enirva.webgl || (enirva.webgl = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var webgl;
        (function (webgl) {
            var net;
            (function (net) {
                var MultipleLwoLoader = (function () {
                    function MultipleLwoLoader() {
                    }
                    return MultipleLwoLoader;
                }());
                net.MultipleLwoLoader = MultipleLwoLoader;
            })(net = webgl.net || (webgl.net = {}));
        })(webgl = enirva.webgl || (enirva.webgl = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
var com;
(function (com) {
    var enirva;
    (function (enirva) {
        var webgl;
        (function (webgl) {
            var util;
            (function (util) {
                var Utils = (function () {
                    function Utils() {
                    }
                    Utils.setAttribute = function (gl, vbo, attL, attS) {
                        for (var i in vbo) {
                            gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
                            gl.enableVertexAttribArray(attL[i]);
                            gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
                        }
                    };
                    Utils.createSaveBufferFloat = function (gl, data) {
                        var buffer = gl.createBuffer();
                        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
                        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
                        return buffer;
                    };
                    Utils.createSaveBufferUint = function (gl, data) {
                        var buffer = gl.createBuffer();
                        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
                        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), gl.STATIC_DRAW);
                        return buffer;
                    };
                    Utils.handleLoadedTexture = function (gl, texture, img) {
                        gl.bindTexture(gl.TEXTURE_2D, texture);
                        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
                        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                        gl.bindTexture(gl.TEXTURE_2D, null);
                    };
                    Utils.createUniform = function (gl, program, name) {
                        var uniform = gl.getUniformLocation(program, name);
                        return uniform;
                    };
                    return Utils;
                }());
                util.Utils = Utils;
            })(util = webgl.util || (webgl.util = {}));
        })(webgl = enirva.webgl || (enirva.webgl = {}));
    })(enirva = com.enirva || (com.enirva = {}));
})(com || (com = {}));
