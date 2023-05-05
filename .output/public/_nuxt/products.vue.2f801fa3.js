import{a as w,b as q,e as N,o as s,f as n,u as e,c as m,w as x,h as a,F as f,r as L,i as j,t as b,j as B,k as h,l as M,m as g,p as V,q as y,s as D}from"./entry.d2fb6768.js";import{_ as F}from"./filter.vue.09099431.js";import{_ as z}from"./item.vue.526a41c7.js";const A={class:"pagination flex items-center justify-center"},I=a("i",{class:"pi pi-angle-double-left"},null,-1),Q={key:1,class:"text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"},R=a("i",{class:"pi pi-angle-double-left"},null,-1),S=[R],T=a("i",{class:"pi pi-angle-left"},null,-1),E={key:3,class:"text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"},G=a("i",{class:"pi pi-angle-left"},null,-1),K=[G],O={class:"pagination-pages overflow-hidden flex items-center"},P=a("i",{class:"pi pi-angle-right"},null,-1),H={key:5,class:"text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"},J=a("i",{class:"pi pi-angle-right"},null,-1),U=[J],W=a("i",{class:"pi pi-angle-double-right"},null,-1),X={key:7,class:"text-slate-200 text-2xl py-2 px-4 mx-1 border border-slate-200"},Y=a("i",{class:"pi pi-angle-double-right"},null,-1),Z=[Y],ee=w({__name:"pagination",props:["pagination","refresh"],setup(d){const t=q(),u=N(()=>{const r=+t.params.page,o={min:0,max:0};return r<3?(o.min=0,o.max=6):(o.min=r-3,o.max=r+2),o});return(r,o)=>{const i=M;return s(),n("div",A,[+e(t).params.page>1?(s(),m(i,{key:0,to:{params:{page:1},query:e(t).query},class:"text-2xl py-2 px-4 mx-1 border border-slate-200"},{default:x(()=>[I]),_:1},8,["to"])):(s(),n("span",Q,S)),+e(t).params.page>1?(s(),m(i,{key:2,to:{params:{page:+e(t).params.page-1},query:e(t).query},class:"text-2xl py-2 px-4 mx-1 border border-slate-200"},{default:x(()=>[T]),_:1},8,["to"])):(s(),n("span",E,K)),a("div",O,[(s(!0),n(f,null,L(Math.ceil(d.pagination.count/20),c=>(s(),n(f,{key:c},[e(u).min<=c&&e(u).max>=c?(s(),m(i,{key:0,to:{params:{page:c},query:e(t).query},class:B(["text-2xl py-2 px-4 mx-1 border border-slate-200",+e(t).params.page===c?"active":""])},{default:x(()=>[j(b(c),1)]),_:2},1032,["to","class"])):h("",!0)],64))),128))]),+e(t).params.page<Math.ceil(d.pagination.count/20)?(s(),m(i,{key:4,to:{params:{page:+e(t).params.page+1},query:e(t).query},class:"text-2xl py-2 px-4 mx-1 border border-slate-200"},{default:x(()=>[P]),_:1},8,["to"])):(s(),n("span",H,U)),+e(t).params.page<Math.ceil(d.pagination.count/20)?(s(),m(i,{key:6,to:{params:{page:Math.ceil(d.pagination.count/20)},query:e(t).query},class:"text-2xl py-2 px-4 mx-1 border border-slate-200"},{default:x(()=>[W]),_:1},8,["to"])):(s(),n("span",X,Z))])}}});const te={class:"md:flex"},se={class:"sm:w-full md:w-3/12"},ae={class:"sm:w-full md:w-9/12"},oe={key:0,class:"w-full text-xl text-center uppercase"},ne={class:"w-full px-2 py-3"},le={class:"text-2xl text-slate-600 border-b-2 border-zinc-500"},re={class:"w-full grid grid-flow-row-dense sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mb-12"},ie={key:0,class:"fixed inset-0 w-full h-full bg-slate-200/50 flex justify-center items-center"},ce=a("span",{class:"text-2xl text-slate-800"},"LOADING",-1),pe=[ce],me=w({__name:"products",async setup(d){let t,u;const r=q(),o=g([]),i=g([]),c=g(!1),$=g({count:0}),C=async l=>{await v(l)},k=l=>{let p="";for(let _ in l)_&&l[_]&&(p+=`${_}=${l[_]}&`);return p},v=async(l=r.query)=>{const{data:p,refresh:_}=await D(`/api/v1/items?${k(r.params)}${k(l)}&limit=21`,"$gfvq5tKCLR");await _({dedupe:!0}),o.value=p.value.items,$.value.count=+p.value.count};return[t,u]=V(()=>v()),await t,u(),(l,p)=>(s(),n("div",te,[a("div",se,[y(F,{onChangeQuery:C,class:"product-page"})]),a("div",ae,[e(i)?(s(),n("div",oe,b(e(i)[`name_${e(r).params.locale}`]),1)):h("",!0),a("div",ne,[a("h3",le,b(l.$t("new_supply")),1)]),e(o)&&e(o).length>0?(s(),n(f,{key:1},[a("div",re,[y(z,{items:e(o)},null,8,["items"])]),y(ee,{pagination:e($)},null,8,["pagination"])],64)):h("",!0)]),e(c)?(s(),n("div",ie,pe)):h("",!0)]))}});export{me as _};