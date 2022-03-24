
function recalcula(data) {
    var distancia_anterior = 0; var lista = [];
    var i = 0;
    $.each(data, function (key, value) {
        if (i > 0) {
            var valor_distancia_anterior = value.distancia - distancia_anterior;
        }

        lista[i] = {};
        lista[i].nombre_poi = value.nombre_poi;
        lista[i].distancia = value.distancia;
        if (i > 0) {
            lista[i - 1].intervalo = valor_distancia_anterior.toFixed(1);
        }
        lista[i].atributos = value.atributos;

        distancia_anterior = parseInt(value.distancia);

        i++;
    })

    return lista;
}

function carga() {
    var distancia_anterior = 0; var lista = [];
    vector = $.getJSON('pois.json', function (data) {
        var i = 0;
        $.each(data, function (key, value) {
            if (i > 0) {
                var valor_distancia_anterior = value.distancia - distancia_anterior;
                var fila_anterior = "" + (i - 1);
            }

            lista[i] = {};
            lista[i].nombre_poi = value.nombre_poi;
            lista[i].distancia = value.distancia;
            if (i > 0) {
                lista[i - 1].intervalo = valor_distancia_anterior.toFixed(1);
            }
            lista[i].atributos = value.atributos;

            distancia_anterior = parseInt(value.distancia);

            i++;
        })

        //$("#cuerpo_tabla").append(fila);
    }).then(function (data) {
        return lista;
    });

    return vector;
}

function muestra(vector) {
    $("#cuerpo_tabla tr").remove();
    var fila = '';
    console.log(vector);
    $.each(vector, function (key, value) {
        fila += '<tr>';
        fila += '<td>' + value.nombre_poi + '</td>';
        fila += '<td>' + value.distancia + '</td>';
        if (typeof value.intervalo !== "undefined") {
            fila += '<td>' + value.intervalo + '</td>';
        }
        else {
            fila += '<td>&nbsp;</td>';
        }
        fila += '<td>' + value.atributos + '</td>';
        fila += '<td>&nbsp;</td>';
        fila += '<td><button>B</button></td>';
        fila += '</tr>';
    })

    $("#cuerpo_tabla").append(fila);
}
