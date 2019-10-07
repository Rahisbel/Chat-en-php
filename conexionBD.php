<?php
class Conexion{

    private $conexion;

    public function __construct() {}

    public function getConexion(){
        return $this->conexion;
    }

    public function EstablecerConexion(){
        $this->conexion=new mysqli("localhost","admin","7287256","Chat");
        //echo "Conexión establecida  ";
        
        if($this->conexion->connect_errno){
            echo "Error al conectarse con la Base de Datos  ";
            exit;
        }                       

    }
}
