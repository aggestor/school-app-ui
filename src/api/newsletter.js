import api from "./index"

export default {
    /**
     * Makes a user part of list of our newsletter
     * @param {string} email  subscribes a user to our newsletter
     * @returns 
     */
    async subscribe(email) {
        return await api.post("/newsletter/subscribe",{email})
    },
    /**
     * Gets all the subscribed mail to our newsletter
     * @returns 
     */
    async getAll() {
        return await api.get("/newsletter/all")
    }
}