<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox" class="md:w-6/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader :title="'Ajout  d\'une categorie a '+name "/>
            <p class="text-gray-600 mb-3 text-sm">Choisissez les categories a ajouter a cette marque.</p>
            <div class="border rounded p-2 flex flex-wrap w-full min-h-[60px]">
                <div  id="wrapper" class="px-1.5 py-0.5 relative items-center justify-between flex my-1 text-blue-500 rounded-full border-2 border-blue-500  mr-2" v-for="detail of chosen">{{detail.name}} 
                    <span id="close" @click="()=>removeCategory(detail)" class=" bg-blue-200  rounded-full ml-2 cursor-pointer"><XMarkIcon class="w-4 h-4"/></span>
                </div>
            </div>
            <form class="h-full w-full flex justify-between items-center space-x-2">
                <DataList  :onChange="handleInput" type="text" name="category" label="Choisir la catégorie" :value="category"  placeholder="Choisir la catégorie" :err="errors.category">
                    <option v-for="c of categories" :value="c.name" :key="c.id">{{c.name }}</option>
                </DataList>
                <!-- <span @click="addCategory" class="bg-blue-600 text-white w-10 h-10 cursor-pointer hover:shadow-lg hover:shadow-blue-300 hover:bg-blue-700 grid place-items-center mt-6 rounded"><PlusIcon class="w-6 h-6"/></span> -->
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
            </div>
        </div>
         <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/marks" title="Enregitrement effectué !" message="La marque a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas le supprimer définitivément."/>
        </div>
    </div>
</template>
<script setup>
import DataList from "../../components/DataList.vue"
import Button from "../../components/Button.vue"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import Mark from "../../api/mark"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { ref, onMounted } from "vue"
import Category from "../../api/category"
import useVerify from "../../hooks/useVerify"
import { useRoute } from "vue-router"
import { PlusIcon, XMarkIcon } from "@heroicons/vue/24/solid"
     useVerify()
    const  errors = ref({})
    const name = ref("")
    const category = ref("")
    const id = ref(0)
    const categories = ref([])
    const chosen = ref([])
    const  promptSuccessBox = ref(false) 

    async function  handleInput(e) {
        category.value = e.target.value
        const data = categories.value.filter((c) => c.name == e.target.value)
        if (data[0]) {
            const d = chosen.value.filter((c) => c.name == data[0].name)
            if(!d[0]){
                chosen.value.push(data[0])
                e.target.value = ''
            }
            category.value = ''
        }
    }
    async function getCategories(){
        const result = await Category.getAll()
        if(result.type == "success"){
            categories.value = !Array.isArray(result.data) ? [result.data] : result.data
        }
    }
    async function onPressCreate() {
        const result = await Mark.appendCategories({name:name.value, id:id.value, data: chosen.value})
        if (result.type === "error") {
           errors.value = result.data
        } else if(result.type ==="success") {
            errors.value = {}
            promptSuccessBox.value = true
        }
    }
    async function getMark(id){
        const result = await Mark.get(id)
        if(result.type === "success"){
            name.value = result.data.name 
            id.value = result.data.id 
        }
    }
    function readRoute(){
        const route = useRoute()
        console.log(route.params);
        if(parseInt(route?.params.id)){
            id.value = route.params.id
            if(route.params.name) name.value = route.params.name
            else getMark(route.params.id)
        }
        else{}// the entered url is not correct
    }
    function addCategory(){}
    function removeCategory(detail){
        const d = chosen.value.filter((c) => c.name != detail.name)
        chosen.value = d
    }
    onMounted(()=>{
        readRoute()
        getCategories()
    })
</script>