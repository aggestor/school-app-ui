import api from "."

const Telemetry  = {
    /**
     * Gets statistics of the owner using his shop
     * @param {string} id The id of the owner shop
     * @returns 
     */
    async ownerStats(id:string){
        return await api.get('/telemetry/owner-stats/shop-'+id)
    }
}


export default Telemetry