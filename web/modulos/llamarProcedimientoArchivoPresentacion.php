<?php
include('connDB.php'); 

$presentacion_id = json_decode($_POST['idLiquidacion'], true);

if(!($conPDO->query("CALL generarArchivoPresentacion($presentacion_id)"))) {
  echo json_encode('Error en el llamado al procedimiento "generarArchivoPresentacion"');
 } else {
    //echo json_encode("Se llamo con exito al procedimiento");
    $sentenciaSQL=$conPDO->prepare("SELECT * FROM archivospresentaciones WHERE presentacion_id=:presentacion_id");
    $sentenciaSQL->bindParam("presentacion_id", $presentacion_id,PDO::PARAM_STR);
    
    $sentenciaSQL->execute();
    $datos = $sentenciaSQL->fetchAll(PDO::FETCH_ASSOC);
    $numRegistros = $sentenciaSQL->rowCount();

if($numRegistros > 0){
  echo json_encode($datos);
} else {
 echo json_encode('No hay datos');
};

 }

 