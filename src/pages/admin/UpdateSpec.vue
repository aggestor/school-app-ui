<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox" class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Modification d'un type"/>
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour enregister un nouveau type.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Nom du type" :value="name"  placeholder="Nom du type" :err="errors.name"/>
                <Datalist  :onChange="handleInput"  name="category"  :value="category"  placeholder="Choisir la catégorie" :err="errors.category">
                    <option v-for="c of categories" :value="c.name" :key="c.id">{{c.name }}</option>
                </Datalist>
                <Datalist  :onChange="handleInput"  name="extension" :value="extension"  placeholder="Choisir l'extension" :err="errors.model">
                    <option v-for="m of extensions" :value="m.ext_name" :key="m.ext_name">{{m.ext_name }}</option>
                </Datalist>
                <Datalist  :onChange="handleInput" name="type" :value="type"  placeholder="Choisir le type" :err="errors.model">
                    <option v-for="m of types" :value="m.typ_name" :key="m.typ_name">{{m.typ_name }}</option>
                </Datalist>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
            </div>
        </div>
         <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/specifications" title="Modification effectuée !" message="La spec a été modifiée avec succès.Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas la supprimer définitivément."/>
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
import Spec from "../../api/spec"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { ref,onMounted } from "vue"
import { useRoute } from "vue-router"
import prettyString from "../../helpers/pretty-string"
import Datalist from "../../components/Datalist.vue"
import useVerify from "../../hooks/useVerify"
export default {
    setup() {
        useVerify()
        const  errors = ref({})
        const  name = ref("")
        const  category = ref("")
        const  catId = ref(0)
        const extId = ref(0)
        const typeId = ref("")
        const specId = ref("")
        const type = ref('')
        const  extension = ref('')
        const  promptSuccessBox = ref(false)
        const  categories = ref([])
        const  extensions = ref([])
        const  types = ref([])

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
                 type.value =""
                 const data = extensions.value.filter(a => a.ext_name === e.target.value)
                 if (data[0]) {
                     extId.value = data[0].ext_id
                     findTypeByExtension(data[0].ext_id)
                }
             } else if (e.target.name === "type") {
                type.value = e.target.value
                 const data = types.value.filter(a => a.typ_name === e.target.value)
                 if (data[0]) {
                     typeId.value = data[0].typ_id
                }
             }
             else {
                name.value = e.target.value
            }
        }

       const onPressCreate =  async () => {
            const result = await Spec.update({name:name.value, category:catId.value, extension:extId.value, type:typeId.value,id:specId.value})

            if (result.type === "error") {
                errors.value = result.data
            } else if(result.type ==="success") {
                errors.value = {}
                promptSuccessBox.value = true
            }
        }

       const getCategories = async () => {
            const result = await Category.getAll()
            categories.value = !Array.isArray(result.data) ? [result.data] : result.data
        }
        const findExtensionsBy = async (category) => {
            const result = await Extension.getAllByCategory(category)
            if (result.type === 'success') {
                extensions.value = !Array.isArray(result.data) ? [result.data] : result.data
            }
        }
        const  findTypeByExtension = async (extension) => {
            const result = await Type.getAllByExtension(extension)
            if (result.type === 'success') {
                types.value = !Array.isArray(result.data) ? [result.data] : result.data
            }
        }
        const route = useRoute()
        onMounted(() => {
            if (route.params) {
                name.value = prettyString(route.params.name, true)
                specId.value = route.params.id
            }
            getCategories().then(() => {
                catId.value = route.params.category
                extId.value = route.params.extension
                typeId.value = route.params.type
                category.value = categories.value.filter((c) => c.id == route.params.category)[0].name
                findExtensionsBy(route.params.category).then(() => {
                    const data = extensions.value.filter((e) => e.ext_id == route.params.extension)
                    extension.value =  data[0] ? data[0].ext_name :''
                }).then(() => {
                    findTypeByExtension(route.params.extension).then(() => {
                        const data = types.value.filter((e) => e.typ_id == route.params.type)
                        type.value = data[0] ? data[0].typ_name : ''
                    })

                })
            })
        })
        return {name, errors, handleInput,category,extension, categories, extensions,types, promptSuccessBox, onPressCreate, type}
    },
    components: { ButtonLink, Button, TextBox, CheckCircleIcon, PagesNavigationHeader, SuccessComponent, Datalist }

}
</script>