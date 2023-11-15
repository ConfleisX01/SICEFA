async function getSucursalesData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/sucursal/getAll';
    try {
        let response = await makePeticion(url);
        let table = document.getElementById('table-row');
        table.innerHTML = '';

        console.log(response);

        let htmlString = '';

        response.forEach((sucursal, index) => {
            let { idSucursal, nombre, titular, rfc, domicilio, colonia, codigoPostal, ciudad, estado, telefono, latitud, longitud, estatus } = sucursal;

            htmlString += `
                <tr>
                    <th scope="row">${idSucursal}</th>
                    <td>${nombre}</td>
                    <td>${titular}</td>
                    <td>${domicilio}</td>
                    <td>${telefono}</td>
                    <td>${estatus}</td>
                </tr>`;
        });

        table.innerHTML = htmlString;
    } catch (error) {
        console.error('Error al obtener datos de sucursales:', error);
        // Puedes manejar el error de alguna manera, como mostrar un mensaje al usuario.
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

    let v_nombre, v_titular, v_rfc, v_domicilio, v_colonia, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_latitud, v_longitud;

    v_nombre = document.getElementById("txtNombre").value;
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
        nombre: v_nombre,
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

    const queryString = new URLSearchParams(sucursal).toString();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: queryString
    };

    try {
        let response = await fetch(url, requestOptions);
        let json = await response.json();
        console.log(json); // Muestra la respuesta completa del servidor en la consola
        alert("Datos almacenados. Respuesta del servidor:\n" + JSON.stringify(json));
        // Después de guardar, actualiza la lista de sucursales
        getSucursalesData();
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
    }
}

console.log("hola");
// Llamada a la función
getSucursalesData();
