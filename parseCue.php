<?php

class estadoEstilo {
    private static $_esSubida = false;
    private static $_esBajada = false;

    public static function esSubida() { return estadoEstilo::$_esSubida == true;}
    public static function esBajada() { return estadoEstilo::$_esBajada == true;}

    public static function setSubida($valor) { estadoEstilo::$_esSubida = $valor;}
    public static function setBajada($valor) { estadoEstilo::$_esBajada = $valor;}
}

function __parseCue__getLista($texto) {
    $lista = explode("*",$texto);
    return $lista;
}

function __parseCue__convierte($pnemonico) {
    return $pnemonico;
}

function __parseCue__getPnemonicos($cadena) {
    $lista = explode(" ",$cadena);
    $cadenaFinal = '';
    if (count($lista) > 0) foreach($lista as $reg) {
        $texto = __parseCue__convierte($reg);
        $cadenaFinal .= $texto." ";
    }

    return $cadenaFinal;
}

function __parseCue__existe($texto,$pnemonico) {    
    $cadena = $pnemonico;
    return (strpos($texto,$cadena) !==  false);
}

function __parseCue__analizaPnemonico($elemento) {
    $estilo = array(0 => '', 1 => '');

    if (strlen($elemento) > 1) {
        if (substr($elemento,0,1) == "S") {
            estadoEstilo::setBajada(false);
            estadoEstilo::setSubida(true);
        }
        if (substr($elemento,0,1) == "B") {
            estadoEstilo::setSubida(false);
            estadoEstilo::setBajada(true);
        }
    }

    if (__parseCue__existe($elemento,'L')) {        
        $estilo[1] .= 'font-weight:bolder;';
    }

    if 
    (
        __parseCue__existe($elemento,'G') ||
        __parseCue__existe($elemento,'C') ||
        __parseCue__existe($elemento,'P')
        
    ) {        
        $estilo[1] .= 'color:green;';
    }

    if 
    (
        __parseCue__existe($elemento,'L')
        
        
    ) {        
        $estilo[1] .= 'color:black;';
    }

    return $estilo;
}

function __parseCue__getEstiloPnemonicos($stringPnemonicos) {
    $stringPnemonicos = trim($stringPnemonicos);
    $estilo = array(0 => '', 1 => '');

    $listaEstilos[0] = $listaEstilos[1] = array();

    $arrayPnemonicos = explode(" ",$stringPnemonicos);

    if (estadoEstilo::esSubida()) $listaEstilos[0][] = $listaEstilos[1][] = 'background-color:pink;';
    if (estadoEstilo::esBajada()) $listaEstilos[0][] = $listaEstilos[1][] = 'background-color:palegreen;';

    if (count($arrayPnemonicos) > 0) foreach($arrayPnemonicos as $reg) {        
        $estilos = __parseCue__analizaPnemonico($reg);
        if (trim($estilos[0])!='') $listaEstilos[0][] = $estilos[0];
        if (trim($estilos[1])!='') $listaEstilos[1][] = $estilos[1];
    }

    if (count($listaEstilos[0]) > 0) {
        $estilo[0] = 'style="';
        foreach($listaEstilos[0] as $reg) {
            $estilo[0] .= $reg;
        }
        $estilo[0] .= '"';
    }

    if (count($listaEstilos[1]) > 0) {
        $estilo[1] = 'style="';
        foreach($listaEstilos[1] as $reg) {
            $estilo[1] .= $reg;
        }
        $estilo[1] .= '"';
    }
    
    return $estilo;
}

function __parseCue__filtraPnemonicos($pnemonicos) {
    $arrayPnemonicos = explode(" ",$pnemonicos);    
    $cadenaFiltrada = '';
    if (count($arrayPnemonicos) > 0) {     
        foreach($arrayPnemonicos as $reg) {            
            $subcadena = $reg;            
            if (trim($pnemonicos) == 'L') $subcadena = '';        
            $cadenaFiltrada .= $subcadena." ";                    
        }       
    }

    return $cadenaFiltrada;
}

function parseNombre($nombre) {    
    $lista = __parseCue__getLista($nombre);    
    if (count($lista)  == 1) { //Solo hay texto
        return array(0 => "", 1 => $nombre, 2 => "", 3 => "");        
    }

    $stringPnemonicos = __parseCue__getPnemonicos($lista[0]);
    $listaEstilos = __parseCue__getEstiloPnemonicos($stringPnemonicos);
    $stringPnemonicos = __parseCue__filtraPnemonicos($stringPnemonicos);

    return array(0 => $stringPnemonicos, 1 => $lista[1], 2=> $listaEstilos[0], 3=> $listaEstilos[1]);
}