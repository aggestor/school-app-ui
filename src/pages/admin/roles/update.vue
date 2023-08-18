<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[300px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Modifier un role.</h2>
            </div>
            <SuccessComponent title="Modification effectuée" message="La modification de ce role  a été effectuée avec success. Vous pouvez maintenant assossier ce role  a tout ce qui peût y être lié." next="/ui/admin/roles" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-6/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Modifier un role.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour modifier  un role. </p>
                <form class="h-full w-full flex flex-col">
                    <TextBox  :onChange="handleInput" type="text" name="name" label="Role" :value="values.name"  placeholder="Nom du role" :err="errors.name"/>
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
    import Role from '../../../api/v2/Role';
    import { useRoute } from 'vue-router';
    const success = ref(false)
    const errors = ref([])
    const values = ref({})
    const route = useRoute()
    const handleInput = (e) =>{
        values.value[e.target.name] = e.target.value
    }
    const onPressRegister = async () =>{
        const result = await Role.update(values.value, route.params.id)
        if(result.error){
        errors.value = result.errorList 
        }
        if(result.success){
            success.value = true
        }
    }
    const fetchRole = async () =>{
        const result = await Role.get(route.params.id)
        if(result.success){
            values.value.name = result.data[0].name
        }
    }
    onMounted(()=>{
        fetchRole()
    })
    </script>
    