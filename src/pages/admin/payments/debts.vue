<template>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Paiemtnts/Dettes</h1>
            </div>
           <div class="flex space-x-2 relative items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ payments?.length}}</span>
            <BlueLinkAsButton to="/ui/admin/payments/pay">
                <PlusIcon class="w-5 h-5 mr-1"/> Payer
            </BlueLinkAsButton>
            <BlueButtons @press="showMenu  = !showMenu">
                <FunnelIcon class="w-6 h-6"/> 
            </BlueButtons>
            <div v-if="showMenu" data-aos="slide-down" data-aos-duration="500" class="w-28 rounded-b flex flex-col h-fit absolute top-10 right-0 bg-white border z-50 bg-opacity-50 shadow-lg backdrop-blur">
                <RouterLink class="text-center w-full p-1 border-b hover:text-blue-600" to="/ui/admin/payments/debts">
                    Dettes
                </RouterLink>
                <RouterLink class="text-center w-full p-1 border-b hover:text-blue-600" to="/ui/admin/payments">
                    Solvables
                </RouterLink>
                <RouterLink class="text-center w-full p-1  hover:text-blue-600" to="/ui/admin/payments/insolvable">
                    Insolvables
                </RouterLink>
            </div>
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-1/12">#</span>
            <span class="w-3/12 flex justify-center">Elève</span>
            <span class="w-1/12 flex justify-center">Matricule</span>
            <span class="w-2/12 flex justify-center">Classe</span>
            <span class="w-1/12 flex justify-center">Montant</span>
            <span class="w-1/12 flex justify-center">Reste</span>
            <span class="w-2/12 ">Maj</span>
            <span class="w-[10%] flex justify-center text-center">Actions</span>
        </div>

        <div v-for="o of payments" :class="` py-2 text-sm  flex items-center justify-between ${payments.indexOf(o) % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-1/12">{{payments.indexOf(o)+1 }}</span>
            <span class="w-3/12 flex justify-center">{{o.names+' '+o.firstname+' '+o.lastname }}</span>
            <span class="w-1/12 flex justify-center">{{o.matricule }}</span>
            <span class="w-2/12 flex justify-center">{{o.name }}</span>
            <span class="w-1/12 flex justify-center"><span class="p-0.5 bg-green-200 text-green-600 rounded">+{{o.montant }}$</span></span>
            <span class="w-1/12 flex justify-center"><span class="p-0.5 bg-red-200 rounded text-red-600"> -{{parseInt(o.scolarite)+parseInt(o.dettes) - parseInt(o.montant) }}$</span></span>
            <span class="w-2/12 flex ">{{formatDateToAgo(o.updated_at) }}</span>
            <span class="w-[10%] flex items-center justify-around">
                <BlackLinkAsButton :to="'/ui/admin/payments/'+o.id+'/update'">
                    <PencilIcon class="w-5 h-5"/>
                </BlackLinkAsButton>
                <RedButtons @press="deleteInscription">
                    <TrashIcon class="w-5 h-5"/>
                </RedButtons>
                <BlueLinkAsButton :to="'/ui/admin/payments/'+o.id">
                    <ArrowRightIcon class="w-5 h-5"/>
                </BlueLinkAsButton>
            </span>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import Payment from "../../../api/v2/Payment";
import { formatDateToAgo } from "../../../helpers/format-date";
import BlueLinkAsButton from "../../../components/v2/BlueLinkAsButton.vue";
import BlackLinkAsButton from "../../../components/v2/BlackLinkAsButton.vue";
import RedButtons from "../../../components/v2/RedButtons.vue";
import BlueButtons from "../../../components/v2/BlueButtons.vue";
import {   ArrowRightIcon, FunnelIcon, PencilIcon, PlusIcon, TrashIcon } from "@heroicons/vue/24/outline";
import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";

const payments = ref([])
const showMenu = ref(false)
const fetchPayments = async () =>{
    const result = await Payment.get('dettes')
    if(result.success){
        payments.value = result.data.data
    }
}
onMounted(()=>{
    fetchPayments()
})
</script>