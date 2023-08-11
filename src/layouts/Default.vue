<template>
    <section class="w-full h-full block bg-white ">
        <Navbar/>
        <main class="w-full  h-full">
            <slot/>
        </main>
        <Footer/>
    </section>
</template>
<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

export default {
    components: {
    Navbar,
    Footer
    },
}
</script>