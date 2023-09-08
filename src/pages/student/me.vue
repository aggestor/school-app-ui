<template>
    <div class="w-8/12 mx-auto space-x-2 h-auto px-3 border rounded my-5">
        <div class="w-full sticky top-[48px] bg-white bg-opacity-50  backdrop-blur flex justify-between border-b py-2">
            <div class="flex  items-center">
                <GoBackAdminButton/> <span class="ml-2">Profil d'utilisateur</span>
            </div>
            <BlueLinkAsButton :to="'/ui/student/me/update-password'">
                Modifier mot de passe <PencilIcon class="w-4 h-4 ml-1"/>
            </BlueLinkAsButton>
        </div>
       <div class="flex justify-between">
        <div class="flex mt-4 w-3/12">
            <div class="w-32 h-32 rounded border">

            </div>
        </div>
        <div class="w-9/12 mt-4">
            <div class="mb-2">
                <b>Noms</b>
                <p class="text-gray-600">{{user?.names }}</p>
            </div>
            <div class="mb-2">
                <b>Post-nom</b>
                <p class="text-gray-600">{{user?.firstname }}</p>
            </div>
            <div class="mb-2">
                <b>Premom</b>
                <p class="text-gray-600">{{user?.lastname }}</p>
            </div>
            <div class="mb-2">
                <b>Matricule</b>
                <p class="text-gray-600">{{user?.matricule }}</p>
            </div>
            <div class="mb-2">
                <b>Téléphone</b>
                <p class="text-gray-600">{{user?.tel?.toLocaleString() }}</p>
            </div>
            <div class="mb-2">
                <b>Role</b>
                <p class="text-gray-600">Elève</p>
            </div>
            <div class="mb-2">
                <b>Verification téléphone</b>
                <p  class="text-red-600">Jamais</p>
            </div>
            <div class="mb-2">
                <b>Date de naissaince</b>
                <p class="text-gray-600">{{user.naissance }}</p>
            </div>
            <div class="mb-2">
                <b>Adresse</b>
                <p class="text-gray-600">{{user.adresse }}</p>
            </div>
            <div class="mb-2">
                <b>Membre depuis</b>
                <p  class="text-gray-600">{{formatDateNormal(user.created_at) }}</p>
            </div>
            <div class="mb-2">
                <b>Modification</b>
                <p  class="text-gray-600">{{formatDateToAgo(user.created_at) }}</p>
            </div>
        </div>
       </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { formatDateNormal, formatDateToAgo } from '../../helpers/format-date';
import BlueLinkAsButton from '../../components/v2/BlueLinkAsButton.vue';
import { PencilIcon } from '@heroicons/vue/24/outline';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
const user = ref({})
onMounted(()=>{
    const u = sessionStorage.getItem("user")
    if(u){
        user.value =JSON.parse(u);
    }

    
})
</script>