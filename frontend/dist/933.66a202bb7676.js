"use strict";(self.webpackChunktwitter_clone=self.webpackChunktwitter_clone||[]).push([[933],{6653:(t,e,a)=>{a.d(e,{G9c:()=>i,Noz:()=>n,a4h:()=>l,iB:()=>s,r$n:()=>o});var r=a(4405);function o(t){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12 1c3.681 0 7 2.565 7 6v4.539c0 .642.189 1.269.545 1.803l2.2 3.298A1.517 1.517 0 0 1 20.482 19H15.5a3.5 3.5 0 1 1-7 0H3.519a1.518 1.518 0 0 1-1.265-2.359l2.2-3.299A3.25 3.25 0 0 0 5 11.539V7c0-3.435 3.318-6 7-6ZM6.5 7v4.539a4.75 4.75 0 0 1-.797 2.635l-2.2 3.298-.003.01.001.007.004.006.006.004.007.001h16.964l.007-.001.006-.004.004-.006.001-.006a.017.017 0 0 0-.003-.01l-2.199-3.299a4.753 4.753 0 0 1-.798-2.635V7c0-2.364-2.383-4.5-5.5-4.5S6.5 4.636 6.5 7ZM14 19h-4a2 2 0 1 0 4 0Z"}}]})(t)}function i(t){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M6 8a6 6 0 1 1 12 0v2.917c0 .703.228 1.387.65 1.95L20.7 15.6a1.5 1.5 0 0 1-1.2 2.4h-15a1.5 1.5 0 0 1-1.2-2.4l2.05-2.733a3.25 3.25 0 0 0 .65-1.95Zm6 13.5A3.502 3.502 0 0 1 8.645 19h6.71A3.502 3.502 0 0 1 12 21.5Z"}}]})(t)}function s(t){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z"}}]})(t)}function n(t){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12.97 2.59a1.5 1.5 0 0 0-1.94 0l-7.5 6.363A1.5 1.5 0 0 0 3 10.097V19.5A1.5 1.5 0 0 0 4.5 21h4.75a.75.75 0 0 0 .75-.75V14h4v6.25c0 .414.336.75.75.75h4.75a1.5 1.5 0 0 0 1.5-1.5v-9.403a1.5 1.5 0 0 0-.53-1.144l-7.5-6.363Z"}}]})(t)}function l(t){return(0,r.w_)({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M10.25 2a8.25 8.25 0 0 1 6.34 13.53l5.69 5.69a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-5.69-5.69A8.25 8.25 0 1 1 10.25 2ZM3.5 10.25a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0Z"}}]})(t)}},582:(t,e,a)=>{a.d(e,{x7:()=>et,ZP:()=>at,Am:()=>Z});var r=a(7294);let o={data:""},i=t=>"object"==typeof window?((t?t.querySelector("#_goober"):window._goober)||Object.assign((t||document.head).appendChild(document.createElement("style")),{innerHTML:" ",id:"_goober"})).firstChild:t||o,s=/(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,n=/\/\*[^]*?\*\/|  +/g,l=/\n+/g,c=(t,e)=>{let a="",r="",o="";for(let i in t){let s=t[i];"@"==i[0]?"i"==i[1]?a=i+" "+s+";":r+="f"==i[1]?c(s,i):i+"{"+c(s,"k"==i[1]?"":e)+"}":"object"==typeof s?r+=c(s,e?e.replace(/([^,])+/g,(t=>i.replace(/(^:.*)|([^,])+/g,(e=>/&/.test(e)?e.replace(/&/g,t):t?t+" "+e:e)))):i):null!=s&&(i=/^--/.test(i)?i:i.replace(/[A-Z]/g,"-$&").toLowerCase(),o+=c.p?c.p(i,s):i+":"+s+";")}return a+(e&&o?e+"{"+o+"}":o)+r},d={},p=t=>{if("object"==typeof t){let e="";for(let a in t)e+=a+p(t[a]);return e}return t},u=(t,e,a,r,o)=>{let i=p(t),u=d[i]||(d[i]=(t=>{let e=0,a=11;for(;e<t.length;)a=101*a+t.charCodeAt(e++)>>>0;return"go"+a})(i));if(!d[u]){let e=i!==t?t:(t=>{let e,a,r=[{}];for(;e=s.exec(t.replace(n,""));)e[4]?r.shift():e[3]?(a=e[3].replace(l," ").trim(),r.unshift(r[0][a]=r[0][a]||{})):r[0][e[1]]=e[2].replace(l," ").trim();return r[0]})(t);d[u]=c(o?{["@keyframes "+u]:e}:e,a?"":"."+u)}let f=a&&d.g?d.g:null;return a&&(d.g=d[u]),((t,e,a,r)=>{r?e.data=e.data.replace(r,t):-1===e.data.indexOf(t)&&(e.data=a?t+e.data:e.data+t)})(d[u],e,r,f),u},f=(t,e,a)=>t.reduce(((t,r,o)=>{let i=e[o];if(i&&i.call){let t=i(a),e=t&&t.props&&t.props.className||/^go/.test(t)&&t;i=e?"."+e:t&&"object"==typeof t?t.props?"":c(t,""):!1===t?"":t}return t+r+(null==i?"":i)}),"");function m(t){let e=this||{},a=t.call?t(e.p):t;return u(a.unshift?a.raw?f(a,[].slice.call(arguments,1),e.p):a.reduce(((t,a)=>Object.assign(t,a&&a.call?a(e.p):a)),{}):a,i(e.target),e.g,e.o,e.k)}m.bind({g:1});let h,g,y,b=m.bind({k:1});function v(t,e){let a=this||{};return function(){let r=arguments;function o(i,s){let n=Object.assign({},i),l=n.className||o.className;a.p=Object.assign({theme:g&&g()},n),a.o=/ *go\d+/.test(l),n.className=m.apply(a,r)+(l?" "+l:""),e&&(n.ref=s);let c=t;return t[0]&&(c=n.as||t,delete n.as),y&&c[0]&&y(n),h(c,n)}return e?e(o):o}}var x=(t,e)=>(t=>"function"==typeof t)(t)?t(e):t,w=(()=>{let t=0;return()=>(++t).toString()})(),E=(()=>{let t;return()=>{if(void 0===t&&typeof window<"u"){let e=matchMedia("(prefers-reduced-motion: reduce)");t=!e||e.matches}return t}})(),k=new Map,$=t=>{if(k.has(t))return;let e=setTimeout((()=>{k.delete(t),O({type:4,toastId:t})}),1e3);k.set(t,e)},A=(t,e)=>{switch(e.type){case 0:return{...t,toasts:[e.toast,...t.toasts].slice(0,20)};case 1:return e.toast.id&&(t=>{let e=k.get(t);e&&clearTimeout(e)})(e.toast.id),{...t,toasts:t.toasts.map((t=>t.id===e.toast.id?{...t,...e.toast}:t))};case 2:let{toast:a}=e;return t.toasts.find((t=>t.id===a.id))?A(t,{type:1,toast:a}):A(t,{type:0,toast:a});case 3:let{toastId:r}=e;return r?$(r):t.toasts.forEach((t=>{$(t.id)})),{...t,toasts:t.toasts.map((t=>t.id===r||void 0===r?{...t,visible:!1}:t))};case 4:return void 0===e.toastId?{...t,toasts:[]}:{...t,toasts:t.toasts.filter((t=>t.id!==e.toastId))};case 5:return{...t,pausedAt:e.time};case 6:let o=e.time-(t.pausedAt||0);return{...t,pausedAt:void 0,toasts:t.toasts.map((t=>({...t,pauseDuration:t.pauseDuration+o})))}}},M=[],C={toasts:[],pausedAt:void 0},O=t=>{C=A(C,t),M.forEach((t=>{t(C)}))},j={blank:4e3,error:4e3,success:2e3,loading:1/0,custom:4e3},N=t=>(e,a)=>{let r=((t,e="blank",a)=>({createdAt:Date.now(),visible:!0,type:e,ariaProps:{role:"status","aria-live":"polite"},message:t,pauseDuration:0,...a,id:(null==a?void 0:a.id)||w()}))(e,t,a);return O({type:2,toast:r}),r.id},Z=(t,e)=>N("blank")(t,e);Z.error=N("error"),Z.success=N("success"),Z.loading=N("loading"),Z.custom=N("custom"),Z.dismiss=t=>{O({type:3,toastId:t})},Z.remove=t=>O({type:4,toastId:t}),Z.promise=(t,e,a)=>{let r=Z.loading(e.loading,{...a,...null==a?void 0:a.loading});return t.then((t=>(Z.success(x(e.success,t),{id:r,...a,...null==a?void 0:a.success}),t))).catch((t=>{Z.error(x(e.error,t),{id:r,...a,...null==a?void 0:a.error})})),t};var z=(t,e)=>{O({type:1,toast:{id:t,height:e}})},_=()=>{O({type:5,time:Date.now()})},D=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
 transform: scale(1) rotate(45deg);
  opacity: 1;
}`,P=b`
from {
  transform: scale(0);
  opacity: 0;
}
to {
  transform: scale(1);
  opacity: 1;
}`,H=b`
from {
  transform: scale(0) rotate(90deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(90deg);
	opacity: 1;
}`,I=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#ff4b4b"};
  position: relative;
  transform: rotate(45deg);

  animation: ${D} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;

  &:after,
  &:before {
    content: '';
    animation: ${P} 0.15s ease-out forwards;
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
    animation: ${H} 0.15s ease-out forwards;
    animation-delay: 180ms;
    transform: rotate(90deg);
  }
`,B=b`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`,V=v("div")`
  width: 12px;
  height: 12px;
  box-sizing: border-box;
  border: 2px solid;
  border-radius: 100%;
  border-color: ${t=>t.secondary||"#e0e0e0"};
  border-right-color: ${t=>t.primary||"#616161"};
  animation: ${B} 1s linear infinite;
`,T=b`
from {
  transform: scale(0) rotate(45deg);
	opacity: 0;
}
to {
  transform: scale(1) rotate(45deg);
	opacity: 1;
}`,F=b`
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
}`,L=v("div")`
  width: 20px;
  opacity: 0;
  height: 20px;
  border-radius: 10px;
  background: ${t=>t.primary||"#61d345"};
  position: relative;
  transform: rotate(45deg);

  animation: ${T} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 100ms;
  &:after {
    content: '';
    box-sizing: border-box;
    animation: ${F} 0.2s ease-out forwards;
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
`,S=v("div")`
  position: absolute;
`,U=v("div")`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  min-height: 20px;
`,q=b`
from {
  transform: scale(0.6);
  opacity: 0.4;
}
to {
  transform: scale(1);
  opacity: 1;
}`,G=v("div")`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  min-width: 20px;
  animation: ${q} 0.3s 0.12s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
`,R=({toast:t})=>{let{icon:e,type:a,iconTheme:o}=t;return void 0!==e?"string"==typeof e?r.createElement(G,null,e):e:"blank"===a?null:r.createElement(U,null,r.createElement(V,{...o}),"loading"!==a&&r.createElement(S,null,"error"===a?r.createElement(I,{...o}):r.createElement(L,{...o})))},Y=t=>`\n0% {transform: translate3d(0,${-200*t}%,0) scale(.6); opacity:.5;}\n100% {transform: translate3d(0,0,0) scale(1); opacity:1;}\n`,J=t=>`\n0% {transform: translate3d(0,0,-1px) scale(1); opacity:1;}\n100% {transform: translate3d(0,${-150*t}%,-1px) scale(.6); opacity:0;}\n`,K=v("div")`
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
`,W=r.memo((({toast:t,position:e,style:a,children:o})=>{let i=t.height?((t,e)=>{let a=t.includes("top")?1:-1,[r,o]=E()?["0%{opacity:0;} 100%{opacity:1;}","0%{opacity:1;} 100%{opacity:0;}"]:[Y(a),J(a)];return{animation:e?`${b(r)} 0.35s cubic-bezier(.21,1.02,.73,1) forwards`:`${b(o)} 0.4s forwards cubic-bezier(.06,.71,.55,1)`}})(t.position||e||"top-center",t.visible):{opacity:0},s=r.createElement(R,{toast:t}),n=r.createElement(Q,{...t.ariaProps},x(t.message,t));return r.createElement(K,{className:t.className,style:{...i,...a,...t.style}},"function"==typeof o?o({icon:s,message:n}):r.createElement(r.Fragment,null,s,n))}));!function(t,e,a,r){c.p=void 0,h=t,g=void 0,y=void 0}(r.createElement);var X=({id:t,className:e,style:a,onHeightUpdate:o,children:i})=>{let s=r.useCallback((e=>{if(e){let a=()=>{let a=e.getBoundingClientRect().height;o(t,a)};a(),new MutationObserver(a).observe(e,{subtree:!0,childList:!0,characterData:!0})}}),[t,o]);return r.createElement("div",{ref:s,className:e,style:a},i)},tt=m`
  z-index: 9999;
  > * {
    pointer-events: auto;
  }
`,et=({reverseOrder:t,position:e="top-center",toastOptions:a,gutter:o,children:i,containerStyle:s,containerClassName:n})=>{let{toasts:l,handlers:c}=(t=>{let{toasts:e,pausedAt:a}=((t={})=>{let[e,a]=(0,r.useState)(C);(0,r.useEffect)((()=>(M.push(a),()=>{let t=M.indexOf(a);t>-1&&M.splice(t,1)})),[e]);let o=e.toasts.map((e=>{var a,r;return{...t,...t[e.type],...e,duration:e.duration||(null==(a=t[e.type])?void 0:a.duration)||(null==t?void 0:t.duration)||j[e.type],style:{...t.style,...null==(r=t[e.type])?void 0:r.style,...e.style}}}));return{...e,toasts:o}})(t);(0,r.useEffect)((()=>{if(a)return;let t=Date.now(),r=e.map((e=>{if(e.duration===1/0)return;let a=(e.duration||0)+e.pauseDuration-(t-e.createdAt);if(!(a<0))return setTimeout((()=>Z.dismiss(e.id)),a);e.visible&&Z.dismiss(e.id)}));return()=>{r.forEach((t=>t&&clearTimeout(t)))}}),[e,a]);let o=(0,r.useCallback)((()=>{a&&O({type:6,time:Date.now()})}),[a]),i=(0,r.useCallback)(((t,a)=>{let{reverseOrder:r=!1,gutter:o=8,defaultPosition:i}=a||{},s=e.filter((e=>(e.position||i)===(t.position||i)&&e.height)),n=s.findIndex((e=>e.id===t.id)),l=s.filter(((t,e)=>e<n&&t.visible)).length;return s.filter((t=>t.visible)).slice(...r?[l+1]:[0,l]).reduce(((t,e)=>t+(e.height||0)+o),0)}),[e]);return{toasts:e,handlers:{updateHeight:z,startPause:_,endPause:o,calculateOffset:i}}})(a);return r.createElement("div",{style:{position:"fixed",zIndex:9999,top:16,left:16,right:16,bottom:16,pointerEvents:"none",...s},className:n,onMouseEnter:c.startPause,onMouseLeave:c.endPause},l.map((a=>{let s=a.position||e,n=((t,e)=>{let a=t.includes("top"),r=a?{top:0}:{bottom:0},o=t.includes("center")?{justifyContent:"center"}:t.includes("right")?{justifyContent:"flex-end"}:{};return{left:0,right:0,display:"flex",position:"absolute",transition:E()?void 0:"all 230ms cubic-bezier(.21,1.02,.73,1)",transform:`translateY(${e*(a?1:-1)}px)`,...r,...o}})(s,c.calculateOffset(a,{reverseOrder:t,gutter:o,defaultPosition:e}));return r.createElement(X,{id:a.id,key:a.id,onHeightUpdate:c.updateHeight,className:a.visible?tt:"",style:n},"custom"===a.type?x(a.message,a):i?i(a):r.createElement(W,{toast:a,position:s}))})))},at=Z}}]);