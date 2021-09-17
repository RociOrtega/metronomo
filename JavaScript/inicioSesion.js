let loginUsuarios = [];
//Configuraciones para el ingreso de correo y nombre + envío a ajax
function Usuarios(correo, nombre) {
    this.correo = correo;
    this.nombre = nombre;
}
function guardarStorage(key, usuario) {
    loginUsuarios.push(usuario);
    localStorage.setItem(key, JSON.stringify(loginUsuarios));
}
function obtenerUltimaConfiguracion(){
    let transformarConfiguracion = JSON.parse(localStorage.getItem("Configuracion"));
    if(transformarConfiguracion){
        let espacioConfiguracion = transformarConfiguracion.length;
        let ultimaSubdivision = transformarConfiguracion[espacioConfiguracion - 1];
        let ultimoBPM = transformarConfiguracion[espacioConfiguracion - 2];
        $('.btn-menu').text(``).prepend(`<a class="dropdown-item" id="btn-menu-texto" href="#">Utilizar última configuración:<br> <b>BPM</b> ${ultimoBPM.bpm} <br> <b>Subdivisión</b> ${ultimaSubdivision.subdivision}</a>`);
    }
    else{
        $('.btn-menu').text(``).prepend(`<a class="dropdown-item" id="btn-menu-texto" href="#">No tienes una última configuración</a>`);
    }
}

export default function sesionGuardado(){
    const seccionFormulario = $('.formulario-sesion');
    const formulario = $('#formulario');
    const inputCorreo = $('#form-correo');
    const inputNombre = $('#nombre-usuario');
    const btnSubmit = $('.btn-submit');
    const UrlPost = "https://jsonplaceholder.typicode.com/posts";

    $(formulario).submit(function(e){
        e.preventDefault();
    });
    $(btnSubmit).click(() => {
        if((inputCorreo.val() != 0) && (inputNombre.val() != 0)){
            $.ajax({
                url: UrlPost, type: 'POST', data: loginUsuarios
            })
            .done(function(response) {
                obtenerUltimaConfiguracion();
                $('.nombre-usuario').text(`Hola, ${inputNombre.val()}`);
                $(seccionFormulario).hide("slow");
                $('.contenedor').show().css({"display": "flex", "flexDirection": "column", "alignItems": "center"});
                const correo = inputCorreo.val();
                const nombre = inputNombre.val();
                const usuario = new Usuarios(correo, nombre);
                guardarStorage('usuarios', usuario);
            })
            .fail(function(error){
                $('.formularioError').remove();
                $(seccionFormulario).append(`<div class="formularioError">ERROR!! El formulario no se ha enviado correctamente, por favor intentalo una vez más.</div>`);
                $('.formularioError').css({
                "backgroundColor": "#352a24", "margin": "5% 2%", "padding": "3%", "height": "auto", "borderRadius": "5px", "color": "#FFFFFF", "display": "flex", "justifyContent": "center", "alignItems": "center"});
            });
        }
        else{
            $('.formularioError').remove();
            $(seccionFormulario).append(`<div class="formularioError">ERROR!! Por favor introduce tu correo electrónico y nombre para poder continuar.</div>`);
            $('.formularioError').css({"backgroundColor": "#352a24", "margin": "5% 2%", "padding": "3%", "height": "auto", "borderRadius": "5px", "color": "#FFFFFF", "display": "flex", "justifyContent": "center", "alignItems": "center"});
        }
    });
}
