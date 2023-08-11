<template>
    <div class="w-11/12 mx-auto  flex justify-center items-center h-auto mt-10">
        <div v-if="promptSuccessBox" data-aos="slide-up" data-aos-duration="500"
            class="md:w-8/12 w-full overflow-hidden __shad flex md:flex-row flex-col justify-between items-center h-96 md:h-60 rounded-lg border">
           <SuccessComponent title="Mise en jours effectuee"  message="La mise en jours de la categorisation de ce shop a ete effectuee !, Cette mise en jours est tenue en compte  a partir de maintenant !" path="/admin/shops"/>
        </div>
        <div v-else data-aos="fade-in" data-aos-duration="500"
            class="lg:w-6/12 w-full bg-white __shad flex justify-between items-center border h-auto rounded-lg">
            <div class=" flex md:h-auto md:p-6 p-4 w-full  justify-center flex-col">
                <div class=" flex items-center">
                    <GoBackAdminButton /> <span class="ml-1 mr-1">|</span>
                    <h1 class="font-semibold text-lg text-gray-700">Modifier la categorisation d'un shop</h1>
                </div>
                <form class="h-full w-full flex flex-col">
                    <div class="w-full ">
                        <div class="w-full text-sm my-3 border p-1 rounded">
                            <div class="text-base font-semibold">Information sur le shop</div>
                            <div class="flex justify-between">
                                <span>Nom</span>
                                <span class="font-semibold"> {{shop.name }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Niveau</span>
                                <span class="font-semibold text-green-600"> {{shop.level }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Categories</span>
                                <span class="font-semibold w-[70%] text-right"> {{shop.categories?.replace(/\$/gi,", ") }}</span>
                            </div>

                        </div>
                        <div class=" flex justify-between mb-2 items-center w-full">
                            <Datalist list="category"  :onChange="handleChange" type="text"
                                name="category" label="Choisir les nouvelles catégories" :value="name"
                                placeholder="Selectionner parmis ces catégories" :error="errors.category" >
                                <option v-for="cat of categories" :key=cat.id :value="cat.name">{{ cat.name }}</option>
                            </Datalist>
                        </div>
                        <div class="flex overflow-auto p-1 flex-wrap h-36 rounded w-full border">
                            <span v-for="cat of chosenCat"
                                class="rounded-full ml-1 mb-1 border-2 w-fit p-1 border-blue-600 h-fit flex items-center text-blue-600 text-xs">{{cat}} <span @click="removeFromList(cat)" class="w-5 h-5 rounded-full ml-1 cursor-pointer  grid place-items-center bg-blue-200"><XMarkIcon class="w-4 h-4"/></span></span>
                        </div>
                    </div>
                </form>
                <div class="w-full items-center mt-2 flex  justify-between">
                    <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressRegister" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import Button from "../../components/Button.vue"
import Shop from "../../api/shop"
import Category from "../../api/category"
import GoBackAdminButton from "../../components/GoBackAdminButton.vue"
import useVerify from "../../hooks/useVerify"
import Datalist from "../../components/Datalist.vue"
import { onMounted,ref } from "vue"
import { useRoute } from "vue-router"
import { CheckCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import SuccessComponent from "../../components/SuccessComponent.vue"
useVerify()

const categories = ref([])
const promptSuccessBox = ref(false)
const chosenCat = ref([])
const completeChosenCat = ref([])
const name = ref("")
const shop = ref({})
const errors = ref({})
const route = useRoute()
const getShop = async (id) =>{
    const result = await Shop.get(id)
    if(result.type == "success"){
        shop.value = result.data
    }
}
const getCategories = async () =>{
    const result = await Category.getAll()
    if(result.type === "success"){
        categories.value = result.data
    }
}
const handleChange = (e) =>{
    name.value = e.target.value
    const cat = categories.value.filter(c => c.name === e.target.value)
    if((shop.value.level === "Basic" && chosenCat.value.length+1 <= 1) || (shop.value.level === "Standard" && chosenCat.value.length +1 < 4) || (shop.value.level === "Business" && chosenCat.value.length+1 < 11)){

        if(cat[0]){
            if(!chosenCat.value.includes(cat[0].name)){
                chosenCat.value.push(cat[0].name)
                completeChosenCat.value.push(cat[0])
                e.target.value = ""
                name.value = ""
            }else{
                errors.value.category = "Categorie deja choisie"
            }
        } 
    }else errors.value['category'] = "Exces de choix de categories !!"
}
const removeFromList = name =>{
    chosenCat.value = chosenCat.value.filter((cat) => cat != name)
    completeChosenCat.value = completeChosenCat.value.filter((cat) => cat.name != name)
}

const onPressRegister = async () =>{
    const result = await Shop.updateCategorization(shop.value.id, completeChosenCat.value)
    if(result.type === "success"){
        promptSuccessBox.value = true
    }
}

onMounted(()=>{
    getShop(route.params.id)
    getCategories()
})
</script>