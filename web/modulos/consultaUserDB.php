<?php
include('connDB.php'); 

$dni = $_POST['dni'];
$pass = $_POST['pass'];



$sentenciaSQL=$conPDO->prepare("SELECT * FROM usuarios WHERE usuario_dni=:usuario_dni AND usuario_password=:usuario_password");
$sentenciaSQL->bindParam(":usuario_dni",$dni,PDO::PARAM_STR);
$sentenciaSQL->bindParam(":usuario_password",$pass,PDO::PARAM_STR);
$sentenciaSQL->execute();

$registro = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

$numRegistros = $sentenciaSQL->rowCount();

if($numRegistros >= 1){
  echo json_encode($registro);
} else {
 echo json_encode(false);
};