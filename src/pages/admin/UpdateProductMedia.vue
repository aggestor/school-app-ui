<template>
    <div class="h-full w-full flex justify-center items-center">
        <div v-if="!promptSuccessBox" class="w-8/12 mx-auto bg-white rounded p-3 min-h-[80%]">
            <div class="w-full mx-auto flex justify-between items-center">
                <div class="flex">
                    <GoBackAdminButton /> <span class="ml-1 mr-1">|</span>
                    <h1 class="md:text-xl font-semibold text-gray-700">Modifier les images produit </h1>
                </div>
                <span v-if="images.length > 0 & areOldImages" @click="removeAllImages" class="p-1.5 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700 flex items-center justify-around">Toutes <TrashIcon class="w-5 h-5 ml-1"/></span>
            </div>
            <div class="w-full flex mt-3 flex-wrap">
                <div v-for="img of images.slice(0,6)" class="w-48 p-3 h-48">
                    <div @mouseleave="handleImgOut(img)" @mouseenter="handleImgHovered(img)"  class="w-full  h-full border  relative rounded">
                        <div v-if="currentImage === img && showRemove" class="absolute space-x-2  bottom-0 left-0 w-full z-50 flex p-2">
                            <span @click="removeImage(img)" class="bg-black bg-opacity-60  backdrop-blur-sm rounded cursor-pointer grid place-items-center p-0.5"><TrashIcon class="w-6 text-white h-6"/></span>
                            <span @click="expandImage(img)" class="bg-black bg-opacity-60  backdrop-blur-sm rounded cursor-pointer grid place-items-center p-0.5"><ArrowTopRightOnSquareIcon class="w-6 text-white h-6"/></span>
                        </div>
                        <img v-if=" typeof img=='string' && img.includes('IMG')" class="object-cover h-full w-full rounded" :src="img.includes('blob') ? img : store+'/products/'+img" :alt="img">
                        <img v-else-if=" typeof img!='string' && img.type=='img'" class="object-cover h-full w-full rounded" :src="img.src.includes('blob') ? img.src : store+'/products/'+img.src" :alt="img.src">
                        <video autoplay muted onclick="e => e.target.play()" v-else-if="img.type == 'video'" :src="img.src.includes('blob') ? img.src : store+'/products/'+img.src" class="h-full w-full"></video>
                        <video autoplay muted onclick="e => e.target.play()" v-else :src="img.includes('blob') ? img : store+'/products/'+img" class="h-full w-full"></video>
                    </div>
                </div>
                <div v-if="images.length <=5" class="w-48 h-48 p-3">
                    <div @click="handleClickPickImages" class="border h-full w-full rounded grid place-items-center cursor-pointer">
                        <div class="flex flex-col items-center text-gray-600">
                            <DocumentPlusIcon class="w-10 h-10 text-gray-600"/>
                            <small>Ajouter des images</small>
                        </div>
                    </div>
                </div>
                <form>
                    <input hidden multiple @change="handleChangeInput" type="file" ref="inputRef">
                </form>
            </div>
            <span v-if="images.length > 0" @click="onClickUploadImages" class="p-1.5 rounded bg-blue-600 text-white cursor-pointer hover:bg-blue-700 flex items-center justify-center">Uploader les images <CloudArrowUpIcon class="w-5 h-5 ml-1"/></span>
        </div>
        <div v-else class="w-6/12 md:h-[50%]">
            <SuccessComponent :path="'/admin/products/'+product.prod_id" title="Images uploadees !"
                message="Les nouvelles images ont été uploadées avec succès. Elles est maintenant visibale partout. Vous pouvez le modifier ou le supprimer quand vous voulez." />
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import SuccessComponent from "../../components/SuccessComponent.vue"
import { useRoute } from 'vue-router';
import Product from "../../api/product"
import Shop from "../../api/shop"
import { store } from '../../api';
import { TrashIcon,ArrowTopRightOnSquareIcon, DocumentPlusIcon, CloudArrowUpIcon } from '@heroicons/vue/24/outline';
import useVerify from "../../hooks/useVerify"
import getVideoMetadata from '../../helpers/get-video-metadata';

useVerify()
const product = ref({})
const images = ref([])
const imagesFiles = ref([])
const currentImage = ref("")
const promptSuccessBox = ref(false)
const showRemove = ref(false)
const areOldImages = ref(true)
const inputRef = ref("inputRef")
const shop = ref({})
const route = useRoute()
const getProduct  =async id =>{
    const result = await Product.get(id)
    if(result.type  === "success"){
        getShop(result.data.shop_id)
       images.value = result.data.files ? result.data.files.split(",") : [];
        product.value = result.data
    }
}
const getShop = async id => {
    const result = await Shop.get(id)
    if(result.type === "success"){
        shop.value = result.data
    }
}
const onClickUploadImages = async () =>{
    const result = await Product.updateMedia(imagesFiles.value,product.value.prod_id)
    if(result.type === "success"){
        promptSuccessBox.value = true
    }
}
const handleImgHovered = (img) =>{
    showRemove.value = true
    currentImage.value = img
}
const handleImgOut = (img) =>{
    if(currentImage.value !== img)
        showRemove.value = false
    currentImage.value = ""
}
const expandImage = (img) =>{

}
const removeImage = async (img) =>{
    const imgs = images.value.filter(a =>a != img)
        const  result = await Product.removeImage(img)
        if(result.type === "success"){
            images.value = imgs
        }
}
const removeAllImages = () =>{
    if(areOldImages.value)
    images.value.forEach( image => removeImage(image))
    images.value = []
    areOldImages.value = false
}
const handleClickPickImages = () =>{
    inputRef.value.click()
}
const handleChangeInput = (e) =>{
    const files = [...e.target.files] 
    files.forEach( async file =>{
        console.log(file);
        if (file.type.includes("video")) {
            const result = await getVideoMetadata(file)
            if (parseInt(result.duration) <= 60) {
                images.value.push({type:"video", src:URL.createObjectURL(file)})
                imagesFiles.value.push(file)
            }
        }
        else {
            images.value.push({type:'img', src: URL.createObjectURL(file)})
            imagesFiles.value.push(file)
        }
    })
    areOldImages.value = false
}
onMounted(()=>getProduct(route.params.id))
</script>