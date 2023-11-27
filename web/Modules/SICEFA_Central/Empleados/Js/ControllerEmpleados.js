
    function agregarEmpleado() {
        // Obtener valores del formulario
        var nombre = document.getElementById("txtNombre").value;
        var apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
        var apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
        var genero = document.getElementById("txtGenero").value;
        var fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
        var rfc = document.getElementById("txtRfc").value;
        var curp = document.getElementById("txtCurp").value;
        var domicilio = document.getElementById("txtDomicilio").value;
        var cp = document.getElementById("txtCodPostal").value;
        var ciudad = document.getElementById("txtCiudad").value;
        var estado = document.getElementById("txtEstado").value;
        var telefono = document.getElementById("txtTelefono").value;
        var foto = document.getElementById("txtFoto").value;
        var salarioBruto = document.getElementById("txtSalarioBruto").value;

        // Crear objeto con datos del empleado
        var empleadoData = {
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            genero: genero,
            fechaNacimiento: fechaNacimiento,
            rfc: rfc,
            curp: curp,
            domicilio: domicilio,
            cp: cp,
            ciudad: ciudad,
            estado: estado,
            telefono: telefono,
            foto: foto,
            salarioBruto: salarioBruto
            // Agregar más campos según sea necesario
        };

        
        fetch('/ruta/del/servicio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(empleadoData)
        })
        .then(response => response.json())
        .then(data => {
            // Manejar la respuesta del servidor
            console.log('Respuesta del servidor:', data);
        })
        .catch(error => {
            console.error('Error al enviar datos al servidor:', error);
        });
    }
