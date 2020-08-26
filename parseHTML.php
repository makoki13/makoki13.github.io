<?php

include_once './parseCue.php';

function getCabecera($ordinal) {
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
                    url(https://themes.googleusercontent.com/static/fonts/roboto/v11/2UX7WLTfW3W8TclTUvlFyQ.woff)
                    format('woff');
                }

                table {border:1px solid gainsboro; font-family: Roboto;}
                .col1 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: right;width:30px;}
                .col2 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: right;width:40px;}
                .col3 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: right;width:50px;}
                .col4 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: center;width:60px;}
                .col5 {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: left;width:150px;}
                .explicacion {font-size: 12px; font-family: Roboto; color:black; text-shadow: 1px 1px 1px gainsboro;text-align: left;width:400px;}
            </style>
        </head>
        <body>
            <table rules='all'>
                <thead>
                    <tr><th colspan='6'>INFORME CUSTOM CUES #$ordinal</th></tr>
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
    return $contenido;
}

function getFila($i,$strTramo,$strDistancia,$strTipo,$strNombre,$strDescripcion) {
    $strDatosPnemonicos = parseNombre($strNombre);    
    return "
        <tr>
            <td class='col1'>$i</td>
            <td class='col2'>$strTramo</td>
            <td class='col3'>$strDistancia</td>
            <td class='col4' $strDatosPnemonicos[2]>$strDatosPnemonicos[0]</td>
            <td class='col5' $strDatosPnemonicos[3]>$strDatosPnemonicos[1]</td>
            <td class='explicacion'>$strDescripcion</td>
        </tr>";

}

function getFinal() {
    return "</tbody></table></body></html>";
}