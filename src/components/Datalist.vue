<script>
import { defineComponent } from 'vue';

export default defineComponent({
    props:{
        name: String,
        type:String,
        error: String,
        placeholder: String,
        event: Function,
        value: String,
        hideLabel: false
    },
    setup(props){
        return props
    }
})

</script>
<template>
    <div class=" w-full focus-within:text-blue-600 text-gray-800">
        <label v-if="!hideLabel" class="focus-within:font-semibold text-sm" :for="name">{{placeholder}}</label>
        <div class="w-full  focus-within:border-blue-600 focus-within:border-2 border transition-colors duration-500  h-10 items-center flex rounded">
            <input :list=name @input="event" :name=name :type=type :placeholder=placeholder class="bg-transparent transition-colors duration-500 placeholder:text-sm text-sm placeholder:text-gray-400 focus:text-blue-600 focus:outline-none ml-2 w-full" :value=value />
            <datalist :id=name>
                <slot/>
            </datalist>
        </div>
        <span v-if="error" class=" text-red-500 text-xs">{{error}}</span>
    </div>
</template>