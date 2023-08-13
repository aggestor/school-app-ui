import api from ".."
type Obj = {
    id?: number
    uuid?: string
    newPassword?: string
    repeatPassword ?: string
}
const Config = {
    async verify(type) {
        return  await api.post('/auth/verify',{type})
    },
    async resetPassword(email: string){
        return await api.post('/auth/reset-password',{email})
    },
    async addSchool(data: Record<string,any>){
        return await api.post('/ecole/create',data)
    },
    async setNewPassword(data: Obj){
        return await api.post('/auth/set-new-password',data)
    }


}

export default Config