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

    optionsActive();
}
let btnSalida = document.getElementById("button-salir");
    btnSalida.addEventListener('click', () =>{
        Swal.fire({
            title: "Confirmar Operación",
            text: "¿Estás seguro de que deseas salir de SICEFA Central?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            confirmButtonText: "Salir",
            cancelButtonText: "Cancelar",
            reverseButtons: true,
            focusCancel: true
        }).then((result) => {
            if (result.isConfirmed) {
                 Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Saliendoo....",
                    showConfirmButton: false,
                    timer: 1500
                });
                loadLogin();
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire("Operación cancelada", "", "info");
            }
        });
         //loadLogin();
    });
    
    //Funcion para salir de SICEFA Central
    function loadLogin() {
    fetch("./Modules/login/login.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById('main-container').innerHTML = data;
            }).then(() => {
        const scriptLogin = document.createElement('script');
        scriptLogin.src = './Modules/login/Js/ControllerLogin.js';
        document.body.appendChild(scriptLogin);
    });
}
    
// FUncion para cargar el modulo sucursales

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

// Funcion para cargar el modulo productos

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

// Funcion para cargar la pagina inicial

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

/// Funcion para agregar el estado activo en los botones de las opciones
function optionsActive() {
    let menuOptions = document.querySelectorAll(".option");

    menuOptions.forEach(option => {
        option.addEventListener('click', () => {

            menuOptions.forEach(opt => {
                opt.classList.remove("active");
            });

            option.classList.add("active");
        });
    });
}


loadInicio();
loadButtons();