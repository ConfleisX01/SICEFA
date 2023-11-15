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

    fetch(url, requestOptions).then(
        function (data) {
            return data.json();
        }
    ).then(
        function (json) {
            console.log(json);
        }
    );
};

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

loadButtons();