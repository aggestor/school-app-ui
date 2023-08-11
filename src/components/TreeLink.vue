<script>
    import {defineComponent} from "vue"
    props:{
        condition : Boolean,
        path : String,
        text:String
    }
    export default defineComponent({
        setup(){}
    })
</script>
<template>
<div v-if="condition">
    <router-link class="text-blue-600" :to="path">{{text }}</router-link> <ChevronRightIcon class="w-5 h5"/>
</div>
</template>