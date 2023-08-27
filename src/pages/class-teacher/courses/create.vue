<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[400px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Création du cours.</h2>
            </div>
            <SuccessComponent title="Création effectuée" message="La création du cours a été effectuée avec success. Vous pouvez maintenant assossier ce cours a tout ce qui peût y être lié." next="/ui/admin/courses" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-6/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Création cours.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour créer un nouveau cours. </p>
                <form class="h-full w-full flex flex-col">
                    <TextBox  :onChange="handleInput" type="text" name="cours" label="Cours" :value="values.cours"  placeholder="Nom du cours" :err="errors.cours"/>
                    <TextBox  :onChange="handleInput" type="text" name="total_periode" label="Total période" :value="values.total_periode"  placeholder="Total du cours à la période" :err="errors.total_periode"/>
                    <TextBox  :onChange="handleInput" type="text" name="total_examen" label="Total examen" :value="values.total_examen"  placeholder="Total du cours à l'examen" :err="errors.total_examen"/>
                </form>
                <div class="w-full items-center my-3 flex  justify-between">
                    <BlueButtons type="button" @press="onPressRegister">
                        Enregistrer <CheckCircleIcon class="w-5 h-5 ml-1"/>
                    </BlueButtons>
                </div>
            </div>
        </div>
        
    </div>
      
    </template>
    
    <script setup>
    import { ref } from 'vue';
    import {CheckCircleIcon} from "@heroicons/vue/24/outline"
    import BlueButtons from '../../../components/v2/BlueButtons.vue';
    import TextBox from "../../../components/TextBox.vue"
    import SuccessComponent from '../../../components/v2/SuccessComponent.vue';
    import Course from '../../../api/v2/Course';
    const success = ref(false)
    const errors = ref([])
    const values = ref({})
    const handleInput = (e) =>{
        values.value[e.target.name] = e.target.value
    }
    const onPressRegister = async () =>{
        const result = await Course.create(values.value)
        if(result.error){
        errors.value = result.errorList 
        }
        if(result.success){
            success.value = true
        }
    }
    </script>
    