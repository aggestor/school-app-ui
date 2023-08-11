import{T as d}from"./TextBox-7a965e88.js";import{_ as p,B as h,C as f,E as _,c as n,a as s,b as l,f as o,g as i}from"./index-4f0251ba.js";import{B as g}from"./ButtonLink-43715362.js";import{P as x}from"./PagesNavigationHeader-c8c7004e.js";import{S as v}from"./SuccessComponent-d31b415f.js";import{u as y}from"./useVerify-b9fe02ca.js";import"./ArrowLeftIcon-5af96ac5.js";import"./XMarkIcon-ae1ed58b.js";const w={components:{ButtonLink:g,Button:h,TextBox:d,CheckCircleIcon:f,PagesNavigationHeader:x,SuccessComponent:v},data(){return{email:"",password:"",errors:{},name:"",promptSuccessBox:!1}},setup(){y("Admin")},methods:{async handleInput(e){this[e.target.name]=e.target.value},async onPressRegister(){const e=await _.register({name:this.name,email:this.email,password:this.password});e.type==="error"?this.errors=e.data:e.type==="success"?(this.errors={},this.promptSuccessBox=!0):e.type==="auth"&&(localStorage.removeItem("admin"),this.$router.push("/admin/login"))}}},b={class:"w-full md:h-[500px] flex justify-center items-center"},B={key:0,class:"md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10 bg-white __shad shadow-gray-200 flex h-auto rounded p-8 justify-center flex-col"},C=l("p",{class:"text-gray-600 mb-3 text-sm"},"Remplissez le formulaire ci-bas pour l'enregistrement d'un nouvel administrateur.",-1),k={class:"h-full w-full flex flex-col"},I={class:"w-full flex mt-3 justify-between"},S={key:1,class:"md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80 bg-white __shad shadow-gray-200 flex rounded justify-center flex-col"};function E(e,N,P,V,t,r){const m=o("PagesNavigationHeader"),a=o("TextBox"),c=o("Button"),u=o("SuccessComponent");return i(),n("div",b,[t.promptSuccessBox?(i(),n("div",S,[s(u,{path:"/admin/type",title:"Enregitrement effectué !",message:"Le nouveau administrateur a été enregistré avec succès. Il peut maintenant faire toutes les operations en tant que administrateur."})])):(i(),n("div",B,[s(m,{title:"Inscrption administrateur"}),C,l("form",k,[s(a,{onChange:r.handleInput,type:"text",name:"name",label:"Noms",value:t.name,placeholder:"Votre nom",err:t.errors.name},null,8,["onChange","value","err"]),s(a,{onChange:r.handleInput,type:"text",name:"email",label:"Addresse Email",value:t.email,placeholder:"Votre Email",err:t.errors.email},null,8,["onChange","value","err"]),s(a,{onChange:r.handleInput,type:"text",name:"password",label:"Mot de passe",value:t.password,placeholder:"Votre Mot de passe",err:t.errors.password},null,8,["onChange","value","err"])]),l("div",I,[s(c,{text:"Enregistrer",variant:"bg",design:"primary",onClick:r.onPressRegister},null,8,["onClick"])])]))])}const z=p(w,[["render",E]]);export{z as default};
