<template>
    <div class="w-full h-full grid place-items-center">
        <div class="md:w-full w-11/12 md:h-[70%] flex h-auto  justify-center items-center">
            <div v-if="!promptSuccessBox && !showEditOrDeleteSpec" class="border md:w-11/12 md:mb-5  md:space-x-5  mb-3 h-full  bg-white __shad  shadow-gray-200 flex rounded md:p-8 p-3  justify-between items-center flex-col md:flex-row" >
                <div class="md:w-6/12 flex flex-col  w-full justify-between h-full">
                     <PagesNavigationHeader title="Information sur une spécification"/>
                     <div class="h-40 my-auto w-fit border p-3 rounded flex flex-col justify-between">
                        <div> <span class="font-semibold">Catégorie :</span>  {{spec.cat_name}}</div>
                        <div><span class="font-semibold">Extension :</span>  {{spec.ext_name}}</div>
                        <div><span class="font-semibold">Type :</span>  {{spec.typ_name}}</div>
                        <div> <span class="font-semibold">Spécification :</span>  {{spec.spe_name}}</div>
                     </div>
                </div>
                <div v-if="showDetails" data-aos="fade-in" data-aos-duration="1000"  class="md:w-6/12  w-full md:ml-2 mb-3 h-full">
                    <div class="w-full p-1 flex justify-between">
                        <span>Les détails...</span> <span @click="showDetails = false" class="rounded cursor-pointer hover:bg-gray-300 bg-gray-200 font-semibold h-fit p-1">Ajouter</span>
                    </div>
                    <div v-if="details.length > 0" class="flex flex-wrap">
                        <div  id="wrapper" class="px-1.5 py-0.5 relative items-center justify-between flex my-1 text-blue-500 rounded-full border-2 border-blue-500  mr-2" v-for="detail of details">{{detail.name}} 
                            <span id="close" @click="()=>onClickShowOption(detail)" class=" bg-blue-200  rounded-full ml-2 cursor-pointer"><EllipsisHorizontalIcon class="w-5 h-5"/></span>
                            <div v-if="showOption && detail.id == currentOption" class="w-8 absolute justify-center z-50 bg-white flex flex-col items-center right-0  shadow top-8 rounded">
                                <span @click="onClickRemoveSpec(detail)" class="w-8  h-8 cursor-pointer hover:bg-gray-200 grid place-items-center p-0.5"><XMarkIcon class="w-6 h-6"/></span>
                                <span @click="onClickEditSpec(detail)" class="w-8 h-8 p-0.5 cursor-pointer hover:bg-gray-200 grid place-items-center overflow-hidden"><PencilIcon class="w-5 h-5"/></span>
                            </div>
                        </div>
                    </div>
                    <div class="grid place-items-center h-60" v-else>
                        Aucun detail à afficher pour le moment !
                    </div>
                </div>
                <div v-else data-aos="fade-in" data-aos-duration="1000" class="md:w-6/12 h-full">
                    <div class="w-full justify-between flex">
                        <span>Ajouter des details</span> <span @click="showDetails = true" class="rounded cursor-pointer hover:bg-gray-300 bg-gray-200 font-semibold p-1">Afficher</span>
                    </div>
                    <p class="text-gray-600 mb-3 text-sm">Remplissez le champ ci-bas pour ajouter des (...) à cette spécification.</p>
                    <div  class="w-full border rounded p-1 min-h-[60px] flex flex-wrap">
                        <div class="flex justify-between items-center mr-3 my-1 h-fit rounded-full p-1.5 text-sm w-fit bg-gray-100" v-for="na of names" :key="names.indexOf(na)">{{na}}<XMarkIcon @click="removeMe(na)" class="h-5 ml-2 cursor-pointer w-5 text-gray-500"/></div>
                    </div>
                    <form class=" w-full flex flex-col">
                        <div class="flex justify-between items-center space-x-3">
                            <TextBox :onChange="handleInput" type="text" name="name" label="Nom du type" :value="name"  placeholder="Nom du type" :err="errors.name"/>
                            <button @click="addDetail" type="button" class="w-10 h-10  rounded mt-6 grid place-items-center bg-white border-2 border-blue-500"><PlusIcon class="text-blue-500 h-7 w-7"/></button>
                        </div>
                    </form>
                    <div class="w-full flex mt-3 justify-between">
                        <Button v-if="names.length > 0" text='Enregistrer' variant="bg" design="primary" :onClick="onPressCreate"/>
                    </div>
                </div>
                
            </div>
            <div v-else-if="showEditOrDeleteSpec" class="border md:w-6/12 md:mb-5  relative  mb-3 h-auto  bg-white __shad  shadow-gray-200 flex rounded p-8  justify-between items-center flex-col md:flex-row">
                <span @click="showEditOrDeleteSpec = false, showOption = false" class="absolute right-2 top-2 cursor-pointer bg-gray-200 p-1 rounded"><XMarkIcon class="w-6 h-6"/></span>
                <div v-if="isRemoveEvt" class="w-full text-gray-700 h-40">
                    <p class="mt-5 text-center">Voulez-vous vraiment supprimer le detail <b>{{currentSpec.name }}</b>  de la specification <b>{{spec.spe_name }}</b> ? Cette operation est irreversible !</p>
                    <div class="flex justify-between mx-auto md:w-1/2 w-9/12 mt-5">
                        <button @click="confirmDelete" class="p-1 rounded border-2 border-blue-500 text-blue-600 bg-white">Confirmer</button>
                        <button @click="showEditOrDeleteSpec = false; showEditOrDeleteSpec = false; showOption = false" class="p-1 rounded bg-blue-600 text-white">Annuler</button>
                    </div>
                </div>
                <div v-else class="w-full h-auto p-3">
                    <p class="text-gray-600">Modification d'un detail de la specification <b>{{spec.spe_name}}</b></p>
                    <TextBox  :onChange="handleChange" label="Nom du detail" type="detail" name="detail" placeholder="Nom du detail" :value="currentSpec.name" :err="errors.contact"/>
                    <br>
                    <Button text='Enregistrer la modification' variant="bg" design="primary" :onClick="onPressUpdate"/>
                </div>
            </div>
             <div v-else class="md:w-7/12 border w-[95%] md:mb-5 mb-3 mt-10 md:h-80  bg-white __shad  shadow-gray-200 flex rounded justify-center flex-col">
                <SuccessComponent path="/admin/specifications/all" title="Enregitrement effectué !" message="La spécification a été enregistrée avec succès. Elle est est maintenant utilisable partout. Vous pouvez la modifier mais pas le supprimer définitivément."/>
            </div>
        </div>
    </div>
</template>
<script setup>
import TextBox from "../../components/TextBox.vue"
import Button from "../../components/Button.vue"
import { EllipsisHorizontalIcon, PencilIcon, PlusIcon } from "@heroicons/vue/24/solid"
import {XMarkIcon} from "@heroicons/vue/24/outline"
import PagesNavigationHeader from "../../components/PagesNavigationHeader.vue"
import Spec from "../../api/spec"
import SuccessComponent from "../../components/SuccessComponent.vue"
import { ref, onMounted } from "vue"
import {  useRoute } from "vue-router"

        const errors = ref({}) 
        const name = ref("") 
        const names = ref([])
        const speId = ref(0)
        const details = ref([])
        const spec = ref({})
        const currentSpec = ref({})
        const promptSuccessBox = ref(false)
        const showDetails = ref(true)
        const showOption = ref(false)
        const showEditOrDeleteSpec = ref(false)
        const currentOption = ref(0)
        const isRemoveEvt = ref(false)
     
        const route = useRoute()
    
        async function handleInput(e) {
            name.value = e.target.value
        }
        function onClickShowOption (d){
            currentOption.value = d.id
            showOption.value = !showOption.value
        }

        async function onPressCreate() {
            if (names.value.length == 0 && name.value == "") {
                errors.value.name = "Veillez renseigner le champs au moins une fois"
            } else {
                const result = await Spec.createDetail({id:route.params.specId, data:names.value})
                if (result.type === 'success') {
                    promptSuccessBox.value = true
                    errors.value = {}
                } else if (result.type === "error") {
                    errors.value = result.data
                }
            }
        }
       function  addDetail() {
            if (name.value != "" && !names.value.includes(name.value.toLowerCase())) {
                names.value.push(name.value)
                name.value  = ""
            }
        }
        function removeMe(me) {
            names.value = names.value.filter(a => a != me)
        }
        async function  getSpec(id) {
            const result = await Spec.get(id)
            if (result.type === "success") {
                spec.value = result.data
            }
        }
        async function getDetails(id) {
            const result = await Spec.getDetailsBySpec(id)
            if (result.type === 'success') {
                details.value = result.data
            } 
        }
        async function confirmDelete() {
            const result = await Spec.deleteDetail(currentSpec.value.id)
            
            if (result.type === 'success') {
                getDetails(route.params.specId).then(()=>{
                    showEditOrDeleteSpec.value = false;
                    showOption.value = false
                })
            } 
        }
        function onClickRemoveSpec(d){
            isRemoveEvt.value = true
            showEditOrDeleteSpec.value = true
            currentSpec.value = d
        }
        function onClickEditSpec(d){

            isRemoveEvt.value = false
            showEditOrDeleteSpec.value = true
            currentSpec.value = d
            currentOption.value = d.id
        }
        function handleChange(e){
            currentSpec.value.name = e.target.value
        }
        async function onPressUpdate(){
            if(currentSpec.value.name.length > 2){
                const result  = await Spec.updateDetail(currentSpec.value)
                if (result.type === 'success') {
                    getDetails(route.params.specId).then(()=>{
                        showEditOrDeleteSpec.value = false;
                        showOption.value = false

                    })
                } else errors.value = result.data
            }else{
                errors.value.detail = "Le nom doit avoir au minimum 3 lettres"
            }
        }
        onMounted(()=>{
            getSpec(route.params.specId)
            getDetails(route.params.specId)
        })
    
</script>