<template>
    <router-link :to="to"><span class="w-8 h-8 rounded bg-blue-700 text-white grid place-items-center"><LinkIcon class="w-6 h-6"/></span></router-link>
</template>
<script>
import { LinkIcon } from "@heroicons/vue/24/outline"
export default {
    components: { LinkIcon },
    props:['to']
}
</script>