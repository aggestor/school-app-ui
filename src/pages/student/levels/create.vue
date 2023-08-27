<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[350px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Configuration Niveau.</h2>
            </div>
            <SuccessComponent title="Configuration effectuée" message="La configuration du niveau a été effectuée avec success. Vous pouvez maintenant assossier ce niveau a tout ce qui peût y être lié." next="/ui/admin/levels" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-6/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Configuration niveau.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour configure un nouveau niveau. </p>
                <form class="h-full w-full flex flex-col">
                    <TextBox  :onChange="handleInput" type="text" name="code" label="Code" :value="values.name"  placeholder="Code" :err="errors.code"/>
                    <TextBox  :onChange="handleInput" type="text" name="niveau" label="Niveau" :value="values.niveau"  placeholder="Niveau" :err="errors.niveau"/>
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
    import Level from '../../../api/v2/Level';
    const success = ref(false)
    const errors = ref([])
    const values = ref({})
    const handleInput = (e) =>{
        values.value[e.target.name] = e.target.value
    }
    const onPressRegister = async () =>{
        const result = await Level.create(values.value)
        if(result.error){
        errors.value = result.errorList 
        }
        if(result.success){
            success.value = true
        }
    }
    </script>
    