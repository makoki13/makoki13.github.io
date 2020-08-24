<?php

include_once './Cue.class.php';

class RWGPS {
    private static $authToken = '54e40ca820e6e6434b2249c8b527e3b3';    
    private static $email = 'pablo.makoki@gmail.com';
    private static $password = 'J0P4G3R1#beatles';
    private static $apikey = "824e0ab1";
    private static $versionAPI = 2;
    //private static $parametros =  {'email': 'pablo.makoki@gmail.com', 'password': 'J0P4G3R1#beatles', 'apikey': '824e0ab1', 'version': '2'};    
    
    public static function getCustomCues( $idSalida ) {
        $tiempoAnterior = 0;
        $diferenciaTiempo = 0;
        
        $url = "http://ridewithgps.com/routes/$idSalida.json?auth_token=".RWGPS::$authToken."&apikey=".RWGPS::$apikey."&version=".RWGPS::$versionAPI;
        $response = file_get_contents("$url");
        $datos = json_decode($response);

        $listaCues = $datos->route->course_points;
        
        $lista = array();
        if (count($listaCues) > 0) foreach( $listaCues as $reg) {            
            $oCue = new Cue($reg->d / 1000,$reg->n,$reg->t,"");
            $lista[] = $oCue;
        }
        
        return $lista;
    }
}