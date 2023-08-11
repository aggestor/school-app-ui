import api from "."

export default {
    async create(data) {
        return await api.post("/type/create", data)
    },
    async update(data) {
        return await api.post("/type/update", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/type/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAllByExtension(extension) {
        return await api.get("/type/ext/"+extension)
    },
     async searchLinks(category, value) {
        return await api.post("/type/search-links", {category, term:value})
    },
     async searchLinks_(category, value) {
        return await api.post("/type/search-links", {category, term:value})
    },
}