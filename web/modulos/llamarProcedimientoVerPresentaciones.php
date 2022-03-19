<?php
include('connDB.php'); 

$id_tarjeta = ($_POST['idTarjeta']);
$id_ong = ($_POST['idOng']);

$sql = "CALL verPresentaciones($id_tarjeta,$id_ong)";
      $stmt=$conPDO->prepare($sql);
      $stmt->bindParam(':ID_liq', $ID_liq, PDO::PARAM_STR);
      $stmt->bindParam(':ong', $ong, PDO::PARAM_STR);
      $stmt->bindParam(':tarjeta', $tarjeta, PDO::PARAM_STR);
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