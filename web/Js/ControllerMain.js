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

/// Funcion de testeo
function loadCentral() {
    fetch("./Modules/SICEFA_Central/index.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("main-container").innerHTML = data;
    });
}


//loadCentral();

/// Restaurar funcion despues del testeo
loadIndex();