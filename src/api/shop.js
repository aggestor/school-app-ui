import api from "./index"

export default {
    /**
     * Creates a user using data from the form at the register page
     * @param {{[key:string]:string|number}} user  user informations 
     * @returns 
     */
    async create(data_) {
        const data = new FormData()
        data.append('name', data_.name)
        data.append('town', data_.town)
        data.append('town_name', data_.location)
        data.append('image', data_.image)
        data.append('level', data_.level)
        data.append('whatsapp', data_.whatsApp)
        data.append('contact', data_.contact)
        data.append('address', data_.address)
        data.append('categories', data_.categories)
        
        return await api.post("/shop/create", data)
    },
    /**
     * Updates a shop using some data given by the client
     * @param {{[key:string]:string|number}} _data  shop's informations 
     * @returns 
     */
    async update(data_) {
        const data = new FormData()
        data.append('name', data_.name)
        data.append('id', data_.id)
        data.append('town', data_.town)
        data.append('town_name', data_.location)
        data.append('image', data_.image)
        data.append('old_image', data_.oldImage)
        data.append('level', data_.level)
        data.append('whatsapp', data_.whatsApp)
        data.append('contact', data_.contact)
        data.append('address', data_.address)
        data.append('categories', data_.categories)
        
        return await api.post("/shop/update", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/shop/all")
    },
    async showroom() {
        return await api.get("/shop/showroom")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async updateCategorization(shop,categories) {
        return await api.post("/shop/update/categories",{shop,categories})
    },
    async search(searchTerm) {
        return await api.get("/shop/search/"+searchTerm)
    },
    async get(id) {
        return await api.get("/shop/d/"+id)
    },
    async getByOwner(id) {
        return await api.get("/owner/shop/d/"+id)
    },
    async getUsingOwner(id) {
        return await api.get("/owner/shop/owner/"+id)
    },
    async getManagers(id) {
        return await api.get("/owner/managers/"+id)
    },
    async changeStatus(data) {
        return await api.post("/shop/update/status",data)
    }
}