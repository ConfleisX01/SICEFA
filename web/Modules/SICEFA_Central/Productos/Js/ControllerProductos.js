function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    let btnUpdate = document.getElementById('button-actualizar');
    let btnDelete = document.getElementById('button-eliminar');
    btnAdd.addEventListener('click', () => {
        Swal.fire({
            title: "Quieres agregar este producto?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Guardar",
            denyButtonText: `No Guardar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Producto agregado con exito",
                    showConfirmButton: false,
                    timer: 1500
                });
                getProductosData();
                addProducto();
            } else if (result.isDenied) {
                Swal.fire("Operacion cancelada", "", "info");
            }
        });
    });

    btnUpdate.addEventListener('click', () => {
        Swal.fire({
            title: "Quieres actualizar este producto?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Actualizar",
            denyButtonText: `No Actualizar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Producto actualizado con exito",
                    showConfirmButton: false,
                    timer: 1500
                });
                getProductosData();
                updateProducto();
            } else if (result.isDenied) {
                Swal.fire("Operacion cancelada", "", "info");
            }
        });
    });

    btnDelete.addEventListener('click', () => {
        Swal.fire({
            title: "Quieres eliminar este producto?",
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: "Eliminar",
            denyButtonText: `No Eliminar`
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Producto eliminado con exito",
                    showConfirmButton: false,
                    timer: 1500
                });
                delteProducto();
                getProductosData();
            } else if (result.isDenied) {
                Swal.fire("Operacion cancelada", "", "info");
            }
        });
    });
}

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
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ producto: JSON.stringify(producto) })
    };

    fetch(url, requestOptions).then(
        function (data) {
            return data.json();
        })
        .then(function () {
            getProductosData();
        });
}

function updateProducto() {
    let data = getInputsData();
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/producto/updateProducto";

    let producto = {
        "idProducto" : data.idProducto,        
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
        "estatus" : data.estatus
    }

    console.log(producto);

    const requestOptions = {
        method: "POST",
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ producto: JSON.stringify(producto) })
    };

    fetch(url, requestOptions).then(
        function (data) {
            return data.json();
        })
        .then(function () {
            getProductosData();
        });
}

async function delteProducto() {
    let data = getInputsData();
    let id = data.idProducto;
    console.log(data.estatus);
    let estatus = data.estatus == 1 ? 0 : 1;
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/producto/deleteProducto";

    let producto = {
        "idProducto" : id,
        "estatus" : estatus
    }

    console.log(producto);

    const requestOptions = {
        method: "POST",
        headers: { 'Content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ producto: JSON.stringify(producto) })
    };

    fetch(url, requestOptions).then(
        function (data) {
            return data.json();
        })
        .then(function () {
            getProductosData();
        });
}

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
    let estatus = document.getElementById("txtEstatus").value;

    let object = {
        "idProducto" : idProducto,
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
        "estatus" : estatus
    };

    return object;
}

async function getProductosData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/producto/getAll';
    let response = await makePeticion(url);
    let table = document.getElementById('table-row');

    table.innerHTML = '';

    let htmlString = '';

    response.forEach((producto, index) => {
        let { idProducto, nombre, nombreGenerico, precioCompra, precioVenta, codigoBarras, estatus} = producto;
        let estatusProducto = estatus == 1 ? 'Activo' : 'Inactivo'
        htmlString += `
        <tr scope = "row" class = "text-center fila" onclick="filaClickeada(${index})">
        <th>${idProducto}</th>
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

async function filaClickeada(index) {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/producto/getAll';
    let response = await makePeticion(url);

    asignProductoData(response[index]);
}

function asignProductoData(response) {
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
