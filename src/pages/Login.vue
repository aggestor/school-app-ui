<template>
    <ReusableHeader title="Login to your account !"/>
<div class="w-11/12 mx-auto flex justify-center items-center md:h-[600px]">
    <div data-aos="slide-up" data-aos-duration="500" class="lg:w-8/12 md:11/12 w-full md:mb-0 mb-3 flex justify-between items-center h-[75%] rounded-lg border">
        <div  class="md:w-1/2 w-full  flex h-[90%] p-8  justify-center flex-col" >
            <h1 class="font-semibold text-2xl text-blue-600 mb-3">Login to your account</h1>
            <form class="h-fit w-full flex flex-col">
                <TextBox  :onChange="handleInput" type="text" name="identifier" label="E-mail" :value="identifier"  placeholder="Your Email" :err="errors.identifier"/>
                <TextBox  :onChange="handleInput" type="password" name="password" label="Password" :value="password" placeholder="Your password" :err="errors.password"/>
            </form>
            <p class="text-sm my-2">{{languages.PAGES.LOGIN.RESET_PWD_TXT }} <router-link to="/reset-password" class="text-blue-600">{{languages.PAGES.LOGIN.RESET_PWD_LINK_TXT }}</router-link></p>
            <div class="w-full items-center md:my-3 mt-4 flex justify-between">
                <ButtonLink text="Create an account" path="/register" variant="default"/>
                <BlueButtons @press="onPressLogin">
                    {{languages.PAGES.LOGIN.LOGIN_BTN }} &rarr;
                </BlueButtons>
            </div>
        </div>
        <div class="w-1/2 hidden md:flex items-center justify-center h-full">
            <img src="../assets/images/login.jpg" alt="Login image illustration" class="h-96 w-96 object-cover">
        </div>
    </div>
</div>
  
</template>

<script>

import TextBox from "../components/TextBox.vue"
import ButtonLink from "../components/ButtonLink.vue";
import user from "../api/user";
import useIsLoggedIn from "../hooks/use-is-logged-in"
import ReusableHeader from "../components/ReusableHeader.vue";
import BlueButtons from "../components/v2/BlueButtons.vue";
import languages from "../languages"

export default {
    components: {
    TextBox,
    ButtonLink,
    ReusableHeader,
    BlueButtons
},
    data() {
        return {
            identifier: "",
            password: '',
            errors:{}
        }
    },
    mounted() {
        const data = useIsLoggedIn()
        console.log(data)
    },
    setup(){
       
        return console.log('test'),{languages}
    },
    methods: {
        handleInput(e) {
             const target = e.target.name
            this[target] = e.target.value
        },
        async onPressLogin() {
            const result = await user.login(this.identifier, this.password)
            if (result.type === "error") {
                this.errors = result.data;
            } else if(result.type === 'success') {
                localStorage.setItem("logged_in_user",JSON.stringify(result))
                localStorage.setItem("logged_in_type", result.data.type)
                this.redirectMe(result.data.type.toLowerCase())
            }
        },
        redirectMe(type) {
            if (type === 'normal') {
                this.$router.push("/dashboard")
            } else if (type === 'owner') {
                this.$router.push("/owner/dashboard")
            }
        }
    }

}
</script>
