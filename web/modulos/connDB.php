<?php

$servidor = "mysql:dbname=llamacielo;host=localhost";

try{

  // CONEXION A LA BASE DE DATOS
   $conPDO = new PDO($servidor,'root','',array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
   //echo ("<script>alert('se conecto a base de datos...')</script>");
  

}catch(PDOException $error){
  //echo ("<script>alert('error...')</script>");
  
}