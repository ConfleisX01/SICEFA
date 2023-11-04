let productsInfo = [];



/// Carga del contenido de productos
function loadProducts(data) {
    let position = 0;
    let buttonPrevius = document.getElementById('btn-previous');
    let buttonNext = document.getElementById('btn-next');

    buttonNext.addEventListener("click", () =>{
    });

    buttonPrevius.addEventListener("click", () => {
        alert("Presionarte el boton anterior");
    });

    console.log(data);
}

function changeProduct(index) {

}

/// Carga del DOM
document.addEventListener("DOMContentLoaded", function () {
    fetch('Json/medsInfo.json')
    .then(res => res.json())
    .then(data => loadProducts(data));
});