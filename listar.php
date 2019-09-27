<?php
    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    if(isset($_POST['option'])){
        $option = $_POST['option'];
        switch ($option){
            case 'solicitud':
                listar($connect,1);
                break;
            case 'amigos':
                listar($connect,0);
                break;
            default:
                throw new \Exception('Unexpected value');
                break;
        }
    }

    function listar($connect,$estado){
        $resultado = mysqli_query($connect,"SELECT * FROM amigos WHERE estado = '$estado'");

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