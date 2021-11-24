document.addEventListener('DOMContentLoaded', () => {

    traerDatosUsuarios(); // llamo a la base y traigo los usuarios cargados

    const $menuUsuario = document.getElementById('menuUsuario'); // menu de usuario logueado
    const $usuarioLogueado = document.getElementById('usuarioNombre') // muestra usuario logueado
    const $usuarioRol = document.getElementById('usuarioRol'); // rol del usuario logueado
    const $btnLogout = document.getElementById('btnLogout') // captura cuando se aprieta el boton de desloguearse
    const togglePassword = document.getElementById('togglePassword');
    let resultados = "";
    const $uT = document.getElementById('uT');
    const $uA = document.getElementById('uA');
    const $uI = document.getElementById('uI');
    const $uAdm = document.getElementById('uAdm');
    const $uTel = document.getElementById('uTel');
    const $uO = document.getElementById('uO');
    let dniModificacion = '';

    let erroresFormulario = [];
    const $mensaje = document.getElementById('mensaje'); // para mostrar los mensajes al uusuario
    const $loader = document.getElementById('loader'); // carga la imagen loader

    // variables de formulario alta / modificion
    const $modal = document.querySelector('.modal-container'); // modal formulario alta / modificacion
    const $formEditable = document.getElementById('form-editable'); // formulario alta / modificacion
    const $btnModificarUsuario = document.getElementById('btnModificarUsuario'); // boton del formulario modificaciones
    const $btnAltaUsuario = document.getElementById('btnAltaUsuario'); // boton del formulario altas
    const $btnAltaUsuarioForm = document.getElementById('btnAltaUsuarioForm');
    const $legend = document.getElementById('legend');
    const $idUsuario = document.getElementById('idUsuario');
    const $inputPerfilUsuario = document.getElementById('inputPerfilUsuario');
    //const $inputPerfilUsuarioHidden = document.getElementById('inputPerfilUsuarioHidden');
    const $inputUsuarioNombre = document.getElementById('inputUsuarioNombre');
    const $inputDniUsuario = document.getElementById('inputDniUsuario');
    const $inputPasswordUsuario = document.getElementById('inputPasswordUsuario');
    const $inputFechaInicioUsuario = document.getElementById('inputFechaInicioUsuario');
    const $inputEmailUsuario = document.getElementById('inputEmailUsuario');
    const $inputEstadoUsuario = document.getElementById('inputEstadoUsuario');
    // const $inputEstadoUsuarioHidden = document.getElementById('inputEstadoUsuarioHidden');
    // const $errorPerfil = document.getElementById('errorPerfil');
    // const $errorEstado = document.getElementById('errorEstado'); // verificar esta condicion

    // variables de la tabla
    const $tablaUsuarios = document.getElementById('tablaUsuarios');
    const $btnTablaUsuarios = document.getElementById('btnTablaUsuarios');
    const $tbodyUsuarios = document.getElementById('tbodyUsuarios'); // para renderizar los datos traidos
    let dniUsuarios = [];
    // const $btnAltaUsuario = document.getElementById('btnAltaUsuario'); // boton para dar de alta usuario

    // para sacar fecha actual y cargarla en el input
    function fechaActual() {
        let hoy = new Date();
        let dia = hoy.getDate();
        let mes = hoy.getMonth() + 1;
        let anio = hoy.getFullYear();
        dia = ('0' + dia).slice(-2);
        mes = ('0' + mes).slice(-2);
        return `${anio}-${mes}-${dia}`;
    }

    // cargo los datos de localStorage para utilizarlos en el formulario y html
    let dataUser = localStorage.getItem('datosUser');
    dataUser = JSON.parse(dataUser);

    // verifica si el usuario esta logueado
    if (dataUser === null) {
        window.location = "index.html"
    } else {
        $usuarioRol.innerHTML = 'Administrador';
        $usuarioLogueado.innerHTML = dataUser.usuario_nombre;
        //$userForm.value = dataUser.usuario_id;
    }


    // evento click boton menu gestion de usuarios
    $btnTablaUsuarios.addEventListener('click', (e) => {
        e.preventDefault();
        $tablaUsuarios.classList.remove('hidden'); // muestro la tabla usuarios cargados
        //$legend.innerHTML = 'Formulario Modificación Usuario';

        /* if (!baseUsuarios) {
             traerDatosUsuarios();
             baseUsuarios = true // cambio el estado
         } else {
             alert('ya trajo los datos');
         }*/
    })

    // traer datos de usuarios de la base
    async function traerDatosUsuarios() {
        try {
            const datos = await fetch('modulos/consultaUsersInnerDB.php', {
                method: 'GET'
            })

            const usuarios = await datos.json();
            //console.log(usuarios)

            // cargo datos para estadisticas
            // usuarios activos
            let usuariosTotales = usuarios.filter((usuario) => {
                return usuario
            })
            $uT.innerHTML = usuariosTotales.length;

            // usuarios activos
            let usuariosActivos = usuarios.filter((usuario) => {
                return usuario.usuario_activo == "1"
            })
            $uA.innerHTML = usuariosActivos.length;

            // usuarios inactivos
            let usuariosInactivos = usuarios.filter((usuario) => {
                return usuario.usuario_activo == "0"
            })
            $uI.innerHTML = usuariosInactivos.length;

            // usuarios administradores
            let usuariosAdministradores = usuarios.filter((usuario) => {
                return usuario.usuario_tipo == "1"
            })
            $uAdm.innerHTML = usuariosAdministradores.length;

            // usuarios telemarketer
            let usuariosTelemarketer = usuarios.filter((usuario) => {
                return usuario.usuario_tipo == "2"
            })
            $uTel.innerHTML = usuariosTelemarketer.length;

            // usuarios telemarketer
            let usuariosOng = usuarios.filter((usuario) => {
                return usuario.usuario_tipo == "3"
            })
            $uO.innerHTML = usuariosOng.length;

            // renderizo los datos en la tabla
            usuarios.forEach(usuario => {
                resultados += `<tr>
                                    <td>${usuario.usuario_id}</td>
                                    <td>${usuario.tipo_descripcion}</td>
                                    <td>${usuario.usuario_nombre}</td>
                                    <td>${usuario.usuario_dni}</td>
                                    <td>${usuario.usuario_password}</td>
                                    <td>${usuario.usuario_fechaInicio}</td>
                                    <td>${usuario.usuario_activo}</td>
                                    <td>${usuario.usuario_email}</td>
                                    <td class="text-center"><a data-id="${usuario.usuario_id}" class="editar btn btn--xs btn--primary text-white" data-modal-index="0">Editar</a></td>
                               </tr> `
                dniUsuarios.push(usuario.usuario_dni); // guardo los DNI de los usuarios para verificar que al cargar ya no este en la BD

            });

            $tbodyUsuarios.innerHTML = resultados; // lleno la tabla

            // escuchar evento en el tbody y selecciono el boton editar para sacar el ID
            $tbodyUsuarios.addEventListener('click', (e) => {

                if (e.target.classList.contains('editar')) {
                    // tengo filtrar el id seleccionado y buscarlo en la tabla
                    let datoUsuario = usuarios.filter((dato) => {
                        return dato.usuario_id === e.target.dataset.id
                    })

                    $formEditable.reset(); // reseteo los datos del formulario


                    //console.log(datoUsuario[0].usuario_id)
                    // cargo el formulario modificaciones con los datos de la tabla
                    $idUsuario.value = datoUsuario[0].usuario_id;
                    $inputPerfilUsuario.value = datoUsuario[0].usuario_tipo;
                    $inputUsuarioNombre.value = datoUsuario[0].usuario_nombre;
                    $inputDniUsuario.value = datoUsuario[0].usuario_dni;
                    $inputPasswordUsuario.value = datoUsuario[0].usuario_password;
                    $inputEmailUsuario.value = datoUsuario[0].usuario_email;
                    $inputEstadoUsuario.value = datoUsuario[0].usuario_activo;
                    $btnModificarUsuario.classList.remove('hidden');
                    $btnAltaUsuarioForm.classList.add('hidden');
                    $legend.innerHTML = 'Formulario Modificación Usuario';
                    $modal.classList.add('modal-active');
                    dniModificacion = datoUsuario[0].usuario_dni;

                }
            })

        } catch (error) {
            console.log(error)
        }
    }

    // envío los datos para modificar
    async function modificarDatosUsuario(datos) {
        try {
            const datosUser = await fetch('modulos/editarUserDB.php', {
                method: 'POST',
                body: datos
            })

            const dato = await datosUser.json();
            if (dato) {

                alertModificacionExitosa(); // mensaje de alerta
                resultados = ''; // borro los datos de la tabla
                traerDatosUsuarios() // llamo de nuevo a la base y cargo los datos
                    //$tablaUsuarios.classList.remove('hidden');
                $modal.classList.remove('modal-active')
            } else {
                console.log('error');
            }

        } catch (error) {
            console.log(error);
        }
    }

    // envio datos para dar de alta
    async function altaDatosUsuario(datos) {
        try {
            const datosUser = await fetch('modulos/altaUserDB.php', {
                method: 'POST',
                body: datos
            })

            const dato = await datosUser.json();
            if (dato) {

                $modal.classList.remove('modal-active');
                alertCargaExitosa(); // mensaje de alerta
                resultados = ''; // borro los datos de la tabla
                traerDatosUsuarios() // llamo de nuevo a la base y cargo los datos

            } else {
                console.log('error');
            }

        } catch (error) {
            console.log(error);
        }
    }

    // boton alta de usuario
    $btnAltaUsuario.addEventListener('click', (e) => {
        e.preventDefault();

        // cargo fecha actual a la fecha de inicio del usuario
        $inputFechaInicioUsuario.value = fechaActual();
        $legend.innerHTML = 'Formulario Alta Usuario';
        $btnModificarUsuario.classList.add('hidden');
        $btnAltaUsuarioForm.classList.remove('hidden');
        $formEditable.reset(); // reseteo los datos del formulario alta / modificaciones
        $modal.classList.add('modal-active');

    })

    // cargo los datos al formData para enviar a PHP
    $btnAltaUsuarioForm.addEventListener('click', (e) => {
        e.preventDefault();

        if (dniUsuarios.indexOf($inputDniUsuario.value) != -1) {
            alertSiDni($inputDniUsuario.value);
        } else {

            // quito errores css
            erroresFormulario = [];
            $inputUsuarioNombre.classList.remove('field-error');
            $inputDniUsuario.classList.remove('field-error');
            $inputPasswordUsuario.classList.remove('field-error');
            $inputEmailUsuario.classList.remove('field-error');


            // guardo los datos de los input del formulario
            const formDatos = new FormData($formEditable); // cargo todos los datos del formulario
            // controlo los datos cargados
            const DATOS = [...formDatos.entries()];
            // console.log(DATOS)

            $mensaje.classList.remove('hidden')
            $loader.classList.remove('hidden');
            $mensaje.innerHTML = `<span>Validando datos...</span>`;

            setTimeout(() => {

                setTimeout(() => {

                    if ($inputUsuarioNombre.value == "" || $inputUsuarioNombre.value > 90) {
                        erroresFormulario.push('Error en el Nombre');
                        $inputUsuarioNombre.classList.add('field-error');
                    } else if ($inputDniUsuario.value == '' || $inputDniUsuario.value == '' || $inputDniUsuario.value.length < 8) {
                        erroresFormulario.push('Error en el DNI');
                        $inputDniUsuario.classList.add('field-error');
                    } else if ($inputPasswordUsuario.value == '' || $inputPasswordUsuario.value == '0' || $inputPasswordUsuario.value.length < 8) {
                        erroresFormulario.push('Error en el Password');
                        $inputPasswordUsuario.classList.add('field-error');
                    } else if ($inputEmailUsuario.value == '' || $inputEmailUsuario.value.length < 5) {
                        erroresFormulario.push('Error en el Email');
                        $inputEmailUsuario.classList.add('field-error');
                    }

                    if (erroresFormulario.length > 0) {
                        alertErrorInputsForm();
                        $mensaje.classList.add('hidden')
                        $loader.classList.add('hidden');
                        $mensaje.innerHTML = ``;
                        console.log(erroresFormulario)
                    } else {
                        altaDatosUsuario(formDatos); // los envia a la funcion para hacer las modificaciones en la BD

                        //modificarDatosUsuario(formData); // envio los datos a la base para modificar
                        $modal.classList.remove('modal-active');

                        $mensaje.classList.add('hidden')
                        $loader.classList.add('hidden');
                        $mensaje.innerHTML = ``;
                    }

                }, 300);

            }, 3000);

        }

    })


    // cargo los datos al formData para enviar a PHP
    $btnModificarUsuario.addEventListener('click', (e) => {
        e.preventDefault();

        if (dniModificacion == $inputDniUsuario.value) {
            // quito errores css
            erroresFormulario = [];
            $inputUsuarioNombre.classList.remove('field-error');
            $inputPasswordUsuario.classList.remove('field-error');
            $inputEmailUsuario.classList.remove('field-error');
            $inputDniUsuario.classList.remove('field-error');

            const formDatos = new FormData($formEditable); // cargo todos los datos del formulario
            // controlo los datos cargados
            const DATOS = [...formDatos.entries()];


            $mensaje.classList.remove('hidden')
            $loader.classList.remove('hidden');
            $mensaje.innerHTML = `<span>Validando datos...</span>`;

            setTimeout(() => {

                setTimeout(() => {

                    if ($inputUsuarioNombre.value == "" || $inputUsuarioNombre.value > 90) {
                        erroresFormulario.push('Error en el Nombre');
                        $inputUsuarioNombre.classList.add('field-error');
                    } else if ($inputPasswordUsuario.value == '' || $inputPasswordUsuario.value == '0' || $inputPasswordUsuario.value.length < 8) {
                        erroresFormulario.push('Error en el Password');
                        $inputPasswordUsuario.classList.add('field-error');
                    } else if ($inputEmailUsuario.value == '' || $inputEmailUsuario.value.length < 5) {
                        erroresFormulario.push('Error en el Email');
                        $inputEmailUsuario.classList.add('field-error');
                    } else if ($inputDniUsuario.value == '' || $inputDniUsuario.value == '' || $inputDniUsuario.value.length < 8) {
                        erroresFormulario.push('Error en el DNI');
                        $inputDniUsuario.classList.add('field-error');
                    }

                    if (erroresFormulario.length > 0) {
                        alertErrorInputsForm();
                        $mensaje.classList.add('hidden')
                        $loader.classList.add('hidden');
                        $mensaje.innerHTML = ``;
                        console.log(erroresFormulario)
                    } else {
                        modificarDatosUsuario(formDatos); // los envia a la funcion para hacer las modificaciones en la BD

                        //modificarDatosUsuario(formData); // envio los datos a la base para modificar
                        $modal.classList.remove('modal-active');

                        $mensaje.classList.add('hidden')
                        $loader.classList.add('hidden');
                        $mensaje.innerHTML = ``;
                    }

                }, 300);

            }, 3000);

        } else if (dniUsuarios.indexOf($inputDniUsuario.value) != -1) {

            alertSiDni($inputDniUsuario.value);


        }




    })

    // cerrar secion usuario alta de donaciones
    $btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        window.location = "index.html";
        localStorage.clear('dataUser');
        $menuUsuario.classList.add('hidden');
        $btnLogout.classList.add('hidden');

    })

    // ver contraseña password
    togglePassword.addEventListener('click', function(e) {
        // toggle the type attribute
        const type = $inputPasswordUsuario.getAttribute('type') === 'password' ? 'text' : 'password';
        $inputPasswordUsuario.setAttribute('type', type);
        // toggle the eye / eye slash icon
        this.classList.toggle('icofont-eye');
    });

    // mensaje modificacion exitosa
    function alertModificacionExitosa() {
        Swal.fire({
            icon: 'success',
            title: 'Modificación exitosa!',
            showConfirmButton: false,
            timer: 1500
        })
    }

    function alertCargaExitosa() {
        Swal.fire({
            icon: 'success',
            title: '¡Alta exitosa!',
            showConfirmButton: false,
            timer: 2500
        })
    }

    function alertErrorInputsForm() {
        Swal.fire({
            icon: 'error',
            title: `Verificar campos del formulario`,
            showConfirmButton: false,
            timer: 1500
        })
    }

    function alertSiDni(dni) {
        Swal.fire({
            icon: 'success',
            title: `Documento: ${dni}`,
            text: 'Ya se encuentra registrado',
            showConfirmButton: false,
            timer: 1500
        })
    }

})