<template>
    <div class="w-full text-gray-800 p-2">
        <h1 class="text-xl mt-2 mb-3 font-bold">Identification</h1>
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
        <div>
            <h1 class="text-xl mt-2 mb-3 font-bold">Cotes</h1>
        </div>
        <div class="w-full flex items-center  h-auto p-2 border rounded">
            <div class="border-b pb-1 w-full  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-2/12 flex justify-center">Cours</span>
            <span class="w-2/12 flex justify-center">Periode</span>
            <span class="w-2/12 flex justify-center">Cote</span>
            <span class="w-2/12 flex justify-center">Total</span>
            <span class="w-1/12 text-center ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <!-- <div v-for="o of data?.data" :class="` py-2 text-sm  flex items-center justify-between ${data?.data?.indexOf(o) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{data?.data?.indexOf(o)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{o.names+' '+o.firstname+' '+o.lastname }}</span>
            <span class="w-2/12 flex justify-center">{{o.matricule }}</span>
            <span class="w-2/12 flex justify-center">{{o.cours }}</span>
            <span class="w-2/12 flex justify-center">{{parseRatingType(o.cotes_types) }}</span>
            <span class="w-1/12 flex justify-center"><span :class="o.cotes >= o.total_periode/2 ? 'bg-green-100 border border-green-300  text-green-600 rounded p-0.5': 'bg-red-100 border border-red-300 text-red-600 rounded p-0.5'">{{o.cotes }}</span></span>
            <span class="w-1/12 flex justify-center ">{{formatDateToAgo(o.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/class-teacher/rating/'+o.id+'/'+prettyString(o.names+' '+o.firstname+' '+o.lastname )+'/'+o.matricule+'/'+prettyString(o.cours)+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="onClickDelete(o)">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
            </span>
        </div> -->
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