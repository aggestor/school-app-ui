<template>
    <div class="w-full bg-gray-900 md:mt-0 mt-10 h-full lg:min-h-[450px]">
        <section class="w-11/12 py-9 mx-auto h-full grid md:grid-cols-12 grid-cols-1">
            <div class=" h-full md:col-span-4 col-span-1 flex flex-col">
                <p class="text-gray-300 mb-4 md:text-lg text-base lg:text-2xl font-semibold">Mission et Vision</p>
                <p class="text-gray-500 text-sm md:text-base">
                    Agir autrement...couper la chaîne des intermédiaires lors de vos shoppings muyi$phere, telle une Ferrari dans un embouteillage de Land Cruiser, par son sourcing et contrôle de qualité , est la solution même aux soucis non encore identifiés. Grâce au e-commerce et au Marketing Viral, Nous nous proposons comme Dictateur Bénévole. Avec le Web Marketing, Affiliate Marketing ainsi que le Digital Marketing, Nous convertissons des internautes en clients dans la construction de ce sentier du Dropping Shipping Business que doit désormais suivre la concurrence.
                </p>
            </div>
            <div class=" h-full md:col-span-4 md:my-0 my-6 col-span-1 flex  items-center flex-col">
                <p class="text-gray-300 mb-4 md:w-6/12 w-full  md:text-lg text-base lg:text-2xl font-semibold">Navigation</p>
                <ul class="text-gray-500 md:w-6/12 text-sm md:text-base w-full">
                    <li class="hover:text-blue-500 mb-2"><router-link to="/">Accueil</router-link></li>
                    <li class="hover:text-blue-500 mb-2"><router-link to="/cart"><span class="flex">Panier <div class="w-6 h-6 rounded-full text-center ml-1 grid place-items-center bg-blue-500 text-white"><span>{{store.count}}</span></div></span> </router-link></li>
                    <li class="hover:text-blue-500 mb-2"><router-link to="/search">Rechercher</router-link></li>
                    <li class="hover:text-blue-500 mb-2"><router-link to="/contacts">Contacts</router-link></li>
                    <li class="hover:text-blue-500 mb-2"><router-link to="/about">A propos</router-link></li>
                    <li class="hover:text-blue-500 mb-2"><router-link to="/term-of-use">Conditions d'utilisation</router-link></li>
                </ul>
            </div>
            <div v-if="showNewsletter" data-aos="slide-up" data-aos-duration="500" class=" h-full md:col-span-4 col-span-1 flex  flex-col">
                <p class="text-gray-300 mb-4  md:text-lg text-base lg:text-2xl font-semibold">Newsletter</p>
                <p class="text-gray-500 text-sm md:text-base">
                    Veillez nous fournir votre adresse mail pour ne plus rater les nouvelles articles
                </p>
                <div class="mt-3 flex flex-col">
                    <div :class="`border-gray-500 border ${mailError ? 'border-red-500' :''} focus-within:text-blue-500 focus-within:border-2 focus-within:border-blue-500 transition-all duration-300 h-10 px-2 rounded`">
                        <input  @input="handleInput" placeholder="Votre adresse mail"  class="w-full h-full bg-transparent outline-none placeholder-gray-500 text-gray-400"  type="email" :value="mail" name="newsletter" />
                    </div>
                    <span v-if="mailError" class="text-red-500">{{mailError}}</span>
                    <div class="md:w-6/12 mt-3">
                        <Button :onClick="handleClick" variant="border" design="primary" text="S'abonner"/>
                    </div>
                </div>
            </div>
            <div v-else data-aos="slide-down" data-aos-duration="500" class=" h-full md:col-span-4 col-span-1 flex justify-center">
                <div class="mt-3 bg-green-500 relative md:w-10/12 h-fit rounded p-3 flex justify-between items-center ">
                    <CheckCircleIcon class="text-white h-10 w-10" /> <p class="text-white text-lg">Félicitation,Vous êtes abonné(e).</p>
                    <XMarkIcon @click="showNewsletter = true " class="absolute h-5 text-gray-200 cursor-pointer w-5 right-1 top-1"/>
                </div>
            </div>
            <div class=" h-full md:col-span-12 col-span-1 md:mt-0 mt-4 flex  flex-col">
                <p class="text-gray-500 md:text-center mt-4">Copyright &copy; {{year}} Muyisphere. All right reserved</p>
            </div>
        </section>
    </div>
</template>
<script>
import Button from './Button.vue';
import { useCart } from '../store/cart';
import Newsletter from '../api/newsletter';
import {CheckCircleIcon,XMarkIcon} from "@heroicons/vue/24/solid"
export default {
    data() {
        return {
            year: 0,
            mail: '',
            mailError: "",
            showNewsletter:true
        };
    },
    mounted() {
        const y = new Date().getFullYear();
        this.year = y;
    },
    setup() {
        const store = useCart()
        return {
            store
        }
    },
    components: { Button,CheckCircleIcon,XMarkIcon },
    methods:{
        handleInput(e) {
            this.mail = e.target.value
        },
        async handleClick() {
            const result = await Newsletter.subscribe(this.mail)
            if (result.type === 'error') {
                this.mailError = result.data.email;
            } else {
                this.mail = ""
                this.showNewsletter = false
            }
        }
    }
}

</script>