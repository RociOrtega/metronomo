const formulario = $('#formulario');
const inputCorreo = $('#form-correo');
const inputNombre = $('#nombre-usuario');
const btnSubmit = $('.btn-submit');

const UrlPost = "https://jsonplaceholder.typicode.com/posts";
let loginUsuarios = [];

export default function sesionGuardado(){
    $(formulario).submit(function(e){
        e.preventDefault();
    });
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
}

function User(correo, nombre) {
    this.correo = correo;
    this.nombre = nombre;
}
function guardarStorage(key, user) {
    loginUsuarios.push(user);
    localStorage.setItem(key, JSON.stringify(loginUsuarios));
}
