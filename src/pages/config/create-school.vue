<template>
    <ReusableHeader title="Créer un compte client"/>
<div class="w-11/12 mx-auto flex justify-center items-center md:h-[650px]">
    <div v-if="showSuccessPanel" data-aos="slide-up" data-aos-duration="500" class="md:w-8/12 w-full overflow-hidden __shad flex md:flex-row flex-col justify-between items-center h-96 md:h-[60%] rounded-lg border">
        <div class="md:w-6/12 w-full h-[50%]  flex md:h-full bg-green-500 md:p-8 p-6  justify-center items-center flex-col" >
            <CheckCircleIcon class="w-20 h-20 text-white"/>
            <h1 class="font-semibold text-2xl text-white mt-3">Création éffectuée.</h1>
        </div>
        <div class="md:w-6/12 w-full h-[50%] flex items-center flex-col justify-center md:h-full">
            <span class="text-gray-800 text-center md:w-11/12 w-10/12">La création de votre compte a été éffectuée avec succès. Vous pouvez maintenant profitez de services de muyisphère en tant qu'utilisateur simple.</span>
            <!-- <span @click="continueToLogin" class="bg-green-500 shadow-green-300 shadow-lg px-2 py-1.5 mt-5 hover:bg-green-600 rounded text-white cursor-pointer text-lg">Continuer</span> -->
        </div>
    </div>
    <div v-else data-aos="slide-up" data-aos-duration="500" class="md:w-10/12 w-full flex justify-between items-center h-[90%] rounded-lg border">
        <div class="md:w-7/12 flex h-[85%] md:p-6 p-4  justify-center flex-col" >
            <h1 class="font-semibold text-2xl text-blue-600 mb-1">Créer un compte.</h1>
            <p class="text-gray-700 text-sm">Saisissez les informations demadées ci-bas pour créer un compte de vendeur ou d'acheteur sur notre plateforme. </p>
            <form class="h-full w-full flex flex-col">
                
            </form>
            <p class="mb-2 text-sm">En créant un compte, vous acceptez <router-link to="/term-of-use"><span class="text-blue-600">les conditions générales de vente</span></router-link>  de muyiSphere.</p>
            <div class="w-full items-center my-3 flex  justify-between">
                <ButtonLink text="Se connecter" path="/login" variant="default"/>
                <BlueButtons @press="onPressRegister">
                    Enregistrer <CheckCircleIcon class="w-5 h-5 ml-1"/>
                </BlueButtons>
            </div>
        </div>
        <div class="w-5/12 md:flex hidden items-center justify-center h-full">
            <img src="/images/create-school.jpg" alt="Register image illustration" class="h-[430px] w-[430px] object-cover">
        </div>
    </div>
</div>
  
</template>

<script setup>
import { ref } from 'vue';
import ButtonLink from '../../components/ButtonLink.vue';
import BlueButtons from '../../components/v2/BlueButtons.vue';

const showSuccessPanel = ref(false)
const handleChange = (e) =>{}
</script>
