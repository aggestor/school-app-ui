<template>
    <section class="w-full h-full overflow-hidden block bg-white ">
        <AdminNavbar/>
        <main class="w-full overflow-hidden flex h-full  bg-gray-200">
            <div class="md:w-[7%] lg:w-2/12 md:flex hidden h-full">
                <AdminSideBar/>
            </div>
            <div  class="md:w-[93%] lg:w-10/12 w-full bg-gray-200 overflow-y-auto h-[calc(100vh-56px)]">
                <slot/>
            </div>
        </main>
        <Footer/>
    </section>
</template>
<script>
import AdminNavbar from '../components/AdminNavbar.vue';
import AdminSideBar from '../components/AdminSideBar.vue';

export default {
    components: {
    AdminNavbar,
    AdminSideBar
    },
}
</script>