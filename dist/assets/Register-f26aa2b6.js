import{T as w}from"./TextBox-7a965e88.js";import{B as v}from"./ButtonLink-43715362.js";import{_ as y,L as C,e as u,c,a as s,b as e,w as m,F as b,d,f as r,g as i}from"./index-4f0251ba.js";import{R as B}from"./ReusableHeader-d460a56a.js";import{r as k}from"./CheckCircleIcon-fc1bb9cf.js";const j="/assets/register-73ff05fa.jpg",L={components:{TextBox:w,ButtonLink:v,CheckCircleIcon:k,ReusableHeader:B,BlueButtons:C},data(){return{name:"",email:"",phone:"",password:"",address:"",showSuccessPanel:!1,secondAddr:"",errors:{}}},methods:{handleChange(t){const o=t.target.name;this[o]=t.target.value},async continueToLogin(){const t=await u.login(this.email,this.password);t.type==="error"?this.errors=t.data:t.type==="success"&&(localStorage.setItem("logged_in_user",JSON.stringify(t)),localStorage.setItem("logged_in_type",t.data.type),this.redirectMe(t.data.type.toLowerCase()))},async onPressRegister(){const t={name:this.name,email:this.email,phone:this.phone,password:this.password,address:this.address},o=await u.register(t);o.type==="success"&&(this.showSuccessPanel=!0),o.type==="error"&&(this.errors=o.data)},redirectMe(t){t==="normal"?this.$router.push("/dashboard"):t==="owner"&&this.$router.push("/owner/dashboard")}}},S={class:"w-11/12 mx-auto flex justify-center items-center md:h-[650px]"},T={key:0,"data-aos":"slide-up","data-aos-duration":"500",class:"md:w-8/12 w-full overflow-hidden __shad flex md:flex-row flex-col justify-between items-center h-96 md:h-[60%] rounded-lg border"},V={class:"md:w-6/12 w-full h-[50%] flex md:h-full bg-green-500 md:p-8 p-6 justify-center items-center flex-col"},R=e("h1",{class:"font-semibold text-2xl text-white mt-3"},"Création éffectuée.",-1),P={class:"md:w-6/12 w-full h-[50%] flex items-center flex-col justify-center md:h-full"},E=e("span",{class:"text-gray-800 text-center md:w-11/12 w-10/12"},"La création de votre compte a été éffectuée avec succès. Vous pouvez maintenant profitez de services de muyisphère en tant qu'utilisateur simple.",-1),I={key:1,"data-aos":"slide-up","data-aos-duration":"500",class:"md:w-10/12 w-full flex justify-between items-center h-[90%] rounded-lg border"},N={class:"md:w-7/12 flex h-[85%] md:p-6 p-4 justify-center flex-col"},z=e("h1",{class:"font-semibold text-2xl text-blue-600 mb-1"},"Créer un compte.",-1),M=e("p",{class:"text-gray-700 text-sm"},"Saisissez les informations demadées ci-bas pour créer un compte de vendeur ou d'acheteur sur notre plateforme. ",-1),H={class:"h-full w-full flex flex-col"},A={class:"w-full flex md:space-x-1 flex-col md:flex-row justify-between"},F={class:"w-full flex md:space-x-1 flex-col md:flex-row justify-between"},q={class:"md:w-9/12"},J={class:"md:w-9/12"},O={class:"mb-2 text-sm"},D=d("En créant un compte, vous acceptez "),G=e("span",{class:"text-blue-600"},"les conditions générales de vente",-1),K=d(" de muyiSphere."),Q={class:"w-full items-center my-3 flex justify-between"},U=d(" Enregistrer "),W=e("div",{class:"w-5/12 md:flex hidden items-center justify-center h-full"},[e("img",{src:j,alt:"Register image illustration",class:"h-[430px] w-[430px] object-cover"})],-1);function X(t,o,Y,Z,a,n){const p=r("ReusableHeader"),h=r("CheckCircleIcon"),l=r("TextBox"),f=r("router-link"),_=r("ButtonLink"),x=r("BlueButtons");return i(),c(b,null,[s(p,{title:"Créer un compte client"}),e("div",S,[a.showSuccessPanel?(i(),c("div",T,[e("div",V,[s(h,{class:"w-20 h-20 text-white"}),R]),e("div",P,[E,e("span",{onClick:o[0]||(o[0]=(...g)=>n.continueToLogin&&n.continueToLogin(...g)),class:"bg-green-500 shadow-green-300 shadow-lg px-2 py-1.5 mt-5 hover:bg-green-600 rounded text-white cursor-pointer text-lg"},"Continuer")])])):(i(),c("div",I,[e("div",N,[z,M,e("form",H,[e("div",A,[s(l,{onChange:n.handleChange,label:"Nom",type:"text",name:"name",placeholder:"Votre nom",value:this.name,err:a.errors.name},null,8,["onChange","value","err"])]),e("div",F,[s(l,{onChange:n.handleChange,label:"Email",type:"email",name:"email",placeholder:"Votre Email",value:this.email,err:a.errors.email},null,8,["onChange","value","err"]),s(l,{onChange:n.handleChange,label:"Téléphone",type:"tel",name:"phone",placeholder:"Votre numéro de téléphone",value:this.phone,err:a.errors.phone},null,8,["onChange","value","err"])]),e("div",q,[s(l,{onChange:n.handleChange,label:"Mot de passe",type:"text",name:"password",placeholder:"Votre Mot de passe",value:this.password,err:a.errors.password},null,8,["onChange","value","err"])]),e("div",J,[s(l,{onChange:n.handleChange,label:"Addresse",name:"address",type:"text",placeholder:"Votre premiere addresse",value:this.address},null,8,["onChange","value"])])]),e("p",O,[D,s(f,{to:"/term-of-use"},{default:m(()=>[G]),_:1}),K]),e("div",Q,[s(_,{text:"Se connecter",path:"/login",variant:"default"}),s(x,{onPress:n.onPressRegister},{default:m(()=>[U,s(h,{class:"w-5 h-5 ml-1"})]),_:1},8,["onPress"])])]),W]))])],64)}const ne=y(L,[["render",X]]);export{ne as default};
