<template>
    <span @click="goBack" class="w-7 p-1 h-7 rounded-full hover:bg-blue-600 cursor-pointer bg-blue-700 text-white"><ArrowLeftIcon class="w-full h-full"/></span>
</template>
<script>
import { ArrowLeftIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';
export default {
    setup() {
        const router  = useRouter()
        const goBack = () => {
            router.back()
        }
        return {goBack}
    },
    components: { ArrowLeftIcon }
}

</script>