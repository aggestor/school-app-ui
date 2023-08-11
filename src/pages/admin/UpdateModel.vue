<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox" class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Modification  d'un model"/>
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour modifier un modele.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Nom du model" :value="name"  placeholder="Nom de la sous catégorie" :err="errors.name"/>
                <TextBox list="category" :items="transpiledCat"  :onChange="handleInput" type="text" name="category" label="Choisir la catégorie" :value="category"  placeholder="Choisir la catégorie" :err="errors.category"/>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
            </div>
        </div>
         <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/models" title="Modification effectuée !" message="Le modele  a été enregistré avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas la supprimer définitivément."/>
        </div>
    </div>
</template>
<script>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import Category from "../../api/category"
import {CheckCircleIcon} from "@heroicons/vue/24/solid"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import Model from "../../api/models"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import useVerify from "../../hooks/useVerify"
export default {
    setup() {
          useVerify()
        const errors = ref('')
        const name = ref('')
        const category = ref('')
        const promptSuccessBox = ref(false)
        const categories= ref([])
        const modelId = ref("")
        const transpiledCat = ref([])
        const catId = ref(undefined)

        async function handleInput(e) {
            if (e.target.name === 'name') {
                name.value = e.target.value
            }
            if (e.target.name === 'category' && e.target.value.length > 2) {
                const data = categories.value.filter((c) => c.name == e.target.value)
                if (data[0]) {
                    catId.value = data[0].id
                }
            }
        }
        const   getCategories = async() => {
            const result = await Category.getAll()
            const d = !Array.isArray(result.data) ? [result.data] : result.data
            d.forEach(item => {
                transpiledCat.value.push({key:item.id, value:item.name})
            })
            categories.value = d
        }
         const onPressCreate = async ()=> {
            const result = await Model.update({name:name.value, modelId:modelId.value, category:catId.value})

            if (result.type === "error") {
                errors.value = result.data

            } else {
                errors.value = {}
                promptSuccessBox.value = true
            }
        }
        const route = useRoute()
        onMounted(() => {
            if (route.params) { 
                getCategories().then(() => {
                    catId.value = route.params.category
                    modelId.value = route.params.id
                    category.value = categories.value.filter((c) => c.id == route.params.category)[0].name
                   name.value = route.params.name.replace(/(\-)/gi, " ")
                })
                
            }
        })

        return {errors, name,transpiledCat, promptSuccessBox, onPressCreate,handleInput, category}

    },
    components: { ButtonLink, Button, TextBox,CheckCircleIcon,PagesNavigationHeader,SuccessComponent}
}
</script>