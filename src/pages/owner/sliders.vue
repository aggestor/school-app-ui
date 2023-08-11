<template>
    <section class="w-full h-full">
        <div class="w-[95%] mx-auto h-full">
            <div class="w-full flex justify-between items-end pb-2 border-b h-16">
                <h1 class="text-lg text-gray-700 font-semibold flex"><GoBackAdminButton/> <span class="ml-2"> Liste de tous les gérants de vos branches</span></h1>
                <span class="flex w-fit items-center">
                    <span class="h-8 w-8 font-semibold grid place-items-center bg-gray-200 rounded mr-2">16</span>
                    <router-link to="/owner/managers/add">
                        <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> Ajouter <PlusCircleIcon class="w-6 h-6"/></span>
                    </router-link>
                </span>
            </div>
            <div class="flex mt-5 flex-wrap">
                <SliderCardOnOwner/>
                <SliderCardOnOwner/>
                <SliderCardOnOwner/>
                <SliderCardOnOwner/>
                <SliderCardOnOwner/>
                <SliderCardOnOwner/>
            </div>
        </div>
    </section>
</template>
<script>
import { PlusCircleIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import SliderCardOnOwner from "../../components/SliderCardOnOwner.vue"

export default defineComponent({
    setup() {
        console.log("ok")
    },
    components :{ SliderCardOnOwner, PlusCircleIcon, GoBackAdminButton }
})
</script>