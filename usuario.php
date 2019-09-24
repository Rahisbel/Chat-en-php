<?php
	
	session_start();

	if(isset($_SESSION["administrador"])){
        if($_SESSION["administrador"]==1){
            header("location:administrador.php");
        }
    }else{
        header("location:cerrar.php");
    }

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>

	<div>
		<h2>Usuario</h2>
		<h3> 
			<?php 
			echo "Usuario: ",$_SESSION["nombreusuario"]; 
			?>

		</h3>

	</div>

	<form action="cerrar.php">
		<input type="submit" name= "cerrar" value= "cerrar sesion">
	</form>
	
</body>
</html>