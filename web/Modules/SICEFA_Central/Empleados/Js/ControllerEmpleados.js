function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    let btnUpdate = document.getElementById('button-actualizar');
    let btnDelete = document.getElementById("button-eliminar");
    let btnSearch = document.getElementById("button-buscar");
    let btnclean = document.getElementById("button-limpiar");
    let checkBox = document.getElementById("cbEstatusBusqueda");



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
                getEmpleadosData();
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
        getEmpleadosData();
    });

    checkBox.addEventListener('change', async function () {
        await searchEstatusEmpleado();
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
                    getEmpleadosData();
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
        const url = 'http://localhost:8080/DreamSoft_SICEFA/api/empleado/getAll';
        let response = await makePeticion(url);
        let dataToSearch = document.getElementById('txtBusqueda').value;

        const searchResults = searchEmpleado(response, dataToSearch);

        if (searchResults.length !== 0) {
            insertRow(searchResults);
        } else {
            getEmpleadosData();
            Swal.fire({
                icon: "error",
                title: "Sucursal no encontrada",
                text: "El nombre de la sucursal que estás buscando no existe.",
                footer: '<b>Asegúrate de ingresar el nombre correctamente</b>'
            });
        }
    });

    checkBox.addEventListener('change', async function () {
        await searchEstatusEmpleado();
    });

}


function insertRow(data) {
    let table = document.getElementById('table-row');

    table.innerHTML = '';

    let htmlString = '';

    data.forEach((empleado, index) => {
        let {
            idEmpleado,
            codigo,
            fechaIngreso,
            puesto,
            salarioBruto,
            activo,
            persona: {
                idPersona,
                nombre,
                apellidoPaterno,
                apellidoMaterno,
                genero,
                fechaNacimientoPersona,
                rfcPersona,
                curpPersona,
                domicilioPersona,
                codigoPostalPersona,
                ciudadPersona,
                estadoPersona,
                telefonoPersona,
                fotoPersona
            },
            usuario: {
                idUsuario,
                nombreUsuario,
                contrasenia,
                rol
            },
            sucursal: {
                idSucursal,
                nombreSucursal,
                titularSucursal,
                rfcSucursal,
                domicilioSucursal,
                colonia,
                codigoPostalSucursal,
                ciudadSucursal,
                estadoSucursal,
                telefonoSucursal,
                latitud,
                longitud,
                estatusSucursal
            }
        } = empleado;


        htmlString += `
                   <tr onclick="obtenerFila(${index})">
                      <th scope="row">${idEmpleado}</th>
                             <td>${nombre}</td>
                             <td>${apellidoPaterno}</td>
                             <td>${apellidoMaterno}</td>
                              <td>${genero}</td>
                              <td>${fechaIngreso}</td>
                             <td>${activo}</td>
                 </tr>`;


    });

    table.innerHTML = htmlString;
}


function searchEmpleado(array, dataToSearch) {
    const searchResults = array.filter(empleado => {
        for (let key in empleado) {
            if (empleado[key] && empleado[key].toString().toLowerCase().includes(dataToSearch.toLowerCase())) {
                return true;
            }
        }
        return false;
    });

    return searchResults;
}
async function searchEstatusEmpleado() {
    let checkBox = document.getElementById("cbEstatusBusqueda");

    if (checkBox.checked) {
        const url = 'http://localhost:8080/DreamSoft_SICEFA/api/empleado/getAll';

        let response = await makePeticion(url);
        let table = document.getElementById('table-row');
        table.innerHTML = '';

        let htmlString = '';

        response.forEach((empleado, index) => {
            let {
                idEmpleado,
                codigo,
                fechaIngreso,
                puesto,
                salarioBruto,
                activo,
                persona: {
                    idPersona,
                    nombre,
                    apellidoPaterno,
                    apellidoMaterno,
                    genero,
                    fechaNacimientoPersona,
                    rfcPersona,
                    curpPersona,
                    domicilioPersona,
                    codigoPostalPersona,
                    ciudadPersona,
                    estadoPersona,
                    telefonoPersona,
                    fotoPersona
                },
                usuario: {
                    idUsuario,
                    nombreUsuario,
                    contrasenia,
                    rol
                },
                sucursal: {
                    idSucursal,
                    nombreSucursal,
                    titularSucursal,
                    rfcSucursal,
                    domicilioSucursal,
                    colonia,
                    codigoPostalSucursal,
                    ciudadSucursal,
                    estadoSucursal,
                    telefonoSucursal,
                    latitud,
                    longitud,
                    estatusSucursal
                }
            } = empleado;

            if (activo === 0) { // Filtra por estado deseado (0 en este caso)
                htmlString += `
                   <tr onclick="obtenerFila(${index})">
                      <th scope="row">${idEmpleado}</th>
                             <td>${nombre}</td>
                             <td>${apellidoPaterno}</td>
                             <td>${apellidoMaterno}</td>
                              <td>${genero}</td>
                              <td>${fechaIngreso}</td>
                             <td>${activo}</td>
                 </tr>`;
            }

        });

        table.innerHTML = htmlString;
    } else {
        getEmpleadosData();
    }
}

async function save() {


    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/empleado/insertarEmpleado';
    let v_nombre, v_apellidoPaterno, v_apellidoMaterno, v_genero, v_fechaNacimiento, v_rfc, v_curp, v_domicilio, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_foto, v_rol, v_puesto, v_salarioBruto, v_idSucursal, v_estatus;
    v_nombre = document.getElementById("txtNombre").value;
    v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    v_genero = document.getElementById("txtGenero").value;
    v_rfc = document.getElementById("txtRfc").value;
    v_curp = document.getElementById("txtCurp").value;
    v_domicilio = document.getElementById("txtDomicilio").value;
    v_codigoPostal = document.getElementById("txtCodPostal").value;
    v_ciudad = document.getElementById("txtCiudad").value;
    v_estado = document.getElementById("txtEstado").value;
    v_telefono = document.getElementById("txtTelefono").value;
    v_foto = document.getElementById("txtFoto").value;
    v_rol = document.getElementById("txtRol").value;
    v_puesto = document.getElementById("txtPuesto").value;
    v_salarioBruto = document.getElementById("txtSalarioBruto").value;
    v_idSucursal = document.getElementById("txtIdSucursal").value;
    v_fechaNacimiento = document.getElementById("txtFechaNacimiento").value;



    let empleado = {

        sucursal: {
            idSucursal: v_idSucursal

        },
        usuario: {
            rol: v_rol
        },

        puesto: v_puesto,
        salarioBruto: v_salarioBruto,
        persona: {
            nombre: v_nombre,
            apellidoPaterno: v_apellidoPaterno,
            apellidoMaterno: v_apellidoMaterno,
            genero: v_genero,
            fechaNacimiento: v_fechaNacimiento,
            rfc: v_rfc,
            curp: v_curp,
            domicilio: v_domicilio,
            codigoPostal: v_codigoPostal,
            ciudad: v_ciudad,
            estado: v_estado,
            telefono: v_telefono,
            foto: v_foto
        }
    };


    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({empleado: JSON.stringify(empleado)})
    };


    try {
        const response = await fetch(url, requestOptions);
        const data = await response.json();
        getEmpleadosData();
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
    }

}

async function eliminate() {
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/empleado/eliminarEmpleado";

    let v_idEmpleado;

    v_idEmpleado = document.getElementById("txtIdEmpleado").value;

    let empleado = {
        idEmpleado: v_idEmpleado
    };

    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({empleado: JSON.stringify(empleado)})
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
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/empleado/modificarEmpleado';
    let v_nombre, v_apellidoPaterno, v_apellidoMaterno, v_genero, v_fechaNacimiento, v_rfc, v_curp, v_domicilio, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_foto, v_rol, v_puesto, v_salarioBruto, v_idSucursal, v_estatus, v_idEmpleado;
    v_nombre = document.getElementById("txtNombre").value;
    v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    v_genero = document.getElementById("txtGenero").value;
    v_rfc = document.getElementById("txtRfc").value;
    v_curp = document.getElementById("txtCurp").value;
    v_domicilio = document.getElementById("txtDomicilio").value;
    v_codigoPostal = document.getElementById("txtCodPostal").value;
    v_ciudad = document.getElementById("txtCiudad").value;
    v_estado = document.getElementById("txtEstado").value;
    v_telefono = document.getElementById("txtTelefono").value;
    v_foto = document.getElementById("txtFoto").value;
    v_rol = document.getElementById("txtRol").value;
    v_puesto = document.getElementById("txtPuesto").value;
    v_salarioBruto = document.getElementById("txtSalarioBruto").value;
    v_idSucursal = document.getElementById("txtIdSucursal").value;
    v_idEmpleado = document.getElementById("txtIdEmpleado").value;
    v_fechaNacimiento = document.getElementById("txtFechaNacimiento").value;



    let empleado = {

        sucursal: {
            idSucursal: v_idSucursal,
        },
        usuario: {
            rol: v_rol
        },
        idEmpleado: v_idEmpleado,
        puesto: v_puesto,
        salarioBruto: v_salarioBruto,
        persona: {
            nombre: v_nombre,
            apellidoPaterno: v_apellidoPaterno,
            apellidoMaterno: v_apellidoMaterno,
            genero: v_genero,
            fechaNacimiento: v_fechaNacimiento,
            rfc: v_rfc,
            curp: v_curp,
            domicilio: v_domicilio,
            codigoPostal: v_codigoPostal,
            ciudad: v_ciudad,
            estado: v_estado,
            telefono: v_telefono,
            foto: v_foto
        }

    };

    console.log(empleado);
    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({empleado: JSON.stringify(empleado)})
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


    if (document.getElementById("txtRol").value == "") {
        return false;
    }

    if (document.getElementById("txtPuesto").value == "") {
        return false;
    }

    if (document.getElementById("txtSalarioBruto").value == "") {
        return false;
    }

    return true;
}

async function getEmpleadosData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/empleado/getAll';
    try {
        let response = await makePeticion(url);
        let table = document.getElementById('table-row');
        table.innerHTML = '';

        console.log(response);

        let htmlString = '';

        response.forEach((empleado, index) => {
            let {
                idEmpleado,
                codigo,
                fechaIngreso,
                puesto,
                salarioBruto,
                activo,
                persona: {
                    idPersona,
                    nombre,
                    apellidoPaterno,
                    apellidoMaterno,
                    genero,
                    fechaNacimientoPersona,
                    rfcPersona,
                    curpPersona,
                    domicilioPersona,
                    codigoPostalPersona,
                    ciudadPersona,
                    estadoPersona,
                    telefonoPersona,
                    fotoPersona
                },
                usuario: {
                    idUsuario,
                    nombreUsuario,
                    contrasenia,
                    rol
                },
                sucursal: {
                    idSucursal,
                    nombreSucursal,
                    titularSucursal,
                    rfcSucursal,
                    domicilioSucursal,
                    colonia,
                    codigoPostalSucursal,
                    ciudadSucursal,
                    estadoSucursal,
                    telefonoSucursal,
                    latitud,
                    longitud,
                    estatusSucursal
                }
            } = empleado;
            if (activo === 1) {
                htmlString += `
                 <tr onclick="obtenerFila(${index})">
                      <th scope="row">${idEmpleado}</th>
                             <td>${nombre}</td>
                             <td>${apellidoPaterno}</td>
                             <td>${apellidoMaterno}</td>
                              <td>${genero}</td>
                              <td>${fechaIngreso}</td>
                             <td>${activo}</td>
                 </tr>`;

            }
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
        console.log("hola");
        return json;
    } catch (error) {
        throw error;
    }
}

function asignarInputs(responses) {
    console.log(responses);
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


    document.getElementById("txtNombre").value = responses.persona.nombre;
    document.getElementById("txtApellidoPaterno").value = responses.persona.apellidoPaterno;
    document.getElementById("txtApellidoMaterno").value = responses.persona.apellidoMaterno;
    document.getElementById("txtGenero").value = responses.persona.genero;
    document.getElementById("txtFechaNacimiento").value = responses.persona.fechaNacimiento;
    document.getElementById("txtRfc").value = responses.persona.rfc;
    document.getElementById("txtCurp").value = responses.persona.curp;
    document.getElementById("txtDomicilio").value = responses.persona.domicilio;
    document.getElementById("txtCodPostal").value = responses.persona.codigoPostal;
    document.getElementById("txtCiudad").value = responses.sucursal.ciudad;
    document.getElementById("txtEstado").value = responses.sucursal.estado;
    document.getElementById("txtTelefono").value = responses.persona.telefono;
    document.getElementById("txtRol").value = responses.usuario.rol;
    document.getElementById("txtPuesto").value = responses.puesto;
    document.getElementById("txtSalarioBruto").value = responses.salarioBruto;
    document.getElementById("txtIdSucursal").value = responses.sucursal.idSucursal;
    document.getElementById("txtIdEmpleado").value = responses.idEmpleado;



    // Obtener el checkbox
    let checkbox = document.getElementById("cbEstatus");
    // Verificar si estatus es igual a 1 y marcar el checkbox
    if (responses.activo === 1) {
        checkbox.checked = true;
    } else {
        checkbox.checked = false;
    }
}

async function  obtenerFila(index) {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/empleado/getAll';

    let response = await makePeticion(url);
    asignarInputs(response[index]);
    console.log(index);
}

// evento para limpiar los inputs
async  function clean() {


    document.getElementById("txtIdSucursal").value = "";
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
    document.getElementById("txtRol").value = "";
    document.getElementById("txtPuesto").value = "";
    document.getElementById("txtSalarioBruto").value = "";
    document.getElementById("txtIdEmpleado").value = "";

    let checkbox = document.getElementById("cbEstatus");
    checkbox.checked = false;
    checkbox.disabled = true;
}

getEmpleadosData();
loadButtons();

