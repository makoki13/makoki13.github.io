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
        lista[i].notas = value.notas;

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

function set_nombre(o, indice) {
    var resp = prompt("Texto", o.innerHTML);
    if (!resp) return;

    if ($.trim(resp) == '') {
        alert("El texto no puede quedar vacío");
        return;
    }

    o.innerHTML = resp;

    $.each(pois, function (key, value) {
        if (value._indice == indice) {
            pois[key].nombre_poi = resp;
        }
    });
}

function set_notas(o, indice) {
    var texto_actual = o.innerHTML;
    if ($.trim(texto_actual) == '&nbsp') {
        texto_actual = '';
    }
    var resp = prompt("Notas", texto_actual);
    if (!resp) return;

    if ($.trim(resp) == '') {
        alert("El texto no puede quedar vacío");
        return;
    }

    o.innerHTML = resp;

    $.each(pois, function (key, value) {
        if (value._indice == indice) {
            pois[key].notas = resp;
        }
    });
}

function set_distancia(o, indice) {
    var distancia = o.innerHTML;

    var resp = prompt("Distancia", distancia);
    if (!resp) return;

    if ($.trim(resp) == '') {
        alert("El valor no puede quedar vacío");
        return;
    }

    o.innerHTML = resp;

    $.each(pois, function (key, value) {
        if (value._indice == indice) {
            console.log('encontrado', value._indice, indice, key)
            pois[key].distancia = resp;
        }
    });

    pois = recalcula(pois);

    console.log('set_distancia', pois);

    muestra(pois);
}

function muestra() {
    $("#cuerpo_tabla tr").remove();
    var fila = '';
    console.log(pois);
    $.each(pois, function (key, value) {
        fila += '<tr class="fila" onmouseover="this.style.backgroundColor = \'#FFFACD\';" onmouseout="this.style.backgroundColor = \'white\';">';

        var clase_celda = '';
        if (typeof value.atributos !== "undefined") {

            $.each(value.atributos, function (key, value) {
                clase_celda += 'atributo_' + value + ' ';
            });
        }

        console.log('clase_Cel', clase_celda);

        fila += '<td class="' + clase_celda + '" onclick="set_nombre(this,' + value._indice + ');">' + value.nombre_poi + '</td>';

        fila += '<td onclick="set_distancia(this,' + value._indice + ')">' + value.distancia + '</td>';

        if (typeof value.intervalo !== "undefined") {
            fila += '<td>' + value.intervalo + '</td>';
        }
        else {
            fila += '<td>&nbsp;</td>';
        }

        if (typeof value.notas !== "undefined") {
            fila += '<td onclick="set_notas(this,' + value._indice + ');">' + value.notas + '</td>';
        }
        else {
            fila += '<td onclick="set_notas(this,' + value._indice + ');">&nbsp</td>';
        }

        if (typeof value.atributos !== "undefined") {
            fila += '<td>' + value.atributos + '</td>';
        }
        else {
            fila += '<td>&nbsp</td>';
        }

        fila += '<td><button onclick="borra(this,' + value._indice + ')">B</button></td>';

        fila += '</tr>';
    })

    $("#cuerpo_tabla").append(fila);
}

function add(nombre_poi, distancia, notas, atributos) {
    pois.push({ nombre_poi, distancia, notas, atributos });

    pois.sort(compare);

    pois = recalcula(pois);

    console.log(pois);

    muestra(pois);
}

function guardar() {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(pois, null, 2)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = 'pois.json';
    a.click();
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

