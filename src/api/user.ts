import api from "./index"

export default {
    /**
     * Login the user using his identifier and password
     * @param {string} identifier  data to identify user's existence 
     * @param {string} password  user's password
     * @returns 
     */
    async login(identifier: string, password : string) {
        return await api.post("/login",{identifier, password})
    },
    /**
     * Creates a user using data from the form at the register page
     * @param {{[key:string]:string|number}} user  user informations 
     * @returns 
     */
    async register(user) {
        return await api.post("/register", user)
    },
    /**
     * Creates a user using data from the form at the register page
     * @param {{[key:string]:string|number}} user  user informations 
     * @returns 
     */
    async update(user) {
        const data = new FormData();
        data.append("name", user.name)
        data.append("email", user.email)
        data.append("address", user.address)
        data.append("id", user.id)
        data.append("phone", user.phone)
        data.append("image", user.image)
        data.append("oldImage", user.oldImage)
        return await api.post("/user/update", data as any)
    },
    async updatePassword(data){
        return await api.post("/user/update/password",data)
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
     * For now it gets all the users from the api
     * @returns 
     */
    async getAll() {
        return await api.get("/users/all")
    },
    /**
     * For now it gets all the users from the api
     * @returns 
     */
    async getManager(id) {
        return await api.get("/owner/managers/get-one/"+id)
    },
    /**
     * For now it gets all the users from the api
     * @param {string} id the id of the user to look for
     * @returns 
     */
    async getUser(id) {
        return await api.get("/users/g/"+id)
    },
    /**
     * For now it gets all the users from the api
     * @param {string} id the id of the user to look for
     * @returns 
     */
    async getShopAndBranches(id) {
        return await api.get("/user/get/branches-or-shop/"+id)
    },
    /**
     * For now it gets all the users from the api
     * @param {string} id the id of the user to look for
     * @returns 
     */
    async get(id) {
        return await api.get("/owner/users/g/"+id)
    },
    /**
     * Search a user based on the given term
     * @param {string} id the id of the user to look for
     * @returns 
     */
    async search(term) {
        return await api.get("/users/search/"+term)
    },
    async remove(id) {
        return await api.post("/user/remove",{id})
    },
    /**
     * Search a user based on the given term
     * @param {string} id the id of the user to look for
     * @returns 
     */
    async _search(term) {
        return await api.get("/owner/search-user/"+term)
    },
    /**
     * Assigns a user to a specific shop
     * @param {string} data user and shop
     * @returns 
     */
    async assignOwnerToShop(data) {
        return await api.post("/users/assign-to-shop",data)
    },
    /**
     * Assigns a user to a specific shop
     * @param {Record<string, any>} data user and shop
     * @returns 
     */
    async assignManagerToBranch_(data) {
        return await api.post("/owner/assign-to-branch",data)
    },
    /**
     * Assigns a user to a specific branch
     * @param {string} data user and shop
     * @returns 
     */
    async assignManagerToBranch(data) {
        return await api.post("/users/assign-to-branch",data)
    }
}