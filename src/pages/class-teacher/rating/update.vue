<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[300px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Modifier une cote.</h2>
            </div>
            <SuccessComponent title="Modification effectuée" message="La modification de cette option a été effectuée avec success. Vous pouvez maintenant assossier cette option a tout ce qui peût y être lié." next="/ui/admin/options" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-6/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Modifier une cote.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour modifier  une option. </p>
                <form class="h-full w-full flex flex-col">
                    <TextBox  :onChange="handleInput" type="text" name="option" label="Option" :value="values.option"  placeholder="Nom de l'option" :err="errors.option"/>
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
        console.log(result);
        if(result.success){
            values.value.option = result.data[0].option
        }
    }
    onMounted(()=>{
        fetch()
    })
    </script>
    