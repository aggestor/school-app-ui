<template>
  <div class="w-11/12 mx-auto h-[650px]">
    <FirstHomeSection/>
    <section class="w-full h-[80%] overflow-hidden mt-6 mb-3  shadow-lg grid grid-cols-12 ">
      <div class="col-span-9 h-full px-3 py-2 borer ">
        <div class="w-full flex font-semibold justify-between mb-4 text-gray-800 border-b pb-4">        
          <h1 class="text-2xl   ">Votre panier</h1>
          <span>{{store.count}} produits</span>
        </div>
        <div class="flex w-full mb-2  p-2 text-sm text-gray-500 font-semibold justify-between">
            <div class="w-6/12 ">Détails du produit</div>
            <div class="w-2/12 ">Quantité</div>	
            <div class="w-1/12 text-center">Prix</div>	
            <div class="w-1/12 text-center">Total</div>	
            <div class="w-2/12 text-center">--</div>	
        </div>
        <div class="w-full h-[90%] overflow-auto">
          <div class="border rounded my-2 p-1 flex items-center" v-for="item of store.items" :key="item.id">
          <CartItem :unitPrice="item.unitPrice" :totalPrice="item.totalPrice" :quantity="item.quantity" :image="item.image" :id="item.id" :name="item.name" />
        </div>
        </div>
        
      </div>
      <div class="col-span-3 h-[80%] flex flex-col justify-between px-3 py-2 bg-slate-50">
        <div class="w-full flex font-semibold justify-between mb-4 text-gray-800 border-b pb-4">        
          <h1 class="text-2xl">Récapitulatif</h1>
        </div>
        <div>
          Total a payer : {{store.total }}
        </div>
        <div class="mb-2 flex flex-col h-20 justify-between">
          <Button variant="bg" design="primary" text="Commander"/>
          <span class="flex justify-center"><ButtonLink variant="default" text="&larr; Continuer le shopping" path="/index"/></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import HeaderMenuSub from "../components/HeaderMenuSub.vue"
import CartItem from "../components/CartItem.vue"
import Button from '../components/Button.vue'
import ButtonLink from '../components/ButtonLink.vue'
import { useCart } from "../store/cart"
import FirstHomeSection from "../components/public/FirstHomeSection.vue"
const store = useCart()
</script>