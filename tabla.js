var pois;
var nom_fichero = '';

function recalcula() {
    console.log('recalcula');
    var distancia_anterior = 0; var lista = [];
    var i = 0;
    $.each(pois, function (key, value) {
        if (i > 0) {
            var valor_distancia_anterior = parseFloat(value.distancia) - parseFloat(distancia_anterior);
        }

        lista[i] = {};
        lista[i]._indice = value._indice;
        lista[i].nombre_poi = value.nombre_poi;
        lista[i].distancia = value.distancia;
        if (i > 0) {
            lista[i - 1].intervalo = valor_distancia_anterior.toFixed(1);
        }
        lista[i].notas = value.notas;

        lista[i].atributos = value.atributos;

        distancia_anterior = parseFloat(value.distancia);

        i++;
    })

    return lista;
}

function carga(fichero) {
    var distancia_anterior = 0; var lista = [];
    pois = $.getJSON(fichero, function (data) {
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

            distancia_anterior = parseFloat(value.distancia);

            i++;
        })

        //$("#cuerpo_tabla").append(fila);
    }).then(function (data) {
        return lista;
    });

    console.log('pois nuevo', pois);

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
    var resp = prompt("Notas", texto_actual);
    if (!resp) return;

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

    console.log(pois);

    $.each(pois, function (key, value) {
        if (value._indice == indice) {
            console.log('KEY: ' + key + ' VALUE', value, 'INDICE: ' + indice, 'VALUE._INDICE: ' + value._indice);
            pois[key].distancia = resp;
        }
    });

    //console.log(pois);

    pois = recalcula(pois);

    muestra(pois);
}

function muestra() {
    console.log('muestra');
    $("#cuerpo_tabla tr").remove();
    var fila = '';
    $.each(pois, function (key, value) {
        fila += '<tr class="fila" onmouseover="this.style.backgroundColor = \'#FFFACD\';" onmouseout="this.style.backgroundColor = \'white\';">';

        var clase_celda = '';

        if (typeof value.atributos !== "undefined") {
            $.each(value.atributos, function (key, value) {
                clase_celda += 'atributo_' + value + ' ';
            });

        }

        fila += '<td class="' + clase_celda + '" onclick="set_nombre(this,' + value._indice + ');">&nbsp;' + value.nombre_poi + '</td>';

        fila += '<td onclick="set_distancia(this,' + value._indice + ')">' + value.distancia + '</td>';

        if (typeof value.intervalo !== "undefined") {
            fila += '<td>' + value.intervalo + '</td>';
        }
        else {
            fila += '<td>&nbsp;</td>';
        }

        if (typeof value.notas !== "undefined") {
            fila += '<td class="notas" onclick="set_notas(this,' + value._indice + ');">' + value.notas + '</td>';
        }
        else {
            fila += '<td class="notas" onclick="set_notas(this,' + value._indice + ');">&nbsp</td>';
        }

        if (typeof value.atributos !== "undefined") {
            var clase_cero = '';
            if (value.atributos.length == 0) {
                clase_cero = 'cero';
            }
            fila += '<td class="atributos ' + clase_cero + '" onclick="edita_registro(this,' + value._indice + ')">' + value.atributos.length + '</td>';
        }
        else {
            fila += '<td class="atributos" onclick="edita_registro(this,' + value._indice + ')">&nbsp</td>';
        }

        fila += '<td><button onclick="borra(' + value._indice + ')" style="color:white">B</button></td>';

        fila += '</tr>';
    })

    $("#cuerpo_tabla").append(fila);
}

function add(_indice, nombre_poi, distancia, notas, atributos) {
    pois.push({ _indice, nombre_poi, distancia, notas, atributos });

    pois.sort(compare);

    pois = recalcula(pois);

    muestra(pois);
}

function guardar() {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(pois, null, 2)], { type: 'text/plain' });
    a.href = URL.createObjectURL(file);
    a.download = nom_fichero;
    a.click();
}


function borra(indice) {
    //celda.parentNode.parentNode.style.display = 'none';

    var lista = []; var i = 0;
    $.each(pois, function (key, value) {
        if (value._indice != indice) {
            lista[i] = pois[key];
            i++;
        }
    });
    pois = lista;

    console.log(pois);

    muestra();
}

function edita_registro(o, indice) {
    console.log('indice', indice);
    window.parent.edita_registro(o, indice);
}

function compare(a, b) {
    if (a.distancia < b.distancia) {
        return -1;
    }
    if (a.distancia > b.distancia) {
        return 1;
    }
    return 0;
}

function get_punto(indice) {
    $.each(pois, function (key, value) {
        if (value._indice == indice) {
            window.parent.envia_punto(pois[key]);
        }
    });
}

function cargar_fichero(nombre_fichero) {
    console.log('cargar_fichero', nombre_fichero);
    nom_fichero = nombre_fichero;
    carga(nom_fichero).then(function (returndata) {
        pois = returndata;
        muestra(pois);

        $('#principal').floatThead();

        window.parent.document.getElementById('fichero').innerHTML = nom_fichero;
    });
}


