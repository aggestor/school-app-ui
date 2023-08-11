<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox" class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Ajout  d'une spécification"/>
            <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour enregister une spécification.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="name" label="Nom de la specification" :value="name"  placeholder="Nom de la specification" :err="errors.name"/>
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
            <SuccessComponent path="/admin/specifications/all" title="Enregitrement effectué !" message="La spécification a été enregistrée avec succès. Elle est est maintenant utilisable partout. Vous pouvez la modifier mais pas le supprimer définitivément."/>
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
import Type from "../../api/type"
import Spec from "../../api/spec"
import Extension from "../../api/extension"
import SuccessComponent from "../../components/SuccessComponent.vue"
import Datalist from "../../components/Datalist.vue"
import ReusableHeader from "../../components/ReusableHeader.vue"
export default {
    components: {
    ButtonLink,
    Button,
    TextBox,
    CheckCircleIcon,
    PagesNavigationHeader,
    SuccessComponent,
    Datalist,
    ReusableHeader
},
    data(){
        return {
            errors: {},
            name: "",
            category: "",
            catId: 0,
            extId: 0,
            typId: 0,
            type: "",
            types: [],
            extension:'',
            promptSuccessBox: false,
            categories: [],
            extensions:[],
        }
    },
    mounted() {
        this.getCategories()
    },
    watch: {
        category(q){
            const data = this.categories.filter(a => a.name == q)[0]
        data && (this.catId = data.id)
        }
    },
    methods: {
        async handleInput(e) {
            this[e.target.name] = e.target.value
            if (e.target.name === 'category') {
                if (e.target.value.length >= 2) {
                    const data = this.categories.filter(a => a.name === e.target.value)
                    if (data[0]) {
                        console.log(data[0]);
                        this.findExtensionsBy(data[0].id)
                        this.catId = data[0].id
                    }
                } 
            }
            else if (e.target.name === "extension") {
                const data = this.extensions.filter(a => a.ext_name === e.target.value)
                console.log(data)
                if (data) {
                    this.findTypeByExtension(data[0].ext_id)
                    this.extId = data[0].ext_id
                }
            }
            else if (e.target.name === "type") {
                const data = this.types.filter(a => a.typ_name === e.target.value)
                if (data[0]) {
                    this.typId = data[0].typ_id
                }
            }
        },
        async onPressCreate() {
            const result = await Spec.create({name:this.name, category:this.catId, extension:this.extId,type:this.typId})

            if (result.type === "error") {
                this.errors = result.data
            } else if(result.type ==="success") {
                this.errors = {}
                this.promptSuccessBox = true
            }
        },
        async getCategories() {
            const result = await Category.getAll()
            this.categories = !Array.isArray(result.data) ? [result.data] : result.data
        },
        async findExtensionsBy(category) {
            const result = await Extension.getAllByCategory(category)
            if (result.type === 'success') {
                this.extensions = !Array.isArray(result.data) ? [result.data] : result.data
            }
        },
        async findTypeByExtension(extension) {
            const result = await Type.getAllByExtension(extension)
            if (result.type === 'success') {
                this.types = !Array.isArray(result.data) ? [result.data] : result.data
            }
        }
    }
}
</script>