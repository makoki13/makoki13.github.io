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
            $descripcion = ''; if (property_exists($reg, 'description')) $descripcion = $reg->description;
            $oCue = new Cue($reg->d / 1000,$reg->n,$reg->t,$descripcion);
            $lista[] = $oCue;
        }
        
        return $lista;
    }

    public static function getIdRuta($ordinal=1) {
        switch($ordinal) {
            case 1: return '33746497';
            case 2: return '33555597';
            case 3: return '33555684';
            case 4: return '33746648';
            case 5: return '33746680';
            case 6: return '33555743';
            case 7: return '33555781';
        }
    }
}