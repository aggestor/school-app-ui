import { createRouter, createWebHistory } from "vue-router"
import adminRoutes from "./admin-routes"
import configRoutes from "./config-routes"
import authRoutes from "./auth-routes"

const routes = [
    ...configRoutes,
    ...authRoutes,
    ...adminRoutes,]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router