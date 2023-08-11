<template>
    <div @click="redirect" class="h-[400px] m-1 w-72 cursor-pointer hover:shadow-lg border overflow-hidden rounded">
        <div class="h-60 w-full">
            <img :src="picture" class="w-full h-full object-cover"/>
        </div>
        <div class="mt-3 p-2">
            <div class="font-semibold flex mb-1 items-end"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><UserIcon class="h-5 w-5"/></span>{{name }}</div>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><EnvelopeIcon class="h-5 w-5"/></span>{{ email }}</div>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><PhoneIcon class="h-5 w-5"/></span>{{phone }}</div>
            <div class="flex items-end mb-1"><span class="h-7 w-7 mr-2 border place-items-center grid text-gray-600 rounded"><HomeModernIcon class="h-5 w-5"/></span>{{branch_name }}</div>
        </div>
    </div>
</template>
<script>
import { EnvelopeIcon, HomeModernIcon, PhoneIcon, UserIcon } from '@heroicons/vue/24/solid';
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
            router.push('/owner/managers/'+details.id)
        } 
        const picture = details.picture === "placeholder.jpg" ? '/images/placeholder.jpg': store+'/users/'+details.picture
        return {...details, store, redirect,picture}
    },
    components: { UserIcon, EnvelopeIcon, PhoneIcon, HomeModernIcon }
})
</script>