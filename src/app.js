const express = require('express');
const cors = require('cors');
const multer = require('multer');
//Necesitamos llamar al contenedor para trabajar.
const Container = require('./classes/Container');
const app = express();
const server = app.listen(8080,()=>{
    console.log("server listening on port 8080")
})
const contenedor = new Container();
//importamos los router
const productosRouter = require('./routes/productos');
//multer
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'public')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})
const upload = multer({storage:storage});
app.use(upload.single('file'));
//Esto es para que nuestro archivo pueda interpretar json, no solo strings
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//simulamos una carpeta pero podemos ponerla sin.
app.use('/imagenes' ,express.static(__dirname+'/public'))
// app.use(express.static('public'))
app.use(cors());
//en esa ruta conectate a petsRouter
app.use('/api/productos',productosRouter);

app.post('/api/adoption',(req,res)=>{
    let userId = parseInt(req.body.uid);
    let petId = parseInt(req.body.pid);
    contenedor.adoptPet(userId,petId).then(result=>{
        res.send(result);
    })
})

app.post('/api/uploadfile',upload.single('file'),(req,res)=>{
    const file = req.file;
    console.log(file);
    if(!file||file.length===0){
        res.status(500).send({message:"No se subió archivo"})
    }
    res.send(file);
})


