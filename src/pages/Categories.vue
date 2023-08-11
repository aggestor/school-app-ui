<script setup>
import {  ChevronRightIcon, Squares2X2Icon } from "@heroicons/vue/24/outline";
import Category from "../api/category"
import Extension from "../api/extension"
import Model from "../api/models"
import Set from "../api/set"
import Type from "../api/type"
import setResponseAsArray from "../helpers/set-response-as-array"
import prettyString from "../helpers/pretty-string"
import { ref,onMounted } from "vue";
import FirstHomeSection from "../components/public/FirstHomeSection.vue";
const categories = ref([])
const extensions = ref([])
const models = ref([])
const sets = ref([])
const types = ref([])
const currentCat = ref(0)
const currentModel = ref(0)
const currentExtension = ref(0)
const currentSet = ref(0)
const currentType = ref(0)
const categoriesLoading = ref(false)
const extensionsLoading = ref(false)
const modelsLoading = ref(false)
const typeLoading = ref(false)
const setLoading = ref(false)

const getCategories = async () =>{
    categoriesLoading.value = true
    const result = await Category.getAll()
    if(result.type === "success" && result.data != false){
        categories.value = setResponseAsArray(result.data)
    }
    categoriesLoading.value = false
}
const getExtensionsByCatId = async id =>{
    extensionsLoading.value = true
    const result = await Extension.getAllByCategory(id)
    if(result.type  === "success" && result.data != false){
        extensions.value = setResponseAsArray(result.data)
    }
    extensionsLoading.value = false
}
const getModelsByCatId = async id =>{
    modelsLoading.value = true
    const result = await Model.getAllByCategory(id)
    if(result.type === "success" && result.data != false){
        models.value = setResponseAsArray(result.data)
    }
    modelsLoading.value = false
}
const getSetsByModel = async id =>{
    setLoading.value = true
    const result = await Set.getAllByModel(id)
    if(result.type === "success" && result.data != false){
        sets.value = setResponseAsArray(result.data)
    }
    setLoading.value = false
}
const getTypesByExtension = async id =>{
    typeLoading.value = true
    const result = await Type.getAllByExtension(id)
    if(result.type === "success" && result.data != false){
        types.value = setResponseAsArray(result.data)
    }
    typeLoading.value = false
}
const onClickCat = (id) =>{
    if(id == currentCat.value) currentCat.value = 0
    else{
        currentCat.value = id
        getExtensionsByCatId(id)
        getModelsByCatId(id)
    }
}
const onClickExt = id =>{
    if(id == currentExtension.value) currentExtension.value = 0
    else{
        currentExtension.value = id
        getTypesByExtension(id)
    }
}
const onClickMod = id =>{
    if(id == currentModel.value) currentModel.value = 0
    else{
        currentModel.value = id
        getSetsByModel(id)
    }
}

onMounted(getCategories)
</script>
<template>
    <div  class="w-[95%] mx-auto">
        <FirstHomeSection/>
        <h1 class="font-semibold">Liste de categories</h1>
        <div class="grid md:grid-cols-4 text-gray-600 grid-span-2 w-full">
            <div :class="` fle m-3 my-1 ${currentCat != c.id ? 'h-10' : 'bg-gray-50'} rounded   col-span-2 mb-4 p-2`" v-for="c of categories" :key="c.id">
                <div class="flex items-center justify-between">
                    <div :class="`flex ${currentCat === c.id && 'font-semibold text-blue-600'}`">
                        <span class="font-semibold mr-2"><Squares2X2Icon class="w-5 h-5"/></span><router-link class="hover:text-blue-600" :to="'/products/filter/categories/'+prettyString(c.name)+'/'+c.id">{{c.name }}</router-link>
                    </div> 
                    <ChevronRightIcon @click="onClickCat(c.id) " :class="`w-5 cursor-pointer ${currentCat == c.id  && 'rotate-90'} transition-[transform] duration-500 h-5`"/>
                </div>
                <div v-if="currentCat == c.id" class="mt-2 border-l ml-4">
                    <div v-if="models.length > 0  && models[0].cat_id == c.id" class="ml-1">
                        Models
                        <div v-for="m of models" class="ml-3 border-l" :key="m.mod_id">
                            <div :class="`ml-1 flex w-[95%] justify-between p-1 ${currentModel === m.mod_id && 'font-semibold text-blue-600'}`"><router-link class='hover:text-blue-600' :to="'/products/filter/models/'+prettyString(m.mod_name)+'/'+m.mod_id">{{m.mod_name }}</router-link>
                                <ChevronRightIcon @click="onClickMod(m.mod_id) " :class="`w-5 cursor-pointer ${currentModel == m.mod_id  && 'rotate-90'} transition-[transform] duration-500 h-5`"/>
                            </div>
                            <div v-if="currentModel == m.mod_id && sets.length > 0 && sets[0].mod_id == m.mod_id" class="ml-3 border-l ">
                                <div v-for="t of sets" :key="t.set_name"  class="flex justify-between w-[90%] ml-1">
                                    {{t.set_name}}
                                    <ChevronRightIcon @click="onClickSet(t.set_id) " :class="`w-5 cursor-pointer ${currentType == m.typ_id  && 'rotate-90'} transition-[transform] duration-500 h-5`"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="extensions.length > 0 && extensions[0].cat_id == c.id" class="ml-1">
                        Extensions
                        <div v-for="m of extensions" class="ml-3 border-l" :key="m.ext_id">
                            <div :class="`ml-1 flex w-[95%] justify-between p-1 ${currentExtension == m.ext_id && 'font-semibold text-blue-600'}`"><router-link class="hover:text-blue-600" :to="'/products/filter/extensions/'+prettyString(m.ext_name)+'/'+m.ext_id">{{m.ext_name }}</router-link>
                                <ChevronRightIcon @click="onClickExt(m.ext_id) " :class="`w-5 cursor-pointer ${currentExtension == m.ext_id  && 'rotate-90'} transition-[transform] duration-500 h-5`"/>
                            </div>
                            <div v-if="currentExtension == m.ext_id && types.length > 0 && types[0].ext_id == m.ext_id" class="ml-3 border-l ">
                                <div v-for="t of types" :key="t.typ_name"  class="flex justify-between w-[90%]">
                                    <router-link class="hover:text-blue-600" :to="'/products/filter/types'+prettyString(t.typ_name)+'/'+t.typ_id">{{t.typ_name}}</router-link>
                                    <ChevronRightIcon @click="onClickTyp(t.typ_id) " :class="`w-5 cursor-pointer ${currentType == m.typ_id  && 'rotate-90'} transition-[transform] duration-500 h-5`"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>