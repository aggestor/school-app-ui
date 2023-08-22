<template>
    <div class="w-full flex justify-between border-b sticky top-0  items-center p-2 h-12 bg-opacity-80 backdrop-blur-lg z-50 bg-white">
        <div class="w-7/12 lg:w-6/12 md:flex  hidden">
        </div>
    </div>
</template>
<script setup>
import { ref ,onMounted} from 'vue';
import Config from '../../../api/v2/Config';

    const school = ref({})
    const getSchool = async () =>{
        const result = await Config.getSchool()
        school.value = result.data[0]
    }
    onMounted(()=>{
        getSchool()
    })
</script>