<template>
    <div class="mt-6">
        <div class="w-full md:h-full  flex justify-center items-center">
            <div v-if="!promptSuccessBox" class="md:w-5/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
                <PagesNavigationHeader title="Modifier un carrousel"/>
                <p class="text-gray-600 mb-3 text-sm">Remplissez le formulaire ci-bas pour enregister un nouveau carrousel.</p>
                <form class="h-full w-full flex flex-col">
                    <div class=" mb-3 md:w-full flex flex-col items-center justify-center h-full">
                        <div class="h-40 w-full relative flex justify-center items-center rounded border">
                            <div v-if="!image" class="flex justify-center flex-col items-center">
                                <PhotoIcon class="h-16  cursor-pointer w-16 text-gray-500"/>
                                <span>Ajouter une photo</span>
                                <span class="text-red-500 mt-1 text-sm">{{errors.image}}</span>
                            </div>
                            <div class="w-full h-full p-2" v-else>
                                <img :src="image" class="h-full w-full object-cover" alt="Company logo">
                            </div>
                            <div class='absolute -bottom-5 h-10 w-10'>
                                <PlusCircleIcon @click="handleLoadImage" class="h-8 hover:text-gray-400 w-8 cursor-pointer text-gray-500"/>
                            </div>
                        </div>
                        <span v-if="image" class="text-red-500 mt-2 text-sm">{{errors.image}}</span>
                    </div>
                    <div class="w-full mx-auto ">
                        <div class="relative max-h-96 mt-1 border rounded p-1 w-full">
                            <input @input="handleSearchShop" :value="shopValue" class="h-8 w-full outline-none" placeholder="Rechercher un shop" />
                            <div data-aos-duration="300" v-if="showSuggestionsBox" class=" w-full shadow z-50 absolute top-10 rounded p-2 h-60 bg-white border left-0 mt-1">
                                <SearchSkeltonAnimation v-if="loading"/>
                                <div class="w-full" v-else-if="!loading && Array.isArray(shops)">
                                    <div @click="() => chooseShop(s)" class="w-full hover:bg-gray-100 cursor-pointer rounded p-1 flex justify-between" v-for="s of shops" :key="s.id">
                                        <span>{{s.name}}</span> 
                                    </div>
                                </div>
                                <div v-else class="w-full h-full grid text-gray-600 place-items-center">
                                    <div class="w-fit flex flex-col items-center h-fit">
                                        <FaceFrownIcon class="h-16 w-16 mb-2"/>
                                    <small class="w-9/12 mx-auto text-center">Aucun resultat pour ce nom de shop. Verifier l'orthographe ou <router-link class="text-blue-600 font-semibold" to="/admin/shops/new">créer d'abord ce shop</router-link> .</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input hidden ref="input" type="file" name="file" @change="loadImage"/>
                    <TextBox  :onChange="handleInput" type="text" name="name" label="Titre du carousel" :value="name"   :err="errors.name"/>
                    <TextBox list="duration"   :onChange="handleInput" type="number" name="duration" label="Nombre de jours" :value="duration"  :err="errors.duration"/>
                    <TextBox list="youtube"   :onChange="handleInput" type="text" name="youtube" label="Lien youtube(facultatif)" :value="youtube"  :err="errors.youtube"/>
                    <DatePicker name="date" :value="date" :event="handleInput" label="Date de début" :err="errors.date"/>
                </form>
                <div class="w-full flex mt-3 justify-between">
                    <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
                </div>
            </div>
             <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
                <SuccessComponent path="/admin/sliders" title="Enregitrement effectué !" message="Le carousel a été enregistré avec succès. Il est maintenant utilisable partout. Il sera visible dans la durée que vous avez donné à partir du moment que vous avez configuré."/>
            </div>
        </div>
    </div>
</template>
<script>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import DatePicker from "../../components/DatePicker.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import {CheckCircleIcon, FaceFrownIcon, PhotoIcon, PlusCircleIcon} from "@heroicons/vue/24/solid"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import Slider from "../../api/slider"
import Shop from "../../api/shop"
import SuccessComponent from "../../components/SuccessComponent.vue"
import prettyString from "../../helpers/pretty-string"
import { store } from "../../api"
export default {
    components: { ButtonLink, Button, TextBox, CheckCircleIcon, PagesNavigationHeader, SuccessComponent, FaceFrownIcon, PhotoIcon, PlusCircleIcon, DatePicker },
    data(){
        return {
            errors: {},
            name: "",
            duration: 0,
            shopId: 0,
            extId:0,
            extension:'',
            promptSuccessBox: false,
            shops: [],
            shopValue:'',
            loading: false,
            image: "",
            youtube: '',
            sliderId:'',
            date:'',
            fileImage: undefined,
            oldImage:'',
            showSuggestionsBox:false
        }
    },
    mounted() {
        this.getSlider()
    },
    methods: {
        async handleInput(e) {
            this[e.target.name] = e.target.value
        },
        async onPressCreate() {
            const result = await Slider.update({id:this.sliderId, oldImage:this.oldImage,name:this.name, duration:this.duration,shop:this.shopId, youtube:this.youtube, image:this.fileImage, date:this.date})
            if (result.type === "error") {
                this.errors = result.data
            } else if(result.type ==="success") {
                this.errors = {}
                this.promptSuccessBox = true
            }
        },
        async loadImage(e) {
            this.image = URL.createObjectURL(e.target.files[0])
            this.fileImage = e.target.files[0] 
        },
        handleLoadImage() {
            this.$refs.input.click()
        },
        async handleSearchShop(e) {
            this.shopValue = e.target.value
            if (e.target.value.length > 1) {
                this.showSuggestionsBox = true
                this.loading = true
                const result = await Shop.search(prettyString(e.target.value))
                if (result.type == "success") {
                    if (!Array.isArray(result.data)) {
                        this.shops = [result.data]
                    } else this.shops = result.data
                }
                this.loading = false
            }
        },
        chooseShop(shop) {
            this.shopId = shop.id
            this.shopValue = shop.name
            this.showSuggestionsBox = false
        },
        async getSlider() {
            const result = await Slider.get(this.$route.params.id)
            if (result.type === "success") {
                this.shopValue = result.data.shop_name    
                this.shopId = result.data.shop_id    
                this.duration = result.data.duration
                this.name = result.data.slider_name
                this.youtube = result.data.youtube 
                this.date = result.data.start_time.split(' ')[0]  
                this.image = store + "/sliders/" + result.data.thumbnail 
                this.oldImage = result.data.thumbnail 
                this.sliderId = result.data.slider_id
            }
            
        }
    }
}
</script>