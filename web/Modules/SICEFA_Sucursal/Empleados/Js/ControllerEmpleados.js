function agregarEmpleado() {
        // Obtener valores del formulario
            const url = 'http://localhost:8080/DreamSoft_SICEFA/api/empleado/insertarEmpleado';
                let v_nombre, v_apellidoPaterno, v_apellidoMaterno, v_genero, v_fechaNacimiento, v_rfc, v_curp, v_domicilio, v_codigoPostal, v_ciudad, v_estado, v_telefono, v_foto,v_idSucursal,v_rol,v_puesto,v_salarioBruto,v_nombreSucursal, v_estatus;
  v_nombre = document.getElementById("txtNombre").value;
    v_apellidoPaterno = document.getElementById("txtApellidoPaterno").value;
    v_apellidoMaterno = document.getElementById("txtApellidoMaterno").value;
    v_genero = document.getElementById("txtGenero").value;
    v_fechaNacimiento = document.getElementById("txtFechaNacimiento").value;
    v_rfc = document.getElementById("txtRfc").value;
    v_curp = document.getElementById("txtCurp").value;
    v_domicilio = document.getElementById("txtDomicilio").value;
    v_codigoPostal = document.getElementById("txtCodPostal").value;
    v_ciudad = document.getElementById("txtCiudad").value;
    v_estado = document.getElementById("txtEstado").value;
    v_telefono = document.getElementById("txtTelefono").value;
    v_foto = document.getElementById("txtFoto").value;
    v_idSucursal = document.getElementById("txtIdPersona").value;
    v_rol = document.getElementById("txtRol").value;
    v_puesto = document.getElementById("txtPuesto").value;
    v_salarioBruto = document.getElementById("txtsalarioBruto").value;

      

       let empleado = {
        sucursal:{
            idSucursal: v_idSucursal,
            nombre:v_nombreSucursal
        },
        usuario:{
            rol: v_rol
        },
        puesto: v_puesto,
        salarioBruto: v_salarioBruto,
        persona:{
        nombre: v_nombre,
        apellidoPaterno: v_apellidoPaterno,
        apellidoMaterno: v_apellidoMaterno,
        genero: 'm',
        fechaNacimiento: v_fechaNacimiento,
        rfc: v_rfc,
        curp: v_curp,
        domicilio: v_domicilio,
        codigoPostal: v_codigoPostal,
        ciudad: v_ciudad,
        estado: v_estado,
        telefono: v_telefono,
        foto: v_foto
    }
       };
       
             const requestOptions = {
            method: "POST",
            headers: {'Content-type': 'application/x-www-form-urlencoded'},
            body: new URLSearchParams({sucursal: JSON.stringify(sucursal)})
        };
        
        
      Swal.fire({
            title: "¡Estas seguro de aplicar estos cambios?",
            showDenyButton: true, showCancelButton: true,
            confirmButtonText: "Guardar",
            denyButtonText: 'No guardar'
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    fetch(url, requestOptions).then(
                            function (data) {
                                return data.json();
                            })
                            .then(function () {
                                console.log("hola");
                            });

                } catch (error) {
                    console.error('Error al procesar la solicitud:', error);
                    alert('Error al procesar la solicitud. Consulta la consola para obtener más detalles.');
                }
                Swal.fire("Guardado", "", "success");
            } else if (result.isDenied) {
                Swal.fire("Cambios no guardados", "", "info");
            }
        });
    }

console.log("hola");