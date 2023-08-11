<script>
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/vue/24/outline";
import {defineComponent, onMounted, ref} from "vue"
export default defineComponent({
    props:{
        content : Object
    },
    setup(props) {
        const name = ref("")
        const category = ref("")
        const details = ref("")
        const stripString  = (value) =>{
            if(value == null) return 
            else if(value.length <=140) return value
            else return value.slice(0,135)+"..."
        }
        const decideDetailValue = () =>{
            if(props.content.ext_name != null && props.content.mod_name != null){
                details.value = props.content.mod_name+","+props.content.ext_name
            }
            else if(props.content.ext_name == null){
                details.value = props.content.mod_name
            }
            else if(props.content.mod_name  == null){
                details.value = props.content.ext_name
            }
            else{
                details.value = ""
            }
        }
        onMounted(()=>{
            name.value = props.content.cat_name
            decideDetailValue()
            category.value = props.content.cat_id
        })
        return{name,details,category, stripString}
    },
    components: { CheckCircleIcon, ArrowRightIcon }
})
</script>
<template>
    <div class="md:w-72  w-[90vw] border hover:border-none hover:bg-blue-600 group transition-colors duration-500  text-sm h-[300px] p-3 shadow-lg hover:shadow-xl hover:shadow-blue-300  overflow-hidden rounded">
        <div class="p-1 flex flex-col h-full  justify-between">
            <span class="w-9 h-9 rounded bg-blue-200  text-blue-600 grid place-items-center"><CheckCircleIcon class="w-7 h-7"/></span>
            <h1 class="text-lg font-bold group-hover:text-white text-blue-600">{{name}}</h1>
            <p class=" my-0.5 text-gray-600 group-hover:text-gray-200  w-full">{{stripString(details) }}</p>
            <div class="flex items-center text-gray-600 group-hover:text-gray-200 justify-end">
                <router-link :to="'/categories/'+category">
                    <ArrowRightIcon class="w-6 h-6 cursor-pointer"/>
                </router-link>
            </div>
        </div>
    </div>
</template>