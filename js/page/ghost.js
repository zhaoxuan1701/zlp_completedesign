var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ghostroom;
(function (ghostroom) {
    var vo;
    (function (vo) {
        var GhostVo = (function () {
            function GhostVo(index) {
                this.index = index;
            }
            return GhostVo;
        }());
        vo.GhostVo = GhostVo;
    })(vo = ghostroom.vo || (ghostroom.vo = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var model;
    (function (model) {
        var GhostVo = ghostroom.vo.GhostVo;
        var Defines = (function () {
            function Defines() {
            }
            Defines.initialize = function () {
                if (this.GHOST_VOS == null) {
                    this.GHOST_VOS = [];
                    var colors = [
                        [255, 177, 255],
                        [107, 255, 123],
                        [161, 255, 255],
                        [255, 255, 104],
                        [255, 255, 255],
                        [255, 104, 104],
                        [187, 105, 255]
                    ];
                    var itemIds = [
                        0, 1, 2, 3, 4, 5, 6
                    ];
                    var scales = [0.85, 0.9, 0.95, 1, 1.05, 1.1, 1.15];
                    for (var i = 0; i < this.GHOST_NUM; i++) {
                        for (var j = 0, ln = colors[i].length; j < ln; j++) {
                            colors[i][j] /= 255;
                        }
                        var vo = new GhostVo(i);
                        vo.lightColor = colors[i];
                        vo.scale = scales[i] * 0.9;
                        vo.itemId = itemIds[i];
                        this.GHOST_VOS[i] = vo;
                    }
                }
            };
            Defines.GHOST_NUM = 7;
            Defines.CONTAINER_TAG = "section#ghost .interactive";
            Defines.CANVAS_MAIN_ID = "mainCanvas";
            Defines.CANVAS_MOUSE_ID = "mouseCanvas";
            Defines.HTML_CONTAINER_ID = "ghostHTMLContainer";
            Defines.HTML_TITLE_IMG_URL = "images/title.png";
            Defines.TEXTURE_URL = "../img/ghost_tex.png";
            return Defines;
        }());
        model.Defines = Defines;
    })(model = ghostroom.model || (ghostroom.model = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var event;
    (function (event) {
        var Event = com.enirva.event.Event;
        var RoomEvent = (function (_super) {
            __extends(RoomEvent, _super);
            function RoomEvent(type) {
                _super.call(this, type);
            }
            RoomEvent.REMOVE_GHOST = "removeGhost";
            RoomEvent.SCENE_INITIALIZED = "sceneInitialized";
            RoomEvent.CHANGE_STATE = "changeState";
            RoomEvent.REMOVE_GHOST_ALL = "removeGhostAll";
            return RoomEvent;
        }(Event));
        event.RoomEvent = RoomEvent;
    })(event = ghostroom.event || (ghostroom.event = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var model;
    (function (model) {
        var RoomModel = (function () {
            function RoomModel() {
            }
            Object.defineProperty(RoomModel, "instance", {
                get: function () {
                    if (RoomModel._instance == null) {
                        RoomModel._instance = new RoomModel();
                    }
                    return RoomModel._instance;
                },
                enumerable: true,
                configurable: true
            });
            return RoomModel;
        }());
        model.RoomModel = RoomModel;
    })(model = ghostroom.model || (ghostroom.model = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var control;
    (function (control) {
        var Debugger = com.enirva.debug.Debugger;
        var EventDispatcher = com.enirva.event.EventDispatcher;
        var Defines = ghostroom.model.Defines;
        var RoomModel = ghostroom.model.RoomModel;
        var HTMLController = (function (_super) {
            __extends(HTMLController, _super);
            function HTMLController() {
                _super.call(this);
                Debugger.log("html reset");
                var mainTag = $('<div id="' + Defines.HTML_CONTAINER_ID + '"></div>');
                $(Defines.CONTAINER_TAG).append(mainTag);
                this.container = mainTag;
            }
            HTMLController.prototype.onResize = function () {
                var w = this.title.width();
                var h = this.title.height();
                Debugger.log(w + " " + RoomModel.instance.stageWidth);
                this.title.css("left", (RoomModel.instance.stageWidth - w) / 2);
                this.title.css("top", (RoomModel.instance.stageHeight - h) / 2);
            };
            HTMLController.prototype.opening = function () {
                Debugger.log("html opening view");
                var scope = this;
                var img = new Image();
                img.onload = function () {
                    scope.title = $(img);
                    scope.container.append(scope.title);
                    scope.onResize();
                    scope.title.css("display", "none");
                    scope.title.fadeIn(600, function () {
                        var cc = 0;
                        scope.onEnterFrame = function () {
                            if (++cc > 200) {
                                scope.deleteEnterFrame;
                                scope.title.fadeOut(600, function () {
                                    Debugger.log("end opening");
                                });
                            }
                        };
                    });
                };
            };
            HTMLController.prototype.ending = function () {
                Debugger.log("html ending view");
            };
            return HTMLController;
        }(EventDispatcher));
        control.HTMLController = HTMLController;
    })(control = ghostroom.control || (ghostroom.control = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var webgl;
    (function (webgl) {
        var shader;
        (function (shader) {
            var Shaders = (function () {
                function Shaders() {
                }
                Shaders.createVertexShaderMouse = function () {
                    var vShader = "attribute vec3 position;" +
                        "uniform mat4 uMVMatrix;" +
                        "uniform mat4 uPMatrix;" +
                        "uniform vec3 mouseColor;" +
                        "varying vec3 vColor;" +
                        "void main(void) {" +
                        "	vColor = mouseColor;" +
                        "	vec4 vPosition = uMVMatrix * vec4( position, 1.0 );" +
                        "	gl_Position = uPMatrix * vPosition;" +
                        "}";
                    return vShader;
                };
                Shaders.createFragmentShaderMouse = function () {
                    var fShader = "precision mediump float;" +
                        "varying vec3      vColor;" +
                        "void main(void){" +
                        "	gl_FragColor = vec4(vColor, 1.0);" +
                        "}";
                    return fShader;
                };
                Shaders.createVertexShaderGhost = function () {
                    var vShader = "attribute vec3 position;" +
                        "attribute vec4 color;" +
                        "attribute vec2 coord;" +
                        "uniform mat4 uMVMatrix;" +
                        "uniform mat4 uPMatrix;" +
                        "varying   vec4 vColor;" +
                        "varying   vec2 vTextureCoord;" +
                        "void main(void){" +
                        "	vColor        = color;" +
                        "	vec4 vPosition = uMVMatrix * vec4( position, 1.0 );" +
                        "	gl_Position = uPMatrix * vPosition;" +
                        "}";
                    return vShader;
                };
                Shaders.createFragmentShaderGhost = function () {
                    var fShader = "precision mediump float;" +
                        "uniform sampler2D texture;" +
                        "varying vec4      vColor;" +
                        "varying vec2      vTextureCoord;" +
                        "void main(void){" +
                        "	vec4 smpColor = texture2D(texture, vTextureCoord);" +
                        " vec4 col = vec4(1.0, 1.0, 1.0, 1.0);" +
                        "	gl_FragColor  = col * smpColor;" +
                        "}";
                    return fShader;
                };
                Shaders.createVertexShaderLight = function () {
                    var vShader = "attribute vec3 position;" +
                        "attribute vec3 normals;" +
                        "attribute vec2 coord;" +
                        "uniform mat4 uMVMatrix;" +
                        "uniform mat4 uPMatrix;" +
                        "uniform mat3 uNMatrix;" +
                        "varying vec2 vTextureCoord;" +
                        "varying vec3 vTransformedNormal;" +
                        "varying vec4 vPosition;" +
                        "void main(void) {" +
                        "	vPosition = uMVMatrix * vec4( position, 1.0 );" +
                        "	gl_Position = uPMatrix * vPosition;" +
                        "	vTextureCoord = coord;" +
                        "	vTransformedNormal = uNMatrix * normals;" +
                        "}";
                    return vShader;
                };
                Shaders.createFragmentShaderLight = function (lightNum) {
                    var line = "\n";
                    var fShader = "precision mediump float;" + line +
                        "varying vec2 vTextureCoord;" + line +
                        "varying vec3 vTransformedNormal;" + line +
                        "varying vec4 vPosition;" + line +
                        "uniform vec3 uAmbientColor;" + line +
                        "uniform bool boolValue;" + line;
                    for (var i = 0; i < lightNum; i++) {
                        fShader +=
                            "uniform vec3 uPointLightingLocation" + i.toString() + ";" + line +
                                "uniform vec3 uPointLightingColor" + i.toString() + ";" + line;
                    }
                    fShader += "uniform sampler2D uSampler;" + line +
                        "float distanceFunction(vec3 pos)" + line +
                        "{" + line +
                        "	return length(pos) - 1.0;" + line +
                        "}" + line +
                        "void main( void ){" + line +
                        "	vec3 currMax = vec3(0, 0, 0);" + line +
                        "	if (boolValue) {" + line;
                    for (var i = 0; i < lightNum; i++) {
                        var n = i.toString();
                        var uPointLightingLocation = "uPointLightingLocation" + n;
                        var uPointLightingColor = "uPointLightingColor" + n;
                        var lightDirection = "lightDirection" + n;
                        var lightDistance = "lightDistance" + n;
                        var lightWeighting = "lightWeighting" + n;
                        var directionalLightWeighting = "directionalLightWeighting" + n;
                        fShader += "		vec3 " + lightWeighting + ";" + line +
                            "		vec3 " + lightDirection + " = normalize(" + uPointLightingLocation + " - vPosition.xyz );" + line +
                            "		float " + lightDistance + " = distanceFunction(" + uPointLightingLocation + " - vPosition.xyz );" + line +
                            "		float " + directionalLightWeighting + " = max( dot( normalize( vTransformedNormal ), " + lightDirection + " ), 0.0 );" + line +
                            "		" + lightWeighting + " = uAmbientColor + " + uPointLightingColor + " * " + directionalLightWeighting + " / (" + lightDistance + " * " + lightDistance + ");" + line;
                        fShader += "		currMax = max(currMax, " + lightWeighting + ");" + line;
                    }
                    fShader += "		vec4 fragmentColor;" + line +
                        "		fragmentColor = texture2D( uSampler, vec2( vTextureCoord.s, vTextureCoord.t ) );" + line +
                        "		gl_FragColor = vec4( fragmentColor.rgb * currMax";
                    for (var i = 0; i < lightNum; i++) {
                        n = i.toString();
                    }
                    fShader += ", fragmentColor.a );" + line;
                    fShader += "	} else {" + line;
                    fShader += "		vec4 smpColor = texture2D(uSampler, vTextureCoord);" + line +
                        "		vec4 col = vec4(1.0, 1.0, 1.0, 1.0);" + line +
                        "		gl_FragColor  = col * smpColor;" + line +
                        "	}" + line;
                    fShader += "}";
                    return fShader;
                };
                return Shaders;
            }());
            shader.Shaders = Shaders;
        })(shader = webgl.shader || (webgl.shader = {}));
    })(webgl = ghostroom.webgl || (ghostroom.webgl = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var webgl;
    (function (webgl) {
        var model;
        (function (model) {
            var Debugger = com.enirva.debug.Debugger;
            var Defines = ghostroom.model.Defines;
            var UserAgent = com.enirva.util.UserAgent;
            var BufferData = (function () {
                function BufferData() {
                    var wallPer = 683 / 8192;
                    var size = 8;
                    var height = 2 * size * Math.PI * wallPer;
                    var division = 50;
                    var vertices = this.createVertices(size, height, division);
                    var vertexNormals = this.createVertexNormals(vertices);
                    var textureCoords = this.createTextureCoords(division);
                    var cubeVertexIndices = this.createVertexIndices(vertices);
                    var ln = vertices.length / 3;
                    vertices.push(-size, 0, size, size, 0, size, size, 0, -size, -size, 0, -size);
                    vertexNormals.push(0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0);
                    var gx = (17 + 1) / 4096;
                    var gy = (1380 + 1) / 4096;
                    var gw = (300) / 4096;
                    var gh = (300) / 4096;
                    textureCoords.push(gx, 1 - gy, gx + gw, 1 - gy, gx + gw, 1 - gy - gh, gx, 1 - gy - gh);
                    cubeVertexIndices.push(ln, ln + 1, ln + 3, ln + 3, ln + 1, ln + 2);
                    this.baseCountNum = cubeVertexIndices.length;
                    this.baseIndexNum = cubeVertexIndices.length;
                    var per = 572 / 714;
                    var ghost_y = 2612;
                    var positions = [
                        { x: 9, y: ghost_y },
                        { x: 591, y: ghost_y },
                        { x: 1172, y: ghost_y },
                        { x: 1755, y: ghost_y },
                        { x: 2336, y: ghost_y },
                        { x: 2918, y: ghost_y },
                        { x: 3500, y: ghost_y }
                    ];
                    for (var i = 0; i < Defines.GHOST_NUM; i++) {
                        ln = vertices.length / 3;
                        Defines.GHOST_VOS[i].baseIndexNum = cubeVertexIndices.length;
                        size = Defines.GHOST_VOS[i].scale;
                        vertices.push(-size * per, size, 0, size * per, size, 0, size * per, -size, 0, -size * per, -size, 0, size * per, size, 0, -size * per, size, 0, -size * per, -size, 0, size * per, -size, 0);
                        vertexNormals.push(0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0);
                        var gx = positions[i].x / 4096;
                        var gy = positions[i].y / 4096;
                        var gy2 = (positions[i].y + (3361 - ghost_y)) / 4096;
                        var gw = 572 / 4096;
                        var gh = 714 / 4096;
                        textureCoords.push(gx, 1 - gy, gx + gw, 1 - gy, gx + gw, 1 - gy - gh, gx, 1 - gy - gh, gx, 1 - gy2, gx + gw, 1 - gy2, gx + gw, 1 - gy2 - gh, gx, 1 - gy2 - gh);
                        cubeVertexIndices.push(ln + 0, ln + 3, ln + 1, ln + 3, ln + 2, ln + 1, ln + 4, ln + 7, ln + 5, ln + 7, ln + 6, ln + 5);
                    }
                    var positions = [
                        { x: 698, y: 1377, width: 663, height: 660 },
                        { x: 2090, y: 1377, width: 676, height: 458 },
                        { x: 2794, y: 1377, width: 556, height: 662 },
                        { x: 1217, y: 2106, width: 506, height: 193 },
                        { x: 1383, y: 1377, width: 685, height: 586 },
                        { x: 698, y: 2106, width: 501, height: 181 },
                        { x: 345, y: 1377, width: 323, height: 637 }
                    ];
                    for (var i = 0; i < Defines.GHOST_NUM; i++) {
                        ln = vertices.length / 3;
                        Defines.GHOST_VOS[i].itemBaseIndexNum = cubeVertexIndices.length;
                        var pos = positions[i];
                        size = 1;
                        if (pos.height > pos.width) {
                            per = pos.width / pos.height;
                            vertices.push(-size * per, size, 0, size * per, size, 0, size * per, -size, 0, -size * per, -size, 0);
                        }
                        else {
                            per = pos.height / pos.width;
                            vertices.push(-size, size * per, 0, size, size * per, 0, size, -size * per, 0, -size, -size * per, 0);
                        }
                        vertexNormals.push(0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0);
                        var gx = pos.x / 4096;
                        var gy = pos.y / 4096;
                        var gw = pos.width / 4096;
                        var gh = pos.height / 4096;
                        textureCoords.push(gx, 1 - gy, gx + gw, 1 - gy, gx + gw, 1 - gy - gh, gx, 1 - gy - gh);
                        cubeVertexIndices.push(ln + 0, ln + 3, ln + 1, ln + 3, ln + 2, ln + 1);
                    }
                    positions = [
                        { x: 9, y: ghost_y },
                        { x: 591, y: ghost_y },
                        { x: 1172, y: ghost_y },
                        { x: 1755, y: ghost_y },
                        { x: 2336, y: ghost_y },
                        { x: 2918, y: ghost_y },
                        { x: 3500, y: ghost_y }
                    ];
                    for (var i = 0; i < Defines.GHOST_NUM; i++) {
                        ln = vertices.length / 3;
                        Defines.GHOST_VOS[i].mouseBaseIndexNum = cubeVertexIndices.length;
                        size = Defines.GHOST_VOS[i].scale;
                        var spreader = 1;
                        if (UserAgent.instance.isIOS || UserAgent.instance.isAndroid) {
                            spreader = 5;
                        }
                        vertices.push(-size * per, size, 0, size * per, size, 0, size * per, -size * spreader, 0, -size * per, -size * spreader, 0, size * per, size, 0, -size * per, size, 0, -size * per, -size * spreader, 0, size * per, -size * spreader, 0);
                        vertexNormals.push(0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0, 0, 0, 1.0);
                        var gx = positions[i].x / 4096;
                        var gy = positions[i].y / 4096;
                        var gy2 = (positions[i].y + (3361 - ghost_y)) / 4096;
                        var gw = 572 / 4096;
                        var gh = 714 / 4096;
                        textureCoords.push(gx, 1 - gy, gx + gw, 1 - gy, gx + gw, 1 - gy - gh, gx, 1 - gy - gh, gx, 1 - gy2, gx + gw, 1 - gy2, gx + gw, 1 - gy2 - gh, gx, 1 - gy2 - gh);
                        cubeVertexIndices.push(ln + 0, ln + 3, ln + 1, ln + 3, ln + 2, ln + 1, ln + 4, ln + 7, ln + 5, ln + 7, ln + 6, ln + 5);
                    }
                    this.ghostIndexNum = 12;
                    this.itemIndexNum = 6;
                    this.mouseIndexNum = 12;
                    this.vertices = vertices;
                    this.vertexNormals = vertexNormals;
                    this.textureCoords = textureCoords;
                    this.vertexIndices = cubeVertexIndices;
                }
                BufferData.prototype.createVertices = function (size, height, division) {
                    var vertices = [];
                    var r = 0;
                    var per = 6.28 / division;
                    var div2 = division / 2;
                    for (var i = 0; i <= div2; i++) {
                        var x = Math.cos(r) * size;
                        var y = height;
                        var z = Math.sin(r) * size;
                        vertices.push(x, y, z);
                        y = 0;
                        vertices.push(x, y, z);
                        r += per;
                    }
                    r = 3.14;
                    for (var i = 0; i <= div2; i++) {
                        var x = Math.cos(r) * size;
                        var y = height;
                        var z = Math.sin(r) * size;
                        vertices.push(x, y, z);
                        y = 0;
                        vertices.push(x, y, z);
                        r += per;
                    }
                    Debugger.log("vertices.length = " + vertices.length);
                    return vertices;
                };
                BufferData.prototype.createVertexNormals = function (vertices) {
                    var vertexNormals = [];
                    for (var i = 0; i < vertices.length; i += 3) {
                        var x = -vertices[i];
                        var y = -vertices[i + 1];
                        var z = -vertices[i + 2];
                        var m = Math.sqrt(x * x + y * y + z * z);
                        x /= m;
                        y /= m;
                        z /= m;
                        vertexNormals.push(x, y, z);
                    }
                    return vertexNormals;
                };
                BufferData.prototype.createTextureCoords = function (division) {
                    var textureCoords = [];
                    var vertices = [];
                    var w_per = 2;
                    var h_per = 683 / 4096;
                    var offset_h = 0;
                    var per = 1 / division;
                    var div2 = division / 2;
                    for (var i = 0; i <= div2; i++) {
                        var u = i * per * w_per;
                        var v = 1 - offset_h;
                        textureCoords.push(u, v);
                        v = 1 - (h_per + offset_h);
                        textureCoords.push(u, v);
                    }
                    offset_h = h_per;
                    for (var i = 0; i <= div2; i++) {
                        var u = i * per * w_per;
                        var v = 1 - offset_h;
                        textureCoords.push(u, v);
                        v = 1 - (h_per + offset_h);
                        textureCoords.push(u, v);
                    }
                    return textureCoords;
                };
                BufferData.prototype.createVertexIndices = function (vertices) {
                    var indices = [];
                    var origin = 0;
                    var flag = true;
                    var max = vertices.length / 3;
                    do {
                        if ((origin + 3) >= max) {
                            flag = false;
                        }
                        else {
                            indices.push(origin, origin + 1, origin + 2, origin + 1, origin + 3, origin + 2);
                            origin += 2;
                        }
                    } while (flag);
                    return indices;
                };
                return BufferData;
            }());
            model.BufferData = BufferData;
        })(model = webgl.model || (webgl.model = {}));
    })(webgl = ghostroom.webgl || (ghostroom.webgl = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var manager;
    (function (manager) {
        var EventDispatcher = com.enirva.event.EventDispatcher;
        var Debugger = com.enirva.debug.Debugger;
        var SoundManager = (function (_super) {
            __extends(SoundManager, _super);
            function SoundManager() {
                _super.call(this);
            }
            SoundManager.initialize = function () {
                nide.SoundMgr.$jq.on("muteChange", function () {
                    if (nide.SoundMgr.isMute) {
                        Debugger.log("isMute true");
                        SoundManager.isMute = true;
                    }
                    else {
                        Debugger.log("isMute false");
                        SoundManager.isMute = false;
                    }
                });
                document.addEventListener('visibilitychange', this.changeFunc = function () {
                    Debugger.log("visibilitychange");
                    if (SoundManager.audioBGM) {
                        if (document.visibilityState === 'hidden') {
                            SoundManager.audioBGM.pause();
                        }
                        else if (document.visibilityState === 'visible') {
                            SoundManager.audioBGM.play();
                        }
                    }
                }, false);
                this.audioSE = new Audio(this.SE_URL);
            };
            SoundManager.reset = function () {
                document.removeEventListener('visibilitychange', this.changeFunc);
                if (SoundManager.audioBGM) {
                    SoundManager.audioBGM.pause();
                    SoundManager.audioBGM = null;
                }
            };
            SoundManager.loadSE = function () {
                if (!this.isMute) {
                    this.audioSE.load();
                }
            };
            SoundManager.playSE = function () {
                if (!this.isMute) {
                    if (this.audioSE) {
                        this.audioSE.play();
                    }
                }
            };
            SoundManager.playBGM = function () {
                this.audioBGM = new Audio(this.BGM_URL);
                this.audioBGM.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                });
                this.audioBGM.play();
            };
            SoundManager.BGM_URL = "../sound/ghost.mp3";
            SoundManager.SE_URL = "../sound/GucciGhost.mp3";
            return SoundManager;
        }(EventDispatcher));
        manager.SoundManager = SoundManager;
    })(manager = ghostroom.manager || (ghostroom.manager = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var view;
    (function (view) {
        var EventDispatcher = com.enirva.event.EventDispatcher;
        var RoomEvent = ghostroom.event.RoomEvent;
        var SoundManager = ghostroom.manager.SoundManager;
        var Ghost = (function (_super) {
            __extends(Ghost, _super);
            function Ghost(index, per, vo) {
                _super.call(this);
                this.endRotationY = 6.28;
                this.baseGhostY = 2;
                this.index = index;
                this.mouseColor = index * 0.1 + 0.2;
                this.mouseColor255 = Math.floor(this.mouseColor * 255);
                var flag = (index % 2) == 0;
                this.x = 0;
                this.y = 0;
                this.z = 0;
                this.rotationY = 0;
                this.scale = 0;
                this.rotateGeta = 0;
                this.currentLightColor = [0, 0, 0];
                this.sa = 0;
                this.tmp = 0;
                var per2;
                if (flag) {
                    this.rsp = 0.005;
                    this.rotDis = 6;
                    per2 = 6.28 / 4;
                }
                else {
                    this.rsp = -0.005;
                    this.rotDis = 3;
                    per2 = 6.28 / 3;
                }
                this.r = (index / 2 >> 0) * per2;
                this.vo = vo;
            }
            Ghost.prototype.appearMotion = function () {
                var scope = this;
                var sa = 0;
                var tmp = 0;
                var tmp2 = 0;
                var sp1 = 30;
                var sp2 = 0.75;
                var l0 = this.vo.lightColor[0];
                var l1 = this.vo.lightColor[1];
                var l2 = this.vo.lightColor[2];
                this.isShow = true;
                this.rotationY = (Math.random() > 0.5) ? 6.28 : -6.28;
                var endRy = Math.random() * 6.28;
                this.onEnterFrame = function () {
                    scope.scale += tmp = (1 - scope.scale) / sp1 + tmp * sp2;
                    scope.currentLightColor[0] = scope.scale * l0;
                    scope.currentLightColor[1] = scope.scale * l1;
                    scope.currentLightColor[2] = scope.scale * l2;
                    scope.rotationY += tmp2 = (endRy - scope.rotationY) / sp1 + tmp2 * sp2;
                    if (Math.abs(tmp) < 0.0002) {
                        scope.deleteEnterFrame;
                        scope.scale = 1;
                        scope.currentLightColor[0] = l0;
                        scope.currentLightColor[1] = l1;
                        scope.currentLightColor[2] = l2;
                        scope.rotationY = endRy;
                        scope.finishInitialMotion = true;
                    }
                };
            };
            Ghost.prototype.rotateRandom = function () {
                if (!this.finishInitialMotion) {
                    return;
                }
                var end = this.rotationY + (Math.random() * 3.14) + 3.14;
                var scope = this;
                var sa = 0;
                var tmp = 0;
                this.onEnterFrame = function () {
                    sa += 0.0055;
                    scope.rotationY += tmp = (end - scope.rotationY) * sa;
                    if (Math.abs(tmp) < 0.001) {
                        scope.deleteEnterFrame;
                        scope.rotationY = scope.rotationY % 6.28;
                    }
                };
            };
            Ghost.prototype.transformItemMotion = function (camR) {
                if (this.isClicked) {
                    return;
                }
                this.isClicked = true;
                SoundManager.playSE();
                camR = this.cutRadian(camR);
                this.rotationY = this.cutRadian(this.rotationY);
                var scope = this;
                var sa = 0;
                var tmp = 0;
                var endRotationY = 6.28 * 2;
                var changed = false;
                var cc = 0;
                var l0 = this.vo.lightColor[0];
                var l1 = this.vo.lightColor[1];
                var l2 = this.vo.lightColor[2];
                var rr = 0;
                var num = 0;
                var tmp_r;
                var tmp_r_cc = 0;
                this.onEnterFrame = function () {
                    switch (num) {
                        case 0:
                            sa += 0.0055;
                            scope.rotationY += tmp = (endRotationY - scope.rotationY) * sa;
                            if (!changed && (Math.abs(endRotationY - scope.rotationY) < 1.58)) {
                                changed = true;
                                scope.vo.baseIndexNum = scope.vo.itemBaseIndexNum;
                                scope.isItem = true;
                            }
                            if (Math.abs(tmp) < 0.002) {
                                num++;
                                scope.vo.baseIndexNum = scope.vo.itemBaseIndexNum;
                                scope.rotationY = 0;
                                scope.isItem = true;
                                tmp_r = scope.rotationY;
                                sa = 0;
                            }
                            break;
                        case 1:
                            tmp_r_cc += 0.03;
                            scope.rotationY = tmp_r + Math.sin(tmp_r_cc) * 0.15;
                            if (++cc > 170) {
                                num = 2;
                                endRotationY = 3.14;
                                sa = 0;
                                scope.dispatchEvent(new RoomEvent(RoomEvent.REMOVE_GHOST));
                            }
                            break;
                        case 2:
                            sa += 0.013;
                            rr += tmp = (endRotationY - rr) * sa;
                            scope.scale = Math.cos(rr) * 0.5 + 0.5;
                            scope.currentLightColor[0] = scope.scale * l0;
                            scope.currentLightColor[1] = scope.scale * l1;
                            scope.currentLightColor[2] = scope.scale * l2;
                            if (Math.abs(tmp) < 0.0002) {
                                scope.deleteEnterFrame;
                                scope.isShow = false;
                                scope.isRemoved = true;
                            }
                            break;
                        default: break;
                    }
                };
            };
            Ghost.prototype.update = function () {
                this.r += this.rsp;
                var r = this.r;
                this.x = Math.cos(r) * (this.rotDis);
                this.y = Math.cos(r) * 0.8 + this.baseGhostY;
                this.z = Math.sin(r) * (this.rotDis);
            };
            Ghost.prototype.cutRadian = function (r) {
                r = r % 6.28;
                if (r < 0) {
                    r += 6.28;
                }
                return r;
            };
            Ghost.prototype.removeGhost = function () {
                this.deleteEnterFrame;
            };
            return Ghost;
        }(EventDispatcher));
        view.Ghost = Ghost;
    })(view = ghostroom.view || (ghostroom.view = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var manager;
    (function (manager) {
        var EventDispatcher = com.enirva.event.EventDispatcher;
        var Debugger = com.enirva.debug.Debugger;
        var UserAgent = com.enirva.util.UserAgent;
        var Defines = ghostroom.model.Defines;
        var SoundManager = ghostroom.manager.SoundManager;
        var SensorManager = (function (_super) {
            __extends(SensorManager, _super);
            function SensorManager() {
                _super.call(this);
                this.useDeltaTime = true;
                this.isDrag = true;
            }
            Object.defineProperty(SensorManager, "instance", {
                get: function () {
                    if (SensorManager._instance == null) {
                        SensorManager._instance = new SensorManager();
                    }
                    return SensorManager._instance;
                },
                enumerable: true,
                configurable: true
            });
            SensorManager.initialize = function () {
                if (SensorManager.initialized) {
                    return;
                }
                var mn = SensorManager.instance;
                mn.accY = 0;
                mn.rotateY = 0;
                var target = "#" + Defines.CANVAS_MAIN_ID;
                if (UserAgent.instance.isIOS || UserAgent.instance.isAndroid) {
                    window.addEventListener("orientationchange", this.orientationChange);
                    mn.orientation = window.orientation;
                    var div = (UserAgent.instance.isIOS) ? 1000 : 10;
                    window.ondevicemotion = function (e) {
                        if (mn.orientation === 90) {
                            mn.accY += (e).rotationRate.alpha / div;
                        }
                        else {
                            mn.accY -= (e).rotationRate.alpha / div;
                        }
                        mn.rotateY = (mn.rotateY + mn.accY) * 0.97;
                    };
                    var offsetX;
                    var currX;
                    $(target).bind("touchstart", function (e) {
                        e.preventDefault();
                        offsetX = e.originalEvent.touches[0].pageX;
                        currX = offsetX;
                        mn._mouseX = e.originalEvent.touches[0].pageX;
                        mn._mouseY = e.originalEvent.touches[0].pageY;
                        if (mn.onDownFunc) {
                            mn.onDownFunc();
                        }
                        mn.downTime = 0;
                        mn.onEnterFrame = function (deltaTime) {
                            mn.downTime += deltaTime;
                        };
                        $(target).bind("touchmove", function (e) {
                            mn._mouseX = e.originalEvent.touches[0].pageX;
                            mn._mouseY = e.originalEvent.touches[0].pageY;
                            currX = e.originalEvent.touches[0].pageX;
                            e.preventDefault();
                        });
                    });
                    $(target).bind("touchend", function () {
                        $(target).unbind("touchmove");
                        var diff = Math.abs(currX - offsetX);
                        if ((diff < 10) && mn.downTime < 300) {
                            if (mn.onClickFunc != null) {
                                SoundManager.loadSE();
                                mn.onClickFunc();
                            }
                        }
                    });
                }
                else {
                    Debugger.log(target);
                    $(target).bind("mousedown", function (e) {
                        mn._mouseX = e.originalEvent.pageX;
                        mn._mouseY = e.originalEvent.pageY;
                        if (mn.isDrag) {
                            if (mn.onDownFunc) {
                                mn.onDownFunc();
                            }
                            mn.startDrag(e);
                        }
                    });
                    $(target).bind("mousemove", function (e) {
                        mn._mouseX = e.originalEvent.pageX;
                        mn._mouseY = e.originalEvent.pageY;
                    });
                }
                SensorManager.initialized = true;
            };
            SensorManager.orientationChange = function () {
                var mn = SensorManager.instance;
                mn.orientation = window.orientation;
            };
            Object.defineProperty(SensorManager, "mouseX", {
                get: function () {
                    return SensorManager._instance._mouseX;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SensorManager, "mouseY", {
                get: function () {
                    return SensorManager._instance._mouseY;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SensorManager.prototype, "onMove", {
                set: function (value) {
                    this.onMoveFunc = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SensorManager.prototype, "onClick", {
                set: function (value) {
                    this.onClickFunc = value;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(SensorManager.prototype, "onDown", {
                set: function (value) {
                    this.onDownFunc = value;
                },
                enumerable: true,
                configurable: true
            });
            SensorManager.reset = function () {
                var mn = SensorManager.instance;
                var target = "#" + Defines.CANVAS_MAIN_ID;
                if (UserAgent.instance.isIOS || UserAgent.instance.isAndroid) {
                    window.ondevicemotion = null;
                    $(target).unbind("touchstart");
                    $(target).unbind("touchmove");
                    $(target).unbind("touchend");
                    window.removeEventListener("orientationchange", this.orientationChange);
                }
                else {
                    $(target).unbind("mousedown");
                    $(target).unbind("mousemove");
                    $(target).unbind("mouseup");
                }
                mn.deleteEnterFrame;
                mn.onMoveFunc = null;
                mn.onClick = null;
                mn.onDownFunc = null;
                SensorManager.initialized = false;
                SensorManager._instance = null;
            };
            SensorManager.prototype.startDrag = function (e) {
                this.isDown = true;
                this.downTime = 0;
                var offsetX = e.pageX;
                var currX = offsetX;
                var scope = this;
                var target = "#" + Defines.CANVAS_MAIN_ID + " canvas";
                $(target).bind("mousemove", function (e) {
                    currX = e.pageX;
                });
                $(target).bind("mouseup", function (e) {
                    scope.isDown = false;
                    var diff = Math.abs(currX - offsetX);
                    if ((diff < 100) && scope.downTime < 300) {
                        SoundManager.loadSE();
                        if (scope.onClickFunc != null) {
                            scope.onClickFunc();
                        }
                    }
                    scope.deleteEnterFrame;
                    $(target).unbind("mouseup");
                    $(target).unbind("mousemove");
                });
                var baseRotY = scope.rotateY;
                var nextRotY = scope.rotateY;
                var maxR = 45;
                var dragDis = 500;
                this.onEnterFrame = function (deltaTime) {
                    var per = dragDis - Math.abs(currX - offsetX);
                    var vec = ((currX - offsetX) < 0) ? -1 : 1;
                    if (per < 0) {
                        per = 0;
                    }
                    var limit = (maxR - Math.abs(scope.rotateY)) / maxR;
                    nextRotY = vec * maxR * (dragDis - per) / dragDis;
                    scope.rotateY += (((nextRotY + baseRotY) - scope.rotateY) / 20) * limit;
                    scope.downTime += deltaTime;
                };
            };
            return SensorManager;
        }(EventDispatcher));
        manager.SensorManager = SensorManager;
    })(manager = ghostroom.manager || (ghostroom.manager = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var webgl;
    (function (webgl) {
        var model;
        (function (model) {
            var Uniforms = (function () {
                function Uniforms() {
                }
                return Uniforms;
            }());
            model.Uniforms = Uniforms;
        })(model = webgl.model || (webgl.model = {}));
    })(webgl = ghostroom.webgl || (ghostroom.webgl = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var webgl;
    (function (webgl) {
        var control;
        (function (control) {
            var EventDispatcher = com.enirva.event.EventDispatcher;
            var SensorManager = ghostroom.manager.SensorManager;
            var RoomEvent = ghostroom.event.RoomEvent;
            var UserAgent = com.enirva.util.UserAgent;
            var CameraController = (function (_super) {
                __extends(CameraController, _super);
                function CameraController() {
                    _super.call(this);
                    this.camR = 0;
                    this.rotateDis = 4;
                    this.baseCameraY = -2.5;
                    this.x = 0;
                    this.y = this.baseCameraY;
                    this.z = 10;
                    this.rotationX = 0;
                    this.rotationY = 0;
                    this.rotationZ = 0;
                    this.camSpeed = 0.002;
                    this.clickOffset = new Float32Array(2);
                    var scope = this;
                    var cc = 0;
                    this.onEnterFrame = function () {
                        if (scope.motionFunc != null) {
                            scope.motionFunc();
                        }
                    };
                    if (!UserAgent.instance.isIOS && !UserAgent.instance.isAndroid) {
                        this.isPc = true;
                    }
                }
                CameraController.prototype.openingStart = function () {
                };
                CameraController.prototype.lookAt = function (ghost) {
                    var xx = ghost.x - this.x;
                    var yy = ghost.y - this.y;
                    var zz = ghost.z - this.z;
                    this.rotationY = Math.atan2(zz, xx) + 1.57;
                    this.rotationX = 0;
                    this.y = -ghost.y - 1.2;
                };
                CameraController.prototype.normalMotion = function () {
                    var scope = this;
                    this.motionFunc = function () {
                        var result = scope.calcNormal();
                        scope.x = result[0];
                        scope.y = result[1];
                        scope.z = result[2];
                        scope.rotationY = result[3];
                        scope.camR -= scope.camSpeed;
                    };
                };
                ;
                CameraController.prototype.toLookMotion = function (ghost) {
                    this.isFocus = true;
                    this.test = 0;
                    var scope = this;
                    var endFlag = false;
                    if (this.targetGhost) {
                        this.targetGhost.removeAllEventListener();
                    }
                    this.targetGhost = ghost;
                    this.targetGhost.addEventListener(RoomEvent.REMOVE_GHOST, function () {
                        endFlag = true;
                        scope.targetGhost.removeAllEventListener();
                    });
                    var xx = this.x - ghost.x;
                    var zz = this.z - ghost.z;
                    var dis = Math.sqrt(xx * xx + zz * zz);
                    xx *= 5 / dis;
                    zz *= 5 / dis;
                    this.clickOffset[0] = xx;
                    this.clickOffset[1] = zz;
                    var sa = 0;
                    var per = 0;
                    var per1;
                    var initValues;
                    var goalValues;
                    this.motionFunc = function () {
                        sa += 0.001;
                        per += (1 - per) * sa;
                        initValues = scope.calcNormal();
                        goalValues = scope.calcToLook();
                        if (per > 0.9999) {
                            per = 1;
                        }
                        per1 = 1 - per;
                        scope.x = initValues[0] * per1 + goalValues[0] * per;
                        scope.y = initValues[1] * per1 + goalValues[1] * per;
                        scope.z = initValues[2] * per1 + goalValues[2] * per;
                        scope.rotationY = initValues[3] * per1 + goalValues[3] * per;
                        ghost.rotateGeta = initValues[4] * per1 + goalValues[4] * per;
                        scope.camR -= scope.camSpeed;
                        if (endFlag) {
                            scope.toNormalMotion();
                        }
                    };
                };
                CameraController.prototype.removeCamera = function () {
                    this.deleteEnterFrame;
                };
                CameraController.prototype.toNormalMotion = function () {
                    var scope = this;
                    var sa = 0;
                    var per = 0;
                    var per1;
                    var initValues;
                    var goalValues;
                    var ghost = this.targetGhost;
                    var focusChanged = false;
                    if (this.isPc) {
                        SensorManager.instance.rotateY = 0;
                    }
                    this.motionFunc = function () {
                        sa += 0.003;
                        per += (1 - per) * sa;
                        initValues = scope.calcNormal();
                        goalValues = scope.calcToLook();
                        if (!focusChanged && (per > 0.5)) {
                            focusChanged = true;
                            SensorManager.instance.isDrag = true;
                            scope.isFocus = false;
                        }
                        if (per > 0.9999) {
                            if (scope.targetGhost) {
                                scope.targetGhost.removeAllEventListener();
                                scope.targetGhost = null;
                            }
                            per = 1;
                            scope.normalMotion();
                        }
                        per1 = 1 - per;
                        scope.x = initValues[0] * per + goalValues[0] * per1;
                        scope.y = initValues[1] * per + goalValues[1] * per1;
                        scope.z = initValues[2] * per + goalValues[2] * per1;
                        scope.rotationY = initValues[3] * per + goalValues[3] * per1;
                        ghost.rotateGeta = initValues[4] * per + goalValues[4] * per1;
                        scope.camR -= scope.camSpeed;
                    };
                };
                CameraController.prototype.calcNormal = function () {
                    var dis = this.rotateDis;
                    var result = new Float32Array(5);
                    result[0] = Math.sin(this.camR) * dis;
                    result[1] = this.baseCameraY;
                    result[2] = Math.cos(this.camR) * dis + 3;
                    result[3] = Math.sin(this.camR) * 0.2 - (SensorManager.instance.rotateY / 180 * Math.PI);
                    result[4] = 0;
                    if ((result[3] > 6.28) || (result[3] < -6.28)) {
                        result[3] = result[3] % 6.28;
                    }
                    return result;
                };
                CameraController.prototype.calcToLook = function () {
                    var dis = this.rotateDis;
                    var result = new Float32Array(5);
                    var ghost = this.targetGhost;
                    if (ghost) {
                        result[0] = ghost.x + this.clickOffset[0];
                        result[2] = ghost.z + this.clickOffset[1];
                        var xx = result[0] - ghost.x;
                        var zz = result[2] - ghost.z;
                        result[1] = -ghost.y - 1.2;
                        var atan2 = Math.atan2(zz, xx);
                        result[3] = atan2 - 1.57;
                        result[4] = -(atan2 - 1.57);
                    }
                    else {
                        result[0] = Math.sin(this.camR) * dis;
                        result[1] = this.y;
                        result[2] = Math.cos(this.camR) * dis + 1;
                        result[3] = Math.sin(this.camR) * 0.2 - (SensorManager.instance.rotateY / 180 * Math.PI);
                        result[4] = 0;
                    }
                    if ((result[3] > 6.28) || (result[3] < -6.28)) {
                        result[3] = result[3] % 6.28;
                    }
                    return result;
                };
                return CameraController;
            }(EventDispatcher));
            control.CameraController = CameraController;
        })(control = webgl.control || (webgl.control = {}));
    })(webgl = ghostroom.webgl || (ghostroom.webgl = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var webgl;
    (function (webgl) {
        var control;
        (function (control) {
            var Debugger = com.enirva.debug.Debugger;
            var EventDispatcher = com.enirva.event.EventDispatcher;
            var WebGLContext = com.enirva.webgl.core.WebGLContext;
            var Utils = com.enirva.webgl.util.Utils;
            var UserAgent = com.enirva.util.UserAgent;
            var Shaders = ghostroom.webgl.shader.Shaders;
            var BufferData = ghostroom.webgl.model.BufferData;
            var Ghost = ghostroom.view.Ghost;
            var Defines = ghostroom.model.Defines;
            var SensorManager = ghostroom.manager.SensorManager;
            var Uniforms = ghostroom.webgl.model.Uniforms;
            var RoomEvent = ghostroom.event.RoomEvent;
            var CameraController = ghostroom.webgl.control.CameraController;
            var RoomModel = ghostroom.model.RoomModel;
            var Scene = (function (_super) {
                __extends(Scene, _super);
                function Scene() {
                    _super.call(this);
                    this.mvMatrix = mat4.create();
                    this.pMatrix = mat4.create();
                    this.mouseCanvasPer = 4;
                    Debugger.log("load scene !");
                    this.initialize();
                }
                Scene.prototype.initialize = function () {
                    this.isPlaying = true;
                    this.initPlayer();
                    this.ghostRotateCounter = 0;
                    this.ghostRotateCounterMax = 60;
                    this.ambientColor = 0.05;
                    this.canvasWidth = window.innerWidth;
                    this.canvasHeight = window.innerHeight;
                    this.ghosts = [];
                    var per = 6.28 / Defines.GHOST_NUM;
                    Defines.initialize();
                    for (var i = 0; i < Defines.GHOST_NUM; i++) {
                        var g = new Ghost(i, per, Defines.GHOST_VOS[i]);
                        this.ghosts[i] = g;
                    }
                    this.camera = new CameraController();
                    var per = this.mouseCanvasPer;
                    var mainTag = $('<div id="' + Defines.CANVAS_MAIN_ID + '"></div>');
                    var mouseTag = $('<div id="' + Defines.CANVAS_MOUSE_ID + '"></div>');
                    $(Defines.CONTAINER_TAG).append(mainTag);
                    $(Defines.CONTAINER_TAG).append(mouseTag);
                    this.mainCanvas = mainTag;
                    if (!UserAgent.instance.isIOS && !UserAgent.instance.isAndroid) {
                        this.isPc = true;
                    }
                    var scope = this;
                    SensorManager.initialize();
                    SensorManager.instance.onClick = function () {
                        scope.clickHandler();
                    };
                    SensorManager.instance.onDown = function () {
                        scope.updateMouseColor();
                    };
                    this.ctx = new WebGLContext(Defines.CANVAS_MAIN_ID, this.canvasWidth, this.canvasHeight);
                    this.ctxMouse = new WebGLContext(Defines.CANVAS_MOUSE_ID, this.canvasWidth / per, this.canvasHeight / per);
                    this.initShaders();
                    this.initBuffers();
                    this.initTexture();
                };
                Scene.prototype.onResize = function () {
                    var per = this.mouseCanvasPer;
                    this.canvasWidth = window.innerWidth;
                    this.canvasHeight = window.innerHeight;
                    this.ctx.canvas.setAttribute("width", this.canvasWidth.toString());
                    this.ctx.canvas.setAttribute("height", this.canvasHeight.toString());
                    this.ctxMouse.canvas.setAttribute("width", (this.canvasWidth / per).toString());
                    this.ctxMouse.canvas.setAttribute("height", (this.canvasHeight / per).toString());
                    this.ctx.gl.viewport(0, 0, this.canvasWidth, this.canvasHeight);
                    this.ctxMouse.gl.viewport(0, 0, this.canvasWidth / per, this.canvasHeight / per);
                    Debugger.text(0, this.canvasWidth);
                    Debugger.text(1, this.canvasHeight);
                };
                Scene.prototype.opening = function () {
                    var scope = this;
                    var n = 0;
                    var cc = 0;
                    var endAppear = false;
                    var delayTimes = [0, 120, 80, 15, 15, 15, 15];
                    this.onEnterFrame = function () {
                        if (!endAppear) {
                            if (++cc > delayTimes[n]) {
                                cc = 0;
                                scope.ghosts[n].appearMotion();
                                if (++n >= scope.ghosts.length) {
                                    endAppear = true;
                                }
                            }
                        }
                        scope.drawScene(scope.isPlaying);
                    };
                    this.camera.normalMotion();
                };
                Scene.prototype.removeGhost = function (ghostIndex) {
                };
                Scene.prototype.removeAll = function () {
                    SensorManager.reset();
                    this.deleteEnterFrame;
                    this.camera.removeCamera();
                    $(Defines.CONTAINER_TAG).empty();
                };
                Scene.prototype.initShaders = function () {
                    var gl;
                    var vShader;
                    var fShader;
                    gl = this.ctx.gl;
                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
                    gl.enable(gl.BLEND);
                    vShader = Shaders.createVertexShaderLight();
                    fShader = Shaders.createFragmentShaderLight(Defines.GHOST_NUM);
                    this.ctx.linkProgram(vShader, fShader);
                    this.uniforms = new Uniforms();
                    vShader = Shaders.createVertexShaderGhost();
                    fShader = Shaders.createFragmentShaderGhost();
                    this.ctx.addProgram(vShader, fShader);
                    var program = this.ctx.program;
                    this.uniforms.pMatrix = gl.getUniformLocation(program, "uPMatrix");
                    this.uniforms.mvMatrix = gl.getUniformLocation(program, "uMVMatrix");
                    this.uniforms.sampler = gl.getUniformLocation(program, "uSampler");
                    this.uniforms.nMatrix = gl.getUniformLocation(program, "uNMatrix");
                    this.uniforms.ambientColor = gl.getUniformLocation(program, "uAmbientColor");
                    this.uniforms.boolValue = gl.getUniformLocation(program, "boolValue");
                    this.uniforms.pointLightingColors = [];
                    this.uniforms.pointLightingLocations = [];
                    for (var i = 0; i < Defines.GHOST_NUM; i++) {
                        var loc = gl.getUniformLocation(program, "uPointLightingLocation" + i.toString());
                        this.uniforms.pointLightingLocations.push(loc);
                        var loc2 = gl.getUniformLocation(program, "uPointLightingColor" + i.toString());
                        this.uniforms.pointLightingColors.push(loc2);
                    }
                    gl = this.ctxMouse.gl;
                    vShader = Shaders.createVertexShaderMouse();
                    fShader = Shaders.createFragmentShaderMouse();
                    this.ctxMouse.linkProgram(vShader, fShader);
                    program = this.ctxMouse.program;
                    this.uniforms.pMatrixMouse = gl.getUniformLocation(program, "uPMatrix");
                    this.uniforms.mvMatrixMouse = gl.getUniformLocation(program, "uMVMatrix");
                    this.uniforms.colorVec3Mouse = gl.getUniformLocation(program, "mouseColor");
                };
                Scene.prototype.initTexture = function () {
                    var scope = this;
                    var diceTexture = this.ctx.gl.createTexture();
                    var image = new Image();
                    image.onload = function () {
                        Utils.handleLoadedTexture(scope.ctx.gl, diceTexture, image);
                        scope.ctx.gl.bindTexture(scope.ctx.gl.TEXTURE_2D, diceTexture);
                        var evt = new RoomEvent(RoomEvent.SCENE_INITIALIZED);
                        RoomModel.instance.controller.notify(evt);
                    };
                    image.src = Defines.TEXTURE_URL;
                };
                Scene.prototype.startWaiting = function () {
                    var scope = this;
                    this.onEnterFrame = function () {
                        scope.drawScene(scope.isPlaying);
                    };
                    this.camera.normalMotion();
                };
                Scene.prototype.initBuffers = function () {
                    var data = new BufferData();
                    var vertices = data.vertices;
                    var vertexNormals = data.vertexNormals;
                    var textureCoords = data.textureCoords;
                    var vertexIndices = data.vertexIndices;
                    var gl;
                    var gl = this.ctx.gl;
                    var vertexPositionBuffer = Utils.createSaveBufferFloat(gl, vertices);
                    var normalBuffer = Utils.createSaveBufferFloat(gl, vertexNormals);
                    var textureCoordBuffer = Utils.createSaveBufferFloat(gl, textureCoords);
                    var indexBuffer = Utils.createSaveBufferUint(gl, vertexIndices);
                    var shaderProgram = this.ctx.program;
                    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "position");
                    var textureCoordAttribute = gl.getAttribLocation(shaderProgram, "coord");
                    var vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "normals");
                    Utils.setAttribute(gl, [vertexPositionBuffer, normalBuffer, textureCoordBuffer], new Int16Array([vertexPositionAttribute, vertexNormalAttribute, textureCoordAttribute]), new Int16Array([3, 3, 2]));
                    gl.activeTexture(gl.TEXTURE0);
                    gl.uniform1i(this.uniforms.sampler, 0);
                    this.baseCountNum = data.baseCountNum;
                    this.ghostIndexNum = data.ghostIndexNum;
                    this.itemIndexNum = data.itemIndexNum;
                    gl = this.ctxMouse.gl;
                    vertexPositionBuffer = Utils.createSaveBufferFloat(gl, vertices);
                    indexBuffer = Utils.createSaveBufferUint(gl, vertexIndices);
                    shaderProgram = this.ctxMouse.program;
                    var vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "position");
                    Utils.setAttribute(gl, [vertexPositionBuffer], new Int16Array([vertexPositionAttribute]), new Int16Array([3]));
                };
                Scene.prototype.drawScene = function (isPlay) {
                    if (!isPlay) {
                        return;
                    }
                    var uniforms = this.uniforms;
                    var cam = this.camera;
                    var isRotateGhost = false;
                    var rotateNum = 0;
                    if (++this.ghostRotateCounter > this.ghostRotateCounterMax) {
                        this.ghostRotateCounter = 0;
                        this.ghostRotateCounterMax = Math.random() * 120 + 120;
                        isRotateGhost = true;
                        rotateNum = this.ghosts.length * Math.random() >> 0;
                    }
                    if (isRotateGhost) {
                        for (var i = 0; i < Defines.GHOST_NUM; i++) {
                            var g = this.ghosts[i];
                            if (g.isShow) {
                                if ((i == rotateNum) && !g.isClicked) {
                                    g.rotateRandom();
                                }
                                g.update();
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < Defines.GHOST_NUM; i++) {
                            var g = this.ghosts[i];
                            if (g.isShow) {
                                g.update();
                            }
                        }
                    }
                    mat4.identity(this.mvMatrix);
                    mat4.identity(this.pMatrix);
                    mat4.perspective(45, this.canvasWidth / this.canvasHeight, 0.1, 100.0, this.pMatrix);
                    mat4.rotate(this.pMatrix, cam.rotationX, [1, 0, 0]);
                    mat4.rotate(this.pMatrix, cam.rotationY, [0, 1, 0]);
                    mat4.translate(this.pMatrix, [-cam.x, cam.y, -cam.z]);
                    var gl = this.ctx.gl;
                    var glMouse = this.ctxMouse.gl;
                    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    glMouse.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
                    gl.enable(gl.CULL_FACE);
                    gl.uniformMatrix4fv(uniforms.pMatrix, false, this.pMatrix);
                    glMouse.uniformMatrix4fv(uniforms.pMatrixMouse, false, this.pMatrix);
                    if (this.allRemoved) {
                        this.ambientColor = Math.min(0.7, this.ambientColor + 0.01);
                    }
                    var amb = this.ambientColor;
                    gl.uniform3f(uniforms.ambientColor, amb, amb, amb);
                    gl.uniform1i(uniforms.boolValue, 1);
                    var per = 6.28 / Defines.GHOST_NUM;
                    var tmp = [];
                    var allRemoved = true;
                    for (var i = 0; i < Defines.GHOST_NUM; i++) {
                        var g = this.ghosts[i];
                        var loc1 = uniforms.pointLightingLocations[i];
                        var loc2 = uniforms.pointLightingColors[i];
                        if (!g.isRemoved) {
                            allRemoved = false;
                        }
                        if (g.isShow) {
                            var col = g.currentLightColor;
                            gl.uniform3f(loc1, g.x, g.y, g.z);
                            gl.uniform3f(loc2, col[0], col[1], col[2]);
                            var xx = g.x - cam.x;
                            var zz = g.z - cam.z;
                            g.toCameraDis = xx * xx + zz * zz;
                            g.toCameraDis = g.x * Math.sin(-this.camera.rotationY) + g.z * Math.cos(this.camera.rotationY);
                            tmp.push(g);
                        }
                        else {
                            if (!g.isClicked) {
                            }
                            var col = g.vo.lightColor;
                            gl.uniform3f(loc2, 0, 0, 0);
                        }
                    }
                    gl.uniformMatrix4fv(uniforms.mvMatrix, false, this.mvMatrix);
                    var normalMatrix = mat3.create();
                    mat4.toInverseMat3(this.mvMatrix, normalMatrix);
                    mat3.transpose(normalMatrix);
                    gl.uniformMatrix3fv(uniforms.nMatrix, false, normalMatrix);
                    gl.drawElements(gl.TRIANGLES, this.baseCountNum, gl.UNSIGNED_SHORT, 0);
                    gl.uniform1i(uniforms.boolValue, 0);
                    tmp.sort(function (a, b) {
                        if (a.toCameraDis < b.toCameraDis)
                            return -1;
                        if (a.toCameraDis > b.toCameraDis)
                            return 1;
                        return 0;
                    });
                    var offsetUV = (3087 - 2311) / 4096;
                    for (var i = 0; i < tmp.length; i++) {
                        var g = tmp[i];
                        mat4.identity(this.mvMatrix);
                        mat4.translate(this.mvMatrix, [
                            g.x,
                            g.y + 1.2,
                            g.z
                        ]);
                        mat4.rotate(this.mvMatrix, g.rotationY + g.rotateGeta, [0, 1, 0]);
                        mat4.scale(this.mvMatrix, [g.scale, g.scale, g.scale]);
                        gl.uniformMatrix4fv(uniforms.mvMatrix, false, this.mvMatrix);
                        var indexNum = (g.isItem) ? this.itemIndexNum : this.ghostIndexNum;
                        gl.drawElements(gl.TRIANGLES, indexNum, gl.UNSIGNED_SHORT, g.vo.baseIndexNum * 2);
                        if (!g.isClicked) {
                            glMouse.uniformMatrix4fv(uniforms.mvMatrixMouse, false, this.mvMatrix);
                            glMouse.uniform3fv(uniforms.colorVec3Mouse, new Float32Array([
                                g.mouseColor,
                                1,
                                1
                            ]));
                            glMouse.drawElements(glMouse.TRIANGLES, indexNum, glMouse.UNSIGNED_SHORT, g.vo.mouseBaseIndexNum * 2);
                        }
                    }
                    glMouse.flush();
                    if (this.isPc) {
                        var u8 = new Uint8Array(4);
                        glMouse.readPixels((SensorManager.mouseX / this.mouseCanvasPer) >> 0, ((this.canvasHeight / this.mouseCanvasPer) - (SensorManager.mouseY / this.mouseCanvasPer)) >> 0, 1, 1, glMouse.RGBA, glMouse.UNSIGNED_BYTE, u8);
                        this.currentMouseColor = u8[0];
                        this.mouseOverCheck();
                    }
                    if (!this.allRemoved) {
                        if (allRemoved) {
                            this.allRemoved = true;
                            var evt = new RoomEvent(RoomEvent.REMOVE_GHOST_ALL);
                            RoomModel.instance.controller.notify(evt);
                        }
                    }
                };
                Scene.prototype.updateMouseColor = function () {
                    var u8 = new Uint8Array(4);
                    var glMouse = this.ctxMouse.gl;
                    glMouse.readPixels((SensorManager.mouseX / this.mouseCanvasPer) >> 0, ((this.canvasHeight / this.mouseCanvasPer) - (SensorManager.mouseY / this.mouseCanvasPer)) >> 0, 1, 1, glMouse.RGBA, glMouse.UNSIGNED_BYTE, u8);
                    this.currentMouseColor = u8[0];
                };
                Scene.prototype.clickHandler = function () {
                    if (this.camera.isFocus) {
                        return;
                    }
                    for (var i = 0, ln = this.ghosts.length; i < ln; i++) {
                        if (Math.abs(this.ghosts[i].mouseColor255 - this.currentMouseColor) <= 1) {
                            this.changeGhostToItem(this.ghosts[i].index);
                            break;
                        }
                    }
                };
                Scene.prototype.mouseOverCheck = function () {
                    if (this.camera.isFocus) {
                        if (this.cursorFlag) {
                            this.cursorFlag = false;
                            this.mainCanvas.css("cursor", "auto");
                        }
                    }
                    else {
                        var flag = false;
                        for (var i = 0, ln = this.ghosts.length; i < ln; i++) {
                            if (Math.abs(this.ghosts[i].mouseColor255 - this.currentMouseColor) <= 1) {
                                flag = true;
                                break;
                            }
                        }
                        if (this.cursorFlag != flag) {
                            this.cursorFlag = flag;
                            this.mainCanvas.css("cursor", (flag) ? "pointer" : "auto");
                        }
                    }
                };
                Scene.prototype.changeGhostToItem = function (index) {
                    var tmp = [];
                    for (var i = 0, ln = this.ghosts.length; i < ln; i++) {
                        var g = this.ghosts[i];
                        if (g.index == index) {
                            var camR = this.camera.rotationY;
                            g.transformItemMotion(camR);
                            SensorManager.instance.isDrag = false;
                            this.camera.toLookMotion(g);
                        }
                    }
                };
                Scene.prototype.initPlayer = function () {
                    var scope = this;
                    $(".playerPause").bind("click", function () {
                        scope.isPlaying = false;
                    });
                    $(".playerPlay").bind("click", function () {
                        scope.isPlaying = true;
                    });
                    $(".playerNext").bind("click", function () {
                        scope.drawScene(true);
                    });
                };
                return Scene;
            }(EventDispatcher));
            control.Scene = Scene;
        })(control = webgl.control || (webgl.control = {}));
    })(webgl = ghostroom.webgl || (ghostroom.webgl = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var control;
    (function (control) {
        var Debugger = com.enirva.debug.Debugger;
        var EventDispatcher = com.enirva.event.EventDispatcher;
        var RoomEvent = ghostroom.event.RoomEvent;
        var Scene = ghostroom.webgl.control.Scene;
        var RoomModel = ghostroom.model.RoomModel;
        var SoundManager = ghostroom.manager.SoundManager;
        var RoomController = (function (_super) {
            __extends(RoomController, _super);
            function RoomController() {
                _super.call(this);
                SoundManager.initialize();
                RoomModel.instance.controller = this;
                this.updateStageSize();
                this.scene = new Scene();
                var scope = this;
                window.addEventListener("resize", this.resizeFunc = function () {
                    Debugger.log("resize");
                    scope.updateStageSize();
                    scope.scene.onResize();
                });
            }
            RoomController.create = function (callback) {
                if (RoomController._instance == null) {
                    RoomController._instance = new RoomController();
                    RoomController._instance.initializeCallBack = callback;
                    SoundManager.playBGM();
                }
            };
            RoomController.start = function (callback) {
                RoomController._instance.endingCallBack = callback;
                RoomController._instance.scene.opening();
            };
            RoomController.remove = function () {
                if (RoomController._instance != null) {
                    RoomController._instance.removeAll();
                    RoomController._instance = null;
                }
            };
            RoomController.prototype.notify = function (event) {
                switch (event.type) {
                    case RoomEvent.SCENE_INITIALIZED:
                        Debugger.log("初期化完了");
                        RoomController._instance.initializeCallBack();
                        break;
                    case RoomEvent.REMOVE_GHOST:
                        this.scene.removeGhost(event.ghostIndex);
                        break;
                    case RoomEvent.REMOVE_GHOST_ALL:
                        RoomController._instance.endingCallBack();
                        break;
                    default: break;
                }
            };
            RoomController.prototype.removeAll = function () {
                window.removeEventListener("resize", this.resizeFunc);
                RoomModel.instance.controller = null;
                this.initializeCallBack = null;
                this.scene.removeAll();
                SoundManager.reset();
            };
            RoomController.prototype.updateStageSize = function () {
                RoomModel.instance.stageWidth = window.innerWidth;
                RoomModel.instance.stageHeight = window.innerHeight;
            };
            return RoomController;
        }(EventDispatcher));
        control.RoomController = RoomController;
    })(control = ghostroom.control || (ghostroom.control = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var event;
    (function (event) {
        var Event = com.enirva.event.Event;
        var GhostEvent = (function (_super) {
            __extends(GhostEvent, _super);
            function GhostEvent(type) {
                _super.call(this, type);
            }
            GhostEvent.REMOVE_GHOST = "removed";
            return GhostEvent;
        }(Event));
        event.GhostEvent = GhostEvent;
    })(event = ghostroom.event || (ghostroom.event = {}));
})(ghostroom || (ghostroom = {}));
var ghostroom;
(function (ghostroom) {
    var model;
    (function (model) {
        var RoomState = (function () {
            function RoomState() {
            }
            RoomState.OPENING = 0;
            RoomState.PLAYING = 1;
            RoomState.ENDING = 2;
            return RoomState;
        }());
        model.RoomState = RoomState;
    })(model = ghostroom.model || (ghostroom.model = {}));
})(ghostroom || (ghostroom = {}));
