<?php

include_once './RWGPS.class.php';
include_once './parseHTML.php';


echo "Cargando datos...\n";

$ordinal = 1;
if (count($argv) > 1) $ordinal = $argv[1];

$lista = RWGPS::getCustomCues(RWGPS::getIdRuta($ordinal));
$valorAnterior = 0;
if (count($lista) > 0) {  
    $contenido =  getCabecera($ordinal);
    $cadena = '';
    foreach( $lista as $i => $reg ) {
        $cue = new Cue($reg->distancia,$reg->nombre,$reg->tipo,$reg->descripcion);
        
        $distancia = $cue->distancia;
        $strDistancia = number_format($distancia,1,".",",");
        $tramo = $distancia - $valorAnterior;
        $strTramo = number_format($tramo,1,".",",");
        $strTipo = $cue->tipo;
        $strNombre = $cue->nombre;
        $strDescripcion = $cue->descripcion;

        $fila = $i + 1;
        $cadena .= getFila($fila,$strTramo,$strDistancia,$strTipo,$strNombre,$strDescripcion);
        
        $valorAnterior = $distancia;
    }
}

$contenido .= $cadena.getFinal();

echo "Generando html\n";

$handle = fopen('index.html','w+'); 
fwrite($handle,$contenido); 
fclose($handle);

$comando = 'C:\"Program Files (x86)"\Google\Chrome\Application\chrome.exe ./index.html';
//$comando = 'C:\"Program Files (x86)"\"Mozilla Firefox"\firefox.exe -profilemanager ./index.html';

pclose(popen("start " . $comando , "r"));

echo "Fin!\n";

