<?php
include('connDB.php'); 

$consulta = "SELECT * FROM donadores INNER JOIN usuarios ON donadores.donador_usuario = usuarios.usuario_id";

$resultado = $conPDO->prepare($consulta);
$resultado->execute();
$liquidaciones = $resultado->fetchAll(PDO::FETCH_ASSOC);

if($liquidaciones >= 1){
 echo json_encode($liquidaciones);
}else{
echo json_encode('false');
}