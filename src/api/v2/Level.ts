import api from ".."

const Level = {

    async verify(type) {
        return  await api.post('/auth/verify',{type})
    },
    async resetPassword(email: string){
        return await api.post('/auth/reset-password',{email})
    },
    async create(data: Record<string, any>){
        return await api.post('/niveau/create',data)
    },
    async get(id?:string){
        return await api.get(id?'/role/'+id : '/role')
    },
    async addSchool(data: Record<string,any>){
        return await api.post('/ecole/create',data, true)
    },


}

export default Level