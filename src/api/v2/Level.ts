import api from ".."

const Level = {

    async verify(type) {
        return  await api.post('/auth/verify',{type})
    },
    async update(data: Record<string,any>, id:string){
        return await api.put('/niveau/edit/'+id,data)
    },
    async create(data: Record<string, any>){
        return await api.post('/niveau/create',data)
    },
    async get(id?:string){
        return await api.get(id?'/niveau/'+id : '/niveau')
    },
    async remove(id:string){
        return await api.delete('/niveau/delete/'+id)
    },


}

export default Level