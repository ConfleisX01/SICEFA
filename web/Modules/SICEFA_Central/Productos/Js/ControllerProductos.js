async function getProductosData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/producto/getAll';
    let response = await makePeticion(url);
    let table = document.getElementById('table-row');

    table.innerHTML = '';

    console.log(response);

    let htmlString = '';

    response.forEach((producto, index) => {
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
            "inventario": {
                "existencias": parseInt(v_existencias),
                "idSucursal": parseInt(v_idSucursal)
            },
            "nombre": v_nombre,
            "nombreGenerico": v_nombreGenerico,
            "formaFarmaceutica": v_formaFarmaceutica,
            "unidadMedida": v_unidadMedida,
            "presentacion": v_presentacion,
            "principalIndicacion": v_principalIndicacion,
            "contraindicaciones": v_contraindicaciones,
            "concentracion": v_concentracion,
            "unidadesEnvase": parseInt(v_unidadesEnvase),
            "precioCompra": parseFloat(v_precioCompra),
            "precioVenta": parseFloat(v_precioVenta),
            "foto": v_foto,
            "rutaFoto": v_rutaFoto,
            "codigoBarras": v_codigoBarras
        };

        const queryString = new URLSearchParams(producto).toString();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
addProducto();
