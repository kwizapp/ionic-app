(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{943:function(t,n,e){"use strict";e.r(n),e.d(n,"KEYBOARD_DID_CLOSE",(function(){return r})),e.d(n,"KEYBOARD_DID_OPEN",(function(){return i})),e.d(n,"copyLayoutViewport",(function(){return K})),e.d(n,"copyVisualViewport",(function(){return E})),e.d(n,"keyboardDidClose",(function(){return y})),e.d(n,"keyboardDidOpen",(function(){return g})),e.d(n,"keyboardDidResize",(function(){return b})),e.d(n,"resetKeyboardAssist",(function(){return f})),e.d(n,"setKeyboardClose",(function(){return w})),e.d(n,"setKeyboardOpen",(function(){return p})),e.d(n,"startKeyboardAssist",(function(){return s})),e.d(n,"trackViewportChanges",(function(){return k}));var i="ionKeyboardDidShow",r="ionKeyboardDidHide",o={},u={},d={},a={},c=!1,f=function(){o={},u={},d={},a={},c=!1},s=function(t){h(t),t.visualViewport&&(u=E(t.visualViewport),a=K(t),t.visualViewport.onresize=function(){k(t),g()||b(t)?p(t):y(t)&&w(t)})},h=function(t){t.addEventListener("keyboardDidShow",(function(n){return p(t,n)})),t.addEventListener("keyboardDidHide",(function(){return w(t)}))},p=function(t,n){D(t,n),c=!0},w=function(t){l(t),c=!1},g=function(){var t=(o.height-u.height)*u.scale;return!c&&o.width===u.width&&t>150&&!v()},b=function(t){return c&&!y(t)},y=function(t){return c&&u.height===t.innerHeight},v=function(){return a.width!==d.width||a.height!==d.height},D=function(t,n){var e=n?n.keyboardHeight:t.innerHeight-u.height,r=new CustomEvent(i,{detail:{keyboardHeight:e}});t.dispatchEvent(r)},l=function(t){var n=new CustomEvent(r);t.dispatchEvent(n)},k=function(t){o=Object.assign({},u),u=E(t.visualViewport),d=Object.assign({},a),a=K(t)},E=function(t){return{width:Math.round(t.width),height:Math.round(t.height),offsetTop:t.offsetTop,offsetLeft:t.offsetLeft,pageTop:t.pageTop,pageLeft:t.pageLeft,scale:t.scale}},K=function(t){return{width:t.innerWidth,height:t.innerHeight}}}}]);