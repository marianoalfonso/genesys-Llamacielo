<?php
include('connDB.php'); 

$id_liquidacion = json_decode($_POST['idLiquidacion'], true);

$sql = "CALL verPresentacionDetalle($id_liquidacion)";
      $stmt=$conPDO->prepare($sql);
      $stmt->bindParam(':ID_liq', $ID_liq, PDO::PARAM_STR);
      $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
      $stmt->bindParam(':dni', $dni, PDO::PARAM_STR);
      $stmt->bindParam(':tarjeta', $tarjeta, PDO::PARAM_STR);
      $stmt->bindParam(':tarjetaNro', $tarjetaNro, PDO::PARAM_STR);
      $stmt->bindParam(':importe', $importe, PDO::PARAM_STR);
      $stmt->bindParam(':desde', $desde, PDO::PARAM_STR);
      $stmt->bindParam(':hasta', $hasta, PDO::PARAM_STR);
      $stmt->execute();
      $stmt->setFetchMode(PDO::FETCH_ASSOC);
      $datos = $stmt->fetchAll();
      $num= $stmt->rowCount();

   if($num > 0) {
      echo json_encode($datos);
   } else {
      echo json_encode("No hay datos para mostar");
   }