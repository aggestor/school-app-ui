<template>
    <ReusableHeader title="Setting new password"/>
<div class="w-11/12 mx-auto flex justify-center items-center md:h-[500px]">
    <div data-aos="slide-up" data-aos-duration="500" class="lg:w-8/12 md:11/12 w-full md:mb-0 mb-3 flex justify-between items-center h-[75%] rounded-lg border">
        <div  class="md:w-1/2 w-full  flex h-[75%] p-8  justify-center flex-col" >
            <h1 class="font-semibold text-2xl text-blue-500 mb-3">Setting new password</h1>
            <p>Hello, your E-mail has been authenticated. You can now set your new password or continue to the website.</p>
            <form class="h-full w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="newPassword" label="New password" :value="newPassword"  placeholder="Enter new password" :err="errors.newPassword"/>
                <TextBox  :onChange="handleInput" type="password" name="repeatPassword" label="Repeat password" :value="repeatPassword"  placeholder="Re-Enter the new password" :err="errors.repeatPassword"/>
            </form>
            <div class="w-full items-center md:my-3 justify-between mt-4 flex ">
                <BlueButtons @press="onPressSend">
                    Save new password <CheckCircleIcon class="w-5 h-5 ml-1"/>
                </BlueButtons>
                <ButtonLink text="Go to profile" path="/profile" variant="default"/>
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
import { CheckCircleIcon, PaperAirplaneIcon } from "@heroicons/vue/24/outline";

const email = ref("")
const uuid = ref("")
const id = ref("")
const newPassword = ref("")
const repeatPassword = ref("")
const errors = ref({})
const handleInput = (e) =>{

}
const onPressSend  = async () =>{
    const result = await Auth.setNewPassword(email)
}
</script>
