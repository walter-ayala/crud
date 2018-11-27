tareas();

document.querySelector('#fTareas').addEventListener('submit',function(e){
    e.preventDefault();
    var url = '/users';
    var data ={
        tarea: document.forms["fTareas"]['tarea'].value,
        fecha: document.forms["fTareas"]['fecha'].value,
    };

    fetch(url,{
        method: 'POST',
        body: JSON.stringify(data),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then(res => res.json())
        .catch(error => console.log("Error:",error))
        .then(function(response){
            console.log("sucess");
            tareas();
        })
});


document.querySelector("#formUpdate").addEventListener('submit',function(e){
    e.preventDefault();
    let url = '/users/actualizar/'+document.forms["formUpdate"]['idTarea'].value;
    var data = {
        tarea: document.forms["formUpdate"]['tareaU'].value,
        fecha: document.forms["formUpdate"]['fechaU'].value,
    };
   // console.log(url);
    fetch(url,{
        method:"PUT",
        body: JSON.stringify(data),
        headers:
        {
            'Content-Type':'application/json'
        }
    }).then(res => res.json())
    .catch(error => console.log("Error:",error))
    .then(function(response){
        console.log("actualizado con exito");
        tareas();
    })
});

function tareas()
{
    //contenedor
    let tableTareas = document.querySelector("#llenar");
    let contenido = "";
    //peticion

    fetch('/users/tareas')
    .then(function(response){
        return response.text();
    })
    .then(function(data){
        console.log(data);
        JSON.parse(data).tareas.forEach(element => {
            contenido = contenido + `<tr>
            <td>${element.tarea}</td>
            <td>${element.fecha}</td>
            <td>
                <a href="/users/delete/${element._id}" class="eliminar btn btn-danger">Eliminar</a>
                <a href="/users/buscar/${element._id}" class="actualizar btn btn-warning" data-toggle="modal" data-target="#exampleModal">Actualizar</a>
            </td>
            <tr/>`
        });

        tableTareas.innerHTML = contenido;
        let btns_eliminar = document.querySelectorAll('.eliminar');

        btns_eliminar.forEach(item=>{
            item.addEventListener("click",function(e){
                e.preventDefault();
                let url = this['href'];
                console.log(url);
                fetch(url,{
                    method:"DELETE",
                }).then(res => res.json())
                .catch(error => console.log("Error:",error))
                .then(function(response){
                    console.log("sucess");
                    tareas();
                })

            });
        })
        let btns_actualizar =  document.querySelectorAll('.actualizar');

        btns_actualizar.forEach(item =>{
            item.addEventListener("click", function(e){
                e.preventDefault();
                let url = this['href'];
                console.log(url);
                fetch(url,{method:"GET"})
                .then(function(response){
                    return response.text();
                })
                .then(function(data){
                    console.log(JSON.parse(data).tarea);
                    let formUpdate = document.querySelector('#formUpdate');
                    formUpdate.idTarea.value = JSON.parse(data)._id;
                    formUpdate.tareaU.value = JSON.parse(data).tarea;
                    formUpdate.fechaU.value = JSON.parse(data).fecha;
                });
            });
        });
    
    });

    //eliminado

   

}

