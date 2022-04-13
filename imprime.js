function imprime_pdf() {
    var alto_lineas = 1;
    var alto_puntos = 4;
    var ancho_linea = 50;
    var margen_izdo = 1;

    var ancho_columna1 = 50;
    var ancho_columna2 = 10;
    var ancho_columna3 = 10;

    var inicio_altura = 3;

    const doc = new jsPDF();

    doc.setFontSize(8);

    var pois = document.getElementById('frm_tabla').contentWindow.get_pois();
    if (pois) {
        var j = inicio_altura;
        $.each(pois, function (key, value) {
            var distancia = parseFloat(value.distancia).toFixed(1).toString();
            if (value.intervalo) {
                var intervalo = value.intervalo.toString();
            }
            else {
                var intervalo = '';
            }
            console.log('imprime_pdf', distancia, intervalo);

            doc.text(value.nombre_poi, margen_izdo, j);
            doc.text('|', margen_izdo + ancho_columna1, j);
            doc.text(distancia, margen_izdo + ancho_columna1 + 1, j);
            doc.text('|', margen_izdo + ancho_columna1 + ancho_columna2, j);
            doc.text(intervalo, margen_izdo + ancho_columna1 + ancho_columna2 + 1, j);
            doc.text('|', margen_izdo + ancho_columna1 + ancho_columna2 + ancho_columna3, j);
            doc.line(margen_izdo, j + alto_lineas, margen_izdo + ancho_columna1 + ancho_columna2 + ancho_columna3, j + alto_lineas);

            j += alto_puntos;
        });
    }


    var nombre_fichero = get_nombre_fichero();
    doc.save(nombre_fichero.replace('json', 'pdf'));
}
