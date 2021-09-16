const metroVisor = $('.tiempo');
const metroTexto = $('.metro-texto');
const metroSlide = $('.slide');

const btnNegra = $('#negra');
const btnCorchea = $('#corchea');
const btnSemicorchea = $('#semicorchea');
const btnTresillo = $('#tresillo');
const ventanaModalFigRit = $('#bodyModalFigRit');

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
        $(metroSlide).val(this.tiempo);
    }
    set setupFigRitmica(figRitmica){
        this.figRitmica = figRitmica;
        this.eliminaModalAnteriorFigRit();
        switch(this.figRitmica){
            case 1: //escoge negra
                btnNegra.addClass('activo');
                btnCorchea.removeClass('activo');
                btnSemicorchea.removeClass('activo');
                btnTresillo.removeClass('activo');
                $(ventanaModalFigRit).append('<p id="modalNegra">Has escogido la figura de negra, la cual equivale a 1 tiempo.</p>');
            break;
            case 2: //escoge corchea
                btnNegra.removeClass('activo');
                btnCorchea.addClass('activo');
                btnSemicorchea.removeClass('activo');
                btnTresillo.removeClass('activo');
                $(ventanaModalFigRit).append('<p id="modalCorchea">Has escogido la figura de corchea, la cual equivale a 1/2 tiempo.</p>');
            break;
            case 3: //escoge tresillo
                btnNegra.removeClass('activo');
                btnCorchea.removeClass('activo');
                btnSemicorchea.removeClass('activo');
                btnTresillo.addClass('activo');
                $(ventanaModalFigRit).append('<p id="modalTresillo">Has escogido la figura de tresillo, la cual equivale a 1/3 tiempo.</p>');
            break;
            case 4: //escoge semicorchea
                btnNegra.removeClass('activo');
                btnCorchea.removeClass('activo');
                btnSemicorchea.addClass('activo');
                btnTresillo.removeClass('activo');
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

export default MetronomoDisplay;
