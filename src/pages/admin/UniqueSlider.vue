

<template>
    <div class="w-full flex justify-center items-center h-full">
        <div class="h-[90%] p-3 w-[95%] bg-white">
            <div class="w-full border-b h-14 flex justify-between items-center">
                <PagesNavigationHeader title="Description du carousel"/>
                <router-link to="/admin/sliders/create"><button class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1 font-semibold"> <PlusCircleIcon class="h-6 w-6 mr-1"/>Ajouter</button></router-link>
            </div>
            <div class="w-full flex justify-between items-center h-[80%] space-x-8 mt-2">
                <div class=" rounded shadow h-64  w-6/12">
                    <img :src="store +'/sliders/'+carousel.thumbnail" class="w-full h-full object-cover" alt="">
                </div>
                <div class="w-6/12 h-[60%] p-2 flex flex-col justify-between">
                    <div class="flex justify-between">
                        <span>Titre</span> <span class="font-semibold">{{carousel.slider_name}}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Debut</span> <span class="font-semibold"> {{moment(carousel.start_time).format("ll")}}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Duree</span> <span class="font-semibold"> {{carousel.duration}} jours</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Proprietaire</span> <span class="font-semibold"> {{carousel.shop_name}} jours</span>
                    </div>
                    <div class="flex justify-between">
                        <span>YouTube</span> <span class="font-semibold"> {{carousel.youtube}}</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Status</span> <span :class="`font-semibold ${carousel.status == 1 ? 'text-green-600': 'text-yellow-500'}`"> {{carousel.status == 1 ? "En cours": "En attente"}}</span>
                    </div>
                </div>
            </div>
            <div class="w-full flex items-center justify-between h-12">
                <p class="text-xs w-8/12">Ce carousel est uploader sur notre plateforme et respecte normalement {{" "}} nos <router-link class="text-blue-600" to="/terms/carousel">regles</router-link> &ThinSpace; sur la mise en place des carousel et leur facon de fonctionnner.</p>
                <router-link :to="'/admin/sliders/'+carousel.slider_id+'/update'"><button class="bg-blue-600 hover:bg-blue-700  hover:shadow-blue-300 hover:shadow-lg flex text-white duration-500 transition-colors rounded p-1.5 items-center font-semibold"> <PencilIcon class="h-5 w-5 mr-1"/> Modifier ce carousel</button></router-link>
            </div>
        </div>
    </div>
</template>
<script>
import { PencilIcon, PlusCircleIcon } from '@heroicons/vue/24/solid';
import { defineComponent, ref, onMounted } from 'vue';
import PagesNavigationHeader from '../../components/PagesNavigationHeader.vue';
import useVerify from '../../hooks/useVerify';
import Slider from "../../api/slider"
import { useRoute } from 'vue-router';
import { store } from '../../api';
import moment from 'moment';
export default defineComponent({
    setup(){
        useVerify()
        const carousel = ref({})
        const getCarousel = async (id) =>{
            const result = await Slider.get(id)
            if(result.type === "success"){
                carousel.value = result.data
            }
        }
        const route = useRoute()
        onMounted(()=> getCarousel(route.params.id))
        return {carousel, store,moment}
    },
    components:{ PagesNavigationHeader, PlusCircleIcon, PencilIcon }
})
</script>