function imprime_pdf() {
    var alto_lineas = 1;
    var alto_puntos = 4;
    var ancho_linea = 50;
    var margen_izdo = 1;

    var ancho_columna1 = 50;
    var ancho_columna2 = 10;
    var ancho_columna3 = 10;

    var inicio_altura = 4;

    var margen_sup_rect = 3;
    var margen_inf_rect = 4;

    const doc = new jsPDF();

    doc.setFontSize(8);

    var pois = document.getElementById('frm_tabla').contentWindow.get_pois();
    if (pois) {
        var j = inicio_altura; var fila = 1;
        var estado = estado_actual = 0; //0: neutral, 1: subiendo, 2: bajando
        $.each(pois, function (key, value) {
            var distancia = parseFloat(value.distancia).toFixed(1).toString();
            if (value.intervalo) {
                var intervalo = value.intervalo.toString();
            }
            else {
                var intervalo = '';
            }

            if (value.atributos.includes('inicio_subida')) {
                estado_actual = 1;
                console.log('inicio subida', value.distancia);
                doc.setFillColor(128, 0, 0);
                doc.setTextColor(255, 255, 255);
                doc.setFont('helvetica', '', 'normal');
            }
            else if (value.atributos.includes('fin_subida')) {
                estado_actual = 0;
                console.log('fin subida', value.distancia);
                doc.setFillColor(255, 255, 255);
                doc.setTextColor(128, 0, 0);
                doc.setFont('helvetica', '');
            }
            else if (value.atributos.includes('inicio_bajada')) {
                estado_actual = 2;
                console.log('inicio bajada', value.distancia);
                doc.setFillColor(0, 128, 0);
                doc.setTextColor(255, 255, 255);
                doc.setFont('helvetica', '', 'normal');
            }
            else if (value.atributos.includes('fin_bajada')) {
                estado_actual = 0;
                console.log('fin bajada', value.distancia);
                doc.setFillColor(255, 255, 255);
                doc.setTextColor(0, 128, 0);
                doc.setFont('helvetica', '');
            }
            else if ((value.atributos.includes('inicio') || value.atributos.includes('poblacion'))) {
                console.log('inicio / poblacion', value.distancia);
                doc.setFillColor(255, 255, 255);
                doc.setTextColor(0, 0, 0);
                doc.setFont('helvetica', '', 'bold');
            }
            else {
                console.log('otros', value.distancia);
                doc.setFillColor(255, 255, 255);
                doc.setTextColor(0, 0, 128);
                doc.setFont('helvetica', 'italic');
            }

            doc.rect(margen_izdo, j - margen_sup_rect, ancho_columna1, margen_inf_rect, 'FD');
            doc.text(value.nombre_poi, margen_izdo, j);

            doc.setFillColor(255, 255, 255);
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', '', '');
            if (estado == 1) {
                doc.setFillColor(255, 128, 128);
            }
            if (estado == 2) {
                doc.setFillColor(128, 255, 128);
            }

            estado = estado_actual;

            //doc.text('|', margen_izdo + ancho_columna1, j);
            //doc.text(distancia, margen_izdo + ancho_columna1 + 1, j);

            doc.rect(margen_izdo + ancho_columna1, j - margen_sup_rect, ancho_columna2, margen_inf_rect, 'FD');
            doc.text(distancia, margen_izdo + ancho_columna1 + 1, j);

            doc.setFont('helvetica', '', '');
            doc.setFillColor(255, 255, 255);
            doc.setTextColor(0, 0, 0);
            if (intervalo >= 10) {
                doc.setFillColor(255, 128, 128);
                doc.setFont('helvetica', '', 'bold');
            }
            else if (intervalo >= 5) {
                doc.setFillColor(255, 255, 128);
                doc.setFont('helvetica', '', 'bold');
            }

            doc.rect(margen_izdo + ancho_columna1 + ancho_columna2, j - margen_sup_rect, ancho_columna3, margen_inf_rect, 'FD');
            doc.text(intervalo, margen_izdo + ancho_columna1 + ancho_columna2 + 1, j);

            //doc.text('|', margen_izdo + ancho_columna1 + ancho_columna2, j);
            //doc.text(intervalo, margen_izdo + ancho_columna1 + ancho_columna2 + 1, j);
            //doc.text('|', margen_izdo + ancho_columna1 + ancho_columna2 + ancho_columna3, j);
            //doc.line(margen_izdo, j + alto_lineas, margen_izdo + ancho_columna1 + ancho_columna2 + ancho_columna3, j + alto_lineas);

            j += alto_puntos;
            fila++;

            if (fila == 70) {
                doc.addPage();
                j = inicio_altura;
                fila = 1;
            }
        });
    }


    var nombre_fichero = get_nombre_fichero();
    doc.save(nombre_fichero.replace('json', 'pdf'));
}
