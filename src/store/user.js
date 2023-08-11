import { defineStore } from "pinia"

export const useUserStore = defineStore({
    id: "user",
    state: () => {
        return {
            data: {},
            isLoggedIn:false
        }
    },
    actions: {
        reset() {
            this.data = {}
            this.isLoggedIn = false
        },
        setData(d) {
            this.data = d
        },
        setBool(b) {
            this.isLoggedIn = b
        }
    }
})