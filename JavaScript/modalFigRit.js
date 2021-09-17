//Ventanas modales para la selección de subdivisión
function eliminaModalAnteriorFigRit(){
    $('#modalNegra').remove();
    $('#modalCorchea').remove();
    $('#modalSemicorchea').remove();
    $('#modalTresillo').remove();
}

export default function selectorModalFiguras(division){
    eliminaModalAnteriorFigRit();
    const ventanaModalFigRit = $('#bodyModalFigRit');
    let textoModal = $(ventanaModalFigRit).append('<p></p>');
    const btnNegra = $('#negra');
    const btnCorchea = $('#corchea');
    const btnSemicorchea = $('#semicorchea');
    const btnTresillo = $('#tresillo');

    switch(division){
        case 1: //negra
            btnNegra.addClass('activo');
            btnCorchea.removeClass('activo');
            btnSemicorchea.removeClass('activo');
            btnTresillo.removeClass('activo');
            textoModal = $(ventanaModalFigRit).append('<p id="modalNegra">Has escogido la figura de negra, la cual equivale a 1 tiempo.</p>');
        break;
        case 2: //corchea
            btnNegra.removeClass('activo');
            btnCorchea.addClass('activo');
            btnSemicorchea.removeClass('activo');
            btnTresillo.removeClass('activo');
            textoModal = $(ventanaModalFigRit).append('<p id="modalCorchea">Has escogido la figura de corchea, la cual equivale a 1/2 tiempo.</p>');
        break;
        case 3: //tresillo
            btnNegra.removeClass('activo');
            btnCorchea.removeClass('activo');
            btnSemicorchea.removeClass('activo');
            btnTresillo.addClass('activo');
            textoModal = $(ventanaModalFigRit).append('<p id="modalTresillo">Has escogido la figura de tresillo, la cual equivale a 1/3 tiempo.</p>');
        break;
        case 4: //semicorchea
            btnNegra.removeClass('activo');
            btnCorchea.removeClass('activo');
            btnSemicorchea.addClass('activo');
            btnTresillo.removeClass('activo');
            textoModal = $(ventanaModalFigRit).append('<p id="modalSemicorchea">Has escogido la figura de semicorchea, la cual equivale a 1/4 tiempo.</p>');
        break;
    }
    return textoModal;
}