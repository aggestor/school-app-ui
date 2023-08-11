<template>
    <div class="w-full md:h-[600px] flex justify-center items-center">
        <div v-if="!promptSuccessBox"  class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Modifier profil Admin"/>
            <p class="text-gray-600 mb-3 text-sm">Modifier les informations ci-bas pour la mise en jour de votre profil.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Noms" :value="name"  placeholder="Votre nom" :err="errors.name"/>
                <TextBox  :onChange="handleInput" type="text" name="email" label="Addresse Email" :value="email"  placeholder="Votre Email" :err="errors.email"/>
                <TextBox  :onChange="handleInput" type="text" name="password" label="Ancien mot de passe" :value="password" placeholder="Votre Ancien Mot de passe (Optionel) " :err="errors.password"/>
                <TextBox  :onChange="handleInput" type="text" name="newPassword" label="Nouveau mot de passe" :value="newPassword" placeholder="Votre nouveau Mot de passe (Optionel)" :err="errors.newPassword"/>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer les modifications' variant="bg" design="primary" :onClick="onPressRegister"/>
            </div>
        </div>
        <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/current" title="Modification effectuée !" message="La mise en jour de votre profil administrateur a été faite avec succès."/>
        </div>
    </div>
</template>
<script>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import Admin from "../../api/admin"
import {CheckCircleIcon} from "@heroicons/vue/24/solid"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import SuccessComponent from "../../components/SuccessComponent.vue"
import useVerify from "../../hooks/useVerify"
export default {
    components: {
    ButtonLink,
    Button,
    TextBox,
    CheckCircleIcon,
    PagesNavigationHeader,
    SuccessComponent
},
    data(){
        return {
            email: "",
            password:"",
            errors: {},
            name: "",
            newPassword:"",
            id:"",
            promptSuccessBox: false,
        }
    },
    setup(){
        useVerify('Admin')
    },
    mounted(){
        this.getAdmin()
    },
    methods: {
        async handleInput(e) {
            this[e.target.name] = e.target.value
        },
        async getAdmin(){
            const u = JSON.parse(localStorage.getItem('admin'))
            const result = await Admin.get(u.data.id)
            if(result.type === "success"){
                this.name = result.data.name
                this.email = result.data.email
                this.id = result.data.id
            }
        },
        async onPressRegister() {
            const result = await Admin.update({name:this.name,email:this.email,password:this.password, newPassword:this.newPassword, id:this.id})

            if (result.type === "error") {
                this.errors = result.data

            } else if(result.type === 'success') {
                this.errors = {}
                this.promptSuccessBox = true
            }
        }
    }
}
</script>