(()=>{"use strict";var e,t,r,o,n,a={},i={};function f(e){var t=i[e];if(void 0!==t)return t.exports;var r=i[e]={exports:{}};return a[e].call(r.exports,r,r.exports,f),r.exports}f.m=a,e=[],f.O=(t,r,o,n)=>{if(!r){var a=1/0;for(u=0;u<e.length;u++){r=e[u][0],o=e[u][1],n=e[u][2];for(var i=!0,l=0;l<r.length;l++)(!1&n||a>=n)&&Object.keys(f.O).every((e=>f.O[e](r[l])))?r.splice(l--,1):(i=!1,n<a&&(a=n));if(i){e.splice(u--,1);var d=o();void 0!==d&&(t=d)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[r,o,n]},f.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return f.d(t,{a:t}),t},r=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,f.t=function(e,o){if(1&o&&(e=this(e)),8&o)return e;if("object"==typeof e&&e){if(4&o&&e.__esModule)return e;if(16&o&&"function"==typeof e.then)return e}var n=Object.create(null);f.r(n);var a={};t=t||[null,r({}),r([]),r(r)];for(var i=2&o&&e;"object"==typeof i&&!~t.indexOf(i);i=r(i))Object.getOwnPropertyNames(i).forEach((t=>a[t]=()=>e[t]));return a.default=()=>e,f.d(n,a),n},f.d=(e,t)=>{for(var r in t)f.o(t,r)&&!f.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},f.f={},f.e=e=>Promise.all(Object.keys(f.f).reduce(((t,r)=>(f.f[r](e,t),t)),[])),f.u=e=>e+"."+{9:"d9a11b71491e",66:"ee13cf4070e5",70:"a8b37f34cee1",130:"3989148c78f8",148:"66a485a7c2b3",155:"68e27dabdc14",172:"1f8c4e698593",264:"90481a0ec7a6",314:"65c2a004ed16",434:"cdcf2da6ebed",536:"76f57cf18e8c",561:"151723c9c8de",581:"9bd2b26712f2",649:"bf0b165587f0",653:"6b112f9a56fe",665:"04cb8a9ffbc4",710:"4f74e9e067d3",750:"50b55d637a5d",765:"67648c52583d",816:"f856903a2f53",842:"e67c3271a923",860:"0364c2bf010d",872:"5eaa9b659180",925:"ae1c4601d941",991:"cd752e1fbd95"}[e]+".js",f.miniCssF=e=>e+".2dc2e1f332e2.css",f.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),f.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o={},n="twitter-clone:",f.l=(e,t,r,a)=>{if(o[e])o[e].push(t);else{var i,l;if(void 0!==r)for(var d=document.getElementsByTagName("script"),u=0;u<d.length;u++){var c=d[u];if(c.getAttribute("src")==e||c.getAttribute("data-webpack")==n+r){i=c;break}}i||(l=!0,(i=document.createElement("script")).charset="utf-8",i.timeout=120,f.nc&&i.setAttribute("nonce",f.nc),i.setAttribute("data-webpack",n+r),i.src=e),o[e]=[t];var s=(t,r)=>{i.onerror=i.onload=null,clearTimeout(b);var n=o[e];if(delete o[e],i.parentNode&&i.parentNode.removeChild(i),n&&n.forEach((e=>e(r))),t)return t(r)},b=setTimeout(s.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=s.bind(null,i.onerror),i.onload=s.bind(null,i.onload),l&&document.head.appendChild(i)}},f.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},f.p="/",(()=>{if("undefined"!=typeof document){var e={666:0};f.f.miniCss=(t,r)=>{e[t]?r.push(e[t]):0!==e[t]&&{581:1}[t]&&r.push(e[t]=(e=>new Promise(((t,r)=>{var o=f.miniCssF(e),n=f.p+o;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),o=0;o<r.length;o++){var n=(i=r[o]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(n===e||n===t))return i}var a=document.getElementsByTagName("style");for(o=0;o<a.length;o++){var i;if((n=(i=a[o]).getAttribute("data-href"))===e||n===t)return i}})(o,n))return t();((e,t,r,o,n)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.onerror=a.onload=r=>{if(a.onerror=a.onload=null,"load"===r.type)o();else{var i=r&&("load"===r.type?"missing":r.type),f=r&&r.target&&r.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+f+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=f,a.parentNode&&a.parentNode.removeChild(a),n(l)}},a.href=t,document.head.appendChild(a)})(e,n,0,t,r)})))(t).then((()=>{e[t]=0}),(r=>{throw delete e[t],r})))}}})(),(()=>{var e={666:0};f.f.j=(t,r)=>{var o=f.o(e,t)?e[t]:void 0;if(0!==o)if(o)r.push(o[2]);else if(666!=t){var n=new Promise(((r,n)=>o=e[t]=[r,n]));r.push(o[2]=n);var a=f.p+f.u(t),i=new Error;f.l(a,(r=>{if(f.o(e,t)&&(0!==(o=e[t])&&(e[t]=void 0),o)){var n=r&&("load"===r.type?"missing":r.type),a=r&&r.target&&r.target.src;i.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",i.name="ChunkLoadError",i.type=n,i.request=a,o[1](i)}}),"chunk-"+t,t)}else e[t]=0},f.O.j=t=>0===e[t];var t=(t,r)=>{var o,n,a=r[0],i=r[1],l=r[2],d=0;if(a.some((t=>0!==e[t]))){for(o in i)f.o(i,o)&&(f.m[o]=i[o]);if(l)var u=l(f)}for(t&&t(r);d<a.length;d++)n=a[d],f.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return f.O(u)},r=self.webpackChunktwitter_clone=self.webpackChunktwitter_clone||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})()})();