<template>
    <div @click="redirect" class="h-36 p-2 items-center justify-between m-1 w-[90vw] md:w-96 cursor-pointer flex text-sm hover:shadow-lg shadow border overflow-hidden hover:border-none hover:shadow-blue-300 transition-colors duration-500 rounded">
        <div class="h-28 w-28 rounded overflow-hidden">
            <img :src="store+'/shops/'+content.logo" class="w-full h-full object-cover"/>
        </div>
        <div class="mt-1 w-[calc(100%-115px)] p-2">
            <div class="font-semibold flex mb-1 items-end"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><HomeModernIcon class="h-5 w-5"/></span>{{content.name }}</div>
            <a :href="'tel:'+content.contact" class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><PhoneIcon class="h-5 w-5"/></span>{{content.contact }}</a>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><MapPinIcon class="h-5 w-5"/></span>{{content.location_name+","+content.full_address }}</div>
        </div>
    </div>
</template>
<script>
import { CalendarDaysIcon, GlobeEuropeAfricaIcon, MapIcon, MapPinIcon } from '@heroicons/vue/24/outline';
import { EnvelopeIcon, HomeModernIcon, PhoneIcon, UserIcon } from '@heroicons/vue/24/solid';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { store } from '../../api';

export default defineComponent({
    props : {
        content: Object
    },
    setup({content}) { 
        const router = useRouter()
        const redirect = () =>{
            router.push('/shops/'+content.id)
        } 
        return {store, redirect}
    },
    components: { UserIcon, EnvelopeIcon, PhoneIcon, HomeModernIcon, GlobeEuropeAfricaIcon, MapIcon, CalendarDaysIcon, MapPinIcon }
})
</script>