<?php
include('connDB.php'); 


$dni = $_POST['donador_dni'];
$nombre = $_POST['donador_nombre'];
$telefono1 = $_POST['donador_telefono1'];
$telefono2 = $_POST['donador_telefono2'];
$email = $_POST['donador_email'];
$codigoPostal = $_POST['donador_codigoPostal'];
$provincia = $_POST['donador_provincia'];
$localidad = $_POST['donador_localidad'];
$direccion = $_POST['donador_direccion'];
$ong = $_POST['donador_ong'];
$importe = $_POST['donador_importe'];
$tarjetaNumero = $_POST['donador_tarjetaNumero'];
$tarjetaTipo = $_POST['donador_tarjetaTipo'];
$tarjetaVencimiento = $_POST['donador_tarjetaVencimiento'];
$observaciones = $_POST['donador_observaciones'];
$donadorActivo = $_POST['donador_activo'];
$usuario = $_POST['donador_usuario'];
$donadorInicio = $_POST['donador_inicio'];

$sentencia=$conPDO->prepare("INSERT INTO donadores (donador_ong, donador_dni, donador_nombre, donador_telefono1, donador_telefono2, donador_email, donador_codigoPostal, donador_provincia, donador_localidad, donador_direccion, donador_tarjetaTipo, donador_tarjetaNumero, donador_tarjetaVencimiento, donador_importe, donador_observaciones, donador_activo, donador_usuario, donador_inicio) VALUES (:donador_ong, :donador_dni, :donador_nombre, :donador_telefono1, :donador_telefono2, :donador_email, :donador_codigoPostal, :donador_provincia, :donador_localidad, :donador_direccion, :donador_tarjetaTipo, :donador_tarjetaNumero,:donador_tarjetaVencimiento, :donador_importe, :donador_observaciones, :donador_activo, :donador_usuario, :donador_inicio)");

$sentencia->bindParam(':donador_ong', $ong);
$sentencia->bindParam(':donador_dni', $dni);
$sentencia->bindParam(':donador_nombre', $nombre);
$sentencia->bindParam(':donador_telefono1', $telefono1);
$sentencia->bindParam(':donador_telefono2', $telefono2);
$sentencia->bindParam(':donador_email', $email);
$sentencia->bindParam(':donador_codigoPostal', $codigoPostal);
$sentencia->bindParam(':donador_provincia', $provincia);
$sentencia->bindParam(':donador_localidad', $localidad);
$sentencia->bindParam(':donador_direccion', $direccion);
$sentencia->bindParam(':donador_tarjetaTipo', $tarjetaTipo);
$sentencia->bindParam(':donador_tarjetaNumero', $tarjetaNumero);
$sentencia->bindParam(':donador_tarjetaVencimiento', $tarjetaVencimiento);
$sentencia->bindParam(':donador_importe', $importe);
$sentencia->bindParam(':donador_observaciones', $observaciones);
$sentencia->bindParam(':donador_activo', $donadorActivo);
$sentencia->bindParam(':donador_usuario', $usuario);
$sentencia->bindParam(':donador_inicio', $donadorInicio);

if($sentencia->execute()){
 echo json_encode(true);
}