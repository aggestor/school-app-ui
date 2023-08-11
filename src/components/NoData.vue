<script>
import { FaceFrownIcon } from "@heroicons/vue/24/outline";
import {defineComponent} from "vue"
export default defineComponent({
    props:{
        name:String, link:String
    },
    setup({name,link}){
        return{name,link}
    },
    components:{ FaceFrownIcon }
})
</script>
<template>
        <div class="w-full h-full text-gray-600 flex justify-center flex-col items-center">
            <FaceFrownIcon class="md:w-40 w-24"/>
            <p class="text-sm md:w-1/2 text-center">Nous n'avons trouvé {{name}} sur notre serveur. <router-link class="text-blue-600" :to="link">Ajouter des données</router-link> ou si vous croyez qu'il y a erreur, contactez l'administration.</p>
        </div>
</template>