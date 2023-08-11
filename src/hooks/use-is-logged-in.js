export default function useIsLoggedIn() {
    const data = localStorage.getItem("logged_in_user")
    const type = localStorage.getItem("logged_in_type")
    if (data && type) return true
        return false
}