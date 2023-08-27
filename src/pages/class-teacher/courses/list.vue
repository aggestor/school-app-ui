<template>
    <DeleteDialog @cancel="showDelete = false" @confirm="deleteCourse" v-if="showDelete" title="Voulez-vous vraiment supprimer ce cours ?" text="La suppression d'un cours entrainera la suppression de toutes informations qui y sont liées"/>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste de tous les cours</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ courses?.length}}</span>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Cours</span>
            <span class="w-2/12 flex justify-center">Examen</span>
            <span class="w-2/12 flex justify-center">Période</span>
            <span class="w-2/12 ">Maj</span>
        </div>

        <div v-for="c of courses" :class="` py-2 text-sm  flex items-center justify-between ${courses.indexOf(c) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{courses.indexOf(c)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{c.cours }}</span>
            <span class="w-2/12 flex justify-center">{{c.total_examen }}</span>
            <span class="w-2/12 flex justify-center">{{c.total_periode }}</span>
            <span class="w-2/12 flex ">{{formatDateToAgo(c.updated_at) }}</span>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import Course from "../../../api/v2/Course";
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import {  PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import DeleteDialog from "../../../components/v2/DeleteDialog.vue"
const courses = ref([])
const loading = ref(true)
const currentList = ref({})
const showDelete = ref(false)
const getCourses = async () =>{
    loading.value = true
    const result = await Course.get()
    if(result.data){
        courses.value = result.data
    }
    loading.value = false
}
const deleteCourse = async () =>{
    
}
const onPressDeleteCourse = c =>{
    currentList.value = c
    showDelete.value = true
}
onMounted(()=>{
    getCourses()
})
</script>