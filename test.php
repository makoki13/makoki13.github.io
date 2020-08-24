<?php

include_once './RWGPS.class.php';

echo "Cargando datos...\n";

$lista = RWGPS::getCustomCues("33746497");
$valorAnterior = 0;
if (count($lista) > 0) foreach( $lista as $i => $reg ) {
    $cue = new Cue($reg->distancia,$reg->nombre,$reg->tipo,$reg->descripcion);
    
    $distancia = $cue->distancia;
    $strDistancia = number_format($distancia,1,".",",");
    $tramo = $distancia - $valorAnterior;
    $strTramo = number_format($tramo,1,".",",");

    $cadena .= "Elem: $i ".$strDistancia." --- ".$strTramo." --- ".$reg->tipo." --- ".$reg->nombre."\n";

    $valorAnterior = $distancia;
}

echo $cadena;
