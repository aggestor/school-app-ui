<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="goBack" class="w-7 p-1 h-7 mr-3 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-600 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <ArchiveBoxIcon class="h-7 w-7 mr-2"/> Liste de vos produits</h1>
                <div class="w-[40%]  flex items-center justify-between h-full">
                    <button @click="prev" class="bg-gray-800 hover:bg-gray-700 h-fit  hover:shadow-gray-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1 border border-gray-800 font-semibold">&larr; Précedent</button>
                    <span class="text-gray-600">{{interval}}</span>
                    <button @click="next" class="bg-gray-800 hover:bg-gray-700 h-fit  hover:shadow-gray-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1 border border-gray-800 font-semibold">Suivant &rarr;</button>
                </div>
                <div class="w-[15%] flex items-center justify-between">
                    <span class="h-8 w-8 mr-2 rounded bg-gray-300 grid place-items-center">{{total}}</span> <router-link to="/owner/products/create"><button class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1  font-semibold"> <PlusCircleIcon class="h-6 w-6 mr-1"/>Ajouter</button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3 font-semibold flex justify-between border-b border-gray-300 p-2">
                <span class="w-1/12">#</span>
                <span class="w-3/12">Nom</span>
                <span class="w-2/12">Categ.</span>
                <span class="w-1/12">Qty.</span>
                <span class="w-1/12">Prix</span>
                <span class="w-1/12">Status</span>
                <span class="w-1/12">Modif.</span>
                <span class="w-1/12 text-center">---</span>
            </div>
            <div v-if="data" v-for="s of data" class="flex flex-col">
                <div :key="s.prod_id"  :class="`w-full text-gray-700 text-sm mb-1.5 font-semibold flex justify-between ${data.indexOf(s) % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="w-1/12">{{data.indexOf(s)+1}}</span>
                    <span class="w-3/12">{{s.prod_name}}</span>
                    <span class="w-2/12">{{s.category}}</span>
                    <span class="w-1/12">{{s.quantity?.split('_')[1]}}</span>
                    <span class="w-1/12">{{s.price?.split('_')[1]}}$</span>
                    <span class="w-1/12"><CheckCircleIcon v-if="s.prod_status == 1" class="text-green-600 w-5 h-5"/> <NoSymbolIcon v-if="s.prod_status == 0" class="text-red-600 w-5 h-5"/></span>
                    <span class="w-1/12">{{moment(s.last_update).fromNow(true)}}</span>
                    <span class="w-1/12 flex justify-center space-x-2">
                        <router-link :to="'/owner/products/'+prettyString(s.prod_name)+'/'+s.prod_id"><span class="w-6 h-6 bg-gray-700 rounded text-white grid place-items-center"><EyeIcon class="w-4 h-4"/></span></router-link>
                        <router-link :to="'/owner/products/'+prettyString(s.prod_name)+'/'+s.prod_id+'/update'"><span class="w-6 h-6 bg-gray-700 rounded text-white grid place-items-center"><PencilIcon class="w-4 h-4"/></span></router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {BarsArrowDownIcon, ArrowLeftIcon,PencilIcon, ArchiveBoxIcon, CheckCircleIcon, NoSymbolIcon, EyeIcon} from "@heroicons/vue/24/solid"
import {PlusCircleIcon} from "@heroicons/vue/24/outline"
import Product from "../../api/product"
import prettyString from "../../helpers/pretty-string"
import { ref, onMounted, watch} from "vue"
import { useRouter } from "vue-router"
import moment from "moment"
import useVerify from "../../hooks/useVerify"

export default {
    components: {
    BarsArrowDownIcon,
    ArrowLeftIcon,
    PlusCircleIcon,
    PencilIcon,
    ArchiveBoxIcon,
    CheckCircleIcon,
    NoSymbolIcon,
    EyeIcon
},
    setup() {
        useVerify('owner')
        const types = ref([]) ,
            data= ref([]) ,
            currentStep = ref(0) ,
            maxSteps = ref(0) ,
            interval = ref('') ,
            total = ref(0) 
            const router = useRouter()
        async function getProducts(id) {
            const result = await Product.getShopOwner(id)
            if (result.type === "success") {
                types.value = result.data;
            }
        }
        function calculate() {
            const t = types.value.length
            total.value = t
            const nbrDePage = t / 50
            maxSteps.value = Math.ceil(nbrDePage) - 1
            const t2 = types.value.slice()
            data.value = t2.splice(0, 50)
            currentStep.value = 0 
            interval.value = "1-50"
        }
        function goBack() {
            router.back()
        }

        function next() {
            if (currentStep.value < maxSteps.value ) {
                currentStep.value += 1
            }
        }
        function prev() {
            if (currentStep.value <= maxSteps.value && currentStep.value != 0) {
                currentStep.value  -= 1
            }
        }
        function loadByStep(step) {
            const calc = step * 50
            data.value = types.value.slice(calc, calc + 50)
            currentStep.value = step
            if (currentStep.value === maxSteps.value) {
                interval.value = `${calc} - ${total}`
            } else { 
                interval.value = `${calc} - ${calc+50}`
            }
        }
        
        onMounted(() => {
            const user = JSON.parse(localStorage.getItem('logged_in_user'))
            if(user)
              getProducts(user.data.id).then(()=> calculate())  
        })
        watch({
            currentStep(newQ, oldQ) {
                loadByStep(newQ)
            }
        })
        return {prettyString, types, data, currentStep,moment, maxSteps, interval, total, next, goBack, prev}
    }
}
</script>