import api from "./index"

const Branch =  {
    /**
     * Creates a specific branch on a shop
     * @param {{[key:string]:string|number}} data_  user informations 
     * @returns 
     */
    async create(data_) {
        const data = new FormData()
        data.append('name', data_.name)
        data.append('town', data_.town)
        data.append('image', data_.image)
        data.append('shop', data_.shop_id)
        data.append('owner', data_.owner)
        data.append('whatsapp', data_.whatsApp)
        data.append('contact', data_.contact)
        data.append('address', data_.address)
        return await api.post("/branch/create", data)
    },
    /**
     * Updates branch information
     * @param {{[key:string]:string|number}} data_  shop information 
     * @returns 
     */
    async update(data_) {
        const data = new FormData()
        data.append('name', data_.name)
        data.append('town', data_.town)
        data.append('image', data_.image)
        data.append('old_image', data_.oldImage)
        data.append('id', data_.id)
        data.append('whatsapp', data_.whatsApp)
        data.append('contact', data_.contact)
        data.append('address', data_.address)
        return await api.post("/branch/update", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/branch/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async get(id) {
        return await api.get("/branch/d/"+id)
    },
    async remove(id) {
        return await api.post("/branch/remove",{id})
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async _get(id) {
        return await api.get("/owner/branch/"+id)
    },
    /**
     * Gets specific branches using a shop id
     * @param {string} id the id of the shop to find with 
     * @returns 
     */
    async getForShop(id) {
      return await api.get('/branch/sh/'+id)  
    },
    /**
     * Gets specific branches using a shop id
     * @param {string} id the id of the shop to find with 
     * @returns 
     */
    async getByOwner(id) {
      return await api.get('/branch/by-owner/'+id)  
    },
    async search(searchTerm) {
        return await api.get("/branch/search/"+searchTerm)
    }
}

export default Branch