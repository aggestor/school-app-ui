<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox"  class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Modification d'une categorie"/>
            <p class="text-gray-600 mb-3 text-sm">Editier le nom de la catégorie suivante.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Nom de la catégorie" :value="name"  placeholder="Nom de la catégorie" :err="error"/>
            </form>

            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
            </div>
        </div>
        <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/categories" title="Modiication effectuée !" message="La catégorie a été modifiée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas la supprimer définitivément."/>
        </div>
    </div>
</template>
<script>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import {CheckCircleIcon} from "@heroicons/vue/24/solid"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { useRoute } from "vue-router"
import Category from "../../api/category"
import { ref, onMounted } from "vue"

export default {
    setup() {
        const error = ref("")
        const  name = ref("")
        const  id = ref("")
        const promptSuccessBox = ref(false)
        async function handleInput(e) {
            name.value = e.target.value
        }
        const route = useRoute()
        onMounted(() => {
            if (route.params) {
                id.value = route.params.id
                name.value = route.params.name.replace(/(-)/gi, ' ')
            }
        })
        async function onPressCreate() {
            const result = await Category.update({name:name.value, id:id.value})
            if (result.type === "error") {
                error.value = result.data
            } else if(result.type === 'success') {
                error.value =''
                promptSuccessBox.value = true
            }
        }
        return {promptSuccessBox, handleInput, onPressCreate, name, id,error}
    },
    components: {
    ButtonLink,
    Button,
    TextBox,
    CheckCircleIcon,
    PagesNavigationHeader,
    SuccessComponent
    },
    
  
}
</script>