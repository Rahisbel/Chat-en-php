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
            case "crear":
                $name = $_POST['name'];
                $user = $_POST['user'];
                crearGrupo($connect,$name,$user);
                break;
            case "agregar":
                $name = $_POST['name'];
                $user = $_POST['user'];
                $nameGrupo = $_POST['grupo'];
                agregarUsuario($connect,$nameGrupo,$name,$user);
                break;
            case "verificarLista":
                $user = $_POST['user'];
                verificarLista($connect,$user);
                break;
            case "listarGrupos":
                $user = $_POST['user'];
                listarGrupos($connect,$user);
                break;
            default:
                throw new \Exception('Unexpected value');
                break;
        }
    }

    function crearGrupo($connect,$name,$user){
        $validarGrupo = mysqli_num_rows(mysqli_query($connect,"SELECT nombre FROM grupos WHERE nombre = '$name'"));

        if($validarGrupo > 0){
            echo "grupoRepeat";
        }else{
            $crearGrupo = mysqli_query($connect,"INSERT INTO grupos (nombre,usuario) VALUES ('$name','$user')");
            if($crearGrupo) echo "grupoCreado";
        }
    }

    function verificarLista($connect,$user){
        $validar = mysqli_num_rows(mysqli_query($connect,"SELECT usuario FROM grupos WHERE usuario = '$user'"));

        if ($validar > 0){
            echo "siGrupos";
        }else{
            echo "noGrupos";
        }
    }

    function listarGrupos($connect,$user){
        $resultado = mysqli_query($connect,"SELECT * FROM grupos WHERE usuario = '$user'");

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

    function agregarUsuario($connect,$nameGrupo,$name,$user){
        $validar = mysqli_num_rows(mysqli_query($connect,"SELECT * FROM grupos WHERE nombre = '$nameGrupo' AND usuario = '$name'"));

        if ($validar > 0){
            echo 'existe';
        }else{
            $validarUser = mysqli_num_rows(mysqli_query($connect,"SELECT usuario FROM usuarios WHERE usuario = '$name'"));
            $validarAmigoL = mysqli_num_rows(mysqli_query($connect,"SELECT de, para FROM amigos WHERE de = '$name' AND para = '$user'"));
            $validarAmigoR = mysqli_num_rows(mysqli_query($connect,"SELECT de, para FROM amigos WHERE de = '$user' AND para = '$name'"));
            if ($validarUser > 0 && ($validarAmigoL > 0 || $validarAmigoR > 0)){
                mysqli_query($connect,"INSERT INTO grupos (nombre,usuario) VALUES ('$nameGrupo','$name')");
                echo 'guardado';
            }else{
                echo 'noGuardar';
            }
        }
    }
?>