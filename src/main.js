import { createApp, createSSRApp } from 'vue'
import './style.css'
import "aos/dist/aos.css"
import App from './App.vue'
import router from "./router"
import AOS from "aos"
import Vue3TouchEvents from "vue3-touch-events"

import Default from "./layouts/Default.vue"
import Blank from "./layouts/Blank.vue"
import Owner from "./layouts/Owner.vue"
import Admin from "./layouts/Admin.vue"
import Splash from "./layouts/Splash.vue"
import Teacher from "./layouts/Teacher.vue"
import { createPinia } from 'pinia'

const isSSR = typeof window === 'undefined';
const app = (isSSR ? createSSRApp(App) : createApp(App))
const pinia = createPinia()

app.component("default-layout", Default)
app.component("blank-layout", Blank)
app.component("admin-layout", Admin)
app.component("owner-layout", Owner)
app.component("splash-layout", Splash)
app.component("teacher-layout", Teacher)
app.use(pinia)
app.use(AOS.init())
app.use(Vue3TouchEvents)
app.use(router).mount('#app')
