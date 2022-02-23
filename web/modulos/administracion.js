document.addEventListener('DOMContentLoaded', () => {

    traerDatosUsuarios(); // llamo a la base y traigo los usuarios cargados

    const $menuUsuario = document.getElementById('menuUsuario'); // menu de usuario logueado
    const $usuarioLogueado = document.getElementById('usuarioNombre') // muestra usuario logueado
    const $usuarioRol = document.getElementById('usuarioRol'); // rol del usuario logueado
    const $btnLogout = document.getElementById('btnLogout') // captura cuando se aprieta el boton de desloguearse
    const togglePassword = document.getElementById('togglePassword');

    // modal presentaciones seleccionar tarjeta
    const $modalPresentaciones = document.querySelector('.modalPresentaciones'); // modal que sirve para seleccionar tarjetas y enviar a generar o visualizar presentaciones
    const $btnGenerarPresentaciones = document.getElementById('btnGenerarPresentaciones'); // boton del menu generar presentacion
    const $btnVerPresentaciones = document.getElementById('btnVerPresentaciones'); // boton del menu ver presentaciones
    const $btnVerPresentacionesGenerada = document.getElementById('btnVerPresentacionesGenerada'); // boton del modal modalPresentaciones

    // modal presentaciones tabla
    const $modalGenerarPresentaciones = document.querySelector('.modalVerPresentaciones'); // modal que muestra la presentacion generada para descargar txt
    const $btnGenerarArchivoTxt = document.getElementById('btnGenerarArchivoTxt'); // boton que genera la descarga de la presentacion seleccionada en formato txt
    const $modalVisualizarPresentaciones = document.querySelector('.modalVisualizarPresentaciones'); // modal que muestra las presentaciones de la tarjeta seleccionada
    const $modalVisualizarPresentacionesDetalle = document.querySelector('.modalVisualizarPresentacionesDetalle'); // modal que muestra el detalle de la liquidacion de la presentacion seleccionada

    //const $descargarTxt = document.getElementById('descargarTxt');
    let resultados = ""; // variable que carga los datos de usuarios en la tbdoy tbodyUsuarios

    //variables para el dashboard
    const $uT = document.getElementById('uT');
    const $uA = document.getElementById('uA');
    const $uI = document.getElementById('uI');
    const $uAdm = document.getElementById('uAdm');
    const $uTel = document.getElementById('uTel');
    const $uO = document.getElementById('uO');

    let dniModificacion = ''; // usado cuando modifico o doy de alta usuario
    let valorTarjetaSeleccionada = ''; // valor de la tarjeta seleccionada para usar en la presentacion y generacion de archivo txt
    let valorLiquidacionPresentacion = ''; // valor de la liquidacion al seleccionar la tarjeta seleccionada para presentacion y generacion archivo txt
    let nombreArchivoTxtPresentacion = ''; // valor que se asigna al archivo txt a descargar con la presentacion para el banco
    let valorIDliquidacionSeleccionada; // este valor va dentro de la tabla donde se visualizan las liquidaciones

    let erroresFormulario = [];
    const $mensaje = document.getElementById('mensaje'); // para mostrar los mensajes al uusuario
    const $loader = document.getElementById('loader'); // carga la imagen loader
    const $mensajePrevisualizacionPresentaciones = document.getElementById('mensajePrevisualizacionPresentaciones');
    const $loaderPrevisualizacionPresentaciones = document.getElementById('loaderPrevisualizacionPresentaciones');

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
    //const $btnTablaUsuarios = document.getElementById('btnTablaUsuarios');
    const $tbodyUsuarios = document.getElementById('tbodyUsuarios'); // para renderizar los datos traidos
    let dniUsuarios = [];
    // const $btnAltaUsuario = document.getElementById('btnAltaUsuario'); // boton para dar de alta usuario

    /*  let datosTxt = [];
      let cabeceraTxt = '';
      let pieTxt = '';
      let detallePagoTxt = [];
      let $tbodyTxt = document.getElementById('tbodyTxt');
      let tbodyTxtResultado = '';*/

    // funcion para abrir archivo txt
    /* function abrirArchivo(event) {
         let archivo = event.target.files[0];
         tbodyTxtResultado = '';

         if (archivo) {
             let reader = new FileReader();
             reader.onload = function(e) {
                 let contenido = e.target.result.split('\n');

                 for (var linea of contenido) {
                     datosTxt.push(linea)
                     console.log(linea)
                 }

                 datosTxt.pop(); // elimino ultima linea vacia

                 //console.log(datosTxt);
                 document.getElementById('contenido').innerText = contenido;

                 // guardo en cabecera y pie la primera y ultima linea del txt
                 // cabecera
                 cabeceraTxt = datosTxt[0];
                 //let cabeceraSinAsterisco = cabeceraTxt.replace('*', ''); // elimino asterisco
                 let cabeceraLimpia = cabeceraTxt.trim(); // elimino espacios cabeceraSinAsterisco.trim()

                 // pie
                 pieTxt = datosTxt[datosTxt.length - 1];
                 //let pieSinAsterisco = pieTxt.replace('*', '');
                 let pieLimpio = pieTxt.trim(); //pieSinAsterisco.trim()

                 // elimino primera y ultima linea y elimino asterisco y espacios
                 datosTxt.shift();
                 datosTxt.pop();
                 detallePagoTxt = datosTxt;
                 let datosReales = [];

                 detallePagoTxt.forEach(detalle => {
                     // limpio asterisco y espacios en detalle
                     // let detalleSinAsterisco = detalle.replace('*', '') // elimino el asterisco
                     let detalleLimpio = detalle.trim();
                     //guardo en array object
                     /*let valorCabecera = { cabecera: cabeceraLimpia };
                     let valorDetalle = { detalles: detalleLimpio };
                     let valorPie = { pie: pieLimpio };
                     let datosTxt = Object.entries(valorCabecera, valorDetalle, valorPie)
                     console.log(datosTxt)

                     let datosCrudos = {
                         cabecera: cabeceraLimpia,
                         detalle: detalleLimpio,
                         pie: pieLimpio
                     }
                     datosReales.push(datosCrudos);

                     // muestro en tabla
                     tbodyTxtResultado += `<tr>
                                              <td>${cabeceraLimpia}</td>
                                              <td>${detalleLimpio}</td>
                                              <td>${pieLimpio}</td>
                                           </tr>`
                 })

                 //console.log(datosReales)
                 alertProcesosCargados(datosReales.length)
                 pasarTxtPhp(datosReales) // llamo a la funcion de envio datos a php
                 enviarDatosTxt(datosReales);
                 $tbodyTxt.innerHTML = tbodyTxtResultado // cargo en el cuerpo de la tabla
             };
             reader.readAsText(archivo)

         } else {
             alert('no se selecciono archivo')
         }
     }*/

    // funcion traer datos de procesos para pasar a txt
    /* async function traerDatosProcesos() {
         // console.log('click')
         contenido.innerHTML = ''; // borro datos del textarea

         try {
             const datos = await fetch('modulos/consultaTxt.php', {
                 method: 'GET'
             })

             let procesos = await datos.json();
             console.log(procesos);
             // llamo a la funcion para crear el txt
             crearTxt(procesos);

         } catch (error) {
             console.log(error);
         }
     }*/


    // creacion del archivo txt
    function crearTxt(datos) {
        let total = datos.length - 1;

        // array para cargar en el txt
        let carga = [];

        // contenido.innerHTML = datos[0].presentacion_header;
        carga.push(datos[0].presentacion_header);
        //   contenido.innerHTML += '\n';
        carga.push('\n');

        for (let i = 0; i <= total; i++) {
            //  contenido.innerHTML += datos[i].presentacion_detalle;
            carga.push(datos[i].presentacion_detalle);
            //  contenido.innerHTML += '\n';
            carga.push('\n');
        }

        //contenido.innerHTML += datos[total].presentacion_footer;
        carga.push(datos[total].presentacion_footer);

        archivoTxtDescargar = carga.join(""); // elimino las comas
        Swal.fire({
            icon: 'success',
            title: '¡Archivo generado exitosamente!',
            showConfirmButton: false,
            timer: 1500
        })
        guardarArchivoDeTexto(archivoTxtDescargar, nombreArchivoTxtPresentacion);

        //console.log(carga)
        carga = [];
    }

    // creo el txt para descargar
    const guardarArchivoDeTexto = (contenido, nombre) => {
        const a = document.createElement("a");
        const archivo = new Blob([contenido], { type: 'text/plain' });
        const url = URL.createObjectURL(archivo);
        a.href = url;
        a.download = nombre;
        a.click();
        URL.revokeObjectURL(url);
    }

    // evento apretar boton cargar archivo txt
    // document.getElementById('file').addEventListener('change', abrirArchivo);

    // evento apretar boton para descargar archivo txt
    // document.getElementById('descargarTxt').addEventListener('click', traerDatosProcesos);

    // boton que abre modal para cargar id de tarjeta para generar presentacion
    $btnGenerarPresentaciones.addEventListener('click', () => {
        // agrego titulo al modal y nombre el boton
        document.querySelector('.modal_titulo_presentacion').innerHTML = "Seleccione tarjeta para generar Presentación";
        document.querySelector('.modal_btn_presentacion').innerHTML = "GENERAR PRESENTACIÓN";
        $modalPresentaciones.classList.add('modal-active');
    })

    // boton que abre modal para cargar id de tarjeta para ver presentacion
    $btnVerPresentaciones.addEventListener('click', () => {
        // agrego titulo al modal y nombre el boton
        document.querySelector('.modal_titulo_presentacion').innerHTML = "Seleccione tarjeta para ver Presentaciones";
        document.querySelector('.modal_btn_presentacion').innerHTML = "VISUALIZAR PRESENTACIONES";
        $modalPresentaciones.classList.add('modal-active');
    })

    // boton que abre modal con los datos de la tarjeta seleccionada
    $btnVerPresentacionesGenerada.addEventListener('click', (e) => {
        e.preventDefault();
        let btnSeleccionadoPresentaciones;
        // si modifico los textos de los botones debo modicar este control también
        if (document.querySelector('.modal_btn_presentacion').innerHTML === "GENERAR PRESENTACIÓN") {
            btnSeleccionadoPresentaciones = "1";
        } else {
            btnSeleccionadoPresentaciones = "2";
        }
        // guardo valor que se selecciono de tarjeta
        valorTarjetaSeleccionada = document.getElementById('tarjetaId').value;

        // guardo el nombre que le voy a poner al archivo txt
        if (valorTarjetaSeleccionada == 1) {
            nombreArchivoTxtPresentacion = 'DEBLIQC';
        } else if (valorTarjetaSeleccionada == 2) {
            nombreArchivoTxtPresentacion = 'DEBLIQD';
        } else {
            nombreArchivoTxtPresentacion = 'DEBLIMC';
        }

        //alert(valorTarjetaSeleccionada);
        // $modalPresentaciones.classList.remove('modal-active');
        $mensajePrevisualizacionPresentaciones.classList.remove('hidden');
        $loaderPrevisualizacionPresentaciones.classList.remove('hidden');
        $mensajePrevisualizacionPresentaciones.innerHTML = 'Cargando datos...';
        $btnVerPresentacionesGenerada.disabled = true;
        document.querySelector('.modalPresentaciones .modal-close-cross').style.display = "none";


        document.body.style.cursor = 'wait'; // cambio el estilo del cursor mientras carga

        setTimeout(() => {
            document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
            document.querySelector('.modalPresentaciones .modal-close-cross').style.display = "inline";
            $btnVerPresentacionesGenerada.disabled = false;
            $mensajePrevisualizacionPresentaciones.classList.add('hidden');
            $loaderPrevisualizacionPresentaciones.classList.add('hidden');
            $mensajePrevisualizacionPresentaciones.innerHTML = '';
            $modalPresentaciones.classList.remove('modal-active');
            $modalGenerarPresentaciones.classList.add('modal-active');
            document.getElementById('tarjetaId').value = 1; // una vez seleccionada vuelvo a poner como predeterminada la tarjeta 1
            if (btnSeleccionadoPresentaciones === "1") {
                llamarProcedimientoGenerarPresentacion(valorTarjetaSeleccionada);
            } else {
                $modalGenerarPresentaciones.classList.remove('modal-active');
                llamarProcedimientoVerPresentaciones(valorTarjetaSeleccionada);
            }

        }, 3000);

    })

    // funcion para llamar procedimiento generarPresentacion tarjeta
    async function llamarProcedimientoGenerarPresentacion(idTarjeta) {
        try {

            const formData = new FormData();
            const json = JSON.stringify(idTarjeta);
            formData.append('idTarjeta', json);

            let datosTarjeta = await fetch('modulos/llamarProcedimientoGenerarPresentacion.php', {
                method: 'POST',
                body: formData
            })

            let datos = await datosTarjeta.json();
            // console.log(datos);
            valorLiquidacionPresentacion = datos[0].ID_liq;
            console.log(datos)

            // renderizar los datos traidos de la presentacion y mostrarlos en un datatable y agregar boton descargar presentacion txt
            $('#tablaPresentacionesTarjeta').DataTable({

                dom: 'Bfrtip',
                language: {
                    "zeroRecords": "No se encontraron datos",
                    "infoEmpty": "No hay datos disponibles",

                },
                info: false,
                paging: false,
                destroy: true,
                data: datos,
                columns: [
                    { data: 'ID_liq', title: 'ID_LIQ.' },
                    { data: 'nombre', title: 'NOMBRE' },
                    { data: 'dni', title: 'DNI' },
                    { data: 'tarjeta', title: 'TARJETA' },
                    { data: 'tarjetaNro', title: 'TARJETA NRO.' },
                    { data: 'importe', title: 'IMPORTE' },
                    { data: 'desde', title: 'DESDE' },
                    { data: 'hasta', title: 'HASTA' }
                ]

            });

        } catch (error) {
            console.log(error);
        }
    }

    // funcion para llamar al procedimiento verPresentaciones
    async function llamarProcedimientoVerPresentaciones(idTarjeta) {
        try {

            const formData = new FormData();
            const json = JSON.stringify(idTarjeta);
            formData.append('idTarjeta', json);

            let datosTarjeta = await fetch('modulos/llamarProcedimientoVerPresentaciones.php', {
                method: 'POST',
                body: formData
            })

            let datos = await datosTarjeta.json();
            //console.log(datos)

            // renderizo los datos pedidos al proceso de verPresentaciones, con boton de ver detalle para llamar al procedimiento VerPresentacionDetalle
            $('#tablaVisualizarPresentacionesTarjeta').DataTable({

                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel', 'csv', 'pdfHtml5'
                ],
                searching: false,
                info: false,
                paging: false,
                destroy: true,
                data: datos,
                columns: [
                    { data: 'ID_liq', title: 'ID_LIQ.' },
                    { data: 'tarjeta', title: 'TARJETA' },
                    { data: 'desde', title: 'DESDE' },
                    { data: 'hasta', title: 'HASTA' },
                    {
                        "render": function() {
                            return `<a class="detalle btn btn--xs btn--primary text-white">Visualizar</a>`;
                        }
                    },
                    {
                        "render": function() {
                            return `<a class="gen-presentacion btn btn--xs btn--primary text-white">Generar .TXT</a>`;
                        }
                    }
                ],

                columnDefs: [
                    { title: 'DETALLE', targets: 4 },
                    { title: 'PRESENTACION', targets: 5 }

                ]
            });

            $modalVisualizarPresentaciones.classList.add('modal-active'); // una vez traidos los datos activo el modal para mostrar

        } catch (error) {
            console.log(error);
        }
    }

    // evento que capturo el ID de liquidacion del boton detalle seleccionado para enviar al proceso
    // IMPORTANTE: HAY ERROR EN EL PROCEDIMIENTO SQL: PERMITE MOSTRAR HASTA CIERTA CANTIDAD DE ID_LIQ
    document.getElementById('tablaVisualizarPresentacionesTarjeta').addEventListener('click', (e) => {


        if (e.target.classList.contains('detalle')) {
            valorIDliquidacionSeleccionada = $(e.target).closest('tr').find('td:first').text();
            llamarProcedimientoVerPresentacionDetalle(valorIDliquidacionSeleccionada);
        } else if (e.target.classList.contains('gen-presentacion')) {
            valorIDliquidacionSeleccionada = $(e.target).closest('tr').find('td:first').text();
            //llamarProcedimientoArchivoTxt(valorIDliquidacionSeleccionada);
            llamarProcedimientoverificarExistenciaArchivos(valorIDliquidacionSeleccionada);

        }

        //valorIDliquidacionSeleccionada = $(e.target).closest('tr').find('td:first').text(); // guardo en variable el valor del ID de la liquidacion visualizada para ver detalle
        //console.log(`id seleccionada: ${valorIDliquidacionSeleccionada}`);

    })

    // funcion para llamar al procedimiento verPresentacionDetalle
    async function llamarProcedimientoVerPresentacionDetalle(idLiquidacion) {

        try {
            const $botonRegresar = document.getElementById('regresarDetalle');
            const formData = new FormData();
            const json = JSON.stringify(idLiquidacion);
            formData.append('idLiquidacion', json);

            let datosLiquidacion = await fetch('modulos/llamarProcedimientoVerPresentacionDetalle.php', {
                method: 'POST',
                body: formData
            })

            let datos = await datosLiquidacion.json();
            console.log(datos);

            // renderizo los datos pedidos al proceso de verPresentacionDetalle
            $('#tablaVisualizarPresentacionesTarjetaDetalle').DataTable({

                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel', 'csv', 'pdfHtml5'
                ],
                searching: false,
                info: false,
                paging: false,
                destroy: true,
                data: datos,
                columns: [
                    { data: 'ID_liq', title: 'ID_LIQ.' },
                    { data: 'nombre', title: 'NOMBRE' },
                    { data: 'dni', title: 'DNI' },
                    { data: 'tarjeta', title: 'TARJETA' },
                    { data: 'tarjetaNro', title: 'TARJETA NRO.' },
                    { data: 'importe', title: 'IMPORTE' },
                    { data: 'desde', title: 'DESDE' },
                    { data: 'hasta', title: 'HASTA' }
                ]

            });

            $modalVisualizarPresentacionesDetalle.classList.add('modal-active'); // una vez traidos los datos activo el modal para mostrar

            // boton para regresar al modal anterior, llama de nuevo al procedimiento verPresentaciones
            // NOTA: tratar de regresar sin llamar al procedimiento de nuevo
            $botonRegresar.addEventListener('click', () => {
                llamarProcedimientoVerPresentaciones(valorTarjetaSeleccionada);
                $modalVisualizarPresentaciones.classList.add('modal-active');
            })

        } catch (error) {
            console.log(error);
        }

    }

    // funcion para llamar al procedimiento verificarExistenciaArchivos
    async function llamarProcedimientoverificarExistenciaArchivos(idLiquidacion) {

        try {
            console.log(idLiquidacion)
            const formData = new FormData();
            const json = JSON.stringify(idLiquidacion);
            formData.append('idLiquidacion', json);

            let datosLiquidacion = await fetch('modulos/llamarProcedimientoverificarExistenciaArchivos.php', {
                method: 'POST',
                body: formData
            })

            let datos = await datosLiquidacion.json();
            console.log('devolucion del procedimiento si ya se genero la presentacion');
            // console.log(datos[0].cantidad);
            if (datos[0].cantidad > 0) {
                alertVerificacionPresentacionGenerada(valorIDliquidacionSeleccionada, valorTarjetaSeleccionada);
            } else {
                llamarProcedimientoArchivoTxt(idLiquidacion);
            }

        } catch (error) {
            console.log(error);
        }

    }

    // funcion para llamar al procedimiento eliminarArchivoPresentacion
    async function llamarProcedimientoeliminarArchivoPresentacion(idLiquidacion) {

        try {
            console.log(idLiquidacion)
            const formData = new FormData();
            const json = JSON.stringify(idLiquidacion);
            formData.append('idLiquidacion', json);

            let datosLiquidacion = await fetch('modulos/llamarProcedimientoeliminarArchivoPresentacion.php', {
                method: 'POST',
                body: formData
            })

            let datos = await datosLiquidacion.json();
            console.log('devolucion del procedimiento si se elimino Archivo de presentacion');
            console.log(datos);
            alertEliminacionPresentacionArchivo();

            setTimeout(() => {
                llamarProcedimientoArchivoTxt(idLiquidacion);
            }, 1500);


        } catch (error) {
            console.log(error);
        }

    }

    // boton para descargar archivo txt con la liquidacion seleccionada
    $btnGenerarArchivoTxt.addEventListener('click', () => {
        llamarProcedimientoArchivoTxt(valorLiquidacionPresentacion);
        // cierra el modal donde se muestra la presentacion seleccionada
        $modalGenerarPresentaciones.classList.remove('modal-active'); // lo agregue recien
        valorTarjetaSeleccionada = '';
    })

    // funcion que llamar a la funcion crearTxt
    async function llamarProcedimientoArchivoTxt(idLiquidacion) {

        try {

            const formData = new FormData();
            const json = JSON.stringify(idLiquidacion);
            formData.append('idLiquidacion', json);

            let datosPresentacionTxt = await fetch('modulos/llamarProcedimientoArchivoPresentacion.php', {
                method: 'POST',
                body: formData
            })

            let datos = await datosPresentacionTxt.json();
            console.table(datos);
            crearTxt(datos);

        } catch (error) {
            console.log(error);
        }
    }

    // funcion que trae la presentacion para visualizar de la tarjeta seleccionada
    /* async function traerDatosPresentacion(idTarjeta) {
         try {
             console.log(idTarjeta)
             const formData = new FormData();
             const json = JSON.stringify(idTarjeta);
             formData.append('idTarjeta', json);

             let datosTarjeta = await fetch('modulos/consultaTarjetaPresentacion.php', {
                 method: 'POST',
                 body: formData
             })

             let datos = await datosTarjeta.json();
             console.log(datos);

             if (datos) {
                 alert('Exito en la carga de datos presentación');
             } else {
                 alert('Error en la carga de datos presentación');
             }

         } catch (error) {
             console.log(error);
         }
     }*/

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
    /* $btnTablaUsuarios.addEventListener('click', (e) => {
         // e.preventDefault();
         $tablaUsuarios.classList.remove('hidden'); // muestro la tabla usuarios cargados
         //$legend.innerHTML = 'Formulario Modificación Usuario';

         /* if (!baseUsuarios) {
              traerDatosUsuarios();
              baseUsuarios = true // cambio el estado
          } else {
              alert('ya trajo los datos');
          }
     })*/

    // pasar datos del txt a php
    /* function pasarTxtPhp(dato) {
         console.log(dato)
     }*/

    // enviar datos txt a la base
    /*  async function enviarDatosTxt(dato) {
          try {

              const formData = new FormData();
              const json = JSON.stringify(dato);
              formData.append('datos', json);

              let datosTxt = await fetch('modulos/altaTxtDB.php', {
                  method: 'POST',
                  body: formData
              })

              let datos = await datosTxt.json();
              console.log(datos);

              if (datos) {
                  alert('carga exitosa del txt en la base');
              } else {
                  alert('error en la carga del txt en la base');
              }

          } catch (error) {
              console.log(error);
          }
      }*/

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
                // guardo estado de usuario
                let estadoUsuario = "";
                if (usuario.usuario_activo == 1) {
                    estadoUsuario = "ACTIVO";
                } else {
                    estadoUsuario = "INACTIVO";
                }
                resultados += `<tr>
                                    <td>${usuario.usuario_id}</td>
                                    <td>${usuario.tipo_descripcion}</td>
                                    <td>${usuario.usuario_nombre}</td>
                                    <td>${usuario.usuario_dni}</td>
                                    <td>${usuario.usuario_password}</td>
                                    <td>${usuario.usuario_fechaInicio}</td>
                                    <td>${estadoUsuario}</td>
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
        // deshabilito boton alta y boton cerrar modal
        $btnAltaUsuarioForm.classList.add('disabled-link');
        $btnAltaUsuarioForm.style.opacity = '0.5';
        document.querySelector('.modal-close-cross').style.display = "none";

        if (dniUsuarios.indexOf($inputDniUsuario.value) != -1) {
            $btnAltaUsuarioForm.classList.remove('disabled-link');
            $btnAltaUsuarioForm.style.opacity = '1';
            document.querySelector('.modal-close-cross').style.display = "inline";
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
            document.body.style.cursor = 'wait'; // cambio el estilo del cursor mientras carga


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
                        document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
                        console.log(erroresFormulario)
                        $btnAltaUsuarioForm.classList.remove('disabled-link');
                        $btnAltaUsuarioForm.style.opacity = '1';
                        document.querySelector('.modal-close-cross').style.display = "inline";
                    } else {
                        altaDatosUsuario(formDatos); // los envia a la funcion para hacer las modificaciones en la BD

                        //modificarDatosUsuario(formData); // envio los datos a la base para modificar
                        $modal.classList.remove('modal-active');

                        $mensaje.classList.add('hidden')
                        $loader.classList.add('hidden');
                        $mensaje.innerHTML = ``;
                        document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
                        $btnAltaUsuarioForm.classList.remove('disabled-link');
                        $btnAltaUsuarioForm.style.opacity = '1';
                        document.querySelector('.modal-close-cross').style.display = "inline";
                    }

                }, 300);

            }, 3000);

        }
    })

    // cargo los datos al formData para enviar a PHP
    /* $btnModificarUsuario.addEventListener('click', (e) => {
         e.preventDefault();
         //$btnModificarUsuario.classList.add('hidden');
         $btnModificarUsuario.classList.add('disabled-link');
         $btnModificarUsuario.style.opacity = '0.5';
         document.querySelector('.modal-close-cross').style.display = "none";

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
             // console.log(DATOS);

             $mensaje.classList.remove('hidden')
             $loader.classList.remove('hidden');
             $mensaje.innerHTML = `<span>Validando datos...</span>`;
             document.body.style.cursor = 'wait'; // cambio el estilo del cursor mientras carga

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
                         document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
                         $btnModificarUsuario.classList.remove('disabled-link');
                         $btnModificarUsuario.style.opacity = '1';
                         document.querySelector('.modal-close-cross').style.display = "inline";
                         console.log(erroresFormulario)
                     } else {
                         modificarDatosUsuario(formDatos); // los envia a la funcion para hacer las modificaciones en la BD
                         //modificarDatosUsuario(formData); // envio los datos a la base para modificar
                         $modal.classList.remove('modal-active');
                         $mensaje.classList.add('hidden')
                         $loader.classList.add('hidden');
                         $mensaje.innerHTML = ``;
                         document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
                         $btnModificarUsuario.classList.remove('disabled-link');
                         $btnModificarUsuario.style.opacity = '1';
                         document.querySelector('.modal-close-cross').style.display = "inline";
                     }

                 }, 300);

             }, 3000);



         } else if (dniUsuarios.indexOf($inputDniUsuario.value) != -1) {
             alertSiDni($inputDniUsuario.value);
         }
     })*/

    // boton modificacion de usuario
    $btnModificarUsuario.addEventListener('click', (e) => {
        e.preventDefault();
        console.log($inputEstadoUsuario.value)

        if (dniModificacion !== $inputDniUsuario.value && $inputEstadoUsuario.value === '0') {
            alertModificacionFallidaInactivo();
        } else {
            if (dniUsuarios.indexOf($inputDniUsuario.value) !== -1 && $inputDniUsuario.value !== dniModificacion) {
                alertSiDni($inputDniUsuario.value);
                /*   */
            } else {
                $btnModificarUsuario.classList.add('disabled-link');
                $btnModificarUsuario.style.opacity = '0.5';
                document.querySelector('.modal-close-cross').style.display = "none";


                // quito errores css
                erroresFormulario = [];
                $inputUsuarioNombre.classList.remove('field-error');
                $inputPasswordUsuario.classList.remove('field-error');
                $inputEmailUsuario.classList.remove('field-error');
                $inputDniUsuario.classList.remove('field-error');

                const formDatos = new FormData($formEditable); // cargo todos los datos del formulario
                // controlo los datos cargados
                const DATOS = [...formDatos.entries()];
                // console.log(DATOS);

                $mensaje.classList.remove('hidden')
                $loader.classList.remove('hidden');
                $mensaje.innerHTML = `<span>Validando datos...</span>`;
                document.body.style.cursor = 'wait'; // cambio el estilo del cursor mientras carga

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
                            document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
                            $btnModificarUsuario.classList.remove('disabled-link');
                            $btnModificarUsuario.style.opacity = '1';
                            document.querySelector('.modal-close-cross').style.display = "inline";
                            console.log(erroresFormulario)
                        } else {
                            modificarDatosUsuario(formDatos); // los envia a la funcion para hacer las modificaciones en la BD
                            //modificarDatosUsuario(formData); // envio los datos a la base para modificar
                            $modal.classList.remove('modal-active');
                            $mensaje.classList.add('hidden')
                            $loader.classList.add('hidden');
                            $mensaje.innerHTML = ``;
                            document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
                            $btnModificarUsuario.classList.remove('disabled-link');
                            $btnModificarUsuario.style.opacity = '1';
                            document.querySelector('.modal-close-cross').style.display = "inline";
                        }

                    }, 300);

                }, 3000);
            }
            /**/

        }
        //$btnModificarUsuario.classList.add('hidden');

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

    // mensaje modificacion exitosa
    function alertModificacionFallidaInactivo() {
        Swal.fire({
            icon: 'error',
            title: 'No puede modificar DNI estando Inactivo',
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

    /*function alertProcesosCargados(cantidad) {
        Swal.fire({
            icon: 'success',
            title: `${cantidad} procesos cargados`,
            showConfirmButton: false,
            timer: 2500
        })
    }*/

    function alertVerificacionPresentacionGenerada(idLiquidacion, valorTarjeta) {
        if (valorTarjeta == 1) {
            valorTarjeta = 'VISA CREDITO';
        } else if (valorTarjeta == 2) {
            valorTarjeta = 'VISA DEBITO';
        } else {
            valorTarjeta = 'MASTECARD';
        }

        Swal.fire({
            title: `Ya se generó una exportación para la liquidacion ${idLiquidacion} de la tarjeta ${valorTarjeta}`,
            text: "¿Desea eliminarla y volver a generarla?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡SÍ, volver a generarla!'
        }).then((result) => {
            if (result.isConfirmed) {
                llamarProcedimientoeliminarArchivoPresentacion(idLiquidacion);
            }
        })
        document.querySelector('.swal2-styled.swal2-cancel').innerHTML = 'Cancelar'; // cambio el texto del boton del alertsweet2
        valorTarjeta = '';
    }

    function alertEliminacionPresentacionArchivo() {
        Swal.fire({
            icon: 'success',
            title: '¡Eliminación exitosa',
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

        document.body.style.cursor = 'default'; // cambio el estilo del cursor mientras carga
    }

    function alertSiDni(dni) {
        Swal.fire({
            icon: 'error',
            title: `Documento: ${dni}`,
            text: 'Ya se encuentra registrado',
            showConfirmButton: false,
            timer: 1500
        })
    }
})