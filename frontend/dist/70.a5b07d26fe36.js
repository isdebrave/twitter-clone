"use strict";(self.webpackChunktwitter_clone=self.webpackChunktwitter_clone||[]).push([[70],{8035:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(7294),a=r(1649);const l=function(e){var t=e.title,r=e.length,l=e.onClick,o=e.backdropBlur;return n.createElement("div",{className:"\n        z-10 \n        sticky \n        top-0 \n        bg-white/70\n        flex \n        items-center \n        py-1 \n        px-2 \n        gap-6\n        ".concat(o&&"backdrop-blur-lg","\n      ")},n.createElement("div",{onClick:l,className:"p-2 rounded-full hover:bg-neutral-300/40 cursor-pointer"},n.createElement(a.UkU,{size:20})),n.createElement("div",{className:"flex flex-col"},n.createElement("span",{className:"font-bold text-lg"},t),void 0!==r&&n.createElement("span",{className:"font-bold text-xs text-gray-400"},r," posts")))}},9338:(e,t,r)=>{r.d(t,{Nf:()=>o,od:()=>l,rd:()=>a});var n=r(582),a=function(e){return 0===e.length?"/images/anonymous.jpg":"https://source.unsplash.com/random/300×300"},l=function(e,t,r,a){var l=e.target.files;if(l){if(a&&l.length+a.length>4)return n.ZP.error("최대 4개까지 선택 가능합니다.");for(var o=0;o<l.length;o++){t(l[o]);var c=new FileReader;c.readAsDataURL(l[o]),c.onload=function(e){e.target&&r(e.target.result)}}}},o=function(e,t,r,n,a,l){if(t.current&&(t.current.value=""),l&&a){var o=parseInt(e.target.getAttribute("data-idx")||"",10);return r(a.filter((function(e,t){return t!==o}))),void n(l.filter((function(e,t){return t!==o})))}r(),n()}},4070:(e,t,r)=>{r.r(t),r.d(t,{default:()=>i}),r(6265);var n=r(7294),a=r(9250),l=r(9655),o=r(6653),c=r(1257),u=r(8035),s=r(9338);const i=function(){var e,t,r=(0,n.useState)([]),i=r[0],f=r[1],d=(0,a.s0)();return n.createElement(n.Fragment,null,n.createElement(u.Z,{title:"Explore",onClick:function(){return d(-1)}}),n.createElement("div",{className:"py-2 px-6 w-full relative"},n.createElement("input",{type:"text",placeholder:"Search",className:"\r peer\r w-full\r bg-gray-100\r border\r border-gray-100\r rounded-full\r p-3\r pl-16\r outline-none\r focus:border-sky-500\r focus:bg-white\r ",onChange:(e=function(e){return function(e){return t=void 0,r=void 0,a=function(){var t,r,n;return function(e,t){var r,n,a,l,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return l={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(l[Symbol.iterator]=function(){return this}),l;function c(c){return function(u){return function(c){if(r)throw new TypeError("Generator is already executing.");for(;l&&(l=0,c[0]&&(o=0)),o;)try{if(r=1,n&&(a=2&c[0]?n.return:c[0]?n.throw||((a=n.return)&&a.call(n),0):n.next)&&!(a=a.call(n,c[1])).done)return a;switch(n=0,a&&(c=[2&c[0],a.value]),c[0]){case 0:case 1:a=c;break;case 4:return o.label++,{value:c[1],done:!1};case 5:o.label++,n=c[1],c=[0];continue;case 7:c=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==c[0]&&2!==c[0])){o=0;continue}if(3===c[0]&&(!a||c[1]>a[0]&&c[1]<a[3])){o.label=c[1];break}if(6===c[0]&&o.label<a[1]){o.label=a[1],a=c;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(c);break}a[2]&&o.ops.pop(),o.trys.pop();continue}c=t.call(e,o)}catch(e){c=[6,e],n=0}finally{r=a=0}if(5&c[0])throw c[1];return{value:c[0]?c[1]:void 0,done:!0}}([c,u])}}}(this,(function(a){switch(a.label){case 0:if(0===(t=e.target.value).length)return f([]),[2];a.label=1;case 1:return a.trys.push([1,3,,4]),[4,c.default.post("user/search",{value:t})];case 2:return r=a.sent(),f(r.data),[3,4];case 3:return n=a.sent(),console.log(n),[3,4];case 4:return[2]}}))},new((n=void 0)||(n=Promise))((function(e,l){function o(e){try{u(a.next(e))}catch(e){l(e)}}function c(e){try{u(a.throw(e))}catch(e){l(e)}}function u(t){var r;t.done?e(t.value):(r=t.value,r instanceof n?r:new n((function(e){e(r)}))).then(o,c)}u((a=a.apply(t,r||[])).next())}));var t,r,n,a}(e)},300,function(r){t&&clearTimeout(t),t=setTimeout((function(){return e(r)}),300)})}),n.createElement("div",{className:"\r absolute \r top-1/2 \r -translate-y-1/2 \r left-12 \r text-gray-500 \r peer-focus:text-sky-500\r "},n.createElement(o.a4h,{size:23}))),n.createElement("div",{className:"mx-6"},n.createElement("div",{className:"\r w-full\r bg-white\r rounded-lg\r max-h-[350px]\r overflow-auto\r ",style:{boxShadow:"0 0 8px #ddd"}},i.map((function(e){return n.createElement(l.rU,{to:"/".concat(e.id),key:e.id,className:"\r py-2 \r px-4 \r cursor-pointer \r hover:bg-slate-100 \r flex \r items-center \r gap-2\r "},n.createElement("div",{className:"\r w-[40px] \r h-[40px] \r flex\r rounded-full \r overflow-hidden \r "},n.createElement("img",{src:(0,s.rd)(e.profileImage),alt:"ProfileImage",className:"w-full object-cover"})),n.createElement("div",{className:"flex flex-col"},n.createElement("span",{className:"font-bold"},e.username),n.createElement("span",{className:"text-gray-500"},"@",e.id.slice(0,10))))})))))}}}]);