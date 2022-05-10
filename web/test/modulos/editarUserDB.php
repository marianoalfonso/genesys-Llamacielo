<?php
include_once('connDB.php');

// verifico si recibo los datos
$id = $_POST['usuario_id'];
$perfil = $_POST['usuario_tipo'];
$nombre = $_POST['usuario_nombre'];
$dni = $_POST['usuario_dni'];
$pass = $_POST['usuario_password'];
$estado = $_POST['usuario_estado'];
$email = $_POST['usuario_email'];

$sql = "UPDATE usuarios SET usuario_tipo = :usuario_tipo, usuario_nombre = :usuario_nombre, usuario_dni = :usuario_dni, usuario_password = :usuario_password, usuario_activo = :usuario_activo, usuario_email = :usuario_email WHERE usuario_id = :usuario_id";

$stmt = $conPDO->prepare($sql);
$stmt->bindParam(":usuario_id",$id);
$stmt->bindParam(":usuario_tipo",$perfil);
$stmt->bindParam(":usuario_nombre",$nombre);
$stmt->bindParam(":usuario_dni",$dni);
$stmt->bindParam(":usuario_password",$pass);
$stmt->bindParam(":usuario_activo",$estado);
$stmt->bindParam(":usuario_email",$email);

if($stmt->execute()){
 echo json_encode('exito');
}else {
 echo json_encode('error');
}

