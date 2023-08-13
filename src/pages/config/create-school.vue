<template>
<div class="w-11/12 mx-auto flex justify-center items-center md:h-[650px]">
    <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
        <div class="w-full mb-3">
            <h1 class="font-semibold text-2xl text-blue-600 mb-1">School App.</h1>
            <h2 class="font-semibold text-lg">Configuration école.</h2>
        </div>
        <SuccessComponent title="Configuration effectuée" message="La configuration de l'ecole a été effectuée avec success. Passer a la configuration suivante en cliquant sur le bouton ci-bas." next="/config/roles" nextText="Suivant"/>
    </div>
    <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-10/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
        <div class="md:w-7/12 flex h-[85%] md:p-6 p-4  justify-center flex-col" >
            <h1 class="font-semibold text-2xl text-blue-600 mb-1">School App.</h1>
            <h2 class="font-semibold text-lg">Configuration école.</h2>
            <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour configure l'école. </p>
            <form class="h-full w-full flex flex-col">
                <input  type="file" accept="image/png,image/jpeg,image/jpeg" hidden :ref="input" @change="handlePickImage" />
                <TextBox  :onChange="handleInput" type="text" name="name" label="Nom" :value="values.name"  placeholder="Nom de l'école" :err="errors.name"/>
                <div class="w-full flex space-x-3 justify-between">
                    <TextBox  :onChange="handleInput" type="text" name="matricule" label="Matricule" :value="values.matricule"  placeholder="Matricule de l'école" :err="errors.matricule"/>
                    <TextBox  :onChange="handleInput" type="year" name="year" label="Annee de creation" :value="email" placeholder="Annee de creation" :err="errors.year"/>
                    <TextBox  :onChange="handleInput" type="text" name="sigle" label="Sigle" :value="values.sigle" placeholder="Sigle" :err="errors.sigle"/>
                </div>
                <div class="w-full flex space-x-3 justify-between">
                    <TextBox  :onChange="handleInput" type="email" name="email" label="Email" :value="values.email" placeholder="Email de l'ecole" :err="errors.email"/>
                    <TextBox  :onChange="handleInput" type="tel" name="tel" label="Telephone" :value="values.tel" placeholder="Numero de telephone" :err="errors.tel"/>
                </div>
                <Textarea :onChange="handleInput" name="description" label="Description" placeholder="Parler un peu de votre ecole" :err="errors.description" :value="values.description"/>
            </form>
            <div class="w-full items-center my-3 flex  justify-between">
                <BlueButtons type="button" @press="onPressRegister">
                    Enregistrer <CheckCircleIcon class="w-5 h-5 ml-1"/>
                </BlueButtons>
            </div>
            <div>
                <small>&copy; {{new Date().getFullYear() }} SchoolApp,<b>Modernic, Inc</b>.</small>
            </div>
        </div>
        <div class="w-5/12 md:flex hidden items-center justify-center h-full">
          <div class="w-56 h-56 relative rounded border mx-auto">
            <div class="w-full p-0.5 h-full">
                <img :src="image" alt="Placeholder" class="w-full rounded h-full object-cover"/>
            </div>
            <span class="absolute -bottom-3 left-24">
                <BlueButtons type="button" @press="onPressChooseImage">
                    <PhotoIcon class="w-5 h-5"/>
                    <PlusIcon class="w-5 h-5"/>
                </BlueButtons>
            </span>
          </div>
        </div>
    </div>
    
</div>
  
</template>

<script setup>
import { ref } from 'vue';
import {CheckCircleIcon, PhotoIcon} from "@heroicons/vue/24/outline"
import BlueButtons from '../../components/v2/BlueButtons.vue';
import TextBox from "../../components/TextBox.vue"
import Textarea from '../../components/Textarea.vue';
import { PlusIcon } from '@heroicons/vue/24/solid';
import Config from "../../api/v2/Config"
import SuccessComponent from '../../components/v2/SuccessComponent.vue';
const input = ref("input")
const success = ref(false)
const file = ref()
const image = ref('/placeholder-image.png')
const errors = ref([])
const values = ref({})
const handleInput = (e) =>{
    values.value[e.target.name] = e.target.value
}
const handlePickImage = (e) =>{
    image.value = URL.createObjectURL(e.target.files[0])
    file.value = e.target.files[0]
}
const onPressChooseImage = () => input.value.click()
const onPressRegister = async () =>{
    const result = await Config.addSchool({...values.value,logo:file.value
    })
    if(result.error){
    errors.value = result.errorList 
    }
    if(result.success){
        success.value = true
    }
}
</script>
