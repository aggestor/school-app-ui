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
    <router-link :to="to"  class="bg-black text-[15px] text-white h-fit p-1 hover:bg-gray-700 hover:shadow-lg  rounded flex items-center justify-between"><slot/></router-link>
</template>