<template>
    <div class="grid grid-cols-12 p-2">
        <div class="col-span-6 flex items-center justify-around h-48 border rounded">
            <div>
                <img src="/user-avatar.png" class="w-40 h-40 text-gray-500"/>
            </div>
            <div class="w-[calc(100%-170px)] p-2 border">
                <h1 class="font-semibold text-xl">{{data.names+" "+data.firstname+" "+data.lastname }}</h1>
                <div class="flex space-x-2 items-center">
                    <span class="bg-green-200 text-green-700 p-0.5 rounded">{{uppercaseFirst(data?.genre) }}</span>
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
        data.value = result.eleve[0]
        studentData.value = result.eleve
    }
}

onMounted(()=>{
    getStudentMoney()
})

</script>