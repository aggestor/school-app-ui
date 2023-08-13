<template>
    <div data-aos="zoom-in" data-aos-duration="500" class="w-[500px] h-[200px] relative  justify-between p-3 bg-green-100 items-center flex rounded-lg shadow">
    <span @click="$emit('press')" class="w-7 absolute top-1 right-1 h-7 p-0.5 hover:bg-gray-100 rounded-lg  grid place-items-center cursor-pointer text-gray-600"><XMarkIcon class="w-6 h-6"/></span>
    <CheckCircleIcon class="w-28 h-28 text-green-600"/>
    <div class="w-[70%] h-40  flex flex-col justify-center">
        <h1 class="text-black mb-1 font-bold text-xl">{{title || "Success"}}</h1>
        <p class="text-black mb-1">{{message || " Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque neque in, ea fugit minima tempore est quibusdam ipsum."}}</p>
        <router-link class="rounded-lg text-white p-1 bg-green-600 w-fit" :to="next || '/test' ">{{nextText || "Retour"}}</router-link>
    </div>
</div>
</template>
<script>
import { XMarkIcon } from '@heroicons/vue/24/outline';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';
import { defineComponent } from 'vue';

export default defineComponent({
    props: ['title', 'next', 'nextText', 'message'],
    components: { CheckCircleIcon, XMarkIcon },
    setup(props){
        return props
    }
})
</script>