<template>
  <head>
    <title>{{product.prod_name}}| Muyisphere</title>
    <meta name="description" :content="product.description" />
    <meta name="keywords" :content="product.keywords" />
  </head>
  <div class="w-[98%] mx-auto h-auto">
    <FirstHomeSection/>
    <section class="w-full relative  h-[85%] md:p-6 overflow-hidden mt-6 mb-3  grid grid-cols-12 p-3  md:space-x-5 ">
      <div class="col-span-5 md:flex hidden flex-col rounded-lg h-full">
        <div v-touch:swipe="swipeEventHandler"  class="w-full group relative h-80 overflow-hidden transition-a, PlusIconll duration-500">
            <img v-if="currentImage.includes('IMG') "  :class="`rounded-lg bg-gray-200  transition-[opacity] ${opacity} ease-in-out duration-700 w-full h-full object-cover`" :src="store+'/products/'+currentImage" alt="">
            <video autoplay controls  onclick="e => e.target.play()" v-else-if="!currentImage.includes('IMG') && currentImage != ''"  :src="store+'/products/'+currentImage" class="h-full w-full"></video>
            <img   :class="`rounded-lg bg-gray-200  transition-[opacity] ${opacity} ease-in-out duration-700 w-full h-full object-cover`" src="/images/placeholder-no-prod.jpg" alt="">
            <div @click="setDirection('right')" class="absolute group-hover:flex cursor-pointer hidden duration-500 transition-all justify-center items-center backdrop-blur-sm left-0 top-0 w-10 h-full bg-[#fcffff4f]">
              <ChevronLeftIcon class="h-16 w-8 text-black"/>
            </div>
            <div @click="setDirection('left')" class="absolute group-hover:flex cursor-pointer hidden duration-500 ease-in-out transition-[display]  justify-center items-center backdrop-blur-sm right-0 top-0 w-10 h-full bg-[#fcffff4f]">
              <ChevronRightIcon class="h-16 w-8 text-black"/>
            </div>
           <div class="w-fit absolute  rounded-full px-2 right-1 flex justify-between backdrop-blur items-center top-2  text-white bg-blue-600 bg-opacity-50">
              <span>{{currentIndex+1}}</span> / <span>{{images.length}}</span>
            </div>
            <span class="absolute bg-blue-600 bg-opacity-50 text-white rounded-full  px-1   top-2  right-12 z-10">{{product.is_brand_new == 0 ? "Used" : "New" }}</span>
        </div>
        <div class="w-full mt-4 relative">
          <div ref="imagesHolder" @scroll="handleScrollBar" class="w-full transition-all duration-500  flex  overflow-x-auto __invisible_scroll  overflow-y-hidden justify-between items-center h-24 bg-white rounded-lg">
            <div @click="renderImage(image)" v-for="image of images"  :key="image" :class="`w-20 cursor-pointer flex-none h-20 rounded-lg overflow-hidden border-2 ${currentImage === image ? ' border-blue-600 shadow shadow-blue-300' : 'border-transparent'}`">
              <img v-if="image.includes('IMG')"  :alt="image" :src="store+'/products/'+image" class="w-full transition-all duration-500 h-full object-cover">
              <video autoplay muted onclick="e => e.target.play()" v-else  :src="store+'/products/'+image" class="h-full w-full"></video>

            </div>
          </div>
        </div>
        <div v-if="product.branch_name" class="mt-3">
          <span class="font-semibold mb-3 text-lg">Information de contact</span>
          <p class="flex"><BuildingStorefrontIcon class="w-5 h-5 text-gray-600 mr-2"/> {{ product.branch_name }}</p>
          <p class="flex"><GlobeEuropeAfricaIcon class="w-5 h-5 text-gray-600 mr-2"/> {{town || "Butembo,"}}</p>
          <div class="flex">
            <a :href="`tel:${product.contact}`" class=" w-8 text-white grid mr-1 place-items-center bg-red-600 rounded h-8 "><PhoneIcon class="w-6 h-6"/></a>
            <a target="blank" :href="`https://wa.me/${product.contact_whatsapp?.slice(1)}/?text= Bonjour, je suis interesse(e) par votre produit, *${product.prod_name}.* \n https://muyisphere.com/products/${product.prod_id}`" class=" w-8 text-white grid place-items-center bg-green-600 rounded h-8 "><WhatsApp class="w-7 fill-white  h-7"/></a>
          </div>
        </div>
        <div v-else class="mt-3">
          <span class="font-semibold mb-3 text-lg">Information de contact</span>
          <p class="flex"><BuildingStorefrontIcon class="w-5 h-5 text-gray-600 mr-2"/> {{ product.shop }}</p>
          <p class="flex"><GlobeEuropeAfricaIcon class="w-5 h-5 text-gray-600 mr-2"/> {{town || "Butembo,"+ product.full_address }}</p>
          <div class="flex">
            <a :href="`tel:${product.contact}`" class=" w-8 text-white grid mr-1 place-items-center bg-red-600 rounded h-8 "><PhoneIcon class="w-6 h-6"/></a>
            <a target="blank" :href="`https://wa.me/${product.contact_whatsapp?.slice(1)}/?text= Bonjour, je suis interesse(e) par votre produit, *${product.prod_name}.* \n https://muyisphere.com/products/${product.prod_id}`" class=" w-8 text-white grid place-items-center bg-green-600 rounded h-8 "><WhatsApp class="w-7 fill-white  h-7"/></a>
          </div>
        </div>
      </div>
      <div class="md:col-span-7 col-span-12 h-full flex flex-col justify-between">
        <div class="w-full flex font-semibold justify-between mb-2 text-gray-800 border-b pb-2">        
          <h1 class="text-xl">{{product.prod_name }}</h1>
        </div>
       <div class="w-full h-full">
        <div class="flex text-sm md:text-base my-2 flex-wrap">
          <ButtonFilterLink type="categories" :id="product.category_id" :name="product.category"/>
          <ButtonFilterLink type="extensions" :id="product.extension_id" :name="product.extension"/>
          <ButtonFilterLink type="types" :id="product.type_id" :name="product.type"/>
          <ButtonFilterLink type="marks" :id="product.mark_id" :name="product.mark"/>
          <ButtonFilterLink type="models" :id="product.model_id" :name="product.model"/>
          <ButtonFilterLink type="sets" :id="product.set_id" :name="product.set_"/>
        </div>
        <div class="md:hidden w-full">
          <div v-touch:swipe="swipeEventHandler"  class="w-full group relative h-64 overflow-hidden transition-all duration-500">
            <img  v-if="currentImage.includes('IMG')" :class="`rounded-lg bg-gray-200  transition-[opacity] ${opacity} ease-in-out duration-700 w-full h-full object-cover`" :src="store+'/products/'+currentImage" alt="">
            <video autoplay controls onclick="e => e.target.play()" v-else-if="currentImage.includes('IMG') && currentImage !=''"  :src="store+'/products/'+currentImage" class="h-full w-full"></video>
            <img   :class="`rounded-lg  ease-in-out duration-700 w-full h-full object-cover`" src="/images/placeholder-no-prod.jpg" alt="">
            <div @click="setDirection('right')" class="absolute group-hover:flex cursor-pointer hidden duration-500 transition-all justify-center items-center backdrop-blur-sm left-0 top-0 w-10 h-full bg-[#fcffff4f]">
              <ChevronLeftIcon class="h-16 w-8 text-black"/>
            </div>
            <div @click="setDirection('left')" class="absolute group-hover:flex cursor-pointer hidden duration-500 ease-in-out transition-[display]  justify-center items-center backdrop-blur-sm right-0 top-0 w-10 h-full bg-[#fcffff4f]">
              <ChevronRightIcon class="h-16 w-8 text-black"/>
            </div>
            <div class="w-fit absolute  rounded-full px-2 right-1 flex justify-between backdrop-blur items-center top-2  text-white bg-blue-600 bg-opacity-50">
              <span>{{currentIndex+1}}</span> / <span>{{images.length}}</span>
            </div>
            <span class="absolute bg-blue-600 bg-opacity-50 backdrop-blur rounded-full text-white px-1   top-2  right-12 z-10">{{product.is_brand_new == 0 ? "Used" : "New" }}</span>
        </div>
        <div class="w-full mt-4 relative">
          <div ref="imagesHolder" @scroll="handleScrollBar" class="w-full transition-all duration-500  flex  overflow-x-auto __invisible_scroll  overflow-y-hidden justify-between items-center h-24 bg-white rounded-lg">
            <div @click="renderImage(image)" v-for="image of images"  :key="image" :class="`w-20 cursor-pointer flex-none h-20 rounded-lg overflow-hidden border-2 ${currentImage === image ? ' border-blue-600 shadow shadow-blue-300' : 'border-transparent'}`">
              <img v-if="image.includes('IMG')"  :alt="image" :src="store+'/products/'+image" class="w-full transition-all duration-500 h-full object-cover">
              <video autoplay muted onclick="e => e.target.play()" v-else  :src="store+'/products/'+image" class="h-full w-full"></video>
            </div>
          </div>
        </div>
        </div>
        <div class="flex space-x-3 mt-3  border-blue-600 items-center text-blue-600 overflow-hidden font-semibold h-8 border-b w-full">
          <span @click="updateDetailSection('details')" :class="`p-1 transition-colors cursor-pointer  duration-500 ${detailSection == 'details'? 'bg-blue-600 text-white':'hover:bg-blue-200'}  h-full flex items-center`">Details</span>
          <span @click="updateDetailSection('specs')" :class="`p-1 transition-colors cursor-pointer  duration-500 ${detailSection == 'specs'? 'bg-blue-600 text-white':'hover:bg-blue-200'}  h-full flex items-center`">Specifications</span>
        </div>
        <section class="w-full" id="wrapper">
          <div v-if="detailSection ==='details'" data-aos="slide-left" data-aos-duration="500" class="w-full">
            <div class="w-full mt-2">
              <p class="font-semibold text-lg">Quantite et prix</p>
             <div v-if="product.price?.split('_')[1]" class="flex justify-around">
                <p class="text-black font-bold text-2xl">{{ product.price?.split("_")[1]}}$</p> 
                <p class="font-semibold">{{ product.quantity?.split("_")[1]}} pcs</p>
                <p class="text-green-600 font-semibold" v-if=" product.availability == 'green'">In stock</p>
                <p class="text-yellow-600 font-semibold" v-if=" product.availability == 'yellow'">Running out</p>
                <p class="text-red-600 font-semibold" v-if=" product.availability == 'red'">Few left</p>
             </div> 
             <div v-else class="w-full">
              <div class="w-full flex  justify-between">
                <div class="flex flex-col w-1/3 justify-center items-center">
                  <span class="font-semibold text-lg">{{product.price_1?.split('_')[1] }}$</span>
                  <span class="text-gray-600 text-sm">Min.order. {{product.quantity_1?.split('_')[1] }}pcs</span>
                </div>
                <div class="flex flex-col w-1/3 justify-center items-center">
                  <span class="font-semibold text-lg">{{product.price_2?.split('_')[1] }}$</span>
                  <span class="text-gray-600 text-sm">{{parseInt(product.quantity_1?.split('_')[1])+1 }} pcs - {{product.quantity_3?.split('_')[1]-1 }} pcs</span>
                </div>
                <div class="flex flex-col w-1/3 justify-center items-center">
                  <span class="font-semibold text-lg">{{product.price_3?.split('_')[1] }}$</span>
                  <span class="text-gray-600 flex items-center text-sm">Up to &ThinSpace;{{product.quantity_3?.split('_')[1] }} pcs</span>
                </div>
              </div>
             </div>
            </div>
            <div class="w-full mt-2">
              <p class="font-semibold text-lg">Description</p>
             <p class="text-gray-600">{{ product.description }}</p> 
            </div>
          </div>
          <div v-if="detailSection ==='specs'" data-aos="slide-left" data-aos-duration="500" class="w-full">
            <div class="w-full mt-2">
              <div v-if="specs" v-for="p of specs">
                <div class=" flex text-gray-600 mb-1.5 flex-col">
                  <div class="w-full">{{p.name }}</div>
                  <div class="w-full font-semibold text-gray-700">{{p.value }}</div></div>
              </div>
            </div>
          </div>
        </section>
        <div class="w-full md:hidden">
          <div v-if="product.branch_name" class="mt-3">
          <span class="font-semibold mb-3 text-lg">Information de contact</span>
          <p class="flex"><BuildingStorefrontIcon class="w-5 h-5 text-gray-600 mr-2"/> {{ product.branch_name }}</p>
          <p class="flex"><GlobeEuropeAfricaIcon class="w-5 h-5 text-gray-600 mr-2"/> {{town || "Butembo,"}}</p>
          <div class="flex">
            <a :href="`tel:${product.contact}`" class=" w-8 text-white grid mr-1 place-items-center bg-red-600 rounded h-8 "><PhoneIcon class="w-6 h-6"/></a>
            <a target="blank" :href="`https://wa.me/${product.contact_whatsapp?.slice(1)}/?text= Bonjour, je suis interesse(e) par votre produit, *${product.prod_name}.* \n https://muyisphere.com/products/${product.prod_id}`" class=" w-8 text-white grid place-items-center bg-green-600 rounded h-8 "><WhatsApp class="w-7 fill-white  h-7"/></a>
          </div>
        </div>
        <div v-else class="mt-3">
          <span class="font-semibold mb-3 text-lg">Information de contact</span>
          <p class="flex"><BuildingStorefrontIcon class="w-5 h-5 text-gray-600 mr-2"/> {{ product.shop }}</p>
          <p class="flex"><GlobeEuropeAfricaIcon class="w-5 h-5 text-gray-600 mr-2"/> {{town || "Butembo,"+ product.full_address }}</p>
          <div class="flex">
            <a :href="`tel:${product.contact}`" class=" w-8 text-white grid mr-1 place-items-center bg-red-600 rounded h-8 "><PhoneIcon class="w-6 h-6"/></a>
            <a target="blank" :href="`https://wa.me/${product.contact_whatsapp?.slice(1)}/?text= Bonjour, je suis interesse(e) par votre produit, *${product.prod_name}.* \n https://muyisphere.com/products/${product.prod_id}`" class=" w-8 text-white grid place-items-center bg-green-600 rounded h-8 "><WhatsApp class="w-7 fill-white  h-7"/></a>
          </div>
        </div>
        </div>
        <div class="mt-4">
          <p class=" text-gray-600">Posted on  {{moment(product.created_at).format('ll')}}</p>
        </div>
       </div>
        <div class="mb-2 flex  justify-between">
          <BlueButtons @press="goBack">
            <ArrowLeftIcon class="w-5 h-5 mr-1"/> Go back
          </BlueButtons>
          <BlueButtons @press="onClickAddToCart">
            <ShoppingCartIcon class="w-5 h-5"/> <PlusIcon class="w-4 h-4"/>
          </BlueButtons>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderMenuSub from "../components/HeaderMenuSub.vue"
import CartItem from "../components/CartItem.vue"
import Button from '../components/Button.vue'
import BlueButtons from '../components/v2/BlueButtons.vue'
import ButtonLink from '../components/ButtonLink.vue'
import { ChevronLeftIcon, ChevronRightIcon,PlusIcon, PhotoIcon,BuildingStorefrontIcon, GlobeEuropeAfricaIcon, PhoneIcon } from "@heroicons/vue/24/solid"
import FirstHomeSection from "../components/public/FirstHomeSection.vue"
import prettyString from "../helpers/pretty-string"
import Product from "../api/product"
import Location from "../api/location"
import {store} from "../api/index"
import WhatsApp from "../components/public/Whatsapp.vue"
import moment from "moment"
import { ShoppingCartIcon,ArrowLeftIcon } from "@heroicons/vue/24/outline"
import ButtonFilterLink from "../components/public/ButtonFilterLink.vue"


export default {
  components: {
    HeaderMenuSub,
    CartItem,
    Button,
    ButtonLink,
    ChevronRightIcon,
    ChevronLeftIcon,
    PhotoIcon,
    FirstHomeSection,
    GlobeEuropeAfricaIcon,
    BuildingStorefrontIcon,
    PhoneIcon,
    ShoppingCartIcon,
    WhatsApp,
    ButtonFilterLink,
    PlusIcon,
    BlueButtons,
    ArrowLeftIcon
},
  data() {
    return {
      currentImage: '',
      currentIndex : 0,
      product:{},
      town:'',
      specs : [],
      images: [],
      detailSection: 'details',
      opacity:'opacity-100'
    }
  },
  setup(){
    return {store, prettyString,moment}
  },
  mounted() {
    this.initiatePage()
  },
  watch:{
    '$route.path': {
            handler() {
                this.initiatePage()
            },immediate:true
        }
  },
  methods: {
    renderImage(img) {
      this.useAfterTimeout()
        this.currentImage = img
        this.currentIndex = this.images.indexOf(img)
        if (this.currentIndex <= 3) {
          this.$refs['imagesHolder'].scrollLeft = 0;
        }
        if (this.currentIndex >= 3) {
          this.$refs['imagesHolder'].scrollLeft = 100;
        }
    },
    initiatePage(){
      this.getProduct().then(()=>{
      this.currentImage = this.images[0]
      this.currentIndex = 0
      if(this.product.branch_id){
        this.getLocation(this.product.branch_location,this.product.branch_address)
      }else this.getLocation(this.product.location,this.product.full_address)
    }).then(this.viewProduct)
    },
    updateImage(direction) {
      if (direction === 'left' && this.currentIndex < this.images.length - 1) {
          this.currentImage = this.images[this.currentIndex + 1]
          this.currentIndex +=1
        
      } else if (direction === 'right' && this.currentIndex > 0) {
          this.currentImage = this.images[this.currentIndex - 1]
          this.currentIndex -=1
      }

      if (direction === 'left' && this.currentIndex == 4) {
        this.$refs['imagesHolder'].scrollLeft = 100;
      }
      if (direction === 'right' && this.currentIndex <=4) {
        this.$refs['imagesHolder'].scrollLeft = 0;
      }
    }
    ,
    setDirection(direction) {
     this.useAfterTimeout()
     this.updateImage(direction) 
    },
    swipeEventHandler(e) {
      this.useAfterTimeout()
      this.updateImage(e)
    },
    async getProduct(){
      const {id} = this.describeLink()
      const result = await Product.getData(id)
      if(result.type === "success"){
        this.product = result.data
        const specs = result.data.details && result.data.details !== "undefined" ? JSON.parse(result.data.details) :null
        this.specs = specs ? (Array.isArray(specs)? specs : [specs]) : []
        this.images = result.data.files.split(",")
      }
    },
    describeLink(){

      let data = {}
      if(parseInt(this.$route.params.id)){
        data.id = this.$route.params.id
        data.name = prettyString(this.$route.params?.name,true)
        return data
      }else{
        this.$router.go('/page-not-found')
      }
    },
    async useAfterTimeout(){
      this.opacity = "opacity-40"
      setTimeout(()=>{ this.opacity = "opacity-100"}, 700)
    },
    async viewProduct(){
      const viewProduct = await Product.addInteraction("view",this.$route.params.id)
    },
    async getLocation(id, completion){
      const result = await Location.get(id)
      this.town = result.data.name+", "+completion
    },
    onClickAddToCart(){
      const link = '/cart/add/'+prettyString(this.product.prod_name)+'/'+this.product.quantity+'&'+this.product.quantity_1+'&'+this.product.quantity_2+'&'+this.product.quantity_3+'/'+this.product.price+'&'+this.product.price_1+'&'+this.product.price_2+'&'+this.product.price_3+'/'+this.product.files?.split(",")[0]+'/'+this.product.prod_id
       this.$router.push(link)
    },
    updateDetailSection(input){
      this.detailSection = input
    },
    goBack(){
      this.$router.back()
    }
  }

}
</script>