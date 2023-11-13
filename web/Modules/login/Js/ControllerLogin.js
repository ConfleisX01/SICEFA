/// Funcion para cargar el index desde el boton seleccionado
function loadIndex() {
    let lbIndex = document.getElementById('lb-index');

    lbIndex.addEventListener('click', () => {
        fetch("./Modules/Index/index.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById('main-container').innerHTML = data;
            })
            .then(() => {
                const scriptIndex = document.createElement('script');
                scriptIndex.src = './Modules/Index/Js/ControllerIndex.js';
                document.body.appendChild(scriptIndex);
            });
    });
}

function loadCentral() {
    fetch("./Modules/SICEFA_Central/index.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-container').innerHTML = data;
        });
}

/// Funcion para validar el login de SICEFA Central
async function loginUser(rol) {
    let user = document.getElementById('txtUser').value;
    let password = document.getElementById('txtPassword').value;

    if (user != "" && password != "") {
        const url = `http://localhost:8080/DreamSoft_SICEFA/api/login/login?user=${user}&password=${password}`;
        let response = await makePeticion(url);

        if (response.response != "null" && (response.rol === rol || response.rol === "ADMC")) {
            Swal.fire({
                title: 'Bienvenido a SICEFA Central',
                //  text: 'Login Exitoso',
                html: '<b class="style-html">Login Exitoso</b>',
                icon: 'success',
                confirmButtonText: 'Ingresar',
                confirmButtonColor: '#009929',
                buttonsStyling: true,
                showCloseButton: true,
                closeButtonAriaLabel: 'Cerrar Alerta',
                backdrop: true,
                position: 'center',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false,
                customClass: {
                    title: 'titulo-swal',
                    icon: "no-before-icon"
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    loadCentral();
                }
            })
        } else {
            Swal.fire({
                title: 'Datos Erróneos',
                html: '<b class="style-html">¿Estás seguro que los datos que ingresastes son correctos?</b>',
                icon: 'question',
                position: 'center',
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false,
                stopKeydownPropagation: false,
                confirmButtonColor: '#A52019',
                buttonsStyling: true,
                showCloseButton: true,
                closeButtonAriaLabel: 'Cerrar Alerta',
                backdrop: true,
                customClass: {
                    title: 'titulo-swal'
                }
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Campos Vacíos",
            html: '<b class="style-html">No ingresaste todos los campos, inténtalo nuevamente</b>',
            footer: 'Rellena todos los campos para poder ingresar',
            position: 'center',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            stopKeydownPropagation: false,
            confirmButtonColor: '#FF0000',
            buttonsStyling: true,
            showCloseButton: true,
            closeButtonAriaLabel: 'Cerrar Alerta',
            backdrop: true,
            customClass: {
                title: 'titulo-swal'
            }
        });
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

/// Funcion para iniciar sesion con las credenciales validadas
function login() {
    let btnCentral = document.getElementById('btn-central');
    let btnSucursal = document.getElementById('btn-sucursal');

    // Boton para validar los usuarios de la aplicacion central
    btnCentral.addEventListener('click', () => {
        loginUser("ADMC");
    });

    // Boton para valiar los usuarios de la aplicacion sucursal
    btnSucursal.addEventListener('click', () => {
        loginUser("ADMS");
    });
}

/// Carga de funciones
console.log("Hola desde JS login");
loadIndex();
login();