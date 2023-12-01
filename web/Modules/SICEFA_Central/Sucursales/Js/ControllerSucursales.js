function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    let btnUpdate = document.getElementById('button-actualizar');
    let btnDelete = document.getElementById("button-eliminar");
    let btnSearch = document.getElementById("button-buscar");

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
    // Llamar a la funcion eliminar
    btnDelete.addEventListener('click', () => {
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
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sucursal eliminada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                eliminate();
                getSucursalData();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Operación cancelada", "", "info");
            }
        });
    });

    // Llamar a la funcion busqueda de clientes
    btnSearch.addEventListener('click', async () => {
        const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
        let response = await makePeticion(url);
        let dataToSearch = document.getElementById('txtBusqueda').value;

        if (searchSucursal(response, dataToSearch).length != 0) {
            insertRow(searchSucursal(response, dataToSearch));
        } else {
            Swal.fire({
                icon: "error",
                title: "Sucursal no encontrada",
                text: "El nombre de la sucursal que estás buscando no existe.",
                footer: '<b>Asegúrate de ingresar el nombre correctamente</b>'
            });
        }
    });
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
    document.getElementById("txtEstatus").value = "";
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
    } catch (error) {
        console.error('Error al obtener datos de sucursales:', error);
    }
}

async function makePeticion(url) {
    try {
        let response = await fetch(url);
        let json = await response.json();
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

    Swal.fire({
        title: "¡Estas seguro de aplicar estos cambios?",
        showDenyButton: true, showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: 'No guardar'}).then((result) => {
        if (result.isConfirmed) {
            try {
                fetch(url, requestOptions).then(
                        function (data) {
                            return data.json();
                        })
                        .then(function () {
                            getSucursalesData();
                            clean();
                        });

            } catch (error) {
                console.error('Error al procesar la solicitud:', error);
                alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
            }
            Swal.fire("Guardado", "", "success");
        } else if (result.isDenied) {
            Swal.fire("Cambios no guardados", "", "info");
        }
    });
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




/* // Función para agregar una sucursal
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
 clean();
 }
 
 //Función que sirve para modificar/ actualizar una sucursal
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
 clean();
 }
 
 //Función para eliminar una sucursal
 async function eliminate() {
 let check = document.getElementById('cbEstatus');
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
 if (check.checked) {
 check.checked = false;
 } else {
 check.checked = true;
 clean();
 }
 }
 
 
 async function getSucursalData() {
 const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
 let response = await makePeticion(url);
 
 insertRow(response);
 }
 
 // Datos que se obtienen desde la API
 async function insertRow(data) {
 let table = document.getElementById('table-row');
 
 table.innerHTML = '';
 
 
 let htmlString = '';
 
 data.forEach((sucursal, index) => {
 let {idSucursal, nombreSucursal, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud, estatus} = sucursal;
 let estatusSucursal = estatus == 1 ? 'Activo' : 'Inactivo'
 htmlString += `
 <tr scope = "row" class = "text-center fila" onclick="filaClickeada(${index})">
 <th class = "colId">${idSucursal}</th>
 <td>${nombreSucursal}</td>
 <td>${titular}</td>
 <td>${domicilio}</td>
 <td>${telefono}</td>
 <td>${estatusSucursal}</td>
 </tr>`;
 });
 
 table.innerHTML = htmlString;
 }
 
 // Funcion para buscar a una sucursal por su nombre
 function searchSucursal(array, nombreBuscado) {
 return array.filter(sucursal => sucursal.nombre.toLowerCase().includes(nombreBuscado.toLowerCase()));
 }
 
 async function filaClickeada(index) {
 const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
 let responses = await makePeticion(url);
 let datos = document.querySelectorAll(".colId");
 id = parseInt(datos[index].textContent);
 asignarInputs(responses[index]);
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
 document.getElementById("cbEstatus").checked = responses.estatus == 1 ? true : false;
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
 
 function validarCamposLlenos() {
 const inputs = document.querySelectorAll('input');
 let camposLlenos = true;
 
 inputs.forEach(input => {
 if (input.value.trim() === '') {
 camposLlenos = false;
 return;
 }
 });
 
 return camposLlenos;
 }
 async function makePeticion(url) {
 try {
 let response = await fetch(url);
 let json = await response.json();
 return json;
 } catch (error) {
 throw error;
 }
 }
 
 getSucursalData();
 
 loadButtons();*/



/* // evento para limpiar los inputs
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
 document.getElementById("txtEstatus").value = "";
 }
 
 
 async function getSucursalesData() {
 const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
 try {
 let response = await makePeticion(url);
 let table = document.getElementById('table-row');
 table.innerHTML = '';
 
 console.log(response);
 
 let htmlString = '';
 
 response.forEach((sucursal, index) => {
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
 } catch (error) {
 console.error('Error al obtener datos de sucursales:', error);
 }
 }
 
 async function makePeticion(url) {
 try {
 let response = await fetch(url);
 let json = await response.json();
 return json;
 } catch (error) {
 throw error;
 }
 }
 
 async function save() {
 
 if (!validarCamposLlenos()) {
 inputNull();
 return;
 } else {
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
 
 
 
 Swal.fire({
 title: "¡Estas seguro de aplicar estos cambios?",
 showDenyButton: true, showCancelButton: true,
 confirmButtonText: "Guardar",
 denyButtonText: 'No guardar'
 }).then((result) => {
 if (result.isConfirmed) {
 try {
 fetch(url, requestOptions).then(
 function (data) {
 return data.json();
 })
 .then(function () {
 getSucursalesData();
 clean();
 });
 
 } catch (error) {
 console.error('Error al procesar la solicitud:', error);
 alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
 }
 Swal.fire("Guardado", "", "success");
 } else if (result.isDenied) {
 Swal.fire("Cambios no guardados", "", "info");
 }
 });
 }
 
 
 }
 
 async function eliminate() {
 if (!validarCamposLlenos()) {
 inputNull();
 return;
 } else {
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
 
 Swal.fire({
 title: "¡Estas seguro de aplicar estos cambios?",
 showDenyButton: true, showCancelButton: true,
 confirmButtonText: "Guardar",
 denyButtonText: 'No guardar'}).then((result) => {
 if (result.isConfirmed) {
 try {
 fetch(url, requestOptions).then(
 function (data) {
 return data.json();
 })
 .then(function () {
 getSucursalesData();
 clean();
 });
 
 } catch (error) {
 console.error('Error al procesar la solicitud:', error);
 alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
 }
 Swal.fire("Guardado", "", "success");
 } else if (result.isDenied) {
 Swal.fire("Cambios no guardados", "", "info");
 }
 });
 }
 
 }
 
 
 
 async function modify() {
 if (!validarCamposLlenos()) {
 inputNull();
 return;
 } else {
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
 
 
 Swal.fire({
 title: "¡Estas seguro de aplicar estos cambios?",
 showDenyButton: true, showCancelButton: true,
 confirmButtonText: "Guardar",
 denyButtonText: 'No guardar'}).then((result) => {
 if (result.isConfirmed) {
 try {
 fetch(url, requestOptions).then(
 function (data) {
 return data.json();
 })
 .then(function () {
 getSucursalesData();
 clean();
 });
 
 } catch (error) {
 console.error('Error al procesar la solicitud:', error);
 alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
 }
 Swal.fire("Guardado", "", "success");
 } else if (result.isDenied) {
 Swal.fire("Cambios no guardados", "", "info");
 }
 });
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
 document.getElementById("txtEstatus").value = responses.estatus;
 }
 
 
 
 async function  obtenerFila(index) {
 const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
 
 let response = await makePeticion(url);
 asignarInputs(response[index]);
 }
 
 console.log("hola");
 // Llamada a la función
 getSucursalesData();
 
 // apartado de alertas
 function inputNull() {
 Swal.fire({
 icon: "error",
 title: "Oops...",
 text: "No puedes tener campos vacios"
 });
 }
 function validarCamposLlenos() {
 const inputs = document.querySelectorAll('input');
 let camposLlenos = true;
 
 inputs.forEach(input => {
 if (input.value.trim() === '') {
 camposLlenos = false;
 return;
 }
 });
 
 return camposLlenos;
 } */

