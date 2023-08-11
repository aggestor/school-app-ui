export default function prettyString(input = "", reverse = false) {
    if(input){
        if(reverse) return input.trim().replace(/\-/gi, " ")
        return input.trim().replace(/\s/gi, "-")
    }
    return undefined
}