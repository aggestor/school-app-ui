import axios from "axios"

axios.defaults.withCredentials = true
const baseURL = import.meta.env.DEV ?  "http://muyiphere.localhost/api" : 'https://server.muyisphere.com/api'
const clientServer = window.location.origin
export const store = import.meta.env.DEV ? "http://muyiphere.localhost/storage" : 'https://server.muyisphere.com/storage'
const headers = { "X-Access-Server-Token": "Bysle98tpe0jlwk023lwkeg89j23094n4n0fjslk0", "Access-Control-Allow-Origin": "*", 'Client-Server':clientServer}

const instance = axios.create({baseURL,headers})
export default {
    /**
     * Gets data from the api using GET HTTP Method
     * @param {string} path endpoint on the server
     * @returns {Promise<AxiosResponse.data}
     */
    async get(path) {
        try {
            const response = await instance.get(path)
            return response.data
        } catch (e) {
            return {type:'error', message : "There was an issue on our server"}
        }
    },
    /**
     * Gets data from the api using POST HTTP Method
     * @param {string} path endpoint on the server
     * @param {Record<string, string|number|symbol>} body Request Body
     * @@returns {Promise<AxiosResponse.data}
     */
    async post(path, body = {}, binary = false) {
        try {
            if (binary) {
                const response = await instance.post(path, body, {headers:{"Content-Type":"multipart/form-data"}})
                return response.data
            } else {
                 const response = await instance.post(path, body)
                return response.data
            }
        }catch (e) {
            return {type:'error', message : "There was an issue on our server"}
        }
    }
}