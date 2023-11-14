function loadButtons() {
    let btnProducto = document.getElementById("button-productos");
    btnProducto.addEventListener('click', () => {
        loadProductos();
    });

    let btnInicio = document.getElementById('button-inicio');
    btnInicio.addEventListener('click', () => {
        loadInicio();
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
    });
}

loadInicio();
loadButtons();