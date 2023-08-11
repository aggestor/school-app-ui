<template>
    <div @click="redirect" class="h-[300px] m-1 w-80 cursor-pointer hover:shadow-xl shadow-lg transition-colors duration-500 hover:shadow-blue-300 border overflow-hidden rounded">
        <div class="h-40 w-full">
            <img :src="store+'/shops/'+logo" class="w-full h-full object-cover"/>
        </div>
        <div class="mt-1 flex flex-col justify-around h-[140px] p-2">
            <div class="font-semibold flex mb-1 items-end"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><HomeModernIcon class="h-5 w-5"/></span>{{name }}</div>
            <div class="flex text-gray-600  text-sm items-end  mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><GlobeEuropeAfricaIcon class="h-5 w-5"/></span>{{location }},{{full_address }}</div>
            <div class="flex justify-between">
                    <a :href="'mailto:'" class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><EnvelopeIcon class="h-5 w-5"/></a>
                    <a :href="'tel:'+contact" class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><PhoneIcon class="h-5 w-5"/></a>
                    <a target="_blank" :href="`https://wa.me/${contact_whatsapp?.slice(1)}/?text= Bonjour, je suis interesse(e) par les produits de votre shop *${name}*`" class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><WhatsApp class="h-5 w-5"/></a>
            </div>
        </div>
    </div>
</template>
<script>
import { CalendarDaysIcon, GlobeEuropeAfricaIcon, MapIcon } from '@heroicons/vue/24/outline';
import { EnvelopeIcon, HomeModernIcon, PhoneIcon, UserIcon } from '@heroicons/vue/24/solid';
import WhatsApp from "../components/public/Whatsapp.vue"
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../api';

export default defineComponent({
    props : {
        details: Object
    },
    setup({details}) { 
        const router = useRouter()
        const redirect = () =>{
            router.push('/owner/branches/'+details.id)
        } 
        return {...details, store, redirect}
    },
    components: { UserIcon, EnvelopeIcon, PhoneIcon, HomeModernIcon, GlobeEuropeAfricaIcon, MapIcon, CalendarDaysIcon, WhatsApp }
})
</script>