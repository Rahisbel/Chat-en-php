<?php

	session_start();
	
	if(isset($_SESSION["administrador"])){
        if($_SESSION["administrador"]==0){
            header("location:usuario.php");
        }
    }else{
        header("location:cerrar.php");
    }

	echo "Soy administrador";

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>

	<form action="cerrar.php">
		
		<input type="submit" name= "cerrar" value= "cerrar sesion">

	</form>
	
</body>