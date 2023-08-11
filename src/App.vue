
<template>
<div>
    <component :is="layout">
        <router-view/>
    </component>
</div>
</template>
<script>
import { useUserStore } from './store/user'
    
export default {
    name: "App",
    computed: {
        layout() {
            return (this.$route.meta.layout || 'default') + '-layout' 
        },
    },
    watch: {
        '$route.path': {
            handler() {
                this.auth()
            },immediate:true
        }
    },
    methods: {
        auth() {
            const store = useUserStore()
            const user = JSON.parse(localStorage.getItem("u53r"))
            if (user) {
                store.setData(user)
               store.setBool(true)
            }
        }
    }
}
</script>
