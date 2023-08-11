<template>
  <div class="w-11/12 mx-auto">
      <FirstSection/>
        <div class="md:w-8/12 w-full mx-auto my-4  rounded h-fit overflow-auto">
            <div class="flex w-full md:space-x-3 flex-col md:flex-row  items-center mb-3 p-2 text-sm text-gray-600  justify-between">
              <div class="md:w-1/2 md:mb-0 mb-3 w-full">
                <div class="  h-52 overflow-hidden">
                  <img :alt="name" :src="image" class="md:w-[80%] w-full rounded h-full object-cover" alt="Images test">
                </div>
              </div>
              <div class="md:w-1/2 w-full md:h-56">
                <div class="w-full mb-2  justify-between flex flex-col">
                  <span>Nom du produit</span>
                  <span class="text-gray-700 text-base font-semibold">{{name }}</span>
                </div>
                  <div class=" flex mb-2 flex-col w-full">
                    <span>Prix unitaire</span>
                    <span class=" w-full font-semibold">$ {{unitPrice ?? 0 }}</span>
                  </div>	
                  <div class="w-full mb-2 flex flex-col">
                  <span>Prix total</span>
                      <span class="font-semibold w-full ">$ {{totalPrice ??0 }}</span>
                </div>
                    <div class=" flex mb-3 w-full">
                      <span @click="removeToCart" class="w-6 h-6 bg-blue-600 rounded hover:bg-blue-700 text-white cursor-pointer grid place-items-center"><MinusIcon class="h-5 w-5"/></span>
                      <input :value="quantity" @input="onEnterQuantity" type="number" class="rounded text-center md:text-end mx-2 outline-none  border-2 border-blue-500 h-6 w-12"/>
                      <span @click="addToCart" class="w-6 h-6 rounded hover:bg-blue-700 text-white bg-blue-600 cursor-pointer grid place-items-center"><PlusIcon class="h-5 w-5"/></span>
                    </div>	
                    <div class="w-full">
                      <span @click="confirmAddToCart" class="bg-blue-600  flex items-center cursor-pointer   text-white py-0.5 px-1 hover:shadow-lg hover:shadow-blue-300  rounded w-fit ">Ajouter au panier <ShoppingCartIcon class="h-6 ml-1 w-6"/>
                      </span>
                    </div>
                </div>
            </div>
    </div>
    </div>
  </template>
  
<script setup>
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/solid'
import {  onMounted,ref,watch, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {store} from "../api"
import prettyString from '../helpers/pretty-string';
import {useCart} from "../store/cart"
import { ShoppingCartIcon } from '@heroicons/vue/24/outline';
import FirstSection from "../components/public/FirstHomeSection.vue"
        const route = useRoute()
        const router = useRouter()
        const cart = useCart()
        const quantity = ref(0)
        const unitPrice = ref(0)
        const totalPrice = ref(0)
        const name = ref("")
        const image = ref("")
        const confirmAddToCart = () =>{
          cart.addItem({
            name:name.value,
            unitPrice:unitPrice.value,
            totalPrice:totalPrice.value,
            image:image.value,
            quantity:quantity.value,
            id:route.params.prod_id
          })
          router.push('/cart')
          
        }
        const addToCart = () =>{
            quantity.value +=1
        }
        const removeToCart = () =>{
            quantity.value -=1
        }
        const onEnterQuantity = (e) =>{
            quantity.value = parseInt(e.target.value)
        }

        const processUnitPrice = () =>{
            let prices  = route.params.prod_price
            const pricesArray = prices.split("&")
            const fp = pricesArray[0].split("_")
            if(fp[1]) unitPrice.value = fp[1]
        }

        onMounted(()=>{
          console.log(route.params.prod_id);
             processUnitPrice()
             name.value = prettyString(route.params.prod_name,true)
             image.value = store+"/products/"+route.params.prod_image
        })
        watch(
            quantity,(new_,old) =>{
                totalPrice.value = computed(() =>unitPrice.value * new_) 
            }
        )

  </script>
  