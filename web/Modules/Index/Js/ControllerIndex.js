/// Carga del contenido de productos
async function loadProducts() {
    let productsInfo = await getJsonData();

    let position = 0;
    let max = productsInfo.length;
    let buttonPrevius = document.getElementById('btn-previous');
    let buttonNext = document.getElementById('btn-next');

    insertDataContainer(position, productsInfo);

    buttonNext.addEventListener("click", () => {
        if (position == max - 1) {
            position = 0;
        } else {
            position++;
        }
        insertDataContainer(position, productsInfo);
    });

    buttonPrevius.addEventListener("click", () => {
        if (position == 0) {
            position = max - 1;
        } else {
            position--;
        }
        insertDataContainer(position, productsInfo);
    });
}

/// Insertar los datos traidos del Json a los contenedores del HTML
function insertDataContainer(index, productsInfo) {
    let title = document.getElementById('lb-title');
    let type = document.getElementById("lb-type");
    let content = document.getElementById("lb-content");
    let description = document.getElementById("lb-description");

    title.textContent = productsInfo[index].title;
    type.textContent = productsInfo[index].type;
    content.textContent = productsInfo[index].content;
    description.textContent = productsInfo[index].description;
}

/// Obtener los datos del Json y agregarlos a un arreglo
function getJsonData() {
    return fetch('Json/medsInfo.json')
        .then(res => res.json())
        .then((data) => {
            return data;
        });
}

/// Funcion para cargar el login desde el boton correspondiente
function loadLogin() {
    let btnLogin = document.getElementById('btn-login');

    btnLogin.addEventListener('click', () => {
        fetch("./Modules/Login/login.html")
            .then(response => response.text())
            .then(data => {
                document.getElementById('main-container').innerHTML = data;
            })
            .then(() => {
                const scriptLogin = document.createElement('script');
                scriptLogin.src = './Modules/Login/Js/ControllerLogin.js';
                document.body.appendChild(scriptLogin);
            });
    })
}

console.log("Hola desde Js index");
loadProducts();
loadLogin();