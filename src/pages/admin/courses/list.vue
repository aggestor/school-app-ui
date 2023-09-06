<template>
    <DeleteDialog @cancel="showDelete = false" @confirm="deleteCourse" v-if="showDelete" title="Voulez-vous vraiment supprimer ce cours ?" text="La suppression d'un cours entrainera la suppression de toutes informations qui y sont liées"/>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste de tous les cours</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ data?.length}}</span>
            <BlueLinkAsButton to="/ui/admin/courses/create">
                <PlusIcon class="w-5 h-5 mr-1"/> Créer un cours
            </BlueLinkAsButton>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Cours</span>
            <span class="w-2/12 flex justify-center">Examen</span>
            <span class="w-2/12 flex justify-center">Période</span>
            <span class="w-2/12 ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="c,i of data" :class="` py-2 text-sm  flex items-center justify-between ${i % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{i+1 }}</span>
            <span class="w-3/12 flex justify-center">{{c.cours }}</span>
            <span class="w-2/12 flex justify-center">{{c.total_examen }}</span>
            <span class="w-2/12 flex justify-center">{{c.total_periode }}</span>
            <span class="w-2/12 flex ">{{formatDateToAgo(c.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/courses/'+c.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="onPressDeleteCourse(c)">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref} from "vue"
import Course from "../../../api/v2/Course";
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import {  PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import DeleteDialog from "../../../components/v2/DeleteDialog.vue"
import useFetch from "../../../hooks/useFetch";
const currentList = ref({})
const showDelete = ref(false)

const {data , loading} = useFetch(Course.get)
const deleteCourse = async () =>{
    const result = await Course.remove(currentList.value.id)
    if(result.success){
        const c = await Course.get()
        console.log(c);
        if(c.data){
            data.value = c.data
            currentList.value = {}
            showDelete.value = false
        }
    }
}
const onPressDeleteCourse = c =>{
    currentList.value = c
    showDelete.value = true
}
</script>