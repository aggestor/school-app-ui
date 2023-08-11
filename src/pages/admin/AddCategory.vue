<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox"  class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Ajout  d'une catégorie"/>
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour enregister une nouvelle catégorie.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Nom de la catégorie" :value="name"  placeholder="Nom de la catégorie" :err="errors.name"/>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
            </div>
        </div>
        <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/categories" title="Enregitrement effectué !" message="La catégorie a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas la supprimer définitivément."/>
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
import SuccessComponent from "../../components/SuccessComponent.vue"
export default {
    components: {
    ButtonLink,
    Button,
    TextBox,
    CheckCircleIcon,
    PagesNavigationHeader,
    SuccessComponent
    },
    mounted() {
    
    },
    data(){
        return {
            errors: {},
            name: "",
            promptSuccessBox: false,
        }
    },
    methods: {
        async handleInput(e) {
            this[e.target.name] = e.target.value
        },
        async onPressCreate() {
            const result = await Category.create(this.name)
            if (result.type === "error") {
                this.errors = result.data
            } else if(result.type === 'success') {
                this.errors = {}
                this.promptSuccessBox = true
            }
            else if (result.type === 'auth') {
                localStorage.removeItem('admin')
                this.$router.push('/admin/login')
            }
        }
    }
}
</script>