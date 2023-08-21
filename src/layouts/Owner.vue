<template>
    <section class="w-full h-full overflow-hidden block bg-white ">
        <OwnerNavbarVue/>
        <main class="w-full overflow-hidden grid grid-cols-12 h-full">
            <div class="md:col-span-1 lg:col-span-2 border-r md:flex hidden h-full">
                <OwnerSideMenuVue/>
            </div>
            <div class="md:col-span-11 lg:col-span-10 col-span-12 overflow-y-auto h-[calc(100vh-56px)]">
                <slot/>
            </div>
        </main>
        <Footer/>
    </section>
</template>
<script>
</script>