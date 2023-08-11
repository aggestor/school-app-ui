import api from "./index"

export default {
    /**
     * Login the user using his identifier and password
     * @param {string} email  data to identify user's existence 
     * @param {string} password  user's password
     * @returns 
     */
    async login(email, password) {
        return await api.post("/admin/login",{email, password})
    },
    async register(user) {
        return await api.post("/admin/register", user)
    },
    async update(user) {
        return await api.post("/admin/update", user)
    },
    async get(user) {
        return await api.get("/admin/get/"+user)
    },
    /**
     * Gets user information
     * @param {{[key:string]:string|number}} user  user informations 
     * @returns 
     */
    async getAdmin(admin) {
        return await api.get("/owner/get-admin-uploader/"+admin)
    },
    /**
     * Logs out the user
     * @returns 
     */
    async logout() {
        return await api.get("/logout")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async profile() {
        return await api.get("/profile")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/admin/all")
    }
}