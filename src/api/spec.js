import api from "./index"

export default {
    async create(data) {
        return await api.post("/spec/create", data)
    },
    async update(data) {
        return await api.post("/spec/update", data)
    },
    async updateDetail(data) {
        return await api.post("/spec/detail/update", data)
    },
    async deleteDetail(id) {
        return await api.post("/spec/detail/delete", {id})
    },
    /**
     * 
     * @param {*} data 
     * @returns 
     */
    async createDetail(data) {
        return await api.post("/spec/d/create", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/spec/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getDetailsBySpec(id) {
        return await api.get("/spec/d/all/"+id)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getByType(id) {
        return await api.get("/spec/d/type/"+id)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async get(id) {
        return await api.get("/spec/g/"+id)
    }
}