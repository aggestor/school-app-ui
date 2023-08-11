<template>
    <router-link :to="path">
        <span v-if="variant === 'default'" class="text-gray-900 font-semibold duration-300 transition-colors text-base hover:text-blue-500">{{name}}</span>
        <span v-if="variant === 'bg'" class="text-white bg-blue-500 rounded p-1.5 hover:ring-2 hover:ring-blue-500 border-2 border-transparent hover:border-white font-semibold duration-200 transition-all text-base ">{{name}}</span>
    </router-link>
</template>
<script>
export default {
    name :"SimpleNavItem",
    props: {
        path: String,
        name: String,
        variant: String | null
    }
}
</script>