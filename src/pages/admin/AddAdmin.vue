<template>
    <div class="w-full md:h-[500px] flex justify-center items-center">
        <div v-if="!promptSuccessBox"  class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Inscrption administrateur"/>
            <p class="text-gray-600 mb-3 text-sm">Remplissez le formulaire ci-bas pour l'enregistrement d'un nouvel administrateur.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Noms" :value="name"  placeholder="Votre nom" :err="errors.name"/>
                <TextBox  :onChange="handleInput" type="text" name="email" label="Addresse Email" :value="email"  placeholder="Votre Email" :err="errors.email"/>
                <TextBox  :onChange="handleInput" type="text" name="password" label="Mot de passe" :value="password" placeholder="Votre Mot de passe" :err="errors.password"/>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressRegister"/>
            </div>
        </div>
        <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/type" title="Enregitrement effectué !" message="Le nouveau administrateur a été enregistré avec succès. Il peut maintenant faire toutes les operations en tant que administrateur."/>
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
            promptSuccessBox: false,
        }
    },
    setup(){
        useVerify('Admin')
    },
    methods: {
        async handleInput(e) {
            this[e.target.name] = e.target.value
        },
        async onPressRegister() {
            const result = await Admin.register({name:this.name,email:this.email,password:this.password})

            if (result.type === "error") {
                this.errors = result.data

            } else if(result.type === 'success') {
                this.errors = {}
                this.promptSuccessBox = true
            } else if (result.type === 'auth') {
                localStorage.removeItem('admin')
                this.$router.push('/admin/login')
            }
        }
    }
}
</script>