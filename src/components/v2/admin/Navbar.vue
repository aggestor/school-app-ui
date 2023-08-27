<template>
    <div class="w-full flex justify-between border-b sticky top-0  items-center p-2 h-12 bg-opacity-50 backdrop-blur-lg z-50 bg-white">
        <div class="w-7/12 flex items-center space-x-4 lg:w-6/12">
            <h1 class="text-black text-lg font-semibold">{{school.name }}</h1>
        </div>
        <div class="w-5/12 flex justify-end space-x-2">
            <span class="w-7 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-500 grid place-items-center rounded h-7 border">
                <MagnifyingGlassIcon class="w-6 h-6"/>
            </span>
            <span @click="logout" class="w-7 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-500 grid place-items-center rounded h-7 border">
                <PowerIcon class="w-6 h-6"/>
            </span>
            <span class="w-7 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-500 grid place-items-center rounded h-7 border">
                <UserIcon class="w-6 h-6"/>
            </span>
            <span class="w-7 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-500 grid place-items-center rounded h-7 border">
                <Bars3CenterLeftIcon class="w-6 h-6"/>
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref ,onMounted} from 'vue';
import Config from '../../../api/v2/Config';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon, PowerIcon, UserIcon } from '@heroicons/vue/24/outline';
import Auth from '../../../api/v2/Auth';
import { useRouter } from 'vue-router';


    const school = ref({})
    const router = useRouter()
    const getSchool = async () =>{
        const result = await Config.getSchool()
        if(result?.data[0])
        school.value = result.data[0]
    }
    onMounted(()=>{
        getSchool()
    })
    const logout  = async () =>{
        const result = await Auth.logout()
        if(result.success){
            window.sessionStorage.clear()
            router.push("/ui/login")
        }
    }
</script>