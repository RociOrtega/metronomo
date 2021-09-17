import cargarMetronomoHTML from "./estrcturaHTML.js";
import MetronomoTiempo from "./metro-tiempo.js";
import textoMetronomo from "./textoMetro.js";
import selectorModalFiguras from "./modalFigRit.js";
import sesionGuardado from "./inicioSesion.js";

$(document).ready(function() {
    const btnStartStop = $('.star-stop');
    const metroVisor = $('#tiempo');
    const metroTexto = $('#metro-texto');
    const metroSlide = $('.slide');
    const metroDisminuye = $('.btn-resta');
    const metroAumenta = $('.btn-suma');
    const btnNegra = $('#negra');
    const btnCorchea = $('#corchea');
    const btnSemicorchea = $('#semicorchea');
    const btnTresillo = $('#tresillo');
    const clickTempoDebil = new Audio('click1.mp3'); 
    let bpm = 160;
    let subdivision = 1;
    let startStop = false;
    let configuracion = [];

    cargarMetronomoHTML();
    sesionGuardado();
    botonMenu();

    function botonMenu(){
        let transformarConfiguracion = JSON.parse(localStorage.getItem("Configuracion"));
        if(transformarConfiguracion){
            let ultimaSubdivision = transformarConfiguracion[transformarConfiguracion.length - 1];
            let ultimoBPM = transformarConfiguracion[transformarConfiguracion.length - 2];
            $('.btn-menu').click(() => {
                bpm = ultimoBPM.bpm;
                subdivision = ultimaSubdivision.subdivision;
                $(metroSlide).val(ultimoBPM.bpm);
                MetronomoPantallaActual.setupBPM = bpm
                actualizarSubdivision();
            });
        }
    }
    function guardarConfiguracion(beat, figura){
        configuracion.push({"bpm": beat});
        configuracion.push({"subdivision": figura});
        localStorage.setItem("Configuracion", JSON.stringify(configuracion));
    }
    //Evento click y funcion para el boton start
    $(btnStartStop).click(() => {
        if (!startStop) {
            startStop = true;
            $('#modalStop').remove();
            $('#bodyModalStartStop').append('<p id="modalStart">Metrónomo encendido</p>');
            MetronomoTiempoActual.comenzarTiempo();
        } else {
            startStop = false;
            $('#modalStart').remove();
            $('#bodyModalStartStop').append('<p id="modalStop">Metrónomo apagado</p>');
            MetronomoTiempoActual.detenerTiempo();
        }
    });
    //Eventos click y funcion para ajuste de BPM
    $(metroDisminuye).click(() => {
        if(bpm <= 20){return}
        MetronomoPantallaActual.setupBPM = bpm--;
        actualizarBPM();
    });
    $(metroAumenta).click(() => {
        if(bpm >= 300){return}
        MetronomoPantallaActual.setupBPM = bpm++;
        actualizarBPM();
    });
    $(document).on('input', '.slide', function() {
        bpm = $(metroSlide).val();
        MetronomoPantallaActual.setupBPM = bpm;
        actualizarBPM();
    });
    function actualizarBPM(){
        MetronomoTiempoActual.intervaloTiempo = (60000/bpm)/subdivision;
        guardarConfiguracion(bpm, subdivision);
    }
    //Eventos click y funcion para ajuste de Subdivision (figura rítimica)
    $(btnNegra).click(() => {
        subdivision = 1;
        actualizarSubdivision();
    });
    $(btnCorchea).click(() => {
        subdivision = 2;
        actualizarSubdivision();
    });
    $(btnTresillo).click(() => {
        subdivision = 3;
        actualizarSubdivision();
    });
    $(btnSemicorchea).click(() => {
        subdivision = 4;
        actualizarSubdivision();
    });
    function actualizarSubdivision(){
        MetronomoPantallaActual.setupFigRitmica  = subdivision;
        MetronomoTiempoActual.intervaloTiempo = (60000/bpm)/subdivision;
        guardarConfiguracion(bpm, subdivision);
    }
    //Clase para ajustar la pantalla del metronomo
    class MetronomoPantalla{
        constructor(tiempo, figRitmica){
            this.tiempo = tiempo;
            this.figRitmica = figRitmica;
        }
        set setupBPM(tiempo){
            this.tiempo = tiempo;
            let textoTiempoMetronomo = textoMetronomo(this.tiempo);
            $(metroTexto).text(textoTiempoMetronomo);
            $(metroVisor).text(this.tiempo);
        }
        set setupFigRitmica(figRitmica){
            this.figRitmica = figRitmica;
            selectorModalFiguras(this.figRitmica);
        }
    }
    const MetronomoTiempoActual = new MetronomoTiempo(() => {
        clickTempoDebil.play();
    }, (60000/bpm)/subdivision); 
    const MetronomoPantallaActual = new MetronomoPantalla(bpm, subdivision);   
});