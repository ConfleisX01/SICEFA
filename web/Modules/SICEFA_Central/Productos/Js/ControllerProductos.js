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

// Llamada a la función
getProductosData();
