<template>
    <DeleteDialog @confirm="onDelete" @cancel="showDeleteDialog = false" title="Etes-vous sur de poursuivre votre action ?" text="La suppression de la cote entrainera des modifications sur le resultat de l'eleve ainsi que de sa classe. Cette action est irreversible" v-if="showDeleteDialog"/>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste de cotes</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ data?.data?.length}}</span>
            <BlueLinkAsButton to="/ui/class-teacher/rating/create">
                <PlusIcon class="w-5 h-5 mr-1"/> Ajouter des points
            </BlueLinkAsButton>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Noms</span>
            <span class="w-1/12 flex justify-center">Matricule</span>
            <span class="w-2/12 flex justify-center">Cours</span>
            <span class="w-2/12 flex justify-center">Periode</span>
            <span class="w-1/12 flex justify-center">Cote</span>
            <span class="w-1/12 text-center ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="o of data?.data" :class="` py-2 text-sm  flex items-center justify-between ${data?.data?.indexOf(o) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{data?.data?.indexOf(o)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{o.names+' '+o.firstname+' '+o.lastname }}</span>
            <span class="w-2/12 flex justify-center">{{o.matricule }}</span>
            <span class="w-2/12 flex justify-center">{{o.cours }}</span>
            <span class="w-2/12 flex justify-center">{{parseRatingType(o.cotes_types) }}</span>
            <span class="w-1/12 flex justify-center"><span :class="o.cotes >= o.total_periode/2 ? 'bg-green-100 border border-green-300  text-green-600 rounded p-0.5': 'bg-red-100 border border-red-300 text-red-600 rounded p-0.5'">{{o.cotes }}</span></span>
            <span class="w-1/12 flex justify-center ">{{formatDateToAgo(o.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/class-teacher/rating/'+o.id+'/'+prettyString(o.names+' '+o.firstname+' '+o.lastname )+'/'+o.matricule+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="onClickDelete(o)">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
            </span>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue"
import { formatDateToAgo } from "../../../helpers/format-date";
import prettyString from "../../../helpers/pretty-string"
import parseRatingType from "../../../helpers/parse-rating-type";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import {  PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import Rating from "../../../api/v2/Rating";
import useFetch from "../../../hooks/useFetch";
import DeleteDialog from "../../../components/v2/DeleteDialog.vue";

const {data, loading} = useFetch(Rating.getByType)
const showDeleteDialog = ref(false)
const currentListItem = ref({})
const onClickDelete = i =>{
    currentListItem.value = i
    showDeleteDialog.value = true
}
const onDelete = async () =>{
    const result = await Rating.remove(currentListItem.value.id)
    if(result.success){
        const c = await Rating.getByType()
        console.log(c);
        if(c.data){
            data.value = c
        }
        showDeleteDialog.value = false
    }
}
</script>