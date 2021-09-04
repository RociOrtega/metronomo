function MetronomoTiempo(callback, intervaloTiempo){
    this.intervaloTiempo = intervaloTiempo;

    this.comienzarTiempo = () => {
        this.tiempoEsperado = Date.now() + this.intervaloTiempo;
        this.tiempoFuera = setTimeout(this.round, this.intervaloTiempo);
    }
    this.detenerTiempo = () => {
        clearTimeout(this.tiempoFuera);
    }
    this.round = () => {
        let tiempoDesplazado = Date.now() - this.tiempoEsperado;
        callback();
        this.tiempoEsperado += this.intervaloTiempo;this.tiempoFuera = setTimeout(this.round, this.intervaloTiempo - tiempoDesplazado);
    }
}

export default MetronomoTiempo;