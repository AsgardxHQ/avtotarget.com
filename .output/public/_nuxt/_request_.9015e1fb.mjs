import{a as x,m as a,b as y,M as g,N as h,G as w,x as b,o,f as n,h as e,t as l,q as N,C as $,k as i,i as k,L as C}from"./entry.f13a3b42.mjs";import{_ as j}from"./item.vue_vue_type_script_setup_true_lang.c9b880dd.mjs";const q={class:"flex"},z={class:"w-full"},A={class:"w-full px-2 py-3"},B={class:"text-slate-600 border-b-2 border-zinc-500 flex justify-between items-center"},L={class:"text-2xl"},V=k(),D={class:"text-sm"},G={key:0,class:"w-full min-h-80 grid grid-flow-row-dense grid-cols-4 mb-12"},I={class:"group-hover:shadow-lg z-50 bg-zinc-100 rounded-md shadow-md flex items-center justify-center w-full"},M={class:"text-xl uppercase font-bold"},S={key:0,class:"fixed inset-0 w-full h-full bg-slate-200/50 flex justify-center items-center"},T=e("span",{class:"text-2xl text-slate-800"},"LOADING",-1),E=[T],F=x({__name:"[request]",async setup(O){let t,d;const s=a([]),p=y(),f=a(!1),u=a(1),c=a(0);g(()=>{delete h().payload.data.search}),w(()=>{delete h().payload.data.search});const{data:_}=([t,d]=b(()=>C("search",()=>$fetch(`/api/v1/search/${p.params.request}`),"$oGzSBZxjTL")),t=await t,d(),t);s.value=_.value.items,c.value=_.value.count;const v=()=>{u.value+=1,console.log(u)};return(r,m)=>(o(),n("div",q,[e("div",z,[e("div",A,[e("h3",B,[e("span",L,l(r.$t("search_hl")),1),V,e("span",D,l(r.$t("found"))+": "+l(c.value),1)])]),s.value&&s.value.length>0?(o(),n("div",G,[N(j,{items:s.value},null,8,["items"]),c.value>19?(o(),n("button",{key:0,type:"button",class:"group m-2 relative btn-load-next flex items-start",onClick:m[0]||(m[0]=$(R=>v(),["prevent"]))},[e("div",I,[e("span",M,l(r.$t("show_more")),1)])])):i("",!0)])):i("",!0)]),f.value?(o(),n("div",S,E)):i("",!0)]))}});export{F as default};
