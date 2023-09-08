<template>
    <section class="w-full h-full overflow-hidden block bg-white">
        <main class="w-full overflow-hidden flex h-full">
            <div class="md:w-[55px] lg:w-2/12 md:flex hidden h-full">
                <SideBar/>
            </div>
            <div  class="md:w-[93%] lg:w-10/12 w-full overflow-y-auto h-screen">
                <Navbar/>
                <slot/>
            </div>
        </main>
        <Footer/>
    </section>
</template>
<script setup>
    import SideBar from '../components/v2/class-teacher/SideBar.vue';
    import Navbar from '../components/v2/class-teacher/Navbar.vue';
    import {ref} from "vue"
    import { useRouter } from 'vue-router';
    
    const router = useRouter()
    const isChecked = ref(false)
    const user = sessionStorage.getItem("user") ? JSON.parse(sessionStorage.getItem("user")) : null
    const token = sessionStorage.getItem("token") ?  JSON.parse(sessionStorage.getItem("token")) : null
    const type = sessionStorage.getItem("session_type") ? sessionStorage.getItem("session_type") : null
    if(user && token && type && type.toLocaleLowerCase() == 'titulaire'){
        isChecked.value = true
    }else{
        sessionStorage.clear()
        router.push(`/ui/all/login?continue=${window.location.pathname}`)
    }
</script>