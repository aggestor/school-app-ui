import api from ".."

const Student = {

    async create(data: Record<string, any>){
        return await api.post('/eleve/create',data)
    },
    async update(id:string,data: Record<string, any>){
        return await api.put('/eleve/edit/'+id,data)
    },
    async get(id?:string){
        return await api.get(id?'/eleve/'+id : '/eleve')
    },
    async search(term:string){
        return await api.get('/eleve/identite/'+term )
    },
}

export default Student