<template>
    <DeleteDialog title="Etes-vous sur ?" text="Voulez-vous vraiment supprimer cet eleve ? La suppression de cet eleve entrainera la perte totale de toutes les donnees de ce dernier de facon definitive" v-if="showDeletePanel" @cancel="showDeletePanel = false" @confirm="deleteStudent"/>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste des élèves</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ data?.data?.length}}</span>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Nom</span>
            <span class="w-2/12 flex justify-center">Tél</span>
            <span class="w-1/12 flex justify-center">Sexe</span>
            <span class="w-2/12 flex justify-center">Matricule</span>
            <span class="w-1/12 ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="c of data?.data" :class="` py-2 text-sm  flex items-center justify-between ${data?.data?.indexOf(c) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{data?.data.indexOf(c)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{c.names+" "+c.firstname+" "+c.lastname }}</span>
            <span class="w-2/12 flex justify-center">{{c.tel }}</span>
            <span class="w-1/12 flex justify-center">{{c.genre }}</span>
            <span class="w-2/12 flex justify-center">{{c.matricule }}</span>
            <span class="w-1/12 flex ">{{formatDateToAgo(c.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlueLinkAsButton :to="'/ui/class-teacher/students/'+c.id">
                    <ArrowRightIcon class="w-5 h-5"/>
                </BlueLinkAsButton>
            </span>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import {  ArrowRightIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import Class from "../../../api/v2/Class";
import DeleteDialog from "../../../components/v2/DeleteDialog.vue";
import useFetch from "../../../hooks/useFetch";


const {data,loading} = useFetch(Class.getStudents)
console.log(data);
</script>