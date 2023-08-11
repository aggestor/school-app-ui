<template>
    <section class="w-full h-full">
        <div class="w-[95%] mx-auto h-full">
            <div class="w-full flex justify-between items-end p-2 bg-white  mt-3 rounded">
                <h1 class="text-lg text-gray-700 font-semibold flex">
                    <GoBackAdminButton /> <span class="ml-2"> Liste de toutes vos branches</span>
                </h1>
                <span class="flex w-fit items-center">
                    <span class="h-8 w-8 font-semibold grid place-items-center bg-gray-200 rounded mr-2">{{ branches.length
                    }}</span>
                    <router-link to="/owner/branches/add">
                        <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white">
                            Ajouter
                            <PlusCircleIcon class="w-6 h-6" />
                        </span>
                    </router-link>
                </span>
            </div>
            <div v-if="branches.length > 0 && !loading" class=" flex justify-evenly mt-5 flex-wrap">
                <AdminBranchCard v-for="b of branches" :details="b" :key="b.id" />
            </div>
            <div v-else-if="loading" class=" flex justify-evenly mt-5 flex-wrap">
                <AdminBranchCardPlaceholder v-for="b of 3"/>
                
            </div>
            <div v-else class="">
                <NoData name="aucune branche" link="/owner/branches/add" />
            </div>
        </div>
    </section>
</template>
<script setup>
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import AdminBranchCard from "../../components/AdminBranchCard.vue"
import AdminBranchCardPlaceholder from "../../components/AdminBranchCardPlaceholder.vue"
import NoData from "../../components/NoData.vue"
import useVerify from '../../hooks/useVerify';
import Branch from '../../api/branch';
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router';

useVerify()
const route = useRoute()
const branches = ref([])
const loading = ref(false)
const getBranches = async (id) => {
    loading.value = true
    const result = await Branch.getForShop(id)
    if (result.type === "success" && result.data != false) {
        branches.value = !Array.isArray(result.data) ? [result.data] : result.data
    }
    loading.value = false
}
onMounted(() => getBranches(route.params.id))

</script>