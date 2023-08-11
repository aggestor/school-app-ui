<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox"  class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Modification d'une ville  d'une ville"/>
            <p class="text-gray-600 mb-3 text-sm">Modifier les champs ci-bas pour modifier les donnes de cette  ville.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Nom de la ville" :value="name"  placeholder="Nom de la ville" :err="errors.name"/>
                <TextBox  :onChange="handleInput" type="text" name="country" label="Nom du pays" :value="country"  placeholder="Nom du pays" :err="errors.country"/>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
            </div>
        </div>
        <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/towns" title="Enregitrement effectué !" message="La ville a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas la supprimer définitivément."/>
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
import useVerify from "../../hooks/useVerify"
import { useRoute } from "vue-router"
import Location from "../../api/location"
import { ref, onMounted } from "vue"
import prettyString from "../../helpers/pretty-string"

export default {
    setup() {
        useVerify()
        const errors = ref({})
        const  name = ref("")
        const  country = ref("")
        const  id = ref("")
        const promptSuccessBox = ref(false)
        async function handleInput(e) {
            if(e.target.name == 'name')
                name.value = e.target.value
            else country.value = e.target.value
        }
        const route = useRoute()
        onMounted(() => {
            if (route.params) {
                id.value = route.params.id
                name.value = prettyString(route.params.name,true)
                country.value = prettyString(route.params.country, true)
            }
        })
        async function onPressCreate() {
            const result = await Location.update({name:name.value,country:country.value, id:id.value})
            if (result.type === "error") {
                errors.value = result.data
            } else if(result.type === 'success') {
                errors.value ={}
                promptSuccessBox.value = true
            }
        }
        return {promptSuccessBox, handleInput, onPressCreate, name,country, id,errors}
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