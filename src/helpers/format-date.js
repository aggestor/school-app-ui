import moment from "moment/moment"
import  * as fr from "moment/locale/fr"

export const formatDateToAgo = (input) =>{
   return moment(input).local(fr).fromNow(true).substring(0,3).trim()
}
export const formatDateNormal = (input) =>{
    return moment(input).local(fr).format("ll")
}