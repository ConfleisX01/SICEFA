let productsInfo = [];

/// Carga del contenido de productos
async function loadProducts() {
    await getJsonData();

    let position = 0;
    let max = productsInfo.length;
    let buttonPrevius = document.getElementById('btn-previous');
    let buttonNext = document.getElementById('btn-next');

    insertDataContainer(position);

    buttonNext.addEventListener("click", () =>{
        if(position == max - 1) {
            position = 0;
        } else {
            position++;
        }
        insertDataContainer(position);
    });

    buttonPrevius.addEventListener("click", () => {
        if(position == 0) {
            position = max - 1;
        } else {
            position--;
        }
        insertDataContainer(position);
    });
}

function insertDataContainer(index) {
    let title = document.getElementById('lb-title');
    let type = document.getElementById("lb-type");
    let content = document.getElementById("lb-content");
    let description = document.getElementById("lb-description");

    title.textContent = productsInfo[index].title;
    type.textContent = productsInfo[index].type;
    content.textContent = productsInfo[index].content;
    description.textContent = productsInfo[index].description;
}

function getJsonData() {
    return fetch('Json/medsInfo.json')
    .then(res => res.json())
    .then((data) => {
        productsInfo = data;
    });
}

/// Carga del DOM
document.addEventListener("DOMContentLoaded", function () {
    loadProducts();
});