import{T as p}from"./TextBox-7a965e88.js";import{_ as d,B as f,C as h,c as n,a as o,b as l,f as s,g as a}from"./index-4f0251ba.js";import{B as _}from"./ButtonLink-43715362.js";import{L as g}from"./location-bd5000e1.js";import{P as x}from"./PagesNavigationHeader-c8c7004e.js";import{S as y}from"./SuccessComponent-d31b415f.js";import{u as v}from"./useVerify-b9fe02ca.js";import"./ArrowLeftIcon-5af96ac5.js";import"./XMarkIcon-ae1ed58b.js";const b={components:{ButtonLink:_,Button:f,TextBox:p,CheckCircleIcon:h,PagesNavigationHeader:x,SuccessComponent:y},data(){return{errors:{},name:"",country:"",promptSuccessBox:!1}},setup(){v()},methods:{async handleInput(e){this[e.target.name]=e.target.value},async onPressCreate(){const e=await g.create(this.name,this.country);console.log(e.type),e.type==="error"?this.errors=e.data:e.type==="success"&&(this.errors={},this.promptSuccessBox=!0)}}},w={class:"w-full md:h-[90%] flex justify-center items-center"},B={key:0,class:"md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10 bg-white __shad shadow-gray-200 flex h-auto rounded p-8 justify-center flex-col"},C=l("p",{class:"text-gray-600 mb-3 text-sm"},"Remplissez le champ ci-bas pour enregister une nouvelle ville.",-1),N={class:"h-full w-full flex flex-col"},k={class:"w-full flex mt-3 justify-between"},S={key:1,class:"md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80 bg-white __shad shadow-gray-200 flex rounded justify-center flex-col"};function P(e,j,T,E,t,r){const i=s("PagesNavigationHeader"),c=s("TextBox"),m=s("Button"),u=s("SuccessComponent");return a(),n("div",w,[t.promptSuccessBox?(a(),n("div",S,[o(u,{path:"/admin/towns",title:"Enregitrement effectué !",message:"La ville a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas la supprimer définitivément."})])):(a(),n("div",B,[o(i,{title:"Ajout  d'une ville"}),C,l("form",N,[o(c,{onChange:r.handleInput,type:"text",name:"name",label:"Nom de la ville",value:t.name,placeholder:"Nom de la ville",err:t.errors.name},null,8,["onChange","value","err"]),o(c,{onChange:r.handleInput,type:"text",name:"country",label:"Nom du pays",value:t.country,placeholder:"Nom du pays",err:t.errors.country},null,8,["onChange","value","err"])]),l("div",k,[o(m,{text:"Enregistrer",variant:"bg",design:"primary",onClick:r.onPressCreate},null,8,["onClick"])])]))])}const F=d(b,[["render",P]]);export{F as default};
