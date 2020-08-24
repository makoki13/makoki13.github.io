<?php

include_once './RWGPS.class.php';

echo "Cargando datos...\n";

$lista = RWGPS::getCustomCues("33746497");
$valorAnterior = 0;
if (count($lista) > 0) {  
    $contenido = "
        <html>
        <head>

        </head>
        <body>
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Tramo</th>
                        <th>Distancia</th>
                        <th>Tipo</th>
                        <th>Nombre</th>
                    </tr>
                </thead>
                <tbody>
    ";
    $cadena = '';
    foreach( $lista as $i => $reg ) {
    $cue = new Cue($reg->distancia,$reg->nombre,$reg->tipo,$reg->descripcion);
    
    $distancia = $cue->distancia;
    $strDistancia = number_format($distancia,1,".",",");
    $tramo = $distancia - $valorAnterior;
    $strTramo = number_format($tramo,1,".",",");
    $strTipo = $reg->tipo;
    $strNombre = $reg->nombre;

    $cadena .= "<tr><td>$i</td><td>$strDistancia</td><td>$strTramo</td><td>$strTipo</td><td>$strNombre</td></tr>";

    $valorAnterior = $distancia;
    }
}

$contenido .= $cadena."</tbody></table></body></html>";

echo "Generando html\n";

if (!file_exists('index.html'))  {
    $handle = fopen('index.html','w+'); 
    fwrite($handle,$contenido); 
    fclose($handle);
}

echo "Fin!\n";

