import{T as g}from"./TextBox-7a965e88.js";import{_ as f,B as x,C as y,c as l,a as r,b as d,f as i,g as m}from"./index-4f0251ba.js";import{B as _}from"./ButtonLink-43715362.js";import{C}from"./category-855ddfae.js";import{P as v}from"./PagesNavigationHeader-c8c7004e.js";import{E as B}from"./extension-6b58ca39.js";import{T as b}from"./type-e63f604b.js";import{S as w}from"./SuccessComponent-d31b415f.js";import{u as I}from"./useVerify-b9fe02ca.js";import"./ArrowLeftIcon-5af96ac5.js";import"./XMarkIcon-ae1ed58b.js";const E={components:{ButtonLink:_,Button:x,TextBox:g,CheckCircleIcon:y,PagesNavigationHeader:v,SuccessComponent:w},setup(){I()},data(){return{errors:{},name:"",category:"",catId:0,extId:0,extension:"",promptSuccessBox:!1,categories:[],extensions:[],transpiledCat:[],transpiledExt:[]}},mounted(){this.getCategories()},watch:{category(e){const t=this.categories.filter(a=>a.name==e)[0];t&&(this.catId=t.id)}},methods:{async handleInput(e){if(this[e.target.name]=e.target.value,e.target.name==="category"){if(e.target.value.length>=2){const t=this.categories.filter(a=>a.name===e.target.value);t&&(this.findExtensionsBy(t[0].id),this.catId=t[0].id)}}else if(e.target.name==="extension"){const t=this.extensions.filter(a=>a.ext_name===e.target.value);t&&(this.extId=t[0].ext_id)}},async onPressCreate(){const e=await b.create({name:this.name,category:this.catId,extension:this.extId});e.type==="error"?this.errors=e.data:e.type==="success"&&(this.errors={},this.promptSuccessBox=!0)},async getCategories(){const e=await C.getAll();e.data.forEach(t=>{this.transpiledCat.push({key:t.id,value:t.name})}),this.categories=e.data},async findExtensionsBy(e){const t=await B.getAllByCategory(e),a=[];if(t.type==="success"){let o=null;Array.isArray(t.data)?o=t.data:o=[t.data],o.forEach(s=>{a.push({key:s.ext_id,value:s.ext_name})}),this.transpiledExt=a,this.extensions=o}}}},k={class:"w-full md:h-[90%] flex justify-center items-center"},N={key:0,class:"md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10 bg-white __shad shadow-gray-200 flex h-auto rounded p-8 justify-center flex-col"},S=d("p",{class:"text-gray-600 mb-3 text-sm"},"Remplissez le champ ci-bas pour enregister un nouveau type.",-1),T={class:"h-full w-full flex flex-col"},A={class:"w-full flex mt-3 justify-between"},P={key:1,class:"md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80 bg-white __shad shadow-gray-200 flex rounded justify-center flex-col"};function j(e,t,a,o,s,n){const u=i("PagesNavigationHeader"),c=i("TextBox"),p=i("Button"),h=i("SuccessComponent");return m(),l("div",k,[s.promptSuccessBox?(m(),l("div",P,[r(h,{path:"/admin/types",title:"Enregitrement effectué !",message:"Le type a été enregistrée avec succès. Il est maintenant utilisable partout. Vous pouvez le modifier mais pas le supprimer définitivément."})])):(m(),l("div",N,[r(u,{title:"Ajouter un type"}),S,d("form",T,[r(c,{onChange:n.handleInput,type:"text",name:"name",label:"Nom du type",value:s.name,placeholder:"Nom du type",err:s.errors.name},null,8,["onChange","value","err"]),r(c,{list:"category",items:s.transpiledCat,onChange:n.handleInput,type:"text",name:"category",label:"Choisir la catégorie",value:s.category,placeholder:"Choisir la catégorie",err:s.errors.category},null,8,["items","onChange","value","err"]),r(c,{list:"extension",items:s.transpiledExt,onChange:n.handleInput,type:"text",name:"extension",label:"Choisir l'extension",value:s.extension,placeholder:"Choisir la catégorie",err:s.errors.category},null,8,["items","onChange","value","err"])]),d("div",A,[r(p,{text:"Enregistrer",variant:"bg",design:"primary",onClick:n.onPressCreate},null,8,["onClick"])])]))])}const M=f(E,[["render",j]]);export{M as default};
