<template>
    <div class="col-span-5 hidden lg:flex justify-center relative h-[70%] overflow-hidden  border rounded">
        <carousel wrap-around="true" autoplay="2000" class="w-full h-[350px]"  :items-to-show="1">
            <slide  v-for="slide in sliders" :key="slide.id">
                <div class="w-full h-full text-white">
                    <div class="absolute bottom-0 z-10 p-1 w-full text-sm h-16 bg-black bg-opacity-30 backdrop-blur">
                       <div class="flex"> <BuildingStorefrontIcon class="w-5 h-5 mr-1"/> <span>{{slide?.shop_name }}</span></div>
                       <div class="flex"> <LinkIcon class="w-5 h-5 mr-1"/> <span>{{slide?.slider_name }}</span></div>
                    </div>
                <img :src="store+'/sliders/'+slide.thumbnail" class="w-full h-full"/>
            </div>
        </slide>
        <template #addons>
        <navigation />
        </template>
  </carousel>
  <div class="absolute top-1 right-1 text-sm  py-0.5  bg-black bg-opacity-50 backdrop-blur-md px-1.5 text-white rounded-full">
    Sponsorised
  </div>
    </div>
</template>
<script setup>
import { BuildingStorefrontIcon, LinkIcon } from '@heroicons/vue/24/solid';
import { ref, onMounted } from 'vue';
import {Carousel, Slide, Navigation} from "vue3-carousel"
import "vue3-carousel/dist/carousel.css"
import { store } from '../../api';
import Slider from "../../api/slider"


            const sliders = ref([])
            const getSliders = async () =>{
                const result = await Slider.getChecked()
                if(result.type === "success"){
                    console.log(result.data);
                    sliders.value = !Array.isArray(result.data) ? [result.data] : result.data
                }
            }
            onMounted(getSliders)
</script>