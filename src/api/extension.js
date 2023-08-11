import api from "./index"

export default {
    async create(data) {
        return await api.post("/extension/create", data)
    },
    async update(data) {
        return await api.post("/extension/update", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/extension/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAllByCategory(category) {
        return await api.get("/extension/by/category/"+category)
    },
    
}