<?php

include_once './Utilidades.php';

Class Cue {
    public $distancia = 0;
    public $nombre = "";
    public $tipo = "";
    public $descripcion = "";

    public function __construct ( $distancia = 0, $nombre = "", $tipo = "", $descripcion = "" ) {
        $this->distancia = $distancia;
        $this->nombre = ifutf8_encode( $nombre );
        $this->tipo = $tipo;
        $this->descripcion = ifutf8_encode( $descripcion );
    }
}