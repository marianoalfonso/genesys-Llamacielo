document.addEventListener('DOMContentLoaded', () => {
    const $menuUsuario = document.getElementById('menuUsuario'); // menu del usuario logueado
    const $usuarioLogueado = document.getElementById('usuarioNombre') // para mostrar que usuario esta logueado
    const $usuarioRol = document.getElementById('usuarioRol'); // rol del usuario
    const $userForm = document.getElementById('user'); // carga e usuario que se cargo en el localstorage
    const $btnLogout = document.getElementById('btnLogout') // captura cuando se aprieta el boton de desloguearse


    // cargo los datos de localStorage para utilizarlos en el formulario y html
    let dataUser = localStorage.getItem('datosUser');
    dataUser = JSON.parse(dataUser);


    // verifica si el usuario esta logueado
    if (dataUser === null) {
        window.location = "index.html"
    } else {

        $usuarioRol.innerHTML = "ONG's";
        $usuarioLogueado.innerHTML = dataUser.usuario_nombre;
        //$userForm.value = dataUser.usuario_id;

    }

    // cerrar secion usuario
    $btnLogout.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.clear('datosUser');
        $menuUsuario.classList.add('hidden');
        $btnLogout.classList.add('hidden')
        window.location = "index.html";
    })










    // manejo de alertas
    function alertSiDni(dni) {
        Swal.fire(
            `El DNI: <strong>${dni}</strong>`,
            'Ya está cargado en la base.',
            'success'
        )
    }

    function alertNoDni(dni) {
        Swal.fire({
            icon: 'error',
            title: `El DNI: ${dni}`,
            text: 'No esta cargado en la base.'
        })
    }

})