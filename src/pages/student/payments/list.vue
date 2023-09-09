<template>
    <div class="w-[95%] mt-2 mx-auto">
        <div class="flex border-b mb-3 py-2 items-center justify-between">
            <div class="flex  items-center">
                <GoBackAdminButton/>
                <h1 class="text-lg font-semibold ml-2">Paiments</h1>
            </div>
           <div class="flex space-x-2 relative items-center">
            <span class="w-7 h-7 mr-2 rounded bg-gray-200 grid place-items-center">{{ payments?.length}}</span>
            
           </div>
        </div>
        <div class="border-b pb-1  font-semibold flex items-center justify-between">
            <span class="w-3/12">#</span>
            <span class="w-3/12 flex justify-center">Libelle</span>
            <span class="w-3/12 flex justify-center">Montant</span>
            <span class="w-3/12 ">Maj</span>
        </div>

        <div v-for="o,i of payments" :class="` py-2 text-sm  flex items-center justify-between ${i % 2 != 0 ? 'bg-gray-100' :''}`">
            <span class="w-3/12">{{i+1 }}</span>
            <span class="w-3/12 flex justify-center">{{o.libelle }}</span>
            <span class="w-3/12 flex justify-center"><span class="p-0.5 bg-green-200 text-green-600 rounded">+{{o.montant }}$</span></span>
            <span class="w-3/12 flex ">{{formatDateNormal(o.updated_at) }}</span>
        </div>
        <div class="w-full flex mt-2 border-t pb-1">
            <div class="w-6/12 text-right"></div>
            <div class="w-3/12"><div class="text-blue-600 rounded border p-0.5 border-blue-300 bg-blue-100 w-fit mt-1"><b>Total :</b> {{ total }}$ / {{ fees }} $</div></div>
        </div>
    </div>
</template>
<script setup>
import {onMounted, ref} from "vue"
import Payment from "../../../api/v2/Payment";
import { formatDateNormal } from "../../../helpers/format-date";;

import GoBackAdminButton from "../../../components/GoBackAdminButton.vue";

const payments = ref([])
const total = ref(0)
const fees = ref(0)
const fetchPayments = async () =>{
    const result = await Payment.getByStudent()
    if(result.success){
        payments.value = result.data.data
        fees.value = parseInt(result.data.data[0].scolarite)
        const d = result.data.data.reduce((acc,{montant}) => acc+parseFloat(montant),0)
        total.value = d
    }
}
onMounted(()=>{
    fetchPayments()
})
</script>