var nombre = '';
var inicio = 0;
var fin = '';
var distancia = 0;
var media = 0;
var comentarios = '';
var indice = 0;

function salir() {
    window.parent.desbloquea_insertar_registro();
}

function add() {
    if (edicion == 'S') {
        window.parent.borra_punto(indice);
    }
    var punto = document.getElementById('nombre').value;
    var inicio = document.getElementById('inicio').value;
    var distancia = document.getElementById('distancia').value;
    var ascension = document.getElementById('ascension').value;
    var media = document.getElementById('media').value;

    var comentarios = document.getElementById('comentarios').value;

    /* generar punto inicio subida */
    window.parent.add(indice, "Inicio " + punto, inicio, 'Asc: ' + ascension + " M: " + media + "%", ['inicio_subida']);
    /* generar punto fin subida */
    var fin = parseFloat(inicio) + parseFloat(distancia);
    window.parent.add(indice, "Fin " + punto, fin, comentarios, ['fin_subida']);

    if (edicion == 'S') {
        salir();
    }

    document.getElementById('nombre').value = '';
    document.getElementById('inicio').value = '';
    document.getElementById('distancia').value = '';
    document.getElementById('ascension').value = '';
    document.getElementById('media').value = '';

    document.getElementById('comentarios').value = '';

    document.getElementById('nombre').focus();
}


function set_valores_formulario(nombre, inicio, distancia, ascension, media, notas) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('inicio').value = inicio;
    document.getElementById('distancia').value = distancia;
    document.getElementById('ascension').value = ascension;
    document.getElementById('media').value = media;

    document.getElementById('comentarios').value = notas;
}