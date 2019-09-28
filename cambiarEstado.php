<?php
    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    if (isset($_POST['user'])){
        $user = $_POST['user'];
        $estado = $_POST['state'];

        $resultado = mysqli_query($connect,"UPDATE usuarios SET estado = $estado WHERE usuario = '$user'");

        echo "actualizad";
        mysqli_free_result($resultado);
        mysqli_close($connect);
    }
?>