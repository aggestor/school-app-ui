<template>
    <router-link class="border hover:bg-blue-600 hover:text-white transition-colors duration-500 border-blue-600 text-blue-600 m-0.5 rounded-xl px-1" :to="'/products/filter/'+type+'/'+prettyString(name)+'/'+id">{{name }}</router-link>
</template>
<script>
    import {defineComponent} from "vue"
    import prettyString from "../../helpers/pretty-string.js"
    export default defineComponent({
        props:{
            type:String,
            name : String,
            id : String
        },
        setup(){
            return {prettyString}
        }
    })
    </script>
