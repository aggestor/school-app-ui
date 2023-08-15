import api from ".."

const Class = {

    async create(data: Record<string, any>){
        return await api.post('/classe/create',data)
    },
    async get(id?:string){
        return await api.get(id?'/classe/'+id : '/classe')
    },
}

export default Class