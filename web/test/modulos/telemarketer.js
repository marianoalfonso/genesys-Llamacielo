document.addEventListener('DOMContentLoaded', () => {

    traerDatosOngs(); // trae los datos de las ONGS para cargar en el select ONG

    const $menuUsuario = document.getElementById('menuUsuario'); // menu del usuario logueado
    const $usuarioLogueado = document.getElementById('usuarioNombre') // para mostrar que usuario esta logueado
    const $usuarioRol = document.getElementById('usuarioRol'); // rol del usuario
    const $userForm = document.getElementById('user'); // carga e usuario que se cargo en el localstorage
    const $btnLogout = document.getElementById('btnLogout') // captura cuando se aprieta el boton de desloguearse
    const $btnDni = document.getElementById('btnDni');
    const $btnEditarDonador = document.getElementById('btnEditarDonador');
    // const $btnTablaLiquidaciones = document.getElementById('btnTablaLiquidaciones');
    const $btnTablaTelemarketer = document.getElementById('btnTablaTelemarketer');
    const $modal = document.querySelector('.modal-container'); // tabla liquidaciones telemarketer
    const $modalTelemarketerIndividual = document.querySelector('.tablaTelemarketerIndividual')
    const $modalTelemarketer = document.querySelector('.tablaTelemarketer') // segunda tabla
    const $mensaje = document.getElementById('mensaje'); // para mostrar los mensajes al uusuario
    const $loader = document.getElementById('loader'); // carga la imagen loader
    const $columnasOculta1 = document.getElementById('columnaOculta1');
    const $columnasOculta2 = document.getElementById('columnaOculta2');
    const $tbodyLiquidacionesTelemarketer = document.getElementById('tbodyLiquidacionesTelemarketer'); // renderizo en el modal la tabla
    let resultados = "";

    //let estado = true;


    // valores de los select del formulario
    const $formularioDonacion = document.getElementById('form-donacion'); // captura los datos del formulario
    const $formDonadorEstado = document.getElementById('formDonadorEstado');
    const $switchDonadorEstado = document.getElementById('switchDonadorEstado');
    const $checkboxDonadorEstado = document.getElementById('checkbox-switch');
    const $dniForm = document.getElementById('dni'); // captura el input de dni
    const $btnFormDonador = document.getElementById('cargarDonacion');
    const $formNombreDonador = document.getElementById('formNombreDonador');
    const $formTelefono1Donador = document.getElementById('formTelefono1Donador');
    const $formTelefono2Donador = document.getElementById('formTelefono2Donador');
    const $formEmailDonador = document.getElementById('formEmailDonador');
    const $cardNumeroForm = document.getElementById('cardNumeroForm');
    const $cardNumero = document.getElementById('cardNumero'); // guarda el numero ingresado
    const $tipoTarjetaForm = document.getElementById('tipoTarjetaForm');
    const $cardTipo = document.getElementById('cardTipo'); // carga el valor del tipo de tarjeta
    const $cardVencimientoForm = document.getElementById('cardVencimientoForm');
    const $cardVencimiento = document.getElementById('cardVencimiento'); // guarda el vencimiento ingresado
    const $formCodigoPostal = document.getElementById('formCodigoPostal');
    const $formProvincia = document.getElementById('formProvincia');
    const $formProvinciaVista = document.getElementById('formProvinciaVista');
    const $ocultarProvincia = document.getElementById('ocultarProvincia');
    const $formLocalidad = document.getElementById('formLocalidad');
    const $formLocalidadVista = document.getElementById('formLocalidadVista');
    const $ocultarLocalidad = document.getElementById('ocultarLocalidad');
    const $formDireccion = document.getElementById('formDireccion');
    const $formOng = document.getElementById('formOng');
    const $formImporteSugerido = document.getElementById('formImporteSugerido');
    const $ocultarImporteSugerido = document.getElementById('ocultarImporteSugerido');
    const $formImporteAgregado = document.getElementById('formImporteAgregado');
    const $formImporte = document.getElementById('formImporte');
    const $ocultarImporteDonador = document.getElementById('ocultarImporteDonador');
    const $donadorImporte = document.getElementById('donadorImporte');
    const $errorImporte = document.getElementById('errorImporte'); // verificar esta variable
    const $formObservacionesDonador = document.getElementById('formObservacionesDonador');
    const $iconCard = document.getElementById('iconCard');
    const $ocultarDonadorInicio = document.getElementById('ocultarDonadorInicio');
    const $donadorInicio = document.getElementById('formDonadorInicio');

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

    let erroresFormulario = [];
    let tarjetasInvalidas = []; // se carga si existe alguna tarjeta invalidada
    $btnFormDonador.disabled = true;

    new Cleave('.telefono1', {
        phone: true,
        phoneRegionCode: 'AR'
    });

    new Cleave('.telefono2', {
        phone: true,
        phoneRegionCode: 'AR'
    });

    // traer datos de las Ongs
    async function traerDatosOngs() {
        try {
            const datosOngs = await fetch('modulos/consultaOngDB.php', {
                method: 'GET'
            })

            const infoOng = await datosOngs.json();
            console.log('datos de las ong cargadas')
            console.log(infoOng);

            // IMPORTANTE: si no traigo filtrado las ONGS activas TENGO QUE DESHABILITAR ESTE FILTRO

            // filtro para obtener solo las Ongs activas para cargarlas en el select
            let ongActivas = infoOng.filter(dato => {
                return dato.ong_activa == '1'
            })

            console.log('datos de las ong cargadas filtradas por ONG ACTIVAS');
            console.log(ongActivas);


            // Cargo dinamicamnete el select con las ONGS activas devueltas por fetch
            ongActivas.forEach(function(elemento) {
                let option = document.createElement('option');
                option.value = `${elemento.ong_id}`;
                option.text = `${elemento.ong_nombre}`;
                $formOng.appendChild(option);
            })

        } catch (error) {
            console.log(error);
        }
    }

    // cargo los datos de localStorage para utilizarlos en el formulario y html
    let dataUser = localStorage.getItem('datosUser');
    dataUser = JSON.parse(dataUser);
    //let usuarioLogueado = dataUser.usuario_nombre;

    // verifica si el usuario esta logueado
    if (dataUser === null) {
        window.location = "index.html"
    } else {
        $usuarioRol.innerHTML = 'Telemarketer';
        $usuarioLogueado.innerHTML = dataUser.usuario_nombre;
        $userForm.value = dataUser.usuario_id;

    }

    // funcion al apretar boton ver liquidaciones telemarketer
    /* $btnTablaLiquidaciones.addEventListener('click', () => {
         traerDatosLiqTel();
         $modal.classList.add('modal-active');
     })*/

    // version prueba
    async function liquidaciones() {
        try {
            const datosTelemarketer = await fetch('modulos/consultaLiqTeleInnerDB.php', {
                method: 'GET',
            })

            const datos = await datosTelemarketer.json();
            console.log(datos)
                // borro datos de usuarios
                /*  for (i = 0; i < datos.length; i++) {
                      delete datos[i].usuario_activo;
                      delete datos[i].usuario_dni;
                      delete datos[i].usuario_email;
                      delete datos[i].usuario_fechaInicio;
                      delete datos[i].usuario_id;
                      delete datos[i].usuario_password;
                      delete datos[i].usuario_tipo;
                  }*/
                // console.log(datos)

            // filtrar datos por usuario telemarketer
            // usuarios inactivos
            let telemarketer = datos.filter((liquidacion) => {
                return liquidacion.donador_usuario === $userForm.value;
            })

            $('#tableTelemarketer').DataTable({

                dom: 'Bfrtip',
                buttons: [
                    'excelHtml5',
                    'csvHtml5',
                    'pdfHtml5'
                ],
                language: {


                    "search": "Buscar por: "
                },

                paging: false,
                info: false,
                destroy: true,
                data: telemarketer,
                columns: [
                    { data: 'usuario_nombre', title: 'Telemarketer' },
                    { data: 'donador_nombre', title: 'Donador' },
                    { data: 'donador_importe', title: 'Importe' },
                    { data: 'donador_provincia', title: 'Provincia' },
                    { data: 'donador_email', title: 'Email' }
                ]
            });

        } catch (error) {
            console.log(error)
        }
    }

    $btnTablaTelemarketer.addEventListener('click', () => {
        liquidaciones();
        $modalTelemarketer.classList.add('modal-active');
        //$('#tableTelemarketer').DataTable().destroy();
        // estado = false;
    })

    async function traerDatosLiqTel() {
        try {
            const datosTelemarketer = await fetch('modulos/consultaLiqTeleInnerDB.php', {
                method: 'GET',
            })

            const datos = await datosTelemarketer.json();
            console.log(datos)
            console.log($userForm);

            // filtrar datos por usuario telemarketer
            // usuarios inactivos
            let telemarketer = datos.filter((liquidacion) => {
                return liquidacion.donador_usuario === $userForm.value;
            })

            // renderizo los datos a la tabla
            telemarketer.forEach(liquidacion => {
                resultados += `
                  <tr>
                      <td>${liquidacion.donador_usuario}</td>
                      <td>${liquidacion.donador_nombre}</td>
                      <td>${liquidacion.donador_importe}</td>
                      <td>${liquidacion.donador_provincia}</td>
                      <td>${liquidacion.donador_email}</td>
                  </tr>
                  `
            })

            $tbodyLiquidacionesTelemarketer.innerHTML = resultados;
            resultados = '';

        } catch (error) {
            console.log(error)
        }
    }

    // funcion al quitar el focus del input dni
    $dniForm.addEventListener('focusout', () => {

        let datosForm = new FormData($formularioDonacion)

        fetch('modulos/consultaDonanteDB.php', {
                method: 'POST',
                body: datosForm
            })
            .then(res => res.json())
            .then(data => {

                if (data) {
                    // alerta de que existe donador en la base
                    alertSiDni(data.donador_dni);
                    // deshabilito boton alta
                    $btnFormDonador.disabled = true;
                    // muestro boton agregar nuevo DNI
                    $btnDni.classList.remove('hidden');
                    $btnEditarDonador.classList.remove('hidden');
                    $columnasOculta1.classList.remove('hidden');
                    $columnasOculta2.classList.remove('hidden');

                    // $userForm.value = data.donador_usuario; // telemarketer que cargo al donante

                    // lleno el formualario
                    $formDonadorEstado.value = data.donador_activo;
                    $dniForm.value = data.donador_dni;
                    $formNombreDonador.value = data.donador_nombre;
                    $formTelefono1Donador.value = data.donador_telefono1;
                    $formTelefono2Donador.value = data.donador_telefono2;
                    $formEmailDonador.value = data.donador_email;
                    $formCodigoPostal.value = data.donador_codigoPostal;
                    $ocultarDonadorInicio.classList.remove('hidden');
                    $donadorInicio.disabled = true;
                    $donadorInicio.value = data.donador_inicio;

                    // hago cambios de inputs para mostrar provincia, localidad e importe, estado y fecha inicio
                    $switchDonadorEstado.classList.remove('hidden');
                    if ($formDonadorEstado.value == 1) {
                        $checkboxDonadorEstado.checked = true;
                    } else {
                        $checkboxDonadorEstado.checked = false;
                    }

                    $ocultarProvincia.classList.add('hidden');
                    $formProvinciaVista.type = 'text';
                    $formProvinciaVista.value = data.donador_provincia;
                    $ocultarLocalidad.classList.add('hidden');
                    $formLocalidadVista.type = 'text';
                    $formLocalidadVista.value = data.donador_localidad;
                    $ocultarImporteSugerido.classList.add('hidden');
                    $ocultarImporteDonador.classList.add('hidden');
                    $donadorImporte.classList.remove('hidden')

                    $formDireccion.value = data.donador_direccion;
                    $formOng.value = data.donador_ong;
                    $formImporte.value = data.donador_importe;

                    // verifico tipo tarjeta 
                    switch (data.donador_tarjetaTipo) {

                        case '1':
                            $tipoTarjetaForm.value = "Visa" // cargo tipo de tarjeta asociado a la base

                            $iconCard.classList.remove('icofont-credit-card')
                            $iconCard.classList.add('icofont-visa-alt')
                                // $cardVencimientoForm.disabled = false
                                //   $cardVencimientoForm.focus()
                            break;

                        case '2':
                            $tipoTarjetaForm.value = "Mastercard" // cargo tipo de tarjeta asociado a la base
                            $iconCard.classList.remove('icofont-credit-card')
                            $iconCard.classList.add('icofont-mastercard-alt')
                            $cardVencimientoForm.disabled = false
                                //   $cardVencimientoForm.focus()
                            break;

                        case '3':
                            $tipoTarjetaForm.value = "American Express" // cargo tipo de tarjeta asociado a la base
                            $iconCard.classList.remove('icofont-credit-card')
                            $iconCard.classList.add('icofont-american-express-alt')
                            $cardVencimientoForm.disabled = false
                                // $cardVencimientoForm.focus()
                            break;

                        case '4':
                            $tipoTarjetaForm.value = "Maestro" // cargo tipo de tarjeta asociado a la base
                            $iconCard.classList.remove('icofont-credit-card')
                            $iconCard.classList.add('icofont-maestro-alt')
                            $cardVencimientoForm.disabled = false
                                //  $cardVencimientoForm.focus()
                            break;

                        case '5':
                            $tipoTarjetaForm.value = "Discover" // cargo tipo de tarjeta asociado a la base
                            $iconCard.classList.remove('icofont-credit-card')
                            $iconCard.classList.add('icofont-discover-alt')
                            $cardVencimientoForm.disabled = false
                                //   $cardVencimientoForm.focus()
                            break;

                        case '6':
                            $tipoTarjetaForm.value = "JCB" // cargo tipo de tarjeta asociado a la base
                            $iconCard.classList.remove('icofont-credit-card')
                            $iconCard.classList.add('icofont-jcb-alt')
                            $cardVencimientoForm.disabled = false
                                //  $cardVencimientoForm.focus()
                            break;

                        case '7':
                            $tipoTarjetaForm.value = "Diners" // cargo tipo de tarjeta asociado a la base
                            $iconCard.classList.remove('icofont-credit-card')
                            $iconCard.classList.add('icofont-diners-club-alt-2')
                            $cardVencimientoForm.disabled = false
                                // $cardVencimientoForm.focus()
                            break;

                        default:
                            $iconCard.classList.add('icofont-credit-card')
                            $tipoTarjetaForm.value = ''
                            $cardVencimientoForm.disabled = true
                                /*$iconCard.classList.add('icofont-minus-circle')
                                $iconCard.style.color = 'red'
                                $iconCard.style.fontSize = '20px'
                                $tipoTarjetaForm.value = 'Tarjeta no identifacada'*/
                    }

                    $cardNumeroForm.value = data.donador_tarjetaNumero;
                    $cardVencimientoForm.value = data.donador_tarjetaVencimiento;
                    $cardVencimiento.value = data.donador_tarjetaVencimiento;
                    $formObservacionesDonador.value = data.donador_observaciones;


                    // desabilito los inputs del formulario
                    $formDonadorEstado.disabled = true;
                    $dniForm.disabled = true;
                    $formNombreDonador.disabled = true;
                    $formTelefono1Donador.disabled = true;
                    $formTelefono2Donador.disabled = true;
                    $formEmailDonador.disabled = true;
                    $formCodigoPostal.disabled = true;
                    $formProvinciaVista.disabled = true;
                    $formLocalidadVista.disabled = true;
                    $formDireccion.disabled = true;
                    $formOng.disabled = true;
                    $formImporte.disabled = true;
                    $cardNumeroForm.disabled = true;
                    $cardVencimientoForm.disabled = true;
                    $cardVencimiento.disabled = true;
                    $formObservacionesDonador.disabled = true;

                } else {
                    $formDonadorEstado.value = "1";
                    $btnFormDonador.disabled = false;
                    $dniForm.value = $dniForm.value.trim();
                    //cargarFechaActual();
                }

            })
            .catch(error => console.log(error))

    })

    // funcion al presionar btn cargar nuevo dni
    $btnDni.addEventListener('click', () => {

        // muestro select provincia, localidad e importe y oculta los input que muestran valors si encuentran dni
        $ocultarProvincia.classList.remove('hidden');
        $formProvinciaVista.type = 'hidden';
        $ocultarLocalidad.classList.remove('hidden');
        $formLocalidadVista.type = 'hidden';
        $donadorImporte.classList.add('hidden');
        $ocultarImporteSugerido.classList.remove('hidden');
        $ocultarImporteDonador.classList.remove('hidden');
        $columnasOculta1.classList.add('hidden');
        $columnasOculta2.classList.add('hidden');

        // elimino botones nuevo dni y modificar donador
        $btnDni.classList.add('hidden');
        $btnEditarDonador.classList.add('hidden');
        // oculto switch estado
        $switchDonadorEstado.classList.add('hidden');
        $ocultarDonadorInicio.classList.add('hidden');


        $formProvincia.value = '';
        $formProvincia.disabled = true;
        $formLocalidad.value = '';
        $formLocalidad.disabled = true;
        $iconCard.classList.remove('icofont-visa-alt');
        $iconCard.classList.remove('icofont-mastercard-alt');
        $iconCard.classList.remove('icofont-american-express-alt');
        $iconCard.classList.remove('icofont-maestro-alt');
        $iconCard.classList.remove('icofont-discover-alt');
        $iconCard.classList.remove('icofont-jcb-alt');
        $iconCard.classList.remove('icofont-diners-club-alt-2');
        $iconCard.classList.add('icofont-credit-card');
        // $btnDni.classList.add('hidden');
        $cardVencimiento.value = '';
        $btnFormDonador.disabled = false;

        // habilito campos
        $donadorInicio.disabled = false;
        $formDonadorEstado.disabled = false;
        $dniForm.disabled = false;
        $formNombreDonador.disabled = false;
        $formTelefono1Donador.disabled = false;
        $formTelefono2Donador.disabled = false;
        $formEmailDonador.disabled = false;
        $formCodigoPostal.disabled = false;
        $formProvinciaVista.disabled = true;
        $formLocalidadVista.disabled = true;
        $formDireccion.disabled = false;
        $formOng.disabled = false;
        $formImporte.disabled = false;
        $cardNumeroForm.disabled = false;
        $cardVencimientoForm.disabled = false;
        $cardVencimiento.disabled = false;
        $formObservacionesDonador.disabled = false;
        $formularioDonacion.reset();
        $dniForm.focus();

    })

    // funcion al perder el foco del input Nombre
    $formNombreDonador.addEventListener('focusout', () => {
        $formNombreDonador.value = $formNombreDonador.value.trim();

    })

    // funcion al perder el foco del input telefono1
    /*$formTelefono1Donador.addEventListener('focusout', () => {
        $formTelefono1Donador.value = $formTelefono1Donador.value.trim();

    })*/

    // funcion al tener el foco del input codigo postal
    $formCodigoPostal.addEventListener('focusin', () => {
        // elimino datos en el select de provincias
        for (let i = $formProvincia.options.length; i >= 0; i--) {
            $formProvincia.remove(i);
        }

        // elimino datos en el select de localidades
        for (let i = $formLocalidad.options.length; i >= 0; i--) {
            $formLocalidad.remove(i);
        }

        $formProvincia.disabled = true;
        $formLocalidad.disabled = true;
        //$formDireccion.disabled = true;

    })

    // funcion al perder el foco del input direccion
    $formDireccion.addEventListener('focusout', () => {
        $formDireccion.value = $formDireccion.value.trim();
    })

    // funcion al quitar el foco del input codigo postal
    $formCodigoPostal.addEventListener('focusout', () => {
        $formProvincia.disabled = false;
        $formLocalidad.disabled = false;
        $formDireccion.disabled = false;
        let provincias = [];
        let localidades = [];

        let datosForm = new FormData($formularioDonacion)
        let codigoPostal = datosForm.get('donador_codigoPostal')
        codigoPostal = codigoPostal.trim(); // remuevo espacios

        if (codigoPostal == "" || codigoPostal == "0" || codigoPostal == "00" || codigoPostal == "000" || codigoPostal == "0000") {

            $formProvincia.disabled = true;
            $formLocalidad.disabled = true;
            erroresFormulario.push('Debe agregar un Código Postal');
            // remuevo class error
            // $errorPostal.classList.remove('hidden');

        } else {

            // agrego mensaje de error
            //$errorPostal.classList.add('hidden');

            // consulto a la BD tabla codigo postales
            fetch('modulos/consultaPostalesDB.php', {
                    method: 'GET'
                })
                .then(res => res.json())
                .then(data => {

                    // cargo los codigos postales de la BD
                    let codigosPostales = data.filter((codigos) => {
                        return codigos.codigo_postal;
                    })

                    // guardo el codigo postal que se seleciono
                    let codigoSeleccionado = codigosPostales.filter((codigo) => {
                        return codigo.codigo_postal === codigoPostal;
                    })

                    // guardo las provincias de ese codigo
                    codigoSeleccionado.forEach((elemento) => {
                        provincias.push(elemento.provincia);
                    })

                    // guardo las localidades de ese codigo
                    codigoSeleccionado.forEach((elemento) => {
                        localidades.push(elemento.localidad);
                    })

                    // saco duplicados provincias
                    let dataProvincias = new Set(provincias)
                    let resultadoProvincias = [...dataProvincias];
                    resultadoProvincias.sort(); // ordeno

                    // saco duplicados localidades
                    let dataLocalidades = new Set(localidades)
                    let resultadoLocalidades = [...dataLocalidades];
                    resultadoLocalidades.sort(); // ordeno

                    // llamo a las funciones
                    llenarSelectProvincia();
                    llenarSelectLocalidades();

                    function llenarSelectProvincia() {
                        resultadoProvincias.forEach(function(elemento) {
                            let option = document.createElement('option');
                            option.value = `${elemento}`;
                            option.text = `${elemento}`;
                            $formProvincia.appendChild(option);
                        })
                    }

                    function llenarSelectLocalidades() {
                        localidades.forEach(function(elemento) {
                            let option = document.createElement('option');
                            option.value = `${elemento}`;
                            option.text = `${elemento}`;
                            $formLocalidad.appendChild(option);
                        })
                    }

                    $formDireccion.focus();
                })
                .catch(error => console.log(error))
        }
    })

    // funcion al perder el foco del select Ong
    // IMPORTANTE VER COMPORTAMIENTO PORQUE SE DEJO SOLO NOMBRE ONG
    $formOng.addEventListener('focusout', () => {
        if ($formOng.value !== 'default') {
            $formImporteSugerido.disabled = false;
        } else {
            $formImporteSugerido.disabled = true;
        }
    })

    $formImporteSugerido.disabled = false; // habilito la lista importe sugerido
    // funcion al tener el foco en input Importe Sugerido
    $formImporteSugerido.addEventListener('focusin', () => {
        //$errorImporte.classList.add('hidden');
    })

    // funcion al perder el foco de Importe Sugerido
    $formImporteSugerido.addEventListener('focusout', () => {
        if ($formImporteSugerido.value === 'default') {
            $formImporteAgregado.disabled = false;
        } else {
            $formImporte.value = $formImporteSugerido.value;
            $formImporteAgregado.value = "";
            $formImporteAgregado.disabled = true;
            //console.log($formImporte.value);
            // $errorImporte.classList.add('hidden');
        }
    })

    // funcion al perder el foco del Importe agregado
    $formImporteAgregado.addEventListener('focusout', () => {
        if ($formImporteAgregado.value === "" || $formImporteAgregado.value === "0") {
            //$errorImporte.classList.remove('hidden');
        } else {
            $formImporte.value = $formImporteAgregado.value;
            // $errorImporte.classList.add('hidden');
            console.log($formImporte.value)
        }
    })

    // funcion al quitar el foco del input Importe
    /*$formImporte.addEventListener('focusout', () => {
        if ($formImporte.value == 'default') {
            $errorImporte.classList.remove('hidden');
        } else {
            $errorImporte.classList.add('hidden');
        }
    })*/

    // fecha personalizada vencimiento tarjeta de credito
    new Cleave('.vencimientoTarjeta', {
        date: true,
        datePattern: ['m', 'y'],
        delimiter: '/'
    });

    // funcion al quitar el focus del input vencimiento tarjeta
    $cardVencimientoForm.addEventListener('focusout', () => {
        $cardVencimiento.value = $cardVencimientoForm.value
            // $cardVencimiento.value = $cardVencimientoForm.value.replace(/ /g, "");
            // const valor = $cardVencimiento.value;
            // const nuevovalor = valor.split('');

        //  if (nuevovalor[0] > 1) {
        //       console.log('el mes de vencimiento esta mal')
        //   }
    })

    let cardType;
    let cleave = new Cleave('.cardNumber', {
        creditCard: true,
        delimiter: ' ',
        onCreditCardTypeChanged: type => cardType = type
    });

    // funcion que cambia los estilos de tipo de tarjeta al entrar al input card numeros
    $cardNumeroForm.addEventListener('focusin', () => {
        $iconCard.classList.add('icofont-credit-card')
        $cardVencimientoForm.disabled = true
        $cardVencimientoForm.blur()
        $iconCard.classList.remove('icofont-visa-alt')
        $iconCard.classList.remove('icofont-mastercard-alt')
        $iconCard.classList.remove('icofont-american-express-alt')
        $iconCard.classList.remove('icofont-maestro-alt')
        $iconCard.classList.remove('icofont-discover-alt')
        $iconCard.classList.remove('icofont-jcb-alt')
        $iconCard.classList.remove('icofont-diners-club-alt-2')
        $tipoTarjetaForm.value = ''
    })

    // funcion que captura numero de tarjeta ingresado al salir
    // ATENCION: SI DA ALGUN ERROR, VERIFICAR ID TARJETAS EN BASE DE DATOS
    $cardNumeroForm.addEventListener('focusout', () => {

        $tipoTarjetaForm.value = cardType
        console.log($tipoTarjetaForm.value)
            //$cardTipo.value = $tipoTarjetaForm.value
        $cardNumero.value = $cardNumeroForm.value.replace(/ /g, ""); // quita los espacios de los numeros de la tarjeta

        // fetch que trae tarjetas invalidas
        fetch('modulos/consultaTarjetasDB.php', {
                method: 'GET'
            })
            .then(res => res.json())
            .then(data => {

                if (data) {

                    // guardo los id de las tarjetas invalidas
                    data.forEach(tarjeta => {
                        tarjetasInvalidas.push(tarjeta.tarjeta_id)
                    })

                    if (tarjetasInvalidas.indexOf($cardTipo.value) === 0) { // verificar si es mejor poner != -1
                        $iconCard.classList.remove('icofont-visa-alt');
                        $iconCard.classList.remove('icofont-mastercard-alt');
                        $iconCard.classList.remove('icofont-american-express-alt');
                        $iconCard.classList.remove('icofont-maestro-alt');
                        $iconCard.classList.remove('icofont-discover-alt');
                        $iconCard.classList.remove('icofont-jcb-alt');
                        $iconCard.classList.remove('icofont-diners-club-alt-2');
                        $iconCard.classList.add('icofont-credit-card');
                        $cardVencimientoForm.disabled = true;
                        alertTarjetaDeshabilitada($tipoTarjetaForm.value)

                        $cardNumero.value = '';
                        $cardNumeroForm.value = '';
                        $tipoTarjetaForm.value = '';
                        $cardTipo.value = '';
                    }
                }
            })
            .catch(error => console.log(error))

        switch ($tipoTarjetaForm.value) {

            case 'visa':
                console.log($tipoTarjetaForm.value);
                $cardTipo.value = "1" // cargo tipo de tarjeta asociado a la base
                $iconCard.classList.remove('icofont-credit-card');
                $iconCard.classList.add('icofont-visa-alt');
                $cardVencimientoForm.disabled = false;
                $cardVencimientoForm.focus();
                break;

            case 'mastercard':
                console.log($tipoTarjetaForm.value);
                $cardTipo.value = "2" // cargo tipo de tarjeta asociado a la base
                $iconCard.classList.remove('icofont-credit-card');
                $iconCard.classList.add('icofont-mastercard-alt');
                $cardVencimientoForm.disabled = false;
                $cardVencimientoForm.focus();
                break;

            case 'amex':
                $cardTipo.value = "3" // cargo tipo de tarjeta asociado a la base
                $iconCard.classList.remove('icofont-credit-card');
                $iconCard.classList.add('icofont-american-express-alt');
                $cardVencimientoForm.disabled = false;
                $cardVencimientoForm.focus();
                break;

            case 'maestro':
                $cardTipo.value = "4" // cargo tipo de tarjeta asociado a la base
                $iconCard.classList.remove('icofont-credit-card');
                $iconCard.classList.add('icofont-maestro-alt');
                $cardVencimientoForm.disabled = false;
                $cardVencimientoForm.focus();
                break;

            case 'discover':
                $cardTipo.value = "5" // cargo tipo de tarjeta asociado a la base
                $iconCard.classList.remove('icofont-credit-card');
                $iconCard.classList.add('icofont-discover-alt');
                $cardVencimientoForm.disabled = false;
                $cardVencimientoForm.focus();
                break;

            case 'jcb':
                $cardTipo.value = "6" // cargo tipo de tarjeta asociado a la base
                $iconCard.classList.remove('icofont-credit-card');
                $iconCard.classList.add('icofont-jcb-alt');
                $cardVencimientoForm.disabled = false;
                $cardVencimientoForm.focus();
                break;

            case 'diners':
                $cardTipo.value = "7" // cargo tipo de tarjeta asociado a la base
                $iconCard.classList.remove('icofont-credit-card');
                $iconCard.classList.add('icofont-diners-club-alt-2');
                $cardVencimientoForm.disabled = false;
                $cardVencimientoForm.focus();
                break;

            case 'unknown':
                alertNumeroTarjetaError($cardNumero.value);
                $iconCard.classList.add('icofont-credit-card');
                $tipoTarjetaForm.value = '';
                $cardVencimientoForm.disabled = true;
                $cardNumero.value = '';
                break;

            default:
                $iconCard.classList.add('icofont-credit-card');
                $tipoTarjetaForm.value = '';
                $cardVencimientoForm.disabled = true;
                /*$iconCard.classList.add('icofont-minus-circle')
                $iconCard.style.color = 'red'
                $iconCard.style.fontSize = '20px'
                $tipoTarjetaForm.value = 'Tarjeta no identifacada'*/
        }
        //console.log($tipoTarjetaForm.value)

    });

    // funcion que captura el input tipo de tarjeta de credito al salir
    $tipoTarjetaForm.addEventListener('focusout', () => {
        alert($tipoTarjetaForm.value)
    })

    // boton del submit del formulario alta
    $formularioDonacion.addEventListener('submit', (e) => {
        e.preventDefault();

        // $donadorInicio.setAttribute('disabled', false);
        $donadorInicio.value = fechaActual(); // cargo la fecha de carga que da inicio al donador

        // quito errores css
        erroresFormulario = [];
        $dniForm.classList.remove('field-error');
        $formNombreDonador.classList.remove('field-error');
        $formTelefono1Donador.classList.remove('field-error');
        $formEmailDonador.classList.remove('field-error');
        $formCodigoPostal.classList.remove('field-error');
        $formDireccion.classList.remove('field-error');
        $formOng.classList.remove('field-error');
        //$formOng.classList.remove('field-error');
        $formImporteSugerido.classList.remove('field-error');
        $formImporteAgregado.classList.remove('field-error');
        $cardNumeroForm.classList.remove('field-error');
        $cardVencimientoForm.classList.remove('field-error');

        let datosForm = new FormData($formularioDonacion)
        const DATOS = [...datosForm.entries()];

        $mensaje.classList.remove('hidden')
        $loader.classList.remove('hidden');
        $mensaje.innerHTML = `<span>Validando datos...</span>`
        document.body.style.cursor = 'wait'; // cambio el estilo del cursor mientras carga
        $btnFormDonador.disabled = true;

        // settimeout contenededor
        setTimeout(() => {

            $mensaje.classList.add('hidden')
            $loader.classList.add('hidden');
            $mensaje.innerHTML = `<span></span>`;
            document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
            $btnFormDonador.disabled = false;


            // settimeout contenedor de mensajes errores formulario
            setTimeout(() => {
                if (datosForm.get('donador_dni') == '' || datosForm.get('donador_dni') == 0) {
                    erroresFormulario.push('Error en el DNI');
                    $dniForm.classList.add('field-error');
                } else if (datosForm.get('donador_nombre') == '') {
                    erroresFormulario.push('Error en el Nombre');
                    $formNombreDonador.classList.add('field-error');
                } else if (datosForm.get('donador_telefono1') == '' || datosForm.get('donador_telefono1') == 0) {
                    erroresFormulario.push('Error en el Telefono #1');
                    $formTelefono1Donador.classList.add('field-error');
                } else if (datosForm.get('donador_email') == '') {
                    erroresFormulario.push('Error en el Email');
                    $formEmailDonador.classList.add('field-error');
                } else if (datosForm.get('donador_codigoPostal') == '') {
                    erroresFormulario.push('Error en el Código Postal');
                    $formCodigoPostal.classList.add('field-error');
                } else if (datosForm.get('donador_direccion') == '') {
                    erroresFormulario.push('Error en la direccion');
                    $formDireccion.classList.add('field-error');
                } else if (datosForm.get('donador_ong') == '') {
                    erroresFormulario.push('Error en la ONG');
                    $formOng.classList.add('field-error');
                } else if (datosForm.get('donador_importe') == '' || datosForm.get('donador_importe') == 0) {
                    erroresFormulario.push('Error en el Importe');
                    $formImporteSugerido.classList.add('field-error');
                    $formImporteAgregado.classList.add('field-error');
                } else if (datosForm.get('donador_tarjetaNumero') < 19) {
                    erroresFormulario.push('Error en el Número de Tarjeta: Debe tener 16 digitos');
                    $cardNumeroForm.classList.add('field-error');
                } else if (datosForm.get('donador_tarjetaVencimiento') == '') {
                    erroresFormulario.push('Error en el Vencimiento de Tarjeta');
                    $cardVencimientoForm.classList.add('field-error');
                }

                if (erroresFormulario.length > 0) {
                    alertErrorInputsForm();
                    console.log(erroresFormulario)
                } else {
                    console.log(DATOS);

                    fetch('modulos/altaDonantesDB.php', {
                            method: 'POST',
                            body: datosForm
                        })
                        .then(res => res.json())
                        .then(data => {

                            if (data) {
                                //console.log('exito')
                                alertDonanteCargado();

                                $iconCard.classList.remove('icofont-visa-alt');
                                $iconCard.classList.remove('icofont-mastercard-alt');
                                $iconCard.classList.remove('icofont-american-express-alt');
                                $iconCard.classList.remove('icofont-maestro-alt');
                                $iconCard.classList.remove('icofont-discover-alt');
                                $iconCard.classList.remove('icofont-jcb-alt');
                                $iconCard.classList.remove('icofont-diners-club-alt-2');
                                $iconCard.classList.add('icofont-credit-card');

                                erroresFormulario = [];

                            } else {
                                alertErrorDonanteCargado();
                            }

                        })
                        .catch(error => console.log(error))

                    //limpiarSelect();
                    // verificar mejor manera de limpiar select provincia y localidad
                    $formularioDonacion.reset();
                    $formProvincia.value = '';
                    $formProvincia.disabled = true;
                    $formLocalidad.value = '';
                    $formLocalidad.disabled = true;
                    $dniForm.focus();
                }
            }, 300);

        }, 3000);

    })

    // cerrar secion usuario alta de donaciones
    $btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear('datosUser');
        $menuUsuario.classList.add('hidden');
        $btnLogout.classList.add('hidden')
        window.location = "index.html";
    })

    // manejo de alertas
    function alertSiDni(dni) {
        Swal.fire({
            icon: 'success',
            title: `Documento: ${dni}`,
            text: 'Ya se encuentra registrado',
            showConfirmButton: false,
            timer: 1500
        })
    }

    function alertDonanteCargado() {
        Swal.fire({
            icon: 'success',
            title: '¡Alta exitosa!',
            showConfirmButton: false,
            timer: 2500
        })
    }

    function alertErrorDonanteCargado() {
        Swal.fire({
            icon: 'error',
            title: `Error de Carga`,
            showConfirmButton: false,
            timer: 1500
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

    function alertTarjetaDeshabilitada(tarjeta) {
        Swal.fire({
            icon: 'error',
            title: `La tarjeta ${tarjeta}`,
            text: 'se encuentra deshabilitada.',
            showConfirmButton: false,
            timer: 2500
        })
    }

    function alertNumeroTarjetaError(tarjeta) {
        Swal.fire({
            icon: 'error',
            title: `El Número de tarjeta ${tarjeta}`,
            text: 'no se encuentra asociada a ninguna Empresa.',
            showConfirmButton: false,
            timer: 2500
        })
    }

})