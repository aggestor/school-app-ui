<template>
<div class="w-11/12 mx-auto  flex justify-center items-center md:h-auto my-10">
    <div v-if="promptSuccessBox" data-aos="slide-up" data-aos-duration="500" class="md:w-8/12 w-full overflow-hidden __shad flex md:flex-row flex-col justify-between items-center h-96 md:h-[60%] rounded-lg border">
        <div class="md:w-6/12 w-full h-[50%]  flex md:h-full bg-green-500 md:p-8 p-6  justify-center items-center flex-col" >
            <CheckCircleIcon class="w-20 h-20 text-white"/>
            <h1 class="font-semibold text-2xl text-white mt-3">Modification éffectuée.</h1>
        </div>
        <div class="md:w-6/12 w-full h-[50%] flex items-center flex-col justify-center md:h-full">
            <span class="text-gray-800 text-center md:w-11/12 w-10/12">La modification de la branche  <b>{{name}}</b> a été éffectuée avec succès. Vous pouvez maintenant ajouter y mettre des produits, etc...</span>
            <span class="bg-green-500 shadow-green-300 shadow-lg px-2 py-1.5 mt-5 hover:bg-green-600 rounded text-white text-lg"><router-link :to="'/admin/shops/'+shop.id+'/branches'">Continuer</router-link></span>
        </div>
    </div>
    <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-10/12 w-full bg-white __shad flex justify-between items-center border h-[92%] rounded-lg">
        <div class="md:w-7/12 flex h-[80%] md:p-6 p-4  justify-center flex-col" >
            <div class=" flex items-center">
                <GoBackAdminButton/> <span class="ml-1 mr-1">|</span> <h1 class=" text-lg text-gray-700">Modifier <span class="font-semibold">{{ shop.name }}</span> </h1>
            </div>
            <form class="h-full w-full flex flex-col">
                <div class="md:w-9/12">
                    <TextBox :onChange="handleChange" label="Nom du shop"  type="text" name="name" placeholder="Le nom de votre shop" :value="name" :err="errors.name"/>
                </div>
                <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">
                    <TextBox  :onChange="handleChange" label="Contact" type="text" name="contact" placeholder="Votre contact" :value="contact" :err="errors.contact"/>
                    <TextBox :onChange="handleChange" label="WhatsApp"  type="text" name="whatsApp" placeholder="Votre WhatsApp" :value="whatsApp" :err="errors.whatsapp" />
                </div>
                <div class="w-full flex md:space-x-1 flex-col md:flex-row items-center justify-between">
                    <Datalist  :onChange="handleChange" :items="transpiledLocations" list="location" label="Ville"  type="text" name="town" placeholder="Votre ville" :value="town" :err="errors.town">
                        <option v-for="t of locations" :key="t.id" :value="t.name">{{t.name }}</option>
                    </Datalist>
                    <TextBox :onChange="handleChange" label="Addresse précise" type="text" name="address" placeholder="Votre Addresse Exacte" :value="address" :err="errors.address"/>
                </div>
            </form>
            <p class="text-sm mt-4">En créant une branche, le propriétaire accepte <router-link to="/term-of-use"><span class="text-blue-700">les Conditions générales de vendeur</span></router-link>  sur muyiSphere.</p>
            <div class="w-full items-center mt-2 flex  justify-between">
                <ButtonLink text="Voir les branches" :path="'/admin/shops/'+shop.shop_id+'/branches'" variant="default"/>
                <Button text='Enregistrer' variant="bg" design="primary" :onClick="onPressRegister"/>
            </div>
        </div>
        <div class="w-5/12 md:flex hidden flex-col items-center justify-center h-full">
            <div class="h-60 w-60 relative flex justify-center items-center rounded border">
                <input hidden ref="inputImage" type="file" name="file" @change="loadImage"/>
                <div v-if="!image" class="flex justify-center flex-col items-center">
                    <PhotoIcon class="h-16  cursor-pointer w-16 text-gray-500"/>
                    <span>Ajouter une photo</span>
                    <span class="text-red-500 mt-1 text-sm">{{errors.image}}</span>
                </div>
                <div class="w-full h-full p-2" v-else>
                    <img :src="image" class="h-full w-full object-cover" alt="Company logo">
                </div>
                <div class='absolute cursor-pointer -bottom-5 h-10 w-10'>
                    <PlusCircleIcon  @click="handleLoadImage" class="h-8 hover:text-gray-400 w-8 text-gray-500"/>
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
import Datalist from "../../components/Datalist.vue"
import Branch from "../../api/branch"
import {CheckCircleIcon, PhotoIcon, PlusCircleIcon} from "@heroicons/vue/24/solid"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import {useLogout} from "../../helpers/logout"
import location from '../../api/location'
import useTranspiler from "../../helpers/use-transpiler"
import GoBackAdminButton from "../../components/GoBackAdminButton.vue"
import { store } from "../../api"
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
    Datalist
},
    data(){
        return {
            id:"",
            address: "",
            errors: {},
            image: '',
            contact: '',
            whatsApp: '',
            town: '',
            locationId: '',
            currentCat:"",
            fileImage: '',
            oldImage:"",
            name: "",
            location: [],
            transpiledLocations : [],
            promptSuccessBox: false,
            locations: [],
            shop:{}
        }
    },
    mounted() {
        this.getLocation()
        this.getShop()
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
            const result = await Branch.update({name:this.name,town:this.locationId,location:this.town,image:this.fileImage, oldImage:this.oldImage, id:this.$route.params.branch, owner:this.shop.owner_id, shop_id:this.shop.id, contact:this.contact,whatsApp:this.whatsApp,address:this.address})
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
       async loadImage(e) {
            this.image = URL.createObjectURL(e.target.files[0])
            this.fileImage = e.target.files[0] 
        },
        handleLoadImage() {
            this.$refs.inputImage.click()
        },
        async getLocation() {
            const result = await location.getAll()
            if (result.type === 'success') {
                this.locations = result.data
            }
        },
        async getShop() {
            const result = await Branch.get(this.$route.params.branch)
            if (result.type === "success") {
                const s = result.data
                this.name = s.name
                this.contact = s.contact
                this.whatsApp = s.contact_whatsapp
                this.town = s.location
                this.address = s.full_address
                this.image = store+"/shops/"+s.logo
                this.oldImage = s.logo
                const l = this.locations.filter((a) => a.name === s.location);
                this.locationId = l[0] ? l[0].id : ""
                this.shop = result.data
           }
        }
    }
}
</script>