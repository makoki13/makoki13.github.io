function insertar_registro() {
    document.getElementById('frmNuevaVersion').src = 'nuevo_poi.html';
    document.getElementById('bloqueo').style.visibility = 'visible';
    document.getElementById('nuevo_poi').style.visibility = 'visible';
    document.getElementById('nuevo_poi_sombra').style.visibility = 'visible';
}

function desbloquea_insertar_registro() {
    document.getElementById('bloqueo').style.visibility = 'hidden';
    document.getElementById('nuevo_poi').style.visibility = 'hidden';
    document.getElementById('nuevo_poi_sombra').style.visibility = 'hidden';
}

function add(indice,punto, distancia, comentarios, atributos) {
    document.getElementById('frm_tabla').contentWindow.add(indice,punto, distancia, comentarios, atributos);
}

function guardar() {
    document.getElementById('frm_tabla').contentWindow.guardar();
}

function edita_registro(control, indice) {
    console.log('edita_registro', control, indice);
    document.getElementById('frmNuevaVersion').src = 'nuevo_poi.html?edicion=S&indice=' + indice;
    document.getElementById('bloqueo').style.visibility = 'visible';
    document.getElementById('nuevo_poi').style.visibility = 'visible';
    document.getElementById('nuevo_poi_sombra').style.visibility = 'visible';
}

function get_punto(indice) {
    document.getElementById('frm_tabla').contentWindow.get_punto(indice);
}

function envia_punto(punto) {
    var nombre = punto.nombre_poi;
    var distancia = punto.distancia;
    var notas = punto.notas;
    var atributos = punto.atributos;

    document.getElementById('frmNuevaVersion').contentWindow.set_valores_formulario(nombre, distancia, notas, atributos);
}

function borra_punto(indice) {
    document.getElementById('frm_tabla').contentWindow.borra(indice);
}

function cargar_fichero(o) {
    var nombre_fichero = o.files[0].name;
    console.log('cargar_fichero index', nombre_fichero);
    document.getElementById('frm_tabla').contentWindow.cargar_fichero(nombre_fichero);
    document.getElementById('btn_course_add').style.visibility = 'visible';
    document.getElementById('btn_course_save').style.visibility = 'visible';
}

var nombre_nuevo_fichero = '';

function crea_fichero() {
    var resp = prompt("Stage name: ");
    if (!resp) return;

    nombre_nuevo_fichero = resp + '.json'

    var file = new File(["[]"], nombre_nuevo_fichero, { type: "application/json" });
    saveAs(file);

    /* var blob = new Blob(["[]"], { type: 'application/json' });

    saveAs(blob, nombre_nuevo_fichero); */

    //var generatedFile = new File(["Rough Draft ...."], nombre_nuevo_fichero, { type: "text/plain" })
    //console.log(generatedFile);

    /* var cadena = JSON.stringify('[]');
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(cadena));
    element.setAttribute('download', nombre_nuevo_fichero);

    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();

     */

    //setInterval(existe_fichero, 1000);
}