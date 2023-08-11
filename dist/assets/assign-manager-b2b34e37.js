import{T as y}from"./TextBox-7a965e88.js";import{_ as b,B as v,C as B,y as S,e as p,c as t,a as l,b as e,t as d,F as k,i as C,w as j,q as V,d as u,f as i,g as a,j as N}from"./index-4f0251ba.js";import{B as F}from"./ButtonLink-43715362.js";import{r as A}from"./FaceFrownIcon-bef8e4a9.js";import{P as I}from"./PagesNavigationHeader-c8c7004e.js";import{S as P}from"./SuccessComponent-d31b415f.js";import{u as T}from"./useVerify-b9fe02ca.js";import"./ArrowLeftIcon-5af96ac5.js";import"./XMarkIcon-ae1ed58b.js";const z={components:{ButtonLink:F,Button:v,TextBox:y,CheckCircleIcon:B,PagesNavigationHeader:I,SuccessComponent:P,FaceFrownIcon:A},mounted(){},setup(){return T("owner"),{prettyString:S}},data(){return{errors:{},name:"",promptSuccessBox:!1,loading:!1,searchBoxValue:"",showSearchBox:!1,users:[],user:{}}},mounted(){},methods:{chooseUser(s){this.searchBoxValue=s.name,this.showSearchBox=!1,this.user=s},async handleInput(s){this[s.target.name]=s.target.value},async handleSearchBox(s){if(s.target.value.length>2){this.showSearchBox=!0,this.loading=!0;const n=await p._search(s.target.value);this.users=Array.isArray(n.data)?n.data:[n.data]}else this.showSearchBox=!1;this.searchBoxValue=s.target.value,this.loading=!1},async onPressAssign(){(await p.assignManagerToBranch_({shop:this.$route.params.shop_id,branch:this.$route.params.id,user:this.user.id})).type==="success"&&(this.promptSuccessBox=!0)}}},H={class:"w-full md:h-[90%] flex justify-center items-center"},L={key:0,class:"lg:w-6/12 md:w-8/12 border w-11/12 md:mb-5 mb-3 mt-10 bg-white __shad shadow-gray-200 flex h-auto rounded p-8 justify-center flex-col"},E={class:"flex w-full my-2 justify-between items-center"},M=e("span",null,"Nom de la branche",-1),U={class:"font-semibold"},q=e("p",{class:"text-gray-600 mb-3 text-sm"},"Choisissez le manager a assossier a cette branche",-1),D={class:"h-full w-full flex flex-col"},G={class:"relative max-h-96 mt-1 border rounded p-1 w-full"},J=["value","placeholder"],K={key:0,"data-aos-duration":"300",class:"w-full shadow z-50 absolute top-10 rounded p-2 h-60 bg-white border left-0 mt-1"},O={key:0,class:"w-full animate-pulse"},Q=N('<div class="w-full flex justify-between mt-3 h-8"><span class="w-20 h-2 rounded bg-gray-300"></span><span class="w-5 h-2 rounded bg-gray-300"></span></div><div class="w-full flex justify-between h-8"><span class="w-32 h-2 rounded bg-gray-300"></span><span class="w-5 h-2 rounded bg-gray-300"></span></div><div class="w-full flex justify-between h-8"><span class="w-14 h-2 rounded bg-gray-300"></span><span class="w-5 h-2 rounded bg-gray-300"></span></div><div class="w-full flex justify-between h-8"><span class="w-40 h-2 rounded bg-gray-300"></span><span class="w-5 h-2 rounded bg-gray-300"></span></div><div class="w-full flex justify-between h-8"><span class="w-20 h-2 rounded bg-gray-300"></span><span class="w-5 h-2 rounded bg-gray-300"></span></div>',5),R=[Q],W={key:1,class:"w-full"},X=["onClick"],Y=u(),Z={key:2,class:"w-full h-full grid text-gray-600 place-items-center"},$={class:"w-fit flex flex-col items-center h-fit"},ee={class:"w-9/12 mx-auto text-center"},se=u("Aucun resultat pour ce nom d'utilisateur. Verifier l'orthographe ou "),te=u("créer d'abord cet utilisateur"),ae=u(" ."),oe={class:"w-full flex mt-3 justify-between"},ne={key:1,class:"md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80 bg-white __shad shadow-gray-200 flex rounded justify-center flex-col"};function re(s,n,le,h,o,c){var m;const f=i("PagesNavigationHeader"),g=i("FaceFrownIcon"),_=i("router-link"),w=i("Button"),x=i("SuccessComponent");return a(),t("div",H,[o.promptSuccessBox?(a(),t("div",ne,[l(x,{path:"/owner/branches/"+this.$route.params.id,title:"Assignement effectué !",message:"L'utilisateur a été assigné avec succès. Il a maintenant un role de gerant dans votre branche partout. Vous pouvez modifier ou annuler cette action apres.."},null,8,["path"])])):(a(),t("div",L,[l(f,{title:"Assigner un gerant a une branche"}),e("div",E,[M,e("span",U,d(h.prettyString(this.$route.params.name,!0)),1)]),q,e("form",D,[e("div",G,[e("input",{onInput:n[0]||(n[0]=(...r)=>c.handleSearchBox&&c.handleSearchBox(...r)),value:o.searchBoxValue,class:"h-8 w-full outline-none",placeholder:`Taper le nom du gerant à associer à ${h.prettyString(this.$route.params.name,!0)}`},null,40,J),o.showSearchBox?(a(),t("div",K,[o.loading?(a(),t("div",O,R)):!o.loading&&o.users.length>0?(a(),t("div",W,[(a(!0),t(k,null,C(o.users,r=>(a(),t("div",{onClick:()=>c.chooseUser(r),class:"w-full hover:bg-gray-100 cursor-pointer rounded p-1 flex justify-between",key:r.id},[e("span",null,d(r.name),1),Y,e("span",null,d(r.level),1)],8,X))),128))])):(a(),t("div",Z,[e("div",$,[l(g,{class:"h-16 w-16 mb-2"}),e("small",ee,[se,l(_,{class:"text-blue-600 font-semibold",to:"/register"},{default:j(()=>[te]),_:1}),ae])])]))])):V("",!0)])]),e("div",oe,[l(w,{text:"Enregistrer [ "+((m=o.user)==null?void 0:m.name)+" ] comme gerant",variant:"bg",design:"primary",onClick:c.onPressAssign},null,8,["text","onClick"])])]))])}const _e=b(z,[["render",re]]);export{_e as default};
