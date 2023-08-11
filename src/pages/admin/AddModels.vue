<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox" data-aos="zoom-in" data-aos-duration="700"
            class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col">
            <PagesNavigationHeader title="Ajout  d'un modèle" />
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour enregister un nouveau modèle.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox :onChange="handleInput" type="text" name="name" label="Nom du modèle" :value="name"
                    placeholder="Nom du modèle" :err="errors.name" />
                    <Datalist  :onChange="handleInput" type="text" name="category" label="Choisir la catégorie" :value="category"  placeholder="Choisir la catégorie" :err="errors.category">
                    <option v-for="c of categories" :value="c.name" :key="c.id">{{c.name }}</option>
                </Datalist>
               
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate" />
            </div>
        </div>
        <div v-else
            class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/models" title="Enregitrement effectué !"
                :message="`Le modèle ${name} a été enregistré avec succès. Il est maintenant utilisable partout. Vous pouvez le modifier mais pas le supprimer définitivément.`" />
        </div>
    </div>
</template>
<script setup>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import Category from "../../api/category"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import SuccessComponent from "../../components/SuccessComponent.vue"
import Models from "../../api/models"
import { ref, onMounted } from "vue"
import useVerify from "../../hooks/useVerify"
import Datalist from "../../components/Datalist.vue"
useVerify()

const errors = ref({})
const name = ref("")
const catId = ref(0)
const category = ref("")
const promptSuccessBox = ref(false)
const categories = ref([])
onMounted(getCategories)

async function handleInput(e) {
    if (e.target.name == "name")
        name.value = e.target.value
    if (e.target.name == 'category') {
        const data = categories.value.filter(a => a.name ==e.target.value)
        data[0] && (catId.value = data[0].id)
    }
}
async function onPressCreate() {
    const result = await Models.create({ name: name.value, category: catId.value })

    if (result.type === "error") {
        errors.value = result.data

    } else if (result.type === "success") {
        errors.value = {}
        promptSuccessBox.value = true
    }
}
async function getCategories() {
    const result = await Category.getAll()
    if(result.type === "success"){
        categories.value = !Array.isArray(result.data)? [result.data]: result.data
    }
}
</script>