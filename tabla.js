var pois;
var nom_fichero = '';

function get_new_indice(incremento) {
    var indice = 0;
    $.each(pois, function (key, value) {
        if (value._indice > indice) {
            indice = value._indice;
        }
    });

    return indice + 1 + incremento;
}

function recalcula() {
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
        lista[i].punto_referencia = value.punto_referencia;

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
            }

            lista[i] = {};
            lista[i]._indice = value._indice;
            lista[i].nombre_poi = value.nombre_poi;
            lista[i].distancia = parseFloat(value.distancia).toFixed(1);
            if (i > 0) {
                lista[i - 1].intervalo = valor_distancia_anterior.toFixed(1);
            }
            lista[i].notas = value.notas;
            lista[i].atributos = value.atributos;
            lista[i].punto_referencia = value.punto_referencia;

            distancia_anterior = parseFloat(value.distancia);

            i++;
        })
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

    $.each(pois, function (key, value) {
        if (value._indice == indice) {
            pois[key].distancia = parseFloat(resp);
        }
    });

    pois = recalcula(pois);

    muestra(pois);
}

function muestra() {
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

        fila += '<td class="' + clase_celda + '" onclick="set_nombre(this,' + value._indice + ');">' + value.nombre_poi + '</td>';

        var distancia = parseFloat(value.distancia);
        fila += '<td onclick="set_distancia(this,' + value._indice + ')">' + distancia.toFixed(1) + '</td>';

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

        var titulo = '';
        if (value.punto_referencia) {
            if (value._indice != value.punto_referencia) {
                var punto_de_referencia = _get_punto(value.punto_referencia)
                if (punto_de_referencia) {
                    titulo = punto_de_referencia.nombre_poi + ' km ' + punto_de_referencia.distancia;
                }
            }
        }
        fila += '<td title="' + titulo + '"><button onclick="borra(' + value._indice + ')" style="color:white">B</button></td>';
        fila += '</tr>';
    })

    $("#cuerpo_tabla").append(fila);
}

function add(_indice, nombre_poi, distancia, notas, atributos, punto_referencia) {
    pois.push({ _indice, nombre_poi, distancia, notas, atributos, punto_referencia });

    pois.sort(compara_distancia);

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
    console.log('indice', indice);

    var lista = []; var i = 0; var punto_de_referencia = null; var indice_de_referencia = null;
    $.each(pois, function (key, value) {
        if (value._indice != indice) {
            lista[i] = pois[key];
            i++;
        }
        else {
            console.log('punto de ref', value.punto_referencia);
            punto_de_referencia = _get_punto(value.punto_referencia)
            if (punto_de_referencia) {
                console.log('punto nuevo', punto_de_referencia, 'indice', value._indice);
                if (punto_de_referencia.punto_referencia == value._indice) {
                    indice_de_referencia = punto_de_referencia._indice;
                    console.log('indice de ref', indice_de_referencia);
                }
            }
        }
    });

    pois = lista;
    pois = recalcula(pois);

    if (indice_de_referencia != null) {
        borra(indice_de_referencia);
    }

    pois = recalcula(pois);

    muestra();
}

function edita_registro(o, indice) {
    window.parent.edita_registro(o, indice);
}

function compara_distancia(a, b) {
    if (parseFloat(a.distancia) < parseFloat(b.distancia)) {
        return -1;
    }
    if (parseFloat(a.distancia) > parseFloat(b.distancia)) {
        return 1;
    }
    return 0;
}

function _get_punto(indice) {
    var punto = null;
    $.each(pois, function (key, value) {
        if (value._indice == indice) {
            punto = pois[key];
        }
    });

    return punto;
}

function get_punto(indice) {
    window.parent.envia_punto(_get_punto(indice));
}

function cargar_fichero(nombre_fichero) {
    nom_fichero = nombre_fichero;
    carga(nom_fichero).then(function (returndata) {
        pois = returndata;

        pois.sort(compara_distancia);
        muestra(pois);

        $('#principal').floatThead();

        window.parent.document.getElementById('fichero').innerHTML = nom_fichero;
    });
}

function get_pois() {
    return pois;
}


