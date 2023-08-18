<template>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Liste de roles</h1>
            </div>
           <div class="flex items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ roles?.length}}</span>
            <BlueLinkAsButton to="/ui/admin/roles/create">
                <PlusIcon class="w-5 h-5 mr-1"/> Créer un role
            </BlueLinkAsButton>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Role</span>
            <span class="w-3/12 flex justify-center"></span>
            <span class="w-3/12 ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="o of roles" :class="` py-2 text-sm  flex items-center justify-between ${roles.indexOf(o) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{roles.indexOf(o)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{o.role }}</span>
            <span class="w-3/12 flex justify-center"></span>
            <span class="w-3/12 flex ">{{formatDateToAgo(o.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/roles/'+o.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteRole">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
            </span>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import Role from "../../../api/v2/Role";
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import {  ArrowRightIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";
const roles = ref([])
const fetchRoles = async () =>{
    const result = await Role.get()
    if(result.data){
        roles.value = result.data
    }
}
onMounted(()=>{
    fetchRoles()
})
</script>