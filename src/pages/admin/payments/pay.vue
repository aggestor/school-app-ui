<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:min-h-[300px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Paiement.</h2>
            </div>
            <SuccessComponent title="Paiement effectué" :message="`Le paiment  de ${values.montant}$  pour le compte de ${values.student} a été effectué avec success. Le montant a été crédité sur son compte.`" next="/ui/admin/payments" nextText="Suivant"/>
        </div>
        <div v-else data-aos="zoom-in" data-aos-duration="500" class="md:w-6/12 w-full flex justify-between items-center  rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Paiement.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour inscrire  un eleve. </p>
                <form class="h-full w-full flex flex-col">
                   <label for="eleve" class="text-sm mt-3">Nom de l'élève</label>
                    <div class="flex w-full mt-2 items-center  justify-around">
                        <div class="bg-white w-full  rounded border ">
                            <div :class="` w-full  items-center ${searchResults.length > 0 && 'border-b'} h-9  px-1 flex space-x-2`">
                                <input id="eleve" name="student" autofocus @input="handleInput" :value="values.student" placeholder="Entrez le mom de l'eleve a inscrire." type="search" class="w-full placeholder:text-gray-400 text-gray-800 outline-none border-none mx-2 h-[80%] bg-transparent"><span @click="handleClickSearch"  class="text-gray-400 hover:bg-gray-100 rounded cursor-pointer"><MagnifyingGlassIcon class="h-7 w-7"/></span>
                            </div>
                            <div v-if="!isSearchLoading && searchResults.length == 0 && values?.student?.length > 0 && showSuggestionBox " class="h-64 grid place-items-center w-full">
                                {{boxTitle }}
                            </div>
                            <div v-if="!isSearchLoading && searchResults.length > 0" class="max-h-64 overflow-auto __scrollbar grid place-items-center w-full">
                                <div @click="handleClickProduct(s)" :key="s.id" v-for="s of searchResults" class="p-1 w-full cursor-pointer hover:bg-blue-100 flex flex-col">
                                    <p class="w-full font-semibold">{{s.names+' '+s.firstname+' '+s.lastname }}</p>
                                    <small class="text-gray-600">{{s.genre }} | {{s.tel }}</small>
                                </div>
                            </div>
                            <div v-if="isSearchLoading" class="h-64 grid place-items-center w-full">
                                Loading...
                            </div>
                        </div>
                    </div>
                    <TextBox  :onChange="handleInput" type="number" name="montant" label="Montant" :value="values.montant"  placeholder="Montant à payer" :err="errors.montant"/>
                    <TextBox  :onChange="handleInput" type="text" name="libelle" label="Libelle" :value="values.libelle"  placeholder="Libelle" :err="errors.montant"/>
                </form>
                <div class="w-full items-center my-3 flex  justify-between">
                    <BlueButtons type="button" @press="onPressRegister">
                        Confirmer paiement <CheckCircleIcon class="w-5 h-5 ml-1"/>
                    </BlueButtons>
                </div>
            </div>
        </div>
        
    </div>
      
    </template>
    
    <script setup>
    import { ref, onMounted } from 'vue';
    import {CheckCircleIcon} from "@heroicons/vue/24/outline"
    import BlueButtons from '../../../components/v2/BlueButtons.vue';
    import SuccessComponent from '../../../components/v2/SuccessComponent.vue';
    import Class from '../../../api/v2/Class';
    import Student from '../../../api/v2/Student';
    import Payment from '../../../api/v2/Payment';
    import TextBox from '../../../components/TextBox.vue';

    const success = ref(false)
    const isSearchLoading = ref(false)
    const showSuggestionBox = ref(false)
    const searchResults = ref([])
    const errors = ref([])
    const classes = ref([])
    const classId = ref('')
    const studentId = ref('')
    const values = ref({})
    const boxTitle = ref("")
    const handleInput = async(e) =>{
        values.value[e.target.name] = e.target.value
        if(e.target.name == "classe_id"){
            const _classes = classes.value.filter(c =>c.name == e.target.value)
            if(_classes[0]){
                classId.value = _classes[0].id
            }
        }
        if(e.target.name == 'student'){
           await searchStudent(e)
        }
    }
    const searchStudent  = async e =>{
        const result = await Student.searchSubscribed(e.target.value)
        if(result.data){
            searchResults.value = Array.isArray(result.data) ? result.data : [result.data]
        }
    }
    const handleClickProduct  =  s =>{
        values.value.student = s.names+' '+s.firstname+' '+s.lastname
        studentId.value = s.id
        showSuggestionBox.value = false
        searchResults.value = []
    }
    const onPressRegister = async () =>{
        const result = await Payment.pay({eleve_id:studentId.value, montant:values.value['montant'], libelle:values.value['libelle']})
        if(result.error){
        errors.value = result.errorList 
        }
        if(result.success){
            success.value = true
        }
    }
    const getClasses =  async () =>{
        const result = await Class.get()
        if(result.data){
            classes.value = result.data
        }
    }
    onMounted(()=>{
        getClasses()
    })
    </script>
    