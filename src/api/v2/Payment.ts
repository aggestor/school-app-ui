import api from ".."

const Payment = {

    async pay(data : Record<string, any>){
        return await api.post('/frais/create',data)
    },
    async update(id:string,data: Record<string, any>){
        return await api.put('/frais/edit/'+id,data)
    },
    async get(type?:string,id?:string){
        return await api.patch(id?'/frais/'+id : '/frais/eleve/'+type)
    },
    async search(term:string){
        return await api.get('/frais/identite/'+term )
    },
}

export default Payment