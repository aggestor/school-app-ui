<template>
    <head>
        <title>Ajouter un nouveau produit | Muyisphere</title>
    </head>
    <div class="w-11/12 mx-auto  flex justify-center items-center h-auto">
        <div v-if="promptSuccessBox" data-aos="slide-up" data-aos-duration="500"
            class="md:w-8/12 w-full overflow-hidden __shad flex md:flex-row flex-col mt-10 justify-between items-center h-96 md:h-80 rounded-lg border">
            <div
                class="md:w-6/12 w-full h-full  flex md:h-full bg-green-500 md:p-8 p-6  justify-center items-center flex-col">
                <CheckCircleIcon class="w-20 h-20 text-white" />
                <h1 class="font-semibold text-2xl text-white mt-3">Création éffectuée.</h1>
            </div>
            <div class="md:w-6/12 w-full h-[50%] flex items-center flex-col justify-center md:h-full">
                <span class="text-gray-800 text-center md:w-11/12 w-10/12">La création du produit <b>{{ name }}</b> a été
                    éffectuée avec succès. Vous pouvez maintenant l'attribuer à une branche ou le client peut le voir
                    maintenant, etc...</span>
                <span
                    class="bg-green-500 shadow-green-300 shadow-lg px-2 py-1.5 mt-5 hover:bg-green-600 rounded text-white text-lg"><router-link
                        :to="'/admin/shops/' + shop.id">Continuer</router-link></span>
            </div>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500"
            class="md:w-11/12 w-full bg-white __shad text-gray-700 flex justify-between items-center border h-auto rounded-lg">
            <div class="md:w-full flex h-full md:p-6 p-2  justify-center flex-col">
                <div class="w-11/12 mx-auto flex items-center">
                    <GoBackAdminButton /> <span class="ml-1 mr-1">|</span>
                    <h1 class="md:text-xl text-gray-700">Nouveau produit.</h1>
                </div>
                <form class="h-full w-full flex mt-4 flex-col">
                    <div class="w-full h-full">
                        <div class="w-full h-full flex space-y-3 flex-col justify-between">
                            <div class="w-11/12 mx-auto">
                                <Datalist :onChange="handleInput" type="text" name="mark" label="Choisir la marque" :value="mark.mar_name"
                                    placeholder="Choisir la marque (Optionel)" :err="errors.mark">
                                    <option v-for="c of marks" :value="c.mar_name" :key="c.mar_id">{{ c.mar_id }}</option>
                                </Datalist>
                            </div>
                            <div class="w-11/12 mx-auto ">
                                <span class=" my-3 w-72 text-sm">Taper une <b>serie</b> puis choisissez parmis les
                                    suggestions pour poursuivre la creation de votre produit</span>
                                <div class="relative max-h-96 mt-1 border rounded p-1 w-full">
                                    <input @input="handleSearchLinks" :value="searchBoxValue"
                                        class="h-8 w-full outline-none" placeholder="Rechercher une serie" />
                                    <div data-aos-duration="300" v-if="showSearchBox"
                                        class=" w-full shadow z-50 absolute top-10 rounded p-2 h-60 bg-white border left-0 mt-1">
                                        <SearchSkeltonAnimation v-if="loading" />
                                        <div class="w-full" v-else-if="!loading && Array.isArray(links)">
                                            <div @click="() => chooseSetLink(s)"
                                                class="w-full hover:bg-gray-100 cursor-pointer rounded p-1 flex justify-between"
                                                v-for="s of links" :key="s.id">
                                                <span>{{ s.set_name }}</span> <span>{{ s.category_name }}</span>
                                            </div>
                                        </div>
                                        <div v-else class="w-full h-full grid text-gray-600 place-items-center">
                                            <div class="w-fit flex flex-col items-center h-fit">
                                                <FaceFrownIcon class="h-16 w-16 mb-2" />
                                                <small class="w-9/12 mx-auto text-center">Aucun resultat pour ce nom de
                                                    shop. Verifier l'orthographe ou <router-link
                                                        class="text-blue-600 font-semibold" to="/admin/shops/new">créer
                                                        d'abord ce shop</router-link> .</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div data-aos="zoom-in" data-aos-duration="700" v-if="displayFirstRecap"
                                class="w-11/12 pt-10 relative rounded  border mx-auto">
                                <div class=" flex justify-between flex-col items-center w-full h-full">
                                    <span
                                        class="absolute flex items-center top-1 left-1 rounded pl-1  text-gray700 font-semibold ">
                                         <span class="md:flex hidden">Voici les information sur&ThinSpace;</span>
                                        <span class="text-blue-600">{{ searchBoxValue }}</span>
                                    </span>
                                    <span @click="displayFirstRecap = !displayFirstRecap"
                                        class="absolute top-1 right-1 rounded bg-gray-200 text-gray700 cursor-pointer grid place-items-center h-7 w-7">
                                        <XMarkIcon class="h-6 w-6" />
                                    </span>
                                    <div class="flex w-full text-sm md:text-base justify-between p-2">
                                        <span class="font-semibold">Catégorie</span>
                                        <span>{{ currentLink.category_name }}</span>
                                    </div>
                                    <div class="flex w-full justify-between p-2">
                                        <span class="font-semibold">Model</span>
                                        <span>{{ currentLink.model_name }}</span>
                                    </div>
                                    <div class="flex w-full justify-between p-2">
                                        <span class="font-semibold">Série</span>
                                        <span>{{ currentLink.set_name }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="w-11/12 mx-auto ">
                                <span class=" my-3 w-72 text-sm">Taper un <b>type</b> puis choisissez parmis les suggestions
                                    pour poursuivre la creation de votre produit</span>
                                <div class="relative max-h-96 mt-1 border rounded p-1 w-full">
                                    <input @input="handleSearchLinksTypes" :value="searchBoxValueTypes"
                                        class="h-8 w-full outline-none" placeholder="Rechercher un type" />
                                    <div data-aos-duration="300" v-if="showTypeSuggestionsBox"
                                        class=" w-full shadow z-50 absolute top-10 rounded p-2 h-60 bg-white border left-0 mt-1">
                                        <SearchSkeltonAnimation v-if="loading" />
                                        <div class="w-full" v-else-if="!loading && Array.isArray(linksTypes)">
                                            <div @click="() => chooseTypeLink(s)"
                                                class="w-full hover:bg-gray-100 cursor-pointer rounded p-1 flex justify-between"
                                                v-for="s of linksTypes" :key="s.type_id">
                                                <span>{{ s.type_name }}</span> <span>{{ s.category_name }}</span>
                                            </div>
                                        </div>
                                        <div v-else class="w-full h-full grid text-gray-600 place-items-center">
                                            <div class="w-fit flex flex-col items-center h-fit">
                                                <FaceFrownIcon class="h-16 w-16 mb-2" />
                                                <small class="w-9/12 mx-auto text-center">Aucun resultat pour ce nom de
                                                    shop. Verifier l'orthographe ou <router-link
                                                        class="text-blue-600 font-semibold" to="/admin/shops/new">créer
                                                        d'abord ce shop</router-link> .</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-if="displayLastRecap" class="w-11/12 pt-10 relative rounded  border mx-auto">
                                <div class=" flex justify-between flex-col text-sm md:text-base items-center w-full h-full">
                                    <span
                                        class="absolute flex items-center top-1 left-1 rounded pl-1 text-base  text-gray700 font-semibold "> En gros...
                                    </span>
                                    <span @click="displayLastRecap = !displayLastRecap"
                                        class="absolute top-1 right-1 rounded bg-gray-200 text-gray700 cursor-pointer grid place-items-center h-7 w-7">
                                        <XMarkIcon class="h-6 w-6" />
                                    </span>
                                    <div class="flex w-full justify-between space-x-2 p-2">
                                        <span class="font-semibold">Marque</span>
                                        <span>{{ mark.mar_name || "Non choisie" }}</span>
                                    </div>
                                    <div class="flex w-full justify-between space-x-2 p-2">
                                        <span class="font-semibold">Catégorie</span>
                                        <span>{{ currentLinkType.category_name }}</span>
                                    </div>
                                    <div class="flex w-full justify-between space-x-2 p-2">
                                        <span class="font-semibold">Extension</span>
                                        <span>{{ currentLinkType.extension_name }}</span>
                                    </div>
                                    <div class="flex w-full justify-between space-x-2 p-2">
                                        <span class="font-semibold">Type</span>
                                        <span>{{ currentLinkType.type_name }}</span>
                                    </div>
                                    <hr class="w-full">
                                    <div class="flex w-full justify-between space-x-2 p-2">
                                        <span class="font-semibold">Model</span>
                                        <span>{{ currentLink.model_name }}</span>
                                    </div>
                                    <div class="flex w-full justify-between space-x-2 p-2">
                                        <span class="font-semibold">Série</span>
                                        <span>{{ currentLink.set_name }}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="w-11/12 pt-10 relative rounded  mx-auto">
                                <div class=" flex justify-around flex-col items-center w-full h-full">
                                    <span
                                        class="absolute flex items-center top-1 left-0 rounded  text-gray700 font-semibold ">
                                        <InformationCircleIcon class="h-6 mr-3 w-6" /> Nom du produit et mots clés
                                    </span>
                                    <TextBox :onChange="handleInput" type="text" name="name" label="Nom du produit"
                                        :value="name" placeholder="Entrer le nom du produit" :err="errors.name" />
                                    <TextBox :onChange="handleInput" type="text" name="keyword"
                                        label="Mots clés (separez par une virgule)" :value="keyword" placeholder="Ajouter des mots cles sur ce produit"
                                        :err="errors.keyword" />
                                    <div class="w-full flex flex-wrap rounded border p-1 h-32">
                                        <span v-for="k of keywordsDefault"
                            class="border border-blue-600 text-blue-600 text-xs m-1 h-fit flex items-center space-x-1 rounded-full px-1 py-0.5  w-fit"><span>{{ k }}</span> <span @click="removeKeyword(k)" class="w-5 h-5 grid place-items-center cursor-pointer rounded-full bg-blue-200"><XMarkIcon class="w-[14px] h-[14px]"/></span></span>
                                    </div>
                                </div>
                            </div>
                            <div class="w-11/12 pt-10 relative rounded  mx-auto">
                                <div class=" flex justify-around flex-col items-center w-full h-full">
                                    <span
                                        class="absolute flex items-center top-1 left-0 rounded  text-gray700 font-semibold ">
                                        <InformationCircleIcon class="h-6 mr-3 w-6" />Descrivez votre produit
                                    </span>
                                    <div class="flex w-full  flex-col">
                                        <div
                                            class="w-full flex border flex-col p-2 h-52 focus-within:border-2 focus-within:border-blue-600 rounded">
                                            <span class="text-gray-600">Description du produit (Optionel)</span>
                                            <textarea name="description" @input="handleInput"
                                                class="w-full h-full  outline-none resize-none">{{ description }}</textarea>
                                        </div>
                                        <div class="w-full mt-4  flex ">
                                            <span @click="isBrandNew = !isBrandNew"
                                                class="h-6 cursor-pointer grid place-items-center w-6 border-blue-600 rounded border-2">
                                                <CheckIcon v-if="isBrandNew" class="h-5 w-5 font-semibold text-blue-600" />
                                            </span>
                                            <span @click="isBrandNew = !isBrandNew" class="ml-2 cursor-pointer">Ce produit
                                                est nouveau ? (Si oui cochez la case)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-11/12 pt-10 relative rounded  mx-auto">
                                <div class=" flex justify-around flex-col items-center w-full h-full">
                                    <span
                                        class="absolute flex items-center top-1 left-0 rounded  text-gray-700 font-semibold ">
                                        <InformationCircleIcon class="h-6 mr-3 w-6" />Ajouter les specifications
                                    </span>
                                    <div class="flex w-full border max-h-[500px] min-h-[100px] overflow-auto rounded p-2 flex-col">
                                        <div class="w-full flex  my-1 justify-between" v-for="s of specs" :key="s.name">
                                            <span class="w-4/12 p-1  rounded">{{ s.name }}</span>
                                            <select @change="(e) => handleSelection(e, s.name)"
                                                class="w-4/12 border-2 duration-500 transition-all outline-none focus:border-2 focus:border-blue-600 rounded p-1">
                                                <option :key="d.specd_name" :value="d.specd_name" v-for="d of s.data">
                                                    {{ d.specd_name }}</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-11/12 pt-10 relative rounded  mx-auto">
                                <div class=" flex justify-around flex-col items-center w-full h-auto">
                                    <span
                                        class="absolute flex items-center top-1 left-0 rounded  text-gray-700 font-semibold ">
                                        <InformationCircleIcon class="h-6 mr-3 w-6" />Prix, qualité et type de produit.
                                    </span>
                                    <div class="flex w-full h-auto overflow-auto rounded  flex-col">
                                        <div class=" border w-full p-2 rounded">
                                            Utilisez la fourchette des prix ?
                                            <div class=" flex justify-between my-2">
                                                <span @click="plan = 'with'"
                                                    :class="`p-1.5 font-semibold ${plan == 'with' ? 'bg-green-600 text-white' : ' text-green-600 border-2 border-green-500'}  cursor-pointer flex items-center  rounded`">Non
                                                    <CheckCircleIcon v-if="plan === 'with'" class="w-4 h-4 ml-1" />
                                                </span>
                                                <span @click="plan = 'without'"
                                                    :class="`p-1.5 font-semibold cursor-pointer  ${plan == 'without' ? 'bg-green-600 text-white' : ' text-green-600 border-2 border-green-500'} flex items-center rounded`">Oui
                                                    <CheckCircleIcon v-if="plan === 'without'" class="w-4 h-4 ml-1" />
                                                </span>
                                            </div>
                                            <div v-if="plan == 'with'" class="w-full h-auto">
                                                <TextBox :onChange="handleInput" type="number" name="quantity"
                                                    label="Quantité" :value="quantity" placeholder="Quantité du produit"
                                                    :err="errors.quantity" />
                                                <TextBox :onChange="handleInput" type="number" name="price"
                                                    label="Prix en $" :value="price" placeholder="Prix du produit"
                                                    :err="errors.quantity" />
                                            </div>
                                            <div v-if="plan == 'without'" class="w-full h-auto">
                                                <div class="w-full flex space-x-3 justify-between">
                                                    <TextBox :onChange="handleInput" type="number" name="quantity1"
                                                        label="Quantité 1" :value="quantity1" placeholder="Quantité du produit"
                                                        :err="errors.quantity1" />
                                                    <TextBox :onChange="handleInput" type="number" name="price1"
                                                        label="Prix en $ 1" :value="price1" placeholder="Prix du produit"
                                                        :err="errors.price1" />
                                                </div>
                                                <div class="w-full flex space-x-3 justify-between">
                                                    <TextBox :onChange="handleInput" type="number" name="quantity2"
                                                        label="Quantité 2" :value="quantity2" placeholder="Quantité du produit"
                                                        :err="errors.quantity2" />
                                                    <TextBox :onChange="handleInput" type="number" name="price2"
                                                        label="Prix en $ 2" :value="price2" placeholder="Prix du produit"
                                                        :err="errors.price2" />
                                                </div>
                                                <div class="w-full flex space-x-3 justify-between">
                                                    <TextBox :onChange="handleInput" type="number" name="quantity3"
                                                        label="Quantité 3" :value="quantity3" placeholder="Quantité du produit"
                                                        :err="errors.quantity3" />
                                                    <TextBox :onChange="handleInput" type="number" name="price3"
                                                        label="Prix en $ 3" :value="price3" placeholder="Prix du produit"
                                                        :err="errors.price3" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-11/12 pt-10 relative rounded  mx-auto">
                                <div class=" flex justify-around flex-col items-center w-full h-[90%]">
                                    <span
                                        class="absolute flex items-center top-1 left-0 rounded  text-gray-700 font-semibold ">
                                        <InformationCircleIcon class="h-6 mr-3 w-6" />Photo & vidéos du produit.
                                    </span>
                                    <div class="flex w-full max-h-[400px] overflow-auto rounded p-2 flex-col">
                                        <input ref="images" accept="image/png,image/jpeg, video/mp4" @change="loadImages"
                                            type="file" multiple hidden>
                                        <div class="w-full h-32">
                                            <div v-if="!imageURL[0]" @click="handleChooseImage"
                                                class="h-20 md:h-24 w-20 md:w-24 cursor-pointer grid place-items-center border rounded">
                                                <span class=""><svg class="h-10 fill-gray-600"
                                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                        <path
                                                            d="M 2.5 2 C 1.673 2 1 2.673 1 3.5 L 1 12.5 C 1 13.327 1.673 14 2.5 14 L 6.6054688 14 C 6.4434687 13.683 6.3118906 13.349 6.2128906 13 L 2.5 13 C 2.224 13 2 12.776 2 12.5 L 2 11.572266 L 5.5566406 7.5664062 L 6.7167969 8.7890625 C 6.8857969 8.4920625 7.0817813 8.212125 7.3007812 7.953125 L 5.5332031 6.0898438 L 2 10.066406 L 2 3.5 C 2 3.224 2.224 3 2.5 3 L 13.5 3 C 13.776 3 14 3.224 14 3.5 L 14 6.6054688 C 14.357 6.7884687 14.694 7.0048125 15 7.2578125 L 15 3.5 C 15 2.673 14.327 2 13.5 2 L 2.5 2 z M 11 4 A 1 1 0 0 0 10 5 A 1 1 0 0 0 11 6 A 1 1 0 0 0 12 5 A 1 1 0 0 0 11 4 z M 11.5 7 C 9.0206409 7 7 9.0206409 7 11.5 C 7 13.979359 9.0206409 16 11.5 16 C 13.979359 16 16 13.979359 16 11.5 C 16 9.0206409 13.979359 7 11.5 7 z M 11.5 8 C 13.438919 8 15 9.5610811 15 11.5 C 15 13.438919 13.438919 15 11.5 15 C 9.5610811 15 8 13.438919 8 11.5 C 8 9.5610811 9.5610811 8 11.5 8 z M 11 9 L 11 11 L 9 11 L 9 12 L 11 12 L 11 14 L 12 14 L 12 12 L 14 12 L 14 11 L 12 11 L 12 9 L 11 9 z" />
                                                    </svg>
                                                </span>
                                            </div>
                                            <div v-else class="w-full flex justify-evenly flex-wrap  md:justify-between">
                                                <div v-for="i of imageURL" class="w-20 md:w-24 h-20 md:h-24 rounded overflow-auto">
                                                    <img v-if="i.type == 'img'" :src="i.src" alt="Illustration product"
                                                        class="w-full aspect-auto h-full object-cover">
                                                    <video autoplay muted onclick="e => e.target.play()" v-else :src="i.src"
                                                        class="h-full w-full"></video>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div class="w-full mt-2 mb-10 rounded md:flex-row flex-col  flex justify-between">
                                    <div class="flex md:w-2/3 mb-3 w-full justify-between">
                                        <span @click="goBack"
                                        class="h-8 w-8 cursor-pointer flex items-center justify-center font-semibold bg-blue-600 text-white rounded-full ">
                                        <ArrowLeftIcon class="h-5 w-5" />
                                    </span>
                                    <span @click="resetImages"
                                        class="h-10 w-fit cursor-pointer flex items-center px-1 font-semibold text-blue-600 rounded border-2 border-blue-600 justify-between">Supprimer
                                        les images</span>
                                    </div>
                                    <span @click="onClickCreateProduct"
                                        class="h-10 w-fit float-right  cursor-pointer px-1 font-semibold text-white rounded bg-blue-600 flex items-center justify-between">Finaliser
                                        <CheckCircleIcon class=" ml-1 h-5 w-5" />
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="w-full flex md:space-x-1 flex-col md:flex-row justify-between">

                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import ButtonLink from "../../components/ButtonLink.vue"
import _Set from "../../api/set"
import Shop from "../../api/shop"
import Type from "../../api/type"
import Mark from "../../api/mark"
import Product from "../../api/product"
import Spec from "../../api/spec"
import { CheckCircleIcon, PhotoIcon, PlusCircleIcon, FaceFrownIcon, LinkIcon, CheckIcon } from "@heroicons/vue/24/solid"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import SearchSkeltonAnimation from "../../components/SearchSkeltonAnimation.vue"
import GoBackAdminButton from "../../components/GoBackAdminButton.vue"
import getVideoMetadata from "../../helpers/get-video-metadata"
import { ArrowLeftIcon, ArrowRightIcon, InformationCircleIcon, XMarkIcon } from "@heroicons/vue/24/outline"
import Datalist from "../../components/Datalist.vue"
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
    FaceFrownIcon,
    LinkIcon,
    XMarkIcon,
    InformationCircleIcon,
    ArrowLeftIcon,
    SearchSkeltonAnimation,
    ArrowRightIcon,
    CheckIcon,
    Datalist
},
    data() {
        return {
            errors: {},
            category: "",
            currentCat: "",
            fileImage: '',
            searchBoxValue: '',
            searchBoxValueTypes: '',
            name: "",
            promptSuccessBox: false,
            showTypeSuggestionsBox: false,
            showSearchBox: false,
            isBrandNew: false,
            loading: true,
            locations: [],
            transpiledCat: [],
            currentLink: {},
            currentLinkType: {},
            datalistCat: "",
            datalistCatId: '',
            specId: '',
            shop: {},
            links: [],
            linksTypes: [],
            keyword: "",
            keywords: [],
            keywordsDefault: [],
            specs: [],
            description: '',
            plan: 'with',
            imageURL: [],
            imagesFiles: [],
            prices: [],
            quantities: [],
            quantity: "",
            quantity1: "",
            quantity2: "",
            quantity3: "",
            price: "",
            price1: "",
            price2: "",
            price3: "",
            displayFirstRecap: false,
            displaySecondRecap: false,
            displayLastRecap: false,
            chosenSpecs: [],
            marks: [],
            mark: {},
        }
    },
    mounted() {
        this.getShop()
        this.getMarks()
    },
    methods: {
        removeKeyword(k){
            const kw = this.keywordsDefault.filter(a => a != k)
            this.keywordsDefault = kw
        },
        handleChooseImage() {
            this.$refs.images.click()
            this.organizeKeywords()
        },
        resetImages() {
            this.imageURL = []
            this.imagesFiles = []
        },
        async onClickCreateProduct() {
            const mark_ = {
                mark_name : this.mark.mar_name,
                mark_id : this.mark.mar_id
            }
            const prices = "P_" + this.price + ",P1_" + this.price1 + ",P2_" + this.price2 + ",P3_" + this.price3
            const quantities = "Q_" + this.quantity + ",Q1_" + this.quantity1 + ",Q2_" + this.quantity2 + ",Q3_" + this.quantity3
            const data = { ...this.currentLinkType, prices, quantities, ...this.currentLink, name: this.name, description: this.description, files: this.imagesFiles, specs: JSON.stringify(this.chosenSpecs[0]), isBrandNew: this.isBrandNew, keywords: this.keywords.concat(this.keywordsDefault).join(","), ...mark_ }
            const result = await Product.create(data)
            if (result.type === "success") {
                this.promptSuccessBox = true
            }
        },
        loadImages(e) {
            const files = [...e.target.files]
            const t = files.slice(0, 6)
            t.forEach(async (file) => {
                if (file.type.includes("video")) {
                    const result = await getVideoMetadata(file)
                    if (parseInt(result.duration) <= 60) {
                        this.imageURL.push({ 'type': 'video', src: URL.createObjectURL(file) })
                        this.imagesFiles.push(file)
                    }
                }
                else {
                    this.imageURL.push({ 'type': 'img', src: URL.createObjectURL(file) })
                    this.imagesFiles.push(file)
                }
            })
        },
        async handleInput(e) {
            this[e.target.name] = e.target.value
            if (e.target.name === "keyword") {
                const k = e.target.value
                if (k.slice(-1) === ",") {
                    const new_k = k.slice(0, -1)
                    if (!this.keywordsDefault.includes(new_k)) {
                        this.keywordsDefault.push(new_k)
                    } else this.errors['keywords'] = "Le mot clé doit etre unique."
                    this.keyword = ""
                }
            }
            if(e.target.name === "mark"){
                if(e.target.value.length > 2){
                    const marks_ = this.marks.filter(d => d.mar_name === e.target.value)
                    if(marks_[0]){
                        this.mark = marks_[0]
                    }
                }
            }
        },
        chooseSetLink(s) {
            this.currentLink = s
            this.showSearchBox = false
            this.displayFirstRecap = true
            this.searchBoxValue = s.set_name
        },
        chooseTypeLink(s) {
            this.getSpecs(s)
            this.currentLinkType = s
            this.displaySecondRecap = true
            this.displayLastRecap = true
            this.showTypeSuggestionsBox = false
            this.searchBoxValueTypes = s.type_name
        },
        async handleSearchLinks(e) {
            const value = e.target.value
            this.searchBoxValue = value
            this.searchBoxId = ""
            if (value && value.length >= 2) {
                this.showSearchBox = true
                this.loading = true
                const result = await _Set.searchLinks(this.$route.params.id, value)
                if (result.type === 'success') {
                    if (Array.isArray(result.data) && result.data.length > 0) {
                        this.links = result.data
                    }
                    else if (result.data === false) {

                        this.links = undefined
                    }
                    else this.links = [result.data]
                    this.loading = false
                }
            } else {
                this.showSearchBox = false
            }
        },
        async handleSearchLinksTypes(e) {
            const value = e.target.value
            this.searchBoxValueTypes = value
            if (value && value.length >= 2) {
                this.showTypeSuggestionsBox = true
                this.loading = true
                const result = await Type.searchLinks(this.currentLink.category_id, value)
                if (result.type === 'success') {
                    if (Array.isArray(result.data) && result.data.length > 0) {
                        this.linksTypes = result.data
                    }
                    else if (result.data === false) {

                        this.linksTypes = undefined
                    }
                    else this.linksTypes = [result.data]
                    this.loading = false
                }
            } else {
                this.showSearchBox = false
            }
        },
        async getShop() {
            const result = await Shop.get(this.$route.params.id)
            if (result.type === "success") {
                this.shop = result.data
            }
        },
        async getMarks() {
            const result = await Mark.getAll()
            if (result.type === "success") {
                this.marks = result.data
            }
        },
        async getSpecs(s) {
            const result = await Spec.getByType(s.type_id)
            if (result.type === "success") {
                const data = result.data[0]
                if (result) {
                    let keys = Object.entries(data).map(d => { return { name: d[0], data: d[1] } })
                    this.specs = keys
                }
            }
        },
        handleSelection(e, data) {
            this.chosenSpecs.push({ 'name': data, 'value': e.target.value })
        },
        goBack() {
            this.$router.back()
        },
        organizeKeywords(){
            
            let temp = [...Object.values(this.currentLink), ...Object.values(this.currentLinkType)]
                temp = temp.filter(d => !Number.parseInt(d)).map(k => this.name + " " + k)
                this.keywords = [...this.keywords, ...temp]
        }
    }
}
</script>