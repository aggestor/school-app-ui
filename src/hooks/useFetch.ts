import {ref,onMounted} from "vue"

export default function  useFetch(d :  () => Promise<any>, multiple = true) {
    const data = ref()
    const loading = ref(false)
    const logout = () =>{
        window.sessionStorage.clear()
        window.location.href = "/ui/login"
    }
    const fetchData = async () =>{
        
        if(typeof d === "function"){
            const result = await d()
           if(result.status && result.status === 401){
                logout()
           }else{
            if(result.data){
                if(Array.isArray(result.data) && result.data.length == 1){
                    if(multiple){
                         data.value = result.data
                    }
                    else data.value = result.data[0]
                }else{
                    data.value = result.data
                }
            }else{
                data.value = result
            }
           }
        }else {
            const result : any  = await Promise.resolve(d);
            if(result.status && result.status === 401){
                logout()
            }else{
                
                if(result.data){
                    if(Array.isArray(result.data) && result.data.length == 1){
                        if(multiple)
                        data.value = result.data
                        else data.value = result.data[0]
                    }else{
                        data.value = result.data
                    }
                }else{
                    data.value = result
                }
            }
            
        }
        loading.value = false
    }
    onMounted(()=>{
        fetchData()
    })

    return {data,loading}
    
}