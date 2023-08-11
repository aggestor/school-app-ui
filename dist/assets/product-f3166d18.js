import{h as p}from"./index-4f0251ba.js";const s={async create(e){const n=new FormData;return n.append("category_name",e.category_name),n.append("category_id",e.category_id),n.append("description",e.description),n.append("extension_id",e.extension_id),n.append("extension_name",e.extension_name),n.append("isBrandNew",e.isBrandNew),e.files.forEach((t,r)=>{n.append("file-"+r,t)}),n.append("keywords",e.keywords),n.append("mark_id",e.mark_id),n.append("mark_name",e.mark_name),n.append("model_id",e.model_id),n.append("model_name",e.model_name),n.append("name",e.name),n.append("prices",e.prices),n.append("quantities",e.quantities),n.append("scl_shop_id",e.scl_shop_id),n.append("set_id",e.set_id),n.append("set_name",e.set_name),n.append("specs",e.specs),n.append("type_id",e.type_id),n.append("type_name",e.type_name),await p.post("/product/create",n)},async update(e){const n=new FormData;return n.append("category_name",e.category_name),n.append("id",e.id),n.append("category_id",e.category_id),n.append("description",e.description),n.append("extension_id",e.extension_id),n.append("extension_name",e.extension_name),n.append("isBrandNew",e.isBrandNew),n.append("mark_id",e.mark_id),n.append("mark_name",e.mark_name),n.append("model_id",e.model_id),n.append("model_name",e.model_name),n.append("name",e.name),n.append("prices",e.prices),n.append("quantities",e.quantities),n.append("scl_shop_id",e.scl_shop_id),n.append("set_id",e.set_id),n.append("set_name",e.set_name),n.append("type_id",e.type_id),n.append("type_name",e.type_name),await p.post("/product/update",n)},async create_(e){const n=new FormData;return n.append("category_name",e.category_name),n.append("category_id",e.category_id),n.append("description",e.description),n.append("extension_id",e.extension_id),n.append("extension_name",e.extension_name),n.append("isBrandNew",e.isBrandNew),e.files.forEach((t,r)=>{n.append("file-"+r,t)}),n.append("keywords",e.keywords),n.append("mark_id",e.mark_id),n.append("mark_name",e.mark_name),n.append("model_id",e.model_id),n.append("model_name",e.model_name),n.append("name",e.name),n.append("prices",e.prices),n.append("quantities",e.quantities),n.append("scl_shop_id",e.scl_shop_id),n.append("set_id",e.set_id),n.append("set_name",e.set_name),n.append("specs",e.specs),n.append("type_id",e.type_id),n.append("type_name",e.type_name),await p.post("/owner/product/create",n)},async updateMedia(e,n){const t=new FormData;return e.forEach((r,a)=>{t.append("file-"+a,r)}),t.append("id",n),await p.post("/product/update/media",t)},async updateKeywordsAndSpecs(e){return await p.post("/product/update/keywords-and-specs",e)},async getAll(){return await p.get("/product/all")},async getAllSimple(){return await p.get("/product/all")},async trendingShowroomData(){return await p.get("/product/trending/showroom")},async showroomData(){return await p.get("/product/showroom")},async search(e){return await p.get("/product/search/"+e)},async get(e){return await p.get("/product/d/"+e)},async getData(e){return await p.get("/product/d/"+e)},async changeStatus(e,n){return await p.post("/product/change-status",{status:e,id:n})},async exportTo(e,n){return await p.post("/product/export-to",{branch:e,id:n})},async getByShop(e){return await p.get("/product/shop/"+e)},async getByShopLimited(e){return await p.get("/product/shop/limited/"+e)},async getShopOwner(e){return await p.get("/product/owner/"+e)},async getUploader(e){return await p.get("/product/get-uploader/"+e)},async addInteraction(e,n){return await p.post("/product/add-interaction",{type:e,id:n})},async getAllByOrder(e="newest"){return await p.get("/product/all/by-"+e)},async listFiltered(e,n){return await p.get("/products/filter/"+e+"/"+n)},async listAll(){return await p.get("/products/list")},async remove(e){return await p.post("/products/remove",{id:e})},async removeImage(e){return await p.post("/products/remove/media",{name:e})}};export{s as P};
