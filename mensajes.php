<?php

    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    if (isset($_POST['option'])){
        $id = $_POST['id'];
        $sms = $_POST['sms'];
        $user = $_POST['user'];

        $mensaje = mysqli_query($connect,"INSERT INTO mensajes (id_amigo,mensaje,usuario,grupo) VALUES ('$id','$sms','$user','')");
        echo 'mensajeGuarado';
    }
?>