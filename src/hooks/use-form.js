import {reactive} from "vue"
export default function useForm(initialValue) {
    const values = reactive(initialValue)
    return [values, (e) => {
        values.value[e.target.name] = e.target.value
    }]
}