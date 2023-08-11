import api from "./index"

export default {
    /**
     * Creates f a specific set
     * @param {Record<string, any>} data  data to create the set
     * @returns server response
     */
    async create(data) {
        return await api.post("/set/create", data)
    },
    /**
     * Updates data of a specific data when for eg some misclassification of typo
     * @param {Record<string, any>} data  data to update the given set
     * @returns server response
     */
    async update(data) {
        return await api.post("/set/update", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/set/all")
    },
     /**
     * Gets the profile of the current connected use
     * @returns 
     */
     async getAllByModel(model) {
        return await api.get("/set/mod/"+model)
    },
    
    async searchLinks(shop, value) {
        return await api.post("/set/search-links", {shop, searchTerm:value})
    },
    async searchLinks_(shop, value) {
        return await api.post("/set/search-links", {shop, searchTerm:value})
    },
}