import { defineStore } from "pinia"

export const useSetting = defineStore({
    id: "setting",
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