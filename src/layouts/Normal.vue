<template>
    <section class="w-full h-full overflow-hidden block bg-white ">
        <Navbar/>
        <main class="w-full overflow-hidden grid grid-cols-12 h-full">
            <div class="md:col-span-2 md:flex hidden h-full">
                <NormalSideMenu/>
            </div>
            <div class="md:col-span-10 col-span-12 overflow-y-auto h-[calc(100vh-56px)]">
                <slot/>
            </div>
        </main>
        <Footer/>
    </section>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import NormalSideMenu from "../components/NormalSideMenu.vue"

export default {
    components: {
    NormalSideMenu,
    Navbar
},
}
</script>