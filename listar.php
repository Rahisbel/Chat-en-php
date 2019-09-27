<?php
    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    $resultado = mysqli_query($connect,"SELECT * FROM amigos WHERE estado = 1");

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
?>