// traer datos de postales de la base
async function traerDatosPostales() {
    try {
        const datos = await fetch('modulos/consultaPostalesDB.php', {
            method: 'POST',
            body: formData
        })

        const data = await datos.json();
        console.log(data)





    } catch (error) {
        console.log(error)
    }
}