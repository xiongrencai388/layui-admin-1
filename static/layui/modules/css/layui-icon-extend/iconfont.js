(function(window){var svgSprite='<svg><symbol id="layui-extend-admins" viewBox="0 0 1024 1024"><path d="M512 568.888889c-159.288889 0-284.444444-125.155556-284.444444-284.444445s125.155556-284.444444 284.444444-284.444444 284.444444 125.155556 284.444444 284.444444-125.155556 284.444444-284.444444 284.444445z m0-56.888889c125.155556 0 227.555556-102.4 227.555556-227.555556s-102.4-227.555556-227.555556-227.555555-227.555556 102.4-227.555556 227.555555 102.4 227.555556 227.555556 227.555556zM824.888889 1024c-79.644444 0-142.222222-62.577778-142.222222-142.222222s62.577778-142.222222 142.222222-142.222222 142.222222 62.577778 142.222222 142.222222-62.577778 142.222222-142.222222 142.222222z m0-56.888889c45.511111 0 85.333333-39.822222 85.333333-85.333333s-39.822222-85.333333-85.333333-85.333334-85.333333 39.822222-85.333333 85.333334 39.822222 85.333333 85.333333 85.333333z" fill="#333333" ></path><path d="M796.444444 455.111111h56.888889v284.444445h-56.888889zM853.333333 455.111111h113.777778v56.888889h-113.777778zM853.333333 568.888889h113.777778v56.888889h-113.777778z" fill="#333333" ></path><path d="M512 512l-51.2 62.577778C261.688889 597.333333 113.777778 762.311111 113.777778 967.111111H56.888889v-56.888889h5.688889c28.444444-221.866667 216.177778-398.222222 449.422222-398.222222z m0 0l-51.2 62.577778C261.688889 597.333333 113.777778 762.311111 113.777778 967.111111H56.888889v-56.888889h5.688889c28.444444-221.866667 216.177778-398.222222 449.422222-398.222222z" fill="#333333" ></path></symbol></svg>';var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)