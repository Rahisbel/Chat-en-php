<?php 
    error_reporting(E_ALL);
    ini_set('display_errors', '1');

 	include("conexionBD.php");
    $conectar=new Conexion();
    $conectar->EstablecerConexion();
    $cad="";

 	if(isset($_POST["login"]))
 		echo "string";
 		/*$cad="where nombre like '%".$_POST["user"]."%'";

        $sql="select * from nombreusuario ".$cad."  order by nombre";
        $resultado=$conectar->getConexion()->query($sql);
        while ($persona=$resultado->fetch_assoc()) {
            echo "<tr><td>",$persona['nombre'];
        } */   
?>
