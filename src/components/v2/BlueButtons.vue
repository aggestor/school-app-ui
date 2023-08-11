<script>
import { defineComponent } from 'vue';
export default defineComponent({
    props:{
        type : String,
        disabled:Boolean
    },
    setup(props){
        return props
    }
})

</script>
<template>
    <button :disabled="disabled" :type="type" @click="$emit('press')" class="bg-blue-600 text-[16px] text-white p-1 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300 rounded flex items-center justify-between"><slot/></button>
</template>