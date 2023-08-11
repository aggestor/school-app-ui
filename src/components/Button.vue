<template>
  <button @click="onClick" v-if="variant === 'bg' && design=== 'primary'" class="text-white bg-blue-600 rounded p-1.5 hover:ring-2 hover:ring-blue-600 border-2 border-transparent hover:border-white font-semibold duration-200 transition-all text-base ">{{text}}</button>
  <button @click="onClick" v-else-if="variant === 'border' && design=== 'primary'" class="text-blue-600 bg-transparent rounded p-1.5 hover:bg-blue-600 hover:text-white border-2 border-blue-600 font-semibold duration-200 transition-all text-base ">{{text}}</button>
</template>

<script>
export default {
    props: {
        text: String,
        variant: String,
        design: String,
        onClick:Function
    }
}
</script>