<?php

function ifutf8_encode ( $s, $encode = true ) {
    if ( $encode && detecta_codificacion_caracteres( $s, "UTF-8" ) ) return $s;
    return ( $encode ) ? utf8_encode( $s ) : $s;
}

function detecta_codificacion_caracteres ( $string, $enc = null ) {
        $enclist = array(
            'UTF-8', 'ASCII',
            'ISO-8859-1', 'ISO-8859-2', 'ISO-8859-3', 'ISO-8859-4', 'ISO-8859-5',
            'ISO-8859-6', 'ISO-8859-7', 'ISO-8859-8', 'ISO-8859-9', 'ISO-8859-10',
            'ISO-8859-13', 'ISO-8859-14', 'ISO-8859-15', 'ISO-8859-16',
            'Windows-1251', 'Windows-1252', 'Windows-1254',
        );
        if ( $enc !== null ) $enclist = array( $enc );
        $result = false;

        foreach ( $enclist as $item ) {
            $sample = iconv( $item, $item, $string );
            if ( md5( $sample ) == md5( $string ) ) {
                if ( $enc === NULL ) {
                    $result = $item;
                } else {
                    $result = true;
                }
                break;
            }
        }

        return $result;
    }