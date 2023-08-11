<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="router.back()" class="w-7 p-1 h-7 mr-3 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <BarsArrowDownIcon class="h-7 w-7 hidden md:flex mr-2"/> Liste de carrousels</h1>
                <!-- <div class="w-[40%]  flex items-center justify-between h-full">
                    <button @click="prev" class="bg-gray-100 hover:bg-gray-200 h-fit  hover:shadow-gray-300 hover:shadow-lg flex text-gray-800 duration-500 transition-colors rounded p-1 border border-gray-800 font-semibold">&larr; Précedent</button>
                    <span class="text-gray-600">{{interval}}</span>
                    <button @click="next" class="bg-gray-100 hover:bg-gray-200 h-fit  hover:shadow-gray-300 hover:shadow-lg flex text-gray-800 duration-500 transition-colors rounded p-1 border border-gray-800 font-semibold">Suivant &rarr;</button>
                </div> -->
                <div class="w-[15%] flex items-center justify-between">
                    <span class="h-8 w-8 md:mr-2 p-1 m-1 rounded bg-gray-300 grid place-items-center">{{total}}</span> <router-link to="/admin/sliders/create"><button class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1 font-semibold"> <PlusCircleIcon class="h-6 w-6 md:mr-1"/><span class="hidden md:flex">Ajouter</span></button></router-link>
                </div>
            </div>
            <div class="w-full text-gray-700 mb-3 font-semibold flex justify-between border-b border-gray-300 p-2">
                <span class="w-1/12">#</span>
                <span class="w-3/12">Titre</span>
                <span class="w-2/12 hidden md:flex">Shop</span>
                <span class="w-2/12 hidden md:flex text-center justify-center">Durée</span>
                <span class="w-2/12">Status</span>
                <span class="w-2/12 text-center">---</span>
            </div>
            <div v-if="data" v-for="s of data" class="flex flex-col">
                <div :key="s.s_id"  :class="`w-full text-gray-700 text-sm mb-1.5  flex justify-between ${data.indexOf(s) % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="w-1/12">{{sliders.indexOf(s)+1}}</span>
                    <span class="md:w-3/12 w-4/12">{{s.slider_name}}</span>
                    <span class="w-2/12 md:flex hidden font-semibold">{{s.shop_name}}</span>
                    <span class="w-2/12 hidden md:flex justify-center text-center">{{s.duration}} jours</span>
                    <span class="md:w-2/12 w-3/12">{{moment(s.start_time).toNow()}}</span>
                    <span class="w-2/12 flex items-center justify-center">
                        <router-link :to="'/admin/sliders/'+s.slider_id+'/update'"><span class="w-6 h-6 bg-blue-600 mr-1 rounded text-white grid place-items-center"><PencilIcon class="w-4 h-4"/></span></router-link>
                        <router-link :to="'/admin/sliders/'+s.slider_id"><span class="w-6 h-6 bg-gray-700 rounded text-white grid place-items-center"><EyeIcon class="w-4 h-4"/></span></router-link>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {BarsArrowDownIcon, ArrowLeftIcon,PencilIcon, EyeIcon} from "@heroicons/vue/24/solid"
import {PlusCircleIcon} from "@heroicons/vue/24/outline"
import Slider from "../../api/slider"
import prettyString from "../../helpers/pretty-string"
import { ref, watch, onMounted } from "vue"
import moment from "moment"
import {useRouter} from "vue-router"
import useVerify from "../../hooks/useVerify"

export default {
    components: {
    BarsArrowDownIcon,
    ArrowLeftIcon,
    PlusCircleIcon,
    PencilIcon,
    EyeIcon
},
    setup() {
        useVerify()
        const sliders = ref([])
        const data = ref([])
        const currentStep = ref(0)
        const maxSteps = ref(0)
        const interval = ref('')
        const total = ref(0)
        const router = useRouter()

        const  getSliders = async() => {
            const result = await Slider.getAll()
            if (result.type === "success") {
                sliders.value = !Array.isArray(result.data)? [result.data]: result.data;
            }
        }
        const calculate = () => {
            const tot = sliders.value.length
            total.value = tot
            const nbrDePage = tot / 50
            maxSteps.value = Math.ceil(nbrDePage) - 1
            const t = sliders.value.slice()
            data.value = t.splice(0, 50)
            currentStep.value = 0 
            interval.value = "1-50"
        }
        const next = () => {
            if (currentStep.value < maxSteps.value ) {
                currentStep.value += 1
            }
        }
        const prev = () => {
            if (currentStep.value <= maxSteps.value && currentStep.value != 0) {
                currentStep.value  -= 1
            }
        }
        const loadByStep = (step) => {
            const calc = step * 50
            data.value = sliders.value.slice(calc, calc + 50)
            currentStep.value = step
            if (currentStep.value === maxSteps.value) {
                interval.value = `${calc} - ${total.value}`
            } else { 
                interval.value = `${calc} - ${calc+50}`
            }
        }
        onMounted(()=> getSliders().then(()=> calculate()))
        watch({
            currentStep(newQ, oldQ) {
                loadByStep(newQ)
            }
        })

        return {
            prettyString, sliders,moment, data, currentStep, maxSteps, interval, total, router, next, prev}
    }
}
</script>