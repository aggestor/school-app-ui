import{r as y}from"./ChevronRightIcon-58a9d98a.js";import{r as o,o as O,c as a,a as i,b as v,F as p,i as g,g as l,H as d,u,a9 as P,w as E,d as _,t as x,y as M,q as h,f as Q}from"./index-4f0251ba.js";import{C as U}from"./category-855ddfae.js";import{E as W}from"./extension-6b58ca39.js";import{M as X}from"./models-804a584c.js";import{S as Y}from"./set-dcd81a5b.js";import{T as Z}from"./type-e63f604b.js";import{F as ee}from"./FirstHomeSection-c9da0da6.js";function k(C){return Array.isArray(C)?C:[C]}const te={class:"w-[95%] mx-auto"},se=v("h1",{class:"font-semibold"},"Liste de categories",-1),ae={class:"grid md:grid-cols-4 text-gray-600 grid-span-2 w-full"},le={class:"flex items-center justify-between"},oe={class:"font-semibold mr-2"},ne={key:0,class:"mt-2 border-l ml-4"},re={key:0,class:"ml-1"},ie=_(" Models "),ue={key:0,class:"ml-3 border-l"},de={key:1,class:"ml-1"},ce=_(" Extensions "),ve={key:0,class:"ml-3 border-l"},ke={__name:"Categories",setup(C){const L=o([]),b=o([]),w=o([]),$=o([]),B=o([]),c=o(0),f=o(0),m=o(0);o(0);const S=o(0),T=o(!1),j=o(!1),F=o(!1),N=o(!1),V=o(!1),I=async()=>{T.value=!0;const e=await U.getAll();e.type==="success"&&e.data!=!1&&(L.value=k(e.data)),T.value=!1},q=async e=>{j.value=!0;const s=await W.getAllByCategory(e);s.type==="success"&&s.data!=!1&&(b.value=k(s.data)),j.value=!1},z=async e=>{F.value=!0;const s=await X.getAllByCategory(e);s.type==="success"&&s.data!=!1&&(w.value=k(s.data)),F.value=!1},D=async e=>{V.value=!0;const s=await Y.getAllByModel(e);s.type==="success"&&s.data!=!1&&($.value=k(s.data)),V.value=!1},H=async e=>{N.value=!0;const s=await Z.getAllByExtension(e);s.type==="success"&&s.data!=!1&&(B.value=k(s.data)),N.value=!1},R=e=>{e==c.value?c.value=0:(c.value=e,q(e),z(e))},G=e=>{e==m.value?m.value=0:(m.value=e,H(e))},J=e=>{e==f.value?f.value=0:(f.value=e,D(e))};return O(I),(e,s)=>{const A=Q("router-link");return l(),a("div",te,[i(ee),se,v("div",ae,[(l(!0),a(p,null,g(L.value,n=>(l(),a("div",{class:d(` fle m-3 my-1 ${c.value!=n.id?"h-10":"bg-gray-50"} rounded   col-span-2 mb-4 p-2`),key:n.id},[v("div",le,[v("div",{class:d(`flex ${c.value===n.id&&"font-semibold text-blue-600"}`)},[v("span",oe,[i(u(P),{class:"w-5 h-5"})]),i(A,{class:"hover:text-blue-600",to:"/products/filter/categories/"+u(M)(n.name)+"/"+n.id},{default:E(()=>[_(x(n.name),1)]),_:2},1032,["to"])],2),i(u(y),{onClick:t=>R(n.id),class:d(`w-5 cursor-pointer ${c.value==n.id&&"rotate-90"} transition-[transform] duration-500 h-5`)},null,8,["onClick","class"])]),c.value==n.id?(l(),a("div",ne,[w.value.length>0&&w.value[0].cat_id==n.id?(l(),a("div",re,[ie,(l(!0),a(p,null,g(w.value,t=>(l(),a("div",{class:"ml-3 border-l",key:t.mod_id},[v("div",{class:d(`ml-1 flex w-[95%] justify-between p-1 ${f.value===t.mod_id&&"font-semibold text-blue-600"}`)},[i(A,{class:"hover:text-blue-600",to:"/products/filter/models/"+u(M)(t.mod_name)+"/"+t.mod_id},{default:E(()=>[_(x(t.mod_name),1)]),_:2},1032,["to"]),i(u(y),{onClick:r=>J(t.mod_id),class:d(`w-5 cursor-pointer ${f.value==t.mod_id&&"rotate-90"} transition-[transform] duration-500 h-5`)},null,8,["onClick","class"])],2),f.value==t.mod_id&&$.value.length>0&&$.value[0].mod_id==t.mod_id?(l(),a("div",ue,[(l(!0),a(p,null,g($.value,r=>(l(),a("div",{key:r.set_name,class:"flex justify-between w-[90%] ml-1"},[_(x(r.set_name)+" ",1),i(u(y),{onClick:K=>e.onClickSet(r.set_id),class:d(`w-5 cursor-pointer ${S.value==t.typ_id&&"rotate-90"} transition-[transform] duration-500 h-5`)},null,8,["onClick","class"])]))),128))])):h("",!0)]))),128))])):h("",!0),b.value.length>0&&b.value[0].cat_id==n.id?(l(),a("div",de,[ce,(l(!0),a(p,null,g(b.value,t=>(l(),a("div",{class:"ml-3 border-l",key:t.ext_id},[v("div",{class:d(`ml-1 flex w-[95%] justify-between p-1 ${m.value==t.ext_id&&"font-semibold text-blue-600"}`)},[i(A,{class:"hover:text-blue-600",to:"/products/filter/extensions/"+u(M)(t.ext_name)+"/"+t.ext_id},{default:E(()=>[_(x(t.ext_name),1)]),_:2},1032,["to"]),i(u(y),{onClick:r=>G(t.ext_id),class:d(`w-5 cursor-pointer ${m.value==t.ext_id&&"rotate-90"} transition-[transform] duration-500 h-5`)},null,8,["onClick","class"])],2),m.value==t.ext_id&&B.value.length>0&&B.value[0].ext_id==t.ext_id?(l(),a("div",ve,[(l(!0),a(p,null,g(B.value,r=>(l(),a("div",{key:r.typ_name,class:"flex justify-between w-[90%]"},[i(A,{class:"hover:text-blue-600",to:"/products/filter/types"+u(M)(r.typ_name)+"/"+r.typ_id},{default:E(()=>[_(x(r.typ_name),1)]),_:2},1032,["to"]),i(u(y),{onClick:K=>e.onClickTyp(r.typ_id),class:d(`w-5 cursor-pointer ${S.value==t.typ_id&&"rotate-90"} transition-[transform] duration-500 h-5`)},null,8,["onClick","class"])]))),128))])):h("",!0)]))),128))])):h("",!0)])):h("",!0)],2))),128))])])}}};export{ke as default};
