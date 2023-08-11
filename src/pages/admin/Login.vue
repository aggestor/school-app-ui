<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div  class="md:w-5/12 border w-11/12  flex h-[400px] rounded p-8  justify-center flex-col" >
            <h1 class="font-semibold text-2xl text-blue-500 mb-3">Muyispehre</h1>
            <h2 class="font-semibold text-lg text-gray-700 mb-3">Connexion administrateur</h2>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="email" label="Addresse Email" :value="email"  placeholder="Votre Email" :err="errors.email"/>
                <TextBox  :onChange="handleInput" type="password" name="password" label="Mot de passe" :value="password" placeholder="Votre Mot de passe" :err="errors.password"/>
            </form>
            <div class="w-full flex justify-between">
                <ButtonLink text="Retour à l'acceuil" path="/" variant="default"/>
                <Button text='Connexion' variant="bg" design="primary" :onClick="onPressLogin"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import Admin from "../../api/admin"
import { useUserStore } from "../../store/user"
import { ref,onMounted } from "vue"
import { useRoute, useRouter } from "vue-router"
    const router  = useRouter()
    const route = useRoute()
        const email = ref("")
        const password = ref("")
        const errors = ref({})

        function handleInput(e) {
            if(e.target.name =="email") email.value = e.target.value
            if(e.target.name =="password") password.value = e.target.value
        }
        async function onPressLogin() {
            const result = await Admin.login(email.value, password.value)
            if (result.type === "error") errors.value = result.data
            else if (result.type === "success") {
                localStorage.setItem('admin', JSON.stringify(result.data))
                const use = useUserStore()
                use.setBool(true)
                use.setData(result.data)
                redirect()
            }          
        }
        function redirect(){
            if(route.query.continue){
                router.push(route.query.continue)
            }else{
                router.push("/admin")
            }
        }

</script>