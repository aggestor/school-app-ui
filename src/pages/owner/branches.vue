<template>
    <section class="w-full h-full">
        <div class="w-[95%] mx-auto h-full">
            <div class="w-full flex justify-between items-end pb-2 border-b h-16">
                <h1 class="text-lg text-gray-700 font-semibold flex"><GoBackAdminButton/> <span class="ml-2"> Liste de toutes vos branches</span></h1>
                <span class="flex w-fit items-center">
                    <span class="h-8 w-8 font-semibold grid place-items-center bg-gray-200 rounded mr-2">{{branches.length }}</span>
                    <router-link to="/owner/shops/branches/create">
                        <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> Ajouter <PlusCircleIcon class="w-6 h-6"/></span>
                    </router-link>
                </span>
            </div>
            <div v-if="branches.length > 0" class=" flex justify-evenly mt-5 flex-wrap">
                <ManagerBranchCard v-for="b of branches" :details="b" :key="b.id"/>
            </div>
        </div>
    </section>
</template>
<script>
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';
import Branch from "../../api/branch"
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import ManagerBranchCard from "../../components/ManagerBranchCard.vue"
import useVerify from '../../hooks/useVerify';
import { ref,onMounted } from 'vue';

export default defineComponent({
    setup() {
        useVerify('owner')
        const branches = ref([])
        const loading = ref(false)
        const getBranchesByOwner = async (id) =>{
            loading.value = true
            const result = await Branch.getByOwner(id)
            console.log(result);
            if(result.type === "success" && result.data != false){
                branches.value  = !Array.isArray(result.data) ? [result.data] : result.data
            }
            loading.value = false
        }
        onMounted(()=>{
            const user  = JSON.parse(localStorage.getItem('logged_in_user'))
            if(user){
                getBranchesByOwner(user.data.id)
            }
        })
       return {branches, loading}
    },
    components :{ PlusCircleIcon, GoBackAdminButton, ManagerBranchCard }
})
</script>