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
                <div class="user__state">Conectado</div>
                <input type="hidden" class="user-name" name="" value="<?php echo $_SESSION["usuario"]; ?>">
            </div>
            <div class="header__user--icon icon-user-solid-circle"></div>
        </div>
    </header>
    <section class="container">
        <article class="container__list">
            <div class="container__list--solicitud">
                <h2>Solicitudes de Amistad</h2>
                <ul class="scroll" id="scrollSolicitudes">
                    <!--
                    <li>User 1 <span class="icon-add-solid add-user"></span></li>
                    <li>User 2 <span class="icon-add-solid add-user"></span></li>
                    <li>User 3 <span class="icon-add-solid add-user"></span></li>
                    <li>User 4 <span class="icon-add-solid add-user"></span></li>
                    -->
                </ul>
                <button type="button" class="btn">Aceptar Solicitudes</button>
            </div>
            <div class="container__list--amigos">
                <h2>Lista de Amigos</h2>
                <ul class="scroll" id="scrollAmigos">
                    <li><span><span class="state-connected"></span> User 1</span> <span class="icon-trash trash-user"></span></li>
                    <li><span><span class="state-disconnected"></span> User 2</span> <span class="icon-trash trash-user"></span></li>
                    <li><span><span class="state-disconnected"></span> User 3</span> <span class="icon-trash trash-user"></span></li>
                    <li><span><span class="state-disconnected"></span> User 4</span> <span class="icon-trash trash-user"></span></li>
                </ul>
                <button type="button" class="btn" id="btn-add">Agregar Contacto</button>
            </div>
        </article>
        <article class="container__chat">
            <div class="container__chat--solo">
                <h2>Chat con <span>User 1</span></h2>
                <ul>
                    <li class="right">Message 1 <span class="icon-user-solid-circle"></span></li>
                    <li class="left"><span class="icon-user-solid-circle"></span> Message 2</li>
                    <li class="right">Message 1 <span class="icon-user-solid-circle"></span></li>
                    <li class="left"> <span class="icon-user-solid-circle"></span> Message 2</li>
                    <li class="right">Message 1 <span class="icon-user-solid-circle"></span></li>
                    <li class="left"><span class="icon-user-solid-circle"></span> Message 2</li>
                    <li class="right">Message 1 <span class="icon-user-solid-circle"></span></li>
                    <li class="left"><span class="icon-user-solid-circle"></span> Message 2</li>
                </ul>
                <div class="chat--text">
                    <input type="text" name="txt" id="txt" placeholder="Ingrese un Mensaje">
                    <span><i class="icon-send"></i></span>
                </div>
            </div>
            <div class="container__chat--group">
                <h2>Group</h2>
                <ul>
                    <li>Message 1</li>
                    <li>Message 2</li>
                    <li>Message 1</li>
                    <li>Message 2</li>
                </ul>
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