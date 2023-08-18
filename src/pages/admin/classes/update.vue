<template>
    <div class="w-11/12 mx-auto flex justify-center items-center md:h-[550px]">
        <div v-if="success" data-aos="slide-up" data-aos-duration="500" class="w-fit overflow-hidden flex  flex-col justify-between items-center h-auto ">
            <div class="w-full mb-3">
                <h1 class="font-semibold text-2xl text-blue-600 mb-1">SchoolApp.</h1>
                <h2 class="font-semibold text-lg">Création d'une classe.</h2>
            </div>
            <SuccessComponent title="Création effectuée" message="La création du cours a été effectuée avec success. Vous pouvez maintenant assossier ce cours a tout ce qui peût y être lié." next="/ui/admin/classes" nextText="Suivant"/>
        </div>
        <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-8/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
            <div class="w-full flex h-[85%] md:p-6 p-4  justify-center flex-col" >
                <h2 class="font-semibold text-lg">Créer d'une classe.</h2>
                <p class="text-gray-700 text-sm">Remplissez le formulaire ci-bas pour créer une classe. </p>
                <form class="h-full w-full flex flex-col">
                    <div class="flex justify-between space-x-3">
                        <TextBox  :onChange="handleInput" type="text" name="name" label="Nom" :value="values.name"  placeholder="Nom de la classe" :err="errors.name"/>
                        <TextBox  :onChange="handleInput" type="number" name="scolarite" label="Montant" :value="values.scolarite"  placeholder="Montant à payer" :err="errors.scolarite"/>
                    </div>
                    <div class="flex justify-between space-x-3">
                        <div class="w-8/12">
                            <Datalist label="Niveau" :onChange="handleInput" name="niveau" placeholder="Choisir Niveau">
                                <option :value="o.niveau" :key="o.niveau" v-for="o of levels">{{o.id }}</option>
                            </Datalist>
                        </div>

                        <div class="w-8/12">
                            <Datalist label="Option" :onChange="handleInput" name="option"  placeholder="Choisir Option">
                                <option  :key="o.option" v-for="o of options">{{o.option }}</option>
                            </Datalist>
                        </div>
                    </div>
                    <div class="w-8/12">
                        <Datalist label="Titulaire" :onChange="handleInput" name="user_id"  placeholder="Choisir titulaire du cours">
                            <option  :key="o.name" v-for="o of users">{{o.name }}</option>
                        </Datalist>
                    </div>
                    <div class="w-full h-48 p-1 rounded mt-3 border">
                        <p class="text-gray-600">Choisir cours</p>
                        <div class="flex flex-wrap space-x-2">
                            <span @click="onChooseCourse(c.id)" v-for="c of courses" :class="` p-1 bg-gray-100 flex space-x-2 items-center cursor-pointer ${chosenCourses.includes(c.id) ? 'bg-blue-600 text-white' :' hover:bg-gray-200'} rounded`">{{c.cours }} <CheckIcon class='w-5 h-5 ml-2' v-if="chosenCourses.includes(c.id)"/></span>
                        </div>
                    </div>
                </form>
                <div class="w-full items-center my-3 flex  justify-between">
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
    import BlueButtons from '../../../components/v2/BlueButtons.vue';
    import TextBox from "../../../components/TextBox.vue"
    import Datalist from '../../../components/Datalist.vue';
    import SuccessComponent from '../../../components/v2/SuccessComponent.vue';
    import Class from '../../../api/v2/Class';
    import Course from '../../../api/v2/Course';
    import Option from '../../../api/v2/Option';
    import User from '../../../api/v2/User';
    import Level from '../../../api/v2/Level';
import { useRoute } from 'vue-router';



    const success = ref(false)
    const errors = ref([])
    const levels = ref([])
    const users = ref([])
    const options = ref([])
    const chosenCourses = ref([])
    const courses = ref([])
    const optionId = ref("")
    const userId = ref("")
    const levelId = ref("")
    const values = ref({})
    const route = useRoute()
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
    const fetchClass = async () =>{
        const result = await Class.get(route.params.id)
        console.log(result);
        if(result.success){

        }
    }
    onMounted(()=>{
        fetchClass()
        getOptions()
        getLevels()
        getCourses()
        fetchUsers()
    })
    </script>
    