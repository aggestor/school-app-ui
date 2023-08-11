export default function convert(file) {
    return new Promise((resolve, reject) => {
        
        const reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror =error => {
            reject(error)
        }
    })
}