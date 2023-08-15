<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[550px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Création d'une classe.</h2>
            </div>
            <SuccessComponent title="Création effectuée" message="La création du cours a été effectuée avec success. Vous pouvez maintenant assossier ce cours a tout ce qui peût y être lié." next="/ui/admin/courses" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-8/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Créer d'une classe.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour créer une classe. </p>
                <form class="h-full w-full flex flex-col">
                    <div class="flex justify-between space-x-3">
                        <TextBox  :onChange="handleInput" type="text" name="name" label="Nom" :value="values.name"  placeholder="Nom de la classe" :err="errors.name"/>
                        <TextBox  :onChange="handleInput" type="number" name="montant" label="Montant" :value="values.montant"  placeholder="Montant à payer" :err="errors.montant"/>
                    </div>
                    <div class="w-8/12">
                        <Datalist label="Niveau" :onChange="handleInput" name="niveau" placeholder="Choisir Niveau">

                        </Datalist>
                    </div>
                    <div class="w-8/12">
                        <Datalist label="Option" :onChange="handleInput" name="option"  placeholder="Choisir Option">
    
                        </Datalist>
                    </div>
                    <div class="w-full h-48 rounded mt-3 border">

                    </div>
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
    import Datalist from '../../../components/Datalist.vue';
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
    