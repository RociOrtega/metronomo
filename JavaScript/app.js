import cargarMetronomoHTML from "./estrcturaHTML.js";
import MetronomoTiempo from "./metro-tiempo.js";
import MetronomoDisplay from "./metronoClase.js";
import sesionGuardado from "./sesion.js";

$(document).ready(function() {
    cargarMetronomoHTML();
    //sesionGuardado();
    const seccionFormulario = $('.formulario-sesion');
    const formulario = $('#formulario');
    const inputCorreo = $('#form-correo');
    const inputNombre = $('#nombre-usuario');
    const btnSubmit = $('.btn-submit');

    const btnStartStop = $('.star-stop');
    /*const metroVisor = $('.tiempo');
    const metroTexto = $('.metro-texto');*/
    const metroSlide = $('.slide');
    const metroDisminuye = $('.btn-resta');
    const metroAumenta = $('.btn-suma');
    
    const btnNegra = $('#negra');
    const btnCorchea = $('#corchea');
    const btnSemicorchea = $('#semicorchea');
    const btnTresillo = $('#tresillo');
    //const ventanaModalFigRit = $('#bodyModalFigRit');
    
    const clickTempoDebil = new Audio('click1.mp3'); 
    const UrlPost = "https://jsonplaceholder.typicode.com/posts";

    let bpm = 160;
    let subdivision = 1;
    let startStop = false;
    let loginUsuarios = [];

    function sesionGuardado(){
        $(formulario).submit(function(e){
            e.preventDefault();
        });
        $(btnSubmit).click(() => {
            if((inputCorreo.val() != 0) && (inputNombre.val() != 0)){
                $.ajax({
                    url: UrlPost,
                    type: 'POST',
                    data: loginUsuarios
                })
                .done(function(response) {
                    $('.nombre-usuario').text(`Hola, ${inputNombre.val()}`);
                    $(seccionFormulario).hide("slow");
                    $('.contenedor').show().css({
                        "display": "flex",
                        "flexDirection": "column",
                        "alignItems": "center"
                    });
                    const correo = inputCorreo.val();
                    const nombre = inputNombre.val();
        
                    const user = new User(correo, nombre);
        
                    guardarStorage('users', user);
                })
                .fail(function(error){
                    console.log('Algo salio mal', error);
                });
            }
            else{
                $(seccionFormulario).append(`<div class="formularioError">ERROR!! Por favor introduce tu correo electrónico y nombre para poder continuar.</div>`);
                $('.formularioError').css({
                    "backgroundColor": "#352a24",
                    "margin": "5% 2%",
                    "padding": "3%",
                    "height": "auto",
                    "borderRadius": "5px",
                    "color": "#FFFFFF",
                    "display": "flex",
                    "justifyContent": "center",
                    "alignItems": "center"
                });
            }
        });
    }

    function User(correo, nombre) {
        this.correo = correo;
        this.nombre = nombre;
    }
    function guardarStorage(key, user) {
        loginUsuarios.push(user);
        localStorage.setItem(key, JSON.stringify(loginUsuarios));
    }

    sesionGuardado();

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

    $(metroDisminuye).click(() => {
        if(bpm <= 20){return}
        MetronomoDisplayActual.setupBPM = bpm--;
        localStorage.setItem("BPM", bpm);
        MetronomoTiempoActual.intervaloTiempo = (60000/bpm)/subdivision;
    });
    $(metroAumenta).click(() => {
        if(bpm >= 300){return}
        MetronomoDisplayActual.setupBPM = bpm++;
        localStorage.setItem("BPM", bpm);
        MetronomoTiempoActual.intervaloTiempo = (60000/bpm)/subdivision;
    });
    $(metroSlide).change(() => {
        bpm = $(metroSlide).val();
        MetronomoDisplayActual.setupBPM = $(metroSlide).val();
        localStorage.setItem("BPM", bpm);
        MetronomoTiempoActual.intervaloTiempo = (60000/bpm)/subdivision;
    });

    $(btnNegra).click(() => {
        subdivision = 1;
        updateSubdivision();
    });
    $(btnCorchea).click(() => {
        subdivision = 2;
        updateSubdivision();
    });
    $(btnTresillo).click(() => {
        subdivision = 3;
        updateSubdivision();
    });
    $(btnSemicorchea).click(() => {
        subdivision = 4;
        updateSubdivision();
    });
    
    function updateSubdivision(){
        MetronomoDisplayActual.setupFigRitmica = subdivision;
        MetronomoTiempoActual.intervaloTiempo = (60000/bpm)/subdivision;
        localStorage.setItem("Subdivision", subdivision);
    }

    const MetronomoTiempoActual = new MetronomoTiempo(() => {
        clickTempoDebil.play();
    }, (60000/bpm)/subdivision); 

    const MetronomoDisplayActual = new MetronomoDisplay(bpm, subdivision);
    
});
