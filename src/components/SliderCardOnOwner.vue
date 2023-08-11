<template>
    <div class="h-80 m-1 w-[500px] border relative overflow-hidden rounded">
        <div class="h-full w-full">
            <img src="@/assets/images/examples/9.png" class="w-full h-full object-cover"/>
        </div>
        <div class="mt-3 w-full absolute text-sm bg-black bg-opacity-20 backdrop-blur text-white bottom-3 p-2">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis debitis id maxime doloremque commodi saepe neque asperiores aliquam exercitationem...
        </div>
    </div>
</template>
<script>
import { EnvelopeIcon, HomeModernIcon, PhoneIcon, UserIcon } from '@heroicons/vue/24/solid';
import { defineComponent } from 'vue';

export default defineComponent({
    setup() {
        console.log("ok");
    },
    components: { UserIcon, EnvelopeIcon, PhoneIcon, HomeModernIcon }
})
</script>