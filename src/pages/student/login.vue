<template>
    <div class="w-11/12 mx-auto flex justify-center items-center h-screen">
       
        <div   data-aos="zoom-in" data-aos-duration="500" class="md:w-8/12 w-full flex justify-between items-center  md:h-[75%] rounded-lg border">
            <div class="md:w-6/12 w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <div class="w-fit -ml-2 h-14">
                    <img src="/logo-with-ecrit.png" class="w-full h-full"/>
                </div>
                <h2 class="font-semibold text-lg">Connexion élève.</h2>
                <p class="text-gray-700 text-sm">Utilisez vos identifiants pour vous connecter. </p>
                <form class="h-full w-full flex flex-col">
                        <TextBox  :onChange="handleInput" type="text" name="names" label="Nom" :value="values.names"  placeholder="Votre nom" :err="errors.names"/>
                        <TextBox  :onChange="handleInput" type="text" name="firstname" label="Post-nom" :value="values.firstname"  placeholder="Votre Post nom" :err="errors.firstname"/>
                        <TextBox  :onChange="handleInput" type="password" name="password" label="Mot de passe" :value="values.password" placeholder="Votre mot de passe" :err="errors.password"/>
                </form>
                <div class="w-full items-center my-3 flex  justify-between">
                    <BlueButtons type="button" @press="onPressLogin">
                        Connexion <CheckCircleIcon class="w-5 h-5 ml-1"/>
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
    import Auth from '../../api/v2/Auth';

    const errors = ref([])
    const values = ref({})
    const handleInput = (e) =>{
        values.value[e.target.name] = e.target.value
    }
    const onPressLogin = async () =>{
        const result = await Auth.login(values.value, 'student')
        if(result.error){
            errors.value = result.errorList 
        }
        if(result.success){
            sessionStorage.setItem('user', JSON.stringify(result.eleve))
            sessionStorage.setItem('token', JSON.stringify(result.token))
            sessionStorage.setItem('session_type', 'student')
            if(result.onChangePassword){
                window.location.href = "/ui/student/login/finalize?onChangePassword=true"
            }else{
                const search = window.location.search.split('?continue=');
                search[1] ?window.location.href = search[1] : window.location.href = '/ui/student'
            }
            
            
        }
    }
     onMounted(()=>{
     })
    </script>
    