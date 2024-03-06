class ThrowableObject extends MovableObject {

    constructor(x, y){
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png') // Laden des Bildes für das geworfene Objekt
        this.x = x; // Setzen der x-Position des Objekts
        this.y = y; // Setzen der y-Position des Objekts
        this.height = 90;
        this.width = 70;
        this.offset = {
            top: 0,
            left: 20,
            right: 20,
            bottom: 5,
        };
        this.trow(); // Funktion zum Ausführen des Wurfes aufrufen
    }


    trow() { // Methode zum Werfen des Objekts
        this.speedY = 30; // Setzen der vertikalen Geschwindigkeit für den Wurf
        this.applyGravity(); // Anwenden der Schwerkraft auf das Objekt während des Wurfs
        setInterval(() => { // Funktion zum Bewegen des Objekts in regelmäßigen Intervallen aufrufen
            this.x +=10; // Bewegen des Objekts nach rechts
        }, 25)
    }
}