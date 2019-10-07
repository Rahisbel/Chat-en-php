<?php
    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    if (isset($_POST['user'])){
        $user = $_POST['user'];

        $resultado = mysqli_query($connect,"SELECT * FROM usuarios WHERE usuario = '$user'");

        if(!$resultado){
            die('Error');
        }else{
            while($data = mysqli_fetch_assoc($resultado)){
                $arreglo['data'][] = $data;
            }
            echo json_encode($arreglo);
        }
        mysqli_free_result($resultado);
        mysqli_close($connect);
    }

?>