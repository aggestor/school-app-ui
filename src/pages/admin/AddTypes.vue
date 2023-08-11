<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox" class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Ajouter un type"/>
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
import useVerify from "../../hooks/useVerify"
export default {
    components: {
    ButtonLink,
    Button,
    TextBox,
    CheckCircleIcon,
    PagesNavigationHeader,
    SuccessComponent
},
setup(){
    useVerify()
},
    data(){
        return {
            errors: {},
            name: "",
            category: "",
            catId: 0,
            extId:0,
            extension:'',
            promptSuccessBox: false,
            categories: [],
            extensions:[],
            transpiledCat: [],
            transpiledExt:[],
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
                    if (data) {
                        this.findExtensionsBy(data[0].id)
                        this.catId = data[0].id
                    }
                } 
            }
            else if (e.target.name === "extension") {
                const data = this.extensions.filter(a => a.ext_name === e.target.value)
                if (data) {
                    this.extId = data[0].ext_id
                }
            }
        },
        async onPressCreate() {
            const result = await Type.create({name:this.name, category:this.catId, extension:this.extId})

            if (result.type === "error") {
                this.errors = result.data
            } else if(result.type ==="success") {
                this.errors = {}
                this.promptSuccessBox = true
            }
        },
        async getCategories() {
            const result = await Category.getAll()
            result.data.forEach(item => {
                this.transpiledCat.push({key:item.id, value:item.name})
            })
            this.categories = result.data
        },
        async findExtensionsBy(category) {
            const result = await Extension.getAllByCategory(category)
            const v = []
            if (result.type === 'success') {
                let d = null;
                if(!Array.isArray(result.data)){
                    d = [result.data]
                }else d = result.data
                d.forEach(item => {
                    v.push({ key: item.ext_id, value: item.ext_name })
                })
                this.transpiledExt = v
                this.extensions = d
            }
        }
    }
}
</script>