<?php
include('connDB.php'); 

$codigPostal = $_POST['donador_codigoPostal'];

$sentenciaSQL=$conPDO->prepare("SELECT * FROM codigosPostales WHERE codigo_postal=:donador_codigoPostal");
$sentenciaSQL->bindParam(":donador_codigoPostal",$codigPostal,PDO::PARAM_STR);
$sentenciaSQL->execute();

$registro = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);

$numRegistros = $sentenciaSQL->rowCount();

if($numRegistros >= 1){
  echo json_encode($registro);
} else {
 echo json_encode(false);
};
