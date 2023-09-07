<template>
    <ReusableHeader title="Connexion du client"/>
<div class="w-11/12 mx-auto flex justify-center items-center md:h-[500px]">
    <div data-aos="slide-up" data-aos-duration="500" class="lg:w-8/12 md:11/12 w-full md:mb-0 mb-3 flex justify-between items-center h-[75%] rounded-lg border">
        <div  class="md:w-1/2 w-full  flex h-[75%] p-8  justify-center flex-col" >
            <h1 class="font-semibold text-2xl text-blue-500 mb-3">Password Reset</h1>
            <p>Enter your registered email in the field below and send the reset link to that email, then we will proceed to the reset.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="email" label="E-mail" :value="email"  placeholder="Your registered Email" :err="errors.identifier"/>
            </form>
            <div class="w-full items-center md:my-3 mt-4 flex justify-between">
                <ButtonLink text="Login" path="/login" variant="default"/>
               <BlueButtons @press="onPressSend">
                Send reset link <PaperAirplaneIcon class="w-5 h-5 ml-1"/>
               </BlueButtons>
            </div>
        </div>
        <div class="w-1/2 hidden md:flex items-center justify-center h-full">
            <img src="../../assets/images/login.jpg" alt="Login image illustration" class="h-72 w-72 object-cover">
        </div>
    </div>
</div>
  
</template>

<script setup>

import TextBox from "../../components/TextBox.vue"
import ButtonLink from "../../components/ButtonLink.vue";
import Auth from "../../api/v2/Auth";
import ReusableHeader from "../../components/ReusableHeader.vue";
import BlueButtons from "../../components/v2/BlueButtons.vue"
import { ref } from "vue";
import { PaperAirplaneIcon } from "@heroicons/vue/24/outline";

const email = ref("")
const errors = ref({})
const handleInput = (e) =>{

}
const onPressSend  = async () =>{
    const result = await Auth.resetPassword(email)
}
</script>
