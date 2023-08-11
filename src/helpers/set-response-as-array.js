export default function setResponseAsArray(input){
    return Array.isArray(input) ? input : [input]
}