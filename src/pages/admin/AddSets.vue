<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox"
            class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col">
            <PagesNavigationHeader title="Ajout  d'une serie" />
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour enregister une nouvelle série.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox :onChange="handleInput" type="text" name="name" label="Nom de la série" :value="name"
                    placeholder="Nom du type" :err="errors.name" />
                <DataList :onChange="handleInput" type="text" name="category" label="Choisir la catégorie" :value="category"
                    placeholder="Choisir la catégorie" :err="errors.category">
                    <option v-for="c of categories" :value="c.name" :key="c.id">{{ c.name }}</option>
                </DataList>
                <DataList :onChange="handleInput" type="text" name="model" label="Choisir le modèle" :value="model"
                    placeholder="Choisir le modele" :err="errors.model">
                    <option v-for="m of models" :value="m.mod_name" :key="m.mod_name">{{ m.mod_name }}</option>
                </DataList>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate" />
            </div>
        </div>
        <div v-else
            class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/sets" title="Enregitrement effectué !"
                message="La série a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas le supprimer définitivément." />
        </div>
    </div>
</template>
<script setup>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import DataList from "../../components/Datalist.vue"
import Category from "../../api/category"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import Model from "../../api/models"
import Set from "../../api/set"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { ref, onMounted } from "vue"
import useVerify from "../../hooks/useVerify"
useVerify()
const errors = ref({})
const name = ref("")
const category = ref("")
const catId = ref(0)
const modId = ref(0)
const model = ref("")
const promptSuccessBox = ref("")
const categories = ref([])
const models = ref([])
onMounted(() => getCategories())

async function handleInput(e) {
    if (e.target.name === 'category') {
        if (e.target.value.length >= 2) {
            const data = categories.value.filter(a => a.name === e.target.value)
            if (data[0]) {
                findModelsBy(data[0].id)
                catId.value = data[0].id
            }
        } else {
            models.value = []
        }
    }
    else if (e.target.name === "model") {
        const data = models.value.filter(a => a.mod_name === e.target.value)
        if (data[0]) {
            modId.value = data[0].mod_id
        }
    } else {
        name.value = e.target.value
    }
}
async function onPressCreate() {
    const result = await Set.create({ name: name.value, category: catId.value, model: modId.value })

    if (result.type === "error") {
        errors.value = result.data
    } else if (result.type === "success") {
        errors.value = {}
        promptSuccessBox.value = true
    }
}
async function getCategories() {
    const result = await Category.getAll()
    categories.value = !Array.isArray(result.data) ? [result.data] : result.data
}
async function findModelsBy(category) {
    const result = await Model.getAllByCategory(category)
    if (result.type === 'success') {
        models.value = !Array.isArray(result.data) ? [result.data] : result.data
    }
}
</script>