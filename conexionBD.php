<?php
class Conexion{

    private $conexion;

    public function __construct() {}

    public function getConexion(){
        return $this->conexion;
    }

    public function EstablecerConexion(){
        $this->conexion = mysqli_connect("localhost","admin","7287256","Chat");
        if(!$this->conexion){
            die('Error de Conexion' . mysqli_connect_errno());
        }
    }
}
