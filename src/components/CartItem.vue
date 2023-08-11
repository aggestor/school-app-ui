<template>
  <div class="w-full h-auto overflow-auto">
          <div class="flex w-full h-full items-center  text-sm text-gray-700 font-semibold justify-between">
            <div class="w-6/12 h-full items-center flex">
              <div class="w-40 rounded overflow-hidden  h-40 mr-2">
                <img :src="image" class="w-full h-full object-cover" :alt="name">
              </div>
              <div class="w-1/2 h-[80%]  justify-between flex flex-col">
                <router-link :to="'/products/'+id" class="text-blue-600 text-base font-semibold">{{name }}</router-link>
                <span class="text-green-600">En stock</span>
              </div>
            </div>
            <div class="w-2/12 flex items-center h-36">
                <div class="h-[80%] flex justify-center items-center w-full">
                  <span class="w-8 h-8 rounded hover:bg-gray-600 hover:text-white text-gray-700 cursor-pointer grid place-items-center"><MinusIcon class="h-6 w-6"/></span>
                  <input :value=quantity type="number" class="border text-center mx-2 outline-none focus:border-2 focus:border-blue-500 h-8 w-12"/>
                  <span class="w-8 h-8 rounded hover:bg-gray-600 hover:text-white text-gray-700 cursor-pointer grid place-items-center"><PlusIcon class="h-6 w-6"/></span>
                </div>
            </div>
            <div class="w-1/12 flex justify-center items-center h-36">
                <div class="h-[80%] text-gray-800 font-semibold flex justify-center items-center w-full">
                  <span class="flex w-full text-center justify-center">$ {{unitPrice }}</span>
                </div>	
            </div>	
            <div class="w-1/12 flex justify-center items-center h-36">
                <div class="h-[80%] text-gray-800 font-semibold flex items-center justify-center w-full">
                  <span class="flex w-full text-center justify-center">$ {{totalPrice }}</span>
                </div>	
            </div>	
            <div class="w-2/12 grid place-items-center "><span @click="removeItem" class="bg-red-600 border-2 cursor-pointer border-transparent hover:border-red-600 text-white p-1 hover:ring-2 hover:ring-red-200 rounded">Supprimer</span></div>	
          </div>
        </div>
</template>

<script>
import { MinusIcon, PlusIcon } from '@heroicons/vue/24/solid'
import { defineComponent,onMounted } from 'vue';
import { useCart } from '../store/cart';
export default defineComponent({
    components: {
        MinusIcon, PlusIcon
    },
    props:{
      unitPrice:String, 
      totalPrice:String,
      quantity:String,
      image:String,
      name:String,
      id:String,
    },
    setup({id}){
      const cart = useCart()
      const removeItem = () =>{
        const items = cart.items.filter((a) => a.id != id )
        cart.setNewCount(items.length)
        cart.items = items
      }
      const addQuantity = () =>{}
      const removeQuantity = () =>{}
      const onEnterQuantity = () =>{}

      onMounted(()=>{
        console.log(id);
      })
      return {removeItem, addQuantity,removeQuantity, onEnterQuantity}
    }

}) 
</script>
