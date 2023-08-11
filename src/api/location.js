import api from ".";


export default {
    /**
     * 
     * @returns {Axios.Response} 
     */
    create(name,country) {
        return api.post("/location/create",{name,country})
    },
    /**
     * 
     * @returns {Axios.Response} 
     */
    update(data) {
        return api.post("/location/update",data)
    },
    /**
     * 
     * @returns {Axios.Response} 
     */
    getAll() {
        return api.get("/location/all")
    },
    /**
     * Gets a specific location
     * @returns {Axios.Response} 
     */
    get(id) {
        return api.get("/location/get/"+id)
    }
}