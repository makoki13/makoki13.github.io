var nombre = '';
var inicio = 0;
var fin = '';
var tiempo = 0;
var media = 0;
var max_porc = 0;
var comentarios = '';
var indice = 0;

function salir() {
    window.parent.desbloquea_insertar_registro();
}

function add() {
    if (edicion == 'S') {
        window.parent.borra_punto(indice);
    }
    else {
        indice = window.parent.get_new_indice();
    }
    var punto = document.getElementById('nombre').value;
    var inicio = document.getElementById('inicio').value;
    var fin = document.getElementById('fin').value;

    var distancia = parseFloat(fin) - parseFloat(inicio);

    var tiempo = document.getElementById('tiempo').value;
    var media = document.getElementById('media').value;
    var max_porc = document.getElementById('max_porc').value;

    var comentarios = document.getElementById('comentarios').value;

    /* generar punto inicio bajada */
    indice_fin = window.parent.get_new_indice(1);
    window.parent.add(indice, "Inicio " + punto, inicio, 'D: ' + distancia + 'Km * T: ' + tiempo + " * M: " + media + "% * Max: " + max_porc + "%", ['inicio_bajada'], indice_fin);
    /* generar punto fin subida */    
    window.parent.add(indice_fin, "Fin " + punto, fin, comentarios, ['fin_bajada'], indice);

    if (edicion == 'S') {
        salir();
    }

    document.getElementById('nombre').value = '';
    document.getElementById('inicio').value = '';
    document.getElementById('fin').value = '';
    document.getElementById('tiempo').value = '';
    document.getElementById('media').value = '';
    document.getElementById('max_porc').value = '';

    document.getElementById('comentarios').value = '';

    document.getElementById('nombre').focus();
}


function set_valores_formulario(nombre, inicio, fin, tiempo, media, max_porc, notas) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('inicio').value = inicio;
    document.getElementById('fin').value = fin;
    document.getElementById('tiempo').value = tiempo;
    document.getElementById('media').value = media;
    document.getElementById('max_porc').value = max_porc;

    document.getElementById('comentarios').value = notas;
}