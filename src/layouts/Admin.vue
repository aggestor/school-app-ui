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
<script>
import SideBar from '../components/v2/admin/SideBar.vue';
import Navbar from '../components/v2/admin/Navbar.vue';

export default {
    components: {
    Navbar,
    SideBar,
},
}
</script>