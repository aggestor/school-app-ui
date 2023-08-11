import en from "./en";
import fr from "./fr";

const current = localStorage.getItem('lang')
let lang = undefined
if(current == "fr")
    lang = fr
    else lang = en
export default lang