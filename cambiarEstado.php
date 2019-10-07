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
        $option = $_POST['option'];

        switch ($option){
            case 'cambiar':
                cambiarEstado($user,$estado,$connect);
                break;
            case 'logout':
                cerrarSesion($user,$estado,$connect);
                break;
            default:
                throw new \Exception('Unexpected value');
                break;
        }

    }

    function cambiarEstado($user,$estado,$connect){
        $resultado = mysqli_query($connect,"UPDATE usuarios SET estado = $estado WHERE usuario = '$user'");

        echo "actualizado";
        //mysqli_free_result($resultado);
        mysqli_close($connect);
    }

    function cerrarSesion($user,$estado,$connect){
        $resultado = mysqli_query($connect,"UPDATE usuarios SET estado = 0 WHERE usuario = '$user'");;
        echo "cerrar";
        //mysqli_free_result($resultado);
        mysqli_close($connect);
    }
?>