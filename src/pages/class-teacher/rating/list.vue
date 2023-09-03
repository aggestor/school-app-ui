<template>
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
            <span class="w-1/12 flex justify-center"><span :class="o.cotes >= o.total_periode ? 'bg-green-100  text-green-600 rounded p-0.5': 'bg-red-100 text-red-600 rounded p-0.5'">{{o.cotes }}</span></span>
            <span class="w-1/12 flex justify-center ">{{formatDateToAgo(o.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/class-teacher/ratings/'+o.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteInscription">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
            </span>
        </div>
    </div>
</template>
<script setup>
import { formatDateToAgo } from "../../../helpers/format-date";
import parseRatingType from "../../../helpers/parse-rating-type";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import {   ArrowRightIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
import Rating from "../../../api/v2/Rating";
import useFetch from "../../../hooks/useFetch";

const {data, loading} = useFetch(Rating.getByType)
</script>