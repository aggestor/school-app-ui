export default function parseRatingType(type){
    const types = {
        P1:{
            id:"P1",
            name:"Première Période"
        }, P2: {
            id:"P2",
            name:"Deuxième Période"
        },
        P3: {
            id:"P3",
            name:"Troisième Période"
        },
        P4: {
            id:"P4",
            name:"Quatrième Période"
        },
        E1:{
            id:"E1",
            name:"Examen Premier Semestre"
        },
        E2:
        {
            id:"E2",
            name:"Examen Second Semestre"
        }
    }

    return types[type]?.name
}