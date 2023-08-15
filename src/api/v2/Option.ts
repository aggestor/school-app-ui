import api from ".."

const Option = {

    async create(data: Record<string, any>){
        return await api.post('/option/create',data)
    },
    async get(id?:string){
        return await api.get(id?'/option/'+id : '/option')
    },
}

export default Option