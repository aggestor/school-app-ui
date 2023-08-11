<template>
    <section class="w-full h-full flex justify-center items-center">
        <div class="h-[95%] md:space-x-4 space-y-4 md:space-y-0 w-[97%] grid md:grid-cols-2 grid-cols-1">
            <div class="col-span-1 h-full space-y-4 grid grid-cols-1">
                <div v-if="loading" class="h-[350px]  p-3 col-span-1 bg-white ">
                    <div  class="flex items-center justify-between">
                        <div class=" animate-pulse flex items-center">
                            <span class="w-8 h-8 bg-gray-200 rounded"></span><span class="ml-3 font-semibold w-80 h-6 bg-gray-200 rounded"></span> 
                        </div>
                        <router-link :to="'/admin/shops/update/'+shop.id"><span class="rounded flex items-center w-16 h-8 bg-gray-100 p-1"></span></router-link>
                    </div>
                    <div class="w-full pt-2 h-full flex justify-between">
                        <div class="w-1/3">
                        <div class="w-32 h-32 bg-gray-200 animate-pulse overflow-hidden rounded">
                        </div>
                    </div>
                    <div class="w-2/3 flex animate-pulse flex-col">
                       <span class="flex mb-2 justify-between w-full items-center"><span class=" h-5 bg-gray-200 rounded w-[50px]"></span><span class="w-[120px] h-5 bg-gray-200 rounded"></span> </span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class=" h-5 bg-gray-200 rounded w-[80px]"></span> <span class="w-[120px] h-5 bg-gray-200 rounded"></span></span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class=" h-5 bg-gray-200 rounded w-[30px]"></span><span class="w-[70px] h-5 bg-gray-200 rounded"></span> </span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class=" h-5 bg-gray-200 rounded w-[60px]"></span><span class="w-[170px] h-5 bg-gray-200 rounded"></span></span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class=" h-5 bg-gray-200 rounded w-[49px]"></span><span class="w-[70px] h-5 bg-gray-200 rounded"></span></span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class=" h-5 bg-gray-200 rounded w-[80px]"></span><span class="w-[200px] h-5 bg-gray-200 rounded"></span></span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class=" h-5 bg-gray-200 rounded w-[45px]"></span><span class="w-[20px] h-5 bg-gray-200 rounded"></span></span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class=" h-5 bg-gray-200 rounded w-[50px]"></span> <span class="w-[70px] h-5 bg-gray-200 rounded"></span></span>
                    </div>
                </div>
                </div>

                <div v-else class="md:h-[350px] h-auto p-3 col-span-1 bg-white ">
                    <div class="flex items-center justify-between">
                        <div  class=" flex items-center">
                            <BuildingStorefrontIcon class="w-8 h-8 text-gray-600"/><span class="ml-3 text-xl font-semibold text-gray-800">{{shop.name}}</span> 
                        </div>
                        <div class="flex space-x-1 items-center">
                            <span @click="changeStatus(0)" v-if="shop.status == 1" class="rounded flex items-center cursor-pointer text-white hover:bg-red-700  bg-red-600 p-1"><span class="hidden md:flex">Bloquer</span><LockClosedIcon class="md:ml-1 md:h-4 md:w-4 w-5 h-5"/> </span>
                            <span @click="changeStatus(1)" v-else class="rounded flex items-center text-white hover:bg-green-700 cursor-pointer  bg-green-600 p-1"><span class="hidden md:flex">Debloquer</span> <LockOpenIcon class="md:ml-1 md:h-4 md:w-4 w-5 h-5"/></span>
                            <router-link :to="'/admin/shops/'+shop.id+'/update'"><span class="rounded flex items-center bg-gray-800 p-1 text-white"><span class="hidden md:flex">Modifier</span> <PencilIcon class="md:ml-1 md:h-4 md:w-4 w-5 h-5"/></span></router-link>
                        </div>
                    </div>
                    <div class="w-full pt-2 h-auto flex md:flex-row flex-col justify-between">
                        <div class="md:w-1/3 mb-2 md:mb-0 w-full">
                        <div class="md:w-32 md:h-32 w-full h-60 overflow-hidden rounded">
                            <img :src="store+'/shops/'+shop.logo" class="w-full h-full object-cover" :alt="shop.name+'\' logo'">
                        </div>
                    </div>
                    <div class="md:w-2/3 w-full flex flex-col">
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Phone</span><a :href="'tel:'+shop.contact"><span class="hover:text-blue-600">{{shop.contact}}</span></a> </span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">WhatsApp</span> {{shop.contact}}</span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Ville</span> {{shop.location_name}}</span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Location</span> {{shop.full_address || "Non définie"}}</span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Niveau</span> {{shop.level}}</span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Categories</span> <span class="text-end w-2/3 overflow-hidden text-ellipsis">{{shop.categories.replace(/\$/gi,", ")}}</span></span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Status</span><span class="px-1 text-sm rounded-full text-white bg-green-600" v-if="shop.status == 1">Activée</span> <span class="px-1 text-sm rounded-full text-white bg-red-600" v-else>Desactivée</span></span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Verifiée ?</span><span class="px-1 text-sm rounded-full text-white bg-green-600" v-if="shop.verified == 1">Oui</span> <span class="px-1 text-sm rounded-full text-white bg-red-600" v-else>Non</span></span>
                       <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Modif.</span> {{formatDateToAgo(shop.last_update)}}</span>
                    </div>
                </div>
            </div>
            <div class="h-[250px] flex items-center justify-center col-span-1 bg-white ">
                <div v-if="branchesLoading === true">
                    Loading..
                </div>
                <div class="h-full p-2 w-full" v-else-if="Array.isArray(branches) && branches.length > 0">
                    <div class="flex h-fit  pb-1 w-full items-center justify-between">
                        <div class="flex  items-center">
                            <span class="text-xl font-semibold text-gray-800">Liste de vos branches</span> 
                        </div>
                        <div class="flex">
                            <router-link :to="'/admin/shops/'+shop.id+'/branches'"><span class="rounded flex mr-1 items-center bg-gray-800 p-1 text-white"><ListBulletIcon class="h-5 w-5"/></span></router-link>
                            <router-link :to="'/admin/shops/'+shop.id+'/branches/new'"><span class="rounded flex items-center bg-gray-800 p-1 text-white"><PlusCircleIcon class="h-5 w-5"/></span></router-link>
                        </div>
                    </div>
                    <div class=" h-[85%] text-sm w-full">
                        <div  :class=" `p-2 w-full mb-1 border-b flex text-gray-600`">
                            <span class="w-fit px-1">#</span>
                            <span class="md:w-3/12 w-5/12 font-semibold flex text-center px-1">Nom</span>
                            <span class="w-3/12  hidden md:flex  text-center px-1">WhatsApp</span>
                            <span class="w-2/12  flex  text-center px-1">Ville</span>
                            <span class="w-4/12 md:w-3/12  flex  text-center px-1">Modif.</span>
                            <span class="w-1/12  flex  text-center px-1">--</span>
                        </div>
                        <div v-for="br of branches" :key="br.id" :class=" `${branches.indexOf(br) % 2 === 0 ? '':'bg-gray-200'} p-2 w-full  flex hover:bg-blue-100 text-gray-600`">
                            <span class="w-fit px-1">{{ branches.indexOf(br)+1 }}</span>
                            <span class="md:w-3/12 w-5/12 font-semibold px-1">{{ br.name }}</span>
                            <span class="md:w-3/12 w-4/12 hidden md:flex  text-center px-1">{{ br.contact_whatsapp }}</span>
                            <span class="w-2/12  flex  text-center px-1">{{ br.location }}</span>
                            <span class="md:w-3/12 w-4/12  flex  text-center px-1">{{ formatDateToAgo(br.last_update) }}</span>
                            <span class="w-1/12  flex  text-center px-1"><router-link :to="'/admin/shops/'+shop.id+'/branches/'+br.id"><span class="w-6 h-6 text-white grid place-items-center rounded bg-blue-600"><LinkIcon class="w-4 h-4"/> </span></router-link></span>
                        </div>
                    </div>
                </div>
                <div v-else class="flex h-fit justify-center items-center flex-col w-fit">
                    <HomeModernIcon class="h-16 w-16 text-gray-600"/>
                    <span class="my-3 w-72 text-sm">Ce shop n'a aucune branche pour le moment !</span> 
                    <router-link  :to="'/admin/shops/'+shop.id+'/branches/new'"><span class="bg-gray-800  cursor-pointer px-1 py-1 w-fit text-white flex items-center justify-around rounded">Créer une branche <PlusCircleIcon class=" ml-2 h-5 w-5"/> </span></router-link>
                </div>
            </div>
        </div>
        <div class="col-span-1 p-2 h-full bg-white">
            <div v-if="user.last_update" class="w-full flex items-center justify-between h-40 border-b">
                <div class="w-32 h-32 rounded">
                    <img class="w-full h-full object-cover" :src="user.picture !== 'placeholder.jpg' ? store+'/users/'+user.picture : '/images/placeholder.jpg'" alt="user's image"/>
                </div>
                <div class="w-[72%] ml-2 h-32">
                    <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Propriétaire</span> {{user.name}}</span>
                    <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Email</span> {{user.email}}</span>
                    <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Téléphone</span> {{user.mobile}}</span>
                    <span class="flex mb-2 justify-between w-full items-center"><span class="text-gray-800 font-semibold">Actif(ve)</span> <span :class="`font-semibold rounded-full px-1 py-0.5 text-white ${user.is_active == '1' ? 'bg-green-600' : 'bg-red-600'}`">{{user.is_active == '1' ? "Oui" : "Non"}}</span></span>
                </div>
            </div>
            <div class="w-full">
                <div class="flex h-fit  py-3 w-full items-center justify-between">
                        <div class="flex  items-center">
                            <span class="text-xl font-semibold text-gray-800">12 derniers produits</span> 
                        </div>
                        <div class="flex">
                            <router-link :to="'/admin/shops/'+shop.id+'/products'"><span class="rounded flex mr-1 items-center bg-gray-800 p-1 text-white"><ListBulletIcon class="h-5 w-5"/></span></router-link>
                            <router-link :to="'/admin/shops/'+shop.id+'/products/new'"><span class="rounded flex items-center bg-gray-800 p-1 text-white"><PlusCircleIcon class="h-5 w-5"/></span></router-link>
                        </div>
                    </div>
                <div class="h-[400px] flex flex-col justify-center w-full">
                    <div v-if="!productLoading && products.length == 0" class="w-8/12 h-fit mx-auto  text-gray-600 flex flex-col justify-center items-center">
                        <FaceFrownIcon class="h-28  w-28"/>
                        <p class="text-sm text-center">Nous n'avons trouvé aucun produit pour {{ shop.name }}.</p>
                        <router-link :to="'/admin/shops/'+shop.id+'/products/create'"><span class="bg-gray-800 cursor-pointer mt-2 px-1 py-1 w-fit text-white flex items-center justify-around rounded">Ajouter des produits <PlusCircleIcon class=" ml-2 h-5 w-5"/> </span></router-link>
                    </div>
                    <div v-else-if="productLoading" class=" w-full h-full flex justify-center items-center">
                        Loading...
                    </div>
                    <div v-else  class="w-full text-sm h-full">
                        <div class="w-full mb-3 border-b pb-1 space-x-1 flex">
                            <span class="w-1/12">#</span>
                            <span class="w-7/12">Nom</span>
                            <span class="w-2/12">Prix</span>
                            <span class="w-2/12 text-center">--</span>
                        </div>
                        <div v-for="p of products" :key="p.prod_name">
                            <div :class="`w-full hover:bg-blue-100 py-2 space-x-1 flex ${products.indexOf(p) % 2 === 0 ? '':'bg-gray-200'}`">
                                <span class="w-1/12 p-1">{{ products.indexOf(p)+1 }}</span>
                                <span class="w-7/12 font-semibold">{{ p.prod_name }}</span>
                                <span class="w-2/12 font-semibold text-blue-600">{{ p?.price?.split("_")[1] ||p?.price_1?.split("_")[1]}}$</span>
                                <span class="w-2/12 flex items-center justify-center">
                                    <router-link :to="'/admin/products/'+p.prod_id+'/update'"><span class="w-6 h-6 bg-blue-600 mr-1 rounded text-white grid place-items-center"><PencilIcon class="w-4 h-4"/></span></router-link>
                    <router-link :to="'/admin/products/'+p.prod_id"><span class="w-6 h-6 bg-gray-700 rounded text-white grid place-items-center"><EyeIcon class="w-4 h-4"/></span></router-link>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
         </div>
     </div>
    </section>
</template>
<script setup> 
import { BuildingStorefrontIcon, FaceFrownIcon, LinkIcon, PlusCircleIcon,CheckCircleIcon,NoSymbolIcon } from '@heroicons/vue/24/outline';
import {  HomeModernIcon, ListBulletIcon, PencilIcon,LockClosedIcon,LockOpenIcon, EyeIcon } from '@heroicons/vue/24/solid';
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Shop from '../../api/shop';
import Product from '../../api/product';
import Branch from '../../api/branch';
import User from '../../api/user';
import {store} from "../../api/index"
import useVerify from "../../hooks/useVerify"
import { formatDateToAgo } from '../../helpers/format-date';
useVerify()
        const shop = ref({});
        const user = ref({});
        const branches = ref([])
        const products = ref([])
        const loading = ref(true)
        const branchesLoading = ref(true)
        const productLoading = ref(true)
        const shopOwner = async () => {
            const router = useRoute()
            if (router) {
                const result = router.params.user == 0 ? await Promise.all([Shop.get(router.params.id)]) : await Promise.all([Shop.get(router.params.id),User.getUser(router.params.user)])
                if(Array.isArray(result))
                return result
            }  
        }
        const changeStatus =async status =>{
            const result = await Shop.changeStatus({status,id:shop.value.id})
            if(result.type === "success"){
                shop.value.status = status
            }
        }
        const getLastProducts  = async(shop) =>{
            productLoading.value = true
            const result = await Product.getByShopLimited(`${shop}-12`);
            if(result.type === "success" && result.data !== false){
                products.value = result.data
            }
            productLoading.value = false
        }
        onMounted(async () => {
            const route = useRoute()
            const [s,u] = await shopOwner();
            u && u.type === "success" && (user.value = u.data);
            if (s && s.type === 'success') {
                (shop.value = s.data);
                loading.value = false;
            }
            const br = await Branch.getForShop(route.params.id)
            if (br.type === "success") {
                if (Array.isArray(br.data))
                    branches.value = br.data
                else if (br.data === false)
                    branches.value = undefined
                else
                    branches.value.push(br.data)
            }
            branchesLoading.value = false;

            getLastProducts(route.params.id)
        });
</script>