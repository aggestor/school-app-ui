<template>
    <ReusableHeader title="Modifier votre compte"/>
<div class="w-11/12 mx-auto flex justify-center items-center h-[500px]">

    <div v-if="showSuccessPanel" class="md:w-7/12 w-11/12 h-auto border rounded md:h-80">
        <SuccessComponent  title="Modification effectuee" message="La modification de votre a ete effectuee. Les nouvelles informations sont maintenant visible publiquement." path="/owner/profile"/>
    </div>
    <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-10/12 w-full flex justify-between items-center h-[80%] bg-white rounded-lg border">
        <div class="md:w-7/12 flex h-[80%] md:p-6 p-4  justify-center flex-col" >
            <h1 class="font-semibold text-2xl text-blue-600 mb-3">Modifier votre compte</h1>
            <form class="h-full w-full flex flex-col">
                <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">
                    <TextBox  :onChange="handleChange" label="Nom" type="text" name="name" placeholder="Votre nom" :value="this.name" :err="errors.name"/>
                </div>
                <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">
                <TextBox :onChange="handleChange" label="Email"  type="email" name="email" placeholder="Votre Email" :value="this.email" :err="errors.email"/>
                <TextBox :onChange="handleChange" label="Téléphone" type="tel" name="phone" placeholder="Votre numéro de téléphone" :value="this.phone" :err="errors.phone"/>
                </div>
                <div class="md:w-9/12">
                    <TextBox :onChange="handleChange" label="Addresse" name="address" type="text"  placeholder="Votre premiere addresse" :value="this.address"/>
                </div>
                <div>
                    <router-link class="text-blue-600 underline" to="/owner/update/password">
                        Modifier votre mot de passe
                    </router-link>
                </div>
                <input @change="handleChooseImage" type="file" hidden accept="image/jpeg,image/png" ref="profile_pic">
            </form>
            <div class="w-full items-center my-3 flex  justify-between">
                <Button text='Enregistrer les modifications' variant="bg" design="primary" :onClick="onPressRegister"/>
            </div>
        </div>
        <div class="w-5/12 md:flex hidden items-center justify-center h-full">
            <div class="w-44 h-44 border relative grid place-items-center rounded-full">
                <img :src="image" class="w-full h-full  rounded-full object-cover"/>
                <span @click="chooseImage" class="w-7 h-7 bg-blue-600 hover:bg-blue-700 hover:shadow-lg transition-colors duration-500 hover:shadow-blue-300 text-white grid place-items-center rounded cursor-pointer absolute left-[70px] -bottom-3"><PlusCircleIcon class="w-5 h-5"/></span>

            </div>
        </div>
    </div>
</div>
  
</template>

<script>

import TextBox from "../../components/TextBox.vue"
import ButtonLink from "../../components/ButtonLink.vue";
import Button from "../../components/Button.vue";
import User from "../../api/user";
import ReusableHeader from "@/components/ReusableHeader.vue"
import {CheckCircleIcon, PlusCircleIcon} from "@heroicons/vue/24/outline"
import useVerify from "../../hooks/useVerify";
import SuccessComponent from "../../components/SuccessComponent.vue"
import { store } from "../../api";
export default {
    components: {
    TextBox,
    ButtonLink,
    Button,
    CheckCircleIcon,
    ReusableHeader,
    PlusCircleIcon,
    SuccessComponent
},
    data() {
        return {
            name: "",
            email: '',
            phone: "",
            password: "",
            address: "",
            showSuccessPanel: false,
            secondAddr: "",
            errors: {},
            id:"",
            oldImage:"",
            imageFile:null,
            image: "/images/placeholder.jpg"
        }
    },
    setup(){
        useVerify()
    },
    mounted(){
        const u = JSON.parse(localStorage.getItem("logged_in_user"))
        let id = ""
        if(!u){
            id = this.$route.params.id
        }else{
            id = u.data.id
        }
        console.log(id);
        this.getUser(id)
    },
    methods: {
        handleChange(e) {
            const target = e.target.name
            this[target] = e.target.value
        },
        handleChooseImage(e){
            this.image = URL.createObjectURL(e.target.files[0])
            this.imageFile = e.target.files[0]
        },
        async continueAction() {
                this.$router.push('/owner/profile')
        },
        async onPressRegister() {
            const user = {
                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address,
                id:this.id,
                image:this.imageFile,
                oldImage:this.oldImage
            }
            const result = await User.update(user)
            if (result.type === "success") {
                this.showSuccessPanel = true
            }
            if(result.type === 'error'){
                this.errors = result.data
            }
        },
        chooseImage(){
            this.$refs['profile_pic'].click()
        },
        async getUser(id){
            const result = await User.getUser(id)
            if(result.type === "success"){
                this.name = result.data.name
                this.user = result.data
                this.email = result.data.email
                this.phone = result.data.mobile
                this.address = result.data.address
                this.id = result.data.id
                if(result.data.picture !== '/placeholder.jpg'){
                    this.oldImage = result.data.picture
                    this.image = store+'/users/'+result.data.picture
                }
            }
        }
    }

}
</script>
