import api from ".."

const Class = {

    async create(data: Record<string, any>){
        return await api.post('/classe/create',data)
    },
    async update(id:string,data: Record<string, any>){
        return await api.put('/classe/edit/'+id,data)
    },
    async get(id?:string){
        return await api.get(id?'/classe/'+id : '/classe')
    },
    async getStudents(){
        return await api.post('/classe/eleve')
    },
    async remove(id:string){
        return await api.delete('/classe/delete/'+id)
    },
}

export default Class