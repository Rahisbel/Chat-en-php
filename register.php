<?php
    session_start();
    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    if(isset($_POST['name'])){
        $name = $_POST['name'];
        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];
        $date = $_POST['date'];
        $sex = $_POST['sex'];

        $validationUser = mysqli_num_rows(mysqli_query($connect,"SELECT usuario FROM usuarios WHERE usuario = '$username'"));
        $validationEmail = mysqli_num_rows(mysqli_query($connect,"SELECT correo FROM usuarios WHERE correo = '$email'"));

        if($validationUser > 0){
            echo "userRepeat";
        }else{
            if($validationEmail > 0){
                echo "emailRepeat";
            }else{
                $insertar = mysqli_query($connect,"INSERT INTO usuarios (nombre,usuario,clave,correo,fecha,sexo,estado,administrador) VALUES ('$name','$username','$password','$email','$date','$sex',0,0)");
                if($insertar) echo "newUser";
            }
        }
    }
?>