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

/// Funcion para validar los datos ingresados por el usuario
async function validateValues() {
    let user = document.getElementById('txtUser').value;
    let password = document.getElementById('txtPassword').value;

    if(user != '' && password != '') {
        const url = `http://localhost:8080/DreamSoft_SICEFA/api/login/login?user=${user}&password=${password}`;
        let response = await makePeticion(url);
        if(response == 'OK') {
            Swal.fire({
                title: "Login exitoso",
                text: "Bienvenido al sistema",
                icon: "success"
              });
        } else {
            Swal.fire({
                title: "Datos incorrectos?",
                text: "Los datos que ingresaste son los correctos?",
                icon: "question"
              });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Campos vacios",
            footer: 'Rellena todos los campos para poder ingresar'
          });
    }
}

async function makePeticion(url) {
    return fetch(url).then(function (data) {
        return data.json();
    }).then((json) => {
        return json.result;
    });
}

/// Funcion para iniciar sesion con las credenciales validadas
function login() {
    let btnCentral = document.getElementById('btn-central');
    let btnSucursal = document.getElementById('btn-sucursal');

    // Boton para validar los usuarios de la aplicacion central
    btnCentral.addEventListener('click', () => {
        validateValues();
    });

    // Boton para valiar los usuarios de la aplicacion sucursal
    btnSucursal.addEventListener('click', () => {

    });
}

/// Carga de funciones
loadIndex();
login();
