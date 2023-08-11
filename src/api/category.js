import api from "./index"

export default {
    async create(name) {
        return await api.post("/category/create", {name})
    },
    async update(data) {
        return await api.post("/category/update", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/category/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async showRoomData() {
        return await api.get("/category/showroom")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAllLittleDetailed() {
        return await api.get("/category/all/detailed")
    }
}