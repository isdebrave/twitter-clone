"use strict";(self.webpackChunktwitter_clone=self.webpackChunktwitter_clone||[]).push([[314],{4405:(t,e,r)=>{r.d(e,{w_:()=>c});var a=r(7294),o={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},i=a.createContext&&a.createContext(o),s=function(){return s=Object.assign||function(t){for(var e,r=1,a=arguments.length;r<a;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},s.apply(this,arguments)},n=function(t,e){var r={};for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&e.indexOf(a)<0&&(r[a]=t[a]);if(null!=t&&"function"==typeof Object.getOwnPropertySymbols){var o=0;for(a=Object.getOwnPropertySymbols(t);o<a.length;o++)e.indexOf(a[o])<0&&Object.prototype.propertyIsEnumerable.call(t,a[o])&&(r[a[o]]=t[a[o]])}return r};function l(t){return t&&t.map((function(t,e){return a.createElement(t.tag,s({key:e},t.attr),l(t.child))}))}function c(t){return function(e){return a.createElement(d,s({attr:s({},t.attr)},e),l(t.child))}}function d(t){var e=function(e){var r,o=t.attr,i=t.size,l=t.title,c=n(t,["attr","size","title"]),d=i||e.size||"1em";return e.className&&(r=e.className),t.className&&(r=(r?r+" ":"")+t.className),a.createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},e.attr,o,c,{className:r,style:s(s({color:t.color||e.color},e.style),t.style),height:d,width:d,xmlns:"http://www.w3.org/2000/svg"}),l&&a.createElement("title",null,l),t.children)};return void 0!==i?a.createElement(i.Consumer,null,(function(t){return e(t)})):e(o)}},582:(t,e,r)=>{r.d(e,{x7:()=>et,ZP:()=>rt,Am:()=>A});var a=r(7294);let o={data:""},i=t=>"object"==typeof window?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||o,s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(t,e)=>{let r="",a="",o="";for(let i in t){let s=t[i];"@"==i[0]?"i"==i[1]?r=i+" "+s+";":a+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":e)+"}":"object"==typeof s?a+=c(s,e?e.replace(/([^,])+/g,(t=>i.replace(/(^:.*)|([^,])+/g,(e=>/&/.test(e)?e.replace(/&/g,t):t?t+" "+e:e)))):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=c.p?c.p(i,s):i+":"+s+";")}return r+(e&&o?e+"{"+o+"}":o)+a},d={},p=t=>{if("object"==typeof t){let e="";for(let r in t)e+=r+p(t[r]);return e}return t},u=(t,e,r,a,o)=>{let i=p(t),u=d[i]||(d[i]=(t=>{let e=0,r=11;for(;e<t.length;)r=101*r+t.charCodeAt(e++)>>>0;return"go"+r})(i));if(!d[u]){let e=i!==t?t:(t=>{let e,r,a=[{}];for(;e=s.exec(t.replace(n,""));)e[4]?a.shift():e[3]?(r=e[3].replace(l," ").trim(),a.unshift(a[0][r]=a[0][r]||{})):a[0][e[1]]=e[2].replace(l," ").trim();return a[0]})(t);d[u]=c(o?{["@keyframes "+u]:e}:e,r?"":"."+u)}let m=r&&d.g?d.g:null;return r&&(d.g=d[u]),((t,e,r,a)=>{a?e.data=e.data.replace(a,t):-1===e.data.indexOf(t)&&(e.data=r?t+e.data:e.data+t)})(d[u],e,a,m),u},m=(t,e,r)=>t.reduce(((t,a,o)=>{let i=e[o];if(i&&i.call){let t=i(r),e=t&&t.props&&t.props.className||/^go/.test(t)&&t;i=e?"."+e:t&&"object"==typeof t?t.props?"":c(t,""):!1===t?"":t}return t+a+(null==i?"":i)}),"");function f(t){let e=this||{},r=t.call?t(e.p):t;return u(r.unshift?r.raw?m(r,[].slice.call(arguments,1),e.p):r.reduce(((t,r)=>Object.assign(t,r&&r.call?r(e.p):r)),{}):r,i(e.target),e.g,e.o,e.k)}f.bind({g:1});let y,g,h,b=f.bind({k:1});function v(t,e){let r=this||{};return function(){let a=arguments;function o(i,s){let n=Object.assign({},i),l=n.className||o.className;r.p=Object.assign({theme:g&&g()},n),r.o=/ *go\d+/.test(l),n.className=f.apply(r,a)+(l?" "+l:""),e&&(n.ref=s);let c=t;return t[0]&&(c=n.as||t,delete n.as),h&&c[0]&&h(n),y(c,n)}return e?e(o):o}}var x=(t,e)=>(t=>"function"==typeof t)(t)?t(e):t,w=(()=>{let t=0;return()=>(++t).toString()})(),E=(()=>{let t;return()=>{if(void 0===t&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),O=new Map,k=t=>{if(O.has(t))return;let e=setTimeout((()=>{O.delete(t),N({type:4,toastId:t})}),1e3);O.set(t,e)},$=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,20)};case 1:return e.toast.id&&(t=>{let e=O.get(t);e&&clearTimeout(e)})(e.toast.id),{...t,toasts:t.toasts.map((t=>t.id===e.toast.id?{...t,...e.toast}:t))};case 2:let{toast:r}=e;return t.toasts.find((t=>t.id===r.id))?$(t,{type:1,toast:r}):$(t,{type:0,toast:r});case 3:let{toastId:a}=e;return a?k(a):t.toasts.forEach((t=>{k(t.id)})),{...t,toasts:t.toasts.map((t=>t.id===a||void 0===a?{...t,visible:!1}:t))};case 4:return void 0===e.toastId?{...t,toasts:[]}:{...t,toasts:t.toasts.filter((t=>t.id!==e.toastId))};case 5:return{...t,pausedAt:e.time};case 6:let o=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map((t=>({...t,pauseDuration:t.pauseDuration+o})))}}},j=[],C={toasts:[],pausedAt:void 0},N=t=>{C=$(C,t),j.forEach((t=>{t(C)}))},z={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},P=t=>(e,r)=>{let a=((t,e="blank",r)=>({createdAt:Date.now(),visible:!0,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...r,id:(null==r?void 0:r.id)||w()}))(e,t,r);return N({type:2,toast:a}),a.id},A=(t,e)=>P("blank")(t,e);A.error=P("error"),A.success=P("success"),A.loading=P("loading"),A.custom=P("custom"),A.dismiss=t=>{N({type:3,toastId:t})},A.remove=t=>N({type:4,toastId:t}),A.promise=(t,e,r)=>{let a=A.loading(e.loading,{...r,...null==r?void 0:r.loading});return t.then((t=>(A.success(x(e.success,t),{id:a,...r,...null==r?void 0:r.success}),t))).catch((t=>{A.error(x(e.error,t),{id:a,...r,...null==r?void 0:r.error})})),t};var D=(t,e)=>{N({type:1,toast:{id:t,height:e}})},I=()=>{N({type:5,time:Date.now()})},M=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,S=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,T=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,_=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${M} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${S} 0.15s ease-out forwards;
    animation-delay: 150ms;
    position: absolute;
    border-radius: 3px;
    opacity: 0;
    background: ${t=>t.secondary||"#fff"};
    bottom: 9px;
    left: 4px;
    height: 2px;
    width: 12px;
  }

  &:before {
    animation: ${T} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,F=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,H=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${F} 1s linear infinite;
`,L=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,U=b`
0% {
	height: 0;
	width: 0;
	opacity: 0;
}
40% {
  height: 0;
	width: 6px;
	opacity: 1;
}
100% {
  opacity: 1;
  height: 10px;
}`,Z=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${L} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${U} 0.2s ease-out forwards;
    opacity: 0;
    animation-delay: 200ms;
    position: absolute;
    border-right: 2px solid;
    border-bottom: 2px solid;
    border-color: ${t=>t.secondary||"#fff"};
    bottom: 6px;
    left: 6px;
    height: 10px;
    width: 6px;
  }
`,q=v("div")`
  position: absolute;
`,B=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,R=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,W=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${R} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,Y=({toast:t})=>{let{icon:e,type:r,iconTheme:o}=t;return void 0!==e?"string"==typeof e?a.createElement(W,null,e):e:"blank"===r?null:a.createElement(B,null,a.createElement(H,{...o}),"loading"!==r&&a.createElement(q,null,"error"===r?a.createElement(_,{...o}):a.createElement(Z,{...o})))},G=t=>`\n0% {transform: translate3d(0,${-200*t}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,J=t=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*t}%,-1px) scale(.6); opacity:0;}\n`,K=v("div")`
  display: flex;
  align-items: center;
  background: #fff;
  color: #363636;
  line-height: 1.3;
  will-change: transform;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  max-width: 350px;
  pointer-events: auto;
  padding: 8px 10px;
  border-radius: 8px;
`,Q=v("div")`
  display: flex;
  justify-content: center;
  margin: 4px 10px;
  color: inherit;
  flex: 1 1 auto;
  white-space: pre-line;
`,V=a.memo((({toast:t,position:e,style:r,children:o})=>{let i=t.height?((t,e)=>{let r=t.includes("top")?1:-1,[a,o]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[G(r),J(r)];return{animation:e?`${b(a)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||e||"top-center",t.visible):{opacity:0},s=a.createElement(Y,{toast:t}),n=a.createElement(Q,{...t.ariaProps},x(t.message,t));return a.createElement(K,{className:t.className,style:{...i,...r,...t.style}},"function"==typeof o?o({icon:s,message:n}):a.createElement(a.Fragment,null,s,n))}));!function(t,e,r,a){c.p=void 0,y=t,g=void 0,h=void 0}(a.createElement);var X=({id:t,className:e,style:r,onHeightUpdate:o,children:i})=>{let s=a.useCallback((e=>{if(e){let r=()=>{let r=e.getBoundingClientRect().height;o(t,r)};r(),new MutationObserver(r).observe(e,{subtree:!0,childList:!0,characterData:!0})}}),[t,o]);return a.createElement("div",{ref:s,className:e,style:r},i)},tt=f`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,et=({reverseOrder:t,position:e="top-center",toastOptions:r,gutter:o,children:i,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:c}=(t=>{let{toasts:e,pausedAt:r}=((t={})=>{let[e,r]=(0,a.useState)(C);(0,a.useEffect)((()=>(j.push(r),()=>{let t=j.indexOf(r);t>-1&&j.splice(t,1)})),[e]);let o=e.toasts.map((e=>{var r,a;return{...t,...t[e.type],...e,duration:e.duration||(null==(r=t[e.type])?void 0:r.duration)||(null==t?void 0:t.duration)||z[e.type],style:{...t.style,...null==(a=t[e.type])?void 0:a.style,...e.style}}}));return{...e,toasts:o}})(t);(0,a.useEffect)((()=>{if(r)return;let t=Date.now(),a=e.map((e=>{if(e.duration===1/0)return;let r=(e.duration||0)+e.pauseDuration-(t-e.createdAt);if(!(r<0))return setTimeout((()=>A.dismiss(e.id)),r);e.visible&&A.dismiss(e.id)}));return()=>{a.forEach((t=>t&&clearTimeout(t)))}}),[e,r]);let o=(0,a.useCallback)((()=>{r&&N({type:6,time:Date.now()})}),[r]),i=(0,a.useCallback)(((t,r)=>{let{reverseOrder:a=!1,gutter:o=8,defaultPosition:i}=r||{},s=e.filter((e=>(e.position||i)===(t.position||i)&&e.height)),n=s.findIndex((e=>e.id===t.id)),l=s.filter(((t,e)=>e<n&&t.visible)).length;return s.filter((t=>t.visible)).slice(...a?[l+1]:[0,l]).reduce(((t,e)=>t+(e.height||0)+o),0)}),[e]);return{toasts:e,handlers:{updateHeight:D,startPause:I,endPause:o,calculateOffset:i}}})(r);return a.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map((r=>{let s=r.position||e,n=((t,e)=>{let r=t.includes("top"),a=r?{top:0}:{bottom:0},o=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(r?1:-1)}px)`,...a,...o}})(s,c.calculateOffset(r,{reverseOrder:t,gutter:o,defaultPosition:e}));return a.createElement(X,{id:r.id,key:r.id,onHeightUpdate:c.updateHeight,className:r.visible?tt:"",style:n},"custom"===r.type?x(r.message,r):i?i(r):a.createElement(V,{toast:r,position:s}))})))},rt=A}}]);