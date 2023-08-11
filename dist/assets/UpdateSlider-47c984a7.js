import{T as S}from"./TextBox-7a965e88.js";import{_ as k,B as C,C as B,y as P,s as j,c as a,b as s,a as n,t as d,q as m,v as V,F as A,i as F,w as L,d as h,f as l,g as o}from"./index-4f0251ba.js";import{D as N}from"./DatePicker-966235d0.js";import{B as D}from"./ButtonLink-43715362.js";import{r as T}from"./FaceFrownIcon-bef8e4a9.js";import{r as z}from"./PhotoIcon-a21ae8ef.js";import{r as R}from"./PlusCircleIcon-776f3ae5.js";import{P as q}from"./PagesNavigationHeader-c8c7004e.js";import{S as p}from"./slider-49381a67.js";import{S as E}from"./shop-37c8544f.js";import{S as H}from"./SuccessComponent-d31b415f.js";import"./ArrowLeftIcon-5af96ac5.js";import"./XMarkIcon-ae1ed58b.js";const U={components:{ButtonLink:D,Button:C,TextBox:S,CheckCircleIcon:B,PagesNavigationHeader:q,SuccessComponent:H,FaceFrownIcon:T,PhotoIcon:z,PlusCircleIcon:R,DatePicker:N},data(){return{errors:{},name:"",duration:0,shopId:0,extId:0,extension:"",promptSuccessBox:!1,shops:[],shopValue:"",loading:!1,image:"",youtube:"",sliderId:"",date:"",fileImage:void 0,oldImage:"",showSuggestionsBox:!1}},mounted(){this.getSlider()},methods:{async handleInput(e){this[e.target.name]=e.target.value},async onPressCreate(){const e=await p.update({id:this.sliderId,oldImage:this.oldImage,name:this.name,duration:this.duration,shop:this.shopId,youtube:this.youtube,image:this.fileImage,date:this.date});e.type==="error"?this.errors=e.data:e.type==="success"&&(this.errors={},this.promptSuccessBox=!0)},async loadImage(e){this.image=URL.createObjectURL(e.target.files[0]),this.fileImage=e.target.files[0]},handleLoadImage(){this.$refs.input.click()},async handleSearchShop(e){if(this.shopValue=e.target.value,e.target.value.length>1){this.showSuggestionsBox=!0,this.loading=!0;const i=await E.search(P(e.target.value));i.type=="success"&&(Array.isArray(i.data)?this.shops=i.data:this.shops=[i.data]),this.loading=!1}},chooseShop(e){this.shopId=e.id,this.shopValue=e.name,this.showSuggestionsBox=!1},async getSlider(){const e=await p.get(this.$route.params.id);e.type==="success"&&(this.shopValue=e.data.shop_name,this.shopId=e.data.shop_id,this.duration=e.data.duration,this.name=e.data.slider_name,this.youtube=e.data.youtube,this.date=e.data.start_time.split(" ")[0],this.image=j+"/sliders/"+e.data.thumbnail,this.oldImage=e.data.thumbnail,this.sliderId=e.data.slider_id)}}},M={class:"mt-6"},O={class:"w-full md:h-full flex justify-center items-center"},G={key:0,class:"md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10 bg-white __shad shadow-gray-200 flex h-auto rounded p-8 justify-center flex-col"},J=s("p",{class:"text-gray-600 mb-3 text-sm"},"Remplissez le formulaire ci-bas pour enregister un nouveau carrousel.",-1),K={class:"h-full w-full flex flex-col"},Q={class:"mb-3 md:w-full flex flex-col items-center justify-center h-full"},W={class:"h-40 w-full relative flex justify-center items-center rounded border"},X={key:0,class:"flex justify-center flex-col items-center"},Y=s("span",null,"Ajouter une photo",-1),Z={class:"text-red-500 mt-1 text-sm"},$={key:1,class:"w-full h-full p-2"},ee=["src"],te={class:"absolute -bottom-5 h-10 w-10"},se={key:0,class:"text-red-500 mt-2 text-sm"},oe={class:"w-full mx-auto"},re={class:"relative max-h-96 mt-1 border rounded p-1 w-full"},ae=["value"],ne={key:0,"data-aos-duration":"300",class:"w-full shadow z-50 absolute top-10 rounded p-2 h-60 bg-white border left-0 mt-1"},le={key:1,class:"w-full"},ie=["onClick"],ce={key:2,class:"w-full h-full grid text-gray-600 place-items-center"},ue={class:"w-fit flex flex-col items-center h-fit"},de={class:"w-9/12 mx-auto text-center"},he=h("Aucun resultat pour ce nom de shop. Verifier l'orthographe ou "),me=h("créer d'abord ce shop"),pe=h(" ."),fe={class:"w-full flex mt-3 justify-between"},_e={key:1,class:"md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80 bg-white __shad shadow-gray-200 flex rounded justify-center flex-col"};function ge(e,i,ye,xe,t,r){const f=l("PagesNavigationHeader"),_=l("PhotoIcon"),g=l("PlusCircleIcon"),y=l("SearchSkeltonAnimation"),x=l("FaceFrownIcon"),v=l("router-link"),u=l("TextBox"),b=l("DatePicker"),w=l("Button"),I=l("SuccessComponent");return o(),a("div",M,[s("div",O,[t.promptSuccessBox?(o(),a("div",_e,[n(I,{path:"/admin/sliders",title:"Enregitrement effectué !",message:"Le carousel a été enregistré avec succès. Il est maintenant utilisable partout. Il sera visible dans la durée que vous avez donné à partir du moment que vous avez configuré."})])):(o(),a("div",G,[n(f,{title:"Modifier un carrousel"}),J,s("form",K,[s("div",Q,[s("div",W,[t.image?(o(),a("div",$,[s("img",{src:t.image,class:"h-full w-full object-cover",alt:"Company logo"},null,8,ee)])):(o(),a("div",X,[n(_,{class:"h-16 cursor-pointer w-16 text-gray-500"}),Y,s("span",Z,d(t.errors.image),1)])),s("div",te,[n(g,{onClick:r.handleLoadImage,class:"h-8 hover:text-gray-400 w-8 cursor-pointer text-gray-500"},null,8,["onClick"])])]),t.image?(o(),a("span",se,d(t.errors.image),1)):m("",!0)]),s("div",oe,[s("div",re,[s("input",{onInput:i[0]||(i[0]=(...c)=>r.handleSearchShop&&r.handleSearchShop(...c)),value:t.shopValue,class:"h-8 w-full outline-none",placeholder:"Rechercher un shop"},null,40,ae),t.showSuggestionsBox?(o(),a("div",ne,[t.loading?(o(),V(y,{key:0})):!t.loading&&Array.isArray(t.shops)?(o(),a("div",le,[(o(!0),a(A,null,F(t.shops,c=>(o(),a("div",{onClick:()=>r.chooseShop(c),class:"w-full hover:bg-gray-100 cursor-pointer rounded p-1 flex justify-between",key:c.id},[s("span",null,d(c.name),1)],8,ie))),128))])):(o(),a("div",ce,[s("div",ue,[n(x,{class:"h-16 w-16 mb-2"}),s("small",de,[he,n(v,{class:"text-blue-600 font-semibold",to:"/admin/shops/new"},{default:L(()=>[me]),_:1}),pe])])]))])):m("",!0)])]),s("input",{hidden:"",ref:"input",type:"file",name:"file",onChange:i[1]||(i[1]=(...c)=>r.loadImage&&r.loadImage(...c))},null,544),n(u,{onChange:r.handleInput,type:"text",name:"name",label:"Titre du carousel",value:t.name,err:t.errors.name},null,8,["onChange","value","err"]),n(u,{list:"duration",onChange:r.handleInput,type:"number",name:"duration",label:"Nombre de jours",value:t.duration,err:t.errors.duration},null,8,["onChange","value","err"]),n(u,{list:"youtube",onChange:r.handleInput,type:"text",name:"youtube",label:"Lien youtube(facultatif)",value:t.youtube,err:t.errors.youtube},null,8,["onChange","value","err"]),n(b,{name:"date",value:t.date,event:r.handleInput,label:"Date de début",err:t.errors.date},null,8,["value","event","err"])]),s("div",fe,[n(w,{text:"Enregistrer",variant:"bg",design:"primary",onClick:r.onPressCreate},null,8,["onClick"])])]))])])}const Le=k(U,[["render",ge]]);export{Le as default};
