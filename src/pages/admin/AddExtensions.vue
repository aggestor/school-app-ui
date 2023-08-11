<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox" class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Ajouter  une extension"/>
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour enregister une nouvelle extension.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="title" label="Nom de l'extension" :value="title"  placeholder="Nom de l'extension" :err="errors.title"/>
                <Datalist  :onChange="handleInput" name="category" label="Ville" :value="category"  placeholder="Choisir la catégorie" :err="errors.category">
                    <option v-for="c of categories" :value="c.name" :key="c.name">{{c.name }}</option>
                </Datalist>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
            </div>
        </div>
         <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/extensions" title="Enregitrement effectué !" message="L'extension a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas la supprimer définitivément."/>
        </div>
    </div>
</template>
<script setup>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import Category from "../../api/category"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import Extension from "../../api/extension"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { onMounted, ref } from "vue"
import Datalist from "../../components/Datalist.vue"
import useVerify from "../../hooks/useVerify"
     useVerify()
            const errors = ref({})
            const title = ref("")
            const category = ref("")
           const  promptSuccessBox = ref(false)
            const categories = ref([])
            const catId = ref()

        async function handleInput(e) {
            if(e.target.name == "title"){
                title.value = e.target.value
            }else if(e.target.name == "category"){
                const data = categories.value.filter(a => a.name == e.target.value)
                console.log(data);
                if(data[0]){
                    catId.value = data[0].id
                    category.value = data[0].name
                }
            }
        }
        async function onPressCreate() {
            const result = await Extension.create({title:title.value, category:catId.value})

            if (result.type === "error") {
                errors.value = result.data

            } else if(result.type == "success") {
                errors.value = {}
                promptSuccessBox.value = true
            }
        }
        async function getCategories() {
            const result = await Category.getAll()
            categories.value = Array.isArray(result.data) ? result.data : [result.data]
        }
        onMounted(getCategories)
</script>