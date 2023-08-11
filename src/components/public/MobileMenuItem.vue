<script>
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';


export default defineComponent({
    props: {
        name : String,
        path : String,
        callback: Function
    },
    setup({callback, path}){
        const router = useRouter()
        const onClickMenu = ()=>{
            callback()
            router.push(path)
        }
        return {onClickMenu}
    }
})
</script>
<template>
    <div @click="onClickMenu">
        {{name }}
    </div>
</template>