<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props:{
        to : String
    },
    setup(props){
        return props
    }
})

</script>
<template>
    <router-link :to="to"  class="bg-blue-600 text-[15px] text-white h-fit p-1 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300 rounded flex items-center justify-between"><slot/></router-link>
</template>