import{T as c}from"./TextBox-7a965e88.js";import{r,c as o,a as t,b as n,g as l,B as d}from"./index-4f0251ba.js";import{P as f}from"./PagesNavigationHeader-c8c7004e.js";import{M as p}from"./mark-b9fb22e4.js";import{S as _}from"./SuccessComponent-d31b415f.js";import{u as h}from"./useVerify-b9fe02ca.js";import"./ArrowLeftIcon-5af96ac5.js";import"./XMarkIcon-ae1ed58b.js";const v={class:"w-full md:h-[90%] flex justify-center items-center"},g={key:0,class:"md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10 bg-white __shad shadow-gray-200 flex h-auto rounded p-8 justify-center flex-col"},x=n("p",{class:"text-gray-600 mb-3 text-sm"},"Remplissez le champ ci-bas pour enregister une nouvelle marque.",-1),y={class:"h-full w-full flex flex-col"},b={class:"w-full flex mt-3 justify-between"},w={key:1,class:"md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80 bg-white __shad shadow-gray-200 flex rounded justify-center flex-col"},P={__name:"AddMarks",setup(k){h();const a=r({}),s=r(""),m=r(!1);async function i(e){s.value=e.target.value}async function u(){const e=await p.create({name:s.value});e.type==="error"?a.value=e.data:e.type==="success"&&(a.value={},m.value=!0)}return(e,B)=>(l(),o("div",v,[m.value?(l(),o("div",w,[t(_,{path:"/admin/marks",title:"Enregitrement effectué !",message:"La marque a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas le supprimer définitivément."})])):(l(),o("div",g,[t(f,{title:"Ajout  d'une marque"}),x,n("form",y,[t(c,{onChange:i,type:"text",name:"name",label:"Nom de la marque",value:s.value,placeholder:"Entrez le nom de la marque",err:a.value.name},null,8,["value","err"])]),n("div",b,[t(d,{text:"Enregistrer",variant:"bg",design:"primary",onClick:u})])]))]))}};export{P as default};
