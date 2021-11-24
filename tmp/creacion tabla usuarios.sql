USE llamacielo;

CREATE TABLE llamacielo.usuarios (
  usuario_id tinyint(4) NOT NULL AUTO_INCREMENT,
  usuario_tipo tinyint(4) NOT NULL,
  usuario_nombre varchar(70) NOT NULL,
  usuario_dni int(11) NOT NULL,
  usuario_password varchar(20) NOT NULL,
  usuario_fechaInicio date NOT NULL,
  usuario_activo tinyint(1) NOT NULL,
  usuario_email varchar(50) DEFAULT 'NULL',
  PRIMARY KEY (usuario_id),
  CONSTRAINT FK_usuario_tipo FOREIGN KEY (usuario_tipo)
  REFERENCES llamacielo.usuario_tipo (tipo_id) ON DELETE RESTRICT ON UPDATE RESTRICT
)
ENGINE = INNODB
AUTO_INCREMENT = 5
AVG_ROW_LENGTH = 4096
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci
ROW_FORMAT = DYNAMIC;