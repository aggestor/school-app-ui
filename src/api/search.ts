import api from "."

const Search  = {
    /**
     * Gets products list based on a given term but not much detailed
     * @param {string} term The term to search for
     * @returns 
     */
    async elementarySearch(term:string){
        return await api.post('/search/elementary' ,{term})
    },
  /**
     * Gets products list based on a given term  much detailed
     * @param {string} term The term to search for
     * @returns 
     */
    async collectionSearch(term:string){
        return await api.post('/search/collection' ,{term})
    }
}


export default Search