document.addEventListener('submit', event=>{
    event.preventDefault();
    let form = document.querySelector('#productForm');
    let data = new FormData(form);
    let name = data.get('name');
    let precio = data.get('precio');
    let thumbnail = data.get('thumbnail');
    let req = {
        name:name,
        precio:precio,
        thumbnail:thumbnail
    }
    fetch('http://localhost:8080/api/productos',{
        method:'POST',
        body:JSON.stringify(req),
        headers:{
            "Content-type":"application/json"
        }
    }).then(result=>{
        return result.json();
    }).then(json=>{
        console.log(json);
    })
})