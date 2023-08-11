<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox"
            class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col">
            <PagesNavigationHeader title="Modification  d'une marque" />
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour mettre en jour une marque.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox :onChange="handleInput" type="text" name="name" label="Nom de marque" :value="name"
                    placeholder="Nom de la marque" :err="errors.name" />
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressUpdate" />
            </div>
        </div>
        <div v-else
            class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/marks" title="Enregitrement effectué !"
                message="La marque a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas le supprimer définitivément." />
        </div>
    </div>
</template>
<script setup>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import Mark from "../../api/mark"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import prettyString from "../../helpers/pretty-string"
import useVerify from "../../hooks/useVerify"

useVerify()
const errors = ref({})
const name = ref("")
const markId = ref(0)
const promptSuccessBox = ref(false)

const handleInput = async (e) => name.value = e.target.value
    
const onPressUpdate = async () => {
    const result = await Mark.update({ name: name.value, id: markId.value })

    if (result.type === "error") {
        errors.value = result.data
    } else if (result.type === "success") {
        errors.value = {}
        promptSuccessBox.value = true
    }
}

const route = useRoute()
onMounted(() => {
    console.log(route.params);
    if (route.params) {
        name.value = prettyString(route.params.name, true)
        markId.value = route.params.id
    }
})

</script>