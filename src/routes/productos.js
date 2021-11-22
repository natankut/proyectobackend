const express = require('express');
const router = express.Router();
const Container = require('../classes/Container');
const contenedor = new Container();

//GETS
router.get('/',(req,res)=>{
    contenedor.getAllProductos().then(result=>{
        res.send(result);
    })
})

router.get('/:pid',(req,res)=>{
    let id = parseInt(req.params.pid);
    contenedor.getProductoById(id).then(result=>{
        res.send(result);
    })
})

//POST
router.post('/',(req,res)=>{
    let producto = req.body;
    console.log(producto);
    contenedor.registerProducto(producto).then(result=>{
        res.send(result);
    })
})

//PUT
router.put('/:pid',(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.pid);
    contenedor.updatePet(id,body).then(result=>{
        res.send(result);
    })
})

//DELETE
router.delete('/:pid',(req,res)=>{
    let id= parseInt(req.params.pid);
    contenedor.deleteProducto(id).then(result=>{
        res.send(result)
    })
})

module.exports = router;
