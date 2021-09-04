import cargarMetronomoHTML from "./estrcturaHTML.js";
import MetronomoTiempo from "./metro-tiempo.js";

$(document).ready(function() {
    cargarMetronomoHTML();
    const formulario = $('#formulario');
    const inputCorreo = $('#form-correo');
    const inputNombre = $('#nombre-usuario');
    const btnSubmit = $('.btn-submit');

    const btnStartStop = $('.star-stop');
    const metroVisor = $('.tiempo');
    const metroTexto = $('.metro-texto');
    const metroSlide = document.querySelector('.slide');
    const metroDisminuye = $('.btn-resta');
    const metroAumenta = $('.btn-suma');
    
    const btnNegra = $('#negra');
    const btnCorchea = $('#corchea');
    const btnSemicorchea = $('#semicorchea');
    const btnTresillo = $('#tresillo');
    const ventanaModalFigRit = $('#bodyModalFigRit');
    
    const clickTempoDebil = new Audio('click1.mp3'); 
    const UrlPost = "https://jsonplaceholder.typicode.com/posts";

    let bpm = 160;
    let subdivision = 1;
    let startStop = false;
    let intervalo;
    let loginUsuarios = [];
    
    function User(correo, nombre) {
        this.correo = correo;
        this.nombre = nombre;
    }
    function guardarStorage(key, user) {
        loginUsuarios.push(user);
        localStorage.setItem(key, JSON.stringify(loginUsuarios));
    }

    $(btnSubmit).click(() => {
        $.ajax({
            url: UrlPost,
            type: 'POST',
            data: loginUsuarios
        })
        .done(function(response) {
            $('.nombre-usuario').text(`Hola, ${inputNombre.val()}`);
            $('.login').hide("slow");
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
    });

    $(btnStartStop).click(() => {
        if (!startStop) {
            startStop = true;
            $('#modalStop').remove();
            $('#bodyModalStartStop').append('<p id="modalStart">Metrónomo encendido</p>');
            MetronomoTiempoActual.comienzarTiempo();
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
        updateIntervalo();
    });
    $(metroAumenta).click(() => {
        if(bpm >= 300){return}
        MetronomoDisplayActual.setupBPM = bpm++;
        localStorage.setItem("BPM", bpm);
        updateIntervalo();
    });
    const controlBPMSlide = () => {
        bpm = metroSlide.value;
        MetronomoDisplayActual.setupBPM = metroSlide.value;
        localStorage.setItem("BPM", bpm);
        updateIntervalo();
    }
    metroSlide.addEventListener('input', controlBPMSlide); 

    $(btnNegra).click(() => {
        subdivision = 1;
        updateSubdivision();
        updateIntervalo();
    });
    $(btnCorchea).click(() => {
        subdivision = 2;
        updateSubdivision();
        updateIntervalo();
    });
    $(btnTresillo).click(() => {
        subdivision = 3;
        updateSubdivision();
        updateIntervalo();
    });
    $(btnSemicorchea).click(() => {
        subdivision = 4;
        updateSubdivision();
        updateIntervalo();
    });
    function updateIntervalo(){
        intervalo = (60000/bpm)/subdivision;
    }
    function updateSubdivision(){
        MetronomoDisplayActual.setupFigRitmica = subdivision;
        localStorage.setItem("Subdivision", subdivision);
    }
    
    class MetronomoDisplay{
        constructor(tiempo, figRitmica){
            this.tiempo = tiempo;
            this.figRitmica = figRitmica;
        }
        set setupBPM(tiempo){
            this.tiempo = tiempo;
            let bpmTexto = "";
            let bpmTextoArray = ["Larghissimo", "Largo", "Lento", "Adagio", "Andante", "Moderato", "Allegretto", "Allegro", "Allegro - Vivace", "Allegro - Presto", "Presto", "Prestissimo"];
            if(this.tiempo >= 20){
                bpmTexto = bpmTextoArray[0]; //Larghissimo
                if(this.tiempo >= 40){
                    bpmTexto = bpmTextoArray[1]; //Largo
                    if(this.tiempo >= 55){
                        bpmTexto = bpmTextoArray[2]; //Lento 
                        if(this.tiempo >= 69){
                            bpmTexto = bpmTextoArray[3]; //Adagio
                            if(this.tiempo >= 81){
                                bpmTexto = bpmTextoArray[4]; //Andante
                                if(this.tiempo >= 88){
                                    bpmTexto = bpmTextoArray[5]; //Moderato
                                    if(this.tiempo >= 100){
                                        bpmTexto = bpmTextoArray[6]; //Allegretto
                                        if(this.tiempo >= 120){
                                            bpmTexto = bpmTextoArray[7]; //Allegro
                                            if(this.tiempo >= 133){
                                                bpmTexto = bpmTextoArray[8]; //Allegro - Vivace
                                                if(this.tiempo >= 143){
                                                    bpmTexto = bpmTextoArray[9]; //Allegro - Presto
                                                    if(this.tiempo >= 161){
                                                        bpmTexto = bpmTextoArray[10]; //Presto
                                                        if(this.tiempo >= 201){
                                                            bpmTexto = bpmTextoArray[11]; // Prestissimo    ;
                                                        } 
                                                    } 
                                                } 
                                            } 
                                        } 
                                    } 
                                } 
                            } 
                        } 
                    }  
                }
            } 
            $(metroTexto).text(bpmTexto);
            $(metroVisor).text(this.tiempo);
            metroSlide.value = this.tiempo;
        }
        set setupFigRitmica(figRitmica){
            this.figRitmica = figRitmica;
            this.eliminaModalAnteriorFigRit();
            switch(this.figRitmica){
                case 1: //escoge negra
                    btnNegra.add('.active');
                    btnCorchea.remove('.active');
                    btnSemicorchea.remove('.active');
                    btnTresillo.remove('.active');
                    $(ventanaModalFigRit).append('<p id="modalNegra">Has escogido la figura de negra, la cual equivale a 1 tiempo.</p>');
                break;
                case 2: //escoge corchea
                    btnNegra.remove('.active');
                    btnCorchea.add('.active');
                    btnSemicorchea.remove('.active');
                    btnTresillo.remove('.active');
                    $(ventanaModalFigRit).append('<p id="modalCorchea">Has escogido la figura de corchea, la cual equivale a 1/2 tiempo.</p>');
                break;
                case 3: //escoge tresillo
                    btnNegra.remove('.active');
                    btnCorchea.remove('.active');
                    btnSemicorchea.remove('.active');
                    btnTresillo.add('.active');
                    $(ventanaModalFigRit).append('<p id="modalTresillo">Has escogido la figura de tresillo, la cual equivale a 1/3 tiempo.</p>');
                break;
                case 4: //escoge semicorchea
                    btnNegra.remove('.active');
                    btnCorchea.remove('.active');
                    btnSemicorchea.add('.active');
                    btnTresillo.remove('.active');
                    $(ventanaModalFigRit).append('<p id="modalSemicorchea">Has escogido la figura de semicorchea, la cual equivale a 1/4 tiempo.</p>');
                break;
            }
        }
        eliminaModalAnteriorFigRit(){
            $('#modalNegra').remove();
            $('#modalCorchea').remove();
            $('#modalSemicorchea').remove();
            $('#modalTresillo').remove();
        }
    }

    const MetronomoTiempoActual = new MetronomoTiempo(() => {
        clickTempoDebil.play();
    }, (60000/bpm)/subdivision); //tengo que configurar el parametro intervaloTiempo para que cambie en cualquier momento

    const MetronomoDisplayActual = new MetronomoDisplay(bpm, subdivision);
    
});
