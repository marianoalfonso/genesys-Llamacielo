<?php
include('connDB.php'); 

$consulta = "SELECT * FROM usuarios INNER JOIN usuario_tipo ON usuarios.usuario_tipo = usuario_tipo.tipo_id";

$resultado = $conPDO->prepare($consulta);
$resultado->execute();
$usuarios = $resultado->fetchAll(PDO::FETCH_ASSOC);

if($usuarios >= 1){
 echo json_encode($usuarios);
}else{
echo json_encode('false');
}