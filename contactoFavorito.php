<?php
    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    if (isset($_POST['option'])){
        $option = $_POST['option'];
        $id = $_POST['identifiacion'];

        switch ($option){
            case 'amigos':
                tablaAmigos($connect,$id);
                break;
            case 'mensajes':
                contarMensajes($connect,$id);
                break;
            case 'listarMensajes':
                listarMensajes($connect,$id);
                break;
            case 'borrarMensajes':
                borarMensaje($connect,$id);
                break;
            case 'borrarUsuario':
                $user = $_POST['user'];
                borrarUsuario($connect,$id,$user);
                break;
            default:
                throw new \Exception('Unexpected value');
                break;
        }
    }

    function tablaAmigos($connect,$id){
        $resultado = mysqli_num_rows(mysqli_query($connect,"SELECT * FROM amigos WHERE (de = '$id' OR para = '$id') AND estado = 0"));

        if(!$resultado){
            echo 'error';
        }else{
            $response = mysqli_query($connect,"SELECT * FROM amigos WHERE (de = '$id' OR para = '$id') AND estado = 0");
            while($data = mysqli_fetch_assoc($response)){
                $arreglo['data'][] = $data;
            }
            echo json_encode($arreglo);
        }
    }

    function contarMensajes($connect,$id){
        $resultado = mysqli_num_rows(mysqli_query($connect,"SELECT * FROM mensajes WHERE id_amigo = '$id'"));

        if(!$resultado){
            echo "error";
        }else{
            $resultado = mysqli_query($connect,"SELECT * FROM mensajes WHERE id_amigo = '$id'");
            while($data = mysqli_fetch_assoc($resultado)){
                $arreglo['data'][] = $data;
            }
            echo json_encode($arreglo);
        }
    }

    function listarMensajes($connect,$id){
        $resultado = mysqli_num_rows($resultado = mysqli_query($connect,"SELECT * FROM mensajes WHERE usuario = '$id'"));

        if(!$resultado){
            echo "error";
        }else{
            $resultado = mysqli_query($connect,"SELECT * FROM mensajes WHERE usuario = '$id'");
            while($data = mysqli_fetch_assoc($resultado)){
                $arreglo['data'][] = $data;
            }
            echo json_encode($arreglo);
        }
    }

    function borarMensaje($connect,$id){
        $eliminar = mysqli_num_rows(mysqli_query($connect, "SELECT * FROM mensajes WHERE id = '$id'"));
        if($eliminar > 0){
            mysqli_query($connect,"DELETE FROM mensajes WHERE id = '$id'");
            echo "eliminar";
        }

        if($eliminar == 0) echo "noEliminado";
    }

    function borrarUsuario($connect,$id,$user){
        $eliminar = mysqli_num_rows(mysqli_query($connect, "SELECT * FROM usuarios WHERE id = '$id'"));
        if($eliminar > 0){
            mysqli_query($connect,"DELETE FROM usuarios WHERE id = '$id'");
            mysqli_query($connect,"DELETE FROM mensajes WHERE usuario = '$user'");
            mysqli_query($connect,"DELETE FROM grupos WHERE usuario = '$user'");
            mysqli_query($connect,"DELETE FROM amigos WHERE de = '$user' OR para = '$user'");
            echo "eliminar";
        }

        if($eliminar == 0) echo "noEliminado";
    }
?>