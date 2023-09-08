<template>
    <div class="w-11/12 mx-auto flex justify-center items-center h-screen">
        <div   data-aos="zoom-in" data-aos-duration="500" class="md:w-8/12 w-full flex justify-between items-center  md:h-[75%] rounded-lg border">
            <div class="md:w-6/12 w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <div class="w-fit -ml-2 h-14">
                    <img src="/logo-with-ecrit.png" class="w-full h-full"/>
                </div>
                <div class="bg-green-100 rounded border p-2  border-green-400">
                    <h2 class="font-semibold flex  items-center text-green-600 text-lg"><CheckCircleIcon class="w-7 h-7 mr-2"/> Connexion effectuée.</h2>
                    <p class="text-gray-600 text-sm">C'est votre premiere connexion il faut imperativement changer votre mot de passe</p>
                </div>
                <form class="h-full w-full flex flex-col">
                        <TextBox  :onChange="handleInput" type="text" name="newPassword" label="Mot de passe" :value="values.newPassword" placeholder="Votre mot de passe" :err="errors.password"/>
                </form>
                <div class="w-full items-center my-3 flex  justify-between">
                    <BlueButtons type="button" @press="onPressFinalize">
                        Finaliser <CheckCircleIcon class="w-5 h-5 ml-1"/>
                    </BlueButtons>
                </div>
                <div>
                    <small>&copy; {{new Date().getFullYear() }} SchoolApp,<b>Modernic, Inc</b>.</small>
                </div>
            </div>
            <div class="w-6/12 md:flex hidden items-center justify-center h-full">
              <div class="w-72 h-72  mx-auto">
                <div class="w-full h-full">
                    <img src="/login.png" alt="Placeholder" class="w-full rounded h-full object-cover"/>
                </div>
              </div>
            </div>
        </div>
        
    </div>
      
    </template>
    
    <script setup>
    import { onMounted, ref } from 'vue';
    import {CheckCircleIcon} from "@heroicons/vue/24/solid"
    import BlueButtons from '../../components/v2/BlueButtons.vue';
    import TextBox from "../../components/TextBox.vue"
    import Student from '../../api/v2/Student';

    const errors = ref([])
    const values = ref({})
    const handleInput = (e) =>{
        values.value[e.target.name] = e.target.value
    }
    const onPressFinalize = async () =>{
        const result = await Student.updatePassword({password:values.value['newPassword']})
        if(result.success){
            window.location.href = "/ui/student"
        }
    }
    </script>
    