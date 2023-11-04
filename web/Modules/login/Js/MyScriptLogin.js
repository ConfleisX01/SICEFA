console.log("Hola desde JS Login");

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

loadIndex();