<script setup>
import {ref, onMounted} from "vue"
import CategoryCard from "./CategoryCard.vue"
import Category from "../../api/category.js"
import { Squares2X2Icon } from "@heroicons/vue/24/outline";
    const categories = ref([])
    const getCategories = async () =>{
        const result = await Category.showRoomData()
        if(result.type === "success"){
            categories.value = !Array.isArray(result.data) ? [result.data] : result.data
        }
    }
    onMounted(getCategories)
</script>
<template>
    <div class="grid grid-cols-12 space-x-3 w-full h-auto">
        <div class="lg:col-span-12 col-span-12">
            <h2 class="text-gray-700 font-semibold py-2 border-b flex text-lg items-center"><span class="w-8 h-8 border-gray-600 rounded-full grid place-items-center border-2 mr-2"><Squares2X2Icon class="h-6 w-6 "/></span> Our categories.</h2>
            <div class="w-full my-3 flex flex-wrap justify-evenly ">
                <div class="m-2" v-for="cat of categories" :key="cat.id">
                    <CategoryCard :content="cat" />
                </div>
            </div>
        </div>
    </div>
</template>