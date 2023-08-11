<template>
    <section class="w-full h-full">
        <div class="w-[95%] mx-auto h-full">
            <div class="w-full flex justify-between items-end pb-2 border-b h-16">
                <h1 class="text-lg text-gray-700 font-semibold flex"><GoBackAdminButton/> <span class="ml-2"> Liste de tous les gérants de vos branches</span></h1>
                <span class="flex w-fit items-center">
                    <span class="h-8 w-8 font-semibold grid place-items-center bg-gray-200 rounded mr-2">{{managers.length }}</span>
                    <!-- <router-link to="/owner/managers/add">
                        <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> Ajouter <PlusCircleIcon class="w-6 h-6"/></span>
                    </router-link> -->
                </span>
            </div>
            <div class=" flex justify-evenly mt-5 flex-wrap">
                <ManagerByOwnerCard v-if="managers.length > 0 && !loading" v-for="m of managers" :details="m" :key="m.id"/>
            </div>
        </div>
    </section>
</template>
<script setup>
import ManagerByOwnerCard from "../../components/ManagerByOwnerCard.vue"
import Shop from "../../api/shop"
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import useVerify from '../../hooks/useVerify';
import { ref,onMounted } from 'vue';
        useVerify('owner')
        const managers = ref([])
        const loading = ref(false)
        const picture = ref("")
        const getManagersByOwner = async (id) =>{
            loading.value = true
            const result = await Shop.getManagers(id)
            if(result.type === "success" && result.data != false){
                managers.value  = !Array.isArray(result.data) ? [result.data] : result.data
                picture.value = result.data.picture === "placeholder.jpg" ? '/images/placeholder.jpg': store+'/users/'+result.data.picture
            }
            loading.value = false
        }
        onMounted(()=>{
            const user  = JSON.parse(localStorage.getItem('logged_in_user'))
            if(user){
                getManagersByOwner(user.data.id)
            }
        })
</script>