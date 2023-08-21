<template>
    <div data-aos="zoom-in" data-aos-duration="500" class="w-full grid place-items-center h-full fixed top-0 left-0 bg-black bg-opacity-20 backdrop-blur-sm z-[400]">
        <div class="w-[450px] h-52 border-t-4 border-red-600 p-3  bg-white shadow-lg rounded">
            <div class="w-full flex justify-end">
                <span @click="$emit('cancel')" class="w-6 h-6 rounded hover:bg-gray-100 cursor-pointer grid place-items-center">
                    <XMarkIcon class="w-5 text-gray-500 h-5"/>
                </span>
            </div>
            <h1 class="w-full mb-2 text-center font-semibold text-lg">{{ title }}</h1>
            <p class="w-9/12 mb-2 text-sm mx-auto text-center text-gray-700"> {{text }}</p>
            <div class="w-fit mx-auto mb-3 flex space-x-3">
                <button @click="$emit('cancel')" class="p-1 rounded border bg-black text-white flex items-center">Annuler</button>
                <button @click="$emit('confirm')" class="p-1 rounded  hover:bg-red-700 hover:shadow-lg hover:shadow-red-300 flex bg-red-600  text-white items-center"><TrashIcon class="w-4 h-4 mr-1"/> Supprimer</button>
            </div>
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { TrashIcon, XMarkIcon } from '@heroicons/vue/24/outline';

export default defineComponent({
    components:{ XMarkIcon, TrashIcon },
    props:['title', 'text'],
    setup(props){
        return props
    }

})

</script>