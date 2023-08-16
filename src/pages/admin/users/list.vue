<template>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste des utilisateurs</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ users?.length}}</span>
            <BlueLinkAsButton to="/ui/admin/users/create">
                <PlusIcon class="w-5 h-5 mr-1"/> Créer
            </BlueLinkAsButton>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Nom</span>
            <span class="w-3/12 flex justify-center">Email</span>
            <span class="w-2/12 flex justify-center">Phone</span>
            <span class="w-1/12 ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="u of users" :class="` py-2 text-sm  flex items-center justify-between ${users.indexOf(u) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{users.indexOf(u)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{u.name }}</span>
            <span class="w-3/12 flex justify-center">{{u.email }}</span>
            <span class="w-2/12 flex ">{{u.tel}}</span>
            <span class="w-1/12 flex ">{{formatDateToAgo(u.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/users/'+u.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteCourse">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
                <BlueLinkAsButton :to="'/ui/admin/users/'+u.id">
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
import User from "../../../api/v2/User";
const users = ref([])
const getUsers = async () =>{
    const result = await User.get()
    if(result.data){
        users.value = result.data
    }
}
onMounted(()=>{
    getUsers()
})
</script>