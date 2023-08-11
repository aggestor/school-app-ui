import admin from "../api/admin"
import User from "../api/user"
export default function logout() {
    window.localStorage.removeItem('logged_in_user')
    window.localStorage.removeItem('logged_in_type')
    admin.logout()
    User.logout()
}

export async function useLogout(result) {
    if (result.type == 'error' && result.auth == false) {
        logout()
        return 'success'
    }
}