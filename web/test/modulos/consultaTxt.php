<?php
include('connDB.php'); 

$consulta = "SELECT * FROM procesostarjetas";
$resultado = $conPDO->prepare($consulta);
$resultado->execute();
$procesos = $resultado->fetchAll(PDO::FETCH_ASSOC);

if($procesos >= 1){
 echo json_encode($procesos);
}else{
 echo json_encode('false');
}