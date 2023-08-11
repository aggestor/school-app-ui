<template>
    <div class="w-full md:h-[90%] flex justify-center items-center">
        <div v-if="!promptSuccessBox"  class="lg:w-6/12 md:w-8/12 border w-11/12 md:mb-5 mb-3 mt-10  bg-white __shad  shadow-gray-200 flex h-auto rounded p-8  justify-center flex-col" >
            <PagesNavigationHeader title="Assigner un proprietaire a un shop"/>
            <div class="flex w-full my-2 justify-between items-center">
                <span class="font-semibold">Nom du shop</span>
                <span>{{prettyString( this.$route.params.shop_name,true)}}</span>
            </div>
            <p class="text-gray-600 mb-3 text-sm">Choisissez le prprietaire a assossier a ce shop</p>
            <form class="h-full w-full flex flex-col">
                <div class="relative max-h-96 mt-1 border rounded p-1 w-full">
                                    <input @input="handleSearchBox" :value="searchBoxValue" class="h-8 w-full outline-none" :placeholder="`Taper le nom de l'utilisateur à ${prettyString( this.$route.params.shop_name,true)}`" />
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
                                                <div class="w-full" v-else-if="!loading && users.length > 0">
                                                    <div @click="() => chooseUser(s)" class="w-full hover:bg-gray-100 cursor-pointer rounded p-1 flex justify-between" v-for="s of users" :key="s.id">
                                                        <span>{{s.name}}</span>  <span>{{s.level}}</span>
                                                    </div>
                                                </div>
                                                <div class="w-full h-full grid text-gray-600 place-items-center" v-else>
                                                    <div class="w-fit flex flex-col items-center h-fit">
                                                        <FaceFrownIcon class="h-16 w-16 mb-2"/>
                                                    <small class="w-9/12 mx-auto text-center">Aucun resultat pour ce nom d'utilisateur. Verifier l'orthographe ou <router-link class="text-blue-600 font-semibold" to="/register">créer d'abord cet utilisateur</router-link> .</small>
                                                    </div>
                                                </div>
                                    </div>
                                </div>
            </form>
            <div class="w-full flex mt-3 justify-between">
                <Button :text="'Enregistrer [ '+ user?.name+ ' ] comme gerant' " variant="bg" design="primary" :onClick="onPressAssign"/>
            </div>
        </div>
        <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
            <SuccessComponent path="/admin/categories" title="Enregitrement effectué !" message="La catégorie a été enregistrée avec succès. Elle est maintenant utilisable partout. Vous pouvez la modifier mais pas la supprimer définitivément."/>
        </div>
    </div>
</template>
<script>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import User from "../../api/user"
import {CheckCircleIcon, FaceFrownIcon, UsersIcon} from "@heroicons/vue/24/solid"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import SuccessComponent from "../../components/SuccessComponent.vue"
import prettyString from "../../helpers/pretty-string"
import useVerify from "../../hooks/useVerify"
export default {
    components: {
    ButtonLink,
    Button,
    TextBox,
    CheckCircleIcon,
    PagesNavigationHeader,
    SuccessComponent,
    FaceFrownIcon
},
    mounted() {
    
    },
    setup(){
        useVerify()
        return {prettyString}
    },
    data(){
        return {
            errors: {},
            name: "",
            promptSuccessBox: false,
            loading: false,
            searchBoxValue:"",
            showSearchBox:false,
            users:[],
            user:{},
        }
    },
    mounted(){

    },
    methods: {
        chooseUser(u){
            this.searchBoxValue = u.name
            this.showSearchBox = false
            this.user = u
        },
        async handleInput(e) {
            this[e.target.name] = e.target.value
        },
        async handleSearchBox(e) {
            if(e.target.value.length > 2){
                this.showSearchBox = true
                //this.loading = true
                const result = await User.search(e.target.value)
                console.log(result);
                this.users = !Array.isArray(result.data) ? [result.data] : result.data
            }else{
                this.showSearchBox = false
            }
            this.searchBoxValue = e.target.value
            //this.loading = false
        },
        async onPressAssign() {
            const result = await User.assignManagerToBranch({shop:this.$route.params.shop_id, branch:this.$route.params.branch_id, user: this.user.id})
            if(result.type === "success"){
                this.promptSuccessBox = true
            }
        }
    }
}
</script>