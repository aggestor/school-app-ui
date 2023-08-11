<script>
import { GlobeEuropeAfricaIcon } from "@heroicons/vue/24/outline";
import {defineComponent, onMounted, ref} from "vue"
export default defineComponent({
    props:{
        content : Object
    },
    setup(props) {
        const name = ref("")
        const country = ref("")
        const id = ref(0)
        onMounted(()=>{
            name.value = props.content.name
            id.value = props.content.id
            country.value = props.content.country
        })
        return{name,country,id}
    },
    components: { GlobeEuropeAfricaIcon }
})
</script>
<template>
    <router-link :to="'/products/filter/locations/'+name+'/'+id">
        <div class="md:w-72  w-[90vw] border cursor-pointer hover:border-none  group transition-colors duration-500  text-sm h-[100px] p-3 shadow-lg hover:shadow-xl hover:shadow-blue-300  overflow-hidden rounded">
            <div class="p-1 flex h-full items-center justify-between">
                <span class="w-20 h-20 rounded   text-blue-600 grid place-items-center"><GlobeEuropeAfricaIcon class="w-14 h-14"/></span>
                <div class="w-[70%]">
                    <h1 class="text-lg font-bold  text-blue-600">{{name}}</h1>
                <p class=" my-0.5 text-gray-600   w-full">{{country}}</p>
                </div>
            </div>
        </div>
    </router-link>
</template>