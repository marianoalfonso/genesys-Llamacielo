
<?php
// variables declaración


  error_reporting(0); // elimina errores del codigo php
  // verificar campos vacios
  // $post = (isset($_POST['nombre']) && !empty($_POST['nombre'])) &&
  // (isset($_POST['entidad']) && !empty($_POST['entidad'])) &&
  // (isset($_POST['email']) && !empty($_POST['email'])) &&
  // (isset($_POST['telefono']) && !empty($_POST['telefono'])) &&
  // (isset($_POST['webred']) && !empty($_POST['webred'])) &&
  // (isset($_POST['asunto']) && !empty($_POST['asunto'])) &&
  // (isset($_POST['mensaje']) && !empty($_POST['mensaje']));

  $post = (isset($_POST['nombre'])) &&
  (isset($_POST['entidad'])) &&
  (isset($_POST['email']) && !empty($_POST['email'])) &&
  (isset($_POST['telefono'])) &&
  (isset($_POST['webred'])) &&
  (isset($_POST['asunto'])) &&
  (isset($_POST['mensaje']) && !empty($_POST['mensaje']));


  if ( $post ) {
    // $nombre = htmlspecialchars($_POST["nombre"]);
    $nombre = isset($_POST["nombre"]) ? htmlspecialchars($_POST["nombre"]) : false;
    // $entidad = htmlspecialchars($_POST["entidad"]);
    $entidad = isset($_POST["entidad"]) ? htmlspecialchars($_POST["entidad"]) : false;
    // $email = htmlspecialchars($_POST["email"]);
    $email = isset($_POST["email"]) ? htmlspecialchars($_POST["email"]) : false;
    // $telefono = htmlspecialchars($_POST["telefono"]);
    $telefono = isset($_POST["telefono"]) ? htmlspecialchars($_POST["telefono"]) : false;
    // $webred = htmlspecialchars($_POST["webred"]);
    $webred = isset($_POST["webred"]) ? htmlspecialchars($_POST["webred"]) : false;
    // $asunto = htmlspecialchars($_POST["asunto"]);
    $asunto = isset($_POST["asunto"]) ? htmlspecialchars($_POST["asunto"]) : false;
    // $mensaje = htmlspecialchars($_POST["mensaje"]);
    $mensaje = isset($_POST["mensaje"]) ? htmlspecialchars($_POST["mensaje"]) : false;

    // validar email
    function is_valid_email($str) {
      return (false !== filter_var($str, FILTER_VALIDATE_EMAIL));
  }

   if(is_valid_email($email)){
    $dominio = $_SERVER["HTTP_HOST"];
    $to = "test@llamacielo.com.ar"; // poner email de llama Cielo
    $subject = "Formulario contacto de la web $dominio";
    $message = "
    <p>Formulario de contacto de: <b>$dominio</b></p>
    <ul>
      <li>Nombre: <b>$nombre</b></li>
      <li>Entidad: <b>$entidad</b></li>
      <li>Email: <b>$email</b></li>
      <li>teléfono: <b>$telefono</b></li>
      <li>Página web o Red Social: <b>$webred</b></li>
      <li>Asunto: $asunto</li>
      <li>Mensaje: $mensaje</li>
    </ul>
    ";

    $headers = "MIME-Version: 1.0\r\n" . "Content-Type: text/html; charset=utf-8\r\n" .
  "From: $nombre  <no-reply@$dominio>";

  
    $send_mail = mail($to, $subject, $message, $headers);

    // esto se manda a la peticion fetch
    if($send_mail) {
      echo json_encode("ok");
    } else {
    echo json_encode("error");
    }


  //header('Access-Control-Allow-Origin: https://llamacielo.000webhostapp.com');
  header("Access-Control-Allow-Origin: *");
  header('Content-type:application/json');
  //echo json_encode($res);
  exit;
   } else {
    echo json_encode('invalidEmail');
   };


  } else {
    echo json_encode('vacios');
    exit;
  }

  