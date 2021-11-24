<?php
include('connDB.php');

// verifico si recibo los datos

$id = $_POST['usuario_id'];
$perfil = $_POST['usuario_tipo'];
$nombre = $_POST['usuario_nombre'];
$dni = $_POST['usuario_dni'];
$pass = $_POST['usuario_password'];
$estado = $_POST['usuario_estado'];
$email = $_POST['usuario_email'];

// preparo la sentencia
$sentenciaSQL=$conPDO->prepare("UPDATE usuarios SET usuario_tipo = :usuario_tipo, usuario_nombre = :usuario_nombre, usuario_dni = :usuario_dni, usuario_password = :usuario_password, usuario_estado = :usuario_estado, usuario_email = :usuario_email WHERE usuario_id = :usuario_id");

// modifico las variables
$sentenciaSQL->bindParam(":usuario_id",$id,PDO::PARAM_STR);
$sentenciaSQL->bindParam(":usuario_tipo",$perfil,PDO::PARAM_STR);
$sentenciaSQL->bindParam(":usuario_nombre",$nombre,PDO::PARAM_STR);
$sentenciaSQL->bindParam(":usuario_dni",$dni,PDO::PARAM_STR);
$sentenciaSQL->bindParam(":usuario_password",$pass,PDO::PARAM_STR);
$sentenciaSQL->bindParam(":usuario_estado",$estado,PDO::PARAM_STR);
$sentenciaSQL->bindParam(":usuario_email",$email,PDO::PARAM_STR);
$sentenciaSQL->execute();


//$usuarios = $resultado->fetchAll(PDO::FETCH_ASSOC);
//$usuarios = $resultado->fetchAll(PDO::FETCH_ASSOC);

//$numRegistros = $sentenciaSQL->rowCount();

if($sentenciaSQL->execute()){
echo json_encode('true');
} else {
  return json_encode('false');
}
/*if($usuarios >= 1){
  echo json_encode($usuarios);
} else {
 echo json_encode(false);
};*/