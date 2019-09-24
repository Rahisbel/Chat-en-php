<?php

	session_start();

	error_reporting(E_ALL);
    ini_set('display_errors', '1');


	if(isset($_SESSION["administrador"])){
        if($_SESSION["administrador"]==0){
            header("location:usuario.php");
        }
    }else{
        header("location:cerrar.php");
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<title>Administradores</title>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Estilos del algunos iconos que se van usar en el Proyecto-->
    <link rel="stylesheet" href="css/icomoon/style.css">
    <!-- Estilos para el funcionamiento visual de la libreria para los modals-->
    <link rel="stylesheet" href="css/sweetalert2.css">
    <!-- Estilos generales del Proyecto-->
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
	    <!-- Cabecera del chat -->
    <header class="header"></header>
    <!-- Contenedor del chat -->
    <section class="container1">

		<div class="container__title">
            <div class="container__wrapper">
                <h2 class="container__title--subtitle">  Administrador </h2>
                <p class="container__title--despcription"><?php echo "Usuario: ",$_SESSION["nombreusuario"]; ?></p>
                <form action="" method="POST">
                	<input type="submit" name="Contactos" value="Contactos">
                </form>
            </div>

            	<?php
            		if (isset($_POST["Contactos"])) {
            			include("conexionBD.php");
						$conec = new Conexion();
						$conec->EstablecerConexion();
						$query = "select * from Contactos order by usuarioagregar";
						$resultado = $conec->getConexion()->query($query);

						while ($contacto=$resultado->fetch_assoc()){
               	    		echo $contacto["usuarioagregar"]," ";
            			
            			}
            		
            		}

            	?>

             <form action="cerrar.php">
				<input type="submit" class="input submit" name= "cerrar" value= "Cerrar Sesión">
			</form>
        </div>

	</section>

</body>
</html>