<template>
    <div class="h-full w-full  flex justify-center overflow-y-scroll items-center">
        <div v-if="!promptSuccessBox" class="md:w-10/12 w-11/12 mx-auto bg-white rounded p-3 h-auto md:min-h-[80%]">
            <div class="w-full mx-auto flex justify-between items-center">
                <div class="flex">
                    <GoBackAdminButton /> <span class="ml-1 mr-1">|</span>
                    <h1 class="md:text-xl font-semibold text-gray-700">Modifier mots clés et les spécifications </h1>
                </div>
            </div>
            <form class="flex flex-col md:flex-row md:space-x-3 w-full">
                <div class="md:w-1/2 w-full p-2">
                    <span class=" mt-3 flex items-center top-1 left-0 rounded  text-gray-700 font-semibold ">
                            <InformationCircleIcon class="h-6 mr-3 w-6" />Ajouter les mots clés
                        </span>
                    <TextBox :onChange="handleInput" type="text" name="keyword" label="Mots clés (separez par une virgule)"
                        :value="keyword" placeholder="Ajouter des mots cles sur ce produit" :err="errors.keyword" />
                    <div class="w-full flex flex-wrap rounded border p-1 h-64 overflow-auto __scrollbar">
                        <span v-for="k of keywords"
                            class="border border-blue-600 text-blue-600 text-xs m-1 h-fit flex items-center space-x-2 rounded-full px-1 py-0.5  w-fit"><span>{{ k }}</span> <span @click="removeKeyword(k)" class="w-5 h-5 grid place-items-center cursor-pointer rounded-full bg-blue-200"><XMarkIcon class="w-[14px] h-[14px]"/></span></span>
                    </div>
                </div>
                <div class="md:w-1/2 w-full p-3  rounded">
                    <div class=" flex justify-around flex-col items-center w-full h-full">
                        <span class=" flex items-center  rounded w-full mb-2  text-gray-700 font-semibold ">
                            <InformationCircleIcon class="h-6 mr-3 w-6" />Ajouter les specifications
                        </span>
                        <div class="flex w-full border md:max-h-[500px] md:min-h-[100px] overflow-auto rounded p-2 flex-col">
                            <div class="w-full flex  my-1 justify-between" v-for="s of specs" :key="s.name">
                                <span class="w-4/12 p-1  rounded">{{ s.name }} </span>
                                <select @change="(e) => handleSelection(e, s.name)"
                                    class="w-4/12 border-2 duration-500 transition-all outline-none focus:border-2 focus:border-blue-600 rounded p-1">
                                    <option class="bg-gray-700 text-white" :value="s.default">{{s.default}}</option>
                                    <option :key="d.specd_name" :value="d.specd_name" v-for="d of s.data">
                                        {{ d.specd_name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
            <div class="flex flex-col md:flex-row items-center justify-between">
                <router-link :to="'/admin/products/' + product.prod_id" class="h-auto w-fit underline text-blue-600 flex items-center ">{{ product.prod_name }}</router-link>
                <span  @click="onClickUpdateKeywordsAndSpecs" class="p-1.5 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700 md:w-4/12 w-full flex mt-2 md:mt-0 items-center justify-center">Finaliser la modification  <CheckCircleIcon class="w-5 h-5 ml-1"/></span>
            </div>
        </div>
        <div v-else class="md:w-6/12 w-10/12 md:h-[50%]">
            <SuccessComponent :path="'/admin/products/' + product.prod_id" title="Modifcation effectuée !"
                :message="`Les nouvelles modifications apportées au produit ${product.prod_name} ont été appliquées avec succès.`" />
        </div>
    </div>
</template>
<script setup>
import { onMounted, reactive, ref } from 'vue';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import SuccessComponent from "../../components/SuccessComponent.vue"
import { useRoute } from 'vue-router';
import Product from "../../api/product"
import Shop from "../../api/shop"
import useVerify from "../../hooks/useVerify"
import TextBox from '../../components/TextBox.vue';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/24/solid';
import { XMarkIcon } from '@heroicons/vue/24/outline';
import Spec from "../../api/spec"

useVerify()
const product = ref({})
const promptSuccessBox = ref(false)
const keywords = ref([])
const keyword = ref("")
const specs = ref([])
const chosenSpecs = ref([])
const shop = ref({})
const errors = ref({})
const route = useRoute()
const getProduct = async id => {
    const result = await Product.get(id)
    if (result.type === "success") {
        getShop(result.data.shop_id)
        keywords.value = result.data.keywords ? result.data.keywords.split(",") : []
        specs.value = result.data.details ?(!Array.isArray(JSON.parse(result.data.details)) ? [JSON.parse(result.data.details)] : JSON.parse(result.data.details))  : []
        product.value = result.data
        chosenSpecs.value = result.data.details ?(!Array.isArray(JSON.parse(result.data.details)) ? [JSON.parse(result.data.details)] : JSON.parse(result.data.details))  : []
        getSpecs(result.data.type_id)
    }
}
const getShop = async id => {
    const result = await Shop.get(id)
    if (result.type === "success") {
        shop.value = result.data
    }
}
const onClickUpdateKeywordsAndSpecs = async () => {
    console.log("specs",chosenSpecs.value);
    const data = {
        keywords: keywords.value.join(),
        specs: JSON.stringify(chosenSpecs.value),
        id:product.value.prod_id
    }
    const result = await Product.updateKeywordsAndSpecs(data)
    if (result.type === "success") {
        promptSuccessBox.value = true
    }
}
const handleInput = (e) =>{
    const k = e.target.value
    keyword.value = k
    if (k.slice(-1) === ",") {
        const new_k = k.slice(0, -1)
        if (!keywords.value.includes(new_k)) {
            keywords.value.push(new_k)
        } else errors.value['keywords'] = "Le mot clé doit être unique."
        keyword.value = ""
    }
}
const removeKeyword = k =>{
    const kw = keywords.value.filter(a => a != k)
    keywords.value = kw
}
const getSpecs = async(s) => {
            const result = await Spec.getByType(s)
            if (result.type === "success") {
                const data = result.data[0]

                if (data) {
                    const b = Object.entries(data)
                    const keys = []
                    b.forEach(k =>{
                        const t = specs.value.filter(a => a.name == k[0])
                        keys.push({name: k[0], data:k[1], default:t[0] ? t[0].value : "---"})
                    })
                    specs.value = keys
                }
            }
        }
onMounted(() =>{
    getProduct(route.params.id)
} )

const handleSelection = (e, data) =>{
    let selection = chosenSpecs.value
    const filtered = chosenSpecs.value.filter(a => a.name == data)
    if(filtered[0]){
        selection = chosenSpecs.value.filter(a => a.name !== data)
        selection.push({name:data, value:e.target.value})
    }else{
        selection.push({name:data, value:e.target.value})
    }
    chosenSpecs.value = selection
    
}
</script>