function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    let btnUpdate = document.getElementById('button-actualizar');
    let btnDelete = document.getElementById("button-eliminar");
    let btnSearch = document.getElementById("button-buscar");

    //Lllamar a la función de Agregar
    btnAdd.addEventListener('click', async () => {
        if (validateInputs()) {
            const result = await Swal.fire({
                title: "¿Deseas agregar este cliente?",
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
                    title: "Cliente agregado con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                getClientesData();
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
                title: "¿Quieres actualizar este cliente?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Actualizar",
                denyButtonText: "No Actualizar"
            });
            if (result.isConfirmed) {
                await update();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Cliente actualizado con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                getClientesData();
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
            footer: "<b> Puedes activar/desactivar el cliente más tarde si es necesario.</b>",
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
                    title: "Cliente eliminado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                deleteCliente();
                getClientesData();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Operación cancelada", "", "info");
            }
        });
    });

// Llamar a la funcion busqueda de clientes
    btnSearch.addEventListener('click', async () => {
        const url = 'http://localhost:8080/DreamSoft_SICEFA/api/cliente/getAll';
        let response = await makePeticion(url);
        let dataToSearch = document.getElementById('txtBusqueda').value;

        if (searchCliente(response, dataToSearch).length != 0) {
            insertRow(searchCliente(response, dataToSearch));
        } else {
            Swal.fire({
                icon: "error",
                title: "Cliente no encontrado",
                text: "El nombre del cliente que estás buscando no existe.",
                footer: '<b>Asegúrate de ingresar el nombre correctamente</b>'
            });
        }
    });
}

//Función para agregar a un cliente
function save() {
    let url = "http://localhost:8080/DreamSoft_SICEFA/api/cliente/insertarCliente";
    let v_idPersona, v_nombre, v_apellidoPaterno, v_apellidoMaterno, v_genero, v_fechaNacimiento, v_rfc, v_curp,
            v_domicilio, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_foto, v_email, v_fechaRegistro;
    //Persona
    v_nombre = document.getElementById("txtNombre").value;
    v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    v_genero = document.getElementById("txtGenero").value;
    v_fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    v_rfc = document.getElementById("txtRfc").value;
    v_curp = document.getElementById("txtCurp").value;
    v_domicilio = document.getElementById("txtDomicilio").value;
    v_codigoPostal = document.getElementById("txtCodPostal").value;
    v_ciudad = document.getElementById("txtCiudad").value;
    v_estado = document.getElementById("txtEstado").value;
    v_telefono = document.getElementById("txtTelefono").value;
    v_foto = document.getElementById("txtFoto").value;
    //cliente
    v_email = document.getElementById("txtEmail").value;

    let datosCliente = {
        "email": v_email,
        "persona": {
            "nombre": v_nombre,
            "apellidoPaterno": v_apellidoPaterno,
            "apellidoMaterno": v_apellidoMaterno,
            "genero": v_genero,
            "fechaNacimiento": v_fechaNacimiento,
            "rfc": v_rfc,
            "curp": v_curp,
            "domicilio": v_domicilio,
            "codigoPostal": v_codigoPostal,
            "ciudad": v_ciudad,
            "estado": v_estado,
            "telefono": v_telefono,
            "foto": v_foto
        }
    };
    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({datosCliente: JSON.stringify(datosCliente)})
    };

    fetch(url, requestOptions).then(
            function (data) {
                return data.json();
            }
    ).then(
            function (json) {
                //alert("Objeto insertado" + datosCliente);
                console.log(datosCliente);
                getClientesData();
            }
    );
    clear();
}

//Función que sirve para modificar/ actualizar un cliente
function update() {
    let url = "http://localhost:8080/DreamSoft_SICEFA/api/cliente/updateCliente";
    let v_idCliente, v_nombre, v_apellidoPaterno, v_apellidoMaterno, v_genero, v_fechaNacimiento, v_rfc, v_curp,
            v_domicilio, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_foto, v_email, v_estatus;
    //Persona
    v_idCliente = document.getElementById("txtIdPersona").value;
    v_nombre = document.getElementById("txtNombre").value;
    v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    v_genero = document.getElementById("txtGenero").value;
    v_fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    v_rfc = document.getElementById("txtRfc").value;
    v_curp = document.getElementById("txtCurp").value;
    v_domicilio = document.getElementById("txtDomicilio").value;
    v_codigoPostal = document.getElementById("txtCodPostal").value;
    v_ciudad = document.getElementById("txtCiudad").value;
    v_estado = document.getElementById("txtEstado").value;
    v_telefono = document.getElementById("txtTelefono").value;
    v_foto = document.getElementById("txtFoto").value;
    //cliente
    v_email = document.getElementById("txtEmail").value;
    //v_estatus = document.getElementById("txtStatus").value;

    let datosCliente = {
        "idCliente": v_idCliente,
        "email": v_email,
        "estatus": 1,
        "persona": {
            "nombre": v_nombre,
            "apellidoPaterno": v_apellidoPaterno,
            "apellidoMaterno": v_apellidoMaterno,
            "genero": v_genero,
            "fechaNacimiento": v_fechaNacimiento,
            "rfc": v_rfc,
            "curp": v_curp,
            "domicilio": v_domicilio,
            "codigoPostal": v_codigoPostal,
            "ciudad": v_ciudad,
            "estado": v_estado,
            "telefono": v_telefono,
            "foto": v_foto
        }
    };

    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({datosCliente: JSON.stringify(datosCliente)})
    };

    fetch(url, requestOptions).then(
            function (data) {
                return data.json();
            }
    ).then(
            function (json) {
                console.log(datosCliente);
                getClientesData();
            }
    );
    clear();
}

//Función para eliminar un cliente
function deleteCliente() {
    let url = "http://localhost:8080/DreamSoft_SICEFA/api/cliente/deleteCliente";
    let check = document.getElementById('cbEstatus');

    let v_idCliente, v_estatus;
    //Persona
    v_idCliente = document.getElementById("txtIdPersona").value;
    //v_estatus = document.getElementById("txtStatus").value;

    let datosCliente = {
        "estatus": 0,
        //"estatus":0,
        "idCliente": v_idCliente
    };


    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({datosCliente: JSON.stringify(datosCliente)})
    };

    fetch(url, requestOptions).then(
            function (data) {
                return data.json();
            }
    ).then(
            function (json) {
                console.log(datosCliente);
                getClientesData();
            });
    if (check.checked) {
        check.checked = false;
    } else {
        check.checked = true;
    }


    clear();
}

async function getClientesData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/cliente/getAll';
    let response = await makePeticion(url);

    insertRow(response);
}
// Datos que se obtienen desde la API
async function insertRow(data) {
    let table = document.getElementById('table-row');

    table.innerHTML = '';


    let htmlString = '';

    data.forEach((cliente, index) => {
        let {idCliente, fechaRegistro, estatus, persona: {nombre, apellidoPaterno, apellidoMaterno, rfc, telefono}} = cliente;
        let estatusCliente = estatus == 1 ? 'Activo' : 'Inactivo'
        htmlString += `
        <tr scope = "row" class = "text-center fila" onclick="filaClickeada(${index})">
        <td class = "colId">${idCliente}</th>
        <td>
            <p>${nombre}</p>
        </td>
        <td>
            <p>${apellidoPaterno} ${apellidoMaterno}</p>
        </td>
        <td>${rfc}</td>
        <td>${telefono}</td>
        <td>${fechaRegistro}</td>
        <td>${estatusCliente}</td>
      </tr>`;
    });

    table.innerHTML = htmlString;
}

// Funcion para buscar a un cliente por su nombre
function searchCliente(array, nombreBuscado) {
    return array.filter(cliente => cliente.persona.nombre.toLowerCase().includes(nombreBuscado.toLowerCase()));
}

async function filaClickeada(index) {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/cliente/getAll';
    let response = await makePeticion(url);
    let datos = document.querySelectorAll(".colId");
    id = parseInt(datos[index].textContent);
    selectInputs(response[index]);
}


// Función para limpiar los campos del modulo de clientes
function clear() {
    document.getElementById("txtIdPersona").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellidoPaterno").value = "";
    document.getElementById("txtApellidoMaterno").value = "";
    document.getElementById("txtGenero").value = "";
    document.getElementById("txtFechaNacimiento").value = "";
    document.getElementById("txtRfc").value = "";
    document.getElementById("txtCurp").value = "";
    document.getElementById("txtDomicilio").value = "";
    document.getElementById("txtCodPostal").value = "";
    document.getElementById("txtCiudad").value = "";
    document.getElementById("txtEstado").value = "";
    document.getElementById("txtTelefono").value = "";
    document.getElementById("txtFoto").value = "";
    document.getElementById("txtEmail").value = "";
    //document.getElementById("txtStatus").value = "";
}
//Seleccionar inputs
function selectInputs(response) {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Cliente listo para modificar',
        showConfirmButton: false,
        timer: 1500,
        footer: 'Visita la sección de <span class = "fw-bold text-cian mx-1"><i class="bi bi-pen-fill"></i> Control Clientes</span>',
        showCloseButton: true,
        customClass: {
            popup: 'custom-popup-class',
        },
        timerProgressBar: true,
    });
    document.getElementById("txtIdPersona").value = response.idCliente;
    document.getElementById("txtNombre").value = response.persona.nombre;
    document.getElementById("txtApellidoPaterno").value = response.persona.apellidoPaterno;
    document.getElementById("txtApellidoMaterno").value = response.persona.apellidoMaterno;
    document.getElementById("txtGenero").value = response.persona.genero;
    document.getElementById("txtFechaNacimiento").value = response.persona.fechaNacimiento;
    document.getElementById("txtRfc").value = response.persona.rfc;
    document.getElementById("txtCurp").value = response.persona.curp;
    document.getElementById("txtDomicilio").value = response.persona.domicilio;
    document.getElementById("txtCodPostal").value = response.persona.codigoPostal;
    document.getElementById("txtCiudad").value = response.persona.ciudad;
    document.getElementById("txtEstado").value = response.persona.estado;
    document.getElementById("txtTelefono").value = response.persona.telefono;
    document.getElementById("txtFoto").value = "";
    document.getElementById("txtEmail").value = response.email;
    document.getElementById("cbEstatus").checked = response.estatus == 1 ? true : false;
    // document.getElementById("txtStatus").value = response.estatus;
}


//Función para validar 
function validateInputs() {
    if (document.getElementById("txtNombre").value == "") {
        return false;
    }

    if (document.getElementById("txtApellidoPaterno").value == "") {
        return false;
    }

    if (document.getElementById("txtApellidoMaterno").value == "") {
        return false;
    }

    if (document.getElementById("txtGenero").value == "") {
        return false;
    }

    if (document.getElementById("txtFechaNacimiento").value == "") {
        return false;
    }

    if (document.getElementById("txtRfc").value == "") {
        return false;
    }

    if (document.getElementById("txtCurp").value == "") {
        return false;
    }

    if (document.getElementById("txtDomicilio").value == "") {
        return false;
    }

    if (document.getElementById("txtCodPostal").value == "") {
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

    if (document.getElementById("txtEmail").value == "") {
        return false;
    }

    return true;
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

getClientesData();

loadButtons();
