(window.webpackJsonp=window.webpackJsonp||[]).push([[63],{901:function(e,r,t){"use strict";t.r(r),t.d(r,"ion_refresher",(function(){return x})),t.d(r,"ion_refresher_content",(function(){return w}));var n=t(3),i=t(30),s=t(25),o=(t(242),t(170),t(41)),a=t(7),l=(t(42),t(124),t(125),t(168)),f=(t(166),t(167)),c=(t(77),t(169),t(59),t(938)),h={getEngine:function(){var e=window;return e.TapticEngine||e.Capacitor&&e.Capacitor.isPluginAvailable("Haptics")&&e.Capacitor.Plugins.Haptics},available:function(){return!!this.getEngine()},isCordova:function(){return!!window.TapticEngine},isCapacitor:function(){return!!window.Capacitor},impact:function(e){var r=this.getEngine();if(r){var t=this.isCapacitor()?e.style.toUpperCase():e.style;r.impact({style:t})}},notification:function(e){var r=this.getEngine();if(r){var t=this.isCapacitor()?e.style.toUpperCase():e.style;r.notification({style:t})}},selection:function(){this.impact({style:"light"})},selectionStart:function(){var e=this.getEngine();e&&(this.isCapacitor()?e.selectionStart():e.gestureSelectionStart())},selectionChanged:function(){var e=this.getEngine();e&&(this.isCapacitor()?e.selectionChanged():e.gestureSelectionChanged())},selectionEnd:function(){var e=this.getEngine();e&&(this.isCapacitor()?e.selectionChanged():e.gestureSelectionChanged())}},u=function(e){var r=e.querySelector("ion-spinner"),t=r.shadowRoot.querySelector("circle"),n=e.querySelector(".spinner-arrow-container"),i=e.querySelector(".arrow-container"),s=i?i.querySelector("ion-icon"):null,o=Object(a.a)().duration(1e3).easing("ease-out"),l=Object(a.a)().addElement(n).keyframes([{offset:0,opacity:"0.3"},{offset:.45,opacity:"0.3"},{offset:.55,opacity:"1"},{offset:1,opacity:"1"}]),f=Object(a.a)().addElement(t).keyframes([{offset:0,strokeDasharray:"1px, 200px"},{offset:.2,strokeDasharray:"1px, 200px"},{offset:.55,strokeDasharray:"100px, 200px"},{offset:1,strokeDasharray:"100px, 200px"}]),c=Object(a.a)().addElement(r).keyframes([{offset:0,transform:"rotate(-90deg)"},{offset:1,transform:"rotate(210deg)"}]);if(i&&s){var h=Object(a.a)().addElement(i).keyframes([{offset:0,transform:"rotate(0deg)"},{offset:.3,transform:"rotate(0deg)"},{offset:.55,transform:"rotate(280deg)"},{offset:1,transform:"rotate(400deg)"}]),u=Object(a.a)().addElement(s).keyframes([{offset:0,transform:"translateX(2px) scale(0)"},{offset:.3,transform:"translateX(2px) scale(0)"},{offset:.55,transform:"translateX(-1.5px) scale(1)"},{offset:1,transform:"translateX(-1.5px) scale(1)"}]);o.addAnimation([h,u])}return o.addAnimation([l,f,c])},p=function(e){var r=e.clientHeight,t=Object(a.a)().addElement(e).keyframes([{offset:0,transform:"scale(0) translateY(-"+(r+20)+"px)"},{offset:1,transform:"scale(1) translateY(100px)"}]);return u(e).addAnimation([t])},d=function(e){var r=e.clientHeight,t=Object(a.a)().addElement(e).keyframes([{offset:0,transform:"translateY(-"+(r+20)+"px)"},{offset:1,transform:"translateY(100px)"}]);return u(e).addAnimation([t])},g=function(e,r){e.style.setProperty("opacity",r.toString())},m=function(e,r){if(!e)return Promise.resolve();var t=y(e);return Object(i.n)((function(){e.style.setProperty("transition","0.2s all ease-out"),void 0===r?e.style.removeProperty("transform"):e.style.setProperty("transform","translate3d(0px, "+r+", 0px)")})),t},b=function(e,r){var t=e.querySelector("ion-refresher-content .refresher-pulling ion-spinner"),n=e.querySelector("ion-refresher-content .refresher-refreshing ion-spinner");return null!==t&&null!==n&&("ios"===r&&Object(s.e)("mobile")&&void 0!==e.style.webkitOverflowScrolling||"md"===r)},y=function(e){return new Promise((function(r){v(e,r)}))},v=function(e,r){var t,n={passive:!0},i=function(){t&&t()},s=function(t){e===t.target&&(i(),r(t))};return e&&(e.addEventListener("webkitTransitionEnd",s,n),e.addEventListener("transitionend",s,n),t=function(){e.removeEventListener("webkitTransitionEnd",s,n),e.removeEventListener("transitionend",s,n)}),i},x=function(){function e(e){Object(i.l)(this,e),this.appliedStyles=!1,this.didStart=!1,this.progress=0,this.pointerDown=!1,this.needsCompletion=!1,this.didRefresh=!1,this.lastVelocityY=0,this.animations=[],this.nativeRefresher=!1,this.state=1,this.pullMin=60,this.pullMax=this.pullMin+60,this.closeDuration="280ms",this.snapbackDuration="280ms",this.pullFactor=1,this.disabled=!1,this.ionRefresh=Object(i.f)(this,"ionRefresh",7),this.ionPull=Object(i.f)(this,"ionPull",7),this.ionStart=Object(i.f)(this,"ionStart",7)}return e.prototype.disabledChanged=function(){this.gesture&&this.gesture.enable(!this.disabled)},e.prototype.checkNativeRefresher=function(){var e=b(this.el,Object(s.b)(this));if(e&&!this.nativeRefresher){var r=this.el.closest("ion-content");this.setupNativeRefresher(r)}else e||this.destroyNativeRefresher()},e.prototype.destroyNativeRefresher=function(){this.scrollEl&&this.scrollListenerCallback&&(this.scrollEl.removeEventListener("scroll",this.scrollListenerCallback),this.scrollListenerCallback=void 0),this.nativeRefresher=!1},e.prototype.resetNativeRefresher=function(e,r){return Object(n.a)(this,void 0,void 0,(function(){return Object(n.c)(this,(function(t){switch(t.label){case 0:return this.state=r,"ios"!==Object(s.b)(this)?[3,2]:[4,m(e,void 0)];case 1:return t.sent(),[3,4];case 2:return[4,y(this.el.querySelector(".refresher-refreshing-icon"))];case 3:t.sent(),t.label=4;case 4:return this.didRefresh=!1,this.needsCompletion=!1,this.pointerDown=!1,this.animations.forEach((function(e){return e.destroy()})),this.animations=[],this.progress=0,this.state=1,[2]}}))}))},e.prototype.setupiOSNativeRefresher=function(e,r){return Object(n.a)(this,void 0,void 0,(function(){var s,a,l,f,c=this;return Object(n.c)(this,(function(n){switch(n.label){case 0:return this.elementToTransform=this.scrollEl,s=e.shadowRoot.querySelectorAll("svg"),a=.16*this.scrollEl.clientHeight,l=s.length,Object(i.n)((function(){return s.forEach((function(e){return e.style.setProperty("animation","none")}))})),this.scrollListenerCallback=function(){(c.pointerDown||1!==c.state)&&Object(i.h)((function(){var t=c.scrollEl.scrollTop,n=c.el.clientHeight;if(t>0){if(8===c.state){var f=Object(o.c)(0,t/(.5*n),1);return void Object(i.n)((function(){return g(r,1-f)}))}Object(i.n)((function(){return g(e,0)}))}else{c.pointerDown&&(c.didStart||(c.didStart=!0,c.ionStart.emit()),c.pointerDown&&c.ionPull.emit());var u=Object(o.c)(0,Math.abs(t)/n,.99),p=c.progress=Object(o.c)(0,(Math.abs(t)-30)/a,1),d=Object(o.c)(0,Math.floor(p*l),l-1);8===c.state||d===l-1?(c.pointerDown&&function(e,r){Object(i.n)((function(){e.style.setProperty("--refreshing-rotation-duration",r>=1?"0.5s":"2s"),e.style.setProperty("opacity","1")}))}(r,c.lastVelocityY),c.didRefresh||(c.beginRefresh(),c.didRefresh=!0,function(e){h.impact(e)}({style:"light"}),c.pointerDown||m(c.elementToTransform,n+"px"))):(c.state=2,function(e,r,t,n){Object(i.n)((function(){g(e,t),r.forEach((function(e,r){return e.style.setProperty("opacity",r<=n?"0.99":"0")}))}))}(e,s,u,d))}}))},this.scrollEl.addEventListener("scroll",this.scrollListenerCallback),f=this,[4,Promise.resolve().then(t.bind(null,166))];case 1:return f.gesture=n.sent().createGesture({el:this.scrollEl,gestureName:"refresher",gesturePriority:10,direction:"y",threshold:5,onStart:function(){c.pointerDown=!0,c.didRefresh||m(c.elementToTransform,"0px")},onMove:function(e){c.lastVelocityY=e.velocityY},onEnd:function(){c.pointerDown=!1,c.didStart=!1,c.needsCompletion?(c.resetNativeRefresher(c.elementToTransform,32),c.needsCompletion=!1):c.didRefresh&&Object(i.h)((function(){return m(c.elementToTransform,c.el.clientHeight+"px")}))}}),this.disabledChanged(),[2]}}))}))},e.prototype.setupMDNativeRefresher=function(e,r,s){return Object(n.a)(this,void 0,void 0,(function(){var f,c,h,u,g=this;return Object(n.c)(this,(function(m){switch(m.label){case 0:return f=r.shadowRoot.querySelector("circle"),c=this.el.querySelector("ion-refresher-content .refresher-pulling-icon"),h=s.shadowRoot.querySelector("circle"),null!==f&&null!==h&&Object(i.n)((function(){f.style.setProperty("animation","none"),s.style.setProperty("animation-delay","-655ms"),h.style.setProperty("animation-delay","-655ms")})),u=this,[4,Promise.resolve().then(t.bind(null,166))];case 1:return u.gesture=m.sent().createGesture({el:this.scrollEl,gestureName:"refresher",gesturePriority:10,direction:"y",threshold:5,canStart:function(){return 8!==g.state&&32!==g.state&&0===g.scrollEl.scrollTop},onStart:function(e){e.data={animation:void 0,didStart:!1,cancelled:!1}},onMove:function(r){if(r.velocityY<0&&0===g.progress&&!r.data.didStart||r.data.cancelled)r.data.cancelled=!0;else{if(!r.data.didStart)return r.data.didStart=!0,g.state=2,void Object(i.n)((function(){var t=function(e,r){return"scale"===e?p(r):d(r)}(function(e){var r=e.previousElementSibling;return null!==r&&"ION-HEADER"===r.tagName?"translate":"scale"}(e),c);r.data.animation=t,g.scrollEl.style.setProperty("--overflow","hidden"),t.progressStart(!1,0),g.ionStart.emit(),g.animations.push(t)}));g.progress=Object(o.c)(0,r.deltaY/180*.5,1),r.data.animation.progressStep(g.progress),g.ionPull.emit()}},onEnd:function(e){if(e.data.didStart){if(Object(i.n)((function(){return g.scrollEl.style.removeProperty("--overflow")})),g.progress<=.4)return g.gesture.enable(!1),void e.data.animation.progressEnd(0,g.progress,500).onFinish((function(){g.animations.forEach((function(e){return e.destroy()})),g.animations=[],g.gesture.enable(!0),g.state=1}));var r=Object(l.a)([0,0],[0,0],[1,1],[1,1],g.progress)[0],t=function(e){return Object(a.a)().duration(125).addElement(e).fromTo("transform","translateY(var(--ion-pulling-refresher-translate, 100px))","translateY(0px)")}(c);g.animations.push(t),Object(i.n)((function(){return Object(n.a)(g,void 0,void 0,(function(){return Object(n.c)(this,(function(n){switch(n.label){case 0:return c.style.setProperty("--ion-pulling-refresher-translate",100*r+"px"),e.data.animation.progressEnd(),[4,t.play()];case 1:return n.sent(),this.beginRefresh(),e.data.animation.destroy(),[2]}}))}))}))}}}),this.disabledChanged(),[2]}}))}))},e.prototype.setupNativeRefresher=function(e){return Object(n.a)(this,void 0,void 0,(function(){var r,t;return Object(n.c)(this,(function(n){switch(n.label){case 0:return this.scrollListenerCallback||!e||this.nativeRefresher||!this.scrollEl?[2]:(this.nativeRefresher=!0,r=this.el.querySelector("ion-refresher-content .refresher-pulling ion-spinner"),t=this.el.querySelector("ion-refresher-content .refresher-refreshing ion-spinner"),[4,e.componentOnReady()]);case 1:return n.sent(),"ios"===Object(s.b)(this)?this.setupiOSNativeRefresher(r,t):this.setupMDNativeRefresher(e,r,t),[2]}}))}))},e.prototype.componentDidUpdate=function(){this.checkNativeRefresher()},e.prototype.connectedCallback=function(){return Object(n.a)(this,void 0,void 0,(function(){var e,r,i,o=this;return Object(n.c)(this,(function(n){switch(n.label){case 0:return"fixed"!==this.el.getAttribute("slot")?(console.error('Make sure you use: <ion-refresher slot="fixed">'),[2]):(e=this.el.closest("ion-content"))?(r=this,[4,e.getScrollElement()]):(console.error("<ion-refresher> must be used inside an <ion-content>"),[2]);case 1:return r.scrollEl=n.sent(),this.backgroundContentEl=e.shadowRoot.querySelector("#background-content"),b(this.el,Object(s.b)(this))?(this.setupNativeRefresher(e),[3,4]):[3,2];case 2:return i=this,[4,Promise.resolve().then(t.bind(null,166))];case 3:i.gesture=n.sent().createGesture({el:e,gestureName:"refresher",gesturePriority:10,direction:"y",threshold:20,passive:!1,canStart:function(){return o.canStart()},onStart:function(){return o.onStart()},onMove:function(e){return o.onMove(e)},onEnd:function(){return o.onEnd()}}),this.disabledChanged(),n.label=4;case 4:return[2]}}))}))},e.prototype.disconnectedCallback=function(){this.destroyNativeRefresher(),this.scrollEl=void 0,this.gesture&&(this.gesture.destroy(),this.gesture=void 0)},e.prototype.complete=function(){return Object(n.a)(this,void 0,void 0,(function(){var e=this;return Object(n.c)(this,(function(r){return this.nativeRefresher?(this.needsCompletion=!0,this.pointerDown||Object(o.k)((function(){return Object(o.k)((function(){return e.resetNativeRefresher(e.elementToTransform,32)}))}))):this.close(32,"120ms"),[2]}))}))},e.prototype.cancel=function(){return Object(n.a)(this,void 0,void 0,(function(){var e=this;return Object(n.c)(this,(function(r){return this.nativeRefresher?this.pointerDown||Object(o.k)((function(){return Object(o.k)((function(){return e.resetNativeRefresher(e.elementToTransform,16)}))})):this.close(16,""),[2]}))}))},e.prototype.getProgress=function(){return Promise.resolve(this.progress)},e.prototype.canStart=function(){return!!this.scrollEl&&1===this.state&&!(this.scrollEl.scrollTop>0)},e.prototype.onStart=function(){this.progress=0,this.state=1},e.prototype.onMove=function(e){if(this.scrollEl){var r=e.event;if(!(r.touches&&r.touches.length>1)&&0==(56&this.state)){var t=Number.isNaN(this.pullFactor)||this.pullFactor<0?1:this.pullFactor,n=e.deltaY*t;if(n<=0)return this.progress=0,this.state=1,this.appliedStyles?void this.setCss(0,"",!1,""):void 0;if(1===this.state){if(this.scrollEl.scrollTop>0)return void(this.progress=0);this.state=2}if(r.cancelable&&r.preventDefault(),this.setCss(n,"0ms",!0,""),0!==n){var i=this.pullMin;this.progress=n/i,this.didStart||(this.didStart=!0,this.ionStart.emit()),this.ionPull.emit(),n<i?this.state=2:n>this.pullMax?this.beginRefresh():this.state=4}else this.progress=0}}},e.prototype.onEnd=function(){4===this.state?this.beginRefresh():2===this.state&&this.cancel()},e.prototype.beginRefresh=function(){this.state=8,this.setCss(this.pullMin,this.snapbackDuration,!0,""),this.ionRefresh.emit({complete:this.complete.bind(this)})},e.prototype.close=function(e,r){var t=this;setTimeout((function(){t.state=1,t.progress=0,t.didStart=!1,t.setCss(0,"0ms",!1,"")}),600),this.state=e,this.setCss(0,this.closeDuration,!0,r)},e.prototype.setCss=function(e,r,t,n){var s=this;this.nativeRefresher||(this.appliedStyles=e>0,Object(i.n)((function(){if(s.scrollEl&&s.backgroundContentEl){var i=s.scrollEl.style,o=s.backgroundContentEl.style;i.transform=o.transform=e>0?"translateY("+e+"px) translateZ(0px)":"",i.transitionDuration=o.transitionDuration=r,i.transitionDelay=o.transitionDelay=n,i.overflow=t?"hidden":""}})))},e.prototype.render=function(){var e,r=Object(s.b)(this);return Object(i.j)(i.b,{slot:"fixed",class:(e={},e[r]=!0,e["refresher-"+r]=!0,e["refresher-native"]=this.nativeRefresher,e["refresher-active"]=1!==this.state,e["refresher-pulling"]=2===this.state,e["refresher-ready"]=4===this.state,e["refresher-refreshing"]=8===this.state,e["refresher-cancelling"]=16===this.state,e["refresher-completing"]=32===this.state,e)})},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i.g)(this)},enumerable:!0,configurable:!0}),Object.defineProperty(e,"watchers",{get:function(){return{disabled:["disabledChanged"]}},enumerable:!0,configurable:!0}),e}();x.style={ios:"ion-refresher{left:0;top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}[dir=rtl] ion-refresher,:host-context([dir=rtl]) ion-refresher{left:unset;right:unset;right:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:200ms;transition:200ms;font-size:30px;text-align:center}[dir=rtl] .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-ios .refresher-pulling-icon,.refresher-ios .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-ios .refresher-pulling-text,.refresher-ios .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-lines-ios line,.refresher-ios .refresher-refreshing .spinner-lines-small-ios line,.refresher-ios .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-ios .refresher-refreshing .spinner-bubbles circle,.refresher-ios .refresher-refreshing .spinner-circles circle,.refresher-ios .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native ion-spinner{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}.refresher-native .refresher-refreshing ion-spinner{--refreshing-rotation-duration:2s;display:none;-webkit-animation:var(--refreshing-rotation-duration) ease-out refresher-rotate forwards;animation:var(--refreshing-rotation-duration) ease-out refresher-rotate forwards}.refresher-native .refresher-refreshing{display:none;-webkit-animation:250ms linear refresher-pop forwards;animation:250ms linear refresher-pop forwards}.refresher-native.refresher-refreshing .refresher-pulling ion-spinner,.refresher-native.refresher-completing .refresher-pulling ion-spinner{display:none}.refresher-native.refresher-refreshing .refresher-refreshing ion-spinner,.refresher-native.refresher-completing .refresher-refreshing ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-pulling ion-spinner{display:block}.refresher-native.refresher-pulling .refresher-refreshing ion-spinner{display:none}@-webkit-keyframes refresher-pop{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{-webkit-transform:scale(1.2);transform:scale(1.2);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes refresher-pop{0%{-webkit-transform:scale(1);transform:scale(1);-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in}50%{-webkit-transform:scale(1.2);transform:scale(1.2);-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes refresher-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}@keyframes refresher-rotate{from{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(180deg);transform:rotate(180deg)}}",md:"ion-refresher{left:0;top:0;display:none;position:absolute;width:100%;height:60px;pointer-events:none;z-index:-1}[dir=rtl] ion-refresher,:host-context([dir=rtl]) ion-refresher{left:unset;right:unset;right:0}ion-refresher.refresher-active{display:block}ion-refresher-content{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-pack:center;justify-content:center;height:100%}.refresher-pulling,.refresher-refreshing{display:none;width:100%}.refresher-pulling-icon,.refresher-refreshing-icon{-webkit-transform-origin:center;transform-origin:center;-webkit-transition:200ms;transition:200ms;font-size:30px;text-align:center}[dir=rtl] .refresher-pulling-icon,:host-context([dir=rtl]) .refresher-pulling-icon,[dir=rtl] .refresher-refreshing-icon,:host-context([dir=rtl]) .refresher-refreshing-icon{-webkit-transform-origin:calc(100% - center);transform-origin:calc(100% - center)}.refresher-pulling-text,.refresher-refreshing-text{font-size:16px;text-align:center}ion-refresher-content .arrow-container{display:none}.refresher-pulling ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling{display:block}.refresher-ready ion-refresher-content .refresher-pulling-icon{-webkit-transform:rotate(180deg);transform:rotate(180deg)}.refresher-refreshing ion-refresher-content .refresher-refreshing{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling{display:block}.refresher-cancelling ion-refresher-content .refresher-pulling-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-completing ion-refresher-content .refresher-refreshing{display:block}.refresher-completing ion-refresher-content .refresher-refreshing-icon{-webkit-transform:scale(0);transform:scale(0)}.refresher-native .refresher-pulling-text,.refresher-native .refresher-refreshing-text{display:none}.refresher-md .refresher-pulling-icon,.refresher-md .refresher-refreshing-icon{color:var(--ion-text-color, #000)}.refresher-md .refresher-pulling-text,.refresher-md .refresher-refreshing-text{color:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-lines-md line,.refresher-md .refresher-refreshing .spinner-lines-small-md line,.refresher-md .refresher-refreshing .spinner-crescent circle{stroke:var(--ion-text-color, #000)}.refresher-md .refresher-refreshing .spinner-bubbles circle,.refresher-md .refresher-refreshing .spinner-circles circle,.refresher-md .refresher-refreshing .spinner-dots circle{fill:var(--ion-text-color, #000)}ion-refresher.refresher-native{display:block;z-index:1}ion-refresher.refresher-native ion-spinner{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;width:24px;height:24px;color:var(--ion-color-primary, #3880ff)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native ion-spinner{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}ion-refresher.refresher-native .spinner-arrow-container{display:inherit}ion-refresher.refresher-native .arrow-container{display:block;position:absolute;width:24px;height:24px}ion-refresher.refresher-native .arrow-container ion-icon{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;left:0;right:0;bottom:-4px;position:absolute;color:var(--ion-color-primary, #3880ff);font-size:12px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native .arrow-container ion-icon{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}ion-refresher.refresher-native.refresher-pulling ion-refresher-content .refresher-pulling,ion-refresher.refresher-native.refresher-ready ion-refresher-content .refresher-pulling{display:-ms-flexbox;display:flex}ion-refresher.refresher-native.refresher-refreshing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-completing ion-refresher-content .refresher-refreshing,ion-refresher.refresher-native.refresher-cancelling ion-refresher-content .refresher-refreshing{display:-ms-flexbox;display:flex}ion-refresher.refresher-native .refresher-pulling-icon{-webkit-transform:translateY(calc(-100% - 10px));transform:translateY(calc(-100% - 10px))}ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{margin-left:auto;margin-right:auto;margin-top:0;margin-bottom:0;border-radius:100%;padding-left:8px;padding-right:8px;padding-top:8px;padding-bottom:8px;display:-ms-flexbox;display:flex;border:1px solid #ececec;background:white;-webkit-box-shadow:0px 1px 6px rgba(0, 0, 0, 0.1);box-shadow:0px 1px 6px rgba(0, 0, 0, 0.1)}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{margin-left:unset;margin-right:unset;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto}}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){ion-refresher.refresher-native .refresher-pulling-icon,ion-refresher.refresher-native .refresher-refreshing-icon{padding-left:unset;padding-right:unset;-webkit-padding-start:8px;padding-inline-start:8px;-webkit-padding-end:8px;padding-inline-end:8px}}"};var w=function(){function e(e){Object(i.l)(this,e)}return e.prototype.componentWillLoad=function(){if(void 0===this.pullingIcon){var e=Object(s.b)(this),r=void 0!==this.el.style.webkitOverflowScrolling?"lines":"arrow-down";this.pullingIcon=s.c.get("refreshingIcon","ios"===e&&Object(s.e)("mobile")?s.c.get("spinner",r):"circular")}void 0===this.refreshingSpinner&&(e=Object(s.b)(this),this.refreshingSpinner=s.c.get("refreshingSpinner",s.c.get("spinner","ios"===e?"lines":"circular")))},e.prototype.render=function(){var e=this.pullingIcon,r=null!=e&&void 0!==c.a[e],t=Object(s.b)(this);return Object(i.j)(i.b,{class:t},Object(i.j)("div",{class:"refresher-pulling"},this.pullingIcon&&r&&Object(i.j)("div",{class:"refresher-pulling-icon"},Object(i.j)("div",{class:"spinner-arrow-container"},Object(i.j)("ion-spinner",{name:this.pullingIcon,paused:!0}),"md"===t&&"circular"===this.pullingIcon&&Object(i.j)("div",{class:"arrow-container"},Object(i.j)("ion-icon",{name:"caret-back-sharp"})))),this.pullingIcon&&!r&&Object(i.j)("div",{class:"refresher-pulling-icon"},Object(i.j)("ion-icon",{icon:this.pullingIcon,lazy:!1})),this.pullingText&&Object(i.j)("div",{class:"refresher-pulling-text",innerHTML:Object(f.a)(this.pullingText)})),Object(i.j)("div",{class:"refresher-refreshing"},this.refreshingSpinner&&Object(i.j)("div",{class:"refresher-refreshing-icon"},Object(i.j)("ion-spinner",{name:this.refreshingSpinner})),this.refreshingText&&Object(i.j)("div",{class:"refresher-refreshing-text",innerHTML:Object(f.a)(this.refreshingText)})))},Object.defineProperty(e.prototype,"el",{get:function(){return Object(i.g)(this)},enumerable:!0,configurable:!0}),e}()},938:function(e,r,t){"use strict";t.d(r,"a",(function(){return n}));var n={bubbles:{dur:1e3,circles:9,fn:function(e,r,t){var n=e*r/t-e+"ms",i=2*Math.PI*r/t;return{r:5,style:{top:9*Math.sin(i)+"px",left:9*Math.cos(i)+"px","animation-delay":n}}}},circles:{dur:1e3,circles:8,fn:function(e,r,t){var n=r/t,i=e*n-e+"ms",s=2*Math.PI*n;return{r:5,style:{top:9*Math.sin(s)+"px",left:9*Math.cos(s)+"px","animation-delay":i}}}},circular:{dur:1400,elmDuration:!0,circles:1,fn:function(){return{r:20,cx:48,cy:48,fill:"none",viewBox:"24 24 48 48",transform:"translate(0,0)",style:{}}}},crescent:{dur:750,circles:1,fn:function(){return{r:26,style:{}}}},dots:{dur:750,circles:3,fn:function(e,r){return{r:6,style:{left:9-9*r+"px","animation-delay":-110*r+"ms"}}}},lines:{dur:1e3,lines:12,fn:function(e,r,t){return{y1:17,y2:29,style:{transform:"rotate("+(30*r+(r<6?180:-180))+"deg)","animation-delay":e*r/t-e+"ms"}}}},"lines-small":{dur:1e3,lines:12,fn:function(e,r,t){return{y1:12,y2:20,style:{transform:"rotate("+(30*r+(r<6?180:-180))+"deg)","animation-delay":e*r/t-e+"ms"}}}}}}}]);