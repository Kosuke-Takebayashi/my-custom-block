(()=>{"use strict";var e,t={863:()=>{const e=window.wp.blocks,t=window.wp.i18n,o=window.wp.element,a=window.wp.blockEditor,l=window.wp.data,n=window.wp.components,r=window.React;(0,e.registerBlockType)("my-custom/block",{title:(0,t.__)("My Custom Block"),icon:"smiley",category:"widgets",description:(0,t.__)("A custom block for displaying a list of posts."),supports:{color:{background:!1,text:!0},html:!1,typography:{fontSize:!0}},attributes:{fontSize:{type:"number",default:16},date:{type:"boolean",default:!0},postsToShow:{type:"number",default:4},selectedOption:{type:"string",default:"Y-m-d"}},edit:function({attributes:e,setAttributes:s,clientId:c}){const[i,u]=(0,r.useState)(e.postsToShow),[m,d]=(0,r.useState)(e.selectedOption),p=(0,a.useBlockProps)({style:{fontSize:e.fontSize}});(0,r.useEffect)((()=>{s({postsToShow:i})}),[i,s]),(0,r.useEffect)((()=>{s({selectedOption:m})}),[m,s]);const v=(0,l.useSelect)((e=>{const t=e("core").getEntityRecords("postType","post",{per_page:i,_embed:!0});return t?t.map((e=>{const t=e._embedded?.["wp:term"]?.[0];return{...e,categories:t?t.map((e=>e.name)).join(", "):""}})):[]}),[i]);return(0,o.createElement)("div",p,(0,o.createElement)(a.InspectorControls,null,(0,o.createElement)(n.PanelBody,{title:(0,t.__)("Font Size")},(0,o.createElement)(n.RangeControl,{label:(0,t.__)("フォントサイズ"),value:e.fontSize,onChange:e=>s({fontSize:e}),min:12,max:36}),(0,o.createElement)(n.ToggleControl,{label:(0,t.__)("投稿日"),checked:e.date,onChange:e=>s({date:e})}),(0,o.createElement)(n.RangeControl,{label:(0,t.__)("表示投稿数"),value:i,onChange:e=>u(e),min:1,max:10}),(0,o.createElement)(n.SelectControl,{label:(0,t.__)("日付表示フォーマット"),value:m,options:[{value:"Y-m-d",label:"Y-m-d"},{value:"Y.m.d",label:"Y.m.d"},{value:"Y年m月d日",label:"Y年m月d日"},{value:"Y/m/d",label:"Y/m/d"}],onChange:e=>d(e)}))),(0,o.createElement)("ul",null,v&&v.map((t=>(0,o.createElement)("li",{key:t.id},e.date&&(0,o.createElement)("span",{className:"my-custom-block-post-date"},((e,t)=>{const o=new Intl.DateTimeFormat("ja-JP",{year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(e);switch(t){case"Y-m-d":default:return`${o[0].value}-${o[2].value}-${o[4].value}`;case"Y.m.d":return`${o[0].value}.${o[2].value}.${o[4].value}`;case"Y年m月d日":return`${o[0].value}年${o[2].value}月${o[4].value}日`;case"Y/m/d":return`${o[0].value}/${o[2].value}/${o[4].value}`}})(new Date(t.date),m)),(0,o.createElement)("span",{className:"my-custom-block-category"},t.categories),(0,o.createElement)("a",{href:t.link},t.title.rendered))))))},save:()=>null})}},o={};function a(e){var l=o[e];if(void 0!==l)return l.exports;var n=o[e]={exports:{}};return t[e](n,n.exports,a),n.exports}a.m=t,e=[],a.O=(t,o,l,n)=>{if(!o){var r=1/0;for(u=0;u<e.length;u++){for(var[o,l,n]=e[u],s=!0,c=0;c<o.length;c++)(!1&n||r>=n)&&Object.keys(a.O).every((e=>a.O[e](o[c])))?o.splice(c--,1):(s=!1,n<r&&(r=n));if(s){e.splice(u--,1);var i=l();void 0!==i&&(t=i)}}return t}n=n||0;for(var u=e.length;u>0&&e[u-1][2]>n;u--)e[u]=e[u-1];e[u]=[o,l,n]},a.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={57:0,533:0};a.O.j=t=>0===e[t];var t=(t,o)=>{var l,n,[r,s,c]=o,i=0;if(r.some((t=>0!==e[t]))){for(l in s)a.o(s,l)&&(a.m[l]=s[l]);if(c)var u=c(a)}for(t&&t(o);i<r.length;i++)n=r[i],a.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return a.O(u)},o=globalThis.webpackChunkmy_custom_block=globalThis.webpackChunkmy_custom_block||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var l=a.O(void 0,[533],(()=>a(863)));l=a.O(l)})();