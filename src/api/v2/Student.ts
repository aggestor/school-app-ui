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
    async getData(id?:string){
        return await api.get(id?'/eleve/releve/'+id : '/eleve/releve')
    },
    async search(term:string){
        return await api.get('/eleve/identite/'+term )
    },
    async searchSubscribed(term:string){
        return await api.get('/eleve/matricule/'+term )
    },
}

export default Student