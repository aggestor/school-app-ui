import api from ".."

const User = {

    async create(data: Record<string, any>){
        return await api.post('/user/create',data)
    },
    async update(data: Record<string, any>, id){
        return await api.put('/user/edit/'+id,data)
    },
    async get(id?:string){
        return await api.get(id?'/user/'+id : '/user')
    },
}

export default User