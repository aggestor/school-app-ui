import { Axios } from "axios"

/**
 * A
 * @param {
 * Record(<type : string : Array<any>>)
 * } result Transpiled array
 * @param {Array<{key:string, name:string}>} keys 
 */
export default function useTranspiler(result, keys) {
    /**
     * @const {Array<{key:string, name:string}>}
     */
    const v = []
    if (result.data) {
        result.data.forEach(item => {
            v.push({ key: item[keys.key], value: item[keys.value] })
        })

    }
    return v
}