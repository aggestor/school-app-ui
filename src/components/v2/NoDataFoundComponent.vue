<script>
import { defineComponent } from 'vue';
import { FaceFrownIcon } from '@heroicons/vue/24/outline';
export default defineComponent({
    props: {
        title: String,
        text: String
    },
    setup(props) {
        return props;
    },
    components: { FaceFrownIcon }
})

</script>
<template>
  <div class="w-6/12 h-60 rounded flex border">
    <div class="w-44 h-full flex items-center">
        <FaceFrownIcon class="h-40 w-40 text-gray-500"/>
    </div>
    <div class="flex flex-col p-2 w-full justify-center h-full ">
        <h2 class="text-gray-700 font-semibold mb-2 text-xl">{{ title }}</h2>
        <p class="text-gray-600">{{ text }}</p>
    </div>
  </div>
</template>