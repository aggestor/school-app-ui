<template>
    <div class="h-16 space-x-4 mb-3 flex overflow-auto items-center py-2 w-full">
        <HomeFSLinks text="Produits" path="/products">
            <ArchiveBoxIcon class="w-5 h-5"/>
        </HomeFSLinks>
        <!-- <HomeFSLinks text="Services" path="/services">
            <DocumentArrowDownIcon class="w-5 h-5"/>
        </HomeFSLinks> -->
        <HomeFSLinks text="Categories" path="/categories">
            <Squares2X2Icon class="w-5 h-5"/>
        </HomeFSLinks>
        <HomeFSLinks text="Shops" path="/shops">
            <BuildingStorefrontIcon class="w-5 h-5"/>
        </HomeFSLinks>
        <HomeFSLinks text="Villes" path="/towns">
            <GlobeAsiaAustraliaIcon class="w-5 h-5"/>
        </HomeFSLinks>
    </div>
</template>
<script>
import { ArchiveBoxIcon, BuildingStorefrontIcon, DocumentArrowDownIcon, DocumentDuplicateIcon, GlobeAsiaAustraliaIcon, Squares2X2Icon } from '@heroicons/vue/24/solid';
import { defineComponent } from 'vue';
import HomeFSLinks from './HomeFSLinks.vue';

    export default defineComponent({
    setup() {
    },
    components: { HomeFSLinks, Squares2X2Icon, ArchiveBoxIcon, BuildingStorefrontIcon, DocumentArrowDownIcon, DocumentDuplicateIcon, GlobeAsiaAustraliaIcon }
})
</script>