<template>
    <div class="w-full h-full grid place-items-center">
        <div class="w-[95%] h-[95%] grid  space-x-6 grid-cols-12">
            <div class="col-span-6  h-full p-3 rounded bg-white shadow">
                <div class="h-40 border relative rounded-full w-40 mx-auto">
                    <input accept="image/jpeg,image/png" hidden ref="input" type="file" name="file" @change="loadImage"/>
                    <img :src="picture != null ? picture : '/images/placeholder.jpg'" class="w-full rounded-full h-full object-contain" />
                    <span @click="handleClickRef" class="absolute bottom-3 right-3 cursor-pointer hover:bg-gray-700 bg-gray-800 flex justify-around items-center text-white rounded p-1"><PhotoIcon class="w-5 h-5"/> </span>
                </div>
                <div class="w-full mt-4 text-gray-700 h-40">
                    <div class="flex items-center mb-1 justify-between w-full">
                        <span>Nom</span>
                        <div class="w-56">
                            <TextBox :hideLabel="true" :onChange="handleInput" type="text" name="name" :value="name|| user.name"  :err="errors.name"/>
                        </div>
                    </div>
                    <div class="flex mb-1 items-center justify-between w-full">
                        <span>Email</span>
                        <div class="w-56">
                            <TextBox :hideLabel="true" :onChange="handleInput" type="email" name="email" :value="email || user.email"  :err="errors.email"/>
                        </div>
                    </div>
                    <div class="flex mb-1 items-center justify-between w-full">
                        <span>Téléphone</span>
                        <div class="w-56">
                            <TextBox :hideLabel="true" :onChange="handleInput" type="text" name="mobile" :value="mobile || user.mobile"  :err="errors.mobile"/>
                        </div>
                    </div>
                    <div class="flex mb-1 items-center justify-between w-full">
                        <span>Address</span>
                        <div class="w-56">
                            <TextBox :hideLabel="true" :onChange="handleInput" type="text" name="name" :value="address || user.address"  :err="errors.address"/>
                        </div>
                    </div>
                    <div class="flex mb-1 items-center justify-between w-full">
                        <span>Ville</span>
                        <div class="w-56">
                            <TextBox :hideLabel="true" :onChange="handleInput" list="locations" :items="transpiledLocations" type="text" name="name" :value="town"  :err="errors.town"/>
                        </div>
                    </div>
                    <div class="flex mb-3 justify-between w-full">
                        <span>Type</span>
                        <div class="w-[50%] flex items-center justify-around">
                            <BadgeEditUserTypeVue :onClick="()=> this.type = 'normal'" name="normal" :current="type"/>
                            <BadgeEditUserTypeVue :onClick="()=> this.type = 'manager'" name="manager" :current="type"/>
                            <BadgeEditUserTypeVue  :onClick="()=> this.type = 'owner'" name="owner" :current="type"/>
                        </div>
                    </div>
                    <div class="flex mb-3 justify-between w-full">
                        <span>Actif</span>
                       <div class="w-[50%] flex items-center justify-around">
                            <BadgeEditUserStatus :isActive="this.status" :onClick="() => this.status = !this.status"/>
                        </div>
                    </div>
                    <div class="flex mb-3 justify-between w-full">
                        <span>Dernière modification</span>
                        <span  class="flex items-center text-gray-700">{{moment(user.created_at).startOf('days').fromNow()}}</span>
                    </div>
                </div>
            </div>
            <div class="col-span-6 h-full rounded grid grid-cols-1">
                <div class="h-[275px] mb-6 flex  items-center justify-center bg-white shadow col-span-1 rounded">
                        <div v-if="!assignShowSuccess" class="flex h-fit justify-center items-center flex-col w-fit">
                            <BuildingStorefrontIcon class="h-16 w-16 text-gray-600"/>
                            <div v-if="showShopSearcher === false" class="w-9/12 mx-auto flex justify-center flex-col items-center">
                                <span class=" my-3 w-72 text-sm">Pour le moment cet utilisateur ne possède aucun shop. Associez-lui a un shop maintenant</span> 
                                <span @click="showShopSearcher = true" class="bg-gray-800 cursor-pointer px-1 py-1 w-fit text-white flex justify-around rounded">Associer à un shop <LinkIcon class=" ml-2 h-5 w-5"/> </span>
                            </div>
                            <div v-else class="w-10/12 mx-auto ">
                                <span class=" my-3 w-72 text-sm">Pour le moment cet utilisateur ne possède aucun shop. Associez-lui a un shop maintenant</span> 
                                <div class="relative max-h-96 mt-1 border rounded p-1 w-full">
                                    <input @input="handleSearchShop" :value="searchBoxValue" class="h-8 w-full outline-none" :placeholder="`Taper le nom du shop à associer à ${user.name}`" />
                                    <div data-aos-duration="300" v-if="showSearchBox" class=" w-full shadow z-50 absolute top-10 rounded p-2 h-60 bg-white border left-0 mt-1">
                                                <div class="w-full animate-pulse" v-if="loading">
                                                    <div class="w-full flex justify-between mt-3 h-8">
                                                        <span class="w-20 h-2 rounded bg-gray-300"></span>
                                                        <span class="w-5 h-2 rounded bg-gray-300"></span>
                                                    </div>
                                                    <div class="w-full flex justify-between h-8">
                                                        <span class="w-32 h-2 rounded bg-gray-300"></span>
                                                        <span class="w-5 h-2 rounded bg-gray-300"></span>
                                                    </div>
                                                    <div class="w-full flex justify-between h-8">
                                                        <span class="w-14 h-2 rounded bg-gray-300"></span>
                                                        <span class="w-5 h-2 rounded bg-gray-300"></span>
                                                    </div>
                                                    <div class="w-full flex justify-between h-8">
                                                        <span class="w-40 h-2 rounded bg-gray-300"></span>
                                                        <span class="w-5 h-2 rounded bg-gray-300"></span>
                                                    </div>
                                                    <div class="w-full flex justify-between h-8">
                                                        <span class="w-20 h-2 rounded bg-gray-300"></span>
                                                        <span class="w-5 h-2 rounded bg-gray-300"></span>
                                                    </div>
                                                </div>
                                                <div class="w-full" v-else-if="!loading && shops.length > 0">
                                                    <div @click="() => chooseShop(s)" class="w-full hover:bg-gray-100 cursor-pointer rounded p-1 flex justify-between" v-for="s of shops" :key="s.id">
                                                        <span>{{s.name}}</span>  <span>{{s.level}}</span>
                                                    </div>
                                                </div>
                                                <div class="w-full h-full grid text-gray-600 place-items-center" v-else>
                                                    <div class="w-fit flex flex-col items-center h-fit">
                                                        <FaceFrownIcon class="h-16 w-16 mb-2"/>
                                                    <small class="w-9/12 mx-auto text-center">Aucun resultat pour ce nom de shop. Verifier l'orthographe ou <router-link class="text-blue-600 font-semibold" to="/admin/shops/new">créer d'abord ce shop</router-link> .</small>
                                                    </div>
                                                </div>
                                    </div>
                                </div>
                                <span @click="assignUserToShop" v-if="searchBoxId" class="bg-gray-800 cursor-pointer px-1 mt-2  py-1 w-fit text-white flex justify-around rounded">Associer à {{searchBoxValue}} <LinkIcon class=" ml-2 h-5 w-5"/> </span>
                            </div>
                        </div>
                        <div v-else class=" flex w-11/12  items-center justify-between p-2 h-[80%] relative">
                            <div class="w-[70%] flex flex-col h-[90]">
                                <span class="text-green-600 mb-3 font-semibold text-xl">Utilisateur assigné</span>
                                <span>L'utilisateur <span class="font-semibold">{{ user.name}}</span> a été assigné au shop <span class="font-semibold">{{searchBoxValue}}</span> avec succès. Il peut maintenant gérer le shop en tant que Propriétaire (Owner).</span>
                            </div>
                            <CheckCircleIcon class="h-32 text-green-600 w-32"/>
                            <span @click="hideAssignSuccessBox" class="w-8 absolute right-0 top-0 h-8 rounded hover:bg-gray-300 cursor-pointer bg-gray-200 text-gray-700 grid place-items-center">
                                <XMarkIcon class="h-7 w-7"/>
                            </span>
                        </div>
                </div>
                <div class="h-[275px] mb-6 flex  items-center justify-center bg-white shadow col-span-1 rounded">
                        <div class="flex h-fit justify-center items-center flex-col w-fit">
                            <HomeModernIcon class="h-16 w-16 text-gray-600"/>
                            <span class="my-3 w-72 text-sm">Pour le moment cet utilisateur n'est associé à aucune branche. Associez-lui a une branche maintenant</span> 
                            <span class="bg-gray-800 cursor-pointer px-1 py-1 w-fit text-white flex justify-around rounded">Associer à une branche <LinkIcon class=" ml-2 h-5 w-5"/> </span>
                        </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { BuildingStorefrontIcon, CheckCircleIcon, FaceFrownIcon, HomeModernIcon, LinkIcon, NoSymbolIcon, PencilIcon, PhotoIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import user from '../../api/user';
import shop from "../../api/shop"
import { useLogout } from '../../helpers/logout';
import moment from  "moment"
import TextBox from '../../components/TextBox.vue';
import location from '../../api/location';
import useTranspiler from '../../helpers/use-transpiler';
import BadgeEditUserTypeVue from '../../components/BadgeEditUserType.vue';
import BadgeEditUserStatus from '../../components/BadgeEditUserStatus.vue';

export default {
    data() {
        return {
            user: {},
            errors: {},
            name: "",
            locations: [],
            address: "",
            email: "",
            mobile: "",
            type:'',
            town: '',
            status:"",
            picture:null,
            pictureFile:null,
            transpiledLocations: [],
            locationId: "",
            showShopSearcher: false,
            showSearchBox: false,
            loading:false,
            shops:[],
            searchBoxId: 0,
            searchBoxValue: "",
            assignShowSuccess : false
        };
    },
    mounted() {
        this.getUser().then(()=>this.getLocation());
        
        //this.getUserShopAndBranches()
    },
    methods: {
        async getUser() {
            const result = await user.getUser(this.$route.params.id);
            if (result.type === "success") {
                this.user = result.data;
                this.type = result.data.type
                this.status = result.data.status
            }
            useLogout(result).then(value => {
                value === "success" && this.$router.push("/admin/login");
            });
        },
        async getUserShopAndBranches() {
            const result = await user.getShopAndBranches(this.$route.params.id)
            console.log(result)
        },
        moment() {
            return moment()
        },
        handleInput(e) {
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
        async getLocation() {
            const result = await location.getAll()
            useLogout(result).then((w) => w === "success" ? this.$router.push("/admin/login") : null)
            if (result.type === 'success') {
                this.locations = result.data
                const data = this.locations.filter(a => a.id == this.user.location_id)
                if (data[0]) {
                    this.town = data[0].name
                } else {
                    this.errors.town = "Ville choisie invalide !"
                }
            }
            this.transpiledLocations = useTranspiler(result, { key: 'id'.id, value: 'name' })
        },
        async handleSearchShop(e) {
            const value = e.target.value
            this.searchBoxValue = value
            this.searchBoxId = ""
            if (value && value.length >= 2) {
                this.showSearchBox = true
                this.loading = true
                const result = await shop.search(value)
                if (result.type === 'success') {
                    if(Array.isArray(result.data))
                    this.shops = result.data
                    else this.shops = [result.data]
                }
                this.loading = false
            } else {
                this.showSearchBox = false
            }
        },
        chooseShop(shop) {
            this.searchBoxId = shop.id
            this.searchBoxValue = shop.name
            this.showSearchBox = false
        },
        async assignUserToShop() {
            const data = {
                user: this.$route.params.id,
                shop: this.searchBoxId
            }
            const result = await user.assignOwnerToShop(data)
            if(result && result.type === 'success')
              this.assignShowSuccess = true
        },
        hideAssignSuccessBox() {
            this.searchBoxId = ""
            this.searchBoxValue = ""
            this.shops = []
            this.assignShowSuccess = false
        },
        handleClickRef(){
            this.$refs.input.click()
        },
        loadImage(e){
            const img = URL.createObjectURL(e.target.files[0])
            this.picture = img
            this.pictureFile  = e.target.files[0]
        }
    },
    components: { CheckCircleIcon, NoSymbolIcon, PencilIcon, PhotoIcon, TextBox, BadgeEditUserTypeVue, LinkIcon, BuildingStorefrontIcon, HomeModernIcon, BadgeEditUserStatus, FaceFrownIcon, XMarkIcon }
}
</script>