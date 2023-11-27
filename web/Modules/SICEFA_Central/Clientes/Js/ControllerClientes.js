let response;

function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    let btnUpdate = document.getElementById('button-modificar');
    let btnDelete = document.getElementById("button-delete");
    btnAdd.addEventListener('click', () => {
        Swal.fire({
            title: "¿Deseas agregar este Cliente?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Guardar",
            denyButtonText: `No Guardar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Cliente agregado con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                save();
                getClientesData();
            } else if (result.isDenied) {
                Swal.fire("Operacion cancelada", "", "info");
            }
        });
    });

    btnUpdate.addEventListener('click', () => {
        Swal.fire({
            title: "¿Deseas actualizar este Cliente?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Guardar",
            denyButtonText: `No Guardar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Cliente actualizado con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                update();
                getClientesData();
            } else if (result.isDenied) {
                Swal.fire("Operación cancelada", "", "info");
            }
        });
    });


    btnDelete.addEventListener('click', () => {
        Swal.fire({
            title: "¿Deseas eliminar este Cliente?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Eliminar",
            denyButtonText: `No Eliminar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Cliente eliminado con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                deleteCliente();
                getClientesData();
            } else if (result.isDenied) {
                Swal.fire("Operacion cancelada", "", "info");
            }
        });
    });
}
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

async function getClientesData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/cliente/getAll';
    response = await makePeticion(url);
    let table = document.getElementById('table-row');

    table.innerHTML = '';

    console.log(response);

    let htmlString = '';

    response.forEach((cliente, index) => {
        let {idCliente, fechaRegistro, estatus, persona: {nombre, apellidoPaterno, apellidoMaterno, genero}} = cliente;
        let estatusCliente = estatus == 1 ? 'Activo' : 'Inactivo'
        htmlString += `
        <tr onclick="selectInputs(${index})">
        <td>
            <p class="fw-bold">#${idCliente}</p>
        </td>
        <td>
            <p class="fw-normal mb-1">${nombre}</p>
        </td>
        <td>
            <p class="fw-normal mb-1">${apellidoPaterno}</p>
        </td>
        <td class = "fw-normal mb-1">${apellidoMaterno}</td>
        <td>${genero}</td>
        <td class = "fw-bold">${fechaRegistro}</td>
        <td><span class="badge badge-success rounded-pill d-inline text-bg-primary">${estatusCliente}</span></td>
        </tr>`;
    });

    table.innerHTML = htmlString;
}
async function makePeticion(url) {
    try {
        response = await fetch(url);
        let json = await response.json();
        return json;
    } catch (error) {
        throw error;
    }
}

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

function selectInputs(index) {
    let selectedClient = response[index];
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
    document.getElementById("txtIdPersona").value = selectedClient.idCliente;
    document.getElementById("txtNombre").value = selectedClient.persona.nombre;
    document.getElementById("txtApellidoPaterno").value = selectedClient.persona.apellidoPaterno;
    document.getElementById("txtApellidoMaterno").value = selectedClient.persona.apellidoMaterno;
    document.getElementById("txtGenero").value = selectedClient.persona.genero;
    document.getElementById("txtFechaNacimiento").value = selectedClient.persona.fechaNacimiento;
    document.getElementById("txtRfc").value = selectedClient.persona.rfc;
    document.getElementById("txtCurp").value = selectedClient.persona.curp;
    document.getElementById("txtDomicilio").value = selectedClient.persona.domicilio;
    document.getElementById("txtCodPostal").value = selectedClient.persona.codigoPostal;
    document.getElementById("txtCiudad").value = selectedClient.persona.ciudad;
    document.getElementById("txtEstado").value = selectedClient.persona.estado;
    document.getElementById("txtTelefono").value = selectedClient.persona.telefono;
    document.getElementById("txtFoto").value = "";
    document.getElementById("txtEmail").value = selectedClient.email;
    //document.getElementById("txtStatus").value = selectedClient.estatus;
}

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
        "estatus":1,
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
function deleteCliente() {
    let url = "http://localhost:8080/DreamSoft_SICEFA/api/cliente/deleteCliente";

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
            
      clear();
}


getClientesData();

loadButtons();

/*
 * function deleteCliente() {
    let url = "http://localhost:8080/DreamSoft_SICEFA/api/cliente/deleteCliente";

    let v_idCliente, v_estatus;
    //Persona
    v_idCliente = document.getElementById("txtIdPersona").value;
    v_estatus = document.getElementById("txtStatus").value;

    let datosCliente = {
        idCliente: v_idCliente,
        estatus: v_estatus
    };

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `idCliente=${v_idCliente}&estatus=${v_estatus}`
    };
    fetch(url, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.result === "OK") {
                    console.log("Cliente eliminado con éxito");
                } else {
                    console.error("Error al eliminar el cliente");
                }
            })
            .catch(error => {
                console.error("Error en la solicitud:", error);
            });
}
 */