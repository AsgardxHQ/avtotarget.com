import{a as j,b as I,v as R,D as L,E as z,e as B,m as _,G,o as a,f as n,q as g,w as E,H,h as e,t as l,u as r,F as $,r as V,k as c,i as f,C,A as d,I as m,B as J,J as K,l as W}from"./entry.f13a3b42.mjs";const Q={class:"w-full text-xl text-center uppercase mb-6"},X={class:"flex"},Y={class:"w-full px-4"},Z=["src"],ee={class:"w-full mr-6"},te={class:"flex justify-between mt-4"},se={class:"text-xs"},oe={class:"font-bold"},ue={class:"font-bold"},le={class:"text-xs"},ae={class:"font-bold"},ne={class:"font-bold"},re={class:"font-bold"},ie=["onClick"],de=e("i",{class:"pi pi-times"},null,-1),ce=[de],pe={key:0,class:"w-52 relative"},fe={class:"fixed border rounded p-2 shadow-md"},me={class:"text-md mb-4"},be={class:"block mb-2"},_e={class:"font-bold"},ve={key:0,class:"modal fixed top-0 left-0 w-full h-full flex justify-center items-center"},he={class:"w-80 relative z-20 bg-white py-2 px-4 rounded-md shadow-lg"},ye=e("i",{class:"pi pi-plus rotate-45"},null,-1),xe=[ye],ke=e("h2",{class:"text-2xl border-b border-slate-200"},"\u041E\u0444\u043E\u0440\u043C\u043B\u0435\u043D\u0438\u0435 \u0437\u0430\u043A\u0430\u0437\u0430",-1),we={class:"mt-2"},ge={class:"block mb-2"},Ee=e("span",{class:"text-xs mb-1 block"},"\u0424\u0418\u041E",-1),$e={class:"block mb-2"},Ce=e("span",{class:"text-xs mb-1 block"},"Email",-1),De={class:"block mb-2"},Fe=e("span",{class:"text-xs mb-1 block"},"\u0422\u0435\u043B\u0435\u0444\u043E\u043D",-1),Be={class:"block mb-2"},Ve=e("span",{class:"text-xs mb-1 block"},"\u0421\u043F\u043E\u0441\u043E\u0431 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438",-1),Ae=e("option",{value:""},"\u0421\u043F\u043E\u0441\u043E\u0431 \u0434\u043E\u0441\u0442\u0430\u0432\u043A\u0438",-1),Oe=e("option",{value:"\u0441\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437"},"\u0421\u0430\u043C\u043E\u0432\u044B\u0432\u043E\u0437",-1),Se=e("option",{value:"\u043D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430"},"\u041D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430",-1),Pe=[Ae,Oe,Se],Ue={class:"block mb-2"},qe=e("span",{class:"text-xs mb-1 block"},"\u0413\u043E\u0440\u043E\u0434",-1),Me={key:0,class:"block mb-2 relative"},Ne=e("span",{class:"text-xs mb-1 block"},"\u041E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0447\u0442\u044B",-1),Te={key:0,class:"max-h-40 overflow-auto absolute bg-white border border-slate-200"},je=["onClick"],Ie={class:"block mb-2"},Re=e("span",{class:"text-xs mb-1 block"},"\u041F\u0440\u0438\u043C\u0435\u0447\u0430\u043D\u0438\u0435 \u043A \u0437\u0430\u043A\u0430\u0437\u0443",-1),Le={class:"flex justify-between items-center"},ze=e("button",{type:"submit",class:"bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded"},"\u041A\u0443\u043F\u0438\u0442\u044C",-1),Ke=j({__name:"cart",setup(Ge){const i=I(),A=R(),v=L(),h=z(),p=B(()=>v.cart),D={};p.value.map(o=>{D[o.id]=o.count});const u=_({fullname:"",phone:"",email:"",delivery:"",description:"",post_office:"",city:"",items:D});if(h.value)for(let o in h.value)Object.keys(u.value).indexOf(o)!==-1&&(u.value[o]=h.value[o]);const y=_(!1),O=()=>{let o=0;p.value.map(b=>{o+=b.price_retail*b.count});const s=o/100;return parseFloat(s.toString()).toFixed(2)},x=_([]),k=_(!0),S=async()=>{console.log(u.value.post_office);const{data:o}=await $fetch("https://api.novaposhta.ua/v2.0/json/",{method:"POST",body:{apiKey:"36546247000dc161cf93d55c035e8f1b",modelName:"Address",calledMethod:"getWarehouses",methodProperties:{CityName:u.value.city}}});x.value=o},P=B(()=>{const o=u.value.post_office;return o.length===0?[]:x.value.filter(s=>s[`Description${i.params.locale==="uk"?"":"Ru"}`].indexOf(o.trim())!==-1)}),U=o=>{u.value.post_office=o,k.value=!1},q=o=>{v.delete(o)},M=()=>{document.body.classList.add("overflow-hidden"),y.value=!0},w=()=>{document.body.classList.remove("overflow-hidden"),y.value=!1},N=async()=>{try{await $fetch("/api/v1/order",{method:"POST",body:u.value}),localStorage.removeItem("cart"),v.cart=[],A.replace(`/${i.params.locale}`)}catch(o){console.log(o)}};return G(()=>{p.value.length===0&&(window.location.href=`/${i.params.locale}`)}),(o,s)=>{const b=W,T=H;return a(),n("div",null,[g(T,null,{default:E(()=>[e("h1",Q,l(o.$t("cart")),1),e("div",X,[e("div",Y,[r(p).length?(a(!0),n($,{key:0},V(r(p),t=>(a(),n("div",{class:"w-full flex mb-2 border-t-2 p-2 relative",key:t.id},[g(b,{class:"w-4/12 pr-2",to:`/${r(i).params.locale}/product/${t.id}`},{default:E(()=>[t.images&&t.images.length>0?(a(),n("img",{key:0,src:`/images/products/${t.images[0]}`},null,8,Z)):c("",!0)]),_:2},1032,["to"]),e("div",ee,[g(b,{to:`/${r(i).params.locale}/product/${t.id}`,class:"text-md leading-5 text-sky-800"},{default:E(()=>[f(l(t[`name_${r(i).params.locale}`]),1)]),_:2},1032,["to"]),e("div",te,[e("ul",se,[e("li",null,[e("span",oe,l(o.$t("items.code_wholesale"))+": ",1),f(l(t.code_wholesale),1)]),e("li",null,[e("span",ue,l(o.$t("items.code_vendor"))+": ",1),f(l(t.code_vendor),1)])]),e("ul",le,[e("li",null,[e("span",ae,l(o.$t("items.price"))+": ",1),f(l(t.price_retail/100)+" \u0433\u0440\u043D.",1)]),e("li",null,[e("span",ne,l(o.$t("count_items"))+": ",1),f(l(t.count)+" \u0448\u0442.",1)]),e("li",null,[e("span",re,l(o.$t("items.total_item"))+": ",1),f(" "+l(t.price_retail/100*t.count)+" \u0433\u0440\u043D.",1)])])])]),e("a",{href:"#",class:"absolute right-2 top-2 hover:rotate-90",onClick:C(F=>q(t.id),["prevent"])},ce,8,ie)]))),128)):c("",!0)]),r(p).length?(a(),n("div",pe,[e("div",fe,[e("p",me,[e("span",be,l(o.$t("items.total"))+":",1),e("span",_e,l(O())+" \u0433\u0440\u043D.",1)]),e("button",{onClick:s[0]||(s[0]=t=>M()),type:"button",class:"w-full bg-cyan-700 text-white hover:bg-cyan-900 py-2 px-6 text-xs uppercase font-bold rounded"},l(o.$t("order")),1)])])):c("",!0)]),y.value?(a(),n("div",ve,[e("div",{class:"overlay fixed top-0 left-0 w-full h-full bg-slate-200 opacity-50 z-10",onClick:s[1]||(s[1]=t=>w())}),e("div",he,[e("form",{class:"relative",onSubmit:s[13]||(s[13]=C(t=>N(),["prevent"]))},[e("a",{href:"#",class:"absolute -right-7 -top-5 rounded-full bg-white border border-slate-200 p-2",onClick:s[2]||(s[2]=C(t=>w(),["prevent"]))},xe),ke,e("div",we,[e("label",ge,[Ee,d(e("input",{class:"w-full form-input px-4 py-3 outline-0 border border-slate-200",type:"text",name:"fullname",placeholder:"\u0424\u0418\u041E","onUpdate:modelValue":s[3]||(s[3]=t=>u.value.fullname=t),required:"true"},null,512),[[m,u.value.fullname]])]),e("label",$e,[Ce,d(e("input",{class:"w-full form-input px-4 py-3 outline-0 border border-slate-200",type:"email",name:"email",placeholder:"Email","onUpdate:modelValue":s[4]||(s[4]=t=>u.value.email=t),required:"true"},null,512),[[m,u.value.email]])]),e("label",De,[Fe,d(e("input",{class:"w-full form-input px-4 py-3 outline-0 border border-slate-200",type:"tel",name:"phone",placeholder:"\u0422\u0435\u043B\u0435\u0444\u043E\u043D","onUpdate:modelValue":s[5]||(s[5]=t=>u.value.phone=t),required:"true"},null,512),[[m,u.value.phone]])]),e("label",Be,[Ve,d(e("select",{class:"w-full form-input px-4 py-3 outline-0 border border-slate-200",name:"delivery","onUpdate:modelValue":s[6]||(s[6]=t=>u.value.delivery=t),required:"true"},Pe,512),[[J,u.value.delivery]])]),u.value.delivery==="\u043D\u043E\u0432\u0430\u044F \u043F\u043E\u0447\u0442\u0430"?(a(),n($,{key:0},[e("label",Ue,[qe,d(e("input",{onChange:s[7]||(s[7]=t=>S()),class:"w-full form-input px-4 py-3 outline-0 border border-slate-200",type:"text",name:"city",placeholder:"\u0413\u043E\u0440\u043E\u0434","onUpdate:modelValue":s[8]||(s[8]=t=>u.value.city=t),required:"true"},null,544),[[m,u.value.city]])]),u.value.city.length!=0?(a(),n("label",Me,[Ne,d(e("input",{onInput:s[9]||(s[9]=t=>{k.value=!0}),class:"w-full form-input px-4 py-3 outline-0 border border-slate-200",type:"text",name:"post_office",placeholder:"\u041E\u0442\u0434\u0435\u043B\u0435\u043D\u0438\u0435 \u043F\u043E\u0447\u0442\u044B","onUpdate:modelValue":s[10]||(s[10]=t=>u.value.post_office=t),required:"true"},null,544),[[m,u.value.post_office]]),x.value.length>0&&u.value.post_office.length>0?d((a(),n("ul",Te,[(a(!0),n($,null,V(r(P),(t,F)=>(a(),n("li",{key:F,onClick:He=>U(t[r(i).params.locale==="uk"?"Description":"DescriptionRu"]),class:"px-2 mb-2 text-xs hover:bg-slate-200"},l(t[r(i).params.locale==="uk"?"Description":"DescriptionRu"]),9,je))),128))],512)),[[K,k.value]]):c("",!0)])):c("",!0)],64)):c("",!0),e("label",Ie,[Re,d(e("textarea",{class:"w-full form-input px-4 py-3 outline-0 border border-slate-200",rows:"4","onUpdate:modelValue":s[11]||(s[11]=t=>u.value.description=t)},null,512),[[m,u.value.description]])]),e("div",Le,[e("button",{type:"button",class:"py-2 px-4 border border-slate-200 rounded hover:bg-slate-100",onClick:s[12]||(s[12]=t=>w())},"\u0417\u0430\u043A\u0440\u044B\u0442\u044C"),ze])])],32)])])):c("",!0)]),_:1})])}}});export{Ke as default};
