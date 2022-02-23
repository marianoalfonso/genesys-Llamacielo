<?php
include('connDB.php'); 

$id_tarjeta = json_decode($_POST['idTarjeta'], true);

if(!($conPDO->query("CALL generarPresentacion($id_tarjeta)"))) {
  echo json_encode('Error en el llamado al procedimiento "generarPresentacion"');
 } else {
    // llamo al procedimiento "verPresentacionActual"
    // echo json_encode('No hubo inconvenientes en el llamado al procedimiento "generarPresentacion"');
    
    /*if(!($resultado = $conPDO->query("CALL verPresentacionGenerada()"))) {
      echo json_encode('Error en el llamado al procedimiento "verPresentacionActual"');
   } else {
      //echo json_encode('No hubo inconvenientes en el llamado al procedimiento "verPresentacionGenerada"');
    }*/
      $sql = 'CALL verPresentacionGenerada()';
      $stmt=$conPDO->prepare($sql);
      $stmt->bindParam(':ID_liq', $ID_liq, PDO::PARAM_STR);
      $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
      $stmt->bindParam(':dni', $dni, PDO::PARAM_STR);
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
   
 }
 
