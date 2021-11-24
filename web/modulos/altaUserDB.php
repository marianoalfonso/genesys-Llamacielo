<?php
include('connDB.php'); 


$perfil = $_POST['usuario_tipo'];
$nombre = $_POST['usuario_nombre'];
$dni = $_POST['usuario_dni'];
$pass = $_POST['usuario_password'];
$fechaInicio = $_POST['usuario_fechaInicio'];
$estado = $_POST['usuario_estado'];
$email = $_POST['usuario_email'];

$sentencia=$conPDO->prepare("INSERT INTO usuarios (usuario_tipo, usuario_nombre, usuario_dni, usuario_password, usuario_fechaInicio, usuario_activo, usuario_email) VALUES (:usuario_tipo, :usuario_nombre, :usuario_dni, :usuario_password, :usuario_fechaInicio, :usuario_activo, :usuario_email)");

$sentencia->bindParam(':usuario_tipo', $perfil);
$sentencia->bindParam(':usuario_nombre', $nombre);
$sentencia->bindParam(':usuario_dni', $dni);
$sentencia->bindParam(':usuario_password', $pass);
$sentencia->bindParam(':usuario_fechaInicio', $fechaInicio);
$sentencia->bindParam(':usuario_activo', $estado);
$sentencia->bindParam(':usuario_email', $email);


if($sentencia->execute()){
 echo json_encode(true);
}