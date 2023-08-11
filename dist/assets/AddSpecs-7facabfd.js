import{T as v}from"./TextBox-7a965e88.js";import{_ as C,B,C as w,c as n,a as i,b as f,w as d,f as l,g as o,F as p,i as u,t as h}from"./index-4f0251ba.js";import{B as b}from"./ButtonLink-43715362.js";import{C as I}from"./category-855ddfae.js";import{P as k}from"./PagesNavigationHeader-c8c7004e.js";import{T as A}from"./type-e63f604b.js";import{S as E}from"./spec-4e36dad5.js";import{E as S}from"./extension-6b58ca39.js";import{S as T}from"./SuccessComponent-d31b415f.js";import{D as N}from"./Datalist-67627a9c.js";import{R as D}from"./ReusableHeader-d460a56a.js";import"./ArrowLeftIcon-5af96ac5.js";import"./XMarkIcon-ae1ed58b.js";const P={components:{ButtonLink:b,Button:B,TextBox:v,CheckCircleIcon:w,PagesNavigationHeader:k,SuccessComponent:T,Datalist:N,ReusableHeader:D},data(){return{errors:{},name:"",category:"",catId:0,extId:0,typId:0,type:"",types:[],extension:"",promptSuccessBox:!1,categories:[],extensions:[]}},mounted(){this.getCategories()},watch:{category(t){const e=this.categories.filter(r=>r.name==t)[0];e&&(this.catId=e.id)}},methods:{async handleInput(t){if(this[t.target.name]=t.target.value,t.target.name==="category"){if(t.target.value.length>=2){const e=this.categories.filter(r=>r.name===t.target.value);e[0]&&(console.log(e[0]),this.findExtensionsBy(e[0].id),this.catId=e[0].id)}}else if(t.target.name==="extension"){const e=this.extensions.filter(r=>r.ext_name===t.target.value);console.log(e),e&&(this.findTypeByExtension(e[0].ext_id),this.extId=e[0].ext_id)}else if(t.target.name==="type"){const e=this.types.filter(r=>r.typ_name===t.target.value);e[0]&&(this.typId=e[0].typ_id)}},async onPressCreate(){const t=await E.create({name:this.name,category:this.catId,extension:this.extId,type:this.typId});t.type==="error"?this.errors=t.data:t.type==="success"&&(this.errors={},this.promptSuccessBox=!0)},async getCategories(){const t=await I.getAll();this.categories=Array.isArray(t.data)?t.data:[t.data]},async findExtensionsBy(t){const e=await S.getAllByCategory(t);e.type==="success"&&(this.extensions=Array.isArray(e.data)?e.data:[e.data])},async findTypeByExtension(t){const e=await A.getAllByExtension(t);e.type==="success"&&(this.types=Array.isArray(e.data)?e.data:[e.data])}}},j={class:"w-full md:h-[90%] flex justify-center items-center"},H={key:0,class:"md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10 bg-white __shad shadow-gray-200 flex h-auto rounded p-8 justify-center flex-col"},L=f("p",{class:"text-gray-600 mb-3 text-sm"},"Remplissez le champ ci-bas pour enregister une spécification.",-1),R={class:"h-full w-full flex flex-col"},V=["value"],z=["value"],F=["value"],q={class:"w-full flex mt-3 justify-between"},G={key:1,class:"md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80 bg-white __shad shadow-gray-200 flex rounded justify-center flex-col"};function J(t,e,r,K,s,c){const y=l("PagesNavigationHeader"),g=l("TextBox"),m=l("Datalist"),_=l("Button"),x=l("SuccessComponent");return o(),n("div",j,[s.promptSuccessBox?(o(),n("div",G,[i(x,{path:"/admin/specifications/all",title:"Enregitrement effectué !",message:"La spécification a été enregistrée avec succès. Elle est est maintenant utilisable partout. Vous pouvez la modifier mais pas le supprimer définitivément."})])):(o(),n("div",H,[i(y,{title:"Ajout  d'une spécification"}),L,f("form",R,[i(g,{onChange:c.handleInput,type:"text",name:"name",label:"Nom de la specification",value:s.name,placeholder:"Nom de la specification",err:s.errors.name},null,8,["onChange","value","err"]),i(m,{onChange:c.handleInput,name:"category",value:s.category,placeholder:"Choisir la catégorie",err:s.errors.category},{default:d(()=>[(o(!0),n(p,null,u(s.categories,a=>(o(),n("option",{value:a.name,key:a.id},h(a.name),9,V))),128))]),_:1},8,["onChange","value","err"]),i(m,{onChange:c.handleInput,name:"extension",value:s.extension,placeholder:"Choisir l'extension",err:s.errors.model},{default:d(()=>[(o(!0),n(p,null,u(s.extensions,a=>(o(),n("option",{value:a.ext_name,key:a.ext_name},h(a.ext_name),9,z))),128))]),_:1},8,["onChange","value","err"]),i(m,{onChange:c.handleInput,name:"type",value:s.type,placeholder:"Choisir le type",err:s.errors.model},{default:d(()=>[(o(!0),n(p,null,u(s.types,a=>(o(),n("option",{value:a.typ_name,key:a.typ_name},h(a.typ_name),9,F))),128))]),_:1},8,["onChange","value","err"])]),f("div",q,[i(_,{text:"Enregistrer",variant:"bg",design:"primary",onClick:c.onPressCreate},null,8,["onClick"])])]))])}const ne=C(P,[["render",J]]);export{ne as default};
