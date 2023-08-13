<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[600px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">School App.</h1>
                <h2 class="font-semibold text-lg">Configuration école.</h2>
            </div>
            <SuccessComponent title="Configuration effectuée" message="La configuration de l'ecole a été effectuée avec success. Passer a la configuration suivante en cliquant sur le bouton ci-bas." next="/config/roles" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-10/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="md:w-7/12 flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">School App.</h1>
                <h2 class="font-semibold text-lg">Configuration admininistrateur.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour configure l'admininistrateur. </p>
                <form class="h-full w-full flex flex-col">
                    <div class="w-full flex space-x-3 justify-between">
                        <TextBox  :onChange="handleInput" type="text" name="name" label="Nom" :value="values.name"  placeholder="Nom de l'école" :err="errors.name"/>
                        <TextBox  :onChange="handleInput" type="email" name="email" label="Email" :value="values.email" placeholder="Email de l'ecole" :err="errors.email"/>
                    </div>
                    <div class="w-full flex space-x-3 justify-between">
                        <TextBox  :onChange="handleInput" type="tel" name="tel" label="Telephone" :value="values.tel" placeholder="Numero de telephone" :err="errors.tel"/>
                        <TextBox  :onChange="handleInput" type="password" name="password" label="Mot de passe" :value="values.password" placeholder="Mot de passe" :err="errors.password"/>
                    </div>
                    <div class="border w-full p-2 flex flex-wrap space-x-2 mt-2 h-40 rounded">
                        <span v-for="role of roles" @click="addRole(role.id)" :class="`${chosenRoles.includes(role.id) ? 'text-white bg-blue-600' : 'bg-gray-200'} cursor-pointer p-0.5 px-1 space-x-3 text-sm w-fit h-fit rounded flex items-center`"  :key="role.id">{{role.role }} <CheckCircleIcon v-if="chosenRoles.includes(role.id)"  class='w-4 cursor-pointer h-4'/></span>
                    </div>
                </form>
                <div class="w-full items-center my-3 flex  justify-between">
                    <BlueButtons type="button" @press="onPressRegister">
                        Enregistrer <CheckCircleIcon class="w-5 h-5 ml-1"/>
                    </BlueButtons>
                </div>
                <div>
                    <small>&copy; {{new Date().getFullYear() }} SchoolApp by <b>Modernic, Inc</b>.</small>
                </div>
            </div>
            <div class="w-5/12 md:flex hidden items-center justify-center h-full">
              <div class="w-72 h-72  mx-auto">
                <div class="w-full h-full">
                    <img src="/admin.jpg" alt="Placeholder" class="w-full rounded h-full object-cover"/>
                </div>
              </div>
            </div>
        </div>
        
    </div>
      
    </template>
    
    <script setup>
    import { onMounted, ref } from 'vue';
    import {CheckCircleIcon} from "@heroicons/vue/24/outline"
    import BlueButtons from '../../components/v2/BlueButtons.vue';
    import TextBox from "../../components/TextBox.vue"
    import Config from "../../api/v2/Config"
    import Role from "../../api/v2/Role"
    import SuccessComponent from '../../components/v2/SuccessComponent.vue';
    const success = ref(false)
    const file = ref()
    const errors = ref([])
    const roles = ref([])
    const chosenRoles = ref([])
    const values = ref({})
    const handleInput = (e) =>{
        values.value[e.target.name] = e.target.value
    }
    const onPressRegister = async () =>{
        const result = await Config.addSU({...values.value,role_id:roles.value
        })
        if(result.error){
        errors.value = result.errorList 
        }
        if(result.success){
            success.value = true
        }
    }
    const getRoles = async () =>{
        const result = await Role.get()
        if(result.data)
            roles.value = result.data
    }
    const addRole = (name) =>{
        if(!chosenRoles.value.includes(name))
            chosenRoles.value.push(name)
        else{
            chosenRoles.value = chosenRoles.value.filter(c => c !== name)
        }
    } 
     onMounted(()=>{
        getRoles()
     })
    </script>
    