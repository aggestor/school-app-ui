<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[450px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">School App.</h1>
                <h2 class="font-semibold text-lg">Configuration roles.</h2>
            </div>
            <SuccessComponent title="Configuration effectuée" message="La configuration des roles a été effectuée avec success. Passer a la configuration suivante en cliquant sur le bouton ci-bas." next="/config/super-user" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-6/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-full md:p-6 p-4  justify-center flex-col" >
                <div class="w-fit -ml-2 h-14">
                <img src="/logo-with-ecrit.png" class="w-full h-full"/>
            </div>
                <h2 class="font-semibold text-lg">Configuration roles.</h2>
                <p class="text-gray-700 text-sm">Considerez les roles comme les postes que les gens occupent sur votre école. </p>
                <form class="h-full w-full flex flex-col">
                    <div class="flex space-x-3 items-center">
                        <TextBox  :onChange="handleInput" type="text" name="name" :value="name"  placeholder="Saisissez le nom du role puis cliquer sur le bouton à drote" :err="errors.name"/>
                        <span class="w-10 mt-0.5 h-10 rounded bg-blue-600 text-white place-items-center grid cursor-pointer hover:shadow-lg hover:shadow-blue-300 hover:bg-blue-700" @click="addRole">
                            <PlusIcon class="w-5 h-5"/>
                        </span>
                    </div>
                </form>
                <div class="w-full h-72 p-2 rounded flex flex-wrap space-x-2 border">
                    <span class="bg-gray-200 p-0.5 text-sm w-fit h-fit rounded flex items-center space-x-2 " v-for="role of roles" :key="role">{{role }} <XMarkIcon @click="onRemoveItem(role)" class='w-4 cursor-pointer h-4'/></span>
                </div>
                <div class="w-full items-center my-3 flex  justify-between">
                    <BlueButtons type="button" @press="onPressCreate">
                        Enregistrer <CheckCircleIcon class="w-5 h-5 ml-1"/>
                    </BlueButtons>
                </div>
                <div>
                    <small>&copy; {{new Date().getFullYear() }} SchoolApp,<b>Modernic, Inc</b>.</small>
                </div>
            </div>
        </div>
        
    </div>
      
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import {CheckCircleIcon, XMarkIcon} from "@heroicons/vue/24/outline"
    import BlueButtons from '../../components/v2/BlueButtons.vue';
    import TextBox from "../../components/TextBox.vue"
    import { PlusIcon } from '@heroicons/vue/24/solid';
    import Config from "../../api/v2/Config"
    import SuccessComponent from '../../components/v2/SuccessComponent.vue';
    const success = ref(false)
    const roles = ref([])
    const errors = ref([])
    const name = ref("")
    const handleInput = (e) =>{
        name.value = e.target.value
    }
    const addRole = () => {
        if(!roles.value.includes(name.value)){
            roles.value.push(name.value)
            name.value = ""
        }
    }
    const onRemoveItem = (item) => {
        roles.value = roles.value.filter(role => role !== item)
    }
    const onPressCreate =  () =>{
        roles.value.forEach(async r =>{
            const result = await Config.addRole(r)
            if(result.error){
                errors.value = result.errorList
            }
            if(roles.value.indexOf(r) == roles.value.length -1){
                if(result.success) success.value = true
            }
        })
        
    }
    </script>
    