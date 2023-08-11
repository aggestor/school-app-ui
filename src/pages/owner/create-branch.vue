<template>
    <div class="w-11/12 mx-auto  flex justify-center items-center md:h-[600px]">
        <div v-if="shop?.level?.toLowerCase() === 'basic'" class=" p-4 h-96 w-8/12 flex justify-center items-center flex-col rounded border">
            <div class=" w-full flex items-center">
                    <GoBackAdminButton/> <span class="ml-1 mr-1">|</span> <h1 class=" text-xl text-gray-700">Créer une branche pour <span class="font-semibold">{{ shop.name }}</span></h1>
                </div>
                <div class="h-full flex flex-col justify-center items-center">
                    <FaceFrownIcon class=" h-40 text-gray-500" />
                    <p class="text-gray-600 w-10/12">Salut, vous ne pouvez pas creer de branche maintenat pour votre shop. <b>{{shop.name }}</b> est du niveau <b>Basic</b> qui fait que vous ne pouvez que posseder votre shop mais pas lui rajouter des branches.</p>
                </div>
        </div>
        <div v-else-if="promptSuccessBox" data-aos="slide-up" data-aos-duration="500" class="md:w-8/12 w-full overflow-hidden __shad flex md:flex-row flex-col justify-between items-center h-96 md:h-[60%] rounded-lg border">
            <div class="md:w-6/12 w-full h-[50%]  flex md:h-full bg-green-500 md:p-8 p-6  justify-center items-center flex-col" >
                <CheckCircleIcon class="w-20 h-20 text-white"/>
                <h1 class="font-semibold text-2xl text-white mt-3">Création éffectuée.</h1>
            </div>
            <div class="md:w-6/12 w-full h-[50%] flex items-center flex-col justify-center md:h-full">
                <span class="text-gray-800 text-center md:w-11/12 w-10/12">La création du de la branche  <b>{{name}}</b> a été éffectuée avec succès. Vous pouvez maintenant ajouter y mettre des produits, etc...</span>
                <span class="bg-green-500 shadow-green-300 shadow-lg px-2 py-1.5 mt-5 hover:bg-green-600 rounded text-white text-lg"><router-link :to="'/owner/branches'">Continuer</router-link></span>
            </div>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-10/12 w-full bg-white __shad flex justify-between items-center border h-[92%] rounded-lg">
            <div class="md:w-7/12 flex h-[80%] md:p-6 p-4  justify-center flex-col" >
                <div class=" flex items-center">
                    <GoBackAdminButton/> <span class="ml-1 mr-1">|</span> <h1 class="font-semibold text-xl text-gray-700">Créer une branche</h1>
                </div>
                <form  class="h-full w-full flex flex-col">
                    <div class="md:w-9/12">
                        <TextBox :onChange="handleChange" label="Nom de la branche"  type="text" name="name" placeholder="Le nom de votre shop" :value="name" :err="errors.name"/>
                    </div>
                    <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">
                        <TextBox  :onChange="handleChange" label="Contact" type="text" name="contact" placeholder="Contact" :value="contact" :err="errors.contact"/>
                        <TextBox :onChange="handleChange" label="WhatsApp"  type="text" name="whatsApp" placeholder="Votre WhatsApp" :value="whatsApp" :err="errors.whatsapp" />
                    </div>
                    <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">
                    <TextBox :onChange="handleChange" :items="transpiledLocations" list="location" label="Ville"  type="text" name="town" placeholder="Votre ville" :value="town" :err="errors.town"/>
                    <TextBox :onChange="handleChange" label="Addresse précise" type="text" name="address" placeholder="Votre Addresse Exacte" :value="address" :err="errors.address"/>
                    </div>
                </form>
                <p class="text-sm mt-4">En créant une branche, le propriétaire accepte <router-link to="/term-of-use"><span class="text-blue-700">les Conditions générales de vendeur</span></router-link>  sur muyiSphere.</p>
                <div class="w-full items-center mt-2 flex  justify-between">
                    <Button text='Créer cette branche' variant="bg" design="primary" :onClick="onPressRegister"/>
                </div>
            </div>
            <div class="w-5/12 md:flex hidden flex-col items-center justify-center h-full">
                <div class="h-60 w-60 relative flex justify-center items-center rounded border">
                    <div v-if="!image" class="flex justify-center flex-col items-center">
                        <input hidden ref="input" type="file" name="file" @change="loadImage"/>
                        <PhotoIcon class="h-16  cursor-pointer w-16 text-gray-500"/>
                        <span>Ajouter un logo</span>
                        <span class="text-red-500 mt-1 text-sm">{{errors.image}}</span>
                    </div>
                    <div class="w-full h-full p-2" v-else>
                        <img :src="image" class="h-full w-full object-cover" alt="Company logo">
                    </div>
                    <div class='absolute cursor-pointer -bottom-5 h-10 w-10'>
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
    import Branch from "../../api/branch"
    import Category from "../../api/category"
    import {CheckCircleIcon, PhotoIcon, PlusCircleIcon} from "@heroicons/vue/24/solid"
    import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
    import useVerify from "../../hooks/useVerify"
    import location from '../../api/location'
    import useTranspiler from "../../helpers/use-transpiler"
    import GoBackAdminButton from "../../components/GoBackAdminButton.vue"
    import { FaceFrownIcon } from "@heroicons/vue/24/outline"
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
    FaceFrownIcon
},
        data(){
            return {
                address: "",
                errors: {},
                image: '',
                contact: '',
                whatsApp: '',
                town: '',
                locationId: '',
                category: "",
                currentCat:"",
                fileImage: '',
                name: "",
                location: [],
                owner:'',
                transpiledLocations : [],
                currentButton: "Basic",
                promptSuccessBox: false,
                locations: [],
                transpiledCat: [],
                chosenCat: [],
                datalistCat: "", datalistCatId: '',
                shop:{}
            }
        },
        setup(){
            useVerify('owner')
        },
        mounted() {
            this.getShop()
            this.getLocation()
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
            },
            async onPressRegister() {
                const result = await Branch.create_({name:this.name,town:this.locationId,location:this.town,image:this.fileImage, owner:this.owner, shop_id:this.shop.id, contact:this.contact,whatsApp:this.whatsApp,address:this.address})
                if (result.type === "error") {
                    this.errors = result.data
    
                } else if(result.type == 'success') {
                    this.errors = {}
                    this.promptSuccessBox = true
                }else if(result.type == 'auth') {
                    localStorage.removeItem('admin')
                    this.$router.push('/admin/login')
                }
            },
            chooseShopType(data) {
                this.currentButton = data
            },
            fireChoseMethod() {
                const cat = this.chosenCat.filter((a) => a.name == this.currentCat.name)
                if (!(Array.isArray(cat) && cat.length > 0)) { 
                    if (this.currentButton === "Basic" && this.chooseShopType.length === 1 || (this.currentButton === "Standard" && this.chosenCat.length +1 < 4) || (this.currentButton === "Business" && this.chosenCat.length+1 < 11)) {
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
                if (result.type === 'success') {
                    this.locations = result.data
                }
                this.transpiledLocations = useTranspiler(result, { key: 'id'.id, value: 'name' })
            },
            async getCategories() {
                const result = await Category.getAll()
                result.data.forEach(item => {
                    this.transpiledCat.push({key:item.id, value:item.name})
                })
                this.categories = result.data
            },
            async getShop() {
            const user = JSON.parse(localStorage.getItem('logged_in_user'))
            this.owner = user.data.id
            if(this.$route.params.id){
                const result = await Shop.getByOwner(this.$route.params.id)
                if (result.type === "success") {
                    this.shop = result.data
                    this.shop.id = result.data.id
                }
            }
            else{
                const result = await Shop.getUsingOwner(user.data.id)
                if(result.type == "success"){
                    console.log(result.data);
                    this.shop.name = result.data.shop.shop_name
                    this.shop.id = result.data.shop.shop_id
                    this.shop.level = result.data.shop.shop_level
                    
                }
            }
        },
        }
    }
    </script>