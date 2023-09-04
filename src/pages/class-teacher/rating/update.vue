<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[300px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Modifier une cote.</h2>
            </div>
            <SuccessComponent title="Modification effectuée" :message="`La cote de ${prettyString(route.params.name,true)}  a été effectuée avec success. Vous pouvez maintenant faire les calculs moyennant cette nouvelle cote.`" next="/ui/class-teacher/rating" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-6/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Modifier une cote.</h2>
                <p class="text-gray-700 text-sm">Tapez la nouvelle cote dans le champs ci-bas. </p>
                <div class="w-fit border rounded p-2">
                    <div class="flex flex-col">
                        <b>Nom</b>
                        <small class="text-gray-900">{{prettyString(route.params.name,true) }}</small>
                    </div>
                    <div class="flex flex-col">
                        <b>Matricule</b>
                        <small class="text-gray-900">{{prettyString(route.params.mat,true) }}</small>
                    </div>
                </div>
                <form class="h-full w-full flex flex-col">
                    <TextBox  :onChange="handleInput" type="number" name="cotes" label="Cotes" :value="values.cotes"  placeholder="Cote de l'élèves" :err="errors.cotes"/>
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
    import { onMounted, ref } from 'vue';
    import {CheckCircleIcon} from "@heroicons/vue/24/outline"
    import BlueButtons from '../../../components/v2/BlueButtons.vue';
    import TextBox from "../../../components/TextBox.vue"
    import SuccessComponent from '../../../components/v2/SuccessComponent.vue';
    import Rating from '../../../api/v2/Rating';
    import { useRoute } from 'vue-router';
import prettyString from '../../../helpers/pretty-string';
    const success = ref(false)
    const errors = ref([])
    const values = ref({})
    const route = useRoute()
    const handleInput = (e) =>{
        values.value[e.target.name] = e.target.value
    }
    const onPressRegister = async () =>{
        const result = await Rating.update(values.value, route.params.id)
        if(result.error){
        errors.value = result.errorList 
        }
        if(result.success){
            success.value = true
        }
    }
    const fetch = async () =>{
        const result = await Rating.getOne(route.params.id)
        if(result.success){
            values.value = result.data
        }
    }
    onMounted(()=>{
        fetch()
    })
    </script>
    