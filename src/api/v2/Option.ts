import api from ".."

const Option = {

    async create(data: Record<string, any>){
        return await api.post('/option/create',data)
    },
    async update(data: Record<string, any>, id){
        return await api.put('/option/edit/'+id,data)
    },
    async remove(id:string){
        return await api.delete('/option/delete/'+id)
    },
    async get(id?:string){
        return await api.get(id?'/option/'+id : '/option')
    },
}

export default Option