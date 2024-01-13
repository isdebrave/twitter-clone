"use strict";(self.webpackChunktwitter_clone=self.webpackChunktwitter_clone||[]).push([[872],{8035:(e,t,r)=>{r.d(t,{Z:()=>o});var n=r(7294),a=r(1649);const o=function(e){var t=e.title,r=e.length,o=e.onClick,l=e.backdropBlur;return n.createElement("div",{className:"\n        z-10 \n        sticky \n        top-0 \n        bg-white/70\n        flex \n        items-center \n        py-1 \n        px-2 \n        gap-6\n        ".concat(l&&"backdrop-blur-lg","\n      ")},n.createElement("div",{onClick:o,className:"p-2 rounded-full hover:bg-neutral-300/40 cursor-pointer"},n.createElement(a.UkU,{size:20})),n.createElement("div",{className:"flex flex-col"},n.createElement("span",{className:"font-bold text-lg"},t),void 0!==r&&n.createElement("span",{className:"font-bold text-xs text-gray-400"},r," posts")))}},8759:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(1257);const a=function(e){return n.default.get(e).then((function(e){return e.data}))}},5937:(e,t,r)=>{r.r(t),r.d(t,{default:()=>m});var n=r(7294),a=r(9250),o=r(5998),l=r(1257),c=r(3750),i=r(8035),s=r(8842),u=r(8759);var f=r(5414),d=r(4818);const m=function(){var e=function(){var e=(0,o.v9)((function(e){return e.me})),t=(0,s.Z)(e.id?"/notification/all?userId=".concat(e.id):null,u.Z,{onError:function(e){if(console.log(e),500===e.response.status)return alert(e.response.data)}});return{data:t.data,mutate:t.mutate}}(),t=e.data,r=e.mutate,m=(0,o.v9)((function(e){return e.notifications})),p=(0,o.v9)((function(e){return e.me})),v=(0,a.s0)(),g=(0,o.I0)();return(0,n.useEffect)((function(){if(t)return g((0,f.Gi)(t)),function(){l.default.get("/notification/all?userId=".concat(p.id)).then((function(e){return r(e.data)})).catch((function(e){if(console.log(e),500===e.response.status)return alert(e.response.data)}))}}),[t,g,r,p.id]),(0,n.useEffect)((function(){!0===p.hasNotification&&(l.default.delete("/user/alert",{data:{userId:p.id}}),g((0,d.sL)()))}),[p,g]),n.createElement(n.Fragment,null,n.createElement(i.Z,{title:"Notifications",onClick:function(){return v(-1)}}),n.createElement("hr",null),0===m.length?n.createElement("span",{className:"block text-neutral-500 text-center p-6 text-xl"},"알림이 없습니다."):n.createElement(n.Fragment,null,m.map((function(e){return n.createElement("div",{key:e.id,className:"\r group \r hover:bg-slate-100 \r cursor-pointer \r flex \r justify-between \r items-center\r border-b\r "},n.createElement("div",{className:"m-3 flex items-center gap-3"},n.createElement(c.AMt,{size:25}),n.createElement("p",null,e.body)),n.createElement("button",{onClick:function(){l.default.delete("/notification",{data:{notificationId:e.id}}),g((0,f.sO)(e.id))},className:"\r invisible\r mr-3\r p-1\r px-2\r rounded-full\r group-hover:visible\r group-hover:bg-rose-500\r group-hover:text-white\r hover:brightness-90\r "},"Delete"))}))))}},4405:(e,t,r)=>{r.d(t,{w_:()=>s});var n=r(7294),a={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},o=n.createContext&&n.createContext(a),l=function(){return l=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var a in t=arguments[r])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},l.apply(this,arguments)},c=function(e,t){var r={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(n=Object.getOwnPropertySymbols(e);a<n.length;a++)t.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(e,n[a])&&(r[n[a]]=e[n[a]])}return r};function i(e){return e&&e.map((function(e,t){return n.createElement(e.tag,l({key:t},e.attr),i(e.child))}))}function s(e){return function(t){return n.createElement(u,l({attr:l({},e.attr)},t),i(e.child))}}function u(e){var t=function(t){var r,a=e.attr,o=e.size,i=e.title,s=c(e,["attr","size","title"]),u=o||t.size||"1em";return t.className&&(r=t.className),e.className&&(r=(r?r+" ":"")+e.className),n.createElement("svg",l({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,a,s,{className:r,style:l(l({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),i&&n.createElement("title",null,i),e.children)};return void 0!==o?n.createElement(o.Consumer,null,(function(e){return t(e)})):t(a)}}}]);