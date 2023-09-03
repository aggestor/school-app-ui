import moment from "moment/moment"
import  * as fr from "moment/locale/fr"

export const formatDateToAgo = (input) =>{
    const date = moment(input).local(fr).fromNow(true)
    if(date.includes("jours")) return date.substring(0,4).trim() ;
   return date.substring(0,3).trim()
}
export const formatDateNormal = (input) =>{
    return moment(input).local(fr).format("ll")
}