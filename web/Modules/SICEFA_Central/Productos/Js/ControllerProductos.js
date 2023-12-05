function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    let btnUpdate = document.getElementById('button-actualizar');
    let btnDelete = document.getElementById('button-eliminar');
    let btnSearch = document.getElementById('button-buscar');
    let btnclean = document.getElementById("button-limpiar");
    let checkBox = document.getElementById("cbEstatusBusqueda");

    // Llamado de la funcion agregar
    btnAdd.addEventListener('click', async () => {
        if (validateInputs()) {
            const result = await Swal.fire({
                title: "¿Quieres agregar este producto?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Guardar",
                denyButtonText: "No Guardar"
            });

            if (result.isConfirmed) {
                await addProducto();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Producto agregado con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                getProductosData();
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

    // Llamado de la funcion actualizar
    btnUpdate.addEventListener('click', async () => {
        if (validateInputs()) {
            const result = await Swal.fire({
                title: "¿Quieres actualizar este producto?",
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: "Actualizar",
                denyButtonText: "No Actualizar"
            });
            if (result.isConfirmed) {
                await updateProducto();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Producto actualizado con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });
                getProductosData();
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

    // Llamado de la funcion eliminar
    btnDelete.addEventListener('click', () => {
        Swal.fire({
            title: "Confirmar Operación",
            text: "¿Estás seguro de que deseas realizar esta operación?",
            footer: "<b> Puedes activar/desactivar el producto más tarde si es necesario.</b>",
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
                    title: "Producto eliminado exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                delteProducto();
                getProductosData();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Operación cancelada", "", "info");
            }
        });
    });

    // Llamado de la funcion buscar productos
    btnSearch.addEventListener('click', async () => {
        const url = 'http://localhost:8080/DreamSoft_SICEFA/api/producto/getAll';
        let response = await makePeticion(url);
        let dataToSearch = document.getElementById('txtBusqueda').value;

        if (searchProducto(response, dataToSearch).length != 0) {
            insertRow(searchProducto(response, dataToSearch));
        } else {
            Swal.fire({
                icon: "error",
                title: "Producto no encontrado",
                text: "El nombre del producto que estás buscando no existe.",
                footer: '<b>Asegúrate de ingresar el nombre correctamente</b>'
            });
        }
    });

    //Llamado de la función limpiar
    btnclean.addEventListener('click', async () => {
        await clean();
        getProductosData();
    });
}

/// Funcion para agregar un nuevo producto
function addProducto() {
    let data = getInputsData();
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/producto/insertProducto";

    let producto = {
        "nombre": data.nombre,
        "nombreGenerico": data.nombreGenerico,
        "formaFarmaceutica": data.formaFarmaceutica,
        "unidadMedida": data.unidadMedida,
        "presentacion": data.presentacion,
        "principalIndicacion": data.principalIndicacion,
        "contraindicaciones": data.contraindicaciones,
        "concentracion": data.concentracion,
        "unidadesEnvase": data.unidadesEnvase,
        "precioCompra": data.precioCompra,
        "precioVenta": data.precioVenta,
        "foto": data.foto,
        "rutaFoto": data.rutaFoto,
        "codigoBarras": data.codigoBarras
    }

    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({producto: JSON.stringify(producto)})
    };

    fetch(url, requestOptions).then(
            function (data) {
                return data.json();
            })
            .then(function () {
                getProductosData();
            });
}

/// Funcion para actualizar los datos de los productos
function updateProducto() {
    let data = getInputsData();
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/producto/updateProducto";

    let producto = {
        "idProducto": data.idProducto,
        "nombre": data.nombre,
        "nombreGenerico": data.nombreGenerico,
        "formaFarmaceutica": data.formaFarmaceutica,
        "unidadMedida": data.unidadMedida,
        "presentacion": data.presentacion,
        "principalIndicacion": data.principalIndicacion,
        "contraindicaciones": data.contraindicaciones,
        "concentracion": data.concentracion,
        "unidadesEnvase": data.unidadesEnvase,
        "precioCompra": data.precioCompra,
        "precioVenta": data.precioVenta,
        "foto": data.foto,
        "rutaFoto": data.rutaFoto,
        "codigoBarras": data.codigoBarras,
        "estatus": data.estatus
    }

    console.log(producto);

    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({producto: JSON.stringify(producto)})
    };

    fetch(url, requestOptions).then(
            function (data) {
                return data.json();
            })
            .then(function () {
                getProductosData();
            });
}

/// Funcion para la elimicacion logica del producto
async function delteProducto() {
    let data = getInputsData();
    let id = data.idProducto;
    let estatus = data.estatus == 1 ? 0 : 1;
    let check = document.getElementById('cbEstatus');
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/producto/deleteProducto";

    let producto = {
        "idProducto": id,
        "estatus": estatus
    }

    console.log(producto);

    const requestOptions = {
        method: "POST",
        headers: {'Content-type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({producto: JSON.stringify(producto)})
    };

    fetch(url, requestOptions).then(
            function (data) {
                return data.json();
            })
            .then(function () {
                getProductosData();
            });

    if (check.checked) {
        check.checked = false;
    } else {
        check.checked = true;
    }
}

/// Funcion para obtener los datos de los inputs
function getInputsData() {
    // Obtén todos los elementos de entrada por su nombre
    let nombre = document.getElementById("txtNombre").value;
    let nombreGenerico = document.getElementById("txtNombreGenerico").value;
    let formaFarmaceutica = document.getElementById("txtFormaFarmaceutica").value;
    let unidadMedida = document.getElementById("txtUnidadMedida").value;
    let presentacion = document.getElementById("txtPresentacion").value;
    let principalIndicacion = document.getElementById("txtPrincipalIndicacion").value;
    let contraindicaciones = document.getElementById("txtContraindicaciones").value;
    let concentracion = document.getElementById("txtConcentracion").value;

    let unidadesEnvase = document.getElementById("txtUnidadesEnvase").value;
    let precioCompra = document.getElementById("txtPrecioCompra").value;
    let precioVenta = document.getElementById("txtPrecioVenta").value;
    let foto = document.getElementById("txtFoto").value;
    let rutaFoto = document.getElementById("txtRutaFoto").value;
    let codigoBarras = document.getElementById("txtCodigoBarras").value;
    let idProducto = document.getElementById("txtIdProducto").value;
    let estatus = document.getElementById("cbEstatus").checked == true ? 1 : 0;

    let object = {
        "idProducto": idProducto,
        "nombre": nombre,
        "nombreGenerico": nombreGenerico,
        "formaFarmaceutica": formaFarmaceutica,
        "unidadMedida": unidadMedida,
        "presentacion": presentacion,
        "principalIndicacion": principalIndicacion,
        "contraindicaciones": contraindicaciones,
        "concentracion": concentracion,
        "unidadesEnvase": unidadesEnvase,
        "precioCompra": precioCompra,
        "precioVenta": precioVenta,
        "foto": foto,
        "rutaFoto": rutaFoto,
        "codigoBarras": codigoBarras,
        "estatus": estatus
    };

    return object;
}

/// Funcion para obtener los datos de los productos directamente desde la API y llamar la funcion de insertar las filas
async function getProductosData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/producto/getAll';
    let response = await makePeticion(url);

    insertRow(response);
}

/// Funcion para insertar los datos en la tabla
function insertRow(data) {
    let table = document.getElementById('table-row');

    table.innerHTML = '';

    let htmlString = '';

    data.forEach((producto, index) => {
        let {idProducto, nombre, precioCompra, codigoBarras, estatus} = producto;
        let estatusProducto = estatus == 1 ? 'Activo' : 'Inactivo'
        htmlString += `
        <tr scope = "row" class = "text-center fila" onclick="filaClickeada(${index})">
        <td class = "colId">${idProducto}</th>
        <td><img class = "" src = "./Img/SinImagen.svg" style = "width: 64px"></td>
        <td>
            <p>${nombre}</p>
        </td>
        <td>
            <p>${precioCompra}</p>
        </td>
        <td>${codigoBarras}</td>
        <td>${estatusProducto}</td>
      </tr>`;
    });

    table.innerHTML = htmlString;
}

/// Funcion para filtrar los elementos dentro del array principal por nombre
function searchProducto(array, nombreBuscado) {
    return array.filter(producto => producto.nombre.includes(nombreBuscado));
}

/// Funcion para obtener el indice del producto seleccionado en la tabla
async function filaClickeada(index) {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/producto/getAll';
    let response = await makePeticion(url);
    let datos = document.querySelectorAll(".colId");
    id = parseInt(datos[index].textContent);
    asignProductoData(response[id - 1]);
}

/// Funcion para asignar los datos de los productos a los inputs
function asignProductoData(response) {
    /// Codigo creado por Juan Pablo Perez Fernandez DreamSoft DSM406 (Confleis)
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Producto listo para modificar',
        showConfirmButton: false,
        timer: 1500,
        footer: 'Visita la sección de <span class = "fw-bold text-cian mx-1"><i class="bi bi-pen-fill"></i> Control Productos</span>',
        showCloseButton: true,
        customClass: {
            popup: 'custom-popup-class',
        },
        timerProgressBar: true,
    });

    document.getElementById("txtNombre").value = response.nombre;
    document.getElementById("txtNombreGenerico").value = response.nombreGenerico;
    document.getElementById("txtFormaFarmaceutica").value = response.formaFarmaceutica;
    document.getElementById("txtUnidadMedida").value = response.unidadMedida;
    document.getElementById("txtPresentacion").value = response.presentacion;
    document.getElementById("txtPrincipalIndicacion").value = response.principalIndicacion;
    document.getElementById("txtContraindicaciones").value = response.contraindicaciones;
    document.getElementById("txtConcentracion").value = response.concentracion;
    document.getElementById("txtUnidadesEnvase").value = response.unidadesEnvase;
    document.getElementById("txtPrecioCompra").value = response.precioCompra;
    document.getElementById("txtPrecioVenta").value = response.precioVenta;
    document.getElementById("txtRutaFoto").value = response.rutaFoto;
    document.getElementById("txtCodigoBarras").value = response.codigoBarras;
    document.getElementById("txtIdProducto").value = response.idProducto;
    document.getElementById("cbEstatus").checked = response.estatus == 1 ? true : false;
}

function clean() {
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtNombreGenerico").value = "";
    document.getElementById("txtFormaFarmaceutica").value = "";
    document.getElementById("txtUnidadMedida").value = "";
    document.getElementById("txtPresentacion").value = "";
    document.getElementById("txtPrincipalIndicacion").value = "";
    document.getElementById("txtContraindicaciones").value = "";
    document.getElementById("txtConcentracion").value = "";
    document.getElementById("txtUnidadesEnvase").value = "";
    document.getElementById("txtPrecioCompra").value = "";
    document.getElementById("txtPrecioVenta").value = "";
    document.getElementById("txtRutaFoto").value = "";
    document.getElementById("txtCodigoBarras").value = "";
    document.getElementById("txtIdProducto").value = "";
    let checkbox = document.getElementById("cbEstatus");
    checkbox.checked = false;
    checkbox.disabled = true;
}
/// Funcion para validar las entradas o datos que se ingresaron en los inputs, pasando por alto ruta de la foto, foto, id, estatus
function validateInputs() {
    if (document.getElementById("txtNombre").value == "") {
        return false;
    }

    if (document.getElementById("txtNombreGenerico").value == "") {
        return false;
    }

    if (document.getElementById("txtFormaFarmaceutica").value == "") {
        return false;
    }

    if (document.getElementById("txtUnidadMedida").value == "") {
        return false;
    }

    if (document.getElementById("txtPresentacion").value == "") {
        return false;
    }

    if (document.getElementById("txtPrincipalIndicacion").value == "") {
        return false;
    }

    if (document.getElementById("txtContraindicaciones").value == "") {
        return false;
    }

    if (document.getElementById("txtConcentracion").value == "") {
        return false;
    }

    if (document.getElementById("txtUnidadesEnvase").value == "") {
        return false;
    }

    if (document.getElementById("txtPrecioCompra").value == "") {
        return false;
    }

    if (document.getElementById("txtPrecioVenta").value == "") {
        return false;
    }

    if (document.getElementById("txtCodigoBarras").value == "") {
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

getProductosData();
loadButtons();
