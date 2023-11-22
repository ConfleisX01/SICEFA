function loadButtons() {
    let btnInicio = document.getElementById("button-inicio");
    btnInicio.addEventListener('click', () => {
        loadInicio();
    });
    
    let btnProducto = document.getElementById("button-productos");
    btnProducto.addEventListener('click', () => {
        loadProductos();
    });

    let btnSucursal = document.getElementById("button-sucursales");
    btnSucursal.addEventListener('click', () => {
        loadSucursales();
    });

    let btnCliente = document.getElementById("button-clientes");
    btnCliente.addEventListener('click', () => {
        loadClientes();
    });
}

function loadClientes() {
    fetch("./Modules/SICEFA_Central/Clientes/index.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById('container-central').innerHTML = data;
        }).then(() => {
            const scriptLogin = document.createElement('script');
            scriptLogin.src = './Modules/SICEFA_Central/Clientes/Js/ControllerClientes.js';
            document.body.appendChild(scriptLogin);
        });
}

function loadSucursales() {
    fetch("./Modules/SICEFA_Central/Sucursales/index.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById('container-central').innerHTML = data;
        }).then(() => {
            const scriptLogin = document.createElement('script');
            scriptLogin.src = './Modules/SICEFA_Central/Sucursales/Js/ControllerSucursales.js';
            document.body.appendChild(scriptLogin);
        });
}
function loadProductos() {
    fetch("./Modules/SICEFA_Central/Productos/index.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById('container-central').innerHTML = data;
        }).then(() => {
            const scriptLogin = document.createElement('script');
            scriptLogin.src = './Modules/SICEFA_Central/Productos/Js/ControllerProductos.js';
            document.body.appendChild(scriptLogin);
        });
}

function loadInicio() {
    fetch("./Modules/SICEFA_Central/Inicio/index.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById('container-central').innerHTML = data;
        }).then(() => {
            const scriptLogin = document.createElement('script');
            scriptLogin.src = './Modules/SICEFA_Central/Inicio/Js/ControllerInicio.js';
            document.body.appendChild(scriptLogin);
        });
}

loadInicio();
loadButtons();