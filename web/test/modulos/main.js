document.addEventListener("DOMContentLoaded", () => {
    const $usuarioLogueado = document.getElementById('usuarioNombre'); // usuario logueado
    const $mostrarUsuario = document.getElementById('mostrarUsuario'); // muestra el icono y el usuario logueado
    const $login = document.getElementById('btnLogin'); // boton login home
    const $logout = document.getElementById('btnLogout');
    const $modal = document.querySelector('.modal-container'); // cargo modal del login home
    const $formLogin = document.getElementById('form-login'); // formulario login home
    const $mensaje = document.getElementById('mensaje');
    const $loader = document.getElementById('loader');
    const password = document.getElementById('password')
    const togglePassword = document.getElementById('togglePassword');
    const $btnIngresar = document.getElementById('btnIngresar');
    let accesoSistema = true;
    const $bgHero = document.getElementById('bg-hero');

    detectarDispositivo();

    // se detecta de donde se ingresa al sistema para permitir o no
    function detectarDispositivo() {

        const details = navigator.userAgent;
        let regexp = /android|iphone|kindle|ipad/i;
        let isMobileDevice = regexp.test(details);

        if (isMobileDevice) {
            accesoSistema = false;
            $bgHero.src = 'img/bg-hero-movile.jpg'; // cambia la imagen del hero version movil
            document.querySelector('.boton-whatsapp').classList.remove('hidden');
        } else {
            accesoSistema = true;
            document.querySelector('.boton-email').style.bottom = '7.9em';
        }
    }

    localStorage.clear('datosUser')
        // verifico si hay usuarios logueados
    if (localStorage.getItem('dataUser') !== null) {
        $mostrarUsuario.classList.remove('hidden')
        $login.classList.add('hidden')
        $usuarioLogueado.innerHTML = localStorage.getItem('usuario')
    } else {
        $logout.classList.add('hidden')
    }

    // addEventListener click form login
    $login.addEventListener('click', (e) => {
        // verifico desde donde acceden
        if (accesoSistema) {
            e.preventDefault()
            $modal.classList.add('modal-active') // agrego class para visualizar formulario modal
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Al sistema sólo puede accederse desde una pc de escritorio o notebook',
                showConfirmButton: false,
                timer: 2500
            })
        }

    })

    // addEventListener click cerrar sesion
    /* $logout.addEventListener('click', (e) => {
         e.preventDefault();
         localStorage.clear('dataUser')
         window.location = "index.html"
         $logout.classList.add('hidden')
         $login.classList.remove('hidden')

     })*/

    // ver contraseña password
    togglePassword.addEventListener('click', function(e) {
        // toggle the type attribute
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        // toggle the eye / eye slash icon
        this.classList.toggle('icofont-eye');
    });

    // addEventListener click submit form login
    $formLogin.addEventListener('submit', (e) => {
        e.preventDefault()

        // creo el FORM DATA asi cargo los datos
        const FORM_DATA = new FormData($formLogin)
        const DNI = FORM_DATA.get('dni')
        const PASS = FORM_DATA.get('pass')


        // verifico si estan los campos cargados/
        if (DNI !== "" && PASS !== '') {

            setTimeout(() => {
                $mensaje.classList.remove('hidden')
                $loader.classList.remove('hidden');
                $mensaje.innerHTML = `<span>Validando datos y accediendo...</span>`;
                $btnIngresar.disabled = true;
                document.body.style.cursor = 'wait'; // cambio el estilo del cursor mientras carga
                document.querySelector('.modal-close-cross').style.display = "none";

                setTimeout(() => {
                    controlUser()

                    // VA IR NUEVO CODIGO DE PETICION ASYNC FETCH
                    async function controlUser() {
                        try {
                            let user = await fetch('modulos/consultaUserDB.php', {
                                method: 'POST',
                                body: FORM_DATA
                            })

                            let data = await user.json()

                            // si la peticion trae algun dato entra en el siguiente if
                            if (data) {

                                delete data.usuario_password // elimino el pass del usuario

                                // si el usuario esta activo carga destino
                                if (data.usuario_activo == '1') {

                                    alertUsuarioHabilitado(data.usuario_nombre)

                                    setTimeout(() => {
                                        // guardo los datos del usuario en el localstorage
                                        localStorage.setItem('datosUser', JSON.stringify(data))

                                        // busco el privilegio del usuario logueado para reenviar
                                        switch (data.usuario_tipo) {

                                            case '1':
                                                window.location = 'administracion.html'
                                                break;
                                            case '2':
                                                window.location = 'telemarketer.html'
                                                break;

                                            case '3':
                                                window.location = 'ong.html'
                                                break;

                                            default:
                                                //window.location = 'index.html'
                                                localStorage.clear('datosUser')
                                                $formLogin.reset();
                                                $modal.classList.remove('modal-active')
                                                alertUsuarioSinPrivilegios(data.usuario_nombre)
                                                break;

                                        }
                                    }, 1000);

                                } else {

                                    $loader.classList.add('hidden')
                                    $mensaje.classList.add('hidden');
                                    $formLogin.reset();
                                    $modal.classList.remove('modal-active')
                                    alertUsuarioSinPrivilegios(data.usuario_nombre);

                                }

                            } else {

                                $loader.classList.add('hidden')
                                alertNoUsuario();
                                $mensaje.classList.add('hidden')
                                $formLogin.reset()
                                $modal.classList.remove('modal-active')

                            }

                        } catch (e) {
                            console.log(e)
                        }

                    }

                }, 1000);

            }, 100);

            $loader.classList.add('hidden')

        } else {
            $btnIngresar.disabled = true;
            document.body.style.cursor = 'wait'; // vuelvo a poner el icono normal en el puntero
            document.querySelector('.modal-close-cross').style.display = "none";
            $mensaje.classList.remove('hidden')
            $mensaje.innerHTML = `<div class="alert bg--error" data-animation="from-bottom">
                                    <div class="alert__body">
                                        <span>❌ Debe agregar datos...</span>
                                    </div>
                                </div>`

            // al segundo vuelvo a insertar la clase hidden al mensaje
            setTimeout(() => {
                $mensaje.classList.add('hidden');
                $btnIngresar.disabled = false;
                document.body.style.cursor = 'default'; // vuelvo a poner el icono normal en el puntero
                document.querySelector('.modal-close-cross').style.display = "inline";
            }, 1000)

        }

        // antes el manejo de alertas estaba dentro de esta function


    })

    // modal contacto cta
    document.getElementById('contacto').addEventListener('click', () => {
        document.querySelector('.contacto').classList.add('modal-active')
    })

    // modal contacto cta
    document.getElementById('contactoBoton').addEventListener('click', () => {
        document.querySelector('.contacto').classList.add('modal-active')
    })

    // ENVIO DE FORMULARIO A GMAIL
    //const $RESPUESTA = document.getElementById('respuesta');
    let datosFormulario = document.getElementById('formulario');
    datosFormulario.addEventListener('submit', e => {
        e.preventDefault();
        let formData = new FormData(datosFormulario);

        enviarEmail(formData);


    })

    async function enviarEmail(datos) {

        try {
            let datosFormulario = await fetch('mail.php', {
                method: 'POST',
                body: datos,
                mode: 'cors'

            })

            //document.querySelector('.form-error').style.display = 'none';

            let estadoFormulario = await datosFormulario.json();
            console.log(estadoFormulario)
                /* $RESPUESTA.classList.remove('hidden');
                 $RESPUESTA.innerHTML = `<div class="alert ${estadoFormulario.alerta} text-center shadow2" role="alert">
                                 <p>${estadoFormulario.mensaje}</p>
                             </div>`;*/

            if (estadoFormulario === 'ok') {

                document.getElementById('formulario').reset();
                alertExitoEmail();
                document.querySelector('.contacto').classList.remove('modal-active')
            } else if (estadoFormulario === 'vacios') {
                alertVacios();
            } else if (estadoFormulario === 'invalidEmail') {
                alertInvalidoEmail();
            } else {
                alertNoEmail();
                document.getElementById('formulario').reset();
            }


        } catch (err) {
            console.log(err)

            document.getElementById('formulario').reset();

        }
    }

    // manejo de alertas 
    function alertNoEmail() {
        Swal.fire({
            icon: 'error',
            title: 'Falla en el envío del email',
            text: `Intente de nuevo por favor.`,
            showConfirmButton: false,
            timer: 1500
        })
    }

    function alertVacios() {
        Swal.fire({
            icon: 'error',
            title: 'Campos vacios',
            text: 'Debe llenar todos los campos por favor.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    function alertInvalidoEmail() {
        Swal.fire({
            icon: 'error',
            title: 'Email invalido',
            text: 'Debe llenar el campo con un email por favor.',
            showConfirmButton: false,
            timer: 1500
        })
    }

    function alertExitoEmail() {
        Swal.fire({
            //position: 'inherit',
            icon: 'success',
            title: `¡Mensaje enviado exitosamente!`,
            showConfirmButton: false,
            timer: 1500
        })
    }


    function alertNoUsuario() {
        Swal.fire({
            icon: 'error',
            title: 'Falla de Autenticación',
            showConfirmButton: false,
            timer: 1500
        })

        document.body.style.cursor = 'default'; // vuelvo a poner el icono normal en el puntero
        $btnIngresar.disabled = false;
    }

    function alertUsuarioSinPrivilegios(usuario) {
        Swal.fire({
            icon: 'error',
            title: 'Falla Autenticación',
            text: `¡Hola! ${usuario}, no tienes privilegios.`,
            showConfirmButton: false,
            timer: 1500
        })
    }

    function alertUsuarioHabilitado(usuario) {
        Swal.fire({
            position: 'inherit',
            icon: 'success',
            title: `Bienvenid@ ${usuario}!`,
            showConfirmButton: false,
            timer: 1500
        })
    }

});