<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[300px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Création d'un role.</h2>
            </div>
            <SuccessComponent title="Création effectuée" message="La création de ce role a été effectuée avec success. Vous pouvez maintenant assossier ce role a tout ce qui peût y être lié." next="/ui/admin/roles" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-6/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Création d'une option.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour créer   un role. </p>
                <form class="h-full w-full flex flex-col">
                    <Datalist label="Classe" :onChange="handleInput" name="_class"  placeholder="Choisir Class">
                        <option  :key="o.option" v-for="o of options">{{o.option }}</option>
                    </Datalist>
                    <div class="w-5/12 items-center hidden lg:flex justify-center">
                    <div class="flex w-[70%] items-center  justify-around">
                        <div class="bg-white absolute bg-opacity-40 backdrop-blur-lg z-50 w-[45%] rounded border top-2 ">
                            <div :class="` w-full  items-center ${searchResults.length > 0 && 'border-b'} h-9  px-1 flex space-x-2`">
                                <input autofocus @input="handleSearch" :value="term" placeholder="Rechercher vendeur, shop, produit, catégories,serie,..." type="search" class="w-full placeholder:text-gray-400 text-gray-800 outline-none border-none mx-2 h-[80%] bg-transparent"><span @click="handleClickSearch"  class="text-gray-400 hover:bg-gray-100 rounded cursor-pointer"><MagnifyingGlassIcon class="h-7 w-7"/></span>
                            </div>
                            <div v-if="!isSearchLoading && searchResults.length == 0 && term.length > 0 && showSuggestionBox " class="h-64 grid place-items-center w-full">
                                {{boxTitle }}
                            </div>
                            <div v-if="!isSearchLoading && searchResults.length > 0" class="h-64 overflow-auto __scrollbar grid place-items-center w-full">
                                <div @click="handleClickProduct(s)" :key="s.prod_id" v-for="s of searchResults" class="p-1 w-full cursor-pointer hover:bg-blue-100 flex flex-col">
                                    <p class="w-full font-semibold">{{s.prod_name }}</p>
                                    <small class="text-gray-600">{{s.cat_name }}</small>
                                </div>
                            </div>
                            <div v-if="isSearchLoading" class="h-64 grid place-items-center w-full">
                                Loading...
                            </div>
                        </div>
                    </div>
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
    import Datalist from '../../../components/Datalist.vue';
    import SuccessComponent from '../../../components/v2/SuccessComponent.vue';
    import Role from '../../../api/v2/Role';

    const success = ref(false)
    const errors = ref([])
    const values = ref({})
    const handleInput = (e) =>{
        values.value[e.target.name] = e.target.value
    }
    const onPressRegister = async () =>{
        const result = await Role.create(values.value)
        if(result.error){
        errors.value = result.errorList 
        }
        if(result.success){
            success.value = true
        }
    }
    </script>
    