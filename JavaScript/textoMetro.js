//Texto del tiempo (bpm) del metrónomo
export default function textoMetronomo(posicion){
    let bpmTexto = "";
    let bpmTextoArray = ["Larghissimo", "Largo", "Lento", "Adagio", "Andante", "Moderato", "Allegretto", "Allegro", "Allegro - Vivace", "Allegro - Presto", "Presto", "Prestissimo"];
    if(posicion >= 20){
        bpmTexto = bpmTextoArray[0]; //Larghissimo
        if(posicion >= 40){
            bpmTexto = bpmTextoArray[1]; //Largo
            if(posicion >= 55){
                bpmTexto = bpmTextoArray[2]; //Lento 
                if(posicion >= 69){
                    bpmTexto = bpmTextoArray[3]; //Adagio                            
                    if(posicion >= 81){
                        bpmTexto = bpmTextoArray[4]; //Andante
                        if(posicion >= 88){
                            bpmTexto = bpmTextoArray[5]; //Moderato
                            if(posicion >= 100){
                                bpmTexto = bpmTextoArray[6]; //Allegretto
                                if(posicion >= 120){
                                    bpmTexto = bpmTextoArray[7]; //Allegro
                                    if(posicion >= 133){
                                        bpmTexto = bpmTextoArray[8]; //Allegro - Vivace
                                        if(posicion >= 143){
                                            bpmTexto = bpmTextoArray[9]; //Allegro - Presto
                                            if(posicion >= 161){
                                                bpmTexto = bpmTextoArray[10]; //Presto
                                                if(posicion >= 201){
                                                    bpmTexto = bpmTextoArray[11]; // Prestissimo 
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
    return bpmTexto;
}