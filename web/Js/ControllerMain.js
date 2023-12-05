function loadIndex() {
    fetch("Modules/Index/index.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById("main-container").innerHTML = data;
            })
            .then(() => {
                const scriptLogin = document.createElement('script');
                scriptLogin.src = './Modules/Index/Js/ControllerIndex.js';
                document.body.appendChild(scriptLogin);
            });
}

function loadCentral() {
    fetch("./Modules/SICEFA_Central/index.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById('main-container').innerHTML = data;
            }).then(() => {
        const scriptLogin = document.createElement('script');
        scriptLogin.src = './Modules/SICEFA_Central/Js/ControllerCentral.js';
        document.body.appendChild(scriptLogin);
    });
}

function loadSucursal() {
    fetch("./Modules/SICEFA_Sucursal/index.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById('main-container').innerHTML = data;
            }).then(() => {
        const scriptLogin = document.createElement('script');
        scriptLogin.src = './Modules/SICEFA_Sucursal/Js/ControllerSucursal.js';
        document.body.appendChild(scriptLogin);
    });
}

/// Funcion especializada para el testeo de la seccion Central
loadCentral();
//loadSucursal(); // Eliminar funcion al terminar el testeo del modulo Central
//loadIndex(); // Activar funcion despues del testeo