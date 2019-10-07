<?php
	
	session_start();

	error_reporting(E_ALL);
    ini_set('display_errors', '1');


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
	<title>Usuarios</title>
	<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Estilos del algunos iconos que se van usar en el Proyecto-->
    <link rel="stylesheet" href="css/icomoon/style.css">
    <!-- Estilos para el funcionamiento visual de la libreria para los modals-->
    <link rel="stylesheet" href="css/sweetalert2.css">
    <!-- Estilos del chat-->
    <link rel="stylesheet" href="css/chat.css">
</head>
<body>
    <header class="header">
        <div class="header__user">
            <div class="header__user--info">
                <div class="user__name" ><?php echo $_SESSION["nombre"]; ?></div>
                <div class="user__state" id="user__state">Conectado</div>
                <input type="hidden" class="user-name" name="" value="<?php echo $_SESSION["usuario"]; ?>">
            </div>
            <div class="state_user">
                <ul>
                    <li class="state" data-state="1">Conectado</li>
                    <li class="state" data-state="2">Ausente</li>
                    <li class="state" data-state="3">Ocupado</li>
                    <li class="state" data-state="0">Desconectado</li>
                    <li id="logout">Cerrar Sesion</li>
                </ul>
            </div>
            <div class="header__user--icon icon-user-solid-circle"></div>
        </div>
    </header>
    <section class="container">
        <article class="container__list">
            <div class="container__list--solicitud">
                <h2>Solicitudes de Amistad</h2>
                <ul class="scroll" id="scrollSolicitudes"></ul>
                <button type="button" class="btn">Aceptar Solicitudes</button>
            </div>
            <div class="container__list--amigos">
                <h2>Lista de Amigos</h2>
                <ul class="scroll" id="scrollAmigos"></ul>
                <button type="button" class="btn" id="btn-add">Agregar Contacto</button>
            </div>
        </article>
        <article class="container__chat">
            <div class="container__chat--solo">
                <h2>Chat con <span id="chat__user">. . .</span></h2>
                <div class="container--mensajes">
                    <ul id="mensajes"></ul>
                </div>
                <div class="chat--text" id="chat--text">
                    <input type="text" name="txt" id="txt" placeholder="Ingrese un Mensaje">
                    <span><i class="icon-send"></i></span>
                </div>
            </div>
            <div class="container__chat--group">
                <div class="container__title__group">
                    <h2 id="opcion-title">Grupos</h2>
                    <h2 id="opcion-grupo" class="opcion-grupo"></h2>
                    <h2 id="add-user-grupo" class="icon-user-add icon"></h2>
                </div>
                <div class="container--grupos" id="listar-grupos">
                    <ul id="grupos"></ul>
                </div>
                <div id="container--inputs">
                    <button type="button"  class="btn" id="btn-group">Crear un Grupo</button>
                    <input type="text" class="input-grupo" name="txt-grupo" id="txt-grupo" placeholder="Ingrese un Mensaje">
                    <span><i class="icon-send icon" id="icon-grupo"></i></span>
                </div>
            </div>
        </article>
    </section>
    <!-- Libreria polyfill para ES6 Promisas (opcional) para IE11 -->
    <script src="js/polyfill.min.js"></script>
    <!-- Libreria de JavasScript para mostrar algun modal modal -->
    <script src="js/sweetalert2.js"></script>
    <!-- Libreria de jQuery para el uso de Ajax, eventos, etc -->
    <script src="js/jquery-3.4.1.min.js"></script>
    <script src="js/usuario.js"></script>
	</body>
</html>