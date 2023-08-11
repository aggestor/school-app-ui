<template>
    <head>
        <title>{{title}} | Muyisphere</title>
        <meta name="keywords" :content="keywords"/>
        <meta name="description" :content="description"/>
    </head>
</template>
<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props:['title', 'keywords', 'description'],
    setup({title, keywords, description}) {
        return {title,keywords, description}
            
    }
})
</script>