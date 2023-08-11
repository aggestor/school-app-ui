<template>
    <router-link :to="path">
    <span v-if="currentPath === path" class=" w-11/12 bg-gray-200  duration-500 transition-colors hover:bg-gray-300 items-center flex my-0.5 p-1.5 rounded space-x-3 text-gray-600 font-semibold">
        <slot/><span class="hidden lg:flex ml-4">{{text}}</span>
    </span>
    <span  v-else class=" w-11/12 items-center flex my-0.5 p-1.5 rounded text-gray-600 hover:bg-gray-100 duration-500 transition-colors">
        <slot/><span class="hidden lg:flex ml-4">{{text}}</span>
    </span>
    </router-link>
</template>
<script>
export default {
    props: {
        text: String,
        path: String,
        possiblePaths:[]
    },
    data() {
        return {
            currentPath:""
        }
    },
    mounted() {
        let self = this
        //this.currentPath = self.path
    },
    watch: {
        // '$route.path': {
        //     handler(value) {
        //         console.log(value)
        //         this.currentPath = value
        //     },
        //     deep: true
        // }
    }
}
</script>