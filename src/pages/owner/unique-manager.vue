<template>
    <ReusableHeader keywords="owner" description="profile" title="Profile du proprietaire"/>
    
    <div class="w-[95%] h-[400px]  mx-auto">
        <div class="w-full flex justify-between items-end pb-2 border-b h-16">
            <h1 class="text-lg text-gray-700 flex font-semibold"> <GoBackAdminButton/> <span class="ml-2">Information sur profile</span></h1>
            <span class="flex w-fit items-center">
                <router-link :to="'/owner/managers/'+manager.id+'/update'">
                    <span class="bg-blue-600 flex justify-evenly w-fit items-center p-1 rounded mr-1 text-white"> Modifier <PencilIcon class="w-4 h-4"/></span>
                </router-link>
            </span>
        </div>
        <div class="w-full flex pt-20">
            <div class="w-[30%] h-full ">
                <div class="w-64 h-64 rounded-lg overflow-hidden border">
                    <img :src="picture" class="h-full w-full object-cover" alt="">
                </div>
            </div>
            <div class="w-[70%] h-full flex justify-between">
                <div class="w-1/2 p-3 border-r h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{manager.name}}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{manager.email }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{manager.phone }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{manager.location }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Addresse</span><span>{{manager.address }}</span></div>
                </div>
                <div class="w-1/2 p-3  h-64 flex flex-col justify-between">
                    <div class="flex justify-between "><span class="font-semibold">Type</span><span class="text-indigo-500 font-semibold">{{manager.type }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Actif ?</span><span class="text-green-500 flex items-center font-semibold"><CheckCircleIcon class="h-5 w-5"/></span></div>
                    <div class="flex justify-between "><span class="font-semibold">Verifié ?</span><span class="text-red-500 flex items-center font-semibold"><NoSymbolIcon class="h-5 w-5"/></span></div>
                    <div class="flex justify-between "><span class="font-semibold">A réjoin le</span><span>{{moment(manager.created_at).format('ll') }}</span></div>
                    <div class="flex justify-between "><span class="font-semibold">Moddif.</span><span> {{moment(manager.last_update).fromNow(true) }}</span></div>
                </div>
            </div>
        </div>
        <div class="w-full flex mt-10 border-t">
                <div class="w-[62.5%] py-2">
                    <span class="text-gray-800 text-lg  font-semibold">Information sur la branche qu'il gère</span>
                    <div class="w-full p-3 border-r h-48 flex flex-col justify-between">
                        <div class="flex justify-between "><span class="font-semibold">Noms</span><span>{{manager.branch_name }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Email</span><span>{{manager.email }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Téléphone</span><span>{{manager.branch_contact }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Ville</span><span>{{manager.location }}</span></div>
                        <div class="flex justify-between "><span class="font-semibold">Addresse</span><span>{{ manager.address }}</span></div>
                    </div>
                </div>
                <div class="w-[37.5%] py-2">
                    <div class="w-full p-3  h-48 grid place-items-center">
                       <div class="w-9/12 flex flex-col h-fit items-center text-center"> 
                        <span class=" text-sm">Plus d'information sur cette branche ? Clique sur le bouton ci-bas.</span>
                         <router-link :to="'/owner/branches/'+manager.branch_id">
                            <span class="bg-blue-600 flex justify-evenly mt-2 w-fit items-center p-1 rounded mr-2 text-white"> {{manager.branch_name }} <LinkIcon class="w-4 ml-1 h-4"/></span>
                        </router-link>
                    </div>
                    </div>
                </div>
        </div>
    </div>
</template>
<script>
import { CheckCircleIcon, LinkIcon, NoSymbolIcon, PencilIcon } from '@heroicons/vue/24/outline';
import { defineComponent,ref,onMounted } from 'vue';
import GoBackAdminButton from '../../components/GoBackAdminButton.vue';
import ReusableHeader from '../../components/ReusableHeader.vue';
import User from "../../api/user"
import useVerify from '../../hooks/useVerify';
import moment from 'moment';
import prettyString from '../../helpers/pretty-string';
import { useRoute } from 'vue-router';
import { store } from '../../api';

export default defineComponent({
    setup() {
        useVerify('owner')
        const manager = ref({})
        const picture = ref("")
        const getManager = async (id) =>{
            const result = await User.getManager(id)
            if(result.type === "success"){
                manager.value = result.data
                picture.value = result.data.picture === "placeholder.jpg" ? '/images/placeholder.jpg': store+'/users/'+result.data.picture
            };
        }
        const route = useRoute()
        onMounted(()=>{
            getManager(route.params.id)
        })

        return {manager,moment,prettyString, picture}
    },
        components: { ReusableHeader, PencilIcon, GoBackAdminButton, CheckCircleIcon, NoSymbolIcon, LinkIcon }
    })
</script>