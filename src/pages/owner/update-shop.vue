<template>
    <ReusableHeader title="Modification d'un shop"/>
<div class="w-11/12 mx-auto  flex justify-center items-center md:h-auto my-10">
    <div v-if="promptSuccessBox" data-aos="zoom-in" data-aos-duration="500" class="md:w-8/12 w-full overflow-hidden __shad flex md:flex-row flex-col justify-between items-center h-96 md:h-[350px] rounded-lg border">
        <div class="md:w-6/12 w-full h-[50%]  flex md:h-full bg-green-500 md:p-8 p-6  justify-center items-center flex-col" >
            <CheckCircleIcon class="w-20 h-20 text-white"/>
            <h1 class="font-semibold text-2xl text-white mt-3">Modification éffectuée.</h1>
        </div>
        <div class="md:w-6/12 w-full h-[50%] flex items-center flex-col justify-center md:h-full">
            <span class="text-gray-800 text-center md:w-11/12 w-10/12">La modification du shop <b>{{name}}</b> a été éffectuée avec succès. Vous pouvez maintenant ajouter des produits dans ce shop, ajouter des succursales,etc...</span>
            <span class="bg-green-500 shadow-green-300 shadow-lg px-2 py-1.5 mt-5 hover:bg-green-600 rounded text-white text-lg"><router-link to="/admin/shops">Continuer</router-link></span>
        </div>
    </div>
    <div v-else data-aos="zoom-in" data-aos-duration="500" class="md:w-10/12 w-full bg-white __shad flex justify-between items-center border h-[70%] rounded-lg">
        <div class="md:w-7/12 flex h-[80%] md:p-6 p-4  justify-center flex-col" >
            <div class=" flex items-center">
                <GoBackAdminButton/> <span class="ml-1 mr-1">|</span> <h1 class="font-semibold text-2xl text-gray-700">Modifier un shop</h1>
            </div>
            <form class="h-full w-full flex flex-col">
                <div class="w-full md:hidden flex  flex-col items-center justify-center h-full">
                    <div class="h-60 w-full relative flex justify-center items-center rounded">
                        <div v-if="!image" class="flex justify-center flex-col items-center">
                            <PhotoIcon class="h-16  cursor-pointer w-16 text-gray-500"/>
                            <span>Ajouter une photo</span>
                            <span class="text-red-500 mt-1 text-sm">{{errors.image}}</span>
                        </div>
                        <div class="w-full h-full p-2" v-else>
                            <img :src="image" class="h-full w-full object-cover" alt="Company logo">
                        </div>
                        <div class='absolute -bottom-5 h-10 w-10'>
                            <PlusCircleIcon @click="handleLoadImage" class="h-8 hover:text-gray-400 w-8 text-gray-500"/>
                        </div>
                    </div>
                    <span v-if="image" class="text-red-500 mt-2 text-sm">{{errors.image}}</span>
                </div>
                <div class="md:w-9/12">
                    <TextBox :onChange="handleChange" label="Nom du shop"  type="text" name="name" placeholder="Le nom de votre shop" :value="name" :err="errors.name"/>
                </div>
                <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">
                    <TextBox  :onChange="handleChange" label="Contact" type="text" name="contact" placeholder="Votre contact" :value="contact" :err="errors.contact"/>
                    <TextBox :onChange="handleChange" label="WhatsApp"  type="text" name="whatsApp" placeholder="Votre WhatsApp" :value="whatsApp" :err="errors.whatsapp" />
                </div>
                <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">
                <Datalist  :onChange="handleChange" name="town" label="Ville" :value="town"  placeholder="Choisir la ville" :err="errors.town">
                    <option v-for="m of locations" :value="m.name" :key="m.name">{{m.name }}</option>
                </Datalist>
                <TextBox :onChange="handleChange" label="Addresse précise" type="text" name="address" placeholder="Votre Addresse Exacte" :value="address" :err="errors.address"/>
                </div>
                <div class="md:w-11/12 h-auto">
                    Type de shop
                    <div class="w-full md:h-16 h-36 mb-2 border p-1 flex items-center justify-evenly flex-wrap md:justify-around rounded">
                        <button type="button" @click="()=>chooseShopType('Basic')" :class="`p-1.5 h-fit hover:shadow-lg hover:shadow-green-300 border-2 border-green-500 font-semibold rounded ${currentButton === 'Basic' ? 'bg-green-500 text-white' : 'text-green-500 bg-white'}`">
                            <span v-if="currentButton==='Basic'" class="flex">Basic <CheckCircleIcon class=" h-6 w-6 ml-2"/></span>
                            <span v-else class="flex">Basic</span>
                        </button>
                        <button type="button" @click="()=>chooseShopType('Standard')" :class="`p-1.5 h-fit hover:shadow-lg hover:shadow-blue-300 border-2 border-blue-700 font-semibold rounded transition-colors duration-500 ${currentButton === 'Standard' ? 'bg-blue-700 text-white' : 'text-blue-700 bg-white'}`">
                            <span v-if="currentButton==='Standard'" class="flex">Standard <CheckCircleIcon class="h-6 w-6 ml-2"/></span>
                            <span v-else class="flex">Standard</span>
                        </button>
                        <button type="button" @click="()=>chooseShopType('Business')" :class="`p-1.5 h-fit hover:shadow-lg hover:shadow-orange-300 border-2 border-orange-500 font-semibold rounded transition-colors duration-500 ${currentButton === 'Business' ? 'bg-orange-500 text-white' : 'text-orange-500 bg-white'}`">
                            <span v-if="currentButton==='Business'" class="flex">Business <CheckCircleIcon class="h-6 w-6 ml-2"/></span>
                            <span v-else class="flex">Business</span>
                        </button>
                        <button type="button" @click="()=>chooseShopType('Premium')" :class="`p-1.5 h-fit hover:shadow-lg hover:shadow-gray-300 border-2 border-gray-500 font-semibold rounded transition-colors duration-500 ${currentButton === 'Premium' ? 'bg-gray-500 text-white' : 'text-gray-500 bg-white'}`">
                            <span v-if="currentButton==='Premium'" class="flex">Premium <CheckCircleIcon class="h-6 w-6 ml-2"/></span>
                            <span v-else class="flex">Premium</span>
                        </button>
                    </div>
                    <input hidden ref="input" type="file" name="file" @change="loadImage">
                </div>
                <div class="my-2 text-blue-600 flex">
                    <ArrowRightIcon class="w-4 mr-1"/>
                    <ButtonLink text="Mettre la catégorisation en jours" :path="'/admin/shops/'+id+'/update/categories'" variant="default"/>
                </div>
            </form>
            <p class="text-sm mt-4">En créant un shop, vous acceptez <router-link to="/term-of-use"><span class="text-blue-700">les Conditions générales de vendeur</span></router-link>  sur muyiSphere.</p>
            <div class="w-full items-center mt-2 flex  justify-between">
                <ButtonLink text="Voir les shops" path="/admin/shops" variant="default"/>
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressUpdate"/>
            </div>
        </div>
        <div class="w-5/12 md:flex hidden flex-col items-center justify-center h-full">
            <div class="h-60 w-60 relative flex justify-center items-center rounded border">
                <div v-if="!image" class="flex justify-center flex-col items-center">
                    <PhotoIcon class="h-16  cursor-pointer w-16 text-gray-500"/>
                    <span>Ajouter une photo</span>
                    <span class="text-red-500 mt-1 text-sm">{{errors.image}}</span>
                </div>
                <div class="w-full h-full p-2" v-else>
                    <img :src="image" class="h-full w-full object-cover" alt="Company logo">
                </div>
                <div class='absolute -bottom-5 h-10 w-10'>
                    <PlusCircleIcon @click="handleLoadImage" class="h-8 hover:text-gray-400 w-8 text-gray-500"/>
                </div>
            </div>
            <span v-if="image" class="text-red-500 mt-2 text-sm">{{errors.image}}</span>
        </div>
    </div>
</div>
  
</template>
<script>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import Shop from "../../api/shop"
import Category from "../../api/category"
import {CheckCircleIcon, PhotoIcon, PlusCircleIcon,ArrowRightIcon} from "@heroicons/vue/24/solid"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import {useLogout} from "../../helpers/logout"
import location from '../../api/location'
import GoBackAdminButton from "../../components/GoBackAdminButton.vue"
import Datalist from "../../components/Datalist.vue"
import ReusableHeader from "../../components/ReusableHeader.vue"
import { store } from "../../api"
import useVerify from "../../hooks/useVerify"
export default {
    components: {
    ButtonLink,
    Button,
    TextBox,
    CheckCircleIcon,
    PagesNavigationHeader,
    PhotoIcon,
    PlusCircleIcon,
    GoBackAdminButton,
    Datalist,
    ReusableHeader,
    ArrowRightIcon
    },
    data(){
        return {
            address: "",
            errors: {},
            image: '',
            id:"",
            contact: '',
            whatsApp: '',
            town: '',
            locationId: '',
            category: "",
            currentCat:"",
            fileImage: '',
            name: "",
            oldImage:"",
            location: [],
            currentButton: "",
            promptSuccessBox: false,
            locations: [],
            categories: [],
            chosenCat: [],
            datalistCat:"",datalistCatId:''
        }
    },
    mounted() {
        this.getLocation()
        this.getCategories()
        this.getShop()
    },
    setup(){
        useVerify('owner')
    },
    methods: {
        async handleChange(e) {
            this[e.target.name] = e.target.value
            if (e.target.name === "town") {
                const data = this.locations.filter(a => a.name === e.target.value)
                if (data[0]) {
                    this.locationId = data[0].id
                    this.errors.town = undefined;
                } else {
                    this.errors.town = "Ville choisie invalide !"
                }
            }
            if (e.target.name === "category") {
                const data = this.categories.filter((a) => a.name == e.target.value)[0]
                if (data) {
                    this.currentCat  = data
                }
            }
        },
        async onPressUpdate() {
            const result = await Shop.update({id:this.$route.params.id,name:this.name,town:this.locationId,location:this.town,image:this.fileImage,oldImage:this.oldImage, contact:this.contact, level:this.currentButton,whatsApp:this.whatsApp,address:this.address})
            if (result.type === "error") {
                this.errors = result.data

            } else if(result.type == 'success') {
                this.errors = {}
                this.promptSuccessBox = true
            }
        },
        chooseShopType(data) {
            this.currentButton = data
        },
        fireChoseMethod() {
            const cat = this.chosenCat.filter((a) => a.name == this.currentCat.name)
            if (!(Array.isArray(cat) && cat.length > 0)) { 
                if ((this.currentButton === "Basic" && this.chosenCat.length+1 <= 1) || (this.currentButton === "Standard" && this.chosenCat.length +1 < 4) || (this.currentButton === "Business" && this.chosenCat.length+1 < 11)) {
                    this.chosenCat.push(this.currentCat)
                    if(this.datalistCat === "" && this.datalistCatId == ""){
                        this.datalistCat = this.currentCat.name
                        this.datalistCatId = this.currentCat.id
                    } else {
                        this.datalistCat =this.datalistCat+"$"+this.currentCat.name
                        this.datalistCatId =this.datalistCatId+"$"+this.currentCat.id
                    }
                }
                this.errors['category'] = undefined
            } else {
                this.errors['category'] = "Catégorie déjà choisie"
            }
            this.category = ""
        },
       async loadImage(e) {
            this.image = URL.createObjectURL(e.target.files[0])
            this.fileImage = e.target.files[0] 
        },
        handleLoadImage() {
            this.$refs.input.click()
        },
        async getLocation() {
            const result = await location.getAll()
            useLogout(result).then((w) => w === "success" ? this.$router.push("/login") : null)
            if (result.type === 'success') {
                this.locations = result.data
            }
        },
        async getCategories() {
            const result = await Category.getAll()
            if(result.type === "success")
            this.categories = !Array.isArray(result.data) ? [result.data]: result.data
        },
        async getShop() {
            const result = await Shop.get(this.$route.params.id)
            if(result.type === "success"){
                const sh = result.data
                this.id = sh.id
                this.name = sh.name
                this.contact = sh.contact
                this.whatsApp = sh.contact_whatsapp
                const l = this.locations.filter((a) => a.id === sh.location)
                this.town = l[0]? l[0].name : ""
                this.locationId = sh.location
                this.address = sh.full_address
                this.currentButton = sh.level
                this.image = store+"/shops/"+sh.logo
                this.oldImage = sh.logo

            }
        }
    }
}
</script>