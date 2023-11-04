loadIndex();

function loadIndex(){
    fetch("./Modules/Index/index.html")
    .then(response => response.text())
    .then(data => {
        document.getElementById("main-container").innerHTML = data;
    })
}

// agregar login a el main
function login(url) {

    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("main-container").innerHTML = data;
        });

}
 function regresarIndex(url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById("main-container").innerHTML = data
        })
}
