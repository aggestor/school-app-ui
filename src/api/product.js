import api from "./index"

export default {
    /**
     * Creates a user using data from the form at the register page
     * @param {{[key:string]:string|number}} user  user informations 
     * @returns 
    */

    async create(data_) {
        const data = new FormData()
        data.append('category_name', data_.category_name)
        data.append('category_id', data_.category_id)
        data.append('description', data_.description)
        data.append('extension_id', data_.extension_id)
        data.append('extension_name', data_.extension_name)
        data.append('isBrandNew', data_.isBrandNew)
        data_.files.forEach((f, index) => {
            data.append("file-"+index,f)
        })
        data.append('keywords', data_.keywords)
        data.append('mark_id', data_.mark_id)
        data.append('mark_name', data_.mark_name)
        data.append('model_id', data_.model_id)
        data.append('model_name', data_.model_name)
        data.append('name', data_.name)
        data.append('prices', data_.prices)
        data.append('quantities', data_.quantities)
        data.append('scl_shop_id', data_.scl_shop_id)
        data.append('set_id', data_.set_id)
        data.append('set_name', data_.set_name)
        data.append('specs', data_.specs)
        data.append('type_id', data_.type_id)
        data.append('type_name', data_.type_name)
        
        return await api.post("/product/create", data)
    },
    /**
     * Creates a user using data from the form at the register page
     * @param {{[key:string]:string|number}} user  user informations 
     * @returns 
    */

    async update(data_) {
        const data = new FormData()
        data.append('category_name', data_.category_name)
        data.append('id', data_.id)
        data.append('category_id', data_.category_id)
        data.append('description', data_.description)
        data.append('extension_id', data_.extension_id)
        data.append('extension_name', data_.extension_name)
        data.append('isBrandNew', data_.isBrandNew)
        data.append('mark_id', data_.mark_id)
        data.append('mark_name', data_.mark_name)
        data.append('model_id', data_.model_id)
        data.append('model_name', data_.model_name)
        data.append('name', data_.name)
        data.append('prices', data_.prices)
        data.append('quantities', data_.quantities)
        data.append('scl_shop_id', data_.scl_shop_id)
        data.append('set_id', data_.set_id)
        data.append('set_name', data_.set_name)
        data.append('type_id', data_.type_id)
        data.append('type_name', data_.type_name)
        
        return await api.post("/product/update", data)
    },
    async create_(data_) {
        const data = new FormData()
        data.append('category_name', data_.category_name)
        data.append('category_id', data_.category_id)
        data.append('description', data_.description)
        data.append('extension_id', data_.extension_id)
        data.append('extension_name', data_.extension_name)
        data.append('isBrandNew', data_.isBrandNew)
        data_.files.forEach((f, index) => {
            data.append("file-"+index,f)
        })
        data.append('keywords', data_.keywords)
        data.append('mark_id', data_.mark_id)
        data.append('mark_name', data_.mark_name)
        data.append('model_id', data_.model_id)
        data.append('model_name', data_.model_name)
        data.append('name', data_.name)
        data.append('prices', data_.prices)
        data.append('quantities', data_.quantities)
        data.append('scl_shop_id', data_.scl_shop_id)
        data.append('set_id', data_.set_id)
        data.append('set_name', data_.set_name)
        data.append('specs', data_.specs)
        data.append('type_id', data_.type_id)
        data.append('type_name', data_.type_name)
        
        return await api.post("/owner/product/create", data)
    },
    async updateMedia(data_, shop_id) {
        const data = new FormData()
        data_.forEach((f, index) => {
            data.append("file-"+index,f)
        })
        data.append('id', shop_id)
        
        return await api.post("/product/update/media", data)
    },
    async updateKeywordsAndSpecs(data) {
        return await api.post("/product/update/keywords-and-specs", data)
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAll() {
        return await api.get("/product/all")
    },
    /**
     * Gets the profile of the current connected use
     * @returns 
     */
    async getAllSimple() {
        return await api.get("/product/all")
    },
    async trendingShowroomData() {
        return await api.get("/product/trending/showroom")
    },
    async showroomData() {
        return await api.get("/product/showroom")
    },
    async search(searchTerm) {
        return await api.get("/product/search/"+searchTerm)
    },
    async get(id) {
        return await api.get("/product/d/"+id)
    },
    async getData(id) {
        return await api.get("/product/d/"+id)
    },
    async changeStatus(status, id) {
        return await api.post("/product/change-status", {status,id})
    },
    async exportTo(branch, id) {
        return await api.post("/product/export-to", {branch,id})
    },
    async getByShop(id) {
        return await api.get('/product/shop/'+id)
    },
    async getByShopLimited(params) {
        return await api.get('/product/shop/limited/'+params)
    },
    async getShopOwner(id) {
        return await api.get('/product/owner/'+id)
    },
    async getUploader(id) {
        return await api.get('/product/get-uploader/'+id)
    },
    async addInteraction(type,id) {
        return await api.post('/product/add-interaction', {type,id})
    },
    async getAllByOrder(order = "newest") {
        return await api.get('/product/all/by-'+order)
    },
    async listFiltered(type, id){
        return await api.get('/products/filter/'+type+'/'+id)
    },
    async listAll(){
        return await api.get('/products/list')
    },
    async remove(id){
        return await api.post('/products/remove',{id})
    },
    async removeImage(name){
        return await api.post('/products/remove/media',{name})
    }
}