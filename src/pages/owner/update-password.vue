<template>
    <ReusableHeader title="Modifier votre compte"/>
<div class="w-11/12 mx-auto flex justify-center items-center h-[500px]">

    <div v-if="showSuccessPanel" class="md:w-7/12 w-11/12 h-auto border rounded md:h-80">
        <SuccessComponent  title="Mot de passe modifie" message="La modification de votre mot de passe a ete effectuee.Vous utliserez desormain le nouveau mot de passe." path="/owner/profile"/>
    </div>
    <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-10/12 w-full flex justify-between items-center h-[80%] rounded-lg border">
        <div class="md:w-7/12 flex h-[80%] md:p-6 p-4  justify-center flex-col" >
            <h1 class="font-semibold text-2xl text-blue-600 mb-3">Modifer votre mot de passe.</h1>
            <form class="h-full w-full flex flex-col">
                <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">
                    <TextBox  :onChange="handleChange" label="Ancien mot de passe" type="password" name="oldPassword" placeholder="Votre ancien mot de passe" :value="name" :err="errors.oldPassword"/>
                </div>
                <div class="md:w-full">
                    <TextBox :onChange="handleChange" label="Nouveau mot de passe" name="newPassword" type="text"  placeholder="Votre nouveau mot de passe" :value="newPassword" :err="errors.newPassword"/>
                </div>
                <div class="md:w-full">
                    <TextBox :onChange="handleChange" label="Confirmer mot de passe" name="confirmPassword" type="password"  placeholder="Votre nouveau mot de passe" :value="confirmPassword" :err="errors.confirmPassword"/>
                </div>
            </form>
            <div class="w-full items-center my-3 flex  justify-between">
                <Button text='Enregistrer les modifications' variant="bg" design="primary" :onClick="onPressRegister"/>
            </div>
        </div>
        <div class="w-5/12 md:flex hidden items-center justify-center h-full">
            <div class="w-44 h-44 border  grid place-items-center rounded-full">
                <img :src="image" class="w-full h-full  rounded-full object-cover"/>
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
import useVerify from "../../hooks/useVerify";
import SuccessComponent from "../../components/SuccessComponent.vue"
import { store } from "../../api";
export default {
    components: {
    TextBox,
    ButtonLink,
    Button,
    ReusableHeader,
    SuccessComponent
},
    data() {
        return {
            name: "",
            email: '',
            confirmPassword: "",
            oldPassword: "",
            newPassword: "",
            showSuccessPanel: false,
            errors: {},
            id:"",
            image: "/images/placeholder.jpg"
        }
    },
    setup(){
        useVerify("owner")
        
    },
    mounted(){
        const u = JSON.parse(localStorage.getItem("logged_in_user"))
        this.getUser(u.data.id)
    },
    methods: {
        handleChange(e) {
            const target = e.target.name
            this[target] = e.target.value
        },
        async continueAction() {
                this.$router.push('/owner/profile')
        },
        async onPressRegister() {
            const user = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword,
                id:this.id
            }
            const result = await User.updatePassword(user)
            if (result.type === "success") {
                this.showSuccessPanel = true
            }
            if(result.type === 'error'){
                this.errors = result.data
            }
        },
        async getUser(id){
            const result = await User.get(id)
            if(result.type === "success"){
                this.id = result.data.id
                if(result.data.picture !== '/placeholder.jpg'){
                    this.image = store+'/users/'+result.data.picture
                }
            }
        }
    }

}
</script>
