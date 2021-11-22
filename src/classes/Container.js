const fs = require('fs');

class Container{
    async registerProducto(producto){
        try{
            let data = await fs.promises.readFile('./files/productos.txt','utf-8');
            let productos = JSON.parse(data);
            let id = productos[productos.length-1].id+1;
            producto =Object.assign({id:id},producto);
            productos.push(producto)
            try{
                await fs.promises.writeFile('./files/productos.txt',JSON.stringify(productos,null,2));
                return {status:"success",message:"Producto registrado"}
            }catch{
                return {statis:"error",message:"No se pudo registrar a el producto"} 
            }
        }catch{
            producto = Object.assign({id:1},producto)
            try{
                await fs.promises.writeFile('./files/productos.txt',JSON.stringify([producto],null,2));
                return {status:"success", message:"Producto registrada"}
            }
            catch{
                return {status:"error",message:"No se pudo registrar a el producto"}
            }
        }
    }
    async getAllProductos(){
        try{
            let data = await fs.promises.readFile('./files/productos.txt','utf-8');
            let productos = JSON.parse(data);
            return {status:"success",payload:productos}
        }catch{
            return {status:"error",message:"Error al obtener los productos. Intente más tarde"}
        }
    }
    async getProductoById(id){
        try{
            let data = await fs.promises.readFile('./files/productos.txt','utf-8');
            let productos = JSON.parse(data);
            let producto = productos.find(v => v.id===id)
            if(producto){
                return {status:"success", payload:producto}
            }else{
                return {status:"error",message:"Producto no encontrada"}
            }
        }catch{
            return {status:"error",message:"Error al obtener el producto"}
        }
    }
    async updateProducto(id,body){
        try{
            let data = await fs.promises.readFile('./files/productos.txt','utf-8');
            let productos = JSON.parse(data);
            if(!productos.some(prod => prod.id === id)) return {status:"error", message:"No hay productos con el id especificado"}
            let result = productos.map( producto => {
                if(producto.id === id){
                        body = Object.assign(body)
                        body = Object.assign({id:producto.id,...body});
                        return body;
                }else{
                    return producto;
                }
            })
            try{
                await fs.promises.writeFile('./files/productos.txt',JSON.stringify(result,null,2));
                return {status:"success", message:"Producto actualizado"}
            }catch{
                return {status:"error", message:"Error al actualizar producto"}
            }
        }catch(error){
            return {status:"error",message:"Fallo al actualizar producto: "+error}
        }
    }
    async deleteProducto(id){
        try{
            let data = await fs.promises.readFile('./files/productos.txt','utf-8');
            let productos = JSON.parse(data);
            if(!productos.some(producto=>producto.id===id)) return {status:"error", message:"No hay producto con el id especificado"}
            let producto = productos.find(v=>v.id===id);
            let aux = productos.filter(producto=>producto.id!==id);
            try{
                await fs.promises.writeFile('./files/productos.txt',JSON.stringify(aux,null,2));
                return {status:"success",message:"Producto eliminado"}
            }catch{
                return {status:"error", message:"No se pudo eliminar el producto"}
            }
        }catch{
            return {status:"error", message:"Fallo al eliminar el producto"}
        }
    }
}

module.exports = Container;