import api from "./index"

export default {
    async create(data) {
        return await api.post("/model/create", data)
    },
    async update(data) {
        return await api.post("/model/update", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/model/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAllByCategory(category) {
        return await api.get("/model/by/category/"+category)
    },
    
}