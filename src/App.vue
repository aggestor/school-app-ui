
<template>
<div>
    <component :is="layout">
        <router-view/>
    </component>
</div>
</template>
<script>
    
export default {
    name: "App",
    computed: {
        layout() {
            return (this.$route.meta.layout || 'splash') + '-layout' 
        },
    },
    watch: {
        '$route.path': {
            handler() {
              
            },immediate:true
        }
    },
    methods: {
    }
}
</script>
