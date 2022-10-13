!function(){"use strict";var t="jonnitto-prettyembed",e="".concat(t,"--init"),n="".concat(t,"--slim"),o="".concat(t,"--play"),a=Array.from(document.querySelectorAll(".".concat(t,"--video video:not([autoplay])"))),c=Array.from(document.querySelectorAll(".".concat(t,"--audio audio:not([autoplay])"))),i=[].concat(a,c);function r(t){var a=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],c=arguments.length>2?arguments[2]:void 0,i=t.parentNode.classList;if(!i.contains(e))if("function"==typeof c&&c(),t.hasAttribute("data-controls")&&t.setAttribute("controls",!0),t.hasAttribute("controls")||(i.add(n),t.addEventListener("click",(function(){var e=!i.contains(o);i[e?"add":"remove"](o),e?t.play():t.pause()}))),t.hasAttribute("data-streaming")){var r=t.getAttribute("data-streaming");if(t.canPlayType("application/vnd.apple.mpegurl"))t.src=r,u(t,a,i);else if("undefined"==typeof Hls){var l=document.createElement("script");l.src="/_Resources/Static/Packages/Jonnitto.PrettyEmbedHelper/Scripts/Hls.js?v=1",document.head.appendChild(l),l.addEventListener("load",(function(){setTimeout((function(){d(t,r),u(t,a,i)}),100)}))}else d(t,r),u(t,a,i)}else u(t,a,i)}function u(t,n,a){a.add(e),n&&(a.add(o),setTimeout((function(){t.play()}),0))}function l(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;t.forEach((function(t){t!=e&&(t.hasAttribute("controls")||t.parentNode.classList.remove(o),t.pause())}))}function d(t,e){if(Hls.isSupported()){var n=new Hls;n.loadSource(e),n.attachMedia(t)}}function s(t){var e;t||(t={}),window.CustomEvent?e=new CustomEvent("prettyembed",{detail:t}):(e=document.createEvent("CustomEvent")).initCustomEvent("prettyembed",!0,!0,t),document.dispatchEvent(e)}i.forEach((function(t){t.addEventListener("play",(function(t){l(i,t.target)}))}));var f=document.querySelectorAll(".jonnitto-prettyembed--audio audio");function p(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||t.oMatchesSelector).call(t,e)}function m(t,e){document.documentElement.addEventListener("click",(function(n){var o=function(t,e){var n=t;do{if(p(n,e))return n;n=n.parentElement||n.parentNode}while(null!==n&&1===n.nodeType);return null}(n.target,t);o&&"function"==typeof e&&e.call(o,n)}))}function v(t){return t.getAttribute("aria-label")}Array.from(f).forEach((function(t){var e;r(t,!1),s({type:"audio",style:"inline",src:(e=t.querySelector("source"),e?e.src:null)})}));function y(t){return y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},y(t)}m(".jonnitto-prettyembed--video.jonnitto-prettyembed--inline video",(function(t){var e=this;t.preventDefault(),r(this,!0,(function(){var t;s({type:"video",style:"inline",title:v(e),src:(t=e.querySelector("source"),t?t.src:null)})}))}));var b=document.documentElement,h=document.body,g="jonnitto-prettyembed",E="".concat(g,"__lightbox"),S=E,A="-".concat(E),T=b.classList,L="".concat(g,"__inner"),w="".concat(g,"__close"),_="".concat(g,"__content"),j=document.createElement("div");j.className=E,j.innerHTML='\n<div class="'.concat(L,'">\n    <button type="button" class="').concat(w,'">&times;</button>\n    <div id="').concat(S,'" class="').concat(g," ").concat(_,'"></div>\n</div>');var H=!1,q=null;function C(){H.className="".concat(g," ").concat(_),H.removeAttribute("style"),H.innerHTML=""}function M(t,e){return H||(h.appendChild(j),H=document.getElementById(S)),C(),"object"!=y(t)&&(t=t?[t]:[]),t.forEach((function(t){H.classList.add("".concat(g,"--").concat(t))})),e&&(H.style.paddingTop=e),H}function N(t){clearTimeout(q),q=setTimeout((function(){"function"==typeof t&&t(),T.add(A)}),100)}function x(){T.remove(A),H&&(clearTimeout(q),q=setTimeout(C,300))}function k(t,e){"function"==typeof e&&"string"==typeof t&&m(t,e)}m(".".concat(_),(function(t){t.stopImmediatePropagation()})),m(".".concat(E),x),m(".".concat(w),x),b.addEventListener("keyup",(function(t){27==t.keyCode&&T.contains(A)&&x()}));var D,I="jonnitto-prettyembed";k(".".concat(I,"--video.").concat(I,"--lightbox video"),(function(t){var e=this;t.preventDefault(),clearTimeout(D),l();var n=M("video",!1).appendChild(this.cloneNode(!0));null==this.dataset.controls&&Array.from(this.parentNode.children).forEach((function(t){t==e||t.classList.contains("".concat(I,"__preview"))||n.parentNode.appendChild(t.cloneNode(!0))})),N((function(){var t;r(n),e.dataset.init||(e.dataset.init=!0,s({type:"video",style:"lightbox",title:v(e),src:(t=e.querySelector("source"),t?t.src:null)}))})),D=setTimeout((function(){n.play()}),500)}));var P,R=(P=document.currentScript.dataset.openexternal)?P.split(","):[],W="jonnitto-prettyembed";function z(t){var e=t.dataset,n=null!=e.fs;return!!e.embed&&'<iframe src="'.concat(e.embed,'" ').concat(n?"allowfullscreen ":"",'frameborder="0" allow="').concat(n?"fullscreen; ":"",'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>')}function B(t){var e=t.querySelector("img");return{node:e||null,src:e?e.getAttribute("src"):null}}function J(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"56.25%";if(t.dataset.ratio)return t.dataset.ratio;var n=B(t);if(!n.node)return e;var o=parseInt(n.node.naturalHeight)/parseInt(n.node.naturalWidth)*100;return"number"!=typeof o?e:o+"%"}function O(t,e,n){if($(t,n)){var o=z(t),a=B(t);if(!o)return;var c=function(t,e){if("object"===y(t)&&"string"==typeof e){var n=t,o=n.tagName,a=new RegExp("^<"+o,"i"),c=new RegExp(o+">$","i"),i="<"+e,r=e+">",u=document.createElement("div");u.innerHTML=n.outerHTML.replace(a,i).replace(c,r);var l=u.firstChild;return t.parentNode.replaceChild(l,t),l}}(t,"div");c.classList.add(e),c.style.paddingTop=J(t),c.innerHTML=o,a.src&&c.setAttribute("data-img",a.src),s({type:n,style:"inline",title:v(t),src:t.dataset.embed})}}function $(t,e){var n=t.dataset.gdpr;if(!n)return!0;var o=window.localStorage,a="jonnittoprettyembed_gdpr_".concat(e);return!("true"!==o[a]&&!confirm(n))&&(t.removeAttribute("data-gdpr"),o[a]="true",!0)}function F(t){R.includes(t)||k("a.".concat(W,"--").concat(t,".").concat(W,"--lightbox"),(function(e){var n=this,o=z(this);if(o&&(e.preventDefault(),$(this,t))){var a=J(this);M([t,"iframe"],a).innerHTML=o,N((function(){n.dataset.init||(n.dataset.init=!0,s({type:t,style:"lightbox",title:v(n),src:n.dataset.embed}))}))}}))}function G(t){if(!R.includes(t)){var e="a.".concat(W,"--").concat(t,".").concat(W,"--inline"),n="".concat(W,"--play");m(e,(function(e){e.preventDefault(),O(this,n,t)}))}}function K(t){var e=t.getAttribute("src");t.naturalHeight<=90&&t.naturalWidth<=120&&-1==e.indexOf("/default.jpg")&&(e=e.replace("mqdefault","default").replace("hqdefault","mqdefault").replace("sddefault","hqdefault").replace("maxresdefault","sddefault"),t.setAttribute("src",e),setTimeout((function(){t.onload=function(){K(t)}}),10),setTimeout((function(){K(t)}),5e3))}G("vimeo"),F("vimeo"),G("youtube"),F("youtube"),window.addEventListener("load",(function(){!function(t){void 0===t&&(t=document.querySelectorAll("img.jonnitto-prettyembed__youtube-preview"));for(var e=t.length-1;e>=0;e--)K(t[e])}()}))}();
//# sourceMappingURL=Main.js.map
