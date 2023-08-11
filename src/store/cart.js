import { defineStore } from "pinia"

export const useCart = defineStore({
    id: "cart",
    state: () => {
        return {
            count :0,
            total: 0,
            items:[]
        }
    },
    actions: {
        reset() {
            this.count = 0
            this.items = []
            this.total = 0
        },
        setCount(count) {
            this.count +=count
        },
        setNewCount(count){
            this.count = count
        },
        incrementTotal(itemPrice){
            this.total +=parseInt(itemPrice.value)
        },
        addItem(item){
            this.count +=1
            this.incrementTotal(item.totalPrice)
            this.items.push(item)
        }
    }
})
