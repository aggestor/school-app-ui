import api from ".."

const Course = {

    async create(data: Record<string, any>){
        return await api.post('/cours/create',data)
    },
    async get(id?:string){
        return await api.get(id?'/cours/'+id : '/cours')
    },
}

export default Course