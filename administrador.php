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
    <link rel="stylesheet" href="css/admin.css">
</head>
<body>
    <!-- Cabecera del administrador -->
    <header class="header">
        <div class="header__admin">
            <h2>Administrador</h2>
            <a href="cerrar.php">Cerrar Secion</a>
        </div>
    </header>
    <!-- Contenedor del panel -->
    <section class="container">
        <div class="container__panel">
            <h3>Panel Administrador</h3>
            <ul>
                <li class="opcion" data-option="all">Listar usuarios</li>
                <li class="opcion" data-option="H">Listar usuarios (Hombres)</li>
                <li class="opcion" data-option="M">Listar usuarios (Mujeres)</li>
                <li class="opcion" data-option="alf">Listar usuarios Alfabeticamente</li>
            </ul>
        </div>
        <div class="container__list">
            <h2 class="container__list--title">Listado de usuarios</h2>
            <ul class="container__list--users" id="list-user"></ul>
        </div>
        <div class="container__info">
            <div class="container__info--user">
                <div class="user-img"><i class="icon-user-solid-circle"></i></div>
                <div class="user-info">
                    <h3 class="title" id="full-name"></h3>
                    <p class="name"><strong>Usuario:</strong><span id="name-user"></span></p>
                    <p class="email"><i class="icon-envelope"></i><strong>Email:</strong><span id="email"></span></p>
                    <p class="date"><i class="icon-gift"></i><strong>Fecha de Nacimiento:</strong><span id="date"></span></p>
                    <p class="contact"><i class="icon-star-full"></i><strong>Contacto:</strong><span id="contact"></span></p>
                </div>
            </div>
            <div class="container__info--sms">
                <ul id="mensajesList"></ul>
            </div>
        </div>
	</section>
    <!-- Libreria polyfill para ES6 Promisas (opcional) para IE11 -->
    <script src="js/polyfill.min.js"></script>
    <!-- Libreria de JavasScript para mostrar algun modal modal -->
    <script src="js/sweetalert2.js"></script>
    <!-- Libreria de jQuery para el uso de Ajax, eventos, etc -->
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/admin.js"></script>
</body>
</html>