<?php

$servidor = "mysql:dbname=id17974059_llamacielo;host=localhost";

try{

  // CONEXION A LA BASE DE DATOS
   $conPDO = new PDO($servidor,'id17974059_llamacielovuorix','8HXmM@NcfQ@C1v$N',array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
   //echo ("<script>alert('se conecto a base de datos...')</script>");
  

}catch(PDOException $error){
  //echo ("<script>alert('error...')</script>");
  
}