import api from "."

export default {
    async verify(type) {
        return  await api.post('/auth/verify',{type})
    }
}