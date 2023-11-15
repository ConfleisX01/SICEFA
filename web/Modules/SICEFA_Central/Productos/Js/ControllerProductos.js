function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    btnAdd.addEventListener('click', () => {
        addProducto();
    });
}

function addProducto() {
    let data = getInputsData();
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/producto/insertProducto";

    let producto = {
        "inventario": {
            "idSucursal": data.idSucursal,
            "existencias": data.existencias
        },
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

    return fetch(url, requestOptions)
        .then(response => response.json())
        .then(json => {
            console.log(json);
        });
}

addProducto().then(() => getProductosData());

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
    let existencias = document.getElementById("txtExistencias").value;
    let idSucursal = document.getElementById("txtIdSucursal").value;

    let object = {
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
        "existencias": existencias,
        "idSucursal": idSucursal
    };

    return object;
}

async function getProductosData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/producto/getAll';
    let response = await makePeticion(url);
    let table = document.getElementById('table-row');

    table.innerHTML = '';

    console.log(response);

    let htmlString = '';

    response.forEach((producto) => {
        let { idProducto, nombre, nombreGenerico, precioCompra, precioVenta, inventario: { existencias } } = producto;

        htmlString += `
            <tr>
                <th scope="row">${idProducto}</th>
                <td>${nombre}</td>
                <td>${nombreGenerico}</td>
                <td>${precioCompra}</td>
                <td>${precioVenta}</td>
                <td>${existencias}</td>
            </tr>`;
    });

    table.innerHTML = htmlString;
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

function addProducto() {
    let btnAgregar = document.getElementById('button-agregar');
    btnAgregar.addEventListener('click', () => {
        const url = `http://localhost:8080/DreamSoft_SICEFA/api/producto/insertProducto`;
        let v_nombre = document.getElementById('txtNombre').value;
        let v_nombreGenerico = document.getElementById('txtNombreGenerico').value;
        let v_formaFarmaceutica = document.getElementById('txtFormaFarmaceutica').value;
        let v_unidadMedida = document.getElementById('txtUnidadMedida').value;
        let v_presentacion = document.getElementById('txtPresentacion').value;
        let v_principalIndicacion = document.getElementById('txtPrincipalIndicacion').value;
        let v_contraindicaciones = document.getElementById('txtContraindicaciones').value;
        let v_concentracion = document.getElementById('txtConcentracion').value;
        let v_unidadesEnvase = document.getElementById('txtUnidadesEnvase').value;
        let v_precioCompra = document.getElementById('txtPrecioCompra').value;
        let v_precioVenta = document.getElementById('txtPrecioVenta').value;
        let v_foto = document.getElementById('txtFoto').value;
        let v_rutaFoto = document.getElementById('txtRutaFoto').value;
        let v_codigoBarras = document.getElementById('txtCodigoBarras').value;
        let v_existencias = document.getElementById('txtExistencias').value;
        let v_idSucursal = document.getElementById('txtIdSucursal').value;

        let producto = {
            inventario: {
                existencias: v_existencias,
                idSucursal: v_idSucursal
            },
            nombre: v_nombre,
            nombreGenerico: v_nombreGenerico,
            formaFarmaceutica: v_formaFarmaceutica,
            unidadMedida: v_unidadMedida,
            presentacion: v_presentacion,
            principalIndicacion: v_principalIndicacion,
            contraindicaciones: v_contraindicaciones,
            concentracion: v_concentracion,
            unidadesEnvase: v_unidadesEnvase,
            precioCompra: v_precioCompra,
            precioVenta: v_precioVenta,
            foto: v_foto,
            rutaFoto: v_rutaFoto,
            codigoBarras: v_codigoBarras
        };

        const queryString = new URLSearchParams(producto).toString();
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            body: queryString
        };

        fetch(url, requestOptions).then(
            function (data) {
                return data.json();
            }
        ).then(
            function (json) {
                console.log(json);
            }
        );

        getProductosData();
    });
}

// Llamada a la función
getProductosData();

loadButtons();