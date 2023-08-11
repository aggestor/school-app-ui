<template>
    <div class="w-[98%] grid grid-cols-12  mx-auto mt-[1%] h-[97%]">
        <div class="col-span-12 md:col-span-6 h-full p-2">
            <div class="h-full w-full flex justify-between space-y-3 flex-col">
                <div class="w-full h-1/3 flex flex-col items-center p-4 __shadow">
                    <div class="flex font-semibold flex-col text-blue-600 text-xl h-full w-full">
                        Gérance.
                        <small class="text-gray-600 text-xs">Toutes les données de gérants de vos branches. <router-link to="/owner/managers"><span class="text-blue-600">Voir la liste</span></router-link></small>
                    </div>
                    
                    <div class="w-full flex justify-between">
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Total</span>
                            <span class="font-semibold text-indigo-600">{{d?.managers?.total}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Actifs</span>
                            <span class="font-semibold text-green-500">{{d?.managers?.active}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Inactifs</span>
                            <span class="font-semibold text-yellow-600">{{d?.managers?.un_active}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Supprimés</span>
                            <span class="font-semibold text-red-500">--</span>
                        </div>
                    </div>
                </div>
                <div class="w-full h-1/3 flex flex-col items-center p-4 __shadow">
                    <div class="flex font-semibold flex-col text-blue-600 text-xl h-full w-full">
                        Branche. (siccursale)
                        <small class="text-gray-600 text-xs">Toutes les données statistiques sur vos branches. <router-link to="/owner/branches"><span class="text-blue-600">Voir vos branches</span></router-link></small>
                    </div>
                    <div class="w-full flex justify-between">
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Total</span>
                            <span class="font-semibold text-indigo-600">{{d.branches?.total}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Actives</span>
                            <span class="font-semibold text-green-500">{{d.branches?.active}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Inactives</span>
                            <span class="font-semibold text-yellow-600">{{d.branches?.un_active}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Supprimées</span>
                            <span class="font-semibold text-red-500">--</span>
                        </div>
                    </div>
                </div>
                <div class="w-full h-1/3 flex flex-col items-center p-4 __shadow">
                    <div class="flex font-semibold flex-col text-blue-600 text-xl h-full w-full">
                        Carousels
                        <small class="text-gray-600 text-xs">Toutes les données statistiques sur vos carrousels. <router-link to="/owner/carrousels"><span class="text-blue-600">Voir vos branches</span></router-link></small>
                    </div>
                    <div class="w-full flex justify-between">
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Total</span>
                            <span class="font-semibold text-indigo-600">{{d.carousel?.total}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Actives</span>
                            <span class="font-semibold text-green-500">{{d.carousel?.active}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Inactives</span>
                            <span class="font-semibold text-yellow-600">{{d.carousel?.un_active}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Supprimées</span>
                            <span class="font-semibold text-red-500">--</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-span-12 md:col-span-6 h-full p-2">
            <div class="h-full flex flex-col justify-between space-y-3 w-full">
                 <div class="w-full h-32 flex flex-col p-2 __shadow">
                    <div class="flex font-semibold flex-col text-blue-600 text-xl h-full w-full">
                        Catégorisation.
                        <small class="text-gray-600 text-xs">Les catégories auquelles vous êtes liées. <router-link to="/owner/categories"><span class="text-blue-600">Voir la liste</span></router-link></small>
                    </div>
                    <div class="w-full flex flex-wrap">
                        <span class="w-auto mr-1 border-r pr-0.5">{{categorization }}</span>
                    </div>
                 </div>
                 <div class="w-full h-40 flex flex-col p-2 __shadow">
                    <div class="flex font-semibold flex-col text-blue-600 text-xl h-full w-full">
                        Commandes.
                        <small class="text-gray-600 text-xs">Toutes vos commandes . <router-link to="/owner/orders"><span class="text-blue-600">Voir la liste</span></router-link></small>
                    </div>
                   <div class="w-full flex justify-between">
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Total</span>
                            <span class="font-semibold text-indigo-600">--</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Effectuées</span>
                            <span class="font-semibold text-green-500">--</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">En cours</span>
                            <span class="font-semibold text-yellow-600">--</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Annulées</span>
                            <span class="font-semibold text-red-500">--</span>
                        </div>
                    </div>
                 </div>
                <div class="w-full h-1/2 p-2 __shadow">
                    <div class="w-full h-28 flex flex-col">
                    <div class="flex font-semibold flex-col text-blue-600 text-xl h-full w-full">
                        Produits.
                        <small class="text-gray-600 text-xs">Les statistiques de tous vos produits. <router-link to="/owner/products"><span class="text-blue-600">Voir la liste</span></router-link></small>
                    </div>
                    <div class="w-full flex justify-between">
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Total</span>
                            <span class="font-semibold text-indigo-600">{{d.products?.total}}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Actifs</span>
                            <span class="font-semibold text-green-500">{{d.products?.active }}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Inactifs</span>
                            <span class="font-semibold text-yellow-600">{{d.products?.un_active }}</span>
                        </div>
                        <div class="w-1/4 flex flex-col">
                            <span class="font-semibold text-gray-600">Supprimés</span>
                            <span class="font-semibold text-red-500">--</span>
                        </div>
                    </div>
                 </div>
                 <div class="mt-2">
                    <div class="flex font-semibold flex-col text-gray-700 mb-3 border-t h-full w-full">
                        5 derniers produits
                    </div>
                    <div v-for="p of prod" class="w-full flex justify-between my-1.5 text-sm">
                        <span class="w-8/12">{{p.prod_name }}</span>
                        <span class="w-2/12">{{p.price.split('_')[1]}}$</span>
                        <span class="w-2/12">{{p.quantity.split('_')[1]}} pcs</span>
                    </div>
                 </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import Shop from "../../api/shop"
import Telemetry from "../../api/telemetry";
import Product from "../../api/product"
import useVerify from "../../hooks/useVerify"
        useVerify('owner')
        const shop = ref({})
        const d = ref({})
        const categorization =ref("")
        const prod = ref([])
        const getShopDetails = async () => {
            const user = JSON.parse(localStorage.getItem("logged_in_user"))
            const result = await Shop.getUsingOwner(user.data.id)
            if (result.type === "success") {
                shop.value = result.data
                const c = !Array.isArray(result.data.categories) ? [result.data.categories] : result.data.categories;
                categorization.value = c.map(a => a.name)?.join()
            }
        }
        const getStatistics = async (id) =>{
           const stats = await Telemetry.ownerStats(id)
           const products = await Product.getByShopLimited(id+'-5')
           if(stats.type === "success"){
             d.value = stats.data
           }
           if(products.type === "success"){
             prod.value = products.data
           }
        }
        onMounted(() => {
            getShopDetails().then(()=>getStatistics(shop.value.shop.shop_id))
        })
    
</script>