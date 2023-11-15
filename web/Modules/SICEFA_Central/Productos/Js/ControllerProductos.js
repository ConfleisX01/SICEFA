async function getProductosData() {
    const url = 'http://localhost:8080/DreamSoft_SICEFA/api/producto/getAll';
    let response = await makePeticion(url);
    let table = document.getElementById('table-row');

    table.innerHTML = '';

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

        let producto = {
            inventario: {
                idSucursal: 1,
                existencias: 100
            },
            nombre: "Pablo",
            nombreGenerico: "Ibuprofeno Genérico",
            formaFarmaceutica: "Tableta",
            unidadMedida: "mg",
            presentacion: "30 tabletas",
            principalIndicacion: "Alivio del dolor",
            contraindicaciones: "Evitar en caso de úlcera",
            concentracion: "500mg",
            unidadesEnvase: 30,
            precioCompra: 2.5,
            precioVenta: 5.99,
            foto: "imagen_ibuprofeno.png",
            rutaFoto: "/ruta/imagen_ibuprofeno.png",
            codigoBarras: "1234567890",
            estatus: 1
        };

        console.log(producto);

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(producto),
        }).then(response => response.json())
            .then(data => {
                // Manejar la respuesta del servidor si es necesario
                console.log('Respuesta del servidor:', data);
            })
            .catch(error => {
                // Manejar errores de la solicitud
                console.error('Error en la solicitud:', error);
            });
    });
}


// Llamada a la función
getProductosData();
addProducto();
