webpackJsonp([1],{"/AUU":function(t,e){},EIyj:function(t,e){},M0mN:function(t,e){},NHnr:function(t,e,A){"use strict";function n(t){A("lsU1")}function i(t){A("w15S")}function r(t){A("V4Yk")}function a(t){A("cPQh")}function s(t){A("EIyj")}function o(t){A("SlIn")}function c(t){A("/AUU")}function l(t){A("xrau")}function u(t){A("M0mN")}function h(t){A("SOH1")}Object.defineProperty(e,"__esModule",{value:!0});var d=A("7+uW"),m=A("mtWM"),f=A.n(m),v=A("7t+N"),g=A.n(v),C={name:"app",created:function(){},methods:{}};g()(document).on("mousemove",function(t){var e=t.pageX,A=t.pageY;if(window.location.href.indexOf("stream")>-1)var n=!0;else n=!1,g()(".leftNavWrapper").css("z-index","1"),g()(".leftNavWrapper").css("margin-top","75");e<250&&1==n&&(g()(".leftNavWrapper").css("z-index","5"),g()(".leftNavWrapper").css("margin-top","0")),e>250&&(g()(".leftNavWrapper").css("z-index",""),g()(".leftNavWrapper").css("margin-top","")),A<75&&1==n&&g()(".topNavWrapper").css("z-index","5"),A>75&&g()(".topNavWrapper").css("z-index","")});var E=function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{attrs:{id:"app"}},[A("topNav"),t._v(" "),A("leftNav"),t._v(" "),A("router-view")],1)},p=[],w={render:E,staticRenderFns:p},_=w,I=A("VU/8"),Q=n,y=I(C,_,!1,Q,null,null),Y=y.exports,F=A("/ocq"),b={name:"Home",data:function(){return{streams:[]}},created:function(){this.getPopularStreams()},filters:{truncate:function(t,e){return t.length>20?t.substring(0,e)+"...":t},addComma:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},methods:{getPopularStreams:function(){var t=this;f()({method:"get",url:"https://api.twitch.tv/kraken/streams/?limit=25&offset=0",headers:{"Client-ID":"yb1fpw6w2ldfn50b0ynr50trdcxn99"}}).then(function(e){var A=e.data.streams;t.streams=A})}}},B=function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{staticClass:"twitchWrapper"},t._l(t.streams,function(e){return A("div",{staticClass:"streamContainer"},[A("router-link",{staticClass:"clickZone",attrs:{to:{path:"stream",query:{name:e.channel.name}}}}),t._v(" "),A("div",{staticClass:"streamImageContainer"},[A("img",{staticClass:"streamImage",attrs:{src:e.preview.large}})]),t._v(" "),A("div",{staticClass:"streamTextContainer"},[A("div",{staticClass:"streamName"},[t._v(t._s(t._f("truncate")(e.channel.name,20)))]),t._v(" "),A("div",{staticClass:"streamGame"},[t._v(t._s(t._f("truncate")(e.channel.game,20)))]),t._v(" "),A("div",{staticClass:"streamStatus"},[t._v(t._s(t._f("truncate")(e.channel.status,20)))]),t._v(" "),A("div",{staticClass:"streamStatus"},[t._v(t._s(t._f("addComma")(e.viewers)))])])],1)}))},L=[],S={render:B,staticRenderFns:L},V=S,T=A("VU/8"),x=i,N=T(b,V,!1,x,"data-v-c4c1dcea",null),W=N.exports,D=A("fZjL"),P=A.n(D),M=A("woOf"),R=A.n(M),k=A("kiBT"),U=A.n(k),G=A("OvRC"),J=A.n(G),O=A("Zzip"),X=A.n(O),q=A("pFYg"),K=A.n(q),z=A("5QVw"),H=A.n(z),Z=A("u2KI"),j=A.n(Z),$=A("C4MV"),tt=A.n($);!function(t){function e(n){if(A[n])return A[n].exports;var i=A[n]={i:n,l:!1,exports:{}};return t[n].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var A={};e.m=t,e.c=A,e.i=function(t){return t},e.d=function(t,A,n){e.o(t,A)||tt()(t,A,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var A=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(A,"a",A),A},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=91)}({0:function(t,e,A){function n(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0;var i=A(29);Object.defineProperty(e,"buildTEMessage",{enumerable:!0,get:function(){return n(i).default}});var r=A(30);Object.defineProperty(e,"isTEEvent",{enumerable:!0,get:function(){return n(r).default}});var a=A(31);Object.defineProperty(e,"isTwitchOrigin",{enumerable:!0,get:function(){return n(a).default}});var s=A(32);Object.defineProperty(e,"notifyAnyHost",{enumerable:!0,get:function(){return n(s).default}});var o=A(33);Object.defineProperty(e,"subscribeToTwitchMessage",{enumerable:!0,get:function(){return n(o).default}}),e.TE_MESSAGE_NAMESPACE="twitch-everywhere"},25:function(t,e,A){e.__esModule=!0,e.PLAYER_API=j()({PAUSE:"pause",PLAY:"play",SEEK:"seek",SET_CHANNEL:"setChannel",SET_COLLECTION:"setCollection",SET_QUALITY:"setQuality",SET_VIDEO:"setVideo",SET_MUTED:"setMuted",SET_VOLUME:"setVolume",GET_MUTED:"getMuted",GET_VOLUME:"getVolume",GET_CHANNEL:"getChannel",GET_CURRENT_TIME:"getCurrentTime",GET_DURATION:"getDuration",GET_ENDED:"getEnded",GET_PLAYBACK_STATS:"getPlaybackStats",GET_QUALITIES:"getQualities",GET_QUALITY:"getQuality",GET_VIDEO:"getVideo",IS_PAUSED:"isPaused"})},26:function(t,e,A){e.__esModule=!0,e.PLAYER_BRIDGE_API=j()({UPDATE_STATE:"updateState"}),e.PLAYER_BRIDGE_MESSAGE_NAMESPACE="twitch-everywhere-player-bridge"},29:function(t,e,A){function n(t,e){return{eventName:t,params:e,namespace:i.TE_MESSAGE_NAMESPACE}}e.__esModule=!0,e.default=n;var i=A(0)},30:function(t,e,A){function n(t,e){return"object"===i(t.data)&&t.data.namespace===r.TE_MESSAGE_NAMESPACE&&t.data.eventName===e}e.__esModule=!0;var i="function"==typeof H.a&&"symbol"==K()(X.a)?function(t){return void 0===t?"undefined":K()(t)}:function(t){return t&&"function"==typeof H.a&&t.constructor===H.a&&t!==H.a.prototype?"symbol":void 0===t?"undefined":K()(t)};e.default=n;var r=A(0)},31:function(t,e,A){function n(t){return i.test(t)}e.__esModule=!0,e.default=n;var i=/^https?:\/\/([\w\d]+\.)*twitch\.tv(:\d+)?$/},32:function(t,e,A){function n(t){window.parent.postMessage(t,"*")}e.__esModule=!0,e.default=n},33:function(t,e,A){function n(t,e){var A=i(e);return t.addEventListener("message",A),function(){return t.removeEventListener("message",A)}}function i(t){return function(e){if((0,r.isTwitchOrigin)(e.origin))return t(e)}}e.__esModule=!0,e.default=n;var r=A(0)},75:function(t,e,A){e.__esModule=!0;var n={};n.IFRAME_INDEX="https://embed.twitch.tv",e.default=n},76:function(t,e,A){e.__esModule=!0,e.EMBED_EVENTS=j()({AUTHENTICATE:"authenticate",VIDEO_READY:"video.ready",VIDEO_PLAY:"video.play"})},77:function(t,e,A){function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=(void 0===e?"undefined":K()(e))&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(void 0===e?"undefined":K()(e)));t.prototype=J()(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(U.a?U()(t,e):t.__proto__=e)}e.__esModule=!0,e.MissingParameterError=function(t){function e(){return n(this,e),i(this,t.apply(this,arguments))}return r(e,t),e}(Error),e.MissingElementError=function(t){function e(A){return n(this,e),i(this,t.call(this,"Could not find an element with id: "+A))}return r(e,t),e}(Error)},78:function(t,e,A){function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}e.__esModule=!0;var i=A(25),r=A(26),a={channelName:"",currentTime:0,duration:0,muted:!1,playback:"",quality:"",qualitiesAvailable:[],stats:{},videoID:"",viewers:0,volume:0},s=function(){function t(e){n(this,t),this._everywhereWindow=e,this._playerState=a,window.addEventListener("message",this._handleResponses.bind(this))}return t.prototype.pause=function(){this._sendCommand(i.PLAYER_API.PAUSE)},t.prototype.play=function(){this._sendCommand(i.PLAYER_API.PLAY)},t.prototype.seek=function(t){this._sendCommand(i.PLAYER_API.SEEK,[t])},t.prototype.setChannel=function(t){this._sendCommand(i.PLAYER_API.SET_CHANNEL,[t])},t.prototype.setCollection=function(t,e){this._sendCommand(i.PLAYER_API.SET_COLLECTION,[t,e])},t.prototype.setQuality=function(t){this._sendCommand(i.PLAYER_API.SET_QUALITY,[t])},t.prototype.setVideo=function(t){this._sendCommand(i.PLAYER_API.SET_VIDEO,[t])},t.prototype.setMuted=function(){this._sendCommand(i.PLAYER_API.SET_MUTED)},t.prototype.setVolume=function(t){this._sendCommand(i.PLAYER_API.SET_VOLUME,[t])},t.prototype.getMuted=function(){return this._playerState.muted},t.prototype.getVolume=function(){return this._playerState.volume},t.prototype.getChannel=function(){return this._playerState.channelName},t.prototype.getCurrentTime=function(){return this._playerState.currentTime},t.prototype.getDuration=function(){return this._playerState.duration},t.prototype.getEnded=function(){return this._playerState.ended},t.prototype.getPlaybackStats=function(){return this._playerState.stats.videoStats},t.prototype.getQualities=function(){return this._playerState.qualitiesAvailable},t.prototype.getQuality=function(){return this._playerState.quality},t.prototype.getVideo=function(){return this._playerState.videoId},t.prototype.isPaused=function(){return"paused"===this._playerState.playback},t.prototype._sendCommand=function(t,e){var A={eventName:t,params:e,namespace:r.PLAYER_BRIDGE_MESSAGE_NAMESPACE};this._everywhereWindow.postMessage(A,"*")},t.prototype._handleResponses=function(t){var e=t.data,A=t.source,n=A===this._everywhereWindow,i=e.namespace===r.PLAYER_BRIDGE_MESSAGE_NAMESPACE,a=e.eventName===r.PLAYER_BRIDGE_API.UPDATE_STATE;n&&i&&a&&(this._playerState=R()({},this._playerState,e.params))},t}();e.default=s},82:function(t,e){function A(){this._events=this._events||{},this._maxListeners=this._maxListeners||void 0}function n(t){return"function"==typeof t}function i(t){return"number"==typeof t}function r(t){return"object"==(void 0===t?"undefined":K()(t))&&null!==t}function a(t){return void 0===t}t.exports=A,A.EventEmitter=A,A.prototype._events=void 0,A.prototype._maxListeners=void 0,A.defaultMaxListeners=10,A.prototype.setMaxListeners=function(t){if(!i(t)||t<0||isNaN(t))throw TypeError("n must be a positive number");return this._maxListeners=t,this},A.prototype.emit=function(t){var e,A,i,s,o,c;if(this._events||(this._events={}),"error"===t&&(!this._events.error||r(this._events.error)&&!this._events.error.length)){if((e=arguments[1])instanceof Error)throw e;var l=new Error('Uncaught, unspecified "error" event. ('+e+")");throw l.context=e,l}if(A=this._events[t],a(A))return!1;if(n(A))switch(arguments.length){case 1:A.call(this);break;case 2:A.call(this,arguments[1]);break;case 3:A.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1),A.apply(this,s)}else if(r(A))for(s=Array.prototype.slice.call(arguments,1),c=A.slice(),i=c.length,o=0;o<i;o++)c[o].apply(this,s);return!0},A.prototype.addListener=function(t,e){var i;if(!n(e))throw TypeError("listener must be a function");return this._events||(this._events={}),this._events.newListener&&this.emit("newListener",t,n(e.listener)?e.listener:e),this._events[t]?r(this._events[t])?this._events[t].push(e):this._events[t]=[this._events[t],e]:this._events[t]=e,r(this._events[t])&&!this._events[t].warned&&(i=a(this._maxListeners)?A.defaultMaxListeners:this._maxListeners)&&i>0&&this._events[t].length>i&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),"function"==typeof console.trace&&console.trace()),this},A.prototype.on=A.prototype.addListener,A.prototype.once=function(t,e){function A(){this.removeListener(t,A),i||(i=!0,e.apply(this,arguments))}if(!n(e))throw TypeError("listener must be a function");var i=!1;return A.listener=e,this.on(t,A),this},A.prototype.removeListener=function(t,e){var A,i,a,s;if(!n(e))throw TypeError("listener must be a function");if(!this._events||!this._events[t])return this;if(A=this._events[t],a=A.length,i=-1,A===e||n(A.listener)&&A.listener===e)delete this._events[t],this._events.removeListener&&this.emit("removeListener",t,e);else if(r(A)){for(s=a;s-- >0;)if(A[s]===e||A[s].listener&&A[s].listener===e){i=s;break}if(i<0)return this;1===A.length?(A.length=0,delete this._events[t]):A.splice(i,1),this._events.removeListener&&this.emit("removeListener",t,e)}return this},A.prototype.removeAllListeners=function(t){var e,A;if(!this._events)return this;if(!this._events.removeListener)return 0===arguments.length?this._events={}:this._events[t]&&delete this._events[t],this;if(0===arguments.length){for(e in this._events)"removeListener"!==e&&this.removeAllListeners(e);return this.removeAllListeners("removeListener"),this._events={},this}if(A=this._events[t],n(A))this.removeListener(t,A);else if(A)for(;A.length;)this.removeListener(t,A[A.length-1]);return delete this._events[t],this},A.prototype.listeners=function(t){return this._events&&this._events[t]?n(this._events[t])?[this._events[t]]:this._events[t].slice():[]},A.prototype.listenerCount=function(t){if(this._events){var e=this._events[t];if(n(e))return 1;if(e)return e.length}return 0},A.listenerCount=function(t,e){return t.listenerCount(e)}},9:function(t,e,A){function n(t){var e={};return t.substring(1).toLowerCase().split("&").forEach(function(t){if(t.length){var A=t.split("="),n=A[0],i=A[1];e[n]=i}}),e}function i(t){var e=[];return P()(t).forEach(function(A){var n=t[A];if(n){var i=encodeURIComponent(n);e.push(A+"="+i)}}),e.length?"?"+e.join("&"):""}e.__esModule=!0,e.parseQueryParams=n,e.buildQueryParams=i},91:function(t,e,A){function n(t){return t&&t.__esModule?t:{default:t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){var e=(0,l.buildQueryParams)({"font-size":t.fontSize,allowfullscreen:t.allowfullscreen,autoplay:t.autoplay,channel:t.channel,chat:t.chat,collection:t.collection,layout:t.layout,muted:t.muted,playsinline:t.playsinline,theme:t.theme,time:t.time,video:t.video}),A=""+d.default.IFRAME_INDEX+e,n=document.createElement("iframe");return n.setAttribute("src",A),n.setAttribute("allowfullscreen",""),n.setAttribute("scrolling","no"),n.setAttribute("frameborder","0"),t.width&&n.setAttribute("width",t.width),t.height&&n.setAttribute("height",t.height),n}function a(t,e){if(!t)throw new u.MissingParameterError("An element argument is required");if(!o(t)&&!s(t))throw new u.MissingParameterError("An element of type String or Element is required");if(!e||!e.channel&&!e.video&&!e.collection)throw new u.MissingParameterError("A channel, video, or collection id must be provided in options")}function s(t){return"string"==typeof t}function o(t){return 1===t.nodeType}var c=A(0),l=A(9),u=A(77),h=A(75),d=n(h),m=A(78),f=n(m),v=A(76),g=A(82),C=n(g);window.Twitch=window.Twitch||{},window.Twitch.Embed=function(){function t(e,A){i(this,t),a(e,A),this.target=e,this.options=A,this.render(),this._eventEmitter=new C.default,this.player=null}return t.prototype.addEventListener=function(t,e){this._eventEmitter.on(t,e)},t.prototype.removeEventListener=function(t,e){this._eventEmitter.removeListener(t,e)},t.prototype.getPlayer=function(){return this.player},t.prototype.render=function(){var t=this,e=s(this.target)?document.getElementById(this.target):this.target;if(!e)throw new u.MissingElementError(this.target);var A=r(this.options);e.appendChild(A),window.addEventListener("message",function(e){var n=e.data,i=e.source,r=i===A.contentWindow,a=n.namespace===c.TE_MESSAGE_NAMESPACE;r&&a&&(n.eventName===v.EMBED_EVENTS.VIDEO_READY&&(t.player=new f.default(A.contentWindow)),t._eventEmitter.emit(n.eventName,n.params))})},t.prototype.destroy=function(){this._eventEmitter.removeAllListeners(),this._eventEmitter=null,this.player=null,this.target=null},t}(),function(t){P()(v.EMBED_EVENTS).forEach(function(e){t[e]=v.EMBED_EVENTS[e]})}(window.Twitch.Embed)}});var et={name:"topNav",created:function(){this.checkForStream()},mounted:function(){this.loadPlayer()},methods:{loadPlayer:function(){var t=window.innerWidth,e=window.innerHeight,A=localStorage.getItem("streamName"),n=new Twitch.Embed("twitch-embed",{width:t,height:e,channel:A,layout:"",theme:"dark",autoplay:!1});n.addEventListener(Twitch.Embed.VIDEO_READY,function(){n.getPlayer().play()}),g()("iframe").each(function(){g()(this).attr("id","twitchEmbed")})},checkForStream:function(){var t=window.location.href;if(t.indexOf("stream")>-1){console.log("user is trying to load a stream");var e=t.match(/name=(.*)/)[1];localStorage.setItem("streamName",e)}}}},At=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0,!1,!1)},nt=[function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{staticClass:"videoPlayerWrapper"},[A("div",{staticClass:"mouseEventWatchLayerTop"}),t._v(" "),A("div",{staticClass:"mouseEventWatchLayerLeft"}),t._v(" "),A("div",{attrs:{id:"twitch-embed"}})])}],it={render:At,staticRenderFns:nt},rt=it,at=A("VU/8"),st=r,ot=at(et,rt,!1,st,"data-v-8a50de2e",null),ct=ot.exports,lt={name:"gamesView",data:function(){return{games:[]}},created:function(){this.getGames()},filters:{truncate:function(t,e){return t.length>15?t.substring(0,e)+"...":t}},methods:{getGames:function(){var t=this;f()({method:"get",url:"https://api.twitch.tv/kraken/games/top/?limit=25",headers:{"Client-ID":"yb1fpw6w2ldfn50b0ynr50trdcxn99"}}).then(function(e){var A=e.data.top;t.games=A})}}},ut=function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{staticClass:"gamesViewWrapper"},t._l(t.games,function(e){return A("div",{staticClass:"gameContainer"},[A("router-link",{staticClass:"clickZone",attrs:{to:{path:"game",query:{name:e.game.name}}}}),t._v(" "),A("div",{staticClass:"gamesItemImageContainer"},[A("img",{staticClass:"gameImage",attrs:{src:e.game.box.large}})]),t._v(" "),A("div",{staticClass:"gamesItemTextContainer"},[A("div",{staticClass:"gameName"},[t._v(t._s(t._f("truncate")(e.game.name,15)))]),t._v(" "),A("div",{staticClass:"gameNumViewers"},[t._v(t._s(e.viewers))])])],1)}))},ht=[],dt={render:ut,staticRenderFns:ht},mt=dt,ft=A("VU/8"),vt=a,gt=ft(lt,mt,!1,vt,"data-v-f402cd84",null),Ct=gt.exports,Et={name:"followedView",data:function(){return{following:[]}},created:function(){this.getFollowing()},filters:{truncate:function(t,e){return t.length>15?t.substring(0,e)+"...":t},addComma:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},methods:{getFollowing:function(){var t=this,e=localStorage.getItem("access_token"),A="OAuth "+e;f()({method:"get",url:"https://api.twitch.tv/kraken/streams/followed?limit=25",headers:{"Client-ID":"yb1fpw6w2ldfn50b0ynr50trdcxn99",Authorization:A}}).then(function(e){var A=e.data.streams;t.following=A})}}},pt=function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{staticClass:"followedViewWrapper"},t._l(t.following,function(e){return A("div",{staticClass:"streamContainer"},[A("router-link",{staticClass:"clickZone",attrs:{to:{path:"stream",query:{name:e.channel.name}}}}),t._v(" "),A("div",{staticClass:"streamImageContainer"},[A("img",{staticClass:"streamImage",attrs:{src:e.preview.large}})]),t._v(" "),A("div",{staticClass:"streamTextContainer"},[A("div",{staticClass:"streamName"},[t._v(t._s(t._f("truncate")(e.channel.name,20)))]),t._v(" "),A("div",{staticClass:"streamGame"},[t._v(t._s(t._f("truncate")(e.channel.game,20)))]),t._v(" "),A("div",{staticClass:"streamStatus"},[t._v(t._s(t._f("truncate")(e.channel.status,20)))]),t._v(" "),A("div",{staticClass:"streamStatus"},[t._v(t._s(t._f("addComma")(e.viewers)))])])],1)}))},wt=[],_t={render:pt,staticRenderFns:wt},It=_t,Qt=A("VU/8"),yt=s,Yt=Qt(Et,It,!1,yt,"data-v-22ecd6f1",null),Ft=Yt.exports,bt={name:"subscribedView",data:function(){return{subscribed:[]}},created:function(){this.getSubscribed()},filters:{truncate:function(t,e){return t.length>15?t.substring(0,e)+"...":t},addComma:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},methods:{getSubscribed:function(){}}},Bt=function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{staticClass:"followedViewWrapper"},t._l(t.subscribed,function(e){return A("div",{staticClass:"streamContainer"},[A("router-link",{staticClass:"clickZone",attrs:{to:{path:"stream",query:{name:e.channel.name}}}}),t._v(" "),A("div",{staticClass:"streamImageContainer"},[A("img",{staticClass:"streamImage",attrs:{src:e.preview.large}})]),t._v(" "),A("div",{staticClass:"streamTextContainer"},[A("div",{staticClass:"streamName"},[t._v(t._s(t._f("truncate")(e.channel.name,20)))]),t._v(" "),A("div",{staticClass:"streamGame"},[t._v(t._s(t._f("truncate")(e.channel.game,20)))]),t._v(" "),A("div",{staticClass:"streamStatus"},[t._v(t._s(t._f("truncate")(e.channel.status,20)))]),t._v(" "),A("div",{staticClass:"streamStatus"},[t._v(t._s(t._f("addComma")(e.viewers)))])])],1)}))},Lt=[],St={render:Bt,staticRenderFns:Lt},Vt=St,Tt=A("VU/8"),xt=o,Nt=Tt(bt,Vt,!1,xt,"data-v-85757288",null),Wt=Nt.exports,Dt={name:"gameView",data:function(){return{streams:[]}},created:function(){this.getGameName(),this.getTopGameStreams()},filters:{truncate:function(t,e){return t.length>40?t.substring(0,e)+"...":t}},methods:{getGameName:function(){var t=window.location.href;if(t.indexOf("game")>-1){var e=t.match(/name=(.*)/)[1];localStorage.setItem("gameName",e)}},getTopGameStreams:function(){var t=this,e=localStorage.getItem("gameName");f()({method:"get",url:"https://api.twitch.tv/kraken/streams/?game="+e,headers:{"Client-ID":"yb1fpw6w2ldfn50b0ynr50trdcxn99"}}).then(function(e){var A=e.data.streams;t.streams=A})}}},Pt=function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{staticClass:"gameViewWrapper"},t._l(t.streams,function(e){return A("div",{staticClass:"streamContainer"},[A("router-link",{staticClass:"clickZone",attrs:{to:{path:"stream",query:{name:e.channel.name}}}}),t._v(" "),A("div",{staticClass:"streamImageContainer"},[A("img",{staticClass:"streamImage",attrs:{src:e.preview.large}})]),t._v(" "),A("div",{staticClass:"streamTextContainer"},[A("div",{staticClass:"streamName"},[t._v(t._s(e.channel.name))]),t._v(" "),A("div",{staticClass:"streamStatus"},[t._v(t._s(t._f("truncate")(e.channel.status,40)))]),t._v(" "),A("div",{staticClass:"streamViewers"},[t._v(t._s(e.viewers))])])],1)}))},Mt=[],Rt={render:Pt,staticRenderFns:Mt},kt=Rt,Ut=A("VU/8"),Gt=c,Jt=Ut(Dt,kt,!1,Gt,"data-v-33d7887b",null),Ot=Jt.exports,Xt={name:"about",data:function(){return{}},created:function(){},filters:{},methods:{}},qt=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0,!1,!1)},Kt=[function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{staticClass:"aboutWrapper"},[A("div",{staticClass:"title"},[t._v("About")]),t._v(" "),A("div",{staticClass:"aboutText"},[t._v("This website was made using the "),A("a",{attrs:{href:"https://dev.twitch.tv/docs/v5"}},[t._v("Twitch API")]),t._v(" and with "),A("a",{attrs:{href:"https://vuejs.org/"}},[t._v("Vue.js")]),t._v(" as the frontend framework.")])])}],zt={render:qt,staticRenderFns:Kt},Ht=zt,Zt=A("VU/8"),jt=l,$t=Zt(Xt,Ht,!1,jt,"data-v-32133138",null),te=$t.exports;d.a.use(F.a);var ee=new F.a({routes:[{path:"/",name:"Home",component:W},{path:"/stream/",name:"videoPlayer",component:ct},{path:"/games/",name:"gamesView",component:Ct},{path:"/followed/",name:"followedView",component:Ft},{path:"/subscribed/",name:"subscribedView",component:Wt},{path:"/game/",name:"gameView",component:Ot},{path:"/about/",name:"about",component:te}]}),Ae=(A("Rf8U"),{name:"topNav",data:function(){return{needToLogin:!0}},created:function(){this.checkLoggedIn(),this.redirectFromTwitch()},methods:{connectTwitch:function(){},checkLoggedIn:function(){window.location.href.indexOf("access_token")>-1&&(console.log("user has access token in url"),this.needToLogin=!1,this.saveUserToken()),localStorage.getItem("id_token")?(console.log("user has twitch access token"),this.needToLogin=!1):console.log("user not logged in to twitch")},saveUserToken:function(){var t=window.location.href;if(t.indexOf("access_token")>-1){var e=t,A=e.match("access_token=(.*)&id_token"),n=e.match("id_token=(.*)&scope");localStorage.setItem("access_token",A[1]),localStorage.setItem("id_token",n[1])}},redirectFromTwitch:function(){window.location.href.indexOf("access_token")>-1&&(window.location.href="https://mdonlan.github.io/twitch_tv_app/#/")},getFollowedStreams:function(){var t=localStorage.getItem("id"),e="OAuth "+t;clearAllStreams(),f()({metohd:"GET",url:"https://api.twitch.tv/kraken/streams/followed?limit=25",headers:{"Client-ID":"yb1fpw6w2ldfn50b0ynr50trdcxn99",Authorization:e},success:function(t){var t=t.streams;1==isLeftNav?(console.log("is left nav == true"),displayLeftNavData(t)):(console.log("is left nav == false"),createDivForEach(t,"channel")),isLeftNav=!1},error:function(t,e,A){console.log("An error has occured with the http request. Status: "+e+" - Message: "+A)}})}}}),ne=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"topNavWrapper"},[n("img",{staticClass:"twitchLogo",attrs:{src:A("YUQg")}}),t._v(" "),n("div",{staticClass:"topNavBtnContainer"},[n("router-link",{staticClass:"topNavBtn",attrs:{to:{path:"/"}}},[t._v("Popular")]),t._v(" "),n("router-link",{staticClass:"topNavBtn",attrs:{to:{path:"games"}}},[t._v("Games")]),t._v(" "),n("router-link",{staticClass:"topNavBtn",attrs:{to:{path:"followed"}}},[t._v("Followed")]),t._v(" "),n("router-link",{staticClass:"topNavBtn",attrs:{to:{path:"subscribed"}}},[t._v("Subscribed")]),t._v(" "),n("router-link",{staticClass:"topNavBtn aboutButton",attrs:{to:{path:"about"}}},[t._v("About")])],1),t._v(" "),t.needToLogin?n("div",{staticClass:"twitchConnectBtn"},[n("a",{attrs:{href:"https://api.twitch.tv/kraken/oauth2/authorize?response_type=token+id_token&client_id=yb1fpw6w2ldfn50b0ynr50trdcxn99&redirect_uri=https://mdonlan.github.io/twitch_tv_app/#/&scope=viewing_activity_read+openid&state=c3ab8aa609ea11e793ae92361f002671"}},[t._v("Connect Twitch")])]):t._e()])},ie=[],re={render:ne,staticRenderFns:ie},ae=re,se=A("VU/8"),oe=u,ce=se(Ae,ae,!1,oe,"data-v-cbf0bffe",null),le=ce.exports,ue={name:"leftNav",data:function(){return{following:[]}},created:function(){this.getFollowing()},mounted:function(){this.updateLive()},filters:{truncate:function(t,e){return t.length>15?t.substring(0,e)+"...":t},addComma:function(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}},methods:{checkForPlayer:function(){g()("#twitch-embed").children().length>0&&(g()("#twitch-embed").empty(),this.checkForStream(),this.loadPlayer())},loadPlayer:function(){var t=window.innerWidth,e=window.innerHeight,A=localStorage.getItem("streamName"),n=new Twitch.Embed("twitch-embed",{width:t,height:e,channel:A,layout:"",theme:"dark",autoplay:!1});n.addEventListener(Twitch.Embed.VIDEO_READY,function(){n.getPlayer().play()})},checkForStream:function(){var t=window.location.href;if(t.indexOf("stream")>-1){console.log("user is trying to load a stream");var e=t.match(/name=(.*)/)[1];localStorage.setItem("streamName",e)}},getFollowing:function(){console.log("updating leftNav data");var t=this,e=localStorage.getItem("access_token"),A="OAuth "+e;f()({method:"get",url:"https://api.twitch.tv/kraken/streams/followed?limit=25",headers:{"Client-ID":"yb1fpw6w2ldfn50b0ynr50trdcxn99",Authorization:A}}).then(function(e){var A=e.data.streams;t.following=A,console.log(e)}).catch(function(t){console.log(t)})},updateLive:function(){setInterval(this.getFollowing,6e4)}}},he=function(){var t=this,e=t.$createElement,A=t._self._c||e;return A("div",{staticClass:"leftNavWrapper",attrs:{id:"leftNavWrapper"}},[A("div",{staticClass:"leftNavTitle"},[t._v("LIVE FOLLOWING")]),t._v(" "),A("div",{staticClass:"leftNavContentContainer"},t._l(t.following,function(e){return A("div",{staticClass:"followItemContainer"},[A("router-link",{staticClass:"clickZone",attrs:{to:{path:"stream",query:{name:e.channel.name}}},nativeOn:{click:function(e){t.checkForPlayer(e)}}}),t._v(" "),A("div",{staticClass:"leftNavImageContainer"},[A("img",{staticClass:"followingLogo leftNavItem",attrs:{src:e.channel.logo}})]),t._v(" "),A("div",{staticClass:"leftNavTextContainer"},[A("div",{staticClass:"followingName leftNavItem"},[t._v(t._s(t._f("truncate")(e.channel.name,15)))]),t._v(" "),A("div",{staticClass:"followingGame leftNavItem"},[t._v(t._s(t._f("truncate")(e.channel.game,15)))]),t._v(" "),A("div",{staticClass:"followingViewers leftNavItem"},[t._v(t._s(t._f("addComma")(e.viewers)))])])],1)}))])},de=[],me={render:he,staticRenderFns:de},fe=me,ve=A("VU/8"),ge=h,Ce=ve(ue,fe,!1,ge,"data-v-2e3cad2b",null),Ee=Ce.exports;d.a.config.productionTip=!1,d.a.component("topNav",le),d.a.component("leftNav",Ee),new d.a({el:"#app",router:ee,template:"<App/>",components:{App:Y}})},SOH1:function(t,e){},SlIn:function(t,e){},V4Yk:function(t,e){},YUQg:function(t,e){t.exports="data:image/png;base64,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"},cPQh:function(t,e){},lsU1:function(t,e){},w15S:function(t,e){},xrau:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.29d945be1cb2c0ac4bbe.js.map