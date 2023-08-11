import moment from "moment/moment"
import  * as fr from "moment/locale/fr"

export const formatDateToAgo = (input) =>{
    const result = moment(input).startOf("day").calendar()
    if(result.includes("Aujourd’hui")){
        return result.split(" ")[0]
    }else return moment(input).local(fr).fromNow(true)
}
export const formatDateNormal = (input) =>{
    return moment(input).local(fr).format("ll")
}