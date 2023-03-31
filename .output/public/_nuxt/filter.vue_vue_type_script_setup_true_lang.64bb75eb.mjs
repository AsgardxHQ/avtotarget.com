import{a as C,v as E,b as w,x,y as h,z as F,e as B,o as s,f as l,h as u,t as d,A as m,B as _,F as n,r as b,u as p,k as c,C as A}from"./entry.f13a3b42.mjs";const V={class:"px-2 pt-3"},q={class:"text-2xl text-slate-600 border-b-2 border-zinc-700"},D={class:"container py-3 items-end"},U={class:"wrapper mb-2"},z={class:"select-block px-2"},L=u("span",{class:"text-xs mb-1 block"},"\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",-1),M=u("option",{value:null},"\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",-1),N=["value"],Q={key:0,class:"select-block px-2"},R=u("span",{class:"text-xs mb-1 block"},"\u0421\u0430\u0431\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",-1),S=u("option",{value:null},"\u0421\u0430\u0431\u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",-1),X=["value"],G={class:"select-block px-2"},O=u("span",{class:"text-xs mb-1 block"},"\u041C\u0430\u0440\u043A\u0430",-1),j=u("option",{value:null},"\u041C\u0430\u0440\u043A\u0430",-1),H=["value"],I={key:1,class:"select-block px-2"},J=u("span",{class:"text-xs mb-1 block"},"\u041C\u043E\u0434\u0435\u043B\u044C",-1),K=u("option",{value:null},"\u041C\u043E\u0434\u0435\u043B\u044C",-1),P=["value"],T={class:"select-block px-2"},W=u("span",{class:"text-xs mb-1 block"},"\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C",-1),Y=u("option",{value:null},"\u041F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C",-1),Z=["value"],te=C({__name:"filter",async setup(ee){let r,y;const f=E(),i=w(),{data:k}=([r,y]=x(()=>h("/api/v1/filters","$5hdpGqCQFQ")),r=await r,y(),r),{data:v}=([r,y]=x(()=>h("/api/v1/categories","$XqEDBpiu8X")),r=await r,y(),r),t=F({category:+i.params.category||null,subcategory:+i.params.subcategory||null,model:+i.query.model||null,make:+i.query.make||null,supplier:+i.query.supplier||null}),$=B(()=>k.value.filter(a=>a.parent_id===t.make)),g=()=>{let a={};for(let o in t)["category","subcategory"].indexOf(o)===-1&&t[o]&&(a[o]=t[o]);f.push({path:`/${i.params.locale}/${t.category}/${t.subcategory?t.subcategory+"/":""}page-1`,query:a})};return(a,o)=>(s(),l("div",null,[u("div",V,[u("h3",q,d(a.$t("filter")),1)]),u("div",D,[u("div",U,[u("div",z,[u("label",null,[L,m(u("select",{class:"w-full form-input px-4 py-3 outline-0","onUpdate:modelValue":o[0]||(o[0]=e=>t.category=e)},[M,(s(!0),l(n,null,b(p(v),e=>(s(),l(n,{key:e.id},[e.parent_id===0?(s(),l("option",{key:0,value:e.id},d(e[`name_${p(i).params.locale}`]),9,N)):c("",!0)],64))),128))],512),[[_,t.category]])])]),t.category?(s(),l("div",Q,[u("label",null,[R,m(u("select",{class:"w-full form-input px-4 py-3 outline-0","onUpdate:modelValue":o[1]||(o[1]=e=>t.subcategory=e)},[S,(s(!0),l(n,null,b(p(v),e=>(s(),l(n,{key:e.id},[e.parent_id===t.category?(s(),l("option",{key:0,value:e.id},d(e[`name_${a.$route.params.locale}`]),9,X)):c("",!0)],64))),128))],512),[[_,t.subcategory]])])])):c("",!0),u("div",G,[u("label",null,[O,m(u("select",{class:"w-full form-input px-4 py-3 outline-0","onUpdate:modelValue":o[2]||(o[2]=e=>t.make=e)},[j,(s(!0),l(n,null,b(p(k),e=>(s(),l(n,{key:e.id},[e.parent_id===3?(s(),l("option",{key:0,value:e.id},d(e[`name_${a.$route.params.locale}`]),9,H)):c("",!0)],64))),128))],512),[[_,t.make]])])]),t.make&&p($).length>0?(s(),l("div",I,[u("label",null,[J,m(u("select",{class:"w-full form-input px-4 py-3 outline-0","onUpdate:modelValue":o[3]||(o[3]=e=>t.model=e)},[K,(s(!0),l(n,null,b(p(k),e=>(s(),l(n,{key:e.id},[e.parent_id===t.make?(s(),l("option",{key:0,value:e.id},d(e[`name_${a.$route.params.locale}`]),9,P)):c("",!0)],64))),128))],512),[[_,t.model]])])])):c("",!0),u("div",T,[u("label",null,[W,m(u("select",{class:"w-full form-input px-4 py-3 outline-0","onUpdate:modelValue":o[4]||(o[4]=e=>t.supplier=e)},[Y,(s(!0),l(n,null,b(p(k),e=>(s(),l(n,{key:e.id},[e.parent_id===2&&e[`name_${a.$route.params.locale}`]?(s(),l("option",{key:0,value:e.id},d(e[`name_${a.$route.params.locale}`]),9,Z)):c("",!0)],64))),128))],512),[[_,t.supplier]])])])]),u("button",{class:"filter-btn mx-2 mb-2 h-11 bg-slate-600 text-gray-100",onClick:o[5]||(o[5]=A(e=>g(),["prevent"]))},"\u0417\u043D\u0430\u0439\u0442\u0438")])]))}});export{te as _};
