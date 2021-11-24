<?php
include('connDB.php'); 

$consulta = "SELECT * FROM tarjetas WHERE tarjeta_enabled = 0";
$resultado = $conPDO->prepare($consulta);
$resultado->execute();
$tarjetas = $resultado->fetchAll(PDO::FETCH_ASSOC);

if($tarjetas >= 1){
 echo json_encode($tarjetas);
}else{
 echo json_encode('false');
}