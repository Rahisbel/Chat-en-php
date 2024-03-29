<?php
	session_start();

	error_reporting(E_ALL);
    ini_set('display_errors', '1');


	 if(isset($_SESSION["administrador"])){
        if($_SESSION["administrador"]==1){
            header("location:administrador.php");
        }else if($_SESSION["administrador"]==0) {
            header("location:usuario.php");
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <!-- Estilos del algunos iconos que se van usar en el Proyecto-->
    <link rel="stylesheet" href="css/icomoon/style.css">
    <!-- Estilos para el funcionamiento visual de la libreria para los modals-->
    <link rel="stylesheet" href="css/sweetalert2.css">
    <!-- Estilos generales del Proyecto-->
    <link rel="stylesheet" href="css/style.css">
    <!-- Titulo del Proyecto -->
    <title>Chat - Programacion II</title>
</head>
<body>
    <!-- Cabecera del chat -->
    <header class="header"></header>
    <!-- Contenedor del chat -->
    <section class="container">
        <!-- Contenedor de los caracteristicas y titulo del Proyecto -->
        <div class="container__title">
            <div class="container__wrapper">
                <h2 class="container__title--subtitle">Hola, Bienvenido al Chat UNET</h2>
                <p class="container__title--despcription">Social Chat para la Asignatura de Programacion II</p>
                <p class="container__title--members">Realizado por:</p>
                <ol class="class__title--list">
                    <li>Rahisbel Herrera</li>
                    <li>Jesus Chacon</li>
                </ol>
            </div>
        </div>
        <!-- Contenedor del Formulario -->
        <div class="container__form">
            <div class="form__wrapper">
                <!-- Selecion de tabs del formulario -->
                <ul class="container__form__list" id="list">
                    <li class="form__list active">Iniciar Sesión</li>
                    <li class="form__list">Registrarse</li>
                </ul>
                <!-- Formulario General -->
                <div class="form">
                   <!-- Contenedor del Formulario de Inicio de Session -->
                    <form action="" method="POST">
                        <!-- Contenedor del Login -->
                        <div class="form__user active">
                            <h2>Iniciar Sesión</h2>
                            <div class="form__user--wrapper">
                                <input type="text" class="input username" name="user" id="user-login" placeholder="Usuario" required="required">
                                <input type="password" class="input password" name="pass" id="pass-login" placeholder="Contrasena" required="required">
                                <button type="submit" class="input submit" name="login" id="btn-login">Iniciar Sesion</button>
                            </div>
                        </div>
                        <?php
                            if(isset($_POST["login"])){
                                if ((isset($_POST["user"]) && $_POST["user"]!= null) && (isset($_POST["pass"]) && $_POST["pass"] != null)) {
                                    include("conexionBD.php");
                                    $conectar = new Conexion();
                                    $conectar->EstablecerConexion();
                                    $query = "select * from usuarios where usuario='".$_POST["user"]."'";
                                    $resultado = $conectar->getConexion()->query($query);

                                    $_SESSION["usuario"] = $_POST["user"];

                                    if($resultado->num_rows>0){
                                        $fila = mysqli_fetch_array($resultado,MYSQLI_ASSOC);
                                        if ($fila["clave"] == $_POST["pass"]) {
                                            $_SESSION=$fila;

                                            if($_SESSION["administrador"]==1){
                                                header("location:administrador.php");
                                            }else if($_SESSION["administrador"]==0) {
                                                $user = $_POST['user'];
                                                $validar = mysqli_query($conectar->getConexion(),"UPDATE usuarios SET estado = 1 WHERE usuario = '$user'");
                                                header("location:usuario.php");
                                            }
                                        }
                                        else{
                                            echo "Datos invalidos";
                                        }
                                    }
                                    else{
                                        echo "Usuario no registrado";
                                    }

                                }
                                else{
                                    echo "Campos vacios";
                                }
                            }
                        ?>
                    </form>
                    <form action="" method="POST" id="registro">
                        <!-- Contenedor del Formulario de Registro -->
                        <div class="form__user">
                            <h2>Registro</h2>
                            <!-- Inputs de, Nombre, Usuario, Password y Email -->
                            <div class="form__user--wrapper">
                                <input type="text" class="input name" name="name" id="name" placeholder="Nombre Completo">
                                <input type="text" class="input username" name="username" id="user" placeholder="Usuario">
                                <input type="password" class="input password" name="password" id="pass" placeholder="Contraseña">
                                <input type="email" class="input email" name="email" id="email" placeholder="Correo">
                                <!-- Radio Button de Fecha de Nacimiento -->
                                <label for="" class="date">Fecha de Nacimiento:</label>
                                <div class="fecha">
                                    <select name="dias" id="dias">
                                        <option value="Dias" disabled selected>Dias</option>
                                        <!-- La lista se genera con JavaScript en el Archivo app.js-->
                                    </select>
                                    <select name="mes" id="mes">
                                        <option value="Mes" disabled selected>Mes</option>
                                        <!-- La lista se genera con JavaScript en el Archivo app.js-->
                                    </select>
                                    <select name="age" id="age">
                                        <option value="Año" disabled selected>Age</option>
                                        <!-- La lista se genera con JavaScript en el Archivo app.js-->
                                    </select>
                                </div>
                                <!-- Radio Buttons de Sexo -->
                                <label for="men" class="radio">
                                    Sexo:
                                    <input type="radio" name="sex" value="H" id="men">
                                    Hombre
                                </label>
                                <label for="woman">
                                    <input type="radio" name="sex" value="M" id="woman">
                                    Mujer
                                </label>
                                <input type="submit" id="btn-register" value="Registrarme" name="register" class="input submit">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
    <!-- Libreria polyfill para ES6 Promisas (opcional) para IE11 -->
    <script src="js/polyfill.min.js"></script>
    <!-- Libreria de JavasScript para mostrar algun modal modal -->
    <script src="js/sweetalert2.js"></script>
    <!-- Libreria de jQuery para el uso de Ajax, eventos, etc -->
    <script src="js/jquery-3.4.1.min.js"></script>
    <!-- Archivo donde ira el codigo de js del Proyecto-->
    <script src="js/app.js"></script>
    <!-- Archivo que valida y registra un usuario -->
    <script src="js/register.js"></script>
</body>
</html>