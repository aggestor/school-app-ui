import api from ".."

const Rating = {

    async rate(data : Record<string, any>){
        return await api.post('/cotes/create',data)
    },
    async update(id:string,data: Record<string, any>){
        return await api.put('/cotes/edit/'+id,data)
    },
    async get(type?:string,id?:string){
        return await api.patch(id?'/cotes/'+id : '/cotes/eleve/'+type)
    },
    async getAll(){
        return await api.get('/cotes')
    },
}

export default Rating