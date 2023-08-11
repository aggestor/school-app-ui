import api from "./index"

export default {
    /**
     * Creates a specific slider using data send within the object data_
     * @param {Record<string, any>} data_ 
     * @returns  Server response
     */
    async create(data_) {
        const data = new FormData();
         data.append('name', data_.name)
        data.append('duration', data_.duration)
        data.append('shop', data_.shop)
        data.append('youtube', data_.youtube)
        data.append('date', data_.date)
        data.append('image', data_.image)
        return await api.post("/slider/create", data)
    },
    /**Updates a specific slider using data send within the object data_
     * 
     * @param {Record<string, any>} data_ 
     * @returns  Server response
     */
    async update(data_) {
         const data = new FormData();
         data.append('name', data_.name)
        data.append('duration', data_.duration)
        data.append('shop', data_.shop)
        data.append('youtube', data_.youtube)
        data.append('date', data_.date)
        data.append('id', data_.id)
        data.append('image', data_.image)
        data.append('old_image', data_.oldImage)
        return await api.post("/slider/update", data)
    },
    /**
     * Gets all the sliders paginated if needed or just in plain array
     * @returns 
     */
    async getAll() {
        return await api.get("/slider/all")
    },
    /**
     * Gets all the sliders paginated if needed or just in plain array
     * @returns 
     */
    async getChecked() {
        return await api.get("/slider/checked")
    },
    /**
     * Gets a specific carrousel based on the given id
     * @returns 
     */
    async get(id) {
        return await api.get("/slider/d/"+id)
    },
     async searchLinks(category, value) {
        return await api.post("/slider/search-links", {category, term:value})
    },
}