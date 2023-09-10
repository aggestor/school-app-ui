import api from ".."

const Rating = {

    async rate(data : Record<string, any>){
        return await api.post('/cotes/create',data)
    },
    async remove(id:string){
        return await api.delete('/cotes/delete/'+id)
    },
    async update(data: Record<string, any>,id:string){
        return await api.put('/cotes/edit/'+id,data)
    },
    async get(type?:string,id?:string){
        return await api.patch(id?'/cotes/'+id : '/cotes/eleve/'+type)
    },
    async getOne(id?:string){
        return await api.get('/cotes/find/'+id)
    },
    async getByType(type:string = "P1"){
        return await api.get('/cotes/'+type)
    },
    async getStudentRating(type?:string){
        return await api.post(type ?'/cotes/eleve/'+type :"/cotes/eleve")
    },
    async getStudentResult(type?:string){
        return await api.post(type ?'/cotes/eleve/'+type :"/cotes/eleve/resultat")
    },
    async getAll(){
        return await api.get('/cotes')
    },
}

export default Rating