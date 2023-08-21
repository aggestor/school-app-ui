import api from ".."

const Inscription = {

    async subscribe(classe_id,eleve_id){
        return await api.post('/inscription/create',{classe_id,eleve_id})
    },
    async update(id:string,data: Record<string, any>){
        return await api.put('/inscription/edit/'+id,data)
    },
    async get(id?:string){
        return await api.get(id?'/inscription/'+id : '/inscription')
    },
    async search(term:string){
        return await api.get('/inscription/identite/'+term )
    },
}

export default Inscription