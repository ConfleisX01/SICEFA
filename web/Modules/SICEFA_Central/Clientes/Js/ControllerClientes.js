function loadButtons() {
    let btnAdd = document.getElementById('button-agregar');
    btnAdd.addEventListener('click', () => {
        save();
    });
}function save() {
    let url = "http://localhost:8080/DreamSoft_SICEFA/api/cliente/insertarCliente";
    let v_nombre, v_apellidoPaterno, v_apellidoMaterno, v_genero, v_fechaNacimiento, v_rfc, v_curp,
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
        "estatus": "1",
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
                alert("Objeto insertado" + datosCliente);
                console.log(datosCliente);
            }
    );
}

async function getClientesData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/cliente/getAll';
    let response = await makePeticion(url);
    let table = document.getElementById('table-row');

    table.innerHTML = '';

    console.log(response);

    let htmlString = '';

 response.forEach((cliente, index) => {
        let {fechaRegistro, estatus, persona: {idPersona, nombre, apellidoPaterno, apellidoMaterno, genero}} = cliente;
        let estatusCliente = estatus == 1 ? 'Activo' : 'Inactivo'
        htmlString += `
        <tr>
        <td>
            <p class="fw-bold">#${idPersona}</p>
        </td>
        <td>
            <p class="fw-normal mb-1">${nombre}</p>
        </td>
        <td>
            <p class="fw-normal mb-1">$${apellidoPaterno}</p>
        </td>
        <td class = "fw-bold">${apellidoMaterno}</td>
        <td>${genero}</td>
        <td class = "fw-bold">${fechaRegistro}</td>
        <td><span class="badge badge-success rounded-pill d-inline text-bg-primary">${estatusCliente}</span></td>
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

getClientesData();

loadButtons();