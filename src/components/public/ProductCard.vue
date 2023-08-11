<script>
import { BuildingStorefrontIcon, ShoppingCartIcon } from "@heroicons/vue/24/outline";
import {defineComponent, onMounted, ref} from "vue"
import prettyString from "../../helpers/pretty-string";
import {store} from '../../api/index'
import { GlobeEuropeAfricaIcon, PhoneIcon } from "@heroicons/vue/24/solid";
import { useRouter } from "vue-router";
import {formatDateToAgo} from "../../helpers/format-date"
import Whatsapp from "../public/Whatsapp.vue"
export default defineComponent({
    props:{
        content : Object
    },
    setup(props) {
        const name = ref("")
        const whatsapp = ref("")
        const contact = ref("")
        const category = ref("")
        const quantity = ref(0)
        const price = ref(0)
        const image = ref('')
        const router = useRouter()
        const location = ref("")
        const addToCart = () =>{
            const link = '/cart/add/'+prettyString(props.content.prod_name)+'/'+props.content.quantity+'&'+props.content.quantity_1+'&'+props.content.quantity_2+'&'+props.content.quantity_3+'/'+props.content.price+'&'+props.content.price_1+'&'+props.content.price_2+'&'+props.content.price_3+'/'+props.content.files?.split(",")[0]+'/'+props.content.prod_id
            router.push(link)
        }
        const stripString  = (value) =>{
            if(value.length <=140) return value
            else return value.slice(0,135)+"..."
        }
        onMounted(()=>{
            name.value = props.content.prod_name
            quantity.value = props.content.quantity.split("_")[1]
            if(props.content.price == "P_"){
                price.value = props.content.price_1.split("_")[1]
                quantity.value = props.content.quantity_1.split("_")[1]
            }else{
                price.value = props.content.price.split("_")[1]
                quantity.value = props.content.quantity.split("_")[1]
            }
            category.value = props.content.category
            contact.value = props.content.branch_name ? props.content.branch_contact : props.content.shop_contact
            whatsapp.value = props.content.branch_name ? props.content.branch_whatsapp : props.content.shop_whatsapp
            location.value = props.content.branch_location ? props.content.branch_location_name : props.content.shop_location_name
            const t = props.content.files?.split(",")
            image.value = t ? (t[0]?  store+'/products/'+t[0] : "/placeholder.jpg") : "/images/placeholder-no-prod.jpg"
        })
        return{props, prettyString,name,quantity,location, price,category, stripString, image, addToCart,formatDateToAgo, contact,whatsapp}
    },
    components: { BuildingStorefrontIcon, GlobeEuropeAfricaIcon, ShoppingCartIcon,Whatsapp, PhoneIcon }
})
</script>
<template>
    <div class="md:w-72 w-[90vw] text-sm h-[420px] shadow-lg hover:shadow-blue-300 transition-colors duration-500 border hover:border-none hover:shadow-xl  overflow-hidden rounded">
        <div class="h-48 relative  w-full">
            <img :src="image" class="w-full h-full object-cover" alt="">
            <span class="absolute bottom-2 right-2 bg-blue-600 text-white  py-0.5  bg-opacity-60 backdrop-blur px-1 rounded-full">{{category }}</span>
        </div>
        <div class="p-1 flex flex-col h-[calc(100%-192px)] justify-between">
            <p class="overflow-hidden font-semibold my-0.5  w-full">{{stripString(name) }}</p>
            <div class="flex items-center justify-between">
                <div class="text-3xl font-bold text-blue-600">${{price }}</div>
                <div class=" px-1 py-0.5 rounded-full">+{{quantity}} pcs</div>
                <div class="text-white text-[12px] rounded-full px-1 py-0.5 bg-green-600">In stock</div>
            </div>
            <router-link :to="'/shops/'+content.shop_id" class="flex px-1 items-center py-0.5 hover:text-blue-600 rounded  mt-1"><BuildingStorefrontIcon class="w-5 h-5 mr-1"/>{{content.shop_name }}</router-link>
            <span  class="flex px-1 items-center py-0.5 text-sm  rounded-full w-fit border border-gray-300 bg-gray-200  my-2"><GlobeEuropeAfricaIcon class="w-5 h-5 mr-1"/>{{location|| "--" }} | <b class="ml-1">{{formatDateToAgo(content.created_at) }}</b></span>
            <div class="flex mt-1 text-sm justify-between">
                <router-link :to="'/products/'+prettyString(content.prod_name)+'/'+content.prod_id" class=" rounded px-1 font-semibold h-fit  w-fit bg-white flex items-center text-blue-600 ">Details</router-link>
                <a :href="`tel:${contact}`" class=" w-7 text-white grid mr-1 place-items-center bg-red-600 rounded h-7 "><PhoneIcon class="w-5 h-5"/></a>
                <a target="blank" :href="`https://wa.me/${whatsapp?.slice(1)}/?text= Bonjour, je suis interesse(e) par votre produit, *${content.prod_name}.* \n https://muyisphere.com/products/${content.prod_id}`" class=" w-7 text-white grid place-items-center bg-green-600 rounded h-7 "><Whatsapp class="w-5 fill-white  h-5"/></a>
                <button @click="addToCart" class="h-7 rounded px-1 font-semibold  w-7 bg-blue-600 flex items-center hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300 text-white"><ShoppingCartIcon class="w-5 h-5"/></button>
            </div>
        </div>
    </div>
</template>