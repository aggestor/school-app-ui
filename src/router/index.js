import { createRouter, createWebHistory } from "vue-router"
import ownerRoutes from "./owner-routes"
import userRoutes from "./user-routes"
import adminRoutes from "./admin-routes"
import publicRoutes from "./public-routes"

const routes = [
    ...ownerRoutes,
    ...userRoutes,
    ...adminRoutes,
    ...publicRoutes,]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router