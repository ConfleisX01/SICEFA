function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    let btnUpdate = document.getElementById('button-actualizar');
    let btnDelete = document.getElementById("button-eliminar");
    let btnSearch = document.getElementById("button-buscar");
    let btnclean = document.getElementById("button-limpiar");
    let checkBox =  document.getElementById("cbEstatusBusqueda");

    //Lllamar a la función de Agregar
    btnAdd.addEventListener('click', async () => {
        if (validateInputs()) {
            const result = await Swal.fire({
                title: "¿Deseas agregar está sucursal?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Guardar",
                denyButtonText: "No Guardar"
            });

            if (result.isConfirmed) {
                await save();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sucursal agregada con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                getSucursalData();
            } else if (result.isDenied) {
                Swal.fire("Operación cancelada", "", "info");
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, complete todos los campos obligatorios.",
                footer: '<b>Asegúrate de ingresar todos los campos solicitados</b>'
            });
        }
    });

    // Llamar a la funcion actualizar
    btnUpdate.addEventListener('click', async () => {
        if (validateInputs()) {
            const result = await Swal.fire({
                title: "¿Quieres actualizar está sucursal?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Actualizar",
                denyButtonText: "No Actualizar"
            });
            if (result.isConfirmed) {
                await modify();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sucursal actualizada con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                getSucursalData();
            } else if (result.isDenied) {
                Swal.fire("Operación cancelada", "", "info");
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Por favor, complete todos los campos obligatorios.",
                footer: '<b>Asegúrate de ingresar todos los campos solicitados</b>'
            });
        }
    });
    
  btnclean.addEventListener('click', async () => {
    await clean();
        getSucursalData();
});
    
    checkBox.addEventListener('change', async function() {
    await searchestatusSucursales();
});
    // Llamar a la funcion eliminar
    btnDelete.addEventListener('click', async () => {
        Swal.fire({
            title: "Confirmar Operación",
            text: "¿Estás seguro de que deseas realizar esta operación?",
            footer: "<b> Puedes activar/desactivar la sucursal más tarde si es necesario.</b>",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Realizar",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            focusCancel: true
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await eliminate();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Sucursal eliminada exitosamente",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    getSucursalData();
                } catch (error) {
                    console.error("Error al eliminar la sucursal:", error);
                    // Handle error here or display an error message
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Operación cancelada", "", "info");
            }
        });
    });

  

    btnSearch.addEventListener('click', async () => {
        const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
        let response = await makePeticion(url);
        let dataToSearch = document.getElementById('txtBusqueda').value;

        const searchResults = searchSucursal(response, dataToSearch);

        if (searchResults.length !== 0) {
            insertRow(searchResults);
        } else {
            getSucursalData();
            Swal.fire({
                icon: "error",
                title: "Sucursal no encontrada",
                text: "El nombre de la sucursal que estás buscando no existe.",
                footer: '<b>Asegúrate de ingresar el nombre correctamente</b>'
            });
        }
    });
}

  function searchSucursal(array, dataToSearch) {
        const searchResults = array.filter(sucursal => {
            for (let key in sucursal) {
                if (sucursal[key] && sucursal[key].toString().toLowerCase().includes(dataToSearch.toLowerCase())) {
                    return true;
                }
            }
            return false;
        });

        return searchResults;
    }
// no supe que hice pero funciona, no le muevan
function insertRow(data) {
    let table = document.getElementById('table-row');

    table.innerHTML = '';

    let htmlString = '';

    data.forEach((sucursal, index) => {
        let {idSucursal, nombreSucursal, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud, estatus} = sucursal;
        htmlString += `
      <tr onclick="obtenerFila(${index})">
 <th scope="row">${idSucursal}</th>
 <td>${nombreSucursal}</td>
 <td>${titular}</td>
 <td>${domicilio}</td>
 <td>${telefono}</td>
 <td>${estatus}</td>
 </tr>`;
    });

    table.innerHTML = htmlString;
}


// evento para limpiar los inputs
async  function clean() {


    document.getElementById("txtIdSucursal").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtTitular").value = "";
    document.getElementById("txtRFC").value = "";
    document.getElementById("txtDomicilio").value = "";
    document.getElementById("txtColonia").value = "";
    document.getElementById("txtCodigoPostal").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtLatitud").value = "";
    document.getElementById("txtLongitud").value = "";
    let checkbox = document.getElementById("cbEstatus");
    checkbox.checked = false;
    checkbox.disabled = true;
}


async function getSucursalData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
    try {
        let response = await makePeticion(url);
        let table = document.getElementById('table-row');
        table.innerHTML = '';

        console.log(response);

        let htmlString = '';

        response.forEach((sucursal, index) => {
            let { idSucursal, nombreSucursal, titular, domicilio, telefono, estatus } = sucursal;
            if (estatus === 1) {
                htmlString += `
                    <tr onclick="obtenerFila(${index})">
                        <th scope="row">${idSucursal}</th>
                        <td>${nombreSucursal}</td>
                        <td>${titular}</td>
                        <td>${domicilio}</td>
                        <td>${telefono}</td>
                        <td>${estatus}</td>
                    </tr>`;
            }
        });

        table.innerHTML = htmlString;
    } catch (error) {
        console.error('Error al obtener datos de sucursales:', error);
    }
}


async function searchestatusSucursales() {
    let checkBox = document.getElementById("cbEstatusBusqueda");

    if (checkBox.checked) {
        const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
        
        let response = await makePeticion(url);
        let table = document.getElementById('table-row');
        table.innerHTML = '';

        let htmlString = '';

        response.forEach((sucursal, index) => {
             let {idSucursal, nombreSucursal, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud, estatus} = sucursal;
            
            if (estatus === 0) { // Filtra por estado deseado (0 en este caso)
                htmlString += `
                    <tr onclick="obtenerFila(${index})">
                        <th scope="row">${idSucursal}</th>
                        <td>${nombreSucursal}</td>
                        <td>${titular}</td>
                        <td>${domicilio}</td>
                        <td>${telefono}</td>
                        <td>${estatus}</td>
                    </tr>`;
            }

        });

        table.innerHTML = htmlString;
    }else{
        getSucursalData();
    }
}

async function makePeticion(url) {
    try {
        let response = await fetch(url);
        let json = await response.json();
        console.log("hola");
        return json;
    } catch (error) {
        throw error;
    }
}

async function save() {


    const url = "http://localhost:8080/DreamSoft_SICEFA/api/sucursal/insertarSucursal";

    let v_nombreSucursal, v_titular, v_rfc, v_domicilio, v_colonia, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_latitud, v_longitud;

    v_nombreSucursal = document.getElementById("txtNombre").value;
    v_titular = document.getElementById("txtTitular").value;
    v_rfc = document.getElementById("txtRFC").value;
    v_domicilio = document.getElementById("txtDomicilio").value;
    v_colonia = document.getElementById("txtColonia").value;
    v_codigoPostal = document.getElementById("txtCodigoPostal").value;
    v_ciudad = document.getElementById("txtCiudad").value;
    v_estado = document.getElementById("txtEstado").value;
    v_telefono = document.getElementById("txtTelefono").value;
    v_latitud = document.getElementById("txtLatitud").value;
    v_longitud = document.getElementById("txtLongitud").value;

    let sucursal = {
        "nombreSucursal": v_nombreSucursal,
        "titular": v_titular,
        "rfc": v_rfc,
        "domicilio": v_domicilio,
        "colonia": v_colonia,
        "codigoPostal": v_codigoPostal,
        "ciudad": v_ciudad,
        "estado": v_estado,
        "telefono": v_telefono,
        "latitud": v_latitud,
        "longitud": v_longitud
    };

    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({sucursal: JSON.stringify(sucursal)})
    };
    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        clean();
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
    }
    console.log(sucursal);

}

async function eliminate() {
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/sucursal/eliminarSucursal";

    let v_idSucursal;

    v_idSucursal = document.getElementById("txtIdSucursal").value;

    let sucursal = {
        idSucursal: v_idSucursal
    };

    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({sucursal: JSON.stringify(sucursal)})
    };


    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        clean();
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
    }
}




async function modify() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/modificarSucursal';

    let  v_idSucursal, v_nombreSucursal, v_titular, v_rfc, v_domicilio, v_colonia, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_latitud, v_longitud;

    v_idSucursal = document.getElementById("txtIdSucursal").value;
    v_nombreSucursal = document.getElementById("txtNombre").value;
    v_titular = document.getElementById("txtTitular").value;
    v_rfc = document.getElementById("txtRFC").value;
    v_domicilio = document.getElementById("txtDomicilio").value;
    v_colonia = document.getElementById("txtColonia").value;
    v_codigoPostal = document.getElementById("txtCodigoPostal").value;
    v_ciudad = document.getElementById("txtCiudad").value;
    v_estado = document.getElementById("txtEstado").value;
    v_telefono = document.getElementById("txtTelefono").value;
    v_latitud = document.getElementById("txtLatitud").value;
    v_longitud = document.getElementById("txtLongitud").value;

    let sucursal = {
        idSucursal: v_idSucursal,
        nombreSucursal: v_nombreSucursal,
        titular: v_titular,
        rfc: v_rfc,
        domicilio: v_domicilio,
        colonia: v_colonia,
        codigoPostal: v_codigoPostal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_telefono,
        latitud: v_latitud,
        longitud: v_longitud
    };
    console.log(sucursal);
    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({sucursal: JSON.stringify(sucursal)})
    };

    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        clean();
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
    }
}

function asignarInputs(responses) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Sucursal lista para modificar',
        showConfirmButton: false,
        timer: 1500,
        footer: 'Visita la sección de <span class = "fw-bold text-cian mx-1"><i class="bi bi-pen-fill"></i> Control Sucursales</span>',
        showCloseButton: true,
        customClass: {
            popup: 'custom-popup-class',
        },
        timerProgressBar: true,
    });

    document.getElementById("txtIdSucursal").value = responses.idSucursal;
    document.getElementById("txtNombre").value = responses.nombreSucursal;
    document.getElementById("txtTitular").value = responses.titular;
    document.getElementById("txtRFC").value = responses.rfc;
    document.getElementById("txtDomicilio").value = responses.domicilio;
    document.getElementById("txtColonia").value = responses.colonia;
    document.getElementById("txtCodigoPostal").value = responses.codigoPostal;
    document.getElementById("txtCiudad").value = responses.ciudad;
    document.getElementById("txtEstado").value = responses.estado;
    document.getElementById("txtTelefono").value = responses.telefono;
    document.getElementById("txtLatitud").value = responses.latitud;
    document.getElementById("txtLongitud").value = responses.longitud;
    // Obtener el checkbox
    let checkbox = document.getElementById("cbEstatus");
    // Verificar si estatus es igual a 1 y marcar el checkbox
    if (responses.estatus === 1) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }

    // Deshabilitar el checkbox
    checkbox.disabled = true;
}



//Función para validar 
function validateInputs() {
    if (document.getElementById("txtNombre").value == "") {
        return false;
    }

    if (document.getElementById("txtTitular").value == "") {
        return false;
    }

    if (document.getElementById("txtRFC").value == "") {
        return false;
    }

    if (document.getElementById("txtDomicilio").value == "") {
        return false;
    }
    if (document.getElementById("txtCodigoPostal").value == "") {
        return false;
    }

    if (document.getElementById("txtCiudad").value == "") {
        return false;
    }

    if (document.getElementById("txtEstado").value == "") {
        return false;
    }

    if (document.getElementById("txtTelefono").value == "") {
        return false;
    }

    if (document.getElementById("txtLatitud").value == "") {
        return false;
    }

    if (document.getElementById("txtLongitud").value == "") {
        return false;
    }

    return true;
}



async function  obtenerFila(index) {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';

    let response = await makePeticion(url);
    asignarInputs(response[index]);
}

console.log("hola");
// Llamada a la función
getSucursalData();
loadButtons();

/*// funcion para validar check box
 function check() {
 // se toma el check
 let checkBox = document.getElementById("cbEstatus");
 
 //se valida si esta activo o no
 let activo = true;
 if (checkBox.checked){
 return activo;
 }else{
 activo = false;
 return activo;
 };
 }*/


