<?php
include('connDB.php'); 

$id_liquidacion = json_decode($_POST['idLiquidacion'], true);

$sql = "CALL eliminarArchivoPresentacion($id_liquidacion)";
      $stmt=$conPDO->prepare($sql);
      $stmt->execute();
      $stmt->setFetchMode(PDO::FETCH_ASSOC);
      $datos = $stmt->fetchAll();
      $num= $stmt->rowCount();

   if($num > 0) {
      echo json_encode($datos);
   } ;