// agregar login a el main
function login(url) {

    fetch(url)
    .then(response =>response.text())
    .then(data => {
        document.getElementById("main-container").innerHTML = data;
    });
    
}
