const cargarMetronomoEnContenedor = () => {$('.contenedor').prepend(`
    <h1 class="titulo">Metrónomo</h1>
    <section class="metronomo">
        <div class="metro-visor">
            <span class="tiempo">160</span>
            <span class="bpm">bpm</span>
        </div>
        <p class="metro-texto">Allegro - Presto</p>
        <div class="metro-ajuste">
            <button type="button" class="btn-ajuste btn-resta">-</button>
            <input type="range" min="20" max="300" step="1" class="slide">
            <button type="button" class="btn-ajuste btn-suma">+</button>
        </div>
        <button type="button" class="star-stop" data-toggle="modal" data-target="#modalStartStop">
        <i class="bx bx-play"></i></button>
        <div class="modal fade" id="modalStartStop">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" id="bodyModalStartStop"></div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="ritmo">
            <div id="negra" class="btn-ritmo negra" data-toggle="modal" data-target="#ventanaModalFigRit"></div>
            <div id="corchea" class="btn-ritmo corchea" data-toggle="modal" data-target="#ventanaModalFigRit"></div>
            <div id="semicorchea" class="btn-ritmo semicorchea" data-toggle="modal" data-target="#ventanaModalFigRit"></div>
            <div id="tresillo" class="btn-ritmo tresillo" data-toggle="modal" data-target="#ventanaModalFigRit"><p class="tresillo_p">3</p></div>
        </div>
        <div class="modal fade" id="ventanaModalFigRit">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body" id="bodyModalFigRit"></div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    </section>`);
};
const cargarMenuMetronomo = () => {$('body').prepend(`
    <div class="menu-usuario dropdown-toggle" type="button" id="menuDesplegable" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <div class="img-usuario"></div>
        <div class="nombre-usuario">Hola, User!</div>
    </div>
    <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <a class="dropdown-item" href="#">Última configuración</a>
    </div>`);
};
const cargarLoginMetronomo = () => {$('.formulario-sesion').prepend(`
    <section class="formulario_sesion">
        <form id="formulario"> 
            <div class="form-group">
                <label for="form-correo">Correo electrónico</label>
                <input type="email" class="form-control" id="form-correo" placeholder="Ingresa tu correo electrónico">
                <small id="emailHelp" class="form-text text-muted">Nunca compartiremos tu correo con alguna otra entidad.</small>
            </div>
            <div class="form-group">
                <label for="nombre-usuario">Nombre de usuario(a)</label>
                <input type="text" class="form-control" id="nombre-usuario" placeholder="Ingresa tu nombre">
            </div>
            <input type="submit" value="Enviar" class="btn btn-success btn-submit"/>
        </form>
    </section>`);
};

function cargarMetronomoHTML(){
    cargarMenuMetronomo();
    cargarLoginMetronomo();
    cargarMetronomoEnContenedor();
}

export default cargarMetronomoHTML;