import api from "./index"

export default {
    async create(data) {
        return await api.post("/mark/create", data)
    },
    /**
     * Updates a specific mark using given data
     * @param {Record<string, any>} data data to update with
     * @returns server response
     */
    async update(data) {
        return await api.post("/mark/update", data)
    },
    /**
     * Updates a specific mark using given data
     * @param {Record<string, any>} data data to update with
     * @returns server response
     */
    async appendCategories(data) {
        return await api.post("/mark/append-categories", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/mark/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async get(id) {
        return await api.get("/mark/g/"+id)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getCategories(id) {
        return await api.get("/mark/g/categories/"+id)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAllByModel(model) {
        return await api.get("/mark/g/mod/"+model)
    },
}