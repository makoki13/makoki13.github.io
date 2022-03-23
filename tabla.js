function carga() {
    $.ajax({
        url: 'ruta99.json',
        method: 'GET',
        cache: false,
        type: "text/json"
    })
        .always(function () {
            console.log('cargando datos');
        })
        .done(function (evt) {
            console.log('evt', evt);
            // Set timeout for lazy loading
            setTimeout(function () {
                var result = JSON.parse(evt);
                var html = '<h2>Data Dokter</h2>';
                html += '<tr>';
                for (var i = 0; i < result.puntos.length; i++) {
                    html += '<td>' + result.puntos[i].nombre + '</td>'
                        + '<td>' + result.puntos[i].distancia + '</td>'
                        + '<td>atributos</td>'
                        + '<td>notas</td>';
                }
                html += '</tr>';
                // Set all content
                $('#cuerpo_tabla').html(html);
            }, 1000);
        })
        .fail(function () {
            alert('Error : Failed to reach API Url or check your connection');
        })
        .then(function (evt) {
            console.log("finalizado...");
        });
}

function carga_2() {
    $.getJSON('ruta99.json', function (data) {
        var fila = '';
        $.each(data, function (key, value) {
            fila += '<tr>';
            fila += '<td>campo1</td>';
            fila += '<td>campo2</td>';
            fila += '<td>campo3</td>';
            fila += '<td>campo4</td>';
            fila += '</tr>';
        })
        $("#cuerpo_tabla").append(fila);
    });
}