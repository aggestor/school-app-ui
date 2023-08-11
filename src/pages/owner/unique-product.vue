<template>
    <ReusableHeader keywords="owner" description="profile" :title="prod.prod_name"/>
    <div class="w-[95%] h-auto bg-white my-5 rounded p-3  mx-auto">
        <div class="w-full flex justify-between items-center pb-2 border-b h-14">
            <h1 class="text-lg text-gray-700 flex "> <GoBackAdminButton/> <span class="ml-2">Information sur <span class="font-semibold">{{prod.prod_name }}</span></span></h1>
            <span class="flex relative w-fit items-center">
                <router-link :to="'/admin/products/'+prod.prod_id+'/update'">
                    <span class="bg-gray-200 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-gray-600"><PencilIcon class="w-6 h-6"/></span>
                </router-link>
                <span @click="changeStatus" class="w-8 h-8 bg-gray-200 rounded border grid place-items-center mr-1 text-gray-600 cursor-pointer"><LockClosedIcon v-if="prod.status == 0" class="w-6 h-6"/><LockOpenIcon v-else class="w-6 h-6"/></span>
                <span @click="deleteProduct" class="w-8 h-8 bg-gray-200 rounded border grid place-items-center mr-1 text-gray-600 cursor-pointer"><TrashIcon class="w-6 h-6"/></span>
                <span @click="showBranches = !showBranches" class="w-8 h-8 bg-gray-200 rounded border grid place-items-center text-gray-600 cursor-pointer"><ShareIcon class="w-6 h-6"/></span>
                <div v-if="showBranches == true" class="w-44 text-sm h-72 p-1 bg-white rounded shadow absolute top-10 right-0">
                    <div class=" text-gray-500 my-2">Transferer vers : </div>
                    <div @click="()=> shareProduct(b)" class=" hover:bg-gray-200 cursor-pointer rounded p-1" v-for="b of branches" :key="b.id">{{branches.indexOf(b)+1+'.'+b.name }}</div>
                </div>
            </span>
        </div>
        <div class="w-full flex pt-20">
            <div class="w-[50%] h-full ">
                <div class="w-[80%] h-72 rounded overflow-hidden border">
                        <img :src="store+'/products/'+currentFile" class="h-full w-full object-cover" alt="">
                </div>
                <div class="h-[16%] flex space-x-2 mt-2 w-full">
                    <div v-for="f of files" class="h-16 w-16 rounded cursor-pointer border" :key="f" @click="()=> onClickFile(f)">
                        <img  :src="store+'/products/'+f" class="w-full transition-all duration-500 h-full object-cover" />
                    </div>
                </div>
            </div>
            <div class="w-[50%] h-full flex justify-between">
                <div class="w-full p-2  h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Nom du produit</span><span>{{prod.prod_name }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Cat.</span><span>{{prod.category }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Ext.</span><span>{{prod.extension }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Mod.</span><span>{{ prod.model }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Marq.</span><span>{{prod.mark }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Type.</span><span>{{prod.type }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Serie.</span><span>{{prod.set_ }}</span></div>
                </div>
            </div>
        </div>
        <div class="w-full flex pt-5 border-t mt-3">
            <div class="w-[50%] h-full flex justify-between">
                <div class="w-full p-2 border-r h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Shop</span><span>{{prod.shop }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Branche.</span><span>{{prod.branch_name ||"Pas de branche" }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Ville.</span><span>{{location }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Address.</span><span>{{ prod.full_address }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">WhatsApp.</span><span>{{prod.mark ||"Non donnee" }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Phone.</span><span>{{prod.phone_shop ||"Non donnee" }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Email.</span><span>{{prod.email_shop ||"Non donnee" }}</span></div>
                </div>
            </div>
            <div class="w-[50%] h-full flex justify-between">
                <div class="w-full p-2 border-r h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Prix</span><span>{{prices}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Quantite</span><span>{{quantities }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Disponibilite.</span>
                        <span v-if="prod.availability === 'green'" class="text-green-500">In stock</span>
                        <span v-else-if="prod.availability === 'yellow'" class="text-yellow-500">Small Qty</span>
                        <span v-else="prod.availability === 'red'" class="text-red-500">No Stock</span>
                    </div>
                    <div class="flex justify-between "><span class="font-semibold">Status.</span><CheckCircleIcon v-if="prod.status == 1" class="w-6 h-6 text-blue-600"/><NoSymbolIcon v-else class="w-6 h-6 text-red-600"/></div>
                    <div class="flex justify-between "><span class="font-semibold">Forme.</span><span class="text-blue-600">{{prod.is_brand_new == 1 ? "New" : "Old" }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Date de creation.</span><span>{{ moment(prod.created_at).format("ll")}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Modif.</span><span>{{ moment(prod.created_at).fromNow()}}</span></div>
                </div>
            </div>
        </div>
        <div class="w-full flex mt-10 border-t">
                <div class="w-[62.5%] py-2">
                    <span class="text-gray-800 text-lg  font-semibold">Information sur celui qui a mis le produit en ligne</span>
                    <div class="w-full p-3 border-r h-48 flex flex-col justify-between">
                        <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{ uploader.name }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{ uploader.email }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{ uploader.phone || "No number" }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Type</span><span>{{prod.uploader_type }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Status.</span><CheckCircleIcon v-if="uploader.status == 1" class="w-6 h-6 text-blue-600"/><NoSymbolIcon v-else class="w-6 h-6 text-red-600"/></div>
                    </div>
                </div>
                <div class="w-[37.5%] py-2">
                    <div class="w-full p-3  h-48 grid place-items-center">
                       <div class="w-9/12 flex flex-col h-fit items-center text-center"> 
                        <span class=" text-sm">Ce produit est ajouter avec le consentement du proprietaire qui, accepte notre politique de vente et nos regles de confidentialites. Ajouer des produits enfin de toucher plus de clients.</span>
                         <router-link :to="'/owner/shop/'+prod.shop_id+'/products/create'">
                            <span class="bg-blue-600 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white"> Ajouter un produit <PlusCircleIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import { CheckCircleIcon, LinkIcon, NoSymbolIcon, PencilIcon,PlusCircleIcon } from '@heroicons/vue/24/outline';
import { defineComponent } from 'vue';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import ReusableHeader from '../../components/ReusableHeader.vue';
import {ref, onMounted} from "vue"
import Product from "../../api/product"
import Location from "../../api/location"
import Admin from "../../api/admin"
import User from "../../api/user"
import useVerify from '../../hooks/useVerify';
import { useRoute } from 'vue-router';
import {Carousel, Slide} from "vue3-carousel"
import {store} from "../../api"
import moment from 'moment';
import Branch from "../../api/branch"
import { Bars3BottomLeftIcon, LockClosedIcon, LockOpenIcon, ShareIcon, TrashIcon } from '@heroicons/vue/24/solid';
export default defineComponent({
    setup() {
        const route = useRoute()
        useVerify('owner')
        const prod = ref({})
        const files = ref([])
        const currentFile = ref("")
        const location = ref("")
        const prices = ref("")
        const quantities = ref("")
        const uploader = ref({})
        const branches = ref([])
        const showBranches = ref(false)
        const getProductDetails = async (id) =>{
            const result = await Product.getData(id)
            if(result.type === "success"){
                prod.value = result.data
                files.value = result.data.files.split(",")
                currentFile.value = result.data.files.split(",")[0]
                if(result.data.price.length > 2){
                    prices.value = result.data.price.split("_")[1] + " $"
                    quantities.value = result.data.quantity.split("_")[1] + " pcs"
                }
            }
        }
        const getBranches = async (id) =>{
            const result = await Branch.getForShop(id)
            if(result.type === "success"){
                branches.value = !Array.isArray(result.data) ? [result.data] : result.data
            }
        }
        const getLocations = async () =>{
            const result = await Location.getAll()
            if(result.type === "success"){
                const t = result.data.filter((a) => a.id == prod.value.location)
                location.value = t[0] ? t[0].name : "Non trouver"
            }
        }
        const getUploaderData = async () =>{
            const result = prod.value.uploader_type.toLowerCase() == 'admin' ? await Admin.getAdmin(prod.value.uploader_id) : await User.get(prod.value.uploader_id)
            if(result.type === "success"){
                uploader.value = result.data
            }
        }
        const onClickFile = (file) =>{
            currentFile.value = file
        }
        const changeStatus = async() =>{
            const status = prod.value.status == 1 ? 0 : 1
            const result = await Product.changeStatus(status ,prod.value.prod_id)
            if(result.type === "success"){
                prod.value.status = status
            }
        }
        const shareProduct = async (b) =>{
            const result = await Product.exportTo(b.id, prod.value.prod_id)
            if(result.type === 'success'){
                showBranches.value = false
                prod.value.branch = b.name
            }
        }
        const deleteProduct = async () =>{

        }
        onMounted(()=>{
            getProductDetails(route.params.id).then(getLocations).then(getUploaderData).then(()=>getBranches(prod.value.shop_id))
        })
        return {prod, files, store,currentFile,branches,showBranches, onClickFile,changeStatus,deleteProduct, shareProduct, location, prices, quantities, moment, uploader}
    },
    components: { ReusableHeader, PencilIcon, PlusCircleIcon, GoBackAdminButton, CheckCircleIcon, NoSymbolIcon, LinkIcon, Slide, Carousel, Bars3BottomLeftIcon, TrashIcon, LockClosedIcon, ShareIcon, LockOpenIcon }
})
</script>