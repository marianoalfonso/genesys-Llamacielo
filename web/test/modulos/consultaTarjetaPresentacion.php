<?php
include('connDB.php'); 

$id_tarjeta = json_decode($_POST['idTarjeta'], true);

$consulta = "SELECT * FROM presentaciones WHERE liquidacion_donador_tarjetaTipo = $id_tarjeta";
$resultado = $conPDO->prepare($consulta);
$resultado->execute();
$presentaciones = $resultado->fetchAll(PDO::FETCH_ASSOC);

if($presentaciones >= 1){
 echo json_encode($presentaciones);
}else{
 echo json_encode("false");
}