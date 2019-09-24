<?php 
    session_start();
    session_destroy();
    unset($_SESSION["administrador"]);
    header("location:index.php");
?>