import{h as a}from"./index-4f0251ba.js";const r={async create(t){return await a.post("/model/create",t)},async update(t){return await a.post("/model/update",t)},async getAll(){return await a.get("/model/all")},async getAllByCategory(t){return await a.get("/model/by/category/"+t)}};export{r as M};
