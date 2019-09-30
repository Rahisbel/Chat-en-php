<?php
    include('conexionBD.php');

    error_reporting(E_ALL);
    ini_set('display_errors', '1');

    $init = New Conexion();
    $init ->EstablecerConexion();
    $connect =  $init->getConexion();

    if(isset($_POST['option'])){
        $id = $_POST['id'];
        $option = $_POST['option'];
        switch($option){
            case 'verificarSolicitud':
                verificarLista($connect,1);
                break;
            case 'verificarAmigos':
                verificarLista($connect,0);
                break;
            case 'verificarMensajes':
                verificarMensajes($connect,$id);
                break;
            default:
                throw new \Exception('Unexpected value');
                break;

        }
    }


    function verificarLista($connect,$estado){

        $validarLista = mysqli_num_rows(mysqli_query($connect, "SELECT estado FROM amigos WHERE estado = '$estado'"));

        if($validarLista > 0){
            echo "siLista";
        }else{
            echo "noLista";
        }

    }

    function verificarMensajes($connect,$id){

        $validarMensajes = mysqli_num_rows(mysqli_query($connect, "SELECT id_amigo FROM mensaes WHERE id_amigo = '$id'"));

        if($validarMensajes > 0){
            echo "siSMS";
        }else{
            echo "noSMS";
        }

    }
?>