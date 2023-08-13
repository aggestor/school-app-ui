import { createRouter, createWebHistory } from "vue-router"
import userRoutes from "./user-routes"
import adminRoutes from "./admin-routes"
import publicRoutes from "./public-routes"
import configRoutes from "./config-routes"

const routes = [
    ...configRoutes,
    ...userRoutes,
    ...adminRoutes,
    ...publicRoutes,]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router