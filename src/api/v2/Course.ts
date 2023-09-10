import api from ".."

const Course = {

    async create(data: Record<string, any>){
        return await api.post('/cours/create',data)
    },
    async update(data: Record<string, any>,id:string){
        return await api.put('/cours/edit/'+id,data)
    },
    async remove(id:string){
        return await api.delete('/cours/delete/'+id)
    },
    async get(id?:string){
        return await api.get(id?'/cours/'+id : '/cours')
    },
    async getByTeacher(){
        return await api.patch('/cours/classe/cours')
    },
    async getByStudent(id:string){
        return await api.get('/cours/classe/'+id)
    },
    async getByStudentWithAuth(id:string){
        return await api.patch('/cours/classe/eleve')
    },
}

export default Course