function loadButtons() {
    let btnInicio = document.getElementById("button-inicio");
    btnInicio.addEventListener('click', () => {
        loadInicio();
    });

    let btnEmpleado = document.getElementById("button-empleados");
    btnEmpleado.addEventListener('click', () => {
        loadEmpleados();
    });

    let btnCliente = document.getElementById("button-clientes");
    btnCliente.addEventListener('click', () => {
        loadClientes();
    });
    let btnSalida = document.getElementById("button-salir");
    btnSalida.addEventListener('click', () =>{
        Swal.fire({
            title: "Confirmar Operación",
            text: "¿Estás seguro de que deseas salir de SICEFA Sucursal?",
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

    optionsActive();
}

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

// Funcion para cargar la pagina inicial
function loadInicio() {
    fetch("./Modules/SICEFA_Sucursal/Inicio/index.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById('container-sucursal').innerHTML = data;
            }).then(() => {
        const scriptLogin = document.createElement('script');
        scriptLogin.src = './Modules/SICEFA_Sucursal/Inicio/Js/ControllerInicio.js';
        document.body.appendChild(scriptLogin);
    });
}

// Funcion para cargar la pagina Empleados
function loadEmpleados() {
    fetch("./Modules/SICEFA_Sucursal/Empleados/index.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById('container-sucursal').innerHTML = data;
            }).then(() => {
        const scriptLogin = document.createElement('script');
        scriptLogin.src = './Modules/SICEFA_Sucursal/Empleados/Js/ControllerEmpleados.js';
        document.body.appendChild(scriptLogin);
    });
}

//Función para cargar la página de clientes
function loadClientes() {
    fetch("./Modules/SICEFA_Sucursal/Clientes/index.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById('container-sucursal').innerHTML = data;
            }).then(() => {
        const scriptLogin = document.createElement('script');
        scriptLogin.src = './Modules/SICEFA_Sucursal/Clientes/Js/ControllerClientes.js';
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