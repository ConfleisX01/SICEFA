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
        denyButtonText: 'No guardar' }).then((result) => {
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
}