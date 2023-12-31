import { createRouter, createWebHistory } from "vue-router"
import adminRoutes from "./admin-routes"
import configRoutes from "./config-routes"
import authRoutes from "./auth-routes"
import classTeacher from "./class-teacher"
import studentRoutes from "./student-routes"

const routes = [
    ...studentRoutes,
    ...configRoutes,
    ...classTeacher,
    ...authRoutes,
    ...adminRoutes,]


const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router