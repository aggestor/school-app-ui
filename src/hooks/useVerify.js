import { onMounted, ref } from "vue"
import {useRouter, useRoute } from "vue-router"
import auth from "../api/auth"


export default function useVerify(userType = 'admin') {
    const router = useRouter()
    const route = useRoute()
    onMounted(async() => {
        const result = await auth.verify(userType)
        if (result.type === "auth" && result.auth === true) {
            localStorage.setItem(userType === "admin" ? 'admin': 'logged_in_user',JSON.stringify(result))
        } else {
            localStorage.clear()
            switch (userType) {
                case "manager":
                    router.push("/login?continue="+route.fullPath)
                    break
                case "owner":
                    router.push("/login?continue="+route.fullPath)
                    break
                default:
                    router.push("/admin/login?continue="+route.fullPath)
                    break;
            }
        }
    })
}