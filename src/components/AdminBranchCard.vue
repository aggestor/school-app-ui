<template>
    <router-link :to="'/admin/shops/'+shop_id+'/branches/'+id" class="h-[320px] m-1 w-80 bg-white __shad border overflow-hidden rounded">
        <div class="h-40 w-full">
            <img :src="store+'/shops/'+logo || '@/assets/images/examples/9.png'" class="w-full h-full object-cover"/>
        </div>
        <!-- <div class="mt-1 p-2">
            <div class="font-semibold flex mb-1 items-end"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><HomeModernIcon class="h-5 w-5"/></span>{{name}}</div>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><EnvelopeIcon class="h-5 w-5"/></span>{{email || "Non-donnee" }}</div>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><PhoneIcon class="h-5 w-5"/></span>{{contact }}</div>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><PhoneIcon class="h-5 w-5"/></span>{{contact_whatsapp }}</div>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><GlobeEuropeAfricaIcon class="h-5 w-5"/></span>{{location }}</div>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><MapIcon class="h-5 w-5"/></span>{{full_address }}</div>
        </div> -->
        <div class="mt-1 flex flex-col justify-around h-[150px] p-2">
            <div class="font-semibold flex mb-1 items-end"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><HomeModernIcon class="h-5 w-5"/></span>{{name }}</div>
            <div class="flex text-gray-600 items-end text-sm  mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><GlobeEuropeAfricaIcon class="h-5 w-5"/></span>{{location }},{{full_address }}</div>
            <div class="flex text-gray-600 items-end  text-sm mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><CalendarDaysIcon class="h-5 w-5"/></span>{{moment(last_update).format('ll')}}</div>
            <div class="flex justify-between">
                    <a :href="'mailto:'" class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><EnvelopeIcon class="h-5 w-5"/></a>
                    <a :href="'tel:'+contact" class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><PhoneIcon class="h-5 w-5"/></a>
                    <a target="_blank" :href="`https://wa.me/${contact_whatsapp?.slice(1)}/?text= Bonjour, je suis interesse(e) par les produits de votre shop *${name}*`" class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><Whatsapp class="h-5 w-5"/></a>
            </div>
        </div>
    </router-link>
</template>
<script>
import { CalendarDaysIcon, GlobeEuropeAfricaIcon, MapIcon } from '@heroicons/vue/24/outline';
import { EnvelopeIcon, HomeModernIcon, PhoneIcon, UserIcon } from '@heroicons/vue/24/solid';
import { defineComponent, onMounted,ref } from 'vue';
import moment from 'moment';
import {store} from "@/api/index"
import Location from '@/api/location';
import Whatsapp from './public/Whatsapp.vue';

export default defineComponent({
    props:['details'],
    setup({details}) {
        const locations = ref([])
        const getLocations = async () =>{
            const result = await Location.getAll()
            if(result.type === "success"){
                locations.value = !Array.isArray(result.data) ? [result.data]: result.data
            }
        }
        onMounted(()=>{
            getLocations()
        })
       return {...details, store, moment, locations}
    },
    components: { UserIcon, EnvelopeIcon, PhoneIcon, HomeModernIcon, GlobeEuropeAfricaIcon, MapIcon, CalendarDaysIcon, Whatsapp }
})
</script>