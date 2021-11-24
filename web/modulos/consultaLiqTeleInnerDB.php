<?php
include('connDB.php'); 

$consulta = "SELECT * FROM donadores";

$resultado = $conPDO->prepare($consulta);
$resultado->execute();
$liquidaciones = $resultado->fetchAll(PDO::FETCH_ASSOC);

if($liquidaciones >= 1){
 echo json_encode($liquidaciones);
}else{
echo json_encode('false');
}