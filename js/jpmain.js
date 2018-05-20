var __extends = this && this.__extends ||
function(a, b) {
    function c() {
        this.constructor = a
    }
    for (var d in b) b.hasOwnProperty(d) && (a[d] = b[d]);
    a.prototype = null === b ? Object.create(b) : (c.prototype = b.prototype, new c)
},
co; !
function(a) {
    var b = function() {
        function a() {}
        return a.ease_in_quad = "cubic-bezier(0.550,  0.085, 0.680, 0.530)",
        a.ease_in_cubic = "cubic-bezier(0.550,  0.055, 0.675, 0.190)",
        a.ease_in_quart = "cubic-bezier(0.895,  0.030, 0.685, 0.220)",
        a.ease_in_quint = "cubic-bezier(0.755,  0.050, 0.855, 0.060)",
        a.ease_in_sine = "cubic-bezier(0.470,  0.000, 0.745, 0.715)",
        a.ease_in_expo = "cubic-bezier(0.950,  0.050, 0.795, 0.035)",
        a.ease_in_circ = "cubic-bezier(0.600,  0.040, 0.980, 0.335)",
        a.ease_in_back = "cubic-bezier(0.600, -0.280, 0.735, 0.045)",
        a.ease_out_quad = "cubic-bezier(0.250,  0.460, 0.450, 0.940)",
        a.ease_out_cubic = "cubic-bezier(0.215,  0.610, 0.355, 1.000)",
        a.ease_out_quart = "cubic-bezier(0.165,  0.840, 0.440, 1.000)",
        a.ease_out_quint = "cubic-bezier(0.230,  1.000, 0.320, 1.000)",
        a.ease_out_sine = "cubic-bezier(0.390,  0.575, 0.565, 1.000)",
        a.ease_out_expo = "cubic-bezier(0.190,  1.000, 0.220, 1.000)",
        a.ease_out_circ = "cubic-bezier(0.075,  0.820, 0.165, 1.000)",
        a.ease_out_back = "cubic-bezier(0.175,  0.885, 0.320, 1.275)",
        a.ease_in_out_quad = "cubic-bezier(0.455,  0.030, 0.515, 0.955)",
        a.ease_in_out_cubic = "cubic-bezier(0.645,  0.045, 0.355, 1.000)",
        a.ease_in_out_quart = "cubic-bezier(0.770,  0.000, 0.175, 1.000)",
        a.ease_in_out_quint = "cubic-bezier(0.860,  0.000, 0.070, 1.000)",
        a.ease_in_out_sine = "cubic-bezier(0.445,  0.050, 0.550, 0.950)",
        a.ease_in_out_expo = "cubic-bezier(1.000,  0.000, 0.000, 1.000)",
        a.ease_in_out_circ = "cubic-bezier(0.785,  0.135, 0.150, 0.860)",
        a.ease_in_out_back = "cubic-bezier(0.680, -0.550, 0.265, 1.550)",
        a
    } ();
    a.Ease = b
} (co || (co = {}));
var co; !
function(a) {
    var b = function() {
        function a(a) {
            void 0 === a && (a = !0),
            this.que = [],
            this.index = 0,
            this.labelIndexs = {
                "": 0
            },
            this.autoDelete = a
        }
        return a.prototype.start = function() {
            return this.index = 0,
            this.runQue(),
            this
        },
        a.prototype.method = function(a, b) {
            return void 0 === b && (b = null),
            this.addQue("method", [a, b])
        },
        a.prototype.weitMethod = function(a, b) {
            return void 0 === b && (b = null),
            this.addQue("weitMethod", [a, b])
        },
        a.prototype.weit = function(a) {
            return this.addQue("weit", a)
        },
        a.prototype.cssSet = function(a, b) {
            return this.addQue("cssSet", [a, b])
        },
        a.prototype.cssTo = function(a, b, c, d, e) {
            return void 0 === d && (d = "linear"),
            void 0 === e && (e = !0),
            this.addQue("cssTo", [a, b, c, d, e])
        },
        a.prototype.cssClear = function(a) {
            return this.addQue("cssClear", a)
        },
        a.prototype.label = function(a) {
            return this.labelIndexs[a] = this.que.length,
            this
        },
        a.prototype.loop = function(a, b) {
            return void 0 === a && (a = ""),
            void 0 === b && (b = 0),
            this.addQue("loop", [a, b])
        },
        a.prototype.destroy = function() {
            delete this.que
        },
        a.prototype.addQue = function(a, b) {
            return this.que.push(new c(a, b)),
            this
        },
        a.prototype.runQue = function() {
            var a = this;
            if (null == this.que || 0 == this.que.length || this.que.length == this.index) return void(this.autoDelete && delete this.que);
            var b = this.que[this.index];
            switch (this.index++, b.label) {
            case "weit":
                setTimeout(function() {
                    return a.runQue()
                },
                Math.floor(1e3 * b.data));
                break;
            case "method":
                b.data[0].apply({},
                b.data[1]),
                this.runQue();
                break;
            case "weitMethod":
                var c = b.data[1];
                null == c && (c = []),
                c.unshift(function() {
                    a.runQue()
                }),
                b.data[0].apply({},
                c);
                break;
            case "cssTo":
                b.data[4] && setTimeout(function() {
                    return a.runQue()
                },
                Math.floor(1e3 * b.data[1]));
                var d = b.data[2];
                d.transition = "all " + b.data[1] + "s " + b.data[3],
                $(b.data[0]).css(d),
                b.data[4] || this.runQue();
                break;
            case "cssSet":
                var d = b.data[1];
                $(b.data[0]).css(d),
                this.runQue();
                break;
            case "cssClear":
                $(b.data).attr("style", null),
                this.runQue();
                break;
            case "loop":
                var e = b.data[1];
                if (e >= 0) {
                    var f = this.labelIndexs[b.data[0]];
                    f >= 0 && (this.index = f),
                    1 == e ? b.data[1] = -1 : e > 1 && b.data[1]--
                }
                this.runQue()
            }
        },
        a
    } ();
    a.PonTimeline = b;
    var c = function() {
        function a(a, b) {
            this.label = a,
            this.data = b
        }
        return a
    } ();
    a.PonTimelineQueObject = c
} (co || (co = {}));
var nide; !
function(a) {
    var b = function() {
        function a() {
            this.settingListners()
        }
        return a.prototype.settingListners = function() {
            $('[data-js="inview"]').each(function() {
                var a = $(this);
                a.on("inview",
                function(b, c, d, e) {
                    c && "both" == e && a.addClass("inview").off("inview")
                })
            }),
            $(document).on("click", "beforeBuf.disabled",
            function(a) {
                a.preventDefault()
            }),
            $("[data-toggle]").on("click",
            function(a) {
                $(a.currentTarget).toggleClass("toggle"),
                $('[data-js="' + $(a.currentTarget).data("toggle") + '"]').toggleClass("toggle").trigger("classChange")
            }),
            $('[data-js="navi"]').on("classChange",
            function(a) {
                var b = $(a.currentTarget);
                b.hasClass("toggle") ? ($("html").css("overflow-y", "hidden"), $("body").addClass("noscroll")) : ($("html").css("overflow-y", ""), $("body").removeClass("noscroll"))
            }),
            $("[data-auto-close]").on("click",
            function(a) { (function() {
                    this.hasClass("toggle") && this.trigger("click")
                }).call($('[data-js="menu-btn"]'))
            }),
            $(document).on("click", '[data-sns="facebook"]',
            function(a) {
                var b = location.href;
                return window.open("http://www.facebook.com/sharer.php?u=" + b),
                !1
            }),
            $(document).on("click", '[data-sns="twitter"]',
            function(a) {
                var b = location.href,
                c = "message";
                return window.open("http://twitter.com/intent/tweet?url=" + encodeURIComponent(b) + "&text=" + encodeURIComponent(c), "_blank"),
                !1
            }),
            $(document).on("click", '[data-sns="line"]',
            function(a) {
                location.href;
                return window.open("http://line.me/R/msg/text/?encodeURIComponent(text)"),
                !1
            }),
            window.deSVG("[data-expand-svg]", !0)
        },
        a.prototype.resize = function() {},
        a
    } ();
    a.Common = b
} (nide || (nide = {}));
var Debug = function() {
    function a() {}
    return a.hold = function(b, c) {
        console.log("Debug.hold", c, b),
        a[c] = b
    },
    a
} (),
nide; !
function(a) {
    var b = function() {
        function a() {}
        return a
    } ();
    a.Utils = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function a(a) {
            var b = new google.maps.LatLng(35.6717928, 139.764617),
            c = {
                zoom: 16,
                center: b,
                zoomControl: !1,
                streetViewControl: !1,
                mapTypeControl: !1,
                panControl: !1,
                mapTypeControlOptions: {
                    mapTypeIds: ["sample", google.maps.MapTypeId.ROADMAP]
                }
            },
            d = new google.maps.Map(a, c),
            e = new google.maps.MarkerImage("../img/map-ico.png", new google.maps.Size(25, 31), new google.maps.Point(0, 0)),
            f = {
                position: b,
                map: d,
                icon: e,
                title: "Gucci"
            },
            g = (new google.maps.Marker(f), [{
                stylers: [{
                    invert_lightness: !0
                },
                {
                    saturation: -100
                }]
            }]),
            h = {
                name: "Gucci"
            },
            i = new google.maps.StyledMapType(g, h);
            d.mapTypes.set("Gucci", i),
            d.setMapTypeId("Gucci")
        }
        return a
    } ();
    a.GoogleMap = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function a() {}
        return a.init = function(b) {
            a.$jq = b,
            b.on("click", a.change)
        },
        a.change = function() {
            a.$jq.toggleClass("toggle"),
            a.isMute = !a.$jq.hasClass("toggle"),
            a.$jq.trigger("muteChange")
        },
        a.stop = function() {
            a.$jq.removeClass("playing")
        },
        a.playing = function() {
            a.$jq.addClass("playing")
        },
        a.isMute = !1,
        a._isMute = !1,
        a
    } ();
    a.SoundMgr = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function b() {
            this.$jq = $("<div id='loader' />"),
            this.arr = [],
            this.obj = {},
            this.isLoading = !1
        }
        return b.prototype.load = function() {
            var a = this;
            if (0 == this.arr.length) return void(this.isLoading = !1);
            var b = this.arr.shift(),
            c = b.jq.data("bg");
            b.jq.css("background-image") == c && this.load();
            $("<img>").on("load",
            function() {
                b.jq.css("background-image", "url(" + c + ")").addClass("loaded"),
                a.load()
            }).attr("src", c)
        },
        b.prototype.loadMedia = function(b) {
            switch (b) {
            case "#about":
                break;
            case "#map":
                break;
            case "#words":
                a.Main.instance.page.words.load();
                break;
            case "#herbarium":
                a.Main.instance.page.herbarium.load();
                break;
            case "#garden":
                a.Main.instance.page.garden.load();
                break;
            case "#ghost":
                break;
            case "#itemList":
            }
        },
        b.prototype.loadQue = function(a) {
            this.currentQue && "loading" == this.currentQue.status && this.currentQue.stop(),
            "loaded" != a.status && (this.currentQue = a, this.currentQue.start())
        },
        b
    } ();
    a.Loader = b;
    var c = function() {
        function a() {
            this.status = "none",
            this.tasks = [],
            this.loadedCount = 0,
            this.weitIndex = 0
        }
        return a.prototype.imgLoad = function(a, b) {
            return this.tasks.push({
                status: "none",
                method: "imgLoad",
                path: a,
                comp: b
            }),
            this
        },
        a.prototype.weit = function() {
            return this.tasks.push({
                status: "none",
                method: "weit"
            }),
            this
        },
        a.prototype.onComplete = function(a) {
            return this._onComplete = a,
            this
        },
        a.prototype.stop = function() {},
        a.prototype.start = function() {
            var a = this;
            this.status = "loading";
            var b = this.weitIndex;
            for (this.weitIndex = 0, b; b < this.tasks.length; b++) {
                var c = this.tasks[b];
                if ("weit" == c.method) return this.loadedCount++,
                void(this.weitIndex = b + 1); !
                function(b) {
                    switch (b.status = "loading", b.method) {
                    case "imgLoad":
                        var c = $("<img>").on("load",
                        function() {
                            b.status = "loaded",
                            b.comp(c),
                            delete b.comp,
                            a.comp()
                        }).attr("src", b.path)
                    }
                } (c)
            }
        },
        a.prototype.comp = function() {
            this.loadedCount++,
            this.loadedCount == this.tasks.length && (this.status = "loaded", this._onComplete()),
            this.weitIndex > 0 && this.start()
        },
        a
    } ();
    a.LoaderQue = c
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function a(a, b) {
            void 0 === a && (a = 0),
            void 0 === b && (b = 0),
            this.width = a,
            this.height = b
        }
        return a.prototype.isOblong = function() {
            return this.width > this.height
        },
        a.prototype.getRatio = function() {
            return this.width / this.height
        },
        a
    } ();
    a.Size = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function a() {}
        return a.getPath = function(b) {
            return a.dir + a.list[b][0]
        },
        a.dir = "./img/items/",
        a.list = {
            0 : ["408242_X5E80_1577_001_100_0000_Light.jpg", "data1", "data2"],
            1 : ["409370_ZHX70_9186_001_100_0000_Light.jpg", "data1", "data2"],
            2 : ["429037_K1NAX_8676_001_070_0000_Light.jpg", "data1", "data2"],
            3 : ["429446_A38G0_9064_001_100_0000_Light.jpg", "data1", "data2"],
            4 : ["429485_Z499A_1189_001_100_0000_Light.jpg", "data1", "data2"],
            5 : ["430356_XR190_4571_001_100_0000_Light.jpg", "data1", "data2"],
            6 : ["431416_K058G_8528_001_100_0000_Light.jpg", "data1", "data2"],
            7 : ["431917_A38G0_9064_001_100_0000_Light.jpg", "data1", "data2"],
            8 : ["432684_K2I1J_4560_001_100_0000_Light.jpg", "data1", "data2"],
            9 : ["432684_K2I1J_8636_001_100_0000_Light.jpg", "data1", "data2"],
            10 : ["433037_XR275_4425_001_100_0000_Light.jpg", "data1", "data2"],
            11 : ["433665_K2LWT_8967_001_059_0016_Light.jpg", "data1", "data2"],
            12 : ["434158_X5E43_1348_001_100_0000_Light.jpg", "data1", "data2"],
            13 : ["435809_K2I1J_4560_001_100_0000_Light.jpg", "data1", "data2"],
            14 : ["435809_K2I1J_8636_001_100_0000_Light.jpg", "data1", "data2"],
            15 : ["435818_K2I1J_1000_001_080_0000_Light.jpg", "data1", "data2"],
            16 : ["435818_K2I1J_4560_001_080_0000_Light.jpg", "data1", "data2"],
            17 : ["435818_K2I1J_8636_001_080_0000_Light.jpg", "data1", "data2"],
            18 : ["435819_K2I1J_1000_001_100_0029_Light.jpg", "data1", "data2"],
            19 : ["435819_K2I1J_4560_001_100_0029_Light.jpg", "data1", "data2"],
            20 : ["435847_XR271_4425_001_100_0000_Light.jpg", "data1", "data2"],
            21 : ["437549_K2LWT_8967_001_078_0000_Light.jpg", "data1", "data2"],
            22 : ["442690_K2I1J_4560_001_090_0000_Light.jpg", "data1", "data2"],
            23 : ["442690_K2I1J_8636_001_090_0000_Light.jpg", "data1", "data2"],
            24 : ["443489_ZHX70_9186_001_100_0000_Light.jpg", "data1", "data2"],
            25 : ["443499_DSSAJ_5966_001_073_0031_Light.jpg", "data1", "data2"],
            26 : ["446869_EXHFN_9388_001_085_0000_Light.jpg", "data1", "data2"],
            27 : ["448054_DVR1J_5966_001_070_0000_Light.jpg", "data1", "data2"],
            28 : ["454289_J8500_5702_001_100_0000_Light.jpg", "data1", "data2"],
            29 : ["454328_DSS30_5980_001_079_0000_Light.jpg", "data1", "data2"],
            30 : ["455025_DSV30_5961_001_072_0000_Light.jpg", "data1", "data2"],
            31 : ["455689_DSS00_5964_001_076_0000_Light.jpg", "data1", "data2"],
            32 : ["459158_J8500_5702_001_100_0000_Light.jpg", "data1", "data2"],
            33 : ["459160_J8500_5702_001_100_0000_Light.jpg", "data1", "data2"],
            34 : ["459358_J89L0_8519_001_100_0000_Light.jpg", "data1", "data2"],
            35 : ["459359_J89L0_8490_001_100_0000_Light.jpg", "data1", "data2"],
            36 : ["459368_J89L0_8470_001_100_0000_Light.jpg", "data1", "data2"],
            37 : ["459370_J89L4_8519_001_100_0000_Light.jpg", "data1", "data2"]
        },
        a
    } ();
    a.Items = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function a(a) {
            console.log("constructor"),
            this.name = a
        }
        return a.getCache = function(b) {
            var c = a.cache[b];
            return c || (c = a.cache[b] = new a(b)),
            c
        },
        a.cache = {},
        a
    } ();
    a.VideoData = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function b(a, c) {
            var d = this;
            this.vol = 1,
            this.loaded = !1,
            b.AudioContext || (b.AudioContext = window.AudioContext || window.webkitAudioContext),
            this.$host = a,
            this.isOld = !c,
            this.isOld && (this.$audio = $("<audio></audio>").on("canplaythrough",
            function(a) {
                return d.onReady()
            }).on("error",
            function(a) {}).on("playing",
            function(a) {}), this.audio = this.$audio.get(0), this.$host.append(this.$audio))
        }
        return b.prototype.currentTime = function(a) {
            return void 0 === a && (a = null),
            null == a ? this.isOld ? this.audio.currentTime: Date.now() / 1e3 - this.keyTime: (this.isOld ? (this.audio.pause(), this.audio.currentTime = a, this.audio.play()) : this.targetTime = a, a)
        },
        b.prototype.init = function(a) {
            this.url = a,
            this.isOld ? this.$audio.append('<source src="' + a + '" type="audio/mp3">') : (this.ctx = new b.AudioContext, this.request = new XMLHttpRequest, this.request.open("GET", this.url, !0), this.request.responseType = "arraybuffer")
        },
        b.prototype.load = function() {
            var a = this;
            this.isOld ? this.audio.load() : this.loaded || (this.request.onload = function() {
                a.ctx.decodeAudioData(a.request.response,
                function(b) {
                    a.buffer = b,
                    a.loaded = !0,
                    a.onReady()
                })
            },
            this.request.send())
        },
        b.prototype.play = function(b) {
            void 0 === b && (b = 0),
            this.isOld ? (this.$audio.off("canplay"), this.audio.volume = a.SoundMgr.isMute ? 0 : 1, this.audio.currentTime = b, this.audio.play()) : (this.pause(), this.source = this.ctx.createBufferSource(), this.gain = this.ctx.createGainNode(), this.source.buffer = this.buffer, this.source.connect(this.gain), this.gain.connect(this.ctx.destination), this.source.start = this.source.start || this.source.noteOn, this.source.stop = this.source.stop || this.source.noteOff, this.keyTime = Date.now() / 1e3 - b, this._time = b, this.source.start(0, this._time), this.gain.gain.value = this.vol)
        },
        b.prototype.pause = function(a) {
            if (void 0 === a && (a = null), this.isOld) this.audio.pause(),
            a && (this.audio.currentTime = a);
            else try {
                this.source.stop(0)
            } catch(a) {}
        },
        b.prototype.changeMute = function(a) {
            a ? (this.vol = 0, this.fadeOut()) : (this.vol = 1, this.fadeIn())
        },
        b.prototype.fadeOut = function(a, b) {
            var c = this;
            if (void 0 === a && (a = "slow"), void 0 === b && (b = !1), this.isOld) this.$audio.animate({
                volume: 0
            },
            a, "swing",
            function() {
                b && c.audio.pause(),
                c.audio.volume = 0
            });
            else if (this.gain) var d = setInterval(function() {
                c.gain.gain.value -= .1,
                c.gain.gain.value <= c.vol && (c.gain.gain.value = c.vol, clearInterval(d), b && c.pause())
            },
            1e3 / 30)
        },
        b.prototype.fadeIn = function(a) {
            var b = this;
            if (void 0 === a && (a = "slow"), this.isOld) this.$audio.animate({
                volume: 1
            },
            a, "swing");
            else if (this.gain) var c = setInterval(function() {
                b.gain.gain.value += .1,
                b.gain.gain.value >= b.vol && (b.gain.gain.value = b.vol, clearInterval(c))
            },
            1e3 / 30)
        },
        b.prototype.onSeeked = function(a) {
            var b = this;
            this.isOld ? this.$audio.on("seeked",
            function() {
                a(),
                b.$audio.off("seeked")
            }) : a()
        },
        b.prototype.delete = function() {
            this.pause(),
            this.isOld || this.request.abort()
        },
        b
    } ();
    a.AudioEx = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = co.Ease,
    c = function() {
        function c(b, c, f, g) {
            var h = this;
            void 0 === g && (g = {}),
            this.hostDir = "./",
            this.quality = "",
            this.currentTime = 0,
            this.ghostP = {
                x: 0,
                y: 0
            },
            this.canvasSize = new a.Size,
            this.canvasDrawPosition = {},
            this.duration = 0,
            this.isPause = !1,
            this.isSeeking = !1,
            this.currentTrack = 0,
            this.targetTrackIndex = 0,
            this.targetTrackEnd = 0,
            this.isReadyVideo = !1,
            this.isReadyAudio = !1,
            this.name = b,
            this.tracks = c,
            this.keyPoints = f,
            this.ghostTracker = g,
            this.$ghost = $("<div class='ghost'><img src='../img/icon_ghost.png'></div>").on("click",
            function(a) {
                return h.ghostClick()
            }),
            this.$jq = $("<div></div>").addClass("videoPlayer " + this.name),
            a.Main.isSp ? (this.quality = "_480p1m", this.videoSize = new a.Size(854, 480)) : (this.quality = "_720p2m", this.videoSize = new a.Size(1280, 720)),
            this.useCanvas = a.Main.isIos,
            this.$video = $("<video></video>").attr({
                width: this.videoSize.width,
                height: this.videoSize.height
            }).css({
                position: "absolute",
                top: "50%",
                left: "50%"
            }).on("loadedmetadata",
            function(a) {
                h.duration = h.video.duration
            }).on("canplay",
            function(a) {
                h.isReadyVideo = !0,
                h.ready()
            }).on("error",
            function(a) {}).on("waiting",
            function(a) {
                h.audioEx.pause(h.currentTime)
            }).on("playing",
            function(a) { ! h.isPause && h.isPlay && h.audioEx.play()
            }).on("canplay",
            function(a) {}).on("suspend",
            function(a) {}).on("abort",
            function(a) {}).on("emptied",
            function(a) {}).on("stalled",
            function(a) {}).on("waiting",
            function(a) {}),
            this.video = this.$video.get(0),
            this.audioEx = new a.AudioEx(this.$jq, this.useCanvas),
            this.audioEx.onReady = function() {
                h.isReadyAudio = !0,
                h.ready()
            },
            window[this.name] = this.video,
            this.useCanvas ? (this.$canvas = $("<canvas></canvas>").css({
                width: "100%",
                height: "100%"
            }), this.ctx = this.$canvas.get(0).getContext("2d"), this.$jq.append(this.$canvas)) : this.$jq.append(this.$video),
            this.$jq.append((this.seekBar = new e(this)).$jq).append(this.$ghost).append((this.mouseStorker = new d).$jq).on("click",
            function(a) {
                return h.click(a)
            }).on("mousemove",
            function(a) {
                return h.mouseStorker.mouseMove(a)
            }),
            a.Main.onResize(function() {
                return h.resize()
            }),
            this.resize(),
            a.SoundMgr.$jq.on("muteChange",
            function() { (h.isPlay || h.isPause) && h.audioEx.changeMute(a.SoundMgr.isMute)
            });
            var i = !1;
            $(window).on("blur",
            function() {
                h.isPlay && (i = !0, h.pause())
            }).on("focus",
            function() {
                i && (h.isPause && h.restart(), i = !1)
            })
        }
        return c.prototype.resize = function() {
            var b, c = this.videoSize.getRatio(),
            d = a.Main.size.getRatio();
            if (b = c > d ? this.videoSize.height / a.Main.size.height: this.videoSize.width / a.Main.size.width, this.scale = b, this.$ghost.css("transform", "scale(" + this.videoSize.width / b / 1980 + ")"), this.useCanvas) this.canvasSize.width = Math.ceil(a.Main.size.width * b),
            this.canvasSize.height = Math.ceil(a.Main.size.height * b),
            this.$canvas.attr({
                width: this.canvasSize.width,
                height: this.canvasSize.height
            }),
            this.canvasDrawPosition.x = Math.floor((this.videoSize.width - this.canvasSize.width) * -.5),
            this.canvasDrawPosition.y = Math.floor((this.videoSize.height - this.canvasSize.height) * -.5);
            else {
                var e = 2 * Math.ceil(this.videoSize.width / b / 2),
                f = 2 * Math.ceil(this.videoSize.height / b / 2);
                this.$video.attr({
                    width: e,
                    height: f
                }).css({
                    marginLeft: e / -2,
                    marginTop: f / -2
                })
            } ! a.Main.isSp || a.Main.size.isOblong() ? this.isPause && this.restart() : this.isPlay && this.pause()
        },
        c.prototype.load = function() {
            if (this.isPlay = !1, 0 == this.$video.children().length) {
                var a = "";
                this.audioEx.init(this.hostDir + "../resource/" + this.name + ".mp3"),
                this.$video.append('<source src="' + this.hostDir + "../resource/" + this.name + this.quality + ".mp4?" + a + '" type="video/mp4">')
            }
            return this.audioEx.load(),
            this.video.load(),
            this
        },
        c.prototype.ready = function() {
            this.isReadyAudio && this.isReadyVideo && this.$jq.trigger("ready")
        },
        c.prototype.play = function() {
            return "true" == $.cookie(this.name) && this.$ghost.hide(),
            a.SoundMgr.playing(),
            this.isReadyVideo = this.isReadyAudio = !0,
            this.currentTime = 0,
            this.targetTrackIndex = 0,
            this.$video.off("canplay"),
            this.audioEx.play(this.currentTime),
            this.$jq.show(),
            this.isPlay = !0,
            this.isPause = !1,
            this.isSeeking = !1,
            this.useCanvas || (this.video.currentTime = this.currentTime, this.video.play()),
            this.draw(!0),
            this
        },
        c.prototype.restart = function() {
            return this.isPause ? (this.isPlay = !0, this.isPause = !1, this.isSeeking = !1, this.audioEx.play(this.currentTime), this.video.currentTime = this.currentTime, this.useCanvas || this.video.play(), this.$jq.show(), this.draw(!0), this) : (this.play(), this)
        },
        c.prototype.pause = function() {
            return this.isPlay = !1,
            this.isPause = !0,
            this.audioEx.pause(),
            this.useCanvas || this.video.pause(),
            this
        },
        c.prototype.click = function(a) {
            return 0 == this.targetTrackIndex ? void this.reternMainTrack() : void(this.targetTrackIndex == -1 || a.target != this.video && a.target != this.$canvas.get(0) || this.isSeeking || (this.trackChange(this.targetTrackIndex), this.targetTrackIndex = 0, this.mouseStorker.start(a)))
        },
        c.prototype.trackChange = function(a) {
            0 == this.currentTrack,
            this.currentTrack = a;
            var b = this.tracks[a];
            this.seek(b.s, !0)
        },
        c.prototype.seek = function(a, d) {
            var e = this;
            void 0 === d && (d = !1),
            this.useCanvas && (a += 7 * c.SPF),
            this.isSeeking = !0,
            this.audioEx.fadeOut(500),
            (new co.PonTimeline).cssTo(this.$jq, .5, {
                opacity: 0
            },
            b.ease_out_sine, !0).weitMethod(function(b) {
                function c() {
                    g--,
                    0 == g && (f.$video.off("seeked", c), f.$jq.parent().removeClass("loading"), d && f.restart(), f.audioEx.fadeIn(500), f.isSeeking = !1, b())
                }
                e.pause(),
                e.$jq.parent().addClass("loading");
                var f = e,
                g = 2;
                e.$video.on("seeked", c),
                e.audioEx.onSeeked(c),
                e.currentTime = a,
                e.audioEx.currentTime(a),
                e.video.currentTime = a
            }).weit(c.SPF).cssTo(this.$jq, .5, {
                opacity: 1
            },
            b.ease_out_sine, !0).start()
        },
        c.prototype.draw = function(b) {
            var d = this;
            if (this.isPlay) {
                if (b) if (this.useCanvas ? (this.currentTime = this.audioEx.currentTime(), this.video.currentTime = this.currentTime, this.ctx.drawImage(this.video, this.canvasDrawPosition.x, this.canvasDrawPosition.y, this.videoSize.width, this.videoSize.height)) : (this.currentTime = this.video.currentTime, Math.abs(this.currentTime - this.audioEx.currentTime()) > .5 && this.audioEx.currentTime(this.currentTime)), 0 == this.currentTrack) {
                    this.targetTrackIndex = -1,
                    this.targetTrackEnd = 0;
                    for (var e = 0; e < this.keyPoints.length; e++) {
                        var f = this.keyPoints[e];
                        if (f.s < this.currentTime && this.currentTime <= f.e) {
                            this.targetTrackIndex = f.i,
                            this.targetTrackEnd = f.e + 3 * c.SPF;
                            break
                        }
                    }
                    if (this.targetTrackIndex == -1 ? this.$jq.css("cursor", "") : this.$jq.css("cursor", "pointer"), "true" != $.cookie(this.name)) {
                        var g = Math.round(this.currentTime * c.FPS),
                        h = this.ghostTracker[g]; ! this.ghostMp && h && (this.ghostP = h),
                        this.ghostMp = h
                    }
                    this.seekBar.update(),
                    this.$jq.removeClass("detail")
                } else this.$jq.addClass("detail");
                else if (!this.isSeeking && this.currentTime >= this.tracks[this.currentTrack].e - .5) {
                    if (0 == this.currentTrack) return this.isSeeking = !0,
                    this.$jq.trigger("complete"),
                    setTimeout(function() {
                        d.audioEx.fadeOut(500, !0),
                        a.SoundMgr.stop()
                    },
                    1e3 * (this.tracks[this.currentTrack].e2 - this.currentTime) - 500),
                    void setTimeout(function() {
                        d.video.pause(),
                        d.isPause = d.isPlay = !1
                    },
                    500);
                    this.reternMainTrack()
                }
                "true" != $.cookie(this.name) && (this.ghostMp ? (this.ghostP.x += (this.ghostMp.x - this.ghostP.x) / 4, this.ghostP.y += (this.ghostMp.y - this.ghostP.y) / 4, this.$ghost.css({
                    visibility: "visible",
                    left: this.ghostP.x * this.videoSize.width / this.scale,
                    top: this.ghostP.y * this.videoSize.height / this.scale,
                    opacity: this.ghostMp.a
                })) : this.$ghost.css({
                    visibility: ""
                })),
                0 != this.currentTrack && this.mouseStorker.update(),
                requestAnimationFrame(function() {
                    return d.draw(!b)
                })
            }
        },
        c.prototype.ghostClick = function() {
            var a = this;
            $.cookie(this.name, !0),
            (new co.PonTimeline).cssTo(this.$ghost, 1, {
                transform: "scale(2)",
                opacity: 0
            },
            b.ease_out_quad, !0).method(function() {
                a.$ghost.hide()
            }).start()
        },
        c.prototype.reternMainTrack = function() {
            this.currentTrack = 0,
            this.seek(this.targetTrackEnd, !0)
        },
        c.prototype.stop = function() {
            this.isPlay = !1,
            this.isPause = !1,
            this.useCanvas || this.video.pause(),
            this.audioEx.delete()
        },
        c.FPS = 23.976,
        c.SPF = 1 / 23.976,
        c
    } ();
    a.VideoPlayer = c;
    var d = function() {
        function a() {
            this.xy = {
                x: 0,
                y: 0
            },
            this.xy2 = {
                x: 0,
                y: 0
            },
            this.$jq = $('<a class="close btn"></a>')
        }
        return a.prototype.mouseMove = function(a) {
            this.xy.x = a.clientX,
            this.xy.y = a.clientY
        },
        a.prototype.start = function(a) {
            this.xy2.x = a.clientX,
            this.xy2.y = a.clientY
        },
        a.prototype.update = function() {
            this.xy2.x += (this.xy.x - 7 - this.xy2.x) / 10,
            this.xy2.y += (this.xy.y - 7 - this.xy2.y) / 10,
            this.$jq.css({
                transform: "translateX(" + this.xy2.x + "px) translateY(" + this.xy2.y + "px)"
            })
        },
        a
    } ();
    a.MouseStoker = d;
    var e = function() {
        function b(b) {
            function c(a) {
                var b = a.originalEvent.changedTouches ? a.originalEvent.changedTouches[0].pageX: a.pageX,
                c = b - f.$jq.offset().left;
                c < 0 ? c = 0 : c > f.$jq.find(".line").width() && (c = f.$jq.find(".line").width()),
                f.$nob.css("left", c)
            }
            function d(a) {
                if (f.isMouseDown) {
                    $(window).off("mouseup", d).off("touchend", d).off("mousemove", c).off("touchmove", c),
                    f.isMouseDown = !1;
                    var b = parseInt(f.$nob.css("left")) / f.$jq.find(".line").width();
                    f.videoPlayer.seek(f.videoPlayer.tracks[0].e * b, !0),
                    f.flag = !0,
                    setTimeout(function() {
                        return f.flag = !1
                    },
                    500)
                }
            }
            var e = this;
            this.isMouseDown = !1,
            this.flag = !1,
            this.videoPlayer = b,
            this.$jq = $("<div class='seekbar'><span class='line'></span><span class='nob'></span></div>").on("click",
            function(a) {
                return e.seekbarClick(a)
            }),
            this.touchMode = a.Main.isIos || a.Main.isAndroid,
            this.$nob = this.$jq.find(".nob"),
            this.touchMode ? this.$nob.on("touchstart",
            function(a) {
                e.isMouseDown || ($(window).on("touchend", d).on("touchmove", c).on("mousemove", c), e.isMouseDown = !0, e.videoPlayer.pause())
            }) : this.$nob.on("mousedown",
            function(a) {
                e.isMouseDown || ($(window).on("mouseup", d).on("touchmove", c).on("mousemove", c), e.isMouseDown = !0, e.videoPlayer.pause())
            });
            var f = this
        }
        return b.prototype.seekbarClick = function(a) {
            if (!this.flag && a.target != this.$nob.get(0)) {
                var b = a.offsetX / this.$jq.width() * this.videoPlayer.tracks[0].e,
                d = Math.floor(b * c.FPS);
                b = d * c.SPF,
                this.videoPlayer.seek(b, !0)
            }
        },
        b.prototype.update = function() {
            this.isMouseDown || this.$nob.css("left", this.videoPlayer.currentTime / this.videoPlayer.tracks[0].e * 100 + "%")
        },
        b
    } ();
    a.SeekBar = e
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function b() {}
        return b.init = function(c) {
            b.$jq = c,
            b.$box = b.$jq.find(".box"),
            b.$jq.css("visibility", "hidden"),
            b.$jq.find(".close").on("click",
            function() {
                b.close()
            }),
            a.Main.onResize(function() {
                b.$box.attr("style", "");
                var c = Math.min(b.$box.width(), b.$box.height());
                b.$box.css({
                    top: (a.Main.size.height - c) / 2,
                    left: (a.Main.size.width - c) / 2,
                    width: c,
                    height: c
                })
            })
        },
        b.show = function(c, d) {
            if (void 0 === d && (d = null), null != d) {
                b.isshow = !0,
                b.onClose = d;
                var e = a.Items.list[c];
                b.$jq.css({
                    visibility: "",
                    opacity: 0
                }),
                b.$jq.find(".photo").addClass("loading").find("img").on("load",
                function(a) {
                    $(a.currentTarget).off("load").parent().removeClass("loading")
                }).attr("src", a.Items.getPath(c)),
                b.$jq.find(".text1").html(e[1]),
                b.$jq.find(".text2").html(e[2]),
                (new co.PonTimeline).weit(1 / 30).cssTo(b.$jq, .4, {
                    opacity: 1
                },
                co.Ease.ease_out_sine, !0).cssClear(b.$jq).start()
            }
        },
        b.close = function() {
            b.isshow && (b.isshow = !1, (new co.PonTimeline).cssTo(b.$jq, .4, {
                opacity: 0
            },
            co.Ease.ease_out_sine, !0).cssSet(b.$jq, {
                visibility: "hidden"
            }).method(b.onClose).start(), b.onClose = null)
        },
        b.isshow = !1,
        b
    } ();
    a.ItemDetail = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function() {
        function a(a) {
            var b = this;
            this.bgPath = "",
            this.openBgPath = "",
            this.closeBgPath = "",
            this.$jq = a.css({
                display: "none",
                opacity: 0
            }),
            this.$startBtn = a.find(".moNextBtn").on("click",
            function(a) {
                b.$startBtn.hasClass("disabled") || b.play()
            }),
            this.$interactive = a.find(".interactive"),
            this.$intro = a.find(".intro")
        }
        return a.prototype.show = function() {
            this.$interactive.css({
                visibility: "hidden",
                opacity: 0
            }),
            this.$jq.css({
                display: "",
                opacity: 1
            })
        },
        a.prototype.showed = function() {},
        a.prototype.load = function() {},
        a.prototype.ready = function() {
            this.$startBtn.removeClass("disabled")
        },
        a.prototype.play = function() {
            var a = this,
            b = $(".transition"),
            c = b.find(".left"),
            d = b.find(".right"),
            e = .8; (new co.PonTimeline).method(function() {
                b.removeClass("toggle"),
                c.empty().attr("style", "").append(a.$intro.clone().width(a.$intro.width())),
                d.empty().attr("style", "").append(a.$intro.clone().width(a.$intro.width())),
                a.$interactive.css({
                    visibility: "",
                    transform: "scale(0.85)",
                    opacity: 0
                }),
                a.$intro.hide()
            }).weit(1 / 30).cssTo(this.$interactive, e, {
                transform: "",
                opacity: ""
            },
            co.Ease.ease_out_sine, !1).cssTo(c, e, {
                transform: "translateX(-100%)"
            },
            co.Ease.ease_in_out_circ, !1).cssTo(d, e, {
                transform: "translateX(100%)"
            },
            co.Ease.ease_in_out_circ, !0).method(function() {
                c.empty().attr("style", ""),
                d.empty().attr("style", ""),
                b.addClass("toggle")
            }).start()
        },
        a.prototype.hide = function() {},
        a.prototype.hided = function() {
            this.$jq.css({
                display: "none",
                opacity: 0
            })
        },
        a
    } ();
    a.Page = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(b) {
        function c(c) {
            var d = this;
            b.call(this, c),
            this.bgPath = "../img/top_off.jpg",
            this.$bg = this.$jq.find(".bg"),
            this.$onimg = this.$jq.find(".onimg"),
            this.$btn = this.$jq.find(".nextBtn").css({
                opacity: 0
            }),
            this.loadQue = (new a.LoaderQue).imgLoad(this.bgPath,
            function(a) {
                d.closeBgPath = d.bgPath,
                d.$bg.css({
                    "background-image": "url(" + a.attr("src") + ")",
                    opacity: 0
                })
            }).imgLoad("../img/top_on.jpg",
            function(a) {
                d.openBgPath = a.attr("src"),
                d.$onimg.css({
                    "background-image": "url(" + a.attr("src") + ")",
                    opacity: 0
                })
            }).onComplete(function() {
                d.$jq.removeClass("loading"),
                d.startTitleAnime()
            })
        }
        return __extends(c, b),
        c.prototype.show = function() {
            b.prototype.show.call(this),
            "loaded" != this.loadQue.status ? (this.$jq.addClass("loading"), a.Main.instance.loader.loadQue(this.loadQue)) : (this.$jq.removeClass("loading"), this.$onimg.css({
                opacity: 0,
                transition: ""
            }), this.startTitleAnime())
        },
        c.prototype.showed = function() {
            b.prototype.showed.call(this)
        },
        c.prototype.play = function() {
            b.prototype.play.call(this)
        },
        c.prototype.hided = function() {
            this.currentTimeLine.destroy(),
            b.prototype.hided.call(this)
        },
        c.prototype.startTitleAnime = function() {
            var a = this;
            this.$onimg.css({
                visibility: "",
                opacity: 0
            }),
            this.currentTimeLine = (new co.PonTimeline).weit(1 / 30).cssTo(this.$bg, .8, {
                opacity: 1
            },
            co.Ease.ease_in_out_sine, !0).weit(1).cssTo(this.$onimg, .1, {
                opacity: .15
            },
            co.Ease.ease_in_out_sine, !0).cssTo(this.$onimg, .1, {
                opacity: 0
            },
            co.Ease.ease_in_out_sine, !0).cssTo(this.$onimg, .08, {
                opacity: .15
            },
            co.Ease.ease_in_out_sine, !0).cssTo(this.$onimg, .08, {
                opacity: 0
            },
            co.Ease.ease_in_out_sine, !0).weit(.5).cssTo(this.$onimg, .6, {
                opacity: 1
            },
            co.Ease.ease_in_out_quad, !0).cssTo(this.$onimg, .2, {
                opacity: .9
            },
            co.Ease.ease_out_sine, !0).cssTo(this.$onimg, 1.1, {
                opacity: 1
            },
            co.Ease.ease_out_sine, !0).weit(.5).cssTo(this.$btn, .8, {
                opacity: 1
            },
            co.Ease.ease_out_quad, !1).method(function() {
                return a.loopTitleAnime()
            }).start()
        },
        c.prototype.loopTitleAnime = function() {
            var a = this;
            this.currentTimeLine = new co.PonTimeline;
            var b;
            switch (Math.floor(20 * Math.random())) {
            case 1:
                this.currentTimeLine.cssTo(this.$onimg, .1, {
                    opacity: .8
                },
                co.Ease.ease_in_out_sine, !0).cssTo(this.$onimg, .1, {
                    opacity: 1
                },
                co.Ease.ease_in_out_sine, !0).cssTo(this.$onimg, .08, {
                    opacity: .85
                },
                co.Ease.ease_in_out_sine, !0).cssTo(this.$onimg, .08, {
                    opacity: 1
                },
                co.Ease.ease_in_out_sine, !0);
                break;
            default:
                b = 1.5,
                this.currentTimeLine.cssTo(this.$onimg, b, {
                    opacity: .9
                },
                co.Ease.ease_in_out_quad, !0).cssTo(this.$onimg, b, {
                    opacity: 1
                },
                co.Ease.ease_in_out_quad, !0).weit(1.5 + Math.random() / 2)
            }
            this.currentTimeLine.method(function() {
                return a.loopTitleAnime()
            }).start()
        },
        c
    } (a.Page);
    a.Top = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b)
        }
        return __extends(b, a),
        b.prototype.showed = function() {
            a.prototype.showed.call(this)
        },
        b
    } (a.Page);
    a.About = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(b) {
        function c(c) {
            var d = this;
            b.call(this, c),
            this.size = new a.Size(1440, 810),
            this.bgPath = "../img/bg_map.jpg",
            this.timelines = [],
            this.$bg = this.$jq.find(".bg"),
            this.layers = {
                ghost: this.$jq.find(".ghost"),
                garden: this.$jq.find(".garden"),
                herbarium: this.$jq.find(".herbarium"),
                words: this.$jq.find(".words"),
                icon3: this.$jq.find(".icon3"),
                icon2: this.$jq.find(".icon2"),
                icon1: this.$jq.find(".icon1")
            },
            this.idToTarget = {
                "#words": this.layers.words,
                "#herbarium": this.layers.herbarium,
                "#garden": this.layers.garden,
                "#ghost": this.layers.ghost
            },
            this.loadQue = (new a.LoaderQue).imgLoad(this.bgPath,
            function(a) {
                d.$bg.css({
                    "background-image": "url(" + a.attr("src") + ")",
                    opacity: 0
                }),
                d.openBgPath = d.bgPath,
                d.closeBgPath = d.bgPath,
                (new co.PonTimeline).weit(1 / 30).cssTo(d.$bg, .4, {
                    opacity: 1
                },
                co.Ease.ease_out_quad).method(function() {
                    d.$jq.removeClass("loading")
                }).start()
            }).weit().imgLoad("../img/_map_words_on.png",
            function(a) {
                return d.showIn(d.layers.words, a)
            }).weit().imgLoad("../img/_map_herbarium_on.png",
            function(a) {
                return d.showIn(d.layers.herbarium, a)
            }).weit().imgLoad("../img/_map_garden_on.png",
            function(a) {
                return d.showIn(d.layers.garden, a)
            }).weit().imgLoad("../img/_map_ghost_on.png",
            function(a) {
                return d.showIn(d.layers.ghost, a)
            }).weit().imgLoad("../img/_map_ghost_1.png",
            function(a) {
                return d.showIn(d.layers.icon1, a)
            }).weit().imgLoad("../img/_map_ghost_2.png",
            function(a) {
                return d.showIn(d.layers.icon2, a)
            }).weit().imgLoad("../img/_map_ghost_3.png",
            function(a) {
                return d.showIn(d.layers.icon3, a)
            }).weit().imgLoad("../img/_map_words_on_on.png",
            function(a) {
                return d.layers.words.append(a.addClass("_on"))
            }).imgLoad("../img/_map_herbarium_on_on.png",
            function(a) {
                return d.layers.herbarium.append(a.addClass("_on"))
            }).imgLoad("../img/_map_garden_on_on.png",
            function(a) {
                return d.layers.garden.append(a.addClass("_on"))
            }).imgLoad("../img/_map_ghost_on_on.png",
            function(a) {
                return d.layers.ghost.append(a.addClass("_on"))
            }).onComplete(function() {
                d.loadAfterSetting()
            }),
            a.Main.onResize(function() {
                return d.resize()
            })
        }
        return __extends(c, b),
        c.prototype.showIn = function(a, b) {
            switch (void 0 === b && (b = null), b && a.append(b), a) {
            case this.layers.ghost:
                if (!this.isGhost) return void this.timelines.push((new co.PonTimeline).cssSet(a, {
                    visibility: "visible"
                }).cssSet(a.find("img"), {
                    opacity: 0
                }).weit(1 / 30).label("a").cssTo(a.find("img"), .04, {
                    opacity: .2
                },
                co.Ease.ease_in_out_sine, !0).weit(.1).cssTo(a.find("img"), .04, {
                    opacity: 0
                },
                co.Ease.ease_in_out_sine, !0).weit(5 / 30).cssTo(a.find("img"), .1, {
                    opacity: .2
                },
                co.Ease.ease_in_out_sine, !0).weit(.1).cssTo(a.find("img"), .4, {
                    opacity: 0
                },
                co.Ease.ease_in_out_sine, !0).weitMethod(function(a) {
                    return setTimeout(a, 1e3 * Math.random() + 1e3)
                }).loop("a", 0).start());
                break;
            case this.layers.icon1:
                if ("true" != $.cookie("words")) return;
                break;
            case this.layers.icon2:
                if ("true" != $.cookie("herbarium")) return;
                break;
            case this.layers.icon3:
                if ("true" != $.cookie("garden")) return
            }
            this.timelines.push((new co.PonTimeline).cssSet(a, {
                visibility: "visible",
                opacity: 0
            }).weit(1 / 30).cssTo(a, .1, {
                opacity: .15
            },
            co.Ease.ease_in_out_sine, !0).cssTo(a, .1, {
                opacity: 0
            },
            co.Ease.ease_in_out_sine, !0).cssTo(a, .08, {
                opacity: .15
            },
            co.Ease.ease_in_out_sine, !0).cssTo(a, .08, {
                opacity: 0
            },
            co.Ease.ease_in_out_sine, !0).cssTo(a, .4, {
                opacity: 1
            },
            co.Ease.ease_in_out_quad, !0).cssTo(a, .1, {
                opacity: .9
            },
            co.Ease.ease_out_sine, !0).cssTo(a, .7, {
                opacity: 1
            },
            co.Ease.ease_out_sine, !0).start())
        },
        c.prototype.loadAfterSetting = function() {
            var a = this;
            this.$jq.find(".menu a").on("mouseenter",
            function(b) {
                a.menuBtnHover(a.idToTarget[$(b.currentTarget).data("href")])
            }).on("mouseleave",
            function(b) {
                a.menuBtnLeave(a.idToTarget[$(b.currentTarget).data("href")])
            })
        },
        c.prototype.menuBtnHover = function(a) { (this.isGhost || a != this.layers.ghost) && (a.tl && a.tl.destroy(), a.tl = (new co.PonTimeline).cssTo(a.find("img"), .6, {
                opacity: 1
            },
            co.Ease.ease_out_quad).cssTo(a.find("img"), .6, {
                opacity: .85
            },
            co.Ease.ease_out_quad).loop("", 0).start())
        },
        c.prototype.menuBtnLeave = function(a) { (this.isGhost || a != this.layers.ghost) && (a.tl && a.tl.destroy(), a.tl = (new co.PonTimeline).cssTo(a.find("img"), 1, {
                opacity: ""
            },
            co.Ease.ease_out_quad).start())
        },
        c.prototype.resize = function() {
            var b = 0;
            b = a.Main.size.getRatio() < this.size.getRatio() ? a.Main.size.height / this.size.height: a.Main.size.width / this.size.width,
            a.Main.isSp && (b *= 1.3),
            this.$jq.find(".menu,.layers").css("transform", "scale(" + b + ")")
        },
        c.prototype.show = function() {
            var c = this;
            if (b.prototype.show.call(this), this.$jq.find(".layers").attr("style", "").find("div,img").attr("style", ""), this.isGhost = "true" == $.cookie("words") && "true" == $.cookie("herbarium") && "true" == $.cookie("garden"), "loaded" != this.loadQue.status) this.$jq.addClass("loading"),
            a.Main.instance.loader.loadQue(this.loadQue);
            else {
                this.$jq.removeClass("loading");
                for (var d in this.layers) !
                function(a) {
                    setTimeout(function() {
                        c.showIn(a)
                    },
                    100 * Math.random())
                } (this.layers[d])
            }
            this.resize()
        },
        c.prototype.showed = function() {
            b.prototype.showed.call(this)
        },
        c.prototype.play = function() {
            b.prototype.play.call(this)
        },
        c.prototype.hide = function() { (new co.PonTimeline).cssTo(this.$jq.find(".layers"), .3, {
                opacity: 0
            },
            co.Ease.ease_in_out_cubic).start(),
            b.prototype.hide.call(this)
        },
        c.prototype.hided = function() {
            for (b.prototype.hided.call(this); this.timelines.length;) try {
                this.timelines.shift().destroy()
            } catch(a) {}
        },
        c
    } (a.Page);
    a.Map = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(b) {
        function c(c, d) {
            var e = this;
            b.call(this, c),
            this.label = d,
            this.$title = c.find(".title"),
            this.$bg = c.find(".bg"),
            this.$completion = c.find(".completion");
            var f = this.$jq.find(".info");
            this.$jq.find("a.profile").on("click",
            function() {
                f.removeClass("toggle"),
                window.ga("send", "pageview", location.pathname + location.hash + "_profile")
            }),
            this.$jq.find(".modal").on("click",
            function() {
                return f.addClass("toggle")
            }),
            this.loadQue = (new a.LoaderQue).imgLoad("../img/bg_" + this.label + ".jpg",
            function(a) {
                e.$bg.css({
                    "background-image": "url(" + a.attr("src") + ")",
                    opacity: 0
                })
            }).imgLoad("../img/title_" + this.label + "_off.png",
            function(a) {
                e.$img_off = a.css({
                    opacity: 0
                }).addClass("e_off"),
                e.$title.append(a)
            }).imgLoad("../img/title_" + this.label + ".png",
            function(a) {
                e.$img_on = a.css({
                    opacity: 0
                }).addClass("e_on"),
                e.$title.append(a)
            }).onComplete(function() {
                e.$jq.removeClass("loading"),
                (new co.PonTimeline).weit(1 / 30).cssTo(e.$bg, .4, {
                    opacity: ""
                },
                co.Ease.ease_out_sine, !1).weit(.4).cssTo(e.$img_off, .4, {
                    opacity: 1
                },
                co.Ease.ease_out_sine, !0).method(function() {
                    return e.startTitleAnime()
                }).start()
            })
        }
        return __extends(c, b),
        c.prototype.show = function() {
            b.prototype.show.call(this),
            this.$intro.show(),
            "loaded" != this.loadQue.status ? (this.$jq.addClass("loading"), a.Main.instance.loader.loadQue(this.loadQue)) : (this.$jq.removeClass("loading"), this.startTitleAnime())
        },
        c.prototype.showed = function() {
            b.prototype.showed.call(this)
        },
        c.prototype.play = function() {
            var a = this;
            b.prototype.play.call(this),
            setTimeout(function() {
                a.$intro.hide()
            },
            1e3),
            this.currentTimeLine.destroy()
        },
        c.prototype.hide = function() {
            a.SoundMgr.stop(),
            b.prototype.hide.call(this)
        },
        c.prototype.hided = function() {
            this.currentTimeLine.destroy(),
            this.$completion.addClass("toggle"),
            b.prototype.hided.call(this)
        },
        c.prototype.startTitleAnime = function() {
            var a = this;
            this.$img_on.css({
                visibility: "",
                opacity: 0
            }),
            this.$img_off.css({
                visibility: "",
                opacity: ""
            });
            var b, c, d;
            this.currentTimeLine = (new co.PonTimeline).weit(1).cssTo(this.$img_on, c = .3, {
                opacity: b = 1
            },
            d = co.Ease.ease_in_sine, !1).cssTo(this.$img_off, c, {
                opacity: 1 - b
            },
            d, !0).cssTo(this.$img_on, c = .06, {
                opacity: b = .6
            },
            d = co.Ease.ease_out_sine, !1).cssTo(this.$img_off, c, {
                opacity: 1 - b
            },
            d, !0).cssTo(this.$img_on, c = .06, {
                opacity: b = 1
            },
            d = co.Ease.ease_out_sine, !1).cssTo(this.$img_off, c, {
                opacity: 1 - b
            },
            d, !0).method(function() {
                return a.loopTitleAnime()
            }).start()
        },
        c.prototype.loopTitleAnime = function() {
            var a = this;
            this.currentTimeLine = (new co.PonTimeline).weit(8 * Math.random() + 5);
            var b, c, d;
            switch (Math.floor(3 * Math.random())) {
            case 0:
                this.currentTimeLine.cssTo(this.$img_on, c = 1 / 30, {
                    opacity: b = 0
                },
                d = "linear", !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0).weit(.35).cssTo(this.$img_on, c = .3, {
                    opacity: b = 1
                },
                d = co.Ease.ease_in_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0).cssTo(this.$img_on, c = .06, {
                    opacity: b = .6
                },
                d = co.Ease.ease_out_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0).cssTo(this.$img_on, c = .06, {
                    opacity: b = 1
                },
                d = co.Ease.ease_out_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0);
                break;
            case 1:
                this.currentTimeLine.cssTo(this.$img_on, c = .5, {
                    opacity: b = .6
                },
                d = co.Ease.ease_in_out_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0).weit(1).cssTo(this.$img_on, c = 1, {
                    opacity: b = 1
                },
                d = co.Ease.ease_in_out_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0);
                break;
            case 2:
                this.currentTimeLine.cssTo(this.$img_on, c = .06, {
                    opacity: b = .6
                },
                d = co.Ease.ease_out_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0).cssTo(this.$img_on, c, {
                    opacity: b = 1
                },
                d = co.Ease.ease_out_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0).cssTo(this.$img_on, c, {
                    opacity: b = .6
                },
                d = co.Ease.ease_out_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0).cssTo(this.$img_on, c, {
                    opacity: b = 1
                },
                d = co.Ease.ease_out_sine, !1).cssTo(this.$img_off, c, {
                    opacity: 1 - b
                },
                d, !0)
            }
            this.currentTimeLine.method(function() {
                return a.loopTitleAnime()
            }).start()
        },
        c.prototype.hoge = function(a) {
            var b = a.split(":");
            return 60 * parseInt(b[0]) + parseInt(b[1]) + parseInt(b[2]) * (1 / 23.976)
        },
        c
    } (a.Page);
    a.Room = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(b) {
        function c(c) {
            var d = this;
            b.call(this, c, "words"),
            this.videoPlayer = new a.VideoPlayer(this.label, [{
                s: 0,
                e: this.hoge("2:32:10"),
                e2: this.hoge("2:35:00")
            },
            {
                s: this.hoge("2:39:00"),
                e: this.hoge("2:59:08")
            },
            {
                s: this.hoge("2:59:10"),
                e: this.hoge("3:09:07")
            },
            {
                s: this.hoge("3:09:09"),
                e: this.hoge("3:19:07")
            },
            {
                s: this.hoge("3:19:09"),
                e: this.hoge("3:29:03")
            },
            {
                s: this.hoge("3:29:05"),
                e: this.hoge("3:39:19")
            },
            {
                s: this.hoge("3:39:21"),
                e: this.hoge("3:49:13")
            }], [{
                i: 3,
                s: this.hoge("0:31:11"),
                e: this.hoge("0:42:20")
            },
            {
                i: 6,
                s: this.hoge("0:44:16"),
                e: this.hoge("0:52:23")
            },
            {
                i: 5,
                s: this.hoge("0:53:08"),
                e: this.hoge("1:01:03")
            },
            {
                i: 2,
                s: this.hoge("1:02:05"),
                e: this.hoge("1:12:00")
            },
            {
                i: 4,
                s: this.hoge("1:14:11"),
                e: this.hoge("1:32:12")
            },
            {
                i: 1,
                s: this.hoge("1:33:07"),
                e: this.hoge("1:46:15")
            }], {
                422 : {
                    x: .647916,
                    y: .251851,
                    a: .08
                },
                422 : {
                    x: .645067,
                    y: .251227,
                    a: .16
                },
                423 : {
                    x: .642213,
                    y: .250604,
                    a: .25
                },
                424 : {
                    x: .639364,
                    y: .24998,
                    a: .33
                },
                425 : {
                    x: .636515,
                    y: .249356,
                    a: .41
                },
                426 : {
                    x: .633661,
                    y: .248733,
                    a: .5
                },
                426 : {
                    x: .630812,
                    y: .248109,
                    a: .58
                },
                427 : {
                    x: .627958,
                    y: .247485,
                    a: .66
                },
                428 : {
                    x: .625109,
                    y: .246862,
                    a: .75
                },
                429 : {
                    x: .62226,
                    y: .246237,
                    a: .83
                },
                429 : {
                    x: .619406,
                    y: .245613,
                    a: .91
                },
                430 : {
                    x: .616557,
                    y: .244989,
                    a: 1
                },
                431 : {
                    x: .613708,
                    y: .244366,
                    a: 1
                },
                432 : {
                    x: .610854,
                    y: .243742,
                    a: 1
                },
                432 : {
                    x: .608005,
                    y: .243118,
                    a: 1
                },
                433 : {
                    x: .605151,
                    y: .242495,
                    a: 1
                },
                434 : {
                    x: .602302,
                    y: .241871,
                    a: 1
                },
                435 : {
                    x: .599453,
                    y: .241247,
                    a: 1
                },
                435 : {
                    x: .596598,
                    y: .240624,
                    a: 1
                },
                436 : {
                    x: .593755,
                    y: .240001,
                    a: 1
                },
                437 : {
                    x: .590906,
                    y: .239377,
                    a: 1
                },
                438 : {
                    x: .588062,
                    y: .238755,
                    a: 1
                },
                439 : {
                    x: .585218,
                    y: .238132,
                    a: 1
                },
                439 : {
                    x: .582369,
                    y: .23751,
                    a: 1
                },
                440 : {
                    x: .579526,
                    y: .236887,
                    a: 1
                },
                441 : {
                    x: .576677,
                    y: .236264,
                    a: 1
                },
                442 : {
                    x: .573833,
                    y: .235641,
                    a: 1
                },
                442 : {
                    x: .570984,
                    y: .235018,
                    a: 1
                },
                443 : {
                    x: .568135,
                    y: .234396,
                    a: 1
                },
                444 : {
                    x: .567375,
                    y: .233773,
                    a: 1
                },
                445 : {
                    x: .564494,
                    y: .233143,
                    a: 1
                },
                445 : {
                    x: .561614,
                    y: .232513,
                    a: 1
                },
                446 : {
                    x: .558734,
                    y: .231885,
                    a: 1
                },
                447 : {
                    x: .555854,
                    y: .231256,
                    a: 1
                },
                448 : {
                    x: .552979,
                    y: .230628,
                    a: 1
                },
                449 : {
                    x: .550098,
                    y: .23,
                    a: 1
                },
                449 : {
                    x: .547213,
                    y: .229374,
                    a: 1
                },
                450 : {
                    x: .544333,
                    y: .228746,
                    a: 1
                },
                451 : {
                    x: .541453,
                    y: .228119,
                    a: 1
                },
                452 : {
                    x: .538572,
                    y: .227493,
                    a: 1
                },
                452 : {
                    x: .535692,
                    y: .226867,
                    a: 1
                },
                453 : {
                    x: .532812,
                    y: .226241,
                    a: 1
                },
                454 : {
                    x: .529927,
                    y: .225615,
                    a: 1
                },
                455 : {
                    x: .527046,
                    y: .224989,
                    a: 1
                },
                455 : {
                    x: .524161,
                    y: .224364,
                    a: 1
                },
                456 : {
                    x: .521281,
                    y: .223739,
                    a: 1
                },
                457 : {
                    x: .518398,
                    y: .223114,
                    a: 1
                },
                458 : {
                    x: .515515,
                    y: .222489,
                    a: 1
                },
                458 : {
                    x: .512631,
                    y: .221865,
                    a: 1
                },
                459 : {
                    x: .509747,
                    y: .221241,
                    a: 1
                },
                460 : {
                    x: .506864,
                    y: .220617,
                    a: 1
                },
                461 : {
                    x: .503979,
                    y: .219993,
                    a: 1
                },
                462 : {
                    x: .501095,
                    y: .219369,
                    a: 1
                },
                462 : {
                    x: .49821,
                    y: .218745,
                    a: 1
                },
                463 : {
                    x: .495326,
                    y: .218122,
                    a: 1
                },
                464 : {
                    x: .492441,
                    y: .217499,
                    a: 1
                },
                465 : {
                    x: .489556,
                    y: .216875,
                    a: 1
                },
                465 : {
                    x: .486671,
                    y: .216252,
                    a: 1
                },
                466 : {
                    x: .483786,
                    y: .215629,
                    a: 1
                },
                467 : {
                    x: .480901,
                    y: .215006,
                    a: 1
                },
                468 : {
                    x: .478016,
                    y: .214384,
                    a: 1
                },
                468 : {
                    x: .47513,
                    y: .213761,
                    a: 1
                },
                469 : {
                    x: .472245,
                    y: .213138,
                    a: 1
                },
                470 : {
                    x: .469359,
                    y: .212516,
                    a: 1
                },
                471 : {
                    x: .466473,
                    y: .211893,
                    a: 1
                },
                472 : {
                    x: .463588,
                    y: .211271,
                    a: 1
                },
                472 : {
                    x: .460702,
                    y: .210649,
                    a: 1
                },
                473 : {
                    x: .457816,
                    y: .210027,
                    a: 1
                },
                474 : {
                    x: .454931,
                    y: .209405,
                    a: 1
                },
                475 : {
                    x: .452045,
                    y: .208783,
                    a: 1
                },
                475 : {
                    x: .449159,
                    y: .208161,
                    a: 1
                },
                476 : {
                    x: .446274,
                    y: .207539,
                    a: 1
                },
                477 : {
                    x: .443388,
                    y: .206917,
                    a: 1
                },
                478 : {
                    x: .440503,
                    y: .206296,
                    a: 1
                },
                478 : {
                    x: .437617,
                    y: .205675,
                    a: 1
                },
                479 : {
                    x: .434732,
                    y: .205052,
                    a: 1
                },
                480 : {
                    x: .431847,
                    y: .204431,
                    a: 1
                },
                481 : {
                    x: .428962,
                    y: .203809,
                    a: 1
                },
                481 : {
                    x: .426077,
                    y: .203187,
                    a: 1
                },
                482 : {
                    x: .423192,
                    y: .202566,
                    a: 1
                },
                483 : {
                    x: .420308,
                    y: .201944,
                    a: 1
                },
                484 : {
                    x: .417425,
                    y: .201323,
                    a: 1
                },
                485 : {
                    x: .414541,
                    y: .200701,
                    a: 1
                },
                485 : {
                    x: .411658,
                    y: .200079,
                    a: 1
                },
                486 : {
                    x: .408775,
                    y: .199458,
                    a: 1
                },
                487 : {
                    x: .405892,
                    y: .198836,
                    a: .91
                },
                488 : {
                    x: .403009,
                    y: .198213,
                    a: .83
                },
                488 : {
                    x: .400127,
                    y: .197591,
                    a: .75
                },
                489 : {
                    x: .397245,
                    y: .196968,
                    a: .66
                },
                490 : {
                    x: .394363,
                    y: .196345,
                    a: .58
                },
                491 : {
                    x: .391482,
                    y: .195722,
                    a: .5
                },
                491 : {
                    x: .388603,
                    y: .195099,
                    a: .41
                },
                492 : {
                    x: .385723,
                    y: .194474,
                    a: .33
                },
                493 : {
                    x: .382843,
                    y: .193848,
                    a: .25
                },
                494 : {
                    x: .382045,
                    y: .193221,
                    a: .16
                },
                495 : {
                    x: .377083,
                    y: .192592,
                    a: .08
                },
                3152 : {
                    x: .647916,
                    y: .251851,
                    a: .08
                },
                3153 : {
                    x: .645067,
                    y: .251227,
                    a: .16
                },
                3153 : {
                    x: .642213,
                    y: .250604,
                    a: .25
                },
                3154 : {
                    x: .639364,
                    y: .24998,
                    a: .33
                },
                3155 : {
                    x: .636515,
                    y: .249356,
                    a: .41
                },
                3156 : {
                    x: .633661,
                    y: .248733,
                    a: .5
                },
                3156 : {
                    x: .630812,
                    y: .248109,
                    a: .58
                },
                3157 : {
                    x: .627958,
                    y: .247485,
                    a: .66
                },
                3158 : {
                    x: .625109,
                    y: .246862,
                    a: .75
                },
                3159 : {
                    x: .62226,
                    y: .246237,
                    a: .83
                },
                3159 : {
                    x: .619406,
                    y: .245613,
                    a: .91
                },
                3160 : {
                    x: .616557,
                    y: .244989,
                    a: 1
                },
                3161 : {
                    x: .613708,
                    y: .244366,
                    a: 1
                },
                3162 : {
                    x: .610854,
                    y: .243742,
                    a: 1
                },
                3163 : {
                    x: .608005,
                    y: .243118,
                    a: 1
                },
                3163 : {
                    x: .605151,
                    y: .242495,
                    a: 1
                },
                3164 : {
                    x: .602302,
                    y: .241871,
                    a: 1
                },
                3165 : {
                    x: .599453,
                    y: .241247,
                    a: 1
                },
                3166 : {
                    x: .596598,
                    y: .240624,
                    a: 1
                },
                3166 : {
                    x: .593755,
                    y: .240001,
                    a: 1
                },
                3167 : {
                    x: .590906,
                    y: .239377,
                    a: 1
                },
                3168 : {
                    x: .588062,
                    y: .238755,
                    a: 1
                },
                3169 : {
                    x: .585218,
                    y: .238132,
                    a: 1
                },
                3169 : {
                    x: .582369,
                    y: .23751,
                    a: 1
                },
                3170 : {
                    x: .579526,
                    y: .236887,
                    a: 1
                },
                3171 : {
                    x: .576677,
                    y: .236264,
                    a: 1
                },
                3172 : {
                    x: .573833,
                    y: .235641,
                    a: 1
                },
                3172 : {
                    x: .570984,
                    y: .235018,
                    a: 1
                },
                3173 : {
                    x: .568135,
                    y: .234396,
                    a: 1
                },
                3174 : {
                    x: .567375,
                    y: .233773,
                    a: 1
                },
                3175 : {
                    x: .564494,
                    y: .233143,
                    a: 1
                },
                3176 : {
                    x: .561614,
                    y: .232513,
                    a: 1
                },
                3176 : {
                    x: .558734,
                    y: .231885,
                    a: 1
                },
                3177 : {
                    x: .555854,
                    y: .231256,
                    a: 1
                },
                3178 : {
                    x: .552979,
                    y: .230628,
                    a: 1
                },
                3179 : {
                    x: .550098,
                    y: .23,
                    a: 1
                },
                3179 : {
                    x: .547213,
                    y: .229374,
                    a: 1
                },
                3180 : {
                    x: .544333,
                    y: .228746,
                    a: 1
                },
                3181 : {
                    x: .541453,
                    y: .228119,
                    a: 1
                },
                3182 : {
                    x: .538572,
                    y: .227493,
                    a: 1
                },
                3182 : {
                    x: .535692,
                    y: .226867,
                    a: 1
                },
                3183 : {
                    x: .532812,
                    y: .226241,
                    a: 1
                },
                3184 : {
                    x: .529927,
                    y: .225615,
                    a: 1
                },
                3185 : {
                    x: .527046,
                    y: .224989,
                    a: 1
                },
                3186 : {
                    x: .524161,
                    y: .224364,
                    a: 1
                },
                3186 : {
                    x: .521281,
                    y: .223739,
                    a: 1
                },
                3187 : {
                    x: .518398,
                    y: .223114,
                    a: 1
                },
                3188 : {
                    x: .515515,
                    y: .222489,
                    a: 1
                },
                3189 : {
                    x: .512631,
                    y: .221865,
                    a: 1
                },
                3189 : {
                    x: .509747,
                    y: .221241,
                    a: 1
                },
                3190 : {
                    x: .506864,
                    y: .220617,
                    a: 1
                },
                3191 : {
                    x: .503979,
                    y: .219993,
                    a: 1
                },
                3192 : {
                    x: .501095,
                    y: .219369,
                    a: 1
                },
                3192 : {
                    x: .49821,
                    y: .218745,
                    a: 1
                },
                3193 : {
                    x: .495326,
                    y: .218122,
                    a: 1
                },
                3194 : {
                    x: .492441,
                    y: .217499,
                    a: 1
                },
                3195 : {
                    x: .489556,
                    y: .216875,
                    a: 1
                },
                3195 : {
                    x: .486671,
                    y: .216252,
                    a: 1
                },
                3196 : {
                    x: .483786,
                    y: .215629,
                    a: 1
                },
                3197 : {
                    x: .480901,
                    y: .215006,
                    a: 1
                },
                3198 : {
                    x: .478016,
                    y: .214384,
                    a: 1
                },
                3199 : {
                    x: .47513,
                    y: .213761,
                    a: 1
                },
                3199 : {
                    x: .472245,
                    y: .213138,
                    a: 1
                },
                3200 : {
                    x: .469359,
                    y: .212516,
                    a: 1
                },
                3201 : {
                    x: .466473,
                    y: .211893,
                    a: 1
                },
                3202 : {
                    x: .463588,
                    y: .211271,
                    a: 1
                },
                3202 : {
                    x: .460702,
                    y: .210649,
                    a: 1
                },
                3203 : {
                    x: .457816,
                    y: .210027,
                    a: 1
                },
                3204 : {
                    x: .454931,
                    y: .209405,
                    a: 1
                },
                3205 : {
                    x: .452045,
                    y: .208783,
                    a: 1
                },
                3205 : {
                    x: .449159,
                    y: .208161,
                    a: 1
                },
                3206 : {
                    x: .446274,
                    y: .207539,
                    a: 1
                },
                3207 : {
                    x: .443388,
                    y: .206917,
                    a: 1
                },
                3208 : {
                    x: .440503,
                    y: .206296,
                    a: 1
                },
                3209 : {
                    x: .437617,
                    y: .205675,
                    a: 1
                },
                3209 : {
                    x: .434732,
                    y: .205052,
                    a: 1
                },
                3210 : {
                    x: .431847,
                    y: .204431,
                    a: 1
                },
                3211 : {
                    x: .428962,
                    y: .203809,
                    a: 1
                },
                3212 : {
                    x: .426077,
                    y: .203187,
                    a: 1
                },
                3212 : {
                    x: .423192,
                    y: .202566,
                    a: 1
                },
                3213 : {
                    x: .420308,
                    y: .201944,
                    a: 1
                },
                3214 : {
                    x: .417425,
                    y: .201323,
                    a: 1
                },
                3215 : {
                    x: .414541,
                    y: .200701,
                    a: 1
                },
                3215 : {
                    x: .411658,
                    y: .200079,
                    a: 1
                },
                3216 : {
                    x: .408775,
                    y: .199458,
                    a: 1
                },
                3217 : {
                    x: .405892,
                    y: .198836,
                    a: .91
                },
                3218 : {
                    x: .403009,
                    y: .198213,
                    a: .83
                },
                3218 : {
                    x: .400127,
                    y: .197591,
                    a: .75
                },
                3219 : {
                    x: .397245,
                    y: .196968,
                    a: .66
                },
                3220 : {
                    x: .394363,
                    y: .196345,
                    a: .58
                },
                3221 : {
                    x: .391482,
                    y: .195722,
                    a: .5
                },
                3222 : {
                    x: .388603,
                    y: .195099,
                    a: .41
                },
                3222 : {
                    x: .385723,
                    y: .194474,
                    a: .33
                },
                3223 : {
                    x: .382843,
                    y: .193848,
                    a: .25
                },
                3224 : {
                    x: .382045,
                    y: .193221,
                    a: .16
                },
                3225 : {
                    x: .377083,
                    y: .192592,
                    a: .08
                }
            }),
            this.videoPlayer.$jq.on("complete",
            function() {
                d.$completion.removeClass("toggle"),
                window.ga("send", "pageview", location.pathname + location.hash + "_complete")
            }),
            this.$interactive.append(this.videoPlayer.$jq.hide().on("ready",
            function() {
                return d.ready()
            }))
        }
        return __extends(c, b),
        c.prototype.show = function() {
            b.prototype.show.call(this)
        },
        c.prototype.load = function() {
            this.videoPlayer.load()
        },
        c.prototype.ready = function() {
            b.prototype.ready.call(this)
        },
        c.prototype.play = function() {
            b.prototype.play.call(this),
            this.videoPlayer.play()
        },
        c.prototype.hide = function() {
            b.prototype.hide.call(this),
            this.videoPlayer.audioEx.fadeOut()
        },
        c.prototype.hided = function() {
            this.videoPlayer.stop(),
            b.prototype.hided.call(this)
        },
        c.prototype.showDetail = function(b) {
            var c = this;
            a.ItemDetail.show(b,
            function() {
                c.videoPlayer.restart()
            }),
            this.videoPlayer.pause()
        },
        c
    } (a.Room);
    a.Words = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(a) {
        function b(b) {
            var c = this;
            a.call(this, b, "ghost"),
            this.isPlaying = !1,
            this.$ending = b.find(".ending"),
            this.$ending.find(".btn.next").on("click",
            function() {
                c.$ending.addClass("toggle"),
                c.$completion.removeClass("toggle")
            })
        }
        return __extends(b, a),
        b.prototype.show = function() {
            a.prototype.show.call(this),
            this.load()
        },
        b.prototype.showed = function() {
            a.prototype.showed.call(this)
        },
        b.prototype.load = function() {
            var a = this;
            window.ghostRoomLoad(function() {
                return a.ready()
            })
        },
        b.prototype.ready = function() {
            a.prototype.ready.call(this)
        },
        b.prototype.play = function() {
            var b = this;
            a.prototype.play.call(this),
            this.isPlaying = !0,
            window.ghostRoomStart(function() {
                return b.comp()
            })
        },
        b.prototype.hide = function() {
            a.prototype.hide.call(this),
            this.isPlaying = !1
        },
        b.prototype.hided = function() {
            window.ghostRoomStop(),
            this.$ending.addClass("toggle"),
            a.prototype.hided.call(this)
        },
        b.prototype.comp = function() {
            this.$ending.removeClass("toggle")
        },
        b
    } (a.Room);
    a.Ghost = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(b) {
        function c(c) {
            var d = this;
            b.call(this, c, "herbarium"),
            this.videoPlayer = new a.VideoPlayer(this.label, [{
                s: 0,
                e: this.hoge("2:02:00"),
                e2: this.hoge("2:04:00")
            },
            {
                s: this.hoge("2:05:17"),
                e: this.hoge("2:23:18")
            },
            {
                s: this.hoge("2:23:19"),
                e: this.hoge("2:41:17")
            },
            {
                s: this.hoge("2:41:18"),
                e: this.hoge("2:59:17")
            },
            {
                s: this.hoge("2:59:18"),
                e: this.hoge("3:17:18")
            },
            {
                s: this.hoge("3:17:19"),
                e: this.hoge("3:35:18")
            }], [{
                i: 1,
                s: this.hoge("0:17:01"),
                e: this.hoge("0:23:15")
            },
            {
                i: 2,
                s: this.hoge("0:32:17"),
                e: this.hoge("0:41:13")
            },
            {
                i: 3,
                s: this.hoge("0:50:06"),
                e: this.hoge("0:59:16")
            },
            {
                i: 4,
                s: this.hoge("1:17:07"),
                e: this.hoge("1:23:17")
            },
            {
                i: 5,
                s: this.hoge("1:34:01"),
                e: this.hoge("1:41:15")
            }], {
                1489 : {
                    x: .520735,
                    y: .201367,
                    a: .0434783
                },
                1490 : {
                    x: .52042,
                    y: .205262,
                    a: .0869565
                },
                1491 : {
                    x: .520072,
                    y: .209226,
                    a: .130435
                },
                1492 : {
                    x: .519816,
                    y: .213017,
                    a: .173913
                },
                1493 : {
                    x: .519506,
                    y: .216793,
                    a: .217391
                },
                1494 : {
                    x: .519205,
                    y: .22058,
                    a: .26087
                },
                1495 : {
                    x: .518906,
                    y: .224377,
                    a: .304348
                },
                1496 : {
                    x: .518611,
                    y: .228251,
                    a: .347826
                },
                1497 : {
                    x: .518288,
                    y: .232107,
                    a: .391304
                },
                1498 : {
                    x: .517962,
                    y: .235951,
                    a: .434783
                },
                1499 : {
                    x: .517649,
                    y: .239829,
                    a: .478261
                },
                1500 : {
                    x: .517354,
                    y: .243677,
                    a: .521739
                },
                1501 : {
                    x: .517032,
                    y: .247525,
                    a: .565217
                },
                1502 : {
                    x: .51675,
                    y: .25136,
                    a: .608696
                },
                1503 : {
                    x: .516397,
                    y: .255259,
                    a: .652174
                },
                1504 : {
                    x: .515986,
                    y: .259158,
                    a: .695652
                },
                1505 : {
                    x: .515639,
                    y: .262966,
                    a: .73913
                },
                1506 : {
                    x: .515295,
                    y: .266778,
                    a: .782609
                },
                1507 : {
                    x: .514902,
                    y: .270674,
                    a: .826087
                },
                1508 : {
                    x: .514569,
                    y: .274548,
                    a: .869565
                },
                1509 : {
                    x: .514096,
                    y: .278512,
                    a: .913043
                },
                1510 : {
                    x: .513702,
                    y: .282363,
                    a: .956522
                },
                1511 : {
                    x: .513303,
                    y: .286143,
                    a: 1
                },
                1512 : {
                    x: .512861,
                    y: .289981,
                    a: 1
                },
                1513 : {
                    x: .512396,
                    y: .293869,
                    a: 1
                },
                1514 : {
                    x: .511895,
                    y: .297812,
                    a: 1
                },
                1515 : {
                    x: .511407,
                    y: .301714,
                    a: 1
                },
                1516 : {
                    x: .510931,
                    y: .30557,
                    a: 1
                },
                1517 : {
                    x: .510416,
                    y: .309454,
                    a: 1
                },
                1518 : {
                    x: .509855,
                    y: .313335,
                    a: 1
                },
                1519 : {
                    x: .509234,
                    y: .31727,
                    a: 1
                },
                1520 : {
                    x: .508593,
                    y: .321241,
                    a: 1
                },
                1521 : {
                    x: .508011,
                    y: .325061,
                    a: 1
                },
                1522 : {
                    x: .50734,
                    y: .329032,
                    a: 1
                },
                1523 : {
                    x: .50673,
                    y: .33287,
                    a: 1
                },
                1524 : {
                    x: .505971,
                    y: .336862,
                    a: 1
                },
                1525 : {
                    x: .50523,
                    y: .340729,
                    a: 1
                },
                1526 : {
                    x: .504565,
                    y: .344484,
                    a: 1
                },
                1527 : {
                    x: .503696,
                    y: .34848,
                    a: 1
                },
                1528 : {
                    x: .502856,
                    y: .352339,
                    a: 1
                },
                1529 : {
                    x: .502071,
                    y: .356177,
                    a: 1
                },
                1530 : {
                    x: .501102,
                    y: .360087,
                    a: 1
                },
                1531 : {
                    x: .500219,
                    y: .363888,
                    a: 1
                },
                1532 : {
                    x: .499322,
                    y: .367715,
                    a: 1
                },
                1533 : {
                    x: .498327,
                    y: .371585,
                    a: 1
                },
                1534 : {
                    x: .497296,
                    y: .375408,
                    a: 1
                },
                1535 : {
                    x: .496272,
                    y: .379166,
                    a: 1
                },
                1536 : {
                    x: .495052,
                    y: .383087,
                    a: 1
                },
                1537 : {
                    x: .494,
                    y: .386816,
                    a: 1
                },
                1538 : {
                    x: .492818,
                    y: .390657,
                    a: 1
                },
                1539 : {
                    x: .491666,
                    y: .394404,
                    a: 1
                },
                1540 : {
                    x: .490505,
                    y: .398129,
                    a: 1
                },
                1541 : {
                    x: .489243,
                    y: .401851,
                    a: 1
                },
                1542 : {
                    x: .48802,
                    y: .405551,
                    a: 1
                },
                1543 : {
                    x: .486657,
                    y: .409259,
                    a: 1
                },
                1544 : {
                    x: .485398,
                    y: .412962,
                    a: 1
                },
                1545 : {
                    x: .483935,
                    y: .416706,
                    a: 1
                },
                1546 : {
                    x: .482586,
                    y: .420366,
                    a: 1
                },
                1547 : {
                    x: .481241,
                    y: .423914,
                    a: 1
                },
                1548 : {
                    x: .479719,
                    y: .4276,
                    a: 1
                },
                1549 : {
                    x: .478289,
                    y: .43121,
                    a: 1
                },
                1550 : {
                    x: .476892,
                    y: .434722,
                    a: 1
                },
                1551 : {
                    x: .47541,
                    y: .438266,
                    a: 1
                },
                1552 : {
                    x: .473897,
                    y: .441681,
                    a: 1
                },
                1553 : {
                    x: .47232,
                    y: .445091,
                    a: 1
                },
                1554 : {
                    x: .470798,
                    y: .448462,
                    a: 1
                },
                1555 : {
                    x: .469197,
                    y: .451884,
                    a: 1
                },
                1556 : {
                    x: .467557,
                    y: .45532,
                    a: 1
                },
                1557 : {
                    x: .465899,
                    y: .458644,
                    a: 1
                },
                1558 : {
                    x: .464131,
                    y: .461968,
                    a: 1
                },
                1559 : {
                    x: .4625,
                    y: .465133,
                    a: 1
                },
                1560 : {
                    x: .460677,
                    y: .468348,
                    a: 1
                },
                1561 : {
                    x: .458898,
                    y: .471527,
                    a: 1
                },
                1562 : {
                    x: .457031,
                    y: .474717,
                    a: 1
                },
                1563 : {
                    x: .455259,
                    y: .477745,
                    a: 1
                },
                1564 : {
                    x: .453511,
                    y: .480635,
                    a: 1
                },
                1565 : {
                    x: .451562,
                    y: .483709,
                    a: 1
                },
                1566 : {
                    x: .449556,
                    y: .48675,
                    a: 1
                },
                1567 : {
                    x: .447656,
                    y: .489637,
                    a: 1
                },
                1568 : {
                    x: .445833,
                    y: .492418,
                    a: 1
                },
                1569 : {
                    x: .443764,
                    y: .495323,
                    a: 1
                },
                1570 : {
                    x: .441792,
                    y: .498104,
                    a: 1
                },
                1571 : {
                    x: .439794,
                    y: .500795,
                    a: 1
                },
                1572 : {
                    x: .43776,
                    y: .503483,
                    a: 1
                },
                1573 : {
                    x: .435888,
                    y: .506,
                    a: 1
                },
                1574 : {
                    x: .433843,
                    y: .508583,
                    a: 1
                },
                1575 : {
                    x: .43177,
                    y: .511067,
                    a: 1
                },
                1576 : {
                    x: .429687,
                    y: .513581,
                    a: 1
                },
                1577 : {
                    x: .427604,
                    y: .516084,
                    a: 1
                },
                1578 : {
                    x: .42552,
                    y: .518575,
                    a: 1
                },
                1579 : {
                    x: .423437,
                    y: .52093,
                    a: 1
                },
                1580 : {
                    x: .421354,
                    y: .523358,
                    a: 1
                },
                1581 : {
                    x: .41927,
                    y: .525575,
                    a: 1
                },
                1582 : {
                    x: .417187,
                    y: .527817,
                    a: 1
                },
                1583 : {
                    x: .415104,
                    y: .529995,
                    a: 1
                },
                1584 : {
                    x: .413016,
                    y: .53219,
                    a: 1
                },
                1585 : {
                    x: .410935,
                    y: .534465,
                    a: 1
                },
                1586 : {
                    x: .408854,
                    y: .536581,
                    a: 1
                },
                1587 : {
                    x: .40675,
                    y: .53865,
                    a: 1
                },
                1588 : {
                    x: .404687,
                    y: .540653,
                    a: 1
                },
                1589 : {
                    x: .402547,
                    y: .542766,
                    a: 1
                },
                1590 : {
                    x: .400437,
                    y: .544755,
                    a: 1
                },
                1591 : {
                    x: .398284,
                    y: .546748,
                    a: 1
                },
                1592 : {
                    x: .396093,
                    y: .548777,
                    a: 1
                },
                1593 : {
                    x: .39401,
                    y: .550639,
                    a: 1
                },
                1594 : {
                    x: .391927,
                    y: .552521,
                    a: 1
                },
                1595 : {
                    x: .389811,
                    y: .554398,
                    a: 1
                },
                1596 : {
                    x: .387672,
                    y: .5563,
                    a: 1
                },
                1597 : {
                    x: .385563,
                    y: .558188,
                    a: 1
                },
                1598 : {
                    x: .383497,
                    y: .560054,
                    a: 1
                },
                1599 : {
                    x: .381445,
                    y: .561801,
                    a: 1
                },
                1600 : {
                    x: .37937,
                    y: .563549,
                    a: 1
                },
                1601 : {
                    x: .377359,
                    y: .565277,
                    a: 1
                },
                1602 : {
                    x: .375319,
                    y: .567042,
                    a: 1
                },
                1603 : {
                    x: .373278,
                    y: .5688,
                    a: 1
                },
                1604 : {
                    x: .37123,
                    y: .570478,
                    a: 1
                },
                1605 : {
                    x: .369217,
                    y: .571918,
                    a: 1
                },
                1606 : {
                    x: .367187,
                    y: .573527,
                    a: 1
                },
                1607 : {
                    x: .365104,
                    y: .575155,
                    a: .987342
                },
                1608 : {
                    x: .363114,
                    y: .576599,
                    a: .974684
                },
                1609 : {
                    x: .361197,
                    y: .578179,
                    a: .962025
                },
                1610 : {
                    x: .359114,
                    y: .57973,
                    a: .949367
                },
                1611 : {
                    x: .357082,
                    y: .581011,
                    a: .936709
                },
                1612 : {
                    x: .355053,
                    y: .582266,
                    a: .924051
                },
                1613 : {
                    x: .352966,
                    y: .583756,
                    a: .911392
                },
                1614 : {
                    x: .350868,
                    y: .58534,
                    a: .898734
                },
                1615 : {
                    x: .348846,
                    y: .586708,
                    a: .886076
                },
                1616 : {
                    x: .346756,
                    y: .588266,
                    a: .873418
                },
                1617 : {
                    x: .344716,
                    y: .589442,
                    a: .860759
                },
                1618 : {
                    x: .342622,
                    y: .590881,
                    a: .848101
                },
                1619 : {
                    x: .340594,
                    y: .592114,
                    a: .835443
                },
                1620 : {
                    x: .338541,
                    y: .59337,
                    a: .822785
                },
                1621 : {
                    x: .336458,
                    y: .594827,
                    a: .810127
                },
                1622 : {
                    x: .334375,
                    y: .596061,
                    a: .797468
                },
                1623 : {
                    x: .332291,
                    y: .597438,
                    a: .78481
                },
                1624 : {
                    x: .330208,
                    y: .598603,
                    a: .772152
                },
                1625 : {
                    x: .328125,
                    y: .599775,
                    a: .759494
                },
                1626 : {
                    x: .326041,
                    y: .601074,
                    a: .746835
                },
                1627 : {
                    x: .323958,
                    y: .60222,
                    a: .734177
                },
                1628 : {
                    x: .321875,
                    y: .603295,
                    a: .721519
                },
                1629 : {
                    x: .319809,
                    y: .60434,
                    a: .708861
                },
                1630 : {
                    x: .317761,
                    y: .605388,
                    a: .696203
                },
                1631 : {
                    x: .315683,
                    y: .606582,
                    a: .683544
                },
                1632 : {
                    x: .313627,
                    y: .607581,
                    a: .670886
                },
                1633 : {
                    x: .31161,
                    y: .608521,
                    a: .658228
                },
                1634 : {
                    x: .309635,
                    y: .609443,
                    a: .64557
                },
                1635 : {
                    x: .307556,
                    y: .610398,
                    a: .632911
                },
                1636 : {
                    x: .30558,
                    y: .611327,
                    a: .620253
                },
                1637 : {
                    x: .30356,
                    y: .612207,
                    a: .607595
                },
                1638 : {
                    x: .301562,
                    y: .612905,
                    a: .594937
                },
                1639 : {
                    x: .299479,
                    y: .613686,
                    a: .582278
                },
                1640 : {
                    x: .297452,
                    y: .614503,
                    a: .56962
                },
                1641 : {
                    x: .295572,
                    y: .615194,
                    a: .556962
                },
                1642 : {
                    x: .293565,
                    y: .615939,
                    a: .544304
                },
                1643 : {
                    x: .291666,
                    y: .616446,
                    a: .531646
                },
                1644 : {
                    x: .289583,
                    y: .617122,
                    a: .518987
                },
                1645 : {
                    x: .28776,
                    y: .617455,
                    a: .506329
                },
                1646 : {
                    x: .285937,
                    y: .618,
                    a: .493671
                },
                1647 : {
                    x: .283953,
                    y: .618623,
                    a: .481013
                },
                1648 : {
                    x: .282143,
                    y: .619017,
                    a: .468354
                },
                1649 : {
                    x: .280183,
                    y: .619625,
                    a: .455696
                },
                1650 : {
                    x: .278145,
                    y: .620099,
                    a: .443038
                },
                1651 : {
                    x: .276285,
                    y: .620616,
                    a: .43038
                },
                1652 : {
                    x: .274463,
                    y: .620967,
                    a: .417722
                },
                1653 : {
                    x: .272387,
                    y: .621585,
                    a: .405063
                },
                1654 : {
                    x: .270296,
                    y: .62224,
                    a: .392405
                },
                1655 : {
                    x: .268615,
                    y: .622468,
                    a: .379747
                },
                1656 : {
                    x: .266792,
                    y: .62271,
                    a: .367089
                },
                1657 : {
                    x: .264815,
                    y: .623227,
                    a: .35443
                },
                1658 : {
                    x: .262937,
                    y: .623622,
                    a: .341772
                },
                1659 : {
                    x: .260945,
                    y: .623889,
                    a: .329114
                },
                1660 : {
                    x: .25889,
                    y: .624548,
                    a: .316456
                },
                1661 : {
                    x: .257102,
                    y: .624656,
                    a: .303797
                },
                1662 : {
                    x: .254952,
                    y: .625202,
                    a: .278481
                },
                1663 : {
                    x: .252901,
                    y: .625582,
                    a: .266373
                },
                1664 : {
                    x: .251113,
                    y: .626074,
                    a: .254265
                },
                1665 : {
                    x: .249074,
                    y: .626565,
                    a: .242157
                },
                1666 : {
                    x: .247013,
                    y: .627253,
                    a: .23005
                },
                1667 : {
                    x: .245054,
                    y: .627455,
                    a: .217942
                },
                1668 : {
                    x: .242854,
                    y: .627872,
                    a: .205834
                },
                1669 : {
                    x: .240692,
                    y: .628363,
                    a: .193726
                },
                1670 : {
                    x: .238598,
                    y: .628725,
                    a: .181618
                },
                1671 : {
                    x: .236256,
                    y: .629455,
                    a: .16951
                },
                1672 : {
                    x: .234,
                    y: .629825,
                    a: .157402
                },
                1673 : {
                    x: .23188,
                    y: .630219,
                    a: .145294
                },
                1674 : {
                    x: .229781,
                    y: .630305,
                    a: .133187
                },
                1675 : {
                    x: .227168,
                    y: .631174,
                    a: .121079
                },
                1676 : {
                    x: .225246,
                    y: .631337,
                    a: .108971
                },
                1677 : {
                    x: .222631,
                    y: .632197,
                    a: .096863
                },
                1678 : {
                    x: .220475,
                    y: .632418,
                    a: .0847551
                },
                1679 : {
                    x: .217885,
                    y: .633044,
                    a: .0726472
                },
                1680 : {
                    x: .215313,
                    y: .633174,
                    a: .0605394
                },
                1681 : {
                    x: .213136,
                    y: .633424,
                    a: .0484315
                },
                1682 : {
                    x: .210593,
                    y: .634085,
                    a: .0363236
                },
                1683 : {
                    x: .207989,
                    y: .634881,
                    a: .0242157
                },
                1684 : {
                    x: .205389,
                    y: .635101,
                    a: .0121079
                },
                2800 : {
                    x: .407699,
                    y: .598628,
                    a: .0212766
                },
                2801 : {
                    x: .405591,
                    y: .599926,
                    a: .0425532
                },
                2802 : {
                    x: .403485,
                    y: .601233,
                    a: .0638298
                },
                2803 : {
                    x: .40138,
                    y: .602546,
                    a: .0851064
                },
                2804 : {
                    x: .399277,
                    y: .603864,
                    a: .106383
                },
                2805 : {
                    x: .397175,
                    y: .60519,
                    a: .12766
                },
                2806 : {
                    x: .395073,
                    y: .606522,
                    a: .148936
                },
                2807 : {
                    x: .392973,
                    y: .607859,
                    a: .170213
                },
                2808 : {
                    x: .390874,
                    y: .6092,
                    a: .191489
                },
                2809 : {
                    x: .388776,
                    y: .610547,
                    a: .212766
                },
                2810 : {
                    x: .386679,
                    y: .611898,
                    a: .234043
                },
                2811 : {
                    x: .384582,
                    y: .613251,
                    a: .255319
                },
                2812 : {
                    x: .382486,
                    y: .614609,
                    a: .276596
                },
                2813 : {
                    x: .380391,
                    y: .61597,
                    a: .297872
                },
                2814 : {
                    x: .378296,
                    y: .617333,
                    a: .319149
                },
                2815 : {
                    x: .376202,
                    y: .618698,
                    a: .340426
                },
                2816 : {
                    x: .374108,
                    y: .620065,
                    a: .361702
                },
                2817 : {
                    x: .372014,
                    y: .621433,
                    a: .382979
                },
                2818 : {
                    x: .369921,
                    y: .622802,
                    a: .404255
                },
                2819 : {
                    x: .367827,
                    y: .624172,
                    a: .425532
                },
                2820 : {
                    x: .365734,
                    y: .625542,
                    a: .446809
                },
                2821 : {
                    x: .363641,
                    y: .626912,
                    a: .468085
                },
                2822 : {
                    x: .361547,
                    y: .62828,
                    a: .489362
                },
                2823 : {
                    x: .359453,
                    y: .629648,
                    a: .510638
                },
                2824 : {
                    x: .357359,
                    y: .631013,
                    a: .531915
                },
                2825 : {
                    x: .355265,
                    y: .632378,
                    a: .553191
                },
                2826 : {
                    x: .353169,
                    y: .63374,
                    a: .574468
                },
                2827 : {
                    x: .351074,
                    y: .635099,
                    a: .595745
                },
                2828 : {
                    x: .348978,
                    y: .636455,
                    a: .617021
                },
                2829 : {
                    x: .346881,
                    y: .637808,
                    a: .638298
                },
                2830 : {
                    x: .344783,
                    y: .639156,
                    a: .659574
                },
                2831 : {
                    x: .342778,
                    y: .640437,
                    a: .680851
                },
                2832 : {
                    x: .340771,
                    y: .641706,
                    a: .702128
                },
                2833 : {
                    x: .338763,
                    y: .642964,
                    a: .723404
                },
                2834 : {
                    x: .336752,
                    y: .644212,
                    a: .744681
                },
                2835 : {
                    x: .334738,
                    y: .645449,
                    a: .765957
                },
                2836 : {
                    x: .332723,
                    y: .646674,
                    a: .787234
                },
                2837 : {
                    x: .330705,
                    y: .647888,
                    a: .808511
                },
                2838 : {
                    x: .328686,
                    y: .649091,
                    a: .829787
                },
                2839 : {
                    x: .326664,
                    y: .650284,
                    a: .851064
                },
                2840 : {
                    x: .324641,
                    y: .651464,
                    a: .87234
                },
                2841 : {
                    x: .322615,
                    y: .652634,
                    a: .893617
                },
                2842 : {
                    x: .320587,
                    y: .653792,
                    a: .914894
                },
                2843 : {
                    x: .318557,
                    y: .654939,
                    a: .93617
                },
                2844 : {
                    x: .316526,
                    y: .656075,
                    a: .957447
                },
                2845 : {
                    x: .314492,
                    y: .6572,
                    a: .978723
                },
                2846 : {
                    x: .312456,
                    y: .658313,
                    a: 1
                },
                2847 : {
                    x: .310419,
                    y: .659415,
                    a: 1
                },
                2848 : {
                    x: .308379,
                    y: .660506,
                    a: 1
                },
                2849 : {
                    x: .306338,
                    y: .661586,
                    a: 1
                },
                2850 : {
                    x: .304295,
                    y: .662654,
                    a: 1
                },
                2851 : {
                    x: .30225,
                    y: .663711,
                    a: 1
                },
                2852 : {
                    x: .300203,
                    y: .664756,
                    a: 1
                },
                2853 : {
                    x: .298154,
                    y: .66579,
                    a: 1
                },
                2854 : {
                    x: .296103,
                    y: .666812,
                    a: 1
                },
                2855 : {
                    x: .294051,
                    y: .667825,
                    a: 1
                },
                2856 : {
                    x: .291997,
                    y: .668825,
                    a: 1
                },
                2857 : {
                    x: .289941,
                    y: .669812,
                    a: 1
                },
                2858 : {
                    x: .28792,
                    y: .67073,
                    a: 1
                },
                2859 : {
                    x: .285887,
                    y: .671565,
                    a: 1
                },
                2860 : {
                    x: .283845,
                    y: .672335,
                    a: 1
                },
                2861 : {
                    x: .281783,
                    y: .672923,
                    a: 1
                },
                2862 : {
                    x: .279725,
                    y: .673512,
                    a: 1
                },
                2863 : {
                    x: .277667,
                    y: .674114,
                    a: 1
                },
                2864 : {
                    x: .275609,
                    y: .674731,
                    a: 1
                },
                2865 : {
                    x: .273552,
                    y: .675362,
                    a: 1
                },
                2866 : {
                    x: .271496,
                    y: .676012,
                    a: 1
                },
                2867 : {
                    x: .269442,
                    y: .676676,
                    a: 1
                },
                2868 : {
                    x: .26739,
                    y: .677361,
                    a: 1
                },
                2869 : {
                    x: .26534,
                    y: .678066,
                    a: 1
                },
                2870 : {
                    x: .263292,
                    y: .678797,
                    a: 1
                },
                2871 : {
                    x: .261246,
                    y: .679553,
                    a: 1
                },
                2872 : {
                    x: .259205,
                    y: .680343,
                    a: 1
                },
                2873 : {
                    x: .257167,
                    y: .681171,
                    a: 1
                },
                2874 : {
                    x: .255139,
                    y: .682044,
                    a: 1
                },
                2875 : {
                    x: .253117,
                    y: .682978,
                    a: 1
                },
                2876 : {
                    x: .251105,
                    y: .683994,
                    a: 1
                },
                2877 : {
                    x: .249113,
                    y: .685127,
                    a: 1
                },
                2878 : {
                    x: .247365,
                    y: .686351,
                    a: 1
                },
                2879 : {
                    x: .245631,
                    y: .687639,
                    a: 1
                },
                2880 : {
                    x: .243902,
                    y: .688945,
                    a: 1
                },
                2881 : {
                    x: .242175,
                    y: .690262,
                    a: 1
                },
                2882 : {
                    x: .24045,
                    y: .691584,
                    a: 1
                },
                2883 : {
                    x: .238725,
                    y: .692912,
                    a: 1
                },
                2884 : {
                    x: .237002,
                    y: .694242,
                    a: 1
                },
                2885 : {
                    x: .235285,
                    y: .695573,
                    a: 1
                },
                2886 : {
                    x: .233568,
                    y: .696905,
                    a: 1
                },
                2887 : {
                    x: .231851,
                    y: .698241,
                    a: 1
                },
                2888 : {
                    x: .230133,
                    y: .69958,
                    a: 1
                },
                2889 : {
                    x: .228416,
                    y: .70092,
                    a: 1
                },
                2890 : {
                    x: .2267,
                    y: .702262,
                    a: 1
                },
                2891 : {
                    x: .224983,
                    y: .703605,
                    a: 1
                },
                2892 : {
                    x: .223267,
                    y: .70495,
                    a: 1
                },
                2893 : {
                    x: .221551,
                    y: .706295,
                    a: 1
                },
                2894 : {
                    x: .219834,
                    y: .707643,
                    a: 1
                },
                2895 : {
                    x: .218118,
                    y: .708991,
                    a: 1
                },
                2896 : {
                    x: .216404,
                    y: .71034,
                    a: 1
                },
                2897 : {
                    x: .214689,
                    y: .71169,
                    a: 1
                },
                2898 : {
                    x: .212974,
                    y: .713041,
                    a: 1
                },
                2899 : {
                    x: .211259,
                    y: .714394,
                    a: 1
                },
                2900 : {
                    x: .209544,
                    y: .715748,
                    a: 1
                },
                2901 : {
                    x: .207829,
                    y: .717102,
                    a: 1
                },
                2902 : {
                    x: .206114,
                    y: .718459,
                    a: 1
                },
                2903 : {
                    x: .204397,
                    y: .719816,
                    a: 1
                },
                2904 : {
                    x: .202681,
                    y: .721175,
                    a: 1
                },
                2905 : {
                    x: .200965,
                    y: .722534,
                    a: 1
                },
                2906 : {
                    x: .199249,
                    y: .723895,
                    a: 1
                },
                2907 : {
                    x: .197533,
                    y: .725256,
                    a: 1
                },
                2908 : {
                    x: .195817,
                    y: .726619,
                    a: 1
                },
                2909 : {
                    x: .1941,
                    y: .727983,
                    a: 1
                },
                2910 : {
                    x: .192384,
                    y: .729348,
                    a: 1
                },
                2911 : {
                    x: .190667,
                    y: .730713,
                    a: 1
                },
                2912 : {
                    x: .188951,
                    y: .73208,
                    a: 1
                },
                2913 : {
                    x: .187235,
                    y: .733449,
                    a: 1
                },
                2914 : {
                    x: .185519,
                    y: .734817,
                    a: 1
                },
                2915 : {
                    x: .183803,
                    y: .736187,
                    a: 1
                },
                2916 : {
                    x: .182087,
                    y: .737557,
                    a: 1
                },
                2917 : {
                    x: .180372,
                    y: .738929,
                    a: 1
                },
                2918 : {
                    x: .178656,
                    y: .740301,
                    a: 1
                },
                2919 : {
                    x: .176941,
                    y: .741675,
                    a: 1
                },
                2920 : {
                    x: .175747,
                    y: .742125,
                    a: 1
                },
                2921 : {
                    x: .174006,
                    y: .743523,
                    a: .98
                },
                2922 : {
                    x: .172266,
                    y: .744924,
                    a: .945
                },
                2923 : {
                    x: .170527,
                    y: .746327,
                    a: .91
                },
                2924 : {
                    x: .168788,
                    y: .747734,
                    a: .875
                },
                2925 : {
                    x: .16705,
                    y: .749144,
                    a: .84
                },
                2926 : {
                    x: .165313,
                    y: .750557,
                    a: .805
                },
                2927 : {
                    x: .163576,
                    y: .751973,
                    a: .77
                },
                2928 : {
                    x: .161841,
                    y: .753391,
                    a: .735
                },
                2929 : {
                    x: .160106,
                    y: .754813,
                    a: .7
                },
                2930 : {
                    x: .158372,
                    y: .756239,
                    a: .665
                },
                2931 : {
                    x: .156639,
                    y: .757668,
                    a: .63
                },
                2932 : {
                    x: .154907,
                    y: .7591,
                    a: .595
                },
                2933 : {
                    x: .153177,
                    y: .760537,
                    a: .56
                },
                2934 : {
                    x: .151448,
                    y: .761977,
                    a: .525
                },
                2935 : {
                    x: .14972,
                    y: .763422,
                    a: .49
                },
                2936 : {
                    x: .147994,
                    y: .764872,
                    a: .455
                },
                2937 : {
                    x: .14627,
                    y: .766327,
                    a: .42
                },
                2938 : {
                    x: .144548,
                    y: .76779,
                    a: .385
                },
                2939 : {
                    x: .142829,
                    y: .769261,
                    a: .35
                },
                2940 : {
                    x: .141113,
                    y: .770741,
                    a: .315
                },
                2941 : {
                    x: .139401,
                    y: .772236,
                    a: .28
                },
                2942 : {
                    x: .137694,
                    y: .773752,
                    a: .245
                },
                2943 : {
                    x: .135998,
                    y: .775309,
                    a: .21
                },
                2944 : {
                    x: .134372,
                    y: .777062,
                    a: .175
                },
                2945 : {
                    x: .134289,
                    y: .777505,
                    a: .14
                },
                2946 : {
                    x: .134206,
                    y: .777946,
                    a: .105
                },
                2947 : {
                    x: .134125,
                    y: .778385,
                    a: .07
                },
                2948 : {
                    x: .134042,
                    y: .778824,
                    a: .035
                }
            }),
            this.videoPlayer.$jq.on("complete",
            function() {
                d.$completion.removeClass("toggle"),
                window.ga("send", "pageview", location.pathname + location.hash + "_complete")
            }),
            this.$interactive.append(this.videoPlayer.$jq.hide().on("ready",
            function() {
                return d.ready()
            }))
        }
        return __extends(c, b),
        c.prototype.show = function() {
            b.prototype.show.call(this)
        },
        c.prototype.load = function() {
            this.videoPlayer.load()
        },
        c.prototype.ready = function() {
            b.prototype.ready.call(this)
        },
        c.prototype.play = function() {
            b.prototype.play.call(this),
            this.videoPlayer.play()
        },
        c.prototype.hide = function() {
            b.prototype.hide.call(this),
            this.videoPlayer.audioEx.fadeOut()
        },
        c.prototype.hided = function() {
            this.videoPlayer.stop(),
            b.prototype.hided.call(this)
        },
        c.prototype.showDetail = function(b) {
            var c = this;
            a.ItemDetail.show(b,
            function() {
                c.videoPlayer.restart()
            }),
            this.videoPlayer.pause()
        },
        c
    } (a.Room);
    a.Herbarium = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(b) {
        function c(c) {
            var d = this;
            b.call(this, c, "garden"),
            this.videoPlayer = new a.VideoPlayer(this.label, [{
                s: 0,
                e: this.hoge("2:11:00"),
                e2: this.hoge("2:11:00")
            },
            {
                s: this.hoge("2:11:05"),
                e: this.hoge("2:23:22")
            },
            {
                s: this.hoge("2:23:25"),
                e: this.hoge("2:30:18")
            },
            {
                s: this.hoge("2:30:20"),
                e: this.hoge("2:37:14")
            },
            {
                s: this.hoge("2:37:17"),
                e: this.hoge("2:51:07")
            },
            {
                s: this.hoge("2:51:11"),
                e: this.hoge("3:05:00")
            },
            {
                s: this.hoge("3:05:03"),
                e: this.hoge("3:11:20")
            }], [{
                i: 1,
                s: this.hoge("0:12:20"),
                e: this.hoge("0:14:12")
            },
            {
                i: 2,
                s: this.hoge("0:26:13"),
                e: this.hoge("0:28:05")
            },
            {
                i: 3,
                s: this.hoge("0:39:20"),
                e: this.hoge("0:41:22")
            },
            {
                i: 4,
                s: this.hoge("0:49:06"),
                e: this.hoge("0:52:05")
            },
            {
                i: 5,
                s: this.hoge("1:30:08"),
                e: this.hoge("1:33:07")
            },
            {
                i: 6,
                s: this.hoge("1:41:22"),
                e: this.hoge("1:47:01")
            }], {
                723 : {
                    x: .661786,
                    y: .4387,
                    a: .0833333
                },
                724 : {
                    x: .66263,
                    y: .4392,
                    a: .166667
                },
                725 : {
                    x: .663302,
                    y: .4407,
                    a: .25
                },
                726 : {
                    x: .664395,
                    y: .4409,
                    a: .333333
                },
                727 : {
                    x: .664812,
                    y: .4417,
                    a: .416667
                },
                728 : {
                    x: .665807,
                    y: .4427,
                    a: .5
                },
                729 : {
                    x: .666468,
                    y: .4437,
                    a: .583333
                },
                730 : {
                    x: .666942,
                    y: .4451,
                    a: .666667
                },
                731 : {
                    x: .667494,
                    y: .4463,
                    a: .75
                },
                732 : {
                    x: .667973,
                    y: .4479,
                    a: .833333
                },
                733 : {
                    x: .668468,
                    y: .4489,
                    a: .916667
                },
                734 : {
                    x: .668838,
                    y: .4499,
                    a: 1
                },
                735 : {
                    x: .669093,
                    y: .452,
                    a: 1
                },
                736 : {
                    x: .669588,
                    y: .4536,
                    a: 1
                },
                737 : {
                    x: .669588,
                    y: .4549,
                    a: 1
                },
                738 : {
                    x: .670135,
                    y: .4567,
                    a: 1
                },
                739 : {
                    x: .67064,
                    y: .4582,
                    a: 1
                },
                740 : {
                    x: .671036,
                    y: .4602,
                    a: 1
                },
                741 : {
                    x: .671541,
                    y: .4621,
                    a: 1
                },
                742 : {
                    x: .67202,
                    y: .4638,
                    a: 1
                },
                743 : {
                    x: .672171,
                    y: .4656,
                    a: 1
                },
                744 : {
                    x: .672661,
                    y: .4674,
                    a: 1
                },
                745 : {
                    x: .673177,
                    y: .4694,
                    a: 1
                },
                746 : {
                    x: .673666,
                    y: .4722,
                    a: 1
                },
                747 : {
                    x: .674192,
                    y: .4732,
                    a: 1
                },
                748 : {
                    x: .674692,
                    y: .4751,
                    a: 1
                },
                749 : {
                    x: .675218,
                    y: .4776,
                    a: 1
                },
                750 : {
                    x: .67575,
                    y: .4796,
                    a: 1
                },
                751 : {
                    x: .687557,
                    y: .5027,
                    a: 1
                },
                752 : {
                    x: .6995,
                    y: .5258,
                    a: 1
                },
                753 : {
                    x: .700026,
                    y: .5491,
                    a: 1
                },
                754 : {
                    x: .706859,
                    y: .5653,
                    a: 1
                },
                755 : {
                    x: .714093,
                    y: .5822,
                    a: .941176
                },
                756 : {
                    x: .720875,
                    y: .6021,
                    a: .882353
                },
                757 : {
                    x: .723281,
                    y: .6236,
                    a: .823529
                },
                758 : {
                    x: .725588,
                    y: .6396,
                    a: .764706
                },
                759 : {
                    x: .725494,
                    y: .6517,
                    a: .705882
                },
                760 : {
                    x: .724166,
                    y: .6659,
                    a: .647059
                },
                761 : {
                    x: .724125,
                    y: .6787,
                    a: .588235
                },
                762 : {
                    x: .724604,
                    y: .6898,
                    a: .529412
                },
                763 : {
                    x: .725104,
                    y: .6974,
                    a: .470588
                },
                764 : {
                    x: .727161,
                    y: .7017,
                    a: .411765
                },
                765 : {
                    x: .736072,
                    y: .7101,
                    a: .352941
                },
                766 : {
                    x: .743651,
                    y: .7121,
                    a: .294118
                },
                767 : {
                    x: .755307,
                    y: .7152,
                    a: .235294
                },
                768 : {
                    x: .777093,
                    y: .721,
                    a: .176471
                },
                769 : {
                    x: .802989,
                    y: .72,
                    a: .117647
                },
                770 : {
                    x: .829859,
                    y: .7257,
                    a: .0588235
                },
                1290 : {
                    x: .962203,
                    y: .0961,
                    a: .166667
                },
                1291 : {
                    x: .906744,
                    y: .1063,
                    a: .333333
                },
                1292 : {
                    x: .895192,
                    y: .1083,
                    a: .5
                },
                1293 : {
                    x: .883359,
                    y: .1104,
                    a: .666667
                },
                1294 : {
                    x: .871458,
                    y: .1125,
                    a: .833333
                },
                1295 : {
                    x: .859333,
                    y: .1149,
                    a: 1
                },
                1296 : {
                    x: .846723,
                    y: .1169,
                    a: 1
                },
                1297 : {
                    x: .833963,
                    y: .1192,
                    a: 1
                },
                1298 : {
                    x: .821062,
                    y: .1209,
                    a: 1
                },
                1299 : {
                    x: .807848,
                    y: .1232,
                    a: 1
                },
                1300 : {
                    x: .794427,
                    y: .126,
                    a: 1
                },
                1301 : {
                    x: .78101,
                    y: .1286,
                    a: 1
                },
                1302 : {
                    x: .7675,
                    y: .1312,
                    a: 1
                },
                1303 : {
                    x: .753958,
                    y: .1343,
                    a: 1
                },
                1304 : {
                    x: .740416,
                    y: .1369,
                    a: 1
                },
                1305 : {
                    x: .726875,
                    y: .1402,
                    a: 1
                },
                1306 : {
                    x: .713854,
                    y: .1443,
                    a: 1
                },
                1307 : {
                    x: .700833,
                    y: .1483,
                    a: 1
                },
                1308 : {
                    x: .687406,
                    y: .1526,
                    a: 1
                },
                1309 : {
                    x: .674026,
                    y: .157,
                    a: 1
                },
                1310 : {
                    x: .660916,
                    y: .1622,
                    a: 1
                },
                1311 : {
                    x: .648182,
                    y: .1679,
                    a: 1
                },
                1312 : {
                    x: .635161,
                    y: .1734,
                    a: 1
                },
                1313 : {
                    x: .622296,
                    y: .1795,
                    a: 1
                },
                1314 : {
                    x: .609645,
                    y: .1861,
                    a: 1
                },
                1315 : {
                    x: .596739,
                    y: .1925,
                    a: 1
                },
                1316 : {
                    x: .58438,
                    y: .1987,
                    a: 1
                },
                1317 : {
                    x: .571546,
                    y: .2057,
                    a: 1
                },
                1318 : {
                    x: .559005,
                    y: .2133,
                    a: 1
                },
                1319 : {
                    x: .546651,
                    y: .2199,
                    a: 1
                },
                1320 : {
                    x: .534119,
                    y: .2271,
                    a: 1
                },
                1321 : {
                    x: .521822,
                    y: .2342,
                    a: 1
                },
                1322 : {
                    x: .509792,
                    y: .2411,
                    a: 1
                },
                1323 : {
                    x: .497485,
                    y: .2482,
                    a: 1
                },
                1324 : {
                    x: .485698,
                    y: .2553,
                    a: .928462
                },
                1325 : {
                    x: .474018,
                    y: .2625,
                    a: .856923
                },
                1326 : {
                    x: .462075,
                    y: .2697,
                    a: .785385
                },
                1327 : {
                    x: .45024,
                    y: .2763,
                    a: .713846
                },
                1328 : {
                    x: .438514,
                    y: .2828,
                    a: .642308
                },
                1329 : {
                    x: .426663,
                    y: .289,
                    a: .570769
                },
                1330 : {
                    x: .41498,
                    y: .2956,
                    a: .499231
                },
                1331 : {
                    x: .403838,
                    y: .3024,
                    a: .427692
                },
                1332 : {
                    x: .392436,
                    y: .3091,
                    a: .356154
                },
                1333 : {
                    x: .381013,
                    y: .3163,
                    a: .284615
                },
                1334 : {
                    x: .369764,
                    y: .323,
                    a: .213077
                },
                1335 : {
                    x: .358285,
                    y: .3303,
                    a: .141538
                },
                1336 : {
                    x: .346764,
                    y: .3375,
                    a: .07
                },
                3079 : {
                    x: .825166,
                    y: .6962,
                    a: .0416667
                },
                3080 : {
                    x: .82325,
                    y: .6961,
                    a: .0833333
                },
                3081 : {
                    x: .821333,
                    y: .6961,
                    a: .125
                },
                3082 : {
                    x: .819416,
                    y: .696,
                    a: .166667
                },
                3083 : {
                    x: .8175,
                    y: .696,
                    a: .208333
                },
                3084 : {
                    x: .815583,
                    y: .6959,
                    a: .25
                },
                3085 : {
                    x: .813666,
                    y: .6958,
                    a: .291667
                },
                3086 : {
                    x: .811755,
                    y: .6958,
                    a: .333333
                },
                3087 : {
                    x: .809838,
                    y: .6957,
                    a: .375
                },
                3088 : {
                    x: .807927,
                    y: .6956,
                    a: .416667
                },
                3089 : {
                    x: .806015,
                    y: .6955,
                    a: .458333
                },
                3090 : {
                    x: .804098,
                    y: .6955,
                    a: .5
                },
                3091 : {
                    x: .802187,
                    y: .6954,
                    a: .541667
                },
                3092 : {
                    x: .800276,
                    y: .6953,
                    a: .583333
                },
                3093 : {
                    x: .798364,
                    y: .6952,
                    a: .625
                },
                3094 : {
                    x: .796453,
                    y: .6951,
                    a: .666667
                },
                3095 : {
                    x: .794541,
                    y: .6949,
                    a: .708333
                },
                3096 : {
                    x: .792635,
                    y: .6948,
                    a: .75
                },
                3097 : {
                    x: .790723,
                    y: .6947,
                    a: .791667
                },
                3098 : {
                    x: .788812,
                    y: .6945,
                    a: .833333
                },
                3099 : {
                    x: .786901,
                    y: .6944,
                    a: .875
                },
                3100 : {
                    x: .784989,
                    y: .6942,
                    a: .916667
                },
                3101 : {
                    x: .783078,
                    y: .694,
                    a: .958333
                },
                3102 : {
                    x: .781171,
                    y: .6939,
                    a: .95977
                },
                3103 : {
                    x: .77926,
                    y: .6936,
                    a: .961207
                },
                3104 : {
                    x: .777354,
                    y: .6934,
                    a: .962644
                },
                3105 : {
                    x: .775447,
                    y: .6932,
                    a: .96408
                },
                3106 : {
                    x: .773546,
                    y: .6929,
                    a: .965517
                },
                3107 : {
                    x: .77164,
                    y: .6926,
                    a: .966954
                },
                3108 : {
                    x: .769739,
                    y: .6923,
                    a: .968391
                },
                3109 : {
                    x: .767838,
                    y: .692,
                    a: .969828
                },
                3110 : {
                    x: .765937,
                    y: .6916,
                    a: .971264
                },
                3111 : {
                    x: .764041,
                    y: .6912,
                    a: .972701
                },
                3112 : {
                    x: .762145,
                    y: .6908,
                    a: .974138
                },
                3113 : {
                    x: .76025,
                    y: .6904,
                    a: .975575
                },
                3114 : {
                    x: .758359,
                    y: .6899,
                    a: .977011
                },
                3115 : {
                    x: .756473,
                    y: .6894,
                    a: .978448
                },
                3116 : {
                    x: .754588,
                    y: .6889,
                    a: .979885
                },
                3117 : {
                    x: .752708,
                    y: .6883,
                    a: .981322
                },
                3118 : {
                    x: .750833,
                    y: .6877,
                    a: .982759
                },
                3119 : {
                    x: .748963,
                    y: .6871,
                    a: .984195
                },
                3120 : {
                    x: .747093,
                    y: .6864,
                    a: .985632
                },
                3121 : {
                    x: .745229,
                    y: .6857,
                    a: .987069
                },
                3122 : {
                    x: .743369,
                    y: .6849,
                    a: .988506
                },
                3123 : {
                    x: .741515,
                    y: .6841,
                    a: .989943
                },
                3124 : {
                    x: .739666,
                    y: .6833,
                    a: .991379
                },
                3125 : {
                    x: .737822,
                    y: .6825,
                    a: .992816
                },
                3126 : {
                    x: .735979,
                    y: .6816,
                    a: .994253
                },
                3127 : {
                    x: .734145,
                    y: .6807,
                    a: .99569
                },
                3128 : {
                    x: .732317,
                    y: .6797,
                    a: .997126
                },
                3129 : {
                    x: .730489,
                    y: .6788,
                    a: .998563
                },
                3130 : {
                    x: .728666,
                    y: .6778,
                    a: 1
                },
                3131 : {
                    x: .726848,
                    y: .6767,
                    a: .9
                },
                3132 : {
                    x: .725036,
                    y: .6757,
                    a: .8
                },
                3133 : {
                    x: .723229,
                    y: .6746,
                    a: .7
                },
                3134 : {
                    x: .721427,
                    y: .6735,
                    a: .6
                },
                3135 : {
                    x: .719625,
                    y: .6724,
                    a: .5
                },
                3136 : {
                    x: .717828,
                    y: .6713,
                    a: .4
                },
                3137 : {
                    x: .716031,
                    y: .6701,
                    a: .3
                },
                3138 : {
                    x: .714239,
                    y: .669,
                    a: .2
                },
                3139 : {
                    x: .712453,
                    y: .6678,
                    a: .1
                }
            }),
            this.videoPlayer.$jq.on("complete",
            function() {
                d.$completion.removeClass("toggle"),
                window.ga("send", "pageview", location.pathname + location.hash + "_complete")
            }),
            this.$interactive.append(this.videoPlayer.$jq.hide().on("ready",
            function() {
                return d.ready()
            }))
        }
        return __extends(c, b),
        c.prototype.show = function() {
            b.prototype.show.call(this)
        },
        c.prototype.load = function() {
            this.videoPlayer.load()
        },
        c.prototype.ready = function() {
            b.prototype.ready.call(this)
        },
        c.prototype.play = function() {
            b.prototype.play.call(this),
            this.videoPlayer.play()
        },
        c.prototype.hide = function() {
            b.prototype.hide.call(this),
            this.videoPlayer.audioEx.fadeOut()
        },
        c.prototype.hided = function() {
            this.videoPlayer.stop(),
            b.prototype.hided.call(this)
        },
        c.prototype.showDetail = function(b) {
            var c = this;
            a.ItemDetail.show(b,
            function() {
                c.videoPlayer.restart()
            }),
            this.videoPlayer.pause()
        },
        c
    } (a.Room);
    a.Garden = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = function(a) {
        function b(b) {
            a.call(this, b),
            this.que = [],
            this.isLoading = !1
        }
        return __extends(b, a),
        b.prototype.show = function() {
            a.prototype.show.call(this),
            this.$jq.find(".scroll").show()
        },
        b.prototype.load = function() {},
        b.prototype.ready = function() {
            a.prototype.ready.call(this)
        },
        b.prototype.play = function() {
            a.prototype.play.call(this)
        },
        b.prototype.hide = function() {
            a.prototype.hide.call(this)
        },
        b.prototype.hided = function() {
            this.$jq.find(".scroll").hide()
        },
        b.prototype.resize = function() {},
        b.prototype.addLoadQue = function(a, b) {
            this.que.push({
                img: a,
                path: b
            }),
            this.isLoading || (this.isLoading = !0, this.startLoad())
        },
        b.prototype.startLoad = function() {
            var a = this;
            if (0 == this.que.length) return void(this.isLoading = !1);
            var b = this.que.shift();
            b.img.on("load",
            function(c) {
                b.img.parent().removeClass("loading"),
                (new co.PonTimeline).cssTo(b.img, .4, {
                    opacity: 1
                },
                co.Ease.ease_out_sine, !1).weit(.1).method(function() {
                    return a.startLoad()
                }).start()
            }).attr("src", b.path)
        },
        b
    } (a.Page);
    a.Itemlist = b
} (nide || (nide = {}));
var nide; !
function(a) {
    var b = co.PonTimeline,
    c = function() {
        function c() {
            this.loader = new a.Loader,
            this.spRotateAttention = !1,
            this.rotateIgnore = !1,
            c.instance = this,
            this.$ui = $("#ui"),
            this.$fullBtn = $("#ui .fullBtn"),
            this.$rotateAlert = $("#rotateAlert"),
            this.setInitListners(),
            a.SoundMgr.init(this.$ui.find(".muteBtn")),
            a.ItemDetail.init($("#itemDetail")),
            this.page = {
                top: new a.Top($("#top")),
                about: new a.About($("#about")),
                map: new a.Map($("#map")),
                words: new a.Words($("#words")),
                herbarium: new a.Herbarium($("#herbarium")),
                garden: new a.Garden($("#garden")),
                ghost: new a.Ghost($("#ghost")),
                itemList: new a.Itemlist($("#itemList"))
            },
            this.resize(),
            this.hashchange()
        }
        return c.prototype.setInitListners = function() {
            var a = this,
            b = navigator.userAgent.toLowerCase();
            c.isAndroid = b.indexOf("android") > -1,
            c.isIos = b.indexOf("iphone") > -1 || b.indexOf("ipad") > -1,
            c.isSp = c.isAndroid || c.isIos || b.indexOf("mobile") > -1;
            var d = document.documentElement;
            d.webkitRequestFullscreen || d.mozRequestFullScreen || d.msRequestFullscreen || d.requestFullscreen ? this.$fullBtn.on("click",
            function() {
                a.$fullBtn.toggleClass("toggle").hasClass("toggle") ? c.exitFullscreen(document.documentElement) : c.requestFullscreen(document.documentElement)
            }) : this.$fullBtn.hide(),
            $(window).on("resize",
            function() {
                return a.resize()
            }).on("hashchange",
            function(b) {
                return a.hashchange(b)
            }).on("popstate",
            function(b) {
                return a.popstate(b)
            }),
            $("a[data-href]").on("click",
            function(b) {
                var c = $(b.currentTarget).data("href");
                if ("#ghost" != c || "true" == ($.cookie("words") && $.cookie("herbarium") && $.cookie("garden"))) a.loader.loadMedia(c),
                history.pushState("", location.hash, c),
                a.hashchange(c);
                else var d = $(".ghost_alert").removeClass("toggle").on("click",
                function() {
                    d.addClass("toggle").off("click")
                })
            }),
            $(".langBtn a").on("click",
            function(a) {
                "ja" == $("html").attr("lang") ? location.href = location.href.replace("/jp/", "/en/") : location.href = location.href.replace("/en/", "/jp/")
            })
        },
        c.prototype.resize = function() {
            if (c.size.width = window.innerWidth, c.size.height = window.innerHeight, c.isSide = c.size.isOblong(), c.isSide = !0, c.isSide || !this.forceRotation) $("#content").css({
                width: c.size.width,
                height: c.size.height,
                transform: "",
                marginLeft: "",
                marginTop: ""
            });
            else {
                var a = (c.size.height - c.size.width) / 2;
                c.size.width = window.innerHeight,
                c.size.height = window.innerWidth,
                $("#content").css({
                    width: c.size.width,
                    height: c.size.height,
                    transform: "rotate(90deg)",
                    marginLeft: -a,
                    marginTop: a
                })
            }
            for (var b = 0; b < c.events.onResize.length; b++) c.events.onResize[b]();
            this.checkSide()
        },
        c.onResize = function(a) {
            c.events.onResize.push(a)
        },
        c.prototype.hashchange = function(b) {
            if (void 0 === b && (b = null), null == b) switch (location.hash) {
            case "#words":
            case "#herbarium":
            case "#garden":
            case "#ghost":
                history.replaceState("", location.hash, "#map")
            }
            this.forceRotation = c.isSp;
            var d;
            switch ($("body").attr("data-page", location.hash), location.hash) {
            case "#about":
                d = this.page.about,
                this.checkSide();
                break;
            case "#map":
                d = this.page.map,
                this.checkSide();
                break;
            case "#words":
                d = this.page.words,
                this.checkSide();
                break;
            case "#herbarium":
                d = this.page.herbarium,
                this.checkSide();
                break;
            case "#garden":
                d = this.page.garden,
                this.checkSide();
                break;
            case "#ghost":
                d = this.page.ghost,
                this.checkSide();
                break;
            case "#itemList":
                d = this.page.itemList,
                this.forceRotation = !1;
                break;
            default:
                d = this.page.top,
                this.spRotateAttention = !1,
                this.forceRotation = !1,
                $("body").attr("data-page", "#top")
            }
            this.resize();
            var e = this.currentPage;
            this.currentPage = d,
            e ? d == this.page.itemList ? this.transition_fadeIn(e) : e == this.page.top ? this.transition_open(e) : e == this.page.about ? d == this.page.top ? this.transition_close(e) : this.transition_open(e) : e == this.page.map ? d == this.page.top || d == this.page.about ? this.transition_close(e) : this.transition_open(e) : this.transition_close(e) : (this.currentPage.show(), this.currentPage.showed(), a.ItemDetail.close()),
            window.ga("send", "pageview", location.pathname + location.hash)
        },
        c.prototype.transition_open = function(a) {
            var b = this.currentPage,
            c = $(".transition"),
            d = c.find(".left"),
            e = c.find(".right"),
            f = .8; (new co.PonTimeline).method(function() {
                c.removeClass("toggle"),
                d.empty().attr("style", "").append(a.$jq.clone().width(a.$jq.width())),
                e.empty().attr("style", "").append(a.$jq.clone().width(a.$jq.width())),
                b.$jq.css({
                    transform: "scale(0.85)",
                    opacity: 0
                }),
                b.show(),
                a.hided()
            }).weit(1 / 30).cssTo(b.$jq, f, {
                transform: "",
                opacity: ""
            },
            co.Ease.ease_out_sine, !1).cssTo(d, f, {
                transform: "translateX(-100%)"
            },
            co.Ease.ease_in_out_circ, !1).cssTo(e, f, {
                transform: "translateX(100%)"
            },
            co.Ease.ease_in_out_circ, !0).method(function() {
                d.empty().attr("style", ""),
                e.empty().attr("style", ""),
                b.showed(),
                c.addClass("toggle")
            }).start()
        },
        c.prototype.transition_close = function(a) {
            var c = this.currentPage,
            d = $(".transition"),
            e = d.find(".left"),
            f = d.find(".right"),
            g = .8; (new b).method(function() {
                d.removeClass("toggle"),
                e.empty().css({
                    transform: "translateX(-100%)"
                }).append("<div class='bg'/>"),
                f.empty().css({
                    transform: "translateX(100%)"
                }).append("<div class='bg'/>"),
                a.hide(),
                d.css({
                    visibility: "visible"
                }),
                d.find(".bg").css({
                    "background-image": "url(" + c.closeBgPath + ")",
                    "background-size": c.$jq.find(".bg").css("background-size"),
                    height: c.$jq.find(".bg").css("height"),
                    top: c.$jq.find(".bg").css("top")
                })
            }).weit(1 / 30).cssTo(a.$jq, g, {
                transform: "scale(0.85)",
                opacity: 0
            },
            co.Ease.ease_in_sine, !1).cssTo(e, g, {
                transform: "translateX(0%)"
            },
            co.Ease.ease_in_out_circ, !1).cssTo(f, g, {
                transform: "translateX(0%)"
            },
            co.Ease.ease_in_out_circ, !0).cssClear(a.$jq).method(function() {
                a.hided(),
                c.show(),
                c.showed(),
                d.addClass("toggle"),
                e.empty().attr("style", ""),
                f.empty().attr("style", "")
            }).start()
        },
        c.prototype.transition_fadeIn = function(a) {
            var b = this;
            a.$jq.css("z-index", ""),
            a.hide(),
            this.currentPage.show(),
            this.currentPage.$jq.css({
                opacity: 0,
                zIndex: 5
            }),
            (new co.PonTimeline).weit(1 / 30).cssTo(this.currentPage.$jq, .4, {
                opacity: 1
            },
            co.Ease.ease_out_sine, !0).cssClear(this.currentPage.$jq).method(function() {
                b.currentPage.showed(),
                a.hided()
            }).start()
        },
        c.prototype.checkSide = function() {
            return "#top" == location.hash || "" == location.hash || "#ghost" == location.hash && this.page.ghost.isPlaying ? void this.$rotateAlert.addClass("toggle") : void(!c.isSp || c.size.isOblong() ? this.$rotateAlert.addClass("toggle") : this.$rotateAlert.removeClass("toggle"))
        },
        c.requestFullscreen = function(a) {
            if (a.webkitRequestFullscreen) a.webkitRequestFullscreen();
            else if (a.mozRequestFullScreen) a.mozRequestFullScreen();
            else if (a.msRequestFullscreen) a.msRequestFullscreen();
            else {
                if (!a.requestFullscreen) return;
                a.requestFullscreen()
            }
        },
        c.exitFullscreen = function(a) {
            document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.cancelFullScreen ? document.cancelFullScreen() : document.exitFullscreen && document.exitFullscreen()
        },
        c.prototype.popstate = function(a) {
            a.preventDefault()
        },
        c.size = new a.Size,
        c.events = {
            onResize: []
        },
        c
    } ();
    a.Main = c
} (nide || (nide = {})),
$(function() {
    new nide.Common,
    new nide.Main
});