import api from ".."

const Year = {

    async create(data: Record<string, any>){
        return await api.post('/year/create',data)
    },
    async update(data: Record<string, any>, id){
        return await api.put('/year/edit/'+id,data)
    },
    async get(id?:string){
        return await api.get(id?'/year/'+id : '/year')
    },
}

export default Year