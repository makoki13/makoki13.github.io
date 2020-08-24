<?php

include_once './RWGPS.class.php';

echo "Cargando datos...\n";

$lista = RWGPS::getCustomCues("33746497");
$valorAnterior = 0;
if (count($lista) > 0) {  
    $contenido = "
        <html>
        <head>
            <style>
                @font-face {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    src: local('Roboto Regular'),
                    local('Roboto-Regular'),
                    url(http://themes.googleusercontent.com/static/fonts/roboto/v11/2UX7WLTfW3W8TclTUvlFyQ.woff)
                    format('woff');
                }

                table {border:1px solid gainsboro; font-family: Roboto;}
                .col1 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: right;width:30px;}
                .col2 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: right;width:40px;}
                .col3 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: right;width:50px;}
                .col4 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: center;width:50px;}
                .col5 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: left;width:150px;}
                .explicacion {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: left;width:300px;}
            </style>
        </head>
        <body>
            <table rules='all'>
                <thead>
                    <tr><th colspan='6'>INFORME CUSTOM CUES #1</th></tr>
                    <tr>
                        <th>#</th>
                        <th>Tr.</th>
                        <th>Dis.</th>
                        <th>Tipo</th>
                        <th>Nombre</th>
                        <th>Notas</th>
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
    $strTipo = $cue->tipo;
    $strNombre = $cue->nombre;
    $strDescripcion = $cue->descripcion;

    $cadena .= "
        <tr>
            <td class='col1'>$i</td>
            <td class='col2'>$strTramo</td>
            <td class='col3'>$strDistancia</td>
            <td class='col4'>$strTipo</td>
            <td class='col5'>$strNombre</td>
            <td class='explicacion'>$strDescripcion</td>
        </tr>";

    $valorAnterior = $distancia;
    }
}

$contenido .= $cadena."</tbody></table></body></html>";

echo "Generando html\n";

$handle = fopen('index.html','w+'); 
fwrite($handle,$contenido); 
fclose($handle);

echo "Fin!\n";

