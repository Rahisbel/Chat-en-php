<?php
class Conexion{

    private $conexion;

    public function __construct() {}

    public function getConexion(){
        return $this->conexion;
    }

    public function EstablecerConexion(){
        $this->conexion=new mysqli("localhost","root","","Chat");
        
        if($this->conexion->connect_errno){
            echo "Error al conectarse con la Base de Datos";
            exit;
        }                       
    }
}
