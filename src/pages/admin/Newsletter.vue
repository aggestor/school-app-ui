<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] rounded shadow flex flex-col pt-2 pb-4 px-4 h-auto py-6 bg-white">
            <div class="w-full sticky top-0 bg-white flex items-center justify-between h-14 mb-3 border-b border-gray-300">
                <h1 class="text-lg font-semibold text-gray-700 flex"> <span @click="goBack" class="w-7 p-1 h-7 mr-3 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-500 text-white"><ArrowLeftIcon class="w-full h-full"/></span> <span class="mx-1">|</span> <EnvelopeIcon class="h-7 w-7 mr-2"/> Notre newsletter</h1>
                <div class="w-[15%] flex items-center justify-end">
                    <span class="h-8 w-8 mr-2 rounded bg-gray-300 grid place-items-center">{{newsletter.length}}</span> 
                </div>
            </div>
           <div class="flex justify-between h-full space-x-4">
            <div class="w-7/12">
                <p class="my-2 text-sm text-gray-600">Salut, dans le champs ci-bas tapez un message que vous allez envoyer a tous les utilisateurs abonnes a notre newsletter.</p>
                <div class="w-full focus-within:border-2 focus-within:border-blue-600  h-96 rounded border p-1">
                    <textarea class="w-full h-full outline-none resize-none" placeholder="Taper votre message..."></textarea>
                </div>
                <div class="w-full my-2 flex justify-end">
                    <button class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1.5 items-center font-semibold">  Envoyer le mail <PaperAirplaneIcon class="h-5 w-5 ml-1"/></button>
                </div>
            </div>
            <div class="w-5/12">
                <div class="w-full text-gray-700 mb-3 font-semibold text-sm flex justify-between border-b border-gray-300 p-2">
                <span class="w-1/12">#</span>
                <span class="w-5/12">Email</span>
                <span class="w-3/12 text-center">Abonnement</span>
                <span class="w-3/12 text-center">Status</span>
            </div>
            <div v-for="cat of newsletter" class="flex flex-col">
                <div :key="cat.id"  :class="`w-full text-gray-700 text-sm mb-1.5  flex justify-between ${newsletter.indexOf(cat) % 2 == 0 ?'bg-white' :'bg-gray-100'} p-2`">
                    <span class="w-1/12">{{newsletter.indexOf(cat)+1}}</span>
                    <span class="w-5/12 font-semibold">{{cat.email}}</span>
                    <span class="w-3/12 text-center">{{moment(cat.created_at).format('ll')}}</span>
                    <span class="w-3/12 flex justify-center"><CheckCircleIcon v-if="cat.status == 1" class="text-green-600 w-5 h-5"/><NoSymbolIcon v-else  class="text-red-600 w-5 h-5"/> </span>
                </div>
            </div>
            </div>
           </div>
        </div>
    </div>
</template>
<script>
import Newsletter from "../../api/newsletter"
import {Bars3CenterLeftIcon, ArrowLeftIcon, PencilIcon, CheckCircleIcon, NoSymbolIcon, EnvelopeIcon, PaperAirplaneIcon} from "@heroicons/vue/24/solid"
import moment from 'moment'
import prettyString from "../../helpers/pretty-string"
import {PlusCircleIcon} from "@heroicons/vue/24/outline"
import { ref, onMounted } from "vue"
import { useRouter } from "vue-router"
import useVerify from "../../hooks/useVerify"

export default {
    components: {
    Bars3CenterLeftIcon,
    ArrowLeftIcon,
    PlusCircleIcon,
    PencilIcon,
    CheckCircleIcon,
    NoSymbolIcon,
    EnvelopeIcon,
    PaperAirplaneIcon
},
    setup() {
        useVerify()
        const newsletter = ref([])
        async function getNewsletter() {
            const result = await Newsletter.getAll()
            if (result.type === "success") {
                if(!Array.isArray(result.data))
                 newsletter.value = [result.data];
                else newsletter.value = result.data;
            }
        }
        function goBack() {
            const router = useRouter()
            router.back()
        }
       onMounted(()=> getNewsletter())
      return {
            prettyString, moment,
            newsletter,goBack
        }  
    }
}
</script>