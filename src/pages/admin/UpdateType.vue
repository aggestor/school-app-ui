<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox" class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Modification d'un type"/>
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour enregister un nouveau type.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Nom du type" :value="name"  placeholder="Nom du type" :err="errors.name"/>
                <TextBox list="category" :items="transpiledCat"  :onChange="handleInput" type="text" name="category" label="Choisir la catégorie" :value="category"  placeholder="Choisir la catégorie" :err="errors.category"/>
                <TextBox list="extension" :items="transpiledExt"  :onChange="handleInput" type="text" name="extension" label="Choisir l'extension" :value="extension"  placeholder="Choisir la catégorie" :err="errors.category"/>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
            </div>
        </div>
         <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/types" title="Enregitrement effectué !" message="Le type a été enregistrée avec succès. Il est maintenant utilisable partout. Vous pouvez le modifier mais pas le supprimer définitivément."/>
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
import Extension from "../../api/extension"
import Type from "../../api/type"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { ref,onMounted } from "vue"
import { useRoute } from "vue-router"
import prettyString from "../../helpers/pretty-string"
export default {
    setup() {

        const  errors = ref({})
        const  name = ref("")
        const  category = ref("")
        const  catId = ref(0)
        const extId = ref(0)
        const typeId = ref("")
        const  extension = ref('')
        const  promptSuccessBox = ref(false)
        const  categories = ref([])
        const  extensions = ref([])
        const  transpiledCat = ref([])
        const transpiledExt = ref([])

         const  handleInput  = async (e) => {
             if (e.target.name === 'category' && e.target.value.length > 2) {
                 category.value = e.target.value
                 const data = categories.value.filter((c) => c.name == e.target.value)
                 if (data[0]) {
                     catId.value = data[0].id
                     findExtensionsBy(data[0].id)
                    }
                }
                else if (e.target.name === "extension") {
                extension.value = e.target.value
                const data = extensions.value.filter(a => a.ext_name === e.target.value)
                if (data[0]) {
                    extId.value = data[0].ext_id
                }
             } else if(e.target.name == 'name') {
                name.value = e.target.value
            }
        }

       const onPressCreate =  async () => {
            const result = await Type.update({name:name.value, category:catId.value, extension:extId.value, id:typeId.value})

            if (result.type === "error") {
                errors.value = result.data
            } else if(result.type ==="success") {
                errors.value = {}
                promptSuccessBox.value = true
            }
        }

       const getCategories = async () => {
            const result = await Category.getAll()
            const d = !Array.isArray(result.data) ? [result.data]: result.data
            d.forEach(item => {
                transpiledCat.value.push({key:item.id, value:item.name})
            })
            categories.value = d
        }
        const findExtensionsBy = async (category) => {
            const result = await Extension.getAllByCategory(category)
            const v = []
            if (result.type === 'success') {
                let d = !Array.isArray(result.data) ? [result.data]: result.data
                d.forEach(item => {
                    v.push({ key: item.ext_id, value: item.ext_name })
                })
                transpiledExt.value = v
                extensions.value = d
            }
        }
        const route = useRoute()
        onMounted(() => {
            if (route.params) {
                name.value = prettyString(route.params.name, true)
                typeId.value = route.params.id
            }
            getCategories().then(() => {
                catId.value = route.params.category
                extId.value = route.params.extension
                category.value = categories.value.filter((c) => c.id == route.params.category)[0].name
                findExtensionsBy(route.params.category).then(() => {
                    extension.value = transpiledExt.value.filter((e) => e.key == route.params.extension)[0].value
                })
            })
        })
        return {name, errors, handleInput,category,extension, transpiledCat, transpiledExt, promptSuccessBox, onPressCreate}
    },
    components: { ButtonLink, Button,TextBox,CheckCircleIcon,PagesNavigationHeader,SuccessComponent}

}
</script>