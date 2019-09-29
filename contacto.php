<?php
    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    if(isset($_POST['option'])){
        $de = $_POST['de'];
        $para = $_POST['para'];
        $option = $_POST['option'];
        switch($option){
            case 'agregar':
                agregarContacto($de,$para,$connect);
                break;
            case 'aceptar':
                aceptarSolicitud($de,$para,$connect);
                break;
            case 'eliminar':
                eliminarAmigo($de,$para,$connect);
                break;
            case 'verificarSolicitud':
                verificarLista($connect,1);
                break;
            case 'verificarAmigos':
                verificarLista($connect,0);
                break;
            default:
                throw new \Exception('Unexpected value');
                break;

        }
    }

    function agregarContacto($de,$para,$connect){

        if($de == $para) {
            echo "userIgual";
        }else{

            $validationUser = mysqli_num_rows(mysqli_query($connect,"SELECT usuario FROM usuarios WHERE usuario = '$para'"));

            if($validationUser > 0){

                $validationContactDe = mysqli_num_rows(mysqli_query($connect,"SELECT de, para FROM amigos WHERE de = '$de' AND para = '$para'"));

                if($validationContactDe == 0){
                    $insertar = mysqli_query($connect,"INSERT INTO amigos (de,para,estado,online) VALUES ('$de','$para',1,0)");
                    if($insertar) {
                        echo "siEnviado";
                    }
                }else{
                    echo "noEnviado";
                }
            }else{
                echo "noExiste";
            }
        }
    }

    function aceptarSolicitud($de,$para,$connect){
        $aceptar = mysqli_query($connect,"UPDATE amigos SET estado = 0 WHERE de = '$de' AND para = '$para'");
        echo "aceptar";
    }

    function eliminarAmigo($de,$para,$connect){
        $eliminar = mysqli_query($connect,"DELETE FROM amigos WHERE de = '$de' AND para = '$para'");
        echo "eliminar";
    }

    function verificarLista($connect,$estado){

        $validarLista = mysqli_num_rows(mysqli_query($connect, "SELECT estado FROM amigos WHERE estado = '$estado'"));

        if($validarLista > 0){
            echo "noLista";
        }else{
            echo "siLista";
        }

    }
?>