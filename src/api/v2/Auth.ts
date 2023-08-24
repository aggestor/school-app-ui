import api from ".."
type Obj = {
    id?: number
    uuid?: string
    newPassword?: string
    repeatPassword ?: string
}
const Auth = {
    async verify(type) {
        return  await api.post('/auth/verify',{type})
    },
    async resetPassword(email: string){
        return await api.post('/auth/reset-password',{email})
    },
    async setNewPassword(data: Obj){
        return await api.post('/auth/set-new-password',data)
    },
    async login(data: Record<string,any>){
        return await api.post('/user/login',data)
    }
}

export default Auth