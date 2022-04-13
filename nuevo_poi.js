var nombre = '';
var distancia = 0;
var notas = '';
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
    var distancia = parseFloat(document.getElementById('distancia').value);
    var comentarios = document.getElementById('comentarios').value;
    var lista_atributos = $(".chosen-select").val();

    window.parent.add(indice, punto, distancia, comentarios, lista_atributos, indice);

    if (edicion == 'S') {
        salir();
    }

    document.getElementById('nombre').value = '';
    document.getElementById('distancia').value = '';
    document.getElementById('comentarios').value = '';

    document.getElementById('nombre').focus();

}


function set_valores_formulario(nombre, distancia, notas, atributos) {
    document.getElementById('nombre').value = nombre;
    document.getElementById('distancia').value = distancia;
    document.getElementById('comentarios').value = notas;

    $.each(atributos, function (i, e) {
        $('.chosen-select').multiselect('select', e);
    });
    $('.chosen-select').multiselect('refresh');

}