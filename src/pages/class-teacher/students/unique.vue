<template>
    <div class="w-full p-2">
        <div class="w-full flex items-center  h-auto p-2 border rounded">
            <div class="w-3/12">
                <img src="/man.jpg" class="w-32 rounded object-cover  h-32 text-gray-500"/>
            </div>
            <div class="w-3/12">
                <div class="mb-2">
                    <b>Nom</b>
                    <p class="text-gray-600">{{data.names }}</p>
                </div>
                <div class="mb-2">
                    <b>Post-nom</b>
                    <p class="text-gray-600">{{data.firstname }}</p>
                </div>
                <div class="mb-2">
                    <b>Prénom</b>
                    <p class="text-gray-600">{{data.lastname }}</p>
                </div>
            </div>
            <div class="w-3/12">
                <div class="mb-2">
                    <b>Matricule</b>
                    <p class="text-gray-600">{{data.matricule }}</p>
                </div>
                <div class="mb-2">
                    <b>Téléphone</b>
                    <p class="text-gray-600">{{data.tel }}</p>
                </div>
                <div class="mb-2">
                    <b>Genre</b>
                    <p class="text-gray-600">{{uppercaseFirst(data.genre) }}</p>
                </div>
            </div>
            <div class="w-3/12">
                <div class="mb-2">
                    <b>Adresse</b>
                    <p class="text-gray-600">{{data.adresse }}</p>
                </div>
                <div class="mb-2">
                    <b>Option</b>
                    <p class="text-gray-600">{{data.option }}</p>
                </div>
                <div class="mb-2">
                    <b>Classe</b>
                    <p class="text-gray-600">{{data.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import {ref, onMounted} from "vue"
import Student from "../../../api/v2/Student";
import uppercaseFirst from"../../../helpers/uppercase-first"
import { useRoute } from "vue-router";


const data = ref({})
const studentData = ref([])
const route = useRoute()
const getStudentMoney = async () =>{
    const result = await Student.getData(route.params.id)
    if(result.success){
        data.value = result.eleve.data[0]
        studentData.value = result.eleve
    }
}

onMounted(()=>{
    getStudentMoney()
})

</script>