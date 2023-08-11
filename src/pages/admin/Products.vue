<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="md:text-lg text-base font-semibold text-gray-700 flex"> <span @click="goBack" class="w-7 p-1 h-7 md:mr-3 mr-1 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-600 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <ArchiveBoxIcon class="h-7 w-7 mr-2"/> Liste de tous les produits</h1>
                <div class="w-[15%] flex items-center justify-between">
                    <span class="h-8 w-8 md:mr-2 mr-1 rounded bg-gray-300 grid place-items-center">{{total}}</span> <router-link to="/admin/products/create"><button class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1 font-semibold"> <PlusCircleIcon class="h-6  w-6 md:mr-1"/><span class="hidden md:flex">Ajouter</span> </button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3 font-semibold flex justify-between border-b border-gray-300 p-2">
                <span class="w-1/12 hidden md:flex">#</span>
                <span class="md:w-3/12 w-5/12">Nom</span>
                <span class="w-2/12 hidden md:flex">Catégorie</span>
                <span class="w-1/12 hidden md:flex">Quantité</span>
                <span class="w-1/12">Prix</span>
                <span class="md:w-1/12 w-2/12 ">Status</span>
                <span class="w-2/12 hidden md:flex">Modif</span>
                <span class="w-1/12 text-center">---</span>
            </div>
            <div v-if="data" v-for="s of data" class="flex flex-col">
                <div :key="s.cat_id"  :class="`w-full text-gray-700 text-sm mb-1.5  flex justify-between ${data.indexOf(s) % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                <span class="w-1/12 hidden md:flex">#</span>
                <span class="md:w-3/12 w-5/12 font-semibold">{{s.prod_name }}</span>
                <span class="w-2/12 hidden md:flex">{{s.category }}</span>
                <span class="w-1/12 hidden md:flex">{{s.quantity.split("_")[1] ? s.quantity.split("_")[1] : s.quantity_3.split("_")[1].toLocaleString()}}</span>
                <span class="w-1/12">{{s.price.split("_")[1] ? s.price.split("_")[1] : s.price_1.split("_")[1]}} $</span>
                <span class="md:w-1/12 w-2/12 "><CheckCircleIcon v-if="s.prod_status == 1" class="h-5 w-5 text-green-500"/><NoSymbolIcon class="h-5 w-5 text-red-500" v-else/></span>
                <span class="w-2/12 hidden md:flex">{{moment(s.last_update).format("ll") }}</span>
                <span class="w-1/12 flex justify-center items-center">
                    <router-link :to="'/admin/products/'+s.prod_id+'/update'"><span class="w-6 h-6 bg-blue-600 mr-1 rounded text-white grid place-items-center"><PencilIcon class="w-4 h-4"/></span></router-link>
                    <router-link :to="'/admin/products/'+s.prod_id"><span class="w-6 h-6 bg-gray-700 rounded text-white grid place-items-center"><EyeIcon class="w-4 h-4"/></span></router-link>
                </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {ArrowLeftIcon,PencilIcon, ArchiveBoxIcon, EyeIcon, CheckCircleIcon, NoSymbolIcon} from "@heroicons/vue/24/solid"
import {PlusCircleIcon} from "@heroicons/vue/24/outline"
import Product from "../../api/product"
import prettyString from "../../helpers/pretty-string"
import { ref, onMounted, watch} from "vue"
import { useRouter } from "vue-router"
import moment from "moment"

export default {
    components: {
    ArrowLeftIcon,
    PlusCircleIcon,
    PencilIcon,
    ArchiveBoxIcon,
    EyeIcon,
    CheckCircleIcon,
    NoSymbolIcon
},
    setup() {
        const types = ref([]) ,
            data= ref([]) ,
            currentStep = ref(0) ,
            maxSteps = ref(0) ,
            interval = ref('') ,
            total = ref(0) 
            const router = useRouter()
        async function getProducts() {
            const result = await Product.getAll()
            if (result.type === "success") {
                types.value = !Array.isArray(result.data) ? [result.data] : result.data ;
            }
        }
        function calculate() {
            const t = types.value.length
            total.value = t
            const nbrDePage = t / 50
            maxSteps.value = Math.ceil(nbrDePage) - 1
            console.log(types.value);
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
              getProducts().then(()=> calculate())  
        })
        watch({
            currentStep(newQ, oldQ) {
                loadByStep(newQ)
            }
        })
        return {prettyString, types, data, currentStep, maxSteps, interval, total, next, goBack, prev, moment}
    }
}
</script>