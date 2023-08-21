<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[550px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Créer un élève.</h2>
            </div>
            <SuccessComponent title="Création effectuée" message="La création du cours a été effectuée avec success. Vous pouvez maintenant assossier ce cours a tout ce qui peût y être lié." next="/ui/admin/classes" nextText="Suivant"/>
        </div>
        <div v-else data-aos="zoom-in" data-aos-duration="500" class="md:w-10/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Créer un élève.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour créer  un élève. </p>
                <form class="h-full w-full flex flex-col">
                    <div class="w-5/12">
                        <TextBox  :onChange="handleInput" type="text" name="names" label="Prénom" :value="values.names"  placeholder="Prénom de l'élève" :err="errors.names"/>
                    </div>
                    <div class="flex justify-between space-x-3">
                        <TextBox  :onChange="handleInput" type="text" name="firstname" label="Nom" :value="values.firstname"  placeholder="Nom de l'élève" :err="errors.firstname"/>
                        <TextBox  :onChange="handleInput" type="text" name="lastname" label="Postnom" :value="values.lastname"  placeholder="Postnom de l'élève" :err="errors.lastname"/>
                    </div>
                    <div class="flex  space-x-3">
                        <div class=" w-4/12 text-sm mt-3">
                            Genre
                            <div class="w-full h-10 rounded flex justify-between border p-2">
                                <div @click="gender = 'homme'" class="flex items-center cursor-pointer space-x-2"><span class="h-5 grid place-items-center w-5 mr-1 rounded-full border-blue-600 border-2"><CI v-if="gender == 'homme'" class="w-4 text-blue-600 h-4"/> </span> Homme</div>
                                <div @click="gender = 'femme'" class="flex items-center cursor-pointer space-x-2"><span class="h-5 grid place-items-center w-5 mr-1 rounded-full border-blue-600 border-2"><CI v-if="gender == 'femme'" class="w-4 text-blue-600 h-4"/> </span> Femme</div>
                            </div>
                        </div>
                        <div class="w-6/12">
                            <TextBox  :onChange="handleInput" type="date" name="naissance" label="Date de naissance" :value="values.naissance"   :err="errors.naissance"/>
                        </div>
                    </div>
                    <div class="flex justify-between space-x-3">
                        <TextBox  :onChange="handleInput" type="tel" name="tel" label="Téléphone" :value="values.tel"  placeholder="Numéro de téléphone" :err="errors.tel"/>
                        <TextBox  :onChange="handleInput" type="text" name="tel" label="Address" :value="values.adresse"  placeholder="Address" :err="errors.adresse"/>
                    </div>
                    <div class="w-5/12">
                        <TextBox  :onChange="handleInput" type="text" name="password" label="Mot de passe" :value="values.password"  placeholder="Mot de passe" :err="errors.password"/>
                    </div>
                </form>
                <div class="w-full items-center mt-4 flex  justify-between">
                    <BlueButtons type="button" @press="onPressRegister">
                        Enregistrer <CheckCircleIcon class="w-5 h-5 ml-1"/>
                    </BlueButtons>
                </div>
            </div>
        </div>
        
    </div>
      
    </template>
    
    <script setup>
    import { onMounted, ref } from 'vue';
    import {CheckCircleIcon, CheckIcon} from "@heroicons/vue/24/outline"
    import {CheckCircleIcon as CI} from "@heroicons/vue/24/solid"
    import BlueButtons from '../../../components/v2/BlueButtons.vue';
    import TextBox from "../../../components/TextBox.vue"
    import Datalist from '../../../components/Datalist.vue';
    import SuccessComponent from '../../../components/v2/SuccessComponent.vue';
    import Class from '../../../api/v2/Class';
    import Course from '../../../api/v2/Course';
    import Option from '../../../api/v2/Option';
    import User from '../../../api/v2/User';
    import Level from '../../../api/v2/Level';

    const success = ref(false)
    const errors = ref([])
    const levels = ref([])
    const users = ref([])
    const options = ref([])
    const chosenCourses = ref([])
    const courses = ref([])
    const optionId = ref("")
    const userId = ref("")
    const gender = ref("")
    const levelId = ref("")
    const values = ref({})

    const handleInput = (e) =>{
        if(e.target.name == "option"){
            const t = options.value.filter(o => o.option == e.target.value )
            if(t[0]){
                optionId.value = t[0].id
            }
        }
        if(e.target.name == "niveau"){
            const t = levels.value.filter(o => o.niveau == e.target.value )
            if(t[0]){
                levelId.value = t[0].id
            }
        }
        if(e.target.name == "user_id"){
            const t = users.value.filter(o => o.name == e.target.value )
            if(t[0]){
                userId.value = t[0].id
            }
        }
        values.value[e.target.name] = e.target.value
    }
    const onPressRegister = async () =>{
        const result = await Class.create({...values.value,niveau_id:levelId.value, option_id: optionId.value, cours_id:chosenCourses.value, user_id:userId.value})
        if(result.error){
        errors.value = result.errorList 
        }
        if(result.success){
            success.value = true
        }
    }
    const getOptions = async () =>{
        const result =await Option.get()
        if(result.data){
            options.value = result.data
        }
    }
    const fetchUsers = async () =>{
        const result = await User.getClassTeachers()
        if(result.success){
            users.value = result.data
        }
    }
    const getLevels = async () =>{
        const result =await Level.get()
        if(result.data){
            levels.value = result.data
        }
    }
    const getCourses = async () =>{
        const result =await Course.get()
        if(result.data){
            courses.value = result.data
        }
    }
    const onChooseCourse = id =>{
        if(!chosenCourses.value.includes(id)){
            chosenCourses.value.push(id)
        }else{
            chosenCourses.value = chosenCourses.value.filter(m => m != id)
        }
    }
    onMounted(()=>{
        getOptions()
        getLevels()
        getCourses()
        fetchUsers()
    })
    </script>
    