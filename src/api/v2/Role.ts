import api from ".."

const Config = {

    async verify(type) {
        return  await api.post('/auth/verify',{type})
    },
    async resetPassword(email: string){
        return await api.post('/auth/reset-password',{email})
    },
    async addRole(name){
        return await api.post('/role/create',{name})
    },
    async create(data:Record<string,any>){
        return await api.post('/role/create',data)
    },
    async update(data: Record<string,any>, id: string){
        return await api.put('/role/edit/'+id,data)
    },
    async get(id?:string){
        return await api.get(id?'/role/'+id : '/role')
    },
    async addSchool(data: Record<string,any>){
        return await api.post('/ecole/create',data, true)
    },


}

export default Config