import{r as w}from"./PlusCircleIcon-d060796b.js";import{G as x}from"./GoBackAdminButton-a12efcb1.js";import{k as n,l as $,m as g,n as k,_ as c,g as r,c as i,b as e,a as o,w as v,d as a,f as t}from"./index-4f0251ba.js";import{r as B}from"./PhoneIcon-b7b5cd97.js";import"./ArrowLeftIcon-5af96ac5.js";const C="/assets/9-4fc5898b.png",I=n({setup(){console.log("ok")},components:{UserIcon:$,EnvelopeIcon:g,PhoneIcon:B,HomeModernIcon:k}}),O={class:"h-80 m-1 w-[500px] border relative overflow-hidden rounded"},y=e("div",{class:"h-full w-full"},[e("img",{src:C,class:"w-full h-full object-cover"})],-1),G=e("div",{class:"mt-3 w-full absolute text-sm bg-black bg-opacity-20 backdrop-blur text-white bottom-3 p-2"}," Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis debitis id maxime doloremque commodi saepe neque asperiores aliquam exercitationem... ",-1),j=[y,G];function A(l,d,_,m,p,u){return r(),i("div",O,j)}const P=c(I,[["render",A]]),q=n({setup(){console.log("ok")},components:{SliderCardOnOwner:P,PlusCircleIcon:w,GoBackAdminButton:x}}),N={class:"w-full h-full"},S={class:"w-[95%] mx-auto h-full"},V={class:"w-full flex justify-between items-end pb-2 border-b h-16"},E={class:"text-lg text-gray-700 font-semibold flex"},L=a(),H=e("span",{class:"ml-2"}," Liste de tous les gérants de vos branches",-1),M={class:"flex w-fit items-center"},T=e("span",{class:"h-8 w-8 font-semibold grid place-items-center bg-gray-200 rounded mr-2"},"16",-1),U={class:"bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"},z=a(" Ajouter "),D={class:"flex mt-5 flex-wrap"};function F(l,d,_,m,p,u){const f=t("GoBackAdminButton"),h=t("PlusCircleIcon"),b=t("router-link"),s=t("SliderCardOnOwner");return r(),i("section",N,[e("div",S,[e("div",V,[e("h1",E,[o(f),L,H]),e("span",M,[T,o(b,{to:"/owner/managers/add"},{default:v(()=>[e("span",U,[z,o(h,{class:"w-6 h-6"})])]),_:1})])]),e("div",D,[o(s),o(s),o(s),o(s),o(s),o(s)])])])}const X=c(q,[["render",F]]);export{X as default};
