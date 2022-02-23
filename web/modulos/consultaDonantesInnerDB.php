<?php
include('connDB.php'); 

$consulta = "SELECT * FROM donadores INNER JOIN ongs ON donadores.donador_ong = ongs.ong_id INNER JOIN tarjetas ON donadores.donador_tarjetaTipo = tarjetas.tarjeta_id";

$resultado = $conPDO->prepare($consulta);
$resultado->execute();
$donantes = $resultado->fetchAll(PDO::FETCH_ASSOC);

if($donantes >= 1){
 echo json_encode($donantes);
}else{
echo json_encode('false');
}