<?php
include('connDB.php'); 


$sentenciaSQL=$conPDO->prepare("SELECT * FROM ongs");
//$sentenciaSQL=$conPDO->prepare("SELECT * FROM ongs  WHERE ong_activa = '1'");
//$sentenciaSQL->bindParam("donador_dni",$dni,PDO::PARAM_STR);

$sentenciaSQL->execute();

$registro = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

$numRegistros = $sentenciaSQL->rowCount();

if($numRegistros >= 1){
  echo json_encode($registro);
} else {
 echo json_encode(false);
};