<template>
    <div class="w-full flex justify-between border-b sticky top-0  items-center p-2 h-12 bg-opacity-50 backdrop-blur-lg z-50 bg-white">
        <div class="w-7/12 flex items-center space-x-4 lg:w-6/12">
            <h1 class="text-black text-lg font-semibold">{{user.names+" "+user.firstname+" "+user.lastname }}/<span class="text-gray-500 text-sm">{{user.matricule }}</span></h1>
        </div>
        <div class="w-5/12 flex justify-end space-x-2">
            <span @click="logout" class="w-7 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-500 grid place-items-center rounded h-7 border">
                <PowerIcon class="w-6 h-6"/>
            </span>
            <RouterLink to="/ui/student/me" class="w-7 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-500 grid place-items-center rounded h-7 border">
                <UserIcon class="w-6 h-6"/>
            </RouterLink>
            <span class="w-7 hover:bg-blue-600 hover:text-white cursor-pointer transition-colors duration-500 grid place-items-center rounded h-7 border">
                <Bars3CenterLeftIcon class="w-6 h-6"/>
            </span>
        </div>
    </div>
</template>
<script setup>
import { ref ,onMounted} from 'vue';
import { Bars3CenterLeftIcon, PowerIcon, UserIcon } from '@heroicons/vue/24/outline';
import Auth from '../../../api/v2/Auth';
import { useRouter } from 'vue-router';

    const router = useRouter()
    const user = ref({})
    const logout  = async () =>{
        const result = await Auth.logout("eleve")
        if(result.success){
            window.sessionStorage.clear()
            router.push("/ui/student/login")
        }
    }
    const geStudent = () =>{
        const result = sessionStorage.getItem("user")
        if(result){
            user.value = JSON.parse(result)
        }
    }
    onMounted(()=>{
        geStudent()
    })
</script>