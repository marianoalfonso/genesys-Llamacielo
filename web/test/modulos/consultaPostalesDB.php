<?php
include('connDB.php'); 


$consulta = "SELECT * FROM codigospostales";
$resultado = $conPDO->prepare($consulta);
$resultado->execute();
$codigos = $resultado->fetchAll(PDO::FETCH_ASSOC);

if($codigos >= 1){
 echo json_encode($codigos);
}else{
 echo json_encode('false');
}