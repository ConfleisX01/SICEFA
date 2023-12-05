async function loadProductosCount() {
    const url = "http://localhost:8080/DreamSoft_SICEFA/api/producto/getNumberProductos";
    let response = await makePeticion(url);
}

async function makePeticion(url) {
    try {
        let response = await fetch(url);
        let json = await response.json();
        return json;
    } catch (error) {
        throw error;
    }
}

function loadSlider() {
    let cardEmpleados = document.getElementById('card-empleados');
    let checkBox = document.getElementById('check_empleados');
    cardEmpleados.style.cursor = 'pointer';

    cardEmpleados.addEventListener('click', () => {
        if (checkBox.checked == true) {
            checkBox.checked = false;
        } else {
            checkBox.checked = true;
        }
    });
}

loadSlider();
loadProductosCount();