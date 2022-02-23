<?php
include('connDB.php'); 

$dni = $_POST['donador_dni'];


$sentenciaSQL=$conPDO->prepare("SELECT * FROM donadores WHERE donador_dni=:donador_dni");
$sentenciaSQL->bindParam("donador_dni",$dni,PDO::PARAM_STR);

$sentenciaSQL->execute();

$registro = $sentenciaSQL->fetch(PDO::FETCH_ASSOC);

$numRegistros = $sentenciaSQL->rowCount();

if($numRegistros >= 1){
  echo json_encode($registro);
} else {
 echo json_encode(false);
};