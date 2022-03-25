var pois;

function recalcula() {
    var distancia_anterior = 0; var lista = [];
    var i = 0;
    $.each(pois, function (key, value) {
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
    pois = $.getJSON('pois.json', function (data) {
        var i = 0;
        $.each(data, function (key, value) {
            if (i > 0) {
                var valor_distancia_anterior = value.distancia - distancia_anterior;
                var fila_anterior = "" + (i - 1);
            }

            lista[i] = {};
            lista[i]._indice = i;
            lista[i].nombre_poi = value.nombre_poi;
            lista[i].distancia = value.distancia;
            if (i > 0) {
                lista[i - 1].intervalo = valor_distancia_anterior.toFixed(1);
            }
            lista[i].notas = value.notas;
            lista[i].atributos = value.atributos;

            distancia_anterior = parseInt(value.distancia);

            i++;
        })

        //$("#cuerpo_tabla").append(fila);
    }).then(function (data) {
        return lista;
    });

    return pois;
}

function muestra() {
    $("#cuerpo_tabla tr").remove();
    var fila = '';
    console.log(pois);
    $.each(pois, function (key, value) {
        fila += '<tr class="fila" onmouseover="this.style.backgroundColor = \'#FFFACD\';" onmouseout="this.style.backgroundColor = \'white\';">';
        fila += '<td>' + value.nombre_poi + '</td>';
        fila += '<td>' + value.distancia + '</td>';
        if (typeof value.intervalo !== "undefined") {
            fila += '<td>' + value.intervalo + '</td>';
        }
        else {
            fila += '<td>&nbsp;</td>';
        }
        if (typeof value.notas !== "undefined") {
            fila += '<td>' + value.notas + '</td>';
        }
        else {
            fila += '<td>&nbsp</td>';
        }

        fila += '<td>' + value.atributos + '</td>';
        fila += '<td><button onclick="borra(this,' + value._indice + ')">B</button></td>';
        fila += '</tr>';
    })

    $("#cuerpo_tabla").append(fila);
}

function borra(celda, indice) {
    celda.parentNode.parentNode.style.display = 'none';

    //console.log(pois.length);
    //console.log('valor', pois);
    var lista = []; var i = 0;
    $.each(pois, function (key, value) {
        if (value._indice != indice) {
            console.log('encontrado', value._indice, indice, key)
            lista[i] = pois[key];
            i++;
        }
    });
    pois = lista;
    console.log('valor', pois);
}

/* function borra(vector, celda, indice) {
    console.log(vector);
    //celda.parentNode.parentNode.style.display = 'none';
    //vector = vector.splice(indice, 1);
    //console.log(vector);
} */

