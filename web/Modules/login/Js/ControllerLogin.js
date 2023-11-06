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
function validateValues() {
    let user = document.getElementById('txtUser').value;
    let password = document.getElementById('txtPassword').value;
    let userObject;

    if(user != '' && password != '') {
        return userObject = {'user' : user, 'password' : password};
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Espacios vacios",
            footer: 'Rellena todos los campos para poder ingresar'
          });
    }
}

/// Funcion para iniciar sesion con las credenciales validadas
function login() {
    let btnCentral = document.getElementById('btn-central');
    let btnSucursal = document.getElementById('btn-sucursal');

    // Boton para validar los usuarios de la aplicacion central
    btnCentral.addEventListener('click', () => {
        
    });

    // Boton para valiar los usuarios de la aplicacion sucursal
    btnSucursal.addEventListener('click', () => {

    });
}

/// Carga de funciones
loadIndex();
login();
