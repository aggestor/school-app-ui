<script setup>
import FirstHomeSection from '../components/public/FirstHomeSection.vue';
import SecondHomeSection from '../components/public/SecondHomeSection.vue';
import ThirdHomeSection from '../components/public/ThirdHomeSection.vue';
import CategoriesSection from '../components/public/CategoriesSection.vue';
import TownSection from '../components/public/TownSection.vue';
import ShopsSection from '../components/public/ShopsSection.vue';

</script>
<template>
  <div class="md:w-[98%] w-[95%] h-full  mx-auto">
    <FirstHomeSection/>
    <CategoriesSection/>
    <SecondHomeSection/>
    <TownSection/>
    <ThirdHomeSection/>
    <ShopsSection/>
  </div>
</template>