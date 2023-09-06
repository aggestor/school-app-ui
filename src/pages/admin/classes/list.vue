<template>
        <DeleteDialog @cancel="showDeleteLog = false" @confirm="onDeleteClass" v-if="showDeleteLog" title="Voulez-vous vraiment supprimer cette classe ?" text="La suppression d'une classe entrainera la de toutes informations qui y sont liées"/>

    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste de classes</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ data?.length}}</span>
            <BlueLinkAsButton to="/ui/admin/classes/create">
                <PlusIcon class="w-5 h-5 mr-1"/> Créer une classe
            </BlueLinkAsButton>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-2/12 flex justify-center">Nom</span>
            <span class="w-2/12 flex justify-center">Niveau</span>
            <span class="w-2/12 flex justify-center">Option</span>
            <span class="w-2/12 ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="c,i of data" :class="` py-2 text-sm  flex items-center justify-between ${i % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{i+1 }}</span>
            <span class="w-2/12 flex justify-center">{{c.name }}</span>
            <span class="w-2/12 flex justify-center">{{c.niveau.niveau }}</span>
            <span class="w-2/12 flex justify-center">{{c.option.option }}</span>
            <span class="w-2/12 flex ">{{formatDateToAgo(c.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/classes/'+c.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteClass(c)">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
                <BlueLinkAsButton :to="'/ui/admin/classes/'+c.id">
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
import useFetch from "../../../hooks/useFetch";
import DeleteDialog from "../../../components/v2/DeleteDialog.vue";


const currentClass = ref({})
const showDeleteLog = ref(false)
const {data, loading} = useFetch(Class.get)

const onDeleteClass = async () =>{
    const result = await Class.remove(currentClass.value.id)
    if(result.success){
        const r = await Class.get()
        if(r.data){
            data.value = r.data
            currentClass.value = {}
            showDeleteLog.value = false
        }
    }
}
const deleteClass = (c) =>{
    currentClass.value  = c
    showDeleteLog.value = true
}
</script>