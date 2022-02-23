<?php
include('connDB.php'); 

$datos = json_decode($_POST['datos'], true);

if($datos){
 echo json_encode(true);
};

foreach($datos as $row){
$cabecera_proceso = $row['cabecera'];
$detalle_proceso = $row['detalle'];
$pie_proceso = $row['pie'];

$sentencia=$conPDO->prepare("INSERT INTO procesostarjetas (cabecera_proceso, detalle_proceso, pie_proceso) VALUES (:cabecera_proceso, :detalle_proceso, :pie_proceso)");

$sentencia->execute([':cabecera_proceso' => $cabecera_proceso,
                     ':detalle_proceso' => $detalle_proceso,
                     ':pie_proceso' => $pie_proceso
                    ]);
}

/*if($sentencia->execute()){
 echo json_encode(true);
}*/

