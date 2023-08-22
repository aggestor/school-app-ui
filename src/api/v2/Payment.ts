import api from ".."

const Payment = {

    async subscribe(classe_id,eleve_id){
        return await api.post('/frais/create',{classe_id,eleve_id})
    },
    async update(id:string,data: Record<string, any>){
        return await api.put('/frais/edit/'+id,data)
    },
    async get(id?:string){
        return await api.get(id?'/frais/'+id : '/frais')
    },
    async search(term:string){
        return await api.get('/frais/identite/'+term )
    },
}

export default Payment