<template>
    <ReusableHeader title="Modification d'une serie" />
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox"
            class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col">
            <PagesNavigationHeader title="Modification d'une serie" />
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour modifier une serie.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox :onChange="handleInput" type="text" name="name" label="Nom du type" :value="name"
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
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressUpdate" />
            </div>
        </div>
        <div v-else
            class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/sets" title="Enregitrement effectué !"
                message="La série a été modifiée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas le supprimer définitivément." />
        </div>
    </div>
</template>
<script setup>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import Category from "../../api/category"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import Model from "../../api/models"
import Set from "../../api/set"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import prettyString from "../../helpers/pretty-string"
import ReusableHeader from "../../components/ReusableHeader.vue"
import DataList from "../../components/Datalist.vue"

const errors = ref({})
const name = ref("")
const category = ref("")
const model = ref("")
const catId = ref(0)
const modelId = ref(0)
const setId = ref(0)
const promptSuccessBox = ref(false)
const categories = ref([])
const models = ref([])


const handleInput = (e) => {
    if (e.target.name === 'category' && e.target.value.length > 2) {
        category.value = e.target.value
        const data = categories.value.filter((c) => c.name == e.target.value)
        if (data[0]) {
            catId.value = data[0].id
            findModelBy(data[0].id)
        }
    }
    else if (e.target.name === "model") {
        model.value = e.target.value
        const data = models.value.filter(a => a.mod_name === e.target.value)
        console.log('mode', data);
        if (data[0]) {
            modelId.value = data[0].mod_id
        }
    }
    else {
        name.value = e.target.value
    }
}

const onPressUpdate = async () => {
    console.log(modelId.value);
    const result = await Set.update({ name: name.value, category: catId.value, model: modelId.value, id: setId.value })

    if (result.type === "error") {
        errors.value = result.data
    } else if (result.type === "success") {
        errors.value = {}
        promptSuccessBox.value = true
    }
}

const getCategories = async () => {
    const result = await Category.getAll()
    const d = !Array.isArray(result.data) ? [result.data] : result.data
    categories.value = d
}
const findModelBy = async (category) => {
    const result = await Model.getAllByCategory(category)
    if (result.type === 'success') {
        console.log(result);
        let d = !Array.isArray(result.data) ? [result.data] : result.data
        models.value = d
    }
}
const route = useRoute()
onMounted(() => {
    console.log(route.params);
    if (route.params) {
        name.value = prettyString(route.params.name, true)
        setId.value = route.params.id
    }
    getCategories().then(() => {
        catId.value = route.params.category
        modelId.value = route.params.model
        category.value = categories.value.filter((c) => c.id == route.params.category)[0].name
        findModelBy(route.params.category).then(() => {
            let d = models.value.filter((e) => e.mod_id == route.params.model)
            model.value = d[0] ? d[0].mod_name : ''
        })
    })
})
</script>